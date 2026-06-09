---
name: S1-product
description: Product overview page layout — Hero + Logo wall + Feature grid + Alternating feature deep-dives + Integrations + Testimonial + CTA + Footer.
---

# L-S1 · Product Overview Page

> SaaS 最重要的页面：产品总览。目标：在 30 秒内让访客理解"产品是什么 + 为谁 + 解决什么"。

---

## 页面骨架（自上而下）

```
┌─────────────────────────────────────────────────┐
│ <Nav>                                           │
├─────────────────────────────────────────────────┤
│ <Hero section>                                  │  ← 5 秒定去留
│   ├─ Eyebrow tag (可选)                         │
│   ├─ Headline (≤ 8 词)                          │
│   ├─ Subhead (≤ 24 词)                          │
│   ├─ Primary CTA                                │
│   ├─ Secondary CTA                              │
│   └─ Social proof mini (logo wall)              │
├─────────────────────────────────────────────────┤
│ <Social proof>                                  │  ← 立即信任
│   "Trusted by X+ teams" + 6-12 logo             │
├─────────────────────────────────────────────────┤
│ <Feature grid>                                  │  ← 能力总览
│   6-9 features in 3-column grid                 │
├─────────────────────────────────────────────────┤
│ <Feature deep-dive 1>                           │  ← 深度展示（交替左右）
│   Left: screenshot / Right: copy                │
├─────────────────────────────────────────────────┤
│ <Feature deep-dive 2>                           │
│   Left: copy / Right: screenshot                │
├─────────────────────────────────────────────────┤
│ <Feature deep-dive 3>                           │
│   Left: screenshot / Right: copy                │
├─────────────────────────────────────────────────┤
│ <Integrations>                                  │  ← 生态
│   "Works with your stack" + logo cloud          │
├─────────────────────────────────────────────────┤
│ <Testimonial>                                   │  ← 社会证明
│   Big quote + avatar + company + link to case   │
├─────────────────────────────────────────────────┤
│ <Pricing teaser>                                │  ← 预热
│   "Starting at $X/mo" + [See pricing]           │
├─────────────────────────────────────────────────┤
│ <CTA band>                                      │  ← 主转化
├─────────────────────────────────────────────────┤
│ <Footer>                                        │
└─────────────────────────────────────────────────┘
```

---

## 各区块规范

### 1. Hero section
- 详见 [../component-contract/hero-section.md](../component-contract/hero-section.md)
- 推荐 V2 Left-aligned（标题左 + 演示右）
- 桌面 grid: `1fr 1.2fr`（演示稍宽）
- 移动: 单列 + 演示在下

### 2. Social proof (logo wall)
- 详见 [../component-contract/social-proof.md](../component-contract/social-proof.md)
- logo 数量: 6-12
- 高度统一 h-7，grayscale + 60% opacity

### 3. Feature grid
- 详见 [../component-contract/feature-grid.md](../component-contract/feature-grid.md)
- 6-9 个 feature
- 桌面 3 列 / 平板 2 列 / 移动 1 列

### 4. Feature deep-dive (alternating)
- 推荐 3 个，每个聚焦一个核心能力
- 左右交替（避免所有截图都在右）
- 文字侧: eyebrow + title (24-32px) + description + 可选链接
- 截图侧: 真实截图（含数据/交互状态），不用 mockup

### 5. Integrations
- 居中标题 "Works with your stack"
- 8-20 个 integration logo（Vercel/Supabase/Stripe/Notion 风格）
- 可选分类 tab: "All / Frontend / Backend / Database"

### 6. Testimonial
- 大引号 (16-24 词)
- 头像 + 姓名 + 职位 + 公司
- 链接到完整案例
- 背景与主页面有微妙区分（轻微渐变或浅色）

### 7. Pricing teaser
- 单行: "Starting at $X/mo · No credit card required"
- 主 CTA: "See full pricing →"
- 不要重复完整 pricing 表格（避免页面过长）

### 8. CTA band
- 详见 [../component-contract/cta-band.md](../component-contract/cta-band.md)
- 推荐 V1 Gradient-bg
- 包含 trust elements: "X+ teams" / "No credit card" / "Free trial"

### 9. Footer
- 详见 [../component-contract/nav-footer.md](../component-contract/nav-footer.md)
- 4-5 列链接 + 底部 logo/copyright/social

---

## 关键性能

| 指标 | 目标 |
|---|---|
| Hero LCP | ≤ 2.0s |
| Hero JS | ≤ 80KB gzip |
| Hero 图像 | 优化后 ≤ 200KB |
| Total JS (本页) | ≤ 150KB gzip |
| Lighthouse Perf | ≥ 90 |
| Lighthouse SEO | ≥ 95 |

---

## 关键 SEO

- `<title>`: `[Product Name] — [Value Prop]` (50-60 字符)
- `<meta description>`: 一句话讲清"产品+目标用户+核心价值" (150-160 字符)
- Canonical: `https://example.com/`
- Open Graph: title / description / image (1200x630) / type=website
- JSON-LD: `Organization` + `Product`（含 `offers` 引用 pricing 锚点）
- H1: 唯一且与 title 一致
- 内部链接: Hero CTA → `/sign-up` / Logo → 案例详情 / Pricing → `/pricing`

---

## 页面内锚点建议

页面可被多个入口跳转锚定：

- `/#features` → feature grid
- `/#pricing` → pricing teaser
- `/#testimonials` → testimonial
- `/#integrations` → integrations
- `/#get-started` → CTA band

## Pitfalls

- ❌ **页面长度超过 6 屏** → 用户跳失
- ❌ **首屏看到 "Learn more" / "Read more" 按钮** → 转化率低
- ❌ **演示图是 mock 套 mock**（浏览器框架+应用框架+对话框）→ 嵌套地狱
- ❌ **feature deep-dive 全用同一张图**（无差异化）→ 视觉疲劳
- ❌ **hero 图和文案无关联**（图是仪表盘，文字讲 API）→ 信任崩塌
- ❌ **首屏不显价格** → 用户跳出
- ❌ **没有次级 CTA**（如 "Watch demo"）→ 非转化型用户流失

## Reference implementations

- **Vercel / (`/product`)** — V2 hero + 6 logo + 3-deep-dive + integrations
- **Stripe (`/`)** — V2 hero + 6 logo + 3-deep-dive + testimonial
- **Linear (`/features`)** — V3 minimal hero + 3-deep-dive
- **Notion (`/product`)** — V1 hero + Bento grid
- **Cal (`/`)** — V2 hero + 4-deep-dive + integrations

## 模板代码

```vue
<template>
  <PageContainer>
    <NavHeader />

    <HeroSection ... />

    <SocialProof ... />

    <FeatureGrid :features="features" />

    <FeatureDeepDive
      v-for="(dive, i) in deepDives"
      :key="dive.id"
      :reverse="i % 2 === 1"
      v-bind="dive"
    />

    <Integrations :logos="integrationLogos" />

    <Testimonial :quote="featuredTestimonial" />

    <PricingTeaser
      :price="20"
      cta-href="/pricing"
    />

    <CtaBand
      title="Ready to ship faster?"
      subtitle="Join 1,000+ teams using Product to deploy in seconds."
      cta-primary="Start free trial"
      cta-secondary="Talk to sales →"
    />

    <SiteFooter />
  </PageContainer>
</template>
```

> 模板代码请配合 [component-contract/](../component-contract/) 下的契约实现。
