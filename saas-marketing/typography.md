---
name: saas-marketing-typography
description: DEPRECATED stub. Cross-category typography moved to references/methodology/typography.md. This file retains SaaS-specific marketing philosophy ("大、强、清晰") and SaaS Eyebrow/Headline rules + 6 Reference implementations.
---

# SaaS Marketing · Typography

> ⚠️ **DEPRECATED**: 本文件已**抽到跨类别通用版** → [`../references/methodology/typography.md`](../references/methodology/typography.md)
>
> 通用版覆盖 1-8 节（含 9 节"按类别适配"覆盖 8 类别）。本文件**仅保留 SaaS-specific 营销哲学和 Eyebrow/Headline 规则 + 6 个 Reference implementations**。

---

## 1. Marketing 哲学

**"大、强、清晰"** —— 营销站 typography 3 大原则：

1. **大**：Display ≥ 48px desktop / 36-48px mobile（大于其他类别）
2. **强**：字重对比 800 vs 400（强对比才有视觉锚点）
3. **清晰**：避免衬线、避免 italic、避免大段大写

> 不同于 dashboard 的"信息密度"或 docs 的"阅读优先"，marketing 要"大、强、清晰"。

---

## 2. SaaS-specific Eyebrow 规则

Eyebrow 是 marketing 特有，**在 H1 之上 1-3 词标签**：

| 场景 | Eyebrow 文案示例 |
|---|---|
| 产品发布 | "Now in public beta" / "Just released" |
| 客户案例 | "Customer story" / "Case study" |
| 功能介绍 | "New feature" / "v2.0" |
| 行业页 | "For {industry}" / "Built for {role}" |
| 资源 | "Guide" / "Tutorial" / "Changelog" |

- 12-14px / **uppercase** / **letter-spacing 0.05em** / 500-600
- 颜色: `text-accent-{blue/green/violet}` 或 `text-muted`
- **永远在 H1/H2 之上**
- 永远 1-3 词

---

## 3. SaaS Headline 规则

### 3.1 字数限制

- **Headline ≤ 8 词**（mobile 仍能读完）
- **Subhead ≤ 24 词**（1 行）
- **Description ≤ 50 词**（2 行）

### 3.2 内容结构

- 必须含**价值主张**（不是产品名）
- 副标题必须回答"为谁/解决什么"
- 公式：`[动词] + [结果] + [可选：时间/对比]`
- 示例：
  - "Ship products faster. Without the meetings." ✅
  - "Build forms in 5 minutes, not 5 days." ✅
  - "Empower your business" ❌

---

## 4. SaaS 渐变文字使用

marketing 渐变文字**常用**（与文档/dashboard 不同）：

- 标题强调 1-2 词
- 必须 Display 字号
- 渐变方向: 135deg 主流（Stripe / Vercel）
- 颜色组合: `accent.blue → accent.violet` 或 `accent.primary → accent.secondary`

注意：渐变文字**降低可读性**，仅 Display 字号。

---

## 5. SaaS Pitfalls（通用 9 条 + SaaS 4 条）

通用 9 条见 references 版，**SaaS 特定 4 条**：

- ❌ **Headline 写"Empower your business"**等空话 → 用户不点
- ❌ **Display 字号用 line-height 1.5**（太松）→ 1.05-1.2
- ❌ **Eyebrow 写完整句**（应是 1-3 词）→ 视觉重
- ❌ **整页用一种字重**（400 标题 + 400 body）→ 营销站无视觉锚点

---

## 6. Reference implementations（6 个最适配 SaaS）

| 品牌 | 字体 | 特点 |
|---|---|---|
| **Stripe** | Inter 800 | display 72px，eyebrow 醒目 |
| **Vercel** | Geist Sans 700 | 渐变标题 |
| **Linear** | Inter Display 800 | 等宽数字 |
| **Notion** | Inter 700 | 简单亲和 |
| **Cal** | Cal Sans + Inter | 装饰字体标题 |
| **Resend** | Inter 700 | 极简 |

---

## 7. See also

- 通用版（必读）：[`../references/methodology/typography.md`](../references/methodology/typography.md)
- 字体加载策略：[`../references/methodology/font-loading-strategy.md`](../references/methodology/font-loading-strategy.md)
- SEO checklist：[`../references/methodology/seo-checklist.md`](../references/methodology/seo-checklist.md)（H1 与 title 一致）
- nav-footer：[`../references/methodology/nav-footer.md`](../references/methodology/nav-footer.md)
- saas-marketing 专题：[`../saas-marketing/README.md`](../saas-marketing/README.md)
