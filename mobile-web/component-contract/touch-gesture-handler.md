# `touch-gesture-handler` — 触摸手势识别

> Mobile Web 手势识别：tap / swipe / pinch / long-press。**避免与浏览器默认手势冲突**。

---

## 何时用 / 何时不用

✅ **用**：mobile-web 应用需要自定义手势（图片轮播 / 列表滑动 / 缩放）
❌ **不用**：简单 tap（用 button）/ 浏览器默认滚动（保留）

---

## Mandatory tokens

| Token path | 用途 |
|---|---|
| `colors.accent.primary` | 视觉反馈（按下高亮） |
| `motion.duration.fast` | tap 反馈 100ms |
| `motion.duration.medium` | swipe 动画 300ms |
| `motion.easing.standard` | 缓动曲线 |

---

## 手势速查表

| 手势 | 触发条件 | 常见用途 |
|---|---|---|
| **Tap** | touchstart → touchend 间隔 < 200ms 且移动 < 10px | 点击按钮 / 选中 |
| **Long press** | touch 持续 ≥ 500ms | 弹出菜单 / 拖拽开始 |
| **Swipe horizontal** | touchstart → touchend 水平移动 > 50px | 左右翻页 / 关闭 |
| **Swipe vertical** | touchstart → touchend 垂直移动 > 50px | 上下拉 / pull-to-refresh |
| **Pinch** | 2 触点距离变化 | 图片缩放 |
| **Pan** | touch 持续移动（不限方向） | 拖拽 / 抽屉 |
| **Double tap** | 200ms 内 2 次 tap | 放大 / 点赞 |

---

## Pitfalls

### ❌ Pitfall 1: 手势与浏览器默认冲突

```ts
// ❌ swipe 监听但浏览器自己也在滚动
<div @touchstart="..." @touchmove="...">
  <!-- 浏览器垂直滚动 + 你自定义水平 swipe → 冲突 -->

// ✅ 水平 swipe 锁定垂直滚动（preventDefault）
@touchmove.passive.prevent="onTouchMove"  // 仅在判定为水平时
```

### ❌ Pitfall 2: Touch event 用 mouse event 替代

```ts
// ❌ 用 mousedown/mousemove（mobile 不响应）
@mousedown="..."
@mousemove="..."

// ✅ touch + mouse 共存（PC debug 兼容）
@touchstart.passive="..." @mousedown="..."
@touchmove.passive="..." @mousemove="..."
```

### ❌ Pitfall 3: Long press 没视觉反馈

```ts
// ❌ 按住 500ms 后才弹菜单（无视觉提示）
@touchstart="setTimeout(showMenu, 500)"

// ✅ 立即视觉反馈（按压高亮）+ 进度提示
@touchstart="press = true"
@touchend="press = false"
:class="{ 'scale-95 opacity-70': press }"
```

### ❌ Pitfall 4: 阈值 < 10px（误触）

```ts
// ❌ swipe 阈值 5px → 误触
if (deltaX > 5) { /* swipe */ }

// ✅ 阈值 30-50px（清晰区分 tap / swipe）
if (deltaX > 30) { /* swipe */ }
```

### ❌ Pitfall 5: Pinch 实现复杂，误用 mouse wheel

```ts
// ❌ 用 wheel 事件模拟 pinch（不工作）
@wheel="onPinch"

// ✅ 用 Touch API + 2 触点
@touchstart="onPinchStart"  // 记录 2 触点距离
@touchmove="onPinchMove"    // 计算新距离 / 旧距离 → ratio
```

### ❌ Pitfall 6: Swipe 触发后没动画

```ts
// ❌ swipe 触发但元素无动画
if (swipeRight) { next() }  // 突然切换

// ✅ 滑动 30%+ 才触发 + 触发后 300ms 动画
if (deltaX > threshold) { next() }  // Vue Transition 包裹
```

---

## 手势库选择

| 库 | 体积 | 特点 |
|---|---|---|
| **Hammer.js** | 7KB gz | 老牌，覆盖全手势 |
| **@vueuse/gesture** | 12KB gz | Vue 3 友好，组合式 API |
| **react-use-gesture** | 14KB gz | React 专用 |
| **原生 TouchEvent** | 0KB | 简单场景用原生即可 |

---

## Minimal Vue 3 template (原生 Tap + Swipe)

```ts
// useTouchGesture.ts
import { ref, onMounted, onUnmounted, type Ref } from 'vue'

interface SwipeHandlers {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  onTap?: () => void
  onLongPress?: () => void
}

export function useTouchGesture(el: Ref<HTMLElement | null>, handlers: SwipeHandlers, opts?: { threshold?: number; longPressMs?: number }) {
  const threshold = opts?.threshold ?? 30
  const longPressMs = opts?.longPressMs ?? 500

  const startX = ref(0)
  const startY = ref(0)
  const startT = ref(0)
  const pressTimer = ref<number | null>(null)
  const moved = ref(false)

  const onStart = (e: TouchEvent) => {
    const t = e.touches[0]
    startX.value = t.clientX
    startY.value = t.clientY
    startT.value = Date.now()
    moved.value = false

    if (handlers.onLongPress) {
      pressTimer.value = window.setTimeout(() => {
        if (!moved.value) handlers.onLongPress?.()
      }, longPressMs)
    }
  }

  const onMove = (_e: TouchEvent) => {
    moved.value = true
    if (pressTimer.value) {
      clearTimeout(pressTimer.value)
      pressTimer.value = null
    }
  }

  const onEnd = (e: TouchEvent) => {
    if (pressTimer.value) {
      clearTimeout(pressTimer.value)
      pressTimer.value = null
    }

    const t = e.changedTouches[0]
    const deltaX = t.clientX - startX.value
    const deltaY = t.clientY - startY.value
    const duration = Date.now() - startT.value

    const isTap = Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10 && duration < 200

    if (isTap) {
      handlers.onTap?.()
      return
    }

    // 优先水平/垂直（更长的轴）
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > threshold) handlers.onSwipeRight?.()
      else if (deltaX < -threshold) handlers.onSwipeLeft?.()
    } else {
      if (deltaY > threshold) handlers.onSwipeDown?.()
      else if (deltaY < -threshold) handlers.onSwipeUp?.()
    }
  }

  onMounted(() => {
    el.value?.addEventListener('touchstart', onStart, { passive: true })
    el.value?.addEventListener('touchmove', onMove, { passive: true })
    el.value?.addEventListener('touchend', onEnd, { passive: true })
  })

  onUnmounted(() => {
    el.value?.removeEventListener('touchstart', onStart)
    el.value?.removeEventListener('touchmove', onMove)
    el.value?.removeEventListener('touchend', onEnd)
  })
}
```

```vue
<!-- 使用 -->
<script setup lang="ts">
const cardRef = ref<HTMLElement | null>(null)

useTouchGesture(cardRef, {
  onTap: () => console.log('tap'),
  onSwipeLeft: () => console.log('left'),
  onSwipeRight: () => console.log('right'),
  onLongPress: () => console.log('long press'),
})
</script>
```

---

## Acceptance check

- [ ] 阈值 ≥ 30px（区分 tap / swipe）
- [ ] touch event 用 passive: true（性能）
- [ ] 水平/垂直 swipe 不冲突（取主轴）
- [ ] Long press 有视觉反馈
- [ ] Pinch 用 2 触点距离算法
- [ ] 与浏览器默认手势不冲突（必要时 preventDefault）
- [ ] 0 `v-if` + `v-for` 混用
