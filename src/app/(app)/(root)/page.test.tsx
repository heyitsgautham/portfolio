import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { USER } from "@/features/profile/data/user";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn() }) }));
vi.mock("next-themes", () => ({
  useTheme: () => ({ resolvedTheme: "dark", setTheme: vi.fn() }),
}));

import HomePage from "./page";

beforeEach(() => {
  // The contributions panel fetches on render; serve it an empty year.
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => Response.json({ contributions: [] }))
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});

async function renderHome() {
  let result!: ReturnType<typeof render>;
  await act(async () => {
    result = render(<HomePage />);
  });
  return result;
}

describe("home page", () => {
  it("renders every section in order", async () => {
    await renderHome();

    expect(
      screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent)
    ).toEqual([
      "GitHub Contributions",
      "Experience",
      expect.stringMatching(/^Projects/),
      expect.stringMatching(/^Education/),
      expect.stringMatching(/^GK's Timeline/),
      expect.stringMatching(/^Certifications/),
      "Let's Work Together",
    ]);
  });

  it("leads with the profile name and the cover mark", async () => {
    const { container } = await renderHome();

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      USER.displayName
    );
    expect(container.querySelector("#js-cover-mark")).not.toBeNull();
  });

  it("anchors the sections the nav and command menu link to", async () => {
    const { container } = await renderHome();

    for (const id of [
      "stack",
      "experience",
      "projects",
      "education",
      "certs",
      "contact",
    ]) {
      expect(container.querySelector(`#${id}`), id).not.toBeNull();
    }
  });

  it("describes the page as a ProfilePage in JSON-LD", async () => {
    const { container } = await renderHome();
    const script = container.querySelector(
      'script[type="application/ld+json"]'
    );

    expect(JSON.parse(script!.innerHTML)).toMatchObject({
      "@type": "ProfilePage",
      mainEntity: { "@type": "Person", name: USER.displayName },
    });
  });
});
