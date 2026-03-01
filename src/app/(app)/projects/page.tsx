import type { Metadata } from "next";
import type { CollectionPage, WithContext } from "schema-dts";

import { SITE_INFO } from "@/config/site";
import { ProjectGalleryCard } from "@/features/profile/components/projects/project-gallery-card";
import { PROJECTS } from "@/features/profile/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: `Explore all ${PROJECTS.length} projects by ${SITE_INFO.name}`,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects",
    description: `Explore all ${PROJECTS.length} projects by ${SITE_INFO.name}`,
    url: "/projects",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects",
    description: `Explore all ${PROJECTS.length} projects by ${SITE_INFO.name}`,
  },
};

const jsonLd: WithContext<CollectionPage> = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Projects",
  description: `Explore all ${PROJECTS.length} projects by ${SITE_INFO.name}`,
  url: `${SITE_INFO.url}/projects`,
  mainEntity: {
    "@type": "ItemList",
    itemListElement: PROJECTS.map((project, index) => ({
      "@type": "ListItem" as const,
      position: index + 1,
      url: `${SITE_INFO.url}/projects/${project.slug}`,
      name: project.title,
    })),
  },
};

export default function ProjectsPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project) => (
          <ProjectGalleryCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
