import { describe, expect, it, vi } from "vitest";

import { reportError } from "./report-error";

describe("reportError", () => {
  it("logs one structured error entry naming its source", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});

    reportError(new Error("fetch failed"), {
      source: "contact-form",
      status: 502,
    });

    expect(error).toHaveBeenCalledTimes(1);
    const entry = JSON.parse(error.mock.calls[0][0] as string);
    expect(entry).toMatchObject({
      level: "error",
      scope: "app",
      message: "Unhandled error in contact-form",
      context: { source: "contact-form", status: 502 },
      error: { name: "Error", message: "fetch failed" },
    });
  });

  it("keeps the digest Next.js attaches to server errors", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});

    reportError(Object.assign(new Error("render"), { digest: "abc" }), {
      source: "global-error",
    });

    expect(JSON.parse(error.mock.calls[0][0] as string).error.digest).toBe(
      "abc"
    );
  });
});
