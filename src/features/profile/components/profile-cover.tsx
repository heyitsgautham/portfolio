import { BrandContextMenu } from "@/components/brand-context-menu";
import { RedMark } from "@/components/red-mark";
import { cn } from "@/lib/utils";

export function ProfileCover() {
  return (
    <BrandContextMenu>
      <div
        className={cn(
          "relative aspect-4/1 select-none sm:aspect-5/1 lg:aspect-6/1",
          "flex items-center justify-center overflow-hidden",
          "bg-gradient-to-br from-primary/5 via-background to-muted/20",
          "screen-line-after after:-bottom-px"
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <RedMark
          id="js-cover-mark"
          className="relative z-10 h-28 w-80 text-foreground sm:h-36 sm:w-96 lg:h-40 lg:w-[28rem]"
        />
      </div>
    </BrandContextMenu>
  );
}
