---
name: data-viz
description: Pure-SVG data visualization components — no ECharts, no D3, no Canvas. Lightweight, themeable, animation-friendly.
keywords: data-viz, svg, chart, sparkline, bar, ring, funnel, heatmap
---

# Data-Viz — Pure SVG Components

> 8 SVG-only chart components. Each one is a single Vue 3 file that you can drop into any dashboard. No external dependencies. No canvas. Fully themeable via Tailwind tokens.

## Why SVG-only?

- **No bundle bloat** — ECharts is 800KB+, D3 is 250KB+. SVG is built into browsers.
- **Themeable** — `currentColor`, `fill="var(--dash-accent-cyan)"` etc.
- **Animatable** — `stroke-dashoffset`, `pathLength="1000"`, CSS transitions.
- **Inspectable** — DOM tree, accessible to screen readers.
- **Cheap to draw** — typical 50-point sparkline renders in <2ms.

## When to use SVG vs canvas/WebGL

| Use SVG when | Use canvas when |
|---|---|
| < 1000 data points | > 10K data points |
| Static or slow-changing | 60fps real-time (e.g. oscilloscope) |
| Theme-aware (dark/light toggle) | Performance > theming |
| Need a11y | Custom visual only |
| Standard chart types (line/bar/ring) | Custom rendering (heatmaps with shaders) |

## Index

| # | Component | File | Use case |
|---|---|---|---|
| 1 | `Sparkline` | [sparkline.md](sparkline.md) | Inline trend (24h output) |
| 2 | `BarChart` | [bar-chart.md](bar-chart.md) | Vertical/horizontal bars (closure rates) |
| 3 | `RingProgress` | [ring-progress.md](ring-progress.md) | Circular progress (online %) |
| 4 | `Gauge` | [gauge.md](gauge.md) | 270° dial |
| 5 | `Funnel` | [funnel.md](funnel.md) | Pipeline (lead → deal) |
| 6 | `Heatmap` | [heatmap.md](heatmap.md) | 2D intensity grid |
| 7 | `Donut` | [donut.md](donut.md) | Multi-segment ring |
| 8 | `MiniMap` | [mini-map.md](mini-map.md) | Geographic points (China map) |

## Common SVG patterns

### The `pathLength="1000"` trick

```html
<path
  d="..."
  pathLength="1000"
  stroke-dasharray="1000"
  stroke-dashoffset="1000"
  class="animate-dash-draw"
/>
```

`pathLength` normalizes the path's intrinsic length to 1000, so `stroke-dasharray` and `stroke-dashoffset` work portably regardless of the path's actual length. See [pitfalls #12](../pitfalls/README.md#12-stroke-dashoffset-animation-needs-pathlength1000).

### The `viewBox` + `preserveAspectRatio` pattern

```html
<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" class="w-full h-full">
  <!-- chart content -->
</svg>
```

`viewBox` decouples the chart from its display size. The container's `w-full h-full` plus `preserveAspectRatio` keeps the chart centered and uncropped.

### The `fill="currentColor"` + themeable SVG pattern

```html
<svg class="text-dash-accent-cyan">
  <path d="..." fill="currentColor" />
</svg>
```

`currentColor` inherits from the parent's `color` CSS property. Tailwind's `text-*` utilities set `color`, so `text-dash-accent-cyan` on the SVG makes all `fill="currentColor"` children use that color. See [pitfalls #3](../pitfalls/README.md#3-svg-text-defaults-to-fill-black).

## Performance budget

| Chart | DOM nodes | Render time | Memory |
|---|---|---|---|
| Sparkline (50 points) | ~3 | <2ms | <1KB |
| BarChart (20 bars) | ~30 | <4ms | <2KB |
| RingProgress | 2 | <1ms | <0.5KB |
| Gauge | 4 | <1ms | <0.5KB |
| Funnel (5 stages) | ~10 | <2ms | <1KB |
| Heatmap (10×10) | ~100 | <5ms | <3KB |
| Donut (5 segments) | ~10 | <2ms | <1KB |
| MiniMap (50 points) | ~52 | <3ms | <2KB |

**Total for 8 charts in one dashboard: <30ms initial render, <10KB DOM.**
