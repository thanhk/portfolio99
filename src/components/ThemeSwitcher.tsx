'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
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

/** The value only changes when this component changes it, so nothing notifies. */
const subscribe = () => () => {};

/** What the inline script already put on <html>. */
const getClientTheme = () => document.documentElement.dataset.theme || DEFAULT_THEME;

/** The server has no way to know the visitor's choice. */
const getServerTheme = () => DEFAULT_THEME;

/**
 * Palette picker. The choice lives in localStorage and is applied to <html>
 * before paint by the inline script in the layout, so this only has to keep
 * the two in sync.
 *
 * The stored value is read through useSyncExternalStore because it legitimately
 * differs between server and client: the server renders the default, the client
 * fills in the saved palette on hydration, and React is fine with that.
 */
export default function ThemeSwitcher() {
  const stored = useSyncExternalStore(subscribe, getClientTheme, getServerTheme);
  const [picked, setPicked] = useState<string | null>(null);
  const theme = picked ?? stored;

  // The DOM write belongs in an effect, not the click handler.
  useEffect(() => {
    if (picked === null) return;
    document.documentElement.dataset.theme = picked;
    try {
      window.localStorage.setItem(STORAGE_KEY, picked);
    } catch {
      // Private mode or blocked storage — the theme still applies for this visit.
    }
  }, [picked]);

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
              onClick={() => setPicked(option.id)}
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
