import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useScroll } from "./use-scroll";

const scrollTo = (y: number) => {
  Object.defineProperty(window, "scrollY", { value: y, configurable: true });
  window.dispatchEvent(new Event("scroll"));
};

afterEach(() => {
  Object.defineProperty(window, "scrollY", { value: 0, configurable: true });
});

describe("useScroll", () => {
  it("is false at the top of the page", () => {
    const { result } = renderHook(() => useScroll(10));

    expect(result.current).toBe(false);
  });

  it("checks the position on mount, so a reload mid-page starts true", () => {
    Object.defineProperty(window, "scrollY", {
      value: 500,
      configurable: true,
    });

    const { result } = renderHook(() => useScroll(10));

    expect(result.current).toBe(true);
  });

  it("turns true only once the page scrolls past the threshold", () => {
    const { result } = renderHook(() => useScroll(10));

    act(() => scrollTo(10));
    expect(result.current).toBe(false);

    act(() => scrollTo(11));
    expect(result.current).toBe(true);

    act(() => scrollTo(0));
    expect(result.current).toBe(false);
  });

  it("removes the same scroll listener it added on unmount", () => {
    const add = vi.spyOn(window, "addEventListener");
    const remove = vi.spyOn(window, "removeEventListener");
    const { unmount } = renderHook(() => useScroll(10));

    const added = add.mock.calls.find(([type]) => type === "scroll")?.[1];
    unmount();

    expect(added).toBeTypeOf("function");
    expect(remove).toHaveBeenCalledWith("scroll", added);
  });
});
