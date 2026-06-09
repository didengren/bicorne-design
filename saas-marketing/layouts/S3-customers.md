---
name: S3-customers
description: Customer stories page layout — page header + industry filter + featured case + case study grid + testimonial wall + CTA + Footer.
---

# L-S3 · Customer Stories Page

> 社会证明集中营。目标：让访客看到"和我类似的公司/角色用这产品解决了我的问题"。

---

## 页面骨架

```
┌─────────────────────────────────────────────────┐
│ <Nav>                                           │
├─────────────────────────────────────────────────┤
│ <Page header>                                   │
│   "Trusted by X+ teams worldwide"               │
│   Subtitle: 一句话讲明行业覆盖                  │
├─────────────────────────────────────────────────┤
│ <Industry filter>                               │  ← 行业筛选
│   All / FinTech / Health / DevTools / ...       │
├─────────────────────────────────────────────────┤
│ <Featured case (大案例)>                        │  ← 头条
│   ├─ 大封面图 (16:9)                            │
│   ├─ 客户 logo + 名称 + 行业                    │
│   ├─ 标题 (≤ 12 词)                             │
│   ├─ 摘要 (3 段)                                │
│   ├─ 3 个数据指标 (e.g. 5x faster)               │
│   └─ [Read case study] CTA                      │
├─────────────────────────────────────────────────┤
│ <Case grid>                                     │  ← 案例网格
│   6-12 个案例卡（image + logo + title + metric）│
├─────────────────────────────────────────────────┤
│ <Testimonial wall>                              │  ← 客户引语墙
│   6-10 条短引语（头像+公司+1-2 句）            │
├─────────────────────────────────────────────────┤
│ <Logo wall> (大客户)                            │
│   12-20 个 logo（grayscale 强）                 │
├─────────────────────────────────────────────────┤
│ <CTA band>                                      │
│   "Join X+ teams using Product"                 │
├─────────────────────────────────────────────────┤
│ <Footer>                                        │
└─────────────────────────────────────────────────┘
```

---

## 各区块规范

### 1. Page header
- Title: 突出数量 + 信任（"Trusted by 1,000+ teams"）
- Subtitle: 一句话覆盖行业（"From early-stage startups to Fortune 500"）
- 不要放 hero 图（焦点应是客户而非产品）
- 居中布局

### 2. Industry filter
- 横排 chip 列表，可滚动
- 数量: 6-10 个
- 默认 All
- 切换不刷新页面（客户端 filter）
- 可选 URL 同步 `?industry=fintech`

### 3. Featured case (大案例)
- 占据首屏 1 屏
- **结构：左大图（60%）+ 右文字（40%）**（或上 16:9 大图 + 下文字）
- 客户 logo + 名称 + 行业 chip
- 标题: ≤ 12 词，叙述"成就"（"How Acme shipped 5x faster"）
- 摘要: 3 段（挑战 / 方案 / 成果）
- **3 个数据指标**（最关键）：
  - 5x faster deployment
  - 60% cost reduction
  - 10M+ requests/day
- 主 CTA: "Read case study →"
- 大案例应**每季度更新**（避免永远是同一篇）

### 4. Case grid
- 3 列 (desktop) / 2 列 (tablet) / 1 列 (mobile)
- 6-12 张案例卡
- 卡片结构:

```html
<a class="case-card">
  <img src="cover" alt="Acme" class="aspect-[16/9] w-full object-cover"/>
  <div class="p-6">
    <img src="acme-logo" class="h-5 mb-3"/>
    <h3 class="font-semibold">How Acme shipped 5x faster</h3>
    <div class="mt-3 flex gap-4 text-sm">
      <Metric value="5x" label="faster"/>
      <Metric value="60%" label="cost saved"/>
    </div>
  </div>
</a>
```

### 5. Testimonial wall
- 6-10 条短引语
- 紧凑布局: 2-3 列 masonry
- 每条: 头像 + 姓名 + 职位 + 公司 + 1-2 句引语
- 引语 ≤ 30 词
- 背景与主页面区分

### 6. Logo wall (大客户)
- 12-20 个 logo
- 灰度 + 60% opacity
- 6 列 grid
- 顺序按"知名度/规模"排

### 7. CTA band
- "Join X+ teams using [Product]"
- 复用全站主 CTA（保持一致）

---

## 关键 SEO

- `<title>`: "Customer Stories — [Product Name]"
- `<meta description>`: "See how X+ teams use [Product] to..."
- **JSON-LD** `BreadcrumbList` (Home > Customers)
- **JSON-LD** `Article` 用于每个大案例详情页
- 案例详情页 URL: `/customers/[slug]`（如 `/customers/acme`）
- 案例图片 alt 文本: "Acme team using Product dashboard"

---

## Case Study 详情页（独立 URL）

每个案例应有独立详情页（不只是 PDF / 视频）：

```
/customers/
├── acme.html
├── beta.html
├── gamma.html
└── ...
```

**详情页结构**：
1. 客户 logo + 名称 + 行业
2. 大封面图（产品截图 / 客户团队照片）
3. 标题 + 摘要
4. 3 个数据指标（大数字）
5. "Challenge" 段落
6. "Solution" 段落
7. "Results" 段落（每段配图）
8. 客户引语（关键）
9. "What's next" 段落
10. CTA: "Read another case" / "Start free trial"

---

## Pitfalls

- ❌ **案例少于 3 个** → 信任不足
- ❌ **案例全是同一行业** → 跨行业用户怀疑
- ❌ **案例数据夸大**（"10x revenue"）→ 失去可信
- ❌ **案例无图** → 视觉冷
- ❌ **案例图是 mockup 套 mockup** → 不可信
- ❌ **客户名不被允许披露**（用 "Leading FinTech Co"）→ 信任崩塌
- ❌ **案例无法跳转独立 URL** → 分享性差
- ❌ **每张案例卡都"Read more"** → 视觉雷同
- ❌ **大案例超过 1 屏** → 跳出率↑
- ❌ **案例顺序永远是按时间排** → 重要客户被埋没

## Reference implementations

- **Stripe (`/customers`)** — 行业 filter + 大案例 + 案例网格
- **Vercel (`/customers`)** — 案例网格 + 客户视频
- **Linear (`/customers`)** — 极简案例卡
- **Notion (`/customers`)** — 故事化案例 + 大图
- **Cal (`/customers`)** — 客户头像列
- **Resend (`/customers`)** — 极简

## 模板代码

```vue
<template>
  <PageContainer>
    <NavHeader />

    <PageHeader
      title="Trusted by 1,000+ teams worldwide"
      subtitle="From early-stage startups to Fortune 500."
    />

    <IndustryFilter
      v-model="industry"
      :options="industries"
    />

    <FeaturedCase
      v-if="featured"
      v-bind="featured"
    />

    <CaseGrid
      :cases="filteredCases"
    />

    <TestimonialWall
      :testimonials="testimonials"
    />

    <LogoWall
      :logos="customerLogos"
    />

    <CtaBand
      title="Join 1,000+ teams using Product"
      subtitle="Start your free trial in 30 seconds."
      cta-primary="Start free trial"
    />

    <SiteFooter/>
  </PageContainer>
</template>
```
