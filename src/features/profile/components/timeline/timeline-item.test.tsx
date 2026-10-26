import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { TimelineEvent } from "@/features/profile/types/timeline";

import { TimelineItem } from "./timeline-item";

const event: TimelineEvent = {
  id: "hack",
  title: "Hack Hustle 2024",
  subtitle: "24-Hour ML Hackathon",
  date: "Nov 8-9, 2024",
  sortDate: "2024-11-08",
  description: "Built a **transit scheduler**.",
  githubURL: "https://github.com/heyitsgautham/traffic-men",
};

const article = () => screen.getByRole("article");
const isOpen = () =>
  screen.getByRole("button").getAttribute("aria-expanded") === "true";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("TimelineItem", () => {
  it("shows the title, subtitle and date", () => {
    render(<TimelineItem event={event} position="left" />);

    expect(
      screen.getByRole("heading", { name: event.title })
    ).toBeInTheDocument();
    expect(screen.getByText(event.subtitle)).toBeInTheDocument();
    expect(screen.getByText(event.date)).toBeInTheDocument();
  });

  it("expands after hovering for 300ms", () => {
    render(<TimelineItem event={event} position="right" />);

    fireEvent.mouseEnter(article());
    act(() => vi.advanceTimersByTime(299));
    expect(isOpen()).toBe(false);

    act(() => vi.advanceTimersByTime(1));
    expect(isOpen()).toBe(true);
  });

  it("does not expand when the pointer leaves before the delay", () => {
    render(<TimelineItem event={event} position="right" />);

    fireEvent.mouseEnter(article());
    act(() => vi.advanceTimersByTime(200));
    fireEvent.mouseLeave(article());
    act(() => vi.advanceTimersByTime(1000));

    expect(isOpen()).toBe(false);
  });

  it("collapses 200ms after the pointer leaves", () => {
    render(<TimelineItem event={event} position="left" />);

    fireEvent.mouseEnter(article());
    act(() => vi.advanceTimersByTime(300));
    fireEvent.mouseLeave(article());
    act(() => vi.advanceTimersByTime(199));
    expect(isOpen()).toBe(true);

    act(() => vi.advanceTimersByTime(1));
    expect(isOpen()).toBe(false);
  });

  it("renders the markdown description and GitHub link when open", () => {
    render(<TimelineItem event={event} position="left" />);

    fireEvent.click(screen.getByRole("button"));

    expect(screen.getByText("transit scheduler").tagName).toBe("STRONG");
    expect(
      screen.getByRole("link", { name: /view on github/i })
    ).toHaveAttribute("href", event.githubURL);
  });

  it("stays closed when there is nothing to expand", () => {
    render(
      <TimelineItem
        event={{ ...event, description: "", githubURL: undefined }}
        position="left"
      />
    );

    fireEvent.mouseEnter(article());
    act(() => vi.advanceTimersByTime(1000));
    fireEvent.click(screen.getByRole("button"));

    expect(isOpen()).toBe(false);
  });
});
