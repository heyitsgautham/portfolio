import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { MobileNav } from "./mobile-nav";

const items = [
  { title: "About", href: "/#about" },
  { title: "Projects", href: "/projects" },
];

const toggle = () => screen.getByRole("button", { name: "Toggle Menu" });
const panel = () => screen.getByText("About").closest("[data-slot]")!;

describe("MobileNav", () => {
  it("starts closed with scrolling allowed", () => {
    render(<MobileNav items={items} />);

    expect(panel()).toHaveAttribute("data-slot", "closed");
    expect(document.body.style.overflow).toBe("");
  });

  it("opens on toggle and locks page scroll behind the menu", async () => {
    const user = userEvent.setup();
    render(<MobileNav items={items} />);

    await user.click(toggle());

    expect(panel()).toHaveAttribute("data-slot", "open");
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("closes and unlocks scroll when a link is chosen", async () => {
    const user = userEvent.setup();
    render(<MobileNav items={items} />);

    await user.click(toggle());
    await user.click(screen.getByRole("link", { name: "Projects" }));

    expect(panel()).toHaveAttribute("data-slot", "closed");
    expect(document.body.style.overflow).toBe("");
  });

  it("restores scrolling if it unmounts while open", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<MobileNav items={items} />);

    await user.click(toggle());
    unmount();

    expect(document.body.style.overflow).toBe("");
  });

  it("links every nav item", () => {
    render(<MobileNav items={items} />);

    expect(
      screen
        .getAllByRole("link", { hidden: true })
        .map((a) => a.getAttribute("href"))
    ).toEqual(["/#about", "/projects"]);
  });
});
