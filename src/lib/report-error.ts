import { createLogger, type LogContext } from "@/lib/logger";

const logger = createLogger("app");

/**
 * Single reporting point for errors the UI recovers from or shows a
 * fallback for: error boundaries and catch blocks in client components.
 * Entries carry the source that caught the error, so one search over the
 * logs finds every failure of one feature.
 */
export function reportError(
  error: unknown,
  { source, ...context }: LogContext & { source: string }
) {
  logger.error(`Unhandled error in ${source}`, {
    source,
    ...context,
    error,
  });
}
