"use client";

import { ErrorFallback } from "@/components/error-fallback";

/** Keeps the site header and footer when a page under (app) throws. */
export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorFallback error={error} reset={reset} source="app-page" />;
}
