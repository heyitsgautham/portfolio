import { AWARDS } from "@/features/profile/data/awards";
import {
  awardsMarkdown,
  markdownResponse,
} from "@/features/profile/lib/llms-markdown";

export const dynamic = "force-static";

export async function GET() {
  return markdownResponse(awardsMarkdown(AWARDS));
}
