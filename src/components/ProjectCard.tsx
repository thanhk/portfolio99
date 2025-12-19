'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './ProjectCard.module.css';

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
  url?: string; // External link
  mediaPosition?: 'left' | 'center' | 'right'; // Horizontal position of media on the right side
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const bookmarkletRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (!project.bookmarkletCode) return;
    if (!bookmarkletRef.current) return;

    // React blocks javascript: URLs when passed as href prop,
    // so set it imperatively after render.
    bookmarkletRef.current.setAttribute('href', project.bookmarkletCode);
  }, [project.bookmarkletCode]);

  const hasAnyFeature = project.videoUrl || project.imageUrl || project.bookmarkletCode || project.detailSlug || project.url;

  const hasMedia = project.imageUrl || project.videoUrl;

  // Get media container style based on position
  // Content always on left, media always on right, but with horizontal variation
  const getMediaContainerStyle = (): React.CSSProperties => {
    const position = project.mediaPosition || 'right';
    const baseStyle: React.CSSProperties = {
      flexShrink: 0,
      maxWidth: '300px',
      alignSelf: 'flex-start',
    };

    switch (position) {
      case 'left':
        // Media on right side, but positioned more toward center (less margin from right)
        return { ...baseStyle, marginLeft: 'auto', marginRight: '40px' };
      case 'center':
        // Media on right side, centered in the right area
        return { ...baseStyle, marginLeft: 'auto', marginRight: '20px' };
      case 'right':
      default:
        // Media on right side, aligned to far right (default)
        return { ...baseStyle, marginLeft: 'auto', marginRight: '0' };
    }
  };

  return (
    <div className="retro-card">
      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {/* Content - Always on left */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h2 style={{ fontSize: '32px', marginBottom: '15px', color: '#8B008B' }}>
            {project.name}
          </h2>
          <p style={{ fontSize: '22px', marginBottom: '10px', color: '#000080' }}>
            {project.description}
          </p>
          <p style={{ fontSize: '20px', marginBottom: '15px', color: '#000080' }}>
            <strong>Tech:</strong> {project.tech}
          </p>
          
          {/* Bookmarklet */}
          {project.bookmarkletCode && (
            <div className={styles.bookmarkletContainer} style={{ marginBottom: '20px' }}>
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
                🔖 {project.bookmarkletName || project.name}
              </a>
              <p style={{ fontSize: '16px', marginTop: '10px', color: '#000080', fontStyle: 'italic', opacity: 0.7 }}>
                (Drag to bookmarks bar, then click to use)
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: hasAnyFeature ? '10px' : '0' }}>
            {project.detailSlug && (
              <Link
                href={`/projects/${project.detailSlug}`}
                className="retro-button"
                style={{ display: 'inline-block' }}
              >
                📝 View Details →
              </Link>
            )}
            
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="retro-button"
                style={{ display: 'inline-block' }}
              >
                🔗 View Project →
              </a>
            )}
          </div>
        </div>

        {/* Media - Always on right, but with horizontal variation */}
        {hasMedia && (
          <div style={getMediaContainerStyle()}>
            {/* Image/GIF Demo */}
            {project.imageUrl && (
              <img
                src={project.imageUrl}
                alt={project.name}
                className={styles.retroMedia}
              />
            )}

            {/* Video Demo */}
            {project.videoUrl && (
              <video
                className={styles.retroMedia}
                controls
                {...(project.videoThumbnail && { poster: project.videoThumbnail })}
                preload="metadata"
              >
                <source src={project.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

