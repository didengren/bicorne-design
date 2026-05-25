# Dashboard Layout Patterns

> Layout pattern definitions for cockpit/data dashboards — 6 layout skeletons, grid system, KPI card specifications, area division rules.
> Page framework types (F1-F8) are defined in `page-framework.md`; this document is a deep expansion of F5 (Fullscreen Immersive) in the dashboard scenario.
> Cross-platform: this document only applies to `meta.platform === "dashboard"` scenarios.

---

## 1. Design Premises

### 1.1 Dashboard ≠ Scaled-up Desktop

The core constraints of dashboard design come from **viewing distance** and **input method**, not screen size itself.

| Dimension | Desktop Web | Data Dashboard |
|------|---------|---------|
| Viewing distance | 0.4-0.7m | 3-5m (command center) / 5-10m (exhibition hall) |
| Input method | Mouse + keyboard | Remote control / Touch / No interaction (auto-carousel) |
| Attention model | Focal (user actively searches for information) | Scanning (information enters field of view) |
| Information density | High density acceptable | Must be restrained — only large blocks of information can be recognized at a distance |
| Interaction depth | Multi-level drill-down | Max 2 levels (home → detail) |
| Session duration | Continuous use | Continuous monitoring (persistent) or brief browsing (exhibition hall) |

### 1.2 Two Hard Constraints

1. **Distance-readable**: L1 core metric font size ≥ 44px, L2 trend label ≥ 20px, L3 auxiliary info ≥ 16px (3m viewing distance, full matrix see §7.1). This is consistent with `dashboard-dark.template.json` typography.scales.
2. **Zero-hover dependency**: Dashboards have no hover interaction; all information must be visible by default or triggered through explicit actions.

---

## 2. Layout Patterns

### D1 Equal Grid

**Typical scenarios**: Operations monitoring, KPI overview
**Selection signal**: Metrics have similar weight, no primary-secondary distinction

```
┌──────────┬──────────┬──────────┐
│  KPI Card 1  │  KPI Card 2  │  KPI Card 3  │
├──────────┼──────────┼──────────┤
│  Chart A   │  Chart B   │  Chart C   │
├──────────┼──────────┼──────────┤
│  Chart D   │  Chart E   │  Chart F   │
└──────────┴──────────┴──────────┘
```

| Parameter | Value | Notes |
|------|------|------|
| Columns | 3 (default) / 2 / 4 | Depends on metric count and screen width |
| Rows | Auto-fit | Row height expands based on content |
| Spacing | `{spacing.4}` (32px) | 4× dashboard spacing base unit of 8px |
| Padding | `{spacing.4}` (32px) | Card internal padding |

**Variants**:

| Variant | Structure | Applicable |
|------|------|------|
| 2×2 | 2 columns 2 rows | 4 core metrics + 4 charts |
| 3×2 | 3 columns 2 rows | 6 metrics (default recommendation) |
| 3×3 | 3 columns 3 rows | 9 areas, information ceiling |
| 4×2 | 4 columns 2 rows | Ultra-wide screen (≥ 2560px) |

### D2 Primary-Secondary Asymmetric

**Typical scenarios**: Command center, real-time monitoring
**Selection signal**: 1 core metric/map occupies the visual center of gravity

```
┌────────────────────┬──────────┐
│                    │  KPI Card 1  │
│   Primary Area     ├──────────┤
│  (Map/Main Chart)  │  KPI Card 2  │
│                    ├──────────┤
│                    │  KPI Card 3  │
└────────────────────┴──────────┘
```

| Parameter | Value | Notes |
|------|------|------|
| Primary area ratio | 65-70% | Left or center |
| Secondary area ratio | 30-35% | Right or top/bottom |
| Primary area min width | 960px | Ensures map/large chart readability |
| Secondary area columns | 1 (default) | KPI cards stacked vertically |

**Direction variants**:

| Variant | Primary area position | Applicable |
|------|----------|------|
| Left-primary right-secondary | Left 70% | Map-centric, process monitoring |
| Top-primary bottom-secondary | Top 60% | Video monitoring + bottom metrics |
| Center-primary surrounded-secondary | Center 60% + corner metrics | War room, situational awareness |

### D3 Metric Bar + Chart Area

**Typical scenarios**: Business analysis, data reporting
**Selection signal**: Top KPI overview + bottom multi-dimensional analysis

```
┌──────────────────────────────────┐
│  Metric 1  │  Metric 2  │  Metric 3  │  Metric 4  │  ← Metric Bar
├──────────┬──────────┬──────────┤
│  Chart A   │  Chart B   │  Chart C   │
├──────────┼──────────┴──────────┤
│  Chart D   │      Chart E         │
└──────────┴─────────────────────┘
```

| Parameter | Value | Notes |
|------|------|------|
| Metric bar height | 120-160px | Includes number + label + trend arrow |
| KPI card width | Equal split / By weight | 4 equal splits most common |
| Metric bar to chart area spacing | `{spacing.4}` (32px) | |
| Chart area rows | 2-3 rows | Over 3 rows risks information overload |

### D4 Timeline-Driven

**Typical scenarios**: Production scheduling, event tracking, traffic monitoring
**Selection signal**: Time dimension is the core organizing logic

```
┌──────────────────────────────────┐
│  Metric 1  │  Metric 2  │  Metric 3  │  Metric 4  │
├──────────────────────────────────┤
│       Timeline (horizontal)        │  ← Core visual anchor
├──────────┬──────────┬──────────┤
│  Detail A  │  Detail B  │  Detail C  │
└──────────┴──────────┴──────────┘
```

| Parameter | Value | Notes |
|------|------|------|
| Timeline height | 80-120px | Sufficient for time labels and event markers |
| Timeline direction | Horizontal (default) / Vertical | Horizontal for widescreen, vertical for event streams |
| Event markers | Dot + Tooltip | Click to expand detail panel |
| Current time line | Vertical/horizontal solid line | Brand color, always visible |

### D5 Hierarchical Drill-down

**Typical scenarios**: Multi-dimensional data analysis, organizational monitoring
**Selection signal**: Need to drill from overview to details level by level

```
┌──────────────────────────────────┐
│  Breadcrumb: Overview > Region > Device  │
├────────────────────┬─────────────┤
│                    │             │
│  Current Level     │  Side Detail │
│  (Chart/List)      │  (Selected)  │
│                    │             │
└────────────────────┴─────────────┘
```

| Parameter | Value | Notes |
|------|------|------|
| Drill depth | Max 2 levels | Dashboards not suited for deep navigation |
| Breadcrumb height | 48px | Includes back button |
| Side detail width | 30-35% | Detailed info for selected item |
| Back action | Breadcrumb + Remote back key | Dual-channel back |

### D6 Fullscreen Narrative

**Typical scenarios**: Exhibition hall, report presentation, auto-carousel
**Selection signal**: No interaction needed, timed switching, visual impact first

```
┌──────────────────────────────────┐
│                                  │
│     Single Fullscreen Content    │
│  (Giant metric / Video animation / Map)  │
│                                  │
│  ─ ─ ─ ─ ● ─ ─ ─ ─              │  ← Page indicator
└──────────────────────────────────┘
```

| Parameter | Value | Notes |
|------|------|------|
| Switch interval | 10-30s | Adjust based on content complexity |
| Switch animation | Fade 600ms / Slide 800ms | Narrative-level animation, see `animation-best-practices.md` |
| Page indicator | Bottom-center dots | 3-8 pages recommended |
| Core metric font size | ≥ 96px | `typography.scales.display-xl` |

---

## 3. Layout Selection Decision Tree

```
What is the core need of your dashboard?
│
├─ Simultaneously monitor multiple peer metrics
│   └─ D1 Equal Grid
│
├─ Has one core focus (map/video/main chart)
│   ├─ Focus at center → D2 Center-primary surrounded-secondary
│   ├─ Focus at left → D2 Left-primary right-secondary
│   └─ Focus at top → D2 Top-primary bottom-secondary
│
├─ KPI overview + multi-dimensional analysis
│   └─ D3 Metric Bar + Chart Area
│
├─ Time is the core dimension
│   └─ D4 Timeline-Driven
│
├─ Need to drill from overview to details
│   └─ D5 Hierarchical Drill-down
│
└─ No interaction, auto display
    └─ D6 Fullscreen Narrative
```

---

## 4. Grid System

### 4.1 Base Grid

Dashboards use a 12-column grid, consistent with Ant Design Grid.

| Parameter | Value | Notes |
|------|------|------|
| Columns | 12 | Standard grid |
| Gutter | 24px | 3× dashboard base unit of 8px |
| Margin | 32px | Distance from screen edge to content area |

### 4.2 Area Division Rules

Dashboard layouts implement area division through grid column allocation:

| Layout | Column Allocation | Applicable |
|------|--------|------|
| Three equal parts | 4 + 4 + 4 | D1 Equal Grid |
| Left-primary right-secondary | 8 + 4 | D2 Left-primary right-secondary |
| Left-primary right-secondary (wide) | 9 + 3 | D2 core area needs more space |
| Four equal parts | 3 + 3 + 3 + 3 | D3 Metric Bar |
| Primary + dual secondary | 6 + 3 + 3 | D2 Center-primary surrounded-secondary variant |

### 4.3 Safe Area

Dashboards have physical bezels and splicing gaps; content must avoid edges:

| Scenario | Safe area inset | Notes |
|------|----------|------|
| Single LCD | 16px | Standard display bezel |
| LED splicing wall | 32-48px | Splicing gap + bezel |
| Touch kiosk | 24px | Bezel + touch edge false-trigger zone |

---

## 5. KPI Card Specifications

KPI Cards are the most core component of dashboards, with the highest frequency of appearance.

### 5.1 Structure

```
┌─────────────────────┐
│  Label (metric name)    │  ← eyebrow / caption
│  12,847             │  ← display-md / headline
│  ▲ 12.5%            │  ← Trend indicator
│  ──────╲──────      │  ← Mini trend chart (optional)
└─────────────────────┘
```

### 5.2 Font Size Specifications

| Element | Token reference | Notes |
|------|----------|------|
| Label | `{typography.scales.eyebrow}` | 14px / 500 / 0.4px letter-spacing. Low DPI screens must override to `{typography.scales.caption}` (16px), see §7.4 |
| Core value | `{typography.scales.headline}` ~ `{typography.scales.display-md}` | 44-56px, select based on card size and count |
| Trend text | `{typography.scales.caption}` | 16px / 400 |
| Mini chart | — | Height 32-48px, width 100% |

**Core value font size selection**:

| Card count | Recommended size | Token |
|---------|---------|-------|
| 3-4 | 56px | `display-md` |
| 5-6 | 44px | `headline` |
| 7+ | 36px | `heading-xl` (⚠️ Below 3m L1 minimum 44px, not recommended to exceed 6) |

### 5.3 Trend Indicator

| State | Icon | Color | Notes |
|------|------|------|------|
| Up (positive) | ▲ | `{colors.semantic.success}` | e.g., revenue growth |
| Down (positive) | ▼ | `{colors.semantic.success}` | e.g., failure rate decrease |
| Up (negative) | ▲ | `{colors.semantic.danger}` | e.g., error rate increase |
| Down (negative) | ▼ | `{colors.semantic.danger}` | e.g., revenue decline |
| Flat | ─ | `{colors.ink.subtle}` | Change < threshold |

**Positive/negative determination**: Not simply "up = good, down = bad", but determined by business semantics. Revenue increase is positive; failure rate decrease is also positive.

### 5.4 Card Spacing

| Scenario | Spacing | Notes |
|------|------|------|
| Metric bar card spacing | `{spacing.3}` (24px) | Compact arrangement |
| Grid card spacing | `{spacing.4}` (32px) | Standard spacing |
| Card internal padding | `{spacing.4}` (32px) | Unified padding |

---

## 6. Area Division Rules

### 6.1 Information Hierarchy

Dashboard information is divided into three levels:

| Level | Content | Visual weight | Proportion |
|------|------|---------|------|
| **L1 Core metrics** | KPI values, alert status | Highest (largest font, brand color emphasis) | 20-30% area |
| **L2 Trend analysis** | Charts, trend lines, comparisons | Medium (standard font, neutral color) | 40-50% area |
| **L3 Auxiliary info** | Lists, logs, timestamps | Lowest (small font, muted color) | 20-30% area |

### 6.2 Visual Flow

Dashboard visual flow follows the **Z-pattern scanning model**:

```
┌─ 1 ────────────────────── 2 ─┐
│                               │
│                               │
│                               │
└─ 3 ────────────────────── 4 ─┘
```

- **Position 1**: Most core metric or status
- **Position 2**: Secondary core metric
- **Position 3**: Trend analysis
- **Position 4**: Auxiliary info or action area

### 6.3 Alert Area

Alert information must always be visible, unaffected by scrolling or switching:

| Alert level | Visual treatment | Position |
|---------|---------|------|
| Critical (P0) | Red background flashing + sound | Top banner or corner badge |
| Warning (P1) | Yellow/orange indicator | Inside KPI card trend area |
| Info (P2) | Blue/brand color indicator | List item marker |

---

## 7. Font Legibility Specifications

### 7.1 Viewing Distance × Font Size Matrix

The hard constraint for dashboard font sizes comes from viewing distance. The following matrix is calculated based on 20/20 vision, dark background, sans-serif font legibility minimums:

| Viewing distance | L1 Core metrics | L2 Trend/chart labels | L3 Auxiliary info | Minimum legible size |
|---------|-----------|---------------|-----------|------------|
| 3m (command center standard) | 44-96px | 20-30px | 16-18px | 14px |
| 5m (large conference room) | 72-120px | 30-44px | 20-24px | 18px |
| 10m (exhibition hall/lobby) | 120-192px | 44-72px | 24-36px | 28px |

**Calculation formula**: Minimum legible size(px) ≈ viewing distance(m) × 5 (simplified derivation based on ISO 3864-1 safety sign legibility standard).

### 7.2 Screen Size × Font Size Recommendations

Font size recommendations for different physical screen sizes at standard 3m viewing distance:

| Screen size | Resolution | DPI | L1 Core metrics | L2 Trend labels | L3 Auxiliary info |
|---------|--------|-----|-----------|-----------|-----------|
| 55" | 1920×1080 | 40 | 56-96px | 24-30px | 16-18px |
| 65" | 3840×2160 | 68 | 56-96px | 24-30px | 16-18px |
| 85" | 3840×2160 | 52 | 72-120px | 30-44px | 20-24px |
| LED splicing wall (2×2) | 7680×2160 | Varies | 96-192px | 36-56px | 24-30px |

> Note: DPI differences are resolved through the CSS px abstraction layer. Font size recommendations are consistent for the same resolution at different physical sizes, because CSS px is a visual angle unit, not a physical unit. However, physical size affects viewing distance — an 85" screen is typically placed further than a 55", thus requiring larger font sizes.

### 7.3 Font Selection Guide

| Dimension | Recommended | Not recommended | Rationale |
|------|------|--------|------|
| Font type | Sans-serif (Geometric / Neo-grotesque) | Serif, handwriting, decorative | Sans-serif far more legible than serif at distance |
| Font weight | 400 (body) / 500-600 (heading) / 700 (core values) | 100-300 (thin) | Thin weights have stroke breakage at distance and low DPI |
| Letter spacing | Negative tracking for titles (-0.5px ~ -3px) / 0 for body | Large positive tracking (> 0.5px) | Large font sizes with negative tracking are more compact; small sizes with 0 tracking are most legible |
| Casing | Core values may use uppercase / Labels use title case | All-caps long text | All-caps reduces legibility by 15-20% |
| Number font | Tabular lining | Proportional oldstyle | Numerical alignment is the foundation of data legibility |

### 7.4 Mapping to dashboard-dark.template.json

| Template token | L1 Core metrics | L2 Trend labels | L3 Auxiliary info |
|-----------|-----------|-----------|-----------|
| `display-xl` (96px) | ✅ 3m dashboard core | — | — |
| `display-lg` (72px) | ✅ 3m medium core | ✅ 5m dashboard core | — |
| `display-md` (56px) | ✅ 3m small core | ✅ 5m medium core | — |
| `headline` (44px) | ✅ 3m minimum core | ✅ 5m small core | — |
| `heading-xl` (36px) | — | ✅ 3m chart title | ✅ 5m auxiliary |
| `heading-lg` (30px) | — | ✅ 3m chart label | ✅ 5m auxiliary |
| `heading-md` (24px) | — | ✅ 3m axis label | ✅ 5m auxiliary |
| `body-lg` (22px) | — | — | ✅ 3m auxiliary |
| `body-md` (20px) | — | — | ✅ 3m auxiliary minimum |
| `caption` (16px) | — | — | ✅ 3m minimum legible |
| `eyebrow` (14px) | — | — | ⚠️ High DPI only |
| `micro` (12px) | — | — | ⚠️ High DPI only |

**Low DPI rule**: `eyebrow` (14px) and `micro` (12px) are not legible on 1x DPI screens (3m distance), and must be overridden to ≥ 16px at the execution layer. This is logically consistent with the mobile low DPI override rule in `mapping-rules.md` Section 9.

---

## 8. Key Differences Between Dashboard and Desktop Layouts

| Dimension | Desktop (F1-F4) | Dashboard (D1-D6) |
|------|-------------|-------------|
| Navigation | Sidebar / Top bar | No traditional navigation; use breadcrumbs or area switching |
| Scrolling | Vertical scroll primary | Avoid scrolling as much as possible; display all info in one screen |
| Hover | Rich hover feedback | Zero hover; information visible by default |
| Pop-ups | Modal / Drawer | Side panel or overlay area; no centered modals |
| Pagination | Table pagination | No pagination; data updates in real-time |
| Empty state | Guiding empty state | Display "awaiting data" + auto-refresh, see `ui-states.md` |
| Loading | Spinner / Skeleton | Block-level Skeleton; avoid full-screen white flash, see `ui-states.md` |

---

## 9. Checklist

### Layout Selection

- [ ] Layout pattern selected based on decision tree (D1-D6)
- [ ] Core metrics at Z-pattern positions 1-2
- [ ] Alert information always visible, unaffected by scrolling/switching

### Grid and Spacing

- [ ] Using 12-column grid + 24px gutter
- [ ] Safe area inset considered (LCD 16px / LED 32-48px / Touch 24px)
- [ ] Card spacing ≥ 24px, internal padding ≥ 32px

### KPI Cards

- [ ] Core value font size ≥ 44px (3m viewing distance, see §7.1)
- [ ] Trend indicator color determined by business semantics (not simply up=green)
- [ ] Card count ≤ 6 (metric bar scenario)

### Legibility

- [ ] Primary content legible at 3m distance
- [ ] L1 core metric font size ≥ 44px, L3 auxiliary info ≥ 16px (see §7.1)
- [ ] Low DPI screen eyebrow/micro overridden to ≥ 16px (see §7.4)
- [ ] No hover-only information
- [ ] No vertical scrolling (one-screen display)
- [ ] Alert area always visible

### Interaction

- [ ] Remote control can reach all operable elements (see `dashboard-interaction.md`)
- [ ] Focus indicator clearly visible (highlighted border + micro-displacement)
- [ ] Drill depth ≤ 2 levels
