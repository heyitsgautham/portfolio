import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ErrorFallback } from "./error-fallback";

type LoggedError = { context: unknown; error: { message: string } };

function loggedErrors(spy: { mock: { calls: unknown[][] } }): LoggedError[] {
  return spy.mock.calls.map(([line]) => JSON.parse(line as string));
}

describe("ErrorFallback", () => {
  it("reports the error once with the boundary's source", () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const error = Object.assign(new Error("render failed"), { digest: "d1" });

    const { rerender } = render(
      <ErrorFallback error={error} reset={() => {}} source="app-page" />
    );
    rerender(
      <ErrorFallback error={error} reset={() => {}} source="app-page" />
    );

    expect(loggedErrors(consoleError)).toEqual([
      expect.objectContaining({
        context: { source: "app-page" },
        error: expect.objectContaining({
          message: "render failed",
          digest: "d1",
        }),
      }),
    ]);
  });

  it("reports again when a new error replaces the old one", () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const { rerender } = render(
      <ErrorFallback error={new Error("a")} reset={() => {}} source="x" />
    );
    rerender(
      <ErrorFallback error={new Error("b")} reset={() => {}} source="x" />
    );

    expect(loggedErrors(consoleError).map((e) => e.error.message)).toEqual([
      "a",
      "b",
    ]);
  });

  it("retries through reset and links home", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const reset = vi.fn();
    const user = userEvent.setup();

    render(<ErrorFallback error={new Error("x")} reset={reset} source="x" />);
    await user.click(screen.getByRole("button", { name: /try again/i }));

    expect(reset).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("link", { name: "Return Home" })).toHaveAttribute(
      "href",
      "/"
    );
  });

  it("shows the digest as a reference only when Next.js provides one", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});

    const { rerender } = render(
      <ErrorFallback error={new Error("x")} reset={() => {}} source="x" />
    );
    expect(screen.getByRole("alert")).not.toHaveTextContent("Reference");

    rerender(
      <ErrorFallback
        error={Object.assign(new Error("y"), { digest: "abc123" })}
        reset={() => {}}
        source="x"
      />
    );
    expect(screen.getByText("Reference: abc123")).toBeInTheDocument();
  });
});
