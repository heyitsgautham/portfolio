import { describe, expect, it } from "vitest";

import { cn } from "./utils";

describe("cn", () => {
  it("joins plain class names with a single space", () => {
    expect(cn("flex", "items-center")).toBe("flex items-center");
  });

  it("drops falsy values", () => {
    expect(cn("flex", false, null, undefined, 0, "", "gap-2")).toBe(
      "flex gap-2"
    );
  });

  it("keeps keys of a conditional object whose value is truthy", () => {
    expect(cn({ hidden: false, block: true }, ["text-sm"])).toBe(
      "block text-sm"
    );
  });

  it("lets a later Tailwind utility win over a conflicting earlier one", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
    expect(cn("text-red-500", "text-zinc-950")).toBe("text-zinc-950");
  });

  it("keeps utilities that only look similar but do not conflict", () => {
    expect(cn("text-sm", "text-red-500")).toBe("text-sm text-red-500");
  });
});
