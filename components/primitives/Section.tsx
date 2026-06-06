import React from 'react';

type Spacing = 'large' | 'standard' | 'tight' | 'none';

interface SectionProps {
  children: React.ReactNode;
  /** Vertical rhythm on the 8px base. Defaults to standard (py-24). */
  spacing?: Spacing;
  /** Add the hairline top divider used between sections. */
  dividerTop?: boolean;
  /** Add a hairline bottom divider (used under the hero). */
  dividerBottom?: boolean;
  className?: string;
  id?: string;
}

const SPACING: Record<Spacing, string> = {
  large: 'py-32',
  standard: 'py-24',
  tight: 'py-16',
  none: '',
};

/**
 * A page section: vertical rhythm plus optional hairline dividers. Pass a
 * className to override padding where a layout needs an asymmetric block
 * (e.g. the hero's pt-24 pb-20). The week-2 revamp tunes spacing here once.
 */
export const Section: React.FC<SectionProps> = ({
  children,
  spacing = 'standard',
  dividerTop = false,
  dividerBottom = false,
  className = '',
  id,
}) => {
  const borders = [
    dividerTop ? 'border-t border-white/5' : '',
    dividerBottom ? 'border-b border-white/5' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section id={id} className={`${SPACING[spacing]} ${borders} ${className}`.trim()}>
      {children}
    </section>
  );
};
