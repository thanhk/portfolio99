import Link from 'next/link';
import { projects } from '@/lib/projects';

export default function Home() {
  const workExperience = [
    {
      title: "Senior Software Engineer",
      company: "Visa Inc.",
      period: "2022 - Present",
      description: "Developing robust backend services and web applications in the payments and authentication domain."
    },
    {
      title: "Software Engineer Intern",
      company: "HCL Technologies",
      period: "2021",
      description: "My first tech job. Worked with k8s clusters, CI/CD pipelines, and linux."
    },
    {
      title: "Student",
      company: "The University of Texas at Dallas",
      period: "2018 - 2021",
      description: "Learned the basics of computer science. B.S. Computer Science."
    },
  ];

  // Taken from the project list rather than repeated here, so this can't drift
  // out of order with the projects page.
  const featured = projects.slice(0, 3);

  /** Site changelog. Newest first; add a line whenever the site changes. */
  const changelog = [
    { date: 'aug 31, 2026', text: 'rebuilt the site in a web-1.0 layout' },
    { date: 'aug 05, 2026', text: 'added mise and turnip bakes to projects' },
    { date: 'jan 24, 2026', text: 'fixed the project card layout' },
    { date: 'jan 18, 2026', text: 'wrote up ig follow checker' },
    { date: 'jan 07, 2026', text: 'blog + markdown pipeline' },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Steven Khuu",
    "alternateName": "thanhk",
    "jobTitle": "Software Engineer",
    "worksFor": {
      "@type": "Organization",
      "name": "Visa Inc."
    },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "The University of Texas at Dallas",
      "degree": "Bachelor of Science",
      "fieldOfStudy": "Computer Science"
    },
    "url": "https://thanhk.com",
    "sameAs": [
      "https://github.com/thanhk",
      "https://www.linkedin.com/in/steven-khuu/"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div>
      <h1 className="glow page-title">
        Steven Khuu
      </h1>

      <div className="grid">
        <div className="retro-card col-full">
          <div className="panel-head">
            welcome.txt
          </div>
          <p>
            hi, i&apos;m steven. i work in tech full-time, but i also love building
            software for people outside of that.
            this is where i share my projects, hobbies, interests, and ideas.
          </p>
          <p style={{ marginBottom: 0 }}>
            currently working on <Link href="/projects/mise">mise</Link>, an ai
            planning co-pilot for people who sell at farmers markets.
          </p>
        </div>

        <div className="retro-card col-half">
          <div className="panel-head">
            latest projects
            <span className="right">{projects.filter((item) => item.tag).length} new</span>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {featured.map((item, index) => (
              <li
                key={item.name}
                style={{
                  marginBottom: '12px',
                  paddingBottom: '12px',
                  borderBottom: index === featured.length - 1 ? 'none' : '1px dashed var(--border-dim)',
                }}
              >
                {item.detailSlug ? (
                  <Link href={`/projects/${item.detailSlug}`}>{item.name}</Link>
                ) : (
                  <span style={{ color: 'var(--cyan)' }}>{item.name}</span>
                )}{' '}
                {item.tag && <span className="tag-new blink">{item.tag}</span>}
                <br />
                <span style={{ color: 'var(--ink-dim)', fontSize: '1.125rem' }}>
                  {item.blurb || item.description}
                </span>
              </li>
            ))}
          </ul>
          <Link href="/projects" className="text-link">
            all projects
          </Link>
        </div>

        <div className="retro-card col-half">
          <div className="panel-head">
            changelog
            <span className="right">{changelog.length} entries</span>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {changelog.map((entry) => (
              <li key={entry.date} style={{ marginBottom: '8px' }}>
                <span className="meta">[{entry.date}]</span>
                <br />
                {entry.text}
              </li>
            ))}
          </ul>
        </div>

        <div className="retro-card col-full">
          <div className="panel-head">
            experience
            <span className="right">{workExperience.length} entries</span>
          </div>

          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {workExperience.map((job, index) => (
              <li
                key={index}
                style={{
                  marginBottom: '20px',
                  paddingBottom: '18px',
                  borderBottom: index === workExperience.length - 1 ? 'none' : '1px dashed var(--border-dim)',
                }}
              >
                <h3 style={{ fontSize: '1.75rem', color: 'var(--magenta)', margin: '0 0 6px' }}>
                  <span style={{ color: 'var(--cyan)' }}>&gt;</span> {job.title}
                </h3>
                <p style={{ marginBottom: '8px' }}>
                  <span style={{ color: 'var(--cyan)' }}>{job.company}</span>
                  <span className="meta"> [{job.period}]</span>
                </p>
                <p style={{ marginBottom: 0 }}>
                  {job.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    </>
  );
}
