# `mobile-modal` — 移动弹层（底部弹出 vs 居中）

> Mobile Web 弹层与 desktop 模态区别：底部弹出是 mobile 习惯，全屏 / 居中是辅助。

---

## 何时用 / 何时不用

✅ **用**：mobile-web 弹窗 / 行动确认 / 表单输入
❌ **不用**：desktop 模态（用 saas-marketing 的 modal）/ 简单 toast / 系统级 alert

---

## Mandatory tokens

| Token path | 用途 |
|---|---|
| `colors.surface.elevated` | 弹层背景 |
| `colors.surface.overlay` | 遮罩背景（黑/50） |
| `colors.border.subtle` | 弹层顶边分隔线 |
| `colors.text.default` | 标题 / 内容 |
| `colors.text.muted` | 描述 / 副文本 |
| `colors.accent.primary` | 主 CTA 背景 |
| `typography.size.h-lg` | 弹层标题 18-20px |
| `typography.size.body` | 弹层描述 14-15px |
| `spacing.{4,6,8}` | 内边距（px-4 py-6） |
| `radii.{xl,2xl,top}` | 圆角（弹层顶部） |
| `motion.duration.medium` | 弹出动画 300-400ms |

---

## Recommended props

```ts
interface MobileModalProps {
  /** 弹层类型 */
  type: 'bottom-sheet' | 'center' | 'fullscreen'
  /** 是否打开 */
  open: boolean
  /** 关闭回调 */
  onClose: () => void
  /** 标题 */
  title?: string
  /** 描述 */
  description?: string
  /** 主 CTA */
  primaryAction?: { label: string; onClick: () => void; tone?: 'primary' | 'danger' }
  /** 次 CTA */
  secondaryAction?: { label: string; onClick: () => void }
  /** 是否可拖拽关闭（仅 bottom-sheet） */
  draggable?: boolean
  /** iOS safe area */
  iosSafeArea?: boolean
}
```

---

## Pitfalls

### ❌ Pitfall 1: 居中弹层被键盘遮挡

```ts
// ❌ 居中弹层，输入框被键盘挡住
<Modal position="center">
  <Input />
</Modal>

// ✅ 用 bottom-sheet 替代（键盘从底部弹出，bottom-sheet 上移）
<BottomSheet>
  <Input />
</BottomSheet>
```

### ❌ Pitfall 2: Bottom-sheet 高度占满屏幕

```ts
// ❌ Bottom-sheet 高度 100vh，无顶部留白
<Sheet class="h-screen">

// ✅ 限制最大高度 80vh
<Sheet class="max-h-[80vh]">
```

### ❌ Pitfall 3: 没有 tap 遮罩关闭

```ts
// ❌ 必须点 X 才能关闭
<Sheet :open="open">
  <button @click="onClose">X</button>
</Sheet>

// ✅ tap 遮罩 + 滑动关闭（mobile 习惯）
<Sheet :open="open" @mask-click="onClose" :draggable="true">
```

### ❌ Pitfall 4: 全屏弹层没有返回按钮

```ts
// ❌ 全屏弹层只能点 X 关闭
<Sheet type="fullscreen">
  <button @click="onClose">X</button>
</Sheet>

// ✅ 加顶部 nav bar（返回 / 标题 / 操作）
<Sheet type="fullscreen">
  <AppBar back :title="title" @back="onClose" />
</Sheet>
```

### ❌ Pitfall 5: 弹层打开时背景滚动

```ts
// ❌ 弹层打开时，body 仍可滚动
<Sheet :open="true">
  <!-- body 滚动 -->

// ✅ 锁定 body scroll
watch(open, (v) => {
  document.body.style.overflow = v ? 'hidden' : ''
})
```

### ❌ Pitfall 6: 弹层 iPhone notch / home indicator 不适配

```ts
// ❌ 全屏弹层不预留 safe area
<Sheet type="fullscreen">

// ✅ 顶部和底部加 safe area
<Sheet type="fullscreen" class="pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
```

### ❌ Pitfall 7: 弹层出现时无动画

```ts
// ❌ 直接出现/消失（突兀）
<Transition name="fade">

// ✅ slide-up + fade（300-400ms）
<Transition name="slide-up-fade">
```

---

## 3 种弹层对比

| 类型 | 适用 | 特点 |
|---|---|---|
| **Bottom Sheet** | 行动确认 / 表单 / 选项 | 底部弹出 30-80% 屏，**最常见 mobile 模式** |
| **Center** | 简单确认（删除？保存？） | 居中弹窗，320×200 范围，**仅用于简单确认** |
| **Fullscreen** | 复杂表单 / 详情 | 全屏弹层，含 app bar + 关闭，**手机常作"子页面"** |

---

## Minimal Vue 3 template (Bottom Sheet with drag)

```vue
<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'

const props = withDefaults(defineProps<MobileModalProps>(), {
  type: 'bottom-sheet',
  draggable: true,
  iosSafeArea: true,
})

const emit = defineEmits<{ close: [] }>()

const sheetRef = ref<HTMLElement>()
const startY = ref(0)
const currentY = ref(0)
const dragging = ref(false)

// 锁定 body scroll
watch(() => props.open, (v) => {
  document.body.style.overflow = v ? 'hidden' : ''
})

onUnmounted(() => { document.body.style.overflow = '' })

const onTouchStart = (e: TouchEvent) => {
  if (!props.draggable) return
  startY.value = e.touches[0].clientY
  dragging.value = true
}

const onTouchMove = (e: TouchEvent) => {
  if (!dragging.value) return
  currentY.value = e.touches[0].clientY - startY.value
  if (currentY.value < 0) currentY.value = 0  // 防止向上拖
  if (sheetRef.value) {
    sheetRef.value.style.transform = `translateY(${currentY.value}px)`
  }
}

const onTouchEnd = () => {
  dragging.value = false
  if (currentY.value > 100) {
    emit('close')
  }
  if (sheetRef.value) {
    sheetRef.value.style.transform = ''
  }
  currentY.value = 0
}
</script>

<template>
  <Teleport to="body">
    <Transition name="sheet-fade">
      <div
        v-if="open"
        class="fixed inset-0 z-50 bg-black/50"
        @click.self="emit('close')"
      >
        <div
          ref="sheetRef"
          class="absolute bottom-0 left-0 right-0 bg-surface-elevated rounded-t-2xl max-h-[80vh] flex flex-col transition-transform"
          :class="iosSafeArea ? 'pb-[env(safe-area-inset-bottom)]' : ''"
          @touchstart.passive="onTouchStart"
          @touchmove.passive="onTouchMove"
          @touchend="onTouchEnd"
        >
          <!-- drag handle -->
          <div v-if="draggable" class="flex justify-center pt-2 pb-1">
            <div class="w-10 h-1 rounded-full bg-border-default" />
          </div>

          <header v-if="title" class="px-4 py-3 border-b border-border-subtle">
            <h2 class="text-h-lg font-semibold text-text-default">{{ title }}</h2>
            <p v-if="description" class="text-body text-text-muted mt-1">
              {{ description }}
            </p>
          </header>

          <div class="flex-1 overflow-y-auto px-4 py-4">
            <slot />
          </div>

          <footer v-if="primaryAction || secondaryAction" class="px-4 py-3 border-t border-border-subtle flex gap-2">
            <a-button v-if="secondaryAction" size="large" class="flex-1" @click="secondaryAction.onClick">
              {{ secondaryAction.label }}
            </a-button>
            <a-button
              v-if="primaryAction"
              type="primary"
              size="large"
              :danger="primaryAction.tone === 'danger'"
              class="flex-1"
              @click="primaryAction.onClick"
            >
              {{ primaryAction.label }}
            </a-button>
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.sheet-fade-enter-active, .sheet-fade-leave-active {
  transition: opacity 300ms ease;
}
.sheet-fade-enter-active > div:last-child, .sheet-fade-leave-active > div:last-child {
  transition: transform 300ms cubic-bezier(0.32, 0.72, 0, 1);
}
.sheet-fade-enter-from, .sheet-fade-leave-to {
  opacity: 0;
}
.sheet-fade-enter-from > div:last-child, .sheet-fade-leave-to > div:last-child {
  transform: translateY(100%);
}
</style>
```

---

## Acceptance check

- [ ] 优先用 Bottom Sheet（mobile 习惯）
- [ ] 居中弹层仅用于简单确认
- [ ] Bottom Sheet max-height 80vh
- [ ] tap 遮罩关闭
- [ ] 拖拽底部关闭（draggable）
- [ ] body scroll 锁定
- [ ] iOS safe area 适配
- [ ] 弹出动画 300-400ms
- [ ] 0 `v-if` + `v-for` 混用
