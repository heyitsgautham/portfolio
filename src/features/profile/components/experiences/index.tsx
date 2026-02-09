import React from "react";

import { EXPERIENCES } from "../../data/experiences";
import { Panel, PanelContent, PanelHeader, PanelTitle } from "../panel";
import { ExperienceItem } from "./experience-item";

export function Experiences() {
  return (
    <Panel id="experience">
      <PanelHeader>
        <PanelTitle>Experience</PanelTitle>
      </PanelHeader>

      <PanelContent>
        <div className="pr-2 pl-4">
          {EXPERIENCES.map((experience) => (
            <ExperienceItem key={experience.id} experience={experience} />
          ))}
        </div>
      </PanelContent>
    </Panel>
  );
}
