---
name: saas-marketing-nav-footer
description: DEPRECATED stub. Cross-category nav-footer moved to references/methodology/nav-footer.md. This file retains SaaS-specific extensions (mega menu detailed layout, pre-footer CTA band, 4-5 column footer) and points to the canonical version.
---

# SaaS Marketing · `nav-footer` (Top Nav + Footer)

> ⚠️ **DEPRECATED**: 本文件已**抽到跨类别通用版** → [`../../../references/methodology/nav-footer.md`](../../../references/methodology/nav-footer.md)
>
> 通用版覆盖 1-7 节（含 8 节"按类别适配"覆盖 8 类别）。本文件**仅保留 SaaS-specific 扩展**（mega menu 详细布局 / pre-footer CTA band / 4-5 列 footer / 4 个 Reference implementations）。

---

## 1. SaaS-specific 扩展

### 1.1 Mega Menu 详细布局

mega menu 常见 2 类：
1. **Grid** — 4-6 列图标 + 标题 + 描述（如 Stripe / Vercel）
2. **Stack** — 单列 + 缩略图 + 标题 + 描述（如 Linear / Resend）

#### Grid 类型（推荐 B2D / DevTools）

```
┌────────────────────────────────────────────────┐
│ <mega menu, 4 列, 1440px 宽>                    │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────┐│
│ │ Icon     │ │ Icon     │ │ Icon     │ │ Icon ││
│ │ Title    │ │ Title    │ │ Title    │ │ Title││
│ │ Desc 1行 │ │ Desc 1行 │ │ Desc 1行 │ │ Desc ││
│ └──────────┘ └──────────┘ └──────────┘ └──────┘│
│                                                │
│ <底部链接>  All products →                      │
└────────────────────────────────────────────────┘
```

- 4-6 列，每列高 120-160px
- 每列：图标 (24-32px) + 标题 (font-medium 14-15px) + 描述 (text-muted 12-13px)
- 底部"全 X 项" 链接

#### Stack 类型（推荐 B2B / 极简）

```
┌────────────────────────┐
│ <mega menu, 单列>       │
│ ┌────────────────────┐ │
│ │ 缩略图 │ 标题      │ │
│ │       │ 描述 1 行  │ │
│ ├────────────────────┤ │
│ │ 缩略图 │ 标题      │ │
│ │       │ 描述 1 行  │ │
│ └────────────────────┘ │
│                        │
│ <底部链接>  More →     │
└────────────────────────┘
```

- 单列，4-6 行
- 缩略图 (48-64px square) + 标题 + 描述
- 底部"More" 链接

### 1.2 Pre-footer CTA Band

`</footer>` 之前的 CTA banner，独立区块。

```
┌──────────────────────────────────────┐
│ <pre-footer>                         │
│  大标题（≤ 8 词）                      │
│  副标题（≤ 24 词）                    │
│  [Primary CTA] [Secondary CTA]      │
│  信任副文案（"无需信用卡 · 14 天免费"）│
└──────────────────────────────────────┘
```

- 全宽背景（accent gradient 或 surface 差异色）
- 居中文字 + 按钮
- 视觉权重：与 Hero 相当

### 1.3 Footer 4-5 列详细（推荐布局）

| 列 | 内容 | 链接数 |
|---|---|---|
| 1. Product | 核心功能 / 模块 / 集成 | 4-6 |
| 2. Solutions (可选) | 按行业 / 按团队 / 按规模 | 4-6 |
| 3. Resources | Blog / Docs / Customer stories / Changelog / Templates | 5-8 |
| 4. Company | About / Careers / Press / Contact / Partners | 4-5 |
| 5. Legal | Privacy / Terms / Cookies / DPA / Security | 3-5 |

**每列 ≤ 8 链接**（多则折叠 "More"）。

### 1.4 Reference implementations（最适配 SaaS）

- Stripe — 极简 mega menu (Grid 6 列)，hover 触发，无 pre-footer
- Vercel — sticky + 滚动时高度变化，4 列 footer
- Linear — 紧凑、无 mega menu (Stack 单列)，3 列 footer
- Notion — 顶部 + 底部 CTA 横幅，5 列 footer
- Resend — 单层 nav + 居中 logo，2 列 footer

### 1.5 SaaS Pitfalls（通用 13 条 + SaaS 4 条）

通用 13 条见 references 版，**SaaS 特定 4 条**：

- ❌ **Mega menu 超过 6 列** → 单屏看不到所有
- ❌ **Pre-footer CTA 文案与 Hero 不一致** → 转化率 -20%
- ❌ **Footer 链接数 > 8 / 列** → 视觉混乱
- ❌ **Solutions 列按"行业 + 规模 + 角色"3 维度切分** → 列数太多

---

## 2. See also

- 通用版（必读）：[`../../../references/methodology/nav-footer.md`](../../../references/methodology/nav-footer.md)
- saas-marketing 专题：[`../../README.md`](../../README.md)
- Landing Page Hero：[`../component-contract/hero-cta.md`](../component-contract/hero-cta.md)（单页 nav 替代品）
