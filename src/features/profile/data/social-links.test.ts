import { existsSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { SOCIAL_LINKS } from "./social-links";
import { USER } from "./user";

describe("SOCIAL_LINKS", () => {
  it("uses each title once, since titles label the icon-only links", () => {
    const titles = SOCIAL_LINKS.map((link) => link.title);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("links over https or mailto only", () => {
    for (const link of SOCIAL_LINKS) {
      expect(["https:", "mailto:"], link.title).toContain(
        new URL(link.href).protocol
      );
    }
  });

  it("mails the same address the site encodes for the user", () => {
    const mail = SOCIAL_LINKS.find((link) => link.href.startsWith("mailto:"));
    if (mail) expect(mail.href).toBe(`mailto:${atob(USER.email)}`);
  });

  it("serves image icons from public/", () => {
    for (const link of SOCIAL_LINKS) {
      if (typeof link.icon === "string" && link.icon.startsWith("/")) {
        expect(
          existsSync(path.join(process.cwd(), "public", link.icon)),
          link.icon
        ).toBe(true);
      }
    }
  });
});
