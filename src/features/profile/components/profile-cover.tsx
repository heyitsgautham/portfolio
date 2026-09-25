import { BrandContextMenu } from "@/components/brand-context-menu";
import { GKMark } from "@/components/gk-mark";
import { cn } from "@/lib/utils";

export function ProfileCover() {
  return (
    <BrandContextMenu>
      <div
        className={cn(
          "relative h-24 select-none sm:h-36 lg:h-40",
          "flex items-center justify-center overflow-hidden",
          "bg-gradient-to-br from-primary/5 via-background to-muted/20",
          "screen-line-after after:-bottom-px"
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <GKMark
          id="js-cover-mark"
          className="relative z-10 h-20 w-56 text-foreground sm:h-28 sm:w-80 lg:h-32 lg:w-96"
        />
      </div>
    </BrandContextMenu>
  );
}
