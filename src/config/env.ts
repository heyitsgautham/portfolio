import { z } from "zod";

/** An optional absolute URL. Unset or empty falls back to the default. */
const urlWithDefault = (fallback: string) =>
  z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.url().default(fallback)
  );

const envSchema = z.object({
  APP_URL: urlWithDefault("https://gauthamkrishna.dev"),
  REGISTRY_URL: urlWithDefault("https://gauthamkrishna.dev/r"),
});

export type Env = z.infer<typeof envSchema>;

/**
 * Validates the server-side env vars the site reads.
 * Throws one error that names every invalid variable, so a bad value
 * fails the build with a clear message instead of producing broken URLs.
 */
export function parseEnv(source: Record<string, string | undefined>): Env {
  const result = envSchema.safeParse(source);

  if (!result.success) {
    const problems = result.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("; ");
    throw new Error(`Invalid environment variables. ${problems}`);
  }

  return result.data;
}

// Each variable is read by name so Next.js can inline it at build time.
export const env = parseEnv({
  APP_URL: process.env.APP_URL,
  REGISTRY_URL: process.env.REGISTRY_URL,
});
