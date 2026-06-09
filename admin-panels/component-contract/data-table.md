# `DataTable` — 全页 CRUD 表格

> admin panel 的核心组件。承载 90% 的列表场景：订单列表、用户管理、商品列表、问题列表。区别于 [dashboards/data-table.md](../../dashboards/component-contract/data-table.md)：dashboards 的是**嵌入** PanelShell 的紧凑型；admin-panels 的是**全页独立**表格。

---

## 何时用 / 何时不用

✅ **用**：列表数据 > 5 条、有列排序/筛选/选中/分页/虚拟滚动需求
❌ **不用**：< 5 条静态数据（用 FormSection 列展示）/ 只读单行（用 DetailDrawer）

---

## Mandatory tokens

| Token path | 用途 |
|---|---|
| `colors.surface.1` | 表头背景 |
| `colors.surface.2` | 偶数行背景（斑马纹） |
| `colors.surface.3` | hover 行背景 |
| `colors.border.default` | 行分隔线 |
| `colors.border.faint` | 表头底边 |
| `colors.ink.default` | 单元格文本 |
| `colors.ink.tertiary` | 表头文本（次级） |
| `colors.ink.subtle` | 数字 / ID 列 |
| `colors.semantic.success/warning/danger/info` | 状态徽章 |
| `colors.accent.primary` | 选中行 ring / 复选框填充 |
| `motion.duration.fast` (150ms) | 行 hover 过渡 |
| `motion.easing.standard` | 选中行 ring 出现 |
| `typography.size.caption / body` | 表头 / 单元格字号 |
| `typography.weight.medium` | 表头字重 |

---

## Recommended props

```ts
interface DataTableProps<T = Record<string, any>> {
  /** 列定义（必填） */
  columns: ColumnDef<T>[]
  /** 行数据 */
  data: T[]
  /** 行唯一 key（默认 'id'） */
  rowKey?: keyof T | ((row: T) => string)
  /** 加载状态（骨架屏） */
  loading?: boolean
  /** 空状态插槽名 */
  emptyText?: string
  /** 启用行选择 */
  selectable?: boolean
  /** 已选中的 key 数组（受控） */
  selectedKeys?: (string | number)[]
  /** 排序 { columnKey, order } */
  sorter?: { columnKey: string; order: 'asc' | 'desc' }
  /** 当前页（1-based） */
  currentPage?: number
  /** 总条数（用于分页） */
  total?: number
  /** 启用虚拟滚动阈值（行数超过则启用） */
  virtualThreshold?: number
  /** 行点击事件 */
  onRowClick?: (row: T, index: number) => void
  /** 行双击 */
  onRowDoubleClick?: (row: T) => void
}

interface ColumnDef<T> {
  key: keyof T | string
  title: string
  /** 列宽（CSS 合法值，如 '120px' / '20%' / 'minmax(100px, 1fr)'） */
  width?: string
  align?: 'left' | 'right' | 'center'
  /** 是否可排序 */
  sorter?: boolean | ((a: T, b: T) => number)
  /** 单元格格式化 */
  render?: (value: any, row: T, index: number) => any
  /** 状态列：根据 row 值返回语义色 */
  statusTone?: (row: T) => 'success' | 'warning' | 'danger' | 'info' | 'neutral'
  /** 锁定列（左/右） */
  fixed?: 'left' | 'right'
  /** 允许隐藏 */
  hideable?: boolean
}
```

---

## Pitfalls

### ❌ Pitfall 1: 列宽写死成像素，移动端横向溢出

```ts
// ❌ 固定像素在小屏必然溢出
columns: [{ key: 'title', width: '400px' }, ...]

// ✅ 列宽用 fr / minmax 弹性分配
columns: [{ key: 'title', width: 'minmax(200px, 1fr)' }, ...]
// 或完全不写 width，由 grid 模板按 1fr 平分
```

### ❌ Pitfall 2: 选中行用 background-color 触发布局抖动

```ts
// ❌ 改变 background-color 触发整行重绘
.row.is-selected { background-color: theme('colors.semantic.info'); }

// ✅ 用 box-shadow inset 模拟高亮（GPU 合成层）
.row.is-selected {
  box-shadow: inset 0 0 0 1px theme('colors.accent.primary');
}
```

### ❌ Pitfall 3: 状态徽章写死颜色值，主题切换不响应

```ts
// ❌ 写死 hex
render: (v) => v === 'active'
  ? '<span style="color: #16a34a">启用</span>'

// ✅ 走 token / Tailwind class
render: (v) => v === 'active'
  ? '<span class="text-semantic-success">启用</span>'
```

### ❌ Pitfall 4: 虚拟滚动在 < 100 行时强行启用

```ts
// ❌ 数据量小时虚拟滚动比直接渲染更慢（DOM diff 成本）
<virtual-list :items="data" v-if="data.length > 5" />

// ✅ 设阈值（建议 200），只在数据量大时启用
:virtual-threshold="200"
```

### ❌ Pitfall 5: 排序直接改原数组

```ts
// ❌ 直接 .sort() 会改 props.data，触发 Vue 警告
data.sort((a, b) => a.id - b.id)

// ✅ 复制再排序
const sorted = [...data].sort((a, b) => a.id - b.id)
```

---

## 两种实现路径

### 路径 A：手写 + Tailwind（小项目 / 不接 Ant Design）

```vue
<script setup lang="ts" generic="T extends Record<string, any>">
import { computed } from 'vue'

const props = withDefaults(defineProps<DataTableProps<T>>(), {
  rowKey: 'id',
  virtualThreshold: 200,
})

const emit = defineEmits<{
  (e: 'update:selectedKeys', keys: (string | number)[]): void
  (e: 'update:sorter', val: { columnKey: string; order: 'asc' | 'desc' } | undefined): void
  (e: 'row-click', row: T, index: number): void
}>()

const keyOf = (row: T, i: number): string | number => {
  if (typeof props.rowKey === 'function') return props.rowKey(row)
  return (row as any)[props.rowKey] ?? i
}

const gridTemplate = computed(() =>
  // 首列复选框（可选）+ 列宽 + 末列操作（如有）
  [
    props.selectable ? '40px' : null,
    ...props.columns.map(c => c.width || '1fr'),
  ].filter(Boolean).join(' ')
)

const toneClass: Record<string, string> = {
  success: 'text-semantic-success',
  warning: 'text-semantic-warning',
  danger:  'text-semantic-danger',
  info:    'text-semantic-info',
  neutral: 'text-ink-tertiary',
}

const isAllSelected = computed(() =>
  props.selectable && props.data.length > 0 &&
  props.data.every(r => props.selectedKeys?.includes(keyOf(r, 0)))
)
</script>

<template>
  <div class="border border-border-default rounded-md overflow-hidden bg-surface-1">
    <!-- Header -->
    <div
      class="grid items-center gap-3 px-3 py-2.5 bg-surface-1 border-b border-border-faint text-caption text-ink-tertiary font-medium"
      :style="{ gridTemplateColumns: gridTemplate }"
    >
      <div v-if="selectable" class="flex justify-center">
        <input
          type="checkbox"
          :checked="isAllSelected"
          class="accent-accent-primary"
          @change="onToggleAll"
        />
      </div>
      <div
        v-for="col in columns"
        :key="String(col.key)"
        :class="[
          'flex items-center gap-1',
          col.align === 'right' ? 'justify-end' : col.align === 'center' ? 'justify-center' : '',
          col.sorter ? 'cursor-pointer select-none' : '',
        ]"
        @click="col.sorter && onSort(col)"
      >
        {{ col.title }}
        <span v-if="col.sorter && sorter?.columnKey === col.key" class="text-ink-tertiary">
          {{ sorter.order === 'asc' ? '↑' : '↓' }}
        </span>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="p-8 text-center text-ink-tertiary">加载中…</div>

    <!-- Empty -->
    <div v-else-if="data.length === 0" class="p-12 text-center text-ink-tertiary">
      {{ emptyText || '暂无数据' }}
    </div>

    <!-- Rows -->
    <div
      v-else
      class="divide-y divide-border-faint"
    >
      <div
        v-for="(row, i) in data"
        :key="keyOf(row, i)"
        class="grid items-center gap-3 px-3 py-2.5 text-body text-ink-default
               hover:bg-surface-3 transition-colors duration-150 cursor-pointer
               [&.is-selected]:shadow-[inset_0_0_0_1px_theme(colors.accent.primary)]"
        :class="selectedKeys?.includes(keyOf(row, i)) ? 'is-selected bg-surface-2/40' : ''"
        :style="{ gridTemplateColumns: gridTemplate }"
        @click="emit('row-click', row, i)"
      >
        <div v-if="selectable" class="flex justify-center" @click.stop>
          <input
            type="checkbox"
            :checked="selectedKeys?.includes(keyOf(row, i))"
            class="accent-accent-primary"
            @change="onToggleOne(row, i)"
          />
        </div>
        <div
          v-for="col in columns"
          :key="String(col.key)"
          :class="[
            'truncate',
            col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : '',
            col.statusTone ? toneClass[col.statusTone(row)] : '',
          ]"
        >
          <component
            :is="col.render ? col.render((row as any)[col.key], row, i) : (row as any)[col.key]"
          />
        </div>
      </div>
    </div>
  </div>
</template>
```

### 路径 B：cosine-fee `<a-table>`（企业项目首选）

```vue
<script setup lang="ts" generic="T extends Record<string, any>">
import { computed } from 'vue'

const props = withDefaults(defineProps<DataTableProps<T>>(), {
  rowKey: 'id',
})

// a-table 的 columns 用 { title, dataIndex, key, sorter, fixed, width, customRender } 协议
const aColumns = computed(() => props.columns.map(c => ({
  title: c.title,
  dataIndex: c.key as string,
  key: c.key as string,
  width: c.width,
  align: c.align,
  fixed: c.fixed,
  sorter: c.sorter,
  customRender: c.render
    ? ({ text, record, index }: any) => c.render!(text, record, index)
    : undefined,
})))
</script>

<template>
  <a-table
    :columns="aColumns"
    :data-source="data"
    :row-key="rowKey"
    :loading="loading"
    :row-selection="selectable ? {
      selectedRowKeys: selectedKeys,
      onChange: (keys: (string|number)[]) => emit('update:selectedKeys', keys),
    } : undefined"
    :pagination="total ? {
      current: currentPage,
      total,
      showSizeChanger: true,
    } : false"
    size="middle"
    :scroll="{ x: 'max-content' }"
    @row-click="(record, index) => emit('row-click', record, index)"
  />
</template>
```

---

## Acceptance check

- [ ] 列宽用 `fr` / `minmax` / 不写死像素
- [ ] 选中行用 `box-shadow inset` 而非 `background-color`
- [ ] 状态徽章走 `text-semantic-*` 而非硬编码 hex
- [ ] 虚拟滚动阈值 ≥ 200 行才启用
- [ ] 排序不修改原数组（`[...data].sort()`）
- [ ] loading / empty 状态有显式插槽
- [ ] 行 hover 过渡 ≤ 200ms（`duration-150`）
- [ ] 0 NaN（formatter 处理 `null` / `undefined` / `''`）
- [ ] 无 `v-if` + `v-for` 同元素混用
- [ ] 所有 prop 有 TS interface 定义（无 `any`）
