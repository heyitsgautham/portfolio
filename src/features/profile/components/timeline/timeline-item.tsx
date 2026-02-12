"use client";

import { ExternalLinkIcon } from "lucide-react";
import { Suspense, useCallback, useRef, useState } from "react";

import { Icons } from "@/components/icons";
import { Markdown } from "@/components/markdown";
import {
  CollapsibleChevronsIcon,
  CollapsibleContent,
  CollapsibleTrigger,
  CollapsibleWithContext,
} from "@/components/ui/collapsible";
import { Prose } from "@/components/ui/typography";

import type { TimelineEvent } from "../../types/timeline";
import { ImageCarousel } from "./image-carousel";

export function TimelineItem({
  className,
  event,
  position,
}: {
  className?: string;
  event: TimelineEvent;
  position: "left" | "right";
}) {
  const canExpand = !!(event.description || (event.images && event.images.length > 0));
  const isLeft = position === "left";

  return (
    <div
      className={`relative grid grid-cols-1 gap-8 md:grid-cols-2 ${className}`}
    >
      {isLeft ? (
        <>
          <div className="md:pr-8 md:text-right">
            <TimelineCard event={event} canExpand={canExpand} align="right" />
          </div>
          <div className="hidden md:block" />
        </>
      ) : (
        <>
          <div className="hidden md:block" />
          <div className="md:pl-8">
            <TimelineCard event={event} canExpand={canExpand} align="left" />
          </div>
        </>
      )}

      <div className="absolute left-1/2 top-6 hidden size-4 -translate-x-1/2 rounded-full border-4 border-background bg-primary shadow-lg ring-2 ring-primary/20 md:block" />
    </div>
  );
}

function TimelineCard({
  event,
  canExpand,
  align,
}: {
  event: TimelineEvent;
  canExpand: boolean;
  align: "left" | "right";
}) {
  const [open, setOpen] = useState(false);
  const enterTimer = useRef<ReturnType<typeof setTimeout>>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout>>(null);

  const handleMouseEnter = useCallback(() => {
    if (!canExpand) return;
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
    enterTimer.current = setTimeout(() => setOpen(true), 300);
  }, [canExpand]);

  const handleMouseLeave = useCallback(() => {
    if (enterTimer.current) {
      clearTimeout(enterTimer.current);
      enterTimer.current = null;
    }
    leaveTimer.current = setTimeout(() => setOpen(false), 200);
  }, []);

  return (
    <CollapsibleWithContext
      open={open}
      onOpenChange={setOpen}
      disabled={!canExpand}
      asChild
    >
      <article
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group relative overflow-hidden rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-border hover:bg-card hover:shadow-lg"
      >
        <CollapsibleTrigger className="block w-full text-left transition-colors select-none">
          <div className="flex flex-col gap-3 p-5">
            <div className="flex items-start justify-between gap-4">
              <div
                className={`flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary ring-2 ring-primary/20 ${align === "right" ? "order-2" : ""}`}
                aria-hidden
              >
                <Icons.award className="size-6" />
              </div>

              <div className={`flex-1 ${align === "right" ? "text-right" : ""}`}>
                <h3 className="mb-2 leading-tight font-semibold text-balance">
                  {event.title}
                </h3>

                <div className="mb-2 text-sm text-muted-foreground">
                  {event.subtitle}
                </div>
              </div>

              {canExpand && (
                <div
                  className={`shrink-0 pt-1 text-muted-foreground [&_svg]:size-4 ${align === "right" ? "order-1" : ""}`}
                  aria-hidden
                >
                  <CollapsibleChevronsIcon />
                </div>
              )}
            </div>

            <div
              className={`flex flex-col gap-2 text-sm ${align === "right" ? "items-end" : "items-start"}`}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 font-mono text-xs">
                {event.date}
              </div>
            </div>
          </div>
        </CollapsibleTrigger>

        {canExpand && (
          <CollapsibleContent className="overflow-hidden duration-300 data-[state=closed]:animate-collapsible-fade-up data-[state=open]:animate-collapsible-fade-down">
            <div className="space-y-4 border-t border-border/50 bg-muted/20 p-5">
              {event.images && event.images.length > 0 && (
                <ImageCarousel images={event.images} />
              )}

              {event.description && (
                <Prose className="text-sm">
                  <Suspense fallback={<div>Loading...</div>}>
                    <Markdown>{event.description}</Markdown>
                  </Suspense>
                </Prose>
              )}

              {event.githubURL && (
                <a
                  className="inline-flex items-center gap-2 text-sm text-primary transition-colors hover:text-primary/80 hover:underline"
                  href={event.githubURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>View on GitHub</span>
                  <ExternalLinkIcon className="size-4" aria-hidden />
                </a>
              )}
            </div>
          </CollapsibleContent>
        )}
      </article>
    </CollapsibleWithContext>
  );
}
