# `Donut` — Multi-segment Ring

> A ring with 3-7 segments showing relative proportions. Used for "energy mix" or "revenue by source".

## Props

```ts
interface DonutProps {
  segments: { label: string; value: number; tone: 'blue' | 'cyan' | 'green' | 'amber' | 'red' | 'violet' }[]
  /** Center value display */
  centerValue?: string
  centerLabel?: string
  /** Inner radius ratio 0-1 (default 0.65) */
  innerRatio?: number
  /** Animate on mount (default true) */
  animate?: boolean
}
```

## Pitfalls

- ❌ Don't use `<path d="A...">` with calculated angles — error-prone
- ✅ Use `stroke-dasharray` on a single `<circle>` with calculated offsets
- ❌ Don't sort segments by value in the template — use `computed`

## Minimal Vue 3 template

```vue
<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  segments: { label: string; value: number; tone: string }[]
  centerValue?: string
  centerLabel?: string
  innerRatio?: number
  animate?: boolean
}>(), {
  innerRatio: 0.65,
  animate: true,
})

const SIZE = 120
const RADIUS = 50
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

const total = computed(() => props.segments.reduce((s, x) => s + x.value, 0))

// Each segment is a separate <circle> with stroke-dasharray = "len gap"
const segmentData = computed(() => {
  let offset = 0
  return props.segments.map(s => {
    const fraction = s.value / total.value
    const len = fraction * CIRCUMFERENCE
    const seg = {
      ...s,
      len,
      offset: -offset,  // SVG dashoffset is positive for "before", negative for "after"
    }
    offset += len
    return seg
  })
})

const toneStroke = {
  blue: 'stroke-dash-accent-blue', cyan: 'stroke-dash-accent-cyan',
  green: 'stroke-dash-accent-green', amber: 'stroke-dash-accent-amber',
  red: 'stroke-dash-accent-red', violet: 'stroke-dash-accent-violet',
}
const toneText = {
  blue: 'text-dash-accent-blue', cyan: 'text-dash-accent-cyan',
  green: 'text-dash-accent-green', amber: 'text-dash-accent-amber',
  red: 'text-dash-accent-red', violet: 'text-dash-accent-violet',
}
</script>

<template>
  <div class="relative inline-block">
    <svg :width="SIZE" :height="SIZE" :viewBox="`0 0 ${SIZE} ${SIZE}`" class="-rotate-90">
      <!-- Background ring -->
      <circle
        :cx="SIZE / 2" :cy="SIZE / 2" :r="RADIUS"
        fill="none" stroke="currentColor"
        :stroke-width="SIZE * (1 - innerRatio)"
        class="text-dash-surface-2"
      />
      <!-- Segments -->
      <circle
        v-for="(s, i) in segmentData"
        :key="i"
        :cx="SIZE / 2" :cy="SIZE / 2" :r="RADIUS"
        fill="none" stroke="currentColor"
        :stroke-width="SIZE * (1 - innerRatio)"
        :stroke-dasharray="`${s.len} ${CIRCUMFERENCE}`"
        :stroke-dashoffset="s.offset"
        stroke-linecap="butt"
        pathLength="1000"
        :class="[toneStroke[s.tone], animate ? '[stroke-dasharray:1000] animate-dash-draw' : '']"
        :style="{ animationDelay: `${i * 100}ms` }"
      />
    </svg>

    <!-- Center text -->
    <div
      v-if="centerValue || centerLabel"
      class="absolute inset-0 flex flex-col items-center justify-center"
    >
      <span class="font-dash-mono text-dash-h-lg font-bold text-dash-text tabular-nums">
        {{ centerValue }}
      </span>
      <span v-if="centerLabel" class="font-dash-display text-dash-micro text-dash-text-dim mt-0.5">
        {{ centerLabel }}
      </span>
    </div>
  </div>

  <!-- Legend -->
  <div class="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-dash-micro">
    <div
      v-for="s in segments"
      :key="s.label"
      class="flex items-center gap-1.5"
    >
      <span :class="['w-2 h-2 rounded-sm', `bg-dash-accent-${s.tone}`]" />
      <span class="text-dash-text-muted truncate">{{ s.label }}</span>
      <span :class="['font-dash-mono tabular-nums shrink-0', toneText[s.tone]]">
        {{ ((s.value / total) * 100).toFixed(0) }}%
      </span>
    </div>
  </div>
</template>
```

## Acceptance check

- Segments drawn in order, total = 100% of circumference
- Center text not occluded by ring (innerRatio ≥ 0.5)
- Legend shows tone dot + label + percentage
