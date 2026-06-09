---
name: saas-marketing-seo-checklist
description: DEPRECATED stub. Cross-category SEO checklist moved to references/methodology/seo-checklist.md. This file retains SaaS-specific extensions (e.g. AggregateOffer JSON-LD) and points to the canonical version.
---

# SaaS Marketing · SEO Checklist

> ⚠️ **DEPRECATED**: 本文件已**抽到跨类别通用版** → [`../references/methodology/seo-checklist.md`](../references/methodology/seo-checklist.md)
>
> 通用版覆盖 1-13 节（含 14 节"按类别适配"）。本文件**仅保留 SaaS-specific 扩展**（如 AggregateOffer 详细字段、Changelog 页面 SEO 策略），不再重复通用内容。

---

## 1. SaaS-specific 扩展

### 1.1 Changelog / Release Notes 页面

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "v1.2.0: Faster CI, new API endpoints",
  "datePublished": "2024-01-15",
  "author": {"@type": "Organization", "name": "Brand"},
  "publisher": {"@type": "Organization", "name": "Brand"},
  "image": "https://example.com/og/changelog.png"
}
```

**Changelog 页面 SEO 要点**：
- 每条 release 单独 URL（`/changelog/v1-2-0` 而非 `/changelog#v1-2-0`）—— 长期 Google 搜索流量
- `Article` JSON-LD + `datePublished` 真实日期
- 顶部加"所有更新" 时间线 + 标签分类

### 1.2 AggregateOffer（多档定价）

SaaS 价格页通常 2-4 档，用 `AggregateOffer` 而非多个 `Offer`：

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Brand Subscription",
  "description": "...",
  "brand": {"@type": "Brand", "name": "Brand"},
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "USD",
    "lowPrice": 0,
    "highPrice": 99,
    "offerCount": 3,
    "offers": [
      {"@type": "Offer", "name": "Free", "price": 0},
      {"@type": "Offer", "name": "Pro", "price": 29},
      {"@type": "Offer", "name": "Team", "price": 99}
    ]
  }
}
```

### 1.3 SoftwareApplication JSON-LD（产品页）

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Brand",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "USD",
    "lowPrice": 0,
    "highPrice": 99
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "200"
  }
}
```

### 1.4 集成页（Integrations）

每个集成单独页 + JSON-LD：

```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Brand + Slack",
  "url": "https://example.com/integrations/slack"
}
```

**避免**：用 query string（`/integrations?tool=slack`）—— 独立 URL 才有 SEO 价值

### 1.5 客户案例（Case Studies）

每篇案例页用 `Article` + `about` 关联客户：

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How Acme shipped 5x faster",
  "about": {
    "@type": "Organization",
    "name": "Acme",
    "url": "https://acme.com"
  },
  "author": {"@type": "Organization", "name": "Brand"},
  "datePublished": "2024-01-15"
}
```

---

## 2. SaaS Pitfalls（通用 13 条 + SaaS 4 条）

通用 13 条见 references 版，**SaaS 特定 4 条**：

- ❌ **Pricing JSON-LD 用 Offer 而非 AggregateOffer** → 多个 offer 重复
- ❌ **Changelog 缺独立 URL** → 失去长期搜索流量
- ❌ **集成页用 query string** → 无独立索引
- ❌ **SoftwareApplication 缺 aggregateRating** → 错失 stars in SERPs

---

## 3. See also

- 通用版（必读）：[`../references/methodology/seo-checklist.md`](../references/methodology/seo-checklist.md)
- saas-marketing 专题：[`../saas-marketing/README.md`](../saas-marketing/README.md)
- 性能预算：[`../references/methodology/performance-budget.md`](../references/methodology/performance-budget.md)
