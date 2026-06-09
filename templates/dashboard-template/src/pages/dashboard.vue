<script setup lang="ts">
/**
 * L1 three-column dashboard layout.
 * Hero center: Map; surrounding: Asset/Finance/Operation/Generation.
 */
import PanelShell from '@/components/dashboard/PanelShell.vue'
import MetricNumber from '@/components/dashboard/MetricNumber.vue'
import Sparkline from '@/components/dashboard/Sparkline.vue'
import {
  assetCategories, assetRows, mapPoints, chinaMapPath,
  generation24h, closureRates, weatherAlerts,
} from '@/mock/dashboard'

const toneTextClass = {
  blue: 'text-dash-accent-blue',
  cyan: 'text-dash-accent-cyan',
  green: 'text-dash-accent-green',
  violet: 'text-dash-accent-violet',
}
const toneBgClass = {
  blue: 'bg-dash-accent-blue',
  cyan: 'bg-dash-accent-cyan',
  green: 'bg-dash-accent-green',
  violet: 'bg-dash-accent-violet',
}
</script>

<template>
  <div class="h-screen w-screen overflow-hidden bg-dash-bg text-dash-text grid grid-cols-[1fr_1.4fr_1fr] grid-rows-[auto_1fr_auto] gap-2 p-2">

    <!-- Header -->
    <header class="col-span-3 flex items-center justify-between px-4 py-2 rounded-dash-lg bg-dash-panel border border-dash-border-soft animate-dash-fade-up" role="banner">
      <div class="flex items-center gap-3">
        <span class="font-dash-display text-dash-h-md text-dash-text bg-gradient-to-r from-dash-text via-dash-accent-cyan to-dash-text bg-clip-text text-transparent bg-[length:200%_auto] animate-dash-shimmer">
          Bicorne 指挥中心演示 · Dashboard Template
        </span>
        <span class="text-dash-text-dim text-dash-micro">F5 全屏沉浸</span>
      </div>
      <div class="flex items-center gap-3 text-dash-micro text-dash-text-muted" role="status" aria-live="polite">
        <span class="inline-flex items-center gap-1.5">
          <span class="w-1.5 h-1.5 rounded-full bg-dash-accent-green animate-dash-pulse" aria-hidden="true" />
          <span>SYSTEM ONLINE</span>
        </span>
        <span>TIANHE FUJIA · IOT-LINK 4.0</span>
      </div>
    </header>

    <!-- Left column -->
    <div class="row-start-2 grid grid-rows-2 gap-2 min-h-0">
      <PanelShell title="资产" eyebrow="ASSET" tone="cyan" :delay="100">
        <div class="grid grid-cols-5 gap-1">
          <div
            v-for="(cat, i) in assetCategories"
            :key="cat.key"
            class="group relative px-1 py-1.5 rounded-dash-md bg-gradient-to-br from-dash-surface-2/60 to-dash-surface-1/30 border border-dash-border-faint overflow-hidden hover:border-dash-border-soft transition-all duration-300 animate-dash-fade-up min-w-0"
            :style="{ animationDelay: `${200 + i * 60}ms` }"
          >
            <span class="absolute left-0 top-0 bottom-0 w-0.5" :class="toneBgClass[cat.tone]" style="opacity:0.6" />
            <div class="font-dash-display text-dash-micro uppercase tracking-[0.12em] text-dash-text-dim truncate">
              {{ cat.label }}
            </div>
            <div class="mt-0.5 flex items-baseline gap-0.5 min-w-0">
              <div class="flex-1 min-w-0 overflow-hidden">
                <span class="font-dash-mono text-dash-h-lg font-bold leading-none tabular-nums" :class="toneTextClass[cat.tone]">
                  <MetricNumber
                    :value="cat.value"
                    :duration="1100 + i * 80"
                    :text-class="`text-dash-h-lg font-bold leading-none tabular-nums ${toneTextClass[cat.tone]}`"
                  />
                </span>
              </div>
              <span class="font-dash-mono text-dash-micro text-dash-text-dim shrink-0">{{ cat.unit }}</span>
            </div>
            <div class="mt-0.5 font-dash-mono text-dash-micro flex items-center gap-0.5" :class="cat.trend >= 0 ? 'text-dash-accent-green' : 'text-dash-accent-red'">
              <span class="text-dash-micro">{{ cat.trend >= 0 ? '▲' : '▼' }}</span>
              <MetricNumber :value="Math.abs(cat.trend)" :decimals="1" :duration="900" suffix="%" text-class="text-dash-micro" />
            </div>
          </div>
        </div>
      </PanelShell>

      <PanelShell title="财务" eyebrow="FINANCE" tone="green" :delay="200">
        <div class="grid grid-cols-2 gap-2">
          <div
            v-for="(rate, i) in closureRates.slice(0, 4)"
            :key="rate.label"
            class="flex items-center gap-2 px-2 py-1 rounded-dash-sm bg-dash-surface-1/40 border border-dash-border-faint animate-dash-fade-up"
            :style="{ animationDelay: `${300 + i * 50}ms` }"
          >
            <span class="text-dash-micro text-dash-text-muted truncate flex-1 min-w-0">{{ rate.label }}</span>
            <span class="font-dash-mono text-dash-body font-bold text-dash-accent-green tabular-nums">
              <MetricNumber :value="rate.value" :decimals="1" :duration="900" suffix="%" text-class="text-dash-body font-bold text-dash-accent-green" />
            </span>
          </div>
        </div>
      </PanelShell>
    </div>

    <!-- Center column -->
    <div class="row-start-2 grid grid-rows-[1fr_auto] gap-2 min-h-0">
      <PanelShell title="全国运维分布" eyebrow="GEO · MAP" tone="cyan" :delay="300" density="tight">
        <div class="relative flex-1 min-h-0">
          <svg
            viewBox="0 0 1000 800"
            class="w-full h-full text-dash-accent-cyan"
            role="img"
            aria-label="中国运维地理分布图，含电站、运维点位置与状态指示"
          >
            <title>全国运维分布地图</title>
            <desc>含运维点 12 个，其中关键 2 个、警告 3 个、正常 7 个</desc>
            <path
              :d="chinaMapPath"
              class="fill-dash-accent-cyan/[0.06] stroke-dash-accent-cyan/55"
              stroke-width="0.8"
              aria-hidden="true"
            />
            <g v-for="(p, i) in mapPoints" :key="p.code">
              <circle
                v-if="p.status !== 'normal'"
                :cx="p.cx" :cy="p.cy" r="0.6" fill="none"
                :class="p.status === 'critical' ? 'text-dash-accent-red' : 'text-dash-accent-amber'"
                stroke-width="0.15"
                opacity="0.5"
                class="animate-dash-ripple"
                aria-hidden="true"
              />
              <circle
                :cx="p.cx" :cy="p.cy" r="0.8"
                :class="p.status === 'critical' ? 'fill-dash-accent-red' : p.status === 'warning' ? 'fill-dash-accent-amber' : 'fill-dash-accent-green'"
                class="animate-dash-fade-up"
                :style="{ animationDelay: `${400 + i * 40}ms` }"
                aria-hidden="true"
              />
            </g>
          </svg>
        </div>
      </PanelShell>

      <PanelShell title="运营" eyebrow="OPERATION" tone="violet" :delay="400" density="tight">
        <div class="grid grid-cols-4 gap-2">
          <div
            v-for="(row, i) in assetRows"
            :key="row.label"
            class="flex flex-col items-center py-1.5 rounded-dash-sm bg-dash-surface-1/40 border border-dash-border-faint animate-dash-fade-up"
            :style="{ animationDelay: `${500 + i * 60}ms` }"
          >
            <div class="font-dash-display text-dash-micro text-dash-text-dim">{{ row.label }}</div>
            <div class="font-dash-mono text-dash-h-lg font-bold tabular-nums text-dash-text mt-0.5">
              <MetricNumber :value="row.value" :duration="900" text-class="text-dash-h-lg font-bold tabular-nums text-dash-text" />
            </div>
            <div class="font-dash-mono text-dash-micro mt-0.5" :class="row.change >= 0 ? 'text-dash-accent-green' : 'text-dash-accent-red'">
              <span>{{ row.change >= 0 ? '▲' : '▼' }}</span>
              <MetricNumber :value="Math.abs(row.change)" :duration="800" text-class="text-dash-micro" />
            </div>
          </div>
        </div>
      </PanelShell>
    </div>

    <!-- Right column -->
    <div class="row-start-2 grid grid-rows-2 gap-2 min-h-0">
      <PanelShell title="发电" eyebrow="GENERATION" tone="cyan" :delay="500">
        <div class="grid grid-cols-2 gap-2">
          <div class="col-span-2 flex items-baseline gap-2 px-2 py-1 rounded-dash-sm bg-dash-surface-1/40 border border-dash-border-faint">
            <span class="font-dash-display text-dash-micro text-dash-text-dim">总发电量</span>
            <span class="font-dash-mono text-dash-metric-lg font-bold leading-none text-dash-accent-cyan tabular-nums">
              <MetricNumber :value="8462" :duration="1400" text-class="text-dash-metric-lg font-bold text-dash-accent-cyan" />
            </span>
            <span class="font-dash-mono text-dash-micro text-dash-text-dim shrink-0">万 kWh</span>
          </div>
          <div class="col-span-2 h-16 text-dash-accent-cyan">
            <Sparkline :data="generation24h" :width="280" :height="50" />
          </div>
          <div class="col-span-2 grid grid-cols-2 gap-2 text-dash-micro">
            <div class="flex items-center justify-between px-2 py-1 rounded-dash-sm bg-dash-surface-1/40">
              <span class="text-dash-text-dim">INSTALLED</span>
              <span class="font-dash-mono font-bold text-dash-accent-cyan tabular-nums">
                <MetricNumber :value="4286" :duration="1100" suffix=" MWp" text-class="text-dash-body font-bold text-dash-accent-cyan" />
              </span>
            </div>
            <div class="flex items-center justify-between px-2 py-1 rounded-dash-sm bg-dash-surface-1/40">
              <span class="text-dash-text-dim">ONLINE</span>
              <span class="font-dash-mono font-bold text-dash-accent-green tabular-nums">
                <MetricNumber :value="97.6" :decimals="1" :duration="1100" suffix="%" text-class="text-dash-body font-bold text-dash-accent-green" />
              </span>
            </div>
          </div>
        </div>
      </PanelShell>

      <PanelShell title="告警" eyebrow="ALERTS" tone="amber" :delay="600" density="tight">
        <div class="flex gap-2 overflow-x-auto">
          <div
            v-for="(w, i) in weatherAlerts"
            :key="w.id"
            class="shrink-0 min-w-[200px] flex items-center gap-2 px-2 py-1.5 rounded-md border border-dash-border-faint bg-dash-surface-1/40 animate-dash-fade-up"
            :style="{ animationDelay: `${700 + i * 50}ms` }"
          >
            <span class="w-1.5 h-1.5 rounded-full" :class="w.level === 'orange' ? 'bg-dash-accent-amber' : 'bg-dash-accent-blue'" />
            <span class="text-dash-micro text-dash-text-dim">{{ w.date }}</span>
            <span class="text-dash-micro text-dash-text truncate">{{ w.region }}</span>
          </div>
        </div>
      </PanelShell>
    </div>

    <!-- Footer: ticker -->
    <footer class="col-span-3 flex items-center gap-3 px-3 py-1.5 rounded-dash-md bg-dash-panel border border-dash-border-soft text-dash-caption overflow-hidden" role="contentinfo" aria-label="气象预警实时滚动">
      <span class="font-dash-display text-dash-micro uppercase tracking-widest text-dash-text-dim shrink-0" aria-hidden="true">⚡ WEATHER</span>
      <div class="flex-1 min-w-0 overflow-hidden">
        <div class="flex gap-3 animate-dash-ticker" style="animation-duration: 40s" aria-live="off">
          <span v-for="w in weatherAlerts" :key="w.id" class="shrink-0 font-dash-mono text-dash-caption text-dash-text-muted">
            {{ w.type }} · {{ w.region }} · {{ w.confidence }}%
          </span>
          <span v-for="w in weatherAlerts" :key="`c-${w.id}`" aria-hidden="true" class="shrink-0 font-dash-mono text-dash-caption text-dash-text-muted">
            {{ w.type }} · {{ w.region }} · {{ w.confidence }}%
          </span>
        </div>
      </div>
    </footer>
  </div>
</template>
