---
name: bicorne-design
description: |
  Use when creating design systems, generating design tokens, or doing UI design.
  Triggers: admin dashboards, marketing landing pages, mobile interfaces, data dashboards, design reviews, style exploration, UI optimization, AI product UIs (chat / IDE / playground), native app interfaces (iOS / Android), premium showcase sites (Tesla / Apple Vision Pro / Hermès), e-commerce flows (PDP / cart / checkout), documentation sites, auth flows (sign-in / sign-up / 2FA), e2e verification of real reference implementations.
  Does not trigger: pure backend logic, database design, API development, ops configuration.
license: MIT
compatibility: any-framework
metadata:
  version: 2.12.0
  author: Sam Xu <twonian@gmail.com>
  keywords: design-system, design-token, brand-library, methodology, anti-blur, anti-slop, a11y, perf, real-deploy, e2e
---

# Bicorne Design — Unified Design System Skill

> JSON Schema-driven three-layer decoupled architecture, framework-agnostic.

---

## Core Principles

### #0 · Fact Verification Before Assumptions (Highest Priority, Overrides All Other Processes)

Any factual assertion involving the existence, release status, version number, or specifications of a specific product/technology/event/person must be verified via `WebSearch` as the first step. Making assertions based on training data is prohibited.

**Trigger Conditions (any one suffices)**:
- The user mentions a specific product name you are unfamiliar with or uncertain about
- Involves release timelines, version numbers, or specifications from 2024 onward
- You catch yourself thinking "I think it might be...", "probably not released yet", "around..."
- The user requests design materials for a specific product/company

### 1 · Intent First

Every design decision must have a statable intent. Vague reasons like "feels right" are rejected.

- All design decisions must use the format: "Chose [design element] because [specific reason]"
- Vague reasons such as "feels nice" or "looks good" are prohibited
- Every design element must have a clear purpose for its existence

### 2 · Visual Hierarchy

Information density, contrast, and whitespace must serve the user's attention path, not decoration.

- Information density: adjust density based on importance; important information areas should have lower density
- Contrast: use contrast to guide user attention; important elements should have higher contrast
- Whitespace: whitespace serves the user's attention path, not decorative purposes

### 3 · Systems Thinking

Relationships between components are more important than the aesthetics of any single component.

- Component design must consider relationships with other components
- Component style must be consistent with the overall design language
- Component reusability takes priority over individual component uniqueness

### 4 · Anti-Blur + Anti-Slop

AI output must undergo human aesthetic validation to avoid design defocus caused by averaged aesthetics.

- All AI-generated design decisions must be reviewed by a human
- AI-assisted variants must include human annotations
- Using "AI generated" as a reason to bypass the aesthetic judgment layer is prohibited
- See `references/methodology/anti-blur-protocol.md` and `references/methodology/anti-slop-checklist.md`

### 5 · Placeholder First

When the visual approach is uncertain, use structured placeholders to express intent first, then gradually replace with real content. Avoid locking in a visual approach too early.

**Principle Priority**: #0 > 1 > 2 > 3 > 4 > 5. When conflicts arise, higher priority overrides lower; when visual hierarchy conflicts with systems thinking, system consistency takes priority; when intent-first conflicts with placeholder-first, clarify intent first then placeholder.

---

## Three-Layer Architecture

```
Layer 1: Design Reference Layer (References)
─ Brand DESIGN.md files in references/brand-library/
─ Output: raw design data for selected brands

         │ DESIGN.md YAML
         ▼  (Mapping rules: references/token-mapping/mapping-rules.md)

Layer 2: Design Specification Layer (Specification)
─ schema/design-token.schema.json — framework-agnostic token specification
─ token.json — design token instance conforming to the Schema
─ Design methodology + anti-blur protocol

         │ token.json
         ▼  (Each skill consumes in its own framework way)

Layer 3: Design Execution Layer (Execution)
─ The host project's own framework skill (impeccable / ...)
─ Not HTML prototypes, but production-grade code
```

The JSON Schema in Layer 2 is an interface protocol, not an implementation. Any skill can read token.json directly — no adapter layer needed.

---

## Five-Phase Workflow

> For complete steps, anti-patterns, and exception handling at each phase, see `references/methodology/design-methodology.md`

### PHASE 1: Requirement Definition

**Goal**: Clarify "what problem to solve", not "what interface to draw"
**Method**: Five-phase methodology + #0 fact verification
**Output**: PRD + scenario slices + constraint checklist (including platform constraints)

### PHASE 2: Context Collection + Style Selection

**Goal**: Ground design decisions in evidence, not gut feeling
**Method**: Read `brand-library/INDEX.md` → select 3-5 reference brands → read DESIGN.md; core asset protocol → `asset-protocol.md`
**Output**: Reference design analysis report + selected brand DESIGN.md + asset archive + technical constraint confirmation

### PHASE 3: Specification Mapping + Variant Production

**Goal**: Produce at least 3 design directions with distinct statable intents
**Method**: DESIGN.md → `mapping-rules.md` → generate token.json; Direction Triangle (Efficiency / Clarity / Expression) → 3 variants
**Output**: token.json + design-spec.md + 3 design variants with statable directions + review record + selection decision log

### PHASE 4: Production Implementation

**Goal**: Produce production-grade code directly in the host project
**Method**: Framework skill consumes token.json; page framework → `page-framework.md`; responsive → `responsive-degradation.md`; state coverage → `references/methodology/ui-states.md` (generic) or `dashboards/ui-states.md` (dashboard 6-state); anti-slop → `anti-slop-checklist.md`; anti-blur → `anti-blur-protocol.md`
**Context Consumption Checklist** (AI agent must read all before coding):
- `token.json` — style primitives (colors / spacing / typography / shadows) + component syntax
- `design-spec.md` — layout / animation / responsive specifications
- `references/methodology/page-framework.md` — page framework types & navigation rules
- `references/methodology/animation-best-practices.md` — easing, keyframes, duration rules
- `references/methodology/responsive-degradation.md` — breakpoint system & degradation strategies
**Output**: Production-grade components + pages + state coverage checklist

### PHASE 5: Quality Polish

**Goal**: Ensure launch readiness
**Method**: audit (accessibility / performance / responsive / interaction states) + polish (aesthetic validation); platform-specific checks see `design-methodology.md` Phase 5
**Output**: Launch-ready code + a11y score + responsive screenshot matrix + state coverage checklist

---

## Scenario Routing

| Scenario | Priority | Core Capability | Execution Skill |
|----------|----------|----------------|-----------------|
| New admin dashboard page | Specification first | Five phases + token.json | Vue: vue-best-practices / React: impeccable |
| Marketing landing page | Style first | DESIGN.md selection + token.json | Host project framework skill |
| Existing system optimization | Method first | Anti-blur + three-question protocol | Host project framework skill |
| Design style exploration | Reference first | brand-library browsing | Only produce token.json, no execution |
| Design review | Method first | 5-dimension review + three-question protocol | No execution skill involved |
| Mobile Web | Touch first | Five phases + mobile token.json | React: impeccable / Vue: vue-best-practices |
| Native App | Platform HIG first | Five phases + mobile token.json + platform HIG | React Native: vercel-react-native-skills / Flutter/iOS/Android (to be built) |
| Data dashboard | Information density first | Five phases + dashboard token.json | Host project framework skill |

---

## Token Consumption Routes

token.json is a framework-agnostic interface protocol. Each framework skill consumes it in its own way:

| Skill | Consumption Method | Status |
|-------|-------------------|--------|
| React (impeccable) | Tailwind config `theme.extend` / CSS-in-JS theme object | Available |
| Vue (vue-best-practices) | tailwind.config.js configuration | Available |
| React Native (vercel-react-native-skills) | NativeWind / StyleSheet + token.json | Available |
| Flutter skill | `ThemeData` | To be built |
| iOS skill | `UIColor` extension + `UIFont` metrics | To be built |
| Android skill | `Color` resource + `dimens.xml` | To be built |

### design-spec.md Consumption

design-spec.md complements token.json by specifying layout, animation, and responsive rules that cannot be expressed as flat tokens. Host projects consume it as follows:

| Spec Area | Consumption Method |
|-----------|-------------------|
| Layout (page framework type, sidebar/header/footer structure) | Map to component composition — select page framework type from `page-framework.md`, implement structural components accordingly |
| Animation (easing curves, keyframe definitions, duration rules) | Map to framework animation primitives — CSS transitions / Framer Motion / Vue Transition / React Native Animated |
| Responsive (breakpoint behavior, component degradation strategies) | Map to breakpoint logic — Tailwind responsive prefixes / CSS media queries / React Native dimension hooks |

---

## File Navigation

```
bicorne-design/
├── SKILL.md                              ← You are here
├── AGENTS.md                             ← Integration design document
├── schema/
│   └── design-token.schema.json          ← Framework-agnostic design token specification
├── references/
│   ├── brand-library/                    ← Layer 1: Brand design systems
│   │   └── INDEX.md                      ← Category index + selection decision tree
│   ├── methodology/                      ← Design methodology
│   │   ├── design-methodology.md         ← Five-phase design methodology
│   │   ├── anti-blur-protocol.md         ← Anti-blur protocol
│   │   ├── anti-slop-checklist.md        ← Anti-AI slop checklist
│   │   ├── review-scoring.md             ← Variant review framework
│   │   ├── asset-protocol.md             ← Core asset protocol
│   │   ├── animation-best-practices.md   ← Animation design knowledge
│   │   ├── dark-mode-a11y.md             ← Dark mode + accessibility (8 category-specific topics)
│   │   ├── typography.md                 ← Typography rules
│   │   ├── nav-footer.md                 ← Navigation + footer design
│   │   ├── ui-states.md                  ← Empty state + loading state design specification
│   │   ├── responsive-degradation.md     ← Responsive degradation strategy
│   │   ├── page-framework.md             ← Page framework specification
│   │   ├── seo-checklist.md              ← SEO / Lighthouse must-do
│   │   ├── slide-design.md               ← Slide design specification
│   │   ├── product-presentation.md       ← Product presentation specification
│   │   ├── font-loading-strategy.md      ← Font loading strategy
│   │   ├── dashboard-layout-patterns.md  ← 6 dashboard layout skeletons (D1-D6)
│   │   ├── data-visualization.md         ← Chart color system + component spec
│   │   ├── dashboard-interaction.md      ← Dashboard interaction (remote control / touch / display)
│   │   ├── INDEX.md                      ← Cross-category methodology index (start here)
│   │   ├── animation-cross-platform.md   ← Cross-category/cross-platform animation diff cheatsheet
│   │   └── performance-budget.md         ← Cross-category performance budget (Web Vitals + per-category)
│   ├── design-philosophy/                ← Design philosophy
│   │   ├── design-styles.md              ← 20 design philosophies
│   │   └── critique-guide.md             ← Expert 5-dimension review
│   └── token-mapping/                    ← Layer 1 → Layer 2 bridge
│       ├── mapping-rules.md              ← DESIGN.md → token.json field mapping
│       ├── field-compatibility.md        ← Cross-brand field name compatibility table
│       ├── font-token-audit.md           ← Font token audit (v2.11 real font after)
│       └── examples/                     ← Example token.json files (6 total)
│           ├── linear-dark.token.json              ← Linear desktop dark theme
│           ├── linear-dashboard-dark.token.json     ← Linear dashboard dark theme
│           ├── linear-mobile-dark.token.json        ← Linear mobile dark theme
│           ├── clickhouse-dashboard-dark.token.json ← ClickHouse dashboard dark theme
│           ├── stripe-light.token.json              ← Stripe desktop light theme
│           └── stripe-mobile-light.token.json       ← Stripe mobile light theme
├── templates/
│   ├── dark-theme.template.json          ← Dark theme skeleton
│   ├── light-theme.template.json         ← Light theme skeleton
│   ├── mobile-dark.template.json         ← Mobile dark theme skeleton
│   ├── mobile-light.template.json        ← Mobile light theme skeleton
│   ├── dashboard-dark.template.json      ← Dashboard dark theme skeleton
│   └── design-spec.template.md           ← Design spec template (layout / animation / responsive)
├── scripts/
│   ├── generate-token.mjs               ← Token generation script
│   └── validate-token.mjs               ← Token validation script
├── admin-panels/                       ← Layer 2.5 · Platform-specific: Admin Panels
├── dashboards/                          ← Layer 2.5 · Platform-specific: Dashboards
│   ├── README.md                        ← Category workspace index
│   ├── meta-prompt.md                   ← PHASE 4 pre-flight checklist
│   ├── component-contract/              ← 8 core components (panel / metric / sparkline / map / gauge / ring / ticker / datatable)
│   ├── layouts/                         ← L1-L8 layout archetypes
│   ├── data-viz/                        ← Bar / donut / funnel / heatmap / mini-map
│   ├── animation-matrix.md              ← Scenario→animation/duration/easing mapping
│   ├── typography.md                    ← Dashboard-specific typography rules
│   ├── ui-states.md                     ← Dashboard 6 states (loading/refreshing/empty/error/offline/stale)
│   ├── performance.md                   ← 60fps performance budget
│   ├── pitfalls/                        ← 25 anti-patterns
│   ├── tailwind-bridge/                 ← Auto-generate tailwind.config.ts from token.json
│   └── verification/                    ← 3 runnable reference projects
│       └── 4-3-dashboard-command-center/  (Dashboard flagship)
├── saas-marketing/                      ← Layer 2.5 · Platform-specific: SaaS Marketing Sites
│   ├── README.md
│   ├── meta-prompt.md
│   ├── component-contract/              ← nav/hero/features/pricing/testimonial/faq/blog-card/cta-band
│   ├── layouts/                         ← S1-S7 (product/pricing/customers/blog/careers/changelog/legal)
│   ├── typography.md
│   ├── ui-states.md
│   ├── seo-checklist.md                 ← SEO/Lighthouse must-do
│   ├── performance.md
│   ├── pitfalls/
│   └── verification/4-2-stripe-landing/ (SaaS marketing flagship)
├── landing-pages/                       ← Layer 2.5 · Platform-specific: Landing Pages (single-page marketing MVI)
│   ├── README.md
│   ├── meta-prompt.md                   ← PHASE 4 pre-flight: conversion goal / audience / main CTA / measurement
│   ├── component-contract/              ← hero-cta / feature-row / testimonial-logos / pricing-simple
│   └── pitfalls/                        ← 8 single-page marketing anti-patterns
├── ecommerce/                           ← Layer 2.5 · Platform-specific: E-commerce
│   ├── README.md
│   ├── meta-prompt.md
│   ├── component-contract/              ← product-card/gallery/variant/cart/checkout/order/review
│   ├── layouts/                         ← P1-P9 (PLP/PDP/cart/checkout/thank-you/tracking/account/homepage)
│   └── ...
├── documentation/                       ← Layer 2.5 · Platform-specific: Documentation
│   ├── README.md
│   ├── meta-prompt.md
│   ├── component-contract/              ← sidebar-nav/toc/code-block/callout/api-table/search
│   ├── layouts/                         ← D1-D6 (three-column/tutorial/reference/concepts/changelog/faq)
│   └── ...
├── auth-flows/                          ← Layer 2.5 · Platform-specific: Auth & Authz
│   ├── README.md
│   ├── meta-prompt.md
│   ├── component-contract/              ← sign-in/sign-up/otp/password/2fa/social/forgot/error
│   ├── layouts/                         ← AF1-AF5 (centered/split/modal/fullscreen/stepper)
│   ├── pitfalls/                        ← security/accessibility/error-ux/rate-limiting
│   └── ...
├── mobile-web/                          ← Layer 2.5 · Platform-specific: Mobile Web (mobile-first H5/PWA)
│   ├── README.md
│   ├── meta-prompt.md                   ← PHASE 4 pre-flight: mobile-first decision / device support / touch / PWA
│   ├── component-contract/              ← bottom-tab-bar / mobile-modal / touch-gesture-handler / mobile-form-input
│   └── pitfalls/                        ← 10 mobile-web anti-patterns
├── native-app/                          ← Layer 2.5 · Platform-specific: Native Apps
│   ├── README.md
│   ├── meta-prompt.md
│   ├── dark-mode-a11y.md
│   ├── component-contract/              ← 5 core component contracts (iOS/Android platform adaptation)
│   ├── layouts/                         ← Native App specific layouts
│   ├── pitfalls/                        ← Native App anti-patterns
│   └── verification/                    ← 2 real reference implementations
│       ├── native-1-ios-settings/
│       └── native-2-android-material-you/
├── ai-products/                         ← Layer 2.5 · Platform-specific: AI Products (v2.12 新增)
│   ├── README.md
│   ├── meta-prompt.md
│   ├── dark-mode-a11y.md
│   ├── component-contract/              ← 6 core component contracts (chat stream / message bubble / tool call)
│   │   ├── chat-stream.md               ← Streaming chat (SSE / WebSocket + typing cursor)
│   │   ├── citation-source.md           ← RAG citation result
│   │   ├── message-bubble.md            ← User / assistant / tool message bubble
│   │   ├── model-selector.md            ← Model picker (GPT / Claude / Gemini)
│   │   ├── prompt-composer.md           ← Multi-modal prompt composer with attachments
│   │   └── tool-call-card.md            ← Function calling result card
│   └── pitfalls/                        ← AI product anti-patterns
├── premium-showcase/                    ← Layer 2.5 · Platform-specific: Premium Showcase (v2.12 新增 · Tesla / Apple Vision Pro / Hermès)
│   ├── README.md
│   ├── meta-prompt.md
│   ├── dark-mode-a11y.md
│   ├── component-contract/              ← 5 cinematic component contracts
│   │   ├── hero-cta.md                  ← Cinematic Hero (80-120px + slow easing)
│   │   ├── feature-row.md               ← Cinematic feature row (long scroll)
│   │   ├── image-gallery.md             ← Photography gallery (masonry / lightbox)
│   │   ├── spec-sheet.md                ← Mono spec data table (thrust / speed / altitude)
│   │   └── footer-cta.md                ← Inquiry-style footer (mailto + no price)
│   ├── layouts/                         ← L1-L5 (full-bleed / scroll-story / spec / gallery / footer-cta)
│   ├── premium-showcase-token.schema.json  ← Premium showcase dedicated schema
│   └── pitfalls/                        ← Premium showcase anti-patterns
└── package.json
```

---

## Milestone Trigger Points

| Timing | Action | Output |
|--------|--------|--------|
| User raises a design requirement | Enter PHASE 1 | PRD + constraint checklist |
| User mentions style/brand references | Enter PHASE 2 | Selected DESIGN.md |
| Need to generate design specifications | Enter PHASE 3 | token.json + variants |
| User requests code | Enter PHASE 4 | Production-grade components |
| Code is done and needs polish | Enter PHASE 5 | Launch-ready code |
| User only wants token.json | Execute only PHASE 2-3 | token.json |
| token.json already exists | Skip to PHASE 4 | — |
| PHASE 4 finds tokens insufficient | Fall back to PHASE 3 to supplement | Supplemented token.json |
| Only doing a design review | Do not enter any Phase | Review report |

---

## Quick Start

1. **When making style choices** → Read `references/brand-library/INDEX.md`, select 3-5 reference brands
2. **When needing design specifications** → Generate token.json following `references/token-mapping/mapping-rules.md`
3. **When making design decisions** → Validate with the three-question protocol in `references/methodology/anti-blur-protocol.md`
4. **When writing code** → Host project framework skill consumes token.json
5. **When reviewing** → Use the 5-dimension review in `references/design-philosophy/critique-guide.md`
