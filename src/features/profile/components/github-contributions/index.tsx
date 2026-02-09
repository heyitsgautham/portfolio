import { Suspense } from "react";

import { getGitHubContributions } from "../../data/github-contributions";
import { Panel, PanelContent, PanelHeader, PanelTitle } from "../panel";
import { GitHubContributionFallback, GitHubContributionGraph } from "./graph";

export function GitHubContributions() {
  const contributions = getGitHubContributions();

  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>GitHub Contributions</PanelTitle>
      </PanelHeader>

      <PanelContent>
        <Suspense fallback={<GitHubContributionFallback />}>
          <GitHubContributionGraph contributions={contributions} />
        </Suspense>
      </PanelContent>
    </Panel>
  );
}
