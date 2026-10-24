import { describe, expect, it } from "vitest";

import { addQueryParams, urlToName } from "./url";

describe("urlToName", () => {
  it("strips the protocol and the double slash", () => {
    expect(urlToName("https://gauthamkrishna.dev")).toBe("gauthamkrishna.dev");
    expect(urlToName("http://example.com/path")).toBe("example.com/path");
  });

  it("strips a protocol-relative prefix", () => {
    expect(urlToName("//cdn.example.com/a.png")).toBe("cdn.example.com/a.png");
  });

  it("leaves a string without a protocol untouched", () => {
    expect(urlToName("github.com/heyitsgautham")).toBe(
      "github.com/heyitsgautham"
    );
  });
});

describe("addQueryParams", () => {
  it("appends every entry of the query object", () => {
    const result = new URL(
      addQueryParams("https://example.com/page", {
        utm_source: "portfolio",
        utm_medium: "web",
      })
    );

    expect(result.searchParams.get("utm_source")).toBe("portfolio");
    expect(result.searchParams.get("utm_medium")).toBe("web");
    expect(result.pathname).toBe("/page");
  });

  it("overwrites a parameter that already exists and keeps the others", () => {
    const result = new URL(
      addQueryParams("https://example.com/?utm_source=old&ref=1", {
        utm_source: "new",
      })
    );

    expect(result.searchParams.getAll("utm_source")).toEqual(["new"]);
    expect(result.searchParams.get("ref")).toBe("1");
  });

  it("keeps the hash fragment after the query", () => {
    expect(addQueryParams("https://example.com/docs#install", { a: "1" })).toBe(
      "https://example.com/docs?a=1#install"
    );
  });

  it("returns the input unchanged when it is not an absolute URL", () => {
    expect(addQueryParams("/relative/path", { a: "1" })).toBe("/relative/path");
    expect(addQueryParams("not a url", { a: "1" })).toBe("not a url");
  });
});
