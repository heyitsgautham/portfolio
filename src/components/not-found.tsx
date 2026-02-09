import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function NotFound({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-[calc(100svh-5.5rem)] flex-col items-center justify-center overflow-hidden",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-20">
        <div className="h-[500px] w-[500px] rounded-full bg-primary/20 blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <h1 className="text-[10rem] font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/20 sm:text-[12rem]">
          404
        </h1>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
          Lost in the void?
        </h2>
        <p className="mt-4 max-w-md text-muted-foreground">
          The page you are looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        <Button variant="default" size="lg" asChild className="mt-8 rounded-full px-8">
          <Link href="/">
            Return Home
            <ArrowRightIcon className="ml-2 size-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
