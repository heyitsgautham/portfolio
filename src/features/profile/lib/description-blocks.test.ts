import { describe, expect, it } from "vitest";

import { EXPERIENCES } from "@/features/profile/data/experiences";

import { parseDescriptionBlocks } from "./description-blocks";

describe("parseDescriptionBlocks", () => {
  it("groups bullets under the heading before them", () => {
    expect(
      parseDescriptionBlocks(`**Backend**
- Built the API
- Wrote the tests
**Frontend**
- Shipped the dashboard`)
    ).toEqual([
      { type: "heading", text: "Backend" },
      { type: "bullets", items: [["Built the API"], ["Wrote the tests"]] },
      { type: "heading", text: "Frontend" },
      { type: "bullets", items: [["Shipped the dashboard"]] },
    ]);
  });

  it("keeps a wrapped line inside the bullet it continues", () => {
    expect(
      parseDescriptionBlocks(`- Cut p95 latency by 40%
  with Redis caching
- Second bullet`)
    ).toEqual([
      {
        type: "bullets",
        items: [
          ["Cut p95 latency by 40%", "with Redis caching"],
          ["Second bullet"],
        ],
      },
    ]);
  });

  it("ignores blank lines and surrounding whitespace", () => {
    expect(parseDescriptionBlocks("\n\n   - spaced out   \n\n")).toEqual([
      { type: "bullets", items: [["spaced out"]] },
    ]);
  });

  it("drops loose text that comes before any bullet", () => {
    expect(parseDescriptionBlocks("intro line\n- first")).toEqual([
      { type: "bullets", items: [["first"]] },
    ]);
  });

  it("treats bold text inside a line as plain bullet text", () => {
    expect(parseDescriptionBlocks("- uses **bold** inline")).toEqual([
      { type: "bullets", items: [["uses **bold** inline"]] },
    ]);
  });

  it("returns nothing for an empty description", () => {
    expect(parseDescriptionBlocks("")).toEqual([]);
  });

  it("finds at least one bullet in every real position description", () => {
    for (const position of EXPERIENCES.flatMap((e) => e.positions)) {
      if (!position.description) continue;
      const blocks = parseDescriptionBlocks(position.description);
      expect(
        blocks.some((b) => b.type === "bullets"),
        position.id
      ).toBe(true);
    }
  });
});
