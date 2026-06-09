---
name: dashboard-typography
description: DEPRECATED stub. Cross-category typography moved to references/methodology/typography.md. This file retains Dashboard-specific rules (data density, tabular-nums, 1080p @ 3m, non-thin fonts) and 4 Dashboard pitfalls that are not in the cross-category version.
---

# Dashboard · Typography

> ⚠️ **DEPRECATED**: 本文件已**抽到跨类别通用版** → [`../references/methodology/typography.md`](../references/methodology/typography.md)
>
> 通用版覆盖 1-8 节（含 9 节"按类别适配"覆盖 8 类别）。本文件**仅保留 Dashboard-specific 信息密度哲学和 tabular-nums / 非 thin / 不下 10px 等硬约束 + 4 条 Dashboard pitfalls**。

---

## 1. Dashboard 哲学："信息密度"

**"密、准、稳"** —— Dashboard typography 3 大原则（与 marketing 的"大、强、清晰"形成对照）：

1. **密**：字号小（11-14px body），行高紧（1.2-1.3），1 屏塞 50+ 数据点
2. **准**：数字等宽（`tabular-nums`），"12,846" 和 "12,845" 不会左右抖
3. **稳**：暗色背景 + 高对比文本，长时间盯屏不累

> **核心约束**：Dashboards are NOT regular websites. 它们跑在 1920×1080 大屏，3 米外看，标准 web typography（16px body / 1.5 line-height）**完全失效**。

---

## 2. Dashboard Type scale（与通用版差异）

通用版见 [typography.md §2](../references/methodology/typography.md) — `display-2xl ~ micro` 12 档 t-shirt size。

**Dashboard 不直接用 `display-*`**：Dashboard 的"display"是 KPI 数字（不是 H1 标题），用专属 `text-dash-*` 7 档：

| Token | Size (px) | 行高 | 字距 | 用途 |
|---|---|---|---|---|
| `text-dash-display` | 32-44 | 1.05 | -0.02em | Hero KPI（"今日营收"） |
| `text-dash-h-xl` | 22-24 | 1.10 | -0.01em | Panel-level KPI |
| `text-dash-h-lg` | 18-20 | 1.15 | 0 | Sub-KPI / 表格大数字 |
| `text-dash-h-md` | 14-15 | 1.20 | 0 | 区块标题 / 面板标题 |
| `text-dash-body` | 13-14 | 1.30 | -0.005em | 默认 body |
| `text-dash-caption` | 12-13 | 1.35 | 0 | 表格单元 / 次要文字 |
| `text-dash-micro` | 10-11 | 1.40 | 0.04em (uppercase) | Eyebrow 标签 / 图例 |

⚠️ **永远不小于 10px**（1080p 上无法读）。

---

## 3. Type families（Dashboard-specific）

| Use | Family | Fallback |
|---|---|---|
| Display（KPI 数字） | `Inter Display`, `SF Pro Display` | system-ui |
| Body | `Inter`, `PingFang SC` | system-ui |
| **Mono（数字 / 代码）** | `JetBrains Mono`, `SF Mono` | monospace |
| Chinese（auto） | 通过 Inter 走 PingFang fallback | |

> **数字强制 `font-feature-settings: "tnum"`** —— 等宽数字，"1" 和 "8" 同宽：

```css
.font-dash-mono {
  font-family: 'JetBrains Mono', 'SF Mono', monospace;
  font-feature-settings: "tnum", "ss01";
  font-variant-numeric: tabular-nums;
}
```

---

## 4. Letter spacing 类别化

通用版见 [typography.md §2](../references/methodology/typography.md)。

**Dashboard 特殊处理**：

- **Uppercase eyebrow**（panel 标题上方的小标签）：`letter-spacing: 0.2em`（20% 字距）+ `text-transform: uppercase`
- **Body / 数字**：轻微负字距（`letter-spacing: -0.005em`）—— 密度感
- **Display KPI**：紧字距（`-0.02em`）—— 大数字的"扎实感"

```css
.eyebrow {
  letter-spacing: 0.2em;
  text-transform: uppercase;
}
text-dash-body     { letter-spacing: -0.005em; }
text-dash-display  { letter-spacing: -0.02em; }
```

---

## 5. Color contrast（Dashboard 暗色特定）

通用 WCAG 阈值见 [typography.md §7](../references/methodology/typography.md)。**Dashboard 暗色背景（#0d1117 ~ #161b22）下需要更严**：

| Element | Color | Contrast on #0d1117 | 评级 |
|---|---|---|---|
| Primary text | `#e6edf3` | 14.5:1 | ✅ AAA |
| Secondary | `#8b95a5` | 5.2:1 | ✅ AA |
| Dim | `#5a6478` | 2.8:1 | ⚠️ 仅大字（≥18px / 14px bold） |
| Accent (cyan) | `#54c5ff` | 8.9:1 | ✅ AAA |

> **< 14px 文字用 dim 颜色必须 ≥ 3:1 对比度**。Body 用 `#8b95a5` 起步，`#5a6478` 只用于非关键 micro 标签。

---

## 6. Responsive 降级

通用响应式断点见 [responsive-degradation.md](../methodology/responsive-degradation.md)。

**Dashboard 特殊**：< 1280px 时**不**简单缩放（看不清）—— 降级为"最小分辨率占位符"：

```vue
<template>
  <div>
    <Dashboard v-if="width >= 1280" />
    <MinimumResolutionPlaceholder v-else />
  </div>
</template>
```

---

## 7. Dashboard Pitfalls（通用 9 条 + Dashboard 4 条）

通用 9 条见 [typography.md §8](../references/methodology/typography.md)。**Dashboard 特定 4 条**：

- ❌ **用 thin 字体（100/200 weight）** —— 1080p 大屏 3 米外消失
- ❌ **数字用 proportional digits** —— "1" 和 "8" 宽度不同，KPI 数字左右抖
- ❌ **用 8pt / 9pt** —— 任何文字都不可读
- ❌ **用纯白 #ffffff** —— 8 小时盯屏刺眼，用 `#e6edf3` 柔化

---

## 8. Token mapping（Tailwind extend）

```ts
// tailwind.config.ts — extend typography
fontSize: {
  'dash-display': ['32px',  { lineHeight: '1.05', letterSpacing: '-0.02em' }],
  'dash-h-xl':    ['22px',  { lineHeight: '1.10', letterSpacing: '-0.01em' }],
  'dash-h-lg':    ['18px',  { lineHeight: '1.15' }],
  'dash-h-md':    ['14px',  { lineHeight: '1.20' }],
  'dash-body':    ['13px',  { lineHeight: '1.30' }],
  'dash-caption': ['12px',  { lineHeight: '1.35' }],
  'dash-micro':   ['11px',  { lineHeight: '1.40', letterSpacing: '0.04em' }],
}
```

---

## 9. Reference implementations

| 品牌 | 字体 | Dashboard 特点 |
|---|---|---|
| **ClickHouse Cloud** | Inter Display + JetBrains Mono | 等宽数字 + 暗色高对比 |
| **Grafana** | Inter + Roboto Mono | 仪表盘数字 tabular-nums |
| **Vercel Observability** | Geist Mono | 等宽 KPI + 暗色 |
| **Linear (Insights)** | Inter Display | 简洁数字，< 14px body |
| **Stripe Sigma** | Inter + Soehne Mono | 金融级数字精度 |

---

## 10. See also

- 通用版（必读）：[`../references/methodology/typography.md`](../references/methodology/typography.md)
- 字体加载策略：[`../references/methodology/font-loading-strategy.md`](../references/methodology/font-loading-strategy.md)
- 性能预算（60fps + 等宽数字 + Tailwind 体积）：[`../dashboards/performance.md`](../dashboards/performance.md) stub
- 动画矩阵（数字滚动 / Sparkline / Aurora）：[`../dashboards/animation-matrix.md`](../dashboards/animation-matrix.md)
- Dashboard 专题：[`./README.md`](./README.md)
