import { SOCIAL_LINKS } from "@/features/profile/data/social-links";
import { TECH_STACK } from "@/features/profile/data/tech-stack";
import { USER } from "@/features/profile/data/user";
import {
  aboutMarkdown,
  markdownResponse,
} from "@/features/profile/lib/llms-markdown";

export const dynamic = "force-static";

export async function GET() {
  return markdownResponse(
    aboutMarkdown({
      user: USER,
      socialLinks: SOCIAL_LINKS,
      techStack: TECH_STACK,
    })
  );
}
