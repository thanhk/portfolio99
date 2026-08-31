import { Metadata } from 'next';
import ProjectCard, { Project } from '@/components/ProjectCard';
import { igFollowCheckerSource, makeBookmarklet } from "@/lib/bookmarklets.generated";

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects by Steven Khuu (thanhk) - Software Engineer. Including Mise, Turnip Bakes, IoT Anomaly Detector, Rise of the Elements, IG Follow Checker, and more.",
  alternates: {
    canonical: "/projects",
  },
};

export default function Projects() {
  // Easy to update: just add/remove items from this array
  const projects: Project[] = [
    {
      name: "Mise",
      description: "AI planning co-pilot for makers who sell at farmers markets and pop-ups. Describe an event by voice, get a full batch and pricing plan back.",
      tech: "React Native (Expo), TypeScript, Supabase, Anthropic API",
      imageUrl: "/assets/mise-lockup.png",
      detailSlug: "mise",
      tag: "new!",
      // TODO: waitlist landing page URL (mise-web deployment)
      mediaPosition: "center",
    },
    {
      name: "Turnip Bakes",
      description: "Storefront and ordering site for a home bakery - menu, cart, custom cake requests, and order emails",
      tech: "Next.js 16, React 19, TypeScript, Tailwind CSS 4",
      imageUrl: "/assets/turnip-bakes-cake.png",
      detailSlug: "turnip-bakes",
      tag: "new!",
      url: "https://turnipbakes.com",
      mediaPosition: "center",
    },
    {
      name: "IG_FOLLOW_CHECKER",
      description: "A bookmarklet to check your followers and following on Instagram",
      tech: "JavaScript",
      bookmarkletCode: makeBookmarklet(igFollowCheckerSource),
      bookmarkletName: "IG_FOLLOW_CHECKER",
      detailSlug: "ig-follow-checker",
      url: "https://github.com/thanhk/ig-follow-checker",
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
      videoThumbnail: "/assets/iot-anomaly-detector-thumbnail.png",
      url: "https://github.com/thanhk/IoT-Anomaly-Detector",
      mediaPosition: "center",
    },
  ];

  return (
    <div>
      <h1 className="glow page-title">
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
