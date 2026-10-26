import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useEffect } from "react";
import { describe, expect, it, vi } from "vitest";

const mounts = vi.hoisted(() => ({ count: 0 }));

vi.mock("@/__registry__/index", () => ({
  Index: {
    "demo-button": {
      component: function Demo() {
        useEffect(() => {
          mounts.count += 1;
        }, []);
        return <button type="button">Demo button</button>;
      },
    },
  },
}));

import { ComponentPreview } from "./component-preview";

describe("ComponentPreview", () => {
  it("renders the registry component on the Preview tab", async () => {
    render(
      <ComponentPreview name="demo-button">
        <pre>source</pre>
      </ComponentPreview>
    );

    expect(
      await screen.findByRole("button", { name: "Demo button" })
    ).toBeInTheDocument();
  });

  it("says so when the name is not in the registry", () => {
    render(<ComponentPreview name="missing-thing" />);

    expect(screen.getByText(/not found in registry/)).toHaveTextContent(
      "Component missing-thing not found in registry."
    );
  });

  it("shows the first child as the code on the Code tab", async () => {
    const user = userEvent.setup();
    render(
      <ComponentPreview name="demo-button">
        <pre>const x = 1;</pre>
        <pre>ignored</pre>
      </ComponentPreview>
    );

    await user.click(screen.getByRole("tab", { name: /code/i }));

    expect(screen.getByText("const x = 1;")).toBeInTheDocument();
    expect(screen.queryByText("ignored")).toBeNull();
  });

  it("remounts the demo when Replay is pressed", async () => {
    const user = userEvent.setup();
    render(<ComponentPreview name="demo-button" canReplay />);
    await screen.findByRole("button", { name: "Demo button" });
    const before = mounts.count;

    const replay = screen
      .getAllByRole("button")
      .find((b) => b.querySelector(".lucide-repeat"))!;
    await user.click(replay);

    expect(mounts.count).toBe(before + 1);
  });

  it("links the demo to v0 when given a registry URL", () => {
    render(
      <ComponentPreview
        name="demo-button"
        openInV0Url="https://gauthamkrishna.dev/r/demo-button.json"
      />
    );

    expect(screen.getByRole("link", { name: "Open in v0" })).toHaveAttribute(
      "href",
      "https://v0.app/chat/api/open?url=https://gauthamkrishna.dev/r/demo-button.json"
    );
  });
});
