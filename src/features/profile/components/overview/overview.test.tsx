import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { USER } from "@/features/profile/data/user";

import { Overview } from "./index";

describe("Overview", () => {
  it("lists each job with its company link", () => {
    render(<Overview />);

    for (const job of USER.jobs) {
      expect(
        screen.getByRole("link", { name: job.company })
      ).toBeInTheDocument();
    }
  });

  it("shows the location, pronouns and a short website link", () => {
    render(<Overview />);

    expect(screen.getByText(USER.address)).toBeInTheDocument();
    expect(screen.getByText(USER.pronouns)).toBeInTheDocument();
    const host = new URL(USER.website).host;
    expect(screen.getByRole("link", { name: host })).toHaveAttribute(
      "href",
      USER.website
    );
  });

  it("picks the pronoun icon from the gender", () => {
    const { container } = render(<Overview />);
    const icon = USER.gender === "male" ? ".lucide-mars" : ".lucide-venus";

    expect(container.querySelector(icon)).not.toBeNull();
  });
});
