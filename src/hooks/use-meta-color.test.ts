import { renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { META_THEME_COLORS } from "@/config/site";

import { useMetaColor } from "./use-meta-color";

const theme = vi.hoisted(() => ({
  resolvedTheme: undefined as string | undefined,
}));
vi.mock("next-themes", () => ({ useTheme: () => theme }));

afterEach(() => {
  document.head.innerHTML = "";
});

describe("useMetaColor", () => {
  it("uses the dark color for the dark theme", () => {
    theme.resolvedTheme = "dark";

    const { result } = renderHook(() => useMetaColor());

    expect(result.current.metaColor).toBe(META_THEME_COLORS.dark);
  });

  it("uses the light color for light and unresolved themes", () => {
    theme.resolvedTheme = "light";
    expect(renderHook(() => useMetaColor()).result.current.metaColor).toBe(
      META_THEME_COLORS.light
    );

    theme.resolvedTheme = undefined;
    expect(renderHook(() => useMetaColor()).result.current.metaColor).toBe(
      META_THEME_COLORS.light
    );
  });

  it("writes the color into the theme-color meta tag", () => {
    document.head.innerHTML = '<meta name="theme-color" content="#ffffff">';
    const { result } = renderHook(() => useMetaColor());

    result.current.setMetaColor("#09090b");

    expect(document.querySelector('meta[name="theme-color"]')).toHaveAttribute(
      "content",
      "#09090b"
    );
  });

  it("does nothing when the page has no theme-color tag", () => {
    const { result } = renderHook(() => useMetaColor());

    expect(() => result.current.setMetaColor("#000000")).not.toThrow();
  });
});
