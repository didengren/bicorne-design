# `RingProgress` — Circular Progress (smaller than Gauge)

> Compact 360° ring used inline next to a label. Different from `Gauge`: ring is decorative + percentage overlay; value is shown as a small text in the center.

---

## Mandatory tokens

| Token path | Purpose |
|---|---|
| `colors.accent.{cyan,blue,green,violet}` | Ring stroke |
| `colors.surface.2` | Background ring |
| `colors.ink.default` | Percentage text |
| `animations.draw` | Ring fill on mount |

## Recommended props

```ts
interface RingProgressProps {
  value: number          // 0-100
  size?: number          // px (default 64)
  strokeWidth?: number   // px (default 4)
  tone?: 'blue' | 'cyan' | 'green' | 'violet'
  label?: string         // shown below ring
}
```

## Pitfalls

### ❌ Pitfall 1: 360° ring doesn't show progress

```ts
// ❌ 360° ring with stroke-dashoffset looks full when 100% (offset=0) and empty when 0% (offset=circumference)
// But because SVG default starts at 3 o'clock, 0% looks like 25% remaining

// ✅ Use a rotation transform to start at 12 o'clock
<circle transform="rotate(-90 cx cy)" />
```

### ❌ Pitfall 2: Inline ring inside text breaks line-height

```ts
// ❌
<p>工单闭环率 <RingProgress :value="92" /> 92%</p>

// ✅ Use a flex row container
<div class="flex items-center gap-2">
  <span>工单闭环率</span>
  <RingProgress :value="92" :size="32" />
  <span class="font-mono">92%</span>
</div>
```

## Minimal Vue 3 template

```vue
<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  value: number
  size?: number
  strokeWidth?: number
  tone?: 'blue' | 'cyan' | 'green' | 'violet'
  label?: string
}>(), {
  size: 64,
  strokeWidth: 4,
  tone: 'cyan',
})

const r = computed(() => (props.size - props.strokeWidth) / 2)
const c = computed(() => 2 * Math.PI * r.value)

const offset = computed(() => {
  const clamped = Math.max(0, Math.min(100, props.value))
  return c.value * (1 - clamped / 100)
})

const toneStroke = {
  blue: 'text-dash-accent-blue', cyan: 'text-dash-accent-cyan',
  green: 'text-dash-accent-green', violet: 'text-dash-accent-violet',
}
</script>

<template>
  <div class="inline-flex flex-col items-center gap-1">
    <div class="relative" :style="{ width: `${size}px`, height: `${size}px` }">
      <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`" class="-rotate-90">
        <circle
          :cx="size / 2" :cy="size / 2" :r="r"
          fill="none" stroke="currentColor"
          :stroke-width="strokeWidth"
          class="text-dash-surface-2"
        />
        <circle
          :cx="size / 2" :cy="size / 2" :r="r"
          fill="none" stroke="currentColor"
          :stroke-width="strokeWidth"
          :stroke-dasharray="c"
          :stroke-dashoffset="offset"
          stroke-linecap="round"
          pathLength="1000"
          class="[stroke-dasharray:1000] animate-dash-draw"
          :class="toneStroke[tone]"
        />
      </svg>
      <div class="absolute inset-0 flex items-center justify-center">
        <span class="font-mono text-dash-micro font-bold tabular-nums">
          {{ Math.round(Math.max(0, Math.min(100, value))) }}%
        </span>
      </div>
    </div>
    <span v-if="label" class="font-display text-dash-micro text-dash-text-dim">{{ label }}</span>
  </div>
</template>
```

## Acceptance check

- Ring fills 0% → value% over 1.6s
- Center text shows clamped percentage
- `-rotate-90` on the SVG ensures the gap is at 12 o'clock
- Used inline in lists: ring + label + value text align horizontally
