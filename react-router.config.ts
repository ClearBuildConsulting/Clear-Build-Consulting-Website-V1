import type { Config } from '@react-router/dev/config';

/**
 * Static site generation, no runtime server.
 *
 * `ssr: false` + `prerender` renders each listed route to a real HTML file at
 * build time using React's own renderToString (not a browser DOM snapshot), so
 * the inline-style normalisation mismatch that broke the Day-10 Puppeteer
 * approach cannot occur. Output is plain static files served by Vercel.
 */
export default {
  ssr: false,
  prerender: ['/', '/ai-advisory', '/built-environment', '/about', '/contact'],
} satisfies Config;
