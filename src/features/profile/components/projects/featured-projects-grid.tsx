"use client";

import type { Project } from "../../types/projects";
import { ProjectGalleryCard } from "./project-gallery-card";

export function FeaturedProjectsGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectGalleryCard key={project.id} project={project} />
      ))}
    </div>
  );
}
