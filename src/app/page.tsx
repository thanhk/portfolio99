import Link from 'next/link';

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
      description: "My first tech job. Meddled with k8s clusters, CI/CD pipelines, and linux."
    },
    {
      title: "Student",
      company: "The University of Texas at Dallas",
      period: "2018 - 2021",
      description: "Learned the basics of computer science. B.S. Computer Science."
    },
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

      <div className="retro-card">
        <div className="panel-head">
          welcome.txt
          <span className="right">200% hand-tuned</span>
        </div>
        <p>
          hi, i&apos;m steven. i build backend services by day and small useful
          things the rest of the time. this is where i keep my projects, my
          links, and the occasional write-up.
        </p>
        <p style={{ marginBottom: 0 }}>
          currently deep in <Link href="/projects/mise">mise</Link>, an ai
          planning co-pilot for people who sell at farmers markets.
        </p>
      </div>

      <div className="retro-card">
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
              <h3 style={{ fontSize: '28px', color: 'var(--magenta)', margin: '0 0 6px' }}>
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
    </>
  );
}
