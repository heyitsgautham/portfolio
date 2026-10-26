import { existsSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { EDUCATION } from "./education";

describe("EDUCATION", () => {
  it("gives every entry a unique id", () => {
    const ids = EDUCATION.map((entry) => entry.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("writes each period as a year range or an ongoing one", () => {
    for (const entry of EDUCATION) {
      expect(entry.period, entry.id).toMatch(/^\d{4} to (\d{4}|Present)$/);
    }
  });

  it("points every logo at a file in public/", () => {
    for (const entry of EDUCATION) {
      if (entry.logo) {
        expect(
          existsSync(path.join(process.cwd(), "public", entry.logo)),
          entry.logo
        ).toBe(true);
      }
    }
  });

  it("links each institution over https", () => {
    for (const entry of EDUCATION) {
      if (entry.referenceLink) {
        expect(new URL(entry.referenceLink).protocol, entry.id).toBe("https:");
      }
    }
  });
});
