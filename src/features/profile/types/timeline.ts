export type TimelineEvent = {
  id: string;
  title: string;
  /** Short subtitle or tagline. */
  subtitle: string;
  /** Date or date range string (e.g., "Nov 8-9, 2024"). */
  date: string;
  /** Sort key in ISO format for ordering (e.g., "2024-11-08"). */
  sortDate: string;
  /** Short overview/description. Supports Markdown. */
  description: string;
  /** Optional GitHub repository URL. */
  githubURL?: string;
  /** Optional external link (e.g., event page). */
  externalURL?: string;
  /** Array of image paths for the carousel. */
  images?: string[];
};
