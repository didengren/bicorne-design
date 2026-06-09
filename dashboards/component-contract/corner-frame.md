# `CornerFrame` — Panel Corner Brackets

> Four L-shaped brackets at the corners of a panel. Pure decoration that signals "this is a HUD element". Lightweight (4 spans), no layout impact.

## Mandatory tokens

| Token path | Purpose |
|---|---|
| `colors.accent.{tone}` | Bracket color |
| `motion.duration.fast` | Hover brightening |

## Recommended props

```ts
interface CornerFrameProps {
  tone: 'blue' | 'cyan' | 'green' | 'violet' | 'amber' | 'red'
  /** Bracket arm length (px) (default 10) */
  size?: number
  /** Bracket stroke width (px) (default 1) */
  thickness?: number
  /** Opacity 0-1 (default 0.6) */
  opacity?: number
}
```

## Pitfalls

- ❌ Use `border` on the panel instead — much heavier and lacks the "HUD" feel
- ❌ Use SVG — overkill; 4 absolutely-positioned spans are 10x cheaper
- ✅ Position absolute inset-0 pointer-events-none so they don't intercept clicks

## Minimal Vue 3 template

```vue
<script setup lang="ts">
const props = withDefaults(defineProps<{
  tone: 'blue' | 'cyan' | 'green' | 'violet' | 'amber' | 'red'
  size?: number
  thickness?: number
  opacity?: number
}>(), {
  size: 10,
  thickness: 1,
  opacity: 0.6,
})

const toneText = {
  blue: 'text-dash-accent-blue', cyan: 'text-dash-accent-cyan',
  green: 'text-dash-accent-green', violet: 'text-dash-accent-violet',
  amber: 'text-dash-accent-amber', red: 'text-dash-accent-red',
}
</script>

<template>
  <div
    class="pointer-events-none absolute inset-0"
    :class="toneText[tone]"
    :style="{ opacity }"
  >
    <!-- Top-left -->
    <span class="absolute left-0 top-0" :style="{ width: `${size}px`, height: `${thickness}px` }}" />
    <span class="absolute left-0 top-0" :style="{ width: `${thickness}px`, height: `${size}px` }}" />
    <!-- Top-right -->
    <span class="absolute right-0 top-0" :style="{ width: `${size}px`, height: `${thickness}px` }}" />
    <span class="absolute right-0 top-0" :style="{ width: `${thickness}px`, height: `${size}px` }}" />
    <!-- Bottom-left -->
    <span class="absolute left-0 bottom-0" :style="{ width: `${size}px`, height: `${thickness}px` }}" />
    <span class="absolute left-0 bottom-0" :style="{ width: `${thickness}px`, height: `${size}px` }}" />
    <!-- Bottom-right -->
    <span class="absolute right-0 bottom-0" :style="{ width: `${size}px`, height: `${thickness}px` }}" />
    <span class="absolute right-0 bottom-0" :style="{ width: `${thickness}px`, height: `${size}px` }}" />
  </div>
</template>
```

## Acceptance check

- Brackets are 1px thick, ~10px long
- `pointer-events-none` so they don't interfere with panel click handlers
- Color matches panel `tone` prop
