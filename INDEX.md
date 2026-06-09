# INDEX — Bicorne Design 文档搜索索引

> **v2.12 立项新建**（Task 8.5）· 全文档锚点链接 · 按 7 大维度分组。
>
> **统计**：48 组件契约 + 80 pitfalls + 8 类别专题 + 9 走向框架 + 15 verification + 13 行业 brand-library（11 README.md + 2 INDEX-only · aerospace/luxury v1.7-v1.8 新增沿用 INDEX.md 形态 · 详见 [`§ 6 行业 brand-library`](#6-行业-brand-library-13-个) 备注）

---

## 📚 目录

1. [入门文档](#1-入门文档-5-份)
2. [48 组件契约](#2-48-组件契约-按-8-类别)
3. [80 pitfalls](#3-80-pitfalls-按-8-类别)
4. [8 类别专题](#4-8-类别专题-dark-mode-a11y)
5. [9 走向框架](#5-9-走向框架-v212-总览)
6. [13 行业 brand-library](#6-行业-brand-library-13-个)
7. [15 verification](#7-15-verification-真实项目截图)
8. [方法论 · 设计哲学 · 字体](#8-方法论--设计哲学--字体)
9. [脚本 · 模板 · 实施 spec](#9-脚本--模板--实施-spec)

---

## 1. 入门文档（5 份）

| 文档 | 路径 | 用途 |
|---|---|---|
| **SKILL.md** | [`SKILL.md`](./SKILL.md) | 技能入口 · v2.12 metadata · 9 走向框架 · 五阶段工作流 |
| **README.md** | [`README.md`](./README.md) | 项目主入口 · 5 分钟理解 skill 用途 |
| **CHANGELOG.md** | [`CHANGELOG.md`](./CHANGELOG.md) | v0.1 → v2.12 完整时间线 |
| **ROADMAP.md** | [`ROADMAP.md`](./ROADMAP.md) | 演进路径 · 9 走向框架 |
| **PERF_RUNTIME_REPORT.md** | [`PERF_RUNTIME_REPORT.md`](./PERF_RUNTIME_REPORT.md) | 实质 P 运行时验证报告（v2.11 B 方案落地 · 15/15 实质 P 全覆盖）|

---

## 2. 48 组件契约（按 8 类别）

> **总组件契约数**：48 件（不含 `data-viz/` 与 `layouts/`）· 全部按 8 类别分组

### 2.1 dashboards · 9 组件

| 组件 | 路径 | 用途 |
|---|---|---|
| corner-frame | [`dashboards/component-contract/corner-frame.md`](./dashboards/component-contract/corner-frame.md) | 角落装饰框（科技感 + 状态指示）|
| data-table | [`dashboards/component-contract/data-table.md`](./dashboards/component-contract/data-table.md) | 数据表格（含分页 / 排序 / 行选择）|
| gauge | [`dashboards/component-contract/gauge.md`](./dashboards/component-contract/gauge.md) | 仪表盘（CPU / 内存 / 容量）|
| map-panel | [`dashboards/component-contract/map-panel.md`](./dashboards/component-contract/map-panel.md) | 地图面板（中国地图 / 世界地图）|
| metric-number | [`dashboards/component-contract/metric-number.md`](./dashboards/component-contract/metric-number.md) | KPI 数字（含 tabular-nums + count-up）|
| panel | [`dashboards/component-contract/panel.md`](./dashboards/component-contract/panel.md) | 面板容器（4-3 command center 7 面板基类）|
| ring-progress | [`dashboards/component-contract/ring-progress.md`](./dashboards/component-contract/ring-progress.md) | 环形进度 |
| sparkline | [`dashboards/component-contract/sparkline.md`](./dashboards/component-contract/sparkline.md) | 微型折线图 |
| ticker | [`dashboards/component-contract/ticker.md`](./dashboards/component-contract/ticker.md) | 滚动 ticker（实时遥测）|

### 2.2 admin-panels · 8 组件

| 组件 | 路径 | 用途 |
|---|---|---|
| action-menu | [`admin-panels/component-contract/action-menu.md`](./admin-panels/component-contract/action-menu.md) | 行操作菜单 |
| bulk-action-bar | [`admin-panels/component-contract/bulk-action-bar.md`](./admin-panels/component-contract/bulk-action-bar.md) | 批量操作栏 |
| data-table | [`admin-panels/component-contract/data-table.md`](./admin-panels/component-contract/data-table.md) | 中后台数据表格（与 dashboards 区分：含筛选 / 批量操作）|
| detail-drawer | [`admin-panels/component-contract/detail-drawer.md`](./admin-panels/component-contract/detail-drawer.md) | 详情抽屉 |
| filter-form | [`admin-panels/component-contract/filter-form.md`](./admin-panels/component-contract/filter-form.md) | 筛选表单 |
| form-field | [`admin-panels/component-contract/form-field.md`](./admin-panels/component-contract/form-field.md) | 表单字段（统一封装）|
| form-section | [`admin-panels/component-contract/form-section.md`](./admin-panels/component-contract/form-section.md) | 表单 section 分组 |
| permission-ux | [`admin-panels/component-contract/permission-ux.md`](./admin-panels/component-contract/permission-ux.md) | 权限 UX（隐藏 vs 禁用 / 错误提示 / 角色切换）|

### 2.3 ai-products · 6 组件

| 组件 | 路径 | 用途 |
|---|---|---|
| chat-stream | [`ai-products/component-contract/chat-stream.md`](./ai-products/component-contract/chat-stream.md) | 流式聊天（SSE / WebSocket + 打字机光标）|
| citation-source | [`ai-products/component-contract/citation-source.md`](./ai-products/component-contract/citation-source.md) | 引文来源（RAG 检索结果）|
| message-bubble | [`ai-products/component-contract/message-bubble.md`](./ai-products/component-contract/message-bubble.md) | 消息气泡（user / assistant / tool）|
| model-selector | [`ai-products/component-contract/model-selector.md`](./ai-products/component-contract/model-selector.md) | 模型选择器（GPT / Claude / Gemini）|
| prompt-composer | [`ai-products/component-contract/prompt-composer.md`](./ai-products/component-contract/prompt-composer.md) | Prompt 编写器（多模态 + 附件）|
| tool-call-card | [`ai-products/component-contract/tool-call-card.md`](./ai-products/component-contract/tool-call-card.md) | 工具调用卡（function calling 结果）|

### 2.4 landing-pages · 4 组件

| 组件 | 路径 | 用途 |
|---|---|---|
| feature-row | [`landing-pages/component-contract/feature-row.md`](./landing-pages/component-contract/feature-row.md) | 特性行（图文左右交替）|
| hero-cta | [`landing-pages/component-contract/hero-cta.md`](./landing-pages/component-contract/hero-cta.md) | Hero CTA（首屏大标题 + CTA）|
| pricing-simple | [`landing-pages/component-contract/pricing-simple.md`](./landing-pages/component-contract/pricing-simple.md) | 简洁价格表 |
| testimonial-logos | [`landing-pages/component-contract/testimonial-logos.md`](./landing-pages/component-contract/testimonial-logos.md) | 证言 + 客户 logo 墙 |

### 2.5 mobile-web · 4 组件

| 组件 | 路径 | 用途 |
|---|---|---|
| bottom-tab-bar | [`mobile-web/component-contract/bottom-tab-bar.md`](./mobile-web/component-contract/bottom-tab-bar.md) | 底部 Tab 栏（5 tab 标准）|
| mobile-form-input | [`mobile-web/component-contract/mobile-form-input.md`](./mobile-web/component-contract/mobile-form-input.md) | 移动端表单输入（含 iOS / Android 键盘适配）|
| mobile-modal | [`mobile-web/component-contract/mobile-modal.md`](./mobile-web/component-contract/mobile-modal.md) | 移动端 Modal（iOS Action Sheet / Android Bottom Sheet）|
| touch-gesture-handler | [`mobile-web/component-contract/touch-gesture-handler.md`](./mobile-web/component-contract/touch-gesture-handler.md) | 触摸手势（滑 / 捏 / 双击 / 长按）|

### 2.6 native-app · 5 组件

| 组件 | 路径 | 用途 |
|---|---|---|
| app-bar-header | [`native-app/component-contract/app-bar-header.md`](./native-app/component-contract/app-bar-header.md) | 应用栏（iOS Large Title / M3 TopAppBar）|
| native-list-row | [`native-app/component-contract/native-list-row.md`](./native-app/component-contract/native-list-row.md) | 原生列表行（iOS Inset Grouped / M3 ListItem）|
| native-tab-bar | [`native-app/component-contract/native-tab-bar.md`](./native-app/component-contract/native-tab-bar.md) | 原生 Tab 栏（iOS TabBar / M3 NavigationBar）|
| platform-action-sheet | [`native-app/component-contract/platform-action-sheet.md`](./native-app/component-contract/platform-action-sheet.md) | 平台 Action Sheet（iOS Action Sheet / Android Modal Bottom Sheet）|
| push-notification-card | [`native-app/component-contract/push-notification-card.md`](./native-app/component-contract/push-notification-card.md) | 推送通知卡（含 1-2 quick actions）|

### 2.7 premium-showcase · 5 组件

| 组件 | 路径 | 用途 |
|---|---|---|
| feature-row | [`premium-showcase/component-contract/feature-row.md`](./premium-showcase/component-contract/feature-row.md) | 特性行（cinematic 长滚动 · 与 landing-pages 区分）|
| footer-cta | [`premium-showcase/component-contract/footer-cta.md`](./premium-showcase/component-contract/footer-cta.md) | 询价式 footer（mailto + 不显示价格）|
| hero-cta | [`premium-showcase/component-contract/hero-cta.md`](./premium-showcase/component-contract/hero-cta.md) | Cinematic Hero（80-120px 大字号 + 慢 easing）|
| image-gallery | [`premium-showcase/component-contract/image-gallery.md`](./premium-showcase/component-contract/image-gallery.md) | 摄影 gallery（masonry / lightbox）|
| spec-sheet | [`premium-showcase/component-contract/spec-sheet.md`](./premium-showcase/component-contract/spec-sheet.md) | Mono spec 数据表（推力 / 速度 / 高度）|

### 2.8 saas-marketing · 7 组件

| 组件 | 路径 | 用途 |
|---|---|---|
| blog-card | [`saas-marketing/component-contract/blog-card.md`](./saas-marketing/component-contract/blog-card.md) | 博客卡 |
| cta-band | [`saas-marketing/component-contract/cta-band.md`](./saas-marketing/component-contract/cta-band.md) | CTA 横幅 |
| feature-grid | [`saas-marketing/component-contract/feature-grid.md`](./saas-marketing/component-contract/feature-grid.md) | 特性网格（3-4 列）|
| hero-section | [`saas-marketing/component-contract/hero-section.md`](./saas-marketing/component-contract/hero-section.md) | Hero Section（与 landing-pages 区分：多页面型 / 导航完整）|
| nav-footer | [`saas-marketing/component-contract/nav-footer.md`](./saas-marketing/component-contract/nav-footer.md) | 导航 + Footer |
| pricing-table | [`saas-marketing/component-contract/pricing-table.md`](./saas-marketing/component-contract/pricing-table.md) | 完整价格表（多档位 + 对比）|
| social-proof | [`saas-marketing/component-contract/social-proof.md`](./saas-marketing/component-contract/social-proof.md) | 社会证明（客户 logo + 数据 + 证言）|

---

## 3. 80 pitfalls（按 8 类别）

> **总 pitfalls 数**：v2.12 Task 8.2 同步后累计 80+ 条 · 8 类别全部 ≥ 2 条 v2.11 同步

| 类别 | 总数 | v2.11 新增 | 路径 |
|---|---|---|---|
| **dashboards** | 27 | +2（H-3 alt + onerror）| [`dashboards/pitfalls/README.md`](./dashboards/pitfalls/README.md) |
| **admin-panels** | 2 | +2（4-1 字体 + 装饰性 a11y · v2.12 新建）| [`admin-panels/pitfalls/README.md`](./admin-panels/pitfalls/README.md) |
| **ai-products** | 13 | +3（@latest / type 导入 / pipe 子 shell）| [`ai-products/pitfalls/README.md`](./ai-products/pitfalls/README.md) |
| **landing-pages** | 10 | +2（@latest + 装饰性 logo）| [`landing-pages/pitfalls/README.md`](./landing-pages/pitfalls/README.md) |
| **mobile-web** | 12 | +2（@latest + 装饰性图标）| [`mobile-web/pitfalls/README.md`](./mobile-web/pitfalls/README.md) |
| **native-app** | 12 | +2（@latest + 装饰性状态栏）| [`native-app/pitfalls/README.md`](./native-app/pitfalls/README.md) |
| **premium-showcase** | 12 | +2（@latest + 装饰性全屏摄影）| [`premium-showcase/pitfalls/README.md`](./premium-showcase/pitfalls/README.md) |
| **saas-marketing** | 14 | +2（@latest + 装饰性 logo）| [`saas-marketing/pitfalls/README.md`](./saas-marketing/pitfalls/README.md) |
| **合计** | **102** | **+19 v2.11 同步** | 8 类别 README |

---

## 4. 8 类别专题（dark-mode-a11y）

> **总专题数**：8 个 dark-mode-a11y.md · v2.12 Task 8.3 全部新增"字体真实后暗色模式"段

| 类别 | 路径 | v2.12 同步 |
|---|---|---|
| **dashboards** | [`dashboards/dark-mode-a11y.md`](./dashboards/dark-mode-a11y.md) | ✅ § 8 字体真实后暗色模式（4.5:1 对比度 + OLED 灰阶渗透 + 主题切换动画 + token 审计）|
| **admin-panels** | [`admin-panels/dark-mode-a11y.md`](./admin-panels/dark-mode-a11y.md) | ✅ § 9 字体真实后暗色模式 |
| **ai-products** | [`ai-products/dark-mode-a11y.md`](./ai-products/dark-mode-a11y.md) | ✅ § 13 字体真实后暗色模式（chat stream 优化）|
| **landing-pages** | [`landing-pages/dark-mode-a11y.md`](./landing-pages/dark-mode-a11y.md) | ✅ § 10 字体真实后暗色模式（Hero typography）|
| **mobile-web** | [`mobile-web/dark-mode-a11y.md`](./mobile-web/dark-mode-a11y.md) | ✅ § 10 字体真实后暗色模式（OLED 优化）|
| **native-app** | [`native-app/dark-mode-a11y.md`](./native-app/dark-mode-a11y.md) | ✅ § 9 字体真实后暗色模式（iOS / Android 差异化）|
| **premium-showcase** | [`premium-showcase/dark-mode-a11y.md`](./premium-showcase/dark-mode-a11y.md) | ✅ § 12 字体真实后暗色模式（cinematic typography）|
| **saas-marketing** | [`saas-marketing/dark-mode-a11y.md`](./saas-marketing/dark-mode-a11y.md) | ✅ § 9 字体真实后暗色模式（Stripe 风格 Hero）|

---

## 5. 9 走向框架（v2.12 总览）

> **总走向数**：9 = 5 完结 + 4 立项 · 详情见 [`ROADMAP.md`](./ROADMAP.md) § 9 走向框架

| 走向 | 状态 | 议题数 | 详情 |
|---|---|---|---|
| **1 · a11y** | ✅ 完结 | 1 | v2.0-v2.2 · 5 类别 P0 a11y 修复 |
| **B · perf（保守修复）** | ✅ 完结 | 1 | v2.10 · A 方案 onerror 自清理 |
| **C · perf（透明修复）** | ✅ 完结 | 1 | v2.10 · C 方案 perf-scan FORM_VS_REAL 字段 |
| **D · perf（实质修复）** | ✅ 完结 | 1 | v2.11 · D 方案批量下载真实字体（22 处 404 → 200 OK）|
| **D 终极 · perf（onerror 冗余清理）** | ✅ 完结 | 1 | v2.11 · 字体真实后批量移除 22 处 onerror |
| **E · 性能深度** | 🆕 立项 | 6 | v2.12 Task 3 · [ROADMAP § E](./ROADMAP.md#走向-e--性能深度优化v212-立项--6-议题) |
| **F · a11y 深度** | 🆕 立项 | 5 | v2.12 Task 10 |
| **G · 国际化 + 响应式 + 压缩** | 🆕 立项 | 3 | v2.12 Task 11 |
| **H · 可维护性 + 索引 + 测试** | 🆕 立项 | 5 | v2.12 Task 12 |

---

## 6. 13 行业 brand-library（11 README.md + 2 INDEX-only）

> **总行业数**：13 个 · 结构 = **11 README.md** + **2 INDEX-only**（aerospace + luxury 是 v1.7/v1.8 新增，沿用 INDEX.md 形态）· v2.12 Task 8.1 全部新增字体标注（4 字段：主字体 / 备选字体 / CJK fallback / 推荐下载链接）

| # | 行业 | 路径 | 品牌数 |
|---|---|---|---|
| 1 | **aerospace**（航天/航空）| [`references/brand-library/aerospace/INDEX.md`](./references/brand-library/aerospace/INDEX.md) | 3（SpaceX · Virgin Galactic · Boom Supersonic · INDEX-only）|
| 2 | **ai-llm**（AI/LLM）| [`references/brand-library/ai-llm/README.md`](./references/brand-library/ai-llm/README.md) | 12（Claude · Cursor · Cohere · Mistral.ai · Replicate · ElevenLabs · x.ai · Ollama · NVIDIA · RunwayML · Together.ai · Lovable）|
| 3 | **automotive**（汽车）| [`references/brand-library/automotive/README.md`](./references/brand-library/automotive/README.md) | 3（BMW · Ferrari · Lamborghini）|
| 4 | **consumer-lifestyle**（消费/生活方式）| [`references/brand-library/consumer-lifestyle/README.md`](./references/brand-library/consumer-lifestyle/README.md) | 6（Spotify · Apple · Tesla · Starbucks · PlayStation · SpaceX）|
| 5 | **design-collab**（设计/协作）| [`references/brand-library/design-collab/README.md`](./references/brand-library/design-collab/README.md) | 6（Figma · Framer · Miro · Notion · Webflow · Sanity）|
| 6 | **developer-tools**（开发工具）| [`references/brand-library/developer-tools/README.md`](./references/brand-library/developer-tools/README.md) | 14（Linear.app · Vercel · Raycast · Warp · Sentry · Supabase · PostHog · HashiCorp · Mintlify · MongoDB · ClickHouse · Expo · Resend · Superhuman）|
| 7 | **ecommerce**（电商零售）| [`references/brand-library/ecommerce/README.md`](./references/brand-library/ecommerce/README.md) | 3（Airbnb · Nike · Shopify）|
| 8 | **enterprise-saas**（企业 SaaS）| [`references/brand-library/enterprise-saas/README.md`](./references/brand-library/enterprise-saas/README.md) | 5（Intercom · Airtable · Zapier · IBM · Cal）|
| 9 | **fintech**（金融科技）| [`references/brand-library/fintech/README.md`](./references/brand-library/fintech/README.md) | 6（Stripe · Coinbase · Revolut · Wise · Binance · Mastercard）|
| 10 | **luxury**（奢侈/高端生活方式）| [`references/brand-library/luxury/INDEX.md`](./references/brand-library/luxury/INDEX.md) | 6（Hermès · Bang & Olufsen · Aston Martin · Rolls-Royce · Rolex · Bottega Veneta · INDEX-only）|
| 11 | **media**（媒体）| [`references/brand-library/media/README.md`](./references/brand-library/media/README.md) | 2（The Verge · WIRED）|
| 12 | **social-communication**（社交/通讯）| [`references/brand-library/social-communication/README.md`](./references/brand-library/social-communication/README.md) | 3（Pinterest · Uber · Meta）|
| | **总品牌数** | | **69 个（INDEX-only 9 + DESIGN.md 已落地 60）** |

### 6.1 brand-library 总索引

- [`references/brand-library/INDEX.md`](./references/brand-library/INDEX.md) — 13 行业总索引（11 README + 2 INDEX-only）+ 决策树 + 暗/亮色选择矩阵

---

## 7. 15 verification（真实项目截图）

> **总 verification 数**：15 项 · 全部 e2e 通过 332/0/0 真·全绿零失败（v2.2）· 实质 P 100% 全覆盖（v2.11）· 截图册 42 → 47 张（v2.12 新增 4 张 B 方案对比图 + 1 张 warn 趋势图 · sandbox 复现不破坏主仓 e2e 全绿状态）

| # | 类别 | verification | 桌面 | 移动 | e2e |
|---|---|---|---|---|---|
| 1 | dashboards | 4-3-dashboard-command-center | [1440](./dashboards/verification/4-3-dashboard-command-center/screenshots/dashboard-1440.png) | [390](./dashboards/verification/4-3-dashboard-command-center/screenshots/dashboard-390.png) | ✅ 26/0/0 |
| 2 | admin-panels | 4-1-linear-vue | [1440](./admin-panels/verification/4-1-linear-vue/screenshots/admin-linear-1440.png) | [390](./admin-panels/verification/4-1-linear-vue/screenshots/admin-linear-390.png) | ✅ 16/0/0 |
| 3 | saas-marketing | 4-2-stripe-landing | [full](./saas-marketing/verification/4-2-stripe-landing/stripe-landing-full.png) | [dark](./saas-marketing/verification/4-2-stripe-landing/stripe-landing-dark.png) | ✅ 10/0/0 |
| 4 | landing-pages | 5-1-resend-landing | [1440](./landing-pages/verification/5-1-resend-landing/screenshots/landing-1440.png) | [390](./landing-pages/verification/5-1-resend-landing/screenshots/landing-390.png) | ✅ 23/0/0 |
| 5 | landing-pages | 5-2-vercel-landing | [desktop](./landing-pages/verification/5-2-vercel-landing/screenshots/desktop.png) | [mobile](./landing-pages/verification/5-2-vercel-landing/screenshots/mobile.png) | ✅ 25/0/0 |
| 6 | ai-products | 6-1-cursor-ide | [1440](./ai-products/verification/6-1-cursor-ide/screenshots/ide-1440.png) | [390](./ai-products/verification/6-1-cursor-ide/screenshots/ide-390.png) | ✅ 22/0/0 |
| 7 | ai-products | 6-2-vercel-ai-playground | [desktop](./ai-products/verification/6-2-vercel-ai-playground/screenshots/desktop.png) | [mobile](./ai-products/verification/6-2-vercel-ai-playground/screenshots/mobile.png) | ✅ 23/0/0 |
| 8 | mobile-web | mobile-1-x-like-feed | [1280](./mobile-web/verification/mobile-1-x-like-feed/screenshots/desktop-1280.png) | [390](./mobile-web/verification/mobile-1-x-like-feed/screenshots/mobile-390.png) | ✅ 22/0/0 |
| 9 | mobile-web | mobile-2-x-instagram-stories | [1280](./mobile-web/verification/mobile-2-x-instagram-stories/screenshots/desktop-1280.png) | [390](./mobile-web/verification/mobile-2-x-instagram-stories/screenshots/mobile-390.png) | ✅ 22/0/0 |
| 10 | mobile-web | mobile-3-x-airbnb-bottom-sheet | [1280](./mobile-web/verification/mobile-3-x-airbnb-bottom-sheet/screenshots/desktop-1280.png) | [390](./mobile-web/verification/mobile-3-x-airbnb-bottom-sheet/screenshots/mobile-390.png) | ✅ 22/0/0 |
| 11 | native-app | native-1-ios-settings | [1440](./native-app/verification/native-1-ios-settings/native-1-ios-desktop-1440.png) | [390](./native-app/verification/native-1-ios-settings/native-1-ios-mobile-390.png) | ✅ 23/0/0 |
| 12 | native-app | native-2-android-material-you | [1440](./native-app/verification/native-2-android-material-you/native-2-android-desktop-1440.png) | [390](./native-app/verification/native-2-android-material-you/native-2-android-mobile-390.png) | ✅ 23/0/0 |
| 13 | premium-showcase | ps-1-tesla-cinematic | [1440](./premium-showcase/verification/ps-1-tesla-cinematic/ps-1-tesla-desktop-1440.png) | [390](./premium-showcase/verification/ps-1-tesla-cinematic/ps-1-tesla-mobile-390.png) | ✅ 25/0/0 |
| 14 | premium-showcase | ps-2-apple-vision-pro | [1440](./premium-showcase/verification/ps-2-apple-vision-pro/ps-2-visionpro-desktop-1440.png) | [390](./premium-showcase/verification/ps-2-apple-vision-pro/ps-2-visionpro-mobile-390.png) | ✅ 25/0/0 |
| 15 | premium-showcase | ps-3-hermes-bo-luxury | [1440](./premium-showcase/verification/ps-3-hermes-bo-luxury/ps-3-hermes-luxury-desktop-1440.png) | [390](./premium-showcase/verification/ps-3-hermes-bo-luxury/ps-3-hermes-luxury-mobile-390.png) | ✅ 25/0/0 |

> **总 e2e 通过**：332 项 · **警告**：0 项 · **失败**：0 项 · **实质 P 覆盖率**：100%（v2.11 B 方案后）

---

## 8. 方法论 · 设计哲学 · 字体

### 8.1 方法论（12 份通用 + 6 份 v2.12 新增/更新）

| 文档 | 路径 | 状态 |
|---|---|---|
| 设计方法论 | [`references/methodology/design-methodology.md`](./references/methodology/design-methodology.md) | v2.1 · 五阶段工作流 |
| 反糊化协议 | [`references/methodology/anti-blur-protocol.md`](./references/methodology/anti-blur-protocol.md) | v1.0 |
| 反 AI Slop 清单 | [`references/methodology/anti-slop-checklist.md`](./references/methodology/anti-slop-checklist.md) | v1.0 |
| 变体评审框架 | [`references/methodology/review-scoring.md`](./references/methodology/review-scoring.md) | v1.0 |
| 核心资产协议 | [`references/methodology/asset-protocol.md`](./references/methodology/asset-protocol.md) | v1.0 |
| 动画最佳实践 | [`references/methodology/animation-best-practices.md`](./references/methodology/animation-best-practices.md) | v2.1 |
| 字体加载策略 | [`references/methodology/font-loading-strategy.md`](./references/methodology/font-loading-strategy.md) | v2.11 |
| 暗色模式 + a11y | [`references/methodology/dark-mode-a11y.md`](./references/methodology/dark-mode-a11y.md) | v2.11 |
| UI 状态设计 | [`references/methodology/ui-states.md`](./references/methodology/ui-states.md) | v1.0 |
| 响应式降级 | [`references/methodology/responsive-degradation.md`](./references/methodology/responsive-degradation.md) | v1.5 |
| 页面框架 | [`references/methodology/page-framework.md`](./references/methodology/page-framework.md) | v1.0 |
| SEO 清单 | [`references/methodology/seo-checklist.md`](./references/methodology/seo-checklist.md) | v1.5 |
| 排版 | [`references/methodology/typography.md`](./references/methodology/typography.md) | v1.0 |
| 幻灯片设计 | [`references/methodology/slide-design.md`](./references/methodology/slide-design.md) | v1.0 |
| 产品展示 | [`references/methodology/product-presentation.md`](./references/methodology/product-presentation.md) | v1.0 |
| 性能预算 | [`references/methodology/performance-budget.md`](./references/methodology/performance-budget.md) | v2.5 |
| 大屏布局 | [`references/methodology/dashboard-layout-patterns.md`](./references/methodology/dashboard-layout-patterns.md) | v2.5 |
| 数据可视化 | [`references/methodology/data-visualization.md`](./references/methodology/data-visualization.md) | v2.5 |
| 大屏交互 | [`references/methodology/dashboard-interaction.md`](./references/methodology/dashboard-interaction.md) | v2.5 |
| 跨平台动画 | [`references/methodology/animation-cross-platform.md`](./references/methodology/animation-cross-platform.md) | v2.5 |
| Nav + Footer | [`references/methodology/nav-footer.md`](./references/methodology/nav-footer.md) | v2.0 |

### 8.2 设计哲学（2 份）

| 文档 | 路径 | 状态 |
|---|---|---|
| 20 Design Philosophies | [`references/design-philosophy/design-styles.md`](./references/design-philosophy/design-styles.md) | v1.0 |
| 5-Dimension Review | [`references/design-philosophy/critique-guide.md`](./references/design-philosophy/critique-guide.md) | v1.0 |

### 8.3 Token 映射（4 份）

| 文档 | 路径 | 状态 |
|---|---|---|
| 映射规则 | [`references/token-mapping/mapping-rules.md`](./references/token-mapping/mapping-rules.md) | v2.5 |
| 字段兼容性 | [`references/token-mapping/field-compatibility.md`](./references/token-mapping/field-compatibility.md) | v2.5 |
| Linear Dark 示例 | [`references/token-mapping/examples/linear-dark.token.json`](./references/token-mapping/examples/linear-dark.token.json) | v2.5 |
| Stripe Light 示例 | [`references/token-mapping/examples/stripe-light.token.json`](./references/token-mapping/examples/stripe-light.token.json) | v2.5 |
| ClickHouse Dashboard Dark 示例 | [`references/token-mapping/examples/clickhouse-dashboard-dark.token.json`](./references/token-mapping/examples/clickhouse-dashboard-dark.token.json) | v2.5 |
| Linear Mobile Dark 示例 | [`references/token-mapping/examples/linear-mobile-dark.token.json`](./references/token-mapping/examples/linear-mobile-dark.token.json) | v2.5 |
| Stripe Mobile Light 示例 | [`references/token-mapping/examples/stripe-mobile-light.token.json`](./references/token-mapping/examples/stripe-mobile-light.token.json) | v2.5 |
| Linear Dashboard Dark 示例 | [`references/token-mapping/examples/linear-dashboard-dark.token.json`](./references/token-mapping/examples/linear-dashboard-dark.token.json) | v2.5 |

---

## 9. 脚本 · 模板 · 实施 spec

### 9.1 脚本（10 个）

| 脚本 | 路径 | 状态 |
|---|---|---|
| **download-fonts** | [`scripts/download-fonts.sh`](./scripts/download-fonts.sh) | v2.12 Task 1.1 · 字体批量下载 |
| **build-all** | [`scripts/build-all.sh`](./scripts/build-all.sh) | v2.12 Task 1.2 · 11 项目批量 build |
| **perf-runtime-all** | [`scripts/perf-runtime-all.sh`](./scripts/perf-runtime-all.sh) | v2.12 Task 1.3 · 实质 P 批量验证 |
| **perf-runtime-test** | [`scripts/perf-runtime-test.sh`](./scripts/perf-runtime-test.sh) | v2.12 Task 1.5 + Task 7.4 · 4 场景单元测试 |
| **cycle-detect** | [`scripts/cycle-detect.sh`](./scripts/cycle-detect.sh) | v2.12 Task 12.5 · 循环依赖检测 |
| **file-loc-stats** | [`scripts/file-loc-stats.sh`](./scripts/file-loc-stats.sh) | v2.12 Task 12.5 · 文件代码行统计 |
| **duplication-check** | [`scripts/duplication-check.sh`](./scripts/duplication-check.sh) | v2.12 Task 12.5 · 重复代码检测 |
| **e2e-validate** | [`scripts/e2e-validate.sh`](./scripts/e2e-validate.sh) | v2.12 Task 7.1 · 8 节 A-H |
| **ci-e2e** | [`scripts/ci-e2e.sh`](./scripts/ci-e2e.sh) | v2.12 Task 7.3 · CI 集成 |
| **perf-runtime-check** | [`scripts/perf-runtime-check.sh`](./scripts/perf-runtime-check.sh) | v2.11 · 实质 P 单项目验证 |
| **perf-scan** | [`scripts/perf-scan.sh`](./scripts/perf-scan.sh) | v2.9 · 性能静态扫描 |
| **a11y-scan** | [`scripts/a11y-scan.sh`](./scripts/a11y-scan.sh) | v2.9 · a11y 扫描 |
| **generate-token** | [`scripts/generate-token.mjs`](./scripts/generate-token.mjs) | v1.0 · Token 生成 |
| **validate-token** | [`scripts/validate-token.mjs`](./scripts/validate-token.mjs) | v1.0 · Token 校验 |
| 脚本说明 | [`scripts/README.md`](./scripts/README.md) | v2.12 |

### 9.2 模板（6 主题 + 4 项目导出）

| 模板 | 路径 | 状态 |
|---|---|---|
| **dashboard-template** | [`templates/dashboard-template/`](./templates/dashboard-template/) | v2.12 Task 9.1 · from 4-3 |
| **landing-template** | [`templates/landing-template/`](./templates/landing-template/) | v2.12 Task 9.2 · from 5-1 |
| **ai-product-template** | [`templates/ai-product-template/`](./templates/ai-product-template/) | v2.12 Task 9.3 · from 6-1 |
| **mobile-template** | [`templates/mobile-template/`](./templates/mobile-template/) | v2.12 Task 9.4 · from mobile-1 |
| **mobile-dark.template.json** | [`templates/mobile-dark.template.json`](./templates/mobile-dark.template.json) | v2.1 |
| **mobile-light.template.json** | [`templates/mobile-light.template.json`](./templates/mobile-light.template.json) | v2.1 |
| **dashboard-dark.template.json** | [`templates/dashboard-dark.template.json`](./templates/dashboard-dark.template.json) | v2.1 |
| **dark-theme.template.json** | [`templates/dark-theme.template.json`](./templates/dark-theme.template.json) | v1.0 |
| **light-theme.template.json** | [`templates/light-theme.template.json`](./templates/light-theme.template.json) | v1.0 |
| **design-spec.template.md** | [`templates/design-spec.template.md`](./templates/design-spec.template.md) | v1.0 |

### 9.3 Schema（1 份）

| 文档 | 路径 | 状态 |
|---|---|---|
| design-token.schema.json | [`schema/design-token.schema.json`](./schema/design-token.schema.json) | v2.1 · 8 大顶层属性 + platform 枚举 |

### 9.4 v2.12 实施 spec

| 文档 | 路径 | 状态 |
|---|---|---|
| spec.md | [`.trae/specs/v2-12-roadmap-execution/spec.md`](.trae/specs/v2-12-roadmap-execution/spec.md) | v2.12 · 11 项终极闭环 |
| tasks.md | [`.trae/specs/v2-12-roadmap-execution/tasks.md`](.trae/specs/v2-12-roadmap-execution/tasks.md) | v2.12 · 11 Task 任务清单 |
| checklist.md | [`.trae/specs/v2-12-roadmap-execution/checklist.md`](.trae/specs/v2-12-roadmap-execution/checklist.md) | v2.12 · 验收清单 |

---

## 🔍 检索提示

- **按类别查组件**：§ 2（48 组件契约）
- **按类别查反模式**：§ 3（80 pitfalls）
- **按类别查 dark-mode-a11y**：§ 4（8 类别专题）
- **按走向查进度**：§ 5（9 走向框架）
- **按行业查品牌**：§ 6（13 行业 brand-library · 11 README + 2 INDEX-only）
- **按项目查截图**：§ 7（15 verification）
- **查设计方法**：§ 8.1（21 份方法论）
- **查字体策略**：[`references/methodology/font-loading-strategy.md`](./references/methodology/font-loading-strategy.md)
- **查脚本用法**：[`scripts/README.md`](./scripts/README.md)
- **查模板使用**：[`templates/README.md`](./templates/README.md)
- **查 token 字段**：[`references/token-mapping/mapping-rules.md`](./references/token-mapping/mapping-rules.md)