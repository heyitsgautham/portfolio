import { PROJECTS } from "@/features/profile/data/projects";
import {
  markdownResponse,
  projectsMarkdown,
} from "@/features/profile/lib/llms-markdown";

export const dynamic = "force-static";

export async function GET() {
  return markdownResponse(projectsMarkdown(PROJECTS));
}
