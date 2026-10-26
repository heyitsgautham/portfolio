"use client";

import "@/styles/globals.css";

import { ErrorFallback } from "@/components/error-fallback";
import { fontMono, fontSans } from "@/lib/fonts";

/** Replaces the root layout when it, or anything above a nested boundary, throws. */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontMono.variable}`}>
      <body className="bg-background text-foreground antialiased">
        <ErrorFallback
          error={error}
          reset={reset}
          source="global-error"
          className="min-h-screen"
        />
      </body>
    </html>
  );
}
