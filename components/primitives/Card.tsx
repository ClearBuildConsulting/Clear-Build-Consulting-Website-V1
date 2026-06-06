import React from 'react';

interface CardProps {
  children: React.ReactNode;
  /** Indigo accent: brighter border that lifts to full focus on hover. */
  accent?: boolean;
  className?: string;
}

/**
 * Layered surface card with a hairline border that brightens on hover. The
 * accent variant carries the indigo edge reserved for the primary (AI) service.
 */
export const Card: React.FC<CardProps> = ({ children, accent = false, className = '' }) => {
  const border = accent
    ? 'border border-focus/30 hover:border-focus'
    : 'border border-white/5 hover:border-white/20';

  return (
    <div className={`bg-surface p-8 rounded-sm transition-colors duration-300 ${border} ${className}`.trim()}>
      {children}
    </div>
  );
};
