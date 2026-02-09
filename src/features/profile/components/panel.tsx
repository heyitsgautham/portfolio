import { ChevronDownIcon } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

function Panel({
  className,
  collapsible = false,
  ...props
}: React.ComponentProps<"section"> & { collapsible?: boolean }) {
  if (collapsible) {
    return (
      <Collapsible asChild defaultOpen>
        <section
          data-slot="panel"
          className={cn("screen-line-before screen-line-after", className)}
          {...props}
        />
      </Collapsible>
    );
  }

  return (
    <section
      data-slot="panel"
      className={cn("screen-line-before screen-line-after", className)}
      {...props}
    />
  );
}

function PanelHeader({
  className,
  collapsible,
  children,
  ...props
}: React.ComponentProps<"div"> & { collapsible?: boolean }) {
  return (
    <div
      data-slot="panel-header"
      className={cn(
        "screen-line-after flex items-center justify-between px-6 py-6",
        className
      )}
      {...props}
    >
      {children}
      {collapsible && (
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="ml-auto">
            <ChevronDownIcon className="transition-transform data-[state=open]:rotate-180" />
          </Button>
        </CollapsibleTrigger>
      )}
    </div>
  );
}

function PanelTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="panel-title"
      className={cn("text-4xl font-bold md:text-5xl", className)}
      {...props}
    />
  );
}

function PanelContent({
  className,
  collapsible,
  ...props
}: React.ComponentProps<"div"> & { collapsible?: boolean }) {
  if (collapsible) {
    return (
      <CollapsibleContent>
        <div
          data-slot="panel-body"
          className={cn("px-6 py-8", className)}
          {...props}
        />
      </CollapsibleContent>
    );
  }

  return (
    <div
      data-slot="panel-body"
      className={cn("px-6 py-8", className)}
      {...props}
    />
  );
}

export { Panel, PanelContent, PanelHeader, PanelTitle };
