import { describe, expect, it } from "vitest";

import { getMarkSVG } from "./gk-mark";
import { getWordmarkSVG } from "./gk-wordmark";

function parseSvg(markup: string) {
  const doc = new DOMParser().parseFromString(markup, "image/svg+xml");
  expect(doc.querySelector("parsererror")).toBeNull();
  return doc.documentElement;
}

describe("getMarkSVG", () => {
  it("returns a standalone SVG that spells GK", () => {
    const svg = parseSvg(getMarkSVG());

    expect(svg.tagName).toBe("svg");
    expect(svg.getAttribute("xmlns")).toBe("http://www.w3.org/2000/svg");
    expect(svg.querySelector("text")?.textContent?.replace(/\s/g, "")).toBe(
      "GK"
    );
  });

  it("imports the VT323 font so the file renders outside the site", () => {
    expect(getMarkSVG()).toContain("family=VT323&amp;display=swap");
  });
});

describe("getWordmarkSVG", () => {
  it("fills both lines with the requested colour", () => {
    const svg = parseSvg(getWordmarkSVG("#123456"));
    const texts = [...svg.querySelectorAll("text")];

    expect(texts.map((t) => t.textContent)).toEqual(["gk", ".me"]);
    expect(texts.map((t) => t.getAttribute("fill"))).toEqual([
      "#123456",
      "#123456",
    ]);
  });
});
