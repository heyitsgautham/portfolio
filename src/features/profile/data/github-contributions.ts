import type { Activity } from "@/components/ui/contribution-graph";
import { GITHUB_USERNAME } from "@/config/site";

import fallbackContributions from "./github-contributions.fallback.json";

type GitHubContributionsResponse = {
  contributions: Activity[];
};

const FALLBACK_CONTRIBUTIONS: Activity[] = Array.isArray(fallbackContributions)
  ? (fallbackContributions as Activity[])
  : Array.isArray(
        (fallbackContributions as GitHubContributionsResponse | undefined)
          ?.contributions
      )
    ? ((fallbackContributions as GitHubContributionsResponse)
        .contributions as Activity[])
    : [];

export async function getGitHubContributions() {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
      {
        next: { revalidate: 60 * 60 },
        cache: "force-cache",
        signal: controller.signal,
      }
    );

    clearTimeout(timeout);

    if (!res.ok) {
      return FALLBACK_CONTRIBUTIONS;
    }

    const data = (await res.json()) as GitHubContributionsResponse;
    if (!Array.isArray(data.contributions)) {
      return FALLBACK_CONTRIBUTIONS;
    }

    return data.contributions;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Failed to load GitHub contributions", error);
    }

    return FALLBACK_CONTRIBUTIONS;
  }
}
