<script setup lang="ts">
/**
 * HeroCta — Landing Page 首屏
 * 来自 component-contract/hero-cta.md（Centered 布局）。
 * 强制 1 个主 CTA + 1 个次 CTA（次级文本链接，不分流转化）。
 */
import { ArrowRightOutlined, CheckCircleFilled } from '@ant-design/icons-vue'

withDefaults(defineProps<{
  eyebrow?: string
  headline: string
  subhead?: string
  primaryCta: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  trustText?: string
}>(), {})

const stats = [
  { value: '60s', label: 'to first send' },
  { value: '99.99%', label: 'deliverability' },
  { value: '10B+', label: 'emails / year' },
]
</script>

<template>
  <section
    role="region"
    aria-label="Hero"
    class="relative px-6 lg:px-12 pt-32 lg:pt-40 pb-20 lg:pb-32 text-center max-w-5xl mx-auto"
  >
    <!-- Eyebrow -->
    <div
      v-if="eyebrow"
      aria-hidden="true"
      class="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-land-pill bg-land-accent-soft text-land-accent text-land-caption font-medium animate-land-fade-up"
    >
      <span class="w-1.5 h-1.5 rounded-full bg-land-accent" />
      {{ eyebrow }}
    </div>

    <!-- Headline -->
    <h1
      class="font-land-display text-[40px] sm:text-[56px] lg:text-land-display tracking-[-0.025em] leading-[1.05] mb-6 animate-land-fade-up"
      style="animation-delay: 80ms"
    >
      <span class="hero-gradient-text animate-land-shimmer">
        {{ headline }}
      </span>
    </h1>

    <!-- Subhead -->
    <p
      v-if="subhead"
      class="font-land-body text-land-body-lg lg:text-[20px] text-land-text-muted max-w-2xl mx-auto mb-10 animate-land-fade-up"
      style="animation-delay: 160ms"
    >
      {{ subhead }}
    </p>

    <!-- CTA row -->
    <div
      class="flex flex-col sm:flex-row items-center justify-center gap-3 mb-3 animate-land-fade-up"
      style="animation-delay: 240ms"
    >
      <a
        :href="primaryCta.href"
        :aria-label="primaryCta.label"
        class="inline-flex items-center gap-2 h-12 px-6 rounded-land-md bg-land-accent hover:bg-land-accent-hover text-land-text-on-accent font-medium text-land-body shadow-land-elevated transition-all duration-200 hover:shadow-land-hero"
      >
        {{ primaryCta.label }}
        <ArrowRightOutlined aria-hidden="true" />
      </a>
      <a
        v-if="secondaryCta"
        :href="secondaryCta.href"
        :aria-label="secondaryCta.label"
        class="inline-flex items-center gap-2 h-12 px-4 text-land-text hover:text-land-accent font-medium text-land-body transition-colors"
      >
        {{ secondaryCta.label }}
      </a>
    </div>

    <!-- Trust text -->
    <p
      v-if="trustText"
      aria-label="Trust information"
      class="text-land-caption text-land-text-dim mt-2 flex items-center justify-center gap-1.5 animate-land-fade-up"
      style="animation-delay: 320ms"
    >
      <CheckCircleFilled aria-hidden="true" class="text-land-accent" />
      {{ trustText }}
    </p>

    <!-- Hero stats row -->
    <div
      role="group"
      aria-label="Key statistics"
      class="mt-16 lg:mt-20 grid grid-cols-3 gap-4 max-w-2xl mx-auto animate-land-fade-up"
      style="animation-delay: 400ms"
    >
      <div v-for="(s, i) in stats" :key="i" class="flex flex-col items-center">
        <span class="font-land-display text-land-h-md lg:text-land-h-lg text-land-text font-semibold tabular-nums">
          {{ s.value }}
        </span>
        <span class="text-land-caption text-land-text-muted mt-1">{{ s.label }}</span>
      </div>
    </div>
  </section>
</template>
