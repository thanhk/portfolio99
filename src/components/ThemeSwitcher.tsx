'use client';

import { useEffect, useState } from 'react';
import styles from './Sidebar.module.css';

export const THEMES = [
  { id: 'midnight', label: 'midnight' },
  { id: 'parchment', label: 'parchment' },
  { id: 'skyline', label: 'skyline' },
  { id: 'blossom', label: 'blossom' },
  { id: 'system', label: 'system' },
] as const;

export const DEFAULT_THEME = 'midnight';
export const STORAGE_KEY = 'thanhk-theme';

/**
 * Palette picker. The choice lives in localStorage and is applied to <html>
 * before paint by the inline script in the layout, so switching themes here
 * only has to keep the two in sync.
 */
export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<string>(DEFAULT_THEME);

  // Read the value the inline script already applied, so the buttons agree
  // with the page on first render instead of flashing the default.
  useEffect(() => {
    const current = document.documentElement.dataset.theme;
    if (current) setTheme(current);
  }, []);

  const choose = (id: string) => {
    document.documentElement.dataset.theme = id;
    setTheme(id);
    try {
      window.localStorage.setItem(STORAGE_KEY, id);
    } catch {
      // Private mode or blocked storage — the theme still applies for this visit.
    }
  };

  return (
    <div className={`${styles.box} ${styles.themeBox}`}>
      <div className={styles.boxHead}>theme</div>
      <div className={styles.boxBody}>
        <div className={styles.themeList}>
          {THEMES.map((option) => (
            <button
              key={option.id}
              type="button"
              className={`${styles.themeButton} ${theme === option.id ? styles.themeActive : ''}`}
              aria-pressed={theme === option.id}
              onClick={() => choose(option.id)}
            >
              <span className={`${styles.swatch} ${styles[`swatch-${option.id}`]}`} aria-hidden="true" />
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
