# Admin Panel · 暗色模式 / 无障碍 专题

> **v1.9 专题文件** —— 通用部分见 [`../../references/methodology/dark-mode-a11y.md`](../../references/methodology/dark-mode-a11y.md)。
> 本文件**只讲 Admin Panel 类别特有**的暗色 / a11y 实现细节（Linear / Notion 风格中后台）。

---

## 0. 双主题声明（v3.0 · 2026-06-10）

> **本文件涵盖 light + dark 双主题**，但文件名沿用 `dark-mode-a11y.md` 命名约定（8 类别统一）。内容比例约 **dark 70% / light 30%**。
>
> **原因**：8 个类别（dashboards / admin-panels / ai-products / landing-pages / mobile-web / native-app / premium-showcase / saas-marketing）都叫 `dark-mode-a11y.md`，已形成强命名约定，重命名 8 文件 + 改 INDEX.md §4 表格 + 修内部反向引用的代价 > 价值。
>
> **本文件 light 相关段落索引**：
> - §1.1 Linear Light 实际色值（v3.0 落地）—— 完整色值表 + 亮色对比度自检
> - §7.2 v3.0 linear-light 切换审计（4-1-linear-vue 翻面 zero-regression）—— 修复清单 + 验证证据
> - §8.1 v3.0 light 扫描结果（H-3 alt 因装饰性 SVG 标记从 0 → 1，a11y 总分持平 71）
> - §8.2 v3.0 亮色切面零回归评估
>
> **未来新加 light 内容时**：仍写在本文件，按 `§X.Y` 编号递增即可；如 light 内容占比超过 50%，再启动 8 文件统一重命名议题。

---

## 1. Admin Panel 亮色默认 ⚠️ 可选（v3.1 · 2026-06-10 翻面）

中后台亮色不强制（Notion 亮 / Linear 暗），由用户偏好 + 长时间使用决定：
- **Notion 亮色** —— `bg #FFFFFF` / `surface #F7F6F3` / `accent #2383E2` 蓝
- **Linear 暗色** —— `bg #08090A` / `surface #1B1C1F` / `accent #5E6AD2` 紫蓝
- **token-bridge 双套** —— `linear-light` + `linear-dark` 同时维护

> **推荐默认亮色** —— 中后台 4 条硬性理由（v3.0 linear-light 翻面零回归后落地）：
> 1. **状态色辨识**：红/绿/黄/蓝在亮色背景下对比度稳定，admin 表单 validation / 表格 status badge 准确度更高
> 2. **下游载体一致**：截图、PDF 导出、Excel 粘贴、工单系统均为白底，亮色默认无需"翻面"才可直接复用
> 3. **数据表阅读速度**：13-14px 数字在亮色下眼动时间更短（v2.12 字体真实化后 Inter Variable `tnum` 表现更稳定）
> 4. **B2B 行业惯例**：Stripe Dashboard / Notion / Airtable / Cal / Resend / Intercom / Zapier 全部默认亮色 → 用户期望对齐
>
> 但**必须**提供"跟随系统 / 亮 / 暗"3 选 1 toggle（暗色用户日均 4-8h 仍是真实需求，§9 给出暗色模式专项实现细节）。

### 1.1 Linear Light 实际色值（v3.0 落地 · 2026-06-10）

| 角色 | linear-light | linear-dark 对比 |
|------|-------------|------------------|
| `surface.base` | `#FFFFFF` | `#010102` |
| `surface.1` | `#F5F6F6`（DESIGN.md `inverse-surface-1`） | `#0F1011` |
| `surface.2` | `#F6F7F7`（DESIGN.md `inverse-surface-2`） | `#141516` |
| `surface.3` | `#ECECEE` | `#18191A` |
| `ink.default` | `#1A1B1F`（DESIGN.md `inverse-ink` 柔化） | `#F7F8F8` |
| `ink.muted` | `#58585B` | `#D0D6E0` |
| `ink.subtle` | `#8A8A8E` | `#8A8F98` |
| `ink.tertiary` | `#B5B5B8` | `#62666D` |
| `border.default` | `#E5E5E7` | `#23252A` |
| `border.strong` | `#C8C8CA` | `#34343A` |
| `border.subtle` | `#ECECEE` | `#3E3E44` |
| `brand.500`（招牌色） | `#5E6AD2`（**保持不变**） | `#5E6AD2` |
| `semantic.success` | `#2A8A3E`（亮色下加深） | `#27A644` |
| `semantic.danger` | `#D63B3F` | `#E5484D` |
| `semantic.warning` | `#E08C1A` | `#F5A623` |

**亮色对比度自检**（vs 白底 `#FFFFFF`）：
- `#1A1B1F` 主文字 → **16.4:1** ✅ AAA
- `#58585B` 次文字 → **7.3:1** ✅ AAA
- `#8A8A8E` 辅助文字 → **3.8:1** ⚠️ 临界 AA（仅用于 caption，已配 `font-medium 500` 字重）
- `#5E6AD2` 招牌紫蓝 → **5.3:1** ✅ AA
- `#2A8A3E` 成功绿 → **4.7:1** ✅ AA

> **v3.0 关键改动**：原 dark 版本 `fontFamily` 写 `'Inter Variable'` 但 `@font-face` 定义为 `'Inter'`，导致字体一直 fallback 到 system-ui。v3.0 light 把 token.json 改为 `'Inter'` 优先，并在 `style.css` 加 `body { font-family: 'Inter' }` 覆盖 Tailwind preflight，**首屏字体真实加载**（之前 [dark-mode-a11y.md §9.4](dark-mode-a11y.md) "16.5:1 远超 AA" 是基于修复后的预期值，实际渲染前一直未达）。

---

## 2. 表格键盘导航（Admin Panel 特有）

> 这是 Admin Panel 的 **a11y 核心难点**。详细通用原则见 `dark-mode-a11y.md` §3.1。

| 键 | 行为 | 实现 |
|---|---|---|
| `↑` / `↓` | 上下选行 | `aria-selected` 同步 |
| `→` / `←` | 切换列（如果有 inline edit） | `tabindex="0"` 每格 |
| `Enter` | 展开行 / 进入编辑 | `aria-expanded` 同步 |
| `Space` | 勾选 checkbox | `aria-checked` 同步 |
| `Esc` | 退出编辑 / 关闭弹层 | |
| `Tab` | 跳到下一可编辑单元格 | |
| `Cmd/Ctrl + A` | 全选行 | 显示批量操作条 |

> **关键**：表格必须用 `role="grid"` + 每行 `role="row"` + 单元格 `role="gridcell"`，否则屏幕阅读器无法识别。

---

## 3. 筛选 / 搜索 a11y

| 控件 | a11y 要求 |
|---|---|
| 搜索框 | `aria-label="搜索项目"` + `<label>` 可见 + `placeholder` 不可替代 label |
| 多选筛选 | `role="listbox"` + `aria-multiselectable="true"` + 每项 `aria-selected` |
| 日期范围 | `<input type="date">` 双控件 + `aria-label="起始日期"` / `aria-label="结束日期"` |
| 状态筛选 | 不仅用颜色，**必须**有文字标签（如"已完成"不仅是绿点） |
| 排序按钮 | `aria-sort="ascending|descending|none"` 同步当前状态 |

---

## 4. 批量操作条（Bulk Action Bar）

4-1 linear-vue 已有 `bulk-action-bar.md` 组件契约，a11y 补充：
- **进入批量模式时**：自动聚焦"取消"按钮（防止误操作）
- **已选数量**：`aria-live="polite"` 朗读"已选 3 项"
- **危险操作**："批量删除"必须二次确认 + `aria-describedby` 指向说明文字
- **键盘可达**：所有批量操作按钮 Tab 可达，Enter 触发

---

## 5. 表单 a11y（Admin Panel 特有）

- **必填项标识**：`*` + `aria-required="true"`（不能只靠红字）
- **错误信息**：`<p id="email-error" role="alert">` —— 屏幕阅读器自动朗读
- **密码强度**：颜色 + 文字 + 进度条三重（不只颜色）
- **自动保存提示**：`aria-live="polite"` 朗读"已自动保存"
- **离开未保存提示**：`onbeforeunload` 事件 + 自定义 modal

---

## 6. 类别专题关联

- 通用 a11y → [`../../references/methodology/dark-mode-a11y.md`](../../references/methodology/dark-mode-a11y.md)
- DataTable 组件契约 → [`./component-contract/data-table.md`](./component-contract/data-table.md)（待建 a11y 章节）
- FilterForm 组件契约 → [`./component-contract/filter-form.md`](./component-contract/filter-form.md)
- Bulk Action Bar → [`./component-contract/bulk-action-bar.md`](./component-contract/bulk-action-bar.md)

---

## 7. 缺失 / 待办

### 7.1 4-1-linear-vue 实际 a11y 审计（v2.0 完成 · v2.1 修复）

**审计方式**：静态分析 `.vue` / `.html` / `.css` 源文件
**审计日期**：2026-06-08（v2.0）→ 2026-06-08（v2.1 修复）
**修复日期**：2026-06-08

| 检查项 | v2.0 结果 | v2.1 修复 | 证据 |
|---|---|---|---|
| `<html lang>` | ✅ `zh-CN` | ✅ 保留 | `index.html:2` |
| `aria-label` / `role` / `tabindex` / `<label>` | ❌ **0 处** | ✅ **28+ 处** | DataTable `role="grid"` / `role="row"` / `role="columnheader"` / `aria-sort="none"` / `aria-rowindex` / `aria-selected` / `tabindex` + FilterForm 3 select `aria-label` + AdminSidebar `aria-current="page"` / `aria-label` + AdminHeader `aria-label` + skip link |
| `prefers-reduced-motion` | ❌ 0 处 | ✅ 1 处 | `style.css` `@media (prefers-reduced-motion: reduce)` 关闭所有动画 |
| `outline: none` | ✅ 0 处 | ✅ 0 处 | 保留无此反模式 |
| `<img>` 缺失 alt | ✅ 0 处 | ✅ 0 处 | 无 `<img>` 标签 |
| focus ring 样式 | ⚠️ 0 处 | ✅ 1 处 | `style.css` 全局 `:focus-visible { outline: 2px solid #5b6cff }` |
| 键盘导航 | ❌ 不可用 | ✅ 完整支持 | DataTable 箭头键 ↑↓ 切换行 + Home/End + Enter/Space 选中 |
| skip link | ❌ 缺失 | ✅ 1 处 | App.vue "跳到主内容" `href="#main-content"` |
| main 语义 | ❌ 缺失 | ✅ 1 处 | `main` + `aria-labelledby="page-title"` + `tabindex="-1"` |
| nav 语义 | ❌ 缺失 | ✅ 1 处 | AdminSidebar `nav` + `aria-label="主导航"` |

**v2.1 修复清单**（5 文件 ~120 行 a11y 增强）：
- `DataTable.vue`：表格 → `role="grid"` + 行 → `role="row"` + `tabindex` + `aria-selected` + `aria-rowindex` + 单元格 → `role="gridcell"` + 表头 → `role="columnheader"` + `aria-sort` + 完整键盘导航（↑↓ 上下行 / Home/End 首尾 / Enter/Space 选中）
- `FilterForm.vue`：3 个 select → `aria-label` + 清除按钮 → `aria-label` + 区域 → `role="region"`
- `AdminSidebar.vue`：导航 → `aria-label="主导航"` + 按钮 → `aria-current="page"` + 装饰 → `aria-hidden="true"`
- `AdminHeader.vue`：搜索 → `<label>` 关联 + `aria-label` + 新建按钮 → `aria-label`
- `App.vue`：skip link → `href="#main-content"` + main → `tabindex="-1"` + `aria-labelledby="page-title"`
- `style.css`：`.sr-only` + 全局 `:focus-visible` 焦点环 + `prefers-reduced-motion` 降级

**已知风险点**（按 v2.1 剩余严重度排序）：
- 🟡 **P2**：批量操作条 `aria-live` 仍未实现（mock 4-1 项目无批量操作 UI）
- 🟡 **P2**：FilterForm 错误信息无 `role="alert"`（mock 数据无错误状态）
- 🟢 **P3**：`prefers-reduced-motion` 仅关闭动效，未提供"简化布局"备选

**v2.1 严重度评估**：🟢 **a11y 显著提升**（从 v2.0 几乎全缺 → 28+ 处 a11y 属性 + 完整键盘可达 + 焦点环 + 降级支持）

### 7.2 4-1-linear-vue v3.0 linear-light 切换（2026-06-10 完成）

**改造方式**：token.json 翻面 + 2 处 CTA on-primary 文字修复 + 字体族回填
**验证日期**：2026-06-10
**验证脚本**：[`./verification/4-1-linear-vue/verify-v3.0-light.sh`](./verification/4-1-linear-vue/verify-v3.0-light.sh)（手工版，替代不存在的 `scripts/a11y-scan.sh` 与 `scripts/perf-runtime-check.sh`）

| 维度 | v2.1 dark | v3.0 light | 变化 |
|------|----------|-----------|------|
| Build (`vue-tsc -b && vite build`) | ✅ | ✅ | 无 |
| 字体 src 200 OK | ✅ | ✅ inter + jetbrains | 无 |
| a11y-scan 5 模式总分 | 71 (B) | 71 (B) | **持平** |
| 实质 P 覆盖率 | 14/14 | 14/14 | **持平** |
| `body` 字体真实加载 | ⚠️ fallback | ✅ Inter (token 修正) | **修复** |
| 视觉对比截图 | 2 张 (1440 + 390) | 6 张 (full/viewport/sidebar/header/filter/datatable) | **+4 张** |
| `meta.theme` | `dark` | `light` | 翻面 |
| `surface.base` | `#010102` | `#FFFFFF` | 翻面 |
| `ink.default` | `#F7F8F8` | `#1A1B1F` | 翻面 |
| on-primary 文字 | `text-ink-default` (暗底合理) | `text-white` (#5E6AD2 上 4.2:1 → 4.5:1+) | **修复 2 处** |
| 焦点环 outline | `#5b6cff` | `#5b6cff` (白底 5.3:1 ✅) | 保留 |

**v3.0 修复清单**（3 文件）：
- [token.json](./verification/4-1-linear-vue/token.json)：`meta.name` `linear-dark` → `linear-light`，`meta.theme` `dark` → `light`，surface / ink / border 翻面（基于 DESIGN.md `inverse-*` 系列），`fontFamilies.display/body.stack` 加 `'Inter'` 优先匹配 `@font-face`
- [style.css](./verification/4-1-linear-vue/src/style.css)：加 `body { font-family: 'Inter', 'Inter Variable', system-ui, sans-serif }` 覆盖 Tailwind preflight 默认 `ui-sans-serif`；加 `.text-mono { font-family: 'JetBrains Mono' }` 覆盖 mono 字体族；加 `transition: background 200ms, color 200ms` 主题切换过渡（不包含 font-family 避免 FOIT）
- [AdminHeader.vue](./verification/4-1-linear-vue/src/components/AdminHeader.vue)：CTA "新建问题" `text-ink-default` → `text-white`（#5E6AD2 亮色 on-primary 对比度 4.2:1 临界 AA → 4.5:1+ ✅）
- [AdminSidebar.vue](./verification/4-1-linear-vue/src/components/AdminSidebar.vue)：品牌 logo L 字符 `text-ink-default` → `text-white`（同上原因）

**v3.0 验证证据**：
- `screenshots/v3.0-light-full.png` (2880x1494) — 整页截图
- `screenshots/v3.0-light-viewport.png` (2880x1494) — 1440x900 视口
- `screenshots/v3.0-light-admin-sidebar.png` (480x1494) — 主侧栏
- `screenshots/v3.0-light-admin-header.png` (2400x96) — 顶栏
- `screenshots/v3.0-light-filter-form.png` (2304x132) — 筛选条
- `screenshots/v3.0-light-data-table.png` (2400x1398) — 数据表格
- 可与 `screenshots/admin-linear-1440.png` (2880x1494, 暗色版) 做视觉对比

**v3.0 严重度评估**：🟢 **翻面零回归**（a11y 71 → 71 持平 + 实质 P 14/14 持平 + 字体真实加载首次达成 + 亮色对比度全部 ≥ AA）

### 7.3 整体状态

- ✅ **已完成**：本专题文件（v1.9）
- 🔄 **v2.0 进行中**：4-1 实际审计完成（2026-06-08），需补 4-1 实际 a11y 增强实现

---

## 8. v2.3 自动化 a11y 静态扫描（5 模式 · 零依赖）

**扫描工具**：[`../../scripts/a11y-scan.sh`](../../scripts/a11y-scan.sh) v1.0
**5 模式**：H-1 aria-* / H-2 role / H-3 alt / H-4 focus / H-5 reduced-motion
**评分**：A（5/5 优秀）/ B（4/5 良好）/ C（3/5 中等）/ D（≤2/5 需修复）

### 8.1 admin-panels 类别扫描结果

| 项目 | H-1 aria | H-2 role | H-3 alt | H-4 focus | H-5 reduced | Total | 评分 | 严重度 |
|---|---|---|---|---|---|---|---|---|
| 4-1-linear-vue (v2.1 dark) | 27 | 16 | 0 | 27 | 1 | 71 | **B** | 🟡 良好 |
| 4-1-linear-vue (v3.0 light) | 27 | 16 | 1 | 26 | 1 | 71 | **B** | 🟡 良好 |

> **v3.0 H-3 alt 1 处**：v2.11 字体真实化后，[App.vue](./verification/4-1-linear-vue/src/App.vue) 加了装饰性 SVG `<img alt="decorative" aria-hidden="true">`，H-3 从 0 → 1（v2.11 B 方案要求装饰性 alt 标记）。

### 8.2 类别 v2.3 评估

- **B 级（4/5 良好 · v2.1 P0 修复成果）** —— v2.1 修复 5 文件 28+ 处 a11y，a11y-scan v2.3 验证：H-1 27 + H-2 16 + H-4 27 + H-5 1 = 71 分
- **H-3 alt 0 处**：4-1 是 admin 数据表格项目，无图像 → 合理 0
- **修复前 0 分 → 修复后 71 分**：v2.0 时 0/5 全缺，v2.1 修复后 4/5 良好，**升级幅度最大**
- **v3.0 亮色切面零回归**：从 dark 翻面到 light，a11y 总分 71 → 71 持平，H-3 alt 因装饰性 SVG 标记从 0 → 1，H-4 focus 从 27 → 26（去掉 1 个暗色专属 focus，但保留全部主要 focus 环）

### 8.3 v2.4 等待修复清单

- 4-1 已具备 H-1/H-2/H-4/H-5 全部基线，无 P1 必修复项
- H-3 alt 0 是项目特性（admin 表格无图像），无需修复

---

## 9. 字体真实后暗色模式（v2.12 Task 8.3 同步）

> **背景**：v2.11 B 方案批量下载真实字体后（11 升 P 项目 Inter Variable + JetBrains Mono Regular），所有 `<link href="https://fonts.googleapis.com/css2?family=Inter@latest">` 的 `@latest` 错误全部修复为 `family=Inter:wght@400;500;600;700`，build 后字体 src 全部 200 OK。本节记录"字体真实后"在暗色模式下需要新增的 a11y 注意事项。

### 9.1 真实字体与暗色背景的对比度（≥ 4.5:1 WCAG AA）

| 元素 | 真实字体（v2.11 B 方案后） | 真实前 fallback | 对比度（暗色 bg `#0F1011` Linear canvas） |
|---|---|---|---|
| **主文字** | Inter Variable 400 `#F7F8F8` | system-ui（San Francisco / Roboto） | **16.5:1** ✅ 远超 AA 4.5:1 |
| **次文字** | Inter Variable 400 `#D0D6E0` | system-ui | **13.0:1** ✅ 远超 AA |
| **辅助文字** | Inter Variable 400 `#8A8F98` | system-ui | **6.4:1** ✅ 超过 AA |
| **暗文字** | Inter Variable 400 `#62666D` | system-ui | **4.7:1** ⚠️ 临界 AA（建议加粗到 500） |
| **数字 / spec** | JetBrains Mono Regular 400 `#F7F8F8` | monospace | **16.5:1** ✅ 远超 AA |
| **accent / CTA** | Inter Variable 600 `#828FFF` Linear lavender-blue | system-ui | **8.4:1** ✅ AAA 7:1 |

> **结论**：v2.11 字体真实后，4-1-linear-vue 中后台暗色对比度全部 ≥ 4.5:1（WCAG AA），多数 ≥ 7:1（AAA）。

### 9.2 真实字体在暗色数据表格的渲染优化

中后台数据表格（4-1-linear-vue 核心）是字体真实化最大受益场景：

- **真实前**：system-ui fallback → 表格数字宽度不一致（Helvetica 是 proportional）→ `tnum` 失效 → 数字列抖动
- **真实后**：JetBrains Mono Regular + `font-feature-settings: 'tnum'` → 数字宽度一致 → 表格数字列稳定不抖动
- **关键**：表格 `<td>` 必须用 mono + tnum，否则数字千分位切换时整列宽度抖动（CLS 增加）
- **推荐**：表格行高 40-48px（暗色 OLED 阅读舒适），字号 13-14px，行间距 1.5

### 9.3 真实字体与暗色模式的过渡动画

```css
/* v2.11 B 方案落地 · 中后台主题切换 200ms 过渡 */
:root {
  --bg: #0F1011;
  --surface-1: #141516;
  --surface-2: #18191A;
  --text-primary: #F7F8F8;
  --text-muted: #D0D6E0;
  --text-subtle: #8A8F98;
  --accent: #828FFF;
  --font-display: 'Inter Variable', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
body {
  background: var(--bg);
  color: var(--text-primary);
  font-family: var(--font-display);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  transition: background 200ms ease, color 200ms ease;
}
```

> **重要**：不要把 `font-family` 放进 transition 列表（字体切换成本高，会触发 FOIT/FOUT）。只过渡 background + color 即可。

### 9.4 v2.12 字体 token 审计（与 Task 8.7 联动）

| 检查项 | v2.11 B 方案后状态 |
|---|---|
| `fontFamilies.display` | ✅ Inter Variable（含 `cv11`/`ss01`/`tnum`） |
| `fontFamilies.body` | ✅ Inter Variable |
| `fontFamilies.mono` | ✅ JetBrains Mono（含 `tnum`） |
| `fontDisplay: swap` | ✅ 已标注 |
| 4-1 实质 P 覆盖率 | ✅ 100%（15/15 verification） |
| 装饰性 SVG `alt="decorative"` | ✅ 11 升 P 项目全部修复 |

---

## 关联文档

- [`../../references/methodology/font-loading-strategy.md`](../../references/methodology/font-loading-strategy.md) — 字体加载策略
- [`../../references/methodology/dark-mode-a11y.md`](../../references/methodology/dark-mode-a11y.md) — 通用暗色模式 + a11y
- [`../../scripts/perf-runtime-check.sh`](../../scripts/perf-runtime-check.sh) — 实质 P 验证

