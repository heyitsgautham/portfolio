import { EDUCATION } from "../../data/education";
import { Panel, PanelContent, PanelHeader, PanelTitle } from "../panel";
import { EducationItem } from "./education-item";

export function Education() {
  return (
    <Panel id="education">
      <PanelHeader>
        <PanelTitle>
          Education
          <sup className="ml-1 font-mono text-sm font-medium text-muted-foreground select-none">
            ({EDUCATION.length})
          </sup>
        </PanelTitle>
      </PanelHeader>

      <PanelContent>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {EDUCATION.map((item) => (
            <EducationItem key={item.id} education={item} />
          ))}
        </div>
      </PanelContent>
    </Panel>
  );
}
