# `DataTable` — Compact Tabular Data within a Panel

> A high-density table for "long-stop tickets", "alerts log", or "device status". Different from the full Admin DataTable: this is **embedded** inside a `PanelShell`, not a page.

---

## Mandatory tokens

| Token path | Purpose |
|---|---|
| `colors.surface.1` | Row background (alternating) |
| `colors.surface.2` | Header background |
| `colors.border.faint` | Row separator |
| `colors.ink.default / muted` | Cell text |
| `colors.accent.{green,amber,red}` | Status cell tone |
| `typography.size.micro / caption` | Cell text |
| `motion.duration.fast` | Row hover transition |

## Recommended props

```ts
interface DataTableProps<T> {
  columns: ColumnDef<T>[]
  data: T[]
  /** Row height mode */
  density?: 'compact' | 'normal'
  /** Highlight a row by index (e.g. newly-arrived) */
  highlightIndex?: number
  /** Show a trailing "view all" link */
  showViewAll?: boolean
}

interface ColumnDef<T> {
  key: keyof T | string
  label: string
  align?: 'left' | 'right' | 'center'
  width?: string         // CSS grid value
  /** Format function for the cell value */
  format?: (value: any, row: T) => string
  /** Status cell: tone by row value */
  statusTone?: (row: T) => 'green' | 'amber' | 'red' | 'neutral'
}
```

## Pitfalls

### ❌ Pitfall 1: HTML table inside flex panel causes overflow

```ts
// ❌ A `<table>` is not flex-friendly; horizontal overflow inside a card is common
<a-card>
  <table>...</table>
</a-card>

// ✅ Use CSS Grid (single-row per item) — collapses cleanly at narrow widths
<div class="grid grid-cols-[2fr_1fr_1fr] items-center gap-3">
  <div v-for="row in data">
    <span>{{ row.label }}</span>
    <span>{{ row.value }}</span>
  </div>
</div>
```

### ❌ Pitfall 2: Row hover changes `background-color` (jank)

```ts
// ❌ Triggers repaint
.row:hover { background-color: rgba(255,255,255,0.05); }

// ✅ Use opacity on a pre-positioned overlay span
.row:hover .hover-bg { opacity: 1; }
.hover-bg { opacity: 0; transition: opacity 200ms; }
```

## Minimal Vue 3 template

```vue
<script setup lang="ts" generic="T extends Record<string, any>">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  columns: { key: string; label: string; align?: 'left' | 'right' | 'center'; width?: string; format?: (v: any, r: T) => string; statusTone?: (r: T) => 'green' | 'amber' | 'red' | 'neutral' }[]
  data: T[]
  density?: 'compact' | 'normal'
  highlightIndex?: number
}>(), {
  density: 'compact',
})

const gridTemplate = computed(() =>
  props.columns.map(c => c.width || '1fr').join(' ')
)

const rowHeight = computed(() => props.density === 'compact' ? 'py-1' : 'py-2')

const toneClass = {
  green: 'text-dash-accent-green',
  amber: 'text-dash-accent-amber',
  red: 'text-dash-accent-red',
  neutral: 'text-dash-text',
}
</script>

<template>
  <div class="flex flex-col">
    <!-- Header -->
    <div
      class="grid items-center gap-3 px-2.5 py-1.5 border-b border-dash-border-faint"
      :style="{ gridTemplateColumns: gridTemplate }"
    >
      <div
        v-for="col in columns"
        :key="col.key"
        :class="[
          'font-display text-dash-micro uppercase tracking-wider text-dash-text-dim',
          col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left',
        ]"
      >
        {{ col.label }}
      </div>
    </div>

    <!-- Rows -->
    <div
      v-for="(row, i) in data"
      :key="i"
      class="relative grid items-center gap-3 px-2.5 rounded-dash-sm hover:bg-dash-surface-2/40 transition-colors"
      :class="[rowHeight, highlightIndex === i ? 'bg-dash-accent-cyan/5 ring-1 ring-dash-accent-cyan/30' : '']"
      :style="{ gridTemplateColumns: gridTemplate }"
    >
      <div
        v-for="col in columns"
        :key="col.key"
        :class="[
          'font-mono text-dash-body tabular-nums truncate',
          col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left',
          col.statusTone ? toneClass[col.statusTone(row)] : 'text-dash-text',
        ]"
      >
        {{ col.format ? col.format(row[col.key], row) : row[col.key] }}
      </div>
    </div>
  </div>
</template>
```

## Acceptance check

- 0 layout shift when new row appears at top (use `<TransitionGroup>` with FLIP if needed)
- Row hover background uses `bg-dash-surface-2/40` (opacity, not RGB)
- Highlighted row has a subtle ring (`ring-1 ring-dash-accent-cyan/30`)
- Header sticky if `data.length > 8`
- Compact mode row height ≈ 28px
