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
/** Shared 1200x630 share image (monogram + wordmark on obsidian). */
const OG_IMAGE = `${ORIGIN}/og.png`;

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

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_GB" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />
    </>
  );
};
