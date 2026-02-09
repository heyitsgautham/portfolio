import {
  Geist as FontSans,
  JetBrains_Mono as FontMono,
  VT323 as FontVT323,
} from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const fontVT323 = FontVT323({
  weight: ["400"],
  display: "swap",
  subsets: ["latin"],
  variable: "--font-vt323",
});
