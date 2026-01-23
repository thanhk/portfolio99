'use client';

import { useEffect, useRef, useState } from 'react';
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
  bookmarkletSource?: string; // Unminified source code for transparency
  detailSlug?: string;
  url?: string; // External link
  mediaPosition?: 'left' | 'center' | 'right'; // Horizontal position of media on the right side
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const bookmarkletRef = useRef<HTMLAnchorElement | null>(null);
  const [showSource, setShowSource] = useState(false);

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
      <div className={styles.cardContainer}>
        {/* Top section: Content and Media side by side on desktop */}
        <div className={styles.topSection}>
          {/* Content - Always on left */}
          <div className={styles.contentWrapper}>
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

                {/* Source Code Viewer */}
                {project.bookmarkletSource && (
                  <div style={{ marginTop: '20px' }}>
                    <button
                      onClick={() => setShowSource(!showSource)}
                      className="retro-button"
                      style={{
                        fontSize: '16px',
                        padding: '8px 16px',
                        backgroundColor: showSource ? '#8B008B' : '#4169E1',
                        color: 'white'
                      }}
                    >
                      {showSource ? '🔒 Hide Source Code' : '🔍 View Source Code'}
                    </button>
                    <p style={{ fontSize: '14px', marginTop: '8px', color: '#000080', opacity: 0.8 }}>
                      For security: Review the code before using
                    </p>

                    {showSource && (
                      <div style={{
                        marginTop: '15px',
                        padding: '15px',
                        backgroundColor: '#f5f5f5',
                        border: '2px solid #000080',
                        borderRadius: '4px',
                        maxHeight: '500px',
                        overflowY: 'auto'
                      }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '10px'
                        }}>
                          <p style={{
                            fontSize: '16px',
                            fontWeight: 'bold',
                            color: '#8B008B',
                            margin: 0
                          }}>
                            Unminified Source Code
                          </p>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(project.bookmarkletSource || '');
                              alert('Source code copied to clipboard!');
                            }}
                            className="retro-button"
                            style={{ fontSize: '14px', padding: '4px 12px' }}
                          >
                            📋 Copy
                          </button>
                        </div>
                        <pre style={{
                          fontSize: '13px',
                          lineHeight: '1.5',
                          color: '#000',
                          margin: 0,
                          whiteSpace: 'pre-wrap',
                          wordWrap: 'break-word',
                          fontFamily: 'Monaco, Consolas, "Courier New", monospace'
                        }}>
                          <code>{project.bookmarkletSource}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
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

          {/* Action Buttons */}
          <div className={styles.actionButtons} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: hasAnyFeature ? '10px' : '0' }}>
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
      </div>
    </div>
  );
}

