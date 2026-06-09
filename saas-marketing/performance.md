---
name: saas-marketing-performance
description: DEPRECATED stub. Cross-category performance budget moved to references/methodology/performance-budget.md. This file retains SaaS-specific asset budget (JS/CSS per page) and 5 SaaS pitfalls that are not in the cross-category version.
---

# SaaS Marketing · Performance Budget

> ⚠️ **DEPRECATED**: 本文件已**抽到跨类别通用版** → [`../references/methodology/performance-budget.md`](../references/methodology/performance-budget.md)
>
> 通用版覆盖核心 Web Vitals 预算 + 5 类别专项指标（Dashboard / Admin Panel / **Marketing** 3.3 / E-commerce / Docs）。
> 本文件**仅保留 SaaS-specific 资产预算（JS/CSS per page）和 10 个 SaaS pitfalls**。

---

## 1. SaaS-specific Asset 预算

> 通用核心 Web Vitals（LCP/CLS/INP 等）见 references/performance-budget.md 2 节。

### 1.1 JavaScript 预算（per page）

| 页面 | 预算 | 警告 | 失败 |
|---|---|---|---|
| 首页 | ≤ 80KB gzip | 80-150KB | > 150KB |
| 价格 | ≤ 60KB | 60-100KB | > 100KB |
| 客户案例 | ≤ 100KB | 100-200KB | > 200KB |
| 博客详情 | ≤ 100KB | 100-200KB | > 200KB |

**重要原则**：
- 路由级 code splitting（每个页面单独 chunk）
- 第三方脚本（分析/客服）**延后加载**
- 不打包 moment.js / lodash 全量（用 date-fns / 原生）

### 1.2 CSS 预算

| 页面 | 预算 |
|---|---|
| 任何页 | ≤ 30KB gzip |
| 内联首屏 critical CSS | ≤ 15KB |

### 1.3 图像预算（SaaS-specific）

| 类型 | 单图上限 | 格式 |
|---|---|---|
| Hero 主图 | 200KB | AVIF / WebP, 16:9 |
| Logo | 10KB | SVG |
| 客户 logo | 20KB | SVG |
| 缩略图 | 80KB | WebP, 16:9 |
| OG image | 200KB | PNG/JPG, 1200×630 |

### 1.4 字体预算

- 每字重 ≤ 30KB（sub-set 后）
- 总字体加载 ≤ 100KB
- 加载字重 ≤ 4 个

### 1.5 总页面体积（首屏）

- ≤ 1MB（gzip 前）
- ≤ 300KB（gzip 后）

---

## 2. SaaS-specific 优化策略

### 2.1 关键路径 CSS

```html
<!-- 内联首屏 critical CSS（≤ 15KB） -->
<style>
  /* nav + hero + first section */
</style>

<!-- 其余 CSS 异步加载 -->
<link rel="preload" href="/css/main.css" as="style" onload="this.rel='stylesheet'"/>
<noscript><link rel="stylesheet" href="/css/main.css"/></noscript>
```

### 2.2 缓存策略

```
# 静态资源（带 hash 文件名）— 1 年
Cache-Control: public, max-age=31536000, immutable

# HTML — 不缓存或短期
Cache-Control: public, max-age=0, must-revalidate
```

CDN：Cloudflare / Vercel Edge / CloudFront + Brotli 压缩。

### 2.3 LCP 优化（Hero 图 / 标题字）

- Hero 图 preload + 高优先级
- 标题字体 preload 关键字重
- 服务端渲染（SSR）首屏
- 边缘缓存 HTML

### 2.4 INP 优化

- 长任务拆分（> 50ms 用 `setTimeout(0)` / `requestIdleCallback`）
- 减少 hydration 成本
- 路由切换 prefetch

---

## 3. 性能预算拦截（CI 集成）

```yaml
# .lighthouserc
{
  "ci": {
    "assert": {
      "preset": "lighthouse:no-pwa",
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:seo": ["error", { "minScore": 0.95 }],
        "first-contentful-paint": ["error", { "maxNumericValue": 1500 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }],
        "total-blocking-time": ["warn", { "maxNumericValue": 300 }]
      }
    }
  }
}
```

---

## 4. SaaS Pitfalls（通用 + SaaS 特定 10 条）

通用 Pitfalls 见 references 版，**SaaS 特定 10 条**：

- ❌ **首屏大背景视频**（自动播放） → LCP 100% 失败
- ❌ **第三方脚本同步加载**（Google Analytics 不加 defer） → 阻塞
- ❌ **CSS 全量加载不分关键路径** → FCP 慢
- ❌ **图像无 width/height** → CLS 灾难
- ❌ **字体加载阻塞渲染**（无 `font-display: swap`） → FOUT
- ❌ **每路由都打包 moment / lodash** → JS 爆
- ❌ **OG image 用 PNG 而非优化格式** → 分享预览慢
- ❌ **多语言资源不按需加载**（如 ja 用户也加载 en 数据） → 浪费
- ❌ **没有 CDN** → 跨地区慢
- ❌ **没有 preload 关键资源** → LCP 慢

---

## 5. Reference implementations

- **Vercel** — Edge cache + Geist font preload + AVIF
- **Stripe** — Critical CSS inline + 路由 split
- **Linear** — 极简 JS + 预渲染
- **Notion** — 路由级 code split + 图像 lazy
- **Cloudflare / Vercel 文档** — Performance budget 范式

---

## 6. See also

- 通用版（必读）：[`../references/methodology/performance-budget.md`](../references/methodology/performance-budget.md)
- 字体加载：[`../references/methodology/font-loading-strategy.md`](../references/methodology/font-loading-strategy.md)
- SEO：[`../references/methodology/seo-checklist.md`](../references/methodology/seo-checklist.md)
- Typography：[`../references/methodology/typography.md`](../references/methodology/typography.md)
- saas-marketing 专题：[`../saas-marketing/README.md`](../saas-marketing/README.md)
