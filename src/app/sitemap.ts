import dayjs from "dayjs";
import type { MetadataRoute } from "next";

import { SITE_INFO } from "@/config/site";
import { PROJECTS } from "@/features/profile/data/projects";
import { getPostsByCategory } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const components = (await getPostsByCategory("components")).map((post) => ({
    url: `${SITE_INFO.url}/components/${post.slug}`,
    lastModified: dayjs(post.metadata.updatedAt).toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const projects = PROJECTS.map((project) => ({
    url: `${SITE_INFO.url}/projects/${project.slug}`,
    lastModified: dayjs().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const routes = ["", "/components", "/projects"].map((route) => ({
    url: `${SITE_INFO.url}${route}`,
    lastModified: dayjs().toISOString(),
    changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
    priority: route === "" ? 1.0 : 0.8,
  }));

  return [...routes, ...components, ...projects];
}
