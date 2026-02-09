import { CERTIFICATIONS } from "../../data/certifications";
import { Panel, PanelContent, PanelHeader, PanelTitle } from "../panel";
import { CertificationItem } from "./certification-item";

export function Certifications() {
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
          {CERTIFICATIONS.map((certification) => (
            <CertificationItem
              key={certification.credentialID}
              certification={certification}
            />
          ))}
        </div>
      </PanelContent>
    </Panel>
  );
}
