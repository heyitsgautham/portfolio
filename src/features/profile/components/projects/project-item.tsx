"use client";

import { ExternalLinkIcon, InfinityIcon } from "lucide-react";
import { Suspense } from "react";
import React from "react";

import { getIcon, Icons } from "@/components/icons";
import { Markdown } from "@/components/markdown";
import {
  CollapsibleChevronsIcon,
  CollapsibleContent,
  CollapsibleTrigger,
  CollapsibleWithContext,
} from "@/components/ui/collapsible";
import { Tag } from "@/components/ui/tag";
import { SimpleTooltip } from "@/components/ui/tooltip";
import { Prose } from "@/components/ui/typography";
import { UTM_PARAMS } from "@/config/site";
import { cn } from "@/lib/utils";
import { addQueryParams } from "@/utils/url";

import { TECH_STACK } from "../../data/tech-stack";
import type { Project } from "../../types/projects";

export function ProjectItem({
  className,
  project,
  defaultOpen,
}: {
  className?: string;
  project: Project;
  defaultOpen?: boolean;
}) {
  const { start, end } = project.period;
  const isOngoing = !end;

  return (
    <CollapsibleWithContext
      defaultOpen={defaultOpen ?? project.isExpanded}
      asChild
    >
      <article
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-border hover:bg-card hover:shadow-lg",
          className
        )}
      >
        <CollapsibleTrigger className="block w-full text-left transition-colors select-none">
          <div className="flex flex-col gap-4 p-4">
            <div className="flex items-start gap-4">
              <div
                className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary ring-2 ring-primary/20"
                aria-hidden="true"
              >
                <Icons.project className="size-6" />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="mb-2 line-clamp-2 leading-tight font-semibold text-balance">
                  {project.title}
                </h3>

                <dl className="flex items-center gap-2 text-xs text-muted-foreground">
                  <dt className="sr-only">Period</dt>
                  <dd className="flex items-center gap-1 font-mono">
                    <span>{start}</span>
                    <span>—</span>
                    {isOngoing ? (
                      <>
                        <InfinityIcon
                          className="size-3.5 translate-y-[0.5px]"
                          aria-hidden
                        />
                        <span className="sr-only">Present</span>
                      </>
                    ) : (
                      <span>{end}</span>
                    )}
                  </dd>
                </dl>
              </div>

              <div
                className="shrink-0 pt-1 text-muted-foreground [&_svg]:size-4"
                aria-hidden
              >
                <CollapsibleChevronsIcon />
              </div>
            </div>

            {project.skills.length > 0 && (
              <ul className="flex flex-wrap gap-1.5">
                {project.skills.slice(0, 4).map((skill, index) => {
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
                {project.skills.length > 4 && (
                  <li className="flex">
                    <Tag className="text-xs">+{project.skills.length - 4}</Tag>
                  </li>
                )}
              </ul>
            )}
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent className="overflow-hidden duration-300 data-[state=closed]:animate-collapsible-fade-up data-[state=open]:animate-collapsible-fade-down">
          <div className="space-y-4 border-t border-border/50 bg-muted/20 p-4">
            {project.description && (
              <Prose>
                <Suspense fallback={<div>Loading...</div>}>
                  <Markdown>{project.description}</Markdown>
                </Suspense>
              </Prose>
            )}

            {project.skills.length > 4 && (
              <ul className="flex flex-wrap gap-1.5">
                {project.skills.slice(4).map((skill, index) => {
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
                    <li key={index + 4} className="flex">
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

            <a
              className="inline-flex items-center gap-2 text-sm text-primary transition-colors hover:text-primary/80 hover:underline"
              href={addQueryParams(project.link, UTM_PARAMS)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>View Project</span>
              <ExternalLinkIcon className="size-4" aria-hidden />
            </a>
          </div>
        </CollapsibleContent>
      </article>
    </CollapsibleWithContext>
  );
}
