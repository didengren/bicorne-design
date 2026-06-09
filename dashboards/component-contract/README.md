---
name: component-contract
description: Component-level contract — defines the mandatory token bindings, recommended props, and Vue 3 implementation templates for the 8 core dashboard components. Bridges Layer 2 (token.json) to Layer 3 (production code).
keywords: component, contract, panel, metric, sparkline, map, gauge, ring, ticker, datatable
---

# Component Contract — Dashboard Core Components

> This directory bridges the gap between **token.json** (Layer 2, framework-agnostic) and **production Vue 3 / React code** (Layer 3). Each component file defines:
>
> 1. **Mandatory tokens** — which `token.json` keys this component requires
> 2. **Recommended props** — name, type, default, intent
> 3. **CSS utility binding** — which `dash-*` classes (or equivalent) to apply
> 4. **Common pitfalls** — what AI agents get wrong
> 5. **Minimal Vue 3 `<script setup>` template** — copy-paste-ready

## Why this exists

Before this directory, an AI agent generating dashboard code had to **invent** every component structure: how to wire `useCountUp` to a `MetricNumber`, which Tailwind classes to combine for a `PanelShell`, what the right spacing for a 5-column grid is. This causes 3 classes of failure:

- **Inconsistency** — different panels look like different design systems
- **Reinvented bugs** — every new component rediscovers the same `Number("12,846") → NaN` trap
- **Lost tokens** — token.json defines 19 animation curves, but code only uses 2

This contract fixes that.

## Index

| # | Component | File | When to use |
|---|-----------|------|-------------|
| 1 | `PanelShell` | [panel.md](panel.md) | The container card for any dashboard module |
| 2 | `MetricNumber` | [metric-number.md](metric-number.md) | Any animated KPI / stat number |
| 3 | `Sparkline` | [sparkline.md](sparkline.md) | Inline trend line (e.g. 24h output) |
| 4 | `MapPanel` | [map-panel.md](map-panel.md) | Geographic distribution with status points |
| 5 | `Gauge` | [gauge.md](gauge.md) | Single-value radial dial (e.g. online rate) |
| 6 | `RingProgress` | [ring-progress.md](ring-progress.md) | Circular progress (e.g. closure rate) |
| 7 | `Ticker` | [ticker.md](ticker.md) | Continuously scrolling announcement strip |
| 8 | `DataTable` | [data-table.md](data-table.md) | Compact tabular data within a panel |

## Usage order

When a host skill is asked to build a dashboard:

1. Read `token.json` (Layer 2) and `design-spec.md`
2. For each panel in the layout, read the matching `component-contract/*.md`
3. Copy the minimal template into the project's `src/components/dashboard/`
4. Wire props from `useMockData` / state
5. Run the `e2e-validate.sh` script to verify 0 NaN / 0 overflow / animation classes ≥ 50

## Non-goals

- **Not a component library** — these are reference contracts, not published packages
- **Not a design system enforcement** — the host project can deviate, but should document why
- **Not framework-locked** — Vue 3 templates are the primary target; React equivalents can be added
