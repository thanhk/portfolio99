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
        <div className="panel-head">
          elsewhere
          <span className="right">{socialLinks.length} links</span>
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '10px' }}>
          {socialLinks.map((link) => {
            const isMail = link.url.startsWith('mailto:');
            return (
              <li key={link.name}>
                <a
                  className="link-row"
                  href={link.url}
                  target={isMail ? undefined : '_blank'}
                  rel={isMail ? undefined : 'noopener noreferrer'}
                >
                  <span aria-hidden="true">{link.icon}</span>
                  <span>{link.name}</span>
                  <span className="arrow" aria-hidden="true">
                    {isMail ? 'send mail »' : 'visit »'}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
        <p style={{ marginTop: '18px', marginBottom: 0, color: 'var(--ink-dim)', fontSize: '18px' }}>
          say hi — i read everything, i reply to most of it.
        </p>
      </div>
    </div>
  );
}

