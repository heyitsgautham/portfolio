"use client";

import dynamic from "next/dynamic";

const ResumePage = dynamic(
  () => import("./resume-page").then((mod) => mod.ResumePage),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[calc(100vh-3.5rem)] items-center justify-center bg-[#0a0a0a] sm:h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)]">
        <div className="size-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
      </div>
    ),
  }
);

export function ResumePageWrapper() {
  return <ResumePage />;
}
