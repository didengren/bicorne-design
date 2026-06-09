# Component Contract · Push Notification Card

> 推送通知：iOS UNNotificationContent / Android NotificationCompat.Builder 的卡片样式。
> 跨端实现用 RN `notifee` / `@react-native-firebase/messaging` / Flutter `flutter_local_notifications`。

---

## 1. 用途

| 平台 | 原生组件 | 出现场景 |
|---|---|---|
| iOS | `UNNotificationContent` (Banner) | 锁屏 / 横幅 / 通知中心 |
| Android | `NotificationCompat.Builder` | 状态栏 / 抽屉 / 锁屏 |
| RN | `notifee.displayNotification` | 跨端 |
| Flutter | `flutter_local_notifications` | 跨端 |

> **不要与"App 内 toast / snackbar"混用**：
> - Push 是**系统级**（锁屏、状态栏、未读中心），用户**不在 App 内**也能看到
> - Toast/Snackbar 是**App 内**反馈，触发即消失

---

## 2. 结构

### 2.1 iOS Banner（顶部横幅）

```
┌─────────────────────────────────────┐
│ [App Icon] AppName           now   │  ← 88pt 高（iOS 16+）
│  标题（14pt 粗体）                  │     锁屏: 紧凑 64pt
│  内容（13pt）                       │
│  [Snooze] [Mark Read]               │  ← 折叠时显示
└─────────────────────────────────────┘
```

- 左侧：app icon 38×38pt 圆角
- 中间：app 名（11pt 次级）+ 标题（14pt 粗）+ 内容（13pt 常规）
- 右侧：时间戳（"now" / "5m ago"）
- 长按 / 3D Touch 展开 → 显示 actions

### 2.2 Android Notification（抽屉式）

```
┌─────────────────────────────────────┐
│ [Icon] AppName              now   ▶ │  ← 标准通知
│  标题（16sp Medium）                │
│  内容（14sp Regular）                │
│  [Action 1]  [Action 2]            │  ← 折叠可见
└─────────────────────────────────────┘
```

- 左侧：small icon 24dp（mono 白色）+ large icon 圆形
- 中间：app 名（12sp 次级）+ 标题 + 内容
- 右侧：时间戳
- 底部：actions（≤ 3 个）
- 折叠：BigTextStyle（长文本）/ BigPictureStyle（图片）/ InboxStyle（列表）

### 2.3 iOS Lock Screen（紧凑）

```
┌─────────────────────────────────────┐
│  AppName              now          │  ← 64pt
│  标题                                  │
└─────────────────────────────────────┘
```

- 单行，无内容预览
- 长按 → 展开 banner

---

## 3. 关键尺寸

### iOS

| 维度 | 值 |
|---|---|
| Banner 高度 | **88pt**（含图标 + 标题 + 内容 + 时间）|
| Lock Screen 高度 | 64pt |
| App icon 尺寸 | 38×38pt 圆角 8pt |
| App 名字号 | 11pt 次级 |
| 标题字号 | 14pt 粗体 |
| 内容字号 | 13pt 常规 |
| 时间字号 | 13pt 次级 |
| Action 按钮 | 文字按钮（蓝色，无背景）|
| 最大 action 数 | 4（含 "Open"） |
| 阴影 | 0 4pt 8pt rgba(0,0,0,0.1) |

### Android

| 维度 | 值 |
|---|---|
| 通知高度 | **64dp**（单行）/ **128dp**（带 big text）|
| App icon 尺寸 | 24dp（small）+ 48dp（large）|
| App 名字号 | 12sp 次级 |
| 标题字号 | 16sp Medium |
| 内容字号 | 14sp Regular |
| 时间字号 | 12sp |
| Action 按钮 | 文字按钮（primary 颜色，48dp 高）|
| 最大 action 数 | 3（折叠显示）|
| 阴影 | elevation 1 |

---

## 4. 配色

### iOS Light

```css
background: rgba(248, 248, 248, 0.92);  /* 模糊 */
border:     0.5pt solid rgba(60,60,67,0.29);
app-name:   #3C3C43;                    /* secondaryLabel */
title:      #000000;                    /* label */
content:    #000000;
timestamp:  #8E8E93;                    /* tertiaryLabel */
action:     #007AFF;                    /* systemBlue */
```

### iOS Dark

```css
background: rgba(30, 30, 30, 0.92);
border:     0.5pt solid rgba(255,255,255,0.16);
app-name:   rgba(235,235,245,0.6);
title:      #FFFFFF;
content:    #FFFFFF;
timestamp:  rgba(235,235,245,0.3);
action:     #0A84FF;
```

### Android Light

```css
background: #FFFFFF;
accent:     #FFFBFE;                    /* primaryContainer (通知头部) */
title:      #1C1B1F;                    /* onSurface */
content:    #1C1B1F;
app-name:   #49454F;                    /* onSurfaceVariant */
timestamp:  #49454F;
divider:    #CAC4D0;
action:     #6750A4;                    /* primary */
```

### Android Dark

```css
background: #1C1B1F;
accent:     #4F378B;                    /* primaryContainer dark */
title:      #E6E1E5;
content:    #E6E1E5;
app-name:   #CAC4D0;
timestamp:  #CAC4D0;
divider:    #49454F;
action:     #D0BCFF;
```

---

## 5. 行为规范

| 行为 | iOS | Android |
|---|---|---|
| **点击通知** | 打开 App / 跳详情 | 同上 |
| **左滑通知** | 清除 | 关闭（部分 App 隐藏）|
| **长按** | 展开 actions + 设置 | 弹出 channel 设置 |
| **3D Touch 强按** | 展开 inline | n/a（Android 13+ 长按）|
| **分组** | 自动按 app 分组 | 手动 channel / group |
| **横幅自动消失** | 5s 后滑出 | 不自动消失（需用户操作）|
| **声音** | 默认 / 自定义（30s 内）| 同上 |
| **震动** | 默认 + 自定义 pattern | 同上 |
| **Badge** | 应用 icon 角标红圈 | 启动器 icon 角标 |

---

## 6. 内容规范

### 6.1 iOS（Apple 官方建议）

| 字段 | 限制 | 示例 |
|---|---|---|
| **Title** | **≤ 12 字（避免截断）** | "新消息" |
| **Subtitle** | 可选 | "Zhang San" |
| **Body** | **≤ 4 行**（长文本用 deep link）| "你好，今晚 7 点会议..." |
| **App 名** | 系统自动添加 | "微信" |

### 6.2 Android

| 字段 | 限制 | 示例 |
|---|---|---|
| **Title** | 单行 | "新消息" |
| **Body** | 1-2 行（折叠）；展开后 6-8 行 | 长文本 |
| **Style** | BigText / BigPicture / Inbox / Messaging | 选择最合适 |

### 6.3 通用原则

- **动词在前**（"Zhang San 发来新消息" > "新消息 from Zhang San"）
- **避免感叹号**（"欢迎回来！" > "欢迎回来"）
- **时间用相对**（"5 分钟前" > "16:32"）
- **可点击预览**（用 emoji 增加辨识度）
- **A/B 测试**（推 vs 拉 + 时间窗口）

---

## 7. 可访问性

- **VoiceOver / TalkBack**：必须朗读 title + body + 时间
- **Reduce Motion**：banner 滑入动画改淡入
- **重要通知**：使用 `timeSensitive`（iOS 15+）/ `priority: HIGH`（Android）
- **Do Not Disturb**：遵守用户时段设置

---

## 8. 常见反模式

| ❌ 反模式 | ✅ 正解 |
|---|---|
| 标题 > 12 字（截断）| 精简到 8-10 字 |
| 内容超过 4 行 | 用 deep link 跳转查看 |
| 每条都加 emoji 前缀 | 仅在合适场景使用 |
| 营销推送高频率 | 每日 ≤ 2 条，重要时段发送 |
| 通知无 actions | 提供 1-2 个 quick action（如"回复"/"标记已读"）|
| 通知声音过度刺激 | 用 calm 提示音，避免突然大声 |
| 通知配图过大 | 256×256dp（Android），避免 OOM |
| 通知 channel 乱分组 | 按功能分（聊天/订单/系统）|
| 暗色模式无适配 | 监听 system theme，切换 colors |

---

## 9. 跨端实现片段

### React Native (notifee)

```ts
import notifee, { AndroidImportance } from '@notifee/react-native'

await notifee.displayNotification({
  title: '新消息',
  body: 'Zhang San: 今晚 7 点会议准备好了',
  ios: {
    categoryId: 'message',
    attachments: [{ url: 'https://...' }],
  },
  android: {
    channelId: 'messages',
    importance: AndroidImportance.HIGH,
    smallIcon: 'ic_notification',
    pressAction: { id: 'open' },
    actions: [
      { title: '回复', pressAction: { id: 'reply' } },
      { title: '标记已读', pressAction: { id: 'mark-read' } },
    ],
  },
})
```

### Flutter

```dart
flutterLocalNotificationsPlugin.show(
  0,
  '新消息',
  'Zhang San: 今晚 7 点会议准备好了',
  NotificationDetails(
    android: AndroidNotificationDetails(
      'messages',
      '消息',
      importance: Importance.high,
      actions: <AndroidNotificationAction>[
        const AndroidNotificationAction('reply', '回复'),
        const AndroidNotificationAction('mark-read', '标记已读'),
      ],
    ),
    iOS: const DarwinNotificationDetails(
      categoryIdentifier: 'message',
    ),
  ),
)
```

---

## 10. Web Verification 落点

> 本 skill 的 native-app verification 不覆盖真实推送（需真机）。
>
> 模拟方式：
> - 浏览器 `Notification API` 弹出原生通知（如用户授权）
> - 或 App 内"通知中心"页面（mimic 通知抽屉）
> - 平台切换：通过 `?platform=ios|android` query string 切换样式

详见 `verification/native-1-ios-settings/README.md`（待建，verification 内仅做静态预览）。
