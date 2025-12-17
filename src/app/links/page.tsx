import { stat } from 'fs/promises';
import { join } from 'path';

async function getResumeLastUpdated() {
  try {
    const resumePath = join(process.cwd(), 'public', 'resume.pdf');
    const stats = await stat(resumePath);
    // Use birthtime (creation time) instead of mtime (modification time)
    const date = new Date(stats.birthtime);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  } catch (error) {
    // File doesn't exist or can't be read
    return null;
  }
}

export default async function Links() {
  const resumeLastUpdated = await getResumeLastUpdated();
  
  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/thanhk",
      icon: "💻"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/steven-khuu/",
      icon: "💼"
    },
    {
      name: "Email",
      url: "mailto:stevenkhuu1999@gmail.com",
      icon: "📧"
    },
  ];

  return (
    <div>
      <h1 className="glow" style={{ fontSize: '48px', marginBottom: '30px', textAlign: 'center' }}>
        Links & Resume
      </h1>
      
      <div className="retro-card" style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '32px', marginBottom: '20px', color: '#8B008B' }}>
          Social Links
        </h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {socialLinks.map((link, index) => (
            <li key={index} style={{ marginBottom: '15px' }}>
              <a
                href={link.url}
                target={link.url.startsWith('mailto:') ? undefined : '_blank'}
                rel={link.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                style={{ fontSize: '24px', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
              >
                <span>{link.icon}</span>
                <span>{link.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="retro-card">
        <h2 style={{ fontSize: '32px', marginBottom: '20px', color: '#8B008B' }}>
          Resume
        </h2>
        <p style={{ fontSize: '22px', marginBottom: '20px', color: '#000080' }}>
          Download my resume to learn more about my experience and skills.
        </p>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="retro-button"
          style={{ display: 'inline-block' }}
        >
          📄 Download Resume
        </a>
        {resumeLastUpdated ? (
          <p style={{ fontSize: '18px', marginTop: '15px', color: '#000080', fontStyle: 'italic' }}>
            Last updated: {resumeLastUpdated}
          </p>
        ) : (
          <p style={{ fontSize: '16px', marginTop: '15px', color: '#000080', fontStyle: 'italic', opacity: 0.7 }}>
            (Place your resume.pdf file in the public folder)
          </p>
        )}
      </div>
    </div>
  );
}

