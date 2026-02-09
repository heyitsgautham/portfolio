import dayjs from "dayjs";

import { EDUCATION } from "../../data/education";
import { Panel, PanelContent, PanelHeader, PanelTitle } from "../panel";
import { EducationItem } from "./education-item";

// Sort education by start date (most recent first)
const SORTED_EDUCATION = [...EDUCATION].sort((a, b) => {
  // Extract start date from period (format: "YYYY-MM to YYYY-MM" or "YYYY-MM to Present")
  const getStartDate = (period: string) => {
    const startDate = period.split(" to ")[0];
    return dayjs(startDate);
  };

  return getStartDate(b.period).diff(getStartDate(a.period));
});

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
        <div className="relative">
          <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-border via-border to-transparent md:block" />

          <div className="space-y-12">
            {SORTED_EDUCATION.map((item, index) => (
              <EducationItem
                key={item.id}
                education={item}
                position={index % 2 === 0 ? "left" : "right"}
              />
            ))}
          </div>
        </div>
      </PanelContent>
    </Panel>
  );
}
