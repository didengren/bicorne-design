# Component Contract · App Bar / Header

> 顶部导航：iOS UINavigationBar / Android TopAppBar 的统一抽象。
> 跨端实现用 RN `@react-navigation/native-stack`（header 配置）/ Flutter `AppBar`。

---

## 1. 用途

| 平台 | 原生组件 | 出现场景 |
|---|---|---|
| iOS | `UINavigationBar` | 任何非首页都需 back 按钮 + 标题 |
| Android | `TopAppBar` (M3) | 任何非首页都需 back 按钮 + 标题 + 滚动折叠 |
| RN | `@react-navigation/native-stack` | 跨端 |
| Flutter | `AppBar` / `LargeAppBar` | 跨端 |

> **三种高度**：
> - 紧凑（compact）：iOS 44pt / Android 64dp
> - 常规（standard）：iOS 44pt / Android 64dp（默认）
> - 大标题（large）：iOS 96pt / Android 112dp（首页 / 内容消费页）

---

## 2. 结构

### 2.1 iOS UINavigationBar（compact）

```
┌─────────────────────────────────────┐
│ ◀ Back    Title 标题     ⋯ More   │  ← 44pt
└─────────────────────────────────────┘
```

- 左侧：back 按钮（chevron + 上一页标题，可隐藏）
- 中间：标题（17pt 粗体，截断省略号）
- 右侧：action 按钮（≤ 2 个，icon / 文字）
- 背景：半透明（模糊 + 0.92 alpha）

### 2.2 iOS UINavigationBar（large title）

```
┌─────────────────────────────────────┐
│                       ⋯  ⌕         │  ← 44pt 紧凑栏
├─────────────────────────────────────┤
│                                      │
│  标题（34pt 粗体）                    │  ← 大标题区
│                                      │
└─────────────────────────────────────┘
```

- 滚动时：大标题平滑过渡为紧凑栏标题（spring 动画）
- 触发条件：内容滚动 > 标题高度 / 2

### 2.3 Android TopAppBar (M3)

```
┌─────────────────────────────────────┐
│ ← 标题                              │  ← 64dp
└─────────────────────────────────────┘
```

- 左侧：navigation icon（← 箭头 / ≡ hamburger）
- 中间：title（22sp Medium）
- 右侧：actions（≤ 3 个 icon）
- 滚动时：可折叠为 compact（48dp）+ 出现 elevation 4

### 2.4 Android TopAppBar (Large / Medium)

```
┌─────────────────────────────────────┐
│  ⌕                                  │  ← 152dp
│  标题（28sp）                        │
│  副标题                              │
└─────────────────────────────────────┘
```

- Medium：112dp（标题 + 副标题）
- Large：152dp（首屏 + 滚动折叠）

---

## 3. 关键尺寸

| 维度 | iOS | Android M3 |
|---|---|---|
| 紧凑高度 | **44pt** | **64dp** |
| 大标题高度 | **96pt** | Large 152dp / Medium 112dp |
| Back icon 尺寸 | 24×24pt（chevron） | 24dp |
| 标题字号 | 17pt 粗体 | 22sp Medium |
| 大标题字号 | 34pt 粗体 | 28sp Regular |
| 副标题字号 | n/a | 14sp Regular |
| 边距 | 16pt 水平 | 16dp 水平 |
| Action icon 间距 | 16pt | 16dp |
| 背景 | rgba(248,248,248,0.92) 模糊 | surface solid |
| 分隔线 | 滚动时显示 0.5pt hairline | 滚动时显示 elevation 4 |
| Status bar 处理 | 包含（不占内容）| 包含（不占内容）|

---

## 4. 配色

### iOS

```css
background: rgba(248, 248, 248, 0.92);  /* 模糊 */
back-chevron: #007AFF;                  /* systemBlue */
title:        #000000;                  /* label */
action:       #007AFF;                  /* systemBlue */
destructive:  #FF3B30;                  /* systemRed */
divider:      rgba(60, 60, 67, 0.29);   /* hairline（滚动时）*/
```

### Android

```css
background: #FFFBFE;                    /* surface */
nav-icon:    #1C1B1F;                   /* onSurface */
title:       #1C1B1F;
subtitle:    #49454F;                   /* onSurfaceVariant */
action:      #1C1B1F;
container:   #EADDFF;                   /* primaryContainer (selected action) */
divider:     #CAC4D0;                   /* outlineVariant */
elevation-4: shadow 0 4dp 8dp rgba(0,0,0,0.1);
```

---

## 5. 行为规范

| 行为 | iOS | Android |
|---|---|---|
| **Back 按钮** | 左上 chevron + 上页标题（隐可）| 左上 ← 箭头 |
| **点击 back** | 上一页（pop）+ 横向左滑动画 | 上一页（pop）+ 横向左滑动画 |
| **边缘右滑返回** | 启用（iOS 标配）| Android 10+ 启用 |
| **滚动折叠** | 大标题 → 紧凑（spring 400ms）| TopAppBar elevation 4 出现 |
| **Action 点击** | 无 ripple + 触发回调 | Ripple 反馈 + 触发回调 |
| **Haptic** | 选中反馈（轻）| 无（仅 ripple）|
| **Title 截断** | 居中省略号 | 左侧省略号（RTL 反转）|

---

## 6. 平台特定行为

### iOS
- **大标题**（Large Title）默认关闭，可在 navigation 配置启用
- **搜索栏**（Search Bar）可嵌入 navigation bar，向上滑动隐藏
- **ScrollEdgeAppearance** 控制滚动到顶部时的样式（透明 / 实色）

### Android
- **TopAppBar variants**：
  - `CenterAlignedTopAppBar`（标题居中）
  - `SmallTopAppBar`（64dp 默认）
  - `MediumTopAppBar`（112dp）
  - `LargeTopAppBar`（152dp 滚动折叠）
- **BottomAppBar**（底部）：FAB 嵌入底部 + bottom navigation 风格

---

## 7. 可访问性

- **VoiceOver / TalkBack**：back 按钮朗读"返回"（iOS 自动 / Android 需 `contentDescription`）
- **Title**：自动朗读（屏幕中央元素优先）
- **Action buttons**：必须标注 `accessibilityLabel`（如"更多" / "分享"）
- **Reduce Motion**：折叠动画用淡入淡出

---

## 8. 常见反模式

| ❌ 反模式 | ✅ 正解 |
|---|---|
| Action > 3 个 | 用 "更多" 折叠菜单（`...`） |
| Title 太长（> 20 字符）| 截断 / 副标题承载 |
| iOS back 按钮永远显示"返回" | 应是"chevron + 上页标题"（可关）|
| Android 用汉堡按钮 ≡ 触发 drawer | 主页用汉堡，二级页用 ← |
| 大标题 + 大量 actions 一起 | 大标题页通常隐藏 actions，紧凑栏显示 |
| Status bar 文字色未适配背景 | 浅色背景用 dark content；深色背景用 light content |
| 滚动折叠不流畅 | 用 `transitionSpec` / `nestedScrollConnection` |

---

## 9. 跨端实现片段

### React Native

```tsx
<Stack.Navigator
  screenOptions={{
    headerStyle: Platform.OS === 'ios'
      ? { backgroundColor: 'rgba(248,248,248,0.92)' }  // iOS 模糊（需 blurView 库）
      : { backgroundColor: '#FFFBFE', elevation: 0 },
    headerTitleStyle: Platform.OS === 'ios'
      ? { fontSize: 17, fontWeight: '600' }
      : { fontSize: 22, fontWeight: '500' },
    headerTintColor: Platform.OS === 'ios' ? '#007AFF' : '#1C1B1F',
    headerBackTitle: ' ',  // iOS 不显示上页标题文字
  }}
>
  <Stack.Screen
    name="详情"
    component={Detail}
    options={{
      title: '详情',
      headerLargeTitle: Platform.OS === 'ios',  // iOS 大标题
      headerRight: () => <Button title="分享" onPress={share} />,
    }}
  />
</Stack.Navigator>
```

### Flutter

```dart
AppBar(
  leading: IconButton(
    icon: const Icon(Icons.arrow_back),
    onPressed: () => Navigator.pop(context),
  ),
  title: const Text('详情'),
  actions: [
    IconButton(icon: const Icon(Icons.share), onPressed: share),
    IconButton(icon: const Icon(Icons.more_vert), onPressed: more),
  ],
)

// 大标题（滚动折叠）
SliverAppBar.large(
  title: const Text('收件箱'),
  pinned: true,
  expandedHeight: 152,
)
```

---

## 10. Web Verification 落点

> 本 skill 的 native-app verification 用 Vite + Vue 3 + 移动 390 视口模拟。
>
> 模拟方式：
> - iOS：紧凑 44pt / 大标题 96pt / 状态栏 44pt
> - Android：紧凑 64dp / 中 112dp / 大 152dp
> - 滚动折叠：JS 监听 scroll 事件，class 切换实现动画

详见 `verification/native-1-ios-settings/README.md`（待建）。
