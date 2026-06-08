# Design Specification

> Generated from token.json + methodology references. This document is the authoritative source for layout, motion, and responsive decisions in Phase 4.

---

## Layout Specification

### Framework

<!-- Reference: references/methodology/page-framework.md F1-F8 -->
Framework: <!-- F1-F8 selection -->

### Container

| Property | Value | Token Reference |
|----------|-------|----------------|
| Max content width | <!-- containerMaxWidth -->px | `layout.containerMaxWidth` |
| Horizontal padding | <!-- value -->px | `spacing.*` |
| Section vertical gap | <!-- sectionSpacing -->px | `layout.sectionSpacing` |

### Navigation

| Property | Value |
|----------|-------|
| Type | <!-- floating / fixed / sticky / sidebar --> |
| Height | <!-- navHeight -->px |
| Background | <!-- transparent → solid on scroll / always solid --> |
| Scroll solidify trigger | <!-- N -->px |
| Content layout | <!-- Logo left \| Nav links center \| CTA right --> |
| Mobile behavior | <!-- hamburger / drawer / bottom tab --> |

### Section Composition

<!-- Ordered list of page sections. Duplicate this block for each section. -->

#### S<!-- N --> <!-- Section Name -->

| Property | Value |
|----------|-------|
| Layout type | <!-- full-viewport / container / grid --> |
| Grid columns | <!-- N-up at desktop / N-up at tablet / N-up at mobile --> |
| Gap | <!-- value -->px |
| Card archetype | <!-- Containment / Display / none --> |
| Card signature | <!-- card / hero / none --> |
| Background | <!-- surface.base / surface.1 / gradient --> |

Vertical rhythm:
<!-- eyebrow → display-xl: spacing.4, display-xl → body-lg: spacing.4, body-lg → CTA: spacing.6 -->

---

## Motion Specification

### Brand Motion Personality

<!-- One-sentence personality definition -->
<!-- Example: Restrained precision — functional-first, no decorative effects -->

**Prohibited**: <!-- bouncy effects / decorative particles / ... -->

### Interaction Motion Map

| Interaction | Family | Variant | Duration | Easing | Trigger |
|-------------|--------|---------|----------|--------|---------|
| Dropdown open | <!-- Slide/Zoom/Fade/Move --> | <!-- slideUp/zoomBig/... --> | <!-- Nms --> | <!-- easing --> | <!-- click --> |
| Dropdown close | | | | | |
| Modal open | | | | | |
| Modal close | | | | | |
| Toast appear | | | | | |
| Toast dismiss | | | | | |
| Toggle switch | | | | | |
| Input focus | | | | | |
| Button hover | | | | | |
| Card hover | | | | | |
| Sidebar expand | | | | | |
| Sidebar collapse | | | | | |

### Scroll Reveal Groups

<!-- Reference: references/methodology/animation-best-practices.md §7 -->
<!-- Groups define which elements animate together on scroll -->

| Group | Selector | Offset | Stagger | Duration | Easing | Initial State |
|-------|----------|--------|---------|----------|--------|---------------|
| <!-- group-name --> | <!-- .selector --> | <!-- translateY(Npx) --> | <!-- Nms --> | <!-- Nms --> | <!-- Expo Out / ... --> | <!-- opacity:0 --> |

**No scroll reveal**: <!-- Navigation, Hero text, Footer — these should be immediately visible -->

### Page Transition

| Direction | Animation | Duration | Easing |
|-----------|-----------|----------|--------|
| Enter | <!-- Fade + translateY --> | <!-- Nms --> | <!-- easing --> |
| Exit | <!-- Fade --> | <!-- Nms --> | <!-- easing --> |

---

## Responsive Specification

<!-- Reference: references/methodology/responsive-degradation.md -->

### Breakpoint Behavior Matrix

| Breakpoint | Navigation | Content Grid | Typography Scale | Special Handling |
|------------|-----------|-------------|-----------------|-----------------|
| ≥ 1280px (xl) | <!-- full nav --> | <!-- 3-up --> | <!-- full size --> | <!-- default --> |
| 1024-1279px (lg) | | | | |
| 768-1023px (md) | | | | |
| < 768px (xs-sm) | | | | |

### Component-Level Rules

| Component | ≥lg | md | <md |
|-----------|-----|-----|------|
| <!-- navigation --> | <!-- full links --> | <!-- hamburger --> | <!-- hamburger --> |
| <!-- feature-card grid --> | <!-- 3 columns --> | <!-- 2 columns --> | <!-- 1 column stack --> |
| <!-- pricing-card grid --> | | | |
| <!-- product screenshot --> | | | |
| <!-- CTA banner --> | | | |
| <!-- footer --> | | | |

### Typography Scaling

| Scale | Desktop | Tablet (md) | Mobile (<md) |
|-------|---------|-------------|-------------|
| display-xl | <!-- Npx --> | <!-- Npx --> | <!-- Npx --> |
| display-lg | | | |
| display-md | | | |
| headline | | | |
| body-* | <!-- unchanged --> | <!-- unchanged --> | <!-- unchanged --> |

### Touch Target Rules

- Minimum touch target: <!-- 44×44 -->px (<md)
- Button height: unchanged (<!-- 40 -->px), padding increased to <!-- 12px 16px -->
- Nav link padding increased to <!-- 12px 8px -->
