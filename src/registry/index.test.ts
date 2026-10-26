import { existsSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { registry } from "./index";

const names = new Set(registry.items.map((item) => item.name));

/** Same rule as build-registry.mts: paths outside src/ live under src/registry/. */
const sourcePath = (file: string) =>
  path.join(
    process.cwd(),
    file.startsWith("src/") ? file : `src/registry/${file}`
  );

describe("registry", () => {
  it("gives every item a unique name, since shadcn add looks items up by it", () => {
    expect(names.size).toBe(registry.items.length);
  });

  it("points every file entry at a source file that exists", () => {
    for (const item of registry.items) {
      for (const file of item.files ?? []) {
        expect(
          existsSync(sourcePath(file.path)),
          `${item.name}: ${file.path}`
        ).toBe(true);
      }
    }
  });

  it("resolves every @gk/ dependency to an item in this registry", () => {
    for (const item of registry.items) {
      for (const dep of item.registryDependencies ?? []) {
        if (dep.startsWith("@gk/")) {
          expect(
            names.has(dep.slice("@gk/".length)),
            `${item.name} -> ${dep}`
          ).toBe(true);
        }
      }
    }
  });

  it("publishes a JSON file under public/r for every non-example item", () => {
    for (const item of registry.items) {
      if (item.type === "registry:example") continue;
      expect(
        existsSync(path.join(process.cwd(), "public/r", `${item.name}.json`)),
        item.name
      ).toBe(true);
    }
  });
});
