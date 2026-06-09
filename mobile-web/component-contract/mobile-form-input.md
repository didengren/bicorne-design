# `mobile-form-input` — 移动端输入控件

> Mobile Web 输入控件：iOS 16px 阈值 / 数字键盘 / autocomplete。**用户体验差异大**。

---

## 何时用 / 何时不用

✅ **用**：mobile-web 表单（登录 / 注册 / 支付 / 搜索）
❌ **不用**：桌面端（用 saas-marketing 的 form-field）/ 系统原生表单

---

## Mandatory tokens

| Token path | 用途 |
|---|---|
| `colors.surface.elevated` | 输入框背景 |
| `colors.border.default` | 输入框边框（未聚焦） |
| `colors.border.accent` | 输入框边框（聚焦） |
| `colors.text.default` | 输入文字 |
| `colors.text.muted` | label / placeholder |
| `colors.semantic.danger` | 错误边框 / 错误文字 |
| `colors.semantic.success` | 成功文字 |
| `typography.size.body` | 输入文字 **16px（iOS 阈值）** |
| `typography.size.body-sm` | label / help 12-14px |
| `spacing.{3,4,6}` | 内边距 |
| `radii.lg` | 圆角 |
| `motion.duration.fast` | 聚焦边框动画 150ms |

---

## Recommended props

```ts
interface MobileInputProps {
  /** label */
  label: string
  /** input type */
  type?: 'text' | 'email' | 'tel' | 'number' | 'password' | 'search' | 'url'
  /** 实际 inputmode（覆盖 type） */
  inputmode?: 'text' | 'numeric' | 'decimal' | 'tel' | 'email' | 'url' | 'search'
  /** placeholder */
  placeholder?: string
  /** autocomplete token */
  autocomplete?: string
  /** maxlength */
  maxlength?: number
  /** 是否必填 */
  required?: boolean
  /** 错误 */
  error?: string
  /** help text */
  help?: string
  /** 左侧 icon */
  prefixIcon?: string
  /** 右侧操作（眼睛 / 清除） */
  suffix?: 'clear' | 'password-toggle' | 'spinner' | 'none'
  /** 是否多行（textarea） */
  multiline?: boolean
  /** 多行行数 */
  rows?: number
}
```

---

## Pitfalls

### ❌ Pitfall 1: iOS 16px 阈值（自动缩放）

```ts
// ❌ body 14px → iOS 点击 input 时页面缩放
.input { font-size: 14px; }

// ✅ input 文字 ≥ 16px（iOS 不缩放）
.input { font-size: 16px; }
```

### ❌ Pitfall 2: 用 type="number" 期望数字键盘（实际有箭头）

```ts
// ❌ type="number" 在桌面有上下箭头，移动端不是纯数字键盘
<input type="number" />

// ✅ type="text" + inputmode="numeric"（移动端纯数字键盘）
<input type="text" inputmode="numeric" pattern="[0-9]*" />
```

### ❌ Pitfall 3: 缺 autocomplete 字段

```ts
// ❌ name="userEmail"（浏览器不识别，无法自动填充）
<input type="email" name="userEmail" />

// ✅ 用标准 autocomplete token
<input type="email" autocomplete="email" />
<input type="password" autocomplete="current-password" />
<input autocomplete="cc-number" />  // 信用卡
```

### ❌ Pitfall 4: 没有"清除"按钮

```ts
// ❌ 输入后用户必须全选删除
<input :value="value" />

// ✅ 输入后右侧出现 ✕ 清除按钮
<MobileInput v-model="value" suffix="clear" />
```

### ❌ Pitfall 5: 错误提示用 alert

```ts
// ❌ 错误用 alert（破坏体验）
if (!valid) { alert('Invalid email') }

// ✅ 错误显示在输入框下方
<MobileInput v-model="email" error="请输入有效邮箱" />
```

### ❌ Pitfall 6: 标签不固定

```ts
// ❌ placeholder 替代 label（输入后消失）
<input placeholder="Email" />

// ✅ 顶部固定 label（永远可见）
<label>Email</label>
<input />
```

### ❌ Pitfall 7: 数字键盘缺少"完成"按钮

```ts
// ❌ 数字键盘无"完成"按钮
<input type="text" inputmode="numeric" />

// ✅ 数字键盘 + form submit（用户按"完成"提交）
<form @submit="onSubmit">
  <input inputmode="numeric" enterkeyhint="done" />
</form>
```

### ❌ Pitfall 8: 输入框被键盘遮挡

```ts
// ❌ 输入框被键盘遮挡，用户看不到
<form>
  <input v-for="i in 10" />
</form>

// ✅ 用 ScrollIntoView / 自动滚动
inputRef.value?.scrollIntoView({ block: 'center', behavior: 'smooth' })
```

---

## inputmode + autocomplete 速查

| 场景 | type | inputmode | autocomplete |
|---|---|---|---|
| 邮箱 | email | email | email |
| 电话 | tel | tel | tel |
| 数字验证码 | text | numeric | one-time-code |
| 密码 | password | text | current-password / new-password |
| 信用卡号 | text | numeric | cc-number |
| 信用卡过期 | text | numeric | cc-exp |
| 邮政编码 | text | numeric | postal-code |
| 姓名 | text | text | name |
| 地址 | text | text | street-address |

---

## Minimal Vue 3 template (iOS-safe)

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

const props = withDefaults(defineProps<MobileInputProps>(), {
  type: 'text',
  suffix: 'none',
  multiline: false,
  rows: 4,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const focused = ref(false)
const showPassword = ref(false)

const actualType = computed(() => {
  if (props.type === 'password' && showPassword.value) return 'text'
  return props.type
})
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label class="text-body-sm text-text-muted">
      {{ label }}
      <span v-if="required" class="text-semantic-danger">*</span>
    </label>

    <div
      :class="[
        'flex items-center gap-2 px-3 py-2.5 rounded-lg border transition-colors',
        'bg-surface-elevated',
        error ? 'border-semantic-danger' : focused ? 'border-accent-primary' : 'border-border-default',
      ]"
    >
      <component v-if="prefixIcon" :is="prefixIcon" class="w-4 h-4 text-text-muted flex-shrink-0" />

      <textarea
        v-if="multiline"
        :rows="rows"
        :value="modelValue"
        :placeholder="placeholder"
        :maxlength="maxlength"
        :autocomplete="autocomplete"
        :inputmode="inputmode"
        class="flex-1 min-w-0 bg-transparent text-body text-text-default outline-none placeholder:text-text-muted resize-none"
        @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
        @focus="focused = true"
        @blur="focused = false"
      />
      <input
        v-else
        :type="actualType"
        :value="modelValue"
        :placeholder="placeholder"
        :maxlength="maxlength"
        :autocomplete="autocomplete"
        :inputmode="inputmode"
        :enterkeyhint="enterkeyhint"
        class="flex-1 min-w-0 bg-transparent text-body text-text-default outline-none placeholder:text-text-muted"
        style="font-size: 16px"  <!-- iOS 阈值 -->
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        @focus="focused = true"
        @blur="focused = false"
      />

      <!-- suffix actions -->
      <button
        v-if="suffix === 'clear' && modelValue"
        type="button"
        class="text-text-muted hover:text-text-default"
        @click="emit('update:modelValue', '')"
      >
        <CloseCircleOutlined />
      </button>
      <button
        v-else-if="suffix === 'password-toggle'"
        type="button"
        class="text-text-muted hover:text-text-default"
        @click="showPassword = !showPassword"
      >
        <component :is="showPassword ? EyeInvisibleOutlined : EyeOutlined" />
      </button>
    </div>

    <p v-if="error" class="text-body-sm text-semantic-danger">
      {{ error }}
    </p>
    <p v-else-if="help" class="text-body-sm text-text-muted">
      {{ help }}
    </p>
  </div>
</template>
```

---

## Acceptance check

- [ ] input 文字 ≥ 16px（iOS 阈值）
- [ ] 数字用 type="text" inputmode="numeric"
- [ ] 邮箱/电话/密码有标准 autocomplete token
- [ ] label 固定可见（不靠 placeholder）
- [ ] 错误在输入框下方
- [ ] "清除"按钮（输入后出现）
- [ ] 密码"显示/隐藏"切换
- [ ] 数字验证码 autocomplete="one-time-code"
- [ ] 输入框聚焦时自动滚动到视野内
- [ ] 0 `v-if` + `v-for` 混用
