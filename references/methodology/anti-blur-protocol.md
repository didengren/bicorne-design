# Anti-Blur Protocol

> Merged from admin-design-spec's anti-blur protocol. Prevents AI-averaged aesthetics from eroding design intent.

---

## 1 · What Is Design "Blur"

AI Design Blur refers to: the loss of a distinct aesthetic stance in design caused by heavy reliance on AI-generated content.

**Symptoms**:
- Overly safe colors (excessive grays, light blues)
- Overly symmetric layouts (perfect centering, equal spacing)
- Visual rhythm lacking tension (no contrast, no surprise)
- Convergent font-weight choices (all 400/500, no extreme pairings)
- Overly uniform spacing (no dramatic variation for breathing room)

---

## 2 · Establish Aesthetic Anchors

Select 3-5 "aesthetic references" (not competitors) at project kickoff.

**Can be**:
- Artworks (e.g., Mondrian's geometric compositions, Tadao Ando's exposed concrete)
- Graphic design movements (e.g., Swiss International Style, Japanese Minimalism)
- Brand cases (e.g., Linear's dark engineering aesthetic, Stripe's light luxury)

**Usage**:
- After each AI output, compare against anchors: "Does this design carry the anchor's character?"
- If the answer is no, adjust

---

## 3 · The "Why" Three-Question Protocol

For every visual decision in AI output, answer three questions:

1. **Why this color?**
   - Acceptable: Because it conveys emotion X / Because it contrasts with brand color Y / Because it achieves 4.5:1 contrast on a dark background
   - Unacceptable: Because it looks fine / Because AI generated it / Because it's the default

2. **Why this spacing?**
   - Acceptable: Because visual breathing is needed here / Because 24px is the standard card padding / Because hierarchy separation from the title above is needed
   - Unacceptable: Because it looks even / Because 16px is a common value

3. **Why is this element here?**
   - Acceptable: Because the user's visual path goes top-left to bottom-right / Because the CTA must be visible above the fold / Because information density needs to decrease here
   - Unacceptable: Because it's symmetric / Because it's usually placed here

**Rule**: If any question cannot be answered, that design decision must be reconsidered or replaced.

---

## 4 · Deliberately Create "Tension"

Make deliberate attempts outside the safe zone. Tension is not breaking rules — it is finding the limit of the aesthetic boundary within the rules.

### Tension Creation Methods

| Method | Safe Zone | Tension Zone | Example |
|--------|-----------|--------------|---------|
| Font-weight pairing | All 400 | 100 + 900 | Stripe: sohne-var 300 + 700 |
| Spacing contrast | All 16px | 4px + 96px | Linear: compact labels + large whitespace |
| Color purity | All grayscale | Pure color + achromatic | Nike: pure black/white + zero-color UI |
| Proportion asymmetry | 1:1 symmetric | 1:3 asymmetric | Vercel: large title + small nav |
| Border-radius contrast | All 8px | 0px + 9999px | Nike: zero-radius cards + pill CTA |

### Tension Checklist

- [ ] Is there at least one extreme font-weight contrast (difference ≥ 300)?
- [ ] Is there at least one extreme spacing contrast (min vs max ≥ 4×)?
- [ ] Is there at least one color purity contrast (pure color vs achromatic)?
- [ ] Is there at least one proportional asymmetry?
- [ ] Does the overall visual rhythm have "fast and slow" variation rather than uniformity?

---

## 5 · Blur Risk Assessment

For each design output, assess the blur risk level:

| Risk Level | Characteristics | Action |
|-----------|----------------|--------|
| 🟢 Low | Every decision has a stated intent; clear aesthetic anchor reference | Pass |
| 🟡 Medium | Some decisions have vague intent, but overall direction is clear | Reconsider vague decisions |
| 🔴 High | Many decisions cannot state intent; lacks a distinct aesthetic stance | Redesign entirely |

---

## 6 · Anti-Blur Declaration

All design artifacts in this skill must undergo a human aesthetic validation stage. AI-assisted variants may only be accepted or rejected on the premise that "intent can be stated." Using "AI generated" as a reason to bypass the aesthetic judgment layer is prohibited. Designers are responsible for the existence of every pixel.
