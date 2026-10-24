import type { Project } from "../../types/projects";

// Project 9: SmartTasker
export const smartTasker: Project = {
  id: "smart-tasker",
  slug: "smart-tasker",
  image: "/images/projects/smart-tasker.webp",
  title: "SmartTasker - AI Task Management",
  period: {
    start: "08.2025",
    end: "09.2025",
  },
  link: "https://github.com/heyitsgautham/smart-tasker",
  liveLink: "https://smart-tasker-eight.vercel.app",
  skills: [
    "TypeScript",
    "Next.js",
    "React",
    "Firebase",
    "Google Calendar API",
    "Gemini AI",
  ],
  summary: "AI task manager with smart prioritization",
  description: `AI-powered task management app that uses Google Gemini for intelligent task prioritization, natural language date parsing, and seamless Google Calendar integration.

**Key Features:**
- AI-powered automatic task prioritization using natural language analysis
- Bidirectional Google Calendar sync with OAuth 2.0
- Real-time cross-device synchronization using Firestore
- Smart date parsing from natural language inputs
- Browser notification system for reminders

**Impact:**
- Deployed live application at smart-tasker-eight.vercel.app
- Real-time sync across devices with sub-second latency
- Integrated Google Gemini AI for task summarization and priority suggestions`,
  isExpanded: false,
  intro:
    "An AI-powered task management app that uses Google Gemini for intelligent task prioritization, natural language date parsing, and seamless Google Calendar integration. It features real-time cross-device synchronization using Firestore with sub-second latency.",
  uniqueFeatures: [
    "AI-powered automatic task prioritization using natural language analysis",
    "Bidirectional Google Calendar sync with OAuth 2.0",
    "Real-time cross-device synchronization using Firestore",
    "Smart date parsing from natural language inputs",
    "Browser notification system for reminders",
  ],
  techStackDetail: [
    {
      label: "Frontend",
      items: "Next.js 15, React, TypeScript, Tailwind CSS",
    },
    { label: "Backend", items: "Firebase (Firestore, Auth)" },
    { label: "AI", items: "Google Gemini AI" },
    { label: "APIs", items: "Google Calendar API, OAuth 2.0" },
    { label: "Deployment", items: "Vercel" },
  ],
};
