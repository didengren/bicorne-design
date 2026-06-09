# `PanelShell` — Dashboard Panel Container

> The card that wraps every dashboard module. Adds tone color, density mode, scan-line decoration, and entrance animation.

---

## Mandatory tokens (from `token.json`)

| Token path | Purpose |
|---|---|
| `colors.surface.1` | Panel base background |
| `colors.surface.2` | Panel gradient stop |
| `colors.border.soft` | Panel border |
| `colors.accent.{blue,cyan,green,violet,amber,red}` | Per-tone accent |
| `shadows.panel` | Panel elevation shadow |
| `shadows.glow.{soft,strong}` | Hover glow |
| `borderRadius.lg` | Panel corner radius |
| `animations.panelIn` (or `fadeIn`/`rise`) | Entrance animation |
| `motion.duration` | Hover transition duration |
| `motion.easing.standard` | Hover easing |

## Recommended props

```ts
interface PanelShellProps {
  /** Module title (Chinese) */
  title: string
  /** Eyebrow label, all caps, e.g. "ASSET" / "GENERATION" */
  eyebrow: string
  /** Accent color theme */
  tone?: 'blue' | 'cyan' | 'green' | 'violet' | 'amber' | 'red'
  /** Content padding density */
  density?: 'tight' | 'normal' | 'loose'
  /** Staggered entrance delay (ms) */
  delay?: number
  /** Show top scan-line decoration */
  scan?: boolean
  /** Show 4 corner L-bracket decoration */
  corners?: boolean
  /** Slot for right-side action buttons in title bar */
}
```

## CSS utility binding

- Base: `bg-dash-panel border border-dash-border-soft rounded-dash-lg shadow-dash-panel backdrop-blur-sm`
- Animation: `animate-dash-fade-up` with inline `animationDelay: ${delay}ms`
- Scan line: `<ScanOverlay />` component or top gradient line
- Tone accent: `bg-gradient-to-r from-transparent via-dash-accent-{tone} to-transparent` at top

## Pitfalls

- ❌ Do not pass `padding` via `<a-card :bodyStyle>` — Ant Design default is 24px which conflicts with `tight` density; use Tailwind class on inner wrapper instead
- ❌ Do not animate the panel `height` — it triggers layout; use `transform: translateY` only
- ❌ Do not set `delay` per-item without also setting `--dash-delay` CSS var — animationDelay on the element will not be inherited by child animations
- ✅ Always wrap content in a `flex flex-col gap-{value}` container for consistent vertical rhythm

## Minimal Vue 3 template

```vue
<script setup lang="ts">
interface Props {
  title: string
  eyebrow: string
  tone?: 'blue' | 'cyan' | 'green' | 'violet' | 'amber' | 'red'
  density?: 'tight' | 'normal' | 'loose'
  delay?: number
  scan?: boolean
  corners?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  tone: 'cyan',
  density: 'normal',
  delay: 0,
  scan: true,
  corners: true,
})

const toneClass = computed(() => {
  const map = { blue: 'text-dash-accent-blue', cyan: 'text-dash-accent-cyan', /* ... */ }
  return map[props.tone]
})

const paddingMap = { tight: 'p-2.5', normal: 'p-3.5', loose: 'p-5' }
</script>

<template>
  <a-card
    bordered
    :class="`relative h-full !bg-dash-panel shadow-dash-panel border border-dash-border-soft rounded-dash-lg overflow-hidden backdrop-blur-sm animate-dash-fade-up`"
    :style="{ animationDelay: `${delay}ms` }"
  >
    <!-- scan line -->
    <span
      v-if="scan"
      class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-50"
      :class="toneClass"
    />
    <!-- 4 corner brackets -->
    <CornerFrame v-if="corners" :tone="tone" />

    <!-- header -->
    <div class="flex items-center justify-between mb-2.5">
      <div class="flex items-baseline gap-2">
        <span class="font-display text-dash-micro uppercase tracking-[0.2em] text-dash-text-dim">
          {{ eyebrow }}
        </span>
        <h3 class="font-display text-dash-h-md font-semibold text-dash-text">
          {{ title }}
        </h3>
      </div>
      <slot name="actions" />
    </div>

    <!-- body -->
    <div :class="['flex flex-col gap-2.5', paddingMap[density]]">
      <slot />
    </div>
  </a-card>
</template>
```

## Acceptance check

- 0 console error on mount
- Panel enters with 100-300ms staggered delay (per `--dash-delay`)
- On hover, border brightens from `border-dash-border-soft` to `border-dash-accent-{tone}/50`
- No layout shift on entrance (use `opacity` + `translateY`, never `height`)
