#!/usr/bin/env node
/**
 * Regenerates public/og.png — the link-preview card.
 *
 * The card is composed from the site's own stylesheet: the script loads a
 * running copy of the site (so VT323 and the palette are exactly the live
 * ones), swaps the body for the card markup, and screenshots it at 1200x630.
 * Rerun it whenever the masthead, palette or type changes.
 *
 * Usage:
 *   npm run build && npx next start -p 3000     # in one shell
 *   npx playwright install chromium             # once
 *   node scripts/generate-og.mjs [http://localhost:3000]
 */

import { writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const ORIGIN = process.argv[2] || 'http://localhost:3000';
const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public', 'og.png');

let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  console.error('This script needs Playwright: npx playwright install chromium');
  process.exit(1);
}

const CARD = `
  <div class="screen" style="max-width:none;margin:0;border:0;box-shadow:none;height:630px;display:flex;flex-direction:column">
    <header class="masthead" style="padding:44px 20px 34px">
      <span class="wordmark" style="font-size:104px;letter-spacing:10px">thanhk.com</span>
      <div class="sub" style="font-size:26px;margin-top:10px">the personal site of steven khuu</div>
    </header>
    <div class="ticker"><div class="ticker-track" style="animation:none;font-size:26px;padding:10px 0">
      <span>&#9733; software engineer &#9733;</span><span>projects</span><span>blog</span><span>links</span><span>&#9733; welcome to my corner of the internet &#9733;</span>
    </div></div>
    <div style="flex:1;display:flex;gap:22px;padding:30px 34px;align-items:stretch">
      <div class="retro-card" style="flex:1;margin:0">
        <div class="panel-head" style="font-size:24px">latest projects</div>
        <div style="font-size:30px;line-height:1.5">
          <div style="color:var(--magenta)">raphael</div>
          <div style="color:var(--magenta)">turnip bakes</div>
          <div style="color:var(--magenta)">mise</div>
        </div>
      </div>
      <div class="retro-card" style="flex:1;margin:0">
        <div class="panel-head" style="font-size:24px">about</div>
        <div style="font-size:28px;line-height:1.5">
          i work in tech full-time, and build things for people outside of that.
        </div>
      </div>
    </div>
  </div>`;

const browser = await chromium.launch();
// Rendered at 2x and handed back at 1200x630, so the pixel type stays crisp.
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 });
await page.goto(ORIGIN, { waitUntil: 'networkidle' });
await page.evaluate((html) => { document.body.innerHTML = html; }, CARD);
await page.waitForTimeout(400);
const shot = await page.screenshot({ scale: 'css' });
await browser.close();
await writeFile(OUT, shot);
console.log(`✓ wrote ${OUT}`);
