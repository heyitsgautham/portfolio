import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel";

function renderPanel(collapsible: boolean) {
  return render(
    <Panel id="stack" collapsible={collapsible}>
      <PanelHeader collapsible={collapsible}>
        <PanelTitle>Tech Stack</PanelTitle>
      </PanelHeader>
      <PanelContent collapsible={collapsible}>Body text</PanelContent>
    </Panel>
  );
}

describe("Panel", () => {
  it("renders a section with its id, title and body", () => {
    renderPanel(false);

    const section = screen.getByText("Body text").closest("section");
    expect(section).toHaveAttribute("id", "stack");
    expect(section).toHaveAttribute("data-slot", "panel");
    expect(
      screen.getByRole("heading", { level: 2, name: "Tech Stack" })
    ).toBeInTheDocument();
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("starts open when collapsible and folds away on the header toggle", async () => {
    const user = userEvent.setup();
    renderPanel(true);

    expect(screen.getByText("Body text")).toBeInTheDocument();
    await user.click(screen.getByRole("button"));

    expect(screen.queryByText("Body text")).toBeNull();
  });
});
