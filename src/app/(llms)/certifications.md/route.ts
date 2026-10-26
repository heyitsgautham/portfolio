import { CERTIFICATIONS } from "@/features/profile/data/certifications";
import {
  certificationsMarkdown,
  markdownResponse,
} from "@/features/profile/lib/llms-markdown";

export const dynamic = "force-static";

export async function GET() {
  return markdownResponse(certificationsMarkdown(CERTIFICATIONS));
}
