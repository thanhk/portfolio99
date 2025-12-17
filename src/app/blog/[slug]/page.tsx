import { readFile } from 'fs/promises';
import { join } from 'path';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

async function getBlogPost(slug: string) {
  try {
    const filePath = join(process.cwd(), 'public', 'blog', `${slug}.html`);
    const content = await readFile(filePath, 'utf-8');
    return content;
  } catch (error) {
    return null;
  }
}

export default async function BlogPost({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const content = await getBlogPost(slug);

  if (!content) {
    notFound();
  }

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
      
      <div 
        className="retro-card"
        dangerouslySetInnerHTML={{ __html: content }}
        style={{
          fontSize: '20px',
          lineHeight: '1.8',
        }}
      />
    </div>
  );
}

