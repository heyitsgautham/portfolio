import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const theme = vi.hoisted(() => ({ resolvedTheme: "light" }));
const toast = vi.hoisted(() => ({ success: vi.fn() }));
const copyText = vi.hoisted(() => vi.fn());

vi.mock("next-themes", () => ({ useTheme: () => theme }));
vi.mock("sonner", () => ({ toast }));
vi.mock("@/utils/copy", () => ({ copyText }));

import { BrandContextMenu } from "./brand-context-menu";

function openMenu() {
  render(
    <BrandContextMenu>
      <button type="button">logo</button>
    </BrandContextMenu>
  );
  fireEvent.contextMenu(screen.getByText("logo"));
}

beforeEach(() => {
  toast.success.mockReset();
  copyText.mockReset();
});

describe("BrandContextMenu", () => {
  it("opens on right click with the brand actions", () => {
    openMenu();

    expect(screen.getByRole("menu")).toBeInTheDocument();
    const items = screen.getAllByRole("menuitem");
    expect(items).toHaveLength(3);
    expect(items[0]).toHaveTextContent(/Copy Mark as SVG$/);
    expect(items[1]).toHaveTextContent("Copy Logotype as SVG");
    expect(items[2]).toHaveTextContent("Download Brand Assets");
  });

  it("copies the mark and confirms with a toast", async () => {
    const user = userEvent.setup();
    openMenu();

    await user.click(screen.getByRole("menuitem", { name: /mark/i }));

    expect(copyText).toHaveBeenCalledWith(expect.stringContaining("<svg"));
    expect(toast.success).toHaveBeenCalledWith("Copied Mark as SVG");
  });

  it("copies a black logotype on the light theme", async () => {
    theme.resolvedTheme = "light";
    const user = userEvent.setup();
    openMenu();

    await user.click(screen.getByRole("menuitem", { name: /logotype/i }));

    expect(copyText).toHaveBeenCalledWith(
      expect.stringContaining('fill="#000"')
    );
  });

  it("copies a white logotype on the dark theme", async () => {
    theme.resolvedTheme = "dark";
    const user = userEvent.setup();
    openMenu();

    await user.click(screen.getByRole("menuitem", { name: /logotype/i }));

    expect(copyText).toHaveBeenCalledWith(
      expect.stringContaining('fill="#fff"')
    );
  });

  it("downloads the brand zip", () => {
    openMenu();

    const download = screen.getByRole("menuitem", { name: /download/i });
    expect(download).toHaveAttribute("href", "/gk-brand.zip");
    expect(download).toHaveAttribute("download");
  });
});
