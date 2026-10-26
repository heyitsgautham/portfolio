import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "jotai";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { CodeBlockCommand } from "./code-block-command";

const commands = {
  __pnpm__: "pnpm dlx shadcn add flip",
  __yarn__: "npx shadcn add flip",
  __npm__: "npx shadcn@latest add flip",
  __bun__: "bunx --bun shadcn add flip",
};

function renderBlock() {
  return render(
    <Provider>
      <CodeBlockCommand {...commands} />
    </Provider>
  );
}

beforeEach(() => {
  // A fresh in-memory store per test, so a saved choice never leaks between tests.
  const store = new Map<string, string>();
  vi.stubGlobal("localStorage", {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => store.set(key, value),
    removeItem: (key: string) => store.delete(key),
  });
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("CodeBlockCommand", () => {
  it("shows the pnpm command by default", () => {
    renderBlock();

    expect(screen.getByRole("tab", { name: "pnpm" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    expect(screen.getByText(commands.__pnpm__)).toBeVisible();
  });

  it("switches command when another package manager is picked", async () => {
    const user = userEvent.setup();
    renderBlock();

    await user.click(screen.getByRole("tab", { name: "bun" }));

    expect(screen.getByText(commands.__bun__)).toBeVisible();
  });

  it("remembers the chosen package manager across code blocks", async () => {
    const user = userEvent.setup();
    renderBlock();

    await user.click(screen.getByRole("tab", { name: "npm" }));

    expect(JSON.parse(localStorage.getItem("config_v1") ?? "{}")).toMatchObject(
      { packageManager: "npm" }
    );
  });

  it("copies the command for the selected package manager", async () => {
    // userEvent.setup installs its own clipboard, so stub ours after it.
    const user = userEvent.setup();
    const writeText = vi.fn(async () => {});
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });
    renderBlock();

    await user.click(screen.getByRole("tab", { name: "yarn" }));
    await user.click(screen.getByRole("button", { name: "Copy" }));

    expect(writeText).toHaveBeenCalledWith(commands.__yarn__);
  });
});
