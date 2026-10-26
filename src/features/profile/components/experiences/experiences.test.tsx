import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EXPERIENCES } from "@/features/profile/data/experiences";

import { Experiences } from "./index";

describe("Experiences", () => {
  it("shows every company in data order with all its positions", () => {
    render(<Experiences />);

    expect(
      screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent)
    ).toEqual(EXPERIENCES.map((e) => e.companyName));
    for (const position of EXPERIENCES.flatMap((e) => e.positions)) {
      expect(
        screen.getByRole("heading", { level: 4, name: position.title })
      ).toBeInTheDocument();
    }
  });

  it("flags only current employers", () => {
    render(<Experiences />);

    expect(screen.queryAllByText("Current Employer")).toHaveLength(
      EXPERIENCES.filter((e) => e.isCurrentEmployer).length
    );
  });

  it("anchors the section for the nav", () => {
    const { container } = render(<Experiences />);

    expect(container.querySelector("section#experience")).not.toBeNull();
  });
});
