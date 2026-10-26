import { existsSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { SITE_INFO } from "@/config/site";

import manifest from "./manifest";

describe("manifest", () => {
  it("names the app after the site", () => {
    const m = manifest();

    expect(m.name).toBe(SITE_INFO.name);
    expect(m.short_name).toBe(SITE_INFO.name);
    expect(m.description).toBe(SITE_INFO.description);
  });

  it("starts the installed app at the tagged home page", () => {
    const m = manifest();

    expect(m.start_url).toBe("/?utm_source=pwa");
    expect(m.display).toBe("standalone");
    expect(m.scope).toBe("/");
  });

  it("references only icons that exist in public/", () => {
    for (const icon of manifest().icons ?? []) {
      expect(existsSync(path.join(process.cwd(), "public", icon.src))).toBe(
        true
      );
    }
  });

  it("declares each icon's size to match its file name", () => {
    for (const icon of manifest().icons ?? []) {
      const [, size] = icon.src.match(/(\d+x\d+)/) ?? [];
      if (size) expect(icon.sizes).toBe(size);
    }
  });
});
