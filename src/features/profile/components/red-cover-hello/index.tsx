import { cn } from "@/lib/utils";

import { Hello } from "./hello";

export function RedCoverHello() {
  return (
    <div
      className={cn(
        "relative aspect-2/1 select-none md:aspect-3/1 lg:aspect-4/1",
        "overflow-hidden bg-gradient-to-br from-primary/5 via-background to-muted/20",
        "screen-line-after after:-bottom-px"
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      <div className="relative z-10 flex size-full items-center justify-center">
        <Hello />
      </div>
    </div>
  );
}
