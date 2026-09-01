'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './ProjectCard.module.css';
import type { Project } from '@/lib/projects';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const bookmarkletRef = useRef<HTMLAnchorElement | null>(null);
  const codeRef = useRef<HTMLTextAreaElement | null>(null);
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    const code = project.bookmarkletCode;
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      // No clipboard permission (or an insecure origin) — select it instead so
      // the reader can copy by hand.
      codeRef.current?.select();
      return;
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

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

              {/* Bookmarklet: a little source window, the way these were
                  handed out — the code is right there to read and copy, and
                  the tag beside it is the drag-to-install path. */}
              {project.bookmarkletCode && (
                <div className={styles.win}>
                  <div className={styles.winBar}>
                    <span>{(project.bookmarkletName || project.name).toLowerCase()}.js</span>
                    <span className={styles.winBytes}>
                      {(project.bookmarkletCode.length / 1024).toFixed(1)} kb
                    </span>
                  </div>
                  <textarea
                    ref={codeRef}
                    className={styles.winCode}
                    readOnly
                    spellCheck={false}
                    value={project.bookmarkletCode}
                    onFocus={(e) => e.currentTarget.select()}
                    aria-label={`${project.bookmarkletName || project.name} source`}
                  />
                  <div className={styles.winFoot}>
                    <a
                      ref={bookmarkletRef}
                      className={styles.bookmarkletTag}
                      draggable={true}
                      onDragStart={(e) => {
                        e.dataTransfer.setData('text/plain', project.bookmarkletCode || '');
                        e.dataTransfer.effectAllowed = 'copy';
                      }}
                    >
                      {project.bookmarkletName || project.name}
                    </a>
                    <button type="button" className={styles.winCopy} onClick={copyCode}>
                      {copied ? 'copied!' : 'copy'}
                    </button>
                    <span className={styles.winHint}>drag the tag up to your bookmarks bar</span>
                  </div>
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

