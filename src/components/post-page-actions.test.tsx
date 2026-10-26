import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { LLMCopyButton, ViewOptions } from "./post-page-actions";

afterEach(() => {
  vi.unstubAllGlobals();
});

async function openOptions(props: {
  markdownUrl: string;
  isComponent?: boolean;
}) {
  const user = userEvent.setup();
  render(<ViewOptions {...props} />);
  await user.click(screen.getByRole("button", { name: "View Options" }));
  return screen.getAllByRole("menuitem");
}

describe("ViewOptions", () => {
  it("offers markdown and three assistants for a page", async () => {
    const items = await openOptions({ markdownUrl: "/components/x.mdx" });

    expect(items.map((i) => i.textContent)).toEqual([
      "View as Markdown",
      "Open in ChatGPT",
      "Open in Claude",
      "Open in Scira AI",
    ]);
    expect(items[0]).toHaveAttribute(
      "href",
      `${window.location.origin}/components/x.mdx`
    );
  });

  it("adds v0 second and asks for a component walkthrough on component docs", async () => {
    const items = await openOptions({
      markdownUrl: "/components/x.mdx",
      isComponent: true,
    });

    expect(items[1]).toHaveTextContent("Open in v0");
    const claude = new URL(
      items
        .find((i) => i.textContent === "Open in Claude")!
        .getAttribute("href")!
    );
    expect(claude.searchParams.get("q")).toContain(
      "I'm looking at this component documentation"
    );
  });

  it("asks a plain question about the page otherwise", async () => {
    const items = await openOptions({ markdownUrl: "/about.md" });
    const chatgpt = new URL(items[1].getAttribute("href")!);

    expect(chatgpt.origin).toBe("https://chatgpt.com");
    expect(chatgpt.searchParams.get("hints")).toBe("search");
    expect(chatgpt.searchParams.get("q")).toBe(
      `Read ${window.location.origin}/about.md, I want to ask questions about it.`
    );
  });
});

describe("LLMCopyButton", () => {
  function stubClipboard() {
    const write = vi.fn(
      async (items: { data: Record<string, Promise<string>> }[]) => {
        await items[0].data["text/plain"];
      }
    );
    const writeText = vi.fn(async () => {});
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { write, writeText },
    });
    vi.stubGlobal(
      "ClipboardItem",
      class {
        constructor(public data: Record<string, Promise<string>>) {}
      }
    );
    return { write, writeText };
  }

  it("fetches the markdown on first copy and reuses it after", async () => {
    const user = userEvent.setup();
    const { write, writeText } = stubClipboard();
    const fetchMock = vi.fn(async () => ({ text: async () => "# Doc" }));
    vi.stubGlobal("fetch", fetchMock);
    render(<LLMCopyButton markdownUrl="/docs/once.mdx" />);

    await user.click(screen.getByRole("button", { name: /mdx/i }));
    await waitFor(() => expect(write).toHaveBeenCalledTimes(1));
    await user.click(screen.getByRole("button", { name: /mdx/i }));

    await waitFor(() => expect(writeText).toHaveBeenCalledWith("# Doc"));
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("shows a warning icon when copying fails", async () => {
    const user = userEvent.setup();
    const { write } = stubClipboard();
    write.mockRejectedValueOnce(new Error("denied"));
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({ text: async () => "" }))
    );
    const { container } = render(
      <LLMCopyButton markdownUrl="/docs/fail.mdx" />
    );

    await user.click(screen.getByRole("button", { name: /mdx/i }));

    await waitFor(() =>
      expect(container.querySelector(".lucide-triangle-alert")).not.toBeNull()
    );
  });
});
