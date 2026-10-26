import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { IndiaTime } from "./india-time";

beforeEach(() => {
  vi.useFakeTimers();
  // 18:29:58 UTC is 23:59:58 in India (UTC+5:30).
  vi.setSystemTime(new Date("2026-01-15T18:29:58Z"));
});

afterEach(() => {
  vi.useRealTimers();
});

describe("IndiaTime", () => {
  it("shows the current time in Asia/Kolkata on a 24-hour clock", () => {
    render(<IndiaTime />);

    expect(screen.getByText("23:59:58")).toBeInTheDocument();
  });

  it("ticks every second and rolls over midnight", () => {
    render(<IndiaTime />);

    act(() => vi.advanceTimersByTime(1000));
    expect(screen.getByText("23:59:59")).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(1000));
    expect(screen.getByText("00:00:00")).toBeInTheDocument();
  });

  it("draws a 24-spoke Ashoka Chakra in the flag", () => {
    const { container } = render(<IndiaTime />);

    expect(container.querySelectorAll("svg line")).toHaveLength(24);
  });

  it("stops ticking after unmount", () => {
    const { unmount } = render(<IndiaTime />);

    unmount();

    expect(vi.getTimerCount()).toBe(0);
  });
});
