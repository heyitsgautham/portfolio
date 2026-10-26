import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "jotai";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { CodeCollapsibleWrapper } from "./code-collapsible-wrapper";
import { CodeTabs } from "./code-tabs";
import { TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

beforeEach(() => {
  const store = new Map<string, string>();
  vi.stubGlobal("localStorage", {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => store.set(key, value),
    removeItem: (key: string) => store.delete(key),
  });
});

afterEach(() => {
  vi.unstubAllGlobals();
});

function InstallTabs() {
  return (
    <CodeTabs>
      <TabsList>
        <TabsTrigger value="cli">CLI</TabsTrigger>
        <TabsTrigger value="manual">Manual</TabsTrigger>
      </TabsList>
      <TabsContent value="cli">npx shadcn add</TabsContent>
      <TabsContent value="manual">copy the file</TabsContent>
    </CodeTabs>
  );
}

describe("CodeTabs", () => {
  it("opens on the CLI install method", () => {
    render(
      <Provider>
        <InstallTabs />
      </Provider>
    );

    expect(screen.getByText("npx shadcn add")).toBeVisible();
  });

  it("keeps every install tab block on the method last picked", async () => {
    const user = userEvent.setup();
    render(
      <Provider>
        <InstallTabs />
        <InstallTabs />
      </Provider>
    );

    await user.click(screen.getAllByRole("tab", { name: "Manual" })[0]);

    expect(screen.getAllByText("copy the file")).toHaveLength(2);
    expect(JSON.parse(localStorage.getItem("config_v1")!)).toMatchObject({
      installationType: "manual",
    });
  });
});

describe("CodeCollapsibleWrapper", () => {
  it("keeps long code mounted but collapsed until Expand is pressed", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <CodeCollapsibleWrapper>
        <pre>long code</pre>
      </CodeCollapsibleWrapper>
    );

    expect(screen.getByText("long code")).toBeInTheDocument();
    expect(container.firstElementChild).toHaveAttribute("data-state", "closed");

    await user.click(screen.getByText("Expand"));

    expect(container.firstElementChild).toHaveAttribute("data-state", "open");
  });

  it("names its icon toggle for screen readers", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <CodeCollapsibleWrapper>
        <pre>long code</pre>
      </CodeCollapsibleWrapper>
    );

    await user.click(screen.getByRole("button", { name: "Toggle code" }));

    expect(container.firstElementChild).toHaveAttribute("data-state", "open");
  });
});
