import type { Metadata } from "next";

import { ResumePageWrapper } from "./resume-page-wrapper";

export const metadata: Metadata = {
  title: "Resume",
  description: "View and download Gautham Krishna's resume.",
};

export default function Page() {
  return <ResumePageWrapper />;
}
