# Component Contract · Native List Row

> 列表行：iOS UITableViewCell / Android RecyclerView item 的统一抽象。
> 跨端实现用 RN FlatList / SectionList / Flutter ListView + ListTile。

---

## 1. 用途

| 平台 | 原生组件 | 出现场景 |
|---|---|---|
| iOS | `UITableViewCell` (inset grouped / plain) | 设置页 / 列表 / 表单 |
| Android | RecyclerView item | 设置页 / 列表 / 表单 |
| RN | `FlatList` / `SectionList` | 跨端 |
| Flutter | `ListView` + `ListTile` | 跨端 |

> **核心原则**：列表行 = 一行 = 一个原子操作单位。**不要在一行里塞两个可点击区域**（除明确"行 + trailing button"）。

---

## 2. 结构

### 2.1 iOS Inset Grouped（设置页标准）

```
┌─────────────────────────────────┐
│ 👤 头像  Zhang San              │
│         zhangsan@example.com  ⓘ │  ← 60pt 高
└─────────────────────────────────┘
        ↑ 16pt 边距 + 圆角 10pt
```

- 左：leading element（icon 28×28pt / avatar 60×60pt）
- 中：title（17pt 常规）+ subtitle（13pt 次级，可选）
- 右：trailing element（chevron / switch / value / detail）
- 整行点击区域 ≥ 44pt

### 2.2 iOS Plain（列表标准）

```
┌─────────────────────────────────┐
│ 📧  收件箱              3       │  ← 44pt
│     5 分钟前                    │  ← subtitle 15pt
└─────────────────────────────────┘
```

- 顶/底无 padding
- separator hairline 0.5pt（rgba 60,60,67,0.29）

### 2.3 Android List Item (M3)

```
┌─────────────────────────────────┐
│ [icon]  Title                 ▶ │
│         Subtitle                │  ← 56dp
└─────────────────────────────────┘
```

- 容器：stateLayer 8dp 圆角（按下时显示）
- leading：icon 24dp / avatar 40dp
- trailing：icon / text / switch
- 整行点击 ripple 反馈

### 2.4 Android Two-line / Three-line

```
┌─────────────────────────────────┐
│ Title (16sp Medium)             │
│ Subtitle (14sp Regular)         │  ← 72dp
│ Supporting text (12sp)          │  ← 88dp
└─────────────────────────────────┘
```

---

## 3. 关键尺寸

| 维度 | iOS | Android M3 |
|---|---|---|
| **一行高度** | **44pt** (plain) / **60pt** (inset) | **56dp** (one-line) / **72dp** (two) / **88dp** (three) |
| 最小触摸目标 | 44pt | 48dp |
| Icon 尺寸 | 28×28pt (列表) / 60×60pt (头像) | 24dp / 40dp (头像) |
| Title 字号 | 17pt 常规 | 16sp Medium |
| Subtitle 字号 | 15pt 次级 | 14sp Regular |
| Supporting text | n/a | 12sp |
| 水平 padding | 16pt (inset 20pt) | 16dp |
| 行间距 / separator | 0.5pt hairline | 1dp solid / stateLayer 8dp 圆角 |
| Avatar 尺寸 | 60×60pt (列表) | 40dp (列表) / 56dp (设置) |
| 圆角 | 10pt (inset grouped) | 8dp (list item) / 4dp (list item v2) |

---

## 4. 配色

### iOS

```css
background: #FFFFFF;                   /* listBackground */
separator: rgba(60, 60, 67, 0.29);     /* opaqueSeparator */
title:    #000000;                     /* label */
subtitle: #3C3C43;                     /* secondaryLabel (60% alpha) */
chevron:  #C7C7CC;                     /* tertiaryLabel */
icon:     #8E8E93;                     /* systemGray */
pressed:  #D1D1D6;                     /* systemGray5 0.5s */
```

### Android

```css
background: #FFFBFE;                   /* surface */
title:    #1C1B1F;                     /* onSurface */
subtitle: #49454F;                     /* onSurfaceVariant */
icon:     #49454F;
trailing: #49454F;
stateLayer: #6750A4;                   /* primary 8% alpha 按下 */
ripple:     #6750A4;                   /* primary 16% alpha */
divider:  #CAC4D0;                     /* outlineVariant */
```

---

## 5. 变体

### 5.1 Leading 变体

| 类型 | iOS | Android M3 |
|---|---|---|
| **无 leading** | 默认 | 默认 |
| **小 icon** | 28×28pt 灰 | 24dp primary tint |
| **彩色 icon 圆背景** | 30×30pt 圆 + 8pt padding | 40×40dp 圆 primaryContainer |
| **Avatar** | 60×60pt 圆 | 40dp 圆 |
| **Checkmark** | 22×22pt 蓝 | 24dp primary |

### 5.2 Trailing 变体

| 类型 | iOS | Android M3 |
|---|---|---|
| **Chevron ›** | 14×14pt 灰 | 18dp onSurfaceVariant |
| **Switch** | 51×31pt 蓝 | 52×32dp Material switch |
| **Value text** | 17pt 次级 | 14sp 次级 |
| **Detail value** | 13pt + 详情按钮 | n/a |
| **Badge** | 红圈 22pt + 数字 | 6dp 红点 / 数字徽章 |
| **i-button ⓘ** | 22pt 蓝圆 | 24dp onSurfaceVariant |

### 5.3 Title-only / Subtitle / Three-line

按内容复杂度选：

- **One-line**：标题（17pt / 16sp）
- **Two-line**：标题 + 副标题（15pt / 14sp）
- **Three-line**：标题 + 副标题 + supporting（iOS 用 13pt 灰 / Android 12sp）

---

## 6. 行为规范

| 行为 | iOS | Android |
|---|---|---|
| **点击** | 触发回调 / push 详情页 | 触发回调 / 跳转 + ripple |
| **滑动删除** | 红色 destructive 按钮 + Delete | SwipeToDismiss + Snackbar 撤销 |
| **滑动操作** | leading: more / trailing: delete | leading: archive / trailing: delete |
| **多选** | 左侧出现圆圈 | 长按进入多选模式 |
| **拖动排序** | 长按抖动 + grabber | 长按 + drag handle |
| **下拉刷新** | `UIRefreshControl` | `SwipeRefreshLayout` |
| **上拉加载** | footer spinner | footer progress |

---

## 7. 平台手势冲突

| 场景 | 处理 |
|---|---|
| 列表左右滑动 | 列表 vs 系统返回（iOS 边缘右滑 / Android 10+）|
| 列表 vs Pull-to-refresh | 顶部禁用 swipe（只允许下拉）|
| 列表 vs Tab 切换 | 列表顶部边缘 `pointer-events: none` |

---

## 8. 可访问性

- **VoiceOver / TalkBack**：每行朗读 title + subtitle + state（"已选中" / "按钮"）
- **Dynamic Type / Font Scale**：title 字号支持缩放，超 16sp 时列表高度自适应
- **Reduce Motion**：删除 swipe 动画简化为淡出

---

## 9. 常见反模式

| ❌ 反模式 | ✅ 正解 |
|---|---|
| 一行里塞 2 个可点击区域 | 整行点击，或 trailing 单独 clickable |
| iOS separator 不用 hairline（用 1pt 实线）| 0.5pt hairline + 60% alpha |
| Android 用全宽 ripple（无圆角）| stateLayer 8dp 圆角 |
| 列表行 < 44pt / 56dp | 强制最小尺寸 |
| 列表项不分组（100 行一起）| iOS inset grouped / Android 分组 + 头部 |
| 头像图片缺失时空白 | placeholder（initials / icon）|
| 列表卡顿（每行 layout 复杂）| 复用 cell / itemView（iOS prepareForReuse / Android ViewHolder）|
| 暗色模式未走 system 配色 | 用 `UIColor.systemGray6` / M3 `surfaceContainer` |

---

## 10. 跨端实现片段

### React Native

```tsx
// SectionList 示例
<SectionList
  sections={[
    { title: '账号', data: [{ label: '头像', value: 'Zhang San' }, { label: '邮箱' }] },
    { title: '通知', data: [{ label: '推送', type: 'switch', value: true }] },
  ]}
  renderItem={({ item }) => (
    <Pressable
      style={({ pressed }) => [
        styles.row,
        pressed && Platform.OS === 'android' && { backgroundColor: 'rgba(103,80,164,0.08)' },
      ]}
    >
      <Text style={styles.title}>{item.label}</Text>
      {item.type === 'switch' ? <Switch value={item.value} /> : <Text>{item.value}</Text>}
    </Pressable>
  )}
  renderSectionHeader={({ section }) => <Text style={styles.section}>{section.title}</Text>}
/>
```

### Flutter

```dart
ListView(
  children: [
    const Padding(padding: EdgeInsets.all(16), child: Text('账号', style: TextStyle(fontSize: 14, color: Colors.grey))),
    ListTile(
      leading: const CircleAvatar(child: Text('Z')),
      title: const Text('Zhang San'),
      subtitle: const Text('zhangsan@example.com'),
      trailing: const Icon(Icons.chevron_right),
      onTap: () {},
    ),
    const Divider(height: 1),
    const Padding(padding: EdgeInsets.all(16), child: Text('通知', style: TextStyle(fontSize: 14, color: Colors.grey))),
    SwitchListTile(title: const Text('推送通知'), value: true, onChanged: (v) {}),
  ],
)
```

---

## 11. Web Verification 落点

> 本 skill 的 native-app verification 用 Vite + Vue 3 + 移动 390 视口模拟。
>
> 模拟方式：
> - iOS Inset Grouped：10pt 圆角 + 16pt 内边距 + 灰色背景
> - Android M3：list item 8dp 圆角 + state layer + ripple 反馈（CSS animation）
> - 平台切换：通过 `?platform=ios|android` query string

详见 `verification/native-1-ios-settings/README.md`（待建）。
