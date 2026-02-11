import { TIMELINE } from "../../data/timeline";
import { Panel, PanelContent, PanelHeader, PanelTitle } from "../panel";
import { TimelineItem } from "./timeline-item";

// Sort timeline by date (most recent first)
const SORTED_TIMELINE = [...TIMELINE].sort(
  (a, b) => new Date(b.sortDate).getTime() - new Date(a.sortDate).getTime()
);

export function Timeline() {
  return (
    <Panel id="timeline">
      <PanelHeader>
        <PanelTitle>
          GK's Timeline
          <sup className="ml-1 font-mono text-sm font-medium text-muted-foreground select-none">
            ({TIMELINE.length})
          </sup>
        </PanelTitle>
      </PanelHeader>

      <PanelContent>
        <div className="relative">
          <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-border via-border to-transparent md:block" />

          <div className="space-y-12">
            {SORTED_TIMELINE.map((event, index) => (
              <TimelineItem
                key={event.id}
                event={event}
                position={index % 2 === 0 ? "left" : "right"}
              />
            ))}
          </div>
        </div>
      </PanelContent>
    </Panel>
  );
}
