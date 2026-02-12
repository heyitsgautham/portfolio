import Link from "next/link";

import { Button } from "@/components/ui/button";

import { PROJECTS } from "../../data/projects";
import { Panel, PanelContent, PanelHeader, PanelTitle } from "../panel";
import { ProjectItem } from "./project-item";

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

      <PanelContent>
        <div className="space-y-8">
          <div>
            <h3 className="mb-4 text-sm font-medium text-muted-foreground">
              Featured Projects
            </h3>
            <div className="space-y-3">
              {featuredProjects.map((project) => (
                <ProjectItem
                  key={project.id}
                  project={project}
                  className="border-primary/30"
                />
              ))}
            </div>
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
      </PanelContent>
    </Panel>
  );
}
