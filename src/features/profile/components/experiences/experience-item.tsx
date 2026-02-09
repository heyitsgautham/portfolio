import Image from "next/image";
import React from "react";

import type { Experience } from "../../types/experiences";
import { ExperiencePositionItem } from "./experience-position-item";

export function ExperienceItem({ experience }: { experience: Experience }) {
  return (
    <div className="relative pb-8 last:pb-0">
      <div className="flex items-start gap-4">
        <div className="relative flex flex-col items-center">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full border-4 border-background bg-card shadow-lg ring-2 ring-border select-none">
            {experience.companyLogo ? (
              <Image
                src={experience.companyLogo}
                alt={experience.companyName}
                width={32}
                height={32}
                quality={100}
                className="rounded-full"
                unoptimized
                aria-hidden
              />
            ) : (
              <span className="flex size-3 rounded-full bg-muted-foreground" />
            )}
          </div>
          <div className="absolute top-12 h-[calc(100%+2rem)] w-0.5 bg-gradient-to-b from-border via-border/50 to-transparent" />
        </div>

        <div className="flex-1 space-y-4 pt-1">
          <div className="flex items-center gap-3">
            <h3 className="text-xl leading-tight font-semibold">
              {experience.companyName}
            </h3>

            {experience.isCurrentEmployer && (
              <span className="relative flex items-center justify-center">
                <span className="absolute inline-flex size-4 animate-ping rounded-full bg-info opacity-50" />
                <span className="relative inline-flex size-3 rounded-full bg-info" />
                <span className="sr-only">Current Employer</span>
              </span>
            )}
          </div>

          <div className="space-y-4">
            {experience.positions.map((position) => (
              <ExperiencePositionItem key={position.id} position={position} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
