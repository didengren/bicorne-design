# Native App — Meta Prompt (PHASE 4 预检清单)

> 本文件是 PHASE 4 实施前**必读**的预检清单。AI agent 在生成任何 native-app 组件 / 页面 / token 前，必须先回答下列问题，并明确写出来。

---

## 0. 三问（必答）

> 不确定就**问用户**，不要猜。

### Q1. 平台选型

| 平台 | 触发信号 | 必走路径 |
|---|---|---|
| **iOS only** | "只做 iPhone" / "iPadOS" / "上架 App Store" | HIG + SwiftUI / RN ios target |
| **Android only** | "只做安卓" / "Google Play" | Material 3 + Compose / RN android target |
| **iOS + Android 双端** | "全平台" / "App Store + Google Play" | RN / Flutter 跨端，token 平台分支 |
| **先 iOS 后 Android** | "MVP 先 iOS" | iOS HIG 主，Android 复用骨架 |
| **先 Android 后 iOS** | "安卓市场优先" | Material 3 主，iOS 复用骨架 |

### Q2. 跨端框架

| 框架 | 选 | 不选 |
|---|---|---|
| **React Native** | 团队熟 JS / 需快速双端 / Expo | — |
| **Flutter** | 团队不熟 native / UI 一致性 100% 重要 | — |
| **Swift + Kotlin 双套** | 极致性能 / 平台特定 API 多 | 团队规模小 / 时间紧 |
| **KMP（Kotlin Multiplatform）** | 业务逻辑共享 / UI 走 Compose Multiplatform | — |

### Q3. 验证载体（本 skill 范围）

> 本 skill 的 verification **跑在 Web**（Vite + Vue 3 + 移动 390 viewport），用于在 Web 端快速预览原生 App 形态。
>
> | 情况 | 选 |
> |---|---|
> | 团队**有** RN / Flutter 工程 | 用真机 / 模拟器截图，README 链回工程 |
> | 团队**无** RN / Flutter 工程 / 纯 PM 评审 | 用本 skill Web verification（推荐） |

---

## 1. PHASE 1-3 通用方法论加载

> 这些**与本类别无关**，按 references/INDEX.md 决策树顺序加载即可。

- [x] references/INDEX.md § 🧭 AI Agent 决策树
- [x] references/brand-library/ — 选 1 个 iOS 风格（如 Apple HIG 蓝 / Linear 紫）+ 1 个 Android 风格（如 Material You 动态色）
- [x] references/methodology/typography.md — 字体选型章节含 iOS SF Pro / Android Roboto Flex
- [x] references/methodology/performance-budget.md — 60fps 持续帧 + ≤1.5s 冷启动
- [x] references/token-mapping/mapping-rules.md — token 命名规范

---

## 2. 平台规范加载

> 加载顺序：**先 iOS HIG 后 Material 3**（除非 Q1 已锁定单平台）。

### 2.1 iOS HIG（必读）

| 章节 | URL | 关键规则 |
|---|---|---|
| Foundations | developer.apple.com/design/human-interface-guidelines/foundations | **44pt 最小触摸目标**、**16pt 边距**、**SF Pro** |
| Materials | …/materials | Liquid Glass（iOS 26+）— 透光 / 反射 / 高光 |
| Layout | …/layout | Auto Layout / Safe Area |
| Navigation | …/navigation | Tab bar / Navigation bar / Modal |
| Components | …/components | **Action Sheet / Alert / List / Tab bar** 等 50+ 组件 |

### 2.2 Material 3（必读）

| 章节 | URL | 关键规则 |
|---|---|---|
| Design tokens | m3.material.io/foundations | **Dynamic Color / Shape / Typography** |
| Layout | m3.material.io/layout | Responsive layout grid / Window size class |
| Components | m3.material.io/components | **Bottom sheet / FAB / Top app bar / Navigation bar** 等 |

---

## 3. 平台 token 派生

> 本 skill 的 verification 用 Web token，不依赖平台 SDK。本节给 RN/Flutter 真工程参考。

### 3.1 iOS → token.json

```json
{
  "colors": {
    "bg": "#FFFFFF",                    // systemBackground
    "surface-1": "#F2F2F7",             // secondarySystemBackground
    "surface-2": "#FFFFFF",
    "accent": { "primary": "#007AFF" }, // systemBlue
    "danger":  { "primary": "#FF3B30" }, // systemRed
    "label":   { "primary": "#000000" }, // label
    "label-secondary": "#3C3C43"        // secondaryLabel
  },
  "spacing": { "1": 4, "2": 8, "3": 12, "4": 16, "5": 20, "6": 24 },
  "radius":  { "sm": 8, "md": 12, "lg": 16, "xl": 20, "pill": 9999 },
  "touch":   { "min": 44 }             // HIG 强制
}
```

### 3.2 Android Material 3 → token.json

```json
{
  "colors": {
    "bg": "#FFFBFE",                    // surface
    "surface-1": "#F7F2FA",
    "primary": "#6750A4",               // primary (种子色，紫)
    "on-primary": "#FFFFFF",
    "primary-container": "#EADDFF",
    "secondary": "#625B71",
    "danger": "#B3261E",
    "outline": "#79747E"
  },
  "shape":   { "xs": 4, "sm": 8, "md": 12, "lg": 16, "xl": 28, "full": 9999 },
  "spacing": { "1": 4, "2": 8, "3": 12, "4": 16, "5": 20, "6": 24 },
  "touch":   { "min": 48 }             // M3 强制（48dp）
}
```

### 3.3 平台触摸目标强约束

| 平台 | 最小触摸目标 | 来源 |
|---|---|---|
| iOS | **44pt × 44pt** | HIG Accessibility |
| Android | **48dp × 48dp** | M3 Accessibility |
| Material You FAB | 56dp 默认 / 96dp Extended | M3 Components FAB |
| iOS Tab Bar | 49pt + 83pt（含 home indicator） | HIG Tab Bar |

---

## 4. 实施 checklist

> 在写第一个组件前必须勾完。

- [ ] **Q1 平台选型** 已答（iOS / Android / 双端）
- [ ] **Q2 跨端框架** 已答（RN / Flutter / Swift+Kotlin）
- [ ] **Q3 验证载体** 已答（真机 / Web verification）
- [ ] **iOS HIG 章节** 已读（仅 iOS 时）
- [ ] **Material 3 章节** 已读（仅 Android 时）
- [ ] **token.json** 已生成（按 § 3.1 或 § 3.2 或 § 3.3 双端分支）
- [ ] **tailwind.config.ts** 平台 namespace 已派生（`ios-` / `m3-` / `rn-` / `fl-`）
- [ ] **5 件套组件**（平台弹层 / 底部 tab / 顶部 app-bar / 列表行 / 推送卡片）已通读
- [ ] **layouts/ 5 个布局** 已通读（master-detail / tab-root / modal-flow / split-view / splash）
- [ ] **pitfalls/ 10 条** 已通读

---

## 5. 不做清单（out of scope）

> 这些**不在本 skill 范围**，需要时另开 skill。

- ❌ iOS / Android SDK 编译 / 打包 / 签名（Xcode / Gradle / Play Console）
- ❌ App Store / Google Play 上架审核细节
- ❌ 推送证书 / APNs / FCM 集成代码
- ❌ Core Data / Room / SQLite 数据库设计
- ❌ 原生动画库（Lottie / Rive）的 `.json` 文件生产
- ❌ 应用图标 / 启动屏资源生产（需设计师 / Sketch / Figma）
- ❌ 国际化（i18n）/ 本地化（l10n）的文案流水线
- ❌ RN / Flutter 工程脚手架搭建（用 `npx react-native init` / `flutter create`）
- ❌ 真机调试 / 性能 profile（Xcode Instruments / Android Studio Profiler）

> 这些都是"工程实施"层，本 skill 专注"设计 / 规范 / 复用"层。
