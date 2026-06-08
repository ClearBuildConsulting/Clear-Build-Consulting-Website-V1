import React from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

interface HeroHeadlineProps {
  /** Lines of the headline; each line's words rise in sequence. */
  lines: string[];
  className?: string;
}

/**
 * The hero display headline. Words rise and fade in on load in a tight stagger,
 * line by line. Under prefers-reduced-motion (and on the prerendered first
 * paint, since the hook defaults motion off) every word is simply visible.
 */
export const HeroHeadline: React.FC<HeroHeadlineProps> = ({ lines, className = '' }) => {
  const prefersReduced = usePrefersReducedMotion();
  let wordIndex = 0;

  return (
    <h1 className={`font-display text-display-xl font-extrabold text-white ${className}`.trim()}>
      {lines.map((line, li) => {
        const words = line.split(' ');
        return (
          <span key={li} className="block">
            {words.map((word, wi) => {
              const delay = wordIndex * 40; // 40ms tight stagger
              wordIndex += 1;
              return (
                <React.Fragment key={wi}>
                  <span
                    className={`inline-block ${prefersReduced ? '' : 'animate-rise-in'}`}
                    style={prefersReduced ? undefined : { animationDelay: `${delay}ms` }}
                  >
                    {word}
                  </span>
                  {wi < words.length - 1 ? ' ' : ''}
                </React.Fragment>
              );
            })}
          </span>
        );
      })}
    </h1>
  );
};
