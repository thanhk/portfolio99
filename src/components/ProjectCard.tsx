'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './ProjectCard.module.css';

export type ProjectType = 'link' | 'video' | 'bookmarklet' | 'detail';

export interface Project {
  name: string;
  description: string;
  tech: string;
  type: ProjectType;
  // For 'link' type
  url?: string;
  // For 'video' type
  videoUrl?: string;
  videoThumbnail?: string;
  // For 'bookmarklet' type
  bookmarkletCode?: string;
  bookmarkletName?: string;
  // For 'detail' type - links to project detail page
  detailSlug?: string;
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {

  const bookmarkletRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (project.type !== 'bookmarklet') return;
    if (!bookmarkletRef.current) return;

    // React blocks javascript: URLs when passed as href prop,
    // so set it imperatively after render.
    bookmarkletRef.current.setAttribute('href', project.bookmarkletCode || '');
  }, [project.type, project.bookmarkletCode]);

  const renderContent = () => {
    switch (project.type) {
      case 'video':
        return (
          <div className={styles.videoContainer}>
            <video
              className={styles.retroVideo}
              controls
              poster={project.videoThumbnail}
              preload="metadata"
            >
              <source src={project.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        );

      case 'bookmarklet':
        return (
          <div className={styles.bookmarkletContainer}>
            <p style={{ fontSize: '18px', marginBottom: '15px', color: '#000080' }}>
              Drag this button to your bookmarks bar to use it:
            </p>
            <a
              ref={bookmarkletRef}
              className={styles.bookmarkletLink}
              draggable={true}
              onDragStart={(e) => {
                e.dataTransfer.setData('text/plain', project.bookmarkletCode || '');
                e.dataTransfer.effectAllowed = 'copy';
              }}
            >
              {project.bookmarkletName || project.name}
            </a>
            <p style={{ fontSize: '16px', marginTop: '10px', color: '#000080', fontStyle: 'italic', opacity: 0.7 }}>
              (Drag to bookmarks bar, then click to use)
            </p>
          </div>
        );

      case 'detail':
        return (
          <div>
            <p style={{ fontSize: '20px', marginBottom: '15px', color: '#000080' }}>
              Read more about this project in detail:
            </p>
            <Link
              href={`/projects/${project.detailSlug}`}
              className="retro-button"
              style={{ display: 'inline-block' }}
            >
              📝 View Details →
            </Link>
          </div>
        );

      case 'link':
      default:
        return (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="retro-button"
            style={{ display: 'inline-block', marginTop: '10px' }}
          >
            View Project →
          </a>
        );
    }
  };

  return (
    <div className="retro-card">
      <h2 style={{ fontSize: '32px', marginBottom: '15px', color: '#8B008B' }}>
        {project.name}
      </h2>
      <p style={{ fontSize: '22px', marginBottom: '10px', color: '#000080' }}>
        {project.description}
      </p>
      <p style={{ fontSize: '20px', marginBottom: '15px', color: '#000080' }}>
        <strong>Tech:</strong> {project.tech}
      </p>
      {renderContent()}
    </div>
  );
}

