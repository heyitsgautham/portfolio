import type { Project } from "../../types/projects";

// Featured Project 1: SkillSync (Expanded)
export const skillSync: Project = {
  id: "skillsync",
  slug: "skill-sync",
  image: "/images/projects/skil-sync.webp",
  title: "SkillSync - AI Resume Screening Platform",
  period: {
    start: "09.2025",
    end: "11.2025",
  },
  link: "https://github.com/heyitsgautham/skil-sync-fullstack",
  skills: [
    "Python",
    "React",
    "FastAPI",
    "RAG",
    "PostgreSQL",
    "Multi-LLM",
    "Embeddings",
  ],
  summary: "AI-powered bias-free resume screening platform",
  description: `Enterprise RAG-powered resume screening platform that transforms a 40-hour, bias-prone manual process into a 45-minute, fair, and transparent automated solution with anonymized screening and AI-powered candidate ranking.

**Key Features:**
- AI-powered semantic matching using Google Gemini 2.5 with weighted scoring
- Anonymized resume screening with real-time PII redaction (names, emails, phones, LinkedIn, GitHub) for EEOC/GDPR compliance
- Enterprise RAG system with multi-LLM backup (10 API keys with automatic rotation) for 99.9% uptime
- Automated email communications: daily digests, bulk campaigns, interview invitations, and AI-generated rejection letters
- One-click export to Excel with evidence-based explanations for candidate rankings

**Impact:**
- Screens 500 applicants in 90 seconds (compared to 40+ hours manually)
- Achieves 98% cost reduction ($50 vs $5,000+ per position in recruiter time)
- Identifies 42% more qualified candidates using AI embeddings vs traditional screening
- 67% increase in diverse candidate shortlists through anonymized resume viewing
- 89% better accuracy compared to manual bias-prone screening processes`,
  isExpanded: false,
  intro:
    "An enterprise-grade RAG-powered resume screening platform that transforms a 40-hour, bias-prone manual process into a 45-minute, fair, and transparent automated solution. It uses anonymized screening and AI-powered candidate ranking to eliminate unconscious bias while achieving 89% better accuracy than manual screening.",
  uniqueFeatures: [
    "AI-powered semantic matching using Google Gemini 2.5 with weighted scoring",
    "Anonymized resume screening with real-time PII redaction (names, emails, phones, LinkedIn, GitHub) for EEOC/GDPR compliance",
    "Enterprise RAG system with multi-LLM backup (10 API keys with automatic rotation) for 99.9% uptime",
    "Automated email communications: daily digests, bulk campaigns, interview invitations, and AI-generated rejection letters",
    "One-click export to Excel with evidence-based explanations for candidate rankings",
    "Screens 500 applicants in 90 seconds with 98% cost reduction vs manual screening",
  ],
  techStackDetail: [
    { label: "Frontend", items: "React 19, Material-UI, Vite" },
    { label: "Backend", items: "FastAPI, Python 3.11+" },
    {
      label: "AI/ML",
      items: "Google Gemini 2.5, ChromaDB, sentence-transformers, PyMuPDF",
    },
    { label: "Database", items: "PostgreSQL, AWS S3" },
    {
      label: "Infrastructure",
      items: "Multi-LLM backup with 10 API keys, Cron jobs",
    },
  ],
};
