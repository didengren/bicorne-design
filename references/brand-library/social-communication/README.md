# Social & Communication Brands — 品牌设计参考

> 覆盖 3 个社交/通讯品牌（Pinterest / Uber / Meta）。本目录是 **社交平台 / 通讯工具 / 内容发现 / 移动出行**类项目的首选参考库——尤其 **Pinterest 瀑布流图片发现 + 红色 CTA + Pin Sans**（图片社交标杆）· **Uber 黑白极简 + UberMove + 胶囊按钮**（出行工具标杆）· **Meta 白画布 + Optimistic VF + 钴蓝购买**（社交平台标杆）3 大调性。

---

## 索引

| 品牌 | 状态 | 风格摘要 |
|---|---|---|
| [Pinterest](./pinterest-DESIGN.md) | 🟢 已落地 | 瀑布流图片发现 + 红色 CTA + Pin Sans |
| [Uber](./uber-DESIGN.md) | 🟢 已落地 | 黑白极简 + UberMove + 胶囊按钮 |
| [Meta](./meta-DESIGN.md) | 🟢 已落地 | 白画布 + Optimistic VF + 钴蓝购买 + 药丸按钮 |

---

## 与 8 类别平台关系

| 类别 | 关系 |
|---|---|
| `mobile-web/` | Pinterest 移动 H5 风格直接对应（mobile-1-x-like-feed 同类图片流） |
| `landing-pages/` | Meta VR / WhatsApp 营销落地页常引用 |
| `admin-panels/` | 社交平台后台常用 Pinterest / Meta 风格 |

---

## 通用调性（本目录品牌共性）

| 维度 | 标准 |
|---|---|
| **Theme** | 亮色为主（Pinterest / Meta）/ 黑白极简（Uber） |
| **Typography** | Sans 主导（Inter / Pin Sans / UberMove / Optimistic VF） |
| **Photography / Visual** | 图片流（Pinterest）/ 地图（Uber）/ UI 截图（Meta） |
| **CTA** | 1-3 个 / 页面 · 单色 accent · 胶囊/药丸按钮 |
| **Easing** | 中等 · 200-300ms |
| **Whitespace** | section 间距 64-96px |

---

## 字体标注（v2.12 Task 8.1 · 4 字段）

> 本目录字体策略：**Pinterest 用自研 Pin Sans · Uber 用 UberMove · Meta 用 Optimistic VF**。统一基线推荐如下：

| 字段 | 推荐值 | 备选 |
|---|---|---|
| **主字体（display + body）** | Inter Variable（含 `tnum`/`ss01`/`cv11`） | SF Pro Display / 自研（Pin Sans / UberMove / Optimistic VF）/ GT America |
| **Mono（spec / 时间戳 / 数字）** | JetBrains Mono | SF Mono / Roboto Mono / IBM Plex Mono |
| **CJK fallback** | Noto Sans SC（body） + Noto Sans Mono CJK SC（mono） | 苹方-简 / 思源黑体 / Sarasa Mono SC |
| **推荐下载链接** | [Google Fonts: Inter](https://fonts.google.com/specimen/Inter) · [JetBrains Mono](https://www.jetbrains.com/lp/mono/) · [Google Fonts: Noto Sans SC](https://fonts.google.com/noto/specimen/Noto+Sans+SC) · [Optimistic Display（开源）](https://github.com/yesimxnow/optimistic) | 商业授权备选：UberMove（Uber 内部）/ Pin Sans（Pinterest 内部） |

**fontDisplay 策略**：`swap` —— Inter Variable 单字重 ~25KB，swap 即可；CJK 字体需 unicode-range subset。

**社交/通讯排版要点**：
- 时间戳必须用 `tnum` + Mono（消息列表时间对齐）
- 头像 + 用户名行高 24-28px · 用户名 semibold + 消息 regular
- 内容流图片必须有固定 aspect-ratio（避免 CLS）

---

## 关联

- 上一级目录：[`../INDEX.md`](../INDEX.md)（brand-library 总索引）
- 上一级分类：[`../../mobile-web/README.md`](../../mobile-web/README.md)（移动 H5 同类调性）