import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

import type { Post } from "@/types/post";

const router = vi.hoisted(() => ({ push: vi.fn() }));
const theme = vi.hoisted(() => ({ setTheme: vi.fn(), resolvedTheme: "dark" }));
const toast = vi.hoisted(() => ({ success: vi.fn() }));
const copyText = vi.hoisted(() => vi.fn());
const playClick = vi.hoisted(() => vi.fn());

vi.mock("next/navigation", () => ({ useRouter: () => router }));
vi.mock("next-themes", () => ({ useTheme: () => theme }));
vi.mock("sonner", () => ({ toast }));
vi.mock("@/utils/copy", () => ({ copyText }));
vi.mock("@/hooks/use-sound", () => ({ useSound: () => playClick }));

import { CommandMenu } from "./command-menu";

const posts: Post[] = [
  {
    slug: "flip-sentences",
    content: "",
    metadata: {
      title: "Flip Sentences",
      description: "",
      category: "components",
      createdAt: "2025-01-01",
      updatedAt: "2025-01-01",
    },
  },
  {
    slug: "a-blog-post",
    content: "",
    metadata: {
      title: "A Blog Post",
      description: "",
      category: "blog",
      createdAt: "2025-01-01",
      updatedAt: "2025-01-01",
    },
  },
];

beforeAll(() => {
  // cmdk measures and scrolls its list, which jsdom does not implement.
  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
  Element.prototype.scrollIntoView ??= () => {};
});

beforeEach(() => {
  router.push.mockReset();
  theme.setTheme.mockReset();
  toast.success.mockReset();
  copyText.mockReset();
  playClick.mockReset();
});

const dialog = () => screen.queryByRole("dialog");

function openWithButton() {
  render(<CommandMenu posts={posts} />);
  fireEvent.click(screen.getByRole("button", { name: /search/i }));
  return screen.getByRole("dialog");
}

describe("CommandMenu", () => {
  it("toggles open and closed with Cmd+K and Ctrl+K", () => {
    render(<CommandMenu posts={posts} />);
    expect(dialog()).toBeNull();

    fireEvent.keyDown(document, { key: "k", metaKey: true });
    expect(dialog()).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "k", ctrlKey: true });
    expect(dialog()).toBeNull();
  });

  it("opens with the slash key", () => {
    render(<CommandMenu posts={posts} />);

    fireEvent.keyDown(document, { key: "/" });
    expect(dialog()).toBeInTheDocument();
  });

  it("ignores the shortcut while the user types in a field", () => {
    render(
      <>
        <input aria-label="name" />
        <CommandMenu posts={posts} />
      </>
    );

    fireEvent.keyDown(screen.getByLabelText("name"), { key: "/" });
    expect(dialog()).toBeNull();
  });

  it("lists component posts and leaves out other categories", () => {
    const menu = openWithButton();

    expect(within(menu).getByText("Flip Sentences")).toBeInTheDocument();
    expect(within(menu).queryByText("A Blog Post")).toBeNull();
  });

  it("navigates in the same tab to a page link and closes", async () => {
    const user = userEvent.setup();
    const menu = openWithButton();

    await user.click(within(menu).getByText("Flip Sentences"));

    expect(router.push).toHaveBeenCalledWith("/components/flip-sentences");
    expect(dialog()).toBeNull();
  });

  it("opens social links in a new tab", async () => {
    const open = vi.spyOn(window, "open").mockImplementation(() => null);
    const user = userEvent.setup();
    const menu = openWithButton();

    await user.click(within(menu).getByText("GitHub"));

    expect(open).toHaveBeenCalledWith(
      "https://github.com/heyitsgautham",
      "_blank",
      "noopener"
    );
    expect(router.push).not.toHaveBeenCalled();
  });

  it.each([
    ["Light", "light"],
    ["Dark", "dark"],
    ["Auto", "system"],
  ])("switches the theme with %s", async (label, value) => {
    const user = userEvent.setup();
    const menu = openWithButton();

    await user.click(within(menu).getByText(label));

    expect(theme.setTheme).toHaveBeenCalledWith(value);
    expect(playClick).toHaveBeenCalledTimes(1);
    expect(dialog()).toBeNull();
  });

  it("copies the logotype in the colour that suits the current theme", async () => {
    const user = userEvent.setup();
    const menu = openWithButton();

    await user.click(within(menu).getByText("Copy Logotype as SVG"));

    expect(copyText).toHaveBeenCalledWith(expect.stringContaining("#fff"));
    expect(toast.success).toHaveBeenCalledWith("Copied Logotype as SVG");
  });

  it("filters the list as the user types", async () => {
    const user = userEvent.setup();
    const menu = openWithButton();

    await user.type(
      within(menu).getByPlaceholderText("Type a command or search..."),
      "zzzz-nothing"
    );

    expect(within(menu).getByText("No results found.")).toBeInTheDocument();
  });

  it("labels the Enter action by the kind of item selected", async () => {
    const user = userEvent.setup();
    const menu = openWithButton();
    const input = within(menu).getByPlaceholderText(
      "Type a command or search..."
    );

    await user.type(input, "Dark");
    expect(within(menu).getByText("Run Command")).toBeInTheDocument();

    await user.clear(input);
    await user.type(input, "LinkedIn");
    expect(within(menu).getByText("Open Link")).toBeInTheDocument();

    await user.clear(input);
    await user.type(input, "Experience");
    expect(within(menu).getByText("Go to Page")).toBeInTheDocument();
  });
});
