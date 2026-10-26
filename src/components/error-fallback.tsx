"use client";

import { RotateCcwIcon } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { reportError } from "@/lib/report-error";
import { cn } from "@/lib/utils";

export type ErrorFallbackProps = {
  error: Error & { digest?: string };
  /** Re-renders the segment that threw, from Next.js's error boundary. */
  reset: () => void;
  /** Names the boundary in the error report. */
  source: string;
  className?: string;
};

/**
 * Shared body for the app's error boundaries. Reports the error once per
 * error object and offers a retry, plus a way home when retrying keeps failing.
 */
export function ErrorFallback({
  error,
  reset,
  source,
  className,
}: ErrorFallbackProps) {
  useEffect(() => {
    reportError(error, { source });
  }, [error, source]);

  return (
    <div
      role="alert"
      className={cn(
        "flex min-h-[calc(100svh-5.5rem)] flex-col items-center justify-center px-4 text-center",
        className
      )}
    >
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        Something went wrong
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        This page hit an unexpected error. Try again, or head back home.
      </p>
      {error.digest && (
        <p className="mt-2 font-mono text-xs text-muted-foreground">
          Reference: {error.digest}
        </p>
      )}

      <div className="mt-8 flex gap-3">
        <Button size="lg" className="rounded-full px-6" onClick={reset}>
          <RotateCcwIcon className="mr-2 size-4" />
          Try again
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="rounded-full px-6"
          asChild
        >
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
}
