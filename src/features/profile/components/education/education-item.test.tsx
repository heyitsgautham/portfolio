import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { Education } from "@/features/profile/types/education";

import { EducationItem } from "./education-item";

const education: Education = {
  id: "iitm",
  degree: "BS, Data Science",
  institution: "Indian Institute of Technology, Madras",
  period: "2023 to 2027",
  location: "Chennai, India",
  achievements: "Grade: 9.1",
  logo: "/images/education/iitm_logo.webp",
};

describe("EducationItem", () => {
  it("shows the degree, institution, period, location and grade", () => {
    render(<EducationItem education={education} />);

    expect(
      screen.getByRole("heading", { name: "BS, Data Science" })
    ).toBeInTheDocument();
    for (const text of [
      education.institution,
      "2023 to 2027",
      "Chennai, India",
      "Grade: 9.1",
    ]) {
      expect(screen.getByText(text)).toBeInTheDocument();
    }
  });

  it("shows the institution logo when there is one", () => {
    render(<EducationItem education={education} />);

    expect(
      screen.getByAltText(`${education.institution} logo`)
    ).toBeInTheDocument();
  });

  it("falls back to the institution's initial without a logo", () => {
    const { container } = render(
      <EducationItem education={{ ...education, logo: undefined }} />
    );

    expect(container.querySelector("img")).toBeNull();
    expect(screen.getByText("I")).toBeInTheDocument();
  });

  it("leaves out location and achievements when missing", () => {
    render(
      <EducationItem
        education={{
          ...education,
          location: undefined,
          achievements: undefined,
        }}
      />
    );

    expect(screen.queryByText("Chennai, India")).toBeNull();
    expect(screen.queryByText("Grade: 9.1")).toBeNull();
  });
});
