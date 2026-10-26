import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { type ExperienceItemType, WorkExperience } from "./work-experience";

const experiences: ExperienceItemType[] = [
  {
    id: "acme",
    companyName: "Acme",
    companyLogo: "/acme.png",
    isCurrentEmployer: true,
    positions: [
      {
        id: "lead",
        title: "Tech Lead",
        employmentPeriod: "2024 - Present",
        employmentType: "Full-time",
        description: "Led the **platform** team.",
        skills: ["Go", "Kubernetes"],
        isExpanded: true,
      },
      {
        id: "dev",
        title: "Developer",
        employmentPeriod: "2022 - 2024",
        description: "Built things.",
      },
    ],
  },
  {
    id: "beta",
    companyName: "Beta",
    positions: [
      { id: "intern", title: "Intern", employmentPeriod: "2021", icon: "code" },
    ],
  },
];

describe("WorkExperience", () => {
  it("lists each company with its positions", () => {
    render(<WorkExperience experiences={experiences} />);

    expect(
      screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent)
    ).toEqual(["Acme", "Beta"]);
    expect(
      screen.getAllByRole("heading", { level: 4 }).map((h) => h.textContent)
    ).toEqual(["Tech Lead", "Developer", "Intern"]);
  });

  it("flags only the current employer", () => {
    render(<WorkExperience experiences={experiences} />);

    expect(screen.getAllByText("Current Employer")).toHaveLength(1);
  });

  it("shows the company logo when there is one", () => {
    render(<WorkExperience experiences={experiences} />);

    expect(screen.getByAltText("Acme")).toBeInTheDocument();
    expect(screen.queryByAltText("Beta")).toBeNull();
  });

  it("shows the type and period of each position", () => {
    render(<WorkExperience experiences={experiences} />);

    expect(screen.getByText("Full-time")).toBeInTheDocument();
    expect(screen.getByText("2024 - Present")).toBeInTheDocument();
  });

  it("opens expanded positions with markdown and skills", () => {
    render(<WorkExperience experiences={experiences} />);

    expect(screen.getByText("platform").tagName).toBe("STRONG");
    expect(screen.getByText("Kubernetes")).toBeInTheDocument();
    expect(screen.queryByText("Built things.")).toBeNull();
  });

  it("expands a collapsed position on click", async () => {
    const user = userEvent.setup();
    render(<WorkExperience experiences={experiences} />);

    await user.click(screen.getByRole("heading", { name: "Developer" }));

    expect(screen.getByText("Built things.")).toBeInTheDocument();
  });
});
