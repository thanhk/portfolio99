import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Links",
  description: "Connect with Steven Khuu (thanhk) - GitHub, LinkedIn, and contact information.",
  alternates: {
    canonical: "/links",
  },
};

export default function Links() {

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
      url: "mailto:hello@thanhk.com",
      icon: "📧"
    },
  ];

  return (
    <div>
      <h1 className="glow page-title">
        Links
      </h1>

      <div className="retro-card" style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '32px', marginBottom: '20px', color: 'var(--magenta)' }}>
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
    </div>
  );
}

