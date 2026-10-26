import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TECH_STACK } from "@/features/profile/data/tech-stack";

import { TechStack } from "./tech-stack";

describe("TechStack", () => {
  it("links every technology to its site, labelled by name", () => {
    const { container } = render(<TechStack />);

    for (const tech of TECH_STACK) {
      // Query by attribute: the marquees repeat each row, and a role query
      // over that many links is slow enough to time out on a busy runner.
      const link = container.querySelector(
        `a[aria-label="${tech.displayName || tech.title}"]`
      );
      expect(link, tech.key).toHaveAttribute("href", tech.href);
    }
  });

  it("splits the stack across two marquee rows", () => {
    const { container } = render(<TechStack />);
    const lists = container.querySelectorAll("ul");
    const first = TECH_STACK[0].displayName || TECH_STACK[0].title;
    const last = TECH_STACK.at(-1)!.displayName || TECH_STACK.at(-1)!.title;

    // Each marquee repeats its row, so both rows appear more than once.
    const rowOf = (name: string) =>
      [...lists].find((ul) => ul.querySelector(`[aria-label="${name}"]`));
    expect(rowOf(first)).not.toBe(rowOf(last));
  });

  it("links to the full tech stack page", () => {
    render(<TechStack />);

    expect(screen.getByRole("link", { name: /checkout all/i })).toHaveAttribute(
      "href",
      "/tech-stack"
    );
  });
});
