'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './ProjectCard.module.css';
import type { Project } from '@/lib/projects';

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

  const hasMedia = project.imageUrl || project.videoUrl;

  return (
    <div className="retro-card">
      <div className="panel-head">
        <h2 style={{ fontSize: '1.375rem', margin: 0, color: 'inherit', letterSpacing: 'inherit', fontFamily: 'inherit' }}>{project.name}</h2>
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
              <p style={{ fontSize: '1.25rem', marginBottom: '12px', color: 'var(--ink)' }}>
                {project.description}
              </p>
              <div className="chips">
                {project.tech.split(',').map((item) => (
                  <span key={item} className="chip">{item.trim()}</span>
                ))}
              </div>

              {/* Bookmarklet */}
              {project.bookmarkletCode && (
                <div className={styles.bookmarkletContainer}>
                  <p style={{ fontSize: '1.125rem', marginBottom: '12px', color: 'var(--ink-dim)' }}>
                    drag to your bookmarks bar, then click it on instagram:
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
                </div>
              )}
            </div>

            {/* Actions read as links, not buttons — this is a page of entries,
                not an app. */}
            <div className={styles.cardLinks}>
              {project.detailSlug && (
                <Link href={`/projects/${project.detailSlug}`} className={styles.cardLink}>
                  view details
                </Link>
              )}

              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.cardLink}
                >
                  visit site
                </a>
              )}
            </div>
          </div>

          {/* Media - On right for desktop, before action buttons for mobile */}
          {hasMedia && (
            <div className={styles.mediaContainer}>
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

