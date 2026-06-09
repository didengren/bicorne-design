# `Sparkline` — Inline Trend Line (with draw animation)

> A compact SVG line/area chart for showing a single time series. Animates the line draw via `stroke-dashoffset`. No dependencies on ECharts/D3.

---

## Mandatory tokens

| Token path | Purpose |
|---|---|
| `colors.accent.{blue,cyan,green,violet}` | Line stroke |
| `colors.accent.{blue,cyan,green,violet}` (translucent) | Area fill (use opacity) |
| `typography.size.micro` | Axis label |
| `colors.ink.muted / dim` | Axis text + grid |
| `animations.draw` | Line draw animation |
| `motion.easing.standard` | Indicator motion |

## Recommended props

```ts
interface SparklineProps {
  /** Y-axis data points (number[]) */
  data: number[]
  /** Pixel width of viewBox (default 200) */
  width?: number
  /** Pixel height of viewBox (default 50) */
  height?: number
  /** Stroke color (use token color, e.g. 'var(--dash-accent-cyan)') */
  stroke?: string
  /** Show translucent area fill below the line */
  showArea?: boolean
  /** Use cardinal smoothing (smoother curve) */
  smooth?: boolean
  /** Show a moving dot at the latest data point */
  showIndicator?: boolean
  /** Play draw animation on mount (default true) */
  animate?: boolean
  /** Optional X-axis labels */
  xLabels?: string[]
  /** Optional Y-axis grid lines */
  yGridLines?: number
}
```

## Pitfalls

### ❌ Pitfall 1: `<text>` defaults to black fill

```ts
// ❌ SVG text in dark theme shows as black on dark background
<text x="0" y="10">12:00</text>

// ✅ Explicitly set fill
<text x="0" y="10" fill="currentColor" class="text-dash-text-dim">12:00</text>
```

### ❌ Pitfall 2: `pathLength` must be set for `stroke-dasharray` to work portably

```ts
// ❌ stroke-dasharray: 1000 works only if path is < 1000 units
<path :stroke-dasharray="1000" stroke-dashoffset="1000" />

// ✅ Use pathLength="1000" attribute to normalize
<path pathLength="1000" stroke-dasharray="1000" stroke-dashoffset="1000" class="animate-dash-draw" />
```

### ❌ Pitfall 3: Re-triggering animation on data change

```ts
// ❌ Setting :key forces unmount/remount — expensive
<Sparkline :key="data.length" :data="data" />

// ✅ Use a watch to reset the stroke-dashoffset manually
// OR use view transition / CSS animation with iteration
```

## Minimal Vue 3 template

```vue
<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  data: number[]
  width?: number
  height?: number
  stroke?: string
  showArea?: boolean
  smooth?: boolean
  showIndicator?: boolean
  animate?: boolean
}>(), {
  width: 200,
  height: 50,
  stroke: 'currentColor',
  showArea: true,
  smooth: true,
  showIndicator: true,
  animate: true,
})

// Normalize data to 0..1 within viewBox
const points = computed(() => {
  if (props.data.length === 0) return []
  const min = Math.min(...props.data)
  const max = Math.max(...props.data)
  const range = max - min || 1
  const stepX = props.width / (props.data.length - 1)
  return props.data.map((v, i) => ({
    x: i * stepX,
    y: props.height - ((v - min) / range) * props.height,
  }))
})

const pathLine = computed(() => {
  if (points.value.length === 0) return ''
  return points.value.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
})

// Smoothing via Bezier (Catmull-Rom approximation)
const pathSmooth = computed(() => {
  const pts = points.value
  if (pts.length < 2) return ''
  let d = `M ${pts[0].x} ${pts[0].y}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i]
    const p1 = pts[i + 1]
    const cx = (p0.x + p1.x) / 2
    d += ` C ${cx} ${p0.y}, ${cx} ${p1.y}, ${p1.x} ${p1.y}`
  }
  return d
})

const pathArea = computed(() => {
  const line = props.smooth ? pathSmooth.value : pathLine.value
  if (!line) return ''
  return `${line} L ${props.width} ${props.height} L 0 ${props.height} Z`
})

const lastPoint = computed(() => points.value[points.value.length - 1] ?? { x: 0, y: 0 })
</script>

<template>
  <svg
    :viewBox="`0 0 ${width} ${height}`"
    class="w-full h-full overflow-visible"
    preserveAspectRatio="none"
  >
    <!-- Gradient defs for area fill -->
    <defs>
      <linearGradient :id="`grad-${$.uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" :stop-color="stroke" stop-opacity="0.4" />
        <stop offset="100%" :stop-color="stroke" stop-opacity="0" />
      </linearGradient>
    </defs>

    <!-- Area fill -->
    <path
      v-if="showArea"
      :d="pathArea"
      :fill="`url(#grad-${$.uid})`"
      class="opacity-80"
    />

    <!-- Line -->
    <path
      :d="smooth ? pathSmooth : pathLine"
      fill="none"
      :stroke="stroke"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      pathLength="1000"
      :class="animate ? '[stroke-dasharray:1000] animate-dash-draw' : ''"
    />

    <!-- Moving indicator dot -->
    <circle
      v-if="showIndicator"
      :cx="lastPoint.x"
      :cy="lastPoint.y"
      r="2"
      :fill="stroke"
      class="drop-shadow-[0_0_4px_currentColor]"
    >
      <animate
        v-if="animate"
        attributeName="r"
        values="2;3;2"
        dur="2s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
</template>
```

## Acceptance check

- Line draws from left to right over 1.6s on mount
- Last point has a pulsing dot
- Y-axis auto-scales to data range
- 0 console error
- Renders without layout shift (use `aspect-ratio` or fixed `h-*` on container)
