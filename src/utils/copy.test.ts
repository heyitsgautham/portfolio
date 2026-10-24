import { afterEach, describe, expect, it, vi } from "vitest";

import { copyText } from "./copy";

const stubClipboard = (writeText: (text: string) => Promise<void>) => {
  const spy = vi.fn(writeText);
  vi.stubGlobal("navigator", { clipboard: { writeText: spy } });
  return spy;
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("copyText", () => {
  it("writes the text to the clipboard", async () => {
    const writeText = stubClipboard(async () => {});

    await copyText("pnpm dlx shadcn add");

    expect(writeText).toHaveBeenCalledWith("pnpm dlx shadcn add");
  });

  it("swallows a rejected clipboard write", async () => {
    stubClipboard(async () => {
      throw new DOMException("Document is not focused", "NotAllowedError");
    });

    await expect(copyText("x")).resolves.toBeUndefined();
  });
});
