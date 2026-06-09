<script setup lang="ts">
/**
 * TestimonialLogos — Logo 墙 + 强证言
 * 来自 component-contract/testimonial-logos.md。
 * Logo 用文字简写占位（避免外部资源依赖）。
 */
import type { LogoItem, Testimonial } from '@/mock/landing'

defineProps<{
  logos: LogoItem[]
  testimonials: Testimonial[]
}>()
</script>

<template>
  <section class="px-6 lg:px-12 py-20 lg:py-28 bg-land-surface-2 border-y border-land-border-soft">
    <div class="max-w-6xl mx-auto">
      <!-- Logo 墙（首屏信任） -->
      <div class="text-center mb-12">
        <p class="text-land-caption text-land-text-muted uppercase tracking-[0.18em] font-medium">
          Trusted by 500,000+ developers shipping email at scale
        </p>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-6 mb-20">
        <div
          v-for="(logo, i) in logos"
          :key="logo.id"
          class="flex items-center justify-center h-10 text-land-h-md text-land-text-dim font-land-display font-semibold tracking-tight opacity-70 hover:opacity-100 transition-opacity animate-land-fade-up"
          :style="{ animationDelay: `${i * 40}ms` }"
        >
          {{ logo.label }}
        </div>
      </div>

      <!-- 强证言（2-3 条） -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <figure
          v-for="(t, i) in testimonials"
          :key="t.id"
          class="p-8 rounded-land-xl bg-land-surface-1 border border-land-border-soft shadow-land-panel animate-land-fade-up"
          :style="{ animationDelay: `${i * 80}ms` }"
        >
          <blockquote class="text-land-body-lg text-land-text leading-[1.6] mb-6">
            &ldquo;{{ t.quote }}&rdquo;
          </blockquote>
          <figcaption class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-land-pill bg-land-accent-soft text-land-accent font-semibold flex items-center justify-center">
              {{ t.author.charAt(0) }}
            </div>
            <div>
              <div class="text-land-caption font-medium text-land-text">{{ t.author }}</div>
              <div class="text-land-micro text-land-text-muted">{{ t.role }}</div>
            </div>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>
