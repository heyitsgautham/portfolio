import { describe, expect, it } from "vitest";

import { PROJECTS } from "@/features/profile/data/projects";

import { formatProjectDate } from "./project-date";

describe("formatProjectDate", () => {
  it("spells out the month and pins the day to the first", () => {
    expect(formatProjectDate("09.2025")).toBe("September 01, 2025");
  });

  it("handles both ends of the year", () => {
    expect(formatProjectDate("01.2026")).toBe("January 01, 2026");
    expect(formatProjectDate("12.2024")).toBe("December 01, 2024");
  });

  it("formats every real project start date without gaps", () => {
    for (const { slug, period } of PROJECTS) {
      expect(formatProjectDate(period.start), slug).toMatch(
        /^[A-Z][a-z]+ 01, \d{4}$/
      );
    }
  });
});
