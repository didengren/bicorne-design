<script setup lang="ts">
/**
 * FeatureRow — 图标 + 标题 + 描述 + 代码/演示
 * 来自 component-contract/feature-row.md（左右交替布局）。
 * 演示位用 syntax-highlighted 代码块占位（不依赖外部资源）。
 */
import {
  ThunderboltOutlined,
  CodeOutlined,
  SafetyCertificateOutlined,
  GlobalOutlined,
  FireOutlined,
  RocketOutlined,
} from '@ant-design/icons-vue'
import type { Feature } from '@/mock/landing'

defineProps<{
  features: Feature[]
}>()

const iconMap = {
  bolt: ThunderboltOutlined,
  code: CodeOutlined,
  shield: SafetyCertificateOutlined,
  globe: GlobalOutlined,
  gauge: FireOutlined,
  sparkles: RocketOutlined,
} as const
</script>

<template>
  <section class="px-6 lg:px-12 py-20 lg:py-32 max-w-6xl mx-auto">
    <div class="text-center max-w-2xl mx-auto mb-20">
      <h2 class="font-land-display text-[32px] lg:text-land-h-xl text-land-text font-semibold tracking-[-0.02em] mb-4">
        Everything you need to ship email.
      </h2>
      <p class="text-land-body-lg text-land-text-muted">
        From the first test send to billions of production emails — one API, one SDK, one dashboard.
      </p>
    </div>

    <div class="flex flex-col gap-24 lg:gap-32">
      <div
        v-for="(feat, i) in features"
        :key="feat.id"
        class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
        :class="i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''"
      >
        <!-- 文字列 -->
        <div
          class="animate-land-fade-up"
          :style="{ animationDelay: `${i * 80}ms` }"
        >
          <div class="inline-flex items-center justify-center w-10 h-10 rounded-land-md bg-land-accent-soft text-land-accent mb-5">
            <component :is="iconMap[feat.icon]" style="font-size: 20px" />
          </div>
          <h3 class="font-land-display text-land-h-lg text-land-text font-semibold mb-3">
            {{ feat.title }}
          </h3>
          <p class="text-land-body-lg text-land-text-muted max-w-md">
            {{ feat.description }}
          </p>
        </div>

        <!-- 代码/演示列 -->
        <div
          class="rounded-land-xl border border-land-border-soft bg-land-surface-2 shadow-land-elevated overflow-hidden animate-land-fade-up"
          :style="{ animationDelay: `${i * 80 + 100}ms` }"
        >
          <div class="flex items-center gap-1.5 px-4 py-2.5 border-b border-land-border-soft bg-land-surface-3">
            <span class="w-2.5 h-2.5 rounded-full bg-land-mac-red" />
            <span class="w-2.5 h-2.5 rounded-full bg-land-mac-yellow" />
            <span class="w-2.5 h-2.5 rounded-full bg-land-mac-green" />
            <span class="ml-3 text-land-micro text-land-text-dim font-land-mono">
              {{ feat.id === 'f1' ? 'send-email.ts' : feat.id === 'f2' ? 'welcome.tsx' : 'webhook.json' }}
            </span>
          </div>
          <pre class="p-5 text-land-caption font-land-mono text-land-text leading-[1.7] overflow-x-auto"><code>{{ feat.codeSnippet }}</code></pre>
        </div>
      </div>
    </div>
  </section>
</template>
