import { describe, expect, it } from "vitest";

import { PROJECTS } from "@/features/profile/data/projects";
import type { TechStack } from "@/features/profile/types/tech-stack";

import { resolveSkill } from "./skills";

const stack: TechStack[] = [
  {
    key: "ts",
    title: "TypeScript",
    href: "https://www.typescriptlang.org/",
    categories: ["Languages"],
  },
  {
    key: "nextjs",
    title: "Next.js 15",
    displayName: "Next.js",
    href: "https://nextjs.org/",
    categories: ["Frameworks"],
  },
];

describe("resolveSkill", () => {
  it("matches an entry by its title", () => {
    expect(resolveSkill("TypeScript", stack)).toEqual({
      techItem: stack[0],
      iconKey: "ts",
      displayName: "TypeScript",
    });
  });

  it("matches by display name and labels the tag with it", () => {
    const { techItem, displayName } = resolveSkill("Next.js", stack);

    expect(techItem?.key).toBe("nextjs");
    expect(displayName).toBe("Next.js");
  });

  it("matches a key in any letter case", () => {
    expect(resolveSkill("TS", stack).techItem?.key).toBe("ts");
    expect(resolveSkill("NextJS", stack).displayName).toBe("Next.js");
  });

  it("keeps an unknown skill's own text and lowercases its icon key", () => {
    expect(resolveSkill("Gemini Nano", stack)).toEqual({
      techItem: undefined,
      iconKey: "gemini nano",
      displayName: "Gemini Nano",
    });
  });

  it("does not match a title in a different case", () => {
    expect(resolveSkill("typescript", stack).techItem).toBeUndefined();
  });

  it("resolves against the real tech stack by default", () => {
    const skills = PROJECTS.flatMap((p) => p.skills);

    expect(skills.some((s) => resolveSkill(s).techItem)).toBe(true);
  });
});
