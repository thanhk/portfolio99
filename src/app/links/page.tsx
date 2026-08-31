import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Links",
  description: "Connect with Steven Khuu (thanhk) - GitHub, LinkedIn, and contact information.",
  alternates: {
    canonical: "/links",
  },
};

export default function Links() {

  /* Sites worth a visit — the ones that shaped how this place looks. */
  const linkRoll = [
    { name: 'daikonet', url: 'https://daikonet.neocities.org/home', note: 'digital habitat, rpg maker devlogs' },
    { name: 'false dawn', url: 'https://falsedawn.neocities.org/home/', note: 'art, blog, and a very good sidebar' },
    { name: 'eggseed', url: 'https://eggseed.neocities.org/', note: 'small and cloudy' },
  ];

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

      <div className="grid">
        <div className="retro-card col-full">
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

        <div className="retro-card col-half">
          <div className="panel-head">
            sites i like
            <span className="right">{linkRoll.length}</span>
          </div>
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
                <span style={{ color: 'var(--ink-dim)', fontSize: '18px' }}>{site.note}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="retro-card col-half">
          <div className="panel-head">
            link back to me
            <span className="right">88×31</span>
          </div>
          <div className="button-shelf" style={{ marginBottom: '14px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/thanhk-button.png" alt="thanhk.com button" width={88} height={31} />
            <span style={{ color: 'var(--ink-dim)', fontSize: '18px' }}>
              grab it, host it, point it here.
            </span>
          </div>
          <label htmlFor="button-code" style={{ display: 'block', color: 'var(--ink-dim)', fontSize: '17px', marginBottom: '6px' }}>
            paste this on your page:
          </label>
          <textarea
            id="button-code"
            className="snippet"
            readOnly
            spellCheck={false}
            value={'<a href="https://thanhk.com">\n  <img src="https://thanhk.com/assets/thanhk-button.png"\n       alt="thanhk.com" width="88" height="31">\n</a>'}
          />
        </div>
      </div>
    </div>
  );
}

