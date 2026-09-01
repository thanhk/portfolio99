#!/usr/bin/env node
/**
 * Fetches bookmarklet source code from external repositories at build time.
 * This allows bookmarklets to be maintained in their own repos while still
 * being used in the portfolio.
 *
 * Usage: node scripts/fetch-bookmarklets.mjs
 *
 * Configuration:
 * - Set BOOKMARKLET_VERSION env var to override the default version
 * - Or update the version in BOOKMARKLETS array below
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configure your bookmarklets here
// Use GitHub tags for versioning (e.g., 'v1.2.0') or 'main' for latest
const BOOKMARKLETS = [
  {
    name: 'igFollowChecker',
    repo: 'thanhk/ig-follow-checker',
    branch: process.env.BOOKMARKLET_VERSION || 'v1.2.0', // Pin to stable version
    file: 'src/bookmarklet.js',
    // Fallback to local file if fetch fails (for offline dev)
    fallbackPath: '../src/lib/bookmarklets.ts',
  },
];

/**
 * Fetch content from a GitHub raw URL
 */
function fetchFromGitHub(repo, branch, file) {
  const url = `https://raw.githubusercontent.com/${repo}/${branch}/${file}`;

  return new Promise((resolve, reject) => {
    console.log(`  Fetching: ${url}`);

    https.get(url, (res) => {
      if (res.statusCode === 404) {
        reject(new Error(`File not found: ${url}`));
        return;
      }

      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}: ${url}`));
        return;
      }

      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

/**
 * Extract source code from the fallback bookmarklets.ts file
 */
function extractFromFallback(fallbackPath) {
  const absolutePath = path.resolve(__dirname, fallbackPath);

  if (!fs.existsSync(absolutePath)) {
    return null;
  }

  const content = fs.readFileSync(absolutePath, 'utf-8');

  // Extract the source between String.raw` and the closing `;
  const match = content.match(/export const \w+Source = String\.raw`([\s\S]*?)`;/);

  if (match) {
    return match[1];
  }

  return null;
}

/**
 * Fetch a single bookmarklet with fallback support
 */
async function fetchBookmarklet(config) {
  try {
    const code = await fetchFromGitHub(config.repo, config.branch, config.file);
    console.log(`  ✓ Fetched ${config.name} from GitHub (${config.branch})`);
    return { name: config.name, code, source: 'github', version: config.branch };
  } catch (error) {
    console.log(`  ⚠ Failed to fetch ${config.name} from GitHub: ${error.message}`);

    // Try fallback
    if (config.fallbackPath) {
      const fallbackCode = extractFromFallback(config.fallbackPath);

      if (fallbackCode) {
        console.log(`  ✓ Using local fallback for ${config.name}`);
        return { name: config.name, code: fallbackCode, source: 'fallback', version: 'local' };
      }
    }

    throw new Error(`Could not fetch ${config.name} from any source`);
  }
}

/**
 * Generate the TypeScript file with all bookmarklet sources
 */
function generateTypeScript(results) {
  const timestamp = new Date().toISOString();

  const exports = results.map(r => {
    // Clean up the code - remove any existing javascript: prefix
    let cleanCode = r.code.trim();
    if (!cleanCode.startsWith('javascript:')) {
      cleanCode = `javascript:${cleanCode}`;
    }

    return `// Source: ${r.source} (${r.version})
export const ${r.name}Source = String.raw\`
${cleanCode}
\`;`;
  }).join('\n\n');

  return `// ============================================================
// AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
// ============================================================
// Generated at: ${timestamp}
// Run 'npm run fetch-bookmarklets' to regenerate
// ============================================================

${exports}

/**
 * Minifies bookmarklet source code for use in a bookmark URL
 */
export function makeBookmarklet(code: string): string {
  // Remove /* ... */ block comments
  let s = code.replace(/\\/\\*[\\s\\S]*?\\*\\//g, "");

  // Remove // line comments (only when they're actual comments)
  s = s.replace(/(^|\\s)\\/\\/.*$/gm, "$1");

  // Collapse whitespace
  s = s.replace(/\\s+/g, " ").trim();

  // Strip every javascript: prefix the source already carries. Comments are
  // gone by now, so a prefix hiding behind one is exposed — and it matters:
  // "javascript: javascript: ..." is a duplicate label, which is a SyntaxError,
  // so the bookmarklet would not run at all.
  while (/^javascript:/i.test(s)) {
    s = s.slice("javascript:".length).trim();
  }

  return \`javascript:\${s}\`;
}
`;
}

async function main() {
  console.log('\\n📦 Fetching bookmarklets...\\n');

  const results = [];

  for (const config of BOOKMARKLETS) {
    try {
      const result = await fetchBookmarklet(config);
      results.push(result);
    } catch (error) {
      console.error(`  ✗ ${config.name}: ${error.message}`);
      process.exit(1);
    }
  }

  const outputPath = path.resolve(__dirname, '../src/lib/bookmarklets.generated.ts');
  const code = generateTypeScript(results);

  fs.writeFileSync(outputPath, code);

  console.log(`\\n✅ Generated: src/lib/bookmarklets.generated.ts`);
  console.log(`   ${results.length} bookmarklet(s) processed\\n`);
}

main().catch((error) => {
  console.error('\\n❌ Error:', error.message);
  process.exit(1);
});
