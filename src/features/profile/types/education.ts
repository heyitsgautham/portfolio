export type Education = {
  id: string;
  degree: string;
  institution: string;
  /**
   * Education period in format "YYYY-MM" to "YYYY-MM" or "YYYY-MM" to "Present"
   * Examples: "2020-09" to "2024-05", "2021-01" to "Present"
   */
  period: string;
  /**
   * Location of the institution (e.g., "New York, NY", "London, UK")
   */
  location?: string;
  /**
   * GPA, honors, or other academic achievements
   */
  achievements?: string;
  /** Optional rich text description; Markdown and line breaks supported. */
  description?: string;
  /** Optional URL to institution, transcript, or reference material. */
  referenceLink?: string;
};
