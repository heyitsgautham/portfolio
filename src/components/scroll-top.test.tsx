import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

const scroll = vi.hoisted(() => ({
  previous: 0,
  onChange: (() => {}) as (value: number) => void,
}));

vi.mock("motion/react", () => ({
  useScroll: () => ({ scrollY: { getPrevious: () => scroll.previous } }),
  useMotionValueEvent: (
    _value: unknown,
    _event: string,
    handler: (value: number) => void
  ) => {
    scroll.onChange = handler;
  },
}));

import { ScrollTop } from "./scroll-top";

function scrollTo(previous: number, latest: number) {
  scroll.previous = previous;
  act(() => scroll.onChange(latest));
}

const button = () => screen.getByRole("button", { name: "Scroll to top" });

describe("ScrollTop", () => {
  it("stays hidden near the top of the page", () => {
    render(<ScrollTop />);

    expect(button()).toHaveAttribute("data-visible", "false");
    scrollTo(0, 399);
    expect(button()).toHaveAttribute("data-visible", "false");
  });

  it("appears once the page scrolls 400px", () => {
    render(<ScrollTop />);

    scrollTo(350, 400);

    expect(button()).toHaveAttribute("data-visible", "true");
  });

  it("tracks the scroll direction so it can fade while scrolling down", () => {
    render(<ScrollTop />);

    scrollTo(500, 600);
    expect(button()).toHaveAttribute("data-scroll-direction", "down");

    scrollTo(600, 550);
    expect(button()).toHaveAttribute("data-scroll-direction", "up");
  });

  it("scrolls smoothly back to the top on click", async () => {
    const scrollToSpy = vi
      .spyOn(window, "scrollTo")
      .mockImplementation(() => {});
    const user = userEvent.setup();
    render(<ScrollTop />);

    await user.click(button());

    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });
});
