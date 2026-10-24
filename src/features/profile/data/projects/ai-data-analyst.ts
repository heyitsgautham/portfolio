import type { Project } from "../../types/projects";

// Project 6: AI Data Analyst
export const aiDataAnalyst: Project = {
  id: "ai-data-analyst",
  slug: "ai-data-analyst",
  image: "/images/projects/data-analyst.webp",
  title: "AI Data Analyst - Multi-Source Data Analysis",
  period: {
    start: "10.2025",
    end: "11.2025",
  },
  link: "https://github.com/heyitsgautham/data-analyst",
  skills: [
    "Python",
    "FastAPI",
    "DuckDB",
    "Playwright",
    "BeautifulSoup",
    "OCR",
    "Docker",
  ],
  summary: "Automated multi-source data analysis with multi-LLM",
  description: `Intelligent data analysis system combining web scraping, multi-format data extraction, and AI-powered analysis with multi-LLM orchestration to automatically answer complex data questions.

**Key Features:**
- Multi-source data ingestion: web scraping, PDF extraction, image OCR, CSV/JSON/Excel/SQL processing
- Automatic numeric field detection with currency, percentage, and scientific notation handling
- Multi-table relationship detection and DuckDB query generation
- Error recovery with automatic retry across multiple LLM providers
- Archive support (ZIP, TAR, TAR.GZ) with automatic file cleanup

**Impact:**
- Supports 10+ input formats including PDFs, images, Excel, and JavaScript-rendered web pages
- Orchestrates 4 LLM providers (GPT, Claude, Gemini, Grok) with automatic failover
- Processes multiple concurrent files with comprehensive error handling`,
  isExpanded: false,
  intro:
    "An intelligent data analysis system combining web scraping, multi-format data extraction, and AI-powered analysis with multi-LLM orchestration. It automatically answers complex data questions by ingesting 10+ input formats and orchestrating 4 LLM providers with automatic failover.",
  uniqueFeatures: [
    "Multi-source data ingestion: web scraping, PDF extraction, image OCR, CSV/JSON/Excel/SQL processing",
    "Automatic numeric field detection with currency, percentage, and scientific notation handling",
    "Multi-table relationship detection and DuckDB query generation",
    "Error recovery with automatic retry across multiple LLM providers",
    "Archive support (ZIP, TAR, TAR.GZ) with automatic file cleanup",
    "Orchestrates 4 LLM providers (GPT, Claude, Gemini, Grok) with automatic failover",
  ],
  techStackDetail: [
    { label: "Backend", items: "FastAPI, Python 3.11+, Pandas, NumPy" },
    { label: "Database", items: "DuckDB (in-memory analytical database)" },
    {
      label: "AI/ML",
      items: "GPT, Claude, Gemini, Grok (multi-LLM orchestration)",
    },
    {
      label: "Scraping",
      items: "Playwright, Selenium, BeautifulSoup4, httpx",
    },
    { label: "Infrastructure", items: "Docker" },
  ],
};
