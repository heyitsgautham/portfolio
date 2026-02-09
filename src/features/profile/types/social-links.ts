import type { IconType } from "react-icons";

export type SocialLink = {
  /** React icon component or image URL (absolute or path under /public) shown beside the title. */
  icon: IconType | string;
  title: string;
  /** Optional handle/username or subtitle displayed under the title. */
  description?: string;
  /** External profile URL opened when the item is clicked. */
  href: string;
};
