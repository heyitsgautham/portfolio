import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ShimmeringText } from "./shimmering-text";

describe("ShimmeringText", () => {
  it("keeps the full text readable", () => {
    const { container } = render(<ShimmeringText text="Thinking..." />);

    expect(container.firstElementChild).toHaveTextContent(/^Thinking\.\.\.$/);
  });

  it("wraps each character in its own span so it can animate", () => {
    const { container } = render(<ShimmeringText text="abc" />);

    const outer = container.firstElementChild!;
    expect([...outer.children].map((c) => c.textContent)).toEqual([
      "a",
      "b",
      "c",
    ]);
  });

  it("passes className and other props to the outer span", () => {
    const { container } = render(
      <ShimmeringText text="hi" className="text-lg" data-testid="shimmer" />
    );

    expect(container.firstElementChild).toHaveClass("text-lg");
    expect(screen.getByTestId("shimmer")).toBe(container.firstElementChild);
  });

  it("renders nothing inside for empty text", () => {
    const { container } = render(<ShimmeringText text="" />);

    expect(container.firstElementChild?.children).toHaveLength(0);
  });
});
