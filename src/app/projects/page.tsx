import { Metadata } from 'next';
import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/lib/projects';

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects by Steven Khuu (thanhk) - Software Engineer. Including Mise, Turnip Bakes, IoT Anomaly Detector, Rise of the Elements, IG Follow Checker, and more.",
  alternates: {
    canonical: "/projects",
  },
};

export default function Projects() {
  return (
    <div>
      <h1 className="glow page-title">
        My Projects
      </h1>

      <div className="card-list">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>

      {projects.length === 0 && (
        <div className="retro-card" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '1.5rem' }}>No projects yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
}
