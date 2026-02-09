import type { User } from "@/features/profile/types/user";

export const USER: User = {
  firstName: "Gautham Krishna",
  lastName: "S",
  displayName: "Gautham Krishna S",
  username: "heyitsgautham",
  gender: "male",
  pronouns: "he/him",
  bio: "AI Engineer | SIH '25 Finalist | Dual Degree @ IIT Madras & SEC | PyTorch, GenAI, LLM | Ex-Presidio",
  flipSentences: [
    "Incoming AI Engineer",
    "SIH '25 Finalist",
    "Building Scalable Systems",
    "GenAI & RAG Developer",
  ],
  address: "Chennai, Tamil Nadu, India",
  phoneNumber: "", // Add base64 encoded phone if needed
  email: "aGV5aXRzZ2F1dGhhbUBnbWFpbC5jb20=", // base64 encoded heyitsgautham@gmail.com
  website: "https://heyitsgautham.dev",
  jobTitle: "AI Engineer",
  jobs: [
    {
      title: "Software Engineer Intern",
      company: "Presidio",
      website: "https://presidio.com",
    },
  ],
  about: `
I don't just study AI; I build with it.

Currently, I am tackling a rigorous dual-degree curriculum—pursuing a BS in Data Science at IIT Madras alongside a B.Tech in AI/ML—which has trained me to master complex concepts while managing tight deadlines.

But I'm not just an academic. I'm obsessed with shipping code.

Most recently, as a Software Engineer Intern at Presidio, I moved beyond theory to engineer production-grade systems. I architected a multi-domain RAG system for healthcare, built a microservices-based LMS deployed on AWS ECS, and optimized a resume parser using Google Gemini that cut screening time by 98%.

My engineering philosophy is simple: **Models are cool, but scalable systems change the world.**
  `,
  avatar: "/images/avatar.webp", // Replace with your actual avatar image (400x400px recommended)
  ogImage: "/images/og-image.png", // Replace with your actual OG image (1200x630px)
  namePronunciationUrl: "", // Optional: Add if you create one
  keywords: [
    "heyitsgautham",
    "Gautham Krishna S",
    "Gautham Krishna",
    "AI Engineer",
    "SIH Finalist",
    "IIT Madras",
    "Presidio",
    "GenAI Developer",
    "RAG Developer",
    "LLM Engineer",
    "PyTorch",
    "Chennai AI developer",
  ],
  dateCreated: "2025-12-26", // Date when you started building this portfolio
};
