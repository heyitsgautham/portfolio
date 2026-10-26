import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CERTIFICATIONS } from "@/features/profile/data/certifications";

import CertificatesPage, { metadata } from "./page";

describe("CertificatesPage", () => {
  it("shows every certification, not just the home page's first three", () => {
    render(<CertificatesPage />);

    expect(screen.getAllByRole("article")).toHaveLength(CERTIFICATIONS.length);
  });

  it("titles the page and sets its canonical URL", () => {
    render(<CertificatesPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Certificates" })
    ).toBeInTheDocument();
    expect(metadata.alternates?.canonical).toBe("/certificates");
  });
});
