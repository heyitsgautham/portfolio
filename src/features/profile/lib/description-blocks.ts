export type DescriptionBlock =
  | { type: "heading"; text: string }
  /** Each bullet is its lines, so a wrapped bullet keeps its line breaks. */
  | { type: "bullets"; items: string[][] };

const HEADING = /^\*\*(.+?)\*\*$/;

/**
 * Parses an experience description into headings and bullet lists.
 *
 * - A line that is only `**text**` becomes a heading.
 * - A line starting with `- ` starts a new bullet.
 * - Any other line continues the previous bullet on a new line.
 *   With no bullet open yet, it is dropped.
 *
 * Blank lines are ignored, and every line is trimmed.
 */
export function parseDescriptionBlocks(
  description: string
): DescriptionBlock[] {
  const blocks: DescriptionBlock[] = [];
  let bullets: string[][] = [];

  const flushBullets = () => {
    if (bullets.length > 0) {
      blocks.push({ type: "bullets", items: bullets });
      bullets = [];
    }
  };

  for (const line of description.split("\n")) {
    const trimmed = line.trim();
    if (trimmed.length === 0) continue;

    const heading = trimmed.match(HEADING);
    if (heading) {
      flushBullets();
      blocks.push({ type: "heading", text: heading[1] });
    } else if (trimmed.startsWith("- ")) {
      bullets.push([trimmed.substring(2).trim()]);
    } else if (bullets.length > 0) {
      bullets[bullets.length - 1].push(trimmed);
    }
  }

  flushBullets();
  return blocks;
}
