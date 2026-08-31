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
      year: "2026",
      status: "beta",
      description: "AI planning co-pilot for makers who sell at farmers markets and pop-ups. Describe an event by voice, get a full batch and pricing plan back.",
      tech: "React Native (Expo), TypeScript, Supabase, Anthropic API",
      imageUrl: "/assets/mise-lockup.png",
      detailSlug: "mise",
      tag: "new!",
      // TODO: waitlist landing page URL (mise-web deployment)
    },
    {
      name: "Turnip Bakes",
      year: "2026",
      status: "live",
      description: "Storefront and ordering site for a home bakery - menu, cart, custom cake requests, and order emails",
      tech: "Next.js 16, React 19, TypeScript, Tailwind CSS 4",
      imageUrl: "/assets/turnip-bakes-cake.png",
      detailSlug: "turnip-bakes",
      tag: "new!",
      url: "https://turnipbakes.com",
    },
    {
      name: "IG_FOLLOW_CHECKER",
      year: "2026",
      status: "live",
      description: "A bookmarklet to check your followers and following on Instagram",
      tech: "JavaScript",
      bookmarkletCode: makeBookmarklet(igFollowCheckerSource),
      bookmarkletName: "IG_FOLLOW_CHECKER",
      detailSlug: "ig-follow-checker",
      url: "https://github.com/thanhk/ig-follow-checker",
    },
    {
      name: "Target Stock Discord Hook",
      year: "2025",
      status: "done",
      description: "Using Target's RedSky API to get stock updates and send to a Discord channel",
      tech: "Python",
      url: "https://github.com/thanhk/redsky_discordhook",
    },
    {
      name: "Rise of the Elements",
      year: "2022",
      status: "game jam",
      description: "Top-down RPG game built with friends for a game jam",
      tech: "C#, Unity",
      imageUrl: "/assets/rise-of-the-elements-demo.gif",
      url: "https://github.com/thanhk/Rise-of-the-Elements",
    },
    {
      name: "IoT Anomaly Detector",
      year: "2021",
      status: "done",
      description: "Live monitoring of IoT device data using AWS services",
      tech: "AWS, Python, Swift",
      videoUrl: "/assets/iot-anomaly-detector-demo.mp4",
      videoThumbnail: "/assets/iot-anomaly-detector-thumbnail.png",
      url: "https://github.com/thanhk/IoT-Anomaly-Detector",
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
