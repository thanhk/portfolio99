import ProjectCard, { Project } from '@/components/ProjectCard';
import { igFollowCheckerSource, makeBookmarklet } from "@/lib/bookmarklets";

export default function Projects() {
  // Easy to update: just add/remove items from this array
  // Each project can have different types: 'link', 'video', 'bookmarklet', or 'blog'
  const projects: Project[] = [
    {
      name: "Project One",
      description: "A cool project I built with a video demo",
      tech: "React, TypeScript",
      type: "video",
      videoUrl: "/videos/project1-demo.mp4",
      videoThumbnail: "/images/project1-thumb.jpg",
    },
    {
      name: "IG_FOLLOW_CHECKER",
      description: "A bookmarklet to check your followers and following on Instagram",
      tech: "JavaScript",
      type: "bookmarklet",
      bookmarkletCode: makeBookmarklet(igFollowCheckerSource),
      bookmarkletName: "IG_FOLLOW_CHECKER",
    },
    {
      name: "In-Depth Project",
      description: "A detailed project with comprehensive information",
      tech: "Next.js, Node.js",
      type: "detail",
      detailSlug: "in-depth-project", // The slug for the project detail page
    },
    {
      name: "Simple Link Project",
      description: "A project that links to an external site",
      tech: "Vue, Tailwind",
      type: "link",
      url: "https://example.com/project",
    },
  ];

  return (
    <div>
      <h1 className="glow" style={{ fontSize: '48px', marginBottom: '30px', textAlign: 'center' }}>
        My Projects
      </h1>
      
      <div style={{ display: 'grid', gap: '20px' }}>
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
      
      {projects.length === 0 && (
        <div className="retro-card" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '24px' }}>No projects yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
}
