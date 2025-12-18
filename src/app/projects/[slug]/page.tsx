import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Project } from '@/components/ProjectCard';

// Define your project details here
// The slug should match the detailSlug in your projects array
const projectDetails: Record<string, Project & { content: string }> = {
  'in-depth-project': {
    name: "In-Depth Project",
    description: "A detailed project with comprehensive information",
    tech: "Next.js, Node.js",
    type: "detail",
    detailSlug: "in-depth-project",
    content: `
      <h2 style="font-size: 32px; color: #8B008B; margin-top: 20px; margin-bottom: 15px;">Project Overview</h2>
      <p style="font-size: 22px; margin-bottom: 15px; color: #000080;">
        This is a detailed project page where you can write comprehensive information about your project.
      </p>
      <h3 style="font-size: 28px; color: #8B008B; margin-top: 20px; margin-bottom: 15px;">Features</h3>
      <ul style="font-size: 20px; margin-left: 20px; margin-bottom: 15px; color: #000080;">
        <li>Feature one</li>
        <li>Feature two</li>
        <li>Feature three</li>
      </ul>
      <h3 style="font-size: 28px; color: #8B008B; margin-top: 20px; margin-bottom: 15px;">Technical Details</h3>
      <p style="font-size: 20px; margin-bottom: 15px; color: #000080;">
        Write about the technical implementation, challenges, and solutions here.
      </p>
    `,
  },
  // Add more project details as needed
};

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = projectDetails[slug];

  if (!project) {
    notFound();
  }

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
          {project.name}
        </h1>
        <p style={{ fontSize: '24px', marginBottom: '15px', color: '#000080' }}>
          {project.description}
        </p>
        <p style={{ fontSize: '20px', marginBottom: '20px', color: '#000080' }}>
          <strong>Tech:</strong> {project.tech}
        </p>
        
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

