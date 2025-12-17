export default function Projects() {
  // Easy to update: just add/remove items from this array
  const projects = [
    {
      name: "Project One",
      description: "A cool project I built",
      url: "https://example.com/project1",
      tech: "React, TypeScript"
    },
    {
      name: "Project Two",
      description: "Another awesome project",
      url: "https://example.com/project2",
      tech: "Next.js, Tailwind"
    },
    {
      name: "Project Three",
      description: "My latest creation",
      url: "https://example.com/project3",
      tech: "Vue, Node.js"
    },
  ];

  return (
    <div>
      <h1 className="glow" style={{ fontSize: '48px', marginBottom: '30px', textAlign: 'center' }}>
        My Projects
      </h1>
      
      <div style={{ display: 'grid', gap: '20px' }}>
        {projects.map((project, index) => (
          <div key={index} className="retro-card">
            <h2 style={{ fontSize: '32px', marginBottom: '15px', color: '#8B008B' }}>
              {project.name}
            </h2>
            <p style={{ fontSize: '22px', marginBottom: '10px', color: '#000080' }}>
              {project.description}
            </p>
            <p style={{ fontSize: '20px', marginBottom: '15px', color: '#000080' }}>
              <strong>Tech:</strong> {project.tech}
            </p>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="retro-button"
              style={{ display: 'inline-block', marginTop: '10px' }}
            >
              View Project →
            </a>
          </div>
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

