'use client';

import { useEffect, useState, useRef } from 'react';
import styles from './AnimatedBackground.module.css';

interface Sprite {
  id: number;
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  size: number;
  image: string;
}

export default function AnimatedBackground() {
  const [sprites, setSprites] = useState<Sprite[]>([]);
  const hasInitialized = useRef(false);

  useEffect(() => {
    // Initialize sprites only once on client side to prevent hydration mismatch
    // This is necessary because Math.random() produces different values on server vs client
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const initialSprites: Sprite[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      size: 40 + Math.random() * 40, // 40-80px
      image: `sprite-${i % 4}`, // Cycle through different sprite types
    }));

    // Necessary to set state in effect to prevent hydration mismatch with Math.random()
     
    setSprites(initialSprites);
  }, []);

  useEffect(() => {
    if (sprites.length === 0) return;

    // Animation loop
    const interval = setInterval(() => {
      setSprites((prev) =>
        prev.map((sprite) => {
          let newX = sprite.x + sprite.speedX;
          let newY = sprite.y + sprite.speedY;

          // Wrap around edges
          if (newX > 100) newX = -10;
          if (newX < -10) newX = 100;
          if (newY > 100) newY = -10;
          if (newY < -10) newY = 100;

          return {
            ...sprite,
            x: newX,
            y: newY,
          };
        })
      );
    }, 50); // Update every 50ms for smooth animation

    return () => clearInterval(interval);
  }, [sprites.length]);

  return (
    <div className={styles.background}>
      {sprites.map((sprite) => (
        <div
          key={sprite.id}
          className={`${styles.sprite} ${styles[`sprite-${sprite.image}`]}`}
          style={{
            left: `${sprite.x}%`,
            top: `${sprite.y}%`,
            width: `${sprite.size}px`,
            height: `${sprite.size}px`,
          }}
        />
      ))}
    </div>
  );
}

