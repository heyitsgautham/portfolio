import type { Metadata } from "next";

import { ResumePageWrapper } from "./resume-page-wrapper";

export const metadata: Metadata = {
  title: "Resume",
  description: "View and download Gautham Krishna's resume.",
  alternates: { canonical: "/resume" },
  openGraph: {
    title: "Resume",
    description: "View and download Gautham Krishna's resume.",
    url: "/resume",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume",
    description: "View and download Gautham Krishna's resume.",
  },
};

export default function Page() {
  return <ResumePageWrapper />;
}
