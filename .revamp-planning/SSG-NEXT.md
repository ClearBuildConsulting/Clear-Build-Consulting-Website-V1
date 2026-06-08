# Next milestone: crawlable HTML via React Router v7 native SSG

**Status:** deferred from Day 10 (2026-06-08). The redesign ships as a clean SPA;
this is the dedicated follow-up to make the site fully crawlable.

## Why this is a separate piece of work

The site is currently a client-rendered SPA: the raw HTML a crawler sees has an
empty `<div id="root">`. Real visitors are fine; Google can execute the JS and
index it, but slower and less reliably than served HTML. The goal of this
milestone is to ship real, prerendered HTML per route.

## What we tried on Day 10 and why it was abandoned

Two build-time prerender approaches were attempted and **both fail to hydrate
this design**:

1. **react-snap** — abandonware. Ships a 2019 Chromium that can't parse modern
   JS (`?.`/`??`), produces empty HTML. Only worked when hand-pointed at a system
   Chrome, which Vercel's build won't have. Dropped.

2. **Custom Puppeteer snapshot script** (`page.content()` per route) — Puppeteer
   25 with its own modern Chrome; produced correct static HTML with content +
   JSON-LD + meta for all 5 routes. **But hydration fails site-wide** with React
   error #418.

### The root cause (important — don't repeat the attempt)

Snapshotting via `page.content()` returns the **browser's re-serialized DOM**,
where inline styles are normalized:
- `transform: translate3d(0,0,0)` → `translate3d(0px, 0px, 0px)`
- `maxHeight: 0` (React camelCase, unitless) → `max-height: 0px`
- `strokeDasharray: 1` → `stroke-dasharray: "1"`

React's `style={{}}` objects hydrate to the *original un-normalized* values, so
they can never match the snapshot. This design uses inline `style={{}}` heavily
(StructuralLattice SVG draw, ProcessDiagram, Reveal, CountUp, HeroHeadline), so
the mismatch is pervasive and **not patchable per-component**. It is a
fundamental snapshot-vs-React-SSR incompatibility.

(Two unrelated, genuine mismatches were also found and are worth remembering:
Footer `new Date().getFullYear()`, and CountUp rendering `{prefix}{value}{suffix}`
as adjacent text nodes that merge on reparse. The CountUp fix was kept.)

## The recommended path: React Router v7 native SSG

`vite-react-ssg`'s own maintainer says: on **React Router v7** (our version), use
RR7's built-in SSG, not vite-react-ssg. RR7 renders HTML the React way (no
browser re-serialization), so the inline-style mismatch **cannot occur**.

This is a routing/entry-point restructure into RR7 framework mode (the Remix
lineage). It is the largest change in the project and deserves its own session
with its own plan — do not bolt it on at the end of an unrelated session.

### Starting points for next session
- RR7 framework mode / SSG docs (prerendering config).
- The app is a clean standard Vite + React + RR SPA at commit `11ddb66` — good base.
- Routes to prerender: `/`, `/ai-advisory`, `/built-environment`, `/about`,
  `/contact` (matches `public/sitemap.xml`).
- All per-route SEO (titles, canonicals, OG/Twitter, JSON-LD) already exists in
  `components/Seo.tsx` + `components/schema.ts` + per-page `<JsonLd>`; they render
  client-side today and need to land in the prerendered HTML.
- Watch the same hydration-determinism gotchas: motion hooks default off until
  mount (fine for true SSR), the Footer year, and adjacent text nodes.
