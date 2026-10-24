import { afterEach, describe, expect, it, vi } from "vitest";

import { getGitHubContributions } from "./github-contributions";
import fallback from "./github-contributions.fallback.json";

const live = [
  { date: "2025-01-01", count: 4, level: 2 },
  { date: "2025-01-02", count: 0, level: 0 },
];

const mockFetch = (impl: () => Promise<unknown>) => {
  const fetchMock = vi.fn(impl);
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("getGitHubContributions", () => {
  it("returns the live contributions when the API answers", async () => {
    const fetchMock = mockFetch(async () =>
      Response.json({ total: { lastYear: 4 }, contributions: live })
    );

    await expect(getGitHubContributions()).resolves.toEqual(live);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://github-contributions-api.jogruber.de/v4/heyitsgautham?y=last",
      expect.objectContaining({ next: { revalidate: 3600 } })
    );
  });

  it("falls back to the bundled snapshot on a non-2xx response", async () => {
    mockFetch(async () => new Response("rate limited", { status: 429 }));

    const result = await getGitHubContributions();

    expect(result).toEqual(fallback.contributions);
    expect(result.length).toBeGreaterThan(300);
  });

  it("falls back when the payload has no contributions array", async () => {
    mockFetch(async () => Response.json({ error: "user not found" }));

    await expect(getGitHubContributions()).resolves.toEqual(
      fallback.contributions
    );
  });

  it("falls back and warns outside production when fetch throws", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    mockFetch(async () => {
      throw new TypeError("network down");
    });

    await expect(getGitHubContributions()).resolves.toEqual(
      fallback.contributions
    );
    expect(warn).toHaveBeenCalledWith(
      "Failed to load GitHub contributions",
      expect.any(TypeError)
    );
  });
});
