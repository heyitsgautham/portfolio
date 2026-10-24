import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import type { Post } from "@/types/post";

import { findNeighbour, getPostBySlug, getPostsByCategory } from "./content";

let root: string;

const writePost = (slug: string, frontmatter: Record<string, string>) => {
  const yaml = Object.entries(frontmatter)
    .map(([key, value]) => `${key}: "${value}"`)
    .join("\n");
  fs.writeFileSync(
    path.join(root, "src/content", `${slug}.mdx`),
    `---\n${yaml}\n---\n\nBody of ${slug}.\n`
  );
};

beforeAll(() => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), "portfolio-content-"));
  fs.mkdirSync(path.join(root, "src/content"), { recursive: true });

  writePost("old-component", {
    title: "Old",
    category: "components",
    createdAt: "2024-01-01",
  });
  writePost("new-component", {
    title: "New",
    category: "components",
    createdAt: "2025-06-01",
  });
  writePost("a-note", {
    title: "Note",
    category: "notes",
    createdAt: "2025-01-01",
  });
  fs.writeFileSync(path.join(root, "src/content", "README.md"), "# skip me");
});

afterAll(() => {
  fs.rmSync(root, { recursive: true, force: true });
});

beforeEach(() => {
  vi.spyOn(process, "cwd").mockReturnValue(root);
});

describe("getPostsByCategory", () => {
  it("returns only the posts in that category, newest first", async () => {
    const posts = await getPostsByCategory("components");

    expect(posts.map((p) => p.slug)).toEqual([
      "new-component",
      "old-component",
    ]);
    expect(posts[0].metadata.title).toBe("New");
    expect(posts[0].content.trim()).toBe("Body of new-component.");
  });

  it("returns an empty list for an unknown category", async () => {
    expect(await getPostsByCategory("missing")).toEqual([]);
  });

  it("returns an empty list when the content folder does not exist", async () => {
    vi.spyOn(process, "cwd").mockReturnValue(os.tmpdir());

    expect(await getPostsByCategory("components")).toEqual([]);
  });
});

describe("getPostBySlug", () => {
  it("finds a post by its file name", async () => {
    const post = await getPostBySlug("a-note");

    expect(post?.metadata.category).toBe("notes");
  });

  it("returns undefined for a slug with no file", async () => {
    expect(await getPostBySlug("nope")).toBeUndefined();
  });
});

describe("findNeighbour", () => {
  const post = (slug: string) => ({ slug }) as Post;
  const posts = [post("a"), post("b"), post("c")];

  it("returns the posts on either side", async () => {
    const { previous, next } = await findNeighbour(posts, "b");

    expect(previous?.slug).toBe("a");
    expect(next?.slug).toBe("c");
  });

  it("returns null past either end", async () => {
    expect((await findNeighbour(posts, "a")).previous).toBeNull();
    expect((await findNeighbour(posts, "c")).next).toBeNull();
  });

  it("returns two nulls for an unknown slug", async () => {
    expect(await findNeighbour(posts, "z")).toEqual({
      previous: null,
      next: null,
    });
  });
});
