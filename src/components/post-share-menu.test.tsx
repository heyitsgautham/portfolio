import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const toast = vi.hoisted(() => ({ success: vi.fn() }));
const copyText = vi.hoisted(() => vi.fn());
vi.mock("sonner", () => ({ toast }));
vi.mock("@/utils/copy", () => ({ copyText }));

import { PostShareMenu } from "./post-share-menu";

async function openMenu(url: string) {
  const user = userEvent.setup();
  render(<PostShareMenu url={url} />);
  await user.click(screen.getByRole("button"));
  return user;
}

beforeEach(() => {
  toast.success.mockReset();
  copyText.mockReset();
});

describe("PostShareMenu", () => {
  it("copies an absolute URL as given", async () => {
    const user = await openMenu("https://gauthamkrishna.dev/components/x");

    await user.click(screen.getByRole("menuitem", { name: /copy link/i }));

    expect(copyText).toHaveBeenCalledWith(
      "https://gauthamkrishna.dev/components/x"
    );
    expect(toast.success).toHaveBeenCalledWith("Copied link");
  });

  it("resolves a relative URL against the current origin", async () => {
    const user = await openMenu("/components/x");

    await user.click(screen.getByRole("menuitem", { name: /copy link/i }));

    expect(copyText).toHaveBeenCalledWith(
      `${window.location.origin}/components/x`
    );
  });

  it("builds X and LinkedIn share links with the encoded URL", async () => {
    await openMenu("https://site.dev/a b?c=d");
    const encoded = encodeURIComponent("https://site.dev/a b?c=d");

    expect(
      screen.getByRole("menuitem", { name: /share on x/i })
    ).toHaveAttribute("href", `https://x.com/intent/tweet?url=${encoded}`);
    expect(
      screen.getByRole("menuitem", { name: /share on linkedin/i })
    ).toHaveAttribute(
      "href",
      `https://www.linkedin.com/sharing/share-offsite?url=${encoded}`
    );
  });
});
