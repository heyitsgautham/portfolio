import type { Project } from "../../types/projects";

// Project 12: Multi-Label Emotion Classification
export const emotionClassification: Project = {
  id: "emotion-classification",
  slug: "emotion-classification",
  image: "/images/projects/emotion-classification.webp",
  title: "Emotion Classification",
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
  summary: "Multi-label classifier with transformer ensembles",
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
  intro:
    "An end-to-end multi-label emotion classification system that predicts five emotions (Anger, Fear, Joy, Sadness, Surprise) from short English text using ensemble transformer models with knowledge distillation for efficient deployment. Built as an IIT Madras course project with a production-ready model deployed to Hugging Face Hub.",
  uniqueFeatures: [
    "10-model transformer ensemble (2 architectures \u00d7 5 folds) with weighted logits averaging",
    "Knowledge distillation pipeline compressing large ensemble into deployable DeBERTa-v3-base student model",
    "Hybrid CNN + BiGRU + Self-Attention architecture combining local n-gram patterns with long-range sequence context",
    "Full experiment tracking with Weights & Biases integration",
    "Production-ready model deployed to Hugging Face Hub",
    "Progression from rule-based baseline \u2192 classical ML \u2192 neural networks \u2192 transformers \u2192 knowledge distillation",
  ],
  techStackDetail: [
    { label: "Language", items: "Python" },
    {
      label: "ML/DL",
      items: "PyTorch, Hugging Face Transformers, scikit-learn",
    },
    {
      label: "Models",
      items: "DeBERTa-v3-large, RoBERTa-large, CNN + BiGRU + Self-Attention",
    },
    {
      label: "Tools",
      items:
        "Weights & Biases, Hugging Face Hub, GPU with mixed precision (AMP)",
    },
  ],
};
