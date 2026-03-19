import Image from "next/image";
import Link from "next/link";

import { Tag } from "@/components/ui/tag";
import { cn } from "@/lib/utils";

import type { Project } from "../../types/projects";

export function FeaturedProjectCard({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border border-border bg-card/50 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card hover:shadow-lg",
        className
      )}
    >
      {/* Cover image */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted/30">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-muted/20 to-primary/10 transition-all group-hover:from-primary/10 group-hover:to-primary/15" />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="truncate font-mono text-base font-semibold">
          {project.title.split(" - ")[0]}
        </h3>

        {project.summary && (
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {project.summary}
          </p>
        )}

        {project.skills.length > 0 && (
          <ul className="mt-auto flex flex-wrap gap-1.5 pt-1">
            {project.skills.slice(0, 4).map((skill) => (
              <li key={skill}>
                <Tag className="text-xs">{skill}</Tag>
              </li>
            ))}
            {project.skills.length > 4 && (
              <li>
                <Tag className="text-xs">+{project.skills.length - 4}</Tag>
              </li>
            )}
          </ul>
        )}
      </div>
    </Link>
  );
}
