import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { Project } from "@/features/profile/types/projects";

const router = vi.hoisted(() => ({ push: vi.fn() }));
vi.mock("next/navigation", () => ({ useRouter: () => router }));

import { ProjectGalleryCard } from "./project-gallery-card";

const project = {
  id: "p",
  slug: "sticky-net",
  title: "Sticky-Net - AI honeypot",
  period: { start: "01.2026" },
  link: "https://github.com/heyitsgautham/sticky-net",
  skills: ["Python", "FastAPI", "Docker", "Redis", "NLP", "Regex", "Go"],
  summary: "Traps scammers.",
  intro: "",
  uniqueFeatures: [],
  techStackDetail: [],
} as Project;

const card = () => screen.getByRole("link", { name: /sticky-net/i });

beforeEach(() => {
  router.push.mockReset();
});

describe("ProjectGalleryCard", () => {
  it("shows the short title, formatted start date and summary", () => {
    render(<ProjectGalleryCard project={project} />);

    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      /^Sticky-Net$/
    );
    expect(screen.getByText("January 01, 2026")).toBeInTheDocument();
    expect(screen.getByText("Traps scammers.")).toBeInTheDocument();
  });

  it("opens the project page on click, Enter and Space", async () => {
    const user = userEvent.setup();
    render(<ProjectGalleryCard project={project} />);

    await user.click(screen.getByText("Traps scammers."));
    fireEvent.keyDown(card(), { key: "Enter" });
    fireEvent.keyDown(card(), { key: " " });

    expect(router.push.mock.calls).toEqual([
      ["/projects/sticky-net"],
      ["/projects/sticky-net"],
      ["/projects/sticky-net"],
    ]);
  });

  it("lets a tech icon link open without navigating the card", async () => {
    const user = userEvent.setup();
    render(<ProjectGalleryCard project={project} />);

    const python = screen
      .getAllByRole("link")
      .find((a) => a.getAttribute("href") === "https://www.python.org/");
    await user.click(python!);

    expect(router.push).not.toHaveBeenCalled();
  });

  it("shows every tag when layout cannot be measured", () => {
    render(<ProjectGalleryCard project={project} />);

    for (const skill of ["Python", "Regex", "Go"]) {
      expect(screen.getByText(skill).closest(".hidden")).toBeNull();
    }
    expect(screen.queryByText(/^\+\d+$/)).toBeNull();
  });

  describe("with measured layout", () => {
    // Lay tags out three per 20px row, so only two rows fit.
    beforeEach(() => {
      vi.spyOn(HTMLElement.prototype, "offsetHeight", "get").mockReturnValue(
        20
      );
      vi.spyOn(HTMLElement.prototype, "offsetTop", "get").mockImplementation(
        function (this: HTMLElement) {
          const siblings = Array.from(this.parentElement?.children ?? []);
          return Math.floor(siblings.indexOf(this) / 3) * 26;
        }
      );
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("hides the tags past two rows behind a +N badge", () => {
      render(<ProjectGalleryCard project={project} />);

      // Six tags fit in two rows; one slot goes to the badge.
      expect(screen.getByText("+2")).toBeInTheDocument();
      expect(screen.getByText("Regex").closest(".hidden")).not.toBeNull();
      expect(screen.getByText("NLP").closest(".hidden")).toBeNull();
    });
  });
});
