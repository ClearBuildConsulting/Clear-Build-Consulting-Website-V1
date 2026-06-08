import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Centred content column. Wraps the repeated `container mx-auto px-6` idiom so
 * the max-width and gutter live in one place for the week-2 grid work.
 */
export const Container: React.FC<ContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={`container mx-auto px-6 ${className}`}>
      {children}
    </div>
  );
};
