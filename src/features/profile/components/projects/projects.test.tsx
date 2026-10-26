import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { PROJECTS } from "@/features/profile/data/projects";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn() }) }));

import { Projects } from "./index";

describe("Projects", () => {
  it("features the first three projects", () => {
    render(<Projects />);

    expect(
      screen
        .getAllByRole("heading", { level: 3 })
        .map((h) => h.textContent)
        .filter(Boolean)
    ).toEqual(PROJECTS.slice(0, 3).map((p) => p.title.split(" - ")[0]));
  });

  it("links to the full gallery with the total count", () => {
    render(<Projects />);

    expect(screen.getByText(`(${PROJECTS.length})`)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Show More" })).toHaveAttribute(
      "href",
      "/projects"
    );
  });
});
