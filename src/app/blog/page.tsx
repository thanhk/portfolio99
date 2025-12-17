import { readdir } from 'fs/promises';
import { join } from 'path';
import Link from 'next/link';

// This function will be called at build time and request time
async function getBlogPosts() {
  try {
    const blogDir = join(process.cwd(), 'public', 'blog');
    const files = await readdir(blogDir);
    
    // Filter for HTML files and extract metadata
    const posts = files
      .filter(file => file.endsWith('.html'))
      .map(file => {
        const slug = file.replace('.html', '');
        // Extract date from filename if format is YYYY-MM-DD-title.html
        const dateMatch = slug.match(/^(\d{4}-\d{2}-\d{2})-(.+)$/);
        if (dateMatch) {
          return {
            slug,
            title: dateMatch[2].replace(/-/g, ' '),
            date: dateMatch[1],
          };
        }
        return {
          slug,
          title: slug.replace(/-/g, ' '),
          date: null,
        };
      })
      .sort((a, b) => {
        // Sort by date if available, otherwise by title
        if (a.date && b.date) {
          return b.date.localeCompare(a.date);
        }
        return a.title.localeCompare(b.title);
      });
    
    return posts;
  } catch (error) {
    // Directory doesn't exist or can't be read
    return [];
  }
}

export default async function Blog() {
  const posts = await getBlogPosts();

  return (
    <div>
      <h1 className="glow" style={{ fontSize: '48px', marginBottom: '30px', textAlign: 'center' }}>
        Blog
      </h1>
      
      {posts.length === 0 ? (
        <div className="retro-card" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '24px', marginBottom: '15px' }}>
            No blog posts yet.
          </p>
          <p style={{ fontSize: '20px', color: '#000080' }}>
            Add HTML files to the <code style={{ background: '#DDA0DD', padding: '2px 6px' }}>public/blog/</code> folder to create posts.
          </p>
          <p style={{ fontSize: '18px', marginTop: '15px', color: '#000080', fontStyle: 'italic' }}>
            Filename format: <code style={{ background: '#DDA0DD', padding: '2px 6px' }}>YYYY-MM-DD-title.html</code> or just <code style={{ background: '#DDA0DD', padding: '2px 6px' }}>title.html</code>
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {posts.map((post) => (
            <div key={post.slug} className="retro-card">
              <h2 style={{ fontSize: '32px', marginBottom: '10px', color: '#8B008B' }}>
                <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {post.title}
                </Link>
              </h2>
              {post.date && (
                <p style={{ fontSize: '20px', color: '#000080', marginBottom: '10px' }}>
                  📅 {new Date(post.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
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
          ))}
        </div>
      )}
    </div>
  );
}

