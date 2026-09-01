import { igFollowCheckerSource, makeBookmarklet } from "@/lib/bookmarklets.generated";

export interface Project {
  name: string;
  description: string;
  tech: string;
  // Optional features - can combine multiple
  videoUrl?: string;
  videoThumbnail?: string;
  imageUrl?: string; // For GIFs or static images
  bookmarkletCode?: string;
  bookmarkletName?: string;
  detailSlug?: string;
  /** Short tag shown in the card's title bar, e.g. "new". Blinks, on purpose. */
  tag?: string;
  /** Year the project was started. */
  year?: string;
  /** Where it stands now — "live", "beta", "done". */
  status?: string;
  url?: string; // External link (e.g., GitHub repo)
}

/**
 * The project list, shared by the index and the detail pages: the index renders
 * the cards, and a detail page reads its own year/status/links from here and
 * works out its neighbours for the footer nav. Add or reorder entries here.
 */
export const projects: Project[] = [
  {
    name: "Mise",
    year: "2026",
    status: "beta",
    description: "AI planning co-pilot for makers who sell at farmers markets and pop-ups. Describe an event by voice, get a full batch and pricing plan back.",
    tech: "React Native, TypeScript, Supabase, Anthropic API",
    imageUrl: "/assets/mise-lockup.png",
    detailSlug: "mise",
    tag: "new!",
    url: "https://miseprep.app/",
  },
  {
    name: "Turnip Bakes",
    year: "2026",
    status: "live",
    description: "Storefront and ordering site for a home bakery - menu, cart, custom cake requests, and order emails",
    tech: "React, Tailwind CSS, Resend, PostHog",
    imageUrl: "/assets/turnip-bakes-cake.png",
    detailSlug: "turnip-bakes",
    tag: "new!",
    url: "https://turnipbakes.com",
  },
  {
    name: "IG_FOLLOW_CHECKER",
    year: "2026",
    status: "done",
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
    description: "Used Target's RedSky API to get stock updates and send to a Discord channel. Built to fuel my Pokémon card addiction.",
    tech: "Python",
    url: "https://github.com/thanhk/redsky_discordhook",
  },
  {
    name: "Rise of the Elements",
    year: "2022",
    status: "done",
    description: "Top-down RPG game built with friends for a game jam. I mainly worked on implementing the inventory system, ability and movement mechanics.",
    tech: "C#, Unity",
    imageUrl: "/assets/rise-of-the-elements-demo.gif",
    url: "https://github.com/thanhk/Rise-of-the-Elements",
  },
  {
    name: "IoT Anomaly Detector",
    year: "2021",
    status: "done",
    description: "Live monitoring of IoT device data using AWS services. This was my senior capstone project sponsored by a professor at UTD.",
    tech: "AWS, Python, Swift",
    videoUrl: "/assets/iot-anomaly-detector-demo.mp4",
    videoThumbnail: "/assets/iot-anomaly-detector-thumbnail.png",
    url: "https://github.com/thanhk/IoT-Anomaly-Detector",
  },
];
