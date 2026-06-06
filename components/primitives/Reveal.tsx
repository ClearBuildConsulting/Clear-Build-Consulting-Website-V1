import React from 'react';
import { useInView } from '../../hooks/useInView';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface RevealProps {
  children: React.ReactNode;
  /** Stagger delay in ms, for grouped items revealing in sequence. */
  delay?: number;
  /** Render as this element instead of a div (e.g. 'li'). */
  as?: React.ElementType;
  className?: string;
}

/**
 * Scroll-reveal: fades and lifts its children 16px on first entry into the
 * viewport. CSS transition only, no animation library. Respects
 * prefers-reduced-motion (renders immediately, no transform) and degrades to
 * always-visible where IntersectionObserver is absent (prerender, old browser).
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  as: Tag = 'div',
  className = '',
}) => {
  const prefersReduced = usePrefersReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15, once: true });

  // Always render the same element with the ref attached, so the observer
  // stays bound across the prefers-reduced-motion flip on mount. Reduced
  // motion (and the not-yet-revealed initial state) only changes the classes:
  // when reduced, we never apply the opacity/transform, so content shows as-is.
  const Element = Tag;
  const animate = !prefersReduced;
  const hidden = animate && !inView;

  return (
    <Element
      ref={ref}
      className={`${animate ? 'transition-all duration-[550ms] ease-out will-change-[opacity,transform] ' : ''}${
        hidden ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
      } ${className}`.trim()}
      style={animate && delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Element>
  );
};
