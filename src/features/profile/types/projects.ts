export type Project = {
  /** Stable unique identifier (used as list key/anchor). */
  id: string;
  title: string;
  /**
   * Project period for display and sorting.
   * Use "MM.YYYY" format. Omit `end` for ongoing projects.
   */
  period: {
    /** Start date (e.g., "05.2025"). */
    start: string;
    /** End date; leave undefined for "Present". */
    end?: string;
  };
  /** Public URL (site, repository, demo, or video). */
  link: string;
  /** Optional live demo URL. */
  liveLink?: string;
  /** Tags/technologies for chips or filtering. */
  skills: string[];
  /** Short 1-line summary for card display. */
  summary: string;
  /** Optional rich description; Markdown and line breaks supported. */
  description?: string;

  /** Whether the project card is expanded by default in the UI. */
  isExpanded?: boolean;

  /** URL-safe slug for the project detail page (e.g., "skill-sync"). */
  slug: string;
  /** Optional cover image path (relative to /public, e.g. "/images/projects/foo.png"). */
  image?: string;
  /** 2-3 sentence high-level intro paragraph. */
  intro: string;
  /** Bullet-point list of unique/standout features. */
  uniqueFeatures: string[];
  /** Structured tech stack breakdown by category. */
  techStackDetail: { label: string; items: string }[];
  /** Optional accent color (hex format, e.g., "#FF5733"). */
  accentColor?: string;
  /** Optional dark mode accent color (hex format). Defaults to accentColor if not provided. */
  accentColorDark?: string;
};
