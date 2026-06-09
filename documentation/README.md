---
name: documentation
description: Documentation site category workspace — sidebar navigation, code blocks, API reference tables, tutorials, full-text search, dark mode, copy-to-clipboard. For DevTools / API / product docs.
keywords: docs, documentation, sidebar, code-block, api-reference, search
---

# Documentation — Category Workspace

> 本目录是 **Documentation 类别专题**：API 文档、SDK 文档、产品文档、教程、Changelog。
>
> **关键区分**：与 `saas-marketing/` 互补——marketing 是讲故事+转化，docs 是查信息+解决具体问题。设计模式高度结构化（侧边导航+内容区+TOC+搜索）。

---

## 何时进入本目录

| 信号 | 必读路径 |
|---|---|
| 用户说"做一个文档站 / API 文档 / 帮助中心" | 本目录 |
| 强调侧边导航+代码块+API 参考 | `component-contract/sidebar-nav.md` + `code-block.md` + `api-param-table.md` |
| 多版本（v1/v2/最新） | `meta-prompt.md` 版本管理清单 |
| 全文搜索（Algolia DocSearch / 自建） | （待建设） |
| 已确定做 docs | 决策是否复用 marketing 头部+页脚 |

**反例**（不要进本目录）：
- 公司主页 → `saas-marketing/`
- 教程化内容运营 → `content-publishing/`（如果只做内容）
- 商家后台管理 → `admin-panels/`

---

## 与 `saas-marketing/` 的边界

| 维度 | SaaS Marketing | Documentation |
|---|---|---|
| 目的 | 讲故事+转化 | **查信息+解决问题** |
| 导航 | 顶部水平 + 5-7 入口 | **左侧树形（多层级）** |
| 主内容 | Hero/Features/CTA | **文字+代码块+表格** |
| 搜索 | SEO 站内 | **全文 + 语义（API/方法名）** |
| 性能 | Lighthouse 90 | **首屏快 + 跳转即显** |
| 字体 | 标题大字 | **正文阅读优化**（行高 1.6-1.75） |
| 代码 | 偶尔 demo | **代码块是核心**（语言标签/复制/行号/差异） |

**互补关系**：docs 通常与 marketing 共享 design token + 顶部 logo + 页脚，但侧边导航独立。

---

## 目录结构（MVI 目标态）

```
documentation/
├── README.md                       ← 你在这里
├── meta-prompt.md                  ← PHASE 4 预检 + 版本管理清单
│
├── # 组件层（docs 核心）
├── component-contract/
│   ├── README.md
│   ├── sidebar-nav.md             ★ 左侧导航（树形/折叠/分组/活动高亮/粘性）
│   ├── toc-anchor.md              ★ 右侧目录（自动生成/锚点跳转/滚动高亮）
│   ├── code-block.md              ★ 代码块（语言标签/复制/行号/高亮/差异/全屏）
│   ├── inline-code.md             ★ 行内代码（字体+背景+圆角）
│   ├── callout.md                 ★ 提示 callout（info/warn/danger/tip/4 色）
│   ├── api-param-table.md         ★ API 参数表（参数+类型+必填+默认+描述）
│   ├── api-response-block.md      ★ API 响应块（JSON 高亮+折叠+复制）
│   ├── method-signature.md        ★ 方法签名（参数+返回+泛型+示例）
│   ├── prev-next-nav.md           ★ 上一篇/下一篇（页底导航）
│   ├── breadcrumb.md              ★ 面包屑（多层级）
│   ├── search-modal.md            ★ 全文搜索（Cmd+K 弹窗/键盘导航/语义）
│   ├── feedback-widget.md         ★ 页面反馈（"本页有用吗"）
│   ├── edit-link.md               ★ "在 GitHub 编辑" 链接
│   ├── version-switcher.md        ★ 版本切换器（v1/v2/最新）
│   └── lang-switcher.md           ★ 语言切换器（i18n）
│
├── # 布局层
├── layouts/
│   ├── README.md
│   ├── D1-three-column.md         ★★★ 经典 docs 布局：左目录+主内容+右 TOC
│   ├── D2-tutorial.md             教程（步骤化+任务清单+下一步）
│   ├── D3-reference.md            API 参考（侧边按模块分组+方法签名+示例）
│   ├── D4-concepts.md             概念/原理（长文+插图+章节）
│   ├── D5-changelog.md            更新日志（时间线+标签+搜索）
│   └── D6-faq.md                  FAQ（搜索友好+分类+折叠）
│
├── # 经验层
├── pitfalls/                       ★ docs 专属反模式
│   └── README.md
├── typography.md                   ★ 阅读优先（行高 1.6-1.75 / 字号 16-17 / 段间距）
├── ui-states.md                    （6 状态普适 + 7 状态：搜索无结果/版本已弃用）
├── performance.md                  ★ 跳转即显（路由级预取 + 字体子集 + 代码高亮按需）
│
└── # 验证层
    └── verification/
        └── 4-2-mintlify-style/    ★ 待建设：Mintlify 风格参考实现
```

---

## 首选品牌参考

| 品牌 | 子类型 | 风格 |
|---|---|---|
| Mintlify | 现代 API docs | 极简/明亮/品牌色淡 |
| Notion | 通用 docs | 极简/留白/亲和 |
| Stripe Docs | API 优先 | 极致细节/代码示例丰富 |
| Algolia DocSearch | 搜索驱动 | 搜索框突出/暗色 |
| Vue.js Docs | 框架文档 | 暗色+主色品牌 |
| Tailwind Docs | 实用类 | 极简/代码沙盒 |
| MDN Web Docs | 开放标准 | 内容优先/工具栏 |
| Linear Docs | 工具文档 | 极简/快捷键/暗色 |
| Vercel Docs | 部署文档 | 极简/明亮/快速跳转 |
| GitHub Docs | 通用 | 内容为主+侧边导航 |

---

## Docs 设计核心原则（不同于 marketing）

1. **信息密度优先**：长文阅读，侧边提供锚点导航，正文行高 1.6-1.75
2. **代码块是核心**：语言标签、复制按钮、行号高亮、差异展示、TypeScript 类型提示
3. **可被搜索**：所有内容都应可被 Ctrl/Cmd+K 检索
4. **可被链接**：每个章节都有稳定的锚点 URL（SEO 友好）
5. **可被复制**：代码示例必须一键复制
6. **可被评论/反馈**：每页有"这篇有用吗？"反馈
7. **可版本管理**：旧版本可访问，不被悄悄删除
8. **可被国际化**：i18n 友好，URL 路径含语言

---

## 建设优先级

| 任务 | 优先级 | 预估 |
|---|---|---|
| ✅ 占位 README | P0 | done |
| `meta-prompt.md` | P1 | 0.5d |
| `component-contract/sidebar-nav.md` | P1 | 1d |
| `component-contract/code-block.md` | P1 | 1d |
| `component-contract/api-param-table.md` | P1 | 0.5d |
| `component-contract/toc-anchor.md` | P1 | 0.5d |
| `component-contract/callout.md` | P2 | 0.5d |
| `component-contract/method-signature.md` | P2 | 0.5d |
| `component-contract/api-response-block.md` | P2 | 0.5d |
| `component-contract/search-modal.md` | P2 | 1d |
| `component-contract/prev-next-nav.md` | P2 | 0.5d |
| `component-contract/breadcrumb.md` | P2 | 0.5d |
| `component-contract/feedback-widget.md` | P2 | 0.5d |
| `component-contract/version-switcher.md` | P2 | 0.5d |
| `layouts/D1-D6` × 6 | P1 | 6d |
| `typography.md`（阅读优先） | P1 | 0.5d |
| `performance.md`（跳转即显） | P1 | 0.5d |
| `pitfalls/` 10-15 条 | P1 | 1d |
| 第 1 个 verification（Mintlify 风格） | P1 | 2d |
