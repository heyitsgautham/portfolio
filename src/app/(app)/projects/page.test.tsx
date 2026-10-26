import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SITE_INFO } from "@/config/site";
import { PROJECTS } from "@/features/profile/data/projects";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn() }) }));

import ProjectsPage, { metadata } from "./page";

describe("ProjectsPage", () => {
  it("renders one card per project, in data order", () => {
    render(<ProjectsPage />);

    expect(
      screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent)
    ).toEqual(PROJECTS.map((p) => p.title.split(" - ")[0]));
  });

  it("describes the page with the project count", () => {
    expect(metadata.description).toBe(
      `Explore all ${PROJECTS.length} projects by ${SITE_INFO.name}`
    );
    expect(metadata.alternates?.canonical).toBe("/projects");
  });

  it("lists every project in the CollectionPage JSON-LD", () => {
    const { container } = render(<ProjectsPage />);
    const script = container.querySelector(
      'script[type="application/ld+json"]'
    );
    const jsonLd = JSON.parse(script!.innerHTML);

    expect(jsonLd["@type"]).toBe("CollectionPage");
    expect(jsonLd.mainEntity.itemListElement).toHaveLength(PROJECTS.length);
    expect(jsonLd.mainEntity.itemListElement[0]).toEqual({
      "@type": "ListItem",
      position: 1,
      url: `${SITE_INFO.url}/projects/${PROJECTS[0].slug}`,
      name: PROJECTS[0].title,
    });
  });
});
