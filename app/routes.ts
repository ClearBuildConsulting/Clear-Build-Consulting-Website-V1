import { type RouteConfig, index, route } from '@react-router/dev/routes';

/**
 * Explicit route config (not file-system routing) to preserve the exact public
 * URLs. Each module re-exports an existing page component as its default.
 */
export default [
  index('routes/home.tsx'),
  route('ai-advisory', 'routes/ai-advisory.tsx'),
  route('built-environment', 'routes/built-environment.tsx'),
  route('about', 'routes/about.tsx'),
  route('contact', 'routes/contact.tsx'),
] satisfies RouteConfig;
