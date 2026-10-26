import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/fonts", () => ({
  fontSans: { variable: "font-sans-var" },
  fontMono: { variable: "font-mono-var" },
}));

import AppError from "./(app)/error";
import GlobalError from "./global-error";

describe("GlobalError", () => {
  it("renders a full document with the site fonts and the fallback", () => {
    const html = renderToStaticMarkup(
      <GlobalError error={new Error("layout failed")} reset={() => {}} />
    );

    expect(html).toMatch(
      /^<html lang="en" class="font-sans-var font-mono-var">/
    );
    expect(html).toContain("<body");
    expect(html).toContain("Something went wrong");
  });
});

describe("AppError", () => {
  it("renders the fallback inside the site layout", () => {
    const html = renderToStaticMarkup(
      <AppError
        error={Object.assign(new Error("page failed"), { digest: "d42" })}
        reset={() => {}}
      />
    );

    expect(html).not.toContain("<html");
    expect(html).toContain("Something went wrong");
    expect(html).toContain("Reference: d42");
  });
});
