import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Contact } from "./index";

const toast = vi.hoisted(() => ({ success: vi.fn(), error: vi.fn() }));
vi.mock("sonner", () => ({ toast }));

const SCRIPT_URL = "https://script.google.com/macros/s/test/exec";

const fillForm = async (
  user: ReturnType<typeof userEvent.setup>,
  values: { name: string; email: string; subject: string; message: string }
) => {
  await user.type(screen.getByPlaceholderText("Your Name"), values.name);
  await user.type(screen.getByPlaceholderText("Your Email"), values.email);
  await user.type(screen.getByPlaceholderText("Subject"), values.subject);
  await user.type(screen.getByPlaceholderText("Message"), values.message);
};

const valid = {
  name: "Recruiter",
  email: "recruiter@example.com",
  subject: "Role at Acme",
  message: "We would like to talk about a role.",
};

beforeEach(() => {
  vi.stubEnv("NEXT_PUBLIC_CONTACT_FORM_URL", SCRIPT_URL);
  toast.success.mockReset();
  toast.error.mockReset();
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("Contact", () => {
  it("shows the decoded email address as a mailto link", () => {
    render(<Contact />);

    expect(
      screen.getByRole("link", { name: "heyitsgautham@gmail.com" })
    ).toHaveAttribute("href", "mailto:heyitsgautham@gmail.com");
  });

  it("shows every validation message and sends nothing for an empty form", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(<Contact />);

    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(
      await screen.findByText("Name must be at least 2 characters")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Please enter a valid email address")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Subject must be at least 3 characters")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Message must be at least 10 characters")
    ).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("posts the form as JSON text and clears it on success", async () => {
    const fetchMock = vi.fn(async () => Response.json({ status: "success" }));
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(<Contact />);

    await fillForm(user, valid);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => expect(toast.success).toHaveBeenCalledOnce());
    expect(fetchMock).toHaveBeenCalledWith(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(valid),
    });
    await waitFor(() =>
      expect(screen.getByPlaceholderText("Your Name")).toHaveValue("")
    );
  });

  it("shows the server's error message and keeps the input", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        Response.json({ status: "error", message: "Quota exceeded" })
      )
    );
    const user = userEvent.setup();
    render(<Contact />);

    await fillForm(user, valid);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith("Quota exceeded")
    );
    expect(screen.getByPlaceholderText("Your Name")).toHaveValue("Recruiter");
  });

  it("reports a network failure", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new TypeError("offline");
      })
    );
    const user = userEvent.setup();
    render(<Contact />);

    await fillForm(user, valid);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith(
        "Failed to send message. Please try again later."
      )
    );
  });

  it("refuses to send when the form endpoint is not configured", async () => {
    vi.stubEnv("NEXT_PUBLIC_CONTACT_FORM_URL", "");
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(<Contact />);

    await fillForm(user, valid);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith(
        "Contact form is not configured. Please try again later."
      )
    );
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
