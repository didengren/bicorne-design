# L5. Tab-Switch Layout

> User toggles between contexts (tenants, sites, products). Same shell, different data.

## When to use

- Multi-tenant / multi-site views
- User needs to switch contexts quickly
- Shell + header is consistent; main content changes

## Vue 3 template

```vue
<template>
  <div class="h-screen w-screen overflow-hidden bg-dash-bg text-dash-text grid grid-rows-[auto_auto_1fr] gap-2 p-2">
    <header>...</header>

    <!-- Tab bar -->
    <div class="flex items-center gap-1 px-2 border-b border-dash-border-soft">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        :class="[
          'px-4 py-2 text-dash-h-md transition-colors',
          activeKey === tab.key
            ? 'text-dash-accent-cyan border-b-2 border-dash-accent-cyan'
            : 'text-dash-text-muted hover:text-dash-text'
        ]"
        @click="activeKey = tab.key"
      >
        {{ tab.label }}
        <span v-if="tab.count" class="ml-2 text-dash-micro text-dash-text-dim">{{ tab.count }}</span>
      </button>
    </div>

    <!-- Tab content: same layout, different data -->
    <div class="grid grid-cols-[1fr_1.4fr_1fr] gap-2 min-h-0">
      <slot name="content" :active-key="activeKey" />
    </div>
  </div>
</template>
```

## Pitfalls

- ❌ Don't keep ALL data loaded — switch with `v-show` or `<KeepAlive>` carefully
- ❌ Don't reset panel entrance animations on tab switch (only on first mount)
- ✅ Use `<Transition mode="out-in">` between tab content if re-mounting is needed
