# Design & Collaboration Brands — 品牌设计参考

> 覆盖 6 个设计与协作品牌（Figma / Framer / Miro / Notion / Webflow / Sanity）。本目录是 **设计工具 / 内容管理 / 协作平台**类项目的首选参考库——尤其 **Figma 黑白核心 + 超大色块段落**（设计工具标杆）· **Miro 黄色活力 + 无限画布**（白板标杆）· **Notion 深海军蓝 + 紫色药丸**（笔记/知识管理标杆）· **Sanity 近纯黑 + waldenburg 精密排版**（CMS 标杆）4 大调性。

---

## 索引

| 品牌 | 状态 | 风格摘要 |
|---|---|---|
| [Figma](./figma-DESIGN.md) | 🟢 已落地 | 黑白核心 + 超大色块段落 + figmaSans |
| [Framer](./framer-DESIGN.md) | 🟢 已落地 | 近纯黑 + GT Walsheim -5.5px + 渐变聚光灯 |
| [Miro](./miro-DESIGN.md) | 🟢 已落地 | 黄色活力 + 无限画布 |
| [Notion](./notion-DESIGN.md) | 🟢 已落地 | 深海军蓝英雄带 + 紫色药丸 CTA |
| [Webflow](./webflow-DESIGN.md) | 🟢 已落地 | 丰富二级色 + WF Visual Sans + 5 层阴影 |
| [Sanity](./sanity-DESIGN.md) | 🟢 已落地 | 近纯黑 + waldenburg 精密排版 + 霓虹点缀 |

---

## 与 8 类别平台关系

| 类别 | 关系 |
|---|---|
| `landing-pages/` | 落地页常引用 Miro / Notion / Webflow 风格 |
| `saas-marketing/` | 4-2-stripe-landing 共享 saas-marketing 组件契约 |
| `admin-panels/` | Notion / Sanity 数据后台常用 |

---

## 通用调性（本目录品牌共性）

| 维度 | 标准 |
|---|---|
| **Theme** | 黑白核心（Figma / Sanity）+ 部分亮色（Miro / Notion / Webflow） |
| **Typography** | Sans 主导（Inter / SF Pro）/ 部分 custom sans（Framer GT Walsheim / Figma figmaSans） |
| **Color Block** | 大面积单色段落（Figma 标志）· 80% 单色 + 20% 强调色 |
| **CTA** | 1-3 个 / 页面 · 实色填充 + 简洁文字 |
| **Easing** | 弹性 · 200-300ms（创意工具活泼感） |
| **Whitespace** | section 间距 80-120px |

---

## 字体标注（v2.12 Task 8.1 · 4 字段）

> 本目录字体策略：**Figma 用自研 figmaSans · Framer 用 GT Walsheim · Webflow 用 WF Visual Sans · Notion / Sanity 用 Inter**。统一基线推荐如下：

| 字段 | 推荐值 | 备选 |
|---|---|---|
| **主字体（display + body）** | Inter Variable（含 `tnum`/`ss01`/`cv11`） | SF Pro Display / 商业自研（figmaSans / GT Walsheim）/ GT America（Grilli Type） |
| **Mono（代码 / spec / 快捷键）** | JetBrains Mono | SF Mono / Roboto Mono / IBM Plex Mono |
| **CJK fallback** | Noto Sans SC（body） + Noto Sans Mono CJK SC（mono） | 苹方-简 / 思源黑体 / Sarasa Mono SC |
| **推荐下载链接** | [Google Fonts: Inter](https://fonts.google.com/specimen/Inter) · [JetBrains Mono](https://www.jetbrains.com/lp/mono/) · [Google Fonts: Noto Sans SC](https://fonts.google.com/noto/specimen/Noto+Sans+SC) · [GT America（商业授权）](https://www.grillitype.com/typeface/gt-america) | 商业授权备选：GT Walsheim（Grilli Type）/ GT America（Grilli Type）/ WF Visual Sans（Webflow） |

**fontDisplay 策略**：`swap` —— Inter Variable 单字重 ~25KB，swap 即可；CJK 字体需 unicode-range subset。

**设计工具字体要点**：
- 工具类应用必须 mono 字体支持快捷键展示（⌘ + K 等）· JetBrains Mono 是开源首选
- 协作平台（CSPM 类）需要多语言 fallback · CJK + 阿拉伯 + 西里尔 三段 unicode-range

---

## 关联

- 上一级目录：[`../INDEX.md`](../INDEX.md)（brand-library 总索引）
- 上一级方法论：[`../../references/methodology/typography.md`](../../references/methodology/typography.md)（排版方法论）