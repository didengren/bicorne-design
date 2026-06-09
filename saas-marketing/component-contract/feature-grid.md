---
name: feature-grid
description: Grid of feature cards below the hero — icon + title + description, used to break down product capabilities.
---

# `feature-grid` — Feature Cards

> Hero 之后的首个内容块。3-9 个特性卡片，帮助用户理解"产品能做什么"。

## Mandatory tokens

| Token path | Purpose |
|---|---|
| `colors.surface.{default,elevated}` | 卡片背景 |
| `colors.border.subtle` | 卡片边框（hover 变 strong） |
| `colors.accent.{blue,green,violet}` | 图标背景/前景 |
| `typography.size.h-md` | 特性标题 24-32px |
| `typography.size.body` | 描述 16-18px |
| `spacing.{6,8}` | 卡片内边距 |
| `radii.{xl,2xl}` | 卡片圆角 |
| `motion.duration.fast` | hover 150ms |

## Variants

| Variant | 适用 | 关键点 |
|---|---|---|
| **V1 2x2** | 4 个核心特性 | 桌面 2x2 / 移动 1 列 |
| **V2 3-column** | 6-9 个特性 | 桌面 3 列 / 移动 1 列 |
| **V3 Alternating** | 1 屏 1 特性 | 截图 + 文字左右交替（适用于深度展示） |
| **V4 Bento** | 大小不一混排 | 灵感来自 Apple/Linear Bento Grid |

## Recommended structure (V2 3-column)

```html
<section class="px-6 py-20 bg-surface-muted/50">
  <!-- 标题 -->
  <h2 class="text-center text-h-lg font-bold">Everything you need</h2>
  <p class="mt-4 text-center text-muted text-lg max-w-2xl mx-auto">
    All the features. None of the bloat. Built for teams that move fast.
  </p>

  <!-- 特性网格 -->
  <div class="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
    <FeatureCard
      v-for="(feature, i) in features"
      :key="i"
      :icon="feature.icon"
      :title="feature.title"
      :description="feature.description"
    />
  </div>
</section>
```

## FeatureCard 内部结构

```html
<div class="group relative rounded-2xl border border-border bg-surface p-8
            hover:border-border-strong hover:shadow-lg transition-all duration-200
            hover:-translate-y-0.5">
  <!-- Icon -->
  <div class="w-12 h-12 rounded-xl bg-accent-blue/10
              flex items-center justify-center mb-5
              group-hover:bg-accent-blue/20 transition-colors">
    <component :is="icon" class="w-6 h-6 text-accent-blue"/>
  </div>
  <!-- Title -->
  <h3 class="text-h-md font-semibold text-default">{{ title }}</h3>
  <!-- Description -->
  <p class="mt-3 text-body text-muted leading-relaxed">{{ description }}</p>
  <!-- 可选：learn more link -->
  <a v-if="link" class="mt-4 inline-flex items-center text-sm text-accent-blue">
    Learn more
    <ArrowRightIcon class="ml-1 w-4 h-4"/>
  </a>
</div>
```

## Feature copy formula

| 元素 | 长度 | 公式 |
|---|---|---|
| Title | 2-4 词 | 动词 + 名词（如 "Ship instantly" / "Zero config"） |
| Description | 12-24 词 | 解释"是什么 + 解决什么"（不写"如何做"） |
| Icon | 1 个 | 24px / 2px stroke / 单色 |

## Pitfalls

- ❌ **特性超过 9 个** → 用户分不清主次
- ❌ **特性名抽象**（"Powerful" / "Advanced" / "Smart"）→ 空洞
- ❌ **特性名动词但不知道做了什么**（"Integrate"）→ 没说和什么
- ❌ **icon 用 emoji** → 风格不统一
- ❌ **icon 用照片** → 信息密度不足
- ❌ **图标全是同一种颜色** → 视觉割裂（用品牌主色 + 2-3 个辅色）
- ❌ **每张卡片文字长度差异巨大** → 视觉参差
- ❌ **特性 6 个时 2x3 排（2 列 3 行）** → 应该 3x2（3 列 2 行）

## Icon system

推荐用 **lucide** 或 **heroicons**（24px / 2px stroke / outline）保持一致性。
不要用：emoji、彩色 logo、抽象几何（除非在 Bento 中故意混排）。

## Animation

- **入场**: 错落 fade-up（每行 50ms 间隔）
- **hover**: 边框变深 + 阴影出现 + 微微上移（`translate-y-[-2px]`），150ms
- **icon 容器**: 背景色饱和度提升（10% → 20%），150ms

## Reference implementations

- **Stripe** — 3 列 + 单一图标色
- **Vercel** — Bento Grid 大小不一
- **Linear** — 2 列 4 特性 + 极简
- **Notion** — 3 列 + 插画
- **Cal** — 3 列 + 截图混排
- **Resend** — 3 列 + 极简
