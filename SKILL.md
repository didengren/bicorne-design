---
name: bicorne-design
description: Use when creating design systems, generating design tokens, or doing UI design. Triggers: admin dashboards, marketing landing pages, mobile interfaces, data dashboards, design reviews, style exploration, UI optimization. Does not trigger: pure backend logic, database design, API development, ops configuration
license: MIT
compatibility: any-framework
metadata:
  version: 0.1.0
  author: Sam Xu <twonian@gmail.com>
  keywords: design-system, design-token, brand-library, methodology, anti-blur, anti-slop
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
**Output**: token.json + 3 design variants with statable directions + review record + selection decision log

### PHASE 4: Production Implementation

**Goal**: Produce production-grade code directly in the host project
**Method**: Framework skill consumes token.json; page framework → `page-framework.md`; responsive → `responsive-degradation.md`; state coverage → `ui-states.md`; anti-slop → `anti-slop-checklist.md`; anti-blur → `anti-blur-protocol.md`
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
│   │   ├── ui-states.md                  ← Empty state + loading state design specification
│   │   ├── responsive-degradation.md     ← Responsive degradation strategy
│   │   ├── page-framework.md             ← Page framework specification
│   │   ├── slide-design.md               ← Slide design specification
│   │   ├── product-presentation.md       ← Product presentation specification
│   │   └── font-loading-strategy.md      ← Font loading strategy
│   ├── design-philosophy/                ← Design philosophy
│   │   ├── design-styles.md              ← 20 design philosophies
│   │   └── critique-guide.md             ← Expert 5-dimension review
│   └── token-mapping/                    ← Layer 1 → Layer 2 bridge
│       ├── mapping-rules.md              ← DESIGN.md → token.json field mapping
│       ├── field-compatibility.md        ← Cross-brand field name compatibility table
│       └── examples/                     ← Example token.json files
│           ├── linear-dark.token.json              ← Linear desktop dark theme
│           ├── linear-dashboard-dark.token.json     ← Linear dashboard dark theme
│           ├── linear-mobile-dark.token.json        ← Linear mobile dark theme
│           ├── stripe-light.token.json              ← Stripe desktop light theme
│           └── stripe-mobile-light.token.json       ← Stripe mobile light theme
├── templates/
│   ├── dark-theme.template.json          ← Dark theme skeleton
│   ├── light-theme.template.json         ← Light theme skeleton
│   ├── mobile-dark.template.json         ← Mobile dark theme skeleton
│   ├── mobile-light.template.json        ← Mobile light theme skeleton
│   └── dashboard-dark.template.json      ← Dashboard dark theme skeleton
├── scripts/
│   ├── generate-token.mjs               ← Token generation script
│   └── validate-token.mjs               ← Token validation script
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
