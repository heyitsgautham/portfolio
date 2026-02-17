import { cn } from "@/lib/utils";

export function SiteFooter() {
  return (
    <footer className="max-w-screen overflow-x-hidden px-2">
      <div className="mx-auto border-x border-edge md:max-w-3xl">
        <div
          className={cn(
            "flex w-full",
            "bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] [--pattern-foreground:var(--color-edge)]/56"
          )}
        >
          <div className="flex w-full items-center justify-between border-x border-edge bg-background px-4 py-3">
            <span className="font-mono text-xs tracking-wider text-muted-foreground">
              Crafted with pixels &amp; logic
            </span>
            <span className="font-mono text-xs text-muted-foreground">
              &copy; 2026 Gautham Krishna. All rights reserved.
            </span>
          </div>
        </div>
      </div>
      <div className="pb-[env(safe-area-inset-bottom,0px)]">
        <div className="flex h-2" />
      </div>
    </footer>
  );
}
