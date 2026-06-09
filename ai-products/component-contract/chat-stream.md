# `chat-stream` — 流式对话

> AI 产品最核心的交互：模型回答以 token-by-token 方式流式渲染。Cursor / Claude / ChatGPT / Vercel AI Playground 都基于这个组件。

---

## 何时用 / 何时不用

✅ **用**：LLM Chat / Agent / Copilot / AI 工作台
❌ **不用**：一次性完整响应（如分类、摘要、提取）/ 纯文本编辑（用 Admin Panels 的 form-field）

---

## Mandatory tokens

| Token path | 用途 |
|---|---|
| `colors.surface.1` | 消息气泡背景 |
| `colors.surface.2` | 流式背景（与已渲染区区分） |
| `colors.border.subtle` | 消息气泡分隔 |
| `colors.text.default` | 消息正文 |
| `colors.text.muted` | 时间戳 / token 计数 |
| `colors.accent.primary` | 用户消息高亮 / 用户头像背景 |
| `colors.accent.ai` (建议新增) | AI 头像背景（区别于用户） |
| `motion.duration.stream` (新增) | 字符流入动画 30-50ms/字 |
| `motion.easing.linear` | 线性（不减速），保持流式感 |

---

## Recommended props

```ts
interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  /** 完整内容（已流完） */
  content: string
  /** 当前流式缓冲内容（仅在 isStreaming 时使用） */
  pendingContent?: string
  /** 是否正在流式渲染 */
  isStreaming?: boolean
  /** 关联的工具调用 */
  toolCalls?: ToolCall[]
  /** 关联的引用源 */
  citations?: Citation[]
  /** 元数据：模型 / token 数 / 耗时 */
  meta?: { model: string; tokens: number; durationMs: number }
  timestamp: string  // ISO
}

interface ChatStreamProps {
  messages: Message[]
  /** 是否启用打字机光标（▌） */
  typewriterCursor?: boolean   // 默认 true
  /** 是否自动滚动到底部 */
  autoScroll?: boolean         // 默认 true
  /** 渲染 markdown / code 高亮 */
  renderer?: 'markdown' | 'plain'  // 默认 markdown
  /** 自定义空状态 */
  emptyState?: Component
  /** 点击 message 回调 */
  onMessageClick?: (id: string) => void
}
```

---

## Anatomy

```
┌──────────────────────────────────────────────────────────┐
│ [AI Avatar]  Assistant  · Claude 3.5 · 2.1s             │  ← message meta
│                                                          │
│   Here's a quick example using useState:                 │  ← message body
│   ┌──────────────────────────────────────────────────┐  │
│   │ const [count, setCount] = useState(0)             │  │  ← code block
│   │ ...                                               │  │
│   └──────────────────────────────────────────────────┘  │
│   > ⚙️ ran `npm install`                                │  ← tool call inline
│                                                          │
│   [📋 Copy]  [🔄 Regenerate]  [👍]  [👎]                │  ← action row
│                                          ⌥ meta · 142t  │  ← token count
└──────────────────────────────────────────────────────────┘
```

---

## 关键实现

### 1. 流式渲染（核心）

```ts
// SSE 接收 → 增量更新 pendingContent → 帧节流（requestAnimationFrame）
async function* streamResponse(prompt: string): AsyncIterable<string> {
  const res = await fetch('/api/chat', { method: 'POST', body: JSON.stringify({ prompt }) })
  const reader = res.body!.getReader()
  const decoder = new TextDecoder()
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    const chunk = decoder.decode(value, { stream: true })
    for (const line of chunk.split('\n').filter(Boolean)) {
      const data = JSON.parse(line.replace(/^data: /, ''))
      yield data.token
    }
  }
}

// Vue 组件内：每 16ms 最多 flush 一次
let buffer = ''
let scheduled = false
function onToken(token: string) {
  buffer += token
  if (!scheduled) {
    scheduled = true
    requestAnimationFrame(() => {
      message.pendingContent += buffer
      buffer = ''
      scheduled = false
    })
  }
}
```

### 2. 打字机光标

```vue
<span v-if="msg.isStreaming && typewriterCursor" class="inline-block w-[1ch] -mb-[2px] animate-pulse">▌</span>
```

### 3. 停止生成（AbortController）

```ts
const controller = new AbortController()
fetch('/api/chat', { signal: controller.signal })
const stop = () => controller.abort()
```

### 4. 重新生成（保留上下文）

```ts
// 删除最后一条 assistant 消息，保留 user 消息
// 重新调用 streamResponse(lastUserPrompt)
```

### 5. 自动滚动到底部

```ts
// 使用 sentinel + IntersectionObserver
// 比 scrollTop = scrollHeight 更平滑（避免抖动）
```

---

## 性能与可达性

| 维度 | 要求 |
|---|---|
| TTFT | ≤ 800ms（流式开始） |
| 流式帧率 | ≥ 30fps（60fps 更好），用 rAF 节流 |
| 长对话 | 100+ 轮不卡（虚拟滚动：未读部分保留，已读部分卸载） |
| 屏幕阅读器 | 用 `aria-live="polite"` 通知新消息；流式过程不重复播报 |
| 键盘 | `Cmd+Enter` 发送，`Cmd+.` 停止生成，`Cmd+Shift+R` 重新生成 |
| 减少布局抖动 | 等宽字体 + `min-height` 预估，避免滚动条跳 |

---

## 反模式（详见 [../pitfalls/README.md#1-流式](../pitfalls/README.md)）

1. ❌ 一次性渲染完整响应（无流式） → 用户以为卡死
2. ❌ 流式过程显示 spinner → 应该显示打字机光标
3. ❌ 打字机光标闪烁太慢（>200ms） → 显呆滞
4. ❌ 流式过程禁用"停止"按钮 → 失去用户控制
5. ❌ Code block 用等宽宽度 + overflow:auto 而非等宽字体 + 折行 → 体验差
6. ❌ 不显示 token 计数 / 成本 → 用户无法决策
