# `Gauge` — Radial Dial (e.g. online rate, completion %)

> A single-value SVG dial showing progress on a 270° arc. Use for "current value vs target" style KPIs.

---

## Mandatory tokens

| Token path | Purpose |
|---|---|
| `colors.accent.{cyan,green,blue}` | Arc stroke |
| `colors.surface.2` | Background arc |
| `colors.ink.default / muted` | Value + label text |
| `typography.size.metric-lg / h-xl` | Value display |
| `animations.draw` | Arc fill on mount |
| `motion.easing.easeOut` | Arc draw easing |

## Recommended props

```ts
interface GaugeProps {
  /** 0-100 */
  value: number
  /** Display unit (e.g. "%", "MW") */
  unit?: string
  /** Label (e.g. "ONLINE RATE") */
  label?: string
  /** Arc sweep in degrees (default 270) */
  sweep?: number
  /** Color theme */
  tone?: 'blue' | 'cyan' | 'green' | 'amber' | 'red'
  /** Show tick marks around arc */
  showTicks?: boolean
}
```

## Pitfalls

### ❌ Pitfall 1: Arc rotated to start at 12 o'clock (not 9 o'clock)

```ts
// ❌ Default SVG circle starts at 3 o'clock (0°)
const startAngle = 0
// ❌ 270° arc spans from 3 o'clock CCW

// ✅ Start at -135° (7:30 position), sweep +270° to 4:30 position
const startAngle = -sweep / 2
```

### ❌ Pitfall 2: Arc value > 100% breaks the calculation

```ts
// ❌ value=120 clamps to 120% of circle = full ring (1 full revolution)
const offset = (100 - value) / 100 * arcLength

// ✅ Clamp at the source
const clampedValue = Math.max(0, Math.min(100, value))
```

## Minimal Vue 3 template

```vue
<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  value: number
  unit?: string
  label?: string
  sweep?: number
  tone?: 'blue' | 'cyan' | 'green' | 'amber' | 'red'
  showTicks?: boolean
}>(), {
  unit: '%',
  sweep: 270,
  tone: 'cyan',
  showTicks: true,
})

const RADIUS = 60
const STROKE_WIDTH = 6
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
const ARC_LENGTH = CIRCUMFERENCE * (props.sweep / 360)

const toneStroke = {
  blue: '#2b7fff', cyan: '#54c5ff', green: '#00d4a8',
  amber: '#ffb84d', red: '#ff4d6d',
}
const toneText = {
  blue: 'text-dash-accent-blue', cyan: 'text-dash-accent-cyan',
  green: 'text-dash-accent-green', amber: 'text-dash-accent-amber',
  red: 'text-dash-accent-red',
}

const clamped = computed(() => Math.max(0, Math.min(100, props.value)))

const dashOffset = computed(() => {
  return ARC_LENGTH * (1 - clamped.value / 100)
})

const rotation = computed(() => -90 - props.sweep / 2 + 90)
// rotate so 0° sits at -sweep/2 position
</script>

<template>
  <div class="relative inline-flex flex-col items-center">
    <svg :width="160" :height="160" :viewBox="`0 0 160 160`" class="overflow-visible">
      <!-- Background arc -->
      <circle
        cx="80" cy="80" :r="RADIUS"
        fill="none"
        :stroke="`${toneStroke[tone]}33`"
        :stroke-width="STROKE_WIDTH"
        :stroke-dasharray="`${ARC_LENGTH} ${CIRCUMFERENCE}`"
        :transform="`rotate(${rotation} 80 80)`"
        stroke-linecap="round"
      />

      <!-- Foreground arc (animates) -->
      <circle
        cx="80" cy="80" :r="RADIUS"
        fill="none"
        :stroke="toneStroke[tone]"
        :stroke-width="STROKE_WIDTH"
        :stroke-dasharray="`${ARC_LENGTH} ${CIRCUMFERENCE}`"
        :stroke-dashoffset="dashOffset"
        :transform="`rotate(${rotation} 80 80)`"
        stroke-linecap="round"
        pathLength="1000"
        class="[stroke-dasharray:1000] animate-dash-draw"
        :style="{ filter: `drop-shadow(0 0 6px ${toneStroke[tone]})` }"
      />
    </svg>

    <!-- Center value -->
    <div class="absolute inset-0 flex flex-col items-center justify-center">
      <div :class="['font-mono text-dash-metric-lg font-bold leading-none tabular-nums', toneText[tone]]">
        {{ clamped.toFixed(0) }}<span class="text-dash-h-lg">{{ unit }}</span>
      </div>
      <div class="mt-1 font-display text-dash-micro uppercase tracking-widest text-dash-text-dim">
        {{ label }}
      </div>
    </div>
  </div>
</template>
```

## Acceptance check

- Arc animates from 0% to `value`% over 1.6s
- Value text is centered within the arc
- Drop-shadow glow color matches `tone`
- `clamp(0, 100)` applied — values outside range don't break
