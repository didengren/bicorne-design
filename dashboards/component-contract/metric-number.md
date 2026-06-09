# `MetricNumber` — Animated KPI Number

> Drop-in component for any numeric KPI. Animates from 0 → target on mount and on prop change. Handles `zh-CN` locale, prefix/suffix, decimals, and easing.

---

## Mandatory tokens

| Token path | Purpose |
|---|---|
| `fontFamilies.mono` | Tabular numerals (`font-mono` + `tabular-nums`) |
| `typography.size.h-lg / h-xl / metric` | Tiered sizing |
| `colors.ink.default / muted` | Number vs unit text color |
| `colors.accent.{blue,cyan,green,violet,amber,red}` | Tone variant |
| `motion.easing.easeOut` (or `easeOutBack`) | Count-up easing |
| `motion.duration` | Animation length (1100-1400ms typical) |

## Recommended props

```ts
interface MetricNumberProps {
  /** Target value. Animates from 0 to this on mount/change. */
  value: number
  /** Decimal places (default 0) */
  decimals?: number
  /** Animation length in ms (default 1200) */
  duration?: number
  /** Easing preset (default 'easeOut') */
  easing?: 'linear' | 'easeOut' | 'easeInOut' | 'easeOutBack'
  /** Unit suffix (e.g. "万 kWh", "%", "户") */
  suffix?: string
  /** Currency/prefix symbol */
  prefix?: string
  /** Pass-through Tailwind classes for the number span */
  textClass?: string
  /** 'mono' = tabular-nums, 'sans' = proportional */
  family?: 'mono' | 'sans'
}
```

## Pitfalls — CRITICAL

> These three pitfalls account for **80% of the "Number is NaN" bugs** in dashboard code.

### ❌ Pitfall 1: `Number("12,846") → NaN`

```ts
// ❌ WRONG — Number() cannot parse a localized string
const formattedDisplay = computed(() =>
  Number(display.value).toLocaleString('zh-CN', { ... })
)
// display.value is "12,846" (already formatted by useCountUp)
// Number("12,846") = NaN → display = "NaN"

// ✅ CORRECT — useCountUp's display is already zh-CN formatted; pass through
const formattedDisplay = computed(() => display.value)
```

### ❌ Pitfall 2: TDZ on `const formatNumber` used in `ref()`

```ts
// ❌ WRONG — formatNumber is referenced in line 18, declared in line 47
const value = ref(0)
const display = ref(formatNumber(0, 0))   // ReferenceError
const formatNumber = (n, d) => n.toLocaleString('zh-CN', { ... })

// ✅ CORRECT — hoist to module scope
const formatNumber = (n, d) => n.toLocaleString('zh-CN', { ... })
export function useCountUp(...) { ... }
```

### ❌ Pitfall 3: Animating to `undefined`

```ts
// ❌ WRONG — if data is async, useCountUp animates to NaN
const { data } = useMockData(...)  // data.value is undefined on first tick
useCountUp(() => data.value)        // NaN cascade

// ✅ CORRECT — default to 0 when undefined
useCountUp(() => data.value ?? 0)
```

## Minimal Vue 3 template

```vue
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

// useCountUp handles the rAF loop; pass the value as a Ref
const targetRef = toRef(() => props.value)
const { display } = useCountUp(targetRef, {
  decimals: props.decimals,
  duration: props.duration,
  easing: props.easing,
})

// CRITICAL: display is already "12,846"; do NOT re-parse
const formattedDisplay = computed(() => display.value)

const familyClass = computed(() =>
  props.family === 'mono' ? 'font-mono tabular-nums' : 'font-sans'
)
</script>

<template>
  <span :class="[familyClass, textClass]">
    <span v-if="prefix" class="text-dash-text-dim mr-0.5">{{ prefix }}</span>
    <span>{{ formattedDisplay }}</span>
    <span v-if="suffix" class="text-dash-text-dim ml-0.5">{{ suffix }}</span>
  </span>
</template>
```

## Acceptance check

- 0 NaN element in DOM
- Number is `0` at t=0, transitions through intermediate values, lands on `value` at t=duration
- Switching `value` prop mid-animation smoothly tweens to new target (no restart, no NaN)
- Locale is `zh-CN` (uses comma as thousands separator: `12,846`)
- Tabular nums (no width jitter as digits change)
