import { describe, expect, it } from "vitest";

import { decodeEmail, decodePhoneNumber, formatPhoneNumber } from "./string";

describe("decodeEmail", () => {
  it("decodes a base64 encoded address", () => {
    expect(decodeEmail(btoa("hello@example.com"))).toBe("hello@example.com");
  });

  it("throws on input that is not valid base64", () => {
    expect(() => decodeEmail("%%%")).toThrow();
  });
});

describe("decodePhoneNumber", () => {
  it("decodes a base64 encoded number", () => {
    expect(decodePhoneNumber(btoa("+84123456789"))).toBe("+84123456789");
  });
});

describe("formatPhoneNumber", () => {
  it("groups a complete international Viet Nam number", () => {
    expect(formatPhoneNumber("+84912345678")).toBe("+84 912 345 678");
  });

  it("formats a partial number as it is typed", () => {
    expect(formatPhoneNumber("+8491")).toBe("+84 91");
  });

  it("returns an empty string for empty input", () => {
    expect(formatPhoneNumber("")).toBe("");
  });
});
