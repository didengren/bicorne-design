# 品牌字段兼容表

> 不同品牌的 DESIGN.md 字段命名差异大。本表记录各品牌的实际字段名与 token.json 目标的映射关系。

---

## 一、颜色字段兼容

### 品牌色

| 品牌 | DESIGN.md 字段 | 值 | 映射到 |
|------|---------------|-----|-------|
| Linear | `colors.primary` | `#5e6ad2` | `colors.brand.500` |
| Stripe | Markdown body "Stripe Purple" | `#533afd` | `colors.brand.500` |
| Vercel | Markdown body "Vercel Black" | `#171717` | `colors.brand.500` |
| Nike | `colors.primary` | `#111111` | `colors.brand.500` |
| Spotify | Markdown body "Spotify Green" | `#1ed760` | `colors.brand.500` |
| Cursor | `colors.primary` | `#f54e00` | `colors.brand.500` |
| Tesla | `colors.primary` | — | `colors.brand.500` |
| Coinbase | Markdown body | — | `colors.brand.500` |
| Figma | Markdown body | — | `colors.brand.500` |
| Notion | Markdown body | — | `colors.brand.500` |
| Raycast | Markdown body | — | `colors.brand.500` |

### 表面色

| 品牌 | 基底字段 | 值 | 映射到 |
|------|---------|-----|-------|
| Linear | `colors.canvas` | `#010102` | `colors.surface.base` |
| Stripe | Markdown "Pure White" | `#ffffff` | `colors.surface.base` |
| Vercel | Markdown "Pure White" | `#ffffff` | `colors.surface.base` |
| Nike | `colors.canvas` | `#ffffff` | `colors.surface.base` |
| Spotify | Markdown "Near Black" | `#121212` | `colors.surface.base` |
| Linear | `colors.surface-1` | `#0f1011` | `colors.surface.1` |
| Nike | `colors.soft-cloud` | `#f5f5f5` | `colors.surface.1` |
| Spotify | Markdown "Dark Surface" | `#181818` | `colors.surface.1` |

### 文字色

| 品牌 | 主文字字段 | 值 | 映射到 |
|------|-----------|-----|-------|
| Linear | `colors.ink` | `#f7f8f8` | `colors.ink.default` |
| Stripe | Markdown "Deep Navy" | `#061b31` | `colors.ink.default` |
| Vercel | Markdown "Vercel Black" | `#171717` | `colors.ink.default` |
| Nike | `colors.ink` | `#111111` | `colors.ink.default` |
| Spotify | Markdown "White" | `#ffffff` | `colors.ink.default` |
| Linear | `colors.ink-muted` | `#d0d6e0` | `colors.ink.muted` |
| Stripe | Markdown "Body" | `#64748d` | `colors.ink.muted` |
| Nike | `colors.mute` | `#707072` | `colors.ink.muted` |
| Spotify | Markdown "Silver" | `#b3b3b3` | `colors.ink.muted` |

### 边框色

| 品牌 | 边框字段 | 值 | 映射到 |
|------|---------|-----|-------|
| Linear | `colors.hairline` | `#23252a` | `colors.border.default` |
| Stripe | Markdown "Border Default" | `#e5edf5` | `colors.border.default` |
| Vercel | Shadow-as-border | `rgba(0,0,0,0.08)` | `colors.border.default`（取近似 HEX） |
| Nike | `colors.hairline` | `#cacacb` | `colors.border.default` |
| Spotify | Markdown "Border Gray" | `#4d4d4d` | `colors.border.default` |

---

## 二、排版字段兼容

### 字体族

| 品牌 | Display 字体 | Body 字体 | Mono 字体 |
|------|------------|----------|----------|
| Linear | Linear Display / SF Pro Display | Linear Text | Linear Mono |
| Stripe | sohne-var (ss01) | sohne-var (ss01) | SourceCodePro |
| Vercel | Geist Sans | Geist Sans | Geist Mono |
| Nike | Nike Futura ND / Helvetica Now Display | Helvetica Now Text | — |
| Spotify | SpotifyMixUITitle | SpotifyMixUI | — |

### 字号比例

| 品牌 | 最大 Display | Body 基准 | Button |
|------|------------|----------|--------|
| Linear | 80px | 16px | 14px |
| Stripe | 56px | 16px | 16px |
| Vercel | 48px | 18px | 14px |
| Nike | 96px | 16px | 16px |
| Spotify | 24px | 16px | 14px |

---

## 三、间距字段兼容

| 品牌 | 基本单位 | 最小间距 | 最大间距 | Section 间距 |
|------|---------|---------|---------|------------|
| Linear | 4px | 4px | 48px | 96px |
| Stripe | 8px | 1px | 20px | — |
| Vercel | 8px | 1px | 40px | — |
| Nike | 8px | 2px | 30px | 48px |
| Spotify | 8px | 1px | 20px | — |

---

## 四、圆角字段兼容

| 品牌 | 最小圆角 | 标准圆角 | 最大圆角 | Pill |
|------|---------|---------|---------|------|
| Linear | 4px | 8px | 24px | 9999px |
| Stripe | 4px | 6px | 8px | — |
| Vercel | 2px | 6px | 12px | 9999px |
| Nike | 0px | 30px | 30px | 9999px |
| Spotify | 2px | 8px | 20px | 9999px |

---

## 五、特殊映射规则

### Vercel Shadow-as-Border

Vercel 使用 `box-shadow: 0px 0px 0px 1px rgba(0,0,0,0.08)` 代替传统 border。映射时：
- 提取 shadow 中的颜色值，转为近似 HEX 作为 `border.default`
- 完整 shadow 值保留在 `shadows` 中

### Nike 的极端圆角

Nike 的 `rounded.sm` = 18px，`rounded.md` = 24px，`rounded.lg` = 30px。这与常规 4/8/12 体系差异巨大。映射时：
- 保留原始值，不强制标准化
- 在 token.json 的 `borderRadius` 中使用品牌原始 key 名

### Stripe 的 ss01 字体特性

Stripe 的 sohne-var 字体强制启用 OpenType `"ss01"` 特性集。映射时：
- 在 `fontFamilies` 的 `stack` 中附加 `font-feature-settings: "ss01"` 注释
- 具体实现由消费 skill 处理

### Spotify 的暗色沉浸

Spotify 的 UI 几乎没有亮色元素。映射时：
- `surface.base` 取 `#121212`
- `ink.default` 取 `#ffffff`
- 语义色保留原始值
