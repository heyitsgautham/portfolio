import { TECH_STACK } from "@/features/profile/data/tech-stack";
import type { TechStack } from "@/features/profile/types/tech-stack";

export type ResolvedSkill = {
  /** The tech stack entry the skill names, when there is one. */
  techItem?: TechStack;
  /** Key passed to getIcon(). */
  iconKey: string;
  /** Label shown in skill tags. */
  displayName: string;
};

/**
 * Matches a free-text skill from a project or job to its tech stack entry.
 *
 * A skill matches an entry by its exact title, its exact display name, or
 * its key in any letter case. Unknown skills keep their own text as the
 * label and their lowercased text as the icon key.
 */
export function resolveSkill(
  skill: string,
  techStack: readonly TechStack[] = TECH_STACK
): ResolvedSkill {
  const techItem = techStack.find(
    (item) =>
      item.title === skill ||
      item.displayName === skill ||
      item.key === skill.toLowerCase()
  );

  return {
    techItem,
    iconKey: techItem?.key || skill.toLowerCase(),
    displayName: techItem?.displayName || techItem?.title || skill,
  };
}
