import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { CopyButton } from "./copy-button";

function stubClipboard(writeText: (text: string) => Promise<void>) {
  const spy = vi.fn(writeText);
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText: spy },
  });
  return spy;
}

describe("CopyButton", () => {
  it("copies its value and shows a check mark", async () => {
    const user = userEvent.setup();
    const writeText = stubClipboard(async () => {});
    const { container } = render(<CopyButton value="pnpm add motion" />);

    expect(container.querySelector(".lucide-copy")).not.toBeNull();
    await user.click(screen.getByRole("button", { name: "Copy" }));

    expect(writeText).toHaveBeenCalledWith("pnpm add motion");
    await waitFor(() =>
      expect(container.querySelector(".lucide-check")).not.toBeNull()
    );
  });

  it("shows a failure icon when the clipboard rejects", async () => {
    const user = userEvent.setup();
    stubClipboard(async () => {
      throw new Error("denied");
    });
    const { container } = render(<CopyButton value="x" />);

    await user.click(screen.getByRole("button", { name: "Copy" }));

    await waitFor(() =>
      expect(container.querySelector(".lucide-circle-x")).not.toBeNull()
    );
  });

  it("returns to the copy icon after the feedback delay", async () => {
    const user = userEvent.setup();
    stubClipboard(async () => {});
    const { container } = render(<CopyButton value="x" />);

    await user.click(screen.getByRole("button", { name: "Copy" }));

    await waitFor(
      () => expect(container.querySelector(".lucide-copy")).not.toBeNull(),
      { timeout: 3000 }
    );
  });
});
