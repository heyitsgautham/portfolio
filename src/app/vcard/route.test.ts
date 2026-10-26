import type sharp from "sharp";
import { describe, expect, it, vi } from "vitest";

import { USER } from "@/features/profile/data/user";
import { decodeEmail } from "@/utils/string";

const sharpState = vi.hoisted(() => ({ fail: false }));

vi.mock("sharp", async (importOriginal) => {
  const actual = await importOriginal<{ default: typeof sharp }>();
  return {
    default: (input: Buffer) => {
      if (sharpState.fail) {
        return {
          jpeg: () => ({
            toBuffer: async () => {
              throw new Error("unsupported image format");
            },
          }),
        };
      }
      return actual.default(input);
    },
  };
});

import { GET } from "./route";

async function fetchCard() {
  const res = await GET();
  return { res, body: await res.text() };
}

describe("GET /vcard", () => {
  it("downloads a vCard file named after the user", async () => {
    sharpState.fail = false;
    const { res } = await fetchCard();

    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toBe("text/x-vcard");
    expect(res.headers.get("Content-Disposition")).toBe(
      `attachment; filename=${USER.username}-vcard.vcf`
    );
  });

  it("carries the decoded email, name, website and current job", async () => {
    sharpState.fail = false;
    const { body } = await fetchCard();

    expect(body).toMatch(/^BEGIN:VCARD/);
    expect(body).toContain(
      `N;CHARSET=utf-8:${USER.lastName};${USER.firstName}`
    );
    expect(body).toContain(decodeEmail(USER.email));
    expect(body).toContain(USER.website);
    expect(body).toContain(USER.jobs[0].company);
  });

  it("embeds the avatar as a JPEG photo", async () => {
    sharpState.fail = false;
    const { body } = await fetchCard();

    expect(body).toMatch(/PHOTO;ENCODING=b;TYPE=JPEG:/);
  });

  it("still serves the card without a photo when conversion fails", async () => {
    sharpState.fail = true;
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    const { res, body } = await fetchCard();

    expect(res.status).toBe(200);
    expect(body).not.toContain("PHOTO");
    expect(body).toContain(decodeEmail(USER.email));
    expect(JSON.parse(error.mock.calls[0][0] as string)).toMatchObject({
      level: "error",
      scope: "vcard",
      error: { message: "unsupported image format" },
    });
  });
});
