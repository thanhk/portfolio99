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

/**
 * 88x31 buttons. Each is icon + two lines of text, the layout nearly every real
 * one used. `icon` names a swatch in the stylesheet; add a new one there.
 */
const BUTTONS: { icon: string; top: string; bottom: string; href?: string }[] = [
  { icon: 'iconStar', top: 'thanhk', bottom: '.com' },
  { icon: 'iconBlock', top: 'built with', bottom: 'next.js', href: 'https://nextjs.org' },
  { icon: 'iconCode', top: 'code on', bottom: 'github', href: 'https://github.com/thanhk' },
];

/** Bumped by hand when the site changes — it's a vibe, not a build timestamp. */
const LAST_UPDATED = 'aug 2026';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={`${styles.box} ${styles.identity}`}>
        <div className={styles.boxHead}>profile</div>
        <div className={styles.boxBody}>
          <div className={styles.profileRow}>
            <span className={styles.avatar} aria-hidden="true">SK</span>
            <span>
              <span className={styles.name}>steven khuu</span>
              <span className={styles.handle}>@thanhk</span>
            </span>
          </div>
          <p className={styles.tagline}>
            software engineer. vibe coder and chill maxxer.
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

      <div className={styles.box}>
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
              <span className={styles.key}>coke zero:</span> yes
            </li>
            <li>
              <span className={styles.key}>updated:</span> {LAST_UPDATED}
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.box}>
        <div className={styles.boxHead}>buttons</div>
        <div className={styles.boxBody}>
          <div className={styles.buttons}>
            {BUTTONS.map((button) => {
              const inner = (
                <>
                  <span className={`${styles.badgeIcon} ${styles[button.icon]}`} aria-hidden="true" />
                  <span className={styles.badgeText}>
                    <span>{button.top}</span>
                    <span>{button.bottom}</span>
                  </span>
                </>
              );

              return button.href ? (
                <a
                  key={button.top}
                  className={styles.badge}
                  href={button.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`${button.top} ${button.bottom}`}
                >
                  {inner}
                </a>
              ) : (
                <span key={button.top} className={styles.badge} title={`${button.top} ${button.bottom}`}>
                  {inner}
                </span>
              );
            })}
          </div>
        </div>
      </div>

    </aside>
  );
}
