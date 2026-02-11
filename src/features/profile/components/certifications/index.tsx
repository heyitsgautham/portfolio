"use client";

import { useState } from "react";
import { CERTIFICATIONS } from "../../data/certifications";
import { Panel, PanelContent, PanelHeader, PanelTitle } from "../panel";
import { CertificationItem } from "./certification-item";
import { Button } from "@/components/ui/button";

const INITIAL_DISPLAY_COUNT = 3;

export function Certifications() {
  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY_COUNT);
  const hasMore = displayCount < CERTIFICATIONS.length;
  const showingMore = displayCount > INITIAL_DISPLAY_COUNT;
  const visibleCertifications = CERTIFICATIONS.slice(0, displayCount);

  const loadMore = () => {
    setDisplayCount((prev) => prev + 3);
  };

  const showLess = () => {
    setDisplayCount(INITIAL_DISPLAY_COUNT);
    // Scroll back to certifications section
    const certsSection = document.getElementById("certs");
    if (certsSection) {
      certsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Panel id="certs">
      <PanelHeader>
        <PanelTitle>
          Certifications
          <sup className="ml-1 font-mono text-sm font-medium text-muted-foreground select-none">
            ({CERTIFICATIONS.length})
          </sup>
        </PanelTitle>
      </PanelHeader>

      <PanelContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleCertifications.map((certification, index) => (
            <CertificationItem
              key={`${certification.title}-${certification.issueDate}-${index}`}
              certification={certification}
            />
          ))}
        </div>

        {(hasMore || showingMore) && (
          <div className="mt-6 flex justify-center gap-3">
            {hasMore && (
              <Button
                onClick={loadMore}
                variant="outline"
                size="lg"
                className="min-w-[200px]"
              >
                Load More
              </Button>
            )}
            {showingMore && (
              <Button
                onClick={showLess}
                variant="outline"
                size="lg"
                className="min-w-[200px]"
              >
                Show Less
              </Button>
            )}
          </div>
        )}
      </PanelContent>
    </Panel>
  );
}
