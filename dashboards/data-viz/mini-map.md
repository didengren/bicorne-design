# `MiniMap` — Geographic Points (Country / Region)

> A simplified SVG map with status-coded point markers. Used for "全国运维分布" (national distribution) or "fleet location".

## When to use

- Geographic distribution (50-300 points)
- Status-coded points (normal/warning/critical)
- Click-to-select region

## Props

```ts
interface MiniMapProps {
  /** SVG path 'd' string of the map outline (Albers projection recommended) */
  mapPath: string
  /** Map viewBox e.g. "0 0 1000 800" */
  viewBox?: string
  points: MapPoint[]
  selectedCode?: string | null
  onSelect?: (p: MapPoint) => void
}

interface MapPoint {
  code: string
  name: string
  cx: number
  cy: number
  value: number
  status: 'normal' | 'warning' | 'critical'
}
```

## Pitfalls

- ❌ Don't include `<rect fill="white">` as background — see [pitfalls #1](../pitfalls/README.md#1-number12846-returns-nan) and [map-panel.md](../component-contract/map-panel.md#pitfalls)
- ❌ Don't animate mapPath itself — too expensive
- ✅ Animate individual point circles with stagger

## Where to get a map path

- **Albers projection** for China: [DataV.GeoAtlas](https://geojson.cn/data/v3/china.json) → convert to SVG
- **Natural Earth** for world: [naturalearthdata.com](https://www.naturalearthdata.com/)
- **D3-geo** for custom: `d3.geoPath().projection(d3.geoAlbers())`

For a quick start, use the simplified path in [4-3-dashboard-command-center/src/mock/dashboard.ts](../../verification/4-3-dashboard-command-center/src/mock/dashboard.ts).

## Minimal Vue 3 template

See [../component-contract/map-panel.md](../component-contract/map-panel.md#minimal-vue-3-template) for the canonical implementation. Key snippets:

```vue
<svg :viewBox="viewBox || '0 0 1000 800'" class="w-full h-full">
  <path
    :d="mapPath"
    fill="rgba(84, 197, 255, 0.06)"
    stroke="rgba(84, 197, 255, 0.55)"
    stroke-width="0.8"
  />

  <g v-for="(p, i) in points" :key="p.code" @click="onSelect?.(p)" class="cursor-pointer">
    <!-- Ripple for non-normal -->
    <circle
      v-if="p.status !== 'normal' && selectedCode !== p.code"
      :cx="p.cx" :cy="p.cy" r="0.6" fill="none"
      :class="statusStrokeClass[p.status]"
      stroke-width="0.15"
      class="animate-dash-ripple"
    />
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
```

## Acceptance check

- Map fills container with `preserveAspectRatio="xMidYMid meet"`
- Each point renders in <1ms; 100 points total <100ms
- Selected point has crosshair + larger radius
- Critical points have continuous ripple animation
- Path stroke + fill use `rgba(84, 197, 255, ...)` (theme-aware)
