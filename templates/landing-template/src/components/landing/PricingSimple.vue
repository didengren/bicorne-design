<script setup lang="ts">
/**
 * PricingSimple — 2-3 档价格表 + 推荐档高亮
 * 来自 component-contract/pricing-simple.md。
 * 推荐档用 accent border + 顶部 "Most popular" 徽章。
 */
import { CheckOutlined } from '@ant-design/icons-vue'
import type { PricingTier } from '@/mock/landing'

defineProps<{
  tiers: PricingTier[]
}>()
</script>

<template>
  <section class="px-6 lg:px-12 py-20 lg:py-32 max-w-6xl mx-auto">
    <div class="text-center max-w-2xl mx-auto mb-16">
      <h2 class="font-land-display text-[32px] lg:text-land-h-xl text-land-text font-semibold tracking-[-0.02em] mb-4">
        Simple, transparent pricing
      </h2>
      <p class="text-land-body-lg text-land-text-muted">
        Pay only for what you send. No hidden fees, no per-seat costs, no surprise overages.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
      <div
        v-for="(tier, i) in tiers"
        :key="tier.id"
        class="relative flex flex-col p-8 rounded-land-2xl border animate-land-fade-up"
        :class="tier.highlighted
          ? 'border-land-accent shadow-land-hero bg-land-surface-1 lg:scale-[1.02]'
          : 'border-land-border-soft bg-land-surface-1 shadow-land-panel'"
        :style="{ animationDelay: `${i * 100}ms` }"
      >
        <!-- 推荐档徽章 -->
        <div
          v-if="tier.highlighted"
          class="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-land-pill bg-land-accent text-land-text-on-accent text-land-micro font-semibold uppercase tracking-wider"
        >
          Most popular
        </div>

        <!-- 名称 + 描述 -->
        <div class="mb-6">
          <h3 class="font-land-display text-land-h-md text-land-text font-semibold mb-2">
            {{ tier.name }}
          </h3>
          <p class="text-land-caption text-land-text-muted min-h-[2.5em]">
            {{ tier.description }}
          </p>
        </div>

        <!-- 价格 -->
        <div class="mb-6 flex items-baseline gap-1">
          <span class="font-land-display text-[44px] font-bold text-land-text tracking-tight">
            {{ tier.price }}
          </span>
          <span v-if="tier.unit" class="text-land-caption text-land-text-muted">{{ tier.unit }}</span>
        </div>

        <!-- CTA -->
        <a
          :href="tier.cta.href"
          class="block w-full text-center h-11 leading-[44px] rounded-land-md font-medium text-land-body mb-8 transition-colors"
          :class="tier.highlighted
            ? 'bg-land-accent hover:bg-land-accent-hover text-land-text-on-accent'
            : 'bg-land-surface-3 hover:bg-land-border-soft text-land-text'"
        >
          {{ tier.cta.label }}
        </a>

        <!-- 特性列表 -->
        <ul class="flex flex-col gap-3">
          <li
            v-for="(feat, fi) in tier.features"
            :key="fi"
            class="flex items-start gap-2.5 text-land-caption text-land-text"
          >
            <CheckOutlined class="text-land-accent mt-0.5 shrink-0" />
            <span>{{ feat }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
