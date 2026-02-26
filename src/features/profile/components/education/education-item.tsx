import Image from "next/image";

import type { Education } from "../../types/education";

export function EducationItem({
  className,
  education,
}: {
  className?: string;
  education: Education;
}) {
  return (
    <article
      className={`group relative overflow-hidden rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-border hover:bg-card hover:shadow-lg ${className ?? ""}`}
    >
      <div className="flex flex-col gap-3 p-5">
        <div className="flex items-start gap-4">
          {education.logo ? (
            <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-background ring-2 ring-border">
              <Image
                src={education.logo}
                alt={`${education.institution} logo`}
                fill
                className="object-contain p-1.5"
              />
            </div>
          ) : (
            <div
              className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary ring-2 ring-primary/20"
              aria-hidden
            >
              <span className="text-lg font-bold">
                {education.institution.charAt(0)}
              </span>
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h3 className="mb-1 leading-tight font-semibold text-balance">
              {education.degree}
            </h3>

            <div className="mb-1 text-sm text-muted-foreground">
              {education.institution}
            </div>

            {education.location && (
              <div className="text-xs text-muted-foreground">
                {education.location}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 text-sm items-start">
          <div className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 font-mono text-xs">
            {education.period}
          </div>

          {education.achievements && (
            <div className="text-xs text-muted-foreground">
              {education.achievements}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
