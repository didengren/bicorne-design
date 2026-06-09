# Anti-AI Slop Checklist

> Identify and eliminate typical defects in AI-generated content. Detection items and fix strategies are one-to-one mapped.

---

## 1. What is AI Slop

AI Slop refers to typical defect patterns in AI-generated content, manifesting as visual "plastic feel" and content "emptiness."

---

## 2. Visual Slop Detection Checklist

### Color

- [ ] **Rainbow gradient abuse** — Purposeless multi-color gradients (brand → purple → pink → orange)
- [ ] **Gray overuse** — Large areas of #f5f5f5 / #e5e5e5 / #d4d4d4 without brand color injection
- [ ] **Blue-purple default** — Using AI-default blue-purple palette (#6366f1 / #8b5cf6) instead of brand colors
- [ ] **Insufficient contrast** — Text-to-background contrast ratio below 4.5:1
- [ ] **Semantic color misuse** — Using success/warning/danger colors for decoration rather than status expression

### Typography

- [ ] **Font weight convergence** — Heading vs body weight difference < 300, lacking extreme weight contrast
- [ ] **Uniform spacing** — All element spacing identical, lacking visual rhythm
- [ ] **Center-alignment compulsion** — All content center-aligned, lacking asymmetric tension
- [ ] **Overly long headings** — Headings exceeding 15 characters, lacking refinement
- [ ] **Missing negative letter-spacing** — No negative letter-spacing at font-size ≥ 32px, appearing loose

### Layout

- [ ] **Card stacking** — Infinite equal-sized card grids, lacking hierarchy
- [ ] **Three-column compulsion** — All content in three equal-width columns, lacking variation
- [ ] **Icon overuse** — Every feature point paired with an icon, but icons add no informational value
- [ ] **Empty hero** — Hero section only has heading + subtitle + CTA, no product screenshot
- [ ] **CTA repetition** — Page contains 3+ identical CTAs

### Interaction

- [ ] **No hover feedback** — Cards/buttons have no visual change on hover
- [ ] **Missing states** — Lacking Loading / Error / Empty states
- [ ] **Animation overload** — More than 3 simultaneous entrance animations on screen, causing visual fatigue
- [ ] **Missing focus** — Interactive elements have no focus state

---

## 3. Content Slop Detection Checklist

- [ ] **Hollow subtitles** — "Empowering enterprise digital transformation" / "Making innovation accessible"
- [ ] **Fake data** — Using "Lorem ipsum" or "John Doe" instead of real data
- [ ] **Over-promising** — "10x efficiency boost" / "Zero learning curve"
- [ ] **Feature listing** — Listing 20 features without scenario context
- [ ] **Hollow social proof** — "Trusted by 10,000+ teams" without specific case studies

---

## 4. Slop Fix Strategies

| Slop Type | Fix Strategy |
|-----------|-------------|
| Rainbow gradient | Limit to brand color + 1 accent color; unify gradient direction |
| Gray overuse | Inject brand color into gray areas (borders, icons, labels) |
| Blue-purple default | Replace with colors.brand.500 in token.json; prohibit #6366f1 / #8b5cf6 |
| Insufficient contrast | Text/background contrast ≥ 4.5:1 (large text ≥ 3:1); verify with WCAG tools |
| Semantic color misuse | Semantic colors only for status feedback; use brand or neutral colors for decoration |
| Font weight convergence | Headings use 700-900, body uses 300-400; difference ≥ 300 |
| Uniform spacing | Key areas use 2-4x spacing contrast (e.g., 8px vs 32px) |
| Center-alignment compulsion | Hero left-aligned, CTA right-aligned; create asymmetry |
| Overly long headings | Headings ≤ 15 characters; split into heading + subtitle if exceeded |
| Missing negative letter-spacing | Set letter-spacing to -0.02em ~ -0.04em at font-size ≥ 32px |
| Card stacking | Introduce featured card (2x size) + standard card mixed layout |
| Three-column compulsion | Introduce unequal-width columns (e.g., 2:1) or mixed single/double column layouts |
| Icon overuse | Only use icons when they convey information; otherwise remove |
| Empty hero | Add product screenshot / UI demo / data visualization |
| CTA repetition | Only 1 primary CTA per page; secondary CTA no more than 1 |
| No hover feedback | Cards: add background/border color change on hover; buttons: darken background or add shadow |
| Missing states | Complete Loading / Error / Empty tri-state; refer to `./ui-states.md` (generic) or `../../dashboards/ui-states.md` (dashboard 6-state) |
| Animation overload | Only 1-2 key elements in first screen have entrance animations; rest appear silently |
| Missing focus | Add focus-visible outline to all interactive elements; use brand color |
| Hollow subtitles | Replace with specific scenario descriptions + data support |
| Fake data | Replace with real business data or industry-typical data; prohibit Lorem ipsum |
| Over-promising | Remove unquantifiable claims; replace with specific feature descriptions or verifiable data |
| Feature listing | Each feature paired with 1 scenario description; group by scenario if exceeding 8 |
| Hollow social proof | Add specific client names/case links; remove if unverifiable |

---

## 5. Slop Scoring

For each design output, assess the slop level:

| Score | Meaning | Action |
|-------|---------|--------|
| 0-2 | No significant slop | Pass |
| 3-5 | Minor slop, fixable | Targeted fixes |
| 6-8 | Severe slop | Major revision |
| 9-10 | Comprehensive slop | Redesign |
