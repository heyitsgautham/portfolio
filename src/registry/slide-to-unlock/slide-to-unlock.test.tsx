import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import {
  SlideToUnlock,
  SlideToUnlockHandle,
  SlideToUnlockText,
  SlideToUnlockTrack,
} from "./slide-to-unlock";

function renderSlider(
  children?: React.ComponentProps<typeof SlideToUnlockText>["children"]
) {
  return render(
    <SlideToUnlock handleWidth={48}>
      <SlideToUnlockTrack>
        <SlideToUnlockText>{children ?? "slide to unlock"}</SlideToUnlockText>
        <SlideToUnlockHandle />
      </SlideToUnlockTrack>
    </SlideToUnlock>
  );
}

describe("SlideToUnlock", () => {
  it("lays out the root, track, text and handle slots", () => {
    const { container } = renderSlider();

    for (const slot of ["slide-to-unlock", "track", "text", "handle"]) {
      expect(
        container.querySelector(`[data-slot="${slot}"]`),
        slot
      ).not.toBeNull();
    }
    expect(screen.getByText("slide to unlock")).toBeInTheDocument();
  });

  it("sizes the handle and offsets the text by the handle width", () => {
    const { container } = renderSlider();

    expect(
      (container.querySelector('[data-slot="handle"]') as HTMLElement).style
        .width
    ).toBe("48px");
    expect(
      (container.querySelector('[data-slot="text"]') as HTMLElement).style
        .marginLeft
    ).toBe("48px");
  });

  it("passes the dragging state to a render-function child", () => {
    renderSlider(({ isDragging }) => (isDragging ? "release" : "idle"));

    expect(screen.getByText("idle")).toHaveAttribute("data-dragging", "false");
  });

  it("draws a default arrow when the handle has no children", () => {
    const { container } = renderSlider();

    expect(container.querySelector('[data-slot="handle"] svg')).not.toBeNull();
  });

  it("refuses to render its parts outside SlideToUnlock", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<SlideToUnlockHandle />)).toThrow(
      "SlideToUnlock components must be used within SlideToUnlock"
    );
  });
});
