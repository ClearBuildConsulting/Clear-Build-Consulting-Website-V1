# Frontend Feasibility — Clear Build Consulting Website Revamp

Author: Frontend Engineer (planning session, no source edits made)
Scope: rebuild in place on React 19 + Vite, keep current host, keep branding and service content, ~2-week window.

---

## 0. Ground truth (what the repo actually is today)

Verified against the real files, not assumptions:

- **Host**: GitHub repo `git@github.com:ClearBuildConsulting/Clear-Build-Consulting-Website-V1.git`, single `main` branch, `origin/HEAD -> main`. There is **no `.github/workflows/`, no `netlify.toml`, no `vercel.json`** in the repo, and `dist/` is gitignored. Auto-deploy on push to main with the build output ignored means the host builds from source via a **connected Git App (Vercel or Netlify), configured in their dashboard, not in-repo**. We cannot see which from the repo alone — see Section 3 for how to confirm and what each needs.
- **Stack as built**: React 19.2 + TypeScript, Vite 6, `react-router-dom` v7, `lucide-react`. These are correctly listed in `package.json` *and* bundled by Vite via `@vitejs/plugin-react`.
- **The esm.sh importmap in `index.html` is redundant and a latent bug.** It re-declares `react`, `react-dom`, `react-router-dom`, `lucide-react` as CDN imports. Because Vite resolves bare imports from `node_modules` at build time, the importmap is either ignored in the bundled build or, in dev, risks loading a *second* React copy from the network. This is the classic AI Studio / "build from prompt" export artefact. It adds a hard runtime dependency on esm.sh being up.
- **Tailwind is CDN-only** (`<script src="https://cdn.tailwindcss.com">`) with the theme defined inline in a `tailwind.config` `<script>` block in `index.html`. The Vite build does **no** Tailwind processing. `index.html` also links `/index.css` which **does not exist on disk** — a dead reference.
- **Fonts**: Inter + Manrope via Google Fonts `<link>` (render-blocking).
- **Pages are large hand-rolled markup**: `DomesticTender.tsx` 24KB, `AIAdvisory.tsx` 16KB, `BuiltEnv.tsx` 13KB, `Home.tsx` 11KB. Card / section / testimonial markup is copy-pasted with near-identical class strings (e.g. the three service cards in `Home.tsx`, the testimonial cards). This is the single biggest source of revamp friction and the strongest case for a primitive set.
- **Interactivity** exists in `AIAdvisory.tsx`, `DomesticTender.tsx`, `Navbar.tsx` (forms / `useState`). Whatever we do must preserve these.
- **Routing**: `HashRouter` in `App.tsx` — URLs are `#/ai-advisory` etc. Six routes.

**Brand tokens (keep exactly):** obsidian `#020617`, paper `#FFFFFF`, structural `#94A3B8`, focus `#6366f1` (indigo-500), surface `#0f172a`. Fonts: Inter (sans), Manrope (display).

---

## 1. Stack changes — recommendations with cost / benefit / risk

| # | Change | Benefit | Cost | Risk | Verdict |
|---|--------|---------|------|------|---------|
| 1 | **Drop the esm.sh importmap from `index.html`** | Removes double-React risk, removes hard dependency on esm.sh uptime, lets Vite own all resolution | ~15 min | None — deps already in `package.json`/lockfile | **Do it, day 1.** Pure win, no new dep. |
| 2 | **Tailwind CDN → Vite build step** (`tailwind` + `postcss` + `autoprefixer`, devDeps) | Purged CSS (~10-20KB vs unbounded CDN runtime), no render-blocking 3rd-party script, real config in repo, arbitrary values + plugins available | ~half day | New devDeps — **needs Mike's OK** | **Recommend (see §2).** Highest-leverage perf/SEO fix. |
| 3 | **HashRouter → BrowserRouter** | Clean `/ai-advisory` URLs, indexable, shareable, no `#` | ~1 hr + host SPA-fallback config | Low, contingent on host fallback (§3) | **Recommend, gated on confirming host fallback.** |
| 4 | **Self-host fonts** (`@fontsource/inter`, `@fontsource/manrope`) OR keep Google `<link>` with `preconnect` | Removes render-blocking external request, better LCP, GDPR-cleaner | ~1 hr | New (dev)deps if self-hosting | **Optional.** Keep Google Fonts + `&display=swap` (already present) for v1; self-host only if Lighthouse flags it. |
| 5 | **Component primitive set** (Section / Container / Card / Eyebrow / etc.) — no new dep, just internal files | Consistency, ~40% less markup per page, faster revamp | ~1 day | None | **Do it (see §5).** Core enabler. |
| 6 | **Animation library** (see §4) | Senior feel without hand-rolled keyframes | depends on choice | Bundle size / taste | **Recommend a CHOICE, flag for approval.** |
| 7 | Remove dead `GEMINI_API_KEY` define in `vite.config.ts` | Cleanliness — no Gemini call exists in source | 5 min | None | Optional cleanup. |
| 8 | Remove dead `/index.css` link in `index.html` (replaced by real CSS entry under §2) | Removes 404 | — | None | Folded into §2. |

**New dependencies flagged for Mike's approval (CLAUDE.md rule):**
- **Build-time only (low risk, strongly recommended):** `tailwindcss`, `postcss`, `autoprefixer` (all devDependencies, zero runtime bytes shipped beyond the CSS they generate).
- **Runtime (one of, your call):** an animation lib — see §4. My pick is **`motion`** (the renamed Framer Motion) used sparingly, OR **zero new runtime deps** via CSS + a tiny in-repo `useInView` hook. I recommend the CSS-first route for a senior, non-gimmicky feel and a near-zero bundle delta; `motion` only if we want shared-layout / spring polish.
- **Optional:** `@fontsource/*` (devDeps) if we self-host fonts.

---

## 2. Tailwind: CDN → build migration

**Recommendation: migrate to a real build step.** It is the single highest-value change for SEO/perf and it is cheap (~half a day). The CDN script (`cdn.tailwindcss.com`) is explicitly "for development only" per Tailwind's own docs: it ships the full engine + compiles in the browser on every load, is render-blocking, cannot be purged, and pins us to a 3rd-party host. For a consulting site whose whole pitch is "disciplined delivery", a dev-mode CDN in production is the wrong signal.

**Migration steps (mechanical, low risk):**
1. `npm i -D tailwindcss postcss autoprefixer` and `npx tailwindcss init -p` (creates `tailwind.config.js` + `postcss.config.js`).
2. Port the existing theme **verbatim** from the `<script>` block in `index.html` into `tailwind.config.js` `theme.extend` (colours obsidian/paper/structural/focus/surface, fontFamily sans/display, container). No design change.
3. Create a real CSS entry `src/index.css` (or keep `/index.css` at root) with `@tailwind base; @tailwind components; @tailwind utilities;` plus the existing custom scrollbar + body styles currently inline in `index.html`. Import it from `index.tsx`.
4. Set `content: ['./index.html', './{pages,components,App}.{ts,tsx}']` so the purge sees every class.
5. Delete the `<script src="cdn.tailwindcss.com">`, the inline `tailwind.config` script, and the inline `<style>` from `index.html`.
6. `npm run build` and diff the rendered pages in `preview` — class names are identical, so visual output should be pixel-stable.

**Tailwind v4 note:** v4 (`@tailwindcss/vite`, CSS-first config) is an option and is faster, but it changes the config format. For a 2-week window I recommend **v3** to keep the theme port a copy-paste of the existing JS config and avoid a learning tax. We can revisit v4 post-launch.

**Risk:** the only realistic failure is a class that lives in a dynamically-built string and gets purged. Mitigation: the codebase uses static class strings (verified in `Button.tsx` and `Home.tsx`), so safelist risk is low; grep for template-literal class construction during migration and safelist anything found.

---

## 3. Routing: HashRouter → BrowserRouter

**Recommendation: move to `BrowserRouter`** for clean, indexable URLs. `#/path` URLs are the worst-practice for SEO on a marketing site — Google treats the fragment as one page.

**What it requires:** an **SPA fallback** so deep links (`/ai-advisory` typed directly or shared) return `index.html` instead of a 404. Both likely hosts handle this trivially, but the config differs, so **first confirm the host** (the repo has no in-repo deploy config — it's dashboard-connected):

- **If Netlify:** add `public/_redirects` containing `/*    /index.html   200`. (Or `netlify.toml` with a fallback rule.) One file, committed, done.
- **If Vercel:** add `vercel.json` with a rewrite `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }`. One file, committed, done.
- **If GitHub Pages** (less likely given auto-deploy-on-push without a `gh-pages` action, but possible): no clean server fallback — would need the `404.html` copy hack. If it turns out to be Pages, I'd keep HashRouter OR push to move the connected host to Netlify/Vercel. **This is the one scenario that blocks BrowserRouter.**

**How to confirm the host (ask Mike, 1 question):** "Is the site deployed via Netlify, Vercel, or GitHub Pages?" The auto-deploy-on-push-to-main + gitignored `dist/` + absence of a workflow file points to Netlify/Vercel's GitHub App. Either supports BrowserRouter with a one-line config file. **Do not introduce new infra** — we only add a fallback file to the existing host.

**Code change:** swap `HashRouter as Router` → `BrowserRouter as Router` in `App.tsx`. All six `<Route>` paths already use clean `/...` paths, so no route rewrites needed. `<Link to="...">` usages are unchanged.

**SEO follow-through (cheap wins while we're here):** add per-route `<title>`/`<meta description>` (React 19 supports rendering `<title>`/`<meta>` directly in components — no Helmet dep needed), a `public/robots.txt`, and a static `public/sitemap.xml` listing the six clean URLs.

---

## 4. Animation approach

**Goal: senior, calm, intentional — not gimmicky.** That argues *against* heavy spring physics everywhere.

**Recommendation (primary): CSS-first + one tiny in-repo `useInView` hook (IntersectionObserver). Zero new runtime deps.**
- Reveal-on-scroll (fade + 8-12px rise) via a `motion-safe:` Tailwind utility toggled by an `inView` class — covers ~90% of what a consulting site needs.
- Hover/focus transitions already exist (`transition-colors duration-300` in the cards) — keep and standardise via the `Card` primitive.
- Respect `prefers-reduced-motion` (Tailwind `motion-safe`/`motion-reduce` variants) — non-negotiable for a "disciplined" brand.
- Bundle delta: **~0KB** (one ~30-line hook).

**Recommendation (if Mike wants more polish): `motion`** (the renamed `framer-motion`, package name `motion`) used *surgically* — hero entrance, staggered card reveals — imported per-component so tree-shaking keeps it lean.
- Bundle: the modern `motion` core is roughly **~30-40KB gzipped** when you use the `motion` primitives; importing only what you need keeps it down, but budget conservatively.
- This is a **new runtime dependency → needs Mike's explicit OK** per CLAUDE.md.

**Verdict:** lead with the CSS-first approach (no approval needed, fits the brand, protects the bundle). Hold `motion` as an opt-in if, during week 2, the hero/section reveals feel flat. **Avoid** GSAP (heavy, licence considerations for some plugins) and AOS (unmaintained-ish, adds a global). 

**Animation bundle budget: ≤ 5KB gz default (CSS route); ≤ 40KB gz hard ceiling if `motion` is approved.**

---

## 5. Component / primitive system

The pages are repeated hand-rolled markup with duplicated class strings (the three service cards and the testimonial cards in `Home.tsx` are the clearest example). Introduce a small primitive layer in `components/` — **no new dependency**, just internal `.tsx` files matching the existing `Button.tsx` pattern (functional component, variant prop, `className` passthrough):

| Primitive | Replaces | Notes |
|-----------|----------|-------|
| `Container` | repeated `container mx-auto px-6` | one source of truth for gutter/width |
| `Section` | repeated `<section className="py-24 border-t border-white/5">` | `spacing` + `divider` props |
| `Card` | the service + testimonial card divs (`bg-surface p-8 border border-white/5 rounded-sm hover:border-white/20`) | `as` prop (div/article), optional `icon`, `interactive` variant |
| `Eyebrow` / `SectionHeading` | the `font-display text-3xl font-bold` headings | enforces type scale |
| `Prose` | the `text-structural leading-relaxed` body blocks | consistent reading measure |
| `Reveal` | n/a (new) | wraps children, applies the `useInView` fade-rise from §4 |
| `IconBadge` | the `w-12 h-12 ... flex items-center justify-center` icon wells | |
| `ServiceCard` | composed from `Card` + `IconBadge` for the Home/Service grids | |

Keep the existing `Button`, `Navbar`, `Footer`, `Logo` as-is (they already match this pattern). The primitives encode the *current* brand classes verbatim, so adoption is a refactor with no visual change, then the revamp restyles in one place.

**Rollout order:** build primitives first (day 2-3), migrate `Home.tsx` to them as the reference page, then sweep the remaining five pages.

---

## 6. Performance budget & keeping Lighthouse high

Targets (mobile, throttled): **Performance ≥ 95, Accessibility ≥ 95, Best Practices 100, SEO 100.**

| Lever | Action |
|-------|--------|
| JS bundle | App code + React + router + lucide, route-split via `React.lazy` per page → initial JS **≤ 120KB gz** target. lucide-react: import icons individually (already done — named imports tree-shake). |
| CSS | Tailwind purged build **≤ 20KB gz** (vs unbounded CDN). |
| Fonts | `preconnect` (present) + `display=swap` (present); subset to used weights — Inter 300/400/500/600 and Manrope 400-800 are already scoped in the URL. Consider self-host only if LCP suffers. |
| 3rd-party | Removing the Tailwind CDN script + esm.sh importmap eliminates two render-blocking external origins. |
| Images/assets | check `components/assets/` and `public/` — the 296KB `clearbuild-capability-pack.html` in `public/` ships as a static asset; fine, but ensure it isn't imported into the bundle. |
| Route splitting | `const Home = lazy(() => import('./pages/Home'))` etc. with a `<Suspense>` fallback in `App.tsx`; DomesticTender (24KB) especially benefits. |
| Verification | run Lighthouse on `npm run preview` before each push; treat a Performance drop below 90 as a blocker. Add bundle-size awareness via `vite build` output review. |

---

## 7. Phased build sequence (~2 weeks)

**Week 1 — foundation (de-risk the infra first, no visual change yet):**
- **Day 1**: Remove esm.sh importmap from `index.html`. Confirm host with Mike (Netlify/Vercel/Pages). Add the SPA-fallback file for that host. Swap HashRouter → BrowserRouter. Verify all six routes + deep links work on a preview deploy. *(Approval needed before day 1 work: Tailwind devDeps.)*
- **Day 2**: Tailwind CDN → Vite build migration (port theme verbatim, real CSS entry, delete CDN script + dead `/index.css`). Visual-diff every page in `preview` to prove pixel-stability.
- **Day 3**: Build the primitive set (§5) and migrate `Home.tsx` onto it as the reference. Add the `useInView`/`Reveal` hook (§4). Add per-route `<title>`/`<meta>`, robots.txt, sitemap.xml.
- **Days 4-5**: Migrate remaining pages (`AIAdvisory`, `DomesticTender`, `BuiltEnv`, `About`, `Contact`) onto primitives. Preserve all existing form/interactivity in AIAdvisory/DomesticTender/Navbar. Route-split with `lazy`.

**Week 2 — revamp & polish:**
- **Days 6-8**: Apply the actual visual revamp (the new design direction — spacing rhythm, hero, section reveals, refined cards) on top of the now-consistent primitives. This is where design work lands cheaply because structure is unified.
- **Day 9**: Animation pass (CSS reveals; decide on `motion` only if needed and approved). Accessibility sweep (focus states, alt text, heading order, `prefers-reduced-motion`).
- **Day 10**: Performance pass — Lighthouse, bundle review, font/image checks. Final cross-page QA in `preview` and on a deploy preview. Buffer for fixes.

**Sequencing principle:** infra/router/Tailwind changes are invisible to the user and must land *first* so the visible revamp in week 2 builds on stable ground and can't be derailed by a routing or build surprise late.

---

## 8. Risks / timeline threats

1. **Host is GitHub Pages, not Netlify/Vercel** → BrowserRouter SPA fallback is awkward (404.html hack) and "no new infra" constrains us. **Mitigation:** confirm host on day 1; if Pages, either keep HashRouter (accept the SEO cost) or get Mike's call on the connected host. *Single biggest unknown.*
2. **Tailwind purge eats a dynamically-built class** → broken styling in production only. **Mitigation:** grep for template-literal class construction; safelist; visual-diff in `preview` (not just dev) before pushing.
3. **esm.sh removal exposes a hidden CDN-only assumption** (unlikely, but the importmap has been there) → **Mitigation:** it's day-1 work with full preview verification; trivially revertible.
4. **`motion` scope creep** — once a spring is in, "make it bouncier" requests multiply and the bundle/timeline slips. **Mitigation:** default to CSS; treat `motion` as an explicit, approval-gated opt-in with the 40KB ceiling.
5. **Large page refactors (DomesticTender 24KB) hide content edge-cases** (forms, conditional UI) → **Mitigation:** migrate page-by-page, keep each page's behaviour test (manual click-through in preview) before moving on; never refactor copy/content during a structural pass.
6. **No CI / no test suite** — every check is manual in `preview`/deploy-preview. **Mitigation:** budget the daily Lighthouse + click-through QA into the plan (already in §7); consider a minimal GitHub Action only if Mike wants it (would be *new infra* — flag, don't assume).
7. **Two-week clock vs revamp ambition** — if the visual direction isn't decided before week 2, days 6-8 compress. **Mitigation:** lock the design direction during week 1 so week 2 is execution, not exploration.

---

## Approval checklist for Mike (per CLAUDE.md "no new deps without asking")

1. **Tailwind build step** — add devDeps `tailwindcss`, `postcss`, `autoprefixer`? *(strongly recommended, zero runtime cost)*
2. **Routing** — confirm host (Netlify / Vercel / GitHub Pages) so we can move HashRouter → BrowserRouter with the right one-line fallback file?
3. **Animation** — CSS-first + tiny in-repo hook (no dep), or approve `motion` for richer entrance animation (≤40KB gz)?
4. **Fonts** — keep Google Fonts `<link>` (default) or self-host via `@fontsource/*` (devDeps)?
