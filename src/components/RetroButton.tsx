import Link from 'next/link';
import { ReactNode } from 'react';

interface RetroButtonProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

export default function RetroButton({ href, onClick, children, className = '' }: RetroButtonProps) {
  const buttonClass = `retro-button ${className}`;

  if (href) {
    return (
      <Link href={href} className={buttonClass}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={buttonClass}>
      {children}
    </button>
  );
}

