# Animation Best Practices

> A keyframe classification system anchored on the Ant Design motion design three principles.
> Animation principles + easing curves + Keyframe classification + advanced interaction patterns + Stage/Sprite delivery principles.

---

## 1. Animation Principles

### Core: Natural > Efficient > Restrained

> Based on the Ant Design motion design three principles. Principle priority cannot be overridden by other sources.

#### 1. Natural

Simulate physical world motion patterns, ensuring visual continuity.

- Enter with ease-out (fast start, slow brake)
- Exit with ease-in (slow start, fast leave)
- Reposition with ease-in-out (except FLIP transitions, see 6.6)

#### 2. Efficient

Minimize transition time, complete animations quickly. Exits are faster than entrances.

- UI micro-interaction duration 100-300ms covers 90% of scenarios
- Exit animations are faster and simpler than entrance animations
- No need to attract attention grandly; simple and clear is sufficient

#### 3. Restrained

Avoid animation fatigue; make purposeful animations only.

- Every animation must have a functional purpose, statable in one sentence—purposeless animations should be removed
- Animations should not be more prominent than content
- Good animation is "felt but not noticed"
- Not every state change needs an animation
- Narrative animations (scroll reveal, counter, etc.) may extend to 400-1200ms, but daily UI interactions do not use this duration range

> **Layering principle**: UI components follow the efficiency principle (100-300ms), narrative animations pursue natural feel (400ms+). The two have different duration specifications; see Section 4.

### Supplement: Consistency

Same-type interactions use the same set of parameters, ensuring unified experience.

- Use preset animation tokens
- Same-type components share motion specifications

---

## 2. Core Easing Curves

### Basic Easing (UI Component Defaults)

> Default easing based on the Ant Design motion three principles. Covers 90%+ of daily UI interaction scenarios.
> Note: The ease-out / ease-in / ease-in-out in the table below are Ant Design-defined custom curves, not CSS keywords. The CSS `ease-out` keyword = `cubic-bezier(0, 0, 0.58, 1)`, which differs from the definitions in this document.

| Name | CSS Value | Applicable Scenarios | Physical Intuition |
|------|-----------|---------------------|-------------------|
| ease-out | `cubic-bezier(0.215, 0.61, 0.355, 1)` | Enter animation (**default**) | Fast start, slow brake |
| ease-in | `cubic-bezier(0.55, 0.055, 0.675, 0.19)` | Exit animation | Slow start, fast leave |
| ease-in-out | `cubic-bezier(0.645, 0.045, 0.355, 1)` | Reposition / expand-type animation | Symmetric acceleration-deceleration |

### Advanced Easing

> Specialized curves beyond basic easing, categorized by use case into two types. Cannot replace basic easing as UI component defaults.

**Narrative type** (marketing animations, scroll reveal, etc.—scenarios requiring strong physical weight)

| Name | CSS Value | Applicable Scenarios | Physical Intuition |
|------|-----------|---------------------|-------------------|
| Expo Out | `cubic-bezier(0.16, 1, 0.3, 1)` | Narrative animation entrance | Fast start, extremely slow brake |

**Elastic feedback type** (specific components requiring elastic/overshoot feel in interaction)

| Name | CSS Value | Applicable Scenarios | Physical Intuition |
|------|-----------|---------------------|-------------------|
| Overshoot | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Toggle/switch elastic toggle | Elastic overshoot |
| Spring | `cubic-bezier(0.175, 0.885, 0.32, 1.1)` | Geometric body settling, natural placement | Physical spring |

> **Note**: Overshoot and Spring are only for specific interaction feedback requiring physical elastic feel (e.g., Toggle switching), not for regular UI appear/disappear animations.

### Easing Selection Decision Tree

```
Need animation?
├─ Element appears → ease-out (default)
│   ├─ Involves size expansion (Slide expand) → ease-in-out
│   └─ Narrative animation appears → Expo Out
├─ Element disappears → ease-in (Slide collapse same, shorter duration)
├─ Element repositions → ease-in-out
│   └─ FLIP transition → ease-out (emphasize landing, see 6.6)
├─ Elastic feedback (Toggle/switch) → Overshoot
└─ Physical settling → Spring
```

> **Duration guidance** is not within the scope of this decision tree—exits are faster than entrances, Slide collapse is faster than expansion; see Section 4 for duration specifications.

---

## 3. Motion Keyframe Classification System

> A keyframe classification system and semantic specification distilled from the Ant Design motion principles.
> Framework-agnostic—any implementation layer can consume by this classification.

### 3.1 Classification Overview

| Family | Core Transform | Semantics | Typical Scenarios |
|--------|---------------|-----------|-------------------|
| **Fade** | opacity | Fade in/out, no motion direction | Overlays, tooltips, background switching |
| **Slide** | scaleX/scaleY + opacity | Expand/collapse from edge (drawer/curtain) | Dropdown menus, accordion panels, drawer sidebars |
| **Move** | translateX/Y + opacity | Element displacement (slide entrance) | Toast notifications, dialogs, panel switching |
| **Zoom** | scale + opacity | Scale entrance (emphasize enter/exit) | Modals, image previews, badge pop-ups |
| **Feedback** | rotate / boxShadow / opacity | Interaction feedback effects | Loading states, ripple clicks, feedback dismissal |

### 3.2 Slide vs Move Semantic Distinction

The most common confusion point. Both have directional variants, but their physical semantics are entirely different:

| Dimension | Slide (scaleX/Y) | Move (translateX/Y) |
|-----------|-------------------|---------------------|
| Visual effect | **Expand/collapse** from edge, like pulling a drawer open | Element **slides in/out as a whole**, like a sliding door |
| Spatial behavior | Element expands from scaled state to full size; scaleY/X is a visual transform, **does not change layout size**; actual collapse effect requires overflow:hidden | Element exists fully, only position is offset; translate does not affect layout flow |
| transformOrigin | Key parameter, determines expansion anchor | Not involved |
| Applicable scenarios | Dropdown menus, Accordion, Drawer | Toast, Dialog, panel switching |
| Keyframe example | `scaleY(0)→scaleY(1)` | `translateY(100%)→translateY(0)` |

**Naming semantics**:
- Slide direction word indicates **anchor position**—slideUp = anchored at top, expands downward; slideDown = anchored at bottom, expands upward
- Move direction word indicates **entry origin**—moveUp = enters from above; moveDown = enters from below
- The above naming semantics follow the physical intuition of expand-type animations: the direction word indicates the visual anchor position, making the expansion direction directly derivable from the name

### 3.3 Directional Variants and transformOrigin

Slide and Zoom directional variants control expansion/scale anchors via `transformOrigin`:

**Slide Directional Variants**

| Variant | transformOrigin | Anchor Position | Expansion Direction | Applicable Scenarios |
|---------|----------------|-----------------|--------------------|---------------------|
| slideUp | `50% 0%` | Top | Expands downward | Dropdown menu (expands below button) |
| slideDown | `50% 100%` | Bottom | Expands upward | Bottom pop-up panel |
| slideLeft | `0% 50%` | Left | Expands rightward | Left drawer/panel |
| slideRight | `100% 50%` | Right | Expands leftward | Right drawer/panel |

**Zoom Directional Variants**

> Zoom direction words also indicate **scale anchor position**, consistent with Slide naming semantics.

| Variant | transformOrigin | Anchor Position | Applicable Scenarios |
|---------|----------------|-----------------|---------------------|
| zoomUp | `50% 0%` | Top center | Expand from icon above |
| zoomDown | `50% 100%` | Bottom center | Expand details from button |
| zoomLeft | `0% 50%` | Left center | Left-associated expansion |
| zoomRight | `100% 50%` | Right center | Right-associated expansion |

### 3.4 Zoom Two-Tier Scale

> `zoomBig`'s "Big" refers to the larger starting scale value (0.8), hence the visual change is more gentle; `zoom` starts small (0.2), with stronger visual impact.

| Variant | Scale Range | Visual Intensity | Applicable Scenarios |
|---------|------------|-----------------|---------------------|
| **zoom** | scale(0.2) ↔ scale(1) | Emphasized entrance, strong visual impact | Image preview, fullscreen pop-up |
| **zoomBig** | scale(0.8) ↔ scale(1) | Gentle scale, everyday use | Regular modals, card pop-ups |

### 3.5 Feedback Effect Keyframes

| Keyframe | Transform | Applicable Scenarios |
|----------|-----------|---------------------|
| loadingCircle | rotate(0 → 360deg) | Loading spin indicator |
| waveEffect | boxShadow spread (0 → 6px) | Click ripple effect |
| fadeEffect | opacity → 0 | Feedback element dismissal (e.g., Toast auto-dismiss) |

> **Performance note**: waveEffect using boxShadow animation triggers paint, conflicting with the Section 8 principle of "only animate transform and opacity". Recommended alternative: use pseudo-element + `transform: scale()` to simulate ripple spread; boxShadow approach only suitable for simple scenarios with few elements.

### 3.6 Keyframe Selection Decision Tree

```
Need animation?
├─ Element fade in/out (no direction) → Fade
├─ Expand/collapse from edge (size scaling) → Slide + directional variant
├─ Element slides in/out as whole (position offset) → Move + directional variant
├─ Scale-emphasized entrance/exit → Zoom / ZoomBig + directional variant
└─ Interaction feedback
    ├─ Loading spin → loadingCircle
    ├─ Click ripple → waveEffect
    └─ Dismissal feedback → fadeEffect
```

---

## 4. Duration Specifications

### UI Micro-interactions (100-300ms)

> Ant Design efficiency principle: minimize transition time, complete quickly. Exits are faster than entrances.

| Scenario | Duration | Easing |
|----------|----------|--------|
| Hover feedback (simple color/shadow change) | 100-150ms | ease-out |
| Hover feedback (composite: displacement + shadow) | 200ms | ease-out |
| Button click | 100ms | ease-out |
| Component expand | 200-250ms | ease-in-out |
| Fade in | 200ms | ease-out |
| Fade out | 140ms | ease-in |
| Modal appear | 280ms | ease-out |
| Modal exit | 180ms | ease-in |
| Toggle switch | 200ms | Overshoot |
| Toast appear | 300ms | ease-out |
| Toast disappear | 200ms | ease-in |
| Sidebar expand | 300ms | ease-in-out |
| Sidebar collapse | 200ms | ease-in |
| Page transition enter | 300ms | ease-in-out |
| Page transition exit | 200ms | ease-in |
| List/card entrance (UI component layer Staggered Entrance, see 6.4) | 200-300ms | ease-out |
| List item removal (removed item ease-in + remaining items shift up ease-in-out) | 300ms | ease-in + ease-in-out |

> **Easing allocation logic**: Element appearance defaults to ease-out (Ant Design principle); Slide-type animations involving size expansion use ease-in-out (symmetric acceleration-deceleration is more natural), collapse animations still use ease-in and are faster than expansion; fade-out/exit uses ease-in. Exit animations are faster than entrances, duration approximately 60-70% of entrance. Special scenarios see corresponding subsections (FLIP see 6.6, elastic feedback see Section 2 advanced easing).

### Narrative Animations (400ms+)

> For marketing pages, demo animations, data visualization, and other scenarios requiring attention. Duration exceeds UI micro-interaction upper limit.

| Scenario | Duration | Easing |
|----------|----------|--------|
| Staggered Entrance | 400-500ms | Expo Out |
| Scroll Reveal | 400-600ms | Expo Out |
| Counter / CountUp | 600-1200ms | Expo Out |

> Complete parameters for each pattern see the corresponding subsections in Section 6. Typewriter/Chunk Reveal (6.3) is a continuous streaming output with no fixed total duration, not applicable to the above table format.

---

## 5. Interaction Motion Quick Reference

> The duration/easing parameters from Section 4 are expanded here into specific motion descriptions for direct implementation. Includes both UI micro-interactions and narrative animations; narrative entries are marked with **▾**.

| Scenario | Motion Description | Reference Duration | Reference Easing | Tier |
|----------|-------------------|--------------------|-----------------|------|
| Card Hover | Shift up 2-4px + shadow deepening (composite Hover; simple Hover see Section 4 100-150ms) | 200ms | ease-out | UI |
| Number change ▾ | Value smoothly increments to target (6.2 Counter), or each digit scrolls independently with 50ms/digit stagger (per-digit stagger mode) | 600-1200ms (varies by magnitude) | Expo Out | Narrative |
| List item deletion | Slide off screen (ease-in) + other items shift up to fill gap (ease-in-out) | 300ms | ease-in + ease-in-out | UI |
| Toggle switch | Knob movement + background color change | 200ms | Overshoot | UI |
| Toast appear | Slide in from bottom + fade in | 300ms | ease-out | UI |
| Toast disappear | Slide out upward + fade out | 200ms | ease-in | UI |

---

## 6. Motion Component Pattern Library

> Advanced interaction pattern descriptions.
> Each pattern includes: trigger condition, animation behavior, parameter specification, applicable scenarios.
> No framework-bound code; any implementation layer can consume.

### 6.1 Scroll Reveal

**Trigger condition**: Element enters viewport (IntersectionObserver threshold typically 0.1-0.3)

**Animation behavior**:
- Element transitions from hidden state (opacity: 0 + offset) to visible state
- Multiple elements enter sequentially (stagger), interval 30-80ms
- Offset direction typically bottom-to-top (translateY: 20-40px → 0), can also be horizontal

**Parameters**:

| Parameter | Recommended Value | Notes |
|-----------|------------------|-------|
| Offset | 20-40px | Too large feels like "bounce in", too small is barely perceptible |
| Stagger interval | 50ms | Delay between elements in the same group |
| Easing | Expo Out | Natural deceleration settling |
| Duration | 400-600ms | Narrative animation entrance can be longer |

**Applicable scenarios**: Marketing page content areas, Landing Page sections, long list batch loading

### 6.2 Counter / CountUp

**Trigger condition**: Number element enters viewport, or data update event

**Animation behavior**:
- Value smoothly increments from start to target
- Uses ease-out curve, fast start, slow end (simulates "settling" feel)
- Thousand-separator formatting updates in real-time during animation

**Parameters**:

| Parameter | Recommended Value | Notes |
|-----------|------------------|-------|
| Duration | 600-1200ms | Adjust based on number magnitude |
| Easing | Expo Out | Fast start, slow settling |
| Decimal places | Determined by business | Currency 2 places, percentage 1 place |
| Per-digit stagger interval | 50ms/digit | Each digit animates independently with sequential delay (per-digit stagger mode only) |

**Applicable scenarios**: Dashboard metric cards, KPI big numbers, data visualization panels

### 6.3 Typewriter / Chunk Reveal

**Trigger condition**: AI-generated content arrival, code output, narrative text display

**Animation behavior**:
- **Do not use setInterval single-character pop** (like old movie subtitles)
- Use Chunk Reveal: split by word/punctuation, reveal 2-5 characters at a time
- Irregular intervals (40-120ms), simulating real streaming output
- Each new chunk accompanied by subtle cursor blink

**Parameters**:

| Parameter | Recommended Value | Notes |
|-----------|------------------|-------|
| Chunk granularity | Split by word + punctuation | `text.split(/(\s+|,\s*|\.\s*|;\s*)/)` |
| Interval range | 40-120ms (random) | Irregularity creates realism |
| Cursor | █ blink, 500ms period | Cursor disappears after typing ends |

**Applicable scenarios**: AI chat output, terminal simulation, code demo, narrative animation

### 6.4 Staggered Entrance

**Trigger condition**: List/grid/card group first render, or new items added

**Animation behavior**:
- Each element enters with a fixed stagger interval
- Typical combination: fadeIn + translateY(10px → 0)
- Stagger interval 30ms (list rows) / 50ms (card grid)

**Parameters**:

| Parameter | Recommended Value | Notes |
|-----------|------------------|-------|
| Stagger interval | 30ms (rows) / 50ms (cards) | Lists are denser, cards more relaxed |
| Offset | 10-20px | Small offset is sufficient; too large feels like bounce |
| Easing | ease-out (UI) / Expo Out (narrative) | UI component entrance uses ease-out, narrative scenarios use Expo Out |
| Duration | 200-300ms (UI) / 400-500ms (narrative) | UI component entrance is shorter, narrative scenarios start at 400ms |

**Applicable scenarios**: Table row entrance, card list loading, navigation item expansion

### 6.5 Segmented Reveal

**Trigger condition**: Tutorial animation, concept explanation, step-by-step guidance

**Animation behavior**:
- Content divided into multiple Phases, each with its own time segment
- Phases connect naturally through overlapping time intervals (not hard cuts)
- Typical structure: problem display → approach expansion → result demonstration

**Parameters**:

| Parameter | Recommended Value | Notes |
|-----------|------------------|-------|
| Single segment duration | 3000-5000ms | Comfortable range for human attention |
| Inter-segment overlap | 500-1000ms | Overlap period between previous fade-out and next fade-in |
| Maximum single segment | 10000ms | Attention declines beyond 10 seconds |
| Easing | ease-out (entrance) / ease-in (exit) | Inter-segment transitions follow appear/disappear rules |

**Applicable scenarios**: Product feature demos, tutorial animations, data report progressive display

### 6.6 FLIP / Shared Element Transition

**Trigger condition**: Element transforms from one form to another (e.g., button → input field)

**Animation behavior**:
- **Not** two elements cross-fading
- **The same element** smoothly transitions between two states
- Position, size, border-radius change simultaneously, maintaining visual continuity

**Parameters**:

| Parameter | Recommended Value | Notes |
|-----------|------------------|-------|
| Duration | 300ms | Not too fast; the change must be perceivable |
| Easing | ease-out | Emphasizes "landing" rather than "displacement"—when an element morphs from old to new form, decelerating to settle is more natural than symmetric acceleration-deceleration |

**Applicable scenarios**: List item expand to detail, button morph to panel, card zoom preview

### 6.7 Particle Effect

**Trigger condition**: Celebration/achievement moment, brand visual reinforcement, background atmosphere

**Animation behavior**:
- Large number of small elements diffuse outward from center/random positions
- Each particle has independent speed, direction, size, and opacity decay
- No inter-particle interaction; purely visual effect

**Parameters**:

| Parameter | Recommended Value | Notes |
|-----------|------------------|-------|
| Particle count | 20-50 (lightweight) / 100+ (gorgeous) | Halve on mobile |
| Lifecycle | 600-1500ms | Particle from appearance to disappearance |
| Easing | ease-out | Particles decelerate and dissipate |
| Performance | Only use transform + opacity | Avoid triggering layout/paint |

**Applicable scenarios**: Completion celebration (confetti), brand Logo animation, background particle flow

---

## 7. Stage + Sprite Animation Delivery Principles

### Concepts

- **Stage**: Page-level animation container, controls global progress (0→1)
- **Sprite**: Element-level animation unit, calculates its own state based on Stage progress

### Delivery Rules

1. Each Sprite must declare its own `enter` and `exit` progress intervals
2. Sprites achieve staggered entrance through progress intervals
3. Hard-coded timing dependencies between Sprites are prohibited
4. Easing functions are applied within Sprites, not dependent on Stage

### Example

```
Stage: 0 ───────────────────────────────→ 1

Sprite 1 (title):      [0.0 ── 0.3] enter    [0.8 ── 1.0] exit
Sprite 2 (subtitle):       [0.1 ── 0.4] enter    [0.75 ── 0.95] exit
Sprite 3 (CTA):                [0.2 ── 0.5] enter    [0.7 ── 0.9] exit
Sprite 4 (image):                   [0.15 ── 0.6] enter    [0.65 ── 0.85] exit
```

### Interpolation Function

```js
function interpolate(t, inputRange, outputRange, easing = Easing.linear) {
  const [inMin, inMax] = inputRange
  const [outMin, outMax] = outputRange
  const progress = Math.max(0, Math.min(1, (t - inMin) / (inMax - inMin)))
  const easedProgress = easing(progress)
  return outMin + (outMax - outMin) * easedProgress
}
```

---

## 8. Animation Performance Rules

1. **Only animate transform and opacity** — these two properties do not trigger layout/paint
2. **Use will-change sparingly** — add only before animation starts, remove after it ends; replaces the legacy `translateZ(0)` forced compositing layer hack with clearer semantics
3. **Avoid animating more than 5 elements simultaneously** — especially on mobile
4. **Use requestAnimationFrame** — do not use setTimeout/setInterval
5. **Avoid persistent compositing layers** — `will-change` and `transform: translateZ(0)` must not be written into persistent stylesheets, otherwise causing continuous memory growth

---

## 9. Platform Animation Strategy

> The Ant Design three principles (Natural > Efficient > Restrained) are platform-agnostic. The `prefers-reduced-motion` accessibility requirement also applies to all platforms. The following strategies are platform-specific implementation guidance and do not change the principles themselves.

### 9.1 Mobile

| Dimension | Strategy | Rationale |
|-----------|----------|-----------|
| Touch feedback | Use scale(0.97) press feedback instead of desktop hover shift-up | Mobile has no hover; alternative tactile feedback is needed |
| Simultaneous animations | Upper limit 3 elements (desktop 5) | Mobile GPU performance is limited |
| Duration | Still follows 100-300ms (UI) / 400ms+ (narrative) | Ant Design efficiency principle unchanged |
| Easing | Still defaults to ease-out for UI | Ant Design natural principle unchanged |
| reduced-motion | Respect `prefers-reduced-motion: reduce`, disable non-essential animations | Universal accessibility requirement across all platforms (see this section's opening note) |

### 9.2 Large Screen

| Dimension | Strategy | Rationale |
|-----------|----------|-----------|
| Offset | Scale up 2-3x (desktop 20-40px → large screen 40-120px) | Greater motion amplitude needed for perception at viewing distance |
| Frame rate | Target 60fps, minimum 30fps | Large screen device GPU performance varies widely |
| Focus navigation | Focus movement requires clear visual guidance (highlighted border + micro-displacement) | Remote control operation needs clear focus indication |
| Data refresh | Use Counter/CountUp for smooth transitions, avoid hard cuts | Hard cuts are more jarring when viewed from a distance |

### 9.3 Native App Animation Mapping (Reference for Layer 3 Consumption)

> This table is for Layer 3 execution layer reference and is not part of Layer 2 specification constraints. How the same keyframe semantics map to different native frameworks.

| Web Keyframe | iOS | Android | Flutter |
|-------------|-----|---------|---------|
| Fade | UIView.animate opacity | ObjectAnimator alpha | FadeTransition |
| Slide (scaleY/X) | UIView.animate transform(scaleY/X) + anchorPoint | View.animate().scaleY()/scaleX() + pivotX/pivotY | Transform.scale + Alignment |
| Move (translate) | UIView.animate center | ObjectAnimator translationX/Y | SlideTransition |
| Zoom | UIView.animate transform.scale | ObjectAnimator scaleX/Y | ScaleTransition |
| Feedback (ripple) | UIButton touch feedback | RippleDrawable | InkWell |
