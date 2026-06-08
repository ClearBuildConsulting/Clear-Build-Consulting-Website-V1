# Clear Build Consulting — Design Direction (Plan Only)

Author: Web Design Expert
Status: Direction for stress-testing. No source files edited.

Benchmark intent: top-5% consultancy/agency sites (think the restraint of a McKinsey/Arup digital report crossed with the precision of a high-end product studio site). Sophistication over spectacle. Everything below stays inside the locked stack (React 19 + TS + Vite, react-router-dom v7, lucide-react) and the existing obsidian/indigo brand.

---

## 1. Design concept / art direction

**"Structural clarity."** The site behaves like a well-engineered building: a precise structural grid you can feel, drawn lines that connect ideas, and light that reveals depth as you move. We take the brand's existing obsidian-and-indigo palette and add one new dimension — a thin, deliberate line language and restrained depth (layered surfaces, soft inner light) — so the page reads as engineered rather than decorated. The result is calm, senior, and quietly confident: nothing flashes, but every section feels considered, and the indigo accent is used like a structural engineer's red pen — sparingly, only where it carries meaning.

The single biggest lever from "flat and generic" to "top-5%" is **a coherent line/grid system plus disciplined motion**, not more colour or imagery.

---

## 2. Hero treatment

Concrete and specific. Replace the current left-aligned two-column text block with a full-viewport-height hero (min-height ~88vh) built on a visible structural grid.

- **Layout:** Asymmetric. Left ~60% holds the headline and primary actions; right ~40% holds the signature graphic. On mobile the graphic sits behind the text at low opacity.
- **Type scale:** Push the headline far beyond today's `text-6xl`. Display headline at clamp(3.25rem, 7vw, 6.5rem), Manrope 700, tight leading (1.02), `-0.02em` tracking. Keep the line "Clear, actionable advice." but set it as two stacked lines with the word that matters most ("Clear") allowed to breathe. Sub-copy stays Inter, `text-xl`, `text-structural`, max-width ~46ch.
- **Signature graphic — the "structural blueprint" field:** A thin-line vector lattice rendered in SVG/Canvas: a faint isometric grid of intersecting lines (1px, white at 4–8% opacity) over the obsidian background, with a handful of "nodes" (small indigo dots) at intersections. A subtle, slow parallax and a pointer-reactive parallax (lines shift 6–10px toward the cursor, eased) make it feel like depth, not wallpaper. One or two lines are "live" — a thin indigo stroke that draws itself in on load (SVG stroke-dashoffset), suggesting a path being defined. This is the visual metaphor for the whole business: mapping reality, then drawing a clear path. It is GPU-cheap, never distracting, and degrades to a static SVG with `prefers-reduced-motion`.
- **Hero entrance:** Headline words rise + fade in a tight stagger (40ms apart, 12px travel, 400ms, custom ease-out). The two CTAs fade up last. Total choreography under 900ms — felt once, never repeated.
- **Trust strip directly under hero:** A single quiet row of client/role logos or names ("Mace", "Major Infrastructure Delivery", etc.) at low opacity, establishing seniority above the fold without a banner.

---

## 3. Motion & animation strategy

Principle: **motion explains structure; it never performs.** If an animation does not aid comprehension or hierarchy, it is cut. Everything respects `prefers-reduced-motion` (all transforms collapse to instant or simple opacity).

What moves:
- **Scroll-reveal (primary technique):** Sections and cards fade up 16–20px as they enter the viewport, via IntersectionObserver, triggered once. Threshold ~15%. Duration 500–600ms, ease-out. This single technique does 80% of the perceived upgrade.
- **Stagger:** Grouped items (the three service cards, list items, stat figures) reveal in sequence, 60–80ms apart, so the eye is led left-to-right / top-to-bottom.
- **Hero parallax:** Only the hero lattice — pointer- and scroll-linked, small amplitude, heavily eased. Nowhere else.
- **Number count-up:** Any metric/stat (engagements, years, packages delivered) counts up once on reveal. Reads as substance, not decoration.
- **Line-draw:** SVG stroke-draw used for the hero path and for the process diagram (see features). Drawing a line = the brand promise made literal.
- **Micro-interactions:** Buttons and cards get a 150–200ms border/lift response on hover (border brightens, a 1px indigo top-edge or a 2–4px translateY). Links keep the existing arrow but the arrow nudges 3px on hover.

What does NOT move:
- Body text, headings (after entrance), navigation, the logo, testimonials text. No autoplay carousels that move on their own. No looping background video. No bouncing, no spring overshoot, no scroll-jacking, no parallax on content blocks.

Implementation note for the engineer: this can ship with a tiny custom `useScrollReveal` hook (IntersectionObserver, ~30 lines) and CSS transitions — no heavy animation dependency required. Framer Motion is optional and only justified if the stagger/orchestration becomes hard to manage by hand; flag as a build decision, not a requirement.

---

## 4. Standout features / signature moments

Five, each earning its place for a senior advisory audience:

1. **The hero structural-lattice field (above).** The memorable first impression and the brand metaphor in one. Earns its place because it is unmistakably "Clear Build" and cannot be lifted from a template.

2. **"How the AI audit works" — animated process diagram.** A horizontal 4-step pathway (Map reality → Identify friction → Define the path → Implement with discipline) rendered as connected nodes with a line that draws between them as you scroll. Each node expands on hover/tap to reveal one sentence and the deliverable. This replaces a wall of prose with a credibility-building visual that mirrors how the firm actually thinks. Reused as the spine of the AI Advisory page.

3. **Service "explorer" cards (evolved from the flat grid).** Each of the three services becomes a tall card with a quiet expand: a thin indigo line runs down its left edge, and on hover the card lifts, the icon animates a single stroke, and a "what you get / who it's for / typical outcome" micro-panel slides in. Restrained, but it turns three identical boxes into three distinct, scannable propositions.

4. **A measured "proof" band — counters + named endorsements.** A full-width darker band with 3–4 count-up figures (e.g. years in major infrastructure, packages delivered, disciplines covered) set in large Manrope, paired with the existing real endorsements (Mace, infrastructure directors) presented as quiet, well-typeset quotations rather than a scrolling carousel. Seniority is shown through restraint and real names, not stars or logos-soup.

5. **Domestic Tender Packs — "what's inside the pack" visual.** A clean, annotated exploded-document graphic (cover, scope, specification, drawings register) using the line language, so a homeowner instantly understands the tangible deliverable. Converts an abstract service into something you can see. This is the one moment where a more illustrative graphic is warranted because the audience is less technical.

(If scope tightens to two weeks, ship #1, #2, #3 first — they carry the brand and the primary conversion path. #4 and #5 are high-value but page-specific.)

---

## 5. Layout system

- **Grid:** Adopt a true 12-column grid with generous gutters, max content width ~1200–1280px (keep existing container breakpoints). Embrace **asymmetry** — alternate sections between 7/5 and 5/7 splits rather than the current centred, full-width-text default. Asymmetry reads as designed; centred everything reads as a template.
- **Spacing rhythm:** Establish a consistent vertical scale. Section padding steps up from today's `py-24` to a clear rhythm: large sections `py-32` (128px), standard `py-24`, tight `py-16`, on an 8px base unit. Whitespace is the primary luxury signal — be more generous, not busier.
- **Section patterns:** Introduce alternating surface treatments so the page has cadence: obsidian (base) → a fractionally lighter surface band (`surface`/#0f172a) → obsidian, with hairline `border-white/5` dividers and the occasional faint top-edge indigo glow on a key band. Each section gets a small eyebrow label (uppercase, tracked, `text-structural`, e.g. "01 — Services") to reinforce the structural/numbered-spec feel.
- **Cards evolve from flat to layered:** Keep `rounded-sm` (the squared, engineered look is on-brand — do not round more). Replace the flat `border-white/5` box with: a layered surface, a 1px border that brightens on hover, a thin indigo accent edge on the primary (AI) service, and real internal hierarchy (eyebrow → title → body → outcome → link). Equal-height, but visually distinct.
- **Type system:** Keep Manrope (display) + Inter (body) — they are a strong, senior pairing. Tighten the scale and tracking on display sizes, lighten body to Inter 300/400 as today, and use one accent weight (Inter 500) for inline emphasis instead of bold-white everywhere.

---

## 6. What to avoid (anti-patterns that cheapen a senior advisory brand)

- **Gratuitous gradients / glow / neon.** Indigo is an accent, not a wash. No purple hero gradients, no glowing buttons. Keep the obsidian dominant.
- **Generic stock photography** (handshakes, glass towers, abstract "AI" brains, blue circuit imagery). Use the line/vector language instead. No literal robot/brain clichés for the AI service.
- **Autoplay carousels and looping video.** They signal marketing-site, not advisory. The testimonial carousel should become a static, well-set quotation block.
- **Spring/bounce/overshoot motion, scroll-jacking, mandatory full-screen scroll snapping.** Senior audiences read fluently; do not hijack their scroll.
- **Emoji, exclamation marks, hype language, badges/“As seen in” logo walls without substance.** Tone stays understated. (UK English, no em dashes, per brand.)
- **Over-rounding, drop-shadow soup, glassmorphism everywhere.** Depth comes from layered flat surfaces and hairlines, not heavy blur or shadow.
- **Animating everything.** If every element moves, nothing feels considered. Motion is rationed.
- **Three identical boxes.** The single clearest "before" tell. Differentiate the services.

---

## Build-decision flags for the consolidated plan

- **Tailwind CDN → real build:** Strongly recommended and assumed by this direction (arbitrary values, custom keyframes, content purging, and a proper config make the line/motion system maintainable). Defer to the frontend engineer's assessment, but the design does not depend on exotic features — it degrades gracefully if CDN is retained short-term.
- **Animation library:** Optional. Ship with a hand-rolled IntersectionObserver hook + CSS transitions first; only adopt Framer Motion if orchestration complexity demands it.
- **Performance budget:** Hero lattice must be GPU-light (transform/opacity only) and fully static under `prefers-reduced-motion`. No layout-thrashing scroll listeners — use IntersectionObserver and `requestAnimationFrame`-throttled pointer parallax.
- **Two-week priority order:** (1) design tokens + grid/spacing system + type tightening, (2) hero with lattice, (3) scroll-reveal across all sections, (4) evolved service cards, (5) animated AI process diagram, (6) proof band + quotation treatment, (7) tender-pack graphic. Stop-anywhere-and-it-still-ships ordering.
