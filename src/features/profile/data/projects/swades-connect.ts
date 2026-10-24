import type { Project } from "../../types/projects";

// Project 11: Swades Connect
export const swadesConnect: Project = {
  id: "swades-connect",
  slug: "swades-connect",
  image: "/images/projects/odoo-crm.webp",
  title: "Swades Connect - Odoo CRM Extractor",
  period: {
    start: "06.2025",
    end: "06.2025",
  },
  link: "https://github.com/heyitsgautham/swades-connect",
  skills: [
    "TypeScript",
    "React",
    "Chrome Extension",
    "Manifest V3",
    "Tailwind CSS",
  ],
  summary: "Chrome extension to extract Odoo CRM data",
  description: `Chrome Extension (Manifest V3) that extracts Contacts, Opportunities, and Activities from Odoo CRM via RPC interception, with React-powered dashboard for data management and export. Built in a 5-hour hackathon.

**Key Features:**
- Automatic detection of Odoo list and kanban views
- RPC interception to capture Odoo's internal API calls
- Pagination handling for multi-page data extraction
- Export to CSV and JSON formats
- Shadow DOM isolation preventing CSS conflicts with host page
- Chrome Manifest V3 compliance with service workers

**Impact:**
- Built in 5-hour hackathon constraint
- Supports 3 data types: Contacts, Opportunities, Activities
- Data persistence across browser sessions with chrome.storage.local`,
  isExpanded: false,
  intro:
    "A Chrome Extension (Manifest V3) that extracts Contacts, Opportunities, and Activities from Odoo CRM via RPC interception, with a React-powered dashboard for data management and export. Built in a 5-hour hackathon, it features automatic view detection and Shadow DOM isolation.",
  uniqueFeatures: [
    "Automatic detection of Odoo list and kanban views",
    "RPC interception to capture Odoo\u2019s internal API calls",
    "Pagination handling for multi-page data extraction",
    "Export to CSV and JSON formats",
    "Shadow DOM isolation preventing CSS conflicts with host page",
    "Chrome Manifest V3 compliance with service workers",
  ],
  techStackDetail: [
    {
      label: "Frontend",
      items: "React 18, Tailwind CSS, Vite with CRXJS plugin",
    },
    { label: "Language", items: "TypeScript 5" },
    {
      label: "Platform",
      items:
        "Chrome Extension APIs (Manifest V3), chrome.storage.local, Service Workers",
    },
  ],
};
