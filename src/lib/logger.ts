/**
 * Structured logger for server routes, build-time plugins and client code.
 *
 * Every entry is one JSON line with a level, scope, message and timestamp,
 * so Vercel's log drains and the browser console show the same shape.
 */
export type LogLevel = "debug" | "info" | "warn" | "error";

export type LogContext = Record<string, unknown>;

export type LogEntry = {
  level: LogLevel;
  scope: string;
  message: string;
  time: string;
  context?: LogContext;
  error?: SerializedError;
};

export type SerializedError = {
  name: string;
  message: string;
  stack?: string;
  digest?: string;
};

export type LogSink = Pick<Console, LogLevel>;

export type Logger = Record<
  LogLevel,
  (message: string, context?: LogContext & { error?: unknown }) => void
>;

const LEVEL_ORDER: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

export function defaultMinLevel(
  nodeEnv: string | undefined = process.env.NODE_ENV
): LogLevel {
  return nodeEnv === "production" ? "info" : "debug";
}

/** Turns any thrown value into a plain object that survives JSON.stringify. */
export function serializeError(error: unknown): SerializedError {
  if (error instanceof Error) {
    const digest = (error as Error & { digest?: unknown }).digest;
    return {
      name: error.name,
      message: error.message,
      ...(error.stack && { stack: error.stack }),
      ...(typeof digest === "string" && { digest }),
    };
  }

  return {
    name: "NonError",
    message: typeof error === "string" ? error : safeStringify(error),
  };
}

function safeStringify(value: unknown) {
  try {
    return JSON.stringify(value) ?? String(value);
  } catch {
    return String(value);
  }
}

export function createLogger(
  scope: string,
  {
    minLevel = defaultMinLevel(),
    sink = console,
    now = () => new Date(),
  }: { minLevel?: LogLevel; sink?: LogSink; now?: () => Date } = {}
): Logger {
  const write =
    (level: LogLevel) =>
    (message: string, context: LogContext & { error?: unknown } = {}) => {
      if (LEVEL_ORDER[level] < LEVEL_ORDER[minLevel]) return;

      const { error, ...rest } = context;
      const entry: LogEntry = {
        level,
        scope,
        message,
        time: now().toISOString(),
        ...(Object.keys(rest).length > 0 && { context: rest }),
        ...(error !== undefined && { error: serializeError(error) }),
      };

      sink[level](safeStringify(entry));
    };

  return {
    debug: write("debug"),
    info: write("info"),
    warn: write("warn"),
    error: write("error"),
  };
}
