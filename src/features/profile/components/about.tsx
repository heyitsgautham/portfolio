import { Suspense } from "react";

import { Markdown } from "@/components/markdown";
import { Prose } from "@/components/ui/typography";
import { USER } from "@/features/profile/data/user";

import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel";

export function About() {
  return (
    <Panel id="about">
      <PanelHeader>
        <PanelTitle>About</PanelTitle>
      </PanelHeader>

      <PanelContent>
        <Prose>
          <Suspense fallback={<div>Loading...</div>}>
            <Markdown>{USER.about}</Markdown>
          </Suspense>
        </Prose>
      </PanelContent>
    </Panel>
  );
}
