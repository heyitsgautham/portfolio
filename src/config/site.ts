import { USER } from "@/features/profile/data/user";
import type { NavItem } from "@/types/nav";

export const SITE_INFO = {
  name: USER.displayName,
  url: process.env.APP_URL || "https://gauthamkrishna.dev",
  ogImage: USER.ogImage,
  description: USER.bio,
  keywords: USER.keywords,
};

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
};

export const MAIN_NAV: NavItem[] = [
  {
    title: "About",
    href: "/#about",
  },
  {
    title: "Skills",
    href: "/tech-stack",
  },
  {
    title: "Projects",
    href: "/projects",
  },
  {
    title: "Contact",
    href: "/#overview",
  },
];

export const COMPACT_NAV: NavItem[] = [
  {
    title: "About",
    href: "/#about",
  },
  {
    title: "Contact",
    href: "/#overview",
  },
];

export const GITHUB_USERNAME = "heyitsgautham";
export const SOURCE_CODE_GITHUB_REPO = "heyitsgautham/portfolio";
export const SOURCE_CODE_GITHUB_URL = "https://github.com/heyitsgautham/portfolio";

export const UTM_PARAMS = {
  utm_source: "gauthamkrishna.dev",
  utm_medium: "portfolio_website",
  utm_campaign: "referral",
};
