export default function Links() {
  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/yourusername",
      icon: "💻"
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/yourusername",
      icon: "💼"
    },
    {
      name: "Twitter",
      url: "https://twitter.com/yourusername",
      icon: "🐦"
    },
    {
      name: "Email",
      url: "mailto:your.email@example.com",
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
                style={{ fontSize: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}
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
          download
          className="retro-button"
          style={{ display: 'inline-block' }}
        >
          📄 Download Resume
        </a>
        <p style={{ fontSize: '18px', marginTop: '15px', color: '#000080', fontStyle: 'italic' }}>
          (Place your resume.pdf file in the public folder)
        </p>
      </div>
    </div>
  );
}

