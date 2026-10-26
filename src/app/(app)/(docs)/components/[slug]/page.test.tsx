import { describe, expect, it, vi } from "vitest";

import type { Post } from "@/types/post";

const post: Post = {
  slug: "flip-sentences",
  content: "",
  metadata: {
    title: "Flip Sentences",
    description: "Rotates through sentences.",
    category: "components",
    createdAt: "2025-01-01",
    updatedAt: "2025-02-01",
  },
};

vi.mock("@/lib/content", () => ({
  getPostsByCategory: vi.fn(async () => [post]),
  getPostBySlug: vi.fn(async (slug: string) =>
    slug === post.slug ? post : undefined
  ),
  findNeighbour: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  notFound: vi.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
}));

import { generateMetadata, generateStaticParams } from "./page";

const params = (slug: string) => ({ params: Promise.resolve({ slug }) });

describe("component docs page", () => {
  it("pre-renders one page per component post", async () => {
    expect(await generateStaticParams()).toEqual([{ slug: "flip-sentences" }]);
  });

  it("calls notFound for an unknown slug", async () => {
    await expect(generateMetadata(params("no-such-component"))).rejects.toThrow(
      "NEXT_NOT_FOUND"
    );
  });

  it("builds canonical, article dates and a generated Open Graph image", async () => {
    const meta = await generateMetadata(params("flip-sentences"));
    const ogImage = "/og/simple?title=Flip%20Sentences";

    expect(meta.title).toBe("Flip Sentences");
    expect(meta.alternates?.canonical).toBe("/components/flip-sentences");
    expect(meta.openGraph).toMatchObject({
      url: "/components/flip-sentences",
      type: "article",
      // dayjs reads a bare date as local midnight.
      publishedTime: new Date(2025, 0, 1).toISOString(),
      modifiedTime: new Date(2025, 1, 1).toISOString(),
      images: { url: ogImage, width: 1200, height: 630 },
    });
    expect(meta.twitter).toMatchObject({ images: [ogImage] });
  });

  it("prefers the post's own image for Open Graph", async () => {
    post.metadata.image = "/images/flip.png";
    const meta = await generateMetadata(params("flip-sentences"));
    delete post.metadata.image;

    expect(meta.twitter).toMatchObject({ images: ["/images/flip.png"] });
  });
});
