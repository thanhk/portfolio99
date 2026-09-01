import { readFile } from 'fs/promises';
import { join } from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

export interface MarkdownContent {
  content: string;
  data: Record<string, unknown>;
}

/**
 * Parse a date string as a local date (avoiding timezone issues)
 * @param dateString - Date string in YYYY-MM-DD format
 * @returns Date object set to local midnight
 */
export function parseLocalDate(dateString: string): Date {
  const [year, month, day] = dateString.split('-').map(Number);
  // month is 0-indexed in Date constructor
  return new Date(year, month - 1, day);
}

/**
 * Read and parse a Markdown file with frontmatter
 * @param folder - The folder name (e.g., 'blog' or 'projects')
 * @param slug - The file slug (without .md extension)
 * @returns Parsed content with frontmatter data and HTML content, or null if not found
 */
export async function getMarkdownContent(
  folder: string,
  slug: string
): Promise<MarkdownContent | null> {
  try {
    const filePath = join(process.cwd(), 'public', folder, `${slug}.md`);
    const fileContents = await readFile(filePath, 'utf-8');
    const { data, content } = matter(fileContents);

    // Configure marked to open links in new tabs
    const renderer = new marked.Renderer();
    renderer.link = ({ href, title, tokens }) => {
      const text = tokens ? tokens.map(token => token.raw || '').join('') : '';
      const titleAttr = title ? ` title="${title}"` : '';
      return `<a href="${href}" target="_blank" rel="noopener noreferrer"${titleAttr}>${text}</a>`;
    };

    // Wrap tables so wide ones scroll inside the card instead of the page
    const baseTable = renderer.table.bind(renderer);
    renderer.table = (token) => `<div class="table-scroll">${baseTable(token)}</div>`;

    // Convert Markdown to HTML
    const htmlResult = marked.parse(content, { renderer });
    const html = typeof htmlResult === 'string' ? htmlResult : await htmlResult;

    return {
      content: html,
      data,
    };
  } catch {
    return null;
  }
}

/**
 * Get all Markdown files from a folder
 * @param folder - The folder name (e.g., 'blog' or 'projects')
 * @returns Array of slugs and their frontmatter data
 */
export async function getMarkdownFiles(folder: string) {
  try {
    const { readdir } = await import('fs/promises');
    const dirPath = join(process.cwd(), 'public', folder);
    const files = await readdir(dirPath);

    const markdownFiles = files
      .filter(file => file.endsWith('.md'))
      .map(file => file.replace('.md', ''));

    // Read frontmatter for each file to get metadata
    const filesWithData = await Promise.all(
      markdownFiles.map(async (slug) => {
        const content = await getMarkdownContent(folder, slug);
        return {
          slug,
          data: content?.data || {},
        };
      })
    );

    return filesWithData;
  } catch {
    return [];
  }
}

