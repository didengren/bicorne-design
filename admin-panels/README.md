---
name: admin-panels
description: Admin panel category workspace — data tables, forms, filters, detail drawers, bulk actions, CRUD-heavy workflows, role-based UI, keyboard shortcuts.
keywords: admin, console, management, crud, datatable, form
---

# Admin Panels — Category Workspace

> 本目录是 **Admin Panel 类别专题**：所有 PC 端中后台 / 控制台 / 商家后台 / 后台管理系统的组件、布局、反模式、参考实现。
>
> 与 `dashboards/` 互补：dashboard 是**只读可视化**，admin 是**CRUD 密集**。

---

## 何时进入本目录

| 信号 | 必读路径 |
|---|---|
| 用户说"做一个管理后台 / 控制台 / 商家后台" | 本目录 `meta-prompt.md` → 必读清单 |
| 强调表格、表单、批量操作 | `component-contract/data-table.md` + `form-field.md` |
| 多页面 + 路由 + 菜单 | `layouts/A1-list-detail.md` / `A2-master-detail.md` |
| 涉及角色/权限 UI 表现 | （待建设 permission-ux.md） |
| 跑通完整参考 | `verification/4-1-linear-vue/` |

---

## 通用方法论（跨类别）

> 通用层方法论与本类别的关系（dashboard 已迁移，admin-panels 暂未建独立文档时直接复用）：

| 主题 | 通用层文件 | 本类别文件 |
|---|---|---|
| 动画（跨平台差异） | [`../references/methodology/animation-cross-platform.md`](../references/methodology/animation-cross-platform.md) | （待建设） |
| 性能（跨类别预算） | [`../references/methodology/performance-budget.md`](../references/methodology/performance-budget.md) | （待建设） |
| 📚 方法论总索引 | [`../references/methodology/INDEX.md`](../references/methodology/INDEX.md) | — |

---

## 与 `dashboards/` 的边界

| 维度 | Dashboard（只读） | Admin Panel（CRUD） |
|---|---|---|
| 核心动作 | 浏览/观察 | **写/编辑/删除/审批** |
| 主组件 | Metric / Sparkline / Map | **DataTable / Form / Filter / ActionMenu** |
| 主页面 | 单页沉浸 | **列表 + 详情 + 表单 + 设置** 多页面 |
| 信息密度 | 极高 | 中高 |
| 关键交互 | hover/auto-refresh | **双击/批量/键盘快捷键** |
| 必含方法论 | 动画/排版/6 状态 | **+ 表格/表单/路由/权限** |
| 设备尺寸 | 1920+ 起 | 1280 起即可 |

**重叠 60-70%**（共享 PanelShell/Token 桥/排版/状态/性能）。差异 30% 是 admin 关键能力：

| 能力 | dashboards | admin-panels |
|---|---|---|
| DataTable（虚拟滚动/固定列/排序/筛选/批量） | ❌ | ✅ |
| FormField（验证/错误汇总/必填/禁用） | ❌ | ✅ |
| FilterForm（多条件/组合/URL 同步） | ❌ | ✅ |
| ActionMenu / BulkActionBar | ❌ | ✅ |
| DetailDrawer（侧滑详情） | ❌ | ✅ |
| 路由/菜单/面包屑 | ❌ | ✅ |
| 权限/角色 UI 表现 | ❌ | ✅ |
| 键盘快捷键 | ❌ | ✅ |

---

## 目录结构（MVI 目标态）

```
admin-panels/
├── README.md                       ← 你在这里
├── meta-prompt.md                  ← PHASE 4 前预检清单
│
├── # 组件层（admin 专属）
├── component-contract/
│   ├── README.md
│   ├── data-table.md               ★ 表格规范（密度/列宽/虚拟滚动/排序/批量）
│   ├── filter-form.md              ★ 多条件筛选（URL 同步/保存预设）
│   ├── form-field.md               ★ 表单字段（验证/错误展示/必填标记）
│   ├── form-section.md             ★ 表单分组（标题/描述/折叠/权限）
│   ├── action-menu.md              ★ 行操作菜单（悬停显示/键盘可达）
│   ├── detail-drawer.md            ★ 侧滑详情（宽度/动画/嵌套关闭）
│   ├── bulk-action-bar.md          ★ 批量操作栏（固定底栏/计数/确认）
│   ├── panel-shell.md              （从 dashboards 上提为共享）
│   └── permission-ux.md            ★ 角色/权限 UI 表现（禁用/隐藏/遮罩）
│
├── # 布局层（admin 专属）
├── layouts/
│   ├── README.md
│   ├── A1-list-detail.md           列表 + 详情侧栏
│   ├── A2-master-detail.md         左右分栏（master-detail）
│   ├── A3-form-wizard.md           多步表单向导
│   ├── A4-settings-tabs.md         设置页（左侧导航 + 右侧表单）
│   ├── A5-dashboard-plus-table.md  上 dashboard 下表格（混合）
│   └── A6-topbar-sidebar.md        顶栏 + 侧栏（最经典 admin 布局）
│
├── # 经验层
├── pitfalls/                       ★ admin 专属反模式（待建设）
│   └── README.md
├── typography.md                   （复用 dashboards 60%，加 "表格字号档"）
├── ui-states.md                    （复用 dashboards 100%，6 状态普适）
├── performance.md                  （复用 dashboards 80%，PC 预算更宽）
│
├── # 工具层
├── tailwind-bridge/                （复用 dashboards 100%）
│
└── # 验证层
    └── verification/
        └── 4-1-linear-vue/         ★ Linear 风格后台（已有）
```

---

## 首选品牌参考（决策时用）

| 品牌 | 适用子类型 | 风格 |
|---|---|---|
| Linear | 高密度后台 | 极简/快捷键/暗色为主 |
| Vercel | DevOps 后台 | 渐变/对比/明亮 |
| Notion | 内容协作 | 极简/留白/亲和 |
| Intercom | 客户运营 | 圆角/温暖/对话感 |
| Airtable | 数据表格 | 表格优先/列可调 |
| ClickHouse Cloud | 数据查询 | 暗色/技术感 |
| Cal | 预约排程 | 卡片化/明亮 |
| Stripe | 商家后台 | 强色彩/极致细节 |
| Supabase | 数据库后台 | 暗色/dev 友好 |
| Sentry | 监控后台 | 暗色/技术感 |
| Resend | 邮件营销 | 极简/留白 |
| Posthog | 产品分析 | 混合/可读性 |

---

## 与通用层的关系

| 内容 | 归属 |
|---|---|
| Token 字段定义 | `../schema/design-token.schema.json` |
| 品牌参考 | `../references/brand-library/`（31 个品牌可选） |
| 五阶段方法论 | `../references/methodology/design-methodology.md` |
| 通用动画原则 | `../references/methodology/animation-best-practices.md` |
| 通用空/加载状态 | `../references/methodology/ui-states.md` |
| Tailwind 通用桥 | `../tailwind-bridge/` |

---

## 建设优先级（MVI → 完整）

| 任务 | 优先级 | 预估 |
|---|---|---|
| ✅ 占位 README | P0 | done |
| ✅ 迁入 `verification/4-1-linear-vue/` | P0 | done |
| `meta-prompt.md`（PHASE 4 预检） | P1 | 0.5d |
| `component-contract/data-table.md` | P1 | 1d |
| `component-contract/form-field.md` | P1 | 1d |
| `component-contract/filter-form.md` | P1 | 0.5d |
| `component-contract/action-menu.md` | P1 | 0.5d |
| `component-contract/detail-drawer.md` | P1 | 0.5d |
| `component-contract/permission-ux.md` | P2 | 0.5d |
| `layouts/A1-A6` × 6 | P1 | 3d |
| `pitfalls/` 10-15 条 | P1 | 1d |
| `typography.md`（表格字号档） | P2 | 0.5d |
| `performance.md`（PC 预算） | P2 | 0.5d |
| 第 2 个 verification（如 Vercel 风格） | P2 | 2d |
