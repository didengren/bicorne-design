# `MapPanel` — Geographic Distribution Panel

> An SVG-based map showing regional distribution with status-coded point markers and a TOTAL summary bar.

---

## Mandatory tokens

| Token path | Purpose |
|---|---|
| `colors.surface.1` | Map background |
| `colors.accent.cyan` | Map path stroke (default) |
| `colors.accent.{green,amber,red}` | Status point colors (normal/warn/critical) |
| `colors.ink.muted` | Map path default fill |
| `animations.ripple` | Continuous ripple on critical points |
| `animations.fadeIn` (staggered) | Per-point entrance |

## Recommended props

```ts
interface MapPanelProps {
  /** Geo data: array of { code, name, cx, cy, value, status } */
  points: MapPoint[]
  /** Optional map SVG path 'd' string (Albers-projected, ~1000x800 viewBox) */
  mapPath?: string
  /** Show scale + compass markers */
  showScale?: boolean
  /** Click handler returning the selected point */
  onSelect?: (point: MapPoint) => void
}

interface MapPoint {
  code: string         // e.g. 'BJ', 'SH'
  name: string         // '北京'
  cx: number           // map x
  cy: number           // map y
  value: number
  status: 'normal' | 'warning' | 'critical'
}
```

## Pitfalls

### ❌ Pitfall 1: SVG background `<rect fill="white">`

```ts
// ❌ White background conflicts with dark theme
<svg><rect width="100%" height="100%" fill="white" /><path d="..."/></svg>

// ✅ Remove background; let container background show through
<svg><path d="..." fill="rgba(84, 197, 255, 0.06)" /></svg>
```

### ❌ Pitfall 2: Ripple animation conflicts with selection

```ts
// ❌ Ripple keeps drawing even on selected point
<circle class="animate-dash-ripple" />

// ✅ Disable ripple when point is selected
<circle v-if="p.status !== 'normal' && selectedCode !== p.code" class="animate-dash-ripple" />
```

### ❌ Pitfall 3: Status colors don't match token.ink

```ts
// ❌ Hardcoded colors
const red = '#f5222d'

// ✅ Map status to token accent
const statusColor = {
  normal: 'text-dash-accent-green',
  warning: 'text-dash-accent-amber',
  critical: 'text-dash-accent-red',
}
```

## Minimal Vue 3 template

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'
import MetricNumber from './MetricNumber.vue'

interface MapPoint {
  code: string
  name: string
  cx: number
  cy: number
  value: number
  status: 'normal' | 'warning' | 'critical'
}

const props = defineProps<{
  points: MapPoint[]
  mapPath: string
}>()

const selectedCode = ref<string | null>(null)

const statusFillClass = {
  normal: 'fill-dash-accent-green',
  warning: 'fill-dash-accent-amber',
  critical: 'fill-dash-accent-red',
}

const totals = computed(() => {
  const totalProjects = props.points.length
  const totalCapacity = props.points.reduce((s, p) => s + p.value, 0)
  const totalOutput = totalCapacity * 1200  // mock conversion
  return { totalProjects, totalCapacity, totalOutput }
})

function select(p: MapPoint) {
  selectedCode.value = selectedCode.value === p.code ? null : p.code
}
</script>

<template>
  <div class="relative h-full w-full">
    <!-- Map SVG -->
    <svg viewBox="0 0 1000 800" class="w-full h-full">
      <path
        :d="mapPath"
        fill="rgba(84, 197, 255, 0.06)"
        stroke="rgba(84, 197, 255, 0.55)"
        stroke-width="0.8"
      />

      <!-- Points -->
      <g v-for="(p, i) in points" :key="p.code" @click="select(p)" class="cursor-pointer">
        <!-- Ripple for warning/critical (hidden when selected) -->
        <circle
          v-if="p.status !== 'normal' && selectedCode !== p.code"
          :cx="p.cx" :cy="p.cy" r="0.6" fill="none"
          :class="statusFillClass[p.status]"
          stroke-width="0.15"
          opacity="0.5"
          class="animate-dash-ripple"
        />

        <!-- Crosshair when selected -->
        <g v-if="selectedCode === p.code">
          <line :x1="p.cx - 4" :y1="p.cy" :x2="p.cx + 4" :y2="p.cy" stroke="currentColor" stroke-width="0.2" />
          <line :x1="p.cx" :y1="p.cy - 4" :x2="p.cx" :y2="p.cy + 4" stroke="currentColor" stroke-width="0.2" />
        </g>

        <!-- Main dot -->
        <circle
          :cx="p.cx" :cy="p.cy"
          :r="selectedCode === p.code ? 1.2 : 0.8"
          :class="statusFillClass[p.status]"
          class="animate-dash-fade-up transition-all"
          :style="{ animationDelay: `${i * 40}ms` }"
        />
      </g>
    </svg>

    <!-- TOTAL bar -->
    <div class="absolute top-2 left-2 right-2 grid grid-cols-3 gap-2 text-center min-w-0">
      <div class="min-w-0">
        <div class="font-mono text-dash-h-lg font-bold text-dash-accent-cyan tabular-nums truncate">
          <MetricNumber :value="totals.totalProjects" :duration="1100" text-class="text-dash-h-lg font-bold text-dash-accent-cyan" />
        </div>
        <div class="font-display text-dash-micro text-dash-text-dim mt-0.5">项目</div>
      </div>
      <!-- ... MW, 万 kWh similar -->
    </div>
  </div>
</template>
```

## Acceptance check

- Map fills 100% of panel width/height with `preserveAspectRatio="xMidYMid meet"`
- 30 points render in <16ms after data load
- Status ripple on critical points is visible within 200ms of mount
- Selection toggles the crosshair without re-triggering ripple
- TOTAL bar numbers count up over 1.1-1.3s
