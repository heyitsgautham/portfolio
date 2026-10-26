// @vitest-environment node
import { afterEach, describe, expect, it, vi } from "vitest";

import packageJson from "../../../../package.json";
import { dynamic, GET } from "./route";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("GET /api/health", () => {
  it("reports ok with the package version and is never cached", async () => {
    const res = GET();

    expect(res.status).toBe(200);
    expect(res.headers.get("Cache-Control")).toBe("no-store");
    expect(await res.json()).toMatchObject({
      status: "ok",
      version: packageJson.version,
    });
    expect(dynamic).toBe("force-dynamic");
  });

  it("names the deployed commit on Vercel", async () => {
    vi.stubEnv("VERCEL_GIT_COMMIT_SHA", "1c65dff0123456789");

    expect((await GET().json()).commit).toBe("1c65dff");
  });

  it("reports a null commit outside Vercel", async () => {
    vi.stubEnv("VERCEL_GIT_COMMIT_SHA", undefined);

    expect((await GET().json()).commit).toBeNull();
  });

  it("stamps the response with the current time", async () => {
    const before = Date.now();
    const { time } = await GET().json();

    expect(Date.parse(time)).toBeGreaterThanOrEqual(before - 1000);
  });
});
