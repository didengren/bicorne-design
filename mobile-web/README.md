---
name: mobile-web
description: Mobile-web / mobile-first H5 category workspace — mobile-first responsive design, touch gestures, bottom tab bar, PWA. Distinct from saas-marketing (desktop-first multi-page) and native-app (iOS/Android SDK).
keywords: mobile, h5, mobile-web, mobile-first, pwa, touch, bottom-tab-bar
---

# Mobile Web — Category Workspace (MVI)

> 本目录是 **Mobile Web / 移动 H5** 类别专题：**mobile-first Web 应用**（跑在 mobile browser / PWA，**不在 app store**）。
>
> **关键区分**：Mobile Web 是 mobile-first Web 站点（mobile 优先设计 + 触摸交互 + PWA）；SaaS Marketing 是 desktop-first 多页品牌站；Native App 是 iOS/Android SDK 应用。
> 边界详见 [../saas-marketing/README.md § 与 landing-pages/mobile-web/native-app 的边界](../saas-marketing/README.md)

---

## 何时进入本目录

| 信号 | 必读路径 |
|---|---|
| 用户说"做一个 H5 / 移动端站点 / 移动 Web 应用 / 公众号网页 / 小程序 Web 版" | 本目录 |
| **mobile-first**（mobile 设计先于 desktop） | 本目录 |
| PWA（Progressive Web App）需求 | 本目录 |
| 强调"触摸交互 / 手势 / bottom tab" | 本目录 `pitfalls/` |
| 桌面优先（desktop 设计先于 mobile） | 不要来，去 `../saas-marketing/` |
| iOS / Android 原生应用 | 不要来，去 `../native-app/` |
| 单页营销 | `../landing-pages/` |
| 后台 / 大屏 | `../admin-panels/` `../dashboards/` |

---

## 通用方法论（跨类别）

| 主题 | 通用层文件 | 本类别文件 |
|---|---|---|
| 响应式降级 | [`../references/methodology/responsive-degradation.md`](../references/methodology/responsive-degradation.md) | — |
| 字体加载策略 | [`../references/methodology/font-loading-strategy.md`](../references/methodology/font-loading-strategy.md) | iOS 16px 阈值（mobile 专属） |
| 性能预算 | [`../references/methodology/performance-budget.md`](../references/methodology/performance-budget.md) | 3G 弱网目标 |
| Typography | [`../references/methodology/typography.md`](../references/methodology/typography.md) | 9.8 节 mobile 适配 |
| 📚 方法论总索引 | [`../references/methodology/INDEX.md`](../references/methodology/INDEX.md) | — |

---

## 与其他类别的边界

| 维度 | Mobile Web (本目录) | SaaS Marketing | Native App |
|---|---|---|---|
| 设计起点 | **mobile-first** | desktop-first | platform-specific |
| 导航 | **Bottom tab bar** | Top nav | Platform HIG/Material |
| 触摸交互 | **核心**（手势/滑动/长按） | 鼠标 + 触摸 | 多点触摸 + 传感器 |
| 性能 | 3G 弱网 | 4G/5G | 原生性能 |
| 离线 | **PWA (Service Worker)** | 弱 | 原生 |
| App Store | **不在** | 不可 | 必需 |
| 跨平台 | 一套 Web 代码 | 一套 Web 代码 | iOS + Android 双套 |
| 安装 | URL 访问 | URL 访问 | App Store |
| 推送 | Web Push (受限) | Web Push (受限) | 完整 |

---

## 目录结构（MVI）

```
mobile-web/
├── README.md                       ← 你在这里
├── meta-prompt.md                  ← PHASE 4 预检：mobile-first 决策 / 设备支持 / 触摸 / PWA
│
├── # 组件层（mobile-web 核心 4 件套）
├── component-contract/
│   ├── bottom-tab-bar.md           ★ 底部 4-5 tab 导航（mobile nav 替代品）
│   ├── mobile-modal.md             ★ 移动弹层（与 desktop modal 区别：底部弹出 vs 居中）
│   ├── touch-gesture-handler.md    ★ 手势识别（tap/swipe/pinch/long-press）
│   └── mobile-form-input.md        ★ mobile 输入控件（iOS 16px 阈值 / 数字键盘 / autocomplete）
│
└── # 经验层
    └── pitfalls/                    ★ mobile-web 常见反模式
        └── README.md
```

> 与 saas-marketing 区别：本目录**只 4 个组件**（mobile 核心）；saas-marketing 是 7+ 个（多页 + 跨页面一致）。

---

## Mobile-First 骨架

mobile-web 页面**自上而下**：

```
┌─────────────────────────────────────┐
│ <Status Bar overlay>                │  ← iOS notch / Android status bar
│ <Top app bar>                       │  ← Logo / Back / Action
├─────────────────────────────────────┤
│ <Page content>                      │  ← 主内容
│  ├─ Pull-to-refresh                 │
│  ├─ 列表 / 卡片 / 表单              │
│  └─ ...                             │
├─────────────────────────────────────┤
│ <Bottom tab bar>                    │  ← 4-5 tab（mobile 核心导航）
├─────────────────────────────────────┤
│ <Home indicator overlay>            │  ← iOS home indicator（<8px 透明区）
└─────────────────────────────────────┘
```

---

## Mobile 必备设计原则

### 1. Touch Target

- **最小 44×44 pt**（Apple HIG）
- **推荐 48×48 dp**（Material Design）
- 间距 ≥ 8dp（避免误触）

### 2. iOS 16px 阈值

- body **必须 ≥ 16px**（iOS Safari 缩放）
- form input 16px 必填（iOS auto-zoom 防护）

### 3. 滚动

- **Momentum scrolling**: `-webkit-overflow-scrolling: touch`（iOS）
- **下拉刷新**（pull-to-refresh）：自定义需禁用浏览器默认
- **overscroll-behavior: contain**（防滚动穿透）

### 4. 视口

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```

- `viewport-fit=cover`：iOS notch / safe area
- 配合 `env(safe-area-inset-*)` 使用

### 5. Safe Area

```css
.app-bar {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
}
```

### 6. 网络

- **3G 弱网目标**（Lighthouse mobile）
- **离线优先**（Service Worker + Cache API）

### 7. 手势

- tap（点击）
- swipe（滑动）
- pinch（捏合缩放）
- long-press（长按）
- 避免与浏览器默认手势冲突（iOS back swipe）

---

## 首选品牌参考

| 品牌 | 风格 | 适用 |
|---|---|---|
| Instagram | 底部 tab + story | 社交 / 内容 |
| Twitter (X) | 底部 tab + pull-to-refresh | 社交 / Feed |
| Airbnb | 底部 tab + 全屏 modal | 旅游 / 预约 |
| Spotify | 底部 mini-player + 全屏播放 | 媒体 / 内容 |
| Uber | 全屏 single-purpose | 工具 / 即时 |
| Notion Mobile | 顶部 + 底部 + 抽屉 | 工具 / 内容 |

---

## 与通用层的关系

| 内容 | 归属 |
|---|---|
| Token | `../templates/light-theme.template.json` 或 `dark-theme.template.json` |
| 响应式断点 | `../references/methodology/responsive-degradation.md` |
| 字体加载 | `../references/methodology/font-loading-strategy.md` |
| 性能预算 | `../references/methodology/performance-budget.md`（mobile 目标更严） |

---

## 建设优先级

| 任务 | 优先级 | 状态 |
|---|---|---|
| ✅ 占位 README | P0 | done（升级为 MVI） |
| ✅ meta-prompt.md | P0 | done（MVI） |
| ✅ 4 个核心组件契约 | P0 | done（MVI） |
| ✅ pitfalls/ 8-10 条 | P0 | done（MVI） |
| 第 1 个 verification（mobile-web 站点） | P1 | 0.5-1d |
| 响应式断点速查 | P2 | — |
| 离线 PWA 策略 | P2 | — |
