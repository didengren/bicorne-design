---
name: S2-pricing
description: Pricing page layout — page header + monthly/annual toggle + tier cards (featured tier highlighted) + full comparison table + FAQ + CTA + Footer.
---

# L-S2 · Pricing Page

> 转化率最高的一页。设计原则：**清晰对比 + 单一推荐 + 信任构建 + FAQ 减少摩擦**。

---

## 页面骨架

```
┌─────────────────────────────────────────────────┐
│ <Nav>                                           │
├─────────────────────────────────────────────────┤
│ <Page header>                                   │
│   ├─ Title: "Simple, transparent pricing"       │
│   ├─ Subtitle: "No hidden fees. Cancel any..." │
│   └─ Billing toggle (Monthly / Annual)         │
├─────────────────────────────────────────────────┤
│ <Tier cards> (3-4 列)                           │  ← 核心
│   ├─ Starter / Free                             │
│   ├─ Pro / ⭐ Most popular                      │
│   └─ Enterprise / Custom                        │
├─────────────────────────────────────────────────┤
│ <Trust row>                                     │  ← 30-day money-back
│   30-day · No credit card · Cancel anytime      │
├─────────────────────────────────────────────────┤
│ <Comparison table>                              │  ← 全功能对比
│   横向: Free | Pro | Enterprise                 │
│   纵向: 按用户决策权重排的功能列表              │
├─────────────────────────────────────────────────┤
│ <Feature explanation> (可选)                    │  ← 重点功能展开
│   2-3 个 highlight feature 的详细说明           │
├─────────────────────────────────────────────────┤
│ <Testimonial>                                   │  ← 客户推荐
├─────────────────────────────────────────────────┤
│ <FAQ accordion>                                 │  ← 减摩擦
│   6-10 个常见问题                               │
├─────────────────────────────────────────────────┤
│ <CTA band>                                      │  ← 收口
│   "Still have questions? Talk to us"            │
├─────────────────────────────────────────────────┤
│ <Footer>                                        │
└─────────────────────────────────────────────────┘
```

---

## 各区块规范

### 1. Page header
- Title: 36-48px / 700
- Subtitle: 18-22px / muted
- 居中布局
- 不放 hero 图（避免干扰）

### 2. Billing toggle
- 居中
- 选项: Monthly / Annual (with "Save 20%" badge)
- 切换不刷新页面（状态管理）
- URL 同步 `?billing=annual`
- 默认 Monthly（让用户先看价格，"切换"是一个动作）

### 3. Tier cards
- 详见 [../component-contract/pricing-table.md](../component-contract/pricing-table.md)
- 推荐 3 档：Free / Pro ⭐ / Enterprise
- 也可 4 档：Free / Starter / Pro / Enterprise
- 推荐档视觉突出：scale-105 + 阴影 + "Most popular" 徽章
- 卡片顺序按价格升序（不要把 Free 放最后）

### 4. Trust row
- 单一浅色背景条
- 居中文字: "✓ 30-day money-back guarantee · ✓ No credit card required · ✓ Cancel anytime"
- 也可加安全认证: "SOC 2 Type II · GDPR"

### 5. Comparison table
- 横向: 各档位
- 纵向: 功能
- 功能顺序按**用户决策权重**排（不是字母序）：

```
1. 月度价格（最重要）
2. 项目/团队规模限制
3. 存储 / 带宽 / 请求数
4. 核心功能（自动化/集成/导出）
5. 协作功能（成员数/角色）
6. 安全（SAML/SSO/审计日志）
7. 支持（响应时间/专属 CSM）
8. SLA（99.9% / 99.99%）
```

- Cell 内容:
  - ✓ 用绿色 check icon
  - ✗ 用灰色 dash
  - 数字直接写
  - "Unlimited" / "Custom" 直接写

### 6. Feature explanation (optional)
- 2-3 个**非显而易见**的功能详细说明
- 用 alternating 布局（左图右文 / 右图左文）
- 不要解释所有功能，只解释"差异化卖点"

### 7. Testimonial
- 单条大客户推荐
- 与 Pro 档价格相关的客户（如年付 $20K+）
- 头像 + 职位 + 公司

### 8. FAQ
- 6-10 个问题，按"决策影响"排序：

```
1. Can I try free first? → Yes, 14-day free trial, no credit card
2. What payment methods? → Card, ACH, wire
3. Can I change plans? → Yes, prorated
4. What if I cancel? → Access until end of period, then data export
5. Do you offer discounts? → Annual save 20%, non-profit 50%
6. Is my data secure? → SOC 2, GDPR, HIPAA (Enterprise)
7. Do you have a refund policy? → 30-day money-back
8. Can I get a custom plan? → Yes, contact sales
```

- Accordion 折叠（不要全展开）
- FAQ 内容可直接生成 FAQPage JSON-LD

### 9. CTA band
- "Still have questions? Talk to sales"
- Primary: "Contact sales"
- Secondary: "Start free trial"（如不需销售）

---

## 关键 SEO

- `<title>`: "Pricing — [Product Name]"
- `<meta description>`: 含 "Starting at $X/mo" + "free trial"
- **JSON-LD** `Product` 含 `offers`（多个 `Offer` 节点）
- **JSON-LD** `FAQPage` 含所有 FAQ（可直接从 FAQ 内容生成）
- **JSON-LD** `BreadcrumbList` (Home > Pricing)
- Canonical: `https://example.com/pricing`

---

## URL 设计

| URL | 用途 |
|---|---|
| `/pricing` | 默认（无锚点） |
| `/pricing?billing=annual` | 切换年付（用户分享链接可保持状态） |
| `/pricing#faq` | 跳到 FAQ |
| `/pricing#compare` | 跳到对比表 |

## 性能要求

| 指标 | 目标 |
|---|---|
| Toggle 切换响应 | < 100ms |
| Table 渲染 | 表格 < 100 行 |
| LCP | ≤ 2.0s |
| Lighthouse | ≥ 90 |

## Pitfalls

- ❌ **价格不写**（"Contact us"）→ 用户跳出
- ❌ **价格写"From $X"** → 用户怀疑实际更贵
- ❌ **月年付不显示节省** → 用户不知道 annual 划算
- ❌ **3 档长得一样** → 用户看不出推荐
- ❌ **功能列表太短**（如 5 项）→ 不够决策
- ❌ **功能列表太长**（如 50 项）→ 用户读完就累
- ❌ **对比表用字母序排** → 重要功能埋在中间
- ❌ **Free 档功能太少** → 用户直接跳到 Pro
- ❌ **CTA 每页文案不同**（这里"Sign up"，首页"Get started"）→ 信任崩塌
- ❌ **Enterprise 档"Custom" + 无 contact** → 用户不知道怎么走
- ❌ **无 FAQ** → 销售压力↑ / 转化率↓

## Reference implementations

- **Stripe (`/pricing`)** — 3 档 + 对比表 + FAQ（最经典）
- **Vercel (`/pricing`)** — 4 档 + 详细对比
- **Linear (`/pricing`)** — 2 档 + 简洁对比
- **Notion (`/pricing`)** — 个人/团队 双 tab + 简洁
- **Cal (`/pricing`)** — 详细功能对比
- **Resend (`/pricing`)** — 极简 + 用量计费

## 模板代码

```vue
<template>
  <PageContainer>
    <NavHeader />

    <PageHeader
      title="Simple, transparent pricing"
      subtitle="No hidden fees. Cancel anytime."
    >
      <BillingToggle v-model="billing"/>
    </PageHeader>

    <TierCards
      :tiers="tiers"
      :billing="billing"
    />

    <TrustRow
      :items="['30-day money-back', 'No credit card', 'Cancel anytime']"
    />

    <ComparisonTable
      :rows="comparisonRows"
      :tiers="tiers"
    />

    <FeatureExplanation
      v-for="feature in highlights"
      :key="feature.id"
      v-bind="feature"
    />

    <Testimonial :quote="featuredTestimonial"/>

    <FaqAccordion :items="faqs"/>

    <CtaBand
      title="Still have questions?"
      subtitle="Our team is here to help."
      cta-primary="Contact sales"
      cta-secondary="Start free trial"
    />

    <SiteFooter/>
  </PageContainer>
</template>
```
