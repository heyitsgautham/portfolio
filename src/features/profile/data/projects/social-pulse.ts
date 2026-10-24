import type { Project } from "../../types/projects";

// Project 8: SocialPulse
export const socialPulse: Project = {
  id: "socialpulse",
  slug: "social-pulse",
  image: "/images/projects/social-pulse.webp",
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
  summary: "Real-time social media analytics and trend detection",
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
  intro:
    "A real-time social media analytics platform that processes engagement data, detects trending hashtags with sliding window counters, and provides viral chain detection through recursive comment analysis. It achieves 70-95% faster query performance through composite database indexing with sub-60ms Redis cache response times.",
  uniqueFeatures: [
    "Trending hashtag detection with sliding window algorithm and Redis caching",
    "Viral comment chain detection using recursive SQL CTEs",
    "Complex SQL aggregations for engagement reports and user analytics",
    "Database indexing achieving 70-95% query performance improvement",
    "Dual interface: REST API + CLI for administration",
    "Deterministic seeding (Faker with fixed seed) for reproducible demos",
  ],
  techStackDetail: [
    {
      label: "Backend",
      items: "FastAPI, Python 3.11+, SQLAlchemy, Alembic, Typer CLI",
    },
    { label: "Database", items: "PostgreSQL" },
    { label: "Caching", items: "Redis (with TTL)" },
    { label: "Testing", items: "pytest" },
  ],
};
