# Automotive Brands — 品牌设计参考

> 覆盖 3 个汽车品牌（BMW / Ferrari / Lamborghini）。本目录是 **豪华汽车 / 跑车 / 高端品牌官网**类项目的首选参考库——尤其 **Ferrari 近纯黑 + Rosso Corsa 赛车红 + FerrariSans + 电影级 Hero**（超跑标杆）· **Lamborghini 真黑画布 + LamboType 12° 斜切 + 金色 CTA + 零圆角**（超跑标杆）· **BMW BMW 蓝 CTA + BMW Type Next + 车型配置卡片网格**（豪华车标杆）3 大调性。

---

## 索引

| 品牌 | 状态 | 风格摘要 |
|---|---|---|
| [BMW](./bmw-DESIGN.md) | 🟢 已落地 | BMW 蓝 CTA + BMW Type Next + 车型配置卡片网格 |
| [Ferrari](./ferrari-DESIGN.md) | 🟢 已落地 | 近纯黑 + Rosso Corsa 赛车红 + FerrariSans + 电影级 Hero |
| [Lamborghini](./lamborghini-DESIGN.md) | 🟢 已落地 | 真黑画布 + LamboType 12° 斜切 + 金色 CTA + 零圆角 |

> **与 luxury/ 边界**：Ferrari / Lamborghini 是超跑，归本目录（automotive）；Aston Martin / Rolls-Royce 是顶级豪华 GT，归 luxury/。

---

## 与 8 类别平台关系

| 类别 | 关系 |
|---|---|
| `premium-showcase/` | 车型配置器 / cinematic scroll 落地常引用 Ferrari / Lamborghini 风格 |
| `landing-pages/` | 营销落地页常引用 BMW / Ferrari 摄影风格 |

---

## 通用调性（本目录品牌共性）

| 维度 | 标准 |
|---|---|
| **Theme** | 暗色为主（Ferrari / Lamborghini）/ 亮色为辅（BMW） |
| **Typography** | Sans 主导 + custom 自研（FerrariSans / LamboType / BMW Type Next） |
| **Photography** | ≥ 80% viewport · 全屏电影摄影 · 极慢 cinematic 滚动 |
| **CTA** | 1-2 个 / 全页 · 单色 accent（红/蓝/金） |
| **Easing** | 慢 · 600-1200ms（cinematic · 极慢节奏） |
| **Whitespace** | section 间距 120-240px（极宽） |

---

## 字体标注（v2.12 Task 8.1 · 4 字段）

> 本目录字体策略：**3 个品牌均使用自研商业字体**（FerrariSans / LamboType / BMW Type Next）。开源替代推荐如下：

| 字段 | 推荐值 | 备选 |
|---|---|---|
| **主字体（display + body）** | Inter Variable（含 `cv11`/`ss01`） | SF Pro Display（macOS 原生）/ 商业自研（FerrariSans / LamboType / BMW Type Next）/ GT America |
| **Mono（spec / 性能参数）** | JetBrains Mono（`font-feature-settings: 'tnum'`） | SF Mono / Roboto Mono / IBM Plex Mono |
| **CJK fallback** | Noto Sans SC（body） + Noto Sans Mono CJK SC（mono） | 苹方-简 / 思源黑体 / Sarasa Mono SC |
| **推荐下载链接** | [Google Fonts: Inter](https://fonts.google.com/specimen/Inter) · [JetBrains Mono](https://www.jetbrains.com/lp/mono/) · [Google Fonts: Noto Sans SC](https://fonts.google.com/noto/specimen/Noto+Sans+SC) · [GT America（商业授权）](https://www.grillitype.com/typeface/gt-america) | 商业授权备选：FerrariSans（Ferrari 内部）/ LamboType（Lamborghini 内部）/ BMW Type Next（BMW 内部） |

**fontDisplay 策略**：`swap` —— Inter Variable 单字重 ~25KB，swap 即可；CJK 字体需 unicode-range subset。

**汽车类排版要点**：
- 性能 spec（马力 / 扭矩 / 加速）必须用 Mono + 80-120px 大字号 · letter-spacing -2px ~ -4px
- 配置器价格用 `tnum` + Mono · 价格变动时数字宽度不抖动
- Lamborghini 风 12° 斜切（`transform: skew(-12deg)`）仅用于大标题，不影响可读性

---

## 关联

- 上一级目录：[`../INDEX.md`](../INDEX.md)（brand-library 总索引）
- 上一级分类：[`../../premium-showcase/README.md`](../../premium-showcase/README.md)（cinematic scroll 落地区）