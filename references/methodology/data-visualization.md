# Data Visualization Color & Component Specification

> Color system, chart component style specification, and data encoding rules for charts and data visualization in cockpit/data dashboards.
> This document is the companion specification to `dashboard-layout-patterns.md` — layout defines "where to place," this document defines "how to draw data."
> Only applicable to `meta.platform === "dashboard"` scenarios.

---

## 1. Design Principles

### 1.1 Color Is Data

In dashboard scenarios, the primary responsibility of color is to **encode data**, not to decorate. Every use of color must answer: "What data information is this color conveying?"

**Anti-pattern**: Using brand-color gradients to decorate chart backgrounds — brand-color gradients encode no data and instead reduce the data-ink ratio.

### 1.2 Three-Layer Color System

```
Brand Layer (identity) — token.json colors.brand
  └─ Used for: title emphasis, CTAs, brand identity elements
  └─ Not used for: chart data series

Semantic Layer (semantics) — token.json colors.semantic
  └─ Used for: success/warning/danger/info states
  └─ Used for: trend indicators (▲ ▼)

Data Layer (data encoding) — defined in this document
  └─ Used for: chart series, heatmap color scales, categorical encoding
  └─ Independent of brand color, unrelated to brand choice
```

### 1.3 Data-Ink Ratio

Edward Tufte's data-ink ratio principle is especially important in dashboard scenarios — when viewed from a distance, non-data elements (gridlines, decorations, borders) interfere with data recognition.

| Element | Treatment |
|---------|-----------|
| Gridlines | Very light color (`{colors.border.default}`), or omitted |
| Axes | Retain only necessary tick labels; axis lines very thin |
| Legend | Embedded within chart area, no separate space allocation |
| Data labels | Directly annotate key data points; omit non-key points |
| Decoration | Zero decoration — no gradient backgrounds, no shadows, no glow effects |

---

## 2. Data Color Schemes

### 2.1 Categorical Palette

Used for: bar charts, pie charts, categorical comparisons, and other **discrete data** encoding.

**Principle**: Colors in the palette must be mutually distinguishable on dark backgrounds and must not conflict with the brand color.

#### Dark Dashboard Default Palette (8 Colors)

| Index | Value | Name | Usage Example |
|-------|-------|------|---------------|
| C1 | `#5e6ad2` | Lavender Blue | Series 1 (default) |
| C2 | `#3ecf8e` | Emerald Green | Series 2 |
| C3 | `#f5a623` | Amber Orange | Series 3 |
| C4 | `#e5484d` | Coral Red | Series 4 |
| C5 | `#8b5cf6` | Violet | Series 5 |
| C6 | `#06b6d4` | Cyan Blue | Series 6 |
| C7 | `#ec4899` | Rose Pink | Series 7 |
| C8 | `#84cc16` | Lime Green | Series 8 |

**Usage Rules**:
- Use in index order; do not skip indices
- When exceeding 8 series, use light variants of C1-C4 (opacity 0.6)
- When using 5 or fewer series, prioritize C1-C5

**Relationship with Brand Color**: C1 is derived from `dashboard-dark.template.json`'s default brand color `#5e6ad2`. If the brand color differs from C1 (e.g., ClickHouse's `#faff69`), C1 is replaced with the brand color; the rest of the palette remains unchanged.

#### Brand Color Replacement Rules

| Brand Color Position | Replacement Strategy | Example |
|---------------------|---------------------|---------|
| Brand color same hue as C1 | No replacement | Linear: `#5e6ad2` ≈ C1 |
| Brand color same hue as C2 | C1 replaced by brand color, original C1 shifts back | Supabase: `#3ecf8e` → replaces C2, C1 shifts back |
| Brand color conflicts with palette | C1 replaced by brand color, conflicting color moves to end | ClickHouse: `#faff69` → replaces C1, original C1 shifts back |
| Brand color is a non-palette color | C1 replaced by brand color, original C1 shifts back | NVIDIA: `#76b900` → replaces C1 |

### 2.2 Sequential Palette

Used for: heatmaps, density maps, single-metric gradients, and other **continuous data** encoding.

**Principle**: Light to dark; low values light, high values dark. On dark backgrounds, the light end must still be recognizable.

| Color Family | Light End | Mid | Dark End | Applicable |
|-------------|-----------|-----|----------|------------|
| Blue | `#1e3a5f` | `#3b82f6` | `#93c5fd` | Default sequential, cold temperature |
| Green | `#1a3d2e` | `#22c55e` | `#86efac` | Positive metrics, growth |
| Orange | `#4a2c1a` | `#f59e0b` | `#fde68a` | Warning sequential, hot temperature |
| Red | `#4a1a1a` | `#ef4444` | `#fca5a5` | Negative metrics, danger |

**Usage Rules**:
- Default to blue family
- Positive metrics use green family, negative metrics use red family
- Heatmaps use blue→red dual-end color scale

### 2.3 Diverging Palette

Used for: comparative analysis, positive/negative deviation, and other data with a **neutral point**.

| Palette | Negative End | Neutral Point | Positive End | Applicable |
|---------|-------------|---------------|-------------|------------|
| Red-Blue | `#ef4444` | `{colors.surface.2}` | `#3b82f6` | Deviation analysis (default) |
| Red-Green | `#ef4444` | `{colors.surface.2}` | `#22c55e` | Profit/loss analysis |
| Orange-Cyan | `#f59e0b` | `{colors.surface.2}` | `#06b6d4` | Temperature distribution |

**Neutral Point Rule**: The neutral point of a diverging palette must use a surface color (`surface.2` or `surface.3`), not white — white is too glaring on dark backgrounds.

### 2.4 Semantic Color Extensions

`token.json`'s `colors.semantic` defines 4 base semantic colors. Dashboard scenarios require extensions:

| Semantic | token.json | Extension Color | Usage |
|----------|-----------|-----------------|-------|
| Success | `#27a644` | `#86efac` (light) | Success trend line, positive area fill |
| Danger | `#e5484d` | `#fca5a5` (light) | Danger trend line, negative area fill |
| Warning | `#f5a623` | `#fde68a` (light) | Warning threshold line, attention area |
| Info | `#5e6ad2` | `#a5b4fc` (light) | Info annotation, reference line |
| Disabled | — | `{colors.ink.tertiary}` | No data, data unavailable |
| Neutral | — | `{colors.ink.subtle}` | Auxiliary line, baseline |

---

## 3. Chart Component Style Specification

### 3.1 Common Styles

Base styles shared by all chart types:

| Element | Style | Notes |
|---------|-------|-------|
| Chart background | Transparent (inherits card background) | Do not set a separate background color |
| Chart padding | 16px (top/right) / 32px (bottom/left) | Leave space for axis labels |
| Gridlines | `{colors.border.default}` 1px dashed | Horizontal gridlines only; omit vertical gridlines |
| Axis lines | Not displayed | Gridlines already provide reference |
| Tick labels | `{typography.scales.micro}` | 12px / 500, `{colors.ink.subtle}` color. Low DPI screens must override to `{typography.scales.eyebrow}` (14px), see `dashboard-layout-patterns.md` §7.4 |
| Data labels | `{typography.scales.caption}` | 16px / 400, `{colors.ink.muted}` color |
| Legend | `{typography.scales.eyebrow}` | 14px / 500, embedded in chart top-right corner. Low DPI screens must override to `{typography.scales.caption}` (16px) |

### 3.2 Line Chart

| Element | Style |
|---------|-------|
| Line width | 2px (single line) / 1.5px (multiple lines) |
| Data points | Not displayed (default) / 4px dots (hover/focus state) |
| Area fill | Categorical color opacity 0.15 |
| Max number of lines | 5 (exceeding 5: use facets or toggle) |
| Line style | Solid (first 3) / Dashed (4th-5th) |

**Dashboard-specific handling**:
- Line width 0.5px thicker than desktop (recognizable at distance)
- Key data points directly annotated with values (not dependent on hover)
- Trend line endpoints may add arrows to indicate direction

### 3.3 Bar Chart

| Element | Style |
|---------|-------|
| Bar width | Adaptive to data volume, minimum 16px |
| Bar spacing | 30% of bar width |
| Border radius | `{borderRadius.xs}` (6px) top only |
| Max stacked layers | 4 (exceeding 4: use facets) |
| Max grouped bars | 6 (exceeding 6: horizontal scroll or filter) |

**Dashboard-specific handling**:
- Value labels may be embedded within bars (font size `{typography.scales.micro}`, low DPI screens must override to `{typography.scales.eyebrow}`)
- Target/threshold lines annotated with dashed lines + semantic colors

### 3.4 Pie / Donut Chart

| Element | Style |
|---------|-------|
| Type | Prefer donut chart, center displays core value |
| Ring width | 30-40% of radius |
| Spacing | 2px gap between segments |
| Max segments | 6 (exceeding 6: merge as "Other") |
| Labels | External leader-line labels, or embedded percentage (when segment ≥ 15%) |

**Dashboard-specific handling**:
- Donut center displays core value, font size `{typography.scales.heading-xl}` ~ `{typography.scales.headline}`
- Do not use 3D pie charts, exploded pie charts, or other decorative effects

### 3.5 Map

| Element | Style |
|---------|-------|
| Base map color | `{colors.surface.2}` |
| Region boundaries | `{colors.border.default}` 1px |
| Data fill | Sequential palette (default blue family) |
| Annotation points | 8px dots + pulse animation (important points) |
| Max annotation points | 20 (exceeding 20: aggregate; performance limit 50, see `dashboard-interaction.md` §9.4) |
| Legend | Bottom-right embedded, sequential color scale bar |

**Dashboard-specific handling**:
- Maps are the preferred core area for D2 layout (asymmetric primary-secondary)
- Annotation points use pulse animation to attract attention, see `animation-best-practices.md` §9.2
- Data refresh on maps uses smooth transitions, not hard cuts

### 3.6 Heatmap

| Element | Style |
|---------|-------|
| Color scale | Sequential palette (default blue family) or diverging palette |
| Cell border radius | `{borderRadius.xs}` (6px) |
| Cell spacing | 2px |
| Value labels | Centered within cells, font size `{typography.scales.micro}` (low DPI screens must override to `{typography.scales.eyebrow}`) |
| Row/column labels | `{typography.scales.eyebrow}`, `{colors.ink.subtle}` color. Low DPI screens must override to `{typography.scales.caption}` (16px) |

### 3.7 Gauge

| Element | Style |
|---------|-------|
| Arc angle | 270° (default) / 180° (semi-circle) |
| Arc width | 15-20% of radius |
| Background arc | `{colors.border.default}` |
| Foreground arc | Categorical C1 or semantic color |
| Scale | Min/max value labels, `{typography.scales.micro}` (low DPI screens must override to `{typography.scales.eyebrow}`) |
| Center value | `{typography.scales.headline}` ~ `{typography.scales.display-md}` |
| Threshold markers | Semantic color dashed-line markers |

**Dashboard-specific handling**:
- Gauges are suitable for displaying completion/health of a single metric
- No more than 4 gauges side by side

### 3.8 List / Ranking

| Element | Style |
|---------|-------|
| Row height | 48px (6× dashboard base unit of 8px) |
| Row spacing | 1px `{colors.border.default}` divider |
| Rank indicators | Top 3 highlighted with semantic colors (gold/silver/bronze → `#f5a623` / `#8a8f98` / `#cd7f32`) |
| Max rows | 8-10 (visible in one screen) |
| Scrolling | Auto-scroll (exhibition scenario) / No scroll (monitoring scenario) |

---

## 4. Data Encoding Rules

### 4.1 Color Encoding Priority

When data needs encoding, select the encoding method by the following priority:

| Priority | Encoding Method | Applicable | Perception Accuracy |
|----------|----------------|------------|-------------------|
| 1 | Position | Scatter plots, maps | Highest |
| 2 | Length | Bar charts | High |
| 3 | Angle / Area | Pie charts | Medium |
| 4 | Color hue | Categorical comparison | Medium-low |
| 5 | Color intensity | Sequential / heatmaps | Low |
| 6 | Shape | Auxiliary differentiation | Lowest |

**Rule**: Data that can be encoded with position/length should not be encoded with color. Reserve color encoding for dimensions that cannot be expressed with position/length.

### 4.2 Multi-Metric Encoding

| Metric Count | Recommended Chart | Encoding Strategy |
|-------------|-------------------|-------------------|
| 1 | Gauge / Big number card | Color-encode state (green/yellow/red) |
| 2 | Scatter plot / Dual-axis line | Position-encode two dimensions |
| 3-5 | Multi-line chart / Grouped bar | Color hue encodes series |
| 5+ | Faceted chart / Small multiples | Each metric gets an independent chart with unified axes |

### 4.3 Missing Data Handling

| Scenario | Visual Treatment | Notes |
|----------|-----------------|-------|
| Data is null | Dashed-line connection (line chart) / Gap (bar chart) | No interpolation, no zero-filling |
| Data is 0 | Normal display (bar height 0) | 0 is valid data |
| Data loading | Skeleton placeholder | See `./ui-states.md` |
| Data unavailable | `{colors.ink.tertiary}` label "N/A" | Do not hide chart area |

---

## 5. Animation & Transitions

### 5.1 Data Refresh Animations

| Animation Type | Duration | Easing | Applicable |
|---------------|----------|--------|------------|
| Value change | 600ms | ease-out | Metric card numbers, gauge arc |
| Chart redraw | 800ms | ease-in-out | Line/bar chart data update |
| Sort change | 500ms | ease-in-out | Ranking list sort animation |
| New data point entry | 300ms | ease-out | Real-time data append |

**Dashboard-specific rules** (consistent with `animation-best-practices.md` §9.2):
- Value changes use Counter/CountUp smooth transitions; avoid hard cuts
- Hard cuts are more jarring when viewed from a distance
- Animation offsets scaled up 2-3×

### 5.2 Focus Feedback Animations

| Interaction | Animation | Duration |
|-------------|-----------|----------|
| Focus enters chart area | Border highlight + micro-shift 4px | 200ms |
| Focus enters data point | Data point scale 1.5x + Tooltip | 150ms |
| Select data series | Selected series opacity 1.0, others 0.3 | 200ms |

---

## 6. Responsive Adaptation

### 6.1 Chart Scaling Rules

Adaptation strategy for dashboard charts at different resolutions:

| Resolution | Strategy | Notes |
|-----------|----------|-------|
| 1920×1080 (standard) | Baseline | All specifications reference this |
| 2560×1440 (2K) | Chart area scaled 1.33× proportionally | Font size / line width / spacing scaled synchronously |
| 3840×2160 (4K) | Chart area scaled 2× proportionally | Note: CSS px on 4K screens may require devicePixelRatio adaptation |
| LED video wall | Scale by physical pixels | Must confirm actual resolution and DPI of the video wall |

### 6.2 Information Density Adjustment

| Screen Size | Metric Card Count | Chart Count | List Row Count |
|------------|------------------|-------------|----------------|
| 55" (1920×1080) | 4 | 4-6 | 8 |
| 65" (3840×2160) | 6 | 6-9 | 10 |
| 85"+ | 6-8 | 9-12 | 12 |

---

## 7. Checklist

### Color

- [ ] Chart colors use data-layer palette (C1-C8), not brand-color gradients
- [ ] Categorical palette used in index order, no skipped indices
- [ ] Brand color integrated into palette per replacement rules
- [ ] Semantic colors determined by business semantics (not simply up=green)
- [ ] Diverging palette neutral point uses surface color, not white

### Chart Style

- [ ] Gridlines very light or omitted
- [ ] Axis lines not displayed
- [ ] Key data points directly annotated with values (not dependent on hover)
- [ ] Pie chart segments ≤ 6
- [ ] Line chart lines ≤ 5
- [ ] No 3D effects, no decorative gradients

### Data Encoding

- [ ] Position/length encoding prioritized; color encoding reserved for necessary dimensions
- [ ] Missing data has explicit visual treatment (dashed line / gap / N/A)
- [ ] Multi-metric scenarios use correct chart types

### Animation

- [ ] Data refresh uses smooth transitions (not hard cuts)
- [ ] Value changes use CountUp animation
- [ ] Focus feedback has clear visual guidance

### Readability

- [ ] All charts recognizable for main trends at 3m distance
- [ ] Tick label font size ≥ 12px (high DPI) / ≥ 14px (1x DPI, see `dashboard-layout-patterns.md` §7.4)
- [ ] Data label font size ≥ 16px
- [ ] Colors mutually distinguishable on dark backgrounds
