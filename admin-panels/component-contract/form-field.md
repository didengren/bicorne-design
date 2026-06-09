# `FormField` — 单个表单控件封装

> 统一所有表单控件（input / select / date / cascader / switch）的协议：label、help、error、required、disabled 五件套。

---

## 何时用 / 何时不用

✅ **用**：所有用户输入控件（替代裸的 `<input>` `<select>`）
❌ **不用**：纯展示文本（用 `<span>`）/ 按钮（用 `<a-button>`）

---

## Mandatory tokens

| Token path | 用途 |
|---|---|
| `colors.surface.2` | 输入框背景 |
| `colors.border.default` | 输入框默认边框 |
| `colors.accent.primary` | focus 边框 / ring |
| `colors.semantic.danger` | 错误状态边框 + 错误文本 |
| `colors.ink.default` | 输入文本 |
| `colors.ink.tertiary` | label / placeholder |
| `colors.semantic.success` | 校验通过态（可选） |
| `motion.duration.fast` | focus 过渡 |
| `typography.size.body / caption` | 输入 / label |

---

## Recommended props

```ts
interface FormFieldProps {
  /** 字段名（表单提交用） */
  name: string
  /** 显示标签 */
  label?: string
  /** 控件类型 */
  type?: 'input' | 'textarea' | 'select' | 'date' | 'dateRange' | 'cascader' | 'switch' | 'number' | 'password'
  /** 是否必填（显示红星） */
  required?: boolean
  /** 占位符 */
  placeholder?: string
  /** 帮助文本（始终显示在控件下方） */
  help?: string
  /** 错误文本（覆盖 help，校验失败时显示） */
  error?: string
  /** 禁用 */
  disabled?: boolean
  /** 只读 */
  readonly?: boolean
  /** select / cascader 选项 */
  options?: { label: string; value: string | number }[]
  /** 字段值 */
  modelValue?: any
}
```

---

## Pitfalls

### ❌ Pitfall 1: label 写死成"字段名+冒号"

```ts
// ❌ 国际化时改不动
<label>邮箱：</label>

// ✅ label 是 prop，外部传入
<label>{{ label }}<span v-if="required" class="text-semantic-danger">*</span></label>
```

### ❌ Pitfall 2: error 文本用 `title` 属性

```ts
// ❌ 鼠标悬停才显示，错误感知弱
<input :title="error" />

// ✅ 显式错误块（红边框 + 红文字）
<div class="text-caption text-semantic-danger">{{ error }}</div>
```

### ❌ Pitfall 3: 必填星号用红色文字而非图标

```ts
// ❌ "*" 颜色和文字一样，红色容易喧宾夺主
<label>邮箱<span class="text-semantic-danger">*</span></label>

// ✅ 必填星号略小、置于右上角
<label class="relative">
  邮箱 <span class="absolute -top-0.5 right-0 text-semantic-danger">*</span>
</label>
```

### ❌ Pitfall 4: select 选项 value 类型混用

```ts
// ❌ string 和 number 混用，比较时崩溃
options: [
  { label: 'A', value: '1' },
  { label: 'B', value: 2 },
]

// ✅ 全部用 string 或全部用 number，靠 schema 约束
```

### ❌ Pitfall 5: 数字输入框接受非数字字符

```ts
// ❌ 用户可以输入字母
<a-input type="number" />

// ✅ 用 controlled component 拦截
@update:value="(v) => emit('update:modelValue', v.replace(/[^\d.]/g, ''))"
```

---

## Minimal Vue 3 template

```vue
<script setup lang="ts">
withDefaults(defineProps<FormFieldProps>(), {
  type: 'input',
})

const emit = defineEmits<{
  (e: 'update:modelValue', v: any): void
  (e: 'blur'): void
}>()
</script>

<template>
  <div class="flex flex-col gap-1">
    <label
      v-if="label"
      class="text-caption text-ink-tertiary flex items-center gap-1"
    >
      {{ label }}
      <span v-if="required" class="text-semantic-danger text-[10px]">*</span>
    </label>

    <a-input
      v-if="type === 'input' || type === 'password' || type === 'number'"
      :value="modelValue"
      :type="type === 'password' ? 'password' : type === 'number' ? 'text' : 'text'"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :status="error ? 'error' : undefined"
      @update:value="(v) => emit('update:modelValue', v)"
      @blur="emit('blur')"
    />

    <a-textarea
      v-else-if="type === 'textarea'"
      :value="modelValue"
      :placeholder="placeholder"
      :rows="4"
      :disabled="disabled"
      :status="error ? 'error' : undefined"
      @update:value="(v) => emit('update:modelValue', v)"
    />

    <a-select
      v-else-if="type === 'select'"
      :value="modelValue"
      :options="options"
      :placeholder="placeholder"
      :disabled="disabled"
      :status="error ? 'error' : undefined"
      @update:value="(v) => emit('update:modelValue', v)"
    />

    <a-date-picker
      v-else-if="type === 'date'"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :status="error ? 'error' : undefined"
      @update:value="(v) => emit('update:modelValue', v)"
    />

    <a-range-picker
      v-else-if="type === 'dateRange'"
      :value="modelValue"
      :disabled="disabled"
      :status="error ? 'error' : undefined"
      @update:value="(v) => emit('update:modelValue', v)"
    />

    <a-switch
      v-else-if="type === 'switch'"
      :checked="modelValue"
      :disabled="disabled"
      @update:checked="(v) => emit('update:modelValue', v)"
    />

    <div v-if="error" class="text-caption text-semantic-danger">
      {{ error }}
    </div>
    <div v-else-if="help" class="text-caption text-ink-tertiary">
      {{ help }}
    </div>
  </div>
</template>
```

---

## Acceptance check

- [ ] label / help / error / required / disabled 五件套齐全
- [ ] error 状态有红边框 + 错误文本
- [ ] 必填星号位置统一（label 右上角）
- [ ] 数字输入过滤非数字字符
- [ ] select / cascader 选项 value 类型一致
- [ ] 校验通过不显示绿色（避免视觉噪声）
- [ ] 受控值通过 `v-model` 绑定
- [ ] 0 `v-if` + `v-for` 混用
