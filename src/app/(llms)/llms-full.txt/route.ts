import { AWARDS } from "@/features/profile/data/awards";
import { CERTIFICATIONS } from "@/features/profile/data/certifications";
import { EXPERIENCES } from "@/features/profile/data/experiences";
import { PROJECTS } from "@/features/profile/data/projects";
import { SOCIAL_LINKS } from "@/features/profile/data/social-links";
import { TECH_STACK } from "@/features/profile/data/tech-stack";
import { USER } from "@/features/profile/data/user";
import {
  llmsFullMarkdown,
  markdownResponse,
} from "@/features/profile/lib/llms-markdown";

export const dynamic = "force-static";

export async function GET() {
  return markdownResponse(
    llmsFullMarkdown({
      user: USER,
      socialLinks: SOCIAL_LINKS,
      techStack: TECH_STACK,
      experiences: EXPERIENCES,
      projects: PROJECTS,
      awards: AWARDS,
      certifications: CERTIFICATIONS,
    })
  );
}
