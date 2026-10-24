import type { Project } from "../../types/projects";

// Project 15: Traffic Men
export const trafficMen: Project = {
  id: "traffic-men",
  slug: "traffic-men",
  image: "/images/projects/traffic-men.webp",
  title: "Traffic Men - Transit Optimization Platform",
  period: {
    start: "08.2024",
    end: "11.2024",
  },
  link: "https://github.com/heyitsgautham/traffic-men",
  liveLink: "https://heyitsgautham.github.io/traffic-men.github.io",
  skills: [
    "Python",
    "Java",
    "JavaScript",
    "Scikit-learn",
    "NetworkX",
    "Android",
  ],
  summary: "ML-powered public transit optimization platform",
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
  intro:
    "A traffic management platform that uses ML-based demand forecasting and adaptive routing algorithms to optimize public transit scheduling and reduce commuter wait times for MTC Chennai. It was trained on real MTC and OpenCity datasets with a companion Android app for end-user access.",
  uniqueFeatures: [
    "Real-time traffic data integration with commuter density and event information",
    "Predictive analytics using 9 ML models (Random Forest, XGBoost, AdaBoost, Gradient Boosting, Extra Trees) for demand forecasting",
    "Adaptive scheduling and routing with AI-driven vehicle deployment",
    "Graph-based route visualization with multiple NetworkX layouts",
    "Companion Android app for end-user access",
  ],
  techStackDetail: [
    { label: "Languages", items: "Python, Java, JavaScript, MATLAB" },
    {
      label: "ML",
      items:
        "scikit-learn, Random Forest, XGBoost, AdaBoost, Gradient Boosting, Extra Trees",
    },
    { label: "Visualization", items: "NetworkX, Bootstrap" },
    { label: "Mobile", items: "Android SDK, Android Studio" },
    { label: "Infrastructure", items: "Google Cloud Platform" },
  ],
};
