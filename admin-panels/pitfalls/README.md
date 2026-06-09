---
name: admin-panels-pitfalls
description: Admin panels pitfalls catalog (≥ 2 v2.11 同步 · 字体真实化 + 装饰性 a11y). Covers data table, filter form, action menu, detail drawer, bulk action bar, form fields.
keywords: admin, dashboard, data-table, filter, a11y, perf, v2.11
---

# Admin Panels · Pitfalls (v2.11 同步新增)

> **v2.12 同步** · 本目录是 admin-panels 类别 v2.12 新建的 pitfalls 文件（之前没有）。包含 v2.11 同步 ≥ 2 条新条目，与 dashboards / saas-marketing / 等其他 7 类 pitfall 文档对齐。后续 8 类别 pitfall 维护总入口见 [`../../references/INDEX.md`](../../references/INDEX.md)（v2.12 Task 8.5 新建 INDEX.md）。

---

## v2.11 同步新增（2 条 · 字体 + 装饰性 a11y）

### A-1. 4-1-linear-vue 字体 `@latest` 引用导致 build 后 404（v2.11 B 方案前置）
**问题**：4-1-linear-vue（Linear Vue 中后台）用 `<link href="https://fonts.googleapis.com/css2?family=Inter@latest">` 后，build 后字体 src 404，浏览器回退到 system-ui（San Francisco / Roboto），Linear 暗色 IDE 美学的中后台 typography 失真。

**原因**：`@latest` 不是 Google Fonts 合法语法，开发脚手架或注释残留。

**修复**：
- 显式字重：`family=Inter:wght@400;500;600;700&display=swap`
- 用 `scripts/download-fonts.sh`（v2.12 新增）批量下载到 `public/fonts/`
- Linear 原始用 Inter Display + Inter Text + Inter Mono 三层（开源替代 Inter Variable）
- 必读 [`../../scripts/download-fonts.sh`](../../scripts/download-fonts.sh)

### A-2. 4-1-linear-vue 装饰性 logo / icon 缺 `alt="decorative"` 触发 e2e H-3 alt 警告（v2.11 同步）
**问题**：4-1-linear-vue 的侧边栏 logo / 顶部栏品牌图 / 装饰性 icon 都是装饰性 SVG，未标 `alt="decorative"`，e2e a11y H-3 alt 0 检查输出 warn。

**原因**：admin-panels 类别装饰性 SVG 集中在侧边栏（导航图标 + 品牌 logo + 装饰性 placeholder），开发时按"信息性 alt"处理。

**修复**：
- 装饰性 logo：``<img src="logo.svg" alt="decorative" aria-hidden="true" width="0" height="0" style="display:none">`（1x1 透明 size=0）
- 装饰性 nav icon：`<svg aria-hidden="true" focusable="false">`（inline SVG，屏幕阅读器自动跳过）
- 信息性 app icon：`<img src="app-icon.png" alt="设置应用">`（必须 alt 不为空）
- v2.11 后：4-1-linear-vue 0 warn · 总 19 → 8
- 必读 [`../component-contract/README.md` § 装饰性 a11y](../component-contract/README.md)

---

## 后续扩展（v2.12+ 路线）

- [ ] data-table pitfalls（10 条 · 排序 / 过滤 / 分页 / 行选择）
- [ ] filter-form pitfalls（8 条 · 受控 / 联动 / 验证 / 重置）
- [ ] action-menu pitfalls（6 条 · 权限 / 快捷键 / 嵌套）
- [ ] detail-drawer pitfalls（5 条 · 焦点陷阱 / 关闭按钮 / 滚动锁定）
- [ ] bulk-action-bar pitfalls（4 条 · 选择上限 / 二次确认 / 撤销）
- [ ] form-field pitfalls（6 条 · 验证时机 / 错误信息 / autocomplete）
- [ ] form-section pitfalls（3 条 · 折叠 / 默认值 / 保存策略）
- [ ] permission-ux pitfalls（4 条 · 隐藏 vs 禁用 / 错误提示 / 角色切换）

> 上述扩展对应每个 component-contract 的"反模式"章节 · v2.12+ 按需沉淀。

---

## Reference

- [`../../dashboards/pitfalls/README.md`](../../dashboards/pitfalls/README.md) — Dashboard 25 条 pitfall（最早建仓的 pitfall 文档）
- [`../../saas-marketing/pitfalls/README.md`](../../saas-marketing/pitfalls/README.md) — SaaS Marketing 12 + 2 v2.11 条
- [`../../mobile-web/pitfalls/README.md`](../../mobile-web/pitfalls/README.md) — Mobile Web 10 + 2 v2.11 条
- [`../../native-app/pitfalls/README.md`](../../native-app/pitfalls/README.md) — Native App 10 + 2 v2.11 条
- [`../../landing-pages/pitfalls/README.md`](../../landing-pages/pitfalls/README.md) — Landing Pages 8 + 2 v2.11 条
- [`../../ai-products/pitfalls/README.md`](../../ai-products/pitfalls/README.md) — AI Products 10 + 3 v2.11 条
- [`../../premium-showcase/pitfalls/README.md`](../../premium-showcase/pitfalls/README.md) — Premium Showcase 10 + 2 v2.11 条
- [`../../scripts/download-fonts.sh`](../../scripts/download-fonts.sh) — v2.12 新增字体批量下载脚本
- [`../../scripts/perf-runtime-check.sh`](../../scripts/perf-runtime-check.sh) — v2.11 实质 P 验证脚本