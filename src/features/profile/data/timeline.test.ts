import { existsSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { TIMELINE } from "./timeline";

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

describe("TIMELINE", () => {
  it("gives every event a unique id", () => {
    const ids = TIMELINE.map((event) => event.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("sorts on a real calendar date", () => {
    for (const event of TIMELINE) {
      expect(event.sortDate, event.id).toMatch(ISO_DATE);
      expect(Number.isNaN(Date.parse(event.sortDate)), event.id).toBe(false);
    }
  });

  it("only links to absolute https URLs", () => {
    for (const event of TIMELINE) {
      for (const url of [event.githubURL, event.externalURL]) {
        if (url) expect(new URL(url).protocol, event.id).toBe("https:");
      }
    }
  });

  it("shows only gallery images that exist in public/", () => {
    for (const image of TIMELINE.flatMap((event) => event.images ?? [])) {
      expect(existsSync(path.join(process.cwd(), "public", image)), image).toBe(
        true
      );
    }
  });
});
