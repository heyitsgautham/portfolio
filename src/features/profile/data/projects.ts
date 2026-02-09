import type { Project } from "../types/projects";

export const PROJECTS: Project[] = [
  // Featured Project 1: SkillSync (Expanded)
  {
    id: "skillsync",
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
  },

  // Featured Project 2: Sticky-Net (Expanded)
  {
    id: "sticky-net",
    title: "Sticky-Net - AI Honeypot System",
    period: {
      start: "01.2026",
      end: "Present",
    },
    link: "https://github.com/heyitsgautham/sticky-net",
    skills: [
      "Python",
      "FastAPI",
      "Gemini AI",
      "Docker",
      "Cloud Run",
      "NLP",
      "Regex",
    ],
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
  },

  // Featured Project 3: AcademiaSync (Expanded)
  {
    id: "academiasync",
    title: "AcademiaSync - Cloud Learning Management System",
    period: {
      start: "09.2025",
      end: "11.2025",
    },
    link: "https://github.com/heyitsgautham/academia-sync",
    skills: [
      "TypeScript",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "AWS ECS Fargate",
      "Terraform",
      "Docker",
    ],
    description: `A modern, scalable learning management system with Google OAuth authentication, role-based access control, and real-time analytics for students, teachers, and administrators.

**Key Features:**
- Multi-service Docker containerization with health checks and orchestration
- Infrastructure-as-Code deployment using Terraform on AWS ECS Fargate
- Google OAuth 2.0 integration via NextAuth.js with JWT authentication and refresh tokens
- Real-time analytics dashboard with Recharts for performance visualization
- Secure session management with httpOnly cookies and automatic token refresh
- Swagger API documentation and comprehensive error handling

**Impact:**
- Deployed microservices architecture with 3 independent services (Frontend, User Service, Course Service)
- Implemented complete CRUD operations for courses, assignments, and user management
- Built role-based dashboards for 3 user types (Student, Teacher, Admin) with personalized analytics
- Automated CI/CD with GitHub Actions`,
    isExpanded: false,
  },

  // Project 4: Meru Coders - SIH Grand Finale
  {
    id: "meru-coders",
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
  },

  // Project 5: PhishGuard Vision
  {
    id: "phishguard-vision",
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
    description: `A Chrome extension leveraging Chrome's Built-in AI APIs (Gemini Nano) to protect elderly users and those with low technical literacy from phishing, scams, and deceptive online practices—entirely on-device with complete privacy.

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
  },

  // Project 6: AI Data Analyst
  {
    id: "ai-data-analyst",
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
  },

  // Project 7: Aura Health
  {
    id: "aura-health",
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
  },

  // Project 8: SocialPulse
  {
    id: "socialpulse",
    title: "SocialPulse - Real-time Analytics Engine",
    period: {
      start: "09.2025",
      end: "11.2025",
    },
    link: "https://github.com/heyitsgautham/social-pulse",
    skills: [
      "Python",
      "FastAPI",
      "Redis",
      "PostgreSQL",
      "SQLAlchemy",
      "Real-time",
    ],
    description: `Real-time social media analytics platform that processes engagement data, detects trending hashtags with sliding window counters, and provides viral chain detection through recursive comment analysis.

**Key Features:**
- Trending hashtag detection with sliding window algorithm and Redis caching
- Viral comment chain detection using recursive SQL CTEs
- Complex SQL aggregations for engagement reports and user analytics
- Database indexing achieving 70-95% query performance improvement
- Dual interface: REST API + CLI for administration

**Impact:**
- Processed 10,000+ posts and 1,000+ users in demo dataset
- Achieved 70-95% faster query performance with composite database indexing
- Sub-60ms Redis cache response time for trending data
- Comprehensive test coverage with pytest`,
    isExpanded: false,
  },

  // Project 9: SmartTasker
  {
    id: "smart-tasker",
    title: "SmartTasker - AI Task Management",
    period: {
      start: "08.2025",
      end: "09.2025",
    },
    link: "https://github.com/heyitsgautham/smart-tasker",
    skills: [
      "TypeScript",
      "Next.js",
      "React",
      "Firebase",
      "Google Calendar API",
      "Gemini AI",
    ],
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
  },

  // Project 10: SecureWipe (Erase-Sure)
  {
    id: "securewipe",
    title: "SecureWipe - NIST Data Sanitization Platform",
    period: {
      start: "07.2024",
      end: "09.2024",
    },
    link: "https://github.com/heyitsgautham/erase-sure",
    skills: [
      "Rust",
      "Python",
      "TypeScript",
      "Tauri",
      "React",
      "FastAPI",
      "Cryptography",
    ],
    description: `NIST SP 800-88 Rev.1 compliant data sanitization platform with cryptographically signed certificates, cross-platform desktop UI, and web-based verification portal for secure e-waste management. Built for SIH 2024.

**Key Features:**
- NIST-compliant sanitization methods: NVMe Sanitize, ATA Secure Erase, HPA/DCO clearing
- Tamper-proof certificate system with Ed25519 signatures and QR-based verification
- Intelligent encrypted backup with AES-256-CTR and SHA-256 manifest integrity
- Cross-platform desktop UI with device discovery, risk classification, and real-time progress
- REST API verification portal for programmatic certificate validation

**Impact:**
- Addresses ₹50,000+ crore worth of hoarded IT assets in India due to data breach fears
- Implements 3 NIST-compliant sanitization levels (PURGE, CLEAR, DESTROY) with verification sampling
- Built end-to-end audit trail with certificate chaining for compliance documentation`,
    isExpanded: false,
  },

  // Project 11: Swades Connect
  {
    id: "swades-connect",
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
  },

  // Project 12: Multi-Label Emotion Classification
  {
    id: "emotion-classification",
    title: "Multi-Label Emotion Classification",
    period: {
      start: "03.2025",
      end: "05.2025",
    },
    link: "https://github.com/heyitsgautham/multi-label",
    skills: [
      "Python",
      "PyTorch",
      "Transformers",
      "DeBERTa",
      "RoBERTa",
      "Knowledge Distillation",
    ],
    description: `End-to-end multi-label emotion classification system that predicts five emotions (Anger, Fear, Joy, Sadness, Surprise) from short English text using ensemble transformer models with knowledge distillation for efficient deployment. IIT Madras course project.

**Key Features:**
- 10-model transformer ensemble (2 architectures × 5 folds) with weighted logits averaging
- Knowledge distillation pipeline compressing large ensemble into deployable DeBERTa-v3-base student model
- Hybrid CNN + BiGRU + Self-Attention architecture combining local n-gram patterns with long-range sequence context
- Full experiment tracking with Weights & Biases integration
- Production-ready model deployed to Hugging Face Hub

**Impact:**
- Trained 10 large transformer models with 5-fold cross-validation for robust ensemble predictions
- Deployed distilled student model to Hugging Face Hub: heyitsgautham/emotion-ensemble-distilled
- Built progression from rule-based baseline → transformers → knowledge distillation`,
    isExpanded: false,
  },

  // Project 13: Predictive Maintenance
  {
    id: "predictive-maintenance",
    title: "Predictive Maintenance with PySpark",
    period: {
      start: "01.2025",
      end: "03.2025",
    },
    link: "https://github.com/heyitsgautham/predictive-maintenance",
    skills: [
      "Python",
      "PySpark",
      "Spark MLlib",
      "Random Forest",
      "Feature Engineering",
    ],
    description: `End-to-end distributed machine learning pipeline using PySpark that predicts equipment failures 7 days in advance, processing 2M+ records across 1,900 machines for proactive maintenance scheduling.

**Key Features:**
- Engineered 1,150 rolling statistics features (5 windows × 46 features × 5 statistics) for time-series analysis
- Implemented over-labeling technique for 7-day advance failure prediction window
- Random Forest classifier (100 trees) with Grid search and 3-fold cross-validation
- PCA dimensionality reduction (172 → 50 components)
- Stratified down-sampling to handle extreme class imbalance (98.5% vs 1.5%)

**Impact:**
- Processed 1.3 GB / 2M+ records across 1,900 machines over 4 years of data
- Achieved 7-day advance warning capability enabling proactive resource planning
- Utilized full 32-core CPU with 448 GB RAM for distributed processing`,
    isExpanded: false,
  },

  // Project 14: Earthquake Report
  {
    id: "earthquake-report",
    title: "Earthquake Analysis & Prediction Platform",
    period: {
      start: "11.2024",
      end: "01.2025",
    },
    link: "https://github.com/heyitsgautham/earthquake-analysis",
    skills: [
      "Python",
      "Streamlit",
      "Scikit-learn",
      "XGBoost",
      "GeoPandas",
      "Folium",
    ],
    description: `Data analytics platform for earthquake monitoring, historical analysis, and ML-based impact prediction to aid disaster management and response planning.

**Key Features:**
- Real-time earthquake monitoring with live data feeds from USGS
- Historical trend analysis for predictive insights on seismic activity
- Impact prediction models forecasting potential damage and affected areas
- Interactive visualizations: heatmaps, geospatial charts, and 3D wave propagation simulations
- Region classification based on seismic vulnerability using clustering

**Impact:**
- Integrated 3 authoritative data sources (USGS, IRIS GSN, EM-DAT) for comprehensive earthquake data
- Built ML models for risk assessment covering magnitude, depth, and regional impact factors
- Deployed interactive dashboard with real-time global seismic activity monitoring`,
    isExpanded: false,
  },

  // Project 15: Traffic Men
  {
    id: "traffic-men",
    title: "Traffic Men - Transit Optimization Platform",
    period: {
      start: "08.2024",
      end: "11.2024",
    },
    link: "https://github.com/heyitsgautham/traffic-men",
    skills: [
      "Python",
      "Java",
      "JavaScript",
      "Scikit-learn",
      "NetworkX",
      "Android",
    ],
    description: `Traffic management platform that uses ML-based demand forecasting and adaptive routing algorithms to optimize public transit scheduling and reduce commuter wait times for MTC Chennai.

**Key Features:**
- Real-time traffic data integration with commuter density and event information
- Predictive analytics using 9 ML models (Random Forest, XGBoost, AdaBoost, Gradient Boosting, Extra Trees) for demand forecasting
- Adaptive scheduling and routing with AI-driven vehicle deployment
- Graph-based route visualization with multiple NetworkX layouts
- Companion Android app for end-user access

**Impact:**
- Deployed live at heyitsgautham.github.io/traffic-men.github.io
- Trained on real MTC (Metropolitan Transport Corporation) and OpenCity datasets
- Companion Android app deployed for public access
- Team project with 4 contributors`,
    isExpanded: false,
  },
];
