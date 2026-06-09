<script setup lang="ts">
/**
 * BottomTabBar — 4 tab 底部导航
 * 严格遵循 component-contract/bottom-tab-bar.md：
 *   - Touch target ≥ 44pt
 *   - iOS safe-area-inset-bottom 适配
 *   - 激活态：图标 + 文字都变色
 *   - 徽章 99+ 截断
 *   - tab 数量 4-5
 *   - 文字 ≤ 4 字符
 */
import { HomeOutlined, SearchOutlined, ThunderboltOutlined, BellOutlined } from '@ant-design/icons-vue'
import type { BottomTab } from '@/mock/feed'

defineProps<{
  tabs: BottomTab[]
  activeId: string
}>()

const emit = defineEmits<{
  change: [id: string]
}>()

const iconMap = {
  HomeOutlined,
  SearchOutlined,
  ThunderboltOutlined,
  BellOutlined,
} as const

const formatBadge = (n: number) => (n > 99 ? '99+' : String(n))
</script>

<template>
  <nav
    role="navigation"
    aria-label="Bottom navigation"
    class="fixed bottom-0 left-0 right-0 z-50 bg-mob-bg/90 backdrop-blur-xl border-t border-mob-border-subtle"
    :style="{ paddingBottom: 'env(safe-area-inset-bottom)' }"
  >
    <ul class="flex items-stretch h-14" role="tablist" aria-label="App sections">
      <li
        v-for="tab in tabs"
        :key="tab.id"
        class="flex-1 min-w-0"
      >
        <button
          :aria-label="tab.label"
          :aria-current="tab.id === activeId ? 'page' : undefined"
          :aria-selected="tab.id === activeId"
          role="tab"
          class="w-full h-14 flex flex-col items-center justify-center gap-0.5 active:scale-95 transition-transform"
          @click="emit('change', tab.id)"
        >
          <div class="relative">
            <component
              :is="iconMap[tab.icon]"
              :class="[
                'text-[22px]',
                tab.id === activeId ? 'text-mob-text' : 'text-mob-text-muted',
              ]"
              aria-hidden="true"
            />
            <span
              v-if="tab.badge && tab.badge > 0"
              :aria-label="`${tab.badge} notifications`"
              class="absolute -top-1.5 -right-3 min-w-[18px] h-[18px] px-1 rounded-mob-pill bg-mob-accent text-mob-text-on-accent text-[10px] font-semibold flex items-center justify-center tabular-nums"
            >
              {{ formatBadge(tab.badge) }}
            </span>
          </div>
          <span
            :class="[
              'text-[11px] leading-none',
              tab.id === activeId ? 'text-mob-text font-medium' : 'text-mob-text-muted',
            ]"
          >
            {{ tab.label }}
          </span>
        </button>
      </li>
    </ul>
  </nav>
</template>
