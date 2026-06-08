# SEO Audit & Optimisation Plan — Clear Build Consulting

Prepared by: SEO Specialist
Scope: Plan only. No site source files edited.
Stack (locked): React 19 + Vite SPA, current host, auto-deploys on push to `main`.
Live URL: https://clearbuildconsulting.co.uk (production). Note: CLAUDE.md wrongly lists `clearbuildconsultant.co.uk` — that error should be corrected and the wrong domain checked for an accidental duplicate deployment.
UK English throughout.

---

## 0. Executive summary

The current build is functionally invisible to search engines. The production HTML served at the root is an empty shell — a `<title>` plus an empty `<div id="root">` — so a crawler that does not execute and wait on JavaScript sees no content, no headings and no internal links. On top of that the app uses `HashRouter`, so every route lives behind a `#` fragment (`/#/ai-advisory`) which Google treats as the *same* URL as the homepage and will not index as a distinct page. The net effect: at most one indexable URL, with no indexable content on it.

The good news: the *content and heading structure already authored in the React components is strong* (clean single H1 per page, logical H2/H3 nesting, real copy, testimonials, FAQs). The problem is purely delivery and discoverability, not substance. Fixing the four structural issues below converts an essentially unindexable site into a properly crawlable, multi-page, schema-rich site — and almost all of it is achievable on a plain Vite SPA without SSR.

**The four highest-leverage fixes (do these first):**
1. `HashRouter` → `BrowserRouter` + SPA fallback routing on the host.
2. Build-time **prerendering** (`vite-react-ssg` or `react-snap` / `vite-plugin-prerender`) so each route ships real HTML.
3. Per-route `<title>`/meta/canonical/OG via `react-helmet-async`.
4. `sitemap.xml`, `robots.txt`, JSON-LD structured data, and Search Console verification.

---

## 1. Technical SEO audit — current gaps

### 1.1 Indexability & crawlability (CRITICAL)
- **Empty server HTML.** The live root returns only `<title>ClearBuild Consulting</title>` and an empty `#root`. Confirmed by fetching production: no body content, no headings, no links in the initial response. Googlebot *can* render JS but defers it to a second wave and is unreliable for it; Bing, LinkedIn, social scrapers, and most AI crawlers do not render JS at all. Today they all see nothing.
- **HashRouter fragments.** Routes are `/#/ai-advisory`, `/#/built-environment`, etc. The fragment is never sent to the server and Google collapses all of them to the canonical homepage URL. **Five service/content pages are therefore not independently indexable.**
- **No `sitemap.xml`** — nothing tells search engines which URLs exist.
- **No `robots.txt`** — no crawl directives, no sitemap pointer.
- **No canonical tags** — risk of duplicate/parameter URLs competing.

### 1.2 Metadata (CRITICAL)
- **Single static `<title>`** ("ClearBuild Consulting") for the entire app — every route shares it. Also note the brand is rendered "ClearBuild" (no space); house style is **"Clear Build Consulting"** with a space — fix in the title and all copy.
- **No `<meta name="description">`** anywhere. Google will scrape arbitrary text (currently nothing) for the snippet.
- **No Open Graph or Twitter Card tags** — links shared on LinkedIn/WhatsApp/X render with no title, description or image. For a B2B consultancy that sells via LinkedIn, this is a direct lead-gen loss.
- `metadata.json` description is an internal design note ("A restrained, typography-led consultancy website…"), not a search-facing description, and is not emitted to the page anyway.

### 1.3 Headings & content (GOOD — preserve)
Heading structure is already correct and should be carried through the rebuild unchanged:
- Home: one H1 ("Clear, actionable advice."), H2 "Our Expertise" / "Professional endorsements" / "Grounded in delivery.", H3 per service.
- AI Advisory: H1 + 5×H2 + 8×H3, with a FAQ block (FAQ schema candidate).
- Built Environment: H1 + 4×H2 + 7×H3.
- Domestic Tender Packs: H1 + 6×H2 + 6×H3, pricing tiers + FAQ (FAQ + Offer/Product schema candidates).
- About: H1 + H2 + 2×H3.
- Contact: H1 only — thin (see §5).
No H1 issues, no skipped levels found. The single weakness is **content depth on Contact and About** and the lack of keyword-targeted body copy on service pages (§5).

### 1.4 Performance (Core Web Vitals risk)
- **Tailwind via CDN (`cdn.tailwindcss.com`)** is render-blocking, ships the full engine + does JIT in the browser, and is explicitly *not for production* per Tailwind's own docs. Hurts LCP/FCP. Should move to a build-time Tailwind (PostCSS/Vite plugin) so only used classes ship as a small static CSS file.
- **Dependencies loaded from `esm.sh` via importmap** (React, react-router, lucide-react) — third-party CDN on the critical path, extra DNS/TLS, version-pinned remote fetches, single point of failure. Should be bundled by Vite instead.
- **Google Fonts** render-blocking; acceptable but add `&display=swap` (already present) and consider self-hosting or preloading the two families actually used.
- No evidence of image optimisation pipeline; ensure any hero/logo images are compressed, sized, lazy-loaded, with width/height to avoid CLS.

### 1.5 Mobile
- `viewport` meta present and correct. Tailwind responsive classes used throughout. Mobile structure looks sound; verify tap-target sizing and the horizontal-scroll testimonial carousel on Home for usability once rebuilt.

### 1.6 Structured data
- **None present.** No Organization, ProfessionalService, Service, FAQPage, or BreadcrumbList markup. Significant missed opportunity (§4).

### 1.7 Analytics / Search Console
- No analytics tag and no Search Console verification detected. No measurement, no index-coverage visibility, no ability to submit the sitemap.

---

## 2. Crawlability fix — HashRouter → BrowserRouter + prerendering

### 2.1 Router migration (coordinate with frontend engineer)
- Switch `App.tsx` from `HashRouter` to `BrowserRouter`. URLs become clean: `/ai-advisory`, `/built-environment`, `/domestic-tender-packs`, `/about`, `/contact`.
- **Host SPA fallback is mandatory.** With BrowserRouter, a direct hit on `/ai-advisory` must serve `index.html` (or the prerendered HTML) rather than 404. Confirm the host's rewrite/redirect rule (Netlify `_redirects` `/* /index.html 200`, Vercel rewrite, or equivalent). If prerendering (below) is used, the fallback should serve the *prerendered* file for each route and only fall back to the SPA shell for unknown paths.
- **301 redirect old hash URLs.** Any existing `/#/...` links in the wild resolve to the homepage anyway, but add JS that, on load, detects a legacy `#/path` and `history.replaceState`s to the clean path so old shares land correctly. Submit only clean URLs in the sitemap.

### 2.2 Rendering the content into HTML — options for a Vite SPA (no SSR)

| Option | What it does | Fit | Verdict |
|---|---|---|---|
| **`vite-react-ssg`** | Static-site generation for React+Vite. Renders each route to static HTML at build time, hydrates on the client. Integrates with `react-router` and `react-helmet`-style head management. | Vite-native, React 19 friendly, built for exactly this case. | **RECOMMENDED** |
| **`react-snap`** | Post-build: launches headless Chromium, crawls the built SPA, writes static HTML per route. Zero app-code changes. | Easy bolt-on; Puppeteer in CI; can be flaky with React 19 hydration but workable. | **Strong fallback** if SSG integration proves fiddly within the 2-week window |
| **`vite-plugin-prerender` / `prerenderer`** | Similar build-time headless prerender as a Vite plugin. | Works but less actively maintained. | Acceptable alternative |
| **Pre-rendering service (Prerender.io)** | Serves cached rendered HTML to bots via host edge logic. | No build change, but adds a third-party dependency + cost and host-level UA routing. | Avoid unless the above all fail |

**Recommendation: `vite-react-ssg`.** It is the cleanest static-prerender path for a React 19 + Vite + react-router SPA, gives genuine HTML for all six routes (so every crawler, not just Googlebot, sees full content + links), pairs naturally with per-route head tags, and keeps everything inside the existing Vite build that already auto-deploys on push. The site is fully static (no per-request data), so SSG is a perfect match — no SSR server is needed. Routes to prerender: `/`, `/ai-advisory`, `/built-environment`, `/domestic-tender-packs`, `/about`, `/contact`.

If `vite-react-ssg` integration slips, fall back to **`react-snap`** as a `postbuild` step — it requires almost no app changes and ships the same static HTML.

### 2.3 Move off render-blocking CDNs (performance prerequisite)
While doing the rebuild, replace `cdn.tailwindcss.com` with build-time Tailwind (Vite + PostCSS) and bundle the `esm.sh` importmap deps through Vite. This is required for the prerendered HTML to carry its own small static CSS and for good Core Web Vitals. Flag to the frontend engineer as part of the same work.

---

## 3. Per-page metadata plan

### 3.1 How to manage per-route head tags in a React SPA — dependency recommendation
**Add `react-helmet-async`** (the maintained, SSR/SSG-safe successor to `react-helmet`). Each page component renders a `<Helmet>` with its title/description/canonical/OG. Wrap the app in `<HelmetProvider>`. With `vite-react-ssg`, the Helmet tags are flushed into the static HTML at build time, so the correct `<title>`/meta ships in the initial response for each route — exactly what crawlers and social scrapers read. (Without prerendering, Helmet still updates tags client-side, which helps Googlebot but not non-rendering scrapers; prerender + Helmet together is the full fix.)

Create a small `<Seo>` wrapper component taking `title`, `description`, `path`, `image` props to keep pages DRY and enforce canonical/OG consistency.

### 3.2 Per-page tags (titles ≤ ~60 chars, descriptions ~150–160 chars, UK English)

**Home — `/`**
- Title: `Clear Build Consulting | AI & Construction Advisory UK`
- Description: `Clear, actionable AI advisory and built environment consulting for UK businesses. Practical AI audits, fixed-scope tender packs and senior construction advice.`
- Canonical: `https://clearbuildconsulting.co.uk/`

**AI Advisory — `/ai-advisory`**
- Title: `AI Advisory for UK Businesses | Clear Build Consulting`
- Description: `A practical AI audit that maps how your business really runs and shows where AI delivers measurable value. No software sales, no hype. Fixed-scope, UK-based.`
- Canonical: `https://clearbuildconsulting.co.uk/ai-advisory`

**Built Environment Advisory — `/built-environment`**
- Title: `Built Environment Advisory | Infrastructure Consulting UK`
- Description: `Selective, senior advisory for complex UK infrastructure and construction programmes: early-stage definition, procurement, governance and independent review.`
- Canonical: `https://clearbuildconsulting.co.uk/built-environment`

**Domestic Tender Packs — `/domestic-tender-packs`**
- Title: `Domestic Tender Packs | Like-for-Like Builder Quotes`
- Description: `Professional tender packs for UK homeowners. Get like-for-like builder quotes with clear scope, specification and terms. Fixed price, fixed scope.`
- Canonical: `https://clearbuildconsulting.co.uk/domestic-tender-packs`

**About — `/about`**
- Title: `About Mike Anderson | Clear Build Consulting`
- Description: `Clear Build is led by Mike Anderson, a senior project manager with 20+ years delivering complex UK civil engineering and infrastructure projects.`
- Canonical: `https://clearbuildconsulting.co.uk/about`

**Contact — `/contact`**
- Title: `Contact Clear Build Consulting | Book a Call`
- Description: `Start the conversation. Book a short, structured call to discuss AI advisory, built environment consulting or a domestic tender pack.`
- Canonical: `https://clearbuildconsulting.co.uk/contact`

### 3.3 Open Graph / Twitter (every page)
- `og:type` = `website` (`profile` acceptable for About), `og:site_name` = `Clear Build Consulting`, `og:title`/`og:description` mirror the per-page tags, `og:url` = canonical, `og:locale` = `en_GB`.
- `og:image`: produce one branded 1200×630 PNG (logo + tagline on obsidian background) as a sitewide default; ideally a per-service variant later. Store in `/public`, reference absolute URL.
- Twitter: `twitter:card` = `summary_large_image`, plus `twitter:title`/`twitter:description`/`twitter:image`.

### 3.4 Global head additions
- `<html lang="en-GB">` (currently `en`).
- `<link rel="canonical">` per page (via Helmet).
- Single sitewide favicon + apple-touch-icon set.

---

## 4. Structured data (JSON-LD)

Inject via Helmet (`<script type="application/ld+json">`), prerendered into each page.

- **Organization** (sitewide, in the homepage / a shared layout): `name` "Clear Build Consulting", `url`, `logo`, `description`, `areaServed` "GB", `sameAs` (LinkedIn company page), `contactPoint`. If a registered UK address exists, add `address` (PostalAddress) to strengthen local/E-E-A-T signals.
- **ProfessionalService** (homepage): the consultancy itself — `name`, `serviceType`, `areaServed: United Kingdom`, `priceRange` if appropriate.
- **Service** (one per service page): `serviceType` "AI Advisory" / "Built Environment Advisory" / "Domestic Tender Packs", `provider` → the Organization, `areaServed` "GB".
- **FAQPage** (AI Advisory and Domestic Tender Packs — both already have FAQ blocks): mark up each Q/A. Eligible for FAQ rich results and strong for AI-answer surfaces.
- **Offer / PriceSpecification** (Domestic Tender Packs has explicit Standard / Premium tiers): mark up the tiers so pricing can surface.
- **Person** (About): Mike Anderson — `jobTitle`, `worksFor` → Organization, `description`. Reinforces E-E-A-T given the 20-years-experience positioning.
- **BreadcrumbList** (service pages) once BrowserRouter is live.

Validate everything with Google's Rich Results Test and Schema.org validator before launch.

---

## 5. Content & keyword SEO (UK-focused)

Heading hierarchy is already sound — the work is (a) targeting real UK search queries in titles/H1/H2/body, and (b) thickening two thin pages. Keep UK spelling (advisory, optimise, programme, specialised).

### 5.1 Target queries per page

**AI Advisory** — buyers are SME owners/ops leaders, not enterprises.
- Primary: `AI consultancy UK`, `AI advisory for small business`, `AI audit for business`, `practical AI consulting UK`.
- Secondary/long-tail: `where to use AI in my business`, `AI readiness assessment UK`, `AI strategy for SMEs`, `business process automation consultant UK`.
- Note: existing outreach already standardised on "AI readiness review" — align the page so it ranks for that branded/category phrase.

**Built Environment Advisory** — senior construction/infrastructure buyers.
- Primary: `construction advisory UK`, `infrastructure consultant UK`, `built environment advisory`, `independent project review construction`.
- Secondary: `procurement and commercial advisory construction`, `governance and regulatory support infrastructure`, `early-stage project definition consultant`, `NEC contract advisory` (if relevant).

**Domestic Tender Packs** — homeowners (highest-intent, most winnable terms).
- Primary: `builder tender pack`, `how to get like-for-like builder quotes`, `home renovation specification document`, `domestic tender pack`.
- Secondary: `compare builder quotes fairly`, `scope of works for builders`, `avoid hidden costs builder quote`, `extension tender document`. This page has the clearest commercial search intent and the least competition — prioritise its depth and internal linking.

**Home** — brand + category: `Clear Build Consulting`, `AI and construction consultancy UK`.
**About** — `Mike Anderson Clear Build`, `senior project manager consultant UK` (E-E-A-T page, not a ranking target).

### 5.2 Heading guidance
- Exactly one H1 per page (already true). Ensure the H1 contains the primary query naturally — e.g. AI Advisory's H1 "Practical AI advisory for growing businesses" is good; keep that phrasing.
- Use H2s for the searchable sub-intents ("What the audit produces", "Why use a Tender Pack?", "Service Tiers & Pricing") — already well done.
- Don't bury keywords in icons-only or image text.

### 5.3 Content depth
- **Contact (`/contact`) is thin** — H1 only, ~47 words. Add a short intro paragraph, the three service options with one line each + internal links, response-time expectation, and (if available) email/phone in text. Helps the page index and supports Organization `contactPoint`.
- **About** is moderate — add a paragraph or two on track record (named project types/sectors, years, credentials) to strengthen E-E-A-T; this directly supports the consultancy's "credibility first" positioning and AI-answer eligibility.
- **Service pages** are reasonably deep already; ensure each has a clear primary query in the opening paragraph and at least one internal link to a related service and to Contact.
- Add **internal linking**: every service page → Contact ("Book a call") and → one sibling service. Home already links out well. This distributes crawl equity once BrowserRouter is live.
- Consider a lightweight **Insights/blog** later (post-launch, out of the 2-week window) targeting the long-tail queries above — strongest long-term organic lever, but not a launch blocker.

---

## 6. Sitemap, robots.txt, canonical, analytics & Search Console

### 6.1 robots.txt (`/public/robots.txt`)
```
User-agent: *
Allow: /
Sitemap: https://clearbuildconsulting.co.uk/sitemap.xml
```
Allow major AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) — for a thought-leadership consultancy, appearing in AI answers is a lead source; do not block them unless the business objects.

### 6.2 sitemap.xml (`/public/sitemap.xml`)
Static XML listing the six clean URLs with `lastmod`. Six pages, rarely changing — a hand-maintained static file is fine; optionally generate it in the build (e.g. `vite-react-ssg` can emit one, or a small `vite-plugin-sitemap`). All entries must be the canonical `https://` non-hash URLs.

### 6.3 Canonical
One self-referencing canonical per page (via Helmet, §3). Pick **one** host convention (recommend non-`www`, `https`, no trailing slash except root) and 301 all other variants to it at the host. Ensure the wrong domain `clearbuildconsultant.co.uk`, if it resolves, 301s to the correct domain.

### 6.4 Analytics & Search Console
- **Google Search Console**: verify the property (DNS TXT or the HTML-file method via `/public`), submit `sitemap.xml`, monitor Index Coverage to confirm all six pages get indexed post-launch, and use URL Inspection on each route to request indexing.
- **Bing Webmaster Tools**: verify + submit sitemap (Bing does not render JS, so this only pays off after prerendering).
- **Analytics**: add a privacy-friendly, UK/GDPR-appropriate tag — GA4 (with consent handling) or a cookieless option (Plausible/Fathom). Load async/deferred so it doesn't hurt CWV. Track the "Book a call" CTA as a conversion.

---

## 7. Prioritised checklist (2-week window — biggest uplift first)

**Tier 1 — makes the site indexable at all (do first; without these nothing else counts)**
1. `HashRouter` → `BrowserRouter` + host SPA fallback rewrite to `index.html` per route. *(with frontend engineer)*
2. Add **prerendering** (`vite-react-ssg`, fallback `react-snap`) so all 6 routes ship real HTML. *(with frontend engineer)*
3. Add `react-helmet-async` + per-route `<title>` and `<meta description>` (§3.2).
4. Add `robots.txt` + `sitemap.xml`; verify Google Search Console; submit sitemap.

**Tier 2 — captures clicks & social, and unlocks rich results (same sprint)**
5. OG + Twitter Card tags + one 1200×630 share image; `<html lang="en-GB">`; canonical per page.
6. JSON-LD: Organization + ProfessionalService (home), Service per service page, FAQPage on the two FAQ pages, Offer on Tender Packs, Person on About.
7. Replace Tailwind CDN with build-time Tailwind and bundle the `esm.sh` deps via Vite (CWV + reliability). *(with frontend engineer)*
8. Fix brand spacing "ClearBuild" → "Clear Build" in titles/meta/copy; correct the domain in CLAUDE.md.

**Tier 3 — depth & measurement (if time remains in the fortnight)**
9. Thicken Contact and About; add internal links service→Contact and service→sibling.
10. Tune H1/opening paragraphs to the target queries in §5.1 (especially Domestic Tender Packs — highest intent, lowest competition).
11. Add analytics (GA4 or cookieless) with CTA conversion tracking; verify Bing Webmaster Tools.

**Post-launch (out of window, flag for roadmap)**
12. Insights/blog targeting long-tail UK queries; per-service OG images; ongoing Search Console monitoring.

---

## Dependency recommendations summary
- `react-helmet-async` — per-route head management (titles, meta, canonical, OG, JSON-LD).
- `vite-react-ssg` (preferred) **or** `react-snap` (fallback) — build-time static prerendering of all routes.
- Build-time Tailwind (PostCSS / Vite plugin) — replace `cdn.tailwindcss.com`.
- Optional: `vite-plugin-sitemap` (or SSG's built-in) for generated sitemap.
- Bundle existing `esm.sh` importmap deps (react, react-router-dom, lucide-react) through Vite instead of remote CDN.
