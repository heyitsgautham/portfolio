import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Code, Heading } from "./typography";

describe("Heading", () => {
  it("renders the requested level, h1 by default", () => {
    const { rerender } = render(<Heading>Title</Heading>);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Title"
    );

    rerender(<Heading as="h3">Title</Heading>);
    expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();
  });

  it("links a heading with an id to its own anchor", () => {
    render(
      <Heading as="h2" id="installation">
        Installation
      </Heading>
    );

    expect(screen.getByRole("link", { name: "Installation" })).toHaveAttribute(
      "href",
      "#installation"
    );
    expect(screen.getByLabelText("Link to section")).toBeInTheDocument();
  });

  it("adds no anchor without an id", () => {
    render(<Heading as="h2">Plain</Heading>);

    expect(screen.queryByRole("link")).toBeNull();
  });
});

describe("Code", () => {
  it("marks fenced code as a block and leaves it unstyled", () => {
    render(<Code data-language="ts">const a = 1;</Code>);

    const code = screen.getByText("const a = 1;");
    expect(code).toHaveAttribute("data-slot", "code-block");
    expect(code).not.toHaveClass("rounded-md");
  });

  it("styles inline code as a pill", () => {
    render(<Code>npm i</Code>);

    const code = screen.getByText("npm i");
    expect(code).toHaveAttribute("data-slot", "code-inline");
    expect(code).toHaveClass("rounded-md");
  });
});
