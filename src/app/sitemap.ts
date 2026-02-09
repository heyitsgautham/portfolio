import dayjs from "dayjs";
import type { MetadataRoute } from "next";

import { SITE_INFO } from "@/config/site";
import { getPostsByCategory } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const components = (await getPostsByCategory("components")).map((post) => ({
    url: `${SITE_INFO.url}/components/${post.slug}`,
    lastModified: dayjs(post.metadata.updatedAt).toISOString(),
  }));

  const routes = ["", "/components"].map((route) => ({
    url: `${SITE_INFO.url}${route}`,
    lastModified: dayjs().toISOString(),
  }));

  return [...routes, ...components];
}
