# Bicorne Design — References INDEX

> 顶级入口。从这里可以快速浏览 `bicorne-design` 的所有公共资产：
> 品牌库、跨类别方法论、Verification 真实截图册。
>
> **v2.12 状态**（2026-06-09 完结）：15 verification 30 张项目截图 + 4 v2.5 B 级项目 6 张额外截图 + 1 src/assets/hero.png 重复 + 4 v2.12 B 方案前后对比图（sandbox 复现）+ 1 v2.12 warn 趋势图 = **filesystem 47 张**（v2.12 实际盘点 · spec.md 承诺 24→29 张 严重低估 · v2.12 实际新增 5 张）。**9 走向框架**（5 完结 + 4 立项）。详见 [`../INDEX.md`](../../INDEX.md)（v2.12 Task 8.5 新建文档搜索索引）。

---

## 📑 子目录

| 子目录 | 入口 | 用途 |
|---|---|---|
| `brand-library/` | [INDEX.md](./brand-library/INDEX.md) | 60 个品牌的 DESIGN.md（按 8 大行业分类），新建设计前先查这里 |
| `design-philosophy/` | [design-styles.md](./design-philosophy/design-styles.md) | 20 种设计哲学 + 5 维度评审指南（[critique-guide.md](./design-philosophy/critique-guide.md)） |
| `methodology/` | [INDEX.md](./methodology/INDEX.md) | 跨类别方法论（typography / SEO / performance / nav-footer 等 12 份通用文档） |
| `token-mapping/` | [mapping-rules.md](./token-mapping/mapping-rules.md) | DESIGN.md → token.json 字段映射桥 |
| **Verification 截图册** | **（本页 § 🎨）** | **13 个 e2e 验收项目（含 1 横扩 premium-showcase ps-1）的桌面 + 移动真实截图** |

---

## 🎨 Verification 项目真实截图册

> **2026-06-08 实拍**：所有截图均由 Chrome DevTools MCP 在 `vite dev` / `vite preview` 模式下捕获，full page（@1x / @2x 缩放见文件名）。
>
> 14 个 verification 项目对应 `e2e-validate.sh --category all` 的 14 项协同验收（v1.7 真·全绿零警告，307/0/0）。

### 📊 一图速览（14 项 · 真实桌面 + 移动）

| 类别 | verification | 桌面截图 | 移动截图 | e2e 验收 |
|---|---|---|---|---|
| **Dashboards** | 4-3-dashboard-command-center | ![Dashboard 1440](./dashboards/verification/4-3-dashboard-command-center/screenshots/dashboard-1440.png) | ![Dashboard 390](./dashboards/verification/4-3-dashboard-command-center/screenshots/dashboard-390.png) | ✅ 26/0/0 |
| **Admin Panels** | 4-1-linear-vue | ![Admin Linear 1440](./admin-panels/verification/4-1-linear-vue/screenshots/admin-linear-1440.png) | ![Admin Linear 390](./admin-panels/verification/4-1-linear-vue/screenshots/admin-linear-390.png) | ✅ 16/0/0 |
| **SaaS Marketing** | 4-2-stripe-landing | ![Stripe Full](./saas-marketing/verification/4-2-stripe-landing/stripe-landing-full.png) | ![Stripe Dark](./saas-marketing/verification/4-2-stripe-landing/stripe-landing-dark.png) | ✅ 10/0/0 |
| **Landing Pages** | 5-1-resend-landing | ![Resend 1440](./landing-pages/verification/5-1-resend-landing/screenshots/landing-1440.png) | ![Resend 390](./landing-pages/verification/5-1-resend-landing/screenshots/landing-390.png) | ✅ 23/0/0 |
| **Landing Pages** | 5-2-vercel-landing | ![Vercel Desktop](./landing-pages/verification/5-2-vercel-landing/screenshots/desktop.png) | ![Vercel Mobile](./landing-pages/verification/5-2-vercel-landing/screenshots/mobile.png) | ✅ 25/0/0 |
| **AI Products** | 6-1-cursor-ide | ![Cursor 1440](./ai-products/verification/6-1-cursor-ide/screenshots/ide-1440.png) | ![Cursor 390](./ai-products/verification/6-1-cursor-ide/screenshots/ide-390.png) | ✅ 22/0/0 |
| **AI Products** | 6-2-vercel-ai-playground | ![Playground Desktop](./ai-products/verification/6-2-vercel-ai-playground/screenshots/desktop.png) | ![Playground Mobile](./ai-products/verification/6-2-vercel-ai-playground/screenshots/mobile.png) | ✅ 23/0/0 |
| **Mobile Web** | mobile-1-x-like-feed | ![X Desktop 1280](./mobile-web/verification/mobile-1-x-like-feed/screenshots/desktop-1280.png) | ![X Mobile 390](./mobile-web/verification/mobile-1-x-like-feed/screenshots/mobile-390.png) | ✅ 22/0/0 |
| **Mobile Web** | mobile-2-x-instagram-stories | ![IG Desktop 1280](./mobile-web/verification/mobile-2-x-instagram-stories/screenshots/desktop-1280.png) | ![IG Mobile 390](./mobile-web/verification/mobile-2-x-instagram-stories/screenshots/mobile-390.png) | ✅ 22/0/0 |
| **Mobile Web** | mobile-3-x-airbnb-bottom-sheet | ![AB Desktop 1280](./mobile-web/verification/mobile-3-x-airbnb-bottom-sheet/screenshots/desktop-1280.png) | ![AB Mobile 390](./mobile-web/verification/mobile-3-x-airbnb-bottom-sheet/screenshots/mobile-390.png) | ✅ 22/0/0 |
| **Native App** | native-1-ios-settings (iOS HIG) | ![iOS Desktop 1440](./native-app/verification/native-1-ios-settings/native-1-ios-desktop-1440.png) | ![iOS Mobile 390](./native-app/verification/native-1-ios-settings/native-1-ios-mobile-390.png) | ✅ 23/0/0 |
| **Native App** | native-2-android-material-you (Material 3) | ![Android Desktop 1440](./native-app/verification/native-2-android-material-you/native-2-android-desktop-1440.png) | ![Android Mobile 390](./native-app/verification/native-2-android-material-you/native-2-android-mobile-390.png) | ✅ 23/0/0 |
| **Premium Showcase** | ps-1-tesla-cinematic (Tesla Model X) | ![Tesla Desktop 1440](./premium-showcase/verification/ps-1-tesla-cinematic/ps-1-tesla-desktop-1440.png) | ![Tesla Mobile 390](./premium-showcase/verification/ps-1-tesla-cinematic/ps-1-tesla-mobile-390.png) | ✅ 25/0/0 |
| **Premium Showcase** | ps-2-apple-vision-pro (Apple Vision Pro) | ![VisionPro Desktop 1440](./premium-showcase/verification/ps-2-apple-vision-pro/ps-2-visionpro-desktop-1440.png) | ![VisionPro Mobile 390](./premium-showcase/verification/ps-2-apple-vision-pro/ps-2-visionpro-mobile-390.png) | ✅ 25/0/0 |

> **命名说明**：截图文件名遵循 verification 项目创建时约定的命名，主要有两种：
> - `<name>-1440.png` / `<name>-390.png`（按视口宽度命名，如 4-3 / 5-1 / 6-1）
> - `desktop.png` / `mobile.png`（按设备类型命名，如 5-2 / 6-2 / mobile-1）
>
> **空缺说明**：
> - ~~Admin Panels 4-1-linear-vue 暂无截图~~（已于 2026-06-07 补齐：admin-linear-1440.png + admin-linear-390.png）
> - **SaaS Marketing 4-2-stripe-landing** 截图在 verification 根目录（非 `screenshots/` 子目录），命名按区块（`full` / `dark` / `hero` / `features` / `cta` / `footer`）

---

### 📐 14 项目截图详细规格

#### 1. Dashboards · 4-3-dashboard-command-center
- **桌面 1440×900 @2x**：[`dashboard-1440.png` (2880×1494)](./dashboards/verification/4-3-dashboard-command-center/screenshots/dashboard-1440.png)
- **移动 390×844 @2x**：[`dashboard-390.png` (1000×1494)](./dashboards/verification/4-3-dashboard-command-center/screenshots/dashboard-390.png)
- **风格**：暗色数据驾驶舱 · 中国地图 / 24h 发电曲线 / 7 面板 L1 三列布局 / Tianhe 富家 O&M 风格
- **Token namespace**：`dash-`（`dash-bg` / `dash-accent-cyan` / `dash-fade-up` 等）
- **组件契约数**：8（panel / metric / sparkline / map / gauge / ring / ticker / datatable）
- **详细**：[README.md](./dashboards/verification/4-3-dashboard-command-center/README.md)

#### 2. Admin Panels · 4-1-linear-vue
- **截图**：🚧 **暂未实拍**（仅有 `dist/` 构建产物；dev server 启动后 `<title>` 含 "Linear" 关键词，e2e 16/0/0 通过）
- **风格**：Linear 风格暗色中后台（4 组件契约：AdminHeader / AdminSidebar / DataTable / FilterForm）
- **Token namespace**：未走 token-bridge（纯 Tailwind 自定义类）
- **组件契约数**：4（action-menu / bulk-action-bar / data-table / detail-drawer / filter-form / form-field / form-section / permission-ux 8 个 .md，4-1 仅用其中 4 个）
- **目录**：[4-1-linear-vue/](./admin-panels/verification/4-1-linear-vue/)

#### 3. SaaS Marketing · 4-2-stripe-landing
- **桌面 1440 full page**：[`stripe-landing-full.png` (1914×6972)](./saas-marketing/verification/4-2-stripe-landing/stripe-landing-full.png)
- **移动 dark hero**：[`stripe-landing-dark.png` (1914×1502)](./saas-marketing/verification/4-2-stripe-landing/stripe-landing-dark.png)
- **附属截图**：[`stripe-landing-hero.png`](./saas-marketing/verification/4-2-stripe-landing/stripe-landing-hero.png) · [`stripe-landing-features.png`](./saas-marketing/verification/4-2-stripe-landing/stripe-landing-features.png) · [`stripe-landing-cta.png`](./saas-marketing/verification/4-2-stripe-landing/stripe-landing-cta.png) · [`stripe-landing-footer.png`](./saas-marketing/verification/4-2-stripe-landing/stripe-landing-footer.png)
- **风格**：Stripe 风格亮色品牌站（5+ 页：home / products / pricing / customers / about；React 19 + 原生 CSS）
- **Token namespace**：原生 CSS 局部 token（不强制走 token-bridge）
- **目录**：[4-2-stripe-landing/](./saas-marketing/verification/4-2-stripe-landing/)（README 为默认 Vite 模板，待补项目说明）

#### 4. Landing Pages · 5-1-resend-landing
- **桌面 1440×900 full page**：[`landing-1440.png` (1432×5451)](./landing-pages/verification/5-1-resend-landing/screenshots/landing-1440.png)
- **移动 390×844 full page**：[`landing-390.png` (382×7700)](./landing-pages/verification/5-1-resend-landing/screenshots/landing-390.png)
- **风格**：Resend 风格暖色单页 · Inter 字体 / mac 终端窗口 / 软阴影 / 8 节流：Hero → Social Proof → Features → Pricing → FAQ → Final CTA → Footer
- **Token namespace**：`land-`
- **组件契约数**：4（hero-cta / feature-row / testimonial-logos / pricing-simple）
- **详细**：[README.md](./landing-pages/verification/5-1-resend-landing/README.md)

#### 5. Landing Pages · 5-2-vercel-landing
- **桌面 full page**：[`desktop.png` (2864×7956)](./landing-pages/verification/5-2-vercel-landing/screenshots/desktop.png)
- **移动 full page**：[`mobile.png` (984×13532)](./landing-pages/verification/5-2-vercel-landing/screenshots/mobile.png)
- **风格**：Vercel 风格暗色渐变单页 · Geist 字体 / 3 档 surface（`#0a0a0a` / `#111` / `#1a1a1a`）/ 三段渐变 blue→purple→pink / 5 组件含 CodeDemo + Footer
- **Token namespace**：`lp-vercel-`
- **组件契约数**：5（5-1 基础上 + CodeDemo + Footer）
- **详细**：[README.md](./landing-pages/verification/5-2-vercel-landing/README.md)

#### 6. AI Products · 6-1-cursor-ide
- **桌面 1440×900**：[`ide-1440.png` (2880×1606)](./ai-products/verification/6-1-cursor-ide/screenshots/ide-1440.png)
- **移动 390×844**：[`ide-390.png` (1000×1606)](./ai-products/verification/6-1-cursor-ide/screenshots/ide-390.png)
- **风格**：Cursor 风格暗色 AI IDE · 3 面板 `[FileExplorer | EditorView | ChatPanel]` / 6 组件契约 / tool-call 透明卡 / VSCode 窗口控件
- **Token namespace**：`ai-`
- **组件契约数**：6（chat-stream / citation-source / message-bubble / model-selector / prompt-composer / tool-call-card）
- **详细**：[README.md](./ai-products/verification/6-1-cursor-ide/README.md)

#### 7. AI Products · 6-2-vercel-ai-playground
- **桌面 full page**：[`desktop.png` (2880×1494)](./ai-products/verification/6-2-vercel-ai-playground/screenshots/desktop.png)
- **移动 full page**：[`mobile.png` (1000×1494)](./ai-products/verification/6-2-vercel-ai-playground/screenshots/mobile.png)
- **风格**：Vercel AI Playground 风格亮色单聊 · Geist 字体 / 4 组件：TopBar / ModelSelector / MessageList / ChatInput / 渐变发送按钮
- **Token namespace**：`ai-vercel-`
- **组件契约数**：4（与 6-1 共享 message-bubble 等，专注单聊面板）
- **详细**：[README.md](./ai-products/verification/6-2-vercel-ai-playground/README.md)

#### 8. Mobile Web · mobile-1-x-like-feed
- **桌面 1280×800**：[`desktop-1280.png` (1280×1907)](./mobile-web/verification/mobile-1-x-like-feed/screenshots/desktop-1280.png)
- **移动 390×844 @2x**：[`mobile-390.png` (780×4078)](./mobile-web/verification/mobile-1-x-like-feed/screenshots/mobile-390.png)
- **风格**：X (Twitter) 风格暗色移动 H5 · iOS 安全区适配 / 4 组件：StatusBar / TopAppBar / FeedCard / BottomTabBar / 8 张推文卡（文字/认证/emoji 附件/数据 4 联）
- **Token namespace**：`mob-`
- **组件契约数**：4（bottom-tab-bar / mobile-form-input / mobile-modal / touch-gesture-handler）
- **详细**：[README.md](./mobile-web/verification/mobile-1-x-like-feed/README.md)

#### 8.5. Mobile Web · mobile-2-x-instagram-stories
- **桌面 1280×800**：[`desktop-1280.png` (1280×1907)](./mobile-web/verification/mobile-2-x-instagram-stories/screenshots/desktop-1280.png)
- **移动 390×844 @2x**：[`mobile-390.png` (780×4078)](./mobile-web/verification/mobile-2-x-instagram-stories/screenshots/mobile-390.png)
- **风格**：Instagram 风格浅色移动 H5（#0095f6 IG 蓝 / #ed4956 红心）· 顶部 Stories 横向 ring + 垂直 1:1 图片流 + 5 tab 底部（Home/Search/Add/Reels/Profile）
- **Token namespace**：`mob-`（IG light palette）
- **组件契约数**：4（共享 mobile-1 的 4 组件）
- **详细**：[README.md](./mobile-web/verification/mobile-2-x-instagram-stories/README.md)

#### 8.6. Mobile Web · mobile-3-x-airbnb-bottom-sheet
- **桌面 1280×800**：[`desktop-1280.png` (1280×1907)](./mobile-web/verification/mobile-3-x-airbnb-bottom-sheet/screenshots/desktop-1280.png)
- **移动 390×844 @2x**：[`mobile-390.png` (780×4078)](./mobile-web/verification/mobile-3-x-airbnb-bottom-sheet/screenshots/mobile-390.png)
- **风格**：Airbnb 风格浅色移动 H5（#ff385c Rausch 珊瑚红）· 顶部搜索框 + 4 category chips + 220px map placeholder + Bottom Sheet 抽屉（65vh 展开）+ 5 tab 底部带中央浮动搜索按钮
- **Token namespace**：`mob-`（Airbnb light palette）
- **组件契约数**：4 + 1 BottomSheet 抽屉交互
- **详细**：[README.md](./mobile-web/verification/mobile-3-x-airbnb-bottom-sheet/README.md)

#### 9. Native App · native-1-ios-settings
- **桌面 1440×900**：[`native-1-ios-desktop-1440.png`](./native-app/verification/native-1-ios-settings/native-1-ios-desktop-1440.png)（手机框居中 + 桌面 panel 背景）
- **移动 390×844 full page**：[`native-1-ios-mobile-390.png`](./native-app/verification/native-1-ios-settings/native-1-ios-mobile-390.png)（iOS 17 设置中心首屏：状态栏 + 大标题"Settings" + Profile 卡 + 飞行模式/Wi-Fi/蓝牙/蜂窝 + NOTIFICATIONS section + 底部 5 tab）
- **风格**：iOS 17 HIG 浅色（`#007aff` systemBlue + `#f2f2f7` secondarySystemBackground + `-apple-system` SF Pro 字体）· Inset Grouped 列表（10pt 圆角 section 容器）/ 6 section × 14 行 / 5 核心组件契约 1:1 落地
- **Token namespace**：`nat-`（`nat-bg` / `nat-accent` / `nat-success` / `nat-press` 动画等 32 个工具类）
- **组件契约数**：5（StatusBar / AppBarHeader / ListRow / NativeTabBar / ActionSheet，对应 native-app/component-contract/ 的 5 份 markdown）
- **详细**：[README.md](./native-app/verification/native-1-ios-settings/README.md)

#### 10. Native App · native-2-android-material-you
- **桌面 1440×900**：[`native-2-android-desktop-1440.png`](./native-app/verification/native-2-android-material-you/native-2-android-desktop-1440.png)（手机框居中 + 桌面 panel 背景）
- **移动 390×844 full page**：[`native-2-android-mobile-390.png`](./native-app/verification/native-2-android-material-you/native-2-android-mobile-390.png)（M3 Inbox 首屏：状态栏 24dp + 64dp TopAppBar "Inbox" 大标题 + 5 颗 Quick Action Chip + 5 行 ListRow 卡片 + 56dp FAB 右下浮动 + 80dp NavigationBar 5 tab）
- **风格**：Material 3 浅色 + 动态色（`#6750a4` primary + `#eaddff` primarySoft + `#fef7ff` bg + 完整 surface ladder + Roboto 字体）· FAB / Modal Bottom Sheet / 80dp NavigationBar pill 指示器 / 5 核心组件契约与 native-1 共享
- **Token namespace**：`nat-`（沿用 native-1 命名空间，34 个工具类）—— **与 native-1 形成"同一组件契约，两套平台 Token"对照参考**
- **组件契约数**：5（StatusBar / AppBarHeader / ListRow / NativeTabBar / ActionSheet，M3 适配版）
- **详细**：[README.md](./native-app/verification/native-2-android-material-you/README.md)

#### 11. Premium Showcase · ps-1-tesla-cinematic
- **桌面 1440 full page**：[`ps-1-tesla-desktop-1440.png`](./premium-showcase/verification/ps-1-tesla-cinematic/ps-1-tesla-desktop-1440.png)（Tesla Model X cinematic scroll：全屏 Hero + 4 段 feature-row 左右交替 + Mono spec + masonry gallery + 询价式 footer）
- **移动 390 full page**：[`ps-1-tesla-mobile-390.png`](./premium-showcase/verification/ps-1-tesla-cinematic/ps-1-tesla-mobile-390.png)（5 段 cinematic scroll · OLED 暗色 + 电光蓝 `#0A84FF` 强调）
- **风格**：Tesla 风格 OLED 暗色 cinematic long-scroll · 摄影 70-90% viewport / Serif 主导（Tiempos / GT Sectra）+ Sans 副（Söhne）+ Mono 数字 spec（GT America Mono）/ 极简 CTA（1-2 个 / 全页）/ 慢 easing（1.2s `ps-fade-up` + 0.8s `ps-fade-in`）/ 极宽留白（section-y 120-200px）
- **Token namespace**：`ps-auto-`（`ps-auto-bg #000000` / `ps-auto-surface-1/2/3` 暗色三档 / `ps-auto-accent #0A84FF` 电光蓝 / `ps-auto-text-dim` 极弱次要信息，34 个工具类）
- **组件契约数**：5（HeroCta / FeatureRow / SpecSheet / ImageGallery / FooterCta，对应 premium-showcase/component-contract/ 的 5 份 markdown）
- **详细**：[README.md](./premium-showcase/verification/ps-1-tesla-cinematic/README.md)

#### 12. Premium Showcase · ps-2-apple-vision-pro
- **桌面 1440 full page**：[`ps-2-visionpro-desktop-1440.png`](./premium-showcase/verification/ps-2-apple-vision-pro/ps-2-visionpro-desktop-1440.png)（Apple Vision Pro spatial UI：全屏 Hero + 4 段 feature-row 左右交替 + Mono spec + masonry gallery + 询价式 footer）
- **移动 390 full page**：[`ps-2-visionpro-mobile-390.png`](./premium-showcase/verification/ps-2-apple-vision-pro/ps-2-visionpro-mobile-390.png)（5 段 cinematic scroll · **light 主题** + 浅灰 `#F5F5F7` + 玻璃质感 `glass-ps` backdrop-blur 20px + 空间立体阴影 `spatial-ps`）
- **风格**：Apple Vision Pro 风格 light 主题 + 玻璃质感 + 空间立体阴影 · 与 ps-1（OLED 暗色 + 电光蓝）形成"暗 vs 亮 / 汽车 vs 消费电子"对照 / 字体 SF Pro Display + SF Pro Text + SF Mono / 极简 CTA（1-2 个 / 全页）/ 慢 easing（1.1s `ps-fade-up` + 0.8s `ps-fade-in`）/ 极宽留白（section-y 96-200px）
- **Token namespace**：`ps-auto-`（**与 ps-1 共享命名空间**，但 light 主题：`ps-auto-bg #FFFFFF` / `ps-auto-bg-elevated #FAFAFA` / `ps-auto-surface-1/2/3` 浅灰三档 / `ps-auto-accent #1D1D1F` 近黑 / `ps-auto-text-primary #1D1D1F` 24 个工具类）
- **组件契约数**：5（HeroCta / FeatureRow / SpecSheet / ImageGallery / FooterCta — 与 ps-1 同 5 件套）
- **schema 横扩**：v1.7 新增 [`../../../premium-showcase/component-contract/premium-showcase-token.schema.json`](../../../premium-showcase/component-contract/premium-showcase-token.schema.json)（ps-1 / ps-2 的 token.json 都引用此 schema）
- **品牌参考**：[Apple Vision Pro](https://www.apple.com/vision-pro/) + AirPods Max + HomePod + B&O Beoplay + Sonos Era
- **详细**：[README.md](./premium-showcase/verification/ps-2-apple-vision-pro/README.md)（v1.7 待建）

---

## 🧭 AI Agent 决策树

新来一个需求时，按以下顺序加载 references：

```
1. 需求 → PHASE 1 (需求定义)
   ↓
2. 风格选型 → brand-library/INDEX.md 选 3-5 个参考品牌 → 读 DESIGN.md
   ↓
3. 视觉/排版/性能/SEO 等通用方法论 → methodology/INDEX.md
   ↓
4. 想看"成品长啥样" → 本页 § 🎨 截图册 → 跳到对应 verification README
   ↓
5. 编码 → token-mapping/ → token.json → 进入 PHASE 4
```

> ⚠️ **不要先看截图，再选品牌**。截图是"风格已定之后的成品参考"，不是"风格选型的入口"。

---

## 📊 汇总（v1.7 · 14 项真·全绿零警告）

| 类别 | 子项 | 通过 | 警告 | 失败 | 桌面 | 移动 |
|---|---|---|---|---|---|---|
| dashboards | — | 26 | 0 | 0 | ✅ | ✅ |
| admin-panels | — | 16 | 0 | 0 | ✅ | ✅ |
| saas-marketing | — | 10 | 0 | 0 | ✅ | ✅ |
| landing-pages | 5-1 | 23 | 0 | 0 | ✅ | ✅ |
| landing-pages | 5-2 | 25 | 0 | 0 | ✅ | ✅ |
| ai-products | 6-1 | 22 | 0 | 0 | ✅ | ✅ |
| ai-products | 6-2 | 23 | 0 | 0 | ✅ | ✅ |
| mobile-web | mobile-1 | 22 | 0 | 0 | ✅ | ✅ |
| mobile-web | mobile-2 | 22 | 0 | 0 | ✅ | ✅ |
| mobile-web | mobile-3 | 22 | 0 | 0 | ✅ | ✅ |
| native-app | native-1 | 23 | 0 | 0 | ✅ | ✅ |
| native-app | native-2 | 23 | 0 | 0 | ✅ | ✅ |
| premium-showcase | ps-1 | 25 | 0 | 0 | ✅ | ✅ |
| **premium-showcase** | **ps-2** | **25** | **0** | **0** | **✅** | **✅** |
| **合计（14 项）** | — | **307** | **0** | **0** | **13✅** | **13✅** |
