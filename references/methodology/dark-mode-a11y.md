# Dark Mode & Accessibility 通用方法论

> 跨类别 / 跨平台 共用方法论。本文件**不重复**类别专属实现细节，只给**通用原则 + 跨平台硬约束 + 跨类别差异速查**。
>
> 类别适配表见 §5。Performance + 资源策略见 [`performance-budget.md`](./performance-budget.md) / [`asset-protocol.md`](./asset-protocol.md)；动效降级见 [`animation-best-practices.md`](./animation-best-practices.md) §3.1。

---

## 1. 通用原则（一句话版）

> **暗色不是"颜色翻转"，是"色温+对比+语义重定义"**；**无障碍不是"事后补 a11y"，是"键盘可达+对比+读屏友好"**。
> 暗色模式下用户更敏感于"刺眼"和"细节丢失"，a11y 缺漏会立即暴露。

---

## 2. 暗色模式（Dark Mode）设计原则

### 2.1 不要纯黑 / 纯白

- **暗色背景用 `#121212` 起**（Material 推荐）/` `#0A0A0A`（Apple 推荐）/ `#000000`（OLED 节能，ps-1 Tesla 用）
- **避免纯白文本**（`#FFFFFF` 在 OLED 上有"光晕"效应），用 `#F5F5F7` / `#E8E8ED` 等"近白"
- **避免饱和度高的纯色 accent** —— 在暗色下饱和度过高会"晃眼"，把 accent 的色相保持但降低饱和度 20-30%

| 类别偏好 | bg | surface ladder |
|---|---|---|
| iOS HIG | `#000000` / `#1C1C1E` | systemGroupedBackground |
| Material 3 | `#1C1B1F` | surface / surfaceVariant / surfaceContainer |
| Tesla OLED | `#000000` | `#111` / `#1A` / `#222` |
| Apple Vision Pro | `#FFFFFF`（**light 主题**） + 玻璃质感 | `#FAFAFA` / `#F5F5F7` / `#E8E8ED` |

### 2.2 文本对比度

| 等级 | 标准 | 适用 |
|---|---|---|
| **AAA** | ≥ 7:1 | 主体文本（body） |
| **AA** | ≥ 4.5:1 | 副文本（subtitle / caption） |
| **AA Large** | ≥ 3:1 | 大字号（≥ 18pt 或 14pt bold）/ disabled / hint |

> **暗色下对比度要求更严**：OLED 屏幕的"绝对黑"会让弱对比度的弱化文本完全消失。
> **强推工具**：WebAIM Contrast Checker / Stark (Figma 插件) / axe DevTools。

### 2.3 elevation 表达（重要！）

> **暗色下不能用阴影**（阴影看不到），改用以下两种表达 elevation：

1. **surface 色阶**（Material 3 推荐）—— 越高的 surface 越亮
   ```
   bg #121212 → surface1 #1E1E1E → surface2 #232323 → surface3 #252525
   ```
2. **1px 边框 + 微亮色**（Apple Vision Pro 风格）—— 用 `border: 1px solid rgba(255,255,255,0.08)` 表达"轻微凸起"

### 2.4 图像 / 视频 / 品牌色

- **图片保持原色**（不要加暗色滤镜，会让品牌色失真）
- **视频可能需要降低亮度 10-15%**（保护 OLED 屏幕）
- **品牌色在暗色下需重新校准**（如 Stripe 紫 `#635BFF` 在暗色下用 `#7B73FF` 提亮）

---

## 3. 无障碍 (a11y) 通用清单

### 3.1 键盘可达（Keyboard）

- ✅ **Tab order 合理** —— 按视觉顺序
- ✅ **focus ring 可见** —— `outline: 2px solid var(--focus)` + `outline-offset: 2px`，**禁止** `outline: none`（除非自定义了等效 focus 视觉）
- ✅ **ESC 关闭模态** / Dropdown / Action Sheet
- ✅ **Enter / Space 触发主操作**（button / link / selectable row）
- ✅ **方向键导航** —— Menu / Tab / Listbox / Grid

### 3.2 读屏友好（Screen Reader）

- ✅ **语义化 HTML** —— `<button>` / `<nav>` / `<main>` / `<article>` / `<aside>` / `<header>` / `<footer>`
- ✅ **aria-label 描述非文字元素** —— 图标按钮 / 关闭按钮 / 装饰性图片（`aria-hidden="true"`）
- ✅ **alt text 描述图片** —— 简要说明图片传达的信息
- ✅ **跳过导航** —— `<a href="#main" class="skip-link">Skip to main content</a>`
- ✅ **Live region**（流式输出）—— `<div aria-live="polite">` 让读屏在 AI 流式输出时朗读

### 3.3 视觉对比（Visual）

- ✅ **文本 vs 背景 ≥ 4.5:1 (AA)** / **重点文本 ≥ 7:1 (AAA)**
- ✅ **不依赖颜色传达信息**（色盲友好）—— 错误用 ❌ 图标 + 红字 + 文案三重提示
- ✅ **文字大小可调** —— 支持浏览器 zoom 到 200% 不破版
- ✅ **行高 ≥ 1.5** / **段间距 ≥ 1em**

### 3.4 动效降级（Reduced Motion）

- ✅ **`@media (prefers-reduced-motion: reduce)`** —— 取消 transform 距离，保留 opacity
- ✅ **循环动效降级为 1-2 次**（`animation-iteration-count: 1`）
- ✅ **必备视频 autoPlay 必须可手动暂停** + 提供音频描述

### 3.5 表单 / 输入（Forms）

- ✅ **每个 input 有可见的 label**（不只用 placeholder）
- ✅ **错误信息明确** —— 颜色 + 图标 + 文字描述
- ✅ **必填项标识** —— `*` + `aria-required="true"`
- ✅ **密码强度可视化**（颜色 + 文字）

---

## 4. 跨平台硬约束

### 4.1 暗色触发机制

| 平台 | 自动跟随系统 | 手动 toggle | 实现方式 |
|---|---|---|---|
| **Web** | ✅ `@media (prefers-color-scheme: dark)` | ✅ 显式 toggle 按钮 | CSS variables / token.json 双套 |
| **iOS** | ✅ system trait collection | ✅ 跟随系统 / 亮 / 暗 | `UIUserInterfaceStyle.dark` |
| **Android** | ✅ DayNight | ✅ 跟随系统 / 亮 / 暗 / 自动 | `values-night/` 资源目录 |
| **React Native** | ✅ `useColorScheme()` | ✅ 配合 react-native-paper | Appearance API |
| **Flutter** | ✅ `MediaQuery.platformBrightness` | ✅ 主题 toggle | ThemeMode |

### 4.2 平台规范速查

| 平台 | 暗色最低色阶 | 暗色 accent | 备注 |
|---|---|---|---|
| **iOS HIG** | `#000000` 系统级 | systemBlue `#0A84FF` (暗) / `#007AFF` (亮) | Dynamic Type 是 a11y 强制项 |
| **Material 3** | `#1C1B1F` surface | primary `#D0BCFF` (暗) | Material You 动态色 |
| **Web (业界)** | `#121212` / `#0A0A0A` | 品牌色降饱和 20% | 优先用 CSS variables |

### 4.3 Dynamic Type / 字体缩放

- **iOS** —— UIFontMetrics 跟随系统设置；移动端 Web 用 `rem`/`em`
- **Android** —— sp 单位 + `fontScale` 设置
- **Web** —— `prefers-reduced-motion` 之外，还有 `prefers-contrast: more` / `prefers-color-scheme` 三件套

---

## 5. 跨类别差异速查

| 类别 | 暗色默认 | a11y 强制项 | 暗色落地 |
|---|---|---|---|
| **Dashboard / 大屏** | ✅ 是（数据驾驶舱常驻暗色） | 键盘可达所有面板；focus ring 高对比 | surface ladder 5 档（`#0A→#22`），强 accent 提亮 30% |
| **Admin Panel / 后台** | ⚠️ 可选（Linear 暗 / Notion 亮） | 表格键盘导航（↑↓ 选行 / Enter 展开）；筛选 a11y label | token-bridge 双套：linear-dark + linear-light |
| **SaaS Marketing** | ❌ 否（Stripe 亮 / Vercel 暗可选） | 表单字段 label / 错误提示；CTA 键盘可达 | landing pages 亮色优先；代码 demo 暗色 |
| **Mobile Web** | ❌ 否（IG 亮 / X 暗） | 触摸目标 ≥ 44pt；pull-to-refresh 替代品 | token-bridge 多套：mob-light + mob-dark |
| **Native App** | ✅ 是（系统规范） | Dynamic Type / Material 3 type scale；iOS VoiceOver / Android TalkBack | systemBlue / primary 动态色 |
| **AI Products** | ✅ 是（Cursor 暗 / Playground 亮） | 流式输出 `aria-live="polite"`；代码块读屏友好 | chat-stream a11y 标签 |
| **Premium / Luxury** | ✅ 是（OLED 卖点 / Vision Pro 亮） | 摄影图 alt text 详尽（品牌叙事）；glass 元素焦点环 | ps-1 OLED 纯黑 / ps-2 light 玻璃 |

---

## 6. 速查卡片：5 条绝对不能违反的铁律

1. **暗色不要纯黑 + 纯白** —— OLED 刺眼 + 弱化文本消失（用 `#121212` + `#F5F5F7`）
2. **暗色下不用阴影表达 elevation** —— 改用 surface 色阶 / 1px 边框
3. **禁止 `outline: none`** —— 必须给键盘用户保留可见焦点环
4. **不依赖颜色传达信息** —— 色盲友好（错误用 ❌ 图标 + 红字 + 文字）
5. **动效必须支持 `prefers-reduced-motion: reduce`** —— 取消 transform 距离，保留 opacity

---

## 7. 测试工具清单

| 工具 | 用途 | 平台 |
|---|---|---|
| **WebAIM Contrast Checker** | 颜色对比度 ≥ 4.5:1 / ≥ 7:1 | Web（在线） |
| **axe DevTools** | a11y 全量扫描（WCAG 2.1 AA） | Web 浏览器扩展 |
| **Lighthouse** | a11y 评分（0-100）+ 改进建议 | Web Chrome DevTools |
| **Stark (Figma 插件)** | 设计阶段对比度 + 色盲模拟 | Figma |
| **VoiceOver** | iOS 读屏测试 | iOS / macOS |
| **TalkBack** | Android 读屏测试 | Android |
| **Accessibility Inspector** | macOS 读屏 + a11y 树 | macOS / iOS Simulator |

---

## 8. 类别专题索引

| 类别专题 | 暗色 / a11y 文件 | 复用度 |
|---|---|---|
| Dashboard | 待建（`dashboards/dark-mode-a11y.md`） | — |
| Admin Panel | 待建 | — |
| SaaS Marketing | 待建 | — |
| Mobile Web | 待建 | — |
| Native App | 待建 | — |
| Premium / Luxury | 待建 | — |
| AI Products | 待建 | — |

> 类别专题文件应**只写本类别特有的实现**（如 Mobile Web 的"iOS SafeArea + Android gesture bar 暗色处理"），通用部分读本文件即可。

---

## 9. 缺失 / 待办透明说明

- ⚠️ **未做**：8 个类别专题的 dark-mode-a11y 文件均未建（v1.8 计划）
- ⚠️ **未做**：6 个 verification 项目的实际 a11y 审计（v1.8 计划）
- ✅ **已完成**：本通用方法论文件（v1.8 抽取）
