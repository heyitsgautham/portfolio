import { act, render, screen } from "@testing-library/react";
import { Suspense } from "react";
import { describe, expect, it } from "vitest";

import type { Activity } from "@/components/ui/contribution-graph";

import { GitHubContributionFallback, GitHubContributionGraph } from "./graph";

const activity = (date: string, count: number, level: number): Activity => ({
  date,
  count,
  level,
});

async function renderGraph(data: Activity[]) {
  await act(async () => {
    render(
      <Suspense fallback={<GitHubContributionFallback />}>
        <GitHubContributionGraph contributions={Promise.resolve(data)} />
      </Suspense>
    );
  });
}

describe("GitHubContributionGraph", () => {
  it("explains an empty graph instead of drawing one", async () => {
    await renderGraph([]);

    expect(
      screen.getByText("Unable to load contributions right now.")
    ).toBeInTheDocument();
  });

  it("totals the year's contributions and links the GitHub profile", async () => {
    await renderGraph([
      activity("2025-01-01", 1200, 4),
      activity("2025-01-02", 3, 1),
      activity("2025-01-03", 0, 0),
    ]);

    expect(screen.getByText(/1,203 contributions in 2025/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/heyitsgautham"
    );
  });

  it("draws one block per day", async () => {
    await renderGraph([
      activity("2025-01-01", 1, 1),
      activity("2025-01-02", 2, 2),
    ]);

    expect(
      [...document.querySelectorAll("svg rect[data-date]")].map((r) =>
        r.getAttribute("data-date")
      )
    ).toEqual(["2025-01-01", "2025-01-02"]);
  });
});
