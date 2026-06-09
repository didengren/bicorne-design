---
name: typography
description: Cross-category typography framework — t-shirt size scale, font pairing, fluid type, color contrast, line-height/weight/kerning rules, eyebrow/headline/subhead/body conventions. Applies to all visual web categories (saas-marketing, landing-pages, ecommerce, documentation, admin-panels, dashboards).
---

# Typography — 跨类别通用版

> Typography 决定**品牌感**与**可读性**的平衡。**所有 web 类别**都应执行本框架。
> 字体加载策略见 [font-loading-strategy.md](./font-loading-strategy.md)；性能预算见 [performance-budget.md](./performance-budget.md)。
>
> **本文件已从 `saas-marketing/typography.md` 抽出为跨类别通用版**。Marketing-specific 哲学（"大、强、清晰"）和 Marketing Eyebrow/Headline 规则保留在原位 stub。
> **类别化定制**详见末尾"按类别适配"小节。

---

## 1. 核心原则（跨类别通用）

1. **Display 字号必须够大**（48-72px desktop / 36-48px mobile）—— 视觉锚点
2. **行高要宽松**（display 1.05-1.15 / body 1.5-1.65）—— 阅读舒适
3. **字重对比要强**（400 副标题 / 700-800 标题）—— 层级清晰
4. **字距 display 紧 / body 正常**（-0.02em / 0）—— display 紧凑感
5. **副标题字号** ≥ 18px（用户视线距离不同，14px 太弱）
6. **段间距** ≥ 1.5em（呼吸感）

---

## 2. 推荐字阶（t-shirt size 映射 token）

| t-shirt | px | rem | 用途（跨类别） | 行高 | 字距 | 字重 |
|---|---|---|---|---|---|---|
| `display-2xl` | 72 | 4.5 | Hero title (desktop) | 1.05 | -0.025em | 800 |
| `display-xl` | 64 | 4.0 | Hero title / 大 section title | 1.05 | -0.025em | 800 |
| `display-lg` | 56 | 3.5 | Hero title | 1.1 | -0.02em | 800 |
| `display-md` | 48 | 3.0 | Section title (e.g. "Pricing") | 1.1 | -0.02em | 700 |
| `display-sm` | 36 | 2.25 | Section title (mobile) | 1.15 | -0.015em | 700 |
| `h-xl` | 32 | 2.0 | H2 (Feature grid / Settings) | 1.2 | -0.01em | 600-700 |
| `h-lg` | 24 | 1.5 | H3 (Card title) | 1.3 | -0.005em | 600 |
| `h-md` | 20 | 1.25 | H4 (Sub-section) | 1.4 | 0 | 600 |
| `body-lg` | 18 | 1.125 | Subhead / Lead paragraph | 1.6 | 0 | 400-500 |
| `body` | 16 | 1.0 | Body | 1.6 | 0 | 400 |
| `body-sm` | 14 | 0.875 | Caption / Meta | 1.5 | 0 | 400-500 |
| `micro` | 12 | 0.75 | Eyebrow / Tag / Copyright | 1.4 | 0.05em (uppercase) | 500-600 |

> **token 路径**：`typography.size.{t-shirt}` / `typography.lineHeight.{t-shirt}` / `typography.tracking.{t-shirt}` / `typography.weight.{regular|medium|semibold|bold|extrabold}`

---

## 3. 字体选型

### 3.1 推荐组合（6 类风格）

| 风格 | 标题字体 | 正文字体 | 典型品牌 |
|---|---|---|---|
| **极简** | Inter 800 | Inter 400 | Stripe / Linear |
| **现代** | Geist Sans 700 | Geist Sans 400 | Vercel |
| **亲和** | Inter 700 | Inter 400 | Notion / Resend |
| **品牌驱动** | Custom 800 | Inter 400 | Apple / Tesla |
| **DevTools** | JetBrains Mono 700 (display) | Inter 400 | ClickHouse / Sentry |
| **金融** | Inter 800 | Inter 400 | Stripe / Plaid |

### 3.2 加载策略

详见 [font-loading-strategy.md](./font-loading-strategy.md)：
- 字体子集化（仅加载用到的字符 + weight）
- 优先 `font-display: swap`（不阻塞渲染）
- 重要字重预加载（`<link rel="preload" as="font" crossorigin>`）
- 备选 fallback: `system-ui, sans-serif`
- 避免加载 ≥ 4 个字重（每个 30-50KB）

### 3.3 字号档（fluid type）

```css
/* 现代 web 推荐 fluid type */
.headline {
  font-size: clamp(36px, 5vw, 72px);
  line-height: 1.05;
  letter-spacing: -0.02em;
}
.subhead {
  font-size: clamp(18px, 2vw, 22px);
  line-height: 1.5;
}
```

### 3.4 性能（与 performance-budget.md 联动）

- 字重文件 ≤ 30-50KB / weight（gzip）
- 一次加载 ≤ 4 字重
- 字体加载延迟：LCP 关键路径

---

## 4. 标题（Display）通用规则

### 4.1 Eyebrow（眉头标签）

- 12-14px / **uppercase** / **letter-spacing 0.05em** / 500-600
- 颜色: `text-accent-{blue/green/violet}` 或 `text-muted`
- 用途: 标题前的 1-3 词标签（"New release" / "Customer story" / "v2.0"）
- 永远在 H1/H2 之上

### 4.2 H1 Headline

- **唯一**（每页 1 个）
- 字号最大档（`display-{lg,xl,2xl}`）
- 必须含**价值主张**（不是产品名）
- 副标题必须回答"为谁/解决什么"

### 4.3 H2 Section title

- 桌面 36-48px / 移动 28-32px
- 字号比 H1 小一档（视觉层级）
- 副标题 16-22px muted

### 4.4 H3 Card title

- 20-24px
- 1-2 行（不可超过 3 行）

---

## 5. 正文（Body）通用规则

### 5.1 行长

| 语言 | 最佳 | 最大 |
|---|---|---|
| 英文 | 50-75 字符 | 90 字符 |
| 中文 | 30-45 字符 | 60 字符 |

### 5.2 段间距

- 段间 ≥ 1.5em
- 列表项间 ≥ 0.5em
- H 元素与下段间 ≥ 1em

### 5.3 链接

- 默认 underlined（如 Stripe）或 underlined on hover（如 Linear）
- hover 时颜色变化 + 200ms
- 锚文本描述性（不用"Click here"）

---

## 6. 特殊文本

### 6.1 渐变文字

```css
.gradient-text {
  background: linear-gradient(135deg, theme(colors.accent.blue), theme(colors.accent.violet));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
```

适用：标题强调 1-2 词
注意：渐变文字**降低可读性**，仅用于 display 字号

### 6.2 等宽数字（价格、统计、表格）

```css
.tabular-nums {
  font-variant-numeric: tabular-nums;
  font-family: theme(fontFamily.mono);
}
```

适用：价格 `$20/mo`、统计 `1M+ users`、表格

### 6.3 截断

- 单行: `truncate`（text-overflow: ellipsis + white-space: nowrap + overflow: hidden）
- 多行 (2-3): `line-clamp-2` / `line-clamp-3`
- 全展开: 避免（视觉乱）

---

## 7. 颜色对比（跨类别 WCAG）

| 场景 | 最低 | 推荐 |
|---|---|---|
| 标题文字 vs 背景 | 4.5:1 | 7:1 |
| 正文 vs 背景 | 4.5:1 | 7:1 |
| 副标题 muted vs 背景 | 3:1 | 4.5:1 |
| 链接 vs 背景 | 4.5:1 | 4.5:1 |
| 大字 display (≥24px) | 3:1 | 4.5:1 |
| 装饰文字（无关阅读） | 无要求 | — |

> **暗色主题尤其注意**：`text-muted` 不要低于 4.5:1
> **工具**：https://webaim.org/resources/contrastchecker/

---

## 8. Pitfalls（跨类别通用 9 条）

- ❌ **H1 与 title 不同**（影响 SEO）→ 应一致
- ❌ **display 字号用 line-height 1.5**（太松，标题显得散）→ 1.05-1.2
- ❌ **正文用 line-height 1.2**（太紧，读累）→ 1.5-1.65
- ❌ **整页用一种字重**（400 标题 + 400 body）→ 无层级
- ❌ **正文用 italic 强调过多**（影响阅读节奏）→ ≤ 10%
- ❌ **价格用衬线字体**（不现代）→ 用 sans-serif 等宽
- ❌ **全大写英文段落**（难以阅读）→ 仅 eyebrow / 标签
- ❌ **CJK 字号 < 14px**（难读）→ 中文最小 14px
- ❌ **字体加载阻塞渲染**（FOIT）→ `font-display: swap` + preload

---

## 9. 按类别适配

> 通用 1-8 节所有类别都应执行；本节给出**类别特定补充**。

### 9.1 SaaS Marketing（多页品牌站）

详见 [../../saas-marketing/typography.md](../../saas-marketing/typography.md) stub（含 marketing "大、强、清晰" 哲学 / Eyebrow 规则 / Headline "≤ 8 词" / Reference implementations 6 个）。

**关键差异**：
- Display 必须 ≥ 48px（marketing 比 docs/dashboard 大）
- 字重对比要强（800 display + 400 body）
- 多用渐变文字 / 装饰字体

### 9.2 Landing Pages（单页营销）

与 SaaS Marketing 几乎相同（display 大、强对比），但**用 `landing-pages/component-contract/hero-cta.md` 替代本文件**（单页场景下不必走完整框架）。

### 9.3 E-commerce（电商）

- **产品名**（H3 卡）必须 14-16px（信息密度高）
- **价格** 必须 18-24px + tabular-nums + 醒目色
- **CTA 按钮文字** 14-16px + semibold
- **多语言** 必须多字重

### 9.4 Documentation（文档站）

- **正文** 16-18px（阅读优先）
- **行高** 1.7-1.8（更宽松）
- **行宽** 70-80 字符（中文 35-45）
- **代码** 14-15px monospace + tabular-nums
- **H1 唯一**，H2-H3 充分分隔

### 9.5 Admin Panels（后台）

- **数据密度高**：body 14-15px，body-sm 13-14px
- **行高** 1.4-1.5（更紧凑）
- **行宽** 紧凑（table cell 30-50 字符）
- **H2 字号** 18-22px（不大，节省空间）
- **H3 字号** 16-18px

### 9.6 Dashboards（数据大屏）

- **大屏展示用**：display 32-48px（数字 / KPI 突出）
- **KPI 数字** tabular-nums + semibold
- **行高** 1.2-1.3（紧凑）
- **行宽** 不限
- **标签** 12-14px + uppercase

### 9.7 Auth Flow / Form

- **Form label** 14-15px
- **Input text** 16px（iOS 不缩放关键阈值）
- **Help text** 12-13px
- **Error text** 13-14px

### 9.8 Mobile Web

- **iOS 16px 阈值**：body 必须 ≥ 16px（iOS 自动缩放）
- **行高** 1.5-1.6
- **Tap target 文字** ≥ 14px
- **CJK 字号** ≥ 14px（移动端更敏感）

---

## 10. Acceptance check

- [ ] 字阶表使用 12 档 t-shirt size（display-2xl ~ micro）
- [ ] Display 字号 ≥ 48px desktop
- [ ] Body 行高 1.5-1.65
- [ ] 字重对比 ≥ 2 档（400 body + 700+ display）
- [ ] 颜色对比 ≥ 4.5:1 正文 / ≥ 3:1 muted
- [ ] 字体加载 ≤ 4 字重
- [ ] `font-display: swap` 已设置
- [ ] H1 与 title 一致（SEO）
- [ ] 价格用 tabular-nums
- [ ] CJK 字号 ≥ 14px
- [ ] Fluid type 用于 hero display
