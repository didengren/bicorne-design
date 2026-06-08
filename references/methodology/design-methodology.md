# Five-Phase Design Methodology

> A complete design workflow from requirement definition to quality polish; appendix: AI Agent Interaction Protocol, defining the agent's decision boundaries at each phase.

---

## Overview

```
PHASE 1: Requirement Definition → PHASE 2: Context Collection + Style Selection → PHASE 3: Specification Mapping + Variant Production → PHASE 4: Production Implementation → PHASE 5: Quality Polish
```

Each phase has explicit: methods, outputs, checkpoints, anti-patterns, and exception handling.

---

## PHASE 1: Requirement Definition

**Core Objective**: Clarify "what problem to solve", not "what interface to draw"

### Key Steps

1. **Business Goal Alignment**
   - Align with product requirement documents
   - Quantify design success metrics (efficiency improvement / error rate reduction / task completion rate)
   - Tools: PRD, user journey maps

2. **Design Scope Lockdown**
   - Define in-scope and out-of-scope UI elements
   - Use "freeze lines" to mark functional areas outside the current iteration
   - Tools: design scope defined in requirement documents, priority matrix

3. **Constraint Checklist**
   - List technical constraints (framework limitations, data volume, load time)
   - Brand constraints (color system, font licensing)
   - Time constraints
   - Tools: constraint checklist, design specification documents, brand guidelines

4. **Platform Constraints**
   - Determine target platform (Desktop Web / Mobile Web / Native App / Data Dashboard), select corresponding template
   - Desktop Web: mouse interaction, precise hover, multi-column layout, select `templates/dark-theme.template.json` or `light-theme.template.json`
   - Mobile Web/App: touch targets ≥ 44px, no hover-only interactions, safe area adaptation, select `templates/mobile-dark.template.json` or `mobile-light.template.json`
   - Data Dashboard: long-distance viewing (3-5m), main content font size ≥ 24px for long-distance readability, high contrast, remote/touch control, select `templates/dashboard-dark.template.json`
   - Cross-platform products: same brand shares colors + fontFamilies, only scales/spacing adjusted per platform template

### Anti-Pattern

Starting "finding inspiration" before requirements are clear, leading to design direction disconnected from business goals.

### Deliverables

PRD + scenario slices + constraint checklist

### Exception Handling

If requirements are unclear, design must be paused to communicate with the product manager. Starting design with unclear requirements is prohibited.

---

## PHASE 2: Context Collection + Style Selection

**Core Objective**: Ground design decisions in evidence, not gut feeling

### Key Steps

1. **Reference Design Review (with Screenshot Archiving)**
   - Archive UI screenshots for 3-5 reference design cases
   - Highlight: information architecture patterns, interaction feedback mechanisms, visual density handling strategies
   - Distinguish between "worth borrowing" and "industry convention"
   - Tools: screenshot archive, Figma reference board

2. **Brand Style Selection**
   - Read `references/brand-library/INDEX.md`
   - Select 3-5 reference brands by scenario
   - Read corresponding DESIGN.md to extract design parameters
   - Tools: brand-library INDEX.md, DESIGN.md

3. **Existing System Context**
   - Review current system's component library status and existing design language
   - Historical design decisions (especially "why designed this way" decision logs)
   - Tools: component library documentation, code review

4. **Core Asset Protocol**
   - Obtain Logo (SVG preferred, PNG as fallback)
   - Obtain product screenshots / UI screenshots
   - See `references/methodology/asset-protocol.md`

5. **Technical Implementation Assessment**
   - Confirm component reuse rate and animation frame rate ceiling with frontend developers
   - Asynchronous data loading approach
   - Prevent significant design degradation during technical implementation

6. **Platform Context**
   - Confirm target platform design guidelines (iOS HIG / Material Design / dashboard resolution standards)
   - Confirm input method (mouse / touch / remote / voice)
   - Confirm viewing distance and screen size (required for dashboard scenarios)
   - Confirm performance budget (dashboard devices vary greatly in GPU performance, mobile has limited memory)

### Anti-Pattern

Skipping context and jumping straight into visual design, resulting in deliverables with style disconnect from the existing system.

### Deliverables

Reference design analysis report + selected brand DESIGN.md + asset archive + technical constraint confirmation

### Exception Handling

If user behavior data cannot be collected, user interviews or competitive analysis may be used as alternatives.

---

## PHASE 3: Specification Mapping + Variant Production

**Core Objective**: Produce at least 3 design directions with distinct statable intents

### Key Steps

1. **DESIGN.md → token.json Mapping**
   - Map field by field per `references/token-mapping/mapping-rules.md`
   - Use the corresponding platform template as skeleton (Desktop: `dark-theme.template.json` / `light-theme.template.json`; Mobile: `mobile-dark.template.json` / `mobile-light.template.json`; Dashboard: `dashboard-dark.template.json`). See mapping-rules.md Section 9
   - Handle missing fields per mapping-rules.md Section 8
   - Tools: mapping-rules.md, field-compatibility.md

2. **Generate design-spec.md** — Read `templates/design-spec.template.md` and fill in design decisions based on token.json + methodology references:
   - **Layout Specification**: Select page framework (F1-F8 from `page-framework.md`), define container parameters, navigation structure, and section composition (equivalent to text wireframe)
   - **Motion Specification**: Define brand motion personality, assign interaction motion map (family + variant + duration + easing per interaction scenario from `animation-best-practices.md`), define scroll reveal groups, page transition
   - **Responsive Specification**: Define breakpoint behavior matrix, component-level rules per breakpoint, typography scaling table, touch target rules (from `responsive-degradation.md`)

3. **Direction Triangle: Efficiency / Clarity / Expression**
   - Each batch of variants must lean toward three different directions:
     - ① Efficiency first (shortest operation path)
     - ② Clarity first (highest readability)
     - ③ Expression first (strongest visual identity)
   - Choosing one or mixing must have explicit justification
   - Tools: direction matrix, design review framework

   Direction Triangle emphasis adjustments for multi-platform scenarios:
   - Mobile: Efficiency first → reduce operation steps; Clarity first → touch-friendly; Expression first → native platform feel
   - Dashboard: Efficiency first → key metrics at a glance; Clarity first → clear hierarchy, long-distance readable; Expression first → immersive data narrative

4. **AI-Assisted Variant Generation**
   - AI tools may be used to rapidly generate visual variants
   - Each AI-produced variant must include a human annotation explaining "why this design decision was accepted"
   - Annotation format: "Why this design decision was accepted: [specific reason]"
   - Using AI output without annotation is prohibited

5. **Variant Review and Selection**
   - Score each variant using the preset review framework (total 100 points, 70+ required to advance to next phase)
   - Selection decisions must be recorded for retrospective review
   - See `references/methodology/review-scoring.md`

### Anti-Pattern

Producing only 1 direction and locking in too early, missing better solutions; or producing too many variants without selection criteria.

### Deliverables

token.json + `design-spec.md` — Layout specification (text wireframe) + Motion specification (element-level motion map) + Responsive specification (component-level breakpoint behavior matrix) + 3 design variants with statable directions + review record + selection decision log

### Exception Handling

If all variants score below 70, variants must be re-produced or the design direction must be adjusted.

---

## PHASE 4: Production Implementation (in Host Project)

**Core Objective**: Produce production-grade code directly in the host project, not throwaway HTML mockups

### Key Steps

1. **Framework Skill Consumes token.json**
   - React (impeccable): → Tailwind config `theme.extend` or CSS-in-JS theme object
   - Vue (vue-best-practices): → tailwind.config.js configuration
   - Other frameworks consume in their own way

2. **Page Framework Structure**
   - Page framework structure definition, type classification, navigation structure, see `references/methodology/page-framework.md`
   - Page framework responsive degradation strategy, see `references/methodology/responsive-degradation.md`

3. **Anti-Slop Checklist Review**
   - Check each item in `references/methodology/anti-slop-checklist.md`
   - Ensure AI output does not exhibit typical slop characteristics

4. **Anti-Blur Three-Question Protocol**
   - For every AI-produced visual decision, answer three questions:
     - ① Why this color?
     - ② Why this spacing?
     - ③ Why is this element here?
   - If unable to answer, the decision must be re-examined or replaced
   - See `references/methodology/anti-blur-protocol.md`

5. **Component State Full Coverage**
   - Default / Hover / Focus / Active / Disabled / Loading / Error / Empty State
   - Loading and Error states are especially easy to overlook
   - Empty State four elements and Loading State Skeleton/Spinner decision rules, see `references/methodology/ui-states.md`

### Anti-Pattern

Design is only reviewed and approved in Figma, only to discover numerous rendering issues and missing states after launch.

### Deliverables

Production-grade components + pages + state coverage checklist

### Exception Handling

If prototype fidelity is below 85%, critical deviation areas must be fixed.

---

## PHASE 5: Quality Polish

**Core Objective**: Ensure launch readiness

### Key Steps

1. **Accessibility Check**
   - Color contrast ratio ≥ 4.5:1 (WCAG 2.1 AA)
   - All interactive elements have focus states
   - Forms have associated labels, charts have text alternatives
   - Tools: Lighthouse, color contrast checker

2. **Performance Check**
   - Image optimization (WebP/AVIF, lazy loading)
   - Animation frame rate ≥ 60fps (Desktop Web target; dashboard minimum 30fps, see platform-specific checks)
   - First contentful paint time
   - Tools: Chrome DevTools Performance

3. **Responsive Validation**
   - Breakpoints aligned with bicorne-ui BREAKPOINTS: xs(480)/sm(640)/md(768)/lg(1024)/xl(1280)/xxl(1536)/xxxl(1920)
   - Focus on data table information degradation strategy below md(768px)
   - Touch targets ≥ 44×44px
   - Specific degradation plans (tables/forms/navigation/multi-column layouts), see `references/methodology/responsive-degradation.md`

4. **Interaction State Full Coverage**
   - Verify all states: Default / Hover / Focus / Active / Disabled / Loading / Error / Empty State
   - Loading and Error states are especially easy to overlook
   - Empty State four elements and Loading State Skeleton/Spinner decision rules, see `references/methodology/ui-states.md`

5. **Platform-Specific Checks**
   - Mobile: touch target compliance review, safe area adaptation, no hover-only interactions, gesture conflict detection
   - Native App: platform HIG compliance (iOS HIG / Material Design), navigation patterns matching platform conventions
   - Dashboard: 3m viewing distance readability, remote focus navigation, animation frame rate target 60fps / minimum 30fps

6. **Final Aesthetic Validation**
   - Compare against aesthetic anchor points
   - Three-question protocol final confirmation
   - Tension check

### Anti-Pattern

Skipping human aesthetic validation on the grounds that "AI generated it so quality is guaranteed", ultimately delivering mediocre design.

### Deliverables

Launch-ready code + a11y score + responsive screenshot matrix + state coverage checklist

---

## AI Agent Interaction Protocol

This protocol spans the entire five-phase workflow, defining when the agent must stop and wait for user confirmation (Junior behavior) vs. when it can make autonomous decisions and proceed (Senior behavior).

### Core Mindset

The agent operates in Junior mode by default: present assumptions first, let the user confirm or correct. The distinction:

- **Junior presents assumptions**: Show your understanding and assumptions first, let the user confirm or correct
- **Senior makes judgments**: Make judgments directly, the user only needs to accept or reject

### Workflow (Mapped to Five Phases)

1. **Understand Requirements** → Restate requirements in your own words, confirm understanding (corresponds to PHASE 1)
2. **Present Assumptions** → List your design assumptions (style, layout, interaction) (corresponds to PHASE 2)
3. **Wait for Confirmation** → User confirms or corrects your assumptions (PHASE 2 → PHASE 3 gate)
4. **Execute Design** → Execute based on confirmed assumptions (corresponds to PHASE 3–4)
5. **Present Results** → Show design results with design decision explanations (corresponds to PHASE 4 deliverables)
6. **Collect Feedback** → Collect user feedback, iterate and optimize (corresponds to PHASE 5)

### Question Template

During PHASE 2 context collection, use the following question template:

```
My understanding of the requirements is: [restate requirements]
My design assumptions are:
- Style direction: [assumed style]
- Target users: [assumed user persona]
- Core scenarios: [assumed usage scenarios]
- Technical constraints: [assumed constraints]

Please confirm or correct the above assumptions.
```

### Senior vs Junior Decision Boundary

The core of Junior Designer mode is "present assumptions, wait for confirmation". But not all decisions require waiting — some scenarios the agent should judge autonomously (Senior behavior), some scenarios it must stop and ask the user (Junior behavior).

#### Must Stop and Ask the User (Junior Behavior)

The following scenarios **must pause execution and wait for user confirmation**, even if it interrupts the workflow:

| Scenario | Why Not Autonomous | What to Ask |
|----------|-------------------|-------------|
| Design direction unconfirmed | Wrong direction = full rework, highest cost | "I plan to use X style direction, is that okay?" |
| Brand materials contradict | Design spec vs. reference screenshot vs. user's verbal description inconsistent | "The screenshot shows serif, the spec says sans-serif, which to use?" |
| Core function/flow uncertain | Wrong function understanding = wrong deliverable | "Is the core flow A→B→C or A→C?" |
| User explicitly says "stop asking, just do it" | User rushing ≠ authorization to be wrong | Mark assumptions and execute, list assumption checklist at delivery |

#### Can Judge Autonomously (Senior Behavior)

The following scenarios the agent can make autonomous decisions and proceed, without item-by-item confirmation:

| Scenario | Autonomous Scope | Boundary |
|----------|-----------------|----------|
| Detail implementation within confirmed direction | Font size fine-tuning, spacing selection, border-radius size | Do not change primary color / primary font / core layout |
| Standardized design specifications | Line height 1.5-1.8, button border-radius 4-8px | Do not exceed token.json constraint range |
| Degradation under technical constraints | Animation frame count adjustment, image format selection | Degradation must be noted at delivery |
| Anti-slop / anti-blur automatic corrections | Remove decorative emoji, reduce gradient layers | Do not delete user-provided content |

#### Decision Boundary Quick Reference

```
Design decision comes in →
├─ Involves factual assertion? (product/tech/version/spec) → #0 Fact verification: WebSearch first, then continue
├─ Can it be rolled back after change?
│   ├─ No (direction/color tone/layout) → Junior: stop and ask
│   └─ Yes (details/spacing/font size) → Senior: autonomous decision
├─ Will the user care?
│   ├─ Yes (functional flow/brand guidelines) → Junior: stop and ask
│   └─ No (technical implementation details) → Senior: autonomous decision
└─ Is information sufficient?
    ├─ No (contradictions/ambiguity exist) → Junior: stop and ask
    └─ Yes (within confirmed specifications) → Senior: autonomous decision
```

#### Exception Scenario Handling

When this protocol's exception handling overlaps with each Phase's exception handling, the Phase's exception handling takes precedence (more specific), this protocol serves as supplement.

| Scenario | Handling |
|----------|----------|
| User refuses to answer question checklist | Respect their pace, use best judgment to produce 1 main plan + 1 differentiated variant, clearly mark assumptions at delivery |
| Time is tight | Skip Junior pass, go directly to Full pass, produce only 1 plan, mark delivery as "without early validation" |
| Design spec vs. product requirement conflict | Stop and point out the contradiction, let the user choose, do not self-downgrade the spec |
| Task too large to handle at once | Break into steps, complete the first step for user review, then proceed |
