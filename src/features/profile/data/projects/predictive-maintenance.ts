import type { Project } from "../../types/projects";

// Project 13: Predictive Maintenance
export const predictiveMaintenance: Project = {
  id: "predictive-maintenance",
  slug: "predictive-maintenance",
  image: "/images/projects/predictive-maintenance.webp",
  title: "Predictive Maintenance",
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
  summary: "Distributed ML pipeline for equipment failure prediction",
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
  intro:
    "An end-to-end distributed machine learning pipeline using PySpark that predicts equipment failures 7 days in advance, processing 2M+ records across 1,900 machines. It engineered 1,150 rolling statistics features and used stratified down-sampling to handle extreme class imbalance for proactive maintenance scheduling.",
  uniqueFeatures: [
    "Engineered 1,150 rolling statistics features (5 windows \u00d7 46 features \u00d7 5 statistics) for time-series analysis",
    "Implemented over-labeling technique for 7-day advance failure prediction window",
    "Random Forest classifier (100 trees) with Grid search and 3-fold cross-validation",
    "PCA dimensionality reduction (172 \u2192 50 components)",
    "Stratified down-sampling to handle extreme class imbalance (98.5% vs 1.5%)",
    "Processed 1.3 GB / 2M+ records across 1,900 machines over 4 years of data",
  ],
  techStackDetail: [
    { label: "Language", items: "Python" },
    { label: "Big Data", items: "PySpark 2.0.2, Spark MLlib" },
    { label: "ML", items: "Random Forest, PCA, scikit-learn" },
    {
      label: "Infrastructure",
      items: "32-core Linux DSVM (448 GB RAM), Azure Blob Storage, Parquet",
    },
  ],
};
