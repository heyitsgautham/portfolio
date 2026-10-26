import { existsSync } from "node:fs";
import path from "node:path";

import { isValidElement } from "react";
import { describe, expect, it } from "vitest";

import { getIcon } from "@/components/icons";

import { TECH_STACK } from "./tech-stack";

describe("TECH_STACK", () => {
  it("uses each key once, since keys pick icons and match project skills", () => {
    const keys = TECH_STACK.map((item) => item.key);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it("links every item to an https page", () => {
    for (const item of TECH_STACK) {
      expect(new URL(item.href).protocol, item.key).toBe("https:");
    }
  });

  it("files every item under at least one category", () => {
    for (const item of TECH_STACK) {
      expect(item.categories.length, item.key).toBeGreaterThan(0);
    }
  });

  it("has an icon for every item, backed by a file when it is an image", () => {
    for (const item of TECH_STACK) {
      const icon = getIcon(item.key);
      expect(isValidElement(icon), item.key).toBe(true);

      const src = (icon as { props: { src?: unknown } }).props.src;
      if (typeof src === "string") {
        expect(existsSync(path.join(process.cwd(), "public", src)), src).toBe(
          true
        );
      }
    }
  });
});
