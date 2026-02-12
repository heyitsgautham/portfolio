import React from "react";

import { CertificationItem } from "@/features/profile/components/certifications/certification-item";
import { CERTIFICATIONS } from "@/features/profile/data/certifications";

export const metadata = {
  title: "Certificates",
  description: "All my certifications and credentials.",
};

export default function CertificatesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Certificates
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          A collection of all my certifications and credentials.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CERTIFICATIONS.map((certification, index) => (
          <CertificationItem
            key={`${certification.title}-${certification.issueDate}-${index}`}
            certification={certification}
          />
        ))}
      </div>
    </div>
  );
}
