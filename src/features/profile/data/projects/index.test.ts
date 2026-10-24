import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { getProjectBySlug, PROJECTS } from "./index";

const MONTH_YEAR = /^(0[1-9]|1[0-2])\.\d{4}$/;

describe("PROJECTS", () => {
  it("gives every project a unique id and slug", () => {
    const ids = PROJECTS.map((p) => p.id);
    const slugs = PROJECTS.map((p) => p.slug);

    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("uses URL-safe slugs, since they become /projects/<slug> routes", () => {
    for (const { slug } of PROJECTS) {
      expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it("writes periods as MM.YYYY, with Present allowed as the end", () => {
    for (const { slug, period } of PROJECTS) {
      expect(period.start, slug).toMatch(MONTH_YEAR);
      if (period.end !== undefined && period.end !== "Present") {
        expect(period.end, slug).toMatch(MONTH_YEAR);
      }
    }
  });

  it("points every cover image at a file in public/", () => {
    for (const { slug, image } of PROJECTS) {
      if (!image) continue;
      expect(
        fs.existsSync(path.join(process.cwd(), "public", image)),
        `${slug}: ${image}`
      ).toBe(true);
    }
  });

  it("fills the fields the project page renders", () => {
    for (const p of PROJECTS) {
      expect(p.title, p.slug).not.toBe("");
      expect(p.summary, p.slug).not.toBe("");
      expect(p.intro, p.slug).not.toBe("");
      expect(p.link, p.slug).toMatch(/^https:\/\//);
      expect(p.skills.length, p.slug).toBeGreaterThan(0);
      expect(p.uniqueFeatures.length, p.slug).toBeGreaterThan(0);
      expect(p.techStackDetail.length, p.slug).toBeGreaterThan(0);
    }
  });

  it("uses hex accent colors when a project sets them", () => {
    for (const { slug, accentColor, accentColorDark } of PROJECTS) {
      for (const color of [accentColor, accentColorDark]) {
        if (color !== undefined) expect(color, slug).toMatch(/^#[0-9a-f]{6}$/i);
      }
    }
  });
});

describe("getProjectBySlug", () => {
  it("returns the project with that slug", () => {
    expect(getProjectBySlug("sticky-net")?.id).toBe(
      PROJECTS.find((p) => p.slug === "sticky-net")?.id
    );
    expect(getProjectBySlug(PROJECTS[0].slug)).toBe(PROJECTS[0]);
  });

  it("returns undefined for an unknown slug", () => {
    expect(getProjectBySlug("does-not-exist")).toBeUndefined();
  });
});
