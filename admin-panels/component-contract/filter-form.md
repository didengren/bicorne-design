# `FilterForm` — 搜索筛选区

> admin panel 列表页顶部的"搜索 + 筛选"区。两种形态：行内 inline（≤ 4 个字段时）/ 抽屉 drawer（> 4 个字段或含日期范围）。

---

## 何时用 / 何时不用

✅ **用**：列表页需要按状态 / 标签 / 日期 / 负责人筛选
❌ **不用**：单一搜索框（用 `<a-input>` + 按钮即可）/ 全文检索（用专门 search bar 组件）

---

## Mandatory tokens

| Token path | 用途 |
|---|---|
| `colors.surface.1` | 容器背景 |
| `colors.border.faint` | 字段分隔线（inline 多列布局时） |
| `colors.ink.tertiary` | 标签文本 |
| `colors.ink.default` | 输入框文本 |
| `colors.semantic.danger` | 必填项星号 |
| `colors.accent.primary` | 输入框 focus 边框 |
| `motion.duration.fast` | focus ring 过渡 |

---

## Recommended props

```ts
interface FilterField {
  key: string
  label: string
  type: 'input' | 'select' | 'date' | 'dateRange' | 'cascader'
  placeholder?: string
  options?: { label: string; value: string | number }[]
  defaultValue?: any
  width?: string
}

interface FilterFormProps {
  fields: FilterField[]
  layout?: 'inline' | 'drawer'
  /** 受控值 */
  modelValue: Record<string, any>
  /** 字段数量超过多少折叠到 drawer（默认 5） */
  collapseThreshold?: number
}
```

---

## Pitfalls

### ❌ Pitfall 1: 标签"搜索："用纯文本而非 `<label>`

```ts
// ❌ 屏幕阅读器无法关联
<span>搜索：</span><input />

// ✅ 用 <label for="..."> 或包裹
<label class="text-caption text-ink-tertiary">搜索</label>
<input id="search-input" />
```

### ❌ Pitfall 2: 重置按钮放在提交按钮右侧，导致误点

```ts
// ❌ 重置在右侧，误点清空筛选
<button>查询</button><button>重置</button>

// ✅ 重置在左侧（次级操作）
<button>重置</button><button type="primary">查询</button>
```

### ❌ Pitfall 3: 日期范围选择器没限制起止关系

```ts
// ❌ 起始日期可以晚于结束日期
<date-range v-model="range" />

// ✅ 用 disabledDate 限制
<date-range
  v-model="range"
  :disabled-date="(d) => d.isAfter(range[1])"
/>
```

---

## Minimal Vue 3 template (cosine-fee 版)

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'

const props = withDefaults(defineProps<FilterFormProps>(), {
  layout: 'inline',
  collapseThreshold: 5,
})

const emit = defineEmits<{
  (e: 'update:modelValue', val: Record<string, any>): void
  (e: 'search'): void
  (e: 'reset'): void
}>()

const collapsed = ref(props.fields.length > props.collapseThreshold)
const visibleFields = computed(() => collapsed.value
  ? props.fields.slice(0, 3)
  : props.fields)
```

</script>

<template>
  <!-- Inline 形态 -->
  <div v-if="layout === 'inline'" class="flex flex-wrap items-end gap-3 p-3 bg-surface-1 border-b border-border-faint">
    <div v-for="f in visibleFields" :key="f.key" class="flex flex-col gap-1">
      <label class="text-caption text-ink-tertiary">{{ f.label }}</label>
      <a-input
        v-if="f.type === 'input'"
        :value="modelValue[f.key]"
        :placeholder="f.placeholder"
        :style="{ width: f.width || '180px' }"
        @update:value="(v) => emit('update:modelValue', { ...modelValue, [f.key]: v })"
      />
      <a-select
        v-else-if="f.type === 'select'"
        :value="modelValue[f.key]"
        :options="f.options"
        :style="{ width: f.width || '160px' }"
        @update:value="(v) => emit('update:modelValue', { ...modelValue, [f.key]: v })"
      />
      <a-range-picker
        v-else-if="f.type === 'dateRange'"
        :value="modelValue[f.key]"
        @update:value="(v) => emit('update:modelValue', { ...modelValue, [f.key]: v })"
      />
    </div>

    <div class="flex items-center gap-2">
      <a-button @click="emit('reset')">重置</a-button>
      <a-button type="primary" @click="emit('search')">查询</a-button>
      <a-button
        v-if="fields.length > collapseThreshold"
        type="link"
        @click="collapsed = !collapsed"
      >
        {{ collapsed ? '展开' : '收起' }}
      </a-button>
    </div>
  </div>

  <!-- Drawer 形态 -->
  <a-drawer
    v-else
    title="高级筛选"
    placement="right"
    :width="420"
    :open="true"
  >
    <a-form layout="vertical">
      <a-form-item v-for="f in fields" :key="f.key" :label="f.label">
        <!-- 同上 input / select / dateRange -->
      </a-form-item>
    </a-form>
    <template #footer>
      <a-button @click="emit('reset')">重置</a-button>
      <a-button type="primary" @click="emit('search')">查询</a-button>
    </template>
  </a-drawer>
</template>
```

---

## Acceptance check

- [ ] 标签用 `<label>` 关联输入框
- [ ] 重置在左、查询在右
- [ ] 日期范围限制起止关系
- [ ] 字段 > 5 时支持折叠/抽屉切换
- [ ] Enter 键触发查询
- [ ] Esc 键触发重置
- [ ] 受控值通过 `v-model` 双向绑定
- [ ] 0 `v-if` + `v-for` 混用
