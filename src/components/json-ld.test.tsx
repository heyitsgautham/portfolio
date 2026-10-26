import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { JsonLd, serializeJsonLd } from "./json-ld";

const data = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "</script><script>alert(1)</script>",
} as const;

describe("serializeJsonLd", () => {
  it("escapes < so a value cannot close the script tag", () => {
    const json = serializeJsonLd(data);

    expect(json).not.toContain("<");
    expect(json).toContain("\\u003c/script>");
  });

  it("still parses back to the same data", () => {
    expect(JSON.parse(serializeJsonLd(data))).toEqual(data);
  });
});

describe("JsonLd", () => {
  it("renders one JSON-LD script with the serialized data", () => {
    const { container } = render(<JsonLd data={data} />);
    const scripts = container.querySelectorAll(
      'script[type="application/ld+json"]'
    );

    expect(scripts).toHaveLength(1);
    expect(scripts[0].innerHTML).toBe(serializeJsonLd(data));
  });
});
