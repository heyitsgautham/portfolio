import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["next-mdx-remote"],
  allowedDevOrigins: ["red.local"], // Replace with your local development device name
  turbopack: {
    root: path.join(__dirname, "."),
  },
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gk.me", // Replace with your assets domain
        port: "",
      },
    ],
    localPatterns: [
      {
        pathname: "/og/simple",
      },
      {
        pathname: "/images/**",
      },
      {
        pathname: "/avatar.webp",
      },
      {
        pathname: "/audio/**",
      },
      {
        pathname: "/favicon.ico",
      },
      {
        pathname: "/apple-touch-icon.png",
      },
    ],
    qualities: [75, 100],
  },
  // async headers() {
  //   return [
  //     {
  //       source: "/(.*)",
  //       headers: [
  //         {
  //           // Prevents MIME type sniffing, reducing the risk of malicious file uploads
  //           key: "X-Content-Type-Options",
  //           value: "nosniff",
  //         },
  //         {
  //           // Protects against clickjacking attacks by preventing your site from being embedded in iframes.
  //           key: "X-Frame-Options",
  //           value: "DENY",
  //         },
  //         {
  //           // Controls how much referrer information is included with requests, balancing security and functionality.
  //           key: "Referrer-Policy",
  //           value: "strict-origin-when-cross-origin",
  //         },
  //       ],
  //     },
  //   ];
  // },
};

export default nextConfig;
