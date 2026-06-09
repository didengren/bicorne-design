# Enterprise SaaS Brands — 品牌设计参考

> 覆盖 5 个企业 SaaS 品牌（Intercom / Airtable / Zapier / IBM / Cal）。本目录是 **B2B 中后台 / 客户服务 / 自动化平台 / 企业科技**类项目的首选参考库——尤其 **Intercom 奶油白画布 + Saans + Fin Orange**（客户服务标杆）· **Airtable 白底 + 签名色卡片 + Haas Grotesk**（低代码标杆）· **Zapier 暖奶油 + 三字体系统 + Zapier Orange**（自动化标杆）· **IBM Carbon 体系 + IBM Blue 单色 + Plex Light 300 + 直角**（企业科技标杆）· **Cal 白画布 + 黑色 CTA + Cal Sans + 友好 SaaS**（排程标杆）5 大调性。

---

## 索引

| 品牌 | 状态 | 风格摘要 |
|---|---|---|
| [Intercom](./intercom-DESIGN.md) | 🟢 已落地 | 奶油白画布 + Saans + Fin Orange |
| [Airtable](./airtable-DESIGN.md) | 🟢 已落地 | 白底 + 签名色卡片 + Haas Grotesk |
| [Zapier](./zapier-DESIGN.md) | 🟢 已落地 | 暖奶油 + 三字体系统 + Zapier Orange |
| [IBM](./ibm-DESIGN.md) | 🟢 已落地 | Carbon 体系 + IBM Blue 单色 + Plex Light 300 + 直角 |
| [Cal](./cal-DESIGN.md) | 🟢 已落地 | 白画布 + 黑色 CTA + Cal Sans + 友好 SaaS |

---

## 与 8 类别平台关系

| 类别 | 关系 |
|---|---|
| `admin-panels/` | Intercom / Airtable 后台对应本目录 |
| `saas-marketing/` | 5 个品牌的营销页共享 saas-marketing 组件契约 |
| `landing-pages/` | 落地页常引用 Zapier / Cal 风格 |

---

## 通用调性（本目录品牌共性）

| 维度 | 标准 |
|---|---|
| **Theme** | 亮色为主（Intercom / Airtable / Zapier / Cal 4/5）/ 蓝色 monogram（IBM 5/5） |
| **Typography** | Sans 极薄到中等 · Inter / Plex / Saans / Haas Grotesk / Cal Sans（每个品牌自研或定制） |
| **Brand Color** | 单 accent（Intercom 橙 / Airtable 多色卡 / Zapier 橙 / IBM 蓝 / Cal 黑） |
| **CTA** | 1-3 个 / 页面 · 实色填充 |
| **Easing** | 中等 · 200-300ms（B2B 专业感） |
| **Whitespace** | section 间距 64-120px |

---

## 字体标注（v2.12 Task 8.1 · 4 字段）

> 本目录字体策略最分散：Intercom Saans / Airtable Haas Grotesk / Zapier custom / IBM Plex / Cal Cal Sans 均为商业字体。统一基线推荐如下：

| 字段 | 推荐值 | 备选 |
|---|---|---|
| **主字体（display + body）** | Inter Variable（含 `tnum`/`ss01`/`cv11`） | SF Pro Display / 商业自研（Saans / Cal Sans）/ Plex Sans（开源 · IBM）/ GT America |
| **Mono（spec / API key / 时间戳）** | JetBrains Mono | Plex Mono（开源）/ SF Mono / Roboto Mono / IBM Plex Mono |
| **CJK fallback** | Noto Sans SC（body） + Noto Sans Mono CJK SC（mono） | 苹方-简 / 思源黑体 / Sarasa Mono SC |
| **推荐下载链接** | [Google Fonts: Inter](https://fonts.google.com/specimen/Inter) · [IBM Plex（开源）](https://www.ibm.com/plex/) · [JetBrains Mono](https://www.jetbrains.com/lp/mono/) · [Google Fonts: Noto Sans SC](https://fonts.google.com/noto/specimen/Noto+Sans+SC) | 商业授权备选：Saans（Intercom 内部）/ Haas Grotesk（Haas Type）/ Cal Sans（Cal.com） |

**fontDisplay 策略**：`swap` —— Inter Variable 单字重 ~25KB，swap 即可；IBM Plex 字体族（Sans / Serif / Mono）开源且完整，可作为 Plex 路线备选。

**企业 SaaS 排版要点**：
- 数据表格单元格数字必须 `tnum` + Mono · 避免小数点位移
- API key / token 用 Mono + 等宽 · letter-spacing 0
- 长文档用 18-20px 行高 1.6（可读性优先）

---

## 关联

- 上一级目录：[`../INDEX.md`](../INDEX.md)（brand-library 总索引）
- 上一级方法论：[`../../references/methodology/typography.md`](../../references/methodology/typography.md)（排版方法论）