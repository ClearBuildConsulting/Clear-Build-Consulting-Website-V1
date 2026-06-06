import React, { useEffect, useRef, useState } from 'react';
import { useInView } from '../hooks/useInView';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

interface CountUpProps {
  /** The final value to count to. */
  to: number;
  /** Optional suffix rendered after the number, e.g. '+' or '%'. */
  suffix?: string;
  /** Optional prefix, e.g. '£'. */
  prefix?: string;
  /** Duration of the count in ms. */
  duration?: number;
  className?: string;
}

/**
 * Counts a metric up from zero once, the first time it scrolls into view.
 * Respects prefers-reduced-motion (and the prerender/no-JS case) by showing the
 * final value immediately. Eased so it decelerates into the target.
 */
export const CountUp: React.FC<CountUpProps> = ({
  to,
  suffix = '',
  prefix = '',
  duration = 1400,
  className = '',
}) => {
  const prefersReduced = usePrefersReducedMotion();
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.4, once: true });
  const [value, setValue] = useState(prefersReduced ? to : 0);
  const started = useRef(false);

  useEffect(() => {
    if (prefersReduced) {
      setValue(to);
      return;
    }
    if (!inView || started.current) return;
    started.current = true;

    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * to));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, prefersReduced, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
};
