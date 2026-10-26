import { existsSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { USER } from "@/features/profile/data/user";

import {
  COMPACT_NAV,
  MAIN_NAV,
  META_THEME_COLORS,
  SITE_INFO,
  SOURCE_CODE_GITHUB_REPO,
  SOURCE_CODE_GITHUB_URL,
  UTM_PARAMS,
} from "./site";

/** Maps "/projects" to src/app/(app)/projects/page.tsx. */
const pageExists = (route: string) =>
  existsSync(path.join(process.cwd(), "src/app/(app)", route, "page.tsx"));

describe("site config", () => {
  it("takes the site name, description and keywords from the profile", () => {
    expect(SITE_INFO).toMatchObject({
      name: USER.displayName,
      description: USER.bio,
      keywords: USER.keywords,
      ogImage: USER.ogImage,
    });
  });

  it("points every nav page link at a page that exists", () => {
    for (const { href } of [...MAIN_NAV, ...COMPACT_NAV]) {
      if (!href.startsWith("/#")) expect(pageExists(href), href).toBe(true);
    }
  });

  it("links the source code to the same repo it names", () => {
    expect(SOURCE_CODE_GITHUB_URL).toBe(
      `https://github.com/${SOURCE_CODE_GITHUB_REPO}`
    );
  });

  it("tags outbound links with the site as the UTM source", () => {
    expect(UTM_PARAMS.utm_source).toBe(new URL(USER.website).host);
  });

  it("uses six-digit hex colours for the browser theme", () => {
    for (const color of Object.values(META_THEME_COLORS)) {
      expect(color).toMatch(/^#[0-9a-f]{6}$/);
    }
  });
});
