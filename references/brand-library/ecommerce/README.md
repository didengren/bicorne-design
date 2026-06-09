# E-Commerce & Retail Brands — 品牌设计参考

> 覆盖 3 个电商零售品牌（Airbnb / Nike / Shopify）。本目录是 **电商 / 零售 / 营销落地页 / 消费品牌**类项目的首选参考库——尤其 **Nike 96px 大写 Futura**（体育营销标杆）· **Airbnb Rausch 红 + 摄影主导**（旅游/民宿标杆）· **Shopify 绿色商业**（电商平台标杆）3 大调性。

---

## 索引

| 品牌 | 状态 | 风格摘要 |
|---|---|---|
| [Nike](./nike-DESIGN.md) | 🟢 已落地 | 摄影优先 + 96px 大写 Futura + 药丸 CTA（**体育营销标杆**） |
| [Shopify](./shopify-DESIGN.md) | 🟢 已落地 | 绿色商业 + 商家仪表盘 |
| [Airbnb](./airbnb-DESIGN.md) | 🟢 已落地 | Rausch 红 + 药丸搜索栏 + 摄影主导（**旅游/民宿标杆**） |

---

## 与 8 类别平台关系

| 类别 | 关系 |
|---|---|
| `ecommerce/` | 本目录与 `../../ecommerce/` 同名平台工作区（PLP/PDP/cart/checkout 等 9 layouts） |
| `landing-pages/` | 营销落地页常引用 Nike / Airbnb 摄影风格 |
| `consumer-lifestyle/` | Starbucks / Apple 与本目录部分调性重合（消费品牌） |

---

## 通用调性（本目录品牌共性）

| 维度 | 标准 |
|---|---|
| **Theme** | 亮色为主（摄影友好）/ 部分 light cream（Mastercard-style 暖色 canvas） |
| **Typography** | Sans display + 大字号标题（80-120px）/ 部分 ultra-thin（Airbnb Cereal VF） |
| **Photography** | ≥ 60% viewport · 摄影主导 · 极少装饰 |
| **CTA** | 1-2 个 / 全页 · 药丸按钮 · 单色 accent |
| **Easing** | 优雅 · 300-500ms（营销级动感） |
| **Whitespace** | section 间距 96-160px（极宽 · 摄影友好） |

---

## 字体标注（v2.12 Task 8.1 · 4 字段）

> 本目录字体策略：**Nike Futura PT** 是商业字体（Berthold 授权），开源替代推荐 **Inter Display 700-900**：

| 字段 | 推荐值 | 备选 |
|---|---|---|
| **主字体（display 大字号）** | Inter Display Variable（700-900 字重） | Futura PT（商业 · Nike）/ Söhne Breit（商业）/ Helvetica Neue 900 / Archivo Black |
| **备选字体（body）** | Inter Variable 400 | Söhne（商业）/ Airbnb Cereal VF（商业 · Airbnb 用）/ SF Pro Text |
| **Mono（spec / 价格 / 库存）** | JetBrains Mono（`font-feature-settings: 'tnum'`） | SF Mono / Roboto Mono / IBM Plex Mono |
| **CJK fallback** | Noto Sans SC（body） + Noto Sans Mono CJK SC（mono） | 苹方-简 / 思源黑体 / Sarasa Mono SC |
| **推荐下载链接** | [Google Fonts: Inter](https://fonts.google.com/specimen/Inter) · [Google Fonts: Archivo Black](https://fonts.google.com/specimen/Archivo+Black) · [JetBrains Mono](https://www.jetbrains.com/lp/mono/) · [Google Fonts: Noto Sans SC](https://fonts.google.com/noto/specimen/Noto+Sans+SC) | 商业授权备选：Futura PT（Berthold）/ Söhne Breit Half（Klim）/ Airbnb Cereal VF（Airbnb） |

**fontDisplay 策略**：`swap` —— Inter Display 单字重 ~30KB，swap 即可；Nike 风格的 96px+ 标题需要预先 `preload` 关键字重（700/900）。

**电商排版要点**：
- 大标题字号 80-120px（Nike 风）· 字重 700-900 · letter-spacing -2px ~ -3px
- 价格统一用 `tnum` + JetBrains Mono，确保多商品价格宽度一致
- 折扣数字（¥199 ~~¥399~~）用细线 + 灰色 + Mono 字体

---

## 关联

- 上一级目录：[`../INDEX.md`](../INDEX.md)（brand-library 总索引）
- 上一级分类：[`../../ecommerce/README.md`](../../ecommerce/README.md)（ecommerce 类别 MVI）