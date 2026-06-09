# `DetailDrawer` — 侧滑详情

> 表格行点击后从右侧滑出的详情面板。区别于 Modal：抽屉不打断主流程，用户可"扫一眼就关"。宽度 480-560px。

---

## 何时用 / 何时不用

✅ **用**：详情信息 5-30 个字段 / 用户常需"看一眼就回"（订单详情 / 用户档案）
❌ **不用**：< 5 字段（用 Popover 浮层）/ > 30 字段（用全页 detail 页）

---

## Mandatory tokens

| Token path | 用途 |
|---|---|
| `colors.surface.1` | 抽屉背景 |
| `colors.surface.2` | 区块交替背景 |
| `colors.border.default` | 抽屉右左边框 |
| `colors.border.faint` | 区块间分隔 |
| `colors.ink.default` | 主文本 |
| `colors.ink.tertiary` | label / 副文本 |
| `colors.ink.subtle` | 数字 / ID |
| `colors.semantic.success/warning/danger/info` | 状态徽章 |
| `colors.accent.primary` | 操作按钮 / 链接 |
| `motion.duration.normal` | 抽屉滑入（300ms） |
| `motion.easing.decelerate` | 缓动（快进慢出） |

---

## Recommended props

```ts
interface DetailDrawerProps {
  /** 抽屉标题 */
  title?: string
  /** 副标题 / ID */
  subtitle?: string
  /** 受控开关 */
  open?: boolean
  /** 宽度（px） */
  width?: number
  /** 详情数据 */
  record?: Record<string, any>
  /** 字段定义 */
  fields?: DetailField[]
  /** 底部操作按钮 */
  footerActions?: ActionItem[]
  /** 关闭前确认 */
  beforeClose?: () => boolean | Promise<boolean>
}

interface DetailField {
  key: string
  label: string
  type?: 'text' | 'date' | 'datetime' | 'status' | 'tags' | 'user' | 'json' | 'link'
  format?: (value: any, record: any) => string
  copyable?: boolean
}
```

---

## Pitfalls

### ❌ Pitfall 1: 抽屉太宽，挤占主表格空间

```ts
// ❌ 1000px 宽抽屉，剩 200px 表格
<detail-drawer :width="1000" />

// ✅ 标准 480-560px
<detail-drawer :width="520" />
```

### ❌ Pitfall 2: 抽屉内容很长没滚动条

```ts
// ❌ 30 个字段全堆出来，超出视口
<drawer>... 30 个 field ...</drawer>

// ✅ 内容区 max-height + overflow-y-auto
.body { max-height: calc(100vh - 200px); overflow-y: auto; }
```

### ❌ Pitfall 3: 关闭抽屉不确认未保存修改

```ts
// ❌ 用户填了字段，误触 ESC 直接丢失
@close="emit('update:open', false)"

// ✅ 修改后关闭前确认
@close="handleClose"  // handleClose 调 beforeClose
```

### ❌ Pitfall 4: 状态徽章直接显示内部枚举值

```ts
// ❌ "todo" "in_progress" 暴露给用户
<span>{{ record.status }}</span>

// ✅ 映射到友好标签
<span class="text-semantic-info">进行中</span>
```

### ❌ Pitfall 5: ID / 长字符串没提供复制按钮

```ts
// ❌ 用户想用 ID 搜别的，必须手动选中
<span>{{ record.id }}</span>

// ✅ 长字段提供复制
<copyable-text :text="record.id" />
```

---

## Minimal Vue 3 template

```vue
<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<DetailDrawerProps>(), {
  width: 520,
})

const emit = defineEmits<{
  (e: 'update:open', v: boolean): void
  (e: 'action', key: string): void
}>()

const visibleFields = computed(() => props.fields || [])

const onClose = async () => {
  if (props.beforeClose) {
    const ok = await props.beforeClose()
    if (!ok) return
  }
  emit('update:open', false)
}
</script>

<template>
  <a-drawer
    :open="open"
    :width="width"
    placement="right"
    :title="title"
    :footer="null"
    @close="onClose"
  >
    <div v-if="subtitle" class="text-caption text-ink-tertiary mb-4">
      {{ subtitle }}
    </div>

    <div class="flex flex-col gap-4 max-h-[calc(100vh-180px)] overflow-y-auto pr-1">
      <section
        v-for="(field, i) in visibleFields"
        :key="field.key"
        class="grid grid-cols-3 gap-3 py-2 border-b border-border-faint last:border-b-0"
      >
        <div class="text-caption text-ink-tertiary pt-0.5">{{ field.label }}</div>
        <div class="col-span-2 text-body text-ink-default break-words">
          <template v-if="field.type === 'status'">
            <a-tag :color="statusColor(record[field.key])">
              {{ field.format ? field.format(record[field.key], record) : record[field.key] }}
            </a-tag>
          </template>
          <template v-else-if="field.type === 'tags'">
            <a-tag v-for="t in record[field.key]" :key="t" class="mr-1">
              {{ t }}
            </a-tag>
          </template>
          <template v-else-if="field.copyable">
            <a-typography-paragraph :copyable="{ text: String(record[field.key] || '') }">
              {{ field.format ? field.format(record[field.key], record) : record[field.key] }}
            </a-typography-paragraph>
          </template>
          <template v-else>
            {{ field.format ? field.format(record[field.key], record) : record[field.key] }}
          </template>
        </div>
      </section>
    </div>

    <div
      v-if="footerActions?.length"
      class="flex justify-end gap-2 pt-4 mt-4 border-t border-border-default"
    >
      <a-button
        v-for="a in footerActions"
        :key="a.key"
        :danger="a.tone === 'danger'"
        :type="a.tone === 'danger' ? 'default' : 'primary'"
        @click="emit('action', a.key)"
      >
        {{ a.label }}
      </a-button>
    </div>
  </a-drawer>
</template>
```

---

## Acceptance check

- [ ] 宽度 480-560px
- [ ] 内容区有 max-height + 滚动
- [ ] 修改未保存关闭前确认
- [ ] 状态字段映射到友好标签
- [ ] 长字段（ID/URL）有复制按钮
- [ ] 底部操作按钮按 tone 区分主次
- [ ] 抽屉打开后键盘 Tab 在抽屉内循环
- [ ] 0 `v-if` + `v-for` 混用
