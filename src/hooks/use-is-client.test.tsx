import { renderHook } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { useIsClient } from "./use-is-client";

function Probe() {
  return useIsClient() ? "client" : "server";
}

describe("useIsClient", () => {
  it("is false during server rendering", () => {
    expect(renderToString(<Probe />)).toBe("server");
  });

  it("is true once mounted in the browser", () => {
    const { result } = renderHook(() => useIsClient());

    expect(result.current).toBe(true);
  });
});
