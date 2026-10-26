import { describe, expect, it } from "vitest";

import {
  domainOgParamsSchema,
  parseSearchParams,
  simpleOgParamsSchema,
} from "./og-params";

const request = (query: string) => new Request(`https://site.dev/og${query}`);

describe("parseSearchParams", () => {
  it("returns the parsed title", () => {
    expect(
      parseSearchParams(
        request("?title=Flip%20Sentences"),
        simpleOgParamsSchema
      )
    ).toEqual({ data: { title: "Flip Sentences" } });
  });

  it.each([
    ["a missing title", ""],
    ["a blank title", "?title=%20%20"],
    ["a title over 120 characters", `?title=${"x".repeat(121)}`],
  ])("answers 400 for %s", async (_, query) => {
    const result = parseSearchParams(request(query), simpleOgParamsSchema);

    expect("error" in result).toBe(true);
    if (!("error" in result)) return;
    expect(result.error.status).toBe(400);
    expect(await result.error.json()).toMatchObject({
      error: "Invalid query parameters",
      problems: [expect.stringMatching(/^title: /)],
    });
  });

  it("reads sale=true as for sale and anything else as not", () => {
    const parse = (query: string) =>
      parseSearchParams(request(query), domainOgParamsSchema);

    expect(parse("?domain=gk.dev&sale=true")).toEqual({
      data: { domain: "gk.dev", sale: true },
    });
    expect(parse("?domain=gk.dev&sale=yes")).toEqual({
      data: { domain: "gk.dev", sale: false },
    });
    expect(parse("?domain=gk.dev")).toEqual({
      data: { domain: "gk.dev", sale: false },
    });
  });

  it("requires a domain", () => {
    expect(
      "error" in parseSearchParams(request("?sale=true"), domainOgParamsSchema)
    ).toBe(true);
  });
});
