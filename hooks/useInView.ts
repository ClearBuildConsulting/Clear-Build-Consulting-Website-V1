import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions {
  /** Fraction of the element visible before it counts as in view. */
  threshold?: number;
  /** Margin around the root, e.g. to trigger slightly before entry. */
  rootMargin?: string;
  /** Fire once and then stop observing (default true). */
  once?: boolean;
}

/**
 * Tracks whether an element has entered the viewport.
 *
 * Returns a ref to attach and a boolean. Used by Reveal to drive scroll-in
 * animation via IntersectionObserver. No animation library: CSS-first.
 *
 * Respects prefers-reduced-motion at the call site (Reveal) rather than here,
 * so the observed state stays a pure "is it visible" signal.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.15,
  rootMargin = '0px',
  once = true,
}: UseInViewOptions = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // No IntersectionObserver (old browser, or prerender environment):
    // fail open so content is always shown rather than stuck hidden.
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setInView(false);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, inView };
}
