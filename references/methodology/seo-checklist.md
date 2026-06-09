---
name: seo-checklist
description: Cross-category SEO checklist — meta tags, Open Graph, JSON-LD structured data, sitemap, robots, hreflang, URL design, internal linking. Applies to all public-facing web categories (saas-marketing, landing-pages, ecommerce, admin-panels public pages).
---

# SEO Checklist — 跨类别通用版

> 任何有"公开网页"的项目（无论 saas-marketing 多页 / landing-pages 单页 / ecommerce 商店 / admin-panels 公开页 / dashboards 公开报告页）都应**完整执行**本清单。SEO 决策搜索流量——通常占比 30-50%。

> **本文件已从 `../saas-marketing/seo-checklist.md` 抽出为跨类别通用版**。SaaS-specific 扩展（如 Product/AggregateOffer JSON-LD）保留在原位 stub 中，按需加载。
> **类别化定制**详见末尾"按类别适配"小节。

---

## 1. Meta 标签（每页必做）

### `<title>` 50-60 字符
- 格式: `[Page] — [Brand]` 或 `[Brand] · [Page]`
- 示例:
  - 首页: `Stripe — Financial Infrastructure to Grow Your Revenue`
  - 价格: `Pricing — Stripe`
  - 博客: `How Vercel Scales Edge Functions · Vercel Blog`
- 唯一（不要每页相同）
- 主关键词在前

### `<meta name="description">` 150-160 字符
- 一句话讲清"这是什么 + 为谁 + 核心价值"
- 包含 call-to-action
- 唯一
- 不要 keyword stuffing

### `<link rel="canonical">`
- 每页唯一 canonical URL
- 避免 query string 重复（`?utm_source=` 应指向无参数版）
- HTTPS + 不带 trailing slash

### `<meta name="robots">`
- 默认: `index, follow`
- 不要索引: `<meta name="robots" content="noindex, follow">`
- 注意: `noindex` 与 `nofollow` 含义不同

---

## 2. Open Graph（社交分享）每页必做

```html
<meta property="og:type" content="website"/>
<meta property="og:title" content="..."/>
<meta property="og:description" content="..."/>
<meta property="og:url" content="https://example.com/..."/>
<meta property="og:image" content="https://example.com/og/..."/>
<meta property="og:image:width" content="1200"/>
<meta property="og:image:height" content="630"/>
<meta property="og:site_name" content="Brand"/>
<meta property="og:locale" content="en_US"/>
```

### OG image 要求
- 尺寸 1200×630 (1.91:1)
- ≤ 200KB
- 包含品牌 logo + 标题 + 副标题
- 文件命名: `og-home.png`, `og-pricing.png` 等

### Twitter Card
```html
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:site" content="@brand"/>
<meta name="twitter:title" content="..."/>
<meta name="twitter:description" content="..."/>
<meta name="twitter:image" content="..."/>
```

---

## 3. 结构化数据（JSON-LD）

每页加 `<script type="application/ld+json">` 块：

### 首页 (Organization)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Brand",
  "url": "https://example.com",
  "logo": "https://example.com/logo.png",
  "sameAs": [
    "https://twitter.com/brand",
    "https://github.com/brand"
  ]
}
```

### 产品/服务 (Product + Offers)
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Brand Pro",
  "description": "...",
  "brand": {"@type": "Brand", "name": "Brand"},
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "USD",
    "lowPrice": 0,
    "highPrice": 99,
    "offerCount": 3
  }
}
```

### FAQ 页 / 段
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Can I try free first?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, 14-day free trial."
      }
    }
  ]
}
```

### 博客文章
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "...",
  "author": {"@type": "Person", "name": "..."},
  "datePublished": "2024-01-15",
  "image": "..."
}
```

### 案例详情
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How Acme shipped 5x faster",
  "about": {"@type": "Organization", "name": "Acme"}
}
```

### 全站 Breadcrumb（每页）
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Home", "item": "/"},
    {"@type": "ListItem", "position": 2, "name": "Pricing", "item": "/pricing"}
  ]
}
```

---

## 4. Sitemap

### sitemap.xml
- 自动生成（next-sitemap / nuxt-sitemap / 自写脚本）
- 每页 `lastmod` 真实日期
- 优先级:
  - 首页: 1.0
  - 产品/价格: 0.9
  - 博客详情: 0.8
  - 博客列表: 0.7
  - 法律页: 0.3
- 不放 noindex 页
- `<changefreq>` 准确:
  - 首页/产品: weekly
  - 博客: weekly
  - 价格: monthly
  - 法律: yearly

### sitemap.xml 提交
- Google Search Console
- Bing Webmaster Tools

---

## 5. robots.txt

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /private/

Sitemap: https://example.com/sitemap.xml
```

---

## 6. URL 设计

### 原则
- 短、可读、含关键词
- 全部小写
- 单词用 `-` 分隔（不是 `_`）
- 不用 query string 作主路由

### 推荐
- `/pricing`
- `/customers/acme`
- `/blog/how-acme-shipped-5x-faster`
- `/changelog/2024-01-15`

### 避免
- `/page?id=123` ❌
- `/Pricing` ❌
- `/blog/post_123` ❌

---

## 7. Hreflang（多语言）

```html
<link rel="alternate" hreflang="en" href="https://example.com/pricing"/>
<link rel="alternate" hreflang="zh-CN" href="https://example.com/zh/pricing"/>
<link rel="alternate" hreflang="x-default" href="https://example.com/pricing"/>
```

每页都要带，包括：
- en / zh / ja / ko / es 等版本
- `x-default` 指向默认语言

---

## 8. 性能（也影响 SEO）

详见 [performance-budget.md](./performance-budget.md)：
- LCP ≤ 2.5s
- CLS ≤ 0.1
- INP ≤ 200ms
- Lighthouse SEO ≥ 95

---

## 9. 图像优化

- 格式: WebP / AVIF（不用 PNG/JPG）
- responsive sizes: `400w / 800w / 1200w / 1600w`
- `loading="lazy"` (除首屏 hero 图)
- `decoding="async"`
- 必须 alt 文本（描述图意，不是 "image"）

---

## 10. 内部链接

### 关键路径
- 首页 → 价格 → 注册
- 首页 → 客户案例 → 客户详情
- 博客 → 相关文章
- 客户详情 → 关联产品页
- Footer → 全站地图（重要页）

### 锚文本
- ✅ 描述性: "View our pricing plans"
- ❌ 模糊: "Click here" / "Read more"
- ❌ 裸 URL: `https://example.com/pricing`

---

## 11. 站内搜索

- 关键页应被 nav / footer 链接
- 重要页面在 sitemap 中
- HTML sitemap 页（可选，作为 fallback）

---

## 12. Schema.org 验证工具

完成后用以下工具验证：
- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema Markup Validator: https://validator.schema.org/
- Google Search Console → URL Inspection

---

## 13. Pitfalls

- ❌ **每页 title 相同** → SEO 灾难
- ❌ **description 写"Home - Brand"** → 用户不点
- ❌ **og:image 用 1200×1200** → 平台裁切
- ❌ **og:image 缺标题文字** → 看起来空洞
- ❌ **JSON-LD 格式错** → Google 忽略
- ❌ **canonical 指错** → 重复内容惩罚
- ❌ **noindex 重要页**（如首页）→ 灾难
- ❌ **hreflang 反向链接缺失** → 国际化失效
- ❌ **多语言页面缺 hreflang** → 跨语言混乱
- ❌ **图像无 alt 文本** → SEO + 可访问性双输
- ❌ **URL 用 query string** → 分享/SEO 都差
- ❌ **internal link 用 "click here"** → 锚文本无价值
- ❌ **移动版 / 桌面版不同 URL 无 annotation** → 移动排名差

---

## 14. 按类别适配

> 通用清单 1-13 节所有类别都应执行；本节给出**类别特定补充**。

### SaaS Marketing（多页品牌站）
- 全套执行
- JSON-LD：Organization（首页）+ Product/AggregateOffer（价格）+ Article（博客）+ BreadcrumbList（每页）
- 详情见 [../../saas-marketing/README.md § 必做 SEO](../../saas-marketing/README.md)

### Landing Pages（单页营销）
- 全套执行（meta/OG/JSON-LD/sitemap/robots/性能）
- 重点关注：og:image、description（含 CTA）、单页结构化（Organization + 单一 Product）
- 详情见 [../../landing-pages/README.md § 通用方法论](../../landing-pages/README.md)

### E-commerce（电商）
- 全套执行 + **Product/Review/InventoryAvailability JSON-LD**（商品详情页）
- 重点关注：商品 OG image、价格快照、库存状态
- 详情见 [../../ecommerce/README.md](../../ecommerce/README.md)（待建）

### Admin Panels（后台）
- **公开页**（登录页 / 营销页 / 文档页 / 法律页）执行本清单
- **后台内部页**（`/admin/*`）`noindex, follow`（不索引但允许爬虫跟踪）
- 详情见 [../../admin-panels/README.md § 通用方法论](../../admin-panels/README.md)

### Dashboards（数据大屏）
- **公开报告页**（数据公开 / 客户案例）执行本清单
- **内部大屏**（运营/管理层）`noindex`（不索引）
- 详情见 [../../dashboards/README.md § 通用方法论](../../dashboards/README.md)

### Native App / Mobile Web / AI Products
- Web 部分按对应类别执行
- 移动应用商店 metadata 走各自平台（App Store / Google Play）规范

---

## Reference

- Google Search Central: https://developers.google.com/search
- Schema.org: https://schema.org/
- Open Graph: https://ogp.me/
- Twitter Cards: https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards

---

## See also（按类别特定扩展）

| 类别 | 类别特定 SEO 扩展 |
|---|---|
| saas-marketing | `saas-marketing/seo-checklist.md`（本文件原位 stub，含 SaaS 特定扩展） |
| landing-pages | `landing-pages/component-contract/hero-cta.md § Meta 必备`（单页 SEO 速查） |
