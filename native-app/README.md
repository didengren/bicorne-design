---
name: native-app
description: Native-app / iOS+Android SDK category workspace — iOS HIG (Human Interface Guidelines), Material 3 (Android), React Native / Flutter token consumption, platform-specific components (ActionSheet, TabBar, AppBar, List, Push). Distinct from mobile-web (mobile-first H5 / PWA) and saas-marketing (desktop-first multi-page).
keywords: native, ios, android, hig, material-3, react-native, flutter, action-sheet, tab-bar, app-bar
---

# Native App — Category Workspace (MVI)

> 本目录是 **Native App / 原生应用** 类别专题：**iOS / Android SDK 应用**（在 App Store / Google Play 发布，**不是 Web 也不是 PWA**）。
>
> **关键区分**：Native App 是 platform-specific 原生应用（iOS HIG + Material 3 设计语言 + RN/Flutter token 消费）；Mobile Web 是 mobile-first Web 站点（mobile-first + 触摸 + PWA）；SaaS Marketing 是 desktop-first 多页品牌站。
> 边界详见 [../saas-marketing/README.md § 与 mobile-web/native-app 的边界](../saas-marketing/README.md)

---

## 何时进入本目录

| 信号 | 必读路径 |
|---|---|
| 用户说"做一个 iOS App / Android App / 原生应用 / RN App / Flutter App" | 本目录 |
| 需要 **iOS HIG**（Human Interface Guidelines）规范 | 本目录 |
| 需要 **Material 3**（Android 最新设计语言）规范 | 本目录 |
| **React Native** / **Flutter** 项目（消费 token 跑在原生壳） | 本目录 |
| App Store / Google Play 上架 | 本目录 |
| mobile-first H5 / 移动 Web | 不要来，去 `../mobile-web/` |
| 桌面优先（desktop 设计先于 mobile） | 不要来，去 `../saas-marketing/` |
| 单页营销 | `../landing-pages/` |
| 后台 / 大屏 | `../admin-panels/` `../dashboards/` |

---

## 通用方法论（跨类别）

| 主题 | 通用层文件 | 本类别文件 |
|---|---|---|
| Typography | [`../references/methodology/typography.md`](../references/methodology/typography.md) | iOS / Android 字体规范（SF Pro / Roboto Flex / Dynamic Type） |
| 性能预算 | [`../references/methodology/performance-budget.md`](../references/methodology/performance-budget.md) | 60fps 持续帧 + 启动 ≤1.5s 冷启动 |
| 暗色模式 | （待抽取） | system theme 跟随 + 高对比度 |
| 无障碍 | （待抽取） | Dynamic Type / TalkBack / VoiceOver |
| 📚 方法论总索引 | [`../references/methodology/INDEX.md`](../references/methodology/INDEX.md) | — |

---

## 与其他类别的边界

| 维度 | Native App (本目录) | Mobile Web | SaaS Marketing |
|---|---|---|---|
| 平台 | **iOS + Android 双套** | 一套 Web | 一套 Web |
| 设计语言 | **HIG + Material 3** | mobile-first | desktop-first |
| 导航 | **iOS TabBar / Android Bottom Nav** | Bottom tab bar | Top nav |
| 触摸交互 | **多点 + 传感器** | tap/swipe/pinch | 鼠标 + 触摸 |
| 性能 | **60fps 持续 + ≤1.5s 冷启动** | 3G 弱网 | 4G/5G |
| 离线 | **原生** | PWA (Service Worker) | 弱 |
| App Store | **必需** | 不在 | 不可 |
| 推送 | **完整（iOS APNs / Android FCM）** | Web Push (受限) | Web Push (受限) |
| 安装 | App Store / APK | URL 访问 | URL 访问 |
| 跨平台实现 | RN / Flutter / Swift + Kotlin | Vue / React | Vue / React |

---

## 目录结构（MVI）

```
native-app/
├── README.md                       ← 你在这里
├── meta-prompt.md                  ← PHASE 4 预检：平台选型 / HIG vs Material 3 / RN 框架
│
├── # 组件层（native-app 核心 5 件套）
├── component-contract/
│   ├── platform-action-sheet.md    ★ 平台弹层（iOS Action Sheet / Android Modal Bottom Sheet）
│   ├── native-tab-bar.md           ★ 底部导航（iOS TabBar / Android Bottom Nav · 平台高度 49-80dp）
│   ├── app-bar-header.md           ★ 顶部导航（iOS NavBar / Android TopAppBar · back 按钮 + large title）
│   ├── native-list-row.md          ★ 列表行（48-56dp 最小触摸目标 · chevron / switch / 副标题）
│   └── push-notification-card.md   ★ 推送通知（横幅样式 · action 按钮 · 12 字标题规则）
│
├── # 布局层
├── layouts/
│   ├── l1-list-detail.md           ★ iOS 主从（master-detail）/ Android 单页
│   ├── l2-tab-root.md              ★ 底部 tab + 嵌套 stack（与 mobile-web bottom-tab 差异）
│   ├── l3-modal-flow.md            ★ 表单模态（iOS full-screen modal / Android Dialog）
│   ├── l4-split-view.md            ★ iPadOS / Android Tablet split-view 适配
│   └── l5-splash-onboarding.md     ★ 启动屏 + 引导页
│
└── # 经验层
    └── pitfalls/                   ★ native-app 常见反模式（10 条）
        └── README.md
```

---

## Native App 骨架

iOS / Android 自上而下：

```
iOS (iPhone 15 Pro)              Android (Pixel 8)
┌──────────────────────┐         ┌──────────────────────┐
│ ◀ Back   Title   ⋯   │ 44pt    │ ← Title    ⋮         │ 64dp
├──────────────────────┤         ├──────────────────────┤
│                      │         │                      │
│   <Page content>     │         │   <Page content>     │
│   ├─ List / Card     │         │   ├─ List / Card     │
│   └─ Form / Modal    │         │   └─ FAB / Snackbar  │
│                      │         │                      │
├──────────────────────┤         ├──────────────────────┤
│ 🏠  🔍  ➕  👤  ⚙️   │ 49pt+83 │ 🏠  🔍  ➕  👤       │ 80dp
│   Tab Bar (5 tab)    │         │   Bottom Nav (4 tab) │
├──────────────────────┤         ├──────────────────────┤
│   ●●●●  Home indic.  │ 8pt     │   ▁ ▁ ▁  Gesture     │ 24dp
└──────────────────────┘         └──────────────────────┘
```

---

## 平台 Token namespace

| 平台 | 推荐框架 | Token prefix | 主色基调 | 字体 |
|---|---|---|---|---|
| iOS | SwiftUI / RN | `ios-` | 系统蓝 `#007AFF` | SF Pro / SF Pro Display |
| Android | Compose / Flutter | `m3-` | Dynamic Color (Material You) | Roboto Flex |
| RN 跨端 | React Native | `rn-` | 平台二选一（iOS / Android） | 平台默认 |
| Flutter 跨端 | Flutter | `fl-` | Material 3 ColorScheme.fromSeed | Roboto / SF (平台) |

---

## Verification 索引

> **v1.6 状态**：2 个真实项目已建仓（iOS HIG + Material 3 对照），`e2e --category native-app` 双跑 20/0/0，`e2e --category all` 含 native-app|native-1 + native-app|native-2 共 2 项 23/0/0。
> 共享 5 组件契约（StatusBar / AppBarHeader / ListRow / NativeTabBar / ActionSheet），但**Token namespace 与平台绑定**：`nat-` (iOS palette, 32 工具类) vs `nat-` (M3 palette, 34 工具类)。
> 共享命名空间 `nat-` —— 与 iOS / M3 命名空间解耦，方便 PM 一眼区分"组件契约 vs 平台实现"。
> **v1.6 起与 premium-showcase 共享 `nat-` ↔ `ps-auto-` 命名空间策略**：都是"组件契约前缀 vs 平台/类别前缀"模式，可作为"原生 vs 高端展示"对照参考。

| Verification | 平台 | 主题 | 桌面 1440 | 移动 390 | e2e | Token 命名空间 |
|---|---|---|---|---|---|---|
| [native-1-ios-settings](./verification/native-1-ios-settings/) | iOS 17+ HIG | 设置中心（Inset Grouped 6 section × 14 行） | [1440](./verification/native-1-ios-settings/native-1-ios-desktop-1440.png) | [390](./verification/native-1-ios-settings/native-1-ios-mobile-390.png) | 23/0/0 | `nat-`（iOS palette，32 工具类）|
| [native-2-android-material-you](./verification/native-2-android-material-you/) | Android 14+ M3 | 邮箱 Inbox（FAB + Modal Bottom Sheet + 80dp NavigationBar） | [1440](./verification/native-2-android-material-you/native-2-android-desktop-1440.png) | [390](./verification/native-2-android-material-you/native-2-android-mobile-390.png) | 23/0/0 | `nat-`（M3 palette，34 工具类）|

---

## 平台对照（iOS HIG vs Android Material 3）

> **核心立场**：5 个核心组件契约**形态一致**（StatusBar / AppBarHeader / ListRow / NativeTabBar / ActionSheet），但**尺寸、Token、动效、状态栏位置四维度都不同**。本表是 PM 评审双平台时的速查表。

| 维度 | iOS HIG (native-1) | Android Material 3 (native-2) |
|---|---|---|
| **设计哲学** | Depth + Clarity + Deference（深度感） | Material You + Dynamic Color + 卡片化 |
| **状态栏** | 44pt（含 safe-area-inset-top） | 24dp（顶左对齐时钟） |
| **顶部导航** | 44pt + Large Title 34pt（可下拉收起） | 64dp + Large Title 22pt（`variant: small\|large`）|
| **底部导航** | 49pt TabBar + 8pt home indicator | 80dp NavigationBar + 24dp gesture inset |
| **触摸目标** | ≥ 44pt × 44pt（Apple HIG 强制） | ≥ 48dp × 48dp（Material 强制） |
| **List 行高** | 44pt（紧凑） / 56pt（带 leading） | 56dp（统一） |
| **List 分隔线** | 1px inset（无 leading inset 时通栏） | 1px ml-72px（leading icon 后缩进） |
| **浮层** | Action Sheet（14pt 圆角顶部 + 56pt 行高） | Modal Bottom Sheet（28dp 圆角顶部 + 32% 半透明遮罩） |
| **主题色** | systemBlue `#007aff`（固定） | dynamic color `#6750a4`（Material You 派生）|
| **强调色软底** | 无（仅 borderTint） | `primarySoft #eaddff`（chip / FAB 容器） |
| **字体** | `-apple-system, SF Pro` | `Roboto, Roboto Flex` |
| **动效** | 0.25s ease-out（克制） | 0.2s emphasized（Material emphasized easing） |
| **TabBar active** | 系统 tint（图标/文字染色） | 24dp pill 容器（背景色块指示） |
| **FAB** | iOS 不强制；iOS 用工具栏 | 56dp 圆角方块（16dp marginBottom） |
| **Settings 列表** | Inset Grouped（10pt 圆角 section 容器 + secondarySystemBackground） | 无 section 容器，全屏 surface2（plain） |
| **测试机型** | iPhone 15 Pro | Pixel 8 |
| **Token 命名空间** | `nat-` iOS 派生 | `nat-` M3 派生（同 prefix 避免冲突） |

### 平台选型速查（决策树）

```
你的目标平台是？
├─ iPhone/iPad → iOS HIG (native-1 模板)
│  ├─ SwiftUI/UIKit 原生 → 参见 [meta-prompt.md § 平台选型]
│  └─ React Native → iOS HIG Token + ios- 命名空间
├─ Android 手机/平板 → Material 3 (native-2 模板)
│  ├─ Jetpack Compose → 参见 [meta-prompt.md § 平台选型]
│  ├─ Flutter → m3- 命名空间 + ColorScheme.fromSeed
│  └─ React Native → m3- 命名空间
└─ 跨 iOS + Android → 5 核心组件 + 双套 Token
   ├─ React Native → ios- / m3- 双 namespace
   └─ Flutter → Material 3 ColorScheme (平台分发)
```

---

## Verification 计划

| Verification | 平台 | 框架 | 主题 | 状态 |
|---|---|---|---|---|
| [`native-1-ios-settings`](./verification/native-1-ios-settings/) | iOS 17+ | Vue 3 web + 移动 390 模拟 | 设置中心（双列开关 + 列表行） | ✅ v1.4 建仓 |
| [`native-2-android-material-you`](./verification/native-2-android-material-you/) | Android 14+ | Vue 3 web + 移动 390 模拟 | Material 3 动态色（FAB + Bottom Sheet） | ✅ v1.5 建仓 |
| （规划 `native-3`）| VisionOS / HarmonyOS | Vue 3 web + 桌面模拟 | 空间计算（悬浮 panel + 玻璃质感）| 🔴 待建 |

---

## 必读通用方法论清单

按读序：

1. [Typography 通用层](../references/methodology/typography.md) — 字体选型章节含 iOS SF / Android Roboto
2. [性能预算通用层](../references/methodology/performance-budget.md) — 第 3 节"60fps 持续帧"与 native 强相关
3. [Animation Matrix](../dashboards/animation-matrix.md) — 19 条曲线中 iOS Spring / Material emphasized 两条直接可用

---

## 缺失 / 待办（透明说明）

- ✅ **已有 2 个 verification 真实项目**：native-1 (iOS Settings) v1.4 + native-2 (Android Material You) v1.5
- 🟡 **未抽取"暗色模式 / 无障碍"通用方法论**：跨 mobile-web/native-app/dashboards/premium-showcase 4 类别都需要（v1.6→v1.7 候选 D）
- 🟡 **iPadOS / Android Tablet 规范**：仅在 layouts/l4 占位，缺详尽规范
- 🟡 **token 跨平台消费**：本目录 `meta-prompt.md` 给出选型指南；具体实现需 RN/Flutter 项目沉淀
- 🔴 **native-3（VisionOS / HarmonyOS）**：缺空间计算 + 三平台分发模板（v1.6→v1.7 候选 F）
