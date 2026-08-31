'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';

const navItems = [
  { href: '/', label: 'home' },
  { href: '/projects', label: 'projects' },
  { href: '/links', label: 'links' },
  { href: '/blog', label: 'blog' },
];

/** Bumped by hand when the site changes — it's a vibe, not a build timestamp. */
const LAST_UPDATED = 'aug 2026';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={`${styles.box} ${styles.identity}`}>
        <div className={styles.boxBody}>
          <Link href="/" className={styles.name} style={{ textDecoration: 'none' }}>
            STEVEN KHUU
          </Link>
          <span className={styles.handle}>@thanhk</span>
          <p className={styles.tagline}>
            software engineer. builds things, breaks things, writes them down.
          </p>
        </div>
      </div>

      <nav className={`${styles.box} ${styles.navBox}`}>
        <div className={styles.boxHead}>navigate</div>
        <div className={styles.boxBody}>
          <ul className={styles.navList}>
            {navItems.map((item) => {
              const isActive = pathname === item.href
                || (item.href !== '/' && pathname.startsWith(`${item.href}/`));
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      <div className={`${styles.box} ${styles.statusBox}`}>
        <div className={styles.boxHead}>status</div>
        <div className={styles.boxBody}>
          <ul className={styles.statusList}>
            <li>
              <span className={styles.key}>state:</span>{' '}
              <span className={styles.online}>
                <span className={`${styles.dot} blink`}>●</span>online
              </span>
            </li>
            <li>
              <span className={styles.key}>now:</span> building mise
            </li>
            <li>
              <span className={styles.key}>coffee:</span> yes
            </li>
            <li>
              <span className={styles.key}>updated:</span> {LAST_UPDATED}
            </li>
          </ul>
        </div>
      </div>

      <div className={`${styles.box} ${styles.buttonsBox}`}>
        <div className={styles.boxHead}>buttons</div>
        <div className={styles.boxBody}>
          <div className={styles.buttons}>
            <span className={styles.badge}>thanhk.com ★</span>
            <a
              className={`${styles.badge} ${styles.badgeAlt}`}
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              built with next.js
            </a>
            <a
              className={styles.badge}
              href="https://github.com/thanhk"
              target="_blank"
              rel="noopener noreferrer"
            >
              code on github
            </a>
            <span className={`${styles.badge} ${styles.badgeAlt}`}>
              best viewed with eyes
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
