/**
 * Sparkline — inline trend line with draw animation.
 * 1:1 implementation of ../../component-contract/sparkline.md
 */
<script setup lang="ts">
import { computed, useId } from 'vue'

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

const gradId = useId()

const points = computed(() => {
  if (props.data.length === 0) return []
  const min = Math.min(...props.data)
  const max = Math.max(...props.data)
  const range = max - min || 1
  const stepX = props.width / Math.max(1, props.data.length - 1)
  return props.data.map((v, i) => ({
    x: i * stepX,
    y: props.height - ((v - min) / range) * props.height,
  }))
})

const pathLine = computed(() => {
  if (points.value.length === 0) return ''
  return points.value.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
})

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
    <defs>
      <linearGradient :id="`grad-${gradId}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" :stop-color="stroke" stop-opacity="0.4" />
        <stop offset="100%" :stop-color="stroke" stop-opacity="0" />
      </linearGradient>
    </defs>

    <path
      v-if="showArea"
      :d="pathArea"
      :fill="`url(#grad-${gradId})`"
      class="opacity-80"
    />

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
