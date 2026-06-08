import React from 'react';

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Small section label: DM Mono, uppercase, tracked, structural grey. The
 * engineer's-annotation voice that sits above a heading.
 */
export const Eyebrow: React.FC<EyebrowProps> = ({ children, className = '' }) => {
  return (
    <span
      className={`block font-mono text-xs font-medium uppercase tracking-[0.2em] text-structural ${className}`.trim()}
    >
      {children}
    </span>
  );
};
