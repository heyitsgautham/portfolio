import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import type { ExperiencePosition } from "@/features/profile/types/experiences";

import { ExperiencePositionItem } from "./experience-position-item";

const position: ExperiencePosition = {
  id: "swe",
  title: "Software Engineer Intern",
  employmentPeriod: { start: "09.2025", end: "11.2025" },
  employmentType: "Internship",
  description: `**Analytics**
- Built a trend engine
  with sliding windows
- Added Redis caching`,
  skills: ["Python", "Some Unknown Tool"],
  isExpanded: true,
};

describe("ExperiencePositionItem", () => {
  it("shows the title, type and employment period", () => {
    render(<ExperiencePositionItem position={position} />);

    expect(
      screen.getByRole("heading", { name: "Software Engineer Intern" })
    ).toBeInTheDocument();
    expect(screen.getByText("Internship")).toBeInTheDocument();
    expect(screen.getByText("09.2025")).toBeInTheDocument();
    expect(screen.getByText("11.2025")).toBeInTheDocument();
  });

  it("reads an ongoing role as Present to screen readers", () => {
    render(
      <ExperiencePositionItem
        position={{ ...position, employmentPeriod: { start: "01.2026" } }}
      />
    );

    expect(screen.getByText("Present")).toHaveClass("sr-only");
  });

  it("renders description headings and bullets with wrapped lines", () => {
    render(<ExperiencePositionItem position={position} />);

    expect(screen.getByText("Analytics").tagName).toBe("P");
    const items = screen.getAllByRole("listitem");
    expect(items[0]).toHaveTextContent(
      "Built a trend enginewith sliding windows"
    );
    expect(items[0].querySelectorAll("br")).toHaveLength(1);
    expect(items[1]).toHaveTextContent("Added Redis caching");
  });

  it("tags each skill, linking known ones to their website", () => {
    render(<ExperiencePositionItem position={position} />);

    const python = screen.getByText("Python").closest("li")!;
    expect(within(python).getByRole("link")).toHaveAttribute(
      "href",
      "https://www.python.org/"
    );
    const unknown = screen.getByText("Some Unknown Tool").closest("li")!;
    expect(within(unknown).queryByRole("link")).toBeNull();
  });

  it("starts collapsed unless marked expanded, and toggles on click", async () => {
    const user = userEvent.setup();
    render(
      <ExperiencePositionItem position={{ ...position, isExpanded: false }} />
    );

    expect(screen.queryByText("Added Redis caching")).toBeNull();
    await user.click(screen.getByRole("button"));
    expect(screen.getByText("Added Redis caching")).toBeInTheDocument();
  });
});
