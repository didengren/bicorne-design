# Component Contract · Native Tab Bar

> 底部导航：iOS UITabBar / Android Bottom Navigation Bar 的统一抽象。
> 跨端实现用 RN `@react-navigation/bottom-tabs` / Flutter `NavigationBar` (M3)。

---

## 1. 用途

| 平台 | 原生组件 | 出现场景 |
|---|---|---|
| iOS | `UITabBar` | 3-5 tab，App 主导航 |
| Android | `NavigationBar` (M3) | 3-5 tab，App 主导航 |
| RN | `@react-navigation/bottom-tabs` | 跨端 |
| Flutter | `NavigationBar` (M3 widget) | 跨端 |

> **不要与 `mobile-web/bottom-tab-bar` 混用**：
> - mobile-web 的 bottom-tab-bar 是 Web 移动端，可自定义 icon / 高度
> - native-app 的 native-tab-bar 必须**严格遵循** HIG / M3 规范，icon / 高度 / 字体都有平台强制值

---

## 2. 结构

### 2.1 iOS UITabBar

```
┌─────────────────────────────────────┐
│ 🏠     🔍     ➕     ❤️     👤      │  ← 49pt（iPhone）
│ 首页   搜索   创建   收藏   我的    │     50pt（iPad）
│                                  ⚙️│     83pt（含 home indicator）
└─────────────────────────────────────┘
         ● home indicator 8pt
```

- 选中态：tint color（默认 systemBlue）+ 实心 icon + 标签高亮
- 未选态：label color secondary + 线条 icon
- 徽章：右上角小红圈 + 数字（99+）
- Active 时有 haptic feedback（selection，**仅切换 tab**时一次）

### 2.2 Android M3 Bottom Navigation

```
┌─────────────────────────────────────┐
│  🏠     🔍     ➕     ❤️     👤     │  ← 80dp
│ 首页   搜索   创建   收藏   我的    │     含 24dp gesture bar
└─────────────────────────────────────┘
         ▁ ▁ gesture bar 24dp
```

- 选中态：secondary container 颜色背景（pill 形 active indicator）
- 未选态：onSurfaceVariant
- 徽章：右上角 6dp 圆点（无数字） / 或数字（18dp 直径起）
- Active indicator：32×32 pill 形，Material 3 标配

---

## 3. 关键尺寸

| 维度 | iOS | Android M3 |
|---|---|---|
| Tab Bar 高度 | **49pt**（不含 home indicator 34pt）| **80dp** |
| Home indicator / gesture bar | 8pt / 34pt（X 及以上）| 24dp |
| Icon 尺寸 | 28×28pt（25pt 推荐） | 24dp |
| Label 字号 | 10pt | 12sp |
| Label 字重 | 选中 600 / 未选 400 | M3 label-medium |
| Active indicator | tintColor 整 icon | 32×32dp pill secondaryContainer |
| Tab 间距 | 系统平均 | 系统平均（flex） |
| 最小触摸目标 | 44pt | 48dp（实际 ≥ 60dp 因为高度 80dp） |
| 最大 tab 数 | 5（多了用 "More" 折叠）| 5（多了用 NavigationRail / Drawer）|

---

## 4. 配色

### iOS

```css
background: rgba(248, 248, 248, 0.92);  /* bar background + 模糊 */
border-top:   0.5pt solid rgba(60, 60, 67, 0.29);  /* hairline */
icon-default:   #3C3C43;                /* secondaryLabel */
icon-selected:  #007AFF;                /* tintColor（可改） */
label-default:  #3C3C43;
label-selected: #007AFF;
badge:          #FF3B30;                /* systemRed */
badge-text:     #FFFFFF;
```

### Android

```css
background: #FFFBFE;                    /* surface */
icon-default:   #49454F;                /* onSurfaceVariant */
icon-selected:  #6750A4;                /* onSecondaryContainer */
active-pill:    #E8DEF8;                /* secondaryContainer */
label-default:  #49454F;
label-selected: #1D192B;                /* onSurface */
badge:          #B3261E;
badge-text:     #FFFFFF;
```

---

## 5. 行为规范

| 行为 | iOS | Android |
|---|---|---|
| **切换 tab** | 立即切换 + 触觉（轻）| 立即切换 + active pill 滑动 200ms |
| **首次进入** | 第一个 tab 默认 active | 第一个 tab 默认 active |
| **状态保持** | 保留 tab 内 stack 滚动位置 | 同上 |
| **未读徽章** | 数字 1-99 / 99+ | 数字 / 红点（无数字） |
| **隐藏 tab bar** | 全屏播放 / 图片浏览时 | 同上 |
| **Haptic** | selection feedback 1 次 | 无（仅视觉） |
| **动画** | 选中态 cross-fade 200ms | active pill 滑动 250ms |

---

## 6. 平台手势冲突

| 场景 | iOS | Android |
|---|---|---|
| **底部上滑** | Tab bar 自动隐藏（部分 App）| 不自动隐藏 |
| **从左边缘右滑** | 触发系统返回（与 webview 返回冲突）| 同上（Android 10+）|
| **Tab 栏长按** | 部分 App 显示快捷菜单 | 触发 tooltip / 快捷菜单 |

---

## 7. 可访问性

- **VoiceOver / TalkBack**：tab 必须有 `accessibilityLabel`，徽章必须朗读"3 条新消息"
- **Reduce Motion**：移除 active pill 滑动动画（Android）
- **Dynamic Type / Font Scale**：label 字号支持用户缩放（12sp → 14sp → 16sp），超 16sp 时 tab bar 高度自适应
- **TalkBack 焦点顺序**：从左到右

---

## 8. 常见反模式

| ❌ 反模式 | ✅ 正解 |
|---|---|
| Tab 数 > 5 | 用 "More" / Drawer / Navigation Rail |
| Tab bar 高度自定 | 严格 49pt / 80dp（平台强制） |
| Tab icon 颜色和 label 颜色不联动 | 用同一 tint color |
| 徽章溢出（> 999）| 显示 "999+" 或 "···" |
| Tab bar 永远显示不隐藏 | 全屏 / 沉浸场景用 `hidesBottomBarWhenPushed` / 滚动隐藏 |
| Android tab bar 用 tint color 整 icon | 用 active pill 包裹 icon |
| 文字 + icon 同时变色 + 字重变化 | iOS 选中态加粗 + 变色 + 实心 icon |
| Tab bar 嵌入 WebView | 用平台原生 |

---

## 9. 跨端实现片段

### React Native

```tsx
<Tab.Navigator
  screenOptions={{
    tabBarActiveTintColor: Platform.OS === 'ios' ? '#007AFF' : '#6750A4',
    tabBarInactiveTintColor: Platform.OS === 'ios' ? '#3C3C43' : '#49454F',
    tabBarStyle: {
      height: Platform.OS === 'ios' ? 83 : 80,
      paddingBottom: Platform.OS === 'ios' ? 28 : 24,
      paddingTop: 8,
    },
    tabBarLabelStyle: { fontSize: Platform.OS === 'ios' ? 10 : 12 },
  }}
>
  <Tab.Screen name="首页" component={Home} options={{ tabBarBadge: 3 }} />
</Tab.Navigator>
```

### Flutter

```dart
NavigationBar(
  height: 80,
  selectedIndex: _index,
  onDestinationSelected: (i) => setState(() => _index = i),
  destinations: const [
    NavigationDestination(icon: Icon(Icons.home_outlined), selectedIcon: Icon(Icons.home), label: '首页'),
    NavigationDestination(icon: Icon(Icons.search), label: '搜索'),
    NavigationDestination(icon: Icon(Icons.add), label: '创建'),
    NavigationDestination(icon: Icon(Icons.favorite_outline), selectedIcon: Icon(Icons.favorite), label: '收藏'),
    NavigationDestination(icon: Icon(Icons.person_outline), selectedIcon: Icon(Icons.person), label: '我的'),
  ],
)
```

---

## 10. 与 mobile-web bottom-tab-bar 的差异

| 维度 | mobile-web | native-app |
|---|---|---|
| 高度 | 灵活（48-60px） | 49pt / 80dp 强制 |
| Icon 颜色 | Tailwind 自定义 | 平台 tint 颜色（系统色）|
| 选中态 | 加粗 / 变色 / scale | iOS tint / M3 active pill |
| Haptic | 无 | 切换轻触觉（iOS）|
| 模糊背景 | 可选 | iOS 强制 / Android 视主题 |
| 徽章 | 灵活（数字 / 文字）| 数字 / 99+ / 红点 |
| 触摸目标 | 44px（HIG 借鉴）| 44pt / 48dp（平台强制）|

---

## 11. Web Verification 落点

> 本 skill 的 native-app verification 用 Vite + Vue 3 + 移动 390 视口模拟。
>
> 模拟方式：
> - iOS：5 tab × 49pt + home indicator 34pt = 83pt
> - Android：5 tab × 80dp（含 gesture bar 24dp）
> - 平台切换：通过 `?platform=ios|android` query string 切换样式

详见 `verification/native-1-ios-settings/README.md`（待建）。
