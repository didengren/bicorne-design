# `ActionMenu` — 行级 / 批量操作入口

> 表格行末的下拉操作菜单：查看、编辑、删除、复制、归档。两种触发：行末三点按钮 / 选中后批量操作。

---

## 何时用 / 何时不用

✅ **用**：行级操作 ≥ 2 个 / 操作有"主次"之分（主操作显式，次操作折叠）
❌ **不用**：单操作（直接放按钮）/ 操作 < 2 个（用 ButtonGroup）

---

## Mandatory tokens

| Token path | 用途 |
|---|---|
| `colors.surface.1` | 菜单背景 |
| `colors.surface.2` | hover 项背景 |
| `colors.surface.3` | 危险操作 hover 背景 |
| `colors.border.default` | 菜单边框 |
| `colors.ink.default` | 菜单项文本 |
| `colors.ink.tertiary` | 菜单项副标题 |
| `colors.semantic.danger` | 危险操作文本（删除/禁用） |
| `colors.semantic.warning` | 警告操作文本（归档） |
| `motion.duration.fast` | 菜单展开过渡（150ms） |
| `motion.easing.standard` | 缓动 |

---

## Recommended props

```ts
interface ActionItem {
  key: string
  label: string
  /** 描述（次级文本） */
  description?: string
  /** 危险 / 警告 / 普通 */
  tone?: 'default' | 'warning' | 'danger'
  /** 权限标识符，PermissionUx 校验 */
  permission?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 隐藏的判定函数 */
  hidden?: (row: any) => boolean
  /** 二次确认 */
  confirm?: { title: string; description?: string; okText?: string; danger?: boolean }
}

interface ActionMenuProps {
  actions: ActionItem[]
  /** 当前行（用于 hidden 判定 / 上下文） */
  row?: any
  /** 触发按钮形态 */
  trigger?: 'icon' | 'button' | 'text'
  /** 触发按钮文本（trigger=button/text） */
  triggerLabel?: string
}
```

---

## Pitfalls

### ❌ Pitfall 1: 危险操作（删除）放在菜单第一项

```ts
// ❌ 误触率高
actions: [
  { key: 'delete', label: '删除', tone: 'danger' },
  { key: 'edit', label: '编辑' },
]

// ✅ 危险操作放最后 + 视觉隔离
actions: [
  { key: 'edit', label: '编辑' },
  { key: 'duplicate', label: '复制' },
  { key: 'archive', label: '归档', tone: 'warning' },
  { key: 'delete', label: '删除', tone: 'danger' },
]
```

### ❌ Pitfall 2: 二次确认的文案不具体

```ts
// ❌ 用户不知道删了什么
confirm: { title: '确认删除？' }

// ✅ 包含对象信息
confirm: {
  title: `确认删除订单 ${row.id}？`,
  description: '删除后可在回收站恢复 30 天',
  okText: '确认删除',
  danger: true,
}
```

### ❌ Pitfall 3: 触发按钮在表格行末占太多空间

```ts
// ❌ "操作" 文字按钮占 80px
<button>操作 ▾</button>

// ✅ 三点图标按钮（24px）
<button class="w-6 h-6">⋯</button>
```

### ❌ Pitfall 4: 菜单展开后被父级 overflow:hidden 裁切

```ts
// ❌ 表格行内 dropdown 被 table 容器裁切
<div class="overflow-hidden">
  <table>
    <tr><td><a-dropdown /></td></tr>
  </table>
</div>

// ✅ 父级改用 overflow:visible，或用 Teleport
<a-dropdown :get-popup-container="(n) => n.parentNode" />
```

### ❌ Pitfall 5: 权限不足的操作直接消失而非禁用

```ts
// ❌ 隐藏导致用户困惑："为什么别人的有，我的没？"
{ key: 'delete', label: '删除', hidden: !canDelete }

// ✅ 禁用 + tooltip 解释
{ key: 'delete', label: '删除', disabled: !canDelete }
```

---

## Minimal Vue 3 template

```vue
<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<ActionMenuProps>(), {
  trigger: 'icon',
})

const emit = defineEmits<{
  (e: 'action', key: string): void
}>()

const visibleActions = computed(() =>
  props.actions.filter(a => !a.hidden || !a.hidden(props.row))
)

const onClick = async (action: ActionItem) => {
  if (action.disabled) return
  if (action.confirm) {
    const confirmed = await new Promise<boolean>((resolve) => {
      // cosine-fee 提供 Modal.confirm；这里只示意
      resolve(window.confirm(action.confirm!.title))
    })
    if (!confirmed) return
  }
  emit('action', action.key)
}
</script>

<template>
  <a-dropdown :trigger="['click']" placement="bottomRight">
    <a-button
      :type="trigger === 'button' ? 'default' : 'text'"
      :size="trigger === 'icon' ? 'small' : 'middle'"
    >
      <template v-if="trigger === 'icon'">⋯</template>
      <template v-else-if="trigger === 'button'">
        {{ triggerLabel || '操作' }} ▾
      </template>
      <template v-else>{{ triggerLabel }}</template>
    </a-button>
    <template #overlay>
      <a-menu class="min-w-[180px]">
        <a-menu-item
          v-for="a in visibleActions"
          :key="a.key"
          :disabled="a.disabled"
          @click="onClick(a)"
        >
          <div class="flex flex-col">
            <span :class="{
              'text-ink-default': a.tone === 'default' || !a.tone,
              'text-semantic-warning': a.tone === 'warning',
              'text-semantic-danger': a.tone === 'danger',
            }">
              {{ a.label }}
            </span>
            <span v-if="a.description" class="text-caption text-ink-tertiary">
              {{ a.description }}
            </span>
          </div>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>
```

---

## Acceptance check

- [ ] 危险操作放菜单最后
- [ ] 危险操作有二次确认 + 上下文文案
- [ ] 触发按钮首选三点图标（24px）
- [ ] 菜单不被父级 overflow 裁切（必要时 Teleport）
- [ ] 权限不足的操作禁用而非隐藏
- [ ] 禁用项有 tooltip 解释
- [ ] 菜单项支持 secondary 描述文本
- [ ] 0 `v-if` + `v-for` 混用
