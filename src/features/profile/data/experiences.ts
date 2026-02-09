import type { Experience } from "../types/experiences";

export const EXPERIENCES: Experience[] = [
  // Internship Experience - Presidio
  {
    id: "presidio",
    companyName: "Presidio",
    companyLogo: "/images/companies/presidio-logo.webp", // Replace with actual company logo (200x200px recommended)
    positions: [
      {
        id: "swe-intern",
        title: "Software Engineer Intern",
        employmentPeriod: {
          start: "09.2025",
          end: "11.2025",
        },
        employmentType: "Internship",
        icon: "code",
        description: `**SkillSync (AI Screening Platform):** Built AI-powered resume screening using Google Gemini 2.5 reducing screening time by 98% (40h → <1h per role). Implemented automated parsing, anonymization, and weighted semantic matching.

**Aura Health (Medical RAG System):** Architected multi-domain RAG system using Ollama (Mistral 7B) & ChromaDB across 8 medical specialties. Implemented 7 advanced retrieval strategies (RAG-Fusion, FLARE, Adaptive) with safety guardrails.

**AcademiaSync (Cloud LMS):** Designed microservices-based LMS deployed on AWS ECS Fargate with Terraform as IaC. Automated infrastructure provisioning with CloudWatch monitoring.

**SocialPulse (Analytics Platform):** Engineered high-throughput analytics engine (FastAPI, Redis) with sliding-window trend detection (1–1440 min intervals).`,
        skills: [
          "Google Gemini 2.5",
          "Ollama",
          "Mistral 7B",
          "ChromaDB",
          "RAG",
          "AWS ECS Fargate",
          "Terraform",
          "FastAPI",
          "Redis",
          "Node.js",
          "PostgreSQL",
        ],
        isExpanded: true,
      },
    ],
    isCurrentEmployer: false,
  },
];
