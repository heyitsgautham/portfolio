import type { Project } from "../../types/projects";

// Project 7: Aura Health
export const auraHealth: Project = {
  id: "aura-health",
  slug: "aura-health",
  image: "/images/projects/aura-health.webp",
  title: "Aura Health - Medical RAG System",
  period: {
    start: "09.2025",
    end: "11.2025",
  },
  link: "https://github.com/heyitsgautham/aura-health",
  skills: [
    "Python",
    "FastAPI",
    "LangChain",
    "ChromaDB",
    "Gemini",
    "NLP",
    "Embeddings",
  ],
  summary: "Medical RAG system for multi-specialty hospitals",
  description: `Advanced Retrieval-Augmented Generation (RAG) system for multi-specialty hospitals implementing 7 sophisticated retrieval techniques with domain-specific knowledge retrieval, safety guardrails, and patient-facing query restrictions.

**Key Features:**
- 7 advanced retrieval strategies: Query Decomposition, Contextual Compression, Self-Query Retrieval, Ensemble Retrieval, RAG-Fusion with RRF, FLARE, Adaptive Retrieval
- Multi-domain medical knowledge bases (Cardiology, Pediatrics, Neurology, Dermatology, Endocrinology, etc.)
- Automatic domain detection from query keywords without manual specification
- Safety guardrails blocking harmful/threatening queries with patient mode restrictions
- Dynamic retrieval tuning based on query complexity (k=2 to k=6)

**Impact:**
- Implemented 7 advanced RAG techniques improving retrieval quality and answer accuracy
- Covered 8+ medical specialty domains with domain-specific knowledge retrieval
- Achieved ~40% token reduction for simple queries with adaptive k-values`,
  isExpanded: false,
  intro:
    "An advanced Retrieval-Augmented Generation (RAG) system for multi-specialty hospitals implementing 7 sophisticated retrieval techniques. It features domain-specific knowledge retrieval across 8+ medical specialties with safety guardrails and patient-facing query restrictions.",
  uniqueFeatures: [
    "7 advanced retrieval strategies: Query Decomposition, Contextual Compression, Self-Query Retrieval, Ensemble Retrieval, RAG-Fusion with RRF, FLARE, Adaptive Retrieval",
    "Multi-domain medical knowledge bases (Cardiology, Pediatrics, Neurology, Dermatology, Endocrinology, etc.)",
    "Automatic domain detection from query keywords without manual specification",
    "Safety guardrails blocking harmful/threatening queries with patient mode restrictions",
    "Dynamic retrieval tuning based on query complexity (k=2 to k=6)",
    "~40% token reduction for simple queries with adaptive k-values",
  ],
  techStackDetail: [
    { label: "Backend", items: "FastAPI, Python 3.10+, LangChain" },
    {
      label: "AI/ML",
      items:
        "Ollama Mistral (local LLM), HuggingFace sentence-transformers (all-MiniLM-L6-v2)",
    },
    { label: "Vector Store", items: "ChromaDB" },
    {
      label: "Techniques",
      items: "RAG-Fusion, FLARE, Query Decomposition, Contextual Compression",
    },
  ],
};
