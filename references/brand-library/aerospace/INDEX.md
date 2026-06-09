# Aerospace & Aviation Brands — 品牌设计参考

> **v1.7 新增行业**：覆盖航天 / 航空 / 高端航空子集。本目录是 `premium-showcase` 类别（cinematic / photography-led）的高端航空行业品牌库——尤其 **engineering-grade photography** / **mission-control 数据可视化** / **mono 数字 spec** / **深空主题色** 4 大调性。

---

## 索引

| 品牌 | 子类别 | 状态 | 风格摘要 |
|---|---|---|---|
| SpaceX | 商业航天 / 火箭 | 🔴 待建 | 纯黑 #000 + 银白 #e8e8e8 + 蓝焰 #0a84ff 入轨 + cinematic 火箭发射 + mono spec |
| Virgin Galactic | 商业亚轨道航天 | 🔴 待建 | 紫红 #ff0046 + 暗紫 + cinematic 太空舱 + serif 大写 + 询价式预订 |
| Boom Supersonic | 超声速客机 | 🔴 待建 | 银白渐变 + 蓝绿 #1f6b8c + 流线型 + cinematic 飞行 spec（2.2 马赫）+ 极宽留白 |

> **状态说明**：v1.7 阶段仅建索引（**3 个品牌名 + 风格摘要**），具体 `*-DESIGN.md` 详细规范待 v1.8+ 按需沉淀。**优先级**：SpaceX（与 consumer-lifestyle 重复，可合并）/ Virgin Galactic（ps-3 候选）/ Boom Supersonic（P3）。
>
> **与 consumer-lifestyle/spacex 重复的解决**：consumer-lifestyle/spacex 已存在（按"主流消费品牌"分类）。本目录的 SpaceX 按"商业航天 / engineering-grade photography"分类，是同一品牌的不同视角。可选合并。

---

## 与其他行业目录的边界

| 行业 | 覆盖 | 与 aerospace 的边界 |
|---|---|---|
| `consumer-lifestyle/` | 主流消费品牌（含 SpaceX 早期版本） | aerospace 收口"航天 / 航空"专门品类 |
| `automotive/` | 大众豪华 / 跑车 | 边界不重叠 |
| `luxury/` | 高端时装 / 腕表 / 家电 | 边界不重叠 |

---

## 与 premium-showcase 类别关系

`premium-showcase` 类别的 verification 案例可参考本目录：

- **ps-3 (v1.8 候选)** ← SpaceX + Virgin Galactic（"商业航天 cinematic scroll"主题）
- **ps-4 (v1.8 候选)** ← Boom Supersonic（"超声速飞行"主题）

---

## 通用调性（本目录品牌共性）

| 维度 | 标准 |
|---|---|
| **Photography** | 工程级摄影（火箭发射 / 太空舱内部 / 流线型机翼）· full-bleed · 75-90% viewport |
| **Typography** | Mono 主导（数字 spec：推力 / 速度 / 高度）/ Sans 副（SF Pro Display 类） |
| **CTA 数量** | 1-2 个/全页（"预订" / "看发射"） |
| **Easing** | 慢 · 长 · 1.2s `cubic-bezier(0.16, 1, 0.3, 1)` |
| **Whitespace** | section 间距 120-200px（极宽） |
| **Theme** | 暗色为主（深空友好）/ 部分 light 主题（Boom） |
| **Footer CTA** | 预订 / 询价（mailto 或 waitlist 表单） |
| **Mono 数字** | 推力 / 速度 / 高度 / 质量 · Mono 字体 · 80-120px 流体大数字 |
| **Mission Control 数据** | 实时遥测 / 轨道参数 / 任务时间轴（数据可视化元素） |

---

## 字体标注（v2.12 Task 8.1 · 4 字段）

> 工程级 mono 主导，所有 spec 数据必须用 tabular-nums + Mono 字体确保数字宽度一致：

| 字段 | 推荐值 | 备选 |
|---|---|---|
| **主字体（mono spec）** | JetBrains Mono | SF Mono / GT America Mono / Roboto Mono / IBM Plex Mono |
| **备选字体（display sans）** | Inter Variable | SF Pro Display（macOS/iOS）/ system-ui |
| **CJK fallback** | Noto Sans Mono CJK SC（tabular） | Sarasa Mono SC（更纱黑体 SC Mono）/ 苹方-简 / 思源黑体 |
| **数字 spec 推荐字体** | JetBrains Mono（`font-feature-settings: 'tnum'`） | Berkeley Mono（商业）/ Droid Sans Mono |
| **推荐下载链接** | [JetBrains Mono](https://www.jetbrains.com/lp/mono/) · [Google Fonts: Inter](https://fonts.google.com/specimen/Inter) · [Google Fonts: Noto Sans Mono CJK SC](https://fonts.google.com/noto/specimen/Noto+Sans+Mono) · [Sarasa Mono SC](https://github.com/be5invis/Sarasa-Gothic) | 商业授权备选：GT America Mono（Grilli Type）/ IBM Plex Mono（开源） |

**fontDisplay 策略**：`swap` —— JetBrains Mono Regular ~50KB（含 tnum），swap 即可；CJK Mono 必须 unicode-range subset（ASCII 段直接走 JetBrains Mono，CJK 段走 Sarasa Mono SC），避免整字库 30MB+ 加载。

---

## 关联

- 上一级目录：[`../INDEX.md`](../INDEX.md)（brand-library 总索引）
- 上一级分类：[`../../premium-showcase/README.md`](../../premium-showcase/README.md)（premium-showcase 类别 MVI）
- 上一级方法论：[`../../methodology/animation-matrix.md`](../../methodology/animation-matrix.md)（跨类别动画曲线）
