import ProjectCard, { Project } from '@/components/ProjectCard';
import { igFollowCheckerSource, makeBookmarklet } from "@/lib/bookmarklets";

export default function Projects() {
  // Easy to update: just add/remove items from this array
  const projects: Project[] = [
    {
      name: "IG_FOLLOW_CHECKER",
      description: "A bookmarklet to check your followers and following on Instagram",
      tech: "JavaScript",
      bookmarkletCode: makeBookmarklet(igFollowCheckerSource),
      bookmarkletName: "IG_FOLLOW_CHECKER",
      detailSlug: "ig-follow-checker",
    },
    {
      name: "Target Stock Discord Hook",
      description: "Using Target's RedSky API to get stock updates and send to a Discord channel",
      tech: "Python",
      url: "https://github.com/thanhk/redsky_discordhook",
    },
    {
      name: "Rise of the Elements",
      description: "Top-down RPG game built with friends for a game jam",
      tech: "C#, Unity",
      imageUrl: "/assets/rise-of-the-elements-demo.gif",
      url: "https://github.com/thanhk/Rise-of-the-Elements",
      mediaPosition: "left",
    },
    {
      name: "IoT Anomaly Detector",
      description: "Live monitoring of IoT device data using AWS services",
      tech: "AWS, Python, Swift",
      videoUrl: "/assets/iot-anomaly-detector-demo.mp4",
      url: "https://github.com/thanhk/IoT-Anomaly-Detector",
      mediaPosition: "center",
    },
  ];

  return (
    <div>
      <h1 className="glow" style={{ fontSize: '48px', marginBottom: '30px', textAlign: 'center' }}>
        My Projects
      </h1>
      
      <div style={{ display: 'grid', gap: '20px' }}>
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
      
      {projects.length === 0 && (
        <div className="retro-card" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '24px' }}>No projects yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
}
