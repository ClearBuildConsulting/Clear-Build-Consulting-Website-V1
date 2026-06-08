import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';

import type { ReactNode } from 'react';
import type { Route } from './+types/root';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import './app.css';

/**
 * Document <head> links. Ported from the old index.html: favicons, web manifest,
 * and the Google Fonts preconnect + stylesheet. These render into every
 * prerendered page so the static HTML is complete on first byte.
 */
export const links: Route.LinksFunction = () => [
  { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
  { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' },
  { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16.png' },
  { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
  { rel: 'manifest', href: '/site.webmanifest' },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&family=Manrope:wght@700;800&display=swap',
  },
];

/**
 * The HTML document shell. Replaces index.html. <Meta/> and <Links/> hoist the
 * per-route SEO (rendered via React 19 native <title>/<meta> in pages) and the
 * links above into <head>. <Scripts/> wires client hydration.
 */
export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GB">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#020617" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

/**
 * The app shell: persistent Navbar + Footer around the routed page. Ported from
 * the old App.tsx wrapper. <Outlet/> renders the active route's page.
 */
export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-obsidian text-white selection:bg-focus selection:text-white">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Something went wrong';
  let details = 'An unexpected error occurred.';

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? 'Page not found' : 'Error';
    details =
      error.status === 404
        ? 'The page you are looking for does not exist.'
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-obsidian text-white px-6 text-center">
      <h1 className="font-display font-bold text-display-md mb-4">{message}</h1>
      <p className="text-structural mb-8">{details}</p>
      <a href="/" className="text-focus hover:text-white transition-colors">
        Return home
      </a>
    </main>
  );
}
