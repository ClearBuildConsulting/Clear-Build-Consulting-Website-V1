# Code Review — Website Revamp Technical Proposals

Reviewer: Code Reviewer (plan-only critique). Inputs: `frontend-feasibility.md`, `seo-plan.md`, `design-direction.md`, `brand-alignment.md`, verified against `index.html`, `package.json`, `vite.config.ts`, `App.tsx`, `pages/Home.tsx`, `components/Button.tsx`, `components/Logo.tsx`.

Overall: the proposals are sound, internally well-aligned, and appropriately hedged. The two specialists do **not** actually conflict on the big-ticket items (Tailwind, router, prerender, deps). The main gap is one un-flagged hard integration risk between `vite-react-ssg`, `BrowserRouter`, and the existing react-router v7 `<Routes>` setup. Findings below.

---

## Verified / debunked claims

- **"Double-React risk" from the esm.sh importmap — REAL, correctly hedged.** Verified in `index.html`: there is an `importmap` mapping `react`, `react/`, `react-dom/`, `lucide-react`, `react-router-dom` to `https://esm.sh/...@^19.2.4`, AND the same packages exist in `package.json` (`react ^19.2.4`, `react-dom ^19.2.4`, `lucide-react ^0.563.0`, `react-router-dom ^7.13.0`). The entry is `<script type="module" src="/index.tsx">`, which Vite processes — so in a Vite build Vite's own resolution wins and the importmap is largely **inert/dead config** rather than actively loading a second React today. The frontend doc's wording ("removes double-React *risk*", "removes hard dependency on esm.sh uptime") is therefore accurate and properly qualified — it does not overclaim an active bug. The importmap is still a genuine liability (dead config that can silently diverge in version from the lockfile, a third-party origin on the critical path, and a real double-instance hazard if any native-ESM path ever bypasses the bundler). **Verdict: claim stands; removal on day 1 is correct, cost ~15 min, risk none.**
- **"Tailwind CDN is dev-only / not for production" — TRUE.** Verified `<script src="https://cdn.tailwindcss.com">` + inline `tailwind.config` + inline `<style>` in `index.html`. This is Tailwind's documented dev-only path. Migration is correct and the verbatim theme-port plan is right.
- **"All six routes already use clean `/...` paths" — TRUE.** Verified in `App.tsx`: `/`, `/ai-advisory`, `/domestic-tender-packs`, `/built-environment`, `/about`, `/contact`. HashRouter→BrowserRouter needs no route-path rewrites. `<Link>` usages unaffected.
- **"esm.sh occurrences" — 5 in `index.html`, all in the importmap.** No esm.sh references in app source paths reviewed.

---

## Findings

### [BLOCKER] `vite-react-ssg` + existing `BrowserRouter`/`<Routes>` is an architecture collision, not a drop-in
Both docs treat prerendering as additive, but `vite-react-ssg` is **not** a post-build bolt-on — it wants to own the router. Its API replaces `BrowserRouter` + manual `<Routes>` with its own `ViteReactSSG(...)` entry and a `routes` array (or its `<Router>`), and it changes the app entry point (`index.tsx`/`main.tsx` must export the SSG-created app instead of calling `createRoot`). That means the §3 "swap `HashRouter` → `BrowserRouter` in App.tsx" task and the `vite-react-ssg` adoption are **the same task touching the same code**, not two independent steps — and doing the BrowserRouter swap first (Day 1) then re-doing routing for SSG (later) is rework. **Decision needed:** either (a) adopt `vite-react-ssg` and let it own routing from the start (skip the standalone BrowserRouter swap — SSG gives you clean URLs anyway), or (b) choose `react-snap` (the genuinely additive, zero-app-change post-build crawler) and keep the simple BrowserRouter swap. See Convergence Decisions — I recommend (b) for the 2-week window.

### [BLOCKER] Host is unconfirmed and gates two BLOCKER-level items
The whole BrowserRouter + prerender plan is contingent on the deploy host supporting an SPA fallback/rewrite, which neither doc has confirmed (both correctly flag it as a question for Mike). If it turns out to be **GitHub Pages**, BrowserRouter has no clean fallback (only the `404.html` hack) and `vite-react-ssg`'s per-route HTML output still needs Pages-compatible paths. **This single question must be answered before any router/prerender work starts** — it can invalidate the Day-1 plan. Make "confirm host (Netlify / Vercel / Pages)" a true Day-0 blocker, not a Day-1 sub-task.

### [CONCERN] `process.env.API_KEY` / `GEMINI_API_KEY` define survives into a prerendered/static build — check for secret exposure
`vite.config.ts` injects `process.env.API_KEY` and `process.env.GEMINI_API_KEY` via `define`, meaning the value is **string-substituted into the client bundle at build time**. If a real Gemini key is ever present in the build env, it ships to the browser — and prerendering bakes it into static HTML/JS too. Neither doc addresses this. Before launch: confirm whether any page actually uses Gemini (the search found the define but no page usage); if unused, **delete the define entirely**; if used, move it behind a server/edge function — never ship it client-side. This is a security item that the revamp is the right moment to fix.

### [CONCERN] `react-helmet-async` is the right *interim* tool but is arguably redundant under SSG with React 19
React 19 natively hoists `<title>`/`<meta>`/`<link>` rendered anywhere in the tree into `<head>`, and `vite-react-ssg` flushes them into static HTML. So if `vite-react-ssg` is chosen, `react-helmet-async` may be unnecessary (one fewer dep). It IS needed if the fallback is `react-snap` (which relies on what the rendered DOM contains) or if no prerender ships. **Decision:** tie the helmet dep to the prerender decision — if `vite-react-ssg`, prototype React 19 native metadata first and only add `react-helmet-async` if SSG's head-flush proves fiddly with native tags. The SEO doc's `<Seo>` wrapper component is good either way (it abstracts the mechanism).

### [CONCERN] JSON-LD under React 19 native head needs a deliberate approach
The SEO plan asks for JSON-LD structured data. React 19's metadata hoisting does **not** dedupe or specially handle `<script type="application/ld+json">` the way it does title/meta. Under SSG this is fine (it renders into the static HTML). Under `react-snap` it's fine. Under `react-helmet-async` use the script API. Just flag it so the engineer doesn't assume JSON-LD "just works" via the same path as meta tags — it needs explicit placement and a verify step (Google Rich Results Test).

### [CONCERN] Day-1 ordering is slightly wrong: Tailwind build should precede the primitive/page work, and visual-diff needs a baseline
Day 1 does esm.sh removal + router + host fallback; Day 2 does Tailwind CDN→build with "visual-diff every page". But the **visual-diff baseline must be captured before the Tailwind swap** (screenshots of every page on the current CDN build), or there's nothing to diff against — once the CDN script is gone you can't regenerate the old render. Add an explicit "capture baseline screenshots" step at the very start (Day 0/1), before any change. Minor resequencing, but it's the safety net the whole "pixel-stability" claim rests on.

### [NIT] `@types/node` and the `path`/`__dirname` usage are fine, but the `@` alias + SSG entry need a re-check
`vite.config.ts` uses `resolve.alias['@']`. `vite-react-ssg` runs its own SSR build pass; confirm the alias resolves in the SSG/Node render context too (it usually does via the shared Vite config, but it's a known sharp edge). Low risk, just verify in the SSG spike.

### [NIT] Self-hosting fonts is correctly deferred — keep it deferred
Frontend §4 marks `@fontsource/*` self-hosting as optional/v1-defer. Agree. The Google Fonts `<link>` with `preconnect` + `display=swap` is already present and adequate; adding two font deps now is scope the perf budget doesn't yet need. Revisit only if Lighthouse LCP flags it.

### [NIT] Motion: design and frontend already agree — no framer-motion in v1
Design direction explicitly says hand-rolled `useScrollReveal` (IntersectionObserver, ~30 lines) + CSS transitions, framer-motion optional-only. Frontend budget assumes no animation dep. **No conflict, no perf risk** as written — the design self-constrains to transform/opacity, `prefers-reduced-motion`, IntersectionObserver (not scroll listeners), and rAF-throttled pointer parallax. This is the correct CLS-safe approach. Only watch item: the "hero lattice" and "pointer parallax" must use `transform`/`opacity` only and reserve layout space (fixed dimensions) to keep CLS at 0 — call that out as an acceptance check, not a new finding.

### [NIT] Primitive system is correctly scoped — not over-engineered
The proposed primitives (`Container`, `Section`, `Card`, `Eyebrow`/`IconBadge`, `ServiceCard`) are extracted from **verified** duplication in `Home.tsx` (repeated `container mx-auto px-6`, repeated `<section className="py-24 border-t border-white/5">`, duplicated service/testimonial card markup) and follow the existing `Button.tsx` variant-prop + `className`-passthrough pattern. No new dependency, no abstraction beyond what the 6 pages actually repeat. This is right-sized for a marketing site — neither a heavyweight design-system package nor leaving the duplication in place. Keeping `Button`/`Navbar`/`Footer`/`Logo` as-is is the correct call.

### [NIT] 2-week sequence is realistic with one caveat
The "de-risk infra in Week 1, revamp in Week 2, stop-anywhere-and-it-still-ships" ordering is sound and correctly front-loads the risky/mechanical work. The one underestimate: **prerender integration (`vite-react-ssg`) is not in the Week-1 day plan at all** — it appears only in the dependency summary. If SSG is chosen it's a multi-hour-to-multi-day integration (entry rewrite, routing handover, hydration debugging on React 19) and must get an explicit slot, likely Day 3-4, gated behind a spike. If `react-snap` is chosen it's a Day-10 bolt-on. Either way, give prerender a named day — right now it's homeless in the schedule.

---

## Convergence Decisions (where to pick ONE)

1. **Prerender tooling → choose `react-snap` for v1, NOT `vite-react-ssg`.**
   Rationale: the two docs don't conflict (frontend defers to SEO; SEO recommends `vite-react-ssg` with `react-snap` as fallback), but `vite-react-ssg` forces a router/entry-point rewrite that collides with the BrowserRouter swap and burns the most fragile budget hours on hydration debugging within a 2-week window. `react-snap` is genuinely additive (post-build headless crawl, zero app-code change), keeps the simple `BrowserRouter` swap intact, and produces real HTML for all six routes for every crawler. Accept its one cost (Puppeteer in CI, occasional React 19 hydration-mismatch warnings — manageable). Revisit `vite-react-ssg` post-launch if SSG-grade control is wanted. **If the team strongly prefers SSG, then drop the standalone BrowserRouter task and let `vite-react-ssg` own routing from Day 1 — do not do both.**

2. **Router → `BrowserRouter`, gated on host confirmation.** Agreed across both docs. Just sequence host-confirmation as Day 0.

3. **Head management → defer the `react-helmet-async` decision to the prerender choice.** With `react-snap` (recommended), use React 19 native metadata tags first; add `react-helmet-async` only if native tags prove awkward to manage per-route. The `<Seo>` wrapper component lands regardless and hides the mechanism. Avoid adding helmet "by default" — it may be redundant.

4. **Tailwind → build step (PostCSS/Vite), port theme verbatim.** No conflict; both docs agree; highest-leverage change. Proceed (needs Mike's OK on devDeps).

5. **Animation library → none in v1.** Both docs agree (hand-rolled IntersectionObserver + CSS). Framer Motion only if orchestration demands it later — a build decision, not a planned dep.

6. **Net new dependencies for v1 (minimal set):** `tailwindcss` + `postcss` + `autoprefixer` (devDeps), `react-snap` (devDep, post-build). That's it. Defer/conditional: `react-helmet-async` (only if native metadata insufficient), `@fontsource/*` (only if LCP flags), `vite-plugin-sitemap` (a hand-written `public/sitemap.xml` for 6 stable routes is simpler), framer-motion (not v1). No redundancy in the core set.

---

## Pre-flight blockers to clear before build starts
1. Confirm deploy host (Netlify / Vercel / GitHub Pages) — gates router + prerender.
2. Resolve the `GEMINI_API_KEY` define — confirm it's unused and delete, or move server-side. Do not ship it to the client/prerendered output.
3. Capture baseline screenshots of all 6 pages before any Tailwind/router change.
4. Pick the prerender tool (recommend `react-snap`) — this unblocks the helmet/JSON-LD decisions.
