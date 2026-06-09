# `prompt-composer` — 提示词输入框

> 用户输入提示词的地方。比普通 textarea 复杂：支持 @ 引用文件、附件、语音、提示词模板、多行编辑、键盘快捷键。是 AI 产品的"输入门户"。

---

## 何时用 / 何时不用

✅ **用**：AI 产品的提示词输入（chat 输入框 / 提示词编辑模态框）
❌ **不用**：简单搜索框 / 评论框（用 Admin Panels 的 form-field）

---

## Mandatory tokens

| Token path | 用途 |
|---|---|
| `colors.surface.1` | 输入框背景 |
| `colors.surface.2` | 输入框 hover / focus 背景 |
| `colors.border.subtle` | 边框默认 |
| `colors.border.focus` (新增) | 边框 focus 状态 |
| `colors.accent.primary` | 发送按钮 / @ 引用高亮 |
| `colors.attachment.bg` (新增) | 附件卡背景 |
| `colors.text.placeholder` | placeholder 文字 |
| `borderRadius.xl` | 输入框圆角（16-20px，更柔和） |
| `motion.duration.fast` | focus 动画 100-150ms |

---

## Recommended props

```ts
interface Attachment {
  id: string
  type: 'file' | 'image' | 'audio' | 'code'
  name: string
  size: number        // bytes
  mimeType: string
  preview?: string    // 图片缩略图 / code 首行
  url?: string
}

interface PromptTemplate {
  id: string
  name: string
  icon?: string
  content: string
  shortcut?: string   // '/summarize' 等
}

interface PromptComposerProps {
  modelValue: string
  attachments?: Attachment[]
  templates?: PromptTemplate[]
  placeholder?: string
  /** 是否在底部显示 token 估算 */
  showTokenCount?: boolean         // 默认 true
  /** 限制最大长度（字符） */
  maxLength?: number               // 默认 32000
  /** 是否禁用（模型不可用时） */
  disabled?: boolean
  /** 是否有附件 */
  enableAttachments?: boolean      // 默认 true
  /** 是否有 @ 引用 */
  enableMention?: boolean          // 默认 true（@ file / @ doc）
  /** 是否有语音 */
  enableVoice?: boolean            // 默认 true
  /** 是否显示模型选择器（嵌入 trigger） */
  showModelSelector?: boolean      // 默认 false（用顶栏的）
  /** 自定义发送快捷键 */
  submitKey?: 'enter' | 'cmd-enter'  // 默认 cmd-enter
  onSubmit: (value: string, attachments: Attachment[]) => void
  onStop?: () => void              // 流式中显示停止按钮
  isStreaming?: boolean
}
```

---

## Anatomy

### 1. 空态

```
┌──────────────────────────────────────────────────────┐
│ [✦] Ask anything, or press / for templates            │
│                                                       │
│                                                       │
│   [📎] [@]  [🎤]                          [Model ▼]  │
└──────────────────────────────────────────────────────┘
                                                       ↑ 底部工具栏
```

### 2. 已输入 + 附件

```
┌──────────────────────────────────────────────────────┐
│ ┌──────────┐  ┌──────────┐                           │
│ │📄 auth.ts│  │🖼 ui.png │  ← 附件（可点击预览，X 删除）│
│ │ 2.4KB  ✕ │  │ 340KB ✕ │                           │
│ └──────────┘  └──────────┘                           │
│                                                       │
│ Fix the @auth.ts bug, the error says:                │  ← @ 引用高亮
│ "Cannot read property 'email' of null"               │
│                                                       │
│                                                       │
│  [📎] [@]  [🎤]    142/32000 · 2 files     [⏎ Send]│
└──────────────────────────────────────────────────────┘
```

### 3. 流式生成中

```
┌──────────────────────────────────────────────────────┐
│                                                       │
│   Looking into the auth flow...                      │  ← user 输入已发送
│                                                       │
│                                                       │
│  [⏹ Stop]      ← Stop 按钮替代 Send                  │
└──────────────────────────────────────────────────────┘
```

### 4. `/` 触发模板选择

```
┌──────────────────────────────────────────────────────┐
│   Summarize the @doc.md file /                       │  ← 输入 `/`
├──────────────────────────────────────────────────────┤
│  ⌘ Summarize            /summarize                   │
│    Condense long text into key points                │
│  ⌘ Translate to Chinese /translate-zh                │
│    Convert text to Simplified Chinese                │
│  ⌘ Explain like I'm 5  /eli5                         │
│    Simple explanation with examples                  │
└──────────────────────────────────────────────────────┘
```

---

## 关键实现

### 1. 自适应高度（textarea）

```ts
function autoResize(el: HTMLTextAreaElement) {
  el.style.height = 'auto'
  el.style.height = `${Math.min(el.scrollHeight, 240)}px`  // 最大 10 行
}
```

### 2. @ 触发文件选择（popover）

```ts
function onAtTrigger() {
  // 显示浮层，列出最近文件
  showFilePicker.value = true
}
function onFilePick(file: File) {
  attachments.value.push({ id: nanoid(), type: 'file', name: file.name, ... })
  // 在 textarea 插入 @filename
}
```

### 3. 拖拽上传

```ts
function onDrop(e: DragEvent) {
  e.preventDefault()
  for (const file of e.dataTransfer.files) {
    attachments.value.push({ id: nanoid(), type: 'image', ... })
  }
}
```

### 4. 语音输入（Web Speech API）

```ts
const recognition = new webkitSpeechRecognition()
recognition.onresult = (e) => {
  text.value += e.results[e.results.length - 1][0].transcript
}
```

### 5. 字符 / token 估算

```ts
// 粗略估算：1 token ≈ 4 字符（英文）/ 1.5 字符（中文）
const estTokens = computed(() => Math.ceil(modelValue.value.length / 3.5))
```

### 6. 历史输入（↑ 唤起）

```ts
const history = ['previous prompt 1', 'previous prompt 2']
let histIdx = history.length
function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'ArrowUp' && textarea.selectionStart === 0) {
    histIdx = Math.max(0, histIdx - 1)
    modelValue.value = history[histIdx]
  }
}
```

---

## 性能与可达性

| 维度 | 要求 |
|---|---|
| 输入响应 | ≤ 16ms（无卡顿） |
| 附件上传 | 显示进度条（百分比） |
| 拖拽 | 整个 input 区域接受 drop |
| 键盘 | `Cmd+Enter` 发送 / `Shift+Enter` 换行 / `↑` 历史 |
| 屏幕阅读器 | attachments 用 `role="list"`，删除按钮有 aria-label |
| 移动端 | 触发键盘原生，附件按钮在 toolbar 单独一行 |
| 粘贴图片 | `paste` 事件捕获剪贴板图片 → 附件 |

---

## 反模式

1. ❌ 输入框固定 1 行 → 长 prompt 滚动痛苦
2. ❌ Enter 直接发送 → 用户想换行时按错
3. ❌ 附件没有删除按钮 / 预览 → 黑盒
4. ❌ 不显示 token 估算 → 用户超出 model 限制
5. ❌ 语音按钮在桌面没禁用 → 浏览器不支持还显示
6. ❌ 拖拽只接受文件 → 拖图片也接受但样式没区分
7. ❌ `/` 模板不模糊搜索 → 模板多了找不到
