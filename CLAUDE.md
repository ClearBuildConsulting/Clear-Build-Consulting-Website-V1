# Clear Build Consulting Website
**Owner:** Mike Anderson, Clear Build Consulting
**Repo:** ClearBuildConsulting/Clear-Build-Consulting-Website-V1
**Live site:** www.clearbuildconsulting.co.uk

---

## Stack

- React 19 + TypeScript
- React Router v7 **framework mode** (the Remix lineage) — `ssr: false` +
  `prerender`, i.e. static site generation. Every route is prerendered to real
  HTML at build time (crawlable), then hydrates client-side. No runtime server.
- Vite (via `@react-router/dev` plugin)
- Tailwind CSS v3 (custom obsidian/focus theme in `tailwind.config.js`)
- lucide-react (icons)

## Structure

```
/
├── react-router.config.ts  ← ssr:false + prerender list (the 5 routes)
├── vite.config.ts          ← reactRouter() plugin
├── app/
│   ├── root.tsx            ← document <head> shell + Navbar/main/Footer layout
│   ├── app.css            ← Tailwind entry + global styles
│   ├── routes.ts          ← explicit route → module map (preserves exact URLs)
│   └── routes/            ← thin modules re-exporting pages/* as default
├── pages/                 ← page bodies (one per route) — unchanged by SSG work
│   ├── Home.tsx  About.tsx  AIAdvisory.tsx  BuiltEnv.tsx  Contact.tsx
├── components/            ← shared UI (Navbar, Footer, Seo, JsonLd, …)
└── hooks/                 ← useInView, usePrefersReducedMotion
```

Per-route SEO is React 19 native: `components/Seo.tsx` renders `<title>`/`<meta>`
and `components/JsonLd.tsx` renders a JSON-LD `<script>` directly inside each
page; these hoist into `<head>` and land in the prerendered HTML.

## Dev commands

```bash
npm install       # install dependencies
npm run dev       # local dev server (react-router dev)
npm run build     # production build → build/client/ (prerenders all 5 routes)
npm run start     # serve the built static output locally (npx serve build/client)
npm run typecheck # react-router typegen && tsc
```

Build output is `build/client/` (per-route `index.html`). Vercel serves it as
static files (see `vercel.json`: `outputDirectory: build/client`, no SPA rewrite).

## Brand reference

Authoritative brand spec (colours, typography, logo paths) lives in the sibling workspace:
`../clearbuild-os/clearbuild-os/.claude/skills/clearbuild-brand.md`

Logo assets: `../clearbuild-os/clearbuild-os/assets/branding/`

## Session rules

- UK English only — no US spellings
- No hype language (see clearbuild-os identity.md for full banned word list)
- Match existing code style — no reformatting unrelated code
- Do not add dependencies without checking with Mike first
