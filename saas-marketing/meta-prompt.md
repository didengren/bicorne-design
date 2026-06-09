---
name: saas-marketing-meta-prompt
description: PHASE 4 pre-flight checklist for SaaS marketing sites — token, brand picks, page map, SEO, Lighthouse 90+, cross-page consistency.
keywords: saas, marketing, pre-flight, seo, lighthouse, cross-page
---

# saas-marketing · PHASE 4 Pre-flight

> 开工前必读。回答完所有"必须"项后，才开始写第一行代码。

---

## 1. 项目元数据

| 问题 | 你的回答 |
|---|---|
| 品牌名 |  |
| 业务定位（一句话） |  |
| 目标受众 | □ 开发者 □ 设计师 □ 业务决策者 □ 终端用户 |
| 站类型 | □ 多页品牌站（5-15 页） □ 单页 landing |
| 主转化目标 | □ 注册 □ 预约 demo □ 下载 □ 加购 □ 联系销售 |
| 关键期 | □ 启动期（讲故事+SEO） □ 成长期（产品+客户案例） □ 成熟期（增加 changelog+careers） |

## 2. 品牌参考（必选 2-3 个）

从 `../references/brand-library/` 选：

| 类别 | 首选 |
|---|---|
| 极简品牌 | stripe / vercel / linear / notion |
| DevTools | vercel / clickhouse / supabase / sentry |
| 高端 SaaS | airtable / cal / intercom / raycast |
| 内容型 | mintlify / resend / mintlify |

> 选完记录：________________

## 3. Token 主题

| 选择 | 路径 |
|---|---|
| □ 暗色为主 | `../templates/dark-theme.template.json` |
| □ 亮色为主 | `../templates/light-theme.template.json` |
| □ 双主题（亮+暗） | 两者都用，通过 `prefers-color-scheme` 切换 |
| □ dashboard 风格 | `../templates/dashboard-dark.template.json`（不推荐用于 marketing） |

> ⚠️ 选完需用 `../scripts/generate-token.mjs` 生成 `token.json`，并用 `../tailwind-bridge/` 自动生成 `tailwind.config.ts`。

## 4. 页面地图（必选 ≥ 5 页）

| # | 页面 | 路径 | 优先级 | 布局 |
|---|---|---|---|---|
| 1 | 产品总览（Product） | `/` 或 `/product` | P0 | [S1](./layouts/S1-product.md) |
| 2 | 价格（Pricing） | `/pricing` | P0 | [S2](./layouts/S2-pricing.md) |
| 3 | 客户案例（Customers） | `/customers` | P1 | [S3](./layouts/S3-customers.md) |
| 4 | 博客列表 | `/blog` | P1 | 列表 |
| 5 | 博客详情 | `/blog/[slug]` | P1 | 详情 |
| 6 | 招聘（Careers） | `/careers` | P2 | 列表 |
| 7 | 更新日志（Changelog） | `/changelog` | P2 | 时间线 |
| 8 | 法律（Privacy / Terms） | `/legal/privacy`, `/legal/terms` | P1 | 纯文本 |
| 9 | 联系（Contact） | `/contact` | P2 | 表单 |
| 10 | 登录/注册 | `/sign-in`, `/sign-up` | P0 | [AF1](../auth-flows/layouts/AF1-centered.md) |

## 5. 组件清单（必选 ≥ 5 个）

| 组件 | 必含 | 文档 |
|---|---|---|
| 顶部导航 + 页脚 | ✅ | [nav-footer.md](./component-contract/nav-footer.md) |
| 大 Hero（标题+副+CTA+演示） | ✅ | [hero-section.md](./component-contract/hero-section.md) |
| 功能网格 | ✅ | [feature-grid.md](./component-contract/feature-grid.md) |
| 价格表 | ✅ | [pricing-table.md](./component-contract/pricing-table.md) |
| 客户 logo 墙 | ✅ | [social-proof.md](./component-contract/social-proof.md) |
| 推荐语 | ⬜ | [testimonial.md](./component-contract/testimonial.md) |
| FAQ | ✅ | [faq-accordion.md](./component-contract/faq-accordion.md) |
| 博客卡 | ✅ | [blog-card.md](./component-contract/blog-card.md) |
| CTA 横幅 | ✅ | [cta-band.md](./component-contract/cta-band.md) |

## 6. SEO 必做（见 [seo-checklist.md](./seo-checklist.md)）

- ☐ 每页 `<title>` 唯一且 50-60 字符
- ☐ 每页 `<meta description>` 唯一且 150-160 字符
- ☐ Open Graph（`og:title` / `og:image` / `og:description`）
- ☐ Twitter Card
- ☐ `sitemap.xml` 自动生成
- ☐ `robots.txt` 配置
- ☐ 结构化数据（JSON-LD）：Organization / Product / Article / FAQPage
- ☐ Canonical URL
- ☐ Hreflang（多语言）
- ☐ 图像 alt 文本
- ☐ 内部链接策略

## 7. 性能预算（见 [performance.md](./performance.md)）

- ☐ Lighthouse Performance ≥ 90（mobile）
- ☐ Lighthouse SEO ≥ 95
- ☐ Lighthouse Accessibility ≥ 95
- ☐ LCP ≤ 2.5s
- ☐ CLS ≤ 0.1
- ☐ INP ≤ 200ms
- ☐ 首屏 JS ≤ 100KB（gzip）
- ☐ 图像：WebP/AVIF + responsive sizes
- ☐ 字体：sub-set + font-display: swap
- ☐ 关键 CSS 内联

## 8. 跨页面一致性（Critical）

- ☐ 同一 Logo、同一品牌色 token
- ☐ 同一字体（subset 化）
- ☐ 顶部导航 + 页脚**所有页面**一致
- ☐ 主 CTA 文案统一（"Start free trial" vs "Get started" vs "Try for free"）
- ☐ 主 CTA 颜色统一（不每页变）
- ☐ 暗色/亮色切换**所有页面**同步
- ☐ 浏览器标题/语言一致

## 9. 内容资产

| 资产 | 数量 | 来源 |
|---|---|---|
| 客户 logo | ≥ 6 个 | 客户授权 |
| 客户引言 | ≥ 3 条 | 客户授权 |
| 团队照片 | ≥ 5 张 | 拍摄 |
| 产品截图/演示 | ≥ 8 张 | 设计稿 |
| 博客文章 | ≥ 5 篇 | 运营 |
| 视频演示 | ≥ 1 个 | 录制 |

## 10. 不要做（见 [pitfalls/](./pitfalls/)）

- ☐ 不做模态弹窗广告
- ☐ 不做假社会证明（"10000+ 用户"如果只有 1000）
- ☐ 不做虚假倒计时
- ☐ 不做暗色自动跟随但缺亮色
- ☐ 不做首屏大背景视频（性能死刑）
- ☐ 不做隐藏价格（需查价格才能转化的反而更低）

## 11. 启动前最后检查

- ☐ token.json 通过 `../scripts/validate-token.mjs`
- ☐ tailwind.config.ts 已生成且 `dash-*` 变量齐全
- ☐ 至少 5 个页面布局模板已选定
- ☐ 至少 5 个核心组件契约已读过
- ☐ SEO 清单全勾
- ☐ 性能预算全勾

---

## 12. 完成后

跑 `../verification/4-2-stripe-landing/` 的 e2e 验证（如已迁移到跨类别版）：
```bash
bash ../../specs/implement-dashboard-system/e2e-validate.sh --category saas-marketing
```

> 详见 [verification/](./verification/) README。
