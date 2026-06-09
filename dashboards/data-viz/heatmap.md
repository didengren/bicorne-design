# `Heatmap` — 2D Intensity Grid

> A grid of cells where color intensity encodes a value. Used for "hours × days activity", "geographic density", or "correlation matrices".

## When to use

- Activity heatmaps (calendar)
- Time-of-day vs day-of-week
- Geographic density

## Props

```ts
interface HeatmapProps {
  /** 2D data: outer array = rows, inner = cells */
  data: number[][]
  /** Optional row labels */
  rowLabels?: string[]
  /** Optional column labels */
  colLabels?: string[]
  /** Color tone for the gradient (default 'cyan') */
  tone?: 'blue' | 'cyan' | 'green' | 'amber' | 'red' | 'violet'
  /** Min value for color scaling (default 0) */
  min?: number
  /** Max value for color scaling (default max of data) */
  max?: number
  /** Cell size in px (default 16) */
  cellSize?: number
  /** Gap between cells in px (default 2) */
  gap?: number
  /** Show value on hover (default true) */
  showTooltip?: boolean
}
```

## Pitfalls

- ❌ Don't use HSL hue interpolation — looks gaudy
- ✅ Use single tone (cyan) with opacity scaling: `bg-dash-accent-cyan/${alpha}`
- ❌ Don't make cells too small — `cellSize: 16` minimum for legibility

## Minimal Vue 3 template

```vue
<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  data: number[][]
  rowLabels?: string[]
  colLabels?: string[]
  tone?: 'cyan' | 'blue' | 'green' | 'amber' | 'red' | 'violet'
  min?: number
  max?: number
  cellSize?: number
  gap?: number
}>(), {
  tone: 'cyan',
  cellSize: 16,
  gap: 2,
})

const maxVal = computed(() => props.max ?? Math.max(...props.data.flat(), 1))
const minVal = computed(() => props.min ?? 0)
const range = computed(() => Math.max(1, maxVal.value - minVal.value))

function opacityFor(v: number): number {
  const t = Math.max(0, Math.min(1, (v - minVal.value) / range.value))
  // Map t ∈ [0,1] to opacity ∈ [0.08, 0.95] for visible variation
  return 0.08 + t * 0.87
}

const toneText = {
  blue: 'text-dash-accent-blue', cyan: 'text-dash-accent-cyan',
  green: 'text-dash-accent-green', amber: 'text-dash-accent-amber',
  red: 'text-dash-accent-red', violet: 'text-dash-accent-violet',
}
const toneBg = {
  blue: 'bg-dash-accent-blue', cyan: 'bg-dash-accent-cyan',
  green: 'bg-dash-accent-green', amber: 'bg-dash-accent-amber',
  red: 'bg-dash-accent-red', violet: 'bg-dash-accent-violet',
}
</script>

<template>
  <div class="inline-flex flex-col gap-0.5">
    <!-- Column labels -->
    <div v-if="colLabels" class="flex" :style="{ marginLeft: '60px', gap: `${gap}px` }">
      <span
        v-for="(label, i) in colLabels"
        :key="i"
        class="font-dash-mono text-dash-micro text-dash-text-dim text-center"
        :style="{ width: `${cellSize}px` }"
      >{{ label }}</span>
    </div>

    <!-- Grid -->
    <div
      v-for="(row, r) in data"
      :key="r"
      class="flex items-center"
      :style="{ gap: `${gap}px` }"
    >
      <span
        v-if="rowLabels"
        class="font-dash-mono text-dash-micro text-dash-text-dim text-right shrink-0"
        :style="{ width: '56px' }"
      >{{ rowLabels[r] }}</span>

      <div
        v-for="(v, c) in row"
        :key="c"
        :class="['rounded-[2px] transition-all hover:scale-125 hover:ring-1 hover:ring-current cursor-pointer', toneBg[tone]]"
        :style="{
          width: `${cellSize}px`,
          height: `${cellSize}px`,
          opacity: opacityFor(v),
          color: 'currentColor',
        }"
        :title="`${rowLabels?.[r] ?? r}, ${colLabels?.[c] ?? c}: ${v}`"
      />
    </div>
  </div>
</template>
```

## Acceptance check

- Cells with `v=min` have opacity 0.08 (almost invisible)
- Cells with `v=max` have opacity 0.95 (vivid)
- Hover scales 1.25x and adds ring (visibility feedback)
- Title attribute provides a11y text
