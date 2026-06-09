/**
 * CornerFrame — 4 L-shaped brackets at the panel corners.
 * 1:1 implementation of ../../component-contract/corner-frame.md
 */
<script setup lang="ts">
const props = withDefaults(defineProps<{
  tone: 'blue' | 'cyan' | 'green' | 'violet' | 'amber' | 'red'
  size?: number
  thickness?: number
  opacity?: number
}>(), {
  size: 10,
  thickness: 1,
  opacity: 0.6,
})

const toneText = {
  blue: 'text-dash-accent-blue',
  cyan: 'text-dash-accent-cyan',
  green: 'text-dash-accent-green',
  violet: 'text-dash-accent-violet',
  amber: 'text-dash-accent-amber',
  red: 'text-dash-accent-red',
}
</script>

<template>
  <div
    class="pointer-events-none absolute inset-0"
    :class="toneText[tone]"
    :style="{ opacity }"
  >
    <span class="absolute left-0 top-0" :style="{ width: `${size}px`, height: `${thickness}px` }" />
    <span class="absolute left-0 top-0" :style="{ width: `${thickness}px`, height: `${size}px` }" />
    <span class="absolute right-0 top-0" :style="{ width: `${size}px`, height: `${thickness}px` }" />
    <span class="absolute right-0 top-0" :style="{ width: `${thickness}px`, height: `${size}px` }" />
    <span class="absolute left-0 bottom-0" :style="{ width: `${size}px`, height: `${thickness}px` }" />
    <span class="absolute left-0 bottom-0" :style="{ width: `${thickness}px`, height: `${size}px` }" />
    <span class="absolute right-0 bottom-0" :style="{ width: `${size}px`, height: `${thickness}px` }" />
    <span class="absolute right-0 bottom-0" :style="{ width: `${thickness}px`, height: `${size}px` }" />
  </div>
</template>
