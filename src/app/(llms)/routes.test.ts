import { describe, expect, it } from "vitest";

import { SITE_INFO } from "@/config/site";
import { AWARDS } from "@/features/profile/data/awards";
import { CERTIFICATIONS } from "@/features/profile/data/certifications";
import { EXPERIENCES } from "@/features/profile/data/experiences";
import { PROJECTS } from "@/features/profile/data/projects";
import { USER } from "@/features/profile/data/user";

import { GET as getAbout } from "./about.md/route";
import { GET as getAwards } from "./awards.md/route";
import { GET as getCertifications } from "./certifications.md/route";
import { GET as getExperience } from "./experience.md/route";
import { GET as getLlms } from "./llms.txt/route";
import { GET as getLlmsFull } from "./llms-full.txt/route";
import { GET as getProjects } from "./projects.md/route";

const routes = {
  "/about.md": getAbout,
  "/awards.md": getAwards,
  "/certifications.md": getCertifications,
  "/experience.md": getExperience,
  "/llms-full.txt": getLlmsFull,
  "/llms.txt": getLlms,
  "/projects.md": getProjects,
};

describe("llms routes", () => {
  it.each(Object.entries(routes))("%s serves markdown", async (_, get) => {
    const res = await get();

    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toBe("text/markdown;charset=utf-8");
    expect((await res.text()).length).toBeGreaterThan(0);
  });

  it("/llms.txt points at every section on the configured site", async () => {
    const body = await (await getLlms()).text();
    const linked = [...body.matchAll(/\]\(([^)]+)\)/g)].map((m) => m[1]);
    const sections = Object.keys(routes).filter((r) => r.endsWith(".md"));

    expect(linked.sort()).toEqual(
      sections.map((route) => `${SITE_INFO.url}${route}`).sort()
    );
  });

  it("/projects.md lists every project", async () => {
    const body = await (await getProjects()).text();
    for (const project of PROJECTS) {
      expect(body).toContain(`## ${project.title}\n`);
    }
  });

  it("/experience.md lists every position", async () => {
    const body = await (await getExperience()).text();
    for (const position of EXPERIENCES.flatMap((e) => e.positions)) {
      expect(body).toContain(`## ${position.title} |`);
    }
  });

  it("/llms-full.txt carries every section of the standalone routes", async () => {
    const full = await (await getLlmsFull()).text();

    expect(full).toContain(USER.about.trim());
    for (const award of AWARDS) expect(full).toContain(`### ${award.prize}`);
    for (const cert of CERTIFICATIONS)
      expect(full).toContain(`[${cert.title}]`);
  });
});
