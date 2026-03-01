"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useLayoutEffect, useRef, useState } from "react";

import { getIcon } from "@/components/icons";
import { Tag } from "@/components/ui/tag";
import { SimpleTooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import { TECH_STACK } from "../../data/tech-stack";
import type { Project } from "../../types/projects";

/**
 * Converts a "MM.YYYY" date string to a display format like "September 01, 2025".
 */
function formatDate(dateStr: string): string {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [month, year] = dateStr.split(".");
  const monthIdx = parseInt(month, 10) - 1;
  return `${months[monthIdx]} 01, ${year}`;
}

export function ProjectGalleryCard({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const formattedDate = formatDate(project.period.start);
  const summaryText = project.summary;

  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(project.skills.length);
  const [measured, setMeasured] = useState(false);

  const computeVisible = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const children = Array.from(container.children) as HTMLElement[];
    if (children.length === 0) return;

    // Make all tags visible for measurement (they may have `hidden` from previous renders)
    children.forEach((c) => {
      c.style.display = "";
      c.classList.remove("hidden");
    });

    const firstChild = children[0];
    if (!firstChild || firstChild.offsetHeight === 0) return;

    const firstTop = firstChild.offsetTop;
    const lineHeight = firstChild.offsetHeight;
    const gap = 6; // flex gap tolerance
    const maxBottom = firstTop + lineHeight * 2 + gap; // strictly 2 rows

    let count = 0;
    for (const child of children) {
      if (child.dataset.overflow) continue; // skip the +N badge
      if (child.offsetTop + child.offsetHeight <= maxBottom) {
        count++;
      } else {
        break;
      }
    }

    // Reserve space for the +N badge if there are remaining items
    const remaining = project.skills.length - count;
    if (remaining > 0 && count > 0) {
      count = Math.max(1, count - 1);
    }

    setVisibleCount(count);
    setMeasured(true);
  }, [project.skills.length]);

  // useLayoutEffect runs synchronously before paint — prevents layout flash
  useLayoutEffect(() => {
    computeVisible();

    const handleResize = () => computeVisible();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [computeVisible]);

  const remaining = project.skills.length - visibleCount;

  const router = useRouter();

  const handleCardClick = useCallback(
    (e: React.MouseEvent) => {
      // Don't navigate if the user clicked an inner link (tech icon <a>)
      if ((e.target as HTMLElement).closest("a")) return;
      router.push(`/projects/${project.slug}`);
    },
    [router, project.slug]
  );

  return (
    <article
      role="link"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          router.push(`/projects/${project.slug}`);
        }
      }}
      className={cn(
        "group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-border bg-card/50 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card hover:shadow-lg",
        className
      )}
    >
      {/* Image / visual placeholder */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted/30">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-muted/20 to-primary/10 transition-all group-hover:from-primary/10 group-hover:to-primary/15" />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Title + Date */}
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="truncate font-mono text-base font-semibold">
            {project.title.split(" - ")[0]}
          </h3>
          <time className="shrink-0 font-mono text-sm whitespace-nowrap text-muted-foreground">
            {formattedDate}
          </time>
        </div>

        {/* Summary */}
        {summaryText && (
          <p className="line-clamp-1 text-sm leading-relaxed text-muted-foreground">
            {summaryText}
          </p>
        )}

        {/* Tech tags — container stays invisible until measured to prevent flash */}
        {project.skills.length > 0 && (
          <div
            ref={containerRef}
            className={cn(
              "mt-auto flex flex-wrap gap-1.5 pt-1",
              !measured && "invisible"
            )}
          >
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
                <Tag
                  key={index}
                  className={cn(
                    "flex items-center gap-1 text-xs",
                    measured && index >= visibleCount && "hidden"
                  )}
                >
                  {icon && techItem?.href ? (
                    <SimpleTooltip content={`Visit ${displayName} website`}>
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
              );
            })}
            {remaining > 0 && (
              <Tag data-overflow="true" className="shrink-0 text-xs">
                +{remaining}
              </Tag>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
