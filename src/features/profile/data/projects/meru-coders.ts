import type { Project } from "../../types/projects";

// Project 4: Meru Coders - SIH Grand Finale
export const meruCoders: Project = {
  id: "meru-coders",
  slug: "meru-coders",
  image: "/images/projects/meru-coders.webp",
  title: "Meru Coders - AI Sanskrit Meter Identification",
  period: {
    start: "12.2025",
    end: "01.2026",
  },
  link: "https://github.com/heyitsgautham/meru-coders",
  skills: [
    "Python",
    "Flask",
    "React",
    "FastAPI",
    "ChromaDB",
    "RAG",
    "Gemini",
    "OCR",
  ],
  summary: "AI-powered Sanskrit meter identification system",
  description: `AI-powered platform that identifies and analyzes Sanskrit meters (Chandas) with 100% accuracy on authentic texts, combining 2,500-year-old traditional knowledge with modern AI/ML technologies. Built for SIH 2025 Grand Finale.

**Key Features:**
- Multi-modal input processing (Text, Image OCR, Audio STT, File upload PDF/DOCX/TXT)
- RAG-powered knowledge base with 2,844 indexed documents for accurate Sanskrit meter identification
- Vedic vs Classical text classifier with Gemini-powered input validation
- Multi-language support with 9+ Indian script OCR (Devanagari, Telugu, Tamil, Kannada, Malayalam, Bengali, Gujarati)
- Real-time WebSocket notifications and Twitter-like community platform
- Gamified learning platform (Chandas-game) with interactive LG Lab

**Impact:**
- Achieved 100% accuracy on 85+ test files including authentic Vedic/Classical texts
- Built the largest digital collection of 1,920+ meters across all categories
- Processed 147 verses in comprehensive dataset-level validation with 8/8 core tests passing`,
  isExpanded: false,
  intro:
    "An AI-powered platform that identifies and analyzes Sanskrit meters (Chandas) with 100% accuracy on authentic texts, combining 2,500-year-old traditional knowledge with modern AI/ML technologies. Built for SIH 2025 Grand Finale, it features the largest digital collection of 1,920+ meters across all categories.",
  uniqueFeatures: [
    "Multi-modal input processing (Text, Image OCR, Audio STT, File upload PDF/DOCX/TXT)",
    "RAG-powered knowledge base with 2,844 indexed documents for accurate Sanskrit meter identification",
    "Vedic vs Classical text classifier with Gemini-powered input validation",
    "Multi-language support with 9+ Indian script OCR (Devanagari, Telugu, Tamil, Kannada, Malayalam, Bengali, Gujarati)",
    "Real-time WebSocket notifications and Twitter-like community platform",
    "Gamified learning platform (Chandas-game) with interactive LG Lab",
  ],
  techStackDetail: [
    { label: "Frontend", items: "React, Vite" },
    { label: "Backend", items: "Flask, FastAPI, Python" },
    {
      label: "AI/ML",
      items: "Google Gemini, ChromaDB (RAG), Google Vision API, Tesseract OCR",
    },
    {
      label: "Database",
      items: "Supabase (Auth + Database), ChromaDB (Vector DB)",
    },
    {
      label: "Other",
      items: "WebSocket, JWT, Text-to-Speech, Speech-to-Text",
    },
  ],
};
