import { existsSync } from "node:fs";
import path from "node:path";

import { isValidElement } from "react";
import { describe, expect, it } from "vitest";

import { getIcon } from "@/components/icons";

import { CERTIFICATIONS } from "./certifications";

const publicFile = (p: string) =>
  existsSync(path.join(process.cwd(), "public", p));

describe("CERTIFICATIONS", () => {
  it("dates every certificate with a valid ISO day", () => {
    for (const cert of CERTIFICATIONS) {
      expect(cert.issueDate, cert.title).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(Date.parse(cert.issueDate)), cert.title).toBe(false);
    }
  });

  it("uses each title once", () => {
    const titles = CERTIFICATIONS.map((cert) => cert.title);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("shows only certificate images and logos that exist in public/", () => {
    for (const cert of CERTIFICATIONS) {
      for (const src of [cert.certificateImageURL, cert.issuerLogoURL]) {
        if (src && src.startsWith("/")) expect(publicFile(src), src).toBe(true);
      }
    }
  });

  it("names a known icon whenever it relies on one", () => {
    for (const cert of CERTIFICATIONS) {
      if (
        !cert.certificateImageURL &&
        !cert.issuerLogoURL &&
        cert.issuerIconName
      ) {
        expect(isValidElement(getIcon(cert.issuerIconName)), cert.title).toBe(
          true
        );
      }
    }
  });
});
