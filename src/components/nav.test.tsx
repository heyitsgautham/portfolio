import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { MAIN_NAV } from "@/config/site";

import { Nav } from "./nav";

const items = [
  { title: "Home", href: "/" },
  { title: "Projects", href: "/projects" },
  { title: "Skills", href: "/tech-stack" },
];

const isActive = (name: string) =>
  screen.getByRole("link", { name }).className.includes("after:w-full ");

function activeLinks() {
  return items.map((i) => i.title).filter(isActive);
}

describe("Nav", () => {
  it("renders one link per item in order", () => {
    render(<Nav items={items} />);

    expect(
      screen.getAllByRole("link").map((a) => a.getAttribute("href"))
    ).toEqual(["/", "/projects", "/tech-stack"]);
  });

  it("marks Home active on / and /index only", () => {
    const { rerender } = render(<Nav items={items} activeId="/" />);
    expect(activeLinks()).toEqual(["Home"]);

    rerender(<Nav items={items} activeId="/index" />);
    expect(activeLinks()).toEqual(["Home"]);
  });

  it("keeps a section active on its nested pages", () => {
    render(<Nav items={items} activeId="/projects/sticky-net" />);

    expect(activeLinks()).toEqual(["Projects"]);
  });

  it("marks nothing active without an activeId", () => {
    render(<Nav items={items} />);

    expect(activeLinks()).toEqual([]);
  });

  it("exposes the active id for styling hooks", () => {
    render(<Nav items={MAIN_NAV} activeId="/projects" />);

    expect(screen.getByRole("navigation")).toHaveAttribute(
      "data-active-id",
      "/projects"
    );
  });
});
