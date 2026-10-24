import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { useControllableState } from "./use-controllable-state";

describe("useControllableState", () => {
  it("starts from defaultProp and updates itself when uncontrolled", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useControllableState({ defaultProp: 1, onChange })
    );

    expect(result.current[0]).toBe(1);

    act(() => result.current[1](2));

    expect(result.current[0]).toBe(2);
    expect(onChange).toHaveBeenCalledExactlyOnceWith(2);
  });

  it("accepts an updater function when uncontrolled", () => {
    const { result } = renderHook(() =>
      useControllableState({ defaultProp: 5 })
    );

    act(() => result.current[1]((n) => n * 2));

    expect(result.current[0]).toBe(10);
  });

  it("follows prop and only reports changes when controlled", () => {
    const onChange = vi.fn();
    const { result, rerender } = renderHook(
      ({ prop }) => useControllableState({ prop, defaultProp: 0, onChange }),
      { initialProps: { prop: 3 } }
    );

    act(() => result.current[1](4));

    expect(onChange).toHaveBeenCalledExactlyOnceWith(4);
    expect(result.current[0]).toBe(3);

    rerender({ prop: 4 });
    expect(result.current[0]).toBe(4);
  });

  it("does not call onChange when a controlled value is set to itself", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useControllableState({ prop: "a", defaultProp: "", onChange })
    );

    act(() => result.current[1]((v) => v));

    expect(onChange).not.toHaveBeenCalled();
  });

  it("warns when a component switches from uncontrolled to controlled", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const { rerender } = renderHook(
      ({ prop }: { prop?: number }) =>
        useControllableState({ prop, defaultProp: 0, caller: "Slider" }),
      { initialProps: {} }
    );

    rerender({ prop: 1 });

    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining(
        "Slider is changing from uncontrolled to controlled"
      )
    );
  });
});
