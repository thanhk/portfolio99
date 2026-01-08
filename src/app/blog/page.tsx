import { Metadata } from 'next';
import Link from 'next/link';
import { getMarkdownFiles, parseLocalDate } from '@/lib/markdown';

export const metadata: Metadata = {
  title: "Blog",
  description: "Blog posts by Steven Khuu (thanhk) - Software Engineer, covering technology, development, and more.",
  keywords: ["Steven Khuu blog", "thanhk blog", "software engineering blog", "Steven Khuu articles"],
};

export default async function Blog() {
  const posts = await getMarkdownFiles('blog');

  // Sort by date if available, otherwise by title
  const sortedPosts = posts.sort((a, b) => {
    const dateA = typeof a.data.date === 'string' ? a.data.date : null;
    const dateB = typeof b.data.date === 'string' ? b.data.date : null;

    if (dateA && dateB) {
      return parseLocalDate(dateB).getTime() - parseLocalDate(dateA).getTime();
    }

    const titleA = (typeof a.data.title === 'string' ? a.data.title : null) || a.slug;
    const titleB = (typeof b.data.title === 'string' ? b.data.title : null) || b.slug;
    return titleA.localeCompare(titleB);
  });

  return (
    <div>
      <h1 className="glow" style={{ fontSize: '48px', marginBottom: '30px', textAlign: 'center' }}>
        Blog
      </h1>

      {sortedPosts.length === 0 ? (
        <div className="retro-card" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '24px', marginBottom: '15px' }}>
            No blog posts yet.
          </p>
          <p style={{ fontSize: '20px', color: '#000080' }}>
            Add Markdown files to the <code style={{ background: '#DDA0DD', padding: '2px 6px' }}>public/blog/</code> folder to create posts.
          </p>
          <p style={{ fontSize: '18px', marginTop: '15px', color: '#000080', fontStyle: 'italic' }}>
            Filename format: <code style={{ background: '#DDA0DD', padding: '2px 6px' }}>YYYY-MM-DD-title.md</code> or just <code style={{ background: '#DDA0DD', padding: '2px 6px' }}>title.md</code>
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {sortedPosts.map((post) => {
            const title = (typeof post.data.title === 'string' ? post.data.title : null) || post.slug.replace(/-/g, ' ');
            const date = typeof post.data.date === 'string' ? post.data.date : null;
            const description = typeof post.data.description === 'string' ? post.data.description : null;

            return (
              <div key={post.slug} className="retro-card">
                <h2 style={{ fontSize: '32px', marginBottom: '10px', color: '#8B008B' }}>
                  <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {title}
                  </Link>
                </h2>
                {date && (
                  <p style={{ fontSize: '20px', color: '#000080', marginBottom: '10px' }}>
                    📅 {parseLocalDate(date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                )}
                {description && (
                  <p style={{ fontSize: '20px', color: '#000080', marginBottom: '10px' }}>
                    {description}
                  </p>
                )}
                <Link
                  href={`/blog/${post.slug}`}
                  className="retro-button"
                  style={{ display: 'inline-block', marginTop: '10px' }}
                >
                  Read More →
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
