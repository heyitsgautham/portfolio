import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Swap the enter and exit animation for a plain paragraph, so the test reads
// the sentence state directly instead of waiting on animation frames.
vi.mock("motion/react", () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  motion: {
    p: ({ children, className }: React.ComponentProps<"p">) => (
      <p className={className}>{children}</p>
    ),
  },
}));

import { FlipSentences } from "./flip-sentences";

const sentences = ["one", "two", "three"];

function setVisibility(state: DocumentVisibilityState) {
  Object.defineProperty(document, "visibilityState", {
    configurable: true,
    get: () => state,
  });
  act(() => {
    document.dispatchEvent(new Event("visibilitychange"));
  });
}

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  setVisibility("visible");
  vi.useRealTimers();
});

const shown = () => screen.getByText(/^(one|two|three)$/).textContent;

describe("FlipSentences", () => {
  it("advances every 2.5 seconds and wraps around", () => {
    render(<FlipSentences sentences={sentences} />);
    expect(shown()).toBe("one");

    act(() => vi.advanceTimersByTime(2500));
    expect(shown()).toBe("two");

    act(() => vi.advanceTimersByTime(5000));
    expect(shown()).toBe("one");
  });

  it("pauses while the tab is hidden", () => {
    render(<FlipSentences sentences={sentences} />);

    setVisibility("hidden");
    act(() => vi.advanceTimersByTime(10_000));

    expect(shown()).toBe("one");
  });

  it("shows the next sentence at once when the tab comes back", () => {
    render(<FlipSentences sentences={sentences} />);

    setVisibility("hidden");
    setVisibility("visible");
    expect(shown()).toBe("two");

    act(() => vi.advanceTimersByTime(2500));
    expect(shown()).toBe("three");
  });

  it("stops its timer on unmount", () => {
    const { unmount } = render(<FlipSentences sentences={sentences} />);

    unmount();

    expect(vi.getTimerCount()).toBe(0);
  });
});
