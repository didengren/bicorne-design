# Slide Design Specification

> Framework-agnostic — applies to Keynote, PPT, Google Slides, HTML slides, or any medium.

---

## 1. Pre-Production Decisions

### Delivery Format Decision Tree

Format choice determines **visual freedom** and **collaboration mode**:

```
Delivery format selection:
   │
   ├── Presentation / archival only   → Source file, maximum visual freedom
   │
   ├── Also need PDF (print / share / archive) → Export PDF, no visual constraints
   │
   └── Also need editable format (colleagues edit text) → Deliver in native format
                                                     Cross-tool conversion loses complex visual effects
```

**Cross-tool conversion paradox**: Editable format + complex visual effects = real contradiction (only when crossing tools). No such contradiction within the same tool. Let the user make the trade-off — never silently downgrade visuals.

---

## 2. Showcase-First Workflow

**When a deck has ≥ 5 slides, never write straight from page 1 to the last page.**

### Correct Sequence

1. Pick **2 page types with the greatest visual contrast** as showcases (e.g., "Title slide" + "Mood / Quote slide")
2. Screenshot and let the user confirm the grammar (masthead / typeface / color / spacing / structure / bilingual ratio)
3. Once direction is approved, batch-produce the remaining N-2 slides, each reusing the established grammar
4. After all slides are done, composite + export derivatives

**Why**: Writing 13 slides straight through → user says "wrong direction" = rework 13 slides. Doing 2 showcase slides first → wrong direction = rework 2 slides. Once visual grammar is established, the decision space for the remaining N slides narrows dramatically.

### Showcase Page Selection Principle

Pick the two pages with the most different visual structures. If those two pass, all intermediate states will pass.

| Deck Type | Recommended Showcase Pair |
|-----------|--------------------------|
| B2B brochure / product launch | Title slide + Content slide (concept / emotion) |
| Brand launch | Title slide + Product feature slide |
| Data report | Data hero slide + Analysis conclusion slide |
| Tutorial / courseware | Section divider + Specific knowledge point slide |

---

## 3. Typography System

### Font Size Scale

Slides are viewed from **10 meters away** — type must be large enough.

| Level | Size Range | Usage |
|-------|-----------|-------|
| Hero type | 180-240px | Cover title, cover visual protagonist |
| Title | 60-120px | Section titles, content page headlines |
| Subtitle | 26-46px | English subtitle, section descriptions |
| Body | 24-36px (minimum 24px, ideal 28-36px) | Content text, lists |
| Auxiliary text | 17-21px | Annotations, source credits, footers |

### Font Weight & Emphasis

- **H1 weight 900**, key words individually colored in brand primary — do not flood the entire line with color; accent highlights per page ≤ 3 (more than 3 loses anchor effect)
- **English subtitles** may use italic for added hierarchy
- **Body line-height**: 1.75-1.85 (Chinese) or 1.4-1.5 (English)

### Background Treatment

- Warm off-white `#FAFAFA` + faint radial-gradient noise for paper texture (optional, depends on style)
- Pure white is acceptable, but large areas of pure white can be harsh under projection

---

## 4. Page Layout Patterns

Use at most **4-5 layout types** in a single deck. More loses system coherence; fewer feels monotonous.

### 7 Common Layouts

| Layout | Structure | Applicable Scene |
|--------|-----------|-----------------|
| **Title slide** | Solid background + oversized title + subtitle + author/date | Cover |
| **Section divider** | Colored background + section number + section title | Section breaks |
| **Content slide** | White background + title + 1-3 bullet points | Text content |
| **Data slide** | Title + large chart/number + brief explanation | Data display |
| **Image slide** | Full-bleed photo + small caption at bottom | Visual impact |
| **Quote slide** | Generous whitespace + oversized quote + attribution | Mood page / quotation |
| **Two-column** | Left-right comparison (vs / before-after / problem-solution) | Comparison display |

---

## 5. Visual Rhythm

A deck needs **intentional variety** — every slide looking the same is a template, not design.

### Three-Dimensional Rhythm

| Dimension | Rhythm Strategy |
|-----------|----------------|
| **Color rhythm** | Mostly white backgrounds + occasional colored section divider + occasional dark segment |
| **Density rhythm** | A few text-heavy + a few image-heavy + a few quote whitespace slides |
| **Type size rhythm** | Normal titles + occasional giant hero text |

### Visual Protagonist Rotation

If all 13 slides are "text + one screenshot," it's too monotonous. **Rotate the visual protagonist type per slide**:

| Visual Type | Fitting Section |
|------------|----------------|
| Cover layout (large type + masthead + pillar) | Opening / section divider |
| Single portrait | Introducing a single concept / role |
| Multi-person group photo / avatar cards side-by-side | Team / user cases |
| Timeline card progression | Showing "long-term relationship" / "evolution" |
| Knowledge graph / connected node diagram | Showing "collaboration" / "flow" |
| Before/After comparison cards + center arrow | Showing "change" / "difference" |
| Product UI screenshot + device frame | Specific feature showcase |
| Big-quote (half-page large type) | Mood page / problem page / quotation |
| Real person avatar + quote card (2×2 or 1×4) | User testimonials / use scenarios |
| Large type back cover + URL button | CTA / closing |

---

## 6. Information Density Control

**The most common beginner pitfall**: cramming every possible piece of information onto one slide.

### Core Principle

- **Limit each slide to "1 core message + 3-4 supporting points + 1 visual protagonist"** — exceed this and split into a new slide
- **Less is more** — the audience views a slide for ~10 seconds; 1 memorable point is easier to retain than 4

### Self-Audit for Data-Heavy Slides

- List / matrix slides: do not render all N elements at the same size. Use **primary-secondary layering** — 5 protagonists enlarged, 16 supporting elements shrunk as background hints
- Big-number slides: the number itself is the visual protagonist. Surrounding caption ≤ 3 lines, or the audience's eyes will bounce
- Quote slides: leave whitespace between the quote and attribution

**Two self-audit questions**: Is data the protagonist? Is text squeezed together? Adjust until the whitespace makes you slightly uncomfortable.

---

## 7. Publication Grammar Template

Suited for B2B brochure / product launch / long report decks. Reusing this structure on every page = fully consistent visuals, zero rework.

### Page Skeleton

```
┌─ masthead (top strip + horizontal line) ────────┐
│  [logo] · A Product Brochure      Date · URL    │
├──────────────────────────────────────────────┤
│                                              │
│  ── kicker (brand-color short bar + uppercase label) │
│  CHAPTER XX · SECTION NAME                   │
│                                              │
│  H1 (serif 900)                              │
│  Key words individually colored in brand primary │
│                                              │
│  English subtitle (italic)                   │
│  ─────────── divider ──────────              │
│                                              │
│  [Content: two-column 60/40 / 2x2 grid / list] │
│                                              │
├──────────────────────────────────────────────┤
│ section name                     XX / total  │
└──────────────────────────────────────────────┘
```

### Grammar Confirmation Checklist

Before starting, articulate the grammar system you intend to use and let the user confirm:

- Background color: at most 2 (90% primary + 10% dark section divider)
- Typeface: what to use for display, what to use for body
- Rhythm: what visual treatment for section dividers, what background for regular pages
- Imagery: hero slide uses full-bleed photo, data slide uses chart

---

## 8. Speaker Notes

**Not added by default** — only when the user explicitly requests them.

### Writing Guidelines

- **Complete**: not an outline, but actual words to be spoken
- **Conversational**: like everyday speech, not written prose
- **Length**: 200-400 words optimal
- **Emotional arc**: annotate stress, pauses, emphasis points

---

## 9. Delivery Verification Checklist

1. [ ] First page has no broken images, fonts loaded
2. [ ] No blank pages, no layout misalignment on any page
3. [ ] Every page has correct dimensions, no content overflow or clipping
4. [ ] All pages reviewed visually end-to-end
5. [ ] No placeholder / draft content remaining
