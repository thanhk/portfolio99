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
      <div style={{ marginBottom: '20px' }}>
        <Link
          href="/projects"
          className="retro-button"
          style={{ display: 'inline-block', marginBottom: '20px' }}
        >
          ← Back to Projects
        </Link>
      </div>

      <div className="retro-card">
        <h1 className="glow" style={{ fontSize: '48px', marginBottom: '20px', textAlign: 'center' }}>
          {name}
        </h1>
        {description && (
          <p style={{ fontSize: '24px', marginBottom: '15px', color: '#000080' }}>
            {description}
          </p>
        )}
        {tech && (
          <p style={{ fontSize: '20px', marginBottom: '20px', color: '#000080' }}>
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
