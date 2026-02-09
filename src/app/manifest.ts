import type { MetadataRoute } from "next";

import { SITE_INFO } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    short_name: SITE_INFO.name,
    name: SITE_INFO.name,
    description: SITE_INFO.description,
    icons: [
      {
        src: "/images/icons/icon-vector.svg", // Replace with your vector icon
        type: "image/svg+xml",
        sizes: "any",
        purpose: "any",
      },
      {
        src: "/images/icons/icon-192x192.png", // Replace with your 192x192 PNG icon
        type: "image/png",
        sizes: "192x192",
        purpose: "any",
      },
      {
        src: "/images/icons/icon-512x512.png", // Replace with your 512x512 PNG icon
        type: "image/png",
        sizes: "512x512",
        purpose: "any",
      },
      {
        src: "/images/icons/maskable-icon.png", // Replace with your maskable icon (512x512 with safe area)
        type: "image/png",
        sizes: "512x512",
        purpose: "maskable",
      },
    ],
    id: "/?utm_source=pwa",
    start_url: "/?utm_source=pwa",
    display: "standalone",
    scope: "/",
    screenshots: [
      {
        src: "/images/screenshots/mobile-dark.webp", // Replace with your mobile dark theme screenshot (440x956)
        type: "image/webp",
        sizes: "440x956",
        form_factor: "narrow",
      },
      {
        src: "/images/screenshots/mobile-light.webp", // Replace with your mobile light theme screenshot (440x956)
        type: "image/webp",
        sizes: "440x956",
        form_factor: "narrow",
      },
      {
        src: "/images/screenshots/desktop-dark.webp", // Replace with your desktop dark theme screenshot (1920x1080)
        type: "image/webp",
        sizes: "1920x1080",
        form_factor: "wide",
      },
      {
        src: "/images/screenshots/desktop-light.webp", // Replace with your desktop light theme screenshot (1920x1080)
        type: "image/webp",
        sizes: "1920x1080",
        form_factor: "wide",
      },
    ],
  };
}
