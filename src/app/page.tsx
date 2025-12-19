export default function Home() {
  const workExperience = [
    {
      title: "Senior Software Engineer",
      company: "Visa Inc.",
      period: "2022 - Present",
      description: "Developed backend services and web applications in the Risk Authentication & Identity Services domain."
    },
    {
      title: "Software Engineer Intern",
      company: "HCL Technologies",
      period: "2021",
      description: "My first tech job. Got introduced to k8s clusters, CI/CD pipelines, and linux."
    },
    {
      title: "Student",
      company: "The University of Texas at Dallas",
      period: "2018 - 2021",
      description: "Learned the basics of computer science and programming. B.S. Computer Science."
    },
  ];

  return (
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
  );
}
