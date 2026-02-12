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

  // If certificate image is provided, show full certificate image
  if (certification.certificateImageURL) {
    return (
      <article
        className={`group relative flex h-full flex-col overflow-hidden rounded-lg border border-border/50 bg-card transition-all hover:border-primary/30 hover:shadow-lg ${className}`}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={certification.certificateImageURL}
            alt={certification.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>

        <div className="flex flex-1 flex-col items-center justify-between gap-3 border-t border-border/50 bg-card p-4">
          <h3 className="font-semibold text-balance text-center line-clamp-2">
            {certification.title}
          </h3>

          <a
            href={certification.credentialURL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-white/80 hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            <span>View Certificate</span>
            <ExternalLinkIcon className="size-4" aria-hidden />
          </a>
        </div>
      </article>
    );
  }

  // Default view with icon/logo
  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-lg border border-border/50 bg-card transition-all hover:border-primary/30 hover:shadow-lg ${className}`}
    >
      <div className="flex flex-1 flex-col items-center gap-4 p-6 text-center">
        <div className="flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 p-4 ring-2 ring-primary/20 transition-all group-hover:scale-105 group-hover:ring-primary/40">
          {certification.issuerLogoURL ? (
            <Image
              src={certification.issuerLogoURL}
              alt={certification.issuer}
              width={64}
              height={64}
              quality={100}
              className="size-full object-contain select-none"
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

      <div className="flex items-center justify-center border-t border-border/50 bg-card p-3">
        <a
          href={certification.credentialURL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-white/80 hover:underline"
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
