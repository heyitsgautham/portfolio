import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TIMELINE } from "@/features/profile/data/timeline";

import { Timeline } from "./index";

describe("Timeline", () => {
  it("lists events newest first by their sort date", () => {
    render(<Timeline />);

    const expected = [...TIMELINE]
      .sort((a, b) => b.sortDate.localeCompare(a.sortDate))
      .map((event) => event.title);
    expect(
      screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent)
    ).toEqual(expected);
  });

  it("alternates cards between the left and right of the line", () => {
    render(<Timeline />);

    const sides = screen
      .getAllByRole("article")
      .map((card) =>
        card.parentElement!.className.includes("md:text-right") ? "L" : "R"
      );
    expect(sides).toEqual(sides.map((_, i) => (i % 2 === 0 ? "L" : "R")));
  });

  it("shows the event count in the title", () => {
    render(<Timeline />);

    expect(screen.getByText(`(${TIMELINE.length})`)).toBeInTheDocument();
  });
});
