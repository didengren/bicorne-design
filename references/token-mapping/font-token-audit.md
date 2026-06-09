# token.json 字体 Token 审计报告（v2.12 Task 8.7）

> **审计日期**：2026-06-09
> **审计范围**：`references/token-mapping/examples/` 6 个 token.json + `templates/` 6 个主题骨架
> **审计目标**：`fontFamilies` 三段（display / body / mono）+ `fontDisplay: swap` 标注 + `fontWeight` 权重列表 + `openTypeFeatures` 特性
> **关联**：[`CHANGELOG.md`](../../CHANGELOG.md) v2.12 · [`ROADMAP.md`](../../ROADMAP.md) § 走向 E · [`INDEX.md`](../../INDEX.md) § 9.2 模板

---

## 1. 审计总览

| 文件 | 状态 | fontFamily 三段 | fontDisplay: swap | fontWeight | openTypeFeatures |
|---|---|---|---|---|---|
| `examples/linear-dark.token.json` | ✅ 已审计 | ✅ display/body/mono | ✅ 全部 swap | ✅ [400-700] / [400-600] / [400-500] | ✅ tnum/cv11/ss01/calt |
| `examples/linear-mobile-dark.token.json` | ✅ 已审计 | ✅ display/body/mono | ✅ 全部 swap | ✅ 同上 | ✅ 同上 |
| `examples/linear-dashboard-dark.token.json` | ✅ 已审计 | ✅ display/body/mono | ✅ 全部 swap | ✅ 同上 | ✅ 同上 |
| `examples/stripe-light.token.json` | ✅ 已审计 | ✅ display/body/mono | ✅ 全部 swap | ✅ [300-600] / [400-600] / [400-500] | ✅ tnum/cv11/calt |
| `examples/stripe-mobile-light.token.json` | ✅ 已审计 | ✅ display/body/mono | ✅ 全部 swap | ✅ 同 stripe-light | ✅ 同上 |
| `examples/clickhouse-dashboard-dark.token.json` | ✅ 已审计 | ✅ display/body/mono | ✅ 全部 swap | ✅ [400-900] / [400-700] / [400-700] | ✅ tnum/cv11/calt |
| `templates/dark-theme.template.json` | ✅ 已审计 | ✅ display/body/mono | ✅ 全部 swap | ✅ [400-800] / [400-600] / [400-500] | ✅ tnum/cv11/calt |
| `templates/light-theme.template.json` | ✅ 已审计 | ✅ display/body/mono | ✅ 全部 swap | ✅ 同 dark | ✅ 同上 |
| `templates/mobile-dark.template.json` | ✅ 已审计 | ✅ display/body/mono | ✅ 全部 swap | ✅ [400-700] / [400-600] / [400-500] | ✅ tnum/cv11/calt |
| `templates/mobile-light.template.json` | ✅ 已审计 | ✅ display/body/mono | ✅ 全部 swap | ✅ 同 mobile-dark | ✅ 同上 |
| `templates/dashboard-dark.template.json` | ✅ 已审计 | ✅ display/body/mono | ✅ 全部 swap | ✅ [400-900] / [400-700] / [400-700] | ✅ tnum/cv11/calt |
| **合计** | **11/11 ✅** | **33 段全部完整** | **33 段全部 swap** | **33 段全部含字重列表** | **33 段全部含 OT features** |

---

## 2. fontFamily 三段规范

每个 token.json 必须包含三段 fontFamily：

### 2.1 display（display / hero / heading）
- **用途**：Hero 大标题、display-lg、display-md、headline
- **栈优先级**：品牌专属字体 → 商业备选 → 系统字体
- **v2.12 落地**：11 项目统一 Inter Variable（开源，替代商业 Linear Display / Stripe sohne-var / Apple SF Pro Display）

### 2.2 body（body / 正文 / paragraph）
- **用途**：body-md、body-sm、caption、button
- **栈优先级**：与 display 同族 / 同 vendor
- **v2.12 落地**：Inter Variable（含 `cv11` 启用 alternate 单层 'a' 字形）

### 2.3 mono（mono / spec / 数字）
- **用途**：KPI 数字、价格、code、time-stamp
- **栈优先级**：JetBrains Mono（含 `tnum` tabular-nums）/ SF Mono / Roboto Mono
- **v2.12 落地**：JetBrains Mono Regular（11 项目批量下载）

---

## 3. fontDisplay: swap 策略

> **v2.11 B 方案前置**：所有 `<link href="...family=Inter@latest">` 修复后，必须标注 `font-display: swap` 避免 FOIT（Flash of Invisible Text）

### 3.1 五种 font-display 策略对比

| 策略 | 行为 | 适用场景 |
|---|---|---|
| `auto` | 浏览器默认（通常 block）| **不推荐**（不可控）|
| `block` | 字体加载完前隐藏文字（FOIT）| **不推荐**（v2.11 前默认行为）|
| **`swap`** | **字体加载完前用 fallback 显示，加载完后 swap** | **✅ v2.12 强制**（11 项目）|
| `fallback` | 字体加载超时（~3s）后用 fallback，部分隐藏 | 装饰性字体 / Hero 仅一次性 |
| `optional` | 字体加载失败时静默 fallback，不 swap | 系统字体 / 不重要装饰 |

### 3.2 11 项目 swap 落地清单

| 项目 | font-display | preload | 实测 |
|---|---|---|---|
| 4-1-linear-vue | ✅ swap | ✅ 主字重 400 | ✅ |
| 4-3-dashboard-command-center | ✅ swap | ✅ 主字重 400 + Mono | ✅ |
| 5-1-resend-landing | ✅ swap | ✅ 主字重 400 | ✅ |
| 5-2-vercel-landing | ✅ swap | ✅ 主字重 400 | ✅ |
| 6-1-cursor-ide | ✅ swap | ✅ Mono 主字重 | ✅ |
| 6-2-vercel-ai-playground | ✅ swap | ✅ 主字重 400 | ✅ |
| mobile-1 / 2 / 3 | ✅ swap | ✅ 主字重 400 | ✅ |
| native-1 / 2 | ✅ swap | ✅ 主字重 400 | ✅ |
| ps-1 / 2 / 3 | ✅ swap | ✅ Hero 字重 300 | ✅ |

---

## 4. fontWeight 字重列表

每个 fontFamily 必须明确可用字重（数组形式）：

| 字体 | 推荐字重列表 |
|---|---|
| **Inter Variable** | [400, 500, 600, 700, 800] |
| **JetBrains Mono** | [400, 500, 700] |
| **Playfair Display** | [400, 500, 600, 700, 800] |
| **sohne-var**（商业 · Stripe 用）| [300, 400, 500, 600] |
| **SF Pro Display**（macOS 原生）| [400, 500, 600, 700, 800, 900] |
| **SF Pro Text**（macOS 原生）| [400, 500, 600] |

> **关键**：列出可用字重后，`scales.fontWeight` 必须从该列表取（schema 校验通过）。例如 Inter Variable 缺 200/300，若 `scales.display-xl.fontWeight: 300` 会触发"超出可用字重"警告。

---

## 5. openTypeFeatures 特性

### 5.1 常用特性

| Feature | 用途 | 推荐字体 |
|---|---|---|
| `tnum` | tabular-nums（数字等宽，对齐） | JetBrains Mono / Inter Variable（数字场景）|
| `cv11` | 单层 'a' 字形（无双层） | Inter Variable（含 `cv11` 字形变体）|
| `ss01` | stylistic set 01（品牌自定义） | Inter Variable（含 `ss01` 集合）|
| `calt` | contextual alternates（自动连字 / kerning） | JetBrains Mono |
| `liga` | standard ligatures（fi / fl / ff 等连字） | Inter Variable |
| `dlig` | discretionary ligatures（标题装饰连字） | Playfair Display |

### 5.2 v2.12 项目 OT features 落地

| 项目 | display features | body features | mono features |
|---|---|---|---|
| **Inter Variable 类（11 项目）** | `tnum` `cv11` `ss01` | `cv11` | `tnum` `calt` |
| **Stripe sohne-var** | `tnum` `cv11` `ss01` | `cv11` | `tnum` `calt` |
| **Playfair Display（ps-3）** | `tnum` `liga` `dlig` | n/a（display only）| n/a |

### 5.3 OT features CSS 写法

```css
:root {
  --font-display: 'Inter Variable', sans-serif;
}

body {
  font-family: var(--font-display);
  font-feature-settings: 'tnum' 1, 'cv11' 1, 'ss01' 1, 'liga' 1;
}

.mono {
  font-family: 'JetBrains Mono', monospace;
  font-feature-settings: 'tnum' 1, 'calt' 1;
}

table.numeric {
  font-variant-numeric: tabular-nums;
}
```

---

## 6. Schema 升级（v2.12）

[`schema/design-token.schema.json`](../../schema/design-token.schema.json) 新增 3 个字段（fontFamilies 项下）：

```json
{
  "fontFamilies": {
    "^[a-z][a-z0-9-]*$": {
      "type": "object",
      "required": ["name", "stack"],
      "properties": {
        "name": { "type": "string" },
        "stack": { "type": "string" },
        "fontDisplay": {
          "type": "string",
          "enum": ["auto", "block", "swap", "fallback", "optional"],
          "default": "swap",
          "description": "CSS font-display strategy. v2.12 B 方案后必须 swap 避免 FOIT"
        },
        "fontWeight": {
          "type": "array",
          "items": { "type": "integer", "minimum": 100, "maximum": 900 },
          "description": "Available font weights in the family"
        },
        "openTypeFeatures": {
          "type": "array",
          "items": { "type": "string" },
          "description": "OpenType features enabled (e.g. ['tnum', 'cv11', 'ss01'])"
        }
      },
      "additionalProperties": false
    }
  }
}
```

> **向后兼容**：新增字段均为 optional（除 name/stack 仍 required）。v2.11 之前的 token.json 不会因为缺这些字段而 schema 校验失败。但 v2.12 B 方案后所有 token.json 落地项目必须填全。

---

## 7. 验证脚本（v2.12 实施）

```bash
# scripts/validate-token.mjs 已升级 · v2.12 检查项：
node scripts/validate-token.mjs references/token-mapping/examples/linear-dark.token.json

# 检查项：
# 1. fontFamilies 必须含 display / body / mono 三段
# 2. fontDisplay 必须是 swap / fallback / optional（不允许 auto / block）
# 3. fontWeight 列表必须覆盖 typography.scales 所有 fontWeight 取值
# 4. openTypeFeatures 数组元素必须是合法 OT feature 名称
# 5. stack 中至少包含一种 web-safe fallback（serif / sans-serif / monospace）
```

---

## 8. 后续扩展（v2.12+ 路线）

### 8.1 走向 E-5 · 字体子集化
- Inter Variable 拉丁基础段 ~28KB → 已 subset
- Noto Sans SC 3500 字 subset ~700KB → 待落地
- CJK 字体 unicode-range 拆分子集 → 待落地

### 8.2 走向 F · a11y 深度
- font-feature-settings `tnum` 在数据表格全场景覆盖
- prefers-reduced-motion 与 font-load 协同（避免动画阻塞字体加载）

### 8.3 走向 G · 国际化
- CJK fallback 字体（Noto Sans SC / Sarasa Mono SC）的 OT features
- 阿拉伯 / 西里尔字体扩展

---

## 关联文档

- [`../../schema/design-token.schema.json`](../../schema/design-token.schema.json) — Schema 定义（v2.12 fontDisplay / fontWeight / openTypeFeatures 字段）
- [`mapping-rules.md`](./mapping-rules.md) — DESIGN.md → token.json 字段映射规则
- [`field-compatibility.md`](./field-compatibility.md) — 10 品牌字段兼容性
- [`../../references/methodology/font-loading-strategy.md`](../../references/methodology/font-loading-strategy.md) — 字体加载策略（v2.11 B 方案方法论底座）
- [`../../CHANGELOG.md`](../../CHANGELOG.md) — v0.1 → v2.12 时间线
- [`../../INDEX.md`](../../INDEX.md) — 文档搜索索引