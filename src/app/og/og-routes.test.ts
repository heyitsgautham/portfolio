// @vitest-environment node
import { describe, expect, it } from "vitest";

import { GET as getDomain } from "./domain/route";
import { GET as getSimple } from "./simple/route";

/** Reads width and height from a PNG's IHDR chunk. */
function pngSize(bytes: Uint8Array) {
  const view = new DataView(bytes.buffer, bytes.byteOffset);
  return { width: view.getUint32(16), height: view.getUint32(20) };
}

const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47];

describe("Open Graph image routes", () => {
  it.each([
    ["/og/simple?title=Flip%20Sentences", getSimple],
    ["/og/domain?domain=gauthamkrishna.dev&sale=true", getDomain],
  ])(
    "%s renders a 1200x630 PNG",
    async (url, get) => {
      const res = await get(new Request(`https://example.com${url}`));
      const bytes = new Uint8Array(await res.arrayBuffer());

      expect(res.headers.get("content-type")).toBe("image/png");
      expect([...bytes.slice(0, 4)]).toEqual(PNG_SIGNATURE);
      expect(pngSize(bytes)).toEqual({ width: 1200, height: 630 });
    },
    30_000
  );

  it.each([
    ["/og/simple", getSimple],
    ["/og/domain?sale=true", getDomain],
  ])("%s answers 400 without its required parameter", async (url, get) => {
    const res = await get(new Request(`https://example.com${url}`));

    expect(res.status).toBe(400);
    expect(res.headers.get("content-type")).toMatch(/application\/json/);
  });
});
