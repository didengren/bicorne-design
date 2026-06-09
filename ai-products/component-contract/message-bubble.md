# `message-bubble` — 多模态消息

> 单条消息的容器：可以是纯文本、代码、图片、文件附件、工具调用、引用源。MVI 阶段合并到一个组件（多 variant），避免组件爆炸。

---

## 何时用 / 何时不用

✅ **用**：所有 AI 产品的单条消息渲染（用户消息 / AI 回答 / system 提示）
❌ **不用**：纯静态文本（用 Admin Panels 的 form-section）

---

## Mandatory tokens

| Token path | 用途 |
|---|---|
| `colors.surface.1` | 用户消息气泡背景（通常对比色） |
| `colors.surface.2` | AI 消息气泡背景（通常更柔和） |
| `colors.border.subtle` | Code block 边框 / 文件卡边框 |
| `colors.text.default` | 消息正文 |
| `colors.text.muted` | 时间戳 / 附件大小 |
| `colors.code.bg` (建议新增) | Code block 背景（深色） |
| `colors.code.text` (建议新增) | Code block 文字（亮色） |
| `borderRadius.lg` | 气泡圆角（8-12px） |
| `spacing.{2,3,4,6}` | 气泡内边距 |

---

## Recommended props

```ts
type MessageRole = 'user' | 'assistant' | 'system'
type MessageBlock =
  | { type: 'text'; content: string }
  | { type: 'code'; language: string; content: string; filename?: string }
  | { type: 'image'; url: string; alt: string; width?: number; height?: number }
  | { type: 'file'; name: string; size: number; mimeType: string; url: string }
  | { type: 'tool'; toolCall: ToolCall }   // 见 tool-call-card.md
  | { type: 'citation'; citation: Citation }  // 见 citation-source.md
  | { type: 'table'; headers: string[]; rows: string[][] }

interface MessageBubbleProps {
  role: MessageRole
  blocks: MessageBlock[]         // 一条消息可包含多种 block
  author?: string                 // "Claude 3.5" / "GPT-4o"
  avatar?: string                 // 头像 URL / icon
  timestamp: string               // ISO
  isStreaming?: boolean           // 是否在流式
  streamingBlockIdx?: number      // 当前流式渲染到第几个 block
  onCopy?: () => void
  onRegenerate?: () => void
  onFeedback?: (rating: 'up' | 'down') => void
}
```

---

## Anatomy（多 variant）

### 1. 文本消息（最常见）

```
┌─────────────────────────────────────────┐
│ [User Avatar]  You · 14:23               │
│                                          │
│   What is the capital of France?         │  ← 用户问题
│                                          │
└─────────────────────────────────────────┘
```

### 2. AI 回答（多 block 混合）

```
┌─────────────────────────────────────────┐
│ [AI Avatar]  Claude 3.5 · 14:23 · 1.2s  │
│                                          │
│   The capital of France is **Paris**.    │  ← text block (markdown)
│                                          │
│   ┌─────────────────────────────────┐    │
│   │ Paris, officially known as the   │    │  ← table block
│   │ City of Paris, is the capital... │    │
│   ├──────────┬────────┬─────────────┤    │
│   │ Country  │ Cap.   │ Population  │    │
│   ├──────────┼────────┼─────────────┤    │
│   │ France   │ Paris  │ 2.16M       │    │
│   └──────────┴────────┴─────────────┘    │
│                                          │
│   > Source: wikipedia.org/Paris          │  ← citation block
│                                          │
│   [📋 Copy]  [🔄]  [👍]  [👎]            │
└─────────────────────────────────────────┘
```

### 3. 代码片段（用户上传 / AI 生成）

```
┌─────────────────────────────────────────┐
│ [User Avatar]  You · 14:25               │
│                                          │
│   ┌──────────────────────────────────┐   │
│   │ 📄 auth.ts · 2.4KB    [View]     │   │  ← file block
│   └──────────────────────────────────┘   │
│                                          │
│   Fix the auth bug in this file          │
└─────────────────────────────────────────┘
```

### 4. 图片消息

```
┌─────────────────────────────────────────┐
│ [User Avatar]  You · 14:25               │
│                                          │
│   ┌────────────────────┐                 │
│   │                    │                 │  ← image block
│   │   [screenshot]     │                 │
│   │   400×300          │                 │
│   └────────────────────┘                 │
│                                          │
│   What's wrong here?                     │
└─────────────────────────────────────────┘
```

### 5. AI 含工具调用（Agent 类）

```
┌─────────────────────────────────────────┐
│ [AI Avatar]  Cursor · 14:25              │
│                                          │
│   Let me check the file first.           │
│                                          │
│   > ⚙️ read_file: src/auth.ts           │  ← tool block
│   ✓ 2.4KB · 3 functions                 │
│                                          │
│   Found the bug. Here's the fix:         │
│   ┌────────────────────────────────┐     │
│   │ ts - export function ...        │     │  ← code block
│   │   + return user?.email ?? null  │     │
│   └────────────────────────────────┘     │
│                                          │
│   [Apply]  [Show diff]  [📋]            │
└─────────────────────────────────────────┘
```

---

## 关键实现

### 1. Markdown + Code 高亮（用 marked + shiki / highlight.js）

```ts
import { marked } from 'marked'
import { codeToHtml } from 'shiki'

const html = marked.parse(block.content)
const highlightedCode = await codeToHtml(block.content, { lang: block.language, theme: 'github-dark' })
```

### 2. 块级 vs 行内

- **块级**（独占一行）：text / code / image / file / table
- **行内**（在 text 中）：粗体 / 斜体 / 行内 code / 链接

```vue
<template v-for="block in blocks" :key="block.id">
  <CodeBlock v-if="block.type === 'code'" v-bind="block" />
  <ImageBlock v-else-if="block.type === 'image'" v-bind="block" />
  <TextBlock v-else v-bind="block" />
</template>
```

### 3. 流式部分渲染（与 chat-stream 协作）

- 只渲染 `blocks[0..streamingBlockIdx]` + 当前 block 的部分内容
- 不渲染未到达的 block（避免空内容塌缩）

### 4. 复制（整段 + 单 block）

```ts
function copy() {
  const text = blocks.map(b => b.type === 'text' ? b.content : b.type === 'code' ? `\`\`\`${b.language}\n${b.content}\n\`\`\`` : '').join('\n')
  navigator.clipboard.writeText(text)
}
```

---

## 性能与可达性

| 维度 | 要求 |
|---|---|
| 渲染 | 单条消息 ≤ 16ms 渲染（即使 10+ blocks） |
| 图片懒加载 | `loading="lazy"`，但用户消息立即加载 |
| Code block | 虚拟滚动（> 50 行才启用） |
| 屏幕阅读器 | blocks 用 `role="article"`，每 block 有 aria-label |
| 复制反馈 | 复制后 2s 内显示 "Copied!" |
| 错误块 | API 错误用红色边框 + 重试按钮，不静默吞 |

---

## 反模式

1. ❌ 所有 block 都用同一字号 / 间距 → 视觉混乱
2. ❌ Code block 没有行号 / 复制按钮 → 难以交互
3. ❌ 图片不限制最大宽度 → 撑爆布局
4. ❌ 工具调用结果不显示（黑盒） → 失去信任
5. ❌ Markdown 解析不做 XSS 防护 → 高危
6. ❌ 消息无 role 区分（用户 / AI / system 都长一样） → 失去上下文
