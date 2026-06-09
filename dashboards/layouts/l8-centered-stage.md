# L8. Centered Stage Layout

> Symmetric — 3 panels left, 1 huge hero center, 3 panels right. Used for "exec / landing" dashboards.

## When to use

- Single hero KPI (today's revenue, today's count)
- Surrounding context supports the hero
- "Marketing-grade" presentation

## Vue 3 template

```vue
<template>
  <div class="h-screen w-screen overflow-hidden bg-dash-bg text-dash-text grid grid-rows-[auto_1fr] gap-2 p-2">
    <header>...</header>

    <div class="grid grid-cols-[1fr_2fr_1fr] gap-2 min-h-0">
      <!-- Left: 3 stacked -->
      <div class="grid grid-rows-3 gap-2 min-h-0">
        <slot name="left-1" />
        <slot name="left-2" />
        <slot name="left-3" />
      </div>

      <!-- Center: 1 huge hero -->
      <div class="min-h-0">
        <slot name="hero" />
      </div>

      <!-- Right: 3 stacked -->
      <div class="grid grid-rows-3 gap-2 min-h-0">
        <slot name="right-1" />
        <slot name="right-2" />
        <slot name="right-3" />
      </div>
    </div>
  </div>
</template>
```

## Used by

- "Today's numbers" landing pages
- Executive dashboards
- Pre-meeting briefing screens
