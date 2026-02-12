import type { User } from "@/features/profile/types/user";

export const USER: User = {
  firstName: "Gautham Krishna",
  lastName: "S",
  displayName: "Gautham Krishna S",
  username: "heyitsgautham",
  gender: "male",
  pronouns: "he/him",
  bio: "AI Engineer | SIH '25 Finalist | Dual Degree @ IIT Madras & SEC | LLMs, RAG, Deep Learning | Ex-Presidio",
  flipSentences: [
    "SIH '25 Finalist",
    "Ex-SWE Intern @ Presidio",
    "BS @ IIT Madras",
    "Building with LLMs & RAG",
    "Full-Stack AI Developer",
  ],
  address: "Chennai, Tamil Nadu, India",
  phoneNumber: "", // Add base64 encoded phone if needed
  email: "aGV5aXRzZ2F1dGhhbUBnbWFpbC5jb20=", // base64 encoded heyitsgautham@gmail.com
  website: "https://gauthamkrishna.dev",
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

As an **SIH'25 Finalist** and **Ex-Software Engineer Intern at Presidio**, I've moved beyond theory to engineer production-grade AI systems. I architected multi-domain RAG systems, built AI-powered resume screening platforms that cut screening time by 98%, and deployed microservices on AWS using Terraform.

Currently pursuing a dual degree: **BS in Data Science at IIT Madras** alongside a **B.Tech in AI/ML at SEC**. I balance rigorous academics with hands-on development.

My focus: Building intelligent systems with **LLMs, RAG, and Deep Learning** while shipping full-stack applications with cloud-native deployments. Most academic and experimental work lives in private repositories.
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
