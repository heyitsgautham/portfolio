import type { Project } from "../../types/projects";
import { academiaSync } from "./academia-sync";
import { aiDataAnalyst } from "./ai-data-analyst";
import { auraHealth } from "./aura-health";
import { earthquakeReport } from "./earthquake-report";
import { emotionClassification } from "./emotion-classification";
import { meruCoders } from "./meru-coders";
import { phishguardVision } from "./phishguard-vision";
import { predictiveMaintenance } from "./predictive-maintenance";
import { secureWipe } from "./secure-wipe";
import { skillSync } from "./skill-sync";
import { smartTasker } from "./smart-tasker";
import { socialPulse } from "./social-pulse";
import { stickyNet } from "./sticky-net";
import { swadesConnect } from "./swades-connect";
import { trafficMen } from "./traffic-men";

/** Every project, in the order the site lists them. */
export const PROJECTS: Project[] = [
  skillSync,
  stickyNet,
  academiaSync,
  meruCoders,
  phishguardVision,
  aiDataAnalyst,
  auraHealth,
  socialPulse,
  smartTasker,
  secureWipe,
  swadesConnect,
  emotionClassification,
  predictiveMaintenance,
  earthquakeReport,
  trafficMen,
];

/** Look up a project by its URL slug. */
export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
