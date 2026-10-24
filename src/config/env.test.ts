import { describe, expect, it } from "vitest";

import { parseEnv } from "./env";

describe("parseEnv", () => {
  it("falls back to the production URLs when nothing is set", () => {
    expect(parseEnv({})).toEqual({
      APP_URL: "https://gauthamkrishna.dev",
      REGISTRY_URL: "https://gauthamkrishna.dev/r",
    });
  });

  it("treats an empty string as unset", () => {
    expect(parseEnv({ APP_URL: "", REGISTRY_URL: "" })).toEqual({
      APP_URL: "https://gauthamkrishna.dev",
      REGISTRY_URL: "https://gauthamkrishna.dev/r",
    });
  });

  it("keeps valid overrides as given", () => {
    expect(
      parseEnv({
        APP_URL: "http://localhost:1408",
        REGISTRY_URL: "http://localhost:1408/r",
      })
    ).toEqual({
      APP_URL: "http://localhost:1408",
      REGISTRY_URL: "http://localhost:1408/r",
    });
  });

  it("ignores variables it does not own", () => {
    expect(parseEnv({ NODE_ENV: "test" })).not.toHaveProperty("NODE_ENV");
  });

  it("names every variable that is not an absolute URL", () => {
    expect(() =>
      parseEnv({ APP_URL: "gauthamkrishna.dev", REGISTRY_URL: "/r" })
    ).toThrow(/Invalid environment variables\. APP_URL: .*; REGISTRY_URL: /);
  });
});
