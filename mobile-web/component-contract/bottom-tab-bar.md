# `bottom-tab-bar` — 移动端底部 Tab 导航

> Mobile Web / 移动 H5 核心导航组件。4-5 个 tab，固定在屏幕底部，iOS home indicator 之上。

---

## 何时用 / 何时不用

✅ **用**：mobile-web 应用 / PWA / 移动 H5 站点
❌ **不用**：桌面端 / 大屏 / 后台（用 saas-marketing 的 nav-footer / 侧边栏）/ 单页落地页

---

## Mandatory tokens

| Token path | 用途 |
|---|---|
| `colors.surface.elevated` | tab bar 背景（fixed 位置） |
| `colors.border.subtle` | tab bar 顶边分隔线 |
| `colors.text.muted` | tab 未激活文字 / 图标 |
| `colors.text.default` | tab 激活文字 / 图标 |
| `colors.accent.primary` | tab 激活态高亮（图标 + 文字） |
| `typography.size.body-sm` | tab 文字 12-13px |
| `typography.size.caption` | 数字徽章 10-11px |
| `spacing.{2,3,4,6}` | tab 内边距（px-2 py-3 / gap-1） |
| `motion.duration.fast` | tap 高亮 100-150ms |
| `motion.easing.standard` | 切换动画曲线 |

---

## Recommended props

```ts
interface TabItem {
  id: string
  label: string              // tab 文字（≤ 4 字符）
  icon: string | Component   // outlined 图标（激活时变 filled）
  href: string               // 路由
  badge?: number | string    // 数字 / 文字徽章
}

interface BottomTabBarProps {
  tabs: TabItem[]            // 4-5 个
  activeId: string           // 当前激活 tab id
  /** 切换回调 */
  onChange?: (id: string) => void
  /** 是否 iOS（启用 home indicator safe area） */
  iosSafeArea?: boolean      // 默认 true
  /** tab 等宽还是按内容宽度 */
  layout?: 'equal' | 'auto'  // 默认 equal
  /** 主题色 */
  tone?: 'auto' | 'light' | 'dark'
}
```

---

## Pitfalls

### ❌ Pitfall 1: tab 数量 > 5

```ts
// ❌ 6 个 tab，挤在一行
const tabs = [Home, Search, Notifications, Messages, Profile, Settings, More]

// ✅ 4-5 tab，第 5 用 "More" 抽屉收起
const tabs = [Home, Search, Inbox, Profile, More]
```

### ❌ Pitfall 2: Touch target < 44×44 pt

```ts
// ❌ tab 高度 40px，不够 tap
<button class="h-10"> {/* 40px */}

// ✅ 高度 ≥ 48px（含 padding 后 tap area ≥ 44pt）
<button class="h-12 px-2"> {/* 48px */}
```

### ❌ Pitfall 3: 不适配 iOS home indicator

```ts
// ❌ tab bar 与 iOS home indicator 重叠
<nav class="fixed bottom-0">

// ✅ 加 safe area bottom
<nav class="fixed bottom-0 pb-[env(safe-area-inset-bottom)]">
```

### ❌ Pitfall 4: tab 文字用英文全称

```ts
// ❌ "Notifications" 太长，挤
label: "Notifications"

// ✅ ≤ 4 字符或缩写
label: "Inbox"
label: "通知"
```

### ❌ Pitfall 5: 激活态只有图标变色

```ts
// ❌ 只有图标变色，文字不变
<Icon :class="active ? 'text-accent' : 'text-muted'" />
<Label :class="active ? '' : 'text-muted'" />  // 文字无变化

// ✅ 图标 + 文字都变色（或图标 + 圆点）
<Icon :class="active ? 'text-accent' : 'text-muted'" />
<Label :class="active ? 'text-accent font-medium' : 'text-muted'" />
```

### ❌ Pitfall 6: tab 切换瞬间白屏（无缓存）

```ts
// ❌ 点击 tab 重新加载整个页面
<NuxtLink to="/home" />  // 整页刷新

// ✅ 客户端路由 + prefetch
<router-link :to="tab.href" />  // Vue Router / NuxtLink
```

### ❌ Pitfall 7: 没有徽章或徽章数 > 99

```ts
// ❌ 徽章显示完整 4 位数 "1234"
badge: 1234

// ✅ 99+ 截断
badge: badge > 99 ? '99+' : badge
```

---

## 5 种 tab bar 变体

| 变体 | 适用 | 特点 |
|---|---|---|
| **Standard 4-tab** | 通用 | 4 个等宽 tab，最常见 |
| **Standard 5-tab** | 功能多 | 5 个等宽 tab（iOS 标准） |
| **With FAB** | 创建操作 | 中间突出一个 FAB 圆形按钮（Instagram 模式） |
| **Mini player** | 媒体 / 音乐 | 顶部有 mini player，底部 tab |
| **Custom center** | 强调入口 | 中间 tab 更大或特殊样式（Behance 模式） |

---

## Minimal Vue 3 template (Standard 5-tab with iOS safe area)

```vue
<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<BottomTabBarProps>(), {
  iosSafeArea: true,
  layout: 'equal',
  tone: 'auto',
})

const emit = defineEmits<{
  change: [id: string]
}>()

const tabClass = (active: boolean) => [
  'flex flex-col items-center justify-center gap-1 px-2',
  'transition-colors duration-150',
  active ? 'text-accent-primary' : 'text-text-muted',
]
</script>

<template>
  <nav
    class="fixed bottom-0 left-0 right-0 z-50 bg-surface-elevated border-t border-border-subtle"
    :class="iosSafeArea ? 'pb-[env(safe-area-inset-bottom)]' : ''"
  >
    <ul class="flex items-stretch h-14">
      <li
        v-for="tab in tabs"
        :key="tab.id"
        class="flex-1 min-w-0"
        :class="layout === 'equal' ? 'flex-1' : ''"
      >
        <button
          :aria-label="tab.label"
          :aria-current="tab.id === activeId ? 'page' : undefined"
          class="w-full h-full flex flex-col items-center justify-center gap-0.5 active:scale-95 transition"
          @click="emit('change', tab.id)"
        >
          <div class="relative">
            <component
              :is="tab.icon"
              :class="[
                'w-6 h-6',
                tab.id === activeId ? 'text-accent-primary' : 'text-text-muted',
              ]"
            />
            <span
              v-if="tab.badge && tab.badge > 0"
              class="absolute -top-1 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-semantic-danger text-white text-[10px] font-medium flex items-center justify-center"
            >
              {{ typeof tab.badge === 'number' && tab.badge > 99 ? '99+' : tab.badge }}
            </span>
          </div>
          <span
            :class="[
              'text-[12px] leading-none',
              tab.id === activeId ? 'text-accent-primary font-medium' : 'text-text-muted',
            ]"
          >
            {{ tab.label }}
          </span>
        </button>
      </li>
    </ul>
  </nav>
</template>
```

---

## Acceptance check

- [ ] tab 数量 4-5（> 5 用 "More" 收起）
- [ ] Touch target ≥ 44×44 pt（实际高度 ≥ 48px）
- [ ] iOS safe area 适配（home indicator 不重叠）
- [ ] 激活态：图标 + 文字都变色
- [ ] 文字 ≤ 4 字符
- [ ] 客户端路由（无白屏切换）
- [ ] 徽章 99+ 截断
- [ ] Tab 切换有 100-150ms 动画
- [ ] 0 `v-if` + `v-for` 混用
