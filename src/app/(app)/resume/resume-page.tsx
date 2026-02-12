"use client";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import {
  ArrowLeftIcon,
  DownloadIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import { Button } from "@/components/ui/button";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const RESUME_PDF_URL = "/resume.pdf";

export function ResumePage() {
  const [numPages, setNumPages] = useState<number>(0);
  const [scale, setScale] = useState(1.2);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
      if (mobile) setScale(0.55);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setNumPages(numPages);
    },
    []
  );

  const handleDownload = async () => {
    try {
      const response = await fetch(RESUME_PDF_URL);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Gautham_Krishna_Resume.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch {
      window.open(RESUME_PDF_URL, "_blank");
    }
  };

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 3));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.4));

  return (
    <div className="relative flex h-[calc(100vh-3.5rem)] flex-col bg-[#0a0a0a] sm:h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)]">
      {/* Subtle radial gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.03)_0%,_transparent_70%)]" />

      {/* PDF Content */}
      <div className="relative flex-1 overflow-auto">
        <div className="flex min-h-full items-start justify-center px-4 py-10 sm:py-12">
          <Document
            file={RESUME_PDF_URL}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex h-[80vh] items-center justify-center">
                <div className="size-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
              </div>
            }
          >
            {Array.from(new Array(numPages), (_, index) => (
              <div
                key={`page_${index + 1}`}
                className="mb-8 last:mb-0"
                style={{
                  filter:
                    "drop-shadow(0 20px 50px rgba(255, 255, 255, 0.07)) drop-shadow(0 8px 20px rgba(0, 0, 0, 0.8))",
                }}
              >
                <Page
                  pageNumber={index + 1}
                  scale={scale}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </div>
            ))}
          </Document>
        </div>
      </div>

      {/* Floating pill toolbar */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex justify-center">
        <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-white/10 bg-black/80 px-2 py-1.5 shadow-2xl backdrop-blur-xl sm:gap-2 sm:px-3">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="h-8 gap-1.5 rounded-full px-3 text-white/80 hover:bg-white/10 hover:text-white"
          >
            <Link href="/">
              <ArrowLeftIcon className="size-3.5" />
              <span className="hidden sm:inline">Back</span>
            </Link>
          </Button>

          <div className="mx-1 h-5 w-px bg-white/10" />

          <Button
            variant="ghost"
            size="icon"
            className="size-8 rounded-full text-white/80 hover:bg-white/10 hover:text-white"
            onClick={zoomOut}
          >
            <ZoomOutIcon className="size-3.5" />
          </Button>
          <span className="min-w-[2.5rem] text-center text-xs tabular-nums text-white/50">
            {Math.round(scale * 100)}%
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 rounded-full text-white/80 hover:bg-white/10 hover:text-white"
            onClick={zoomIn}
          >
            <ZoomInIcon className="size-3.5" />
          </Button>

          <div className="mx-1 h-5 w-px bg-white/10" />

          <Button
            size="sm"
            className="h-8 gap-1.5 rounded-full px-3"
            onClick={handleDownload}
          >
            <DownloadIcon className="size-3.5" />
            <span className={isMobile ? "sr-only" : ""}>Download</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
