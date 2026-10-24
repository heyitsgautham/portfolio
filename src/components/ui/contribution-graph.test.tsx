import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { Activity } from "./contribution-graph";
import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
} from "./contribution-graph";

const data: Activity[] = [
  { date: "2024-01-07", count: 2, level: 1 },
  { date: "2024-01-08", count: 0, level: 0 },
  { date: "2024-01-10", count: 5, level: 3 },
];

function Graph({ activities = data }: { activities?: Activity[] }) {
  return (
    <ContributionGraph data={activities} blockSize={10} blockMargin={2}>
      <ContributionGraphCalendar title="Test graph">
        {({ activity, dayIndex, weekIndex }) => (
          <ContributionGraphBlock
            activity={activity}
            dayIndex={dayIndex}
            weekIndex={weekIndex}
          />
        )}
      </ContributionGraphCalendar>
      <ContributionGraphFooter>
        <ContributionGraphTotalCount />
        <ContributionGraphLegend />
      </ContributionGraphFooter>
    </ContributionGraph>
  );
}

describe("ContributionGraph", () => {
  it("renders nothing when there is no data", () => {
    const { container } = render(<Graph activities={[]} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("draws one block per day, including filled gaps", () => {
    const { container } = render(<Graph />);

    const blocks = container.querySelectorAll("rect[data-date]");
    expect([...blocks].map((b) => b.getAttribute("data-date"))).toEqual([
      "2024-01-07",
      "2024-01-08",
      "2024-01-09",
      "2024-01-10",
    ]);
    expect(blocks[2]).toHaveAttribute("data-count", "0");
    expect(blocks[3]).toHaveAttribute("data-level", "3");
  });

  it("positions blocks by weekday row using size and margin", () => {
    const { container } = render(<Graph />);

    // 2024-01-10 is a Wednesday, row 3; the label row is fontSize 14 + 8.
    const block = container.querySelector('rect[data-date="2024-01-10"]');
    expect(block).toHaveAttribute("x", "0");
    expect(block).toHaveAttribute("y", String(22 + 12 * 3));
  });

  it("sums counts into the default total label", () => {
    render(<Graph />);

    expect(screen.getByText("7 activities in 2024")).toBeInTheDocument();
  });

  it("renders a legend swatch for every level from 0 to maxLevel", () => {
    render(<Graph />);

    expect(screen.getByText("Less")).toBeInTheDocument();
    expect(screen.getByText("More")).toBeInTheDocument();
    for (const level of [0, 1, 2, 3, 4]) {
      expect(screen.getByText(`${level} contributions`)).toBeInTheDocument();
    }
  });

  it("rejects an activity level above maxLevel", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() =>
      render(
        <Graph activities={[{ date: "2024-01-07", count: 9, level: 7 }]} />
      )
    ).toThrow(RangeError);
  });

  it("throws when a part is used outside ContributionGraph", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<ContributionGraphTotalCount />)).toThrow(
      "must be used within a ContributionGraph"
    );
  });
});
