import type { Project } from "../../types/projects";

// Featured Project 2: Sticky-Net (Expanded)
export const stickyNet: Project = {
  id: "sticky-net",
  slug: "sticky-net",
  image: "/images/projects/honey-pot.webp",
  title: "Sticky-Net - AI Honeypot System",
  period: {
    start: "01.2026",
    end: "Present",
  },
  link: "https://github.com/heyitsgautham/sticky-net",
  liveLink: "https://stickynet-ai.web.app",
  skills: [
    "Python",
    "FastAPI",
    "Gemini AI",
    "Docker",
    "Cloud Run",
    "NLP",
    "Regex",
  ],
  summary: "AI honeypot that traps & extracts intel from scammers",
  description: `AI-powered honeypot system that autonomously detects scam messages, engages scammers through multi-turn conversations, and extracts actionable intelligence (bank accounts, UPI IDs, beneficiary names) for law enforcement.

**Key Features:**
- 4-stage pipeline: Regex pre-filter (~10ms) → AI Classifier (Gemini Flash, ~150ms) → Engagement Policy → Intelligence Extraction
- Adaptive engagement modes: Cautious (10 turns) vs Aggressive (25 turns) with persona maintenance
- Extracts 10+ intelligence types: bank accounts, UPI IDs, phone numbers, beneficiary names, IFSC codes, phishing URLs, crypto wallets
- Shadow DOM isolation for injected UI components
- Smart exit conditions with stale conversation detection and monotonic confidence scoring

**Impact:**
- Production-deployed on Google Cloud Run with structured logging
- ~10ms regex pre-filter latency for obvious scams, ~150ms AI classification
- Supports 50+ UPI provider validation patterns
- Validates 50+ Indian bank name patterns`,
  isExpanded: false,
  intro:
    "An AI-powered honeypot system that autonomously detects scam messages, engages scammers through multi-turn conversations, and extracts actionable intelligence for law enforcement. It uses a hybrid regex + AI pipeline to classify threats in under 150ms and adaptively engages scammers to extract bank accounts, UPI IDs, and beneficiary names.",
  uniqueFeatures: [
    "4-stage pipeline: Regex pre-filter (~10ms) \u2192 AI Classifier (Gemini Flash, ~150ms) \u2192 Engagement Policy \u2192 Intelligence Extraction",
    "Adaptive engagement modes: Cautious (10 turns) vs Aggressive (25 turns) with persona maintenance",
    "Extracts 10+ intelligence types: bank accounts, UPI IDs, phone numbers, beneficiary names, IFSC codes, phishing URLs, crypto wallets",
    "Shadow DOM isolation for injected UI components",
    "Smart exit conditions with stale conversation detection and monotonic confidence scoring",
    "Supports 50+ UPI provider and 50+ Indian bank name validation patterns",
  ],
  techStackDetail: [
    {
      label: "Frontend",
      items: "React 19, Tailwind CSS, shadcn/ui, Framer Motion",
    },
    { label: "Backend", items: "FastAPI, Python 3.11+" },
    { label: "AI/ML", items: "Gemini Flash, Regex-based pre-filter, NLP" },
    {
      label: "Infrastructure",
      items: "Google Cloud Run, Docker, Firestore, CORS middleware",
    },
  ],
};
