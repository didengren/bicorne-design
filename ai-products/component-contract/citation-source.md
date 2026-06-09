# `citation-source` — RAG 引用源

> 当 AI 回答基于外部文档（向量库 / Web / 内部 wiki）时，标注引用位置。是 RAG / Search 类 AI 产品的"可验证"组件。

---

## 何时用 / 何时不用

✅ **用**：RAG 应用 / Web 搜索 AI / 文档问答（Perplexity / Phind / Notion AI / Cursor Docs）
❌ **不用**：纯模型知识回答（无外部源）

---

## Mandatory tokens

| Token path | 用途 |
|---|---|
| `colors.citation.bg` (新增) | 引用块背景（极淡蓝/绿） |
| `colors.citation.border` (新增) | 引用左边框（accent / 弱化） |
| `colors.citation.hover` (新增) | hover 预览框背景 |
| `colors.text.muted` | 来源域名 / 作者 |
| `colors.text.default` | 引用文字正文 |
| `borderRadius.sm` | 小圆角（4-6px） |
| `shadow.elevated` | hover 浮层阴影 |
| `motion.duration.fast` | 浮层显示 100-150ms |

---

## Recommended props

```ts
interface Citation {
  id: string                   // 1, 2, 3（行内编号）
  url?: string                 // 'https://docs.example.com/auth'
  title: string                // 'Authentication · Docs'
  snippet: string              // 引用片段（100-300 字）
  sourceType: 'web' | 'doc' | 'wiki' | 'code' | 'pdf'
  sourceIcon?: string | Component
  domain?: string              // 'docs.example.com'（web 来源）
  author?: string              // 'John Doe'（wiki 来源）
  publishedAt?: string         // ISO
  /** 高亮命中关键词的范围 */
  highlightRanges?: Array<{ start: number; end: number }>
  /** 可选：精确位置（PDF 页码 / 行号） */
  location?: { page?: number; line?: number; section?: string }
}

interface CitationSourceProps {
  citations: Citation[]
  /** 引用显示形式 */
  variant: 'inline-number' | 'footnote' | 'hover-preview' | 'side-panel'
  /** hover 浮层是否显示 snippet 预览 */
  enableHoverPreview?: boolean  // 默认 true
  /** 点击是否跳转 */
  openInNewTab?: boolean        // 默认 true
  onCitationClick?: (id: string) => void
}
```

---

## Anatomy

### 1. Inline Number（行内编号，最常见）

回答文字中：

```
The capital of France is Paris[1]. It's located in the Île-de-France region[2][3]
and has a population of 2.16 million[1].
```

底部来源列表：

```
┌──────────────────────────────────────────────────────────┐
│  Sources:                                                │
│                                                           │
│  [1] Wikipedia — Paris (2024-09-15)                       │
│      https://en.wikipedia.org/wiki/Paris                  │
│                                                           │
│  [2] INSEE — Population Census (2024-01-01)               │
│      https://insee.fr/.../paris-population                │
│                                                           │
│  [3] Britannica — Paris (2024-08-22)                      │
│      https://britannica.com/place/Paris                   │
└──────────────────────────────────────────────────────────┘
```

### 2. Hover Preview（悬浮预览，Cursor / Phind 风）

回答文字中：

```
The capital of France is Paris[1]. It's located in the Île-de-France
region[2] and has a population of 2.16 million[1].
```

鼠标 hover 在 [1]：

```
┌────────────────────────────────────────────────┐
│ [🌐] en.wikipedia.org                [↗ Open]│
│                                                  │
│ Paris (/ˈpærɪs/; French pronunciation: [paʁi]) │
│ is the capital and most populous city of France │
│ with an estimated population of 2,165,423...    │
│                                                  │
│ — Wikipedia (2024-09-15)                          │
└────────────────────────────────────────────────┘
```

### 3. Side Panel（侧栏，Perplexity 风）

```
┌──────────────────────────────────────┬──────────────────────────┐
│ Answer                               │  Sources (3)              │
│                                      │                          │
│ The capital of France is Paris[1]... │  [1] Wikipedia           │
│ It's located in the Île-de-France... │      Paris               │
│                                      │      en.wikipedia.org    │
│ [1] [2] [3]                          │      2024-09-15          │
│                                      │                          │
│                                      │  [2] INSEE                │
│                                      │      Population Census   │
│                                      │      insee.fr            │
│                                      │      2024-01-01          │
└──────────────────────────────────────┴──────────────────────────┘
```

---

## 关键实现

### 1. 解析行内引用 + 注入

```ts
// 在 markdown 渲染前：识别 [1][2] → 替换为 <Citation id="1" />
function processCitations(text: string, citations: Citation[]): string {
  return text.replace(/\[(\d+)\]/g, (m, id) => {
    if (citations.find(c => c.id === id)) {
      return `<sup data-citation-id="${id}">[${id}]</sup>`
    }
    return m
  })
}
```

### 2. Hover Preview（debounce 200ms）

```vue
<template>
  <span
    @mouseenter="debouncedShow(citation.id)"
    @mouseleave="debouncedHide()"
  >[{{ citation.id }}]</span>
</template>

<script setup>
let timer: number | null = null
function debouncedShow(id: string) {
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => previewId.value = id, 200)
}
function debouncedHide() {
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => previewId.value = null, 150)
}
</script>
```

### 3. 关键词高亮（snippet 内）

```vue
<template v-for="(range, i) in citation.highlightRanges" :key="i">
  <mark>{{ snippet.slice(range.start, range.end) }}</mark>
</template>
```

### 4. 点击跳转

```ts
function onClick(c: Citation) {
  if (props.openInNewTab && c.url) {
    window.open(c.url, '_blank', 'noopener,noreferrer')
  } else {
    onCitationClick?.(c.id)
  }
}
```

### 5. 来源可信度排序

```ts
// 高权威（Wikipedia / 官方）放前；低权威（reddit / 论坛）放后
const AUTHORITATIVE_SOURCES = ['wikipedia.org', '.gov', '.edu', 'docs.', 'github.com']
const score = (c: Citation) => AUTHORITATIVE_SOURCES.some(d => c.domain?.includes(d)) ? 1 : 0
const sorted = citations.sort((a, b) => score(b) - score(a))
```

---

## 性能与可达性

| 维度 | 要求 |
|---|---|
| 渲染 | 100 个引用 ≤ 16ms |
| Hover 浮层 | 100-200ms debounce（避免误触） |
| 跳转 | `rel="noopener,noreferrer"`（安全） |
| 屏幕阅读器 | 引用用 `<sup>` + aria-label "Citation 1" |
| 键盘 | `Tab` 焦点 / `Enter` 打开 |
| 错误 | 链接 404 提示 "Source no longer available" |

---

## 反模式

1. ❌ 引用编号顺序混乱（先 3 后 1） → 用户对不上
2. ❌ 不显示来源域名 → 无法判断权威
3. ❌ Hover 浮层显示 0 内容 → 失去意义
4. ❌ 引用点击后当前页面跳转 → 用户失去 AI 回答上下文
5. ❌ 来源全部一个颜色 → 失去视觉区分
6. ❌ 没有"来源不可用"提示 → 死链体验差
7. ❌ PDF 引用不显示页码 → 无法定位
