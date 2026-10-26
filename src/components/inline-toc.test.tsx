import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { InlineTOC } from "./inline-toc";

const items = [
  { title: "Installation", url: "#installation", depth: 2 },
  { title: "CLI", url: "#cli", depth: 3 },
  { title: "Usage", url: "#usage", depth: 2 },
];

describe("InlineTOC", () => {
  it("renders nothing without headings", () => {
    const { container } = render(<InlineTOC items={[]} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("labels the toggle On this page unless given children", () => {
    const { rerender } = render(<InlineTOC items={items} />);
    expect(screen.getByRole("button")).toHaveTextContent("On this page");

    rerender(<InlineTOC items={items}>Contents</InlineTOC>);
    expect(screen.getByRole("button")).toHaveTextContent("Contents");
  });

  it("links each heading and indents nested ones", async () => {
    const user = userEvent.setup();
    render(<InlineTOC items={items} />);

    await user.click(screen.getByRole("button"));

    expect(screen.getByRole("link", { name: "CLI" })).toHaveAttribute(
      "href",
      "#cli"
    );
    const indent = (name: string) =>
      screen.getByRole("link", { name }).closest("li")!.style
        .paddingInlineStart;
    expect(parseInt(indent("Installation"), 10)).toBe(0);
    expect(indent("CLI")).toBe("16px");
  });
});
