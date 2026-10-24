import type { Project } from "../../types/projects";

// Project 10: SecureWipe (Erase-Sure)
export const secureWipe: Project = {
  id: "securewipe",
  slug: "secure-wipe",
  image: "/images/projects/secure-wipe.webp",
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
  summary: "NIST-compliant secure data sanitization platform",
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
  intro:
    "A NIST SP 800-88 Rev.1 compliant data sanitization platform with cryptographically signed certificates, cross-platform desktop UI, and web-based verification portal for secure e-waste management. Built for SIH 2024, it addresses the challenge of hoarded IT assets in India due to data breach fears.",
  uniqueFeatures: [
    "NIST-compliant sanitization methods: NVMe Sanitize, ATA Secure Erase, HPA/DCO clearing",
    "Tamper-proof certificate system with Ed25519 signatures and QR-based verification",
    "Intelligent encrypted backup with AES-256-CTR and SHA-256 manifest integrity",
    "Cross-platform desktop UI with device discovery, risk classification, and real-time progress",
    "REST API verification portal for programmatic certificate validation",
    "End-to-end audit trail with certificate chaining for compliance documentation",
  ],
  techStackDetail: [
    { label: "Desktop", items: "Tauri 1.6, Rust 1.70+" },
    { label: "Frontend", items: "React 18, TypeScript" },
    { label: "Backend", items: "FastAPI, Python 3.11+" },
    { label: "Crypto", items: "Ed25519 signatures, AES-256-CTR, SHA-256" },
    { label: "Tools", items: "nvme-cli, hdparm, smartmontools, Docker" },
  ],
};
