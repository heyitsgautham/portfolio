import { describe, expect, it } from "vitest";

import { SITE_INFO } from "@/config/site";
import { EDUCATION } from "@/features/profile/data/education";
import { SOCIAL_LINKS } from "@/features/profile/data/social-links";
import { USER } from "@/features/profile/data/user";

import { getPersonJsonLd, getWebSiteJsonLd } from "./json-ld";

describe("getWebSiteJsonLd", () => {
  it("names the site and its canonical URL", () => {
    expect(getWebSiteJsonLd()).toEqual({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_INFO.name,
      url: SITE_INFO.url,
      alternateName: [USER.username],
    });
  });
});

describe("getPersonJsonLd", () => {
  const person = getPersonJsonLd() as unknown as Record<string, unknown>;

  it("describes GK with an absolute avatar URL", () => {
    expect(person).toMatchObject({
      "@type": "Person",
      givenName: USER.firstName,
      familyName: USER.lastName,
      jobTitle: USER.jobTitle,
      url: SITE_INFO.url,
      image: `${SITE_INFO.url}${USER.avatar}`,
    });
  });

  it("links every social profile as sameAs", () => {
    expect(person.sameAs).toEqual(SOCIAL_LINKS.map((link) => link.href));
  });

  it("lists each school and employer as an organization", () => {
    expect(person.alumniOf).toEqual(
      EDUCATION.map((edu) => ({
        "@type": "EducationalOrganization",
        name: edu.institution,
        url: edu.referenceLink,
      }))
    );
    expect(person.worksFor).toEqual(
      USER.jobs.map((job) => ({
        "@type": "Organization",
        name: job.company,
        url: job.website,
      }))
    );
  });
});
