# Developer Tools Brands — 品牌设计参考

> 覆盖 14 个开发工具品牌（Linear.app / Vercel / Raycast / Warp / Sentry / Supabase / PostHog / HashiCorp / Mintlify / MongoDB / ClickHouse / Expo / Resend / Superhuman）。本目录是 **项目管理 / 部署 / 数据库 / 监控 / 开发文档**类项目的首选参考库——尤其 **Linear 暗色 IDE 美学**（中后台标杆）· **Vercel 极简白**（落地页标杆）· **ClickHouse 工程级黑黄**（数据大屏）· **Resend 编辑式排版**（衬线 display）4 大调性。

---

## 索引

| 品牌 | 状态 | 风格摘要 |
|---|---|---|
| [Linear.app](./linear.app-DESIGN.md) | 🟢 已落地 | 近纯黑画布 + 薰衣草蓝 + 四级表面阶梯（**中后台标杆 v2.11 B 方案 4-1 旗舰**） |
| [Vercel](./vercel-DESIGN.md) | 🟢 已落地 | 极简白 + Geist 字体 + 阴影即边框 |
| [Raycast](./raycast-DESIGN.md) | 🟢 已落地 | 暗色命令面板 + 搜索优先 |
| [Warp](./warp-DESIGN.md) | 🟢 已落地 | 暗色终端 + 区块化命令 |
| [Sentry](./sentry-DESIGN.md) | 🟢 已落地 | 深紫品牌 + 错误追踪 |
| [Supabase](./supabase-DESIGN.md) | 🟢 已落地 | 暗色原生 + 翡翠绿 + HSL 半透明层叠 |
| [PostHog](./posthog-DESIGN.md) | 🟢 已落地 | 暖奶油画布 + 刺猬吉祥物 + 黄橙 CTA |
| [HashiCorp](./hashicorp-DESIGN.md) | 🟢 已落地 | 近纯黑 + 多产品色彩标识 + charcoal 卡片 |
| [Mintlify](./mintlify-DESIGN.md) | 🟢 已落地 | 天空渐变 Hero + Mintlify 绿 + 三栏文档布局 |
| [MongoDB](./mongodb-DESIGN.md) | 🟢 已落地 | 深青黑 Hero + MongoDB 绿药丸 + Euclid Circular A |
| [ClickHouse](./clickhouse-DESIGN.md) | 🟢 已落地 | 近纯黑 + 电黄品牌电压 + Inter 7 字重（**大屏标杆 4-3 旗舰**） |
| [Expo](./expo-DESIGN.md) | 🟢 已落地 | 白画布天蓝渐变 + 纯黑 CTA + 设备 Mockup Hero |
| [Resend](./resend-DESIGN.md) | 🟢 已落地 | 近纯黑 + Domaine Display 衬线大标题 + ABC Favorit |
| [Superhuman](./superhuman-DESIGN.md) | 🟢 已落地 | 深紫渐变 Hero + Super Sans VF + 暖奶油按钮 |

> **状态说明**：14 个品牌 DESIGN.md 已全部建仓。Linear + ClickHouse 是数据/中后台双旗舰（v2.11 B 方案落地）。

---

## 与 8 类别平台关系

| 类别 | 关系 |
|---|---|
| `admin-panels/` | Linear 4-1-linear-vue 是本目录的旗舰落地（vue-best-practices + tailwind bridge） |
| `dashboards/` | ClickHouse 4-3-dashboard-command-center 是本目录的大屏旗舰（dashboard 平台 token） |
| `landing-pages/` | Vercel 5-2-vercel-landing 是本目录的落地页旗舰 |
| `ai-products/` | x.ai / Replicate / Together.ai 也在此（DevTools 工具与 AI 边界） |

---

## 通用调性（本目录品牌共性）

| 维度 | 标准 |
|---|---|
| **Theme** | 暗色为主（10/14 个品牌）/ 亮色为辅（Vercel / PostHog / Expo / Superhuman） |
| **Typography** | Sans 主导（Inter 最常见）/ 部分 mono display（Linear / Warp / ClickHouse）/ 部分 serif display（Resend） |
| **CTA** | 单色 accent / 极少品牌色（克制） |
| **Easing** | 快速 · 150-200ms（专业感 · 不要过度动画） |
| **Whitespace** | 中等 · section 间距 48-80px（中后台密度） |
| **Density** | 高密度（数据/列表/表格优先） |
| **Brand Color** | 单 accent + 高对比 + 极少装饰 |

---

## 字体标注（v2.12 Task 8.1 · 4 字段）

> 本目录 14 个品牌字体策略最分散：Linear 用自定义 + SF Pro fallback / Vercel 用 Geist / ClickHouse 用 Inter 7 字重 / Resend 用 Domaine Display 衬线。统一基线推荐如下：

| 字段 | 推荐值 | 备选 |
|---|---|---|
| **主字体（display + body）** | Inter Variable（含 `tnum`/`ss01`/`cv11`） | Geist（Vercel）/ SF Pro Display（macOS 原生）/ Helvetica Neue |
| **Mono（代码 / spec）** | JetBrains Mono | Geist Mono（Vercel）/ SF Mono / Roboto Mono / IBM Plex Mono |
| **Display 编辑式（少数）** | Playfair Display / Source Serif 4（Resend 替代） | Domaine Display（商业，Resend 用） / GT Sectra |
| **CJK fallback** | Noto Sans SC（body） + Sarasa Mono SC（mono） | 苹方-简（macOS）/ 思源黑体 |
| **推荐下载链接** | [Google Fonts: Inter](https://fonts.google.com/specimen/Inter) · [Geist](https://vercel.com/font) · [JetBrains Mono](https://www.jetbrains.com/lp/mono/) · [Google Fonts: Noto Sans SC](https://fonts.google.com/noto/specimen/Noto+Sans+SC) | 商业授权备选：Domaine Display（Klim Type）/ GT America（Grilli Type） |

**fontDisplay 策略**：`swap` —— Inter Variable + JetBrains Mono Regular 已批量下载到 11 项目（v2.11 B 方案 `download-fonts.sh`），swap 即可；CJK 字体需 unicode-range subset。

**v2.11 字体真实化落地**：
- 11 升 P 项目全部使用 Inter Regular + JetBrains Mono Regular
- 22 处 onerror 冗余 DOM 已清理（D 终极方案）
- 实质 P 覆盖率 100%（15/15 verification）

---

## 关联

- 上一级目录：[`../INDEX.md`](../INDEX.md)（brand-library 总索引）
- 上一级分类：[`../../dashboards/README.md`](../../dashboards/README.md) + [`../../admin-panels/README.md`](../../admin-panels/README.md)（双旗舰落地区）
- 上一级方法论：[`../../references/methodology/performance-budget.md`](../../references/methodology/performance-budget.md)（性能预算）