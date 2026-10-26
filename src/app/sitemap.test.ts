import { describe, expect, it, vi } from "vitest";

import { SITE_INFO } from "@/config/site";
import { PROJECTS } from "@/features/profile/data/projects";

vi.mock("@/lib/content", () => ({
  getPostsByCategory: vi.fn(async () => [
    { slug: "flip-sentences", metadata: { updatedAt: "2025-03-04" } },
  ]),
}));

import sitemap from "./sitemap";

describe("sitemap", () => {
  it("lists the home page first at the highest priority", async () => {
    const [home] = await sitemap();

    expect(home).toMatchObject({
      url: SITE_INFO.url,
      changeFrequency: "weekly",
      priority: 1,
    });
  });

  it("ranks the index pages above the leaf pages", async () => {
    const byUrl = new Map((await sitemap()).map((e) => [e.url, e]));

    expect(byUrl.get(`${SITE_INFO.url}/projects`)?.priority).toBe(0.8);
    expect(byUrl.get(`${SITE_INFO.url}/components`)?.priority).toBe(0.8);
    expect(byUrl.get(`${SITE_INFO.url}/resume`)?.priority).toBe(0.6);
  });

  it("dates each component page by its updatedAt front matter", async () => {
    const entry = (await sitemap()).find((e) =>
      e.url.endsWith("/components/flip-sentences")
    );

    expect(entry).toMatchObject({ priority: 0.7, changeFrequency: "monthly" });
    expect(String(entry?.lastModified)).toMatch(/^2025-03-0[34]T/);
  });

  it("includes one entry per project slug", async () => {
    const urls = (await sitemap()).map((e) => e.url);

    for (const project of PROJECTS) {
      expect(urls).toContain(`${SITE_INFO.url}/projects/${project.slug}`);
    }
  });

  it("has no duplicate URLs", async () => {
    const urls = (await sitemap()).map((e) => e.url);
    expect(new Set(urls).size).toBe(urls.length);
  });
});
