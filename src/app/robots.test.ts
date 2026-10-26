import { describe, expect, it } from "vitest";

import { SITE_INFO } from "@/config/site";

import robots from "./robots";

describe("robots", () => {
  it("keeps crawlers off the generated image and vCard routes", () => {
    const { rules } = robots();
    const [rule] = Array.isArray(rules) ? rules : [rules];

    expect(rule.userAgent).toBe("*");
    expect(rule.disallow).toEqual(["/og/", "/vcard/"]);
  });

  it("points at the sitemap on the configured site", () => {
    expect(robots().sitemap).toBe(`${SITE_INFO.url}/sitemap.xml`);
  });
});
