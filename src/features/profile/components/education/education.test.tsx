import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EDUCATION } from "@/features/profile/data/education";

import { Education } from "./index";

describe("Education", () => {
  it("shows one card per degree with the count in the title", () => {
    render(<Education />);

    expect(screen.getAllByRole("article")).toHaveLength(EDUCATION.length);
    expect(screen.getByText(`(${EDUCATION.length})`)).toBeInTheDocument();
  });
});
