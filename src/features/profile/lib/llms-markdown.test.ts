import { describe, expect, it } from "vitest";

import type { Experience } from "@/features/profile/types/experiences";
import type { Project } from "@/features/profile/types/projects";

import {
  aboutMarkdown,
  awardsMarkdown,
  certificationsMarkdown,
  experienceMarkdown,
  llmsFullMarkdown,
  llmsIndexMarkdown,
  type LlmsProfile,
  markdownResponse,
  projectsMarkdown,
} from "./llms-markdown";

const experiences: Experience[] = [
  {
    id: "acme",
    companyName: "Acme",
    positions: [
      {
        id: "acme-ml",
        title: "ML Engineer",
        employmentPeriod: { start: "01.2025" },
        skills: ["Python", "PyTorch"],
        description: "  Trained models.  ",
      },
      {
        id: "acme-intern",
        title: "Intern",
        employmentPeriod: { start: "06.2024", end: "12.2024" },
        description: "Wrote scripts.",
      },
    ],
  },
];

const project = {
  id: "p1",
  title: "Widget",
  period: { start: "2025" },
  link: "https://github.com/example/widget",
  skills: ["Go", "Redis"],
  summary: "A widget.",
  slug: "widget",
  intro: "Widget intro.",
  uniqueFeatures: [],
  techStackDetail: [],
} as Project;

const profile: LlmsProfile = {
  user: {
    firstName: "Ada",
    lastName: "Lovelace",
    displayName: "Ada L",
    address: "London",
    website: "https://ada.example",
    about: "\n  Hello there.\n",
  } as LlmsProfile["user"],
  socialLinks: [
    { title: "GitHub", href: "https://github.com/ada" },
  ] as LlmsProfile["socialLinks"],
  techStack: [
    { title: "Python", href: "https://python.org" },
  ] as LlmsProfile["techStack"],
  experiences,
  projects: [project],
  awards: [{ title: "Hackathon", prize: "Winner", description: "Won it." }],
  certifications: [
    {
      title: "Cloud 101",
      issuer: "Cloud Co",
      issueDate: "2025-01-01",
      credentialID: "",
      credentialURL: "https://cert.example/1",
    },
  ],
};

describe("aboutMarkdown", () => {
  it("renders the trimmed bio, personal details and link lists", () => {
    const md = aboutMarkdown(profile);

    expect(
      md.startsWith("# About\n\nHello there.\n\n## Personal Information")
    ).toBe(true);
    expect(md).toContain("- Display Name: Ada L");
    expect(md).toContain("- Website: https://ada.example");
    expect(md).toContain(
      "## Social Links\n\n- [GitHub](https://github.com/ada)"
    );
    expect(
      md.endsWith("## Tech Stack\n\n- [Python](https://python.org)\n")
    ).toBe(true);
  });

  it("nests every heading one level deeper at level 2", () => {
    const md = aboutMarkdown(profile, 2);

    expect(md.startsWith("## About\n")).toBe(true);
    expect(md).toContain("### Personal Information");
    expect(md).not.toMatch(/^# /m);
  });
});

describe("experienceMarkdown", () => {
  it("renders one section per position with its company and skills", () => {
    const md = experienceMarkdown(experiences);

    expect(md).toContain(
      "## ML Engineer | Acme\n\nDuration: 01.2025 - Present\n\nSkills: Python, PyTorch\n\nTrained models."
    );
  });

  it("falls back to N/A when a position lists no skills", () => {
    expect(experienceMarkdown(experiences)).toContain(
      "Duration: 06.2024 - 12.2024\n\nSkills: N/A\n\nWrote scripts."
    );
  });
});

describe("projectsMarkdown", () => {
  it("omits the description block when a project has none", () => {
    expect(projectsMarkdown([project])).toBe(
      "# Projects\n\n## Widget\n\nProject URL: https://github.com/example/widget\n\nSkills: Go, Redis\n"
    );
  });

  it("appends the trimmed description when present", () => {
    const md = projectsMarkdown([{ ...project, description: "  Details.  " }]);
    expect(md).toContain("Skills: Go, Redis\n\nDetails.\n");
  });
});

describe("awardsMarkdown and certificationsMarkdown", () => {
  it("titles each award with its prize", () => {
    expect(awardsMarkdown(profile.awards)).toBe(
      "# Awards\n\n## Winner | Hackathon\n\nWon it.\n"
    );
  });

  it("links each certification to its credential URL", () => {
    expect(certificationsMarkdown(profile.certifications)).toBe(
      "# Certifications\n\n- [Cloud 101](https://cert.example/1)\n"
    );
  });
});

describe("llmsIndexMarkdown", () => {
  it("links every section route on the given site", () => {
    const md = llmsIndexMarkdown("https://site.example");
    for (const route of [
      "about.md",
      "experience.md",
      "projects.md",
      "awards.md",
      "certifications.md",
    ]) {
      expect(md).toContain(`(https://site.example/${route})`);
    }
  });
});

describe("llmsFullMarkdown", () => {
  it("names the person in the system preamble", () => {
    expect(llmsFullMarkdown(profile)).toMatch(
      /^<SYSTEM>.*Ada L's professional profile.*<\/SYSTEM>/
    );
  });

  it("nests every section under a single top-level heading", () => {
    const md = llmsFullMarkdown(profile);

    expect(md.match(/^# /gm)).toHaveLength(1);
    for (const section of [
      "About",
      "Experience",
      "Projects",
      "Awards",
      "Certifications",
    ]) {
      expect(md).toContain(`\n## ${section}\n`);
    }
    expect(md.endsWith("- [Cloud 101](https://cert.example/1)")).toBe(true);
  });
});

describe("markdownResponse", () => {
  it("serves the body as UTF-8 markdown", async () => {
    const res = markdownResponse("# Hi");

    expect(res.headers.get("Content-Type")).toBe("text/markdown;charset=utf-8");
    expect(await res.text()).toBe("# Hi");
  });
});
