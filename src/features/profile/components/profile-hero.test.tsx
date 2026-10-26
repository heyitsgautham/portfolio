import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SOCIAL_LINKS } from "@/features/profile/data/social-links";
import { USER } from "@/features/profile/data/user";

import { ProfileHero } from "./profile-hero";

describe("ProfileHero", () => {
  it("names the user in the page heading", () => {
    render(<ProfileHero />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      USER.displayName
    );
  });

  it("shows the avatar with the user's name as alt text", () => {
    render(<ProfileHero />);

    expect(screen.getByAltText(USER.displayName)).toBeInTheDocument();
  });

  it("starts the flip sentences on the first one", () => {
    render(<ProfileHero />);

    expect(screen.getByText(USER.flipSentences[0])).toBeInTheDocument();
  });

  it("links the tech pills out in a new tab with decorative icons", () => {
    render(<ProfileHero />);

    const pill = screen.getByRole("link", { name: "FastAPI" });
    expect(pill).toHaveAttribute("href", "https://fastapi.tiangolo.com");
    expect(pill).toHaveAttribute("target", "_blank");
    expect(pill).toHaveAttribute("rel", "noopener noreferrer");
    for (const img of within(pill).queryAllByRole("img")) {
      expect(img).toHaveAttribute("alt", "");
    }
  });

  it("offers the decoded email address in the Get in touch link", () => {
    render(<ProfileHero />);

    expect(screen.getByRole("link", { name: /get in touch/i })).toHaveAttribute(
      "href",
      `mailto:${atob(USER.email)}`
    );
  });

  it("opens the resume download in a new tab", () => {
    render(<ProfileHero />);

    const resume = screen.getByRole("link", { name: /resume \/ cv/i });
    expect(resume.getAttribute("href")).toMatch(
      /^https:\/\/drive\.google\.com\//
    );
    expect(resume).toHaveAttribute("target", "_blank");
  });

  it("renders one labelled link per social profile", () => {
    render(<ProfileHero />);

    for (const link of SOCIAL_LINKS) {
      expect(screen.getByRole("link", { name: link.title })).toHaveAttribute(
        "href",
        link.href
      );
    }
  });
});
