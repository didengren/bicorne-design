# L2. Map-Dominant Layout

> Wide center map flanked by narrow side panels. 50%+ of viewport is the map.

## When to use

- Geography is the product
- User scans spatially (north → south, east → west)
- Side panels provide breakdowns by category

## Vue 3 template

```vue
<template>
  <div class="h-screen w-screen overflow-hidden bg-dash-bg text-dash-text grid grid-cols-[280px_1fr_280px] grid-rows-[auto_1fr] gap-2 p-2">
    <header class="col-span-3">...</header>

    <!-- Left: 4 small panels -->
    <div class="grid grid-rows-4 gap-2 min-h-0">
      <slot name="left-1" />
      <slot name="left-2" />
      <slot name="left-3" />
      <slot name="left-4" />
    </div>

    <!-- Center: map -->
    <div class="min-h-0">
      <slot name="map" />
    </div>

    <!-- Right: 3 medium panels -->
    <div class="grid grid-rows-3 gap-2 min-h-0">
      <slot name="right-1" />
      <slot name="right-2" />
      <slot name="right-3" />
    </div>
  </div>
</template>
```

## Used by

- National grid operator dashboards
- Fleet management / vehicle tracking
- Sales territory monitoring
