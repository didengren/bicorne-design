# Native App · Component Contract Index

> 本目录是 native-app 类别的**组件契约**集：5 个核心组件，每个组件含结构 / 尺寸 / 配色 / 行为 / 反模式 / 跨端代码。

---

## 5 件套组件

| # | 组件 | 用途 | 平台 | RN 库 | Flutter widget |
|---|---|---|---|---|---|
| 1 | [**Platform Action Sheet**](./platform-action-sheet.md) | 选项弹层（拍照/分享等） | iOS Action Sheet / Android Bottom Sheet | `ActionSheetIOS` / `@gorhom/bottom-sheet` | `showModalBottomSheet` |
| 2 | [**Native Tab Bar**](./native-tab-bar.md) | 底部主导航（3-5 tab） | iOS TabBar / Android Bottom Nav | `@react-navigation/bottom-tabs` | `NavigationBar` (M3) |
| 3 | [**App Bar / Header**](./app-bar-header.md) | 顶部导航 + back + 标题 | iOS NavBar / Android TopAppBar | `@react-navigation/native-stack` | `AppBar` / `SliverAppBar.large` |
| 4 | [**Native List Row**](./native-list-row.md) | 列表行（设置 / 列表 / 表单） | iOS UITableViewCell / Android RecyclerView item | `FlatList` / `SectionList` | `ListView` + `ListTile` |
| 5 | [**Push Notification Card**](./push-notification-card.md) | 系统推送（横幅 / 抽屉） | iOS Banner / Android Notification | `notifee` / `@react-native-firebase/messaging` | `flutter_local_notifications` |

---

## 跨端决策矩阵

| 场景 | 必读组件 | 注意 |
|---|---|---|
| **设置页** | List Row + App Bar | 列表行 60pt/72dp + Inset Grouped 圆角 |
| **首页 / Feed** | Tab Bar + List Row + App Bar（large） | 5 tab + 滚动折叠标题 |
| **详情页** | App Bar（compact）+ List Row | 严格 back 按钮 + 标题截断 |
| **表单** | List Row（with Switch / 输入框） + Action Sheet | 输入框用 inset grouped 圆角 |
| **分享 / 操作** | Action Sheet | 平台分支（iOS Action Sheet / Android Bottom Sheet）|
| **系统通知** | Push Notification Card | 标题 ≤ 12 字 + 1-2 个 actions |

---

## 与 mobile-web 组件的关键差异

| 维度 | mobile-web | native-app |
|---|---|---|
| **底部导航** | `bottom-tab-bar.md` 灵活 | `native-tab-bar.md` **49pt / 80dp 强制** |
| **顶部导航** | 自定义 TopAppBar | `app-bar-header.md` **44pt / 64dp 强制** |
| **列表行** | 自由高度 | `native-list-row.md` **44-88pt 强制** |
| **弹层** | Modal（居中 / 底部） | `platform-action-sheet.md` **平台分支** |
| **通知** | Web Push（受限） | `push-notification-card.md` **系统级** |

> **不要复用 mobile-web 组件**给 native-app 项目 —— 平台规范的细节差异常导致"看起来像但用起来别扭"。

---

## 选型决策树

```
开始
├─ 用户在 App 内（前台 / 后台）
│  ├─ 选项 ≤ 8 个 → Action Sheet
│  ├─ 选项 > 8 → 全屏 List Page
│  └─ 表单输入 → 全屏 Modal
└─ 用户不在 App 内
   ├─ 重要（订单/聊天）→ Push Notification
   └─ 营销 → 通知中心 / 站内消息
```
