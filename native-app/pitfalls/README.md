# Native App · Pitfalls (10 条反模式)

> native-app 类别常见 10 条反模式，按"必避 / 高频 / 隐蔽"排序。
> 每条含 ❌ 反模式 + ✅ 正解 + 💥 后果 3 段。

---

## P-1. 触摸目标 < 44pt / 48dp

> 平台强约束，**最易触犯**

### ❌ 反模式
- 列表行高度 40pt
- 按钮 padding `8px 12px`（实际触摸 < 40pt）
- 图标按钮 24×24dp 无 padding

### ✅ 正解
- iOS 列表行 ≥ **44pt**（plain）/ **60pt**（inset grouped）
- Android 列表行 ≥ **56dp**（one-line）/ **72dp**（two）/ **88dp**（three）
- 图标按钮外加透明 hit area：24dp icon + 12dp padding = 48dp hit area

### 💥 后果
- Apple 审核被拒（"Insufficient touch target"）
- 用户误触 → 操作失败 → 卸载
- 无障碍评级降低（WCAG 2.5.5 Target Size AAA 44×44）

---

## P-2. iOS 状态栏 / Android Navigation Bar 与内容重叠

> **必避**。未处理安全区 = 标题被刘海 / 状态栏文字遮挡

### ❌ 反模式
```css
.page { padding-top: 0; }  /* 状态栏文字压在内容上 */
```

### ✅ 正解
- iOS：UIViewController 启用 `automaticallyAdjustsScrollViewInsets`（默认开）
- Android：`fitsSystemWindows="true"` 或 `WindowCompat.setDecorFitsSystemWindows(false)` + `WindowInsetsCompat`
- React Native：`SafeAreaView` / `react-native-safe-area-context`
- Flutter：`SafeArea(top: true, bottom: true)`

### 💥 后果
- 标题被刘海遮挡
- 底部按钮被 home indicator / gesture bar 遮挡
- Android 全面屏出现"白边 / 黑边"问题

---

## P-3. Android 3-button navigation / 手势条未预留空间

> **易遗漏**。Android 设备底部空间差异大（48-72dp）

### ❌ 反模式
- Bottom Navigation 高度固定 80dp，未给 gesture bar 留 24dp
- 在 gesture bar 上方放可点击元素

### ✅ 正解
- Bottom Navigation 总高度 80dp（含 24dp gesture bar 空间）
- 内容区 `padding-bottom: 24dp`（gesture bar）
- iOS X 及以上：底部 34pt home indicator 空间

### 💥 后果
- Pixel / Samsung 设备上底部按钮被手势遮挡
- 全屏弹层 / Toast 被手势条遮挡

---

## P-4. 字体未跟随系统 Dynamic Type / Font Scale

> **隐蔽**。开启"大字体"后布局崩坏

### ❌ 反模式
```css
.title { font-size: 17pt; }  /* 固定字号 */
height: 44pt;  /* 固定高度，字体变大后溢出 */
```

### ✅ 正解
- iOS：用 `UIFont.preferredFont(forTextStyle: .body)` 而非 `UIFont.systemFont(ofSize: 17)`
- Android：字号用 `sp` 而非 `dp`
- React Native：`<Text allowFontScaling>` + 容器用 `flex` 不固定 `height`
- Flutter：`TextStyle` 默认支持 textScaleFactor

### 💥 后果
- 老年用户 / 视障用户无法使用
- App Store / Play Store 无障碍评级低
- 文字截断 → 用户读不到完整信息

---

## P-5. 推送通知无 action 按钮 / 标题 > 12 字

> **必避**。通知是用户与 App 的高频触点

### ❌ 反模式
- 标题 "您的订单已发货，预计送达时间为今天下午 3 点 - 5 点之间"（28 字）
- 通知仅 "Open" 一个 action，无法快速操作
- 营销推送每日 5+ 条

### ✅ 正解
- **标题 ≤ 12 字**（避免截断）："订单已发货"
- **内容 ≤ 4 行**（iOS）/ **1-2 行**（Android 折叠）
- **提供 1-2 个 quick actions**："查看订单" / "标记已读"
- **每日 ≤ 2 条营销推送**

### 💥 后果
- 标题截断 → 用户看不到重点
- 用户关闭通知权限 → DAU 暴跌
- iOS 15+ `UNNotificationContent` 限制超严格

---

## P-6. 暗色模式未走 system theme

> **高频**。用户开启暗色后 App 仍亮白刺眼

### ❌ 反模式
- 颜色硬编码 `#FFFFFF` / `#000000`
- 无 `prefers-color-scheme` 媒体查询
- 通知背景未切换 dark

### ✅ 正解
- iOS：`UIColor.dynamicProvider` / Asset Catalog Dark variant
- Android：values-night/ 资源 / Material 3 `ColorScheme.fromSeed` + `brightness: .dark`
- React Native：`Appearance.getColorScheme()` / `useColorScheme()`
- Flutter：`ThemeMode.system` + `ThemeData.dark()`

### 💥 后果
- 用户开启暗色后 App 闪眼 → 卸载
- App Store / Play Store 暗色模式被点名为反例
- 电量消耗高（OLED 设备亮底屏）

---

## P-7. 列表滚动卡顿（> 16ms 帧）

> **高频**。60fps = 每帧 16.67ms

### ❌ 反模式
- 列表项 layout 在 onBind 重新计算（Android 未用 ViewHolder）
- 图片未异步加载 / 未压缩
- 列表项内含 WebView / 视频
- 阴影 / 圆角每帧重绘

### ✅ 正解
- Android：`RecyclerView.ViewHolder` + `setIsRecyclable`
- iOS：`UITableViewCell` 复用 + `prepareForReuse`
- React Native：`FlatList` + `getItemLayout` + `keyExtractor` + 图片 `lazy`
- Flutter：`ListView.builder` + `const` widget + 图片 `cached_network_image`
- 阴影 / 圆角避免运行时重计算

### 💥 后果
- 滚动卡顿 → 用户体验差
- 电量消耗大
- 高端机也救不回来（架构问题）

---

## P-8. 平台手势冲突（边缘返回 / 全局滑动）

> **隐蔽**。手势冲突 = 用户预期和 App 行为不一致

### ❌ 反模式
- 列表左右滑切换 tab（与 iOS 边缘返回冲突）
- 横向 carousel 与 Tab 切换冲突
- WebView 内滑动与外层 scroll 冲突

### ✅ 正解
- iOS 边缘右滑返回：**预留 30pt 左侧区域**给系统
- 横向 carousel 顶部加 `pointer-events: none` 让出边缘
- WebView 禁用外层 swipe-back
- 冲突区域用 `gestureHandler` 显式声明（`react-native-gesture-handler`）

### 💥 后果
- 用户想"返回"却切换了 tab / 关闭了 App
- carousel 切换一半被系统返回打断
- WebView 滑动卡顿 / 死循环

---

## P-9. iPad / Android Tablet split-view 未适配

> **高频**。iPad 占比越来越高，Android Tablet 仍是 Android M3 必检

### ❌ 反模式
- iPad 强制全屏，未启用 `UISplitViewController`
- Tablet 仍按手机布局（左列表 + 右详情挤一起）
- 横屏未做适配（按钮被刘海遮挡）

### ✅ 正解
- iOS：`UISplitViewController` 三栏（sidebar / primary / secondary）
- iOS：声明 `Requires Full Screen = NO`
- Android：响应式布局 + Window Size Class
- React Native：`useWindowDimensions` 监听断点
- Flutter：`LayoutBuilder` + `MediaQuery.of(context).size.width`

### 💥 后果
- iPad 用户强行双击 home 缩放使用
- 评分低："iPad 适配差"
- Android Tablet 失去市场（教育 / 企业市场重镇）

---

## P-10. 软键盘弹出未调整布局

> **隐蔽**。iOS / Android 行为不一致

### ❌ 反模式
- 底部 fixed 按钮被键盘遮挡
- 输入框被键盘遮挡，看不到当前输入
- 滚动到底部时键盘弹出后 input 不可见

### ✅ 正解
- iOS：自动行为（`contentInsetAdjustmentBehavior`）
- Android：`adjustResize` / `windowSoftInputMode="adjustResize"`
- React Native：`KeyboardAvoidingView` + `behavior="padding"`（iOS）/`"height"`（Android）
- Flutter：`Scaffold(resizeToAvoidBottomInset: true)`
- 关键 input 点击后**自动 scroll into view**

### 💥 后果
- 用户看不到自己输入的内容
- 提交按钮被遮挡 → 用户无法完成流程
- 体验差 → 投诉

---

## 附录：必做 / 必查 checklist

> 新 native-app 项目上线前必查：

- [ ] 所有触摸目标 ≥ 44pt / 48dp
- [ ] iOS SafeArea / Android `fitsSystemWindows` 全部启用
- [ ] 暗色模式全功能适配（颜色 / 图片 / 阴影）
- [ ] 推送通知有 1-2 个 quick actions + 标题 ≤ 12 字
- [ ] 列表滚动 60fps（profile 后无掉帧）
- [ ] 软键盘弹出后 input + 提交按钮都可见
- [ ] iPad / Tablet split-view 适配
- [ ] Dynamic Type / Font Scale 字体支持
- [ ] 边缘返回 / 手势冲突全部处理
- [ ] 系统状态栏 / 导航栏文字色适配（dark content vs light content）

---

## v2.11 同步新增（2 条 · 字体 + a11y）

### 11. native-1 / native-2 字体 `@latest` 引用 + iOS system font 冲突（v2.11 B 方案前置）
**问题**：native-1 (iOS) / native-2 (Android) 用 `<link href="https://fonts.googleapis.com/css2?family=Inter@latest">` 后，build 后字体 src 404，浏览器/WebView 回退到 iOS `-apple-system`（SF Pro）或 Android `Roboto`，与品牌 DESIGN.md 字体策略不一致。

**原因**：`@latest` 不是 Google Fonts 合法语法。

**修复**：
- 显式字重：`family=Inter:wght@400;500;600;700&display=swap`
- 用 `scripts/download-fonts.sh`（v2.12 新增）批量下载到 `public/fonts/`
- iOS 端用 `@font-face` 覆盖 `-apple-system`（保留 SF Pro 作为 monospace fallback）
- Android 端用 `@font-face` 覆盖 `Roboto`
- 必读 [`../../scripts/download-fonts.sh`](../../scripts/download-fonts.sh)

### 12. native-1 / native-2 装饰性状态栏 / icon 缺 `alt="decorative"` 触发 e2e H-3 alt 警告（v2.11 同步）
**问题**：native-1 (iOS Settings) / native-2 (Material You Inbox) 的状态栏 / 应用图标 / 装饰性 logo 未标 `alt="decorative"`，e2e a11y H-3 alt 0 检查输出 warn。

**原因**：原生应用模拟页用 `<img src="statusbar.png">` 模拟 iOS 状态栏，未标装饰性 alt。

**修复**：
- 装饰性状态栏：``<img src="statusbar.png" alt="decorative" aria-hidden="true" width="0" height="0" style="display:none">`（1x1 透明 size=0）
- 信息性 app icon：`<img src="app-icon.png" alt="设置应用">`（必须 alt 不为空）
- v2.11 后：native-1 / native-2 0 warn · 总 19 → 8
- 必读 [`../component-contract/app-bar-header.md` § 3. status bar a11y](../component-contract/app-bar-header.md)
