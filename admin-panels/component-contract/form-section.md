# `FormSection` — 表单分组

> 将长表单拆分成 3-5 个有逻辑分组的区块。三种形态：折叠 collapse / 标签页 tabs / 分步向导 stepper。

---

## 何时用 / 何时不用

✅ **用**：表单字段 > 10 个 / 字段有清晰分类（基础信息 / 高级设置 / 权限）
❌ **不用**：< 6 个字段（直接平铺）/ 字段无逻辑分组

---

## 三种形态对比

| 形态 | 适用场景 | 优点 | 缺点 |
|---|---|---|---|
| `collapse` 折叠 | 字段 8-15 个、有主次之分（基础 vs 高级） | 节省纵向空间，主字段常驻 | 折叠内容不可见，用户可能错过 |
| `tabs` 标签页 | 字段 12-20 个、分类明确独立 | 所有字段可访问，分类清晰 | 切换成本，纵向空间被 tab 头占用 |
| `stepper` 分步向导 | 字段 > 20 个、有流程顺序（如注册 / 支付） | 引导清晰，降低认知负担 | 跨步校验复杂，不适合一次性查看 |

---

## Mandatory tokens

| Token path | 用途 |
|---|---|
| `colors.surface.1` | 容器背景 |
| `colors.border.default` | 区块分隔线 |
| `colors.ink.default` | 标题文本 |
| `colors.ink.tertiary` | 副标题 / 描述 |
| `colors.accent.primary` | 激活标签 / 当前步骤 |
| `colors.semantic.success` | 已完成步骤（stepper） |
| `colors.border.faint` | 折叠展开的底边 |
| `motion.duration.normal` | 折叠 / 切换过渡（250-300ms） |

---

## Recommended props

```ts
interface FormSectionProps {
  /** 区块标题 */
  title?: string
  /** 区块描述 */
  description?: string
  /** 形态 */
  variant?: 'collapse' | 'tabs' | 'stepper'
  /** tabs / stepper 的当前激活 key */
  modelValue?: string
  /** 区块数据（tabs / stepper 模式必填） */
  sections?: { key: string; title: string; description?: string; content: any }[]
  /** collapse 模式下，默认是否展开 */
  defaultExpanded?: boolean
  /** stepper 模式下，标记已完成的步骤 */
  completedSteps?: string[]
}
```

---

## Pitfalls

### ❌ Pitfall 1: tabs 模式下用户切换前不校验当前 tab 的输入

```ts
// ❌ 用户切走 tab 后再切回，丢失未提交数据
<tabs v-model="active" :sections="sections" />

// ✅ 切换前校验，失败时阻止切换
@update:value="(key) => validate().then(ok => ok && (active = key))"
```

### ❌ Pitfall 2: stepper 步骤标题过长导致溢出

```ts
// ❌ 步骤标题直接渲染，溢出横向
sections: [
  { key: '1', title: '第一步：选择你的订单基础信息...' },
]

// ✅ 标题限制 12 字符，超出 ellipsis
.title { max-width: 120px; overflow: hidden; text-overflow: ellipsis; }
```

### ❌ Pitfall 3: collapse 模式把重要字段藏起来

```ts
// ❌ 基础信息都折叠，用户首次看不到
<form-section title="基础信息" v-model:expanded="false" />

// ✅ 默认展开所有非"高级"区块
:default-expanded="title !== '高级设置'"
```

### ❌ Pitfall 4: stepper 没有"返回上一步"按钮

```ts
// ❌ 用户填错第一步，没法回去改
<button>下一步</button>

// ✅ 提供"上一步"和"取消"
<button>取消</button>
<button v-if="step > 0">上一步</button>
<button>下一步</button>
```

---

## Minimal Vue 3 template (collapse 形态)

```vue
<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(defineProps<FormSectionProps>(), {
  variant: 'collapse',
  defaultExpanded: true,
})

const expanded = ref(props.defaultExpanded)
</script>

<template>
  <div v-if="variant === 'collapse'" class="border border-border-default rounded-md bg-surface-1">
    <button
      type="button"
      class="w-full flex items-center justify-between px-4 py-3 text-left"
      @click="expanded = !expanded"
    >
      <div>
        <h3 class="text-body text-ink-default font-medium">{{ title }}</h3>
        <p v-if="description" class="text-caption text-ink-tertiary mt-0.5">{{ description }}</p>
      </div>
      <span class="text-ink-tertiary transition-transform duration-200" :class="expanded ? 'rotate-90' : ''">
        ▸
      </span>
    </button>
    <div
      v-show="expanded"
      class="px-4 pb-4 pt-1 border-t border-border-faint"
    >
      <slot />
    </div>
  </div>

  <a-tabs
    v-else-if="variant === 'tabs'"
    :active-key="modelValue"
    @update:active-key="(k) => emit('update:modelValue', k)"
  >
    <a-tab-pane v-for="s in sections" :key="s.key" :tab="s.title">
      <slot :name="s.key" />
    </a-tab-pane>
  </a-tabs>

  <a-steps
    v-else-if="variant === 'stepper'"
    :current="sections?.findIndex(s => s.key === modelValue)"
    class="mb-6"
  >
    <a-step v-for="s in sections" :key="s.key" :title="s.title" />
  </a-steps>
</template>
```

---

## Acceptance check

- [ ] > 10 字段时分组到 3-5 区块
- [ ] tabs 切换前校验当前输入
- [ ] stepper 步骤标题限制长度
- [ ] collapse 重要字段默认展开
- [ ] stepper 有"上一步"按钮
- [ ] 区块间有视觉分隔（border / spacing）
- [ ] 受控值通过 `v-model` 绑定
- [ ] 0 `v-if` + `v-for` 混用
