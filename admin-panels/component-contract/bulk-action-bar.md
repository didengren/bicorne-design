# `BulkActionBar` — 批量操作工具栏

> 表格行被选中后，从底部滑出（或顶部粘附）的批量操作工具栏。常见操作：批量删除、批量导出、批量修改状态、批量分配。

---

## 何时用 / 何时不用

✅ **用**：选中行后需要执行批量操作（≥ 2 个）
❌ **不用**：行内 ActionMenu 已能覆盖 / 批量操作只有 1 个

---

## Mandatory tokens

| Token path | 用途 |
|---|---|
| `colors.surface.1` | 工具栏背景 |
| `colors.accent.primary` | 已选数数字 + 主操作按钮 |
| `colors.semantic.danger` | 危险批量操作（删除/禁用） |
| `colors.border.default` | 顶部边线 |
| `colors.ink.default` | 操作按钮文本 |
| `colors.ink.tertiary` | 副提示文本 |
| `motion.duration.normal` | 工具栏滑入/滑出（300ms） |
| `motion.easing.decelerate` | 缓动 |

---

## Recommended props

```ts
interface BulkAction {
  key: string
  label: string
  tone?: 'default' | 'primary' | 'warning' | 'danger'
  /** 二次确认 */
  confirm?: { title: string; description?: string; okText?: string; danger?: boolean }
  /** 权限 */
  permission?: string
  /** 最大可选数量限制（如导出上限 1000） */
  maxCount?: number
}

interface BulkActionBarProps {
  selectedCount: number
  actions: BulkAction[]
  /** 位置 */
  position?: 'top' | 'bottom'
  /** 全选回调 */
  onSelectAll?: () => void
  /** 总条数（用于全选） */
  totalCount?: number
}
```

---

## Pitfalls

### ❌ Pitfall 1: 工具栏位置固定导致遮住关键内容

```ts
// ❌ bottom-fixed 遮住最后一行表格
.bulk-bar { position: fixed; bottom: 0; }

// ✅ 工具栏在表格容器内部 sticky
.bulk-bar { position: sticky; bottom: 0; }
```

### ❌ Pitfall 2: 批量删除没有上限校验

```ts
// ❌ 用户选中 10000 条全删，UI 卡死
@click="emit('action', 'delete')"

const onAction = (key) => {
  if (key === 'delete' && selectedCount > 500) {
    message.warning('批量删除上限 500 条，请分批操作')
    return
  }
}
```

### ❌ Pitfall 3: 工具栏显示数字不显示单位

```ts
// ❌ "已选 5" 单位不清
<span>已选 {{ selectedCount }}</span>

// ✅ 单位明确
<span>已选 <strong>{{ selectedCount }}</strong> 项</span>
```

### ❌ Pitfall 4: 全选按钮一键全选 10000 条

```ts
// ❌ 误触导致全选所有
<button @click="onSelectAll">全选所有</button>

// ✅ 两段式：先"全选当前页"，再"全选 10000 条（搜索结果）"
<button>全选当前页 ({{ pageSize }})</button>
<button>全选搜索结果 ({{ total }})</button>
```

### ❌ Pitfall 5: 取消选中时工具栏不消失

```ts
// ❌ selectedCount = 0 时工具栏还显示
<bulk-bar v-if="actions.length" />

// ✅ 选中数为 0 立即消失
<bulk-bar v-if="selectedCount > 0" />
```

---

## Minimal Vue 3 template

```vue
<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<BulkActionBarProps>(), {
  position: 'bottom',
})

const emit = defineEmits<{
  (e: 'action', key: string): void
  (e: 'select-all'): void
  (e: 'clear'): void
}>()

const isAllInPage = computed(() =>
  props.selectedCount > 0 && props.totalCount
    ? props.selectedCount >= props.totalCount
    : false
)

const onAction = async (action: BulkAction) => {
  if (action.maxCount && props.selectedCount > action.maxCount) {
    // 由父组件 toast 提示
    return
  }
  if (action.confirm) {
    const ok = window.confirm(
      `${action.confirm.title}\n${action.confirm.description || ''}`
    )
    if (!ok) return
  }
  emit('action', action.key)
}
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="translate-y-full opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-full opacity-0"
  >
    <div
      v-if="selectedCount > 0"
      :class="[
        'flex items-center gap-4 px-4 py-2.5 bg-surface-1 border-t border-border-default shadow-lg',
        position === 'top' ? 'sticky top-0' : 'sticky bottom-0',
      ]"
    >
      <div class="flex items-center gap-2 text-body text-ink-default">
        <span class="font-medium text-accent-primary">{{ selectedCount }}</span>
        <span class="text-ink-tertiary">项已选</span>
        <a-button type="link" size="small" @click="emit('clear')">取消选择</a-button>
      </div>

      <div class="flex-1" />

      <a-button
        v-if="onSelectAll && !isAllInPage"
        @click="emit('select-all')"
      >
        全选当前页
      </a-button>

      <a-button
        v-for="a in actions"
        :key="a.key"
        :type="a.tone === 'danger' ? 'default' : a.tone === 'primary' ? 'primary' : 'default'"
        :danger="a.tone === 'danger'"
        @click="onAction(a)"
      >
        {{ a.label }}
      </a-button>
    </div>
  </Transition>
</template>
```

---

## Acceptance check

- [ ] 选中数为 0 工具栏消失
- [ ] 工具栏 sticky 而非 fixed
- [ ] 数字 + 单位（"5 项"）
- [ ] 批量操作有上限校验
- [ ] 全选分两段（当前页 / 全部）
- [ ] 危险操作有二次确认
- [ ] 滑入/滑出过渡 200-300ms
- [ ] 0 `v-if` + `v-for` 混用
