import type { Metadata } from "next";

import { SITE_INFO } from "@/config/site";
import { ProjectGalleryCard } from "@/features/profile/components/projects/project-gallery-card";
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
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight">
          Projects
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project) => (
          <ProjectGalleryCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
