---
name: landing-pages
description: Single-page marketing landing category workspace — hero sections, feature blocks, social proof, pricing CTAs, conversion-focused one-pagers. Distinct from saas-marketing (multi-page brand sites).
keywords: landing, single-page, marketing, hero, cta, conversion, one-pager
---

# Landing Pages — Category Workspace (MVI)

> 本目录是 **Landing Page（单页营销）** 类别专题：**一屏一目的转化页**。
>
> **关键区分**：Landing Page 是单页营销（首屏即转化 + 单一 CTA + 一遍滚动讲完故事）；SaaS Marketing Site 是多页品牌站（产品/价格/客户/博客/SEO/跨页面一致）。
> 边界详见 [../saas-marketing/README.md § 与 landing-pages/ 的边界](../saas-marketing/README.md)

---

## 何时进入本目录

| 信号 | 必读路径 |
|---|---|
| 用户说"做一个落地页 / 单页营销页 / 产品发布页 / 启动页 / 活动页" | 本目录 |
| **单页**（首屏即转化 + 1 个主 CTA） | 本目录 |
| 强调"转化率 / A/B test / 上线快" | 本目录 `pitfalls/` |
| 多页（≥ 3 页） | 不要来，去 `../saas-marketing/` |
| 后台 / 大屏 | `../admin-panels/` `../dashboards/` |

---

## 通用方法论（跨类别）

| 主题 | 通用层文件 | 本类别文件 |
|---|---|---|
| 动画（跨平台差异） | [`../references/methodology/animation-cross-platform.md`](../references/methodology/animation-cross-platform.md) | — |
| 性能（跨类别预算） | [`../references/methodology/performance-budget.md`](../references/methodology/performance-budget.md) | — |
| 营销页框架（F1-F8） | [`../references/methodology/page-framework.md`](../references/methodology/page-framework.md) | （**单页首选 F4 引导式 / F5 沉浸式**） |
| 转化文案 / 心理 | [`../references/methodology/anti-slop-checklist.md`](../references/methodology/anti-slop-checklist.md) | — |
| 📚 方法论总索引 | [`../references/methodology/INDEX.md`](../references/methodology/INDEX.md) | — |

---

## 与 `saas-marketing/` 的边界

| 维度 | Landing Page (本目录) | SaaS Marketing Site |
|---|---|---|
| 页数 | **1 页** | 5-20+ 页 |
| 导航 | 无或极简 | 完整顶部导航 + 页脚 |
| 目的 | **单 CTA 转化** | 多触点品牌建设 |
| 内容运营 | 静态（一次性上线） | 博客/案例/招聘/法律 |
| SEO | 可选 | 必须 |
| 性能 | **1 页 Lighthouse 95+** | 多页 Lighthouse 90+ |
| 跨页面一致性 | N/A | 设计令牌 + 跨页面组件 |
| A/B test | **核心**（每屏一个假设） | 次要 |

---

## 目录结构（MVI）

```
landing-pages/
├── README.md                       ← 你在这里
├── meta-prompt.md                  ← PHASE 4 预检：转化目标 / 受众 / 主 CTA / 衡量
│
├── # 组件层（单页核心 4 块）
├── component-contract/
│   ├── hero-cta.md                 ★ 大 Hero + 单一主 CTA（首屏 5 秒定去留）
│   ├── feature-row.md              ★ 特性块（图标 + 标题 + 描述 + 截图/动图）
│   ├── testimonial-logos.md        ★ 客户 logo 墙 + 简短推荐语
│   └── pricing-simple.md           ★ 简化价格表（2-3 栏 + 推荐档高亮）
│
└── # 经验层
    └── pitfalls/                    ★ 单页营销常见反模式
        └── README.md
```

> 与 saas-marketing 区别：本目录**只 4 个组件**（单页所需）；saas-marketing 是 7+ 个（多页 + 跨页面一致）。

---

## 单页骨架（F4 引导式 + F5 沉浸式混合）

按用户滚动顺序，**一气呵成讲完故事**：

```
┌─────────────────────────────────────┐
│ <Hero + 单 CTA>                     │  ← 5 秒定去留
│  Headline (≤ 8 词)                  │
│  Subhead (≤ 24 词)                  │
│  Primary CTA + Secondary CTA        │
│  截图 / 视频 / 3D 演示              │
├─────────────────────────────────────┤
│ <Social Proof 1: Logo 墙>           │  ← 5 秒建信任
│  "Trusted by 1000+ teams"           │
├─────────────────────────────────────┤
│ <Feature 1: 核心价值>               │  ← 1 分钟讲清"做什么"
│  图标 + 标题 + 描述 + 演示 GIF       │
├─────────────────────────────────────┤
│ <Feature 2-3: 关键能力>             │  ← 强化
├─────────────────────────────────────┤
│ <Testimonial: 1-3 条强证言>         │  ← 转化临界点
├─────────────────────────────────────┤
│ <Pricing: 2-3 档 + 推荐档高亮>      │  ← 决策时刻
├─────────────────────────────────────┤
│ <FAQ: 5-8 个最常见疑问>             │  ← 解除顾虑
├─────────────────────────────────────┤
│ <Final CTA: 重复主 CTA + 紧迫感>    │  ← 最后一推
│  "免费试用 14 天 · 无需信用卡"       │
├─────────────────────────────────────┤
│ <Footer: 极简（联系 / 法务）>        │  ← 不要复杂导航
└─────────────────────────────────────┘
```

---

## 首选品牌参考

| 品牌 | 风格 | 适用 |
|---|---|---|
| Stripe | 极简 + 3D 插画 | 通用 / 启动期 |
| Linear | 极简高密度 + 暗色 | DevTools |
| Vercel | 渐变 + 明亮 + 动画 | DevOps / Cloud |
| Resend | 极简 + 留白 + 明亮 | 邮件 / API |
| Cal | 预约类 | 转化临界 |
| Warp | 终端 | 小众但独特 |
| Mintlify | 文档+营销融合 | B2D 工具 |

---

## 与通用层的关系

| 内容 | 归属 |
|---|---|
| Token | `../templates/light-theme.template.json` 或 `dark-theme.template.json` |
| 品牌 DESIGN.md | `../references/brand-library/fintech/stripe-DESIGN.md`（首选） |
| 转化文案 / 心理 | `../references/methodology/anti-slop-checklist.md` |
| 性能预算 | `../references/methodology/performance-budget.md`（landing 是单页，预算更严） |

---

## 建设优先级

| 任务 | 优先级 | 状态 |
|---|---|---|
| ✅ 占位 README | P0 | done（升级为 MVI） |
| ✅ meta-prompt.md | P0 | done（MVI） |
| ✅ 4 个核心组件契约 | P0 | done（MVI） |
| ✅ pitfalls/ 8-10 条 | P0 | done（MVI） |
| 第 1 个 verification（单页） | P1 | 0.5d（4-2 是多页，需新建单页参考） |
| F1-F8 布局模板（page-framework 已具备） | P2 | — |
| 第 2/3 个 verification（不同品牌风格） | P3 | 2-3d |
