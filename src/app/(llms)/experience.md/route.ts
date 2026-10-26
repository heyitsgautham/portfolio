import { EXPERIENCES } from "@/features/profile/data/experiences";
import {
  experienceMarkdown,
  markdownResponse,
} from "@/features/profile/lib/llms-markdown";

export const dynamic = "force-static";

export async function GET() {
  return markdownResponse(experienceMarkdown(EXPERIENCES));
}
