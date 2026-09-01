#!/usr/bin/env node
/**
 * Regenerates the site icons from public/assets/avatar.png — the same image the
 * sidebar profile box shows, so the tab icon and the avatar are one mark.
 *
 * Writes src/app/favicon.ico (16/32/48), icon.png (256) and apple-icon.png
 * (192). Next's ico decoder requires RGBA, so the embedded PNGs keep an alpha
 * channel and skip the palette.
 *
 * Small sizes are downscaled with a smoothing kernel rather than nearest: this
 * is a picture, not pixel art, and nearest at 16px drops whole features.
 *
 * Usage: node scripts/generate-icons.mjs   (needs sharp)
 */

import { writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

let sharp;
try {
  sharp = (await import('sharp')).default;
} catch {
  console.error('This script needs sharp: npm i -D sharp');
  process.exit(1);
}

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'public', 'assets', 'avatar.png');
const APP = path.join(ROOT, 'src', 'app') + path.sep;

const png = (size) =>
  sharp(SRC)
    .resize(size, size, { fit: 'cover' })
    .ensureAlpha()
    .png({ compressionLevel: 9, palette: false })
    .toBuffer();

await writeFile(APP + 'icon.png', await png(256));
await writeFile(APP + 'apple-icon.png', await png(192));

const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map(png));

const header = Buffer.alloc(6);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const entries = sizes.map((size, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(size, 0);
  e.writeUInt8(size, 1);
  e.writeUInt16LE(1, 4);
  e.writeUInt16LE(32, 6);
  e.writeUInt32LE(images[i].length, 8);
  e.writeUInt32LE(offset, 12);
  offset += images[i].length;
  return e;
});
await writeFile(APP + 'favicon.ico', Buffer.concat([header, ...entries, ...images]));
console.log('icons written from', path.relative(ROOT, SRC));
