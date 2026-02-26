import { Suspense } from "react";

import { Markdown } from "@/components/markdown";
import { Skeleton } from "@/components/ui/skeleton";
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
          <Suspense
            fallback={
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[90%]" />
                <Skeleton className="h-4 w-[95%]" />
              </div>
            }
          >
            <Markdown>{USER.about}</Markdown>
          </Suspense>
        </Prose>
      </PanelContent>
    </Panel>
  );
}
