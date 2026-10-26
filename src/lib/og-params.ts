import { z } from "zod";

const text = (max: number) =>
  z
    .string()
    .max(max)
    .refine((value) => value.trim().length > 0, "must not be blank");

/** Query string of /og/simple, which draws one centred title. */
export const simpleOgParamsSchema = z.object({
  title: text(120),
});

/** Query string of /og/domain, which draws a parked-domain card. */
export const domainOgParamsSchema = z.object({
  domain: text(100),
  /** Only the exact string "true" marks the domain as for sale. */
  sale: z
    .string()
    .optional()
    .transform((value) => value === "true"),
});

/**
 * Validates a request's query string against a schema.
 * Returns the parsed params, or a 400 response naming each bad parameter.
 */
export function parseSearchParams<T extends z.ZodType>(
  request: Request,
  schema: T
): { data: z.infer<T> } | { error: Response } {
  const params = Object.fromEntries(new URL(request.url).searchParams);
  const result = schema.safeParse(params);

  if (result.success) {
    return { data: result.data };
  }

  const problems = result.error.issues.map(
    (issue) => `${issue.path.join(".") || "query"}: ${issue.message}`
  );
  return {
    error: Response.json(
      { error: "Invalid query parameters", problems },
      { status: 400 }
    ),
  };
}
