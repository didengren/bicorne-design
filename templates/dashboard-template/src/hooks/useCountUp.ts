/**
 * useCountUp — animate a number from 0 to a target value.
 *
 * This is the FIXED version that avoids pitfalls #1 and #2 from
 * ../../pitfalls/README.md:
 *   - formatNumber is hoisted to module scope (no TDZ)
 *   - display.value is the formatted string; consumers pass it through
 */

import { ref, watch, onScopeDispose, type Ref } from 'vue'

export interface CountUpOptions {
  duration?: number
  decimals?: number
  easing?: 'linear' | 'easeOut' | 'easeInOut' | 'easeOutBack'
  from?: number
}

const easings = {
  linear:      (t: number) => t,
  easeOut:     (t: number) => 1 - (1 - t) ** 3,
  easeInOut:   (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - Math.pow(-2 * t + 2, 3) / 2),
  easeOutBack: (t: number) => {
    const c1 = 1.70158
    const c3 = c1 + 1
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
  },
}

const formatNumber = (n: number, dec: number): string =>
  n.toLocaleString('zh-CN', {
    minimumFractionDigits: dec,
    maximumFractionDigits: dec,
  })

export function useCountUp(
  source: Ref<number> | (() => number),
  options: CountUpOptions = {},
): { value: Ref<number>; display: Ref<string> } {
  const { duration = 1200, decimals = 0, easing = 'easeOut', from = 0 } = options
  const value = ref<number>(from)
  const display = ref<string>(formatNumber(from, decimals))

  const getTarget = (): number => {
    const v = typeof source === 'function' ? source() : source.value
    return typeof v === 'number' && !Number.isNaN(v) ? v : 0
  }

  let rafId = 0
  let startTime: number | null = null
  let startVal = from
  let targetVal = from
  let isActive = false

  const tick = (now: number) => {
    if (startTime === null) return
    const elapsed = now - startTime
    const t = Math.min(1, elapsed / duration)
    const eased = easings[easing](t)
    const current = startVal + (targetVal - startVal) * eased
    value.value = current
    display.value = formatNumber(current, decimals)
    if (t < 1) rafId = requestAnimationFrame(tick)
  }

  const animateTo = (newTarget: number) => {
    if (isActive) {
      targetVal = newTarget
      return
    }
    isActive = true
    startVal = value.value
    targetVal = newTarget
    startTime = null
    rafId = requestAnimationFrame((now) => {
      startTime = now
      tick(now)
      isActive = false
    })
  }

  animateTo(getTarget())

  if (typeof source !== 'function') {
    const stop = watch(source, (newVal) => animateTo(newVal ?? 0))
    onScopeDispose(() => {
      stop()
      cancelAnimationFrame(rafId)
    })
  } else {
    onScopeDispose(() => cancelAnimationFrame(rafId))
  }

  return { value, display }
}
