# Market Benchmark & Positioning Brief
**Clear Build Consulting — website revamp (top-5% aspiration)**
Author: Competitor / Market Analyst · Date: 2026-06-06 · Status: PLAN ONLY (no site edits)

## How to read this
Mike named no rival. So this is aspirational benchmarking against the genuine top tier of
consultancy / advisory / boutique-studio sites in 2026 — for taste, polish, and conversion craft.
Clear Build sells to two very different buyers (senior B2B advisory clients; and homeowners buying
a paid tender pack), so the bar is split where it matters. Recommendations are scoped to a realistic
2-week build on the existing dark React SPA.

---

## 1. The bar — what distinguishes top-5% consultancy/advisory sites (2026)

The consistent pattern across the best advisory and VC/boutique sites right now is **quiet
confidence**: the work of persuasion is done by typography, spacing, specificity and proof — not by
volume, gradients, or animation. The sites that read as "top tier" are *more restrained*, not more
elaborate.

1. **Messaging-first hierarchy — positioning before pixels.** The hero copy does the load-bearing
   work in the first three seconds: what you do, who it's for, why you're different. Visuals serve
   the message, never the reverse. Sites that lead with abstract visuals before clear positioning
   fail evaluation — and increasingly fail the AI engines buyers use to shortlist vendors.
   *(everything.design — "Trust Signals Now Have to Be Huge")*

2. **Editorial restraint as a credibility signal.** Radical Ventures, Greylock and Lux Capital
   communicate seriousness through typography, spacing and tone rather than flashy interaction —
   "minimal, calm, consistent." For a senior brand, restraint *is* the flex. This is squarely
   Clear Build's lane (obsidian + indigo, no-hype) and the single biggest natural advantage to lean
   into. *(joinamply VC firm roundup)*

3. **Outcome-anchored case studies, not logo walls.** The strongest proof format is tight and
   skim-resistant: which client, what problem (in their words), what was done, what changed, the
   numbers — outcome visible in the *first scroll*, methodology below if the reader continues, client
   quote embedded next to the decision it refers to. "We helped X double inbound demos in 90 days"
   beats "trusted by industry leaders" by an order of magnitude. Crucially: the format must survive
   being **forwarded** between members of a buying committee. *(everything.design)*

4. **Stakeholder-specific conversion paths.** A single "Book a call" CTA is a transaction artefact.
   Senior buying involves a champion, an exec sponsor, a technical/operational evaluator, sometimes
   finance. The best sites give each a path: a "how it works / methodology" page for the evaluator, a
   business-case / ROI framing for finance, a credibility/about page for the sponsor. Friction
   reduction for sceptical stakeholders beats CRO for one user. *(everything.design)*

5. **Show, don't tell, expertise.** Top consultants demonstrate rather than assert — essays,
   frameworks, a named methodology, a downloadable artefact (Clear Build already has a *capability
   pack* HTML in `/public`). Thought-leadership-as-proof is now table stakes for advisory.
   *(knapsackcreative; webaward consulting trends)*

6. **Restrained, purposeful motion.** The bar is *subtle* — scroll-reveal of sections, gentle hover
   states, one considered transition — used to guide attention and add depth, not to entertain.
   Parallax/scrollytelling appears on the best sites but always in service of a narrative, never
   decoration. For a senior brand, over-animating reads as junior. *(poweredbysearch 2026 trends)*

7. **Specific, falsifiable proof over adjectives.** "20 years delivering complex civil engineering
   projects" + named referees from Mace / Carillion / major infrastructure is far stronger than
   "experienced" or "trusted." Clear Build's testimonials are unusually high-calibre (real names,
   real senior titles) — they should be elevated, not buried in a horizontal scroller.

8. **Scannable, single-narrative homepage.** The best homepages read top-to-bottom as one argument:
   positioning → proof → what we do → how it works → who we are → clear next step. Flat card grids
   that present three services as equals (Clear Build's current pattern) read as a brochure, not an
   argument.

---

## 2. What converts senior B2B advisory buyers

- **Specificity is the trust signal.** Named clients, named referees with senior titles, concrete
  numbers (years, project value, outcomes). Surface badges and "trusted by" strips no longer move the
  needle — they prove access, not outcomes.
- **A named, legible methodology.** Senior buyers de-risk by understanding *how* you work before they
  commit. "We map your reality before suggesting tools" is a great line — it should become a visible,
  numbered method (e.g. Map → Diagnose → Path → Implement), not a single sentence.
- **Founder credibility, made human and senior.** Solo/boutique is an asset for this buyer — they're
  buying *Mike*, not a logo. A strong, plain-spoken About with a real photo, track record, and a
  point of view outperforms a faceless "we."
- **Disqualification as a trust move.** "If we aren't the right fit, we say so" is exactly right for
  selective positioning — make it prominent. Senior buyers trust advisors who turn work away.
- **Proof that survives forwarding.** Assume the champion screenshots one section and sends it up the
  chain. Each proof block should stand alone and be self-explanatory.

## 3. What converts homeowners for a paid tender pack

Different audience, different emotional job: a homeowner is anxious about being ripped off by
builders and unsure what they're buying. They need **reassurance and clarity**, not gravitas.
Clear Build's `DomesticTender` page is already the strongest page on the site (it has tiers, a
process, an FAQ) — the patterns below should be reinforced and partly surfaced on the homepage.

- **Transparent, visible pricing.** 78% of homeowners want pricing shown; only a minority of trades
  show it — so showing it is a differentiator and a lead pre-qualifier. Clear Build already shows
  fixed prices (£250/£350/£650–800) and a £50 deposit — keep this prominent and explain *what drives
  the variation* on the top tier. *(hookagency; ymbia)*
- **A concrete "How it works."** A homeowner buying a document needs to see the steps and the
  artefact. The existing 3-step process is good; add a **sample/redacted page of an actual tender
  pack** so they see what £250 buys. Showing the deliverable is the single biggest reassurance lever.
- **Plain-language outcome framing.** "Get like-for-like quotes so you can compare builders
  apples-to-apples, avoid hidden costs and disputes." Lead with the fear it removes, not the document
  it produces.
- **Homeowner-voiced reassurance.** The current testimonials are all infrastructure executives —
  perfect for B2B, less relatable for a nervous homeowner. As soon as one exists, add a homeowner
  testimonial. Until then, frame the senior pedigree as "the rigour used on £multi-million projects,
  applied to your extension."
- **FAQ that pre-empts objections.** Already present and good (revisions, "do you price the works",
  scope changes). This is exactly the format homeowners need.

## 4. Gaps in the current Clear Build site vs the bar

Assessed against the live code (`pages/Home.tsx`, `pages/DomesticTender.tsx`, `pages/AIAdvisory.tsx`,
`App.tsx`). The brand and copy discipline are already strong; the gaps are structural and conversion-craft.

- **Homepage is a brochure, not an argument.** Three services sit in a flat equal card grid. There's
  no narrative spine and no visual hierarchy signalling that AI Advisory is the lead offer. The hero
  also tries to introduce all three services in two dense paragraphs — diluting the first-three-second
  message.
- **No case studies — the highest-value missing asset.** The site asserts "20 years delivering
  complex projects" but shows zero outcome-anchored stories. This is the #1 gap for the B2B buyer.
- **Proof is under-leveraged.** Genuinely senior, named testimonials are hidden in a horizontal
  scroller (most visitors will see one). They deserve a dedicated, prominent treatment.
- **Single CTA everywhere.** Every path funnels to "Book a call." No lower-commitment path (download
  the capability pack, see how the method works, see a sample tender pack) for buyers not yet ready
  to book.
- **No methodology made visible.** The "map your reality first" philosophy is stated but never
  rendered as a legible, numbered method — the thing senior buyers most want to see.
- **No motion / no depth.** Brief mentions "no motion" — the site is static. The bar isn't heavy
  animation, but *zero* considered motion reads as a template. Scroll-reveal + refined hover states
  would lift perceived quality materially at low cost/risk.
- **Tender-pack deliverable is invisible.** Strong pricing and process, but no sample of the actual
  pack — the one artefact that converts a hesitant homeowner.
- **Brand-name inconsistency leaking into copy.** Home.tsx line ~190 reads "ClearBuild" (one word).
  Per house standard it must be "Clear Build." Small, but a top-5% site doesn't ship this. *(flag to
  whoever owns copy — not in my edit scope)*

## 5. Prioritised recommendations (ranked for a 2-week scope)

1. **Rebuild the homepage as a single top-to-bottom argument.** Sharpen the hero to one
   load-bearing line + one sub-line (lead with AI Advisory; mention the other two services as a
   secondary line, not a co-equal paragraph). Order: hero → senior proof → "Our method" →
   the three services (visually weighted, AI lead) → about/credibility → clear next step. *High
   impact, low risk, no new content required.*

2. **Add 2–3 outcome-anchored case studies (or "engagement snapshots").** Tight format: client/sector,
   problem in their words, what was done, what changed, a number, embedded quote. If full case studies
   aren't approved/available, ship anonymised "engagement snapshots" (sector + outcome + figure). *This
   is the biggest single credibility lever for the B2B buyer.*

3. **Make the methodology visible.** Turn "we map your reality before suggesting tools" into a named,
   numbered method (e.g. Map → Diagnose → Prioritise → Implement) with one line each. Reuse on Home
   and the AI Advisory page. *Directly answers what senior buyers most want to see.*

4. **Elevate the testimonials out of the scroller.** Present the three senior endorsements as a
   prominent, static, well-typeset proof section (named, with titles). Forwarding-proof each block.

5. **Add a secondary, lower-commitment CTA path.** Surface the existing capability pack as a
   "Download the capability pack" action, and a "See how the AI audit works" link — so visitors who
   won't book yet still convert to a next step. Keep "Book a call" as the primary.

6. **Show the tender-pack deliverable.** Add a redacted/sample page image (or a short "what's inside"
   visual) to the Domestic Tender page, beside the pricing. *Highest homeowner-conversion lever.*

7. **Introduce restrained motion.** Section scroll-reveal (fade/translate-up on enter) + refined
   hover states on cards/links + one considered hero treatment. Subtle only — this lifts perceived
   tier without touching the brand's calm. *(use IntersectionObserver / CSS; no heavy deps)*

8. **Tighten cross-audience clarity.** A homeowner and a CFO should each, within one screen of the
   homepage, see the path that's for them. Two clearly labelled entry points ("For businesses" /
   "For homeowners") near the top resolves the dual-audience tension without splitting the brand.

## 6. What to AVOID (erodes trust for a senior advisory brand)

- **Hype language and superlatives.** "Revolutionary," "game-changing," "cutting-edge," "world-class."
  These read as junior and are already banned in Clear Build's house style — hold the line everywhere.
- **Heavy / showy animation.** Parallax-everything, looping background video, scroll-jacking,
  cursor effects. For a senior advisory brand this signals agency-theatre, not authority. One
  considered motion beats ten.
- **Generic stock photography & abstract 3D blobs.** Faceless "business handshake" imagery destroys
  the boutique, founder-led credibility. Prefer real photos (Mike), real artefacts (the tender pack),
  or restrained typographic compositions.
- **Logo walls / "trusted by" strips without substance.** Proves access, not outcomes — and for a
  solo/boutique firm an empty or thin logo wall actively *weakens* the case. Use named, titled
  testimonials and concrete outcomes instead.
- **Fake-scarcity and aggressive sales patterns.** The "£500 ~~£500~~ £250 — 50% OFF, Launch Price"
  treatment works for the homeowner tender product but must NOT bleed into the B2B advisory pages —
  discount-theatre erodes senior trust. Keep the two audiences' tones distinct.
- **Burying the lead under design.** Don't let a beautiful hero animation delay the "what we do / who
  for / why us" message past three seconds. Message first, always.
- **One CTA fits all.** Forcing every visitor to "Book a call" loses the large share not yet ready —
  but equally, don't over-fragment into a dozen CTAs. Two-to-three intentful paths is the sweet spot.

---

### Sources
- everything.design — *Trust Signals Now Have to Be Huge* (B2B trust signals, case-study format,
  stakeholder paths): https://www.everything.design/blog/trust-signals-b2b-website
- Powered by Search — *2026 B2B Web Design Trends* (motion, CTAs, social proof):
  https://www.poweredbysearch.com/learn/b2b-website-design-trends/
- Knapsack Creative — *Best Consulting Websites* (positioning, social proof, show-don't-tell):
  https://knapsackcreative.com/best-consulting-websites
- Amply — *Best VC Firm Websites 2026* (Radical Ventures / Greylock / Lux — editorial restraint):
  https://www.joinamply.com/post/best-vc-firm-website-examples
- Hook Agency — *Roofing Pricing Transparency* (78% of homeowners want pricing shown):
  https://hookagency.com/blog/roofing-pricing-transparency/
- Ymbia — *Transparent Market Pricing in Construction* (homeowner trust via comparability):
  https://ymbia.com/blog/transparent-market-pricing-construction
- WebAward — *Best Consulting Websites* (industry benchmark program):
  https://www.webaward.org/category/Consulting/best-consulting-websites.html
