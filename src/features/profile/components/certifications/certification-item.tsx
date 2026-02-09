"use client";

import dayjs from "dayjs";
import { ExternalLinkIcon, ShieldCheckIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

import { getIcon, Icons } from "@/components/icons";

import type { Certification } from "../../types/certifications";

export function CertificationItem({
  className,
  certification,
}: {
  className?: string;
  certification: Certification;
}) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card hover:shadow-lg ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col items-center gap-4 p-6 text-center">
        <div className="flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 p-4 ring-2 ring-primary/20 transition-all group-hover:scale-105 group-hover:ring-primary/40">
          {certification.issuerLogoURL ? (
            <Image
              src={certification.issuerLogoURL}
              alt={certification.issuer}
              width={64}
              height={64}
              quality={100}
              className="size-full object-contain select-none"
              unoptimized
              aria-hidden="true"
            />
          ) : (
            <div className="text-primary [&_svg]:size-10" aria-hidden="true">
              {getIcon(certification.issuerIconName) ?? <Icons.certificate />}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <h3 className="leading-tight font-semibold text-balance line-clamp-2">
            {certification.title}
          </h3>

          <p className="text-sm text-muted-foreground">{certification.issuer}</p>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-xs font-medium">
          <ShieldCheckIcon className="size-3.5" aria-hidden />
          <time dateTime={dayjs(certification.issueDate).toISOString()}>
            {dayjs(certification.issueDate).format("MMM YYYY")}
          </time>
        </div>
      </div>

      <div
        className={`absolute inset-x-0 bottom-0 flex items-center justify-center border-t border-border/50 bg-primary/10 p-3 transition-all ${
          isHovered
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0"
        }`}
      >
        <a
          href={certification.credentialURL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          onClick={(e) => e.stopPropagation()}
        >
          <span>View Certificate</span>
          <ExternalLinkIcon className="size-4" aria-hidden />
        </a>
      </div>

      {certification.credentialID && (
        <div className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100">
          <div className="rounded-md bg-background/95 px-2 py-1 text-xs font-mono text-muted-foreground shadow-sm">
            ID: {certification.credentialID.substring(0, 8)}...
          </div>
        </div>
      )}
    </article>
  );
}
