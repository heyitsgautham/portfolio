import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { PROJECTS } from "../../data/projects";
import { Panel, PanelContent, PanelHeader, PanelTitle } from "../panel";
import { ProjectItem } from "./project-item";
import { ProjectListItem } from "./project-list-item";

export function Projects() {
  const featuredProjects = PROJECTS.slice(0, 3);
  const moreProjects = PROJECTS.slice(3, 8);

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

          {moreProjects.length > 0 && (
            <div className="space-y-2">
              {moreProjects.map((project) => (
                <ProjectListItem key={project.id} project={project} />
              ))}
            </div>
          )}

          {PROJECTS.length > 8 && (
            <div className="flex justify-center pt-4">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-medium transition-all hover:border-primary/50 hover:bg-card/80 hover:shadow-md"
              >
                <span>View All {PROJECTS.length} Projects</span>
                <ArrowRightIcon className="size-4" aria-hidden />
              </Link>
            </div>
          )}
        </div>
      </PanelContent>
    </Panel>
  );
}
