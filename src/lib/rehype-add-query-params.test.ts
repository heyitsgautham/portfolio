import { describe, expect, it } from "vitest";

import type { UnistNode, UnistTree } from "@/types/unist";

import { rehypeAddQueryParams } from "./rehype-add-query-params";

const link = (href?: string): UnistNode => ({
  type: "element",
  tagName: "a",
  properties: href === undefined ? {} : { href },
  children: [],
});

const run = (...nodes: UnistNode[]) => {
  const tree: UnistTree = { type: "root", children: nodes };
  rehypeAddQueryParams({ utm_source: "portfolio" })(tree);
  return tree.children.map((n) => n.properties?.href);
};

describe("rehypeAddQueryParams", () => {
  it("adds the params to absolute external links", () => {
    expect(run(link("https://example.com/post"))).toEqual([
      "https://example.com/post?utm_source=portfolio",
    ]);
  });

  it("skips internal, anchor, mailto and tel links", () => {
    expect(
      run(
        link("/projects"),
        link("#contact"),
        link("mailto:hi@example.com"),
        link("tel:+84123")
      )
    ).toEqual(["/projects", "#contact", "mailto:hi@example.com", "tel:+84123"]);
  });

  it("ignores anchors without an href and non-anchor elements", () => {
    const img: UnistNode = {
      type: "element",
      tagName: "img",
      properties: { href: "https://example.com/a.png" },
    };

    expect(run(link(), img)).toEqual([undefined, "https://example.com/a.png"]);
  });

  it("rewrites links nested deep in the tree", () => {
    const paragraph: UnistNode = {
      type: "element",
      tagName: "p",
      children: [link("https://example.com")],
    };
    const tree: UnistTree = { type: "root", children: [paragraph] };

    rehypeAddQueryParams({ ref: "gk" })(tree);

    expect(paragraph.children?.[0].properties?.href).toBe(
      "https://example.com/?ref=gk"
    );
  });
});
