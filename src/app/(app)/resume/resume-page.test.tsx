import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useEffect } from "react";
import { afterEach, describe, expect, it, onTestFinished, vi } from "vitest";

// Stand in for react-pdf: report three pages and draw each as a labelled box.
vi.mock("react-pdf", () => ({
  pdfjs: { GlobalWorkerOptions: {} },
  Document: ({
    onLoadSuccess,
    children,
  }: {
    onLoadSuccess: (pdf: { numPages: number }) => void;
    children: React.ReactNode;
  }) => {
    useEffect(() => onLoadSuccess({ numPages: 3 }), [onLoadSuccess]);
    return <div>{children}</div>;
  },
  Page: ({ pageNumber, scale }: { pageNumber: number; scale: number }) => (
    <div data-testid="pdf-page" data-scale={scale}>
      page {pageNumber}
    </div>
  ),
}));

import { ResumePage } from "./resume-page";

afterEach(() => {
  vi.unstubAllGlobals();
  Object.defineProperty(window, "innerWidth", {
    configurable: true,
    value: 1024,
  });
});

const zoomLabel = () => screen.getByText(/^\d+%$/).textContent;

describe("ResumePage", () => {
  it("renders every page of the PDF at 120%", async () => {
    render(<ResumePage />);

    expect(await screen.findAllByTestId("pdf-page")).toHaveLength(3);
    expect(zoomLabel()).toBe("120%");
  });

  it("zooms in steps of 20% between 40% and 300%", async () => {
    const user = userEvent.setup();
    render(<ResumePage />);
    const zoomIn = screen.getByRole("button", { name: "Zoom in" });
    const zoomOut = screen.getByRole("button", { name: "Zoom out" });

    await user.click(zoomIn);
    expect(zoomLabel()).toBe("140%");

    for (let i = 0; i < 12; i++) await user.click(zoomIn);
    expect(zoomLabel()).toBe("300%");

    for (let i = 0; i < 20; i++) await user.click(zoomOut);
    expect(zoomLabel()).toBe("40%");
  });

  it("starts at 55% on a phone-width screen", () => {
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      value: 390,
    });
    render(<ResumePage />);

    expect(zoomLabel()).toBe("55%");
  });

  it("downloads the PDF through a temporary object URL", async () => {
    const user = userEvent.setup();
    const blob = new Blob(["%PDF"]);
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({ blob: async () => blob }))
    );
    // jsdom has no object URLs, so add them for this test only.
    const createObjectURL = vi.fn(() => "blob:resume");
    const revokeObjectURL = vi.fn();
    Object.assign(window.URL, { createObjectURL, revokeObjectURL });
    onTestFinished(() => {
      Reflect.deleteProperty(window.URL, "createObjectURL");
      Reflect.deleteProperty(window.URL, "revokeObjectURL");
    });
    const click = vi
      .spyOn(HTMLAnchorElement.prototype, "click")
      .mockImplementation(() => {});
    render(<ResumePage />);

    await user.click(screen.getByRole("button", { name: /download/i }));

    await waitFor(() => expect(click).toHaveBeenCalledTimes(1));
    expect(fetch).toHaveBeenCalledWith("/Gautham_Krishna_Resume.pdf");
    expect(createObjectURL).toHaveBeenCalledWith(blob);
    expect(revokeObjectURL).toHaveBeenCalledWith("blob:resume");
  });

  it("opens the PDF in a new tab when the download fails", async () => {
    const user = userEvent.setup();
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => Promise.reject(new Error("offline")))
    );
    const open = vi.spyOn(window, "open").mockImplementation(() => null);
    render(<ResumePage />);

    await user.click(screen.getByRole("button", { name: /download/i }));

    await waitFor(() =>
      expect(open).toHaveBeenCalledWith("/Gautham_Krishna_Resume.pdf", "_blank")
    );
  });
});
