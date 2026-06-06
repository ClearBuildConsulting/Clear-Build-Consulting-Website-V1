# Clear Build Consulting — Website Revamp: Consolidated Plan

Owner: PM / Design Lead. Status: ready for Mike's Day-0 sign-off.
Scope: rebuild in place on React 19 + Vite, keep current host, keep branding, ~2 weeks. **SERVICE SCOPE CHANGE (2026-06-06): the site now covers TWO services only — AI Consultancy and Built Environment Advisory. The Domestic Tender / domestic works-spec service is being removed entirely (it has not taken off; Mike is not continuing it).** See section 11 for the removal spec; design/SEO sections updated accordingly.
This document consolidates six specialist inputs (design, frontend, SEO, brand, market, code review) into one sequenced plan. On technical conflicts the code reviewer's convergence decisions are authoritative; on aesthetic conflicts the design lead decides. Both are noted inline where they bite.

---

## 1. Vision

A senior advisory site that reads as engineered, not decorated: obsidian and indigo, a precise structural grid you can feel, drawn lines that connect ideas, and disciplined scroll-reveal motion that explains hierarchy rather than performing. It lands in the top 5 percent by doing less, better: messaging-first hierarchy, specific falsifiable proof, generous whitespace, and one unmistakable signature (the structural lattice hero) that cannot be lifted from a template. The single business unlock underneath the visual uplift is making the site crawlable at all: today it serves an empty client-side shell behind a HashRouter and is effectively invisible to Google. We fix that and the look in the same fortnight.

---

## 2. Day-0 decisions — RESOLVED (grilling, 2026-06-06)

All Day-0 decisions were stress-tested and settled in the grilling session. Captured in `brainstorms/2026-06-06-website-revamp-grilling.md`. Build is cleared to proceed (in a future session).

1. **Deploy host: CONFIRMED = Vercel.** Verified via live response headers (`server: Vercel`, `x-vercel-id`, `lhr1` edge). The repo has no deploy config (connection is dashboard-side Git integration). BrowserRouter + clean URLs are trivial: a single `vercel.json` catch-all rewrite to `/index.html`. **Risk #1 (GitHub Pages) is eliminated.** Note: the apex 307-redirects to `www.`, so the **canonical host is `www.clearbuildconsulting.co.uk`** — all canonical tags, sitemap URLs, and OG URLs must use the `www.` form. (CLAUDE.md's live-URL line is wrong and gets fixed in the brand/SEO sweep.)

2. **New dependencies: ALL 4 APPROVED** — `tailwindcss`, `postcss`, `autoprefixer`, `react-snap` (all devDependencies, build-time only). Conditional deps still deferred unless a named trigger fires: `react-helmet-async` (only if React 19 native metadata proves awkward), `@fontsource/*` (only if Lighthouse flags fonts), `motion` (not in v1).

3. **Prerender: react-snap for v1 — LOCKED.** Re-confirmed after host became known: chosen because it needs zero changes to the router/entry point (the fragile area in a 2-week window); fallback is "ship a stubborn route client-side rather than slip launch." Revisit proper SSG (vite-react-ssg, or Next on Vercel) post-launch only. No user-visible difference.

4. **Font switch: APPROVED** — drop Inter; adopt DM Sans (body/UI), DM Mono (eyebrow/labels), Manrope ExtraBold (display). The design-direction doc's "keep Inter for body" line is overridden — brand wins on brand. Design intent (tight tracking, light body weight, one accent weight) preserved, expressed in DM Sans.

5. **Animation library: none in v1 — APPROVED.** Scroll-reveal via a hand-rolled IntersectionObserver hook + CSS transitions. `motion` only with fresh approval if hand-rolled stagger becomes genuinely unmanageable.

6. **Signature hero: swing for the lattice, with an early eject button (grilling decision).** Build a throwaway mockup of the hero alone EARLY (at/ before review gate 1) for a cheap yes/no. If it wows, keep it; if even slightly naff, fall back same-day to a restrained typography-only hero (the pre-agreed safe option).

7. **Working model & review gates (grilling decision).** Mike's model: "build fast, I'll review ~10 min at the right time." So: I build heads-down and own ALL functional QA via the browser tool; Mike reviews only at **3 gates**, each a ~10-min look at a deploy-preview with a 3-bullet "is this right?" prompt. No waiting on Mike mid-phase.
   - **Gate 1 (~Day 3):** plumbing works, nothing broke + hero-mockup yes/no.
   - **Gate 2 (~Day 7):** does the revamp look top-5%.
   - **Gate 3 (~Day 10):** ship it?

8. **Session structure (grilling decision).** Build spans ~3 sessions, cut at the gate seams: (1) Week-1 plumbing, (2) Week-2 revamp, (3) polish + ship. Run the `session-handoff` skill at the end of each. This planning/grilling session ends without building.

---

## 3. Design direction

Concept: **structural clarity.** The page behaves like a well-engineered building: a structural grid you can feel, drawn lines connecting ideas, restrained depth (layered surfaces, soft inner light), and indigo used like a structural engineer's red pen, sparingly and only where it carries meaning. The biggest lever from "flat and generic" to "top 5 percent" is a coherent line and grid system plus disciplined motion, not more colour or imagery. The market benchmark reinforces this: for a senior brand, restraint is the flex, and this is Clear Build's natural lane.

**Hero.** Full-viewport-height (min-height ~88vh), asymmetric: left ~60 percent holds the headline and primary actions, right ~40 percent holds the signature graphic (on mobile the graphic sits behind the text at low opacity). Push the display headline far beyond today's `text-6xl`: `clamp(3.25rem, 7vw, 6.5rem)`, Manrope 800, leading ~1.02, tracking `-0.02em`. Keep "Clear, actionable advice." as two stacked lines with "Clear" allowed to breathe. Sub-copy in DM Sans, `text-xl`, structural grey, max-width ~46ch. Sharpen the message: lead with AI Advisory; the other two services are a secondary line, not a co-equal paragraph. Headline words rise and fade in a tight 40ms stagger on load.

**Signature graphic: the structural-blueprint field.** A thin-line vector lattice in SVG: a faint isometric grid of 1px intersecting lines (white at 4 to 8 percent opacity) over obsidian, with a handful of indigo nodes at intersections and one indigo stroke that draws itself in on load (SVG stroke-dashoffset). The visual metaphor for the business: map reality, then draw a clear path. GPU-cheap (transform and opacity only), pointer- and scroll-linked parallax at small amplitude, degrades to a static SVG under `prefers-reduced-motion`.

**Motion strategy.** Motion explains structure; it never performs. Everything respects `prefers-reduced-motion`.
- Scroll-reveal (primary, does 80 percent of the perceived upgrade): sections and cards fade up 16 to 20px on enter via IntersectionObserver, triggered once, threshold ~15 percent, 500 to 600ms ease-out.
- Stagger: grouped items (the three service cards, list items, stat figures) reveal 60 to 80ms apart.
- Hero parallax only on the lattice, nowhere else.
- Number count-up once on reveal for any metric.
- Line-draw for the hero path and the AI process diagram.
- Micro-interactions: 150 to 200ms border-brighten or 2 to 4px lift on buttons and cards; the existing link arrow nudges 3px on hover.
- What does not move: body text, headings after entrance, nav, logo, testimonials text. No autoplay carousels, no looping video, no scroll-jacking, no spring overshoot.

**Signature features (five, each earning its place).**
1. The hero structural-lattice field: the memorable first impression and brand metaphor in one.
2. "How the AI audit works" animated process diagram: a horizontal 4-step pathway (Map reality, Identify friction, Define the path, Implement with discipline) as connected nodes with a line drawing between them on scroll; each node expands on hover or tap. Reused as the spine of the AI Advisory page. This is also the market analyst's "make the methodology visible" recommendation, rendered.
3. Service explorer cards (evolved from the flat grid): **two** tall cards (AI Consultancy, Built Environment Advisory) with a thin indigo left edge, a quiet lift on hover, a single-stroke icon animation, and a "what you get / who it's for / typical outcome" micro-panel. Turns the old flat grid into two distinct scannable propositions. NOTE: now a 2-up layout, not 3-up (Domestic removed) — balance the grid as two wider cards rather than leaving a gap.
4. A measured proof band: a darker full-width band with 3 to 4 count-up figures (years in major infrastructure, disciplines covered, etc.) in large Manrope, paired with the existing real, named endorsements (Mace, infrastructure directors) presented as static, forwarding-proof, well-typeset blocks, not a scroller.
5. ~~The tender-pack deliverable graphic.~~ **CUT — the Domestic service is removed.** Replace this signature slot, if a fifth is wanted, with a Built Environment artefact (e.g. an anonymised project-review or governance one-pager visual). Otherwise four signature features is fine.

**Layout system.** True 12-column grid, generous gutters, max content width ~1200 to 1280px (keep existing breakpoints). Embrace asymmetry: alternate sections between 7/5 and 5/7 splits rather than centred-everything. Spacing rhythm on an 8px base: large sections `py-32`, standard `py-24`, tight `py-16`. Whitespace is the primary luxury signal. Alternating surface treatments give the page cadence: obsidian base, a fractionally lighter surface, back to obsidian. Cards get a layered surface, a 1px border that brightens on hover, and a thin indigo accent edge on the primary (AI) service, with real internal hierarchy (eyebrow, title, body, outcome, link).

**Anti-patterns to avoid (brand and market agree).** No hype or superlatives, no heavy or showy animation, no stock photography or abstract 3D blobs, no thin "trusted by" logo walls (use named testimonials and concrete outcomes), no fake-scarcity patterns bleeding from the homeowner tender product into the B2B advisory pages, no burying the message under a hero animation, no single one-size CTA. Two to three intentful conversion paths is the sweet spot ("For businesses" / "For homeowners" near the top, plus a lower-commitment "download the capability pack" alongside "Book a call").

---

## 4. Technical plan

Stack changes, with the security fix and the code reviewer's convergence decisions baked in.

1. **Drop the esm.sh importmap from `index.html` (Day 1, no new dep).** It maps react, react-dom, lucide-react, react-router-dom to esm.sh while the same packages already exist in the lockfile. Vite's resolution wins today so it is largely inert, but it is a genuine liability (dead config that can diverge from the lockfile, a third-party origin on the critical path, a real double-React hazard if any native-ESM path ever bypasses the bundler). Removal is ~15 min, zero risk, fully revertible.
2. **Tailwind CDN to Vite build step.** Replace `cdn.tailwindcss.com` plus the inline `tailwind.config` and inline `<style>` with `tailwindcss` + `postcss` + `autoprefixer` (devDeps) and a real CSS entry. Port the theme verbatim. Benefit: purged CSS (~10 to 20KB vs unbounded CDN runtime), no render-blocking third-party script, arbitrary values and plugins available. Also removes the dead `/index.css` link (a 404 today). Set the Tailwind `fontFamily` to: `sans` DM Sans, `mono` DM Mono, `display` Manrope.
3. **HashRouter to BrowserRouter (gated on host confirmation).** All six routes already use clean `/...` paths (`/`, `/ai-advisory`, `/domestic-tender-packs`, `/built-environment`, `/about`, `/contact`), so no route-path rewrites and no `<Link>` changes are needed: this is a one-line router swap plus the host SPA-fallback rewrite. Do not start until the host is confirmed.
4. **Prerender with `react-snap` (post-build).** Additive headless crawl that writes real HTML for all six routes for every crawler, with zero app-code change. Accept its one cost: Puppeteer in CI and occasional React 19 hydration-mismatch warnings (manageable). This keeps the simple BrowserRouter swap intact. Do not adopt `vite-react-ssg`: it forces a router and entry-point rewrite that collides with the swap.
5. **Component primitive set (no new dep).** Internal files: Section, Container, Card, Eyebrow, Reveal, and similar. Gives consistency, roughly 40 percent less markup per page, and makes the week-2 revamp cheap. Core enabler.
6. **Scroll-reveal hook (no new dep).** A ~30-line `useInView` / `Reveal` hook on IntersectionObserver plus CSS transitions. No animation library in v1.
7. **Security fix: delete the `GEMINI_API_KEY` and `API_KEY` define from `vite.config.ts`.** These `define` entries string-substitute `process.env` values into the client bundle at build time, and prerendering would bake them into static HTML and JS. No source code uses Gemini (template leftover), no key is set, and no `.env.local` exists, so nothing is exposed today. But this is the moment to remove it so a key can never be baked into the public bundle later. Quick must-do, not a live incident.
8. **Head management: React 19 native metadata first.** Land a `<Seo>` wrapper component that hides the mechanism, using React 19 native metadata tags. Add `react-helmet-async` only if native tags prove awkward to manage per route. Do not add helmet by default: with `react-snap` it may be redundant.
9. **Fonts: keep the Google Fonts `<link>` with `preconnect` and `&display=swap` for v1**, pointed at the DM Sans + DM Mono + Manrope stack. Self-host with `@fontsource/*` only if Lighthouse flags font loading.

Net new dependencies for v1: `tailwindcss`, `postcss`, `autoprefixer`, `react-snap`. Nothing else. No double-React, no esm.sh on the critical path, no animation library, no helmet unless triggered.

---

## 5. SEO plan

The current production HTML is an empty shell (a `<title>` and an empty `<div id="root">`) behind a HashRouter, so a crawler sees no content, no headings, no internal links, and every route lives behind a `#` fragment that Google treats as the same URL as the homepage. Net effect today: at most one indexable URL with no indexable content. The authored heading structure and copy in the React components are already strong; the problem is delivery, not substance.

**Tier 1, makes the site indexable at all (do first).**
1. HashRouter to BrowserRouter plus host SPA-fallback rewrite to `index.html` per route.
2. `react-snap` prerender so all six routes ship real HTML.
3. Per-route `<title>` and `<meta description>` via the `<Seo>` wrapper (native metadata, helmet only if needed).
4. `robots.txt` and a hand-written `public/sitemap.xml` for the six stable routes; verify Google Search Console and submit the sitemap. A hand-written sitemap is simpler than `vite-plugin-sitemap` for six stable routes.

**Tier 2, captures clicks and social, unlocks rich results.**
5. OG and Twitter Card tags plus one 1200x630 share image; `<html lang="en-GB">`; canonical per page.
6. JSON-LD, injected per page and prerendered: Organization and ProfessionalService on Home; Service per service page; FAQPage on AI Advisory and Domestic Tender Packs (both already have FAQ blocks); Offer and PriceSpecification on the Domestic Tender Standard and Premium tiers; Person (Mike Anderson) on About; BreadcrumbList on service pages once BrowserRouter is live. Validate with Google's Rich Results Test and the Schema.org validator before launch.
7. Tailwind CDN to build-time, and esm.sh importmap bundled through Vite (Core Web Vitals and reliability). This is the same work as the technical plan items 1 and 2.
8. Fix "ClearBuild" to "Clear Build" in titles, meta, and copy; correct the domain reference in CLAUDE.md.

**Tier 3, depth and measurement (if time remains).**
9. Thicken Contact and About; add internal links service-to-Contact and service-to-sibling.
10. Tune H1 and opening paragraphs to the target queries below, especially Domestic Tender Packs (highest intent, lowest competition).
11. Add analytics (GA4 or cookieless) with CTA conversion tracking; verify Bing Webmaster Tools.

**UK keyword targets per service.**
- AI Advisory (SME owners and ops leaders): primary `AI consultancy UK`, `AI advisory for small business`, `AI audit for business`, `practical AI consulting UK`; long-tail `AI readiness assessment UK`, `AI strategy for SMEs`, `business process automation consultant UK`. Align the page with the existing outreach phrase "AI readiness review".
- Built Environment Advisory (senior construction and infrastructure buyers): primary `construction advisory UK`, `infrastructure consultant UK`, `built environment advisory`, `independent project review construction`; secondary `procurement and commercial advisory construction`, `governance and regulatory support infrastructure`, `early-stage project definition consultant`, `NEC contract advisory` if relevant.
- ~~Domestic Tender Packs.~~ **REMOVED — service cut. No keyword targeting, no page, no JSON-LD for it. Drop the Service + Offer/PriceSpecification + FAQPage schema that would have lived here. Add a 301 redirect `/domestic-tender-packs` → `/`.**
- Home (brand and category): `Clear Build Consulting`, `AI and construction`.

**Post-launch (out of window, roadmap):** an Insights/blog targeting long-tail UK queries, per-service OG images, ongoing Search Console monitoring.

---

## 6. Brand alignment (checklist)

Concrete fixes. The site must pass all of these before publish.

- [ ] No human-readable "ClearBuild" (closed up) anywhere: `index.html` title, `metadata.json`, page copy (Home.tsx around line 190), capability-pack HTML, `Logo.tsx`, alt and aria text, OG and Twitter tags. Verify with a grep that excludes asset filenames and CSS class names.
- [ ] Fonts loaded for screen are DM Sans + DM Mono + Manrope (700/800) only. Inter is not loaded. Replace the current Google Fonts link with: DM Sans (300;400;500;600;700), DM Mono (400;500), Manrope (700;800), `display=swap`, with `preconnect`.
- [ ] Body and UI render in DM Sans (body 400, UI 500 to 600, card titles and sub-headings 700); eyebrow and section labels in DM Mono 500 (uppercase, tracked); large display and hero headlines in Manrope 800.
- [ ] Every colour used is in the approved palette. No `#4F46E5`. Indigo accent is `#6366F1`; hover and pressed use `#4338CA`. Obsidian `#020617` is the hero and header background. Hex values uppercase and exact.
- [ ] Nav and footer use the real `ClearBuild-Logo-White.svg` (`width: auto`, aspect ratio preserved, do not distort, respect clear space), replacing the current CSS-drawn mark. Nav target proportion follows the document-header standard.
- [ ] Favicon added using the monogram `ClearBuild-Symbol-White.svg`, exported to favicon sizes and `.ico`. The site has no favicon today.
- [ ] OG and social image present: monogram on obsidian `#020617`, or the white wordmark on obsidian, with clear space.
- [ ] OG title, Twitter title, and meta description read "Clear Build Consulting".
- [ ] Copy is UK English, restrained, no hype, no em dashes, no italic emphasis (use bold), no placeholder content.
- [ ] `dist/` is regenerated from corrected source, not hand-edited; a pre-publish grep confirms no "ClearBuild" or `#4F46E5` survived into the build.
- [ ] Confirmed in-browser via Playwright that the rendered site shows the right fonts, the white SVG logo, and the corrected name spacing.

Note: the canonical `tokens.css` referenced by the brand spec does not exist on disk in this repo. Treat `clearbuild-brand-reference.md` and the values above as the source of truth for this build; do not block on a missing tokens file.

---

## 7. Phased build sequence (~2 weeks)

The reconciliation between the frontend doc and the code reviewer is: the frontend doc left prerender "homeless" in the day plan, and with `react-snap` chosen it becomes a named Day 10 bolt-on (not a Day 3-4 SSG spike). Infra and router and Tailwind changes are invisible to the user and land first, so the visible revamp in week 2 builds on stable ground. Stop-anywhere-and-it-still-ships ordering throughout.

**Day 0 (before any code): Mike answers section 2.** Confirm host, approve the four v1 deps, confirm the font switch. The host answer gates everything in Day 1.

**Week 1, de-risk the infrastructure (no visual change yet).**
- **Day 1 (quick wins).** Remove the esm.sh importmap. Add the SPA-fallback file for the confirmed host. Swap HashRouter to BrowserRouter. Verify all six routes and deep links on a preview deploy. Delete the dead `GEMINI_API_KEY` / `API_KEY` define from `vite.config.ts` (security must-do). All small, all visible-as-correctness, all revertible.
- **Day 2.** Tailwind CDN to Vite build migration: port the theme verbatim, real CSS entry, delete the CDN script and the dead `/index.css` link. Set the DM Sans / DM Mono / Manrope `fontFamily`. Visual-diff every page in preview to prove pixel-stability before pushing.
- **Day 3.** Build the primitive set and migrate `Home.tsx` onto it as the reference. Add the `useInView` / `Reveal` hook. Land the `<Seo>` wrapper with per-route `<title>` and `<meta>`; add `robots.txt` and a hand-written `sitemap.xml`. Apply the brand checklist text and font fixes as they are touched.
- **Days 4 to 5.** Migrate the remaining pages (AIAdvisory, DomesticTender, BuiltEnv, About, Contact) onto the primitives, preserving all existing form and interactive behaviour (AIAdvisory, DomesticTender, Navbar). Route-split with `lazy`. Click-through each page in preview before moving on; never edit copy during a structural pass.

**Week 2, revamp and polish.**
- **Days 6 to 8 (deeper, the visible uplift).** Apply the design direction on top of the now-consistent primitives: spacing rhythm and 12-column asymmetry, the hero with the structural lattice, section scroll-reveals, the evolved service explorer cards, the AI process diagram, the proof band with count-ups and named endorsements, the tender-pack deliverable graphic. This is where design lands cheaply because structure is unified. The design direction must be locked by now (it is, in this plan) so week 2 is execution, not exploration.
- **Day 9.** Animation pass (CSS reveals and micro-interactions; decide on `motion` only if orchestration demands it and Mike approves). Accessibility sweep: focus states, alt text, heading order, `prefers-reduced-motion`. Add JSON-LD per page and validate. OG and Twitter tags plus the 1200x630 share image, `lang="en-GB"`, canonicals, favicon.
- **Day 10 (prerender plus ship).** Wire `react-snap` and confirm all six routes emit real HTML. Performance pass: Lighthouse, bundle review, font and image checks. Pre-publish brand grep (no "ClearBuild", no `#4F46E5`). Regenerate `dist/` from source. Final cross-page Playwright QA on a deploy preview. Buffer for fixes. Verify Search Console and submit the sitemap.

Quick visible wins: Day 1 (clean URLs, security fix), Day 2 (build-time CSS), the brand text and font fixes as they land. Deeper: Days 6 to 8 (the revamp) and Day 10 (prerender plus performance).

---

## 8. Risks and mitigations (top 5)

1. ~~**Host is GitHub Pages.**~~ RESOLVED — host confirmed = Vercel. Clean URLs are trivial (one `vercel.json` rewrite). This risk is closed. Residual: remember to add `vercel.json` with the catch-all rewrite on Day 1, and point all canonical/sitemap/OG URLs at the `www.` host.
2. **Tailwind purge eats a dynamically-built class** (template-literal class construction), breaking styling in production only. Mitigation: grep for template-literal class construction, safelist what is dynamic, and visual-diff in preview (not just dev) before pushing.
3. **Prerender hydration mismatches on React 19** under `react-snap` (Puppeteer in CI, occasional warnings). Mitigation: prerender gets its own named Day 10 slot, not a late surprise; treat hydration warnings as expected and triage; if a route refuses to settle, ship it without prerender rather than slipping the launch (it still renders client-side).
4. **Large page refactors hide content edge-cases** (forms and conditional UI in DomesticTender at ~24KB, AIAdvisory, Navbar). Mitigation: migrate page-by-page, keep a manual click-through behaviour check per page before moving on, and never refactor copy or content during a structural pass.
5. **The two-week clock versus revamp ambition.** If the design direction were undecided, Days 6 to 8 would compress. Mitigation: the direction is locked in this plan, so week 2 is execution. No CI and no test suite means every check is manual in preview, so the daily Lighthouse and click-through QA is budgeted into the schedule; a GitHub Action would be new infra and is not assumed.

---

## 9. Definition of done

- All six routes serve real, prerendered HTML with content and headings (verified by viewing source, not just the rendered DOM); the site is crawlable and the sitemap is submitted and accepted in Search Console.
- Clean `/...` URLs (no `#` fragments); deep links and refresh work on the live host.
- Brand acceptance checklist (section 6) passes in full, confirmed in-browser via Playwright: DM Sans / DM Mono / Manrope only, the white SVG logo in nav and footer, a favicon, no human-readable "ClearBuild", no `#4F46E5`, no em dashes.
- Per-route `<title>`, meta description, canonical, OG and Twitter tags, and `lang="en-GB"` present on every route; JSON-LD validates in Google's Rich Results Test.
- The `GEMINI_API_KEY` / `API_KEY` define is gone from `vite.config.ts`; a pre-publish grep of `dist/` confirms no secret define, no "ClearBuild", no `#4F46E5` survived.
- No esm.sh on the critical path; Tailwind is build-time and purged; no double-React.
- Lighthouse targets met on the homepage and at least the three service pages: Performance, Accessibility, Best Practices, and SEO all 90+ (target 100 on SEO and Accessibility), Core Web Vitals green.
- `dist/` regenerated from corrected source, not hand-edited.

---

## 10. Out of scope (deferred)

- A real enquiry-form backend (server or edge function to receive and route submissions). The forms stay as-is for v1.
- Calendly reinstatement with Outlook-synced availability.
- A motion library (`motion`): not in v1; CSS-first only.
- `vite-react-ssg` SSG migration: reconsider post-launch if SSG-grade control is wanted.
- Self-hosting fonts via `@fontsource/*`: only if Lighthouse later flags font loading.
- An Insights/blog, per-service OG images, and ongoing Search Console monitoring as a routine.
- A CI pipeline or automated test suite (new infra; not assumed for the fortnight).
- New case-study content beyond reusing existing endorsements and anonymised engagement snapshots.

---

## 11. Service removal: Domestic Tender Packs (added 2026-06-06)

The domestic works-spec / tender-pack service is removed entirely. The site becomes a two-service business: AI Consultancy and Built Environment Advisory. Do this as part of the page work (it removes more than it adds, so it also lightens week 1).

**Delete outright:**
- `pages/DomesticTender.tsx` (whole page, including its Stripe £50 deposit flow, pricing tiers, with/without comparison, and FAQs).
- Route + import in `App.tsx` (the `DomesticTender` import and its `<Route path="/domestic-tender-packs">`).
- Nav link in `components/Navbar.tsx` (the `{ label: 'Domestic Tender Packs', path: '/domestic-tender-packs' }` item).
- Footer link in `components/Footer.tsx`.
- The "Domestic Tender Packs" service card block in `Home.tsx`.

**Rewrite (flowing copy — re-phrase naturally for a two-service business, do not just delete mid-sentence):**
- `Home.tsx` hero sub-copy ("Alongside AI advisory, we also provide fixed-scope domestic tender documentation") → re-frame around AI Consultancy + Built Environment Advisory.
- `About.tsx` (two passages using "domestic scope of works" / "tender pack" as examples of the approach) → re-phrase.
- `metadata.json` description (lists all three services) → drop Domestic.

**Re-frame, get sign-off:**
- The homepage testimonial that praises bringing expertise to *domestic* building projects → keep the real person, edit wording toward the general structured approach (NOT domestic-specific). Draft conservatively; surface for Mike's sign-off at review gate 1 or 2. Do not invent praise.

**Redirect:**
- Add a 301 redirect `/domestic-tender-packs` → `/` in `vercel.json` (preserve any link/search equity, avoid a dead end).

**Leave alone (genuine Built Environment usage, NOT the domestic service):**
- `BuiltEnv.tsx` references to "tender documentation review" / "tender preparation" — these mean infrastructure/commercial tendering and stay.

**Knock-on (already reflected above):** design signature feature #5 (tender-pack graphic) cut; service grid is 2-up not 3-up; the homeowner-vs-B2B dual conversion path is dropped (single senior-B2B path now); SEO Domestic keyword target + its JSON-LD removed.

**Verify:** after removal, a grep for `domestic`/`tender` across `pages components App.tsx index.html metadata.json public` should return only the intended `BuiltEnv.tsx` infrastructure-tendering lines (and nothing in routes, nav, or footer).
