import type { Project } from "../../types/projects";

// Project 5: PhishGuard Vision
export const phishguardVision: Project = {
  id: "phishguard-vision",
  slug: "phishguard-vision",
  image: "/images/projects/phishproof-ext.webp",
  title: "PhishGuard Vision - Chrome AI Safety Extension",
  period: {
    start: "11.2025",
    end: "12.2025",
  },
  link: "https://github.com/heyitsgautham/mind-link",
  skills: [
    "TypeScript",
    "Chrome Extension",
    "Gemini Nano",
    "On-device AI",
    "Privacy",
  ],
  summary: "On-device AI Chrome extension for phishing detection",
  description: `A Chrome extension leveraging Chrome's Built-in AI APIs (Gemini Nano) to protect elderly users and those with low technical literacy from phishing, scams, and deceptive online practices, entirely on-device with complete privacy.

**Key Features:**
- Multi-tier phishing detection with 4 Chrome Built-in AI APIs (Prompt, Summarizer, Rewriter, Translator)
- Multimodal visual analysis detecting spoofed logos, fake security warnings, and deceptive UI elements
- Hidden fee detector that condenses 5,000+ word T&C documents into 200-word plain-language summaries
- AI-learned ad blocker that dynamically identifies and blocks malvertising patterns
- Multi-language support for 10 languages (English, Spanish, French, German, Italian, Portuguese, Japanese, Chinese, Arabic, Hindi)
- Complete on-device processing with zero external API calls for privacy

**Impact:**
- Achieved 70% cache hit rate for instant threat detection on repeat visits
- Reduced AI API calls by 50% through intelligent caching and tiered analysis
- Zero-cost, offline-capable threat detection with no subscription or API fees
- Trust score system with color-coded indicators (Red: 1-2, Orange: 3, Green: 4-5)`,
  isExpanded: false,
  intro:
    "A Chrome extension leveraging Chrome\u2019s Built-in AI APIs (Gemini Nano) to protect elderly users and those with low technical literacy from phishing, scams, and deceptive online practices. It runs entirely on-device with zero external API calls, ensuring complete privacy and offline-capable threat detection.",
  uniqueFeatures: [
    "Multi-tier phishing detection with 4 Chrome Built-in AI APIs (Prompt, Summarizer, Rewriter, Translator)",
    "Multimodal visual analysis detecting spoofed logos, fake security warnings, and deceptive UI elements",
    "Hidden fee detector that condenses 5,000+ word T&C documents into 200-word plain-language summaries",
    "AI-learned ad blocker that dynamically identifies and blocks malvertising patterns",
    "Multi-language support for 10 languages with complete on-device processing",
    "Trust score system with color-coded indicators (Red: 1-2, Orange: 3, Green: 4-5)",
  ],
  techStackDetail: [
    {
      label: "Core",
      items: "TypeScript, Chrome Extension APIs (Manifest V3)",
    },
    {
      label: "AI",
      items: "Gemini Nano (on-device), Chrome Built-in AI APIs",
    },
    {
      label: "Techniques",
      items:
        "Multi-tier phishing detection, Multimodal screenshot analysis, Local caching (24-hour TTL)",
    },
  ],
};
