# L6. Header-Heavy Layout

> Top header carries primary live data (ticker, market, weather). Charts below.

## When to use

- Live data IS the focus (real-time prices, weather radar, news)
- Charts are secondary
- User looks at the top constantly; charts are reference

## Vue 3 template

```vue
<template>
  <div class="h-screen w-screen overflow-hidden bg-dash-bg text-dash-text grid grid-rows-[auto_220px_1fr] gap-2 p-2">
    <header class="flex items-center justify-between px-4 py-2 rounded-dash-lg bg-dash-panel border border-dash-border-soft">
      <DashboardHeader />
    </header>

    <!-- Live ticker strip -->
    <PanelShell title="实时行情 · LIVE" eyebrow="TICKER" density="tight" :corners="false">
      <slot name="ticker" />
    </PanelShell>

    <!-- Bottom: 3 chart panels -->
    <div class="grid grid-cols-3 gap-2 min-h-0">
      <slot name="chart-1" />
      <slot name="chart-2" />
      <slot name="chart-3" />
    </div>
  </div>
</template>
```

## Pitfalls

- Ticker height should be **fixed** (`220px`) — content drives scroll, not container
- Ticker uses `<Ticker :duration="40">` for smooth continuous scroll
- Header should include: title, tabs (optional), status icons, refresh timer
