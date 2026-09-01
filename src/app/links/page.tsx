import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Links",
  description: "Connect with Steven Khuu (thanhk) - GitHub, LinkedIn, and contact information.",
  alternates: {
    canonical: "/links",
  },
};

export default function Links() {

  /** Sites worth a visit. Add entries as { name, url, note }. */
  const linkRoll: { name: string; url: string; note: string }[] = [];

  const socialLinks = [
    {
      name: "github",
      url: "https://github.com/thanhk",
      handle: "@thanhk",
    },
    {
      name: "linkedin",
      url: "https://www.linkedin.com/in/steven-khuu/",
      handle: "steven-khuu",
    },
    {
      name: "email",
      url: "mailto:hello@thanhk.com",
      handle: "hello@thanhk.com",
    },
  ];

  return (
    <div>
      <h1 className="glow page-title">
        Links
      </h1>

      <div className="grid">
        <div className="retro-card col-full">
          <div className="panel-head">
            elsewhere
            <span className="right">{socialLinks.length} links</span>
          </div>
          <ul className="leader-list">
            {socialLinks.map((link) => {
              const isMail = link.url.startsWith('mailto:');
              return (
                <li key={link.name}>
                  <a
                    className="leader-row"
                    href={link.url}
                    target={isMail ? undefined : '_blank'}
                    rel={isMail ? undefined : 'noopener noreferrer'}
                  >
                    <span className="leader-name">{link.name}</span>
                    <span className="leader-dots" aria-hidden="true" />
                    <span className="leader-value">{link.handle}</span>
                    <span className="leader-go" aria-hidden="true">
                      {isMail ? 'mail' : 'go'} &raquo;
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
          <p style={{ marginTop: '18px', marginBottom: 0, color: 'var(--ink-dim)', fontSize: '1.125rem' }}>
            say hi — i read everything, i reply to most of it.
          </p>
        </div>

        <div className="retro-card col-full">
          <div className="panel-head">
            sites i like
            <span className="right">{linkRoll.length}</span>
          </div>
          {linkRoll.length === 0 ? (
            <p style={{ marginBottom: 0, color: 'var(--ink-dim)' }}>
              under construction — link roll coming soon.
            </p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {linkRoll.map((site, index) => (
                <li
                  key={site.name}
                  style={{
                    marginBottom: '10px',
                    paddingBottom: '10px',
                    borderBottom: index === linkRoll.length - 1 ? 'none' : '1px dashed var(--border-dim)',
                  }}
                >
                  <a href={site.url} target="_blank" rel="noopener noreferrer">{site.name}</a>
                  <br />
                  <span style={{ color: 'var(--ink-dim)', fontSize: '1.125rem' }}>{site.note}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

