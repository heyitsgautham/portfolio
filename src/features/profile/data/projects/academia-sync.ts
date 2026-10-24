import type { Project } from "../../types/projects";

// Featured Project 3: AcademiaSync (Expanded)
export const academiaSync: Project = {
  id: "academiasync",
  slug: "academia-sync",
  image: "/images/projects/academia-sync.webp",
  title: "AcademiaSync - Cloud Learning Management System",
  period: {
    start: "09.2025",
    end: "11.2025",
  },
  link: "https://github.com/heyitsgautham/AcademiaSync",
  skills: [
    "TypeScript",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "AWS ECS Fargate",
    "Terraform",
    "Docker",
  ],
  summary: "Cloud-native learning management system on AWS",
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
  intro:
    "A modern, scalable learning management system with Google OAuth authentication, role-based access control, and real-time analytics for students, teachers, and administrators. It features a microservices architecture deployed on AWS ECS Fargate with Infrastructure-as-Code via Terraform.",
  uniqueFeatures: [
    "Multi-service Docker containerization with health checks and orchestration",
    "Infrastructure-as-Code deployment using Terraform on AWS ECS Fargate",
    "Google OAuth 2.0 integration via NextAuth.js with JWT authentication and refresh tokens",
    "Real-time analytics dashboard with Recharts for performance visualization",
    "Role-based dashboards for 3 user types (Student, Teacher, Admin) with personalized analytics",
    "Automated CI/CD with GitHub Actions",
  ],
  techStackDetail: [
    { label: "Frontend", items: "Next.js 14, React, Recharts" },
    { label: "Backend", items: "Node.js 20, Express, TypeScript" },
    { label: "Database", items: "PostgreSQL 16" },
    {
      label: "Infrastructure",
      items: "Docker, AWS ECS Fargate, Terraform, GitHub Actions CI/CD",
    },
    { label: "Auth", items: "NextAuth.js, Google OAuth 2.0, JWT" },
  ],
};
