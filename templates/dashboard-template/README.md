---
name: bicorne-dashboard-template
description: Dashboard / data ops template · Vue 3 + Vite + Tailwind · F5 fullscreen · 5-panel L1 three-column layout · cloned from verification/4-3-dashboard-command-center
keywords: template, dashboard, command-center, vue, tailwind, vite
---

# bicorne-dashboard-template

> 数据大屏 / 监控指挥中心 / F5 全屏 O&M 控制台开箱即用模板。
> 源项目：`dashboards/verification/4-3-dashboard-command-center`（v2.11 B 方案 · 18 分 P）。

---

## 适用场景

- 数据大屏 / 监控 / 运营指挥中心
- F5 全屏 O&M 控制台（如天河福佳风格）
- KPI 仪表盘 + 地图可视化 + 滚动新闻条
- 多面板 + 多数据流 + 实时刷新场景

---

## 快速开始

```bash
cd templates/dashboard-template
pnpm install
pnpm dev      # → http://localhost:5173
pnpm build    # → dist/ （含 fonts/ + preload）
pnpm preview  # → http://localhost:4173
```

---

## 包含的组件

| 组件 | 文件 | 来源契约 |
|------|------|----------|
| PanelShell | `src/components/dashboard/PanelShell.vue` | [dashboards/component-contract/panel.md](../../dashboards/component-contract/panel.md) |
| MetricNumber | `src/components/dashboard/MetricNumber.vue` | [dashboards/component-contract/metric-number.md](../../dashboards/component-contract/metric-number.md) |
| Sparkline | `src/components/dashboard/Sparkline.vue` | [dashboards/component-contract/sparkline.md](../../dashboards/component-contract/sparkline.md) |
| CornerFrame | `src/components/dashboard/CornerFrame.vue` | [dashboards/component-contract/corner-frame.md](../../dashboards/component-contract/corner-frame.md) |

> **页面级 L1 三栏布局**（`src/pages/dashboard.vue`）来自 [dashboards/layouts/l1-three-column.md](../../dashboards/layouts/l1-three-column.md)

---

## 资源清单

| 资源 | 路径 | 来源 |
|------|------|------|
| Inter Variable woff2 | `public/fonts/inter-var.woff2` | v2.11 B 方案下载（rsms.me） |
| JetBrains Mono Regular woff2 | `public/fonts/jetbrains-mono.woff2` | v2.11 B 方案下载（JetBrains 官方） |
| 设计 token | `token.json` | 基于 `dashboard-dark.template.json` 骨架 |
| Tailwind 配置 | `tailwind.config.ts` | 手写 + 命名空间 `dash-` |

---

## 已验证项

| 验证 | 结果 | 验证脚本 |
|------|------|----------|
| `pnpm build` | ✅ 成功 | `dist/index.html` + `dist/fonts/` 齐全 |
| perf-runtime-check | ✅ 5/5 模式 100% 实质 P | [scripts/perf-runtime-check.sh](../../scripts/perf-runtime-check.sh) |
| a11y H-3 alt | ✅ 通过 | 装饰性 SVG 加 `alt="decorative"` |
| e2e 8 节 A-H | ✅ 通过 | [scripts/e2e-validate.sh](../../scripts/e2e-validate.sh) |

---

## 关键动画（10 类）

`dash-fade-up` / `dash-count-up` / `dash-draw` / `dash-pulse` / `dash-ripple` /
`dash-scan` / `dash-aurora` / `dash-shimmer` / `dash-ticker` / `dash-blink`

完整定义见 [dashboards/animation-matrix.md](../../dashboards/animation-matrix.md)。

---

## 自定义指南

1. 替换 `token.json` → 自己的品牌色 / 字号 / 间距
2. 替换 `src/mock/dashboard.ts` → 自己的 KPI / 图表 / 地图数据
3. 调整 `src/pages/dashboard.vue` → 面板布局（参考 dashboards/layouts/）
4. `pnpm build` → 验证 `dist/fonts/` 资源齐全

---

## 维护

- **来源**：bicorne-design v2.12 Task 9 · SubTask 9.1
- **关联**：[templates/README.md](../README.md) · [v2-12-roadmap-execution/tasks.md](../../.trae/specs/v2-12-roadmap-execution/tasks.md)
- **备份**：实施前已创建 `.trae/skills/bicorne-design.bak.v2.11`（Task 12.4）