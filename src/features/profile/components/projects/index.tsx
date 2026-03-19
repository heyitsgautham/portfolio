import Link from "next/link";

import { Button } from "@/components/ui/button";

import { PROJECTS } from "../../data/projects";
import { Panel, PanelContent, PanelHeader, PanelTitle } from "../panel";
import { FeaturedProjectsGrid } from "./featured-projects-grid";

export function Projects() {
  const featuredProjects = PROJECTS.slice(0, 3);

  return (
    <Panel id="projects">
      <PanelHeader>
        <PanelTitle>
          Projects
          <sup className="ml-1 font-mono text-sm text-muted-foreground select-none">
            ({PROJECTS.length})
          </sup>
        </PanelTitle>
      </PanelHeader>

      <PanelContent className="px-0">
        <div className="relative left-1/2 w-screen -translate-x-1/2 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-8">
            <div>
              <h3 className="mb-4 text-sm font-medium text-muted-foreground">
                
              </h3>
              <FeaturedProjectsGrid projects={featuredProjects} />
            </div>

            {PROJECTS.length > featuredProjects.length && (
              <div className="flex justify-center pt-4">
                <Button
                  variant="outline"
                  size="lg"
                  className="min-w-[200px]"
                  asChild
                >
                  <Link href="/projects">Show More</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </PanelContent>
    </Panel>
  );
}
