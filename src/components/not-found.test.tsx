import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import RootNotFound, { metadata } from "@/app/not-found";

import { NotFound } from "./not-found";

describe("NotFound", () => {
  it("tells the visitor the page is missing and links home", () => {
    render(<NotFound />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("404");
    expect(screen.getByRole("link", { name: /return home/i })).toHaveAttribute(
      "href",
      "/"
    );
  });

  it("fills the screen on the root not-found page", () => {
    const { container } = render(<RootNotFound />);

    expect(container.firstElementChild).toHaveClass("h-screen");
    expect(metadata.title).toBe("Page Not Found");
  });
});
