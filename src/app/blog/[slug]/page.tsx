import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getMarkdownContent, parseLocalDate } from '@/lib/markdown';

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

  const title = post.data.title || slug.replace(/-/g, ' ');
  const description = post.data.description || `Blog post by Steven Khuu (thanhk): ${title}`;

  return {
    title,
    description,
    keywords: ["Steven Khuu blog", "thanhk blog", title, "software engineering"],
  };
}

export default async function BlogPost({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getMarkdownContent('blog', slug);

  if (!post) {
    notFound();
  }

  const title = post.data.title || slug.replace(/-/g, ' ');
  const date = post.data.date;

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <Link
          href="/blog"
          className="retro-button"
          style={{ display: 'inline-block', marginBottom: '20px' }}
        >
          ← Back to Blog
        </Link>
      </div>

      <div className="retro-card">
        <h1 className="glow" style={{ fontSize: '48px', marginBottom: '20px', textAlign: 'center' }}>
          {title}
        </h1>
        {date && (
          <p style={{ fontSize: '20px', marginBottom: '20px', color: '#000080', textAlign: 'center', fontStyle: 'italic' }}>
            📅 {parseLocalDate(date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        )}
        <div
          dangerouslySetInnerHTML={{ __html: post.content }}
          style={{
            fontSize: '20px',
            lineHeight: '1.8',
          }}
        />
      </div>
    </div>
  );
}
