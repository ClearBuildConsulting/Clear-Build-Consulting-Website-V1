# RR7 native SSG — execution plan

**Goal:** every route ships real, crawlable, prerendered HTML (content + meta +
JSON-LD already in the served document), with no runtime server — served from
Vercel static hosting exactly as today. Outcome verified by `curl`-ing the built
HTML and seeing real markup inside `<div id="root">`, plus all 5 routes
hydrating clean in a browser (no React #418/#418-class errors).

**Approach:** RR7 **framework mode** with `ssr: false` + `prerender` (decided
2026-06-08). This renders HTML *the React way* (`renderToString` server-side),
so the Day-10 snapshot-vs-React style-normalisation mismatch **cannot recur**.

**Base:** clean SPA at `14dafc5` (branch `website-revamp/week1-plumbing`,
merged to `main` as `d5a9a3`). New work on a fresh branch off `main`.

---

## Key facts that shape this plan (from RR7 7.17 docs)

- `ssr: false` + `prerender: [...]` → static `.html` per path written to
  `build/client/`, **no runtime server needed**. Matches our static hosting.
- React 19 native `<title>`/`<meta>` rendering is **supported and recommended**
  inside framework mode (docs say prefer it over the `meta` export). So
  **`Seo.tsx` and `JsonLd.tsx` keep working unchanged** — they hoist into
  `<head>` server-side. This is the big simplification: we are NOT rewriting all
  SEO into route `meta` exports.
- With `ssr:false` + prerender, routes may have `loader`s only if matched by a
  prerender path. We have **no loaders** (purely static pages) → none of the
  `action`/`headers` restrictions bite us.
- Framework mode requires: `react-router.config.ts`, `app/` dir with `root.tsx`
  + `routes.ts` + route modules, the `@react-router/dev/vite` plugin (replaces
  the bare `@vitejs/plugin-react`), and CLI scripts (`react-router build/dev`).
- `index.html` + `index.tsx` go away — `root.tsx`'s `Layout` owns the document
  shell; RR injects `<Scripts/>` for hydration.

## What stays exactly as-is (de-risking)

- **Tailwind v3** (postcss.config.js + tailwind.config.js + custom obsidian/focus
  theme). We do NOT adopt the template's Tailwind v4 `@tailwindcss/vite`. CSS is
  imported into `root.tsx` instead of `index.tsx`. Zero design change intended.
- All `pages/*.tsx` page bodies and all `components/*` — content unchanged. Pages
  become route-module `default` exports; their JSX is untouched.
- `Seo.tsx`, `JsonLd.tsx`, `schema.ts` — unchanged.
- `public/` (favicons, og.png, sitemap.xml, robots.txt, capability-pack) — RR
  serves `public/` as static assets, unchanged.
- `vercel.json` — revisit only if output dir changes (see Step 8).

---

## Hydration-determinism gotchas to honour (carried from SSG-NEXT.md)

These are the *real* SSR mismatches (unrelated to the abandoned snapshot bug).
True React SSR will flag them, so handle up front:

1. **Footer `new Date().getFullYear()`** — runs at build time server-side and at
   runtime client-side; if the year rolls over between build and view it
   mismatches. Low risk but: compute the year once at module scope / accept it,
   OR hardcode. Decision: leave as-is (build-time year is correct for a static
   site rebuilt on deploy); note it, don't over-engineer.
2. **CountUp adjacent text nodes** — the `{prefix}{value}{suffix}` fix was
   already kept on `main`. Verify it's present; if a mismatch appears, wrap in a
   single expression / template string.
3. **Motion hooks default off until mount** — components that animate-in on
   mount must render their *resting/initial* state on the server (which is what
   "off until mount" gives us) so server HTML == first client paint. This is the
   correct behaviour for SSR; just verify no hook reads `window`/`document` at
   module top level or during render (only in effects).
4. **Any `window`/`document`/`localStorage` access during render** — must be
   effect-guarded or `typeof window` guarded, else build-time prerender throws.
   Audit Navbar, hooks/, StructuralLattice, ProcessDiagram, HeroHeadline before
   first build.

---

## Steps

Each step is a checkpoint. I run the dev server / build and verify before moving
on. Atomic commit per step where it makes sense.

### Step 0 — Branch + safety net
- `git checkout main && git pull` (confirm at `d5a9a3`).
- `git checkout -b website-revamp/rr7-ssg`.
- Record current `npm run build` output + `dist/` as the rollback reference.

### Step 1 — Pre-flight audit (no code changes yet)
- Grep every `pages/` and `components/` file for render-time `window`/`document`/
  `localStorage`/`navigator` access and `Date()`/`Math.random()` in render.
- Confirm CountUp fix present on main.
- Produce a short findings list; fix any render-time browser access by
  effect-guarding *before* the structural move (smaller blast radius).

### Step 2 — Dependencies
- Add: `@react-router/dev` (dev), `@react-router/node`, `isbot` — pin to the
  installed `react-router` line (7.13.x; align versions). `react-router-dom` is
  superseded by `react-router` in framework mode — keep `react-router` (already a
  dep transitively via `react-router-dom@7`), remove `react-router-dom` import
  usage in Step 5.
- Do NOT add `@react-router/serve` (no runtime server).
- **Check with Mike before install** (CLAUDE.md rule) — but these are the RR7
  framework packages, the whole point of the milestone; flag, don't block.

### Step 3 — Config files
- `react-router.config.ts`:
  ```ts
  import type { Config } from "@react-router/dev/config";
  export default {
    ssr: false,
    prerender: ["/", "/ai-advisory", "/built-environment", "/about", "/contact"],
  } satisfies Config;
  ```
- `vite.config.ts`: replace `@vitejs/plugin-react` with `reactRouter()` from
  `@react-router/dev/vite`. Keep the `@` path alias. Keep port 3000.
- `package.json` scripts → `dev: react-router dev`, `build: react-router build`,
  `preview`/`start`: serve `build/client` statically (e.g. `vite preview` won't
  apply; use a static server for local check, or `npx serve build/client`).
- `tsconfig.json`: add the RR typegen include (`.react-router/types`) and
  `rootDirs`. Add `react-router typegen` to a `typecheck` script.

### Step 4 — `app/` directory + root shell
- Create `app/` (RR's default `appDirectory`). Move CSS import target here.
- `app/root.tsx` — port our document shell from `index.html`:
  - `<html lang="en-GB">`, charset, viewport, theme-color **#020617**,
    **all favicon/manifest links**, **the Google Fonts preconnect+stylesheet**
    (via `links` export or directly in `<head>`).
  - `<Meta/>` + `<Links/>` in head; `{children}` + `<ScrollRestoration/>` +
    `<Scripts/>` in body.
  - Import `index.css`/Tailwind entry here.
  - Port the app shell `<div className="flex flex-col min-h-screen bg-obsidian
    …">` with `<Navbar/>` / `<main>` / `<Footer/>` wrapping `<Outlet/>` — this is
    the layout that lived in `App.tsx`.
  - `ErrorBoundary` export (template shape, branded).

### Step 5 — Routes
- `app/routes.ts` — explicit config (NOT file-system routing, to keep our exact
  paths):
  ```ts
  import { type RouteConfig, index, route } from "@react-router/dev/routes";
  export default [
    index("routes/home.tsx"),
    route("ai-advisory", "routes/ai-advisory.tsx"),
    route("built-environment", "routes/built-environment.tsx"),
    route("about", "routes/about.tsx"),
    route("contact", "routes/contact.tsx"),
  ] satisfies RouteConfig;
  ```
- For each page: create `app/routes/<name>.tsx` that re-exports the existing page
  as `default`. Two options — prefer (a):
  - (a) Keep `pages/*.tsx` where they are; route module does
    `export { Home as default } from "../../pages/Home";`. Minimal movement.
  - (b) Move page bodies into route modules. More churn; only if (a) fights the
    typegen.
- Replace `react-router-dom` imports (`Link`, `useLocation`, etc.) with
  `react-router` across components (Navbar especially). Same APIs, new package.
- Delete `App.tsx`, `index.tsx`, `index.html` (shell now in root.tsx). Keep a
  note in commit msg.

### Step 6 — First build + prerender proof
- `npm run build`. Expect "Prerender: Generated …" for all 5 routes.
- Inspect `build/client/index.html` and one inner route: confirm **real content**
  inside the root container + `<title>`, OG meta, and JSON-LD `<script>` present
  in the static HTML (not just an empty div).
- Fix any build-time prerender throw (almost always a render-time browser access
  missed in Step 1).

### Step 7 — Hydration verification (the Day-10 failure point)
- Serve `build/client` locally; load each of the 5 routes in a real browser via
  Playwright.
- Assert: **zero console errors**, specifically no React hydration error
  (#418/#423/#425). Capture console for each route.
- Visually confirm each route renders identically to the current live SPA
  (animations still fire on mount, layout intact).
- This is the gate that the whole pivot was about — do not declare success
  without clean console on all 5.

### Step 8 — Output dir + Vercel
- RR `ssr:false` build outputs to `build/client/` (not `dist/`). Update
  `vercel.json` / Vercel project output dir to `build/client`. Confirm SPA
  fallback handling (`/` is prerendered → `build/client/__spa-fallback.html`;
  ensure unknown paths still resolve — our routes are all prerendered so this is
  belt-and-braces).
- Update `.gitignore` (`build/` vs old `dist/`).
- Dry-run: `curl` the built HTML to re-confirm crawlable content before any push.

### Step 9 — Docs + memory
- Update `CLAUDE.md` (stack now framework mode; new dev/build commands;
  `app/` structure; output dir).
- Update `.revamp-planning/SSG-NEXT.md` → mark milestone delivered, or supersede.
- Update memory `project_website_revamp.md` once shipped & verified.

### Step 10 — Ship (only on Mike's go)
- PR off `website-revamp/rr7-ssg`. Per memory: do not push/merge without
  explicit instruction. Verify live routes after deploy:
  `curl` each of the 5 → 200 + real HTML; spot-check hydration on the live URL.

---

## Risks / watchpoints

- **Tailwind v3 in framework mode** — supported (it's just PostCSS + a CSS
  import in root.tsx). If the new Vite plugin fights PostCSS, that's the most
  likely friction point. Fallback: keep PostCSS config explicit.
- **Google Fonts render-blocking** — pre-existing deferral; framework mode
  doesn't change it. Out of scope here.
- **`react-router-dom` → `react-router` import sweep** — mechanical but must be
  complete or the build breaks. Grep-driven.
- **og.png / absolute asset URLs in JSON-LD** — already absolute
  (`https://www.clearbuildconsulting.co.uk/...`), so they survive prerender. Verify.
- **Lazy/Suspense in App.tsx** — replaced by RR's per-route code splitting
  (automatic in framework mode). The manual `lazy()` wrappers are removed; RR
  splits each route module. No Suspense flash regression expected.

## Definition of done

1. `npm run build` prerenders all 5 routes (build log shows it).
2. Built HTML for each route contains real content + title + OG + JSON-LD.
3. All 5 routes hydrate with **zero** console errors in a real browser.
4. Visual parity with current live SPA (animations + layout).
5. Vercel output dir updated; live site serves crawlable HTML post-deploy.
6. Design unchanged; UK English; no new hype copy; no unrelated reformatting.
