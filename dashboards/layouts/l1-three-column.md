---
name: dashboard-layouts
description: 8 dashboard layout templates as Vue 3 templates, ready to copy-paste.
keywords: layout, grid, dashboard, command-center
---

# L1. Three-Column Layout

> Equal-width 3 columns with a slightly wider center for hero content (map / main chart).

## When to use

- 3-5 modules of roughly equal importance
- Center has a "hero" element (map, primary chart, ORG chart)
- Standard command center / NOC view

## Vue 3 template

```vue
<template>
  <div class="h-screen w-screen overflow-hidden bg-dash-bg text-dash-text grid grid-cols-[1fr_1.4fr_1fr] grid-rows-[auto_1fr] gap-2 p-2">
    <!-- Header -->
    <header class="col-span-3 flex items-center justify-between px-4 py-2 rounded-dash-lg bg-dash-panel border border-dash-border-soft">
      <DashboardHeader />
    </header>

    <!-- Left column: 2 stacked -->
    <div class="row-start-2 grid grid-rows-2 gap-2 min-h-0">
      <slot name="left-top" />
      <slot name="left-bottom" />
    </div>

    <!-- Center column: 1 wide + 1 narrow below -->
    <div class="row-start-2 grid grid-rows-[1fr_auto] gap-2 min-h-0">
      <slot name="center-main" />
      <slot name="center-bottom" />
    </div>

    <!-- Right column: 2 stacked -->
    <div class="row-start-2 grid grid-rows-2 gap-2 min-h-0">
      <slot name="right-top" />
      <slot name="right-bottom" />
    </div>
  </div>
</template>
```

## Used by

- Tianhe Fujia O&M command center ([`/verification/4-3-dashboard-command-center/`](../../verification/4-3-dashboard-command-center/))
