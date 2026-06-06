import React from 'react';

interface SeoProps {
  /** Page title; the site name is appended automatically. */
  title: string;
  description: string;
  /** Path the canonical URL points at, e.g. "/ai-advisory". */
  path: string;
}

const SITE_NAME = 'Clear Build Consulting';
const ORIGIN = 'https://www.clearbuildconsulting.co.uk';

/**
 * Per-route head management using React 19 native metadata: rendering <title>
 * and <meta> from a component hoists them into <head>. Hides the mechanism so
 * pages declare intent only. react-helmet-async stays unused unless native
 * tags prove awkward (plan §4.8).
 */
export const Seo: React.FC<SeoProps> = ({ title, description, path }) => {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const canonical = `${ORIGIN}${path}`;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
    </>
  );
};
