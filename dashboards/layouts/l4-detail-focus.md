# L4. Detail Focus Layout

> One big "hero" detail panel on the right (60% width), supporting context on the left sidebar.

## When to use

- Drill-down: user is focused on ONE project / incident / device
- Left sidebar = list of selectable items
- Right = full detail with all related info
- Action-oriented: "what do I do with this?"

## Vue 3 template

```vue
<template>
  <div class="h-screen w-screen overflow-hidden bg-dash-bg text-dash-text grid grid-cols-[320px_1fr] grid-rows-[auto_1fr] gap-2 p-2">
    <header class="col-span-2">...</header>

    <!-- Left: list of selectable items -->
    <div class="grid grid-rows-[1fr_1fr] gap-2 min-h-0">
      <slot name="left-list" />
      <slot name="left-secondary" />
    </div>

    <!-- Right: hero detail -->
    <div class="grid grid-rows-[1fr_auto] gap-2 min-h-0">
      <slot name="hero" />
      <slot name="hero-timeline" />
    </div>
  </div>
</template>
```

## Used by

- Incident response consoles
- Project / device detail pages
