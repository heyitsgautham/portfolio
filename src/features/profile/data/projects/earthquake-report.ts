import type { Project } from "../../types/projects";

// Project 14: Earthquake Report
export const earthquakeReport: Project = {
  id: "earthquake-report",
  slug: "earthquake-report",
  image: "/images/projects/earthquake-analysis.webp",
  title: "Earthquake Analysis",
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
  summary: "ML-based Earthquake monitoring and prediction",
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
  intro:
    "A data analytics platform for earthquake monitoring, historical analysis, and ML-based impact prediction to aid disaster management and response planning. It integrates 3 authoritative data sources (USGS, IRIS GSN, EM-DAT) and provides interactive visualizations including heatmaps and 3D wave propagation simulations.",
  uniqueFeatures: [
    "Real-time earthquake monitoring with live data feeds from USGS",
    "Historical trend analysis for predictive insights on seismic activity",
    "Impact prediction models forecasting potential damage and affected areas",
    "Interactive visualizations: heatmaps, geospatial charts, and 3D wave propagation simulations",
    "Region classification based on seismic vulnerability using clustering",
  ],
  techStackDetail: [
    { label: "Language", items: "Python" },
    { label: "Frontend", items: "Streamlit" },
    {
      label: "ML",
      items: "Scikit-learn, XGBoost, ARIMA, Random Forest, Gradient Boosting",
    },
    { label: "Geospatial", items: "GeoPandas, Folium" },
    { label: "Data Sources", items: "USGS, IRIS GSN, EM-DAT" },
  ],
};
