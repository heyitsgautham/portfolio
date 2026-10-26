import { act, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const nav = vi.hoisted(() => ({ pathname: "/" }));
const scroll = vi.hoisted(() => ({
  onChange: (() => {}) as (value: number) => void,
}));

vi.mock("next/navigation", () => ({ usePathname: () => nav.pathname }));
vi.mock("motion/react", () => ({
  useScroll: () => ({ scrollY: {} }),
  useMotionValueEvent: (
    _v: unknown,
    _e: string,
    handler: (n: number) => void
  ) => {
    scroll.onChange = handler;
  },
}));

import { SiteHeaderMark } from "./site-header-mark";

const mark = (container: HTMLElement) => container.querySelector("svg")!;

afterEach(() => {
  document.getElementById("js-cover-mark")?.remove();
});

describe("SiteHeaderMark", () => {
  it("always shows the static mark away from the home page", () => {
    nav.pathname = "/projects";
    const { container } = render(<SiteHeaderMark />);

    expect(mark(container)).not.toHaveAttribute("data-visible");
  });

  it("reveals the home mark after scrolling past 160px by default", () => {
    nav.pathname = "/";
    const { container } = render(<SiteHeaderMark />);
    expect(mark(container)).toHaveAttribute("data-visible", "false");

    act(() => scroll.onChange(159));
    expect(mark(container)).toHaveAttribute("data-visible", "false");

    act(() => scroll.onChange(160));
    expect(mark(container)).toHaveAttribute("data-visible", "true");
  });

  it("waits until the cover mark scrolls under the header", () => {
    nav.pathname = "/index";
    const cover = document.createElement("div");
    cover.id = "js-cover-mark";
    cover.getBoundingClientRect = () => ({ top: 300, height: 100 }) as DOMRect;
    document.body.append(cover);

    const { container } = render(<SiteHeaderMark />);

    // 300 top + 100 height - 56 header = 344
    act(() => scroll.onChange(343));
    expect(mark(container)).toHaveAttribute("data-visible", "false");
    act(() => scroll.onChange(344));
    expect(mark(container)).toHaveAttribute("data-visible", "true");
  });
});
