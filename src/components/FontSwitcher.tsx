'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import styles from './Sidebar.module.css';

const FONTS = [
  { id: 'terminal', label: 'terminal', note: 'vt323' },
  { id: 'eggseed', label: 'eggseed', note: 'times' },
  { id: 'falsedawn', label: 'false dawn', note: 'calibri' },
  { id: 'daikonet', label: 'daikonet', note: 'pgothic' },
  { id: 'broadsheet', label: 'broadsheet', note: 'georgia' },
  { id: 'typewriter', label: 'typewriter', note: 'courier' },
] as const;

const DEFAULT_FONT = 'terminal';
const STORAGE_KEY = 'thanhk-font';

const subscribe = () => () => {};
const getClientFont = () => document.documentElement.dataset.font || DEFAULT_FONT;
const getServerFont = () => DEFAULT_FONT;

/**
 * Temporary: a font trial, so type can be judged on the real pages rather than
 * in the abstract. Remove this component, its styles, the inline script in the
 * layout, and the unused families once a set is picked.
 */
export default function FontSwitcher() {
  const stored = useSyncExternalStore(subscribe, getClientFont, getServerFont);
  const [picked, setPicked] = useState<string | null>(null);
  const font = picked ?? stored;

  useEffect(() => {
    if (picked === null) return;
    document.documentElement.dataset.font = picked;
    try {
      window.localStorage.setItem(STORAGE_KEY, picked);
    } catch {
      // Blocked storage — the choice still applies for this visit.
    }
  }, [picked]);

  return (
    <div className={styles.box}>
      <div className={styles.boxHead}>font trial</div>
      <div className={styles.boxBody}>
        <div className={styles.pickList}>
          {FONTS.map((option) => (
            <button
              key={option.id}
              type="button"
              className={`${styles.pickButton} ${font === option.id ? styles.pickActive : ''}`}
              aria-pressed={font === option.id}
              onClick={() => setPicked(option.id)}
            >
              {option.label}
              <span className={styles.pickNote}>{option.note}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
