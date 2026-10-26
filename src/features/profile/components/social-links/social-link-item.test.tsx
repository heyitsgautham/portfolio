import { render, screen } from "@testing-library/react";
import { FaGithub } from "react-icons/fa";
import { describe, expect, it } from "vitest";

import { SocialLinkItem } from "./social-link-item";

describe("SocialLinkItem", () => {
  it("links out in a new tab with its title and description", () => {
    render(
      <SocialLinkItem
        icon={FaGithub}
        title="GitHub"
        description="heyitsgautham"
        href="https://github.com/heyitsgautham"
      />
    );

    const link = screen.getByRole("link", { name: /github/i });
    expect(link).toHaveAttribute("href", "https://github.com/heyitsgautham");
    expect(link).toHaveAttribute("target", "_blank");
    expect(screen.getByText("heyitsgautham")).toBeInTheDocument();
  });

  it("renders a react-icons component as an inline icon", () => {
    const { container } = render(
      <SocialLinkItem icon={FaGithub} title="GitHub" href="https://x.dev" />
    );

    expect(container.querySelector("img")).toBeNull();
    expect(container.querySelectorAll("svg").length).toBeGreaterThan(1);
  });

  it("renders an image URL as an image named after the link", () => {
    render(
      <SocialLinkItem
        icon="/images/icons/leetcode.webp"
        title="LeetCode"
        href="https://leetcode.com/u/x"
      />
    );

    expect(screen.getByAltText("LeetCode")).toBeInTheDocument();
  });

  it("leaves out the description line when there is none", () => {
    const { container } = render(
      <SocialLinkItem icon={FaGithub} title="GitHub" href="https://x.dev" />
    );

    expect(container.querySelector("p")).toBeNull();
  });
});
