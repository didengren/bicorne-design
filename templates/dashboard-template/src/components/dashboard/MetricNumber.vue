/**
 * MetricNumber — animated KPI number.
 * 1:1 implementation of ../../component-contract/metric-number.md
 *
 * CRITICAL: display.value is already zh-CN formatted.
 * DO NOT re-parse with Number() — that would turn "12,846" into NaN.
 */
<script setup lang="ts">
import { computed, toRef } from 'vue'
import { useCountUp } from '@/hooks/useCountUp'

const props = withDefaults(defineProps<{
  value: number
  decimals?: number
  duration?: number
  easing?: 'linear' | 'easeOut' | 'easeInOut' | 'easeOutBack'
  suffix?: string
  prefix?: string
  textClass?: string
  family?: 'mono' | 'sans'
}>(), {
  decimals: 0,
  duration: 1200,
  easing: 'easeOut',
  family: 'mono',
})

const targetRef = toRef(() => props.value)
const { display } = useCountUp(targetRef, {
  decimals: props.decimals,
  duration: props.duration,
  easing: props.easing,
})

const formattedDisplay = computed(() => display.value)

const familyClass = computed(() =>
  props.family === 'mono' ? 'font-dash-mono tabular-nums' : 'font-dash-body'
)
</script>

<template>
  <span :class="[familyClass, textClass]">
    <span v-if="prefix" class="text-dash-text-dim mr-0.5">{{ prefix }}</span>
    <span>{{ formattedDisplay }}</span>
    <span v-if="suffix" class="text-dash-text-dim ml-0.5">{{ suffix }}</span>
  </span>
</template>
