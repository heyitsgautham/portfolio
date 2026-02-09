import { cn } from "@/lib/utils";

import { LogoResizeAnimation } from "./logo-resize-animation";

export function RedCoverGrid() {
  return (
    <div
      className={cn(
        "relative aspect-2/1 w-full overflow-hidden select-none",
        "bg-gradient-to-br from-primary/5 via-background to-muted/20",
        "screen-line-after after:-bottom-px"
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      <div className="relative z-10 flex size-full items-center justify-center text-foreground">
        <div className="h-16 w-32 sm:h-20 sm:w-40">
          <LogoResizeAnimation minWidth={104} maxWidth={160} />
        </div>
      </div>
    </div>
  );
}
