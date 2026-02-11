import dayjs from "dayjs";
import type { ProfilePage as PageSchema, WithContext } from "schema-dts";

import { Certifications } from "@/features/profile/components/certifications";
import { Education } from "@/features/profile/components/education";
import { Timeline } from "@/features/profile/components/timeline";
import { Experiences } from "@/features/profile/components/experiences";
import { GitHubContributions } from "@/features/profile/components/github-contributions";
import { ProfileCover } from "@/features/profile/components/profile-cover";
import { ProfileHero } from "@/features/profile/components/profile-hero";
import { Projects } from "@/features/profile/components/projects";
import { TechStack } from "@/features/profile/components/tech-stack";
import { USER } from "@/features/profile/data/user";
import { cn } from "@/lib/utils";

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPageJsonLd()).replace(/</g, "\\u003c"),
        }}
      />

      <ProfileCover />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ProfileHero />
        <Separator />

        <GitHubContributions />
        <Separator />

        <TechStack />
        <Separator />

        <Experiences />
        <Separator />

        <Projects />
        <Separator />

        <Education />
        <Separator />

        <Timeline />
        <Separator />

        <Certifications />
      </div>
    </>
  );
}

function getPageJsonLd(): WithContext<PageSchema> {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateCreated: dayjs(USER.dateCreated).toISOString(),
    dateModified: dayjs().toISOString(),
    mainEntity: {
      "@type": "Person",
      name: USER.displayName,
      identifier: USER.username,
      image: USER.avatar,
    },
  };
}

function Separator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-20 w-full sm:h-24",
        "before:absolute before:top-1/2 before:left-0 before:-z-1 before:h-px before:w-full before:-translate-y-1/2",
        "before:bg-gradient-to-r before:from-transparent before:via-border before:to-transparent",
        className
      )}
    />
  );
}
