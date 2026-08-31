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
  /** Short tag shown in the card's title bar, e.g. "new". Blinks, on purpose. */
  tag?: string;
  /** Year the project was started. */
  year?: string;
  /** Where it stands now — "live", "beta", "done". */
  status?: string;
  url?: string; // External link (e.g., GitHub repo)
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

  // Get media container class based on position
  const getMediaContainerClass = (): string => {
    const position = project.mediaPosition || 'right';
    const positionClass = position === 'left' ? styles.mediaPositionLeft :
                         position === 'center' ? styles.mediaPositionCenter :
                         styles.mediaPositionRight;
    return `${styles.mediaContainer} ${positionClass}`;
  };

  return (
    <div className="retro-card">
      <div className="panel-head">
        <h2 style={{ fontSize: '22px', margin: 0, color: 'inherit', letterSpacing: 'inherit', fontFamily: 'inherit' }}>{project.name}</h2>
        <span className="right">
          {project.year && <span className="meta">[{project.year}]</span>}
          {project.status && <span style={{ marginLeft: '8px' }}>{project.status}</span>}
          {project.tag && (
            <span className="tag-new blink" style={{ marginLeft: '8px' }}>{project.tag}</span>
          )}
        </span>
      </div>
      <div className={styles.cardContainer}>
        {/* Top section: Content and Media side by side on desktop */}
        <div className={styles.topSection}>
          {/* Content - Always on left */}
          <div className={styles.contentWrapper}>
            <div className={styles.contentText}>
              <p style={{ fontSize: '22px', marginBottom: '10px', color: 'var(--ink)' }}>
                {project.description}
              </p>
              <div className="chips">
                {project.tech.split(',').map((item) => (
                  <span key={item} className="chip">{item.trim()}</span>
                ))}
              </div>

              {/* Bookmarklet */}
              {project.bookmarkletCode && (
                <div className={styles.bookmarkletContainer} style={{ marginBottom: '20px' }}>
                  <p style={{ fontSize: '18px', marginBottom: '15px', color: 'var(--ink)' }}>
                    drag this button to your bookmarks bar to use it:
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
                    &#9660; {project.bookmarkletName || project.name}
                  </a>
                  <p style={{ fontSize: '16px', marginTop: '10px', color: 'var(--ink)', fontStyle: 'italic', opacity: 0.7 }}>
                    (Drag to bookmarks bar, then click to use)
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons - Inside content wrapper to fill dead space */}
            <div className={styles.actionButtons} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: hasAnyFeature ? '10px' : '0' }}>
              {project.detailSlug && (
                <Link
                  href={`/projects/${project.detailSlug}`}
                  className="retro-button"
                  style={{ display: 'inline-block' }}
                >
                  &gt;&gt; view details
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
                  &gt;&gt; visit site
                </a>
              )}
            </div>
          </div>

          {/* Media - On right for desktop, before action buttons for mobile */}
          {hasMedia && (
            <div className={getMediaContainerClass()}>
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
    </div>
  );
}

