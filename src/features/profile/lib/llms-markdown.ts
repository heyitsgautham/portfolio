import type { Award } from "@/features/profile/types/awards";
import type { Certification } from "@/features/profile/types/certifications";
import type { Experience } from "@/features/profile/types/experiences";
import type { Project } from "@/features/profile/types/projects";
import type { SocialLink } from "@/features/profile/types/social-links";
import type { TechStack } from "@/features/profile/types/tech-stack";
import type { User } from "@/features/profile/types/user";

/**
 * Builders for the plain-text profile served to LLMs at /llms.txt,
 * /llms-full.txt and the per-section *.md routes.
 *
 * Each section renders at a heading level, so the standalone routes use
 * `# Section` and llms-full.txt nests the same text one level down.
 */
export type HeadingLevel = 1 | 2;

export const MARKDOWN_CONTENT_TYPE = "text/markdown;charset=utf-8";

export type LlmsProfile = {
  user: User;
  socialLinks: SocialLink[];
  techStack: TechStack[];
  experiences: Experience[];
  projects: Project[];
  awards: Award[];
  certifications: Certification[];
};

const LLMS_TAGLINE =
  "A minimal portfolio to showcase my work as an AI Engineer.";

function heading(level: HeadingLevel, depth: 0 | 1 = 0) {
  return "#".repeat(level + depth);
}

function linkList(items: { title: string; href: string }[]) {
  return items.map((item) => `- [${item.title}](${item.href})`).join("\n");
}

export function aboutMarkdown(
  profile: Pick<LlmsProfile, "user" | "socialLinks" | "techStack">,
  level: HeadingLevel = 1
) {
  const { user } = profile;
  const sub = heading(level, 1);

  return `${heading(level)} About

${user.about.trim()}

${sub} Personal Information

- First Name: ${user.firstName}
- Last Name: ${user.lastName}
- Display Name: ${user.displayName}
- Location: ${user.address}
- Website: ${user.website}

${sub} Social Links

${linkList(profile.socialLinks)}

${sub} Tech Stack

${linkList(profile.techStack)}
`;
}

export function experienceMarkdown(
  experiences: Experience[],
  level: HeadingLevel = 1
) {
  const sub = heading(level, 1);
  const body = experiences
    .map((item) =>
      item.positions
        .map((position) => {
          const skills = position.skills?.join(", ") || "N/A";
          const { start, end } = position.employmentPeriod;
          return `${sub} ${position.title} | ${item.companyName}\n\nDuration: ${start} - ${end || "Present"}\n\nSkills: ${skills}\n\n${position.description?.trim()}`;
        })
        .join("\n\n")
    )
    .join("\n\n");

  return `${heading(level)} Experience\n\n${body}\n`;
}

export function projectsMarkdown(projects: Project[], level: HeadingLevel = 1) {
  const sub = heading(level, 1);
  const body = projects
    .map((item) => {
      const skills = `\n\nSkills: ${item.skills.join(", ")}`;
      const description = item.description
        ? `\n\n${item.description.trim()}`
        : "";
      return `${sub} ${item.title}\n\nProject URL: ${item.link}${skills}${description}`;
    })
    .join("\n\n");

  return `${heading(level)} Projects\n\n${body}\n`;
}

export function awardsMarkdown(awards: Award[], level: HeadingLevel = 1) {
  const sub = heading(level, 1);
  const body = awards
    .map(
      (item) => `${sub} ${item.prize} | ${item.title}\n\n${item.description}`
    )
    .join("\n\n");

  return `${heading(level)} Awards\n\n${body}\n`;
}

export function certificationsMarkdown(
  certifications: Certification[],
  level: HeadingLevel = 1
) {
  const body = linkList(
    certifications.map((item) => ({
      title: item.title,
      href: item.credentialURL,
    }))
  );

  return `${heading(level)} Certifications\n\n${body}\n`;
}

export function llmsIndexMarkdown(siteUrl: string) {
  return `# gauthamkrishna.dev

> ${LLMS_TAGLINE}

- [About](${siteUrl}/about.md): A quick intro to me, my tech stack, and how to connect.
- [Experience](${siteUrl}/experience.md): Highlights from my career and key roles I've taken on.
- [Projects](${siteUrl}/projects.md): Selected projects that show my skills and creativity.
- [Awards](${siteUrl}/awards.md): My key awards and honors.
- [Certifications](${siteUrl}/certifications.md): Certifications and credentials I've earned.
`;
}

export function llmsFullMarkdown(profile: LlmsProfile) {
  const name = profile.user.displayName;

  return `<SYSTEM>This document contains comprehensive information about ${name}'s professional profile and portfolio. It includes personal details, work experience, projects, achievements, and certifications. This data is formatted for consumption by Large Language Models (LLMs) to provide accurate and up-to-date information about ${name}'s background, skills, and expertise as an AI Engineer.</SYSTEM>

# gauthamkrishna.dev

> ${LLMS_TAGLINE}

${aboutMarkdown(profile, 2)}
${experienceMarkdown(profile.experiences, 2)}
${projectsMarkdown(profile.projects, 2)}
${awardsMarkdown(profile.awards, 2)}
${certificationsMarkdown(profile.certifications, 2).trimEnd()}`;
}

export function markdownResponse(content: string) {
  return new Response(content, {
    headers: {
      "Content-Type": MARKDOWN_CONTENT_TYPE,
    },
  });
}
