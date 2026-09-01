#!/usr/bin/env node
/**
 * Regenerates the site icons: src/app/favicon.ico (16/32/48), icon.png (256)
 * and apple-icon.png (192).
 *
 * The mark is the sidebar's SK avatar, drawn here on a 16x16 grid rather than
 * rendered in VT323 and downscaled — at tab size a resampled pixel font lands
 * its strokes between pixels, and "SK" comes out as noise. Every size is an
 * integer multiple of the same grid, so all of them stay crisp.
 *
 * Colours track --cyan and --panel-alt in globals.css; update them together.
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

const APP = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'app') + path.sep;

// Drawn on a 16x16 grid rather than resampled onto one: downscaling a 256px
// render of a pixel font lands glyph strokes between pixels and turns "SK"
// into mush at tab size.
//
// 5x8 glyphs with a 2px gap are 12x8, which divides the 14x14 interior evenly:
// 1px either side, 3px above and below. A 5x7 pair leaves an odd remainder and
// sits visibly off-centre at this size.
// A flat top bar over a left stem reads as a 5; the corners have to turn in.
const S = ['01110', '10001', '10000', '01110', '00001', '00001', '10001', '01110'];
const K = ['10001', '10010', '10100', '11000', '11000', '10100', '10010', '10001'];

const INK = [0x1f, 0x6f, 0x6b, 255];   // --cyan, the avatar's border and face
const GROUND = [0xef, 0xe2, 0xca, 255]; // --panel-alt

/** Renders the icon at 16*scale, every edge landing on a whole pixel. */
function draw(scale) {
  const size = 16 * scale;
  const buf = Buffer.alloc(size * size * 4);
  const put = (x, y, [r, g, b, a]) => {
    const i = (y * size + x) * 4;
    buf[i] = r; buf[i + 1] = g; buf[i + 2] = b; buf[i + 3] = a;
  };
  const block = (gx, gy, color) => {
    for (let y = 0; y < scale; y++) for (let x = 0; x < scale; x++) put(gx * scale + x, gy * scale + y, color);
  };

  for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 16; x++) {
      const edge = x === 0 || y === 0 || x === 15 || y === 15;
      block(x, y, edge ? INK : GROUND);
    }
  }
  // S at x=2, K at x=9 (5 + 2 gap), both starting on row 4.
  [[S, 2], [K, 9]].forEach(([glyph, ox]) => {
    glyph.forEach((row, ry) => {
      [...row].forEach((on, rx) => {
        if (on === '1') block(ox + rx, 4 + ry, INK);
      });
    });
  });
  return { buf, size };
}

const png = async (scale) => {
  const { buf, size } = draw(scale);
  return sharp(buf, { raw: { width: size, height: size, channels: 4 } })
    .png({ compressionLevel: 9, palette: false })
    .toBuffer();
};

await writeFile(APP + 'icon.png', await png(16));        // 256
await writeFile(APP + 'apple-icon.png', await png(12));  // 192
const sizes = [16, 32, 48];
const images = await Promise.all([1, 2, 3].map(png));

const header = Buffer.alloc(6);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const entries = sizes.map((size, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(size, 0); e.writeUInt8(size, 1);
  e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6);
  e.writeUInt32LE(images[i].length, 8); e.writeUInt32LE(offset, 12);
  offset += images[i].length;
  return e;
});
await writeFile(APP + 'favicon.ico', Buffer.concat([header, ...entries, ...images]));
console.log('drawn: favicon.ico 16/32/48, icon.png 256, apple-icon.png 192');
