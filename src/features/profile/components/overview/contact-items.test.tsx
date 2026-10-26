import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EmailItem } from "./email-item";
import { PhoneItem } from "./phone-item";

// "+91 98765 43210" and "hello@example.com", base64 encoded as in USER.
const PHONE = btoa("+91 98765 43210");
const EMAIL = btoa("hello@example.com");

describe("EmailItem", () => {
  it("decodes the address on the client into a mailto link", () => {
    render(<EmailItem email={EMAIL} />);

    expect(
      screen.getByRole("link", { name: "hello@example.com" })
    ).toHaveAttribute("href", "mailto:hello@example.com");
  });
});

describe("PhoneItem", () => {
  it("links a WhatsApp chat using only the digits", () => {
    render(<PhoneItem phoneNumber={PHONE} />);

    expect(
      screen.getByRole("link", { name: "wa.me/919876543210" })
    ).toHaveAttribute("href", "https://wa.me/919876543210");
  });
});
