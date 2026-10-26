import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { META_THEME_COLORS } from "@/config/site";

const theme = vi.hoisted(() => ({
  resolvedTheme: "dark" as string | undefined,
  setTheme: vi.fn(),
}));
const setMetaColor = vi.hoisted(() => vi.fn());
const playClick = vi.hoisted(() => vi.fn());

vi.mock("next-themes", () => ({ useTheme: () => theme }));
vi.mock("@/hooks/use-meta-color", () => ({
  useMetaColor: () => ({ setMetaColor }),
}));
vi.mock("@/hooks/use-sound", () => ({ useSound: () => playClick }));

import { ToggleTheme } from "./toggle-theme";

beforeEach(() => {
  theme.setTheme.mockReset();
  setMetaColor.mockReset();
  playClick.mockReset();
});

describe("ToggleTheme", () => {
  it("switches dark to light and updates the browser theme colour", async () => {
    theme.resolvedTheme = "dark";
    const user = userEvent.setup();
    render(<ToggleTheme />);

    await user.click(screen.getByRole("button", { name: "Toggle Theme" }));

    expect(theme.setTheme).toHaveBeenCalledWith("light");
    expect(setMetaColor).toHaveBeenCalledWith(META_THEME_COLORS.light);
    expect(playClick).toHaveBeenCalledTimes(1);
  });

  it("switches light to dark", async () => {
    theme.resolvedTheme = "light";
    const user = userEvent.setup();
    render(<ToggleTheme />);

    await user.click(screen.getByRole("button", { name: "Toggle Theme" }));

    expect(theme.setTheme).toHaveBeenCalledWith("dark");
    expect(setMetaColor).toHaveBeenCalledWith(META_THEME_COLORS.dark);
  });

  it("reads the latest theme after a re-render, not a stale one", async () => {
    theme.resolvedTheme = "dark";
    const user = userEvent.setup();
    const { rerender } = render(<ToggleTheme />);

    theme.resolvedTheme = "light";
    rerender(<ToggleTheme />);
    await user.click(screen.getByRole("button", { name: "Toggle Theme" }));

    expect(theme.setTheme).toHaveBeenCalledWith("dark");
  });
});
