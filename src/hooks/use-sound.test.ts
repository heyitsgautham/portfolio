import { renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useSound } from "./use-sound";

const buffer = { duration: 0.1 } as AudioBuffer;

function fakeAudio() {
  const start = vi.fn();
  const connect = vi.fn();
  const decodeAudioData = vi.fn(async () => buffer);
  const contexts: unknown[] = [];

  class FakeAudioContext {
    destination = {};
    decodeAudioData = decodeAudioData;
    constructor() {
      contexts.push(this);
    }
    createBufferSource() {
      return { buffer: null as AudioBuffer | null, connect, start };
    }
  }

  vi.stubGlobal("AudioContext", FakeAudioContext);
  return { start, connect, decodeAudioData, contexts };
}

const fetchMock = vi.fn(async () => ({
  arrayBuffer: async () => new ArrayBuffer(8),
}));

beforeEach(() => {
  fetchMock.mockClear();
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("useSound", () => {
  it("does nothing until the first play", () => {
    const audio = fakeAudio();
    renderHook(() => useSound("/click.wav"));

    expect(fetchMock).not.toHaveBeenCalled();
    expect(audio.contexts).toHaveLength(0);
  });

  it("fetches, decodes and plays the sound on first call", async () => {
    const audio = fakeAudio();
    const { result } = renderHook(() => useSound("/click.wav"));

    await result.current();

    expect(fetchMock).toHaveBeenCalledWith("/click.wav");
    expect(audio.decodeAudioData).toHaveBeenCalledTimes(1);
    expect(audio.start).toHaveBeenCalledWith(0);
  });

  it("loads once and reuses the buffer for later plays", async () => {
    const audio = fakeAudio();
    const { result } = renderHook(() => useSound("/click.wav"));

    await Promise.all([result.current(), result.current()]);
    await result.current();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(audio.contexts).toHaveLength(1);
    expect(audio.start).toHaveBeenCalledTimes(3);
  });

  it("stays silent when the sound fails to load", async () => {
    const audio = fakeAudio();
    vi.spyOn(console, "log").mockImplementation(() => {});
    fetchMock.mockRejectedValueOnce(new Error("offline"));
    const { result } = renderHook(() => useSound("/click.wav"));

    await expect(result.current()).resolves.toBeUndefined();
    expect(audio.start).not.toHaveBeenCalled();
  });

  it("warns and stays silent without the Web Audio API", async () => {
    vi.stubGlobal("AudioContext", undefined);
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const { result } = renderHook(() => useSound("/click.wav"));

    await result.current();

    expect(warn).toHaveBeenCalledWith(
      "Web Audio API is not supported in this browser."
    );
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
