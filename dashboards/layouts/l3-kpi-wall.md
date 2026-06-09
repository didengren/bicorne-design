# L3. KPI-Wall Layout

> Uniform 4×3 grid of equal-weight modules. No hero. Information density over visual hierarchy.

## When to use

- NOC, operations center
- 12+ metrics to monitor
- All metrics are equally important
- User scans in any order

## Vue 3 template

```vue
<template>
  <div class="h-screen w-screen overflow-hidden bg-dash-bg text-dash-text grid grid-cols-4 grid-rows-[auto_1fr_1fr_1fr] gap-2 p-2">
    <header class="col-span-4">...</header>

    <!-- Row 1: 4 KPIs -->
    <slot name="kpi-1" />
    <slot name="kpi-2" />
    <slot name="kpi-3" />
    <slot name="kpi-4" />

    <!-- Row 2: 4 charts -->
    <slot name="chart-1" />
    <slot name="chart-2" />
    <slot name="chart-3" />
    <slot name="chart-4" />

    <!-- Row 3: 4 logs/lists -->
    <slot name="log-1" />
    <slot name="log-2" />
    <slot name="log-3" />
    <slot name="log-4" />
  </div>
</template>
```

## Pitfalls

- ❌ Don't make all 12 modules the same tone — use **3-4 accent colors** to break visual monotony
- ❌ Don't animate ALL of them on enter — stagger 50ms each, max 600ms total
- ✅ Use tone to group: e.g. all "alerts" amber, all "stats" cyan

## Used by

- Linear dashboard dark theme reference
- NOC status walls
