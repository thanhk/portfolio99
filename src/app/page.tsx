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
    "jobTitle": "Senior Software Engineer",
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
      <h1 className="glow" style={{ fontSize: '48px', marginBottom: '30px', textAlign: 'center' }}>
        Steven Khuu
      </h1>

      <div className="retro-card">
        <h2 style={{ fontSize: '32px', marginBottom: '20px', color: '#8B008B' }}>
          Experience
        </h2>

        <ul style={{ listStyle: 'none', padding: 0 }}>
          {workExperience.map((job, index) => (
            <li key={index} style={{ marginBottom: '25px', paddingBottom: '20px', borderBottom: '1px dashed #000080' }}>
              <h3 style={{ fontSize: '28px', color: '#8B008B', marginBottom: '10px' }}>
                {job.title}
              </h3>
              <p style={{ fontSize: '22px', color: '#000080', marginBottom: '8px' }}>
                {job.company} | {job.period}
              </p>
              <p style={{ fontSize: '20px', color: '#000080' }}>
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
