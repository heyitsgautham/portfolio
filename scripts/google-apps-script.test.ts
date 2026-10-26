// @vitest-environment node
import { readFileSync } from "node:fs";
import path from "node:path";
import vm from "node:vm";

import { describe, expect, it, vi } from "vitest";

type Mail = { to: string; subject: string; htmlBody: string; replyTo: string };

/** Runs the Apps Script source with stand-ins for the Google services it calls. */
function loadScript() {
  const rows: unknown[][] = [];
  const sendEmail = vi.fn<(mail: Mail) => void>();
  const sheet = { appendRow: (row: unknown[]) => rows.push(row) };

  const context = vm.createContext({
    JSON,
    Date,
    MailApp: { sendEmail },
    DriveApp: {
      getFilesByName: () => ({ hasNext: () => true, next: () => ({}) }),
    },
    SpreadsheetApp: { open: () => ({ getActiveSheet: () => sheet }) },
    ContentService: {
      MimeType: { JSON: "json" },
      createTextOutput: (text: string) => ({
        setMimeType: () => JSON.parse(text),
      }),
    },
  });
  vm.runInContext(
    readFileSync(
      path.join(process.cwd(), "scripts/google-apps-script.js"),
      "utf8"
    ),
    context
  );

  const post = (body: unknown) =>
    context.doPost({ postData: { contents: JSON.stringify(body) } }) as {
      status: string;
      message: string;
    };

  return { post, rows, sendEmail };
}

const valid = {
  name: "Recruiter",
  email: "recruiter@example.com",
  subject: "Role at Acme",
  message: "We would like to talk about a role.",
};

describe("contact form Apps Script", () => {
  it("stores the submission and emails it with a reply-to", () => {
    const { post, rows, sendEmail } = loadScript();

    expect(post(valid)).toEqual({
      status: "success",
      message: "Message sent successfully",
    });
    expect(rows[0].slice(1)).toEqual([
      "Recruiter",
      "recruiter@example.com",
      "Role at Acme",
      "We would like to talk about a role.",
    ]);
    expect(sendEmail.mock.calls[0][0]).toMatchObject({
      subject: "New Portfolio Contact: Role at Acme",
      replyTo: "recruiter@example.com",
    });
  });

  it("escapes HTML so a visitor cannot inject markup into the email", () => {
    const { post, sendEmail } = loadScript();

    post({
      ...valid,
      name: '<a href="https://evil.example">Click</a>',
      message: "Hi <img src=x onerror=alert(1)>\nsecond line",
    });

    const html = sendEmail.mock.calls[0][0].htmlBody;
    expect(html).not.toContain("<a href");
    expect(html).not.toContain("<img");
    expect(html).toContain("&lt;a href=&quot;https://evil.example&quot;&gt;");
    expect(html).toContain("&lt;img src=x onerror=alert(1)&gt;<br>second line");
  });

  it("stores formula-looking values as plain text in the sheet", () => {
    const { post, rows } = loadScript();

    post({ ...valid, name: '=HYPERLINK("https://evil.example","x")' });

    expect(rows[0][1]).toBe('\'=HYPERLINK("https://evil.example","x")');
  });

  it("keeps the email subject on one line", () => {
    const { post, sendEmail } = loadScript();

    post({ ...valid, subject: "Hello\r\nBcc: someone@example.com" });

    expect(sendEmail.mock.calls[0][0].subject).toBe(
      "New Portfolio Contact: Hello Bcc: someone@example.com"
    );
  });

  it.each([
    ["a missing field", { ...valid, message: undefined }],
    ["a too-short message", { ...valid, message: "hi" }],
    ["an invalid email", { ...valid, email: "not-an-email" }],
    ["a non-object body", "just a string"],
  ])("rejects %s without storing or sending anything", (_, body) => {
    const { post, rows, sendEmail } = loadScript();

    expect(post(body).status).toBe("error");
    expect(rows).toHaveLength(0);
    expect(sendEmail).not.toHaveBeenCalled();
  });
});
