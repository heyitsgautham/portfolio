import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const nav = vi.hoisted(() => ({ pathname: "/projects" }));
vi.mock("next/navigation", () => ({ usePathname: () => nav.pathname }));
vi.mock("next-themes", () => ({
  useTheme: () => ({ resolvedTheme: "dark", setTheme: vi.fn() }),
}));
// next/dynamic never resolves its loader under jsdom; render nothing for
// the lazily loaded pieces, which have their own tests.
vi.mock("next/dynamic", () => ({ default: () => () => null }));

import AppLayout from "./layout";
import Loading from "./loading";

describe("AppLayout", () => {
  it("wraps the page between the site header and footer", () => {
    render(
      <AppLayout>
        <main>Page body</main>
      </AppLayout>
    );

    const header = screen.getByRole("banner");
    const main = screen.getByRole("main");
    const footer = screen.getByRole("contentinfo");
    expect(main).toHaveTextContent("Page body");
    expect(header.compareDocumentPosition(main)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING
    );
    expect(main.compareDocumentPosition(footer)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING
    );
  });

  it("keeps the footer's copyright line", () => {
    render(<AppLayout>x</AppLayout>);

    expect(screen.getByRole("contentinfo")).toHaveTextContent(
      "Gautham Krishna. All rights reserved."
    );
  });
});

describe("Loading", () => {
  it("shows skeleton placeholders for the hero and three sections", () => {
    const { container } = render(<Loading />);

    expect(container.querySelectorAll(".animate-pulse").length).toBe(4 + 3 * 3);
  });
});
