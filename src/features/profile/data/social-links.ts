import {
  RiGithubLine,
  RiLinkedinBoxLine,
  RiMailLine,
} from "react-icons/ri";

import type { SocialLink } from "../types/social-links";

export const SOCIAL_LINKS: SocialLink[] = [
  {
    icon: RiLinkedinBoxLine,
    title: "LinkedIn",
    description: "heyitsgautham",
    href: "https://www.linkedin.com/in/heyitsgautham",
  },
  {
    icon: RiGithubLine,
    title: "GitHub",
    description: "heyitsgautham",
    href: "https://github.com/heyitsgautham",
  },
  {
    icon: RiMailLine,
    title: "Email",
    description: "heyitsgautham@gmail.com",
    href: "mailto:heyitsgautham@gmail.com",
  },
];
