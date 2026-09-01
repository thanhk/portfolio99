import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getMarkdownContent, getMarkdownFiles, parseLocalDate } from '@/lib/markdown';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getMarkdownContent('blog', slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const title = (typeof post.data.title === 'string' ? post.data.title : null) || slug.replace(/-/g, ' ');
  const description = (typeof post.data.description === 'string' ? post.data.description : null) || `Blog post by Steven Khuu (thanhk): ${title}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

/** Approximate word count from the rendered HTML — good enough for a stamp. */
function countWords(html: string): number {
  const text = html.replace(/<[^>]*>/g, ' ').replace(/&[a-z]+;/gi, ' ');
  return text.split(/\s+/).filter(Boolean).length;
}

/**
 * Posts open with `# Title`, which the page already shows from frontmatter.
 * Drop that first heading so the title isn't printed twice.
 */
function stripLeadingHeading(html: string): string {
  return html.replace(/^\s*<h1[^>]*>[\s\S]*?<\/h1>/, '');
}

export default async function BlogPost({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getMarkdownContent('blog', slug);

  if (!post) {
    notFound();
  }

  const title = (typeof post.data.title === 'string' ? post.data.title : null) || slug.replace(/-/g, ' ');
  const date = typeof post.data.date === 'string' ? post.data.date : null;
  const body = stripLeadingHeading(post.content);
  const words = countWords(body);

  // Neighbours for the prev/next footer, newest first.
  const all = await getMarkdownFiles('blog');
  const ordered = all.sort((a, b) => {
    const dateA = typeof a.data.date === 'string' ? a.data.date : '';
    const dateB = typeof b.data.date === 'string' ? b.data.date : '';
    return dateB.localeCompare(dateA);
  });
  const index = ordered.findIndex((entry) => entry.slug === slug);
  const newer = index > 0 ? ordered[index - 1] : null;
  const older = index >= 0 && index < ordered.length - 1 ? ordered[index + 1] : null;
  const titleOf = (entry: typeof ordered[number]) =>
    (typeof entry.data.title === 'string' ? entry.data.title : null) || entry.slug.replace(/-/g, ' ');

  const stamp = date
    ? parseLocalDate(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).toLowerCase()
    : null;

  return (
    <div>
      <p className="breadcrumb">
        you are here:{' '}
        <Link href="/">home</Link>
        <span className="sep">&gt;</span>
        <Link href="/blog">blog</Link>
        <span className="sep">&gt;</span>
        {title}
      </p>

      <article className="retro-card">
        <div className="panel-head">
          entry
          <span className="right">{slug}.md</span>
        </div>

        <header className="post-header">
          <h1 className="post-title">{title}</h1>
          <p className="post-meta">
            {stamp && <>posted {stamp}</>}
            {stamp && <span className="sep">·</span>}
            {words} words
          </p>
        </header>

        <div className="post-body" dangerouslySetInnerHTML={{ __html: body }} />

        <footer className="post-footer">
          <p className="post-end">— end of entry —</p>
          <div className="post-nav">
            {older ? (
              <Link href={`/blog/${older.slug}`} className="post-nav-link">
                &laquo; {titleOf(older)}
              </Link>
            ) : (
              <span className="post-nav-empty">&laquo; oldest post</span>
            )}
            <Link href="/blog" className="post-nav-index">all posts</Link>
            {newer ? (
              <Link href={`/blog/${newer.slug}`} className="post-nav-link right">
                {titleOf(newer)} &raquo;
              </Link>
            ) : (
              <span className="post-nav-empty right">newest post &raquo;</span>
            )}
          </div>
        </footer>
      </article>
    </div>
  );
}
