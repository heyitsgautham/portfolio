import Link from "next/link";

import { Button } from "@/components/ui/button";

import { CERTIFICATIONS } from "../../data/certifications";
import { Panel, PanelContent, PanelHeader, PanelTitle } from "../panel";
import { CertificationItem } from "./certification-item";

const INITIAL_DISPLAY_COUNT = 3;

export function Certifications() {
  const visibleCertifications = CERTIFICATIONS.slice(0, INITIAL_DISPLAY_COUNT);

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

        {CERTIFICATIONS.length > INITIAL_DISPLAY_COUNT && (
          <div className="mt-6 flex justify-center">
            <Button
              variant="outline"
              size="lg"
              className="min-w-[200px]"
              asChild
            >
              <Link href="/certificates">Show More</Link>
            </Button>
          </div>
        )}
      </PanelContent>
    </Panel>
  );
}
