#!/usr/bin/env node

/**
 * Convert all PNG and JPEG images under public/images/ to WebP.
 * Skips favicon/touch-icon PNGs at the root level.
 * Skips conversion when WebP output is larger than the source.
 *
 * Usage: node scripts/convert-images-to-webp.mjs [--dry-run]
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const IMAGES_DIR = path.join(ROOT, "public", "images");

// Root-level files to skip (favicons / touch icons)
const ROOT_SKIP = new Set(
    [
        "favicon.ico",
        "favicon-16x16.png",
        "favicon-32x32.png",
        "android-chrome-192x192.png",
        "android-chrome-512x512.png",
        "apple-touch-icon.png",
    ].map((f) => path.join(ROOT, "public", f))
);

// Icon directory gets higher quality to preserve crispness
const ICON_DIR = path.join(IMAGES_DIR, "icons");

const DRY_RUN = process.argv.includes("--dry-run");

/** Recursively collect files matching extensions */
function collectFiles(dir, exts) {
    const results = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            results.push(...collectFiles(full, exts));
        } else if (exts.some((ext) => entry.name.toLowerCase().endsWith(ext))) {
            results.push(full);
        }
    }
    return results;
}

async function main() {
    const files = collectFiles(IMAGES_DIR, [".png", ".jpg", ".jpeg"]);

    let converted = 0;
    let skippedLarger = 0;
    let skippedExcluded = 0;
    let totalSavedBytes = 0;

    console.log(`Found ${files.length} PNG/JPEG files under public/images/\n`);

    for (const file of files) {
        // Skip root-level favicons
        if (ROOT_SKIP.has(file)) {
            skippedExcluded++;
            console.log(`  SKIP (favicon) ${path.relative(ROOT, file)}`);
            continue;
        }

        const outPath = file.replace(/\.(png|jpe?g)$/i, ".webp");
        const isIcon = file.startsWith(ICON_DIR);
        const quality = isIcon ? 90 : 80;

        if (DRY_RUN) {
            console.log(`  WOULD CONVERT ${path.relative(ROOT, file)} → .webp (q${quality})`);
            converted++;
            continue;
        }

        try {
            const srcStat = fs.statSync(file);
            const buffer = await sharp(file).webp({ quality }).toBuffer();

            if (buffer.length >= srcStat.size) {
                skippedLarger++;
                console.log(
                    `  SKIP (larger)  ${path.relative(ROOT, file)} — ${srcStat.size}B → ${buffer.length}B`
                );
                continue;
            }

            fs.writeFileSync(outPath, buffer);
            const saved = srcStat.size - buffer.length;
            totalSavedBytes += saved;
            converted++;
            console.log(
                `  OK  ${path.relative(ROOT, file)} — ${srcStat.size}B → ${buffer.length}B (−${((saved / srcStat.size) * 100).toFixed(1)}%)`
            );
        } catch (err) {
            console.error(`  ERR ${path.relative(ROOT, file)}: ${err.message}`);
        }
    }

    console.log("\n--- Summary ---");
    console.log(`Converted:        ${converted}`);
    console.log(`Skipped (larger): ${skippedLarger}`);
    console.log(`Skipped (excl.):  ${skippedExcluded}`);
    console.log(
        `Total saved:      ${(totalSavedBytes / 1024).toFixed(1)} KB (${(totalSavedBytes / 1024 / 1024).toFixed(2)} MB)`
    );
}

main();
