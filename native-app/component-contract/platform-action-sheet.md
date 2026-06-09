# Component Contract · Platform Action Sheet

> 平台弹层：iOS Action Sheet / Android Modal Bottom Sheet 的统一抽象。
> 跨端实现用 RN ActionSheetIOS / RN `react-native-action-sheet` / Flutter `showModalBottomSheet`。

---

## 1. 用途

| 平台 | 原生组件 | 出现场景 |
|---|---|---|
| iOS | `UIAlertController` (`.actionSheet` 风格) | 选项 ≤ 6 个 + Cancel |
| Android | `BottomSheetDialog` (Material) | 选项 ≤ 8 个 + 拖拽 handle |
| RN | `ActionSheetIOS` (iOS) / `BottomSheet` (Android) | 平台分支 |

> **不要与 `Modal`（全屏弹窗）混淆**：Action Sheet 是**轻量选项面板**，用户必须选一项或点取消。

---

## 2. 结构

### 2.1 iOS Action Sheet

```
┌─────────────────────────────────┐  ← 圆角 14pt 顶部
│  ⚠️  标题（粗体）                 │     背景 rgba(248,248,248,0.95)
│  描述（次级灰）                   │     模糊效果 (Frosted Glass)
├─────────────────────────────────┤
│  📷  拍照                  ← row │  ← 56pt 高
│  🖼️  从相册选择            ← row │
│  📄  从文件选择            ← row │
├─────────────────────────────────┤
│         取消（CANCEL）           │  ← 加粗 + 12pt 间距
└─────────────────────────────────┘
       ⌃ 8pt home indicator
```

### 2.2 Android Bottom Sheet (Modal)

```
┌─────────────────────────────────┐  ← 圆角 28dp 顶部
│           ━━━                    │  ← 4dp × 32dp handle 灰色
│  选项标题                        │
├─────────────────────────────────┤
│  📷  拍照                  ← row │  ← 56dp 高
│  🖼️  从相册选择            ← row │
│  📄  从文件选择            ← row │
│  ───────────                    │  ← divider
│  取消                            │  ← 次级颜色
└─────────────────────────────────┘
       ⌃ 24dp gesture bar
```

---

## 3. 关键尺寸

| 维度 | iOS | Android M3 |
|---|---|---|
| 圆角顶部 | **14pt** | **28dp** |
| 选项行高 | **56pt** | **56dp** |
| 最小触摸目标 | 44pt | 48dp（FAB 56dp） |
| 标题字号 | 13pt 粗 | 14sp Medium |
| 描述字号 | 13pt 常规 | 12sp Regular |
| 取消按钮间距 | 12pt | 16dp |
| Handle 宽度 | n/a | 32dp |
| Handle 颜色 | n/a | `#79747E` 40% alpha |
| 背景模糊 | 必需（iOS 9+） | 可选 |
| 底部安全区 | 8pt (home indicator) | 24dp (gesture bar) |

---

## 4. 配色

### iOS

```css
background: rgba(248, 248, 248, 0.95);   /* 模糊背景 */
text-primary:   #000000;                  /* label */
text-secondary: #3C3C43;                  /* secondaryLabel */
text-destructive: #FF3B30;                /* systemRed */
text-cancel:    #007AFF;                  /* systemBlue + bold */
divider:        rgba(60, 60, 67, 0.29);   /* opaqueSeparator */
```

### Android

```css
background: #FFFBFE;                      /* surface */
text-primary:   #1C1B1F;                  /* onSurface */
text-secondary: #49454F;                  /* onSurfaceVariant */
text-destructive: #B3261E;                /* error */
text-cancel:    #49454F;
divider:        #CAC4D0;                  /* outlineVariant */
handle:         #79747E66;                /* onSurfaceVariant 40% */
```

---

## 5. 行为规范

| 行为 | iOS | Android |
|---|---|---|
| **打开** | 弹簧动画（spring damping 0.85）从底部上滑 400ms | 缓动 250ms cubic-bezier(0.2, 0, 0, 1) |
| **关闭** | 下滑 300ms ease-out | 下滑 200ms ease-out |
| **点击选项** | 立即关闭 + 触发回调 | 立即关闭 + 触发回调 |
| **点击外部** | 关闭（dimiss） | 下滑关闭（不点外部） |
| **滑动关闭** | 不可 | **可**（沿 handle 下滑） |
| **超 6 项** | 滚动列表 | 滚动列表 |
| **破坏性操作** | 红色字（仅 iOS 明确） | 次级色 + 位置靠下 |
| **Haptic** | selection feedback（轻） | 无 / ripple |

---

## 6. 可访问性

- **VoiceOver / TalkBack**：每个选项必须标注 "按钮，标签" + 选中后朗读结果
- **Dynamic Type / Font Scale**：标题字号支持用户字号缩放
- **键盘导航**：蓝牙键盘 Tab 切换 + Enter 触发
- **Reduce Motion**：系统设置开启后，用淡入淡出替代滑动

---

## 7. 常见反模式

| ❌ 反模式 | ✅ 正解 |
|---|---|
| 选项 > 8 个仍用 Action Sheet | 改用 full-screen list page |
| 把"删除账户"放成普通行 | 用 destructive 样式（红字） + 二次确认 |
| iOS 选项字重和取消字重相同 | 取消按钮粗体 + 12pt 间距分隔 |
| Android 无 handle bar | 必须有，平台规范 |
| 暗色模式未走 system 配色 | 用 `UIColor.dynamicProvider` / M3 `surfaceContainer` |
| 弹层内有 input 输入框 | 改用全屏 modal，弹层内不可输入 |
| 弹层嵌套弹层 | 用栈式管理，第 2 个 Action Sheet 关闭前不显示第 3 个 |

---

## 8. 跨端实现片段

### React Native (官方)

```tsx
import { ActionSheetIOS, Platform } from 'react-native'

function showShareSheet() {
  if (Platform.OS === 'ios') {
    ActionSheetIOS.showActionSheetWithOptions(
      { options: ['拍照', '从相册', '取消'], cancelButtonIndex: 2 },
      (idx) => console.log('选', idx)
    )
  } else {
    // Android 用 @gorhom/bottom-sheet
    SheetManager.show('share-sheet')
  }
}
```

### Flutter

```dart
showModalBottomSheet(
  context: context,
  shape: const RoundedRectangleBorder(
    borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
  ),
  builder: (ctx) => Column(
    mainAxisSize: MainAxisSize.min,
    children: [
      Container(
        width: 32, height: 4, margin: const EdgeInsets.symmetric(vertical: 12),
        decoration: BoxDecoration(
          color: Theme.of(ctx).colorScheme.onSurfaceVariant.withOpacity(0.4),
          borderRadius: BorderRadius.circular(2),
        ),
      ),
      ListTile(title: const Text('拍照'), onTap: () => Navigator.pop(ctx, 'camera')),
      ListTile(title: const Text('从相册'), onTap: () => Navigator.pop(ctx, 'album')),
    ],
  ),
)
```

---

## 9. Web Verification 落点

> 本 skill 的 native-app verification 用 Vite + Vue 3 + 移动 390 视口模拟。
>
> 模拟方式：
> - iOS：直接渲染 iOS HIG 弹层样式（圆角 14pt / 56pt 行高 / home indicator 8pt）
> - Android：渲染 M3 弹层样式（圆角 28dp / 56dp 行高 / handle 32×4 / gesture bar 24dp）
> - 平台切换：通过 `?platform=ios|android` query string 切换样式表

详见 `verification/native-1-ios-settings/README.md`（待建）。
