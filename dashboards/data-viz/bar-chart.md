# `BarChart` — Vertical / Horizontal Bars

> Compact bar chart for showing relative magnitudes across 5-20 items.

## When to use

- "Closure rate by category" (6 items)
- "Loss by cause" (5 items)
- "Top 10 projects by output"

## Props

```ts
interface BarChartProps {
  data: { label: string; value: number; tone?: 'blue' | 'cyan' | 'green' | 'amber' | 'red' }[]
  orientation?: 'vertical' | 'horizontal'  // default 'vertical'
  /** Max value for scaling (defaults to max of data) */
  max?: number
  /** Show value label at end of each bar */
  showValue?: boolean
  /** Bar height/width in px (default 16) */
  barSize?: number
  /** Gap between bars in px (default 6) */
  gap?: number
  /** Animate on mount (default true) */
  animate?: boolean
}
```

## Pitfalls

- ❌ Don't use `transition: width` on bars — triggers layout
- ✅ Use `transform: scaleX` with `transform-origin: left`
- ❌ Don't sort bars dynamically in the template — use `computed`
- ✅ Set `aria-label` for a11y (e.g. "工单闭环率 92.6%")

## Minimal Vue 3 template

```vue
<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  data: { label: string; value: number; tone?: string }[]
  max?: number
  showValue?: boolean
  barSize?: number
  gap?: number
  animate?: boolean
}>(), {
  showValue: true,
  barSize: 8,
  gap: 6,
  animate: true,
})

const maxVal = computed(() => props.max ?? Math.max(...props.data.map(d => d.value), 1))

const toneText = {
  blue: 'text-dash-accent-blue', cyan: 'text-dash-accent-cyan',
  green: 'text-dash-accent-green', amber: 'text-dash-accent-amber',
  red: 'text-dash-accent-red',
}
const toneBg = {
  blue: 'fill-dash-accent-blue', cyan: 'fill-dash-accent-cyan',
  green: 'fill-dash-accent-green', amber: 'fill-dash-accent-amber',
  red: 'fill-dash-accent-red',
}
</script>

<template>
  <div class="flex flex-col" :style="{ gap: `${gap}px` }">
    <div
      v-for="(item, i) in data"
      :key="item.label"
      class="grid grid-cols-[1fr_auto] items-center gap-2 animate-dash-fade-up"
      :style="{ animationDelay: `${i * 60}ms` }"
    >
      <div class="flex items-center gap-2 min-w-0">
        <span class="font-dash-mono text-dash-micro text-dash-text-muted truncate shrink-0 w-24">
          {{ item.label }}
        </span>
        <div class="flex-1 h-2 bg-dash-surface-2/50 rounded-dash-pill overflow-hidden min-w-0">
          <div
            :class="['h-full rounded-dash-pill origin-left', toneBg[item.tone || 'cyan']]"
            :style="{
              transform: `scaleX(${item.value / maxVal})`,
              transition: animate ? 'transform 1100ms cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
              transitionDelay: `${i * 60}ms`,
              width: '100%',
            }"
          />
        </div>
      </div>
      <span
        v-if="showValue"
        :class="['font-dash-mono text-dash-micro tabular-nums shrink-0', toneText[item.tone || 'cyan']]"
      >
        {{ item.value.toFixed(item.value % 1 === 0 ? 0 : 1) }}%
      </span>
    </div>
  </div>
</template>
```

## Acceptance check

- Bars fill from 0 to `value/max` over 1.1s with stagger
- `transform-origin: left` ensures bars grow rightward, not center-out
- `transition: transform` (not `width`) — GPU-accelerated
- Tone color matches data item's `tone` prop
