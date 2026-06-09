<script setup lang="ts">
/**
 * StatusBar — iOS 状态栏（44pt，含 safe-area-inset-top）
 * 展示当前时间 + signal/wifi/battery 三个指示。
 * Mobile-web 强制项：safe-area-inset-top 必须应用到 status bar 容器。
 */
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  /** 自定义时间（默认动态当前时间，HH:MM 格式） */
  time?: string
  /** 暗色图标（黑底白图标），亮色图标（白底黑图标） */
  theme?: 'dark' | 'light'
}>(), {
  theme: 'dark',
})

/** 格式化当前时间（HH:MM 24h） */
const now = computed(() => {
  if (props.time) return props.time
  const d = new Date()
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
})

const iconColor = computed(() => props.theme === 'dark' ? 'text-mob-text' : 'text-black')
</script>

<template>
  <div
    class="flex items-center justify-between px-6 pt-safe h-11 text-mob-micro"
    :class="iconColor"
    :style="{ paddingTop: 'calc(env(safe-area-inset-top) + 4px)' }"
  >
    <!-- Time (left) -->
    <span class="text-mob-caption font-semibold tabular-nums w-12 text-left">
      {{ now }}
    </span>

    <!-- Notch placeholder (center) -->
    <div class="w-24 h-6 rounded-mob-pill bg-black" />

    <!-- Indicators (right) -->
    <div class="flex items-center gap-1 w-12 justify-end">
      <!-- Signal: 4 bars -->
      <svg viewBox="0 0 18 12" class="h-3 w-4" fill="currentColor" aria-hidden="true">
        <rect x="0"  y="8"  width="3" height="4"  rx="0.5" />
        <rect x="5"  y="6"  width="3" height="6"  rx="0.5" />
        <rect x="10" y="3"  width="3" height="9"  rx="0.5" />
        <rect x="15" y="0"  width="3" height="12" rx="0.5" />
      </svg>
      <!-- WiFi -->
      <svg viewBox="0 0 16 12" class="h-3 w-4" fill="currentColor" aria-hidden="true">
        <path d="M8 11.5l1.8-1.8a2.5 2.5 0 0 0-3.6 0L8 11.5z" />
        <path d="M3.4 6.9a6.5 6.5 0 0 1 9.2 0l1.1-1.1a8 8 0 0 0-11.4 0l1.1 1.1z" opacity="0.85" />
        <path d="M5.6 9.1a4 4 0 0 1 4.8 0l1.1-1.1a5.5 5.5 0 0 0-7 0L5.6 9.1z" opacity="0.7" />
      </svg>
      <!-- Battery -->
      <svg viewBox="0 0 26 12" class="h-3 w-6" fill="none" aria-hidden="true">
        <rect x="0.5" y="0.5" width="22" height="11" rx="2.5" stroke="currentColor" stroke-opacity="0.4" />
        <rect x="2" y="2" width="19" height="8" rx="1.5" fill="currentColor" />
        <rect x="24" y="4" width="1.5" height="4" rx="0.5" fill="currentColor" fill-opacity="0.4" />
      </svg>
    </div>
  </div>
</template>
