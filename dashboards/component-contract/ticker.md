# `Ticker` — Continuously Scrolling Announcement Strip

> A horizontally scrolling strip used for "weather alerts", "system events", or "news feed". Uses CSS animation with a cloned list to create seamless loop.

---

## Mandatory tokens

| Token path | Purpose |
|---|---|
| `colors.surface.1` | Strip background |
| `colors.accent.{amber,red,blue}` | Severity stripe |
| `colors.ink.muted / dim` | Item text |
| `animations.ticker` | Horizontal scroll loop |
| `motion.easing.linear` | Linear scroll (avoid ease) |

## Recommended props

```ts
interface TickerProps {
  items: TickerItem[]
  /** Scroll duration for one full loop (seconds) */
  duration?: number  // default 40
  /** Pause on hover (default true) */
  pauseOnHover?: boolean
  /** Show severity dot prefix */
  showDot?: boolean
}

interface TickerItem {
  id: string
  severity: 'info' | 'warning' | 'critical'
  text: string
  meta?: string  // e.g. time, region
}
```

## Pitfalls — CRITICAL

### ❌ Pitfall 1: Non-seamless loop (visible jump at end)

```ts
// ❌ Without cloning, the strip has an obvious "rewind" at end of cycle
<div class="flex animate-dash-ticker">
  <div v-for="i in items">...</div>
</div>

// ✅ Clone the list — two copies side by side, animation goes -50% width
<div class="flex animate-dash-ticker" style="animation-duration: 40s">
  <div v-for="i in items" :key="i.id">...</div>
  <div v-for="i in items" :key="`c-${i.id}`" aria-hidden="true">...</div>
</div>
```

### ❌ Pitfall 2: `overflow-x-auto` on parent breaks the animation

```ts
// ❌ If the strip's parent is scrollable, scrollbar appears during animation
<div class="overflow-x-auto">
  <div class="animate-dash-ticker">...</div>
</div>

// ✅ Use `overflow-hidden` (or no overflow control) on the parent
```

### ❌ Pitfall 3: `gap-2` is fine, but `space-x-2` doesn't work with flex+animation

```ts
// ❌ space-x-* doesn't add space-between in animation context
<div class="flex animate-dash-ticker space-x-2">

// ✅ Use `gap-2` (works with flex)
<div class="flex animate-dash-ticker gap-2">
```

## CSS keyframe

```css
@keyframes dash-ticker {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
```

## Minimal Vue 3 template

```vue
<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  items: { id: string; severity: 'info' | 'warning' | 'critical'; text: string; meta?: string }[]
  duration?: number
  pauseOnHover?: boolean
  showDot?: boolean
}>(), {
  duration: 40,
  pauseOnHover: true,
  showDot: true,
})

const toneClass = {
  info: 'text-dash-accent-blue',
  warning: 'text-dash-accent-amber',
  critical: 'text-dash-accent-red',
}
const dotBg = {
  info: 'bg-dash-accent-blue',
  warning: 'bg-dash-accent-amber',
  critical: 'bg-dash-accent-red',
}
</script>

<template>
  <div class="relative flex-1 min-w-0 overflow-hidden">
    <div
      class="flex gap-3 animate-dash-ticker"
      :class="pauseOnHover ? 'hover:[animation-play-state:paused]' : ''"
      :style="{ animationDuration: `${duration}s` }"
    >
      <!-- Original list -->
      <div
        v-for="item in items"
        :key="item.id"
        class="shrink-0 flex items-center gap-2 min-w-[200px] px-3 py-1.5 rounded-md border border-dash-border-faint bg-dash-surface-1/40"
      >
        <span
          v-if="showDot"
          class="w-1.5 h-1.5 rounded-full shrink-0"
          :class="dotBg[item.severity]"
        />
        <span :class="['font-mono text-dash-caption truncate', toneClass[item.severity]]">
          {{ item.text }}
        </span>
        <span v-if="item.meta" class="font-mono text-dash-micro text-dash-text-dim shrink-0">
          {{ item.meta }}
        </span>
      </div>
      <!-- Cloned list (aria-hidden) -->
      <div
        v-for="item in items"
        :key="`c-${item.id}`"
        aria-hidden="true"
        class="shrink-0 flex items-center gap-2 min-w-[200px] px-3 py-1.5 rounded-md border border-dash-border-faint bg-dash-surface-1/40"
      >
        <span v-if="showDot" class="w-1.5 h-1.5 rounded-full shrink-0" :class="dotBg[item.severity]" />
        <span :class="['font-mono text-dash-caption truncate', toneClass[item.severity]]">
          {{ item.text }}
        </span>
        <span v-if="item.meta" class="font-mono text-dash-micro text-dash-text-dim shrink-0">
          {{ item.meta }}
        </span>
      </div>
    </div>
  </div>
</template>
```

## Acceptance check

- Strip scrolls continuously with no visible jump at loop boundary
- Hover pauses animation (when `pauseOnHover=true`)
- Severity dot color matches `info/warning/critical`
- Cloned items have `aria-hidden="true"` to avoid screen reader duplication
- Animation uses `transform: translateX` (not `left`), so it triggers GPU compositing
