export default function Home() {
  const workExperience = [
    {
      title: "Software Developer",
      company: "Tech Company",
      period: "2020 - Present",
      description: "Developed web applications using modern technologies."
    },
    {
      title: "Junior Developer",
      company: "Startup Inc",
      period: "2018 - 2020",
      description: "Built and maintained frontend applications."
    },
    {
      title: "Intern",
      company: "Dev Agency",
      period: "2017 - 2018",
      description: "Learned web development fundamentals and best practices."
    },
  ];

  return (
    <div>
      <h1 className="glow" style={{ fontSize: '48px', marginBottom: '30px', textAlign: 'center' }}>
        YOUR NAME HERE
      </h1>
      
      <div className="retro-card">
        <h2 style={{ fontSize: '32px', marginBottom: '20px', color: '#8B008B' }}>
          Work Experience
        </h2>
        
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {workExperience.map((job, index) => (
            <li key={index} style={{ marginBottom: '25px', paddingBottom: '20px', borderBottom: '1px dashed #000080' }}>
              <h3 style={{ fontSize: '28px', color: '#8B008B', marginBottom: '10px' }}>
                {job.title}
              </h3>
              <p style={{ fontSize: '22px', color: '#000080', marginBottom: '8px' }}>
                {job.company} <span className="blink">|</span> {job.period}
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
