import { Metadata } from 'next';
import Link from 'next/link';
import { getMarkdownFiles, parseLocalDate } from '@/lib/markdown';

export const metadata: Metadata = {
  title: "Blog",
  description: "Blog posts by Steven Khuu (thanhk) - Software Engineer, covering technology, development, and more.",
  alternates: {
    canonical: "/blog",
  },
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
      <h1 className="glow page-title">
        Blog
      </h1>

      {sortedPosts.length === 0 ? (
        <div className="retro-card" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '24px', marginBottom: '15px' }}>
            nothing here yet. check back!
          </p>
          <p style={{ fontSize: '20px', color: 'var(--ink)' }}>
            Add Markdown files to the <code style={{ background: 'var(--panel-alt)', padding: '2px 6px' }}>public/blog/</code> folder to create posts.
          </p>
          <p style={{ fontSize: '18px', marginTop: '15px', color: 'var(--ink)', fontStyle: 'italic' }}>
            Filename format: <code style={{ background: 'var(--panel-alt)', padding: '2px 6px' }}>YYYY-MM-DD-title.md</code> or just <code style={{ background: 'var(--panel-alt)', padding: '2px 6px' }}>title.md</code>
          </p>
        </div>
      ) : (
        <div className="retro-card">
          <div className="panel-head">
            archive
            <span className="right">{sortedPosts.length} {sortedPosts.length === 1 ? 'post' : 'posts'}</span>
          </div>
          <div className="table-scroll">
            <table className="index-table">
              <thead>
                <tr>
                  <th className="year">date</th>
                  <th>post</th>
                  <th className="status">read</th>
                </tr>
              </thead>
              <tbody>
                {sortedPosts.map((post) => {
                  const title = (typeof post.data.title === 'string' ? post.data.title : null) || post.slug.replace(/-/g, ' ');
                  const date = typeof post.data.date === 'string' ? post.data.date : null;
                  const description = typeof post.data.description === 'string' ? post.data.description : null;

                  return (
                    <tr key={post.slug}>
                      <td className="year">
                        {date
                          ? parseLocalDate(date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: '2-digit',
                            }).toLowerCase()
                          : '—'}
                      </td>
                      <td>
                        <Link href={`/blog/${post.slug}`}>{title}</Link>
                        {description && (
                          <>
                            <br />
                            <span style={{ color: 'var(--ink-dim)', fontSize: '18px' }}>{description}</span>
                          </>
                        )}
                      </td>
                      <td className="status">
                        <Link href={`/blog/${post.slug}`}>&gt;&gt;</Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
