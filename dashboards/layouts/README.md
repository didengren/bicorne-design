---
name: dashboard-layouts
description: 8 battle-tested dashboard layout templates. Each one is a copy-paste grid container that distributes panels for command centers, monitoring screens, and data walls.
keywords: layout, grid, dashboard, command-center, monitor
---

# Dashboard Layouts — 8 Templates

> Every dashboard fits into one of 8 layout archetypes. Pick one based on **what information matters most** and **how the user scans it**.

---

## Decision matrix

| Layout | When to use | Hero panel | Best for |
|---|---|---|---|
| **L1. Three-column** | Equal-weight 3-5 modules | none (or center) | Asset + Operation + Generation view |
| **L2. Map-dominant** | Geographic context is key | Map (center, 50% width) | National / regional command center |
| **L3. KPI-wall** | Many small stats to monitor at once | none (uniform grid) | NOC, status monitor |
| **L4. Detail focus** | One big module + supporting context | Right side (60%) | Drill-down / incident view |
| **L5. Tab-switch** | User toggles between contexts | Active tab's center | Multi-tenant / multi-site |
| **L6. Header-heavy** | Top bar carries primary info | Bottom 70% | Weather / market / news with chart below |
| **L7. Two-row split** | Top is overview, bottom is detail | Bottom row | E.g. status + alert log |
| **L8. Centered stage** | Symmetric with featured hero panel | Center (single big panel) | "Today's numbers" landing |

---

## L1. Three-column (default)

```vue
<template>
  <div class="h-screen grid grid-cols-[1fr_1.4fr_1fr] grid-rows-[auto_1fr] gap-2 p-2">
    <!-- Header spans all columns -->
    <header class="col-span-3 row-start-1">...</header>

    <!-- Left column -->
    <div class="row-start-2 grid grid-rows-2 gap-2 min-h-0">
      <PanelShell title="资产" eyebrow="ASSET">...</PanelShell>
      <PanelShell title="财务" eyebrow="FINANCE">...</PanelShell>
    </div>

    <!-- Center column (40% wider) -->
    <div class="row-start-2 grid grid-rows-[1fr_auto] gap-2 min-h-0">
      <PanelShell title="全国运维分布" eyebrow="GEO · MAP">...</PanelShell>
      <PanelShell title="运营" eyebrow="OPERATION">...</PanelShell>
    </div>

    <!-- Right column -->
    <div class="row-start-2 grid grid-rows-2 gap-2 min-h-0">
      <PanelShell title="发电" eyebrow="GENERATION">...</PanelShell>
      <PanelShell title="财务" eyebrow="FINANCE">...</PanelShell>
    </div>
  </div>
</template>
```

**Use when**: 3 main domains (e.g. Asset, Operation, Generation) with a hero map in the middle.

---

## L2. Map-dominant

```vue
<template>
  <div class="h-screen grid grid-cols-[280px_1fr_280px] grid-rows-[auto_1fr] gap-2 p-2">
    <header class="col-span-3">...</header>

    <!-- Left: lists / breakdown -->
    <div class="grid grid-rows-4 gap-2 min-h-0">
      <PanelShell title="省份 Top 5">...</PanelShell>
      <PanelShell title="设备分布">...</PanelShell>
      <PanelShell title="服务区">...</PanelShell>
      <PanelShell title="团队">...</PanelShell>
    </div>

    <!-- Center: map (50%+ of viewport) -->
    <div class="min-h-0">
      <PanelShell title="全国分布" eyebrow="GEO" density="tight">
        <MapPanel :points="..." :map-path="..." />
      </PanelShell>
    </div>

    <!-- Right: KPIs -->
    <div class="grid grid-rows-3 gap-2 min-h-0">
      <PanelShell title="总量">...</PanelShell>
      <PanelShell title="环比">...</PanelShell>
      <PanelShell title="同比">...</PanelShell>
    </div>
  </div>
</template>
```

**Use when**: Geography IS the product (national grid, sales territory, fleet routing).

---

## L3. KPI-wall (uniform 4×3 grid)

```vue
<template>
  <div class="h-screen grid grid-cols-4 grid-rows-[auto_1fr_1fr_1fr] gap-2 p-2">
    <header class="col-span-4">...</header>
    <PanelShell v-for="kpi in 4" :key="`k-${kpi}`" class="min-h-0">...</PanelShell>
    <PanelShell v-for="chart in 4" :key="`c-${chart}`" class="min-h-0">...</PanelShell>
    <PanelShell v-for="log in 4" :key="`l-${log}`" class="min-h-0">...</PanelShell>
  </div>
</template>
```

**Use when**: 12 modules, all equal weight. Operations center / NOC wall.

---

## L4. Detail focus (one big + sidebar)

```vue
<template>
  <div class="h-screen grid grid-cols-[320px_1fr] grid-rows-[auto_1fr] gap-2 p-2">
    <header class="col-span-2">...</header>

    <!-- Left sidebar: list -->
    <div class="grid grid-rows-[auto_1fr] gap-2 min-h-0">
      <PanelShell title="项目列表">...</PanelShell>
      <PanelShell title="设备列表">...</PanelShell>
    </div>

    <!-- Right: hero (60% wide) -->
    <div class="grid grid-rows-[1fr_auto] gap-2 min-h-0">
      <PanelShell title="详情" eyebrow="DETAIL">
        <DetailContent />
      </PanelShell>
      <PanelShell title="相关时间线" density="tight">...</PanelShell>
    </div>
  </div>
</template>
```

**Use when**: User wants to drill into ONE project / ONE incident at a time.

---

## L5. Tab-switch (multi-context)

```vue
<template>
  <div class="h-screen grid grid-rows-[auto_auto_1fr] gap-2 p-2">
    <header>...</header>

    <!-- Tab bar -->
    <div class="flex items-center gap-1 px-2">
      <button v-for="tab in tabs" :key="tab.key"
              :class="['px-4 py-1.5 rounded text-dash-h-md', active === tab.key ? 'bg-dash-accent-cyan/15 text-dash-accent-cyan' : 'text-dash-text-muted']"
              @click="active = tab.key">
        {{ tab.label }}
      </button>
    </div>

    <!-- Tab content: same layout, different data -->
    <div class="grid grid-cols-[1fr_1.4fr_1fr] gap-2 min-h-0">
      <PanelShell v-if="active === 'asset'">...</PanelShell>
      <PanelShell v-else-if="active === 'operation'">...</PanelShell>
      ...
    </div>
  </div>
</template>
```

**Use when**: User needs to switch between tenants / sites / products but UI shell stays the same.

---

## L6. Header-heavy (ticker + cards below)

```vue
<template>
  <div class="h-screen grid grid-rows-[auto_180px_1fr] gap-2 p-2">
    <header>...</header>

    <!-- Wide banner: live ticker / market -->
    <PanelShell title="实时行情" density="tight">
      <Ticker :items="..." />
    </PanelShell>

    <!-- Bottom: detail charts -->
    <div class="grid grid-cols-3 gap-2 min-h-0">
      <PanelShell v-for="chart in 3">...</PanelShell>
    </div>
  </div>
</template>
```

**Use when**: Live data is the focus (weather, stocks, news), charts are secondary.

---

## L7. Two-row split (overview + detail)

```vue
<template>
  <div class="h-screen grid grid-rows-[auto_1fr_1fr] gap-2 p-2">
    <header>...</header>

    <!-- Top row: 4 KPI tiles -->
    <div class="grid grid-cols-4 gap-2 min-h-0">
      <PanelShell v-for="kpi in 4">...</PanelShell>
    </div>

    <!-- Bottom row: 2 wide panels -->
    <div class="grid grid-cols-2 gap-2 min-h-0">
      <PanelShell title="事件流">...</PanelShell>
      <PanelShell title="趋势">...</PanelShell>
    </div>
  </div>
</template>
```

**Use when**: Want a "status snapshot" up top, drill-down below.

---

## L8. Centered stage (symmetric, 1 hero)

```vue
<template>
  <div class="h-screen grid grid-rows-[auto_1fr] gap-2 p-2">
    <header>...</header>

    <div class="grid grid-cols-[1fr_2fr_1fr] gap-2 min-h-0">
      <!-- Left: 3 stacked -->
      <div class="grid grid-rows-3 gap-2 min-h-0">
        <PanelShell v-for="i in 3">...</PanelShell>
      </div>

      <!-- Center: 1 huge hero -->
      <PanelShell title="今日运营" eyebrow="HERO">
        <HeroContent />
      </PanelShell>

      <!-- Right: 3 stacked -->
      <div class="grid grid-rows-3 gap-2 min-h-0">
        <PanelShell v-for="i in 3">...</PanelShell>
      </div>
    </div>
  </div>
</template>
```

**Use when**: "Today's numbers" landing page, exec dashboard.

---

## Common layout invariants

Regardless of which layout you pick:

- **Header is auto-height** (`grid-rows-[auto_1fr]`)
- **All non-header rows have `min-h-0`** — critical for nested overflow
- **Gap is `gap-2` to `gap-3`** (8-12px). Larger gaps eat space.
- **Padding is `p-2` to `p-3`**
- **Use `grid-cols-[Xfr_Yfr_Zfr]` for unequal columns** (e.g. center wider)
- **Don't use `h-screen` + `overflow-hidden` on outer container** — use inner `min-h-0` panels

## Responsive degradation

For ≤ 1024px viewports, switch from `grid-cols-3` to `grid-cols-1` (or `grid-cols-2` for tablet). See [../methodology/responsive-degradation.md](../methodology/responsive-degradation.md) for the full breakpoint system.

```ts
// Recommended Tailwind breakpoints
'sm':  640,    // mobile
'md':  768,    // tablet
'lg':  1024,   // small laptop
'xl':  1280,   // desktop
'2xl': 1536,   // large desktop
'3xl': 1920,   // 4K / command center
```

For command center, **don't degrade** — assume 1920×1080 minimum. If below, show "minimum resolution" placeholder.
