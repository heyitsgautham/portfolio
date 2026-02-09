import type { Metadata } from "next";

import { SITE_INFO } from "@/config/site";
import { ProjectItem } from "@/features/profile/components/projects/project-item";
import { PROJECTS } from "@/features/profile/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: `Explore all ${PROJECTS.length} projects by ${SITE_INFO.name}`,
  openGraph: {
    title: "Projects",
    description: `Explore all ${PROJECTS.length} projects by ${SITE_INFO.name}`,
    url: "/projects",
  },
};

export default function ProjectsPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          All Projects
          <sup className="ml-2 font-mono text-lg text-muted-foreground">
            ({PROJECTS.length})
          </sup>
        </h1>
        <p className="text-lg text-muted-foreground">
          A comprehensive collection of my work in AI, ML, automation, and
          software development.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
