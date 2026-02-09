import { InfinityIcon } from "lucide-react";
import React from "react";

import { getIcon } from "@/components/icons";
import {
  CollapsibleChevronsIcon,
  CollapsibleContent,
  CollapsibleTrigger,
  CollapsibleWithContext,
} from "@/components/ui/collapsible";
import { Tag } from "@/components/ui/tag";
import { SimpleTooltip } from "@/components/ui/tooltip";
import { Prose } from "@/components/ui/typography";

import { TECH_STACK } from "../../data/tech-stack";
import type { ExperiencePosition } from "../../types/experiences";
import { ExperienceIcon } from "./experience-position-icon";

export function ExperiencePositionItem({
  position,
}: {
  position: ExperiencePosition;
}) {
  const { start, end } = position.employmentPeriod;
  const isOngoing = !end;

  return (
    <CollapsibleWithContext defaultOpen={position.isExpanded} asChild>
      <div className="relative rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-border hover:bg-card hover:shadow-md">
        <CollapsibleTrigger className="block w-full text-left transition-colors select-none">
          <div className="flex items-start gap-4 p-4">
            <div className="flex flex-col items-center gap-2 pt-1">
              <div
                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary ring-2 ring-primary/20"
                aria-hidden
              >
                <ExperienceIcon className="size-5" icon={position.icon} />
              </div>
              <div className="flex flex-col items-center gap-0.5 text-xs text-muted-foreground">
                <span className="font-mono">{start}</span>
                <span className="font-mono">—</span>
                {isOngoing ? (
                  <>
                    <InfinityIcon
                      className="size-4 translate-y-[0.5px]"
                      aria-hidden
                    />
                    <span className="sr-only">Present</span>
                  </>
                ) : (
                  <span className="font-mono">{end}</span>
                )}
              </div>
            </div>

            <div className="flex-1 space-y-1 pt-1">
              <h4 className="font-semibold text-balance leading-tight">
                {position.title}
              </h4>

              {position.employmentType && (
                <p className="text-sm text-muted-foreground">
                  {position.employmentType}
                </p>
              )}
            </div>

            <div
              className="shrink-0 pt-1 text-muted-foreground [&_svg]:size-4"
              aria-hidden
            >
              <CollapsibleChevronsIcon />
            </div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent className="overflow-hidden duration-300 data-[state=closed]:animate-collapsible-fade-up data-[state=open]:animate-collapsible-fade-down">
          <div className="space-y-4 border-t border-border/50 bg-muted/20 p-4">
            {position.description && (
              <Prose>
                {(() => {
                  const lines = position.description
                    .split("\n")
                    .filter((line) => line.trim().length > 0);

                  const blocks: Array<
                    | { type: "heading"; text: string }
                    | { type: "bullets"; items: string[][] }
                  > = [];

                  let currentBullets: string[][] = [];

                  for (const line of lines) {
                    const trimmed = line.trim();
                    const headingMatch = trimmed.match(/^\*\*(.+?)\*\*$/);

                    if (headingMatch) {
                      // Flush any accumulated bullets
                      if (currentBullets.length > 0) {
                        blocks.push({ type: "bullets", items: currentBullets });
                        currentBullets = [];
                      }
                      blocks.push({ type: "heading", text: headingMatch[1] });
                    } else if (trimmed.startsWith("- ")) {
                      // New bullet point
                      currentBullets.push([trimmed.substring(2).trim()]);
                    } else {
                      // Continuation line (Shift+Enter) — append to last bullet
                      if (currentBullets.length > 0) {
                        currentBullets[currentBullets.length - 1].push(trimmed);
                      }
                    }
                  }

                  // Flush remaining bullets
                  if (currentBullets.length > 0) {
                    blocks.push({ type: "bullets", items: currentBullets });
                  }

                  return blocks.map((block, i) => {
                    if (block.type === "heading") {
                      return (
                        <p
                          key={i}
                          className="!mb-1.5 !mt-3 first:!mt-0 text-sm font-semibold text-foreground"
                        >
                          {block.text}
                        </p>
                      );
                    }

                    return (
                      <ul key={i} className="!mt-1">
                        {block.items.map((bulletLines, j) => (
                          <li key={j}>
                            {bulletLines.map((line, k) => (
                              <React.Fragment key={k}>
                                {k > 0 && <br />}
                                {line}
                              </React.Fragment>
                            ))}
                          </li>
                        ))}
                      </ul>
                    );
                  });
                })()}
              </Prose>
            )}

            {Array.isArray(position.skills) && position.skills.length > 0 && (
              <ul className="flex flex-wrap gap-1.5">
                {position.skills.map((skill, index) => {
                  const techItem = TECH_STACK.find(
                    (item) =>
                      item.title === skill ||
                      item.displayName === skill ||
                      item.key === skill.toLowerCase()
                  );
                  const iconKey = techItem?.key || skill.toLowerCase();
                  const displayName =
                    techItem?.displayName || techItem?.title || skill;
                  const icon = getIcon(iconKey);

                  return (
                    <li key={index} className="flex">
                      <Tag className="flex items-center gap-1">
                        {icon && techItem?.href ? (
                          <SimpleTooltip
                            content={`Visit ${displayName} website`}
                          >
                            <a
                              href={techItem.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block"
                            >
                              {icon}
                            </a>
                          </SimpleTooltip>
                        ) : (
                          icon
                        )}
                        {displayName}
                      </Tag>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </CollapsibleContent>
      </div>
    </CollapsibleWithContext>
  );
}
