# L7. Two-Row Split Layout

> Top: 4 quick-glance KPI tiles. Bottom: 2 wide detail panels (events + trends).

## When to use

- "Status snapshot" mental model
- Top is for at-a-glance; bottom is for drill-down
- Common in SRE / DevOps / Finance command centers

## Vue 3 template

```vue
<template>
  <div class="h-screen w-screen overflow-hidden bg-dash-bg text-dash-text grid grid-rows-[auto_180px_1fr] gap-2 p-2">
    <header>...</header>

    <!-- Top: 4 KPI tiles -->
    <div class="grid grid-cols-4 gap-2 min-h-0">
      <slot name="kpi-1" />
      <slot name="kpi-2" />
      <slot name="kpi-3" />
      <slot name="kpi-4" />
    </div>

    <!-- Bottom: 2 wide panels -->
    <div class="grid grid-cols-2 gap-2 min-h-0">
      <slot name="events" />
      <slot name="trends" />
    </div>
  </div>
</template>
```

## Pitfalls

- KPI tiles should be **short and high-contrast** — one number + one delta + one label
- Don't use full PanelShell for KPIs — use a lighter "tile" variant
- Events panel often scrolls; trends panel uses fixed chart
