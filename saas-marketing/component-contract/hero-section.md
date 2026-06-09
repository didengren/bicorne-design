---
name: hero-section
description: Above-the-fold hero block for marketing landing pages — large headline, subhead, primary CTA, secondary CTA, and product visual.
---

# `hero-section` — Marketing Hero

> 首屏决定 5 秒去留。必须：标题清晰 + 副标题具体 + CTA 显眼 + 演示直观。

## Mandatory tokens

| Token path | Purpose |
|---|---|
| `typography.size.h-display` | 标题 48-72px desktop / 36-48px mobile |
| `typography.size.h-xl` | 副标题 18-22px |
| `typography.size.body-lg` | 描述 16-18px |
| `typography.weight.bold/extrabold` | 标题字重 700-800 |
| `typography.tracking.tight` | 标题字距 -0.02em |
| `colors.text.default` | 标题主色 |
| `colors.text.muted` | 副标题/描述 |
| `colors.accent.{blue,green,violet,gradient}` | 标题渐变 / CTA 背景 |
| `colors.surface.elevated` | 演示图卡片背景 |
| `spacing.{8,12,16,20,24}` | 内边距 |
| `motion.duration.medium` | 入场动画 500-700ms |

## Variants

| Variant | 适用 | 关键点 |
|---|---|---|
| **V1 Centered** | 通用 / 启动期 | 居中标题 + 副标题 + CTA + 单图 |
| **V2 Left-aligned** | DevTools / 高密度 | 左标题+CTA + 右产品截图/视频 |
| **V3 Headline-only** | 极简 / 高端 | 居中巨大标题 + 副标题 + 单 CTA（无图） |
| **V4 With-product-frame** | 演示型 | 标题 + 浏览器/应用框架 + 真实截图 |
| **V5 Background-image** | 品牌驱动 | 标题 + 全屏背景图/视频（慎用，性能） |

## Recommended structure (V2 Left-aligned)

```html
<section class="grid grid-cols-1 lg:grid-cols-2 gap-12 px-6 py-20 lg:py-32">
  <!-- Left: copy -->
  <div class="flex flex-col justify-center">
    <!-- Eyebrow (可选) -->
    <span class="text-sm font-medium text-accent-blue uppercase tracking-wider">
      New v4 release
    </span>
    <!-- Headline -->
    <h1 class="mt-3 text-display font-extrabold tracking-tight text-default">
      Ship faster.<br/>
      <span class="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
        Without limits.
      </span>
    </h1>
    <!-- Subhead -->
    <p class="mt-6 text-xl text-muted max-w-lg">
      The platform 1000+ teams use to deploy to the edge in seconds.
    </p>
    <!-- CTAs -->
    <div class="mt-8 flex flex-col sm:flex-row gap-3">
      <a class="btn-primary btn-lg">Get started — free</a>
      <a class="btn-ghost btn-lg">Watch demo →</a>
    </div>
    <!-- Social proof (mini) -->
    <div class="mt-8 text-sm text-muted">
      Trusted by 1,000+ teams
      <div class="mt-3 flex gap-4 opacity-60">
        <img src="logo1.svg" alt="Acme" class="h-6 grayscale"/>
        ...
      </div>
    </div>
  </div>
  <!-- Right: product visual -->
  <div class="relative">
    <div class="absolute inset-0 bg-gradient-radial from-accent-blue/20 to-transparent blur-3xl"/>
    <div class="relative rounded-2xl border border-border bg-elevated shadow-2xl overflow-hidden">
      <img src="product-screenshot.png" alt="Product screenshot" class="w-full"/>
    </div>
  </div>
</section>
```

## Pitfalls

- ❌ **标题超过 12 词** → 用户不读完
- ❌ **副标题用行业 jargon** → 用户不懂
- ❌ **CTA 文本模糊**（"Learn more" / "Click here"）→ 转化率低
- ❌ **CTA 主次不分**（两个一模一样的按钮）→ 用户选择困难
- ❌ **演示图是 mockup 套 mockup**（浏览器框架里再套应用框架）→ 嵌套地狱
- ❌ **首屏视频自动播放 + 声音** → 性能 + 体验双杀
- ❌ **首屏占满 100vh 导致下方内容被忽略** → 跳出率↑
- ❌ **无 eyebrow 标签直接放标题** → 缺少上下文

## Required elements (极简清单)

每页 Hero **必须包含**：

1. **Eyebrow** (可选 1-2 词)
2. **Headline** ≤ 8 词，含价值主张
3. **Subhead** ≤ 24 词，含"为谁/解决什么/怎么解决"
4. **Primary CTA**（颜色突出 + 动作明确）
5. **Secondary CTA**（弱化 + 探索性）
6. **Social proof mini**（"Trusted by X teams" + 3-6 个 logo）
7. **Product visual**（截图/演示/视频，任选其一）

## Typography formula

| 元素 | 桌面 | 移动 |
|---|---|---|
| Eyebrow | 12-14px uppercase tracking-wider | 同 |
| Headline | 56-72px / 700-800 / -0.02em | 36-48px |
| Subhead | 20-24px / 400 | 18-20px |
| CTA | 16-18px / 500-600 | 同 |
| Social proof | 14px / 400 | 同 |

## Animation

入场顺序（避免全部同时弹入）：
1. **0ms** Eyebrow（fade-in, 200ms）
2. **100ms** Headline（fade-up, 600ms）
3. **300ms** Subhead（fade-up, 600ms）
4. **500ms** CTAs（fade-up, 600ms）
5. **700ms** Social proof（fade-in, 400ms）
6. **200ms** Product visual（fade-up + scale 0.95→1, 800ms）

缓动统一用 `ease-out`，**不用** `ease-in`（会让出场显得"快进"）。

## Reference implementations

- Stripe — V4 演示型（最经典）
- Vercel — V2 左对齐 + 渐变标题
- Linear — V3 极简标题
- Notion — V1 居中 + 大量留白
- Cal — V2 + 客户头像列
- Resend — V1 居中 + 单一 CTA
