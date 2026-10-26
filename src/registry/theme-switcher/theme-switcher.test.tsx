import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const theme = vi.hoisted(() => ({ theme: "system", setTheme: vi.fn() }));
vi.mock("next-themes", () => ({ useTheme: () => theme }));

import { ThemeSwitcher } from "./theme-switcher";

beforeEach(() => {
  theme.setTheme.mockReset();
});

describe("ThemeSwitcher", () => {
  it("offers system, light and dark as one radio group", () => {
    render(<ThemeSwitcher />);

    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
    expect(
      screen.getAllByRole("radio").map((r) => r.getAttribute("aria-label"))
    ).toEqual([
      "Switch to system theme",
      "Switch to light theme",
      "Switch to dark theme",
    ]);
  });

  it("checks the option for the current theme only", () => {
    theme.theme = "dark";
    render(<ThemeSwitcher />);

    expect(screen.getByRole("radio", { name: /dark/ })).toHaveAttribute(
      "aria-checked",
      "true"
    );
    expect(screen.getByRole("radio", { name: /light/ })).toHaveAttribute(
      "aria-checked",
      "false"
    );
  });

  it("sets the theme an option names", async () => {
    const user = userEvent.setup();
    render(<ThemeSwitcher />);

    await user.click(screen.getByRole("radio", { name: /light/ }));

    expect(theme.setTheme).toHaveBeenCalledWith("light");
  });
});
