/**
 * PanelShell — the canonical dashboard panel container.
 * 1:1 implementation of ../../component-contract/panel.md
 */
<script setup lang="ts">
import { computed, useId } from 'vue'
import CornerFrame from './CornerFrame.vue'

const props = withDefaults(defineProps<{
  title: string
  eyebrow: string
  tone?: 'blue' | 'cyan' | 'green' | 'violet' | 'amber' | 'red'
  density?: 'tight' | 'normal' | 'loose'
  delay?: number
  scan?: boolean
  corners?: boolean
}>(), {
  tone: 'cyan',
  density: 'normal',
  delay: 0,
  scan: true,
  corners: true,
})

const uid = useId()
const headingId = `panel-${uid}`

const toneTextClass = computed(() => {
  const map = {
    blue: 'text-dash-accent-blue',
    cyan: 'text-dash-accent-cyan',
    green: 'text-dash-accent-green',
    violet: 'text-dash-accent-violet',
    amber: 'text-dash-accent-amber',
    red: 'text-dash-accent-red',
  }
  return map[props.tone]
})

const paddingMap = {
  tight: 'p-2.5',
  normal: 'p-3.5',
  loose: 'p-5',
} as const
</script>

<template>
  <section
    role="region"
    :aria-labelledby="headingId"
    class="relative h-full bg-dash-panel border border-dash-border-soft rounded-dash-lg overflow-hidden backdrop-blur-sm shadow-dash-panel animate-dash-fade-up flex flex-col focus-visible:ring-2 focus-visible:ring-dash-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-dash-bg"
    :style="{ animationDelay: `${delay}ms` }"
    tabindex="-1"
  >
    <CornerFrame v-if="corners" :tone="tone" />

    <!-- Top scan line -->
    <span
      v-if="scan"
      class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-50"
      :class="toneTextClass"
      aria-hidden="true"
    />

    <!-- Header -->
    <div class="flex items-center justify-between px-3.5 pt-2.5 pb-1.5 shrink-0">
      <div class="flex items-baseline gap-2 min-w-0">
        <span class="font-display text-dash-micro uppercase tracking-[0.2em] text-dash-text-dim shrink-0" aria-hidden="true">
          {{ eyebrow }}
        </span>
        <h3 :id="headingId" class="font-display text-dash-h-md font-semibold text-dash-text truncate">
          {{ title }}
        </h3>
      </div>
      <slot name="actions" />
    </div>

    <!-- Body -->
    <div :class="['flex flex-col gap-2.5 flex-1 min-h-0', paddingMap[density]]">
      <slot />
    </div>
  </section>
</template>
