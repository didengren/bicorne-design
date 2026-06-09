---
name: meta-prompt
description: A pre-flight checklist for AI agents about to generate dashboard code. Forces intent, scope, and constraint articulation before any code is written.
keywords: meta-prompt, checklist, planning, intent, scope
---

# Dashboard Meta-Prompt — Pre-Flight Checklist

> **Read this BEFORE writing dashboard code.** Forces the AI to articulate intent, scope, and constraints first. Saves 10x the time vs writing-then-fixing.

---

## The 12 questions

When the user says *"build me a [data|monitoring|command center] dashboard"*, the AI MUST answer these 12 questions before generating any code. Skip the ones that don't apply.

### 1. WHAT is the dashboard for?

> Pick ONE:
> - (a) Real-time monitoring (NOC, ops, fleet)
> - (b) Business KPI overview (exec, sales)
> - (c) Drill-down analysis (analyst)
> - (d) Marketing / decorative (homepage hero)

| (a) Real-time | (b) KPI | (c) Analysis | (d) Marketing |
|---|---|---|---|
| F5 fullscreen | Compact | Scrollable | Centered, hero |
| 1920×1080 | 1280+ | 1024+ | any |
| Animations a11y-critical | minimal | none | strong |
| Tile layout | Linear flow | Tables | Card layout |

### 2. WHO is the user?

| Persona | Implications |
|---|---|
| Operator (NOC) | High info density, no animations, real-time refresh |
| Manager | Read-only, KPI cards, summary |
| Analyst | Drill-down, filters, table views |
| Executive | 1-3 KPIs max, clean, large numbers |
| Visitor (demo) | Cinematic animations, large text |

### 3. WHAT data is the hero?

- **Time series** (24h, 7d, 30d) → Sparkline, Area chart
- **Geographic** → MiniMap
- **Categorical breakdown** → Bar, Donut, Funnel
- **Single value** → MetricNumber, Gauge
- **Comparison** → Bar (paired), Heatmap

If you can't answer this, the dashboard has no focus.

### 4. HOW often does data refresh?

| Refresh | Implications |
|---|---|
| Real-time (< 1s) | rAF loop, throttle to 1Hz |
| Near real-time (5-30s) | `setInterval` is fine, show "syncing" indicator |
| On-demand | Manual refresh button |
| Static (mock) | No refresh logic |

### 5. WHAT is the resolution target?

- 1920×1080 (FHD) — standard command center
- 2560×1440 (QHD) — high-density
- 3840×2160 (4K) — feature wall
- 1280×800 — laptop screen

Below 1280px width, **degrade to mobile layout** or show "minimum resolution" placeholder.

### 6. WHAT is the layout archetype?

Pick from [dashboard-layouts/](../dashboard-layouts/):

- **L1** three-column (default, 5-panel)
- **L2** map-dominant (geographic focus)
- **L3** KPI-wall (12+ modules)
- **L4** detail focus (drill-down)
- **L5** tab-switch (multi-tenant)
- **L6** header-heavy (live ticker)
- **L7** two-row split (overview + detail)
- **L8** centered stage (hero KPI)

### 7. WHICH animations will you use?

From [animation-matrix.md](./animation-matrix.md), pick:

- [ ] Panel entrance (fade-up) — **always**
- [ ] Number count-up (useCountUp) — **always for KPIs**
- [ ] Sparkline draw — if time series
- [ ] Pulse / ripple — for status indicators
- [ ] Scan / aurora / shimmer — for decoration
- [ ] Ticker — for live alerts/news

Don't enable all 19. Pick what supports the information.

### 8. WHICH components are needed?

From [component-contract/](../component-contract/):

- [ ] `PanelShell`
- [ ] `MetricNumber`
- [ ] `Sparkline`
- [ ] `MapPanel`
- [ ] `Gauge`
- [ ] `RingProgress`
- [ ] `Ticker`
- [ ] `DataTable`
- [ ] `CornerFrame`

### 9. WHAT states must the UI handle?

From [ui-states.md](./ui-states.md):

- [ ] Loading
- [ ] Refreshing
- [ ] Empty
- [ ] Error
- [ ] Offline
- [ ] Stale

At minimum: loading + error. Dashboards without these states are incomplete.

### 10. WHICH pitfalls must you avoid?

From [pitfalls/](../pitfalls/README.md), the top 5 for any dashboard:

- [ ] `Number("12,846")` → NaN
- [ ] TDZ on `const formatNumber`
- [ ] SVG `<text>` default black
- [ ] `truncate` on inline span (no width)
- [ ] `transition-all` (jank)

### 11. WHAT is the validation?

Before declaring "done":

- [ ] Run `e2e-validate.sh` (or equivalent)
- [ ] 0 NaN elements
- [ ] 0 console errors
- [ ] 50+ animation classes active
- [ ] All 5 panels render at 1920×1080
- [ ] Tab/click interactions work
- [ ] Page reload preserves state correctly

### 12. WHAT can go wrong?

Enumerate 3-5 risks:

- "Mock data may have undefined values → NaN cascade"
- "Token.json may not have all 19 animations → some panels unstyled"
- "Sparkline 24h data has 24 points but viewBox is 200 → density wrong"
- "Tailwind classes may be purged if not in source → invisible components"
- "Panel entrance animation may flash before CSS loads"

---

## How to use this

1. **User asks for a dashboard** → AI runs through questions 1-12 silently
2. **AI states assumptions** for 1-2 minutes, then proceeds
3. **After coding**, AI runs the validation in Q11
4. **Risks in Q12** are tracked during development

## Example (real)

User: *"Make me a command center dashboard"*

```
Q1: Real-time monitoring
Q2: Operator (NOC)
Q3: Time series (24h) + Geographic + KPI tiles
Q4: Near real-time (10s)
Q5: 1920×1080 (FHD)
Q6: L1 three-column (5 panels)
Q7: fade-up, count-up, draw, pulse, ripple, scan, aurora, ticker
Q8: PanelShell, MetricNumber, Sparkline, MapPanel, Ticker, CornerFrame
Q9: loading, refreshing, error, offline (skip empty for now)
Q10: #1, #2, #3, #4, #6 from pitfalls
Q11: e2e-validate.sh
Q12: 
  - 4-3 verification project's mock data may not include critical states
  - Token.json may be missing `animations` field
  - Tailwind may strip dash-* if not safelisted
```

After this, AI proceeds to build. Total pre-flight: 90 seconds. Saves hours of fixing.

---

## Why this exists

Without this checklist, AI agents:

- **Skip thinking** → write code that doesn't match user intent
- **Reinvent bugs** → hit pitfalls #1, #2, #3 every time
- **Inconsistency** → each panel looks like a different system
- **Forget edge cases** → no error state, no loading state

With this checklist, AI agents:

- **Articulate intent** → user can correct course early
- **Apply known solutions** → no reinvented bugs
- **Stay consistent** → all panels follow same pattern
- **Handle edge cases** → all 6 UI states covered
