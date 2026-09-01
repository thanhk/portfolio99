#!/usr/bin/env node
/**
 * Regenerates public/og.png — the link-preview card.
 *
 * It is a screenshot of the live home page, which is also what neocities.org
 * itself uses for its own preview. Composing a separate card was the first
 * attempt; it drifted from the site immediately and looked like a poster for
 * the site rather than the site.
 *
 * The capture is 950px wide — just above the 900px sidebar breakpoint, so the
 * desktop layout holds — and is scaled up to the 1200x630 card, which leaves
 * the type large enough to survive a chat client's thumbnail.
 *
 * Usage:
 *   npm run build && npx next start -p 3000     # in one shell
 *   npx playwright install chromium             # once
 *   node scripts/generate-og.mjs [http://localhost:3000]
 */

import path from 'path';
import { fileURLToPath } from 'url';

const ORIGIN = process.argv[2] || 'http://localhost:3000';
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'public', 'og.png');

let chromium, sharp;
try {
  ({ chromium } = await import('playwright'));
  sharp = (await import('sharp')).default;
} catch {
  console.error('This script needs playwright and sharp:');
  console.error('  npm i -D playwright sharp && npx playwright install chromium');
  process.exit(1);
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 950, height: 499 }, deviceScaleFactor: 3 });
await page.goto(ORIGIN, { waitUntil: 'networkidle' });
await page.evaluate(() => {
  // Freeze anything that moves, so the card is the same every regeneration.
  document.querySelectorAll('.ticker-track, .glow, .blink').forEach((el) => {
    el.style.animation = 'none';
  });
  const sprites = document.querySelector('[class*="background"]');
  if (sprites) sprites.style.display = 'none';
});
await page.waitForTimeout(300);
const shot = await page.screenshot();
await browser.close();

await sharp(shot).resize(1200, 630).png({ compressionLevel: 9 }).toFile(OUT);
console.log(`✓ wrote ${OUT}`);
