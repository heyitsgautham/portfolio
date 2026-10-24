import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useMediaQuery } from "./use-media-query";

type Listener = (event: { matches: boolean }) => void;

const stubMatchMedia = (initial: boolean) => {
  const listeners = new Set<Listener>();
  const matchMedia = vi.fn((query: string) => ({
    matches: initial,
    media: query,
    addEventListener: (
      _type: string,
      listener: Listener,
      options?: { signal?: AbortSignal }
    ) => {
      listeners.add(listener);
      options?.signal?.addEventListener("abort", () =>
        listeners.delete(listener)
      );
    },
  }));
  vi.stubGlobal("matchMedia", matchMedia);

  return {
    matchMedia,
    listeners,
    emit: (matches: boolean) =>
      listeners.forEach((listener) => listener({ matches })),
  };
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("useMediaQuery", () => {
  it("reports the current match after mount", () => {
    stubMatchMedia(true);

    const { result } = renderHook(() => useMediaQuery("(min-width: 640px)"));

    expect(result.current).toBe(true);
  });

  it("updates when the media query starts or stops matching", () => {
    const media = stubMatchMedia(false);
    const { result } = renderHook(() => useMediaQuery("(min-width: 640px)"));

    act(() => media.emit(true));
    expect(result.current).toBe(true);

    act(() => media.emit(false));
    expect(result.current).toBe(false);
  });

  it("removes its listener on unmount", () => {
    const media = stubMatchMedia(false);
    const { unmount } = renderHook(() => useMediaQuery("(hover: hover)"));

    expect(media.listeners.size).toBe(1);
    unmount();
    expect(media.listeners.size).toBe(0);
  });

  it("subscribes to the new query when the query changes", () => {
    const media = stubMatchMedia(false);
    const { rerender } = renderHook(({ query }) => useMediaQuery(query), {
      initialProps: { query: "(min-width: 640px)" },
    });

    rerender({ query: "(min-width: 1024px)" });

    expect(media.matchMedia).toHaveBeenLastCalledWith("(min-width: 1024px)");
    expect(media.listeners.size).toBe(1);
  });
});
