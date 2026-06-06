# Brand Alignment Audit and Ruleset — Clear Build Consulting Website V1

Prepared for the website revamp. Plan only: this document defines what the
revamp must conform to. It does not change any site source file.

Authoritative sources consulted:

- `clearbuild-os/.claude/skills/clearbuild-brand.md` (authoritative spec)
- `clearbuild-os/.claude/skills/clearbuild-brand-reference.md` (full colour and typography tables)
- `clearbuild-os/clearbuild-brand/tokens.css` — referenced by the spec as the
  canonical machine source, but the file is not present on disk at that path.
  Until it is restored, the reference tables above are the working source of truth.
  Flag for the team: the spec promises `tokens.css` and `tokens.py` as canonical;
  the revamp should not depend on a file that does not exist. Either restore the
  tokens files or treat the reference tables as canonical and update the spec wording.
- Current site: `index.html`, `metadata.json`, `components/`, `pages/`.

---

## 1. Font decision

**Recommendation: align the website to the brand system. Adopt DM Sans as the
primary typeface and DM Mono for section labels. Retire Inter as the body font.**

### Reasoning

The brand spec is unambiguous: "Primary font is DM Sans; DM Mono for section
labels; Manrope ExtraBold for cover titles." Every other Clear Build output
(proposals, reports, pitch decks, capability packs, infographics) renders in
DM Sans. The website is the one surface a prospect sees before any document, so
a typeface mismatch between the site and the very next PDF they receive reads as
two different firms. Consistency across the whole output set is the stronger
argument here, and it is the firm's stated house style.

Inter is a perfectly good web typeface in isolation, which is why this is a real
decision and not an obvious error. But "good in isolation" is not the bar; the
bar is "one coherent Clear Build". There is no platform, licensing, or
performance reason to keep Inter: DM Sans is a Google Font with the same loading
characteristics, and the visual difference is small enough that the layout will
not need rework, only the font swap. So the cost of aligning is low and the
consistency payoff is high. Align.

Manrope stays, but only in its branded role. The spec uses Manrope ExtraBold
(800) for cover titles. On the website the current `display` family is Manrope
across weights 400-800; keep Manrope for large display headings but standardise
the hero/cover-equivalent headline weight to ExtraBold (800) to match the
document system, and let DM Sans 700 carry sub-headings.

### Exact font loading for the revamp

Replace the current Inter + Manrope link with the canonical brand stack:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&family=Manrope:wght@700;800&display=swap" rel="stylesheet">
```

(This mirrors the brand reference font stack. Inter may be dropped from the web
build entirely; it is only specified for Word-document footers via python-docx,
not for screen.)

Tailwind `fontFamily` config should become:

```js
fontFamily: {
  sans:    ['"DM Sans"', 'sans-serif'],     // body, UI, most headings
  mono:    ['"DM Mono"', 'monospace'],      // section labels, eyebrow kickers
  display: ['Manrope', 'sans-serif'],       // large display headings, ExtraBold 800
}
```

Usage map for the site, derived from the brand reference:

| Element | Family | Weight |
|---|---|---|
| Body / paragraph | DM Sans | 400 |
| UI, nav links, buttons | DM Sans | 500-600 |
| Section eyebrow / kicker labels (uppercase, tracked) | DM Mono | 500 |
| Sub-headings, card titles | DM Sans | 700 |
| Large display / hero headline | Manrope | 800 (ExtraBold) |

---

## 2. Name spacing rule — "Clear Build" not "ClearBuild"

**Rule (standing brand instruction): the firm is always "Clear Build Consulting"
with a space. Never "ClearBuild" as one word in any human-readable copy, title,
metadata, or alt text.**

The only acceptable closed-up form is inside asset filenames and code
identifiers that already ship that way (`ClearBuild-Logo-White.svg`,
`clearbuild-capability-pack.html`, CSS class names). Do not rename those as part
of the copy sweep; they are filenames, not prose. Fix only what a human reads.

### Confirmed violation locations to sweep

| File | Where | Current | Fix to |
|---|---|---|---|
| `index.html` | line 6 `<title>` | `ClearBuild Consulting` | `Clear Build Consulting` |
| `metadata.json` | `"name"` | `ClearBuild Consulting` | `Clear Build Consulting` |
| `metadata.json` | `"description"` | `...website for ClearBuild, focusing...` | `...website for Clear Build, focusing...` |
| `components/Logo.tsx` | wordmark `<span>` | `ClearBuild` | `Clear Build` |
| `pages/DomesticTender.tsx` (and any "led by a senior project manager" block) | body copy | `ClearBuild is led by...` | `Clear Build is led by...` |
| `pages/BuiltEnv.tsx` / other pages | body copy | any `ClearBuild` instance | `Clear Build` |
| `public/clearbuild-capability-pack.html` | `<title>`, `aria-label="ClearBuild Consulting Logo"` | `ClearBuild` | `Clear Build` |

### Locations to add (currently missing, expected during revamp)

The site has no Open Graph or Twitter card tags and no favicon link in
`index.html`. When the revamp adds them, they must use "Clear Build Consulting":

- `og:title`, `og:site_name`, `og:description`
- `twitter:title`, `twitter:description`
- `<meta name="description">` (page-level, currently absent)
- Logo `alt` / `aria-label` text once the real SVG logo replaces the CSS mark
- Any `apple-touch-icon` / manifest `name` and `short_name`

### Build-output note

`dist/index.html`, `dist/metadata.json`, and `dist/assets/*.js` contain the same
"ClearBuild" strings. These are generated build artefacts — do not hand-edit
them. Fix the source files and rebuild. Add a CI/check or a pre-publish grep so
the closed-up form cannot reappear (see checklist).

---

## 3. Colour palette reconciliation

The site's Tailwind theme is on-palette. Two cosmetic issues and one genuine
off-palette colour to fix.

### Approved palette the revamp must use

Core (structural neutrals):

| Brand name | Hex | Tailwind name on site | Status |
|---|---|---|---|
| Obsidian | `#020617` | `obsidian` | Correct |
| Surface | `#0F172A` | `surface` (currently `#0f172a`) | Correct value, normalise case to `#0F172A` |
| Slate 800 | `#1E293B` | (used raw in scrollbar CSS) | On-palette; add as a token if reused |
| Slate 700 | `#334155` | (used raw in scrollbar CSS) | On-palette |
| Slate 500 | `#64748B` | — | Available for secondary labels |
| Structural | `#94A3B8` | `structural` | Correct |
| White / Paper | `#FFFFFF` | `paper` | Correct |
| Surface Light | `#F8FAFC` | — | Available for any light sections |
| Border | `#E2E8F0` | — | Available for light-mode borders |

Accent:

| Brand name | Hex | Tailwind name on site | Status |
|---|---|---|---|
| Indigo (primary accent) | `#6366F1` | `focus` (currently `#6366f1`) | Correct value, normalise case to `#6366F1` |
| Indigo Dark | `#4338CA` | — | Use for hover/pressed indigo, not `#4F46E5` |
| Indigo Deep | `#3730A3` | — | Deep emphasis |
| Indigo 100 | `#E0E7FF` | — | Chip/pill backgrounds on white |
| Amber | `#F59E0B` | — | Status/secondary accent only |
| Red | `#EF4444` | — | Risk/error only |
| Green | `#22C55E` | — | Positive metric only |

### Corrections required

1. **`#4F46E5` is OFF-PALETTE.** It appears in
   `public/clearbuild-capability-pack.html:998` (and the `dist/` copy). It is
   Tailwind Indigo-600, not the brand indigo. Replace with `#6366F1` (primary
   accent) or `#4338CA` (Indigo Dark) depending on whether it is a base or a
   darker/hover state. This is the only true palette breach found.
2. **Case normalisation.** `focus: '#6366f1'` and `surface: '#0f172a'` are the
   right colours in lowercase. The brand rule is "apply all colours exactly";
   normalise to the canonical uppercase hex so a literal string compare against
   the spec passes. Cosmetic, but cheap and removes ambiguity.
3. **No Tailwind import in branded documents.** The spec says "do not import
   Tailwind" for generated client documents. That rule is about the document
   pipeline, not a marketing site, so the website using the Tailwind CDN is
   acceptable. But the embedded capability-pack HTML is a *document* served from
   the site — it must keep its colours hardcoded and on-palette (which is why the
   `#4F46E5` breach matters).
4. Everything else the site uses (`#1E293B`, `#334155` in the scrollbar,
   `white/10` opacity borders) is on-palette or a neutral tint and is fine.

---

## 4. Logo usage

**Current state:** the site does not use the brand logo assets at all.
`components/Logo.tsx` draws an abstract two-block CSS mark plus a text wordmark.
The revamp should replace this with the real SVG assets from
`clearbuild-os/assets/branding/`.

Available assets:

| File | Use |
|---|---|
| `ClearBuild-Logo-White.svg` | Dark backgrounds — nav bar, hero, footer (the site is dark throughout) |
| `ClearBuild-Logo-Black (1).svg` | Light backgrounds — only if a light section is introduced |
| `ClearBuild-Symbol-White (1).svg` | Monogram only — favicon, OG image mark, watermark |

### Mapping for this site (dark theme throughout)

- **Nav bar:** `ClearBuild-Logo-White.svg`. Brand standard for an HTML header is
  `height: 72px; width: auto`; a marketing nav can sit a little tighter, but do
  not go below the document-header proportions and never distort. Keep
  `width: auto` so aspect ratio is preserved.
- **Footer:** `ClearBuild-Logo-White.svg`, same asset, sized to match or sit
  slightly smaller than the nav.
- **Favicon:** `ClearBuild-Symbol-White (1).svg` (the monogram), exported to the
  required favicon sizes / `.ico`. The site currently has no favicon link.
- **OG / social image:** monogram on an Obsidian `#020617` field, or the white
  wordmark on Obsidian. Keep clear space.

### Sizing and integrity rules (from the spec, non-negotiable)

- Never stretch or distort logos. Always `width: auto` against a fixed height.
- Never approximate logo colours; use the SVG source on screen.
- Minimum clear space on all sides equals the logo height.
- Monogram-as-watermark, if ever used, is 5% opacity only.
- Use the real SVG; never rebuild the mark with CSS shapes (the current
  `Logo.tsx` does exactly this and should be replaced).

---

## 5. Brand do's and don'ts for the revamp

**Voice and copy**

- Do write in UK English (organisation, optimise, programme, behaviour). The
  existing copy already uses "Itemised" and "20 years' experience"; keep that.
- Do keep the tone restrained, senior, and specific. The firm is led by a senior
  project manager with 20+ years on major civil engineering projects; the copy
  should sound like that person, not like a SaaS landing page.
- Do not use hype or marketing inflation ("revolutionary", "game-changing",
  "cutting-edge", "supercharge"). State the offer plainly.
- **Do not use em dashes — anywhere.** Zero tolerance across the whole site:
  copy, headings, meta descriptions, alt text. Use a comma, full stop, or colon.
  (This document follows the rule; the revamp must too.)
- Do not use italics for emphasis; use bold.
- Do not use lorem ipsum or placeholder images in anything that ships.

**Visual**

- Do apply palette hex values exactly; no approximations, no Tailwind default
  indigo (`#4F46E5`/`#6366F1` distinction matters).
- Do use Obsidian `#020617` as the page/hero ground and Indigo `#6366F1` as the
  single primary accent. Indigo is the accent, not blue, and not a second blue.
- Do keep accent colours (amber, red, green) in their semantic roles only;
  do not decorate with them.
- Do not introduce gradients, glows, or colours outside the approved palette.

**Name and assets**

- Do write "Clear Build Consulting" with the space, every time, in every
  human-readable string.
- Do use the real SVG logo assets; do not redraw the mark.
- Do fix source files, never `dist/` artefacts, then rebuild.

---

## 6. Brand acceptance checklist

The final revamped site must pass all of the following before publish:

- [ ] No human-readable "ClearBuild" (closed up) anywhere: title, metadata,
      copy, alt/aria text, OG/Twitter tags. Verify with a grep that excludes
      asset filenames and CSS class names.
- [ ] Fonts loaded are DM Sans + DM Mono + Manrope (700/800) only. Inter is not
      loaded for screen rendering.
- [ ] Body text renders in DM Sans; section/eyebrow labels in DM Mono; large
      display headings in Manrope ExtraBold.
- [ ] Every colour used is in the approved palette table. No `#4F46E5`. Indigo
      accent is `#6366F1`; hover/pressed uses `#4338CA`. Hex values are uppercase
      and match the spec exactly.
- [ ] Nav and footer use `ClearBuild-Logo-White.svg` (real SVG, `width: auto`,
      not the CSS mark). Favicon uses the monogram. No distortion; clear space
      respected.
- [ ] OG title, Twitter title, and meta description exist and read
      "Clear Build Consulting".
- [ ] Copy is UK English, restrained, no hype, no em dashes, no italic emphasis,
      no placeholder content.
- [ ] `dist/` was regenerated from corrected source, not hand-edited; a
      pre-publish grep confirms no "ClearBuild" or `#4F46E5` survived into the
      build.
- [ ] Confirmed in-browser (Playwright) that the rendered site shows the right
      fonts, the white SVG logo, and the corrected name spacing.
