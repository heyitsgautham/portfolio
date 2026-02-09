import type { Project } from "../types/projects";

export const PROJECTS: Project[] = [
  // Featured Project 1: SkillSync
  {
    id: "skillsync",
    title: "SkillSync - AI Resume Screening Platform",
    period: {
      start: "09.2025",
      end: "11.2025",
    },
    link: "https://github.com/heyitsgautham",
    skills: [
      "Google Gemini 2.5",
      "Python",
      "Vector Search",
      "NLP",
      "Resume Parsing",
      "Semantic Matching",
    ],
    description: `AI-powered resume screening platform reducing HR screening time by 98% (40h → <1h per role).

**Key Features:**
- Automated resume parsing and anonymization
- Weighted semantic matching using Google Gemini 2.5
- ATS-optimized candidate scoring
- Privacy-first approach with data anonymization

**Impact:**
- Deployed at Presidio during internship
- Dramatically reduced manual screening effort
- Improved candidate-job fit accuracy`,
    isExpanded: true,
  },

  // Featured Project 2: Aura Health
  {
    id: "aura-health",
    title: "Aura Health - Medical RAG System",
    period: {
      start: "09.2025",
      end: "11.2025",
    },
    link: "https://github.com/heyitsgautham",
    skills: [
      "Ollama",
      "Mistral 7B",
      "ChromaDB",
      "RAG",
      "LangChain",
      "Python",
      "Healthcare AI",
    ],
    description: `Multi-domain RAG system for healthcare applications across 8 medical specialties.

**Key Features:**
- 7 advanced retrieval strategies (RAG-Fusion, FLARE, Adaptive)
- Safety guardrails for medical accuracy
- Multi-specialty knowledge base integration
- Hallucination prevention mechanisms

**Technical Highlights:**
- Built with Ollama (Mistral 7B) for local inference
- ChromaDB vector store for efficient retrieval
- Production-ready safety validation layer`,
    isExpanded: true,
  },

  // Featured Project 3: AcademiaSync
  {
    id: "academiasync",
    title: "AcademiaSync - Cloud Learning Management System",
    period: {
      start: "09.2025",
      end: "11.2025",
    },
    link: "https://github.com/heyitsgautham",
    skills: [
      "Node.js",
      "PostgreSQL",
      "AWS ECS Fargate",
      "Terraform",
      "Docker",
      "CloudWatch",
      "Microservices",
    ],
    description: `Microservices-based Learning Management System deployed on AWS cloud infrastructure.

**Key Features:**
- Microservices architecture for scalability
- AWS ECS Fargate for container orchestration
- Infrastructure as Code with Terraform
- Real-time monitoring with CloudWatch

**Technical Highlights:**
- Automated infrastructure provisioning
- CI/CD pipeline integration
- Production-grade deployment on AWS`,
    isExpanded: true,
  },

  // Featured Project 4: SocialPulse
  {
    id: "socialpulse",
    title: "SocialPulse - Real-time Analytics Engine",
    period: {
      start: "09.2025",
      end: "11.2025",
    },
    link: "https://github.com/heyitsgautham",
    skills: [
      "FastAPI",
      "Redis",
      "Python",
      "Real-time Processing",
      "CI/CD",
      "Analytics",
    ],
    description: `High-throughput social media analytics engine with sliding-window trend detection.

**Key Features:**
- Sliding-window trend detection (1–1440 min intervals)
- Real-time data processing pipeline
- High-throughput API design
- Redis caching for performance

**Technical Highlights:**
- Built with FastAPI for async performance
- Scalable architecture for high traffic
- CI/CD pipelines for continuous deployment`,
    isExpanded: false,
  },
];
