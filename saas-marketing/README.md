---
name: saas-marketing
description: SaaS marketing site category workspace — multi-page brand site (product, pricing, customers, blog, careers), SEO-first, Lighthouse 90+, marketing site vs single-page landing distinction.
keywords: saas, marketing, brand-site, multi-page, seo, lighthouse
---

# SaaS Marketing Sites — Category Workspace

> 本目录是 **SaaS Marketing Site（SMM）** 类别专题：多页品牌站，与单页转化 landing 区分。
>
> **关键区分**：Landing Page 是单页营销（首页即着陆页 + CTA），SMM 是多页品牌站（产品/价格/客户/博客/招聘/法律/SEO/跨页面一致）。

---

## 何时进入本目录

| 信号 | 必读路径 |
|---|---|
| 用户说"做一个产品官网 / 品牌站 / 公司主页" | 本目录 |
| 多页面（≥3 页：产品 + 价格 + 博客） | 本目录（landing-pages 仅适用单页） |
| SEO 优先（Lighthouse 90+ / OG / sitemap） | 本目录 `meta-prompt.md` SEO 清单 |
| 已确定做 SMM | `component-contract/nav-footer.md` 跨页面一致 |

**反例**（不要进本目录）：
- 单页营销 → `landing-pages/`
- 后台管理 → `admin-panels/`
- 监控大屏 → `dashboards/`

---

## 通用方法论（跨类别）

> 通用层方法论与本类别的关系：

| 主题 | 通用层文件 | 本类别文件 |
|---|---|---|
| 动画（跨平台差异） | [`../references/methodology/animation-cross-platform.md`](../references/methodology/animation-cross-platform.md) | （待建设：Hero/scroll/marquee 三类） |
| 性能（跨类别预算） | [`../references/methodology/performance-budget.md`](../references/methodology/performance-budget.md) | [`performance.md`](./performance.md)（Lighthouse 90+ 多页） |
| 📚 方法论总索引 | [`../references/methodology/INDEX.md`](../references/methodology/INDEX.md) | — |

---

## 与 `landing-pages/` 的边界

| 维度 | Landing Page | SaaS Marketing Site |
|---|---|---|
| 页数 | 1 页（首屏即转化） | **5-20+ 页** |
| 导航 | 无或极简 | **完整顶部导航 + 页脚** |
| 目的 | 单 CTA 转化 | **多触点品牌建设** |
| 内容运营 | 静态 | **博客/案例/招聘/法律** |
| SEO | 可选 | **必须**（sitemap/OG/schema） |
| 性能 | 1 页 Lighthouse | **多页 Lighthouse 90+** |
| 跨页面一致性 | N/A | **设计令牌 + 跨页面组件** |

---

## 目录结构（MVI 目标态）

```
saas-marketing/
├── README.md                       ← 你在这里
├── meta-prompt.md                  ← PHASE 4 预检 + SEO 清单
│
├── # 组件层
├── component-contract/
│   ├── README.md
│   ├── nav-footer.md              ★ 顶部导航 + 页脚（跨页面一致）
│   ├── hero-section.md            ★ 大 Hero（标题+副标题+CTA+演示图/视频）
│   ├── feature-grid.md            ★ 功能网格（图标+标题+描述+演示）
│   ├── social-proof.md            ★ 客户 logo 墙 + 统计数字
│   ├── testimonial.md             ★ 推荐语（头像+引言+公司+链接）
│   ├── pricing-table.md           ★ 价格表（3 栏对比 / 月年付切换 / 推荐档高亮）
│   ├── faq-accordion.md           ★ FAQ 手风琴
│   ├── blog-card.md               ★ 博客卡（图+标题+摘要+作者+时间+分类）
│   ├── cta-band.md                ★ CTA 横幅（页中/页底）
│   ├── logo-cloud.md              ★ Logo 墙（"as seen in"）
│   └── changelog-entry.md         ★ Changelog 条目
│
├── # 布局层
├── layouts/
│   ├── README.md
│   ├── S1-product.md              产品总览（Hero + Features + Social Proof + CTA）
│   ├── S2-pricing.md              价格页（Toggle + Table + Comparison + FAQ + CTA）
│   ├── S3-customers.md            客户案例（按行业筛选 + 大案例 + 故事墙）
│   ├── S4-blog.md                 博客列表 + 详情（索引 + TOC + 分享 + 相关阅读）
│   ├── S5-careers.md              招聘页（价值观 + 职位 + 福利 + 团队）
│   ├── S6-changelog.md            更新日志（时间线 + 标签 + 搜索）
│   └── S7-legal.md                法律页（隐私/服务条款/合规，纯文本）
│
├── # 经验层
├── pitfalls/                       ★ SMM 专属反模式
│   └── README.md
├── typography.md                   ★ 大字号/行高/字距（多档字阶）
├── ui-states.md                    （复用 landing-pages 80%）
├── seo-checklist.md               ★ SEO 必做项（sitemap/OG/JSON-LD/Hreflang）
├── performance.md                  ★ Lighthouse 90+（多页 TTI/LCP/CLS）
│
└── # 验证层
    └── verification/
        └── 4-2-stripe-landing/     ★ Stripe 风格多页品牌站（已有）
```

---

## 首选品牌参考

| 品牌 | 子类型 | 风格 |
|---|---|---|
| Stripe | 极简多页 + 3D 插画 | 极致细节/渐变/暗色为主 |
| Vercel | DevOps 多页 | 渐变/对比/明亮/动画 |
| Linear | 极简高密度 | 极简/快捷键/暗色 |
| Notion | 亲和 + 留白 | 极简/插画/明亮 |
| Mintlify | 文档+营销融合 | 极简/明亮 |
| Resend | 邮件营销 | 极简/留白/明亮 |
| Raycast | 工具型 | 暗色/产品演示视频 |
| Posthog | 产品分析 | 极简/数据可视化 |
| Warp | 终端型 | 现代/极简 |
| Vercel / Linear / Resend 暗色 | 暗色品牌 | 主导地位 |

---

## 与通用层的关系

| 内容 | 归属 |
|---|---|
| Token | `../templates/light-theme.template.json` 或 `dark-theme.template.json` |
| 品牌 | `../references/brand-library/`（电商/fintech/dev-tools/SaaS 选） |
| SEO 通用方法 | （待上提至 `../references/methodology/seo-checklist.md`） |
| 性能通用方法 | （待上提至 `../references/methodology/performance-budget.md`） |

---

## 建设优先级

| 任务 | 优先级 | 预估 |
|---|---|---|
| ✅ 占位 README | P0 | done |
| ✅ 迁入 `verification/4-2-stripe-landing/` | P0 | done |
| `meta-prompt.md` | P1 | 0.5d |
| `component-contract/nav-footer.md` | P1 | 1d |
| `component-contract/hero-section.md` | P1 | 1d |
| `component-contract/feature-grid.md` | P1 | 0.5d |
| `component-contract/pricing-table.md` | P1 | 1d |
| `component-contract/blog-card.md` | P2 | 0.5d |
| `component-contract/testimonial.md` | P2 | 0.5d |
| `component-contract/faq-accordion.md` | P2 | 0.5d |
| `component-contract/cta-band.md` | P2 | 0.5d |
| `component-contract/social-proof.md` | P2 | 0.5d |
| `component-contract/logo-cloud.md` | P2 | 0.5d |
| `layouts/S1-S7` × 7 | P1 | 7d |
| `typography.md`（多档字阶） | P1 | 1d |
| `seo-checklist.md` | P1 | 1d |
| `performance.md`（Lighthouse 90+） | P1 | 1d |
| `pitfalls/` 10-15 条 | P1 | 1d |
| 第 2 个 verification（Vercel 风格） | P2 | 2d |
