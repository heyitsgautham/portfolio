import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import {
  CollapsibleChevronsIcon,
  CollapsibleContent,
  CollapsibleTrigger,
  CollapsibleWithContext,
} from "./collapsible";

function Example(props: React.ComponentProps<typeof CollapsibleWithContext>) {
  return (
    <CollapsibleWithContext {...props}>
      <CollapsibleTrigger>
        Toggle <CollapsibleChevronsIcon data-testid="chevrons" />
      </CollapsibleTrigger>
      <CollapsibleContent>Details</CollapsibleContent>
    </CollapsibleWithContext>
  );
}

describe("CollapsibleWithContext", () => {
  it("keeps the chevrons icon in step with the open state", async () => {
    const user = userEvent.setup();
    render(<Example />);

    expect(screen.getByTestId("chevrons")).toHaveAttribute(
      "data-state",
      "closed"
    );
    await user.click(screen.getByRole("button"));

    expect(screen.getByText("Details")).toBeInTheDocument();
    expect(screen.getByTestId("chevrons")).toHaveAttribute(
      "data-state",
      "open"
    );
  });

  it("honours defaultOpen", () => {
    render(<Example defaultOpen />);

    expect(screen.getByText("Details")).toBeInTheDocument();
  });

  it("defers to a controlled open prop and reports toggles", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(<Example open={false} onOpenChange={onOpenChange} />);

    await user.click(screen.getByRole("button"));

    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(screen.queryByText("Details")).toBeNull();
  });

  it("refuses to render the chevrons outside a CollapsibleWithContext", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<CollapsibleChevronsIcon />)).toThrow(
      "Collapsible components must be used within a CollapsibleWithContext"
    );
  });
});
