# `testimonial-logos` — 客户 logo 墙 + 简短推荐语

> Landing Page 社会证明的核心区块。**至少 1 条可验证的强证言** + 客户 logo 墙。

---

## 何时用 / 何时不用

✅ **用**：landing page 第二屏（建立信任）
❌ **不用**：客户案例页（用 saas-marketing 的 testimonial + 完整故事页）

---

## Mandatory tokens

| Token path | 用途 |
|---|---|
| `typography.size.h-xl` | 区块标题 28-32px |
| `typography.size.body` | 推荐语引言 16-20px |
| `typography.size.caption` | 客户名 / 职位 |
| `typography.weight.regular/medium` | 引言 regular，名字 medium |
| `typography.style.italic` | 引言斜体（可选） |
| `colors.text.default` | 引言 / 客户名 |
| `colors.text.muted` | 职位 / 副文本 |
| `colors.border.subtle` | logo 分隔线 |
| `colors.surface.elevated` | 引用卡片背景（可选） |
| `colors.accent.primary` | 引号符号 / 评分星 |

---

## Recommended props

```ts
interface TestimonialLogosProps {
  /** 区块标题（可选） */
  sectionTitle?: string
  /** 客户 logo 列表（≥ 5 个） */
  logos: { src: string; alt: string; href?: string }[]
  /** 推荐语（1-3 条） */
  testimonials: Testimonial[]

  layout?: 'logos-top' | 'logos-bottom' | 'interleaved'
}

interface Testimonial {
  quote: string              // 引言（≤ 60 词）
  authorName: string
  authorTitle: string
  authorAvatar?: string      // 头像
  authorCompany?: string
  authorCompanyHref?: string
  /** 关键数据（如 "increased revenue by 40%"） */
  metric?: { value: string; label: string }
  /** 评分（5 星） */
  rating?: 1 | 2 | 3 | 4 | 5
}
```

---

## Pitfalls

### ❌ Pitfall 1: 假社会证明

```ts
// ❌ "Trusted by 10,000+ users" 但实际只有 200
trustText: "Trusted by 10,000+ users"

// ✅ 用真实数字
trustText: "Used by 200 teams and counting"
// 或留空，不说具体数
```

### ❌ Pitfall 2: 客户 logo 不可点击 / 不可识别

```ts
// ❌ logo 模糊或全灰，客户认不出
<img src="logo-gray-50x20.png" />

// ✅ 高对比 + 可点击到客户案例
<a v-for="l in logos" :href="l.href">
  <img :src="l.src" :alt="l.alt" class="h-8" />
</a>
```

### ❌ Pitfall 3: 推荐语太长（> 60 词）

```ts
// ❌ 推荐语写 200 词的故事
quote: "我们公司从 2018 年开始使用...（200 词）"

// ✅ ≤ 60 词，1-2 句
quote: "Ship products 3x faster. The team's been freed up to focus on what matters."
```

### ❌ Pitfall 4: 没有头像 + 客户名链接

```ts
// ❌ 不知是谁说的
"— Zhang San, CEO"

// ✅ 头像 + 客户公司可点击
<img :src="avatar" />
<a :href="companyHref">{{ companyName }}</a>
```

### ❌ Pitfall 5: 推荐语都是空话（"Great product!"）

```ts
// ❌ "Great product! Highly recommend!"
quote: "Great product! Highly recommend!"

// ✅ 具体、点出结果、可验证
quote: "Reduced our CI time from 45min to 8min. Worth every penny."
metric: { value: "5.6x", label: "faster CI" }
```

---

## Minimal Vue 3 template (logos-top)

```vue
<script setup lang="ts">
withDefaults(defineProps<TestimonialLogosProps>(), {
  layout: 'logos-top',
})
</script>

<template>
  <section class="py-16 lg:py-24 px-6 max-w-6xl mx-auto text-center">
    <p v-if="sectionTitle" class="text-caption text-text-muted uppercase tracking-wider mb-8">
      {{ sectionTitle }}
    </p>

    <!-- Logo 墙 -->
    <div v-if="layout === 'logos-top' || layout === 'interleaved'" class="flex flex-wrap items-center justify-center gap-8 mb-16">
      <a
        v-for="l in logos"
        :key="l.alt"
        :href="l.href"
        class="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition"
      >
        <img :src="l.src" :alt="l.alt" class="h-8" loading="lazy" />
      </a>
    </div>

    <!-- 推荐语 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <blockquote
        v-for="(t, i) in testimonials"
        :key="i"
        class="flex flex-col gap-4 p-6 rounded-lg bg-surface-elevated border border-border-subtle text-left"
      >
        <!-- 评分 -->
        <div v-if="t.rating" class="flex gap-0.5 text-accent-primary">
          <span v-for="n in t.rating" :key="n">★</span>
        </div>

        <p class="text-body text-text-default leading-relaxed flex-1">
          "{{ t.quote }}"
        </p>

        <div v-if="t.metric" class="flex items-baseline gap-2 py-2">
          <span class="text-h-xl font-bold text-accent-primary">{{ t.metric.value }}</span>
          <span class="text-caption text-text-muted">{{ t.metric.label }}</span>
        </div>

        <footer class="flex items-center gap-3 pt-3 border-t border-border-subtle">
          <img
            v-if="t.authorAvatar"
            :src="t.authorAvatar"
            :alt="t.authorName"
            class="w-10 h-10 rounded-full"
            loading="lazy"
          />
          <div class="flex-1">
            <div class="text-caption font-medium text-text-default">{{ t.authorName }}</div>
            <div class="text-caption text-text-muted">{{ t.authorTitle }}</div>
            <a
              v-if="t.authorCompany && t.authorCompanyHref"
              :href="t.authorCompanyHref"
              class="text-caption text-accent-primary hover:underline"
            >
              {{ t.authorCompany }}
            </a>
            <span v-else-if="t.authorCompany" class="text-caption text-text-muted">
              {{ t.authorCompany }}
            </span>
          </div>
        </footer>
      </blockquote>
    </div>

    <!-- 底部 logo 墙（如需要） -->
    <div v-if="layout === 'logos-bottom'" class="flex flex-wrap items-center justify-center gap-8 mt-16">
      <!-- 同上 -->
    </div>
  </section>
</template>
```

---

## Acceptance check

- [ ] ≥ 5 个客户 logo
- [ ] 至少 1 条强证言（有具体结果 / 数据）
- [ ] 推荐语 ≤ 60 词
- [ ] 头像 + 客户公司可点击
- [ ] 客户名 / 公司名 / 职位齐全
- [ ] logo 用 `loading="lazy"`（非首屏）
- [ ] 推荐语用引号包裹（语义化）
- [ ] 0 `v-if` + `v-for` 混用
