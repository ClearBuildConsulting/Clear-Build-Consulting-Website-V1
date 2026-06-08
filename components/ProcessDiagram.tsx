import React, { useState } from 'react';
import { useInView } from '../hooks/useInView';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

interface Step {
  label: string;
  detail: string;
}

const STEPS: Step[] = [
  {
    label: 'Map reality',
    detail:
      'We start by understanding how your operations actually run, not how the org chart says they do. No tooling decisions until the picture is clear.',
  },
  {
    label: 'Identify friction',
    detail:
      'We find where time, judgement and money leak: the manual handoffs, the rework, the decisions made without the right information.',
  },
  {
    label: 'Define the path',
    detail:
      'A clear, prioritised plan. Where AI delivers measurable improvement, what it costs, and what to leave well alone.',
  },
  {
    label: 'Implement with discipline',
    detail:
      'We put the right solutions in place and measure the result against the friction we set out to remove.',
  },
];

/**
 * The AI audit methodology as a horizontal 4-step pathway. The connecting line
 * draws itself in on scroll into view; each node expands to show its detail on
 * hover or tap. Reused as the spine of the AI Advisory page.
 *
 * Respects prefers-reduced-motion (line shown drawn, no transition) and the
 * prerender case (IntersectionObserver absent -> inView true via the hook).
 */
export const ProcessDiagram: React.FC<{ className?: string }> = ({ className = '' }) => {
  const prefersReduced = usePrefersReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3, once: true });
  const [active, setActive] = useState<number | null>(null);
  const drawn = inView || prefersReduced;

  return (
    <div ref={ref} className={className}>
      {/* Connecting line: full width behind the nodes on desktop. */}
      <div className="relative">
        <div
          className="hidden md:block absolute top-5 left-0 h-px bg-focus origin-left"
          style={{
            width: '100%',
            transform: drawn ? 'scaleX(1)' : 'scaleX(0)',
            transition: prefersReduced ? undefined : 'transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />

        <ol className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 relative">
          {STEPS.map((step, i) => {
            const isOpen = active === i;
            return (
              <li
                key={i}
                className="relative"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
              >
                <button
                  type="button"
                  className="text-left w-full group focus:outline-none focus-visible:ring-1 focus-visible:ring-focus rounded-sm"
                  onClick={() => setActive(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  {/* Node */}
                  <span className="flex items-center gap-3 mb-4">
                    <span
                      className="flex-shrink-0 w-10 h-10 rounded-full bg-obsidian border border-focus/40 flex items-center justify-center font-mono text-sm text-focus group-hover:border-focus group-hover:bg-focus/10 transition-colors"
                      style={{
                        opacity: drawn ? 1 : 0,
                        transform: drawn ? 'scale(1)' : 'scale(0.8)',
                        transition: prefersReduced
                          ? undefined
                          : `opacity 0.4s ease-out ${0.3 + i * 0.18}s, transform 0.4s ease-out ${0.3 + i * 0.18}s`,
                      }}
                    >
                      {i + 1}
                    </span>
                  </span>

                  <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-focus transition-colors">
                    {step.label}
                  </h3>

                  <p
                    className="text-structural text-sm leading-relaxed overflow-hidden transition-all duration-300 ease-out"
                    style={{
                      maxHeight: isOpen ? '12rem' : '0',
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    {step.detail}
                  </p>
                  <span className="md:hidden text-xs font-mono text-focus/70 mt-1 inline-block">
                    {isOpen ? '—' : '+'}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};
