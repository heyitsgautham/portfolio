import dayjs from "dayjs";
import type { MetadataRoute } from "next";

import { SITE_INFO } from "@/config/site";
import { PROJECTS } from "@/features/profile/data/projects";
import { getPostsByCategory } from "@/lib/content";

type SitemapEntry = MetadataRoute.Sitemap[number];

/** Top-level pages, with how often they change and their crawl priority. */
const STATIC_ROUTES: ReadonlyArray<
  Pick<SitemapEntry, "changeFrequency" | "priority"> & { path: string }
> = [
  { path: "", changeFrequency: "weekly", priority: 1.0 },
  { path: "/components", changeFrequency: "monthly", priority: 0.8 },
  { path: "/projects", changeFrequency: "monthly", priority: 0.8 },
  { path: "/tech-stack", changeFrequency: "monthly", priority: 0.6 },
  { path: "/certificates", changeFrequency: "monthly", priority: 0.6 },
  { path: "/resume", changeFrequency: "monthly", priority: 0.6 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = dayjs().toISOString();

  const components = (await getPostsByCategory("components")).map((post) => ({
    url: `${SITE_INFO.url}/components/${post.slug}`,
    lastModified: dayjs(post.metadata.updatedAt).toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const projects = PROJECTS.map((project) => ({
    url: `${SITE_INFO.url}/projects/${project.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const routes = STATIC_ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_INFO.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  return [...routes, ...components, ...projects];
}
