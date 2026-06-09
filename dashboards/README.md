---
name: dashboards
description: Dashboard category workspace — conventions, components, layouts, anti-patterns, and verification projects for data-dense fullscreen command centers.
keywords: dashboard, command-center, monitoring, data-viz, anti-pattern
---

# Dashboards — Category Workspace

> 本目录是 **Dashboard 类别专题**：所有数据大屏 / 驾驶舱 / 监控屏相关的约束、组件、布局、反模式、参考实现都归入此处。
> 通用层（schema / brand-library / methodology / token-mapping）保持类别无关。

---

## 何时进入本目录

| 信号 | 必读路径 |
|---|---|
| 用户说"做一个数据大屏 / 驾驶舱 / 监控屏" | 先看 `SKILL.md` Scenario Routing → Data dashboard 分支 |
| 已确定做 dashboard，进入 PHASE 4 实现 | 本目录 `meta-prompt.md` → 必读清单 |
| 选布局 | `layouts/README.md`（L1-L8 八种原型） |
| 选组件 | `component-contract/README.md`（8 个核心组件） |
| 调动画 | `animation-matrix.md` |
| 踩到坑 | `pitfalls/README.md`（25 个反模式） |
| 排版 / 状态 / 性能 | `typography.md` / `ui-states.md` / `performance.md` |
| 跑通完整参考 | `verification/4-3-dashboard-command-center/` |

---

## 通用方法论（跨类别）

> 本类别的动画/性能规范与通用层方法论的关系：

| 主题 | 通用层文件 | 本类别文件 |
|---|---|---|
| 动画（跨平台差异） | [`../references/methodology/animation-cross-platform.md`](../references/methodology/animation-cross-platform.md) | [`animation-matrix.md`](./animation-matrix.md)（场景→动画映射） |
| 性能（跨类别预算） | [`../references/methodology/performance-budget.md`](../references/methodology/performance-budget.md) | [`performance.md`](./performance.md)（60fps 持续帧规则） |
| 📚 方法论总索引 | [`../references/methodology/INDEX.md`](../references/methodology/INDEX.md) | — |

---

## 目录结构

```
dashboards/
├── README.md                       ← 你在这里
├── meta-prompt.md                  ← PHASE 4 前预检清单
│
├── # 组件层
├── component-contract/             ← 8 个核心组件契约
│   ├── README.md
│   ├── panel.md
│   ├── corner-frame.md
│   ├── metric-number.md
│   ├── sparkline.md
│   ├── map-panel.md
│   ├── gauge.md
│   ├── ring-progress.md
│   ├── ticker.md
│   └── data-table.md
│
├── # 布局层
├── layouts/                        ← L1-L8 八种大屏布局原型
│   ├── README.md
│   ├── l1-three-column.md
│   ├── l2-map-dominant.md
│   ├── l3-kpi-wall.md
│   ├── l4-detail-focus.md
│   ├── l5-tab-switch.md
│   ├── l6-header-heavy.md
│   ├── l7-two-row.md
│   └── l8-centered-stage.md
│
├── # 可视化层
├── data-viz/                       ← 6 种数据可视化模式
│   ├── README.md
│   ├── bar-chart.md
│   ├── donut.md
│   ├── funnel.md
│   ├── heatmap.md
│   └── mini-map.md
│
├── # 经验层
├── pitfalls/                       ← 25 个反模式
│   └── README.md
├── animation-matrix.md             ← 场景→动画曲线/时长映射
├── typography.md                   ← dashboard 排版规则
├── ui-states.md                    ← dashboard 6 种 UI 状态
├── performance.md                  ← 60fps 性能预算
│
├── # 工具层
├── tailwind-bridge/                ← token.json → tailwind.config.ts 自动桥
│   ├── README.md
│   ├── generate.mjs
│   ├── merge-with-existing.mjs
│   ├── schema-binding.mjs
│   └── __test__/
│
└── # 验证层
    └── verification/
        └── 4-3-dashboard-command-center/  (本类别旗舰)
```

> 注：4-1-linear-vue 已迁出至 `../admin-panels/verification/`（admin 类别旗舰）；4-2-stripe-landing 已迁出至 `../saas-marketing/verification/`（SMM 类别旗舰）。当前 dashboards/ 仅保留 dashboard 专属 4-3。

---

## 与通用层（`../`）的边界

| 内容 | 归属 |
|---|---|
| Design Token 字段定义 | `../schema/design-token.schema.json` |
| 品牌参考（60 品牌） | `../references/brand-library/` |
| 五阶段方法论 | `../references/methodology/design-methodology.md` |
| 通用动画原则 | `../references/methodology/animation-best-practices.md` |
| **Dashboard 场景→动画映射** | `animation-matrix.md`（本目录） |
| 通用 Empty / Loading 状态 | `../references/methodology/ui-states.md` |
| **Dashboard 6 状态** | `ui-states.md`（本目录） |
| 通用排版 | （待建设） |
| **Dashboard 排版** | `typography.md`（本目录） |
| Tailwind 通用桥 | `../tailwind-bridge/`（如本目录未覆盖，可上提） |
| **Dashboard dash-* 桥** | `tailwind-bridge/`（本目录） |

---

## 不在本目录的内容

- 通用层（schema / references / templates / scripts）保持原位，不下沉
- 跨类别的方法论（如 anti-blur / anti-slop）保留在 `../references/methodology/`
- 其他类别专题（landing-pages / mobile-web / native-app）作为同级占位目录，独立演进
