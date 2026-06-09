---
name: ui-states
description: Loading, empty, error, offline, stale, and success states for dashboards. With 6 Vue 3 templates and a decision matrix for which state to use when.
keywords: ui-states, loading, empty, error, offline, stale, success
---

# Dashboard UI States

> Dashboards are real-time. Data is constantly changing. Network is sometimes down. The system has **6 normal states**, not just 2 (loading + success).

---

## The 6 states

| # | State | When | UX goal |
|---|---|---|---|
| 1 | **Loading** | Initial mount, no data yet | Show skeleton, do not blank the screen |
| 2 | **Refreshing** | Data exists, new fetch in progress | Keep old data, show subtle "syncing" indicator |
| 3 | **Empty** | Query returned 0 rows | "暂无数据" with a clear reason + suggested action |
| 4 | **Error** | Fetch failed (HTTP 5xx) | "数据源中断" with retry button |
| 5 | **Offline** | Network disconnected | "网络异常" with last-updated timestamp |
| 6 | **Stale** | Last fetch > 5 min ago | Show data with "数据可能过时" warning |

---

## Decision matrix

```
First mount?
  ├─ Yes → state = loading
  └─ No, data exists
       ├─ Is fetch in progress? → state = refreshing
       ├─ Did fetch fail? → state = error
       ├─ Is network down? → state = offline
       ├─ Is data > 5 min old? → state = stale (overlay warning)
       ├─ Is result 0 rows? → state = empty
       └─ Else → state = success
```

---

## 1. Loading (skeleton)

```vue
<script setup lang="ts">
defineProps<{ rows?: number }>()
</script>

<template>
  <div class="space-y-2">
    <div
      v-for="i in rows ?? 4"
      :key="i"
      class="h-8 rounded-dash-sm bg-gradient-to-r from-dash-surface-2/50 via-dash-surface-3/30 to-dash-surface-2/50 bg-[length:200%_100%] animate-dash-shimmer"
    />
  </div>
</template>
```

**Don't**:
- ❌ Use a centered spinner (wastes space, doesn't show the eventual shape)
- ❌ Make the skeleton the same color as background (invisible)

## 2. Refreshing (subtle indicator)

```vue
<template>
  <div class="relative">
    <!-- existing content -->
    <slot />
    <!-- overlay indicator -->
    <div class="absolute top-2 right-2 flex items-center gap-1.5 text-dash-micro text-dash-text-muted">
      <span class="w-2 h-2 border-2 border-dash-accent-cyan border-t-transparent rounded-full animate-spin" />
      <span>SYNC</span>
    </div>
  </div>
</template>
```

**Don't**:
- ❌ Block the UI during refresh — keep old data visible
- ❌ Use a full-screen modal

## 3. Empty

```vue
<script setup lang="ts">
defineProps<{ reason?: string; actionLabel?: string }>()
const emit = defineEmits<{ action: [] }>()
</script>

<template>
  <div class="flex flex-col items-center justify-center h-full text-center gap-2 p-4">
    <div class="w-12 h-12 rounded-dash-md border-2 border-dash-border-faint flex items-center justify-center text-dash-text-dim text-2xl">
      ∅
    </div>
    <div class="font-dash-display text-dash-h-md text-dash-text">暂无数据</div>
    <div v-if="reason" class="text-dash-caption text-dash-text-muted max-w-xs">
      {{ reason }}
    </div>
    <button
      v-if="actionLabel"
      class="mt-2 px-3 py-1.5 rounded-dash-md border border-dash-accent-cyan/50 text-dash-accent-cyan text-dash-caption hover:bg-dash-accent-cyan/10 transition-colors"
      @click="emit('action')"
    >
      {{ actionLabel }}
    </button>
  </div>
</template>
```

**Always include a "why"** — "当前筛选条件无匹配项目" is better than just "暂无数据".

## 4. Error (with retry)

```vue
<script setup lang="ts">
defineProps<{ message?: string }>()
const emit = defineEmits<{ retry: [] }>()
</script>

<template>
  <div class="flex flex-col items-center justify-center h-full text-center gap-2 p-4">
    <div class="w-12 h-12 rounded-dash-md border-2 border-dash-accent-red/40 flex items-center justify-center text-dash-accent-red text-2xl">
      !
    </div>
    <div class="font-dash-display text-dash-h-md text-dash-text">数据源中断</div>
    <div v-if="message" class="text-dash-caption text-dash-text-muted max-w-xs">
      {{ message }}
    </div>
    <button
      class="mt-2 px-3 py-1.5 rounded-dash-md border border-dash-accent-cyan/50 text-dash-accent-cyan text-dash-caption hover:bg-dash-accent-cyan/10 transition-colors"
      @click="emit('retry')"
    >
      重试
    </button>
  </div>
</template>
```

## 5. Offline (no network)

```vue
<script setup lang="ts">
defineProps<{ lastSync?: string }>()
</script>

<template>
  <div class="flex items-center gap-2 px-3 py-2 rounded-dash-md bg-dash-accent-amber/10 border border-dash-accent-amber/30">
    <span class="w-2 h-2 rounded-full bg-dash-accent-amber animate-dash-blink" />
    <span class="text-dash-caption text-dash-text">网络异常 · 显示最后一次同步数据</span>
    <span v-if="lastSync" class="text-dash-micro text-dash-text-dim ml-auto">
      {{ lastSync }}
    </span>
  </div>
</template>
```

## 6. Stale (warning overlay)

```vue
<script setup lang="ts">
defineProps<{ ageMinutes: number }>()
</script>

<template>
  <div v-if="ageMinutes > 5" class="absolute top-2 left-2 right-2 flex items-center gap-2 px-3 py-1.5 rounded-dash-md bg-dash-accent-amber/10 border border-dash-accent-amber/30 z-10">
    <span class="text-dash-accent-amber text-dash-micro">⚠</span>
    <span class="text-dash-caption text-dash-text-muted">
      数据可能已过时 · 最后更新 {{ ageMinutes }} 分钟前
    </span>
  </div>
</template>
```

---

## Composing in a panel

```vue
<PanelShell title="工单列表">
  <template v-if="state === 'loading'"><Skeleton :rows="4" /></template>
  <template v-else-if="state === 'error'"><ErrorState :message="error" @retry="reload" /></template>
  <template v-else-if="state === 'empty'"><EmptyState reason="当前筛选无匹配工单" /></template>
  <template v-else>
    <DataTable :data="data" />
    <RefreshingOverlay v-if="state === 'refreshing'" />
    <StaleWarning v-if="state === 'stale'" :age-minutes="5" />
  </template>
</PanelShell>
```

---

## Pitfalls

- ❌ **Don't conflate loading and error** — they're different states, different UI
- ❌ **Don't blank the screen during refresh** — show old data + "syncing" pill
- ❌ **Don't show generic "Something went wrong"** — always say *what* failed
- ❌ **Don't use a full-screen overlay** for any state — keep dashboard visible
- ✅ Always include a "what to do next" — retry button, filter adjustment, etc.
