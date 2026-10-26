import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CERTIFICATIONS } from "@/features/profile/data/certifications";
import type { Certification } from "@/features/profile/types/certifications";

import { CertificationItem } from "./certification-item";
import { Certifications } from "./index";

const base: Certification = {
  title: "Cloud Practitioner",
  issuer: "AWS",
  issueDate: "2024-11-01",
  credentialID: "ABCDEFGHIJKL",
  credentialURL: "https://verify.example/abc",
};

describe("Certifications", () => {
  it("shows the first three certificates and the total count", () => {
    render(<Certifications />);

    expect(screen.getAllByRole("article")).toHaveLength(
      Math.min(3, CERTIFICATIONS.length)
    );
    expect(screen.getByText(`(${CERTIFICATIONS.length})`)).toBeInTheDocument();
  });

  it("links to the full list when there are more than three", () => {
    render(<Certifications />);

    const more = screen.queryByRole("link", { name: "Show More" });
    if (CERTIFICATIONS.length > 3) {
      expect(more).toHaveAttribute("href", "/certificates");
    } else {
      expect(more).toBeNull();
    }
  });
});

describe("CertificationItem", () => {
  it("shows the certificate image when there is one", () => {
    render(
      <CertificationItem
        certification={{
          ...base,
          certificateImageURL: "/images/certifications/aws_cpe.webp",
        }}
      />
    );

    expect(screen.getByAltText("Cloud Practitioner")).toBeInTheDocument();
    expect(screen.queryByText("AWS")).toBeNull();
  });

  it("otherwise shows the issuer, issue month and a short credential id", () => {
    render(<CertificationItem certification={base} />);

    expect(screen.getByText("AWS")).toBeInTheDocument();
    expect(screen.getByText("Nov 2024")).toHaveAttribute(
      "dateTime",
      expect.stringMatching(/^2024-1[01]-/)
    );
    expect(screen.getByText("ID: ABCDEFGH...")).toBeInTheDocument();
  });

  it("hides the credential badge when there is no id", () => {
    render(<CertificationItem certification={{ ...base, credentialID: "" }} />);

    expect(screen.queryByText(/^ID:/)).toBeNull();
  });

  it("links to the credential in a new tab", () => {
    render(<CertificationItem certification={base} />);

    const link = screen.getByRole("link", { name: /view certificate/i });
    expect(link).toHaveAttribute("href", "https://verify.example/abc");
    expect(link).toHaveAttribute("target", "_blank");
  });
});
