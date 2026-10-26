import { describe, expect, it, vi } from "vitest";

import {
  createLogger,
  defaultMinLevel,
  type LogSink,
  serializeError,
} from "./logger";

function memorySink() {
  const sink = {
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  } satisfies LogSink;
  const entries = () =>
    Object.values(sink).flatMap((fn) =>
      fn.mock.calls.map(([line]) => JSON.parse(line as string))
    );
  return { sink, entries };
}

const now = () => new Date("2026-01-02T03:04:05.000Z");

describe("createLogger", () => {
  it("writes one JSON line with level, scope, message and time", () => {
    const { sink } = memorySink();
    createLogger("vcard", { sink, now }).info("built card");

    expect(sink.info).toHaveBeenCalledTimes(1);
    expect(JSON.parse(sink.info.mock.calls[0][0])).toEqual({
      level: "info",
      scope: "vcard",
      message: "built card",
      time: "2026-01-02T03:04:05.000Z",
    });
  });

  it("nests extra fields under context", () => {
    const { sink, entries } = memorySink();
    createLogger("contact", { sink, now }).warn("slow", { ms: 1200 });

    expect(entries()[0].context).toEqual({ ms: 1200 });
  });

  it("serializes an error passed in the context", () => {
    const { sink, entries } = memorySink();
    createLogger("og", { sink, now }).error("render failed", {
      error: new TypeError("bad font"),
      route: "/og/simple",
    });

    const [entry] = entries();
    expect(sink.error).toHaveBeenCalledTimes(1);
    expect(entry.error).toMatchObject({
      name: "TypeError",
      message: "bad font",
    });
    expect(entry.context).toEqual({ route: "/og/simple" });
  });

  it("drops entries below the minimum level", () => {
    const { sink } = memorySink();
    const log = createLogger("x", { sink, now, minLevel: "warn" });

    log.debug("a");
    log.info("b");
    log.warn("c");
    log.error("d");

    expect(sink.debug).not.toHaveBeenCalled();
    expect(sink.info).not.toHaveBeenCalled();
    expect(sink.warn).toHaveBeenCalledTimes(1);
    expect(sink.error).toHaveBeenCalledTimes(1);
  });
});

describe("defaultMinLevel", () => {
  it("hides debug output in production only", () => {
    expect(defaultMinLevel("production")).toBe("info");
    expect(defaultMinLevel("development")).toBe("debug");
    expect(defaultMinLevel(undefined)).toBe("debug");
  });
});

describe("serializeError", () => {
  it("keeps the name, message, stack and Next.js digest of an Error", () => {
    const error = Object.assign(new Error("boom"), { digest: "123" });

    expect(serializeError(error)).toMatchObject({
      name: "Error",
      message: "boom",
      digest: "123",
      stack: expect.stringContaining("boom"),
    });
  });

  it("describes thrown strings and objects", () => {
    expect(serializeError("nope")).toEqual({
      name: "NonError",
      message: "nope",
    });
    expect(serializeError({ code: 7 })).toEqual({
      name: "NonError",
      message: '{"code":7}',
    });
  });

  it("survives values that JSON cannot encode", () => {
    const cyclic: Record<string, unknown> = {};
    cyclic.self = cyclic;

    expect(serializeError(cyclic).message).toBe("[object Object]");
    expect(serializeError(undefined).message).toBe("undefined");
  });
});
