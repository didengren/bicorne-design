# `PermissionUx` — 角色/权限的 UI 表现

> 把"权限不足"从后端报错转换为**UI 层显式表达**。四种表现：禁用 disabled / 隐藏 hidden / 只读 readonly / 提示 tooltip。绝不是"权限不够就直接 403"。

---

## 何时用 / 何时不用

✅ **用**：所有受权限控制的操作（按钮 / 菜单项 / 表单字段 / 数据行）
❌ **不用**：纯展示内容（与权限无关的描述文本）

---

## 四种 UX 表现决策树

```
用户有权限吗？
├─ 是 → 正常显示
└─ 否 → 该不该知道有这个功能？
         ├─ 不该知道（管理员功能给普通用户）→ hidden
         └─ 应该知道（自己能看但不能改）→ 选一种：
            ├─ 可点击但失败 → tooltip 解释（不推荐：体验差）
            ├─ 可看不能改 → readonly
            └─ 完全不可用 → disabled + tooltip
```

| 表现 | 适用 | 优点 | 缺点 |
|---|---|---|---|
| `hidden` | 跨角色完全不同功能（管理员后台） | 简洁，不干扰 | 用户可能不知道功能存在 |
| `disabled` | 同角色但权限不同（普通用户看管理员按钮） | 显式，tooltip 解释 | 视觉噪声 |
| `readonly` | 可看不能改（自己的档案） | 透明度高 | 实现复杂 |
| `tooltip` | 危险操作（删库按钮） | 阻止误操作 | 仍需配合 disabled/hidden |

---

## Mandatory tokens

| Token path | 用途 |
|---|---|
| `colors.surface.1` | 禁用态背景（变浅） |
| `colors.ink.tertiary` | 禁用态文本（变灰） |
| `colors.border.default` | 禁用态边框 |
| `colors.semantic.warning` | 权限提示 toast 背景 |
| `motion.duration.fast` | 状态切换过渡 |
| `colors.tooltip.bg` | tooltip 背景（如有） |

---

## Recommended props

```ts
type PermissionUxProps =
  | { type: 'hidden' }
  | { type: 'disabled'; reason?: string }
  | { type: 'readonly' }
  | { type: 'tooltip'; text: string }

interface PermissionContext {
  /** 当前用户角色 */
  role: 'admin' | 'editor' | 'viewer' | string
  /** 资源所有者（如只能编辑自己的数据） */
  isOwner?: boolean
  /** 是否为敏感操作（删库/导出全部） */
  isSensitive?: boolean
}

interface PermissionCheckProps {
  /** 需要的权限标识符，如 'order:delete' */
  permission: string
  /** 当前上下文 */
  context: PermissionContext
  /** 自定义权限函数（覆盖默认） */
  predicate?: (context: PermissionContext) => PermissionUxProps
}
```

---

## Pitfalls

### ❌ Pitfall 1: 权限校验只在前端，后端没校验

```ts
// ❌ 前端 hidden，攻击者用 devtools 调 API 仍能删除
{ type: 'hidden' }  // 仅前端

// ✅ 前后端双重校验（前端只是 UX）
// 后端必须再校验一次，前端 hidden 是体验优化不是安全
```

### ❌ Pitfall 2: 禁用按钮没有 tooltip 解释

```ts
// ❌ 用户不知道为什么点不动
<button disabled>删除</button>

// ✅ 禁用 + tooltip
<button disabled title="您没有删除权限">删除</button>
```

### ❌ Pitfall 3: 只读字段看起来和可编辑一样

```ts
// ❌ 只读字段用普通 input
<input :value="value" />

// ✅ 视觉差异：灰背景 + 鼠标变 not-allowed
<input :value="value" readonly class="bg-surface-2 cursor-not-allowed" />
```

### ❌ Pitfall 4: 权限变更后 UI 不刷新

```ts
// ❌ 切换角色后，按钮还显示
<button v-if="canEdit">编辑</button>

// ✅ 用 computed 监听角色变化
const canEdit = computed(() => role.value === 'admin')
```

### ❌ Pitfall 5: 权限拒绝用 alert/弹窗

```ts
// ❌ 弹窗打断流程
alert('您没有权限')

// ✅ Toast / inline 提示
message.warning('您没有此操作的权限')
```

---

## Minimal Vue 3 template

```vue
<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<PermissionCheckProps>()

const ux = computed<PermissionUxProps>(() => {
  if (props.predicate) return props.predicate(props.context)
  return defaultCheck(props.permission, props.context)
})

const defaultCheck = (perm: string, ctx: PermissionContext): PermissionUxProps => {
  // 简化规则
  if (perm.endsWith(':delete') && !['admin'].includes(ctx.role)) {
    return { type: 'disabled', reason: '需要管理员权限' }
  }
  if (perm.endsWith(':edit') && !['admin', 'editor'].includes(ctx.role)) {
    return { type: 'readonly' }
  }
  if (perm.endsWith(':export-all') && !ctx.isOwner) {
    return { type: 'hidden' }
  }
  return { type: 'hidden' }  // 默认有权限
}
</script>

<template>
  <slot v-if="ux.type !== 'hidden'" />
</template>

<!-- 进阶：包裹的子组件感知 disabled/readonly/tooltip -->
<!-- 实际使用时通过 provide/inject 或 props 传递 -->
```

### 按钮级 disabled/tooltip 注入（provide/inject 版）

```vue
<!-- ParentPermission.vue -->
<script setup lang="ts">
import { provide, ref } from 'vue'
provide('permissionDisabled', ref(true))
provide('permissionTooltip', '您没有此操作权限')
</script>

<!-- PermissionButton.vue（消费者） -->
<script setup lang="ts">
import { inject } from 'vue'
const disabled = inject('permissionDisabled', ref(false))
const tooltip = inject('permissionTooltip', '')
</script>

<template>
  <a-tooltip v-if="tooltip" :title="tooltip">
    <a-button :disabled="disabled"><slot /></a-button>
  </a-tooltip>
  <a-button v-else :disabled="disabled"><slot /></a-button>
</template>
```

### 字段级 readonly（FormField 配合）

```vue
<form-field
  v-model="form.email"
  label="邮箱"
  :readonly="!canEditEmail"
  help="邮箱不可修改（需联系管理员）"
/>
```

---

## Acceptance check

- [ ] 权限规则集中在 composable（不散落在模板里）
- [ ] 前端只是 UX，后端必须有最终校验
- [ ] 禁用按钮有 tooltip 解释原因
- [ ] readonly 字段视觉区别（灰背景 / not-allowed）
- [ ] 权限拒绝用 toast 而非 alert
- [ ] 权限变更时 UI 实时刷新（用 computed）
- [ ] 跨角色功能（管理员后台）走 hidden
- [ ] 0 `v-if` + `v-for` 混用
