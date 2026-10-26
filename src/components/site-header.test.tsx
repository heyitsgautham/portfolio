import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { MAIN_NAV } from "@/config/site";

vi.mock("next/navigation", () => ({ usePathname: () => "/projects" }));
// next/dynamic never resolves its loader under jsdom, so render the
// lazily loaded header parts directly, in the order site-header.tsx
// declares them.
vi.mock("next/dynamic", async () => {
  const brand = await import("./brand-context-menu");
  const mobile = await import("./mobile-nav");
  const parts = [brand.BrandContextMenu, mobile.MobileNav];
  let next = 0;
  return { default: () => parts[next++ % parts.length] };
});
vi.mock("next-themes", () => ({
  useTheme: () => ({ resolvedTheme: "dark", setTheme: vi.fn() }),
}));

import { SiteHeader } from "./site-header";

function scrollTo(y: number) {
  Object.defineProperty(window, "scrollY", { configurable: true, value: y });
  act(() => {
    fireEvent.scroll(window);
  });
}

afterEach(() => {
  scrollTo(0);
});

describe("SiteHeader", () => {
  it("links home and to every main nav page", () => {
    render(<SiteHeader />);

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/"
    );
    for (const item of MAIN_NAV) {
      expect(
        screen.getAllByRole("link", { name: item.title })[0]
      ).toHaveAttribute("href", item.href);
    }
  });

  it("marks the current section in the desktop nav", () => {
    render(<SiteHeader />);

    const nav = screen.getAllByRole("navigation")[0];
    expect(nav).toHaveAttribute("data-active-id", "/projects");
  });

  it("affixes and frosts the header once the page scrolls", () => {
    render(<SiteHeader />);
    const header = screen.getByRole("banner");
    expect(header).toHaveAttribute("data-affix", "false");
    expect(header).not.toHaveClass("backdrop-blur-xl");

    scrollTo(20);

    expect(header).toHaveAttribute("data-affix", "true");
    expect(header).toHaveClass("backdrop-blur-xl");
  });
});
