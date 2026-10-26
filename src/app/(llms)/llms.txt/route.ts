import { SITE_INFO } from "@/config/site";
import {
  llmsIndexMarkdown,
  markdownResponse,
} from "@/features/profile/lib/llms-markdown";

export const dynamic = "force-static";

export async function GET() {
  return markdownResponse(llmsIndexMarkdown(SITE_INFO.url));
}
