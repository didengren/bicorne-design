# Fintech Brands — 品牌设计参考

> 覆盖 6 个金融科技品牌（Stripe / Coinbase / Revolut / Wise / Binance / Mastercard）。本目录是 **支付 / 交易 / 银行 / 金融科技**类项目的首选参考库——尤其 **Stripe 极简白 + 紫罗兰**（落地页标杆 · 5-1 旗舰）· **Binance 暗色 + 黄 CTA**（交易所）· **Mastercard 暖奶油 + 极端圆角**（轨道圆弧）3 大调性。

---

## 索引

| 品牌 | 状态 | 风格摘要 |
|---|---|---|
| [Stripe](./stripe-DESIGN.md) | 🟢 已落地 | 白色画布 + 紫罗兰 + sohne-var 300（**落地页标杆 5-1 旗舰**） |
| [Coinbase](./coinbase-DESIGN.md) | 🟢 已落地 | 机构级蓝 + 展示字重 400 |
| [Revolut](./revolut-DESIGN.md) | 🟢 已落地 | 深紫渐变 + 金融超级应用 |
| [Wise](./wise-DESIGN.md) | 🟢 已落地 | 绿色信任 + 透明感 |
| [Binance](./binance-DESIGN.md) | 🟢 已落地 | 近纯黑 + Binance 黄 CTA + BinanceNova 自定义字体 |
| [Mastercard](./mastercard-DESIGN.md) | 🟢 已落地 | 暖奶油画布 + 极端圆角 + 轨道圆弧系统 + MarkForMC |

---

## 与 8 类别平台关系

| 类别 | 关系 |
|---|---|
| `landing-pages/` | Stripe 5-1 是本目录的旗舰落地（4-2-stripe-landing 同源） |
| `admin-panels/` | Coinbase / Binance 适合数据密集型中后台 |
| `saas-marketing/` | 4-2-stripe-landing 共享 saas-marketing 组件契约 |

---

## 通用调性（本目录品牌共性）

| 维度 | 标准 |
|---|---|
| **Theme** | 亮色为主（Stripe / Coinbase / Wise / Mastercard 4/6）/ 暗色为辅（Revolut / Binance） |
| **Typography** | Sans 极薄（300-400 字重）· Stripe sohne-var / Coinbase 系统字 / Binance 自定义 |
| **CTA** | 单一品牌色 + 高对比（信任 + 行动导向） |
| **Easing** | 优雅 · 250-400ms（金融级稳重） |
| **Whitespace** | section 间距 80-160px（克制专业） |
| **Brand Color** | 单 accent（紫/蓝/绿/黄/红）+ 大面积白/暖奶油底 |

---

## 字体标注（v2.12 Task 8.1 · 4 字段）

> Stripe sohne-var 是商业字体（Klim Type Foundry 授权），开源替代推荐 Inter Variable 300 字重：

| 字段 | 推荐值 | 备选 |
|---|---|---|
| **主字体（display + body）** | Inter Variable 300-400 字重（开源替代 sohne-var） | sohne-var（商业 · Stripe）/ Söhne（Klim）/ GT America（Grilli Type）/ SF Pro Display |
| **Mono（数字 / 价格 / spec）** | JetBrains Mono（`font-feature-settings: 'tnum'`） | SF Mono / Roboto Mono / IBM Plex Mono / BinanceNova（商业 · Binance 用） |
| **CJK fallback** | Noto Sans SC（body）+ Noto Sans Mono CJK SC（mono） | 苹方-简 / 思源黑体 / Sarasa Mono SC |
| **推荐下载链接** | [Google Fonts: Inter](https://fonts.google.com/specimen/Inter) · [JetBrains Mono](https://www.jetbrains.com/lp/mono/) · [Google Fonts: Noto Sans SC](https://fonts.google.com/noto/specimen/Noto+Sans+SC) · [Söhne（商业授权）](https://klim.co.nz/retail-fonts/soehne/) | 商业授权备选：Söhne（Klim Type）/ GT America（Grilli Type）/ BinanceNova（商业） |

**fontDisplay 策略**：`swap` —— Inter 300 字重 ~22KB，swap 即可；CJK 字体必须 subset（金融场景常用 1500 字 GB2312 子集）。

**金融级排版要点**：
- 所有数字必须用 `tnum`（tabular-nums）确保价格宽度一致
- 小数点对齐（`font-feature-settings: 'tnum' 'cv11'`）· 大金额用 `font-weight: 300`（轻量克制）
- 货币符号与数字之间固定 4-8px 间距（不能用系统默认空格）

---

## 关联

- 上一级目录：[`../INDEX.md`](../INDEX.md)（brand-library 总索引）
- 上一级分类：[`../../landing-pages/README.md`](../../landing-pages/README.md)（Stripe 5-1 旗舰落地区）