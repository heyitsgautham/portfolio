import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TECH_STACK } from "@/features/profile/data/tech-stack";

import TechStackPage, { metadata } from "./page";

const nameOf = (tech: (typeof TECH_STACK)[number]) =>
  tech.displayName || tech.title;

describe("TechStackPage", () => {
  it("shows the four categories in a fixed order", () => {
    render(<TechStackPage />);

    expect(
      screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent)
    ).toEqual([
      "Languages",
      "AI & Data",
      "App Development",
      "Backend & Infrastructure",
    ]);
  });

  it("lists every technology, so none falls outside a known category", () => {
    render(<TechStackPage />);

    for (const tech of TECH_STACK) {
      expect(
        screen.getByText(nameOf(tech)).closest("a"),
        tech.key
      ).toHaveAttribute("href", tech.href);
    }
  });

  it("files each technology under its first category", () => {
    render(<TechStackPage />);

    for (const tech of TECH_STACK) {
      const section = screen
        .getByRole("heading", { level: 2, name: tech.categories[0] })
        .closest("div")!.parentElement!;
      expect(
        within(section).getByText(nameOf(tech)),
        tech.key
      ).toBeInTheDocument();
    }
  });

  it("sets a canonical URL for the page", () => {
    expect(metadata.alternates?.canonical).toBe("/tech-stack");
  });
});
