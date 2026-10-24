import { describe, expect, it } from "vitest";

import type { Activity } from "./contribution-graph-utils";
import {
  fillHoles,
  getMonthLabels,
  groupByWeeks,
} from "./contribution-graph-utils";

const activity = (date: string, count = 1, level = 1): Activity => ({
  date,
  count,
  level,
});

/** Builds one activity per day for `days` days starting at `start` (UTC). */
const days = (start: string, total: number): Activity[] =>
  Array.from({ length: total }, (_, i) => {
    const date = new Date(`${start}T00:00:00Z`);
    date.setUTCDate(date.getUTCDate() + i);
    return activity(date.toISOString().slice(0, 10));
  });

describe("fillHoles", () => {
  it("returns an empty array for no activities", () => {
    expect(fillHoles([])).toEqual([]);
  });

  it("adds a zero-count day for every missing date in the range", () => {
    const result = fillHoles([
      activity("2024-01-01", 3, 2),
      activity("2024-01-04", 1, 1),
    ]);

    expect(result.map((a) => a.date)).toEqual([
      "2024-01-01",
      "2024-01-02",
      "2024-01-03",
      "2024-01-04",
    ]);
    expect(result[1]).toEqual({ date: "2024-01-02", count: 0, level: 0 });
    expect(result[2]).toEqual({ date: "2024-01-03", count: 0, level: 0 });
  });

  it("sorts unordered input and keeps the original activity objects", () => {
    const late = activity("2024-03-02", 5, 4);
    const early = activity("2024-03-01", 2, 1);

    const result = fillHoles([late, early]);

    expect(result).toHaveLength(2);
    expect(result[0]).toBe(early);
    expect(result[1]).toBe(late);
  });
});

describe("groupByWeeks", () => {
  it("returns no weeks for no activities", () => {
    expect(groupByWeeks([])).toEqual([]);
  });

  it("pads the first week so it starts on Sunday by default", () => {
    // 2024-01-03 is a Wednesday, so Sunday to Tuesday are padding.
    const weeks = groupByWeeks(days("2024-01-03", 4));

    expect(weeks).toHaveLength(1);
    expect(weeks[0].slice(0, 3)).toEqual([undefined, undefined, undefined]);
    expect(weeks[0][3]?.date).toBe("2024-01-03");
    expect(weeks[0][6]?.date).toBe("2024-01-06");
  });

  it("honours a Monday week start", () => {
    const weeks = groupByWeeks(days("2024-01-03", 4), 1);

    expect(weeks[0].slice(0, 2)).toEqual([undefined, undefined]);
    expect(weeks[0][2]?.date).toBe("2024-01-03");
  });

  it("adds no padding when the first day already starts the week", () => {
    // 2024-01-07 is a Sunday.
    const weeks = groupByWeeks(days("2024-01-07", 14));

    expect(weeks).toHaveLength(2);
    expect(weeks[0][0]?.date).toBe("2024-01-07");
    expect(weeks[1][6]?.date).toBe("2024-01-20");
  });

  it("leaves the last week short instead of padding the end", () => {
    const weeks = groupByWeeks(days("2024-01-07", 9));

    expect(weeks).toHaveLength(2);
    expect(weeks[1]).toHaveLength(2);
  });

  it("fills gaps before grouping", () => {
    const weeks = groupByWeeks([
      activity("2024-01-07"),
      activity("2024-01-13"),
    ]);

    expect(weeks[0].map((a) => a?.count)).toEqual([1, 0, 0, 0, 0, 0, 1]);
  });
});

describe("getMonthLabels", () => {
  it("labels each month once, at the first week that starts in it", () => {
    // Sunday 2024-01-07 to Saturday 2024-04-06, 13 full weeks.
    const weeks = groupByWeeks(days("2024-01-07", 91));

    expect(getMonthLabels(weeks)).toEqual([
      { weekIndex: 0, label: "Jan" },
      { weekIndex: 4, label: "Feb" },
      { weekIndex: 8, label: "Mar" },
    ]);
  });

  it("drops a first label that is less than three weeks before the next", () => {
    // Starts on Sunday 2024-01-21, so January only owns two weeks.
    const weeks = groupByWeeks(days("2024-01-21", 63));

    expect(getMonthLabels(weeks).map((l) => l.label)).toEqual(["Feb", "Mar"]);
  });

  it("drops a last label with fewer than three weeks left", () => {
    // Ends on Saturday 2024-03-09, so March only owns two weeks.
    const weeks = groupByWeeks(days("2024-01-07", 63));

    expect(getMonthLabels(weeks).map((l) => l.label)).toEqual(["Jan", "Feb"]);
  });

  it("uses the month names it is given", () => {
    const weeks = groupByWeeks(days("2024-01-07", 91));
    const names = [
      "Th1",
      "Th2",
      "Th3",
      "Th4",
      "Th5",
      "Th6",
      "Th7",
      "Th8",
      "Th9",
      "Th10",
      "Th11",
      "Th12",
    ];

    expect(getMonthLabels(weeks, names).map((l) => l.label)).toEqual([
      "Th1",
      "Th2",
      "Th3",
    ]);
  });

  it("throws when a month name is missing", () => {
    const weeks = groupByWeeks(days("2024-01-07", 91));

    expect(() => getMonthLabels(weeks, ["Jan"])).toThrow(
      "undefined month label"
    );
  });
});
