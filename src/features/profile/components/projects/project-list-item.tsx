"use client";

import { ExternalLinkIcon } from "lucide-react";
import React from "react";

import { getIcon, Icons } from "@/components/icons";
import {
  CollapsibleChevronsIcon,
  CollapsibleContent,
  CollapsibleTrigger,
  CollapsibleWithContext,
} from "@/components/ui/collapsible";
import { Tag } from "@/components/ui/tag";
import { SimpleTooltip } from "@/components/ui/tooltip";
import { UTM_PARAMS } from "@/config/site";
import { addQueryParams } from "@/utils/url";

import { TECH_STACK } from "../../data/tech-stack";
import type { Project } from "../../types/projects";

export function ProjectListItem({
  project,
  defaultOpen = false,
}: {
  project: Project;
  defaultOpen?: boolean;
}) {
  const { start, end } = project.period;
  const isOngoing = !end;
  const displaySkills = project.skills.slice(0, 5);
  const isGitHub = project.link.includes("github.com");

  return (
    <CollapsibleWithContext defaultOpen={defaultOpen} asChild>
      <div className="group relative overflow-hidden rounded-lg border border-border/50 bg-card/30 transition-all hover:border-border hover:bg-card/50 hover:shadow-md">
        <CollapsibleTrigger className="block w-full text-left transition-colors select-none">
          <div className="flex items-center gap-4 p-4">
            <div
              className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"
              aria-hidden="true"
            >
              <Icons.project className="size-5" />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="mb-1 line-clamp-1 leading-tight font-medium text-balance">
                {project.title}
              </h3>

              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1 font-mono">
                  <span>{start}</span>
                  {isOngoing && <span>- Present</span>}
                  {!isOngoing && end && <span>- {end}</span>}
                </div>

                {displaySkills.length > 0 && (
                  <>
                    <span>•</span>
                    <div className="flex flex-wrap items-center gap-1">
                      {displaySkills.map((skill, index) => {
                        const techItem = TECH_STACK.find(
                          (item) =>
                            item.title === skill ||
                            item.displayName === skill ||
                            item.key === skill.toLowerCase()
                        );
                        const displayName =
                          techItem?.displayName || techItem?.title || skill;

                        return (
                          <React.Fragment key={index}>
                            <span>{displayName}</span>
                            {index < displaySkills.length - 1 && <span>,</span>}
                          </React.Fragment>
                        );
                      })}
                      {project.skills.length > 5 && (
                        <span className="text-muted-foreground/70">
                          +{project.skills.length - 5}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>

            <a
              href={addQueryParams(project.link, UTM_PARAMS)}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link flex size-8 shrink-0 items-center justify-center rounded-full border border-border/50 bg-background/50 text-muted-foreground transition-all hover:border-border hover:bg-background hover:text-primary hover:shadow-sm"
              onClick={(e) => e.stopPropagation()}
              title={isGitHub ? "View on GitHub" : "View Project"}
            >
              {isGitHub ? (
                <Icons.github className="size-4" />
              ) : (
                <ExternalLinkIcon className="size-4" />
              )}
              <span className="sr-only">
                {isGitHub ? "View on GitHub" : "View Project"}
              </span>
            </a>

            <div
              className="shrink-0 text-muted-foreground [&_svg]:size-4"
              aria-hidden
            >
              <CollapsibleChevronsIcon />
            </div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent className="overflow-hidden duration-300 data-[state=closed]:animate-collapsible-fade-up data-[state=open]:animate-collapsible-fade-down">
          <div className="space-y-3 border-t border-border/50 bg-muted/20 p-4">
            {project.description && (
              <p className="line-clamp-3 text-sm text-muted-foreground">
                {project.description.split("\n")[0]}
              </p>
            )}

            {project.skills.length > 0 && (
              <ul className="flex flex-wrap gap-1.5">
                {project.skills.map((skill, index) => {
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
                      <Tag className="flex items-center gap-1 text-xs">
                        {icon && techItem?.href ? (
                          <SimpleTooltip
                            content={`Visit ${displayName} website`}
                          >
                            <a
                              href={techItem.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block"
                              onClick={(e) => e.stopPropagation()}
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
