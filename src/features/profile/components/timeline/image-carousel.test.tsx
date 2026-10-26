import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ImageCarousel } from "./image-carousel";

const images = ["/a.webp", "/b.webp", "/c.webp"];

let setIntersecting: (visible: boolean) => void = () => {};

beforeEach(() => {
  vi.useFakeTimers();
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(cb: (entries: { isIntersecting: boolean }[]) => void) {
        setIntersecting = (visible) =>
          act(() => cb([{ isIntersecting: visible }]));
      }
      observe() {}
      disconnect() {}
    }
  );
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

/** Index of the image currently faded in. */
function shown() {
  return screen
    .getAllByRole("img")
    .findIndex((img) => img.className.includes("opacity-100"));
}

describe("ImageCarousel", () => {
  it("starts on the first image", () => {
    render(<ImageCarousel images={images} />);

    expect(shown()).toBe(0);
    expect(screen.getByAltText("Image 1 of 3")).toBeInTheDocument();
  });

  it("steps with the arrows and wraps at both ends", () => {
    render(<ImageCarousel images={images} />);

    fireEvent.click(screen.getByRole("button", { name: "Previous image" }));
    expect(shown()).toBe(2);

    fireEvent.click(screen.getByRole("button", { name: "Next image" }));
    expect(shown()).toBe(0);
  });

  it("jumps to an image from its dot", () => {
    render(<ImageCarousel images={images} />);

    fireEvent.click(screen.getByRole("button", { name: "Go to image 3" }));

    expect(shown()).toBe(2);
  });

  it("keeps arrow clicks from reaching the card around it", () => {
    const onClick = vi.fn();
    render(
      <div onClick={onClick}>
        <ImageCarousel images={images} />
      </div>
    );

    fireEvent.click(screen.getByRole("button", { name: "Next image" }));

    expect(onClick).not.toHaveBeenCalled();
  });

  it("auto-advances every 1.25s only while on screen and not hovered", () => {
    const { container } = render(<ImageCarousel images={images} />);

    act(() => vi.advanceTimersByTime(5000));
    expect(shown()).toBe(0);

    setIntersecting(true);
    act(() => vi.advanceTimersByTime(1250));
    expect(shown()).toBe(1);

    fireEvent.mouseEnter(container.firstElementChild!);
    act(() => vi.advanceTimersByTime(5000));
    expect(shown()).toBe(1);
  });

  it("shows no controls for a single image", () => {
    render(<ImageCarousel images={["/only.webp"]} />);

    expect(screen.queryByRole("button")).toBeNull();
  });

  it("renders nothing for no images, even after having some", () => {
    const { container, rerender } = render(<ImageCarousel images={images} />);

    rerender(<ImageCarousel images={[]} />);

    expect(container).toBeEmptyDOMElement();
  });
});
