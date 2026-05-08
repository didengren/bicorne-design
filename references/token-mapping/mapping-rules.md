# DESIGN.md → token.json 映射规则

> 本文档定义如何将 Layer 1（品牌 DESIGN.md）的原始数据映射为 Layer 2（token.json）的标准格式。

---

## 一、映射总览

```
DESIGN.md (YAML front matter + Markdown body)
    │
    ▼  按 mapping-rules.md 逐字段映射
    │
token.json (符合 design-token.schema.json)
```

---

## 二、颜色映射

### 2.1 品牌色 → colors.brand（10 级色阶）

DESIGN.md 通常只提供 1 个 primary 值。映射逻辑：

1. 从 DESIGN.md 提取 primary 色值
2. 使用 @ant-design/colors 算法生成 brand.50 ~ brand.900 共 10 级
3. primary 值映射到 brand.500

**提取优先级**（按顺序尝试，取第一个存在的）：

| 优先级 | DESIGN.md 字段 | 示例 |
|--------|---------------|------|
| 1 | `colors.primary` | Linear: `#5e6ad2` |
| 2 | `colors.brand` | — |
| 3 | `colors.accent-color` | — |
| 4 | Markdown body 中的 "Primary" / "Brand" 色值 | Stripe: `#533afd` |
| 5 | 页面主 CTA 按钮背景色 | Nike: `#111111` |

**暗色主题特殊处理**：
- 如果 DESIGN.md 有 `colors.primary-hover`，映射到 brand.400
- 如果有 `colors.primary-focus`，映射到 brand.600

### 2.2 表面色 → colors.surface

| token.json 目标 | 提取优先级 | 暗色主题默认 | 亮色主题默认 |
|----------------|-----------|------------|------------|
| `surface.base` | `colors.canvas` > `colors.background` > 亮色默认 `#ffffff` | `#010102` | `#ffffff` |
| `surface.1` | `colors.surface-1` > `colors.surface-raised` | `#0f1011` | `#f5f5f5` |
| `surface.2` | `colors.surface-2` > `colors.surface-overlay` | `#141516` | `#fafafa` |
| `surface.3` | `colors.surface-3` > `colors.surface-sunken` | `#18191a` | `#f0f0f0` |
| `surface.4` | `colors.surface-4` | `#1c1d1e` | `#e8e8e8` |

**暗色主题判断**：如果 `surface.base` 的亮度 < 50（HSL），则视为暗色主题。

### 2.3 文字色 → colors.ink

| token.json 目标 | 提取优先级 |
|----------------|-----------|
| `ink.default` | `colors.ink` > `colors.foreground` > `colors.text-primary` > 暗色 `#f7f8f8` / 亮色 `#1a1a1a` |
| `ink.muted` | `colors.ink-muted` > `colors.foreground-muted` > `colors.text-secondary` |
| `ink.subtle` | `colors.ink-subtle` > `colors.ink-tertiary` > `colors.text-tertiary` |
| `ink.tertiary` | `colors.ink-tertiary` > `colors.text-quaternary` |

### 2.4 边框色 → colors.border

| token.json 目标 | 提取优先级 |
|----------------|-----------|
| `border.default` | `colors.hairline` > `colors.border` > `colors.divider` |
| `border.strong` | `colors.hairline-strong` > `colors.border-strong` |
| `border.subtle` | `colors.hairline-tertiary` > `colors.hairline-soft` > `colors.border-subtle` |

### 2.5 语义色 → colors.semantic

| token.json 目标 | 提取优先级 |
|----------------|-----------|
| `semantic.success` | `colors.semantic-success` > `colors.success` > `colors.success-bright` |
| `semantic.danger` | `colors.sale` > `colors.danger` > `colors.error` |
| `semantic.warning` | `colors.warning` > `colors.lemon` |
| `semantic.info` | `colors.info` > `colors.info-deep` > 与 brand.500 同系 |

---

## 三、排版映射

### 3.1 字体族 → typography.fontFamilies

从 DESIGN.md 的 `typography.*.fontFamily` 提取去重后的字体族列表。

**映射规则**：
- 含 "Display" / "Futura" / "Campaign" → 归入 `display` 族
- 含 "Text" / "Body" / "Now Text" → 归入 `body` 族
- 含 "Mono" / "Code" / "SourceCodePro" → 归入 `mono` 族

每个字体族输出 `name`（显示名）和 `stack`（CSS font-stack）。

### 3.2 字号比例 → typography.scales

从 DESIGN.md 的 `typography.*` 逐项映射。映射规则：

| DESIGN.md 字段模式 | token.json scale 名 |
|-------------------|-------------------|
| `display-xl` / `display-campaign` / `display-mega` / `hero-display` / `display-xxl` | `display-xl` |
| `display-lg` / `product-display` / `section-display` | `display-lg` |
| `display-md` / `display-sm` / `stat-display` / `number-display` / `rating-display` | `display-md` |
| `headline` / `heading-1` | `headline` |
| `heading-xl` / `sub-heading-large` / `subhead` / `heading-2` / `section-heading` / `feature-heading` | `heading-xl` |
| `heading-lg` / `sub-heading` / `card-title` / `card-heading` / `subtitle` / `title-lg` / `heading-3` | `heading-lg` |
| `heading-md` / `heading-sm` / `title-md` / `title-sm` / `heading-4` | `heading-md` |
| `body-lg` / `body-large` / `heading-5` | `body-lg` |
| `body` / `body-md` / `body-md-bold` / `body-md-medium` / `body-strong` / `body-tracked` / `link` / `link-emph` / `link-md` | `body-md` |
| `body-sm` / `body-small` / `body-sm-medium` / `body-sm-strong` | `body-sm` |
| `caption` / `caption-md` / `caption-sm` / `caption-bold` / `caption-strong` / `caption-tight` / `caption-uppercase` / `label-md` / `label-sm` / `eyebrow` / `micro` / `micro-label` / `micro-uppercase` / `uppercase-tag` / `utility-xs` | `caption` |
| `button` / `button-md` / `button-sm` / `button-lg` / `nav-link` | `button` |
| `mono` / `code` / `code-md` / `code-sm` / `mono-label` | `mono` |

每个 scale 输出：`fontFamily`（引用 key）、`fontSize`、`fontWeight`、`lineHeight`、`letterSpacing`（可选）、`textTransform`（可选）。

---

## 四、间距映射

从 DESIGN.md 的 `spacing.*` 直接映射。

**映射规则**：
- 去掉单位后缀 `px`，输出纯数字
- key 保持原样或标准化为数字（`xxs: 4px` → `"1": 4`）

**标准化映射**：

| DESIGN.md 常见 key | token.json key | 值 |
|-------------------|---------------|-----|
| `xxs` / `2` | `"1"` | 4 |
| `xs` / `4` | `"2"` | 8 |
| `sm` / `8` | `"3"` | 12 |
| `md` / `16` | `"4"` | 16 |
| `lg` / `24` | `"6"` | 24 |
| `xl` / `32` | `"8"` | 32 |
| `xxl` / `48` | `"12"` | 48 |
| `section` / `64` | `"16"` | 64 |

---

## 五、圆角映射

从 DESIGN.md 的 `rounded.*` 直接映射。

**标准化映射**：

| DESIGN.md 常见 key | token.json key |
|-------------------|---------------|
| `xs` / `none` (4px) | `sm` |
| `sm` (6px) | `md` |
| `md` (8px) | `lg` |
| `lg` (12px) | `xl` |
| `xl` (16px) | `2xl` |
| `xxl` (24px) | `2xl` |
| `pill` / `full` (9999px) | `full` |

---

## 六、阴影映射

从 DESIGN.md Markdown body 的 "Shadow" / "Elevation" 章节提取。

**映射规则**：
- 按深度级别映射：sm → md → lg → xl
- 保留完整的 CSS box-shadow 值

---

## 七、动效映射

从 DESIGN.md 的 "Animation" / "Transition" 章节提取。

**映射规则**：
- `default`：200ms + 标准缓动
- `fast`：100ms
- `slow`：300ms
- 缓动曲线保留原始 CSS 值

---

## 八、缺失字段处理

当 DESIGN.md 缺少某个字段时：

1. **品牌色**：必须提供，否则无法生成 token.json → 报错
2. **表面色**：从模板填充默认值（暗色/亮色）
3. **文字色**：从表面色自动推算（暗底亮字 / 亮底暗字）
4. **边框色**：从表面色推算（比 surface.1 稍亮/暗）
5. **语义色**：从模板填充默认值
6. **排版**：缺失的 scale 从模板填充
7. **间距/圆角**：从模板填充默认值
