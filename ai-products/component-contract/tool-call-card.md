# `tool-call-card` — 工具调用结果卡

> AI Agent 调用外部工具（read_file / bash / browser / search / api）时，显示调用过程和结果。是 AI 产品的"透明信任"组件。

---

## 何时用 / 何时不用

✅ **用**：任何有 function calling / tool use 的 AI 产品（Cursor / Claude with tools / Copilot Studio）
❌ **不用**：纯文本对话（无工具）/ 后台执行（用 Admin Panels 的 audit log）

---

## Mandatory tokens

| Token path | 用途 |
|---|---|
| `colors.tool.bg` (新增) | 卡片背景（淡灰 / 蓝灰） |
| `colors.tool.border` (新增) | 卡片左边框（accent）/ 错误状态红色 |
| `colors.tool.icon` (新增) | 工具图标（一般用 muted 灰） |
| `colors.status.success` | ✓ 成功状态 |
| `colors.status.error` | ✗ 失败状态 |
| `colors.status.running` | ● 运行中（脉冲动画） |
| `colors.text.muted` | 工具名 / 调用参数 |
| `fontFamilies.mono` | 强制等宽字体（参数 / 输出） |
| `spacing.{2,3,4}` | 卡片内边距 |

---

## Recommended props

```ts
type ToolStatus = 'pending' | 'running' | 'success' | 'error' | 'cancelled'

interface ToolCall {
  id: string
  name: string                // 'read_file' / 'bash' / 'web_search'
  displayName?: string        // 'Read file' / 'Run command'（友好名）
  icon?: string | Component   // 工具图标
  /** 调用的参数（JSON） */
  input: Record<string, unknown>
  /** 执行结果（字符串 / JSON / 文件） */
  output?: string
  /** 错误信息 */
  error?: string
  status: ToolStatus
  /** 开始时间 / 结束时间 / 耗时（ms） */
  startedAt: string
  finishedAt?: string
  durationMs?: number
  /** 是否需要用户确认（高风险操作） */
  requiresConfirmation?: boolean
  /** 用户确认回调 */
  onConfirm?: () => void
  onCancel?: () => void
  /** 点击展开/收起 */
  defaultExpanded?: boolean
}

interface ToolCallCardProps {
  toolCall: ToolCall
  /** 点击查看完整输出 */
  onViewOutput?: () => void
  /** 是否可重试（仅 error 状态） */
  onRetry?: () => void
}
```

---

## Anatomy

### 1. Pending（等待用户确认）

```
┌──────────────────────────────────────────────────┐
│ ⚠ Read file · src/auth.ts                        │  ← 高风险警告
│    Path: src/auth.ts                              │
│    Encoding: utf-8                                │
│                                                   │
│              [Decline]  [Allow]                   │  ← 用户决策
└──────────────────────────────────────────────────┘
```

### 2. Running（执行中）

```
┌──────────────────────────────────────────────────┐
│ ●  Running read_file...  · 0.8s                  │  ← 脉冲动画
│    Path: src/auth.ts                              │
│                                                   │
│    ⏳ Loading...                                  │  ← 进度指示
└──────────────────────────────────────────────────┘
```

### 3. Success（已折叠，默认态）

```
┌──────────────────────────────────────────────────┐
│ ✓  Read file · src/auth.ts  · 2.4KB · 124ms  [▾]│  ← 可展开
└──────────────────────────────────────────────────┘
```

### 4. Success（已展开）

```
┌──────────────────────────────────────────────────┐
│ ✓  Read file · src/auth.ts  · 2.4KB · 124ms  [▴]│
│    ┌──────────────────────────────────────────┐  │
│    │ import { auth } from './auth'             │  │  ← 等宽字体 + 截断
│    │ export async function login(user) {       │  │
│    │   return auth.signInWithEmail(...)        │  │
│    │ ... (24 more lines)                       │  │
│    └──────────────────────────────────────────┘  │
│    [📋 Copy]  [Open in editor]                    │
└──────────────────────────────────────────────────┘
```

### 5. Error（失败）

```
┌──────────────────────────────────────────────────┐
│ ✗  Bash · npm test  · 0 errors · 8.2s  [▾]      │  ← 红色边框
│    Exit code 1                                    │
│    ┌──────────────────────────────────────────┐  │
│    │ FAIL src/auth.test.ts                     │  │  ← 错误堆栈
│    │   ● login() should return user           │  │
│    │     TypeError: Cannot read property ...   │  │
│    └──────────────────────────────────────────┘  │
│    [📋 Copy]  [🔄 Retry]                          │
└──────────────────────────────────────────────────┘
```

---

## 关键实现

### 1. 状态机（status transition）

```ts
// pending → running → success / error
// pending → cancelled（用户拒绝）
// running → cancelled（用户停止）
// error → running（重试）
```

### 2. 状态颜色 / 动画映射

```ts
const STATUS_CONFIG: Record<ToolStatus, { color: string; icon: string; pulse?: boolean }> = {
  pending:    { color: 'colors.status.warning', icon: '⚠' },
  running:    { color: 'colors.status.running', icon: '●', pulse: true },
  success:    { color: 'colors.status.success', icon: '✓' },
  error:      { color: 'colors.status.error',   icon: '✗' },
  cancelled:  { color: 'colors.status.muted',   icon: '⊘' },
}
```

### 3. 等宽字体 + 截断

```vue
<pre class="font-mono text-xs max-h-40 overflow-auto whitespace-pre-wrap break-all">{{ toolCall.output }}</pre>
```

### 4. 长输出自动收起（> 20 行）

```ts
const shouldTruncate = computed(() => (toolCall.output?.split('\n').length ?? 0) > 20)
const displayOutput = computed(() => shouldTruncate.value
  ? toolCall.output?.split('\n').slice(0, 20).join('\n') + '\n...'
  : toolCall.output)
```

### 5. 高风险操作确认（写文件 / bash）

```ts
// 客户端拦截 + 服务端验证
const DANGEROUS_TOOLS = ['write_file', 'bash', 'delete_file', 'run_command']
if (DANGEROUS_TOOLS.includes(toolCall.name)) {
  // 必须 onConfirm 才执行
}
```

---

## 性能与可达性

| 维度 | 要求 |
|---|---|
| 状态更新 | 实时（< 100ms 反映 running → success） |
| 输出渲染 | 长输出懒渲染（> 1KB 虚拟滚动） |
| 键盘 | `Enter` 展开/收起，`Cmd+R` 重试 |
| 屏幕阅读器 | 状态用 `aria-live="polite"`，error 用 `role="alert"` |
| 复制反馈 | 复制后 2s "Copied!" |
| 重试防抖 | 1s 内只能点一次 |

---

## 反模式

1. ❌ 工具调用完全隐藏 → 用户不信任"AI 做了什么"
2. ❌ 输出用纯文本不格式化 → 难读
3. ❌ 错误信息只显示 "Error" → 不给堆栈
4. ❌ 高风险操作不要求确认 → 安全隐患
5. ❌ 重试按钮一直可点 → 重复失败
6. ❌ 状态颜色不区分（都灰色） → 失去反馈
7. ❌ 同时显示 10+ 工具调用没分隔 → 视觉混乱
