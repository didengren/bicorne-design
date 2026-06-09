# `Funnel` — Pipeline / Conversion Stages

> Trapezoid-shaped stages showing flow from input to output. Used for "leads → deals → closed" or "tickets → resolved".

## When to use

- Conversion funnels
- Drop-off analysis
- Multi-stage process

## Props

```ts
interface FunnelProps {
  stages: { label: string; value: number; tone?: 'blue' | 'cyan' | 'green' | 'amber' | 'red' }[]
  /** Show conversion rate between stages (default true) */
  showConversion?: boolean
  /** Animate on mount (default true) */
  animate?: boolean
}
```

## Pitfalls

- ❌ Don't use 3D-perspective funnels — they look gimmicky
- ❌ Don't make all stages the same width — that defeats the visual
- ✅ Width of each stage should be proportional to its value
- ✅ Show % between stages (e.g. "64% → 32%")

## Minimal Vue 3 template

```vue
<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  stages: { label: string; value: number; tone?: string }[]
  showConversion?: boolean
  animate?: boolean
}>(), {
  showConversion: true,
  animate: true,
})

const maxVal = computed(() => Math.max(...props.stages.map(s => s.value), 1))

const widths = computed(() => props.stages.map(s => Math.max(20, (s.value / maxVal.value) * 100)))

const conversions = computed(() => {
  return props.stages.slice(1).map((s, i) => {
    const prev = props.stages[i].value
    return prev > 0 ? (s.value / prev) * 100 : 0
  })
})

const toneBg = {
  blue: 'bg-dash-accent-blue/30 border-dash-accent-blue/60',
  cyan: 'bg-dash-accent-cyan/30 border-dash-accent-cyan/60',
  green: 'bg-dash-accent-green/30 border-dash-accent-green/60',
  amber: 'bg-dash-accent-amber/30 border-dash-accent-amber/60',
  red: 'bg-dash-accent-red/30 border-dash-accent-red/60',
}
const toneText = {
  blue: 'text-dash-accent-blue', cyan: 'text-dash-accent-cyan',
  green: 'text-dash-accent-green', amber: 'text-dash-accent-amber',
  red: 'text-dash-accent-red',
}
</script>

<template>
  <div class="flex flex-col items-stretch gap-1">
    <template v-for="(stage, i) in stages" :key="stage.label">
      <div
        :class="['relative mx-auto border rounded-dash-sm transition-all', toneBg[stage.tone || 'cyan']]"
        :style="{
          width: `${widths[i]}%`,
          height: '36px',
          transition: animate ? 'width 1100ms cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
          transitionDelay: `${i * 80}ms`,
        }"
      >
        <div class="absolute inset-0 flex items-center justify-between px-3">
          <span class="font-dash-display text-dash-micro text-dash-text-muted truncate">{{ stage.label }}</span>
          <span :class="['font-dash-mono text-dash-body font-bold tabular-nums', toneText[stage.tone || 'cyan']]">
            {{ stage.value.toLocaleString('zh-CN') }}
          </span>
        </div>
      </div>
      <div
        v-if="showConversion && i < stages.length - 1"
        :class="['mx-auto font-dash-mono text-dash-micro', conversions[i] >= 50 ? 'text-dash-accent-green' : conversions[i] >= 20 ? 'text-dash-accent-amber' : 'text-dash-accent-red']"
      >
        ▼ {{ conversions[i].toFixed(1) }}%
      </div>
    </template>
  </div>
</template>
```

## Acceptance check

- Stage widths are proportional to value, with min 20% so labels don't collide
- Conversion % between stages color-coded: green ≥ 50%, amber ≥ 20%, red < 20%
- Animate on mount with staggered delay
