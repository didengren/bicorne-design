---
name: nav-footer
description: Cross-category nav + footer pair — top navigation and footer that must be visually and behaviorally consistent across every page. Applies to all multi-page web categories (saas-marketing, ecommerce, documentation, auth-flows, admin-panels, dashboards public pages).
---

# `nav-footer` — Top Nav + Footer (跨页面一致性)

> 跨页面一致性是 multi-page site 的**最大 UX 资产**。用户从任何一页到任何一页的体验**必须无缝**。
>
> **本文件已从 `saas-marketing/component-contract/nav-footer.md` 抽出为跨类别通用版**。SaaS-specific 扩展（mega menu 详细 / pre-footer CTA / 4-5 列 footer）保留在原位 stub。
> **类别化定制**详见末尾"按类别适配"小节。

---

## 1. 何时用 / 何时不用

✅ **用**：任何 ≥ 2 页的多页站点 / 任何有跨页面导航的 SPA / 任何有跨页面一致 Footer 的站
❌ **不用**：单页 landing page（无跨页面概念）/ 独立原生应用 / 嵌入式 H5

---

## 2. Mandatory tokens

| Token path | 用途 |
|---|---|
| `colors.surface.elevated` | Nav 背景（`sticky` 状态） |
| `colors.border.subtle` | Nav 底边 / 分隔线 / Footer 顶边 |
| `typography.size.body` | 链接文字 14-15px |
| `typography.size.body-sm` | 移动端链接 13-14px |
| `colors.text.default` | 默认文字 |
| `colors.text.muted` | 二级文字 / 页脚标签 / legal |
| `colors.accent.{blue,green,violet}` | 当前页高亮 / Logo hover |
| `spacing.4` `spacing.6` | Nav 内边距（桌面 16/24 / 移动 12/16） |
| `radii.lg` | 移动端汉堡按钮圆角 |
| `motion.duration.fast` | 链接 hover 100-150ms |

---

## 3. Top Nav 通用规范

### 3.1 结构

```
<header sticky top-0 z-50>
  ├─ Logo (left, h-8 mobile, h-9 desktop)
  ├─ Primary nav links (centered or left-aligned after logo)
  │   ├─ Product / Products / Modules (mega menu, hover opens) [可选]
  │   ├─ Solutions / Use cases (mega menu, hover opens) [可选]
  │   ├─ Pricing (direct link)
  │   ├─ Customers / Customers stories (direct link)
  │   ├─ Blog / Resources (direct link)
  │   ├─ Docs (direct or external icon ↗)
  │   └─ Changelog (direct, devtool 站点) [可选]
  ├─ Secondary actions (right)
  │   ├─ Sign in / Log in (text link)
  │   ├─ Language switcher [可选]
  │   ├─ Theme switcher (light/dark) [可选]
  │   └─ [Primary CTA] (primary button)
  └─ Mobile: hamburger (replaces all)
```

### 3.2 行为

- **Sticky** + **translucent blur** on scroll（`backdrop-blur-md bg-{surface}/80`）
- **Active page** highlight: 颜色 + 下划线（`border-b-2 border-accent`）
- **Mega menu** (如有): hover 触发，pointer leave 后 200ms 关闭（不立即关闭，让用户移鼠标到菜单）
- **Mobile**: 汉堡按钮 → 全屏 drawer + ESC 关闭
- **Scroll threshold** (e.g. 50px) 切换 nav 高度（compact mode）

### 3.3 高度

| 状态 | Desktop | Mobile |
|---|---|---|
| 默认 | 64-72px | 56-64px |
| Compact (after scroll) | 56-64px (-8px) | 48-56px |
| 移动 drawer 全屏 | — | 100vh |

---

## 4. Footer 通用规范

### 4.1 结构

```
<footer>
  ├─ Pre-footer CTA band (可选)
  │   ├─ 大标题
  │   └─ [Primary CTA] 按钮
  ├─ Link columns (3-5 列, 视类别调整)
  │   ├─ Column 1: Product / Modules
  │   ├─ Column 2: Solutions / Use cases [可选]
  │   ├─ Column 3: Resources / Docs / Blog
  │   ├─ Column 4: Company / About
  │   └─ Column 5: Legal (Privacy / Terms)
  ├─ Bottom bar
  │   ├─ Logo (small)
  │   ├─ Copyright
  │   ├─ Language switcher [可选]
  │   ├─ Theme switcher (light/dark) [可选]
  │   └─ Social icons (Twitter / GitHub / LinkedIn / Discord)
```

### 4.2 行为

- Sticky bottom：永远显示在 page 底部
- Mobile: 列折叠为 2 列或 1 列（accordion 可选）
- Legal 链接 + copyright 永远显示

---

## 5. Pitfalls（跨类别通用）

- ❌ **每页 nav 高亮位置不一致** → 用户迷失
- ❌ **页脚 logo 颜色每页不同** → 视觉割裂
- ❌ **主 CTA 文本/颜色每页变** → 用户怀疑是不同产品
- ❌ **Nav 在 mobile 不全屏 drawer 而用下拉** → 体验割裂
- ❌ **Footer 在某些页面省略** → 信任崩塌
- ❌ **Mega menu hover 离开立即关闭** → 鼠标移不到菜单内容
- ❌ **Active page 高亮不跟随滚动 / SPA 路由切换** → 当前页迷失
- ❌ **Sticky nav 在 mobile 占用太多屏幕** → 内容区被压缩
- ❌ **Footer 列用 `flex-1` 平均分布** → 列宽与内容长度不匹配
- ❌ **Pre-footer CTA band 与 Hero CTA 文案不一致** → 转化率降低

---

## 6. 跨页面一致性 checklist

- [ ] 同一 Logo（SVG id 一致）
- [ ] 同一品牌色 token
- [ ] 同一字体
- [ ] 同一 nav links 顺序
- [ ] 同一主 CTA 文案（推荐 "Get started" 或 "Start free trial"，选定后所有页面不变）
- [ ] 同一主 CTA 颜色
- [ ] 同一 Footer 结构
- [ ] 同一暗色/亮色切换行为
- [ ] 同一语言切换行为
- [ ] 浏览器标题前缀统一（如 "Pricing · Vercel"）
- [ ] Active page 高亮逻辑在 SPA 路由切换时正确
- [ ] Theme 切换在所有页面保持一致（不重置）
- [ ] Mobile drawer 全屏打开而非下拉

---

## 7. Reference implementations

| 品牌 | 特点 |
|---|---|
| Stripe | 极简 mega menu，hover 触发 |
| Vercel | sticky + 滚动时高度变化 |
| Linear | 紧凑、无 mega menu |
| Notion | 顶部 + 底部 CTA 横幅 |
| Resend | 单层 nav + 居中 logo |

---

## 8. 按类别适配

> 通用清单 1-7 节所有多页类别都应执行；本节给出**类别特定补充**。

### 8.1 SaaS Marketing（多页品牌站）

详见 [saas-marketing/component-contract/nav-footer.md](../../saas-marketing/component-contract/nav-footer.md) stub（含 mega menu 详细布局、pre-footer CTA band、4-5 列 footer、Reference implementations 列表）。

### 8.2 Admin Panels（后台）

- 简化版：1-2 列 footer，仅"Help / Docs / Account / Logout" 4 项
- Nav 集成 user avatar + 当前角色（admin / member / viewer）
- 不需要 mega menu
- 不需要 pre-footer CTA
- 详情见 [admin-panels/component-contract/data-table.md](../../admin-panels/component-contract/data-table.md) § 表格内嵌操作（与 nav 解耦）

### 8.3 Dashboards（数据大屏）

- 大屏通常为单页无跨页面 → **本组件不适用**
- 公开报告页（少数）可简化为 nav（仅 Logo + Date range + Share + Export） + 无 footer
- 详情见 [dashboards/animation-matrix.md](../../dashboards/animation-matrix.md)

### 8.4 E-commerce（电商）

- Nav 集成 cart icon + count badge
- Footer 5-6 列（含 "Shop by category / Brand / Customer service / Newsletter signup"）
- Pre-footer CTA = "Sign up for 10% off" 而非 "Get started"
- 详情见 [ecommerce/README.md](../../ecommerce/README.md)（待建）

### 8.5 Documentation（文档站）

- 3 段式：Left sidebar (page tree) + Center (content) + Right sidebar (TOC)
- Top Nav 极简（Logo + Search + Theme + GitHub link）
- 无传统 footer
- 详情见 [documentation/README.md](../../documentation/README.md)（待建）

### 8.6 Auth Flow（认证流）

- 通常无 nav / footer（login / register / reset 是独立页）
- 如有：极简 nav（Logo + 切换主题 + 帮助链接） + 无 footer
- 详情见 [auth-flows/README.md](../../auth-flows/README.md)（待建）

### 8.7 Landing Page（单页营销）

- **本组件不适用**（无跨页面概念）
- 但 Nav 仍存在（单页内 anchor 跳转），用 `landing-pages/component-contract/hero-cta.md` 替代
- 详情见 [landing-pages/component-contract/hero-cta.md](../../landing-pages/component-contract/hero-cta.md)

### 8.8 Native App / Mobile Web

- Mobile Web 用 mobile nav pattern（bottom tab bar 而非 top nav）
- Native App 走各自平台（HIG / Material）规范
- 详情见 [mobile-web/README.md](../../mobile-web/README.md)（待建）

---

## 9. See also

- [performance-budget.md](./performance-budget.md) — nav 滚动性能（sticky + blur 的代价）
- [seo-checklist.md](./seo-checklist.md) — nav 链接 SEO 规范
- [page-framework.md](./page-framework.md) — nav 链接到所有 page（HTML sitemap）

---

## 10. Acceptance check

- [ ] Logo SVG id 全站一致
- [ ] 主 CTA 文本/颜色全站不变
- [ ] Active page 高亮逻辑在 SPA 路由切换正确
- [ ] Sticky nav 滚动时 blur + 高度变化
- [ ] Mega menu hover 离开 200ms 才关闭
- [ ] Mobile drawer 全屏打开 + ESC 关闭
- [ ] Theme 切换不重置（不闪烁）
- [ ] Footer 永远显示在所有页底
- [ ] Pre-footer CTA 文案与 Hero 一致
- [ ] 0 `v-if` + `v-for` 混用
