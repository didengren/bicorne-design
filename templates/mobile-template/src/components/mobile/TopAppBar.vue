<script setup lang="ts">
/**
 * TopAppBar — 顶部 app bar
 * X 风格：左 avatar / 中 tabs（For you / Following）/ 右 设置 icon
 * sticky 顶部，毛玻璃背景。
 */
import { SettingOutlined } from '@ant-design/icons-vue'
import type { TopTab } from '@/mock/feed'

const props = withDefaults(defineProps<{
  tabs: TopTab[]
  activeId: string
  /** 顶部品牌 logo（默认 X） */
  brand?: 'x' | 'default'
}>(), {
  brand: 'x',
})

const emit = defineEmits<{
  change: [id: string]
}>()
</script>

<template>
  <header
    role="banner"
    aria-label="Top app bar"
    class="sticky top-0 z-30 bg-mob-bg/80 backdrop-blur-xl border-b border-mob-border-faint"
  >
    <!-- Bar row -->
    <div class="h-12 flex items-center justify-between px-4">
      <!-- Left: avatar circle -->
      <button
        class="w-8 h-8 rounded-mob-pill bg-gradient-to-br from-mob-accent to-mob-success flex items-center justify-center text-mob-text-on-accent text-mob-caption font-semibold"
        aria-label="Your profile"
      >
        M
      </button>

      <!-- Center: brand logo (X) -->
      <div class="w-8 h-8 flex items-center justify-center" role="img" aria-label="X logo">
        <svg viewBox="0 0 32 32" class="w-6 h-6" fill="currentColor" aria-hidden="true">
          <path d="M11 7h3l5 7 5-7h3l-6.5 9L27 25h-3l-5-7-5 7h-3l6.5-9L11 7z" />
        </svg>
      </div>

      <!-- Right: settings -->
      <button
        class="w-8 h-8 flex items-center justify-center text-mob-text-muted hover:text-mob-text transition-colors"
        aria-label="Open settings"
      >
        <SettingOutlined aria-hidden="true" style="font-size: 18px" />
      </button>
    </div>

    <!-- Tabs row -->
    <div role="tablist" aria-label="Feed sections" class="flex border-b border-mob-border-faint">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        role="tab"
        :aria-selected="tab.id === activeId"
        :aria-label="`Switch to ${tab.label} feed`"
        class="flex-1 h-12 flex items-center justify-center relative transition-colors"
        :class="tab.id === activeId ? 'text-mob-text font-semibold' : 'text-mob-text-muted hover:text-mob-text'"
        @click="emit('change', tab.id)"
      >
        <span class="text-mob-body">{{ tab.label }}</span>
        <span
          v-if="tab.id === activeId"
          aria-hidden="true"
          class="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 rounded-mob-pill bg-mob-accent"
        />
      </button>
    </div>
  </header>
</template>
