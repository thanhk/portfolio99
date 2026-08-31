import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getMarkdownContent } from '@/lib/markdown';

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getMarkdownContent('projects', slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const name = (typeof project.data.name === 'string' ? project.data.name : null) || slug.replace(/-/g, ' ');
  const description = (typeof project.data.description === 'string' ? project.data.description : null) || `Project by Steven Khuu (thanhk): ${name}`;

  return {
    title: name,
    description,
    alternates: {
      canonical: `/projects/${slug}`,
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = await getMarkdownContent('projects', slug);

  if (!project) {
    notFound();
  }

  const name = (typeof project.data.name === 'string' ? project.data.name : null) || slug.replace(/-/g, ' ');
  const description = typeof project.data.description === 'string' ? project.data.description : null;
  const tech = typeof project.data.tech === 'string' ? project.data.tech : null;

  return (
    <div>
      <p className="breadcrumb">
        you are here:{' '}
        <Link href="/">home</Link>
        <span className="sep">&gt;</span>
        <Link href="/projects">projects</Link>
        <span className="sep">&gt;</span>
        {name}
      </p>

      <div style={{ marginBottom: '20px' }}>
        <Link href="/projects" className="retro-button" style={{ display: 'inline-block' }}>
          ← back to projects
        </Link>
      </div>

      <div className="retro-card">
        <h1 className="glow page-title">
          {name}
        </h1>
        {description && (
          <p style={{ fontSize: '24px', marginBottom: '15px', color: 'var(--ink)' }}>
            {description}
          </p>
        )}
        {tech && (
          <p style={{ fontSize: '20px', marginBottom: '20px', color: 'var(--ink)' }}>
            <strong>Tech:</strong> {tech}
          </p>
        )}

        <div
          dangerouslySetInnerHTML={{ __html: project.content }}
          style={{
            fontSize: '20px',
            lineHeight: '1.8',
          }}
        />
      </div>
    </div>
  );
}
