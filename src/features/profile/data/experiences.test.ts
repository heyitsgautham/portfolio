import { existsSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { EXPERIENCES } from "./experiences";

const PERIOD = /^(\d{2}\.)?\d{4}$/;

/** "09.2025" -> 2025.75, "2024" -> 2024 */
const toYear = (value: string) => {
  const [month, year] = value.includes(".") ? value.split(".") : ["1", value];
  return Number(year) + (Number(month) - 1) / 12;
};

const positions = EXPERIENCES.flatMap((e) => e.positions);

describe("EXPERIENCES", () => {
  it("gives every company and position a unique id", () => {
    const ids = [
      ...EXPERIENCES.map((e) => e.id),
      ...positions.map((p) => p.id),
    ];
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("writes dates as MM.YYYY or YYYY, as the UI expects", () => {
    for (const { id, employmentPeriod } of positions) {
      expect(employmentPeriod.start, id).toMatch(PERIOD);
      if (employmentPeriod.end)
        expect(employmentPeriod.end, id).toMatch(PERIOD);
    }
  });

  it("never ends a position before it starts", () => {
    for (const { id, employmentPeriod } of positions) {
      if (employmentPeriod.end) {
        expect(toYear(employmentPeriod.end), id).toBeGreaterThanOrEqual(
          toYear(employmentPeriod.start)
        );
      }
    }
  });

  it("points every company logo at a file in public/", () => {
    for (const { id, companyLogo } of EXPERIENCES) {
      if (companyLogo?.startsWith("/")) {
        expect(
          existsSync(path.join(process.cwd(), "public", companyLogo)),
          id
        ).toBe(true);
      }
    }
  });
});
