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
3. 亮色主题：primary 值直接作为算法输入，brand.500 = primary
4. 暗色主题：算法使用 `darkColorMap` 对 primary 与背景色混色，brand.500 ≠ primary（是暗色适配后的中间色阶）；原始 primary 值保留到 `semantic.info`

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
| `caption` / `caption-md` / `caption-sm` / `caption-bold` / `caption-strong` / `caption-tight` / `caption-uppercase` / `label-md` / `label-sm` | `caption` |
| `eyebrow` | `eyebrow` |
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
- `default`：200ms + ease-out（`cubic-bezier(0.215,0.61,0.355,1)`）
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

---

## 九、平台差异映射

同一品牌 DESIGN.md 在不同平台下的映射策略。

### 核心原则：跨平台一致性

同品牌跨平台共享：
- `colors`（品牌色阶、表面色、文字色、边框色、语义色）— 完全相同
- `typography.fontFamilies`（字体族定义）— 完全相同
- `viewport`（响应式断点）— 与 bicorne-ui BREAKPOINTS 一致，所有平台共享

同品牌跨平台差异：
- `typography.scales`（字号比例）— 使用对应平台模板的默认值；桌面端用 DESIGN.md 值覆盖模板，移动端/大屏保留模板默认值（DESIGN.md 的字号是桌面场景的权威来源，不适用于其他平台）
- `typography.scales.*.letterSpacing`（字距）— 移动端/大屏模板继承桌面暗色模板的绝对值；当字号缩放后字距比例明显偏紧时（如移动端 display-xl 34px 配 -3.0px，比例 -8.8% vs 桌面 -3.75%），可在执行层按比例缩放，token 层保持继承不变
- `spacing`（间距）— 使用对应平台模板的默认值
- `borderRadius`（圆角）— 使用对应平台模板的默认值
- `shadows`（阴影）— 使用对应平台模板的默认值
- `transitions`（过渡）— 所有平台共享（移动端/大屏的时长差异在执行层处理，不通过 token 区分）

### 映射流程

```
DESIGN.md
│
├─ 提取 colors + fontFamilies → 所有平台共享
│
├─ 注入 viewport（bicorne-ui BREAKPOINTS 常量）→ 所有平台共享
│
└─ 提取 scales / spacing / borderRadius / shadows
   │
   ├─ 桌面 → dark-theme.template.json 或 light-theme.template.json 骨架 → DESIGN.md 值覆盖（桌面是 DESIGN.md 的目标场景）
   ├─ 移动端 → mobile-dark.template.json 或 mobile-light.template.json 骨架 → 保留模板默认值（不使用 DESIGN.md 的桌面字号覆盖）
   └─ 大屏 → dashboard-dark.template.json 骨架 → 保留模板默认值（不使用 DESIGN.md 的桌面字号覆盖）
```

### 圆角绝对值

> 桌面暗色值取自 `dark-theme.template.json`，桌面亮色值取自 `light-theme.template.json`。移动端/大屏在对应主题基础上递增。

| key | 桌面暗色 | 桌面亮色 | 移动端暗色 | 移动端亮色 | 大屏暗色 |
|-----|--------|--------|---------|---------|--------|
| sm  | 4      | 4      | 6       | 6       | 8      |
| md  | 8      | 6      | 10      | 8       | 12     |
| lg  | 12     | 8      | 14      | 10      | 16     |
| xl  | 16     | 12     | 18      | 14      | 20     |
| 2xl | 24     | 16     | 26      | 18      | 28     |
| full | 9999  | 9999   | 9999    | 9999    | 9999   |

### 间距绝对值

| 平台 | 基数 | token key 集合 | 说明 |
|------|------|--------------|------|
| 桌面 | 4px | `"1":4 "2":8 "3":12 "4":16 "5":20 "6":24 "8":32 "10":40 "12":48 "16":64` | 现有默认 |
| 移动端 | 4px | 同桌面（key 和值完全相同） | 触摸目标 ≥ 44px 通过组件实现，不通过 spacing token |
| 大屏 | 8px | `"1":8 "2":16 "3":24 "4":32 "5":40 "6":48 "8":64 "10":80 "12":96 "16":128` | 远距离观看需要更大间距 |

### 移动端低 DPI 字号执行层覆盖规则

移动端模板中所有 < 16px 的字号在低 DPI（1x）屏幕上需在执行层覆盖为 ≥ 16px；高 DPI（2x+）使用模板值。

| scale | 模板值 | 低 DPI 覆盖 | 豁免 | 理由 |
|-------|--------|------------|------|------|
| heading-md | 15px | ≥ 16px | 可豁免 | 字重 600 较高，可读性优于同字号常规字重 |
| body-md | 15px | ≥ 16px | — | 正文不可低于 16px |
| body-sm | 13px | ≥ 16px | — | 正文不可低于 16px |
| caption | 11px | ≥ 16px | — | 辅助文字不可低于 16px |
| mono | 12px | ≥ 16px | — | 代码文字不可低于 16px |
| button | 14px | ≥ 16px | 可豁免 | 组件级字号控制，由执行层酌情处理 |

> 此规则属于执行层约束，不改变 token 层的模板值。token 层保留高 DPI 场景的最优值，低 DPI 适配由消费端实现。

### viewport 默认断点

与 bicorne-ui BREAKPOINTS 完全一致，所有平台共享：

```json
{ "xs": 480, "sm": 640, "md": 768, "lg": 1024, "xl": 1280, "xxl": 1536, "xxxl": 1920 }
```

各平台的主要设计区间：

| 平台 | 主要区间 | 说明 |
|------|---------|------|
| 移动端 | xs–md（480–768） | 手机竖屏/横屏 |
| 桌面 | md–xxl（768–1536） | 笔记本/桌面显示器 |
| 大屏 | xl–xxxl（1280–1920+） | 数据展示大屏/控制室 |
