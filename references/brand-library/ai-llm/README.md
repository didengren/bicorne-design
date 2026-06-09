# AI & LLM Brands — 品牌设计参考

> 覆盖 12 个 AI / LLM 头部品牌（Claude / Cursor / Cohere / Mistral.ai / Replicate / ElevenLabs / x.ai / Ollama / NVIDIA / RunwayML / Together.ai / Lovable）。本目录是 **AI 产品 / 工具 / 平台**类项目的首选参考库——尤其 **代码感 IDE 美学**（Cursor）· **温暖对话感**（Claude）· **深蓝数据可视化**（Cohere）· **极简文档优先**（Ollama）4 大调性。

---

## 索引

| 品牌 | 状态 | 风格摘要 |
|---|---|---|
| [Claude](./claude-DESIGN.md) | 🟢 已落地 | 温暖对话感 + 奶油色调 + serif display |
| [Cursor](./cursor-DESIGN.md) | 🟢 已落地 | 暗色 IDE 美学 + 代码感 + Inter + JetBrains Mono |
| [Cohere](./cohere-DESIGN.md) | 🟢 已落地 | 深蓝科技感 + 数据可视化 + Inter |
| [Mistral.ai](./mistral.ai-DESIGN.md) | 🟢 已落地 | 法式极简 + 橙色强调 + Inter |
| [Replicate](./replicate-DESIGN.md) | 🟢 已落地 | 暗色网格 + 模型卡片 + Inter |
| [ElevenLabs](./elevenlabs-DESIGN.md) | 🟢 已落地 | 编辑式杂志美学 + 大气渐变球 |
| [x.ai](./x.ai-DESIGN.md) | 🟢 已落地 | 暗色极简 + 等宽字体作 Display + JetBrains Mono |
| [Ollama](./ollama-DESIGN.md) | 🟢 已落地 | 极简文档优先 + 黑白药丸 + Inter |
| [NVIDIA](./nvidia-DESIGN.md) | 🟢 已落地 | 工程级黑绿 + NVIDIA Green 电压 + 2px 直角 + Rajdhani |
| [RunwayML](./runwayml-DESIGN.md) | 🟢 已落地 | 电影级暗色 + 全出血摄影 + abcNormal |
| [Together.ai](./together.ai-DESIGN.md) | 🟢 已落地 | 柔粉渐变 + 午夜蓝暗面 + The Future font |
| [Lovable](./lovable-DESIGN.md) | 🟢 已落地 | 暖奶油画布 + Camera Plain + 透明度驱动色阶 |

> **状态说明**：12 个品牌 DESIGN.md 已全部建仓（v2.11）。**Cursor（v2.11 B 方案 6-1 旗舰）** 与 **Cohere（数据可视化参考）** 是落地首选。

---

## 与 8 类别平台关系

| 类别 | 关系 |
|---|---|
| `ai-products/` | 平台特定工作区（chat-stream / message-bubble / prompt-composer 等 6 组件契约） |
| `developer-tools/` | Cursor / Replicate / x.ai 同时出现在此目录（AI 工具与 DevTools 边界模糊） |
| `enterprise-saas/` | Cohere / Together.ai 也可作 enterprise 入口 |

---

## 通用调性（本目录品牌共性）

| 维度 | 标准 |
|---|---|
| **Theme** | 暗色为主（数据/代码密度高）/ 部分 light 主题（Claude / Lovable / Ollama） |
| **Typography** | Sans 主导（Inter 最常见）/ 部分 serif display（Claude / ElevenLabs）/ Mono 数字（Cursor / x.ai） |
| **CTA** | 1-3 个 / 页面（克制但比 luxury 多） |
| **Easing** | 中等 · 200-300ms `cubic-bezier(0.4, 0, 0.2, 1)` |
| **Whitespace** | section 间距 64-120px |
| **Density** | 中高密度（信息量大于装饰） |
| **Brand Color** | 单 accent 色（蓝/紫/绿/橙 各品牌不同）+ 高对比文字 |

---

## 字体标注（v2.12 Task 8.1 · 4 字段）

> 本目录 12 个品牌中 9 个使用 **Inter** 作为主字体（去耦基线）· 2 个使用 serif display · 1 个使用 mono display（x.ai）。所有 token.json 的 `fontFamilies` 必须遵循下表三段：

| 字段 | 推荐值 | 备选 |
|---|---|---|
| **主字体（display + body）** | Inter Variable（推荐开源方案） | SF Pro Display（macOS 原生）/ 商业 sohne-var（Stripe 用）/ Helvetica Neue |
| **Mono（代码 / spec）** | JetBrains Mono | SF Mono / Roboto Mono / IBM Plex Mono |
| **CJK fallback** | Noto Sans SC（body） + Noto Sans Mono CJK SC（mono） | 苹方-简（macOS）/ 思源黑体（开源）/ Sarasa Mono SC（mono with CJK） |
| **推荐下载链接** | [Google Fonts: Inter](https://fonts.google.com/specimen/Inter) · [JetBrains Mono](https://www.jetbrains.com/lp/mono/) · [Google Fonts: Noto Sans SC](https://fonts.google.com/noto/specimen/Noto+Sans+SC) · [Sarasa Mono SC](https://github.com/be5invis/Sarasa-Gothic) | 商业授权备选：Söhne（Klim）/ GT America（Grilli Type） |

**fontDisplay 策略**：`swap` —— Inter Variable 单字重 ~25KB，swap 即可；CJK 字体必须 unicode-range subset（基本汉字 / 扩展 A / 扩展 B 三段独立加载），ASCII 段直接走 Inter 避免重复。

**子集化（v2.12 走向 E-5 落地）**：
- Inter Variable 拉丁基础段 ~28KB（含 `tnum`/`ss01`/`cv11`）
- Noto Sans SC 常用 3500 字 subset ~700KB（GB2312 子集）/ 完整 ~10MB
- 11 项目实际落地：`download-fonts.sh` 已批量下载 Inter Regular + JetBrains Mono Regular（v2.11 B 方案）

---

## 关联

- 上一级目录：[`../INDEX.md`](../INDEX.md)（brand-library 总索引）
- 上一级分类：[`../../ai-products/README.md`](../../ai-products/README.md)（ai-products 类别 MVI）
- 上一级方法论：[`../../references/methodology/font-loading-strategy.md`](../../references/methodology/font-loading-strategy.md)（字体加载策略 · 含 fontDisplay 五策略）