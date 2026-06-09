<script setup lang="ts">
/**
 * MobileFeed — X-style mobile-first 主页
 * 集成：StatusBar + TopAppBar + FeedCard list + Floating Compose + BottomTabBar
 *
 * Mobile-first 关键约束：
 *   - body 文字 ≥ 16px（iOS 阈值，避免点击 input 缩放）
 *   - iOS safe area 适配（top + bottom）
 *   - 触摸目标 ≥ 44pt
 *   - 桌面端居中显示一个 390px 宽的"手机框"以模拟移动 viewport
 *   - 移动端 100% 宽度
 */
import { ref } from 'vue'
import { EditOutlined } from '@ant-design/icons-vue'
import { feed, bottomTabs, topTabs } from '@/mock/feed'
import StatusBar from '@/components/mobile/StatusBar.vue'
import TopAppBar from '@/components/mobile/TopAppBar.vue'
import FeedCard from '@/components/mobile/FeedCard.vue'
import BottomTabBar from '@/components/mobile/BottomTabBar.vue'

const activeTopTabId = ref('foryou')
const activeBottomTabId = ref('home')
</script>

<template>
  <!-- Phone frame (desktop) / full width (mobile) -->
  <div role="application" aria-label="Mobile feed app" class="min-h-screen bg-mob-bg flex justify-center">
    <div
      class="w-full max-w-[420px] min-h-screen bg-mob-bg relative flex flex-col"
    >
      <!-- iOS status bar -->
      <StatusBar />

      <!-- Sticky top app bar (logo + tabs) -->
      <TopAppBar
        :tabs="topTabs"
        :active-id="activeTopTabId"
        @change="(id) => (activeTopTabId = id)"
      />

      <!-- Feed scroll area (bottom tab bar floats above) -->
      <main
        role="main"
        aria-label="Feed"
        class="flex-1 overflow-y-auto scroll-mob pb-20"
      >
        <FeedCard
          v-for="(item, i) in feed"
          :key="item.id"
          :item="item"
          :delay="i * 40"
        />

        <!-- End-of-feed sentinel -->
        <div class="py-10 text-center text-mob-text-dim text-mob-caption" role="status" aria-label="End of feed">
          — end of feed —
        </div>
      </main>

      <!-- Floating compose button (X-style) -->
      <button
        class="fixed right-5 bottom-24 w-14 h-14 rounded-mob-pill bg-mob-accent text-mob-text-on-accent shadow-mob-elevated flex items-center justify-center active:scale-95 transition-transform z-40 max-w-[420px]"
        :style="{ right: 'max(20px, calc(50% - 210px + 20px))' }"
        aria-label="Compose new post"
      >
        <EditOutlined aria-hidden="true" style="font-size: 22px" />
      </button>

      <!-- Bottom tab bar (4 tabs, iOS safe area) -->
      <BottomTabBar
        :tabs="bottomTabs"
        :active-id="activeBottomTabId"
        @change="(id) => (activeBottomTabId = id)"
      />
    </div>
  </div>
</template>
