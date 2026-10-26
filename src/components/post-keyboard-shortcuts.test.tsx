import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { Post } from "@/types/post";

const router = vi.hoisted(() => ({ push: vi.fn() }));
vi.mock("next/navigation", () => ({ useRouter: () => router }));

import { PostKeyboardShortcuts } from "./post-keyboard-shortcuts";

const post = (slug: string) => ({ slug }) as Post;

beforeEach(() => {
  router.push.mockReset();
});

describe("PostKeyboardShortcuts", () => {
  it("goes to the next post on ArrowRight and the previous on ArrowLeft", () => {
    render(
      <PostKeyboardShortcuts
        basePath="/components"
        previous={post("flip-sentences")}
        next={post("slide-to-unlock")}
      />
    );

    fireEvent.keyDown(document, { key: "ArrowRight" });
    fireEvent.keyDown(document, { key: "ArrowLeft" });

    expect(router.push.mock.calls).toEqual([
      ["/components/slide-to-unlock"],
      ["/components/flip-sentences"],
    ]);
  });

  it("does nothing at either end of the list", () => {
    render(<PostKeyboardShortcuts basePath="/c" previous={null} next={null} />);

    fireEvent.keyDown(document, { key: "ArrowRight" });
    fireEvent.keyDown(document, { key: "ArrowLeft" });

    expect(router.push).not.toHaveBeenCalled();
  });

  it("leaves arrow keys alone inside text fields", () => {
    render(
      <>
        <textarea aria-label="notes" />
        <PostKeyboardShortcuts
          basePath="/c"
          previous={post("a")}
          next={post("b")}
        />
      </>
    );

    fireEvent.keyDown(screen.getByLabelText("notes"), { key: "ArrowRight" });

    expect(router.push).not.toHaveBeenCalled();
  });

  it("ignores other keys and stops listening after unmount", () => {
    const { unmount } = render(
      <PostKeyboardShortcuts
        basePath="/c"
        previous={post("a")}
        next={post("b")}
      />
    );

    fireEvent.keyDown(document, { key: "Enter" });
    unmount();
    fireEvent.keyDown(document, { key: "ArrowRight" });

    expect(router.push).not.toHaveBeenCalled();
  });
});
