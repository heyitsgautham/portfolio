import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { PROJECTS } from "@/features/profile/data/projects";

vi.mock("next/navigation", () => ({
  notFound: vi.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
}));

import ProjectDetailPage, {
  generateMetadata,
  generateStaticParams,
} from "./page";

const params = (slug: string) => ({ params: Promise.resolve({ slug }) });

const withSubtitle = PROJECTS.find((p) => p.title.includes(" - "));
const project = withSubtitle ?? PROJECTS[0];

describe("generateStaticParams", () => {
  it("pre-renders one page per project slug", () => {
    expect(generateStaticParams()).toEqual(
      PROJECTS.map((p) => ({ slug: p.slug }))
    );
  });
});

describe("generateMetadata", () => {
  it("returns empty metadata for an unknown slug", async () => {
    await expect(generateMetadata(params("no-such-project"))).resolves.toEqual(
      {}
    );
  });

  it("titles the page with the part before the dash and links the canonical URL", async () => {
    const meta = await generateMetadata(params(project.slug));
    const title = project.title.split(" - ")[0];

    expect(meta.title).toBe(title);
    expect(meta.description).toBe(project.intro);
    expect(meta.alternates?.canonical).toBe(`/projects/${project.slug}`);
    expect(meta.openGraph).toMatchObject({
      title,
      url: `/projects/${project.slug}`,
      type: "article",
    });
  });
});

describe("ProjectDetailPage", () => {
  it("calls notFound for an unknown slug", async () => {
    await expect(ProjectDetailPage(params("no-such-project"))).rejects.toThrow(
      "NEXT_NOT_FOUND"
    );
  });

  it("renders the title, subtitle, intro and every unique feature", async () => {
    render(await ProjectDetailPage(params(project.slug)));

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      project.title.split(" - ")[0]
    );
    if (withSubtitle) {
      expect(
        screen.getByText(project.title.split(" - ").slice(1).join(" - "))
      ).toBeInTheDocument();
    }
    expect(screen.getByText(project.intro)).toBeInTheDocument();
    for (const feature of project.uniqueFeatures) {
      expect(screen.getByText(feature)).toBeInTheDocument();
    }
  });

  it("links the source code and lists the tech stack rows", async () => {
    render(await ProjectDetailPage(params(project.slug)));

    const github = screen
      .getAllByRole("link")
      .find((a) => a.getAttribute("href") === project.link);
    expect(github).toHaveAttribute("target", "_blank");
    for (const entry of project.techStackDetail) {
      expect(screen.getByText(entry.items)).toBeInTheDocument();
    }
  });

  it("embeds escaped CreativeWork JSON-LD for the project", async () => {
    const { container } = render(await ProjectDetailPage(params(project.slug)));
    const script = container.querySelector(
      'script[type="application/ld+json"]'
    );

    expect(script?.innerHTML).not.toContain("<");
    expect(JSON.parse(script?.innerHTML ?? "{}")).toMatchObject({
      "@type": "CreativeWork",
      name: project.title,
      keywords: project.skills.join(", "),
    });
  });
});
