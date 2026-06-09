<script setup lang="ts">
/**
 * Landing Page (single-page) — F4 引导式 + F5 沉浸式混合
 * 一气呵成讲完故事：Hero → Social Proof → 3 个 Feature → Testimonial →
 * Pricing → FAQ → Final CTA → Footer。
 */
import { ref } from 'vue'
import {
  customerLogos, features, testimonials, pricingTiers, faqs,
} from '@/mock/landing'
import HeroCta from '@/components/landing/HeroCta.vue'
import FeatureRow from '@/components/landing/FeatureRow.vue'
import TestimonialLogos from '@/components/landing/TestimonialLogos.vue'
import PricingSimple from '@/components/landing/PricingSimple.vue'
import { DownOutlined, ArrowRightOutlined } from '@ant-design/icons-vue'

// FAQ 展开状态
const openFaqId = ref<string>('q1')
const toggleFaq = (id: string) => {
  openFaqId.value = openFaqId.value === id ? '' : id
}
</script>

<template>
  <div class="min-h-screen bg-land-bg text-land-text font-land-body">
    <!-- ===== Top nav（极简，3 项 + CTA） ===== -->
    <header
      role="banner"
      aria-label="Site header"
      class="sticky top-0 z-50 backdrop-blur-md bg-land-bg/80 border-b border-land-border-faint animate-land-shimmer"
    >
      <div class="max-w-6xl mx-auto flex items-center justify-between h-16 px-6 lg:px-12">
        <a href="#" aria-label="Resend home" class="flex items-center gap-2 text-land-h-md font-semibold tracking-tight">
          <span aria-hidden="true" class="inline-flex w-7 h-7 rounded-land-md bg-land-text text-land-bg items-center justify-center">
            <svg viewBox="0 0 32 32" class="w-4 h-4" fill="none">
              <path d="M8 10l8 6 8-6v12H8V10z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
            </svg>
          </span>
          Resend
        </a>
        <nav role="navigation" aria-label="Primary" class="hidden lg:flex items-center gap-8 text-land-caption text-land-text-muted">
          <a href="#features" aria-label="Jump to features section" class="hover:text-land-text transition-colors">Product</a>
          <a href="#pricing" aria-label="Jump to pricing section" class="hover:text-land-text transition-colors">Pricing</a>
          <a href="#faq" aria-label="Jump to FAQ section" class="hover:text-land-text transition-colors">FAQ</a>
        </nav>
        <div class="flex items-center gap-3">
          <a href="#login" aria-label="Log in to your account" class="hidden sm:inline-block text-land-caption text-land-text-muted hover:text-land-text">
            Log in
          </a>
          <a
            href="#start"
            aria-label="Get started with Resend for free"
            class="inline-flex items-center h-9 px-4 rounded-land-md bg-land-text text-land-bg text-land-caption font-medium hover:bg-land-text-muted transition-colors"
          >
            Get started
          </a>
        </div>
      </div>
    </header>

    <!-- ===== Hero ===== -->
    <main role="main" aria-label="Main content">
    <HeroCta
      eyebrow="Now SOC 2 Type II certified"
      headline="Email API for developers."
      subhead="Resend is the modern email platform — built around a great developer experience and industry-leading deliverability."
      :primary-cta="{ label: 'Start sending for free', href: '#start' }"
      :secondary-cta="{ label: 'Read the docs', href: '#docs' }"
      trust-text="No credit card required · 3,000 free emails / month"
    />

    <!-- ===== Social Proof: Logo 墙 + Testimonial ===== -->
    <TestimonialLogos :logos="customerLogos" :testimonials="testimonials" />

    <!-- ===== Features（3 个核心） ===== -->
    <div id="features">
      <FeatureRow :features="features" />
    </div>

    <!-- ===== Pricing ===== -->
    <div id="pricing">
      <PricingSimple :tiers="pricingTiers" />
    </div>

    <!-- ===== FAQ ===== -->
    <section id="faq" role="region" aria-label="Frequently asked questions" class="px-6 lg:px-12 py-20 lg:py-28 max-w-3xl mx-auto">
      <h2 class="font-land-display text-[28px] lg:text-land-h-xl text-land-text font-semibold text-center mb-12 tracking-[-0.02em]">
        Frequently asked questions
      </h2>
      <div class="flex flex-col gap-2">
        <div
          v-for="(faq, i) in faqs"
          :key="faq.id"
          :class="[
            'rounded-land-lg border border-land-border-soft bg-land-surface-1 overflow-hidden animate-land-fade-up',
            i === 0 ? 'animate-land-fade-up' : '',
            i === 1 ? 'animate-land-fade-up' : '',
            i === 2 ? 'animate-land-fade-up' : '',
            i === 3 ? 'animate-land-fade-up' : '',
          ]"
          :style="{ animationDelay: `${i * 60}ms` }"
        >
          <button
            class="w-full flex items-center justify-between gap-4 px-5 py-4 text-left text-land-text"
            :aria-expanded="openFaqId === faq.id"
            :aria-controls="`faq-panel-${faq.id}`"
            @click="toggleFaq(faq.id)"
          >
            <span class="font-medium text-land-body">{{ faq.question }}</span>
            <DownOutlined
              aria-hidden="true"
              class="text-land-text-muted shrink-0 transition-transform duration-200"
              :class="openFaqId === faq.id ? 'rotate-180' : ''"
            />
          </button>
          <div
            v-show="openFaqId === faq.id"
            :id="`faq-panel-${faq.id}`"
            role="region"
            :aria-label="`Answer for ${faq.question}`"
            class="px-5 pb-5 text-land-body text-land-text-muted border-t border-land-border-faint"
          >
            <p class="pt-3">{{ faq.answer }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== Final CTA ===== -->
    <section role="region" aria-label="Final call to action" class="px-6 lg:px-12 py-24 lg:py-32 text-center max-w-3xl mx-auto">
      <h2 class="font-land-display text-[32px] lg:text-land-h-xl text-land-text font-semibold tracking-[-0.02em] mb-5">
        Ready to ship better email?
      </h2>
      <p class="text-land-body-lg text-land-text-muted mb-8 max-w-xl mx-auto">
        Join 500,000+ developers who switched to Resend. Free tier, no credit card, 60 seconds to your first send.
      </p>
      <a
        href="#start"
        aria-label="Start sending for free, no credit card required"
        class="inline-flex items-center gap-2 h-12 px-6 rounded-land-md bg-land-accent hover:bg-land-accent-hover text-land-text-on-accent font-medium text-land-body shadow-land-elevated transition-all duration-200 hover:shadow-land-hero"
      >
        Start sending for free
        <ArrowRightOutlined aria-hidden="true" />
      </a>
    </section>
    </main>

    <!-- ===== Footer（极简） ===== -->
    <footer role="contentinfo" aria-label="Site footer" class="px-6 lg:px-12 py-10 border-t border-land-border-faint">
      <div class="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-land-caption text-land-text-muted">
        <div class="flex items-center gap-2">
          <span aria-hidden="true" class="inline-flex w-5 h-5 rounded-land-sm bg-land-text text-land-bg items-center justify-center">
            <svg viewBox="0 0 32 32" class="w-3 h-3" fill="none">
              <path d="M8 10l8 6 8-6v12H8V10z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
            </svg>
          </span>
          <span>© 2026 Bicorne Design · Landing Template</span>
        </div>
        <nav role="navigation" aria-label="Footer" class="flex items-center gap-6">
          <a href="#privacy" aria-label="Read our privacy policy" class="hover:text-land-text">Privacy</a>
          <a href="#terms" aria-label="Read our terms of service" class="hover:text-land-text">Terms</a>
          <a href="#status" aria-label="View system status" class="hover:text-land-text">Status</a>
        </nav>
      </div>
    </footer>
  </div>
</template>
