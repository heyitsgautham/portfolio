#!/usr/bin/env node

/**
 * apply-project-colors — Extract dominant colours from project images and
 * write light-mode + dark-mode variants directly into the projects data file.
 *
 * Usage:
 *   node scripts/apply-project-colors.mjs all   — re-extract EVERY project image and update all accent values
 *   node scripts/apply-project-colors.mjs new   — only process projects that have an image but no accentColor yet
 *
 * For each image, it:
 *  1. Extracts the dominant vibrant colour via k-means clustering
 *  2. Derives a **dark** variant   → accentColor     (readable on light backgrounds)
 *  3. Derives a **bright** variant → accentColorDark  (readable on dark backgrounds)
 */

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

// ── paths ──────────────────────────────────────────────────────────────────
const ROOT = process.cwd();
const DATA_FILE = path.join(
  ROOT,
  "src/features/profile/data/projects.ts"
);

// ── CLI arg parsing ────────────────────────────────────────────────────────
const mode = process.argv[2]?.toLowerCase();

if (!mode || !["all", "new"].includes(mode)) {
  console.error("Usage:  node scripts/apply-project-colors.mjs <all|new>");
  console.error("  all  — recalculate every project image colour");
  console.error("  new  — only calculate colours for newly added images");
  process.exit(1);
}

// ── colour helpers ─────────────────────────────────────────────────────────

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToRgb(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function rgbToHex(r, g, b) {
  return (
    "#" +
    [r, g, b]
      .map((c) => Math.round(c).toString(16).padStart(2, "0"))
      .join("")
  );
}

/**
 * Derive a light-mode (dark) and dark-mode (bright) variant from a base colour.
 *
 * Light mode — clamp lightness to 30-42 %, boost saturation slightly
 * Dark mode  — clamp lightness to 62-78 %, ensure saturation stays vibrant
 */
function deriveThemeColors(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const { h, s, l } = rgbToHsl(r, g, b);

  // Light-mode: darker shade — needs to be readable on white/light grey
  const lightL = Math.min(Math.max(l, 30), 42);
  const lightS = Math.min(s + 8, 100);
  const [lr, lg, lb] = hslToRgb(h, lightS, lightL);
  const light = rgbToHex(lr, lg, lb);

  // Dark-mode: brighter shade — needs to be readable on dark backgrounds
  const darkL = Math.min(Math.max(l, 62), 78);
  const darkS = Math.min(Math.max(s, 40), 90);
  const [dr, dg, db] = hslToRgb(h, darkS, darkL);
  const dark = rgbToHex(dr, dg, db);

  return { light, dark };
}

// ── k-means dominant colour extraction ─────────────────────────────────────

function colorDistance(a, b) {
  return Math.sqrt(
    (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2
  );
}

function kMeans(pixels, k = 8, maxIter = 20) {
  const step = Math.max(1, Math.floor(pixels.length / k));
  let centroids = Array.from(
    { length: k },
    (_, i) => [...(pixels[i * step] || pixels[0])]
  );

  for (let iter = 0; iter < maxIter; iter++) {
    const clusters = centroids.map(() => []);
    for (const px of pixels) {
      let minDist = Infinity;
      let best = 0;
      for (let c = 0; c < centroids.length; c++) {
        const d = colorDistance(px, centroids[c]);
        if (d < minDist) {
          minDist = d;
          best = c;
        }
      }
      clusters[best].push(px);
    }
    centroids = clusters.map((cl, i) => {
      if (cl.length === 0) return centroids[i];
      const sum = [0, 0, 0];
      for (const px of cl) {
        sum[0] += px[0];
        sum[1] += px[1];
        sum[2] += px[2];
      }
      return [sum[0] / cl.length, sum[1] / cl.length, sum[2] / cl.length];
    });
  }

  const counts = centroids.map(() => 0);
  for (const px of pixels) {
    let minDist = Infinity;
    let best = 0;
    for (let c = 0; c < centroids.length; c++) {
      const d = colorDistance(px, centroids[c]);
      if (d < minDist) {
        minDist = d;
        best = c;
      }
    }
    counts[best]++;
  }

  return centroids.map((c, i) => ({
    r: Math.round(c[0]),
    g: Math.round(c[1]),
    b: Math.round(c[2]),
    count: counts[i],
  }));
}

function vibrancyScore(r, g, b, count, totalPixels) {
  const { s, l } = rgbToHsl(r, g, b);
  if (l < 10 || l > 90) return -1;
  if (s < 12) return -1;
  const lightnessBonus = 1 - Math.abs(l - 50) / 50;
  const satBonus = s / 100;
  const freq = count / totalPixels;
  const freqBonus = freq > 0.6 ? 0.3 : freq > 0.02 ? 1 : 0.5;
  return satBonus * 2 + lightnessBonus + freqBonus * 0.5;
}

async function getDominantColor(imagePath) {
  const { data } = await sharp(imagePath)
    .resize(64, 64, { fit: "cover" })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = [];
  for (let i = 0; i < data.length; i += 3) {
    pixels.push([data[i], data[i + 1], data[i + 2]]);
  }

  const clusters = kMeans(pixels, 8, 25);
  const totalPixels = pixels.length;
  let bestScore = -Infinity;
  let bestColor = { r: 100, g: 100, b: 100 };

  for (const c of clusters) {
    const score = vibrancyScore(c.r, c.g, c.b, c.count, totalPixels);
    if (score > bestScore) {
      bestScore = score;
      bestColor = c;
    }
  }

  return rgbToHex(bestColor.r, bestColor.g, bestColor.b);
}

// ── source-file parsing & rewriting ────────────────────────────────────────

/**
 * Scan the data file line-by-line and find every project entry that has an
 * `image:` field. Returns an array of objects describing matches.
 *
 * Detects the following patterns after the `image:` line:
 *  - accentColor + accentColorDark  (2 lines)
 *  - accentColor only               (1 line, legacy)
 *  - neither                        (new image)
 */
function findImageEntries(lines) {
  const IMAGE_RE = /^\s*image:\s*"([^"]+)"/;
  const ACCENT_RE = /^\s*accentColor:\s*"([^"]+)"/;
  const ACCENT_DARK_RE = /^\s*accentColorDark:\s*"([^"]+)"/;

  const entries = [];

  for (let i = 0; i < lines.length; i++) {
    const imgMatch = lines[i].match(IMAGE_RE);
    if (!imgMatch) continue;

    const imagePath = imgMatch[1];
    const nextLine = lines[i + 1] ?? "";
    const hasAccent = ACCENT_RE.test(nextLine);
    const existingColor = hasAccent ? nextLine.match(ACCENT_RE)[1] : null;

    const afterAccentLine = lines[i + 2] ?? "";
    const hasAccentDark = hasAccent && ACCENT_DARK_RE.test(afterAccentLine);
    const existingDarkColor = hasAccentDark
      ? afterAccentLine.match(ACCENT_DARK_RE)[1]
      : null;

    entries.push({
      lineIndex: i,
      imagePath,
      hasAccent,
      existingColor,
      hasAccentDark,
      existingDarkColor,
    });
  }

  return entries;
}

async function main() {
  const source = fs.readFileSync(DATA_FILE, "utf-8");
  const lines = source.split("\n");
  const entries = findImageEntries(lines);

  if (entries.length === 0) {
    console.log("No projects with images found in the data file.");
    process.exit(0);
  }

  // Decide which entries to process
  const toProcess =
    mode === "all"
      ? entries
      : entries.filter((e) => !e.hasAccent);

  if (toProcess.length === 0) {
    console.log(
      "No new projects to process. All projects with images already have accent colours."
    );
    process.exit(0);
  }

  console.log(
    `Mode: ${mode} — processing ${toProcess.length} project image(s)…\n`
  );

  // Extract colours
  const results = [];
  for (const entry of toProcess) {
    const absPath = path.join(ROOT, "public", entry.imagePath);
    if (!fs.existsSync(absPath)) {
      console.warn(`  ⚠  Image not found, skipping: ${entry.imagePath}`);
      continue;
    }
    const rawHex = await getDominantColor(absPath);
    const { light, dark } = deriveThemeColors(rawHex);
    results.push({ ...entry, light, dark });

    const slug = entry.imagePath.split("/").pop().replace(/\.\w+$/, "");
    if (entry.hasAccent) {
      console.log(
        `  ${slug.padEnd(24)} light: ${entry.existingColor} → ${light}  |  dark: ${entry.existingDarkColor ?? "(none)"} → ${dark}`
      );
    } else {
      console.log(
        `  ${slug.padEnd(24)} (new)  light: ${light}  |  dark: ${dark}`
      );
    }
  }

  // Apply edits bottom-up so earlier line indices stay valid
  results.sort((a, b) => b.lineIndex - a.lineIndex);

  for (const r of results) {
    const indent = lines[r.lineIndex].match(/^(\s*)/)[1];

    if (r.hasAccent && r.hasAccentDark) {
      // Both lines exist — replace in-place
      lines[r.lineIndex + 1] = `${indent}accentColor: "${r.light}",`;
      lines[r.lineIndex + 2] = `${indent}accentColorDark: "${r.dark}",`;
    } else if (r.hasAccent && !r.hasAccentDark) {
      // Only accentColor exists (legacy) — replace it and insert accentColorDark
      lines[r.lineIndex + 1] = `${indent}accentColor: "${r.light}",`;
      lines.splice(r.lineIndex + 2, 0, `${indent}accentColorDark: "${r.dark}",`);
    } else {
      // Neither exists — insert both after image line
      lines.splice(
        r.lineIndex + 1,
        0,
        `${indent}accentColor: "${r.light}",`,
        `${indent}accentColorDark: "${r.dark}",`
      );
    }
  }

  fs.writeFileSync(DATA_FILE, lines.join("\n"), "utf-8");

  console.log(
    `\n✓ Updated ${results.length} project accent colour(s) in projects.ts`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
