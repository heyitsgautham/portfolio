import type { Person, WebSite, WithContext } from "schema-dts";

import { SITE_INFO } from "@/config/site";
import { EDUCATION } from "@/features/profile/data/education";
import { SOCIAL_LINKS } from "@/features/profile/data/social-links";
import { USER } from "@/features/profile/data/user";

/** Structured data for the site itself, rendered in the root layout. */
export function getWebSiteJsonLd(): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_INFO.name,
    url: SITE_INFO.url,
    alternateName: [USER.username],
  };
}

/** Structured data describing GK, rendered in the root layout. */
export function getPersonJsonLd(): WithContext<Person> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Gautham Krishna",
    alternateName: ["Gautham Krishna S", USER.username, "GK"],
    givenName: USER.firstName,
    familyName: USER.lastName,
    jobTitle: USER.jobTitle,
    description: USER.bio,
    url: SITE_INFO.url,
    email: "heyitsgautham@gmail.com",
    image: `${SITE_INFO.url}${USER.avatar}`,
    sameAs: SOCIAL_LINKS.map((link) => link.href),
    alumniOf: EDUCATION.map((edu) => ({
      "@type": "EducationalOrganization",
      name: edu.institution,
      url: edu.referenceLink,
    })),
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "Large Language Models",
      "Retrieval-Augmented Generation",
      "Deep Learning",
      "PyTorch",
      "TensorFlow",
      "Natural Language Processing",
      "Computer Vision",
      "Cloud Computing",
      "AWS",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chennai",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    worksFor: USER.jobs.map((job) => ({
      "@type": "Organization",
      name: job.company,
      url: job.website,
    })),
  };
}
