---
name: animation-matrix
description: Maps each dashboard scenario to its recommended animation, duration, and easing. The bridge between "I have a token with 20 animation curves" and "I don't know which to use where".
keywords: animation, easing, duration, keyframe, motion
---

> **v1.8 stub · 本文件已合并至通用方法论**
>
> **通用部分（缓动曲线推导 / 时长档速查 / Keyframe 分类 / 反模式 / 性能规则）已抽到：**
> - [`../references/methodology/animation-best-practices.md`](../references/methodology/animation-best-practices.md) — 通用动画原则 + 缓动曲线 + Keyframe 分类
> - [`../references/methodology/animation-cross-platform.md`](../references/methodology/animation-cross-platform.md) — 7 类别差异速查 + 跨平台硬约束
>
> **本文件**仅保留 **Dashboard 类别专属的场景→动画映射**（10 个常见场景 + 19 个 `dash-*` keyframe 列表），便于 Dashboard 项目查表。
>
> 其他类别请直接读通用方法论文件（无需读本文件）。

# Animation Matrix — Which Animation Goes Where

> token.json defines 19 animation curves. This matrix answers: **"For this UI element, which one?"**

---

## Decision flowchart

```
Is it a panel/card entering the page?
  → fade-up (opacity + translateY 12px)
  → 500ms · stagger 100ms per panel · ease-out

Is it a KPI number rolling from 0?
  → useCountUp hook (easeOut)
  → 1100-1400ms based on visual weight

Is it a sparkline / arc / ring drawing?
  → draw (stroke-dashoffset 1000 → 0)
  → 1600ms · ease-in-out

Is it a state indicator (pulsing dot)?
  → pulse / pulse-soft
  → 2.0-2.4s · infinite · ease-in-out

Is it a "critical alert" needing attention?
  → ripple (concentric expand + fade)
  → 3.0s · infinite · ease-out

Is it a top-of-panel decorative element?
  → scan (horizontal sweep)
  → 6.0s · infinite · linear

Is it a background ambient effect?
  → aurora (slow translate)
  → 18-24s · infinite · ease-in-out

Is it a title gradient / shine?
  → shimmer (bg-position 0 → 200%)
  → 2.4s · infinite · linear

Is it a continuously scrolling ticker?
  → ticker (translateX 0 → -50%)
  → 40s · infinite · linear

Is it a tooltip/popover?
  → scale-fade
  → 200ms · ease-out
```

---

## The 10 most common scenarios

| # | Scenario | Animation | Duration | Easing | Loop? | CSS / hook |
|---|---|---|---|---|---|---|
| 1 | Panel enter | fade-up | 500ms | ease-out | no | `animate-dash-fade-up` |
| 2 | KPI number count-up | countUp | 1100-1400ms | easeOut (cubic) | no | `useCountUp` hook |
| 3 | Sparkline line draw | draw | 1600ms | ease-in-out | no | `animate-dash-draw` |
| 4 | Ring/arc fill | draw | 1600ms | ease-in-out | no | `animate-dash-draw` |
| 5 | Status dot | pulse | 2.4s | ease-in-out | yes | `animate-dash-pulse` |
| 6 | Critical alert | ripple | 3.0s | ease-out | yes | `animate-dash-ripple` |
| 7 | Panel top scan | scan | 6.0s | linear | yes | `animate-dash-scan` |
| 8 | Background glow | aurora | 18s | ease-in-out | yes | `animate-dash-aurora` |
| 9 | Title shine | shimmer | 2.4s | linear | yes | `animate-dash-shimmer` |
| 10 | Weather ticker | ticker | 40s | linear | yes | `animate-dash-ticker` |

---

## Stagger patterns

When multiple elements enter together, stagger by 50-100ms each to create a "cascade" effect.

```ts
// Pattern 1: Top-to-bottom cascade (header → panels)
const delays = [0, 100, 200, 300, 400]  // ms

// Pattern 2: Outside-in (corners first, center last)
const delays = [0, 80, 160, 80, 0]      // ms

// Pattern 3: Importance-first (KPI panels before decorative)
const delays = [0, 100, 100, 200, 200]  // ms
```

> **Don't over-stagger.** > 5 items with 100ms gaps = 500ms total. Beyond that, users perceive it as "slow load".

---

## Easing reference

| Easing | Use for | Tailwind class | CSS cubic-bezier |
|---|---|---|---|
| `ease-out` | Enter animations, count-up | `ease-out` | `cubic-bezier(0, 0, 0.2, 1)` |
| `ease-in-out` | Continuous loops, draw | `ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` |
| `ease-out-back` | Playful count-up (overshoots) | n/a (custom) | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| `linear` | Ticker, scan, shimmer | `linear` | `cubic-bezier(0, 0, 1, 1)` |
| `spring` (out) | Bouncy entrance, badge pop | n/a (use Framer) | — |

---

## Duration reference

| Duration | Use for |
|---|---|
| 100-200ms | Tooltip, hover state, click feedback |
| 300-500ms | Panel enter, button state change |
| 800-1200ms | Number count-up, page transition |
| 1500-2000ms | Sparkline/arc draw, big reveal |
| 2-4s loop | Pulse, ripple, small indicator |
| 6-12s loop | Scan, aurora, slow ambient |
| 30-60s loop | Ticker, long ambient |

---

## Anti-patterns

- ❌ **ease-in for entrance** — feels sluggish; reverse the curve
- ❌ **linear for count-up** — looks robotic; use easeOut
- ❌ **looping entrance animation** — feels broken
- ❌ **animating width/height/top/left** — triggers layout, not GPU
- ❌ **2 different easings on the same element** — pick one
- ❌ **stagger > 1 second total** — feels like loading lag

---

## Token → animation class mapping

```ts
// tailwind.config.ts keyframes + animation
keyframes: {
  'dash-fade-up':   { '0%': { opacity: '0', transform: 'translateY(12px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
  'dash-draw':      { '0%': { strokeDashoffset: '1000' }, '100%': { strokeDashoffset: '0' } },
  'dash-pulse':     { '0%,100%': { opacity: '1', transform: 'scale(1)' }, '50%': { opacity: '0.6', transform: 'scale(1.05)' } },
  'dash-ripple':    { '0%': { r: '0.4', opacity: '0.6' }, '100%': { r: '3.5', opacity: '0' } },
  'dash-scan':      { '0%': { transform: 'translateX(-100%)' }, '100%': { transform: 'translateX(100%)' } },
  'dash-aurora':    { '0%,100%': { transform: 'translate(0, 0) scale(1)' }, '50%': { transform: 'translate(20px, -10px) scale(1.1)' } },
  'dash-shimmer':   { '0%': { backgroundPosition: '0% 50%' }, '100%': { backgroundPosition: '200% 50%' } },
  'dash-ticker':    { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
  'dash-blink':     { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.3' } },
  'dash-count-up':  { '0%': { transform: 'translateY(40%)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
},
animation: {
  'dash-fade-up':  'dash-fade-up 500ms cubic-bezier(0.16, 1, 0.3, 1) both',
  'dash-draw':     'dash-draw 1.6s cubic-bezier(0.4, 0, 0.2, 1) both',
  'dash-pulse':    'dash-pulse 2.4s ease-in-out infinite',
  'dash-ripple':   'dash-ripple 3s ease-out infinite',
  'dash-scan':     'dash-scan 6s linear infinite',
  'dash-aurora':   'dash-aurora 18s ease-in-out infinite',
  'dash-shimmer':  'dash-shimmer 2.4s linear infinite',
  'dash-ticker':   'dash-ticker 40s linear infinite',
  'dash-blink':    'dash-blink 1.6s ease-in-out infinite',
  'dash-count-up': 'dash-count-up 600ms cubic-bezier(0.16, 1, 0.3, 1) both',
},
```
