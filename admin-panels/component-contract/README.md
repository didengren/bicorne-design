---
name: component-contract
description: Component-level contract for the 8 core admin-panel components. Bridges token.json to Vue 3 / React code, with token bindings, props, pitfalls, and copy-paste templates.
keywords: component, contract, datatable, filterform, formfield, formsection, actionmenu, detaildrawer, bulkactionbar, permissionux
---

# Component Contract — Admin Panel Core Components

> 本目录桥接 **token.json**（L2 框架无关）到 **生产代码**（L3 Vue 3 / React）。每个组件文件定义：
>
> 1. **Mandatory tokens** — 该组件依赖的 `token.json` 路径
> 2. **Recommended props** — 名称、类型、默认值、意图
> 3. **CSS utility binding** — 推荐的工具类组合（按项目 token 桥接器）
> 4. **Common pitfalls** — AI 容易写错的地方
> 5. **Minimal Vue 3 `<script setup>` template** — 可直接复制
> 6. **Acceptance check** — 验收清单

## 与 dashboards/component-contract 的边界

| 维度 | dashboards/ | admin-panels/ |
|---|---|---|
| 数据形态 | 只读可视化（panel 内 metric / sparkline / map） | CRUD 密集（行级 / 表单 / 抽屉） |
| 表格 | **嵌入** PanelShell 的紧凑型 | **全页** 表格（排序/分页/选中/虚拟滚动） |
| 交互密度 | hover 为主 | click / select / edit / bulk 为主 |
| 状态数 | 6 个仪表盘状态 | 4 个表单态（idle/editing/validating/saving） + 7 个异步态 |
| 错误处理 | 容错（数据缺失不报错） | 显式（form validation / API error） |

## Index

| # | Component | File | When to use |
|---|-----------|------|-------------|
| 1 | `DataTable` | [data-table.md](data-table.md) | 全页 CRUD 表格，列表/排序/分页/选中/虚拟滚动 |
| 2 | `FilterForm` | [filter-form.md](filter-form.md) | 搜索筛选区（行内 inline / 抽屉 drawer 两种形态） |
| 3 | `FormField` | [form-field.md](form-field.md) | 单个表单控件封装（input/select/date 统一协议） |
| 4 | `FormSection` | [form-section.md](form-section.md) | 表单分组（折叠 / 标签页 / 分步向导 3 形态） |
| 5 | `ActionMenu` | [action-menu.md](action-menu.md) | 行级操作（dropdown）/ 批量操作入口 |
| 6 | `DetailDrawer` | [detail-drawer.md](detail-drawer.md) | 侧滑详情（右侧 480-560px 宽） |
| 7 | `BulkActionBar` | [bulk-action-bar.md](bulk-action-bar.md) | 选中行后浮出工具栏（sticky bottom） |
| 8 | `PermissionUx` | [permission-ux.md](permission-ux.md) | 角色/权限的 UI 表现（禁用/隐藏/只读/提示） |

## Usage order

当 host skill 被要求构建 admin panel：

1. 读 `token.json` + `design-spec.md`（确定 surface/ink/semantic 等 token 路径）
2. 按页面布局读 `component-contract/*.md`（如列表页 → data-table + filter-form + action-menu + bulk-action-bar）
3. 复制 minimal template 到 `src/components/admin/`
4. 用 `useMockData` / `useMockPagination` 接 mock 数据
5. 跑 `pnpm validate:admin-panels` 验收（0 NaN / 0 v-if+v-for / cosine-fee 覆盖 ≥ 80% / mock 引用 100%）

## Non-goals

- **不是组件库** — 只是参考契约，不发布 npm 包
- **不强制设计系统** — 宿主项目可偏离，但需在 README 说明原因
- **不锁死框架** — Vue 3 模板为主，React 等价物可加
