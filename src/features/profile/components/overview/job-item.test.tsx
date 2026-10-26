import { render, screen } from "@testing-library/react";
import { BriefcaseBusinessIcon } from "lucide-react";
import { describe, expect, it } from "vitest";

import { UTM_PARAMS } from "@/config/site";

import { IntroItem } from "./intro-item";
import { JobItem } from "./job-item";

const iconOf = (container: HTMLElement) =>
  container.querySelector("[aria-hidden] svg")?.getAttribute("class") ?? "";

describe("JobItem", () => {
  it("links the company with UTM tags in a new tab", () => {
    render(
      <JobItem
        title="Software Engineer Intern"
        company="Presidio"
        website="https://presidio.com"
      />
    );

    const link = screen.getByRole("link", { name: "Presidio" });
    const url = new URL(link.getAttribute("href")!);
    expect(url.origin).toBe("https://presidio.com");
    for (const [key, value] of Object.entries(UTM_PARAMS)) {
      expect(url.searchParams.get(key)).toBe(value);
    }
    expect(link).toHaveAttribute("target", "_blank");
  });

  it.each([
    ["ML Engineer", "lucide-code-xml"],
    ["Frontend Developer", "lucide-code-xml"],
    ["Co-Founder", "lucide-lightbulb"],
    ["Product Manager", "lucide-briefcase-business"],
  ])("picks the icon for %s", (title, iconClass) => {
    const { container } = render(
      <JobItem title={title} company="Acme" website="https://acme.dev" />
    );

    expect(iconOf(container)).toContain(iconClass);
  });
});

describe("IntroItem", () => {
  it("wraps the content in a link only when given an href", () => {
    const { rerender } = render(
      <IntroItem icon={BriefcaseBusinessIcon} content="Chennai, India" />
    );
    expect(screen.queryByRole("link")).toBeNull();

    rerender(
      <IntroItem
        icon={BriefcaseBusinessIcon}
        content="Chennai, India"
        href="https://maps.example/chennai"
      />
    );
    expect(
      screen.getByRole("link", { name: "Chennai, India" })
    ).toHaveAttribute("rel", "noopener noreferrer");
  });
});
