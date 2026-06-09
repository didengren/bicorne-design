# `model-selector` — 模型选择器

> 让用户在多个 LLM 模型（GPT-4o / Claude 3.5 / Gemini / 本地模型）间切换。是 LLM Chat / Agent 工作台的必备组件。

---

## 何时用 / 何时不用

✅ **用**：支持多模型路由的 AI 产品（Vercel AI Playground / Cursor / Poe / OpenRouter）
❌ **不用**：单模型应用 / 用户无感选择（隐藏在 settings）

---

## Mandatory tokens

| Token path | 用途 |
|---|---|
| `colors.surface.elevated` | Dropdown 浮层背景 |
| `colors.surface.1` | 选项 hover 背景 |
| `colors.border.subtle` | Dropdown 边框 |
| `colors.text.default` | 模型名 / 描述 |
| `colors.text.muted` | 能力标签 / 上下文长度 |
| `colors.accent.primary` | 当前选中指示器 |
| `colors.provider.openai` (建议新增) | OpenAI 品牌色 |
| `colors.provider.anthropic` (建议新增) | Anthropic 品牌色 |
| `colors.provider.google` (建议新增) | Google 品牌色 |
| `borderRadius.md` | Dropdown 圆角 |
| `shadow.elevated` | Dropdown 阴影 |

---

## Recommended props

```ts
interface ModelInfo {
  id: string                    // 'gpt-4o' / 'claude-3.5-sonnet' / 'llama-3-70b'
  displayName: string            // 'GPT-4o' / 'Claude 3.5 Sonnet'
  provider: 'openai' | 'anthropic' | 'google' | 'meta' | 'custom'
  providerIcon?: string | Component
  contextWindow: number          // 128000 / 200000
  capabilities: ('text' | 'vision' | 'tools' | 'code' | 'audio')[]
  pricing?: { input: number; output: number; unit: 'per_1m_tokens' }
  description?: string           // 1 行说明
  isBeta?: boolean               // 标记 beta 模型
  isPro?: boolean                // 仅 Pro 可见
}

interface ModelSelectorProps {
  models: ModelInfo[]            // 至少 2 个
  currentModelId: string
  /** 按 provider 分组显示 */
  groupByProvider?: boolean      // 默认 true
  /** 是否显示 context window 数字 */
  showContextWindow?: boolean    // 默认 true
  /** 是否显示定价 */
  showPricing?: boolean          // 默认 false
  /** 切换回调 */
  onChange?: (modelId: string) => void
  /** 触发器位置 */
  placement?: 'top' | 'bottom'   // 默认 bottom
}
```

---

## Anatomy

### 1. 触发器（compact）

```
┌─────────────────────────────────────┐
│ [🤖] Claude 3.5 Sonnet       ▼    │  ← 当前模型
└─────────────────────────────────────┘
```

### 2. 触发器（detail，多用于 AI 工作台顶栏）

```
┌────────────────────────────────────────────────────────┐
│ [🎨] Claude 3.5 Sonnet · 200K context · ⓘ         ▼ │
└────────────────────────────────────────────────────────┘
```

### 3. Dropdown 浮层（按 provider 分组）

```
┌──────────────────────────────────────────────────────┐
│  ── Anthropic ───────────────────────────────────    │
│  ✓ [🟠] Claude 3.5 Sonnet                            │  ← 当前选中（带 ✓）
│       200K · text + vision + tools                   │
│     [🟠] Claude 3 Opus                                │
│       200K · text + tools                             │
│     [🟠] Claude 3 Haiku                  [BETA]      │
│       200K · text + tools                             │
│                                                       │
│  ── OpenAI ──────────────────────────────────────    │
│     [🟢] GPT-4o                                       │
│       128K · text + vision + tools                    │
│     [🟢] o1-preview                      [BETA]      │
│       128K · text + tools                             │
│                                                       │
│  ── Meta ────────────────────────────────────────    │
│     [🔵] Llama 3.1 70B                                │
│       128K · text + tools                             │
│                                                       │
│  ── Local ──────────────────────────────────────     │
│     [⚪] Custom Endpoint                       [PRO]  │
│       BYOK · unlimited                                │
│                                                       │
│  [⚙] Configure custom endpoint                       │
└──────────────────────────────────────────────────────┘
```

---

## 关键实现

### 1. 键盘导航（↑↓ + Enter + Esc）

```ts
const activeIdx = ref(0)
function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'ArrowDown') activeIdx.value = Math.min(activeIdx.value + 1, flatModels.length - 1)
  if (e.key === 'ArrowUp') activeIdx.value = Math.max(activeIdx.value - 1, 0)
  if (e.key === 'Enter') select(flatModels[activeIdx.value])
  if (e.key === 'Escape') close()
}
```

### 2. 搜索（模型多时建议加）

```vue
<input v-model="query" placeholder="Search models..." />
<div v-for="model in filteredModels" :key="model.id">...</div>
```

### 3. 当前模型持久化

```ts
localStorage.setItem('preferredModel', newModelId)
// 或同步到云端
await fetch('/api/user/preferences', { method: 'PATCH', body: JSON.stringify({ model: newModelId }) })
```

### 4. 模型不可用降级

```ts
async function select(id: string) {
  try {
    await switchModel(id)
  } catch (e) {
    // 降级到默认
    toast.error(`${models.find(m => m.id === id).displayName} is unavailable, falling back`)
    await switchModel(defaultModelId)
  }
}
```

---

## 性能与可达性

| 维度 | 要求 |
|---|---|
| Dropdown 打开 | ≤ 100ms（无网络） |
| 搜索过滤 | ≤ 16ms（≤ 50 个模型） |
| 键盘 | ↑↓ 导航 / Enter 选 / Esc 关 / 字母跳到匹配项 |
| 屏幕阅读器 | `role="listbox"` + `aria-activedescendant` |
| 高亮 | 当前模型用 ✓ + 左侧 accent bar |
| 不可用模型 | 灰色 + tooltip "Rate limited" / "Pro only" |

---

## 反模式

1. ❌ 模型名直接写 "gpt-4o-2024-08-06" → 用户看不懂
2. ❌ 不显示 context window → 用户发长文档超出限制报错
3. ❌ 所有模型都显示一样 → 失去差异感
4. ❌ 切换模型不重置当前对话 → 内容上下文不匹配
5. ❌ 模型不可用不提示 → 用户点了才报 "rate limited"
6. ❌ Provider 图标都是灰色 → 失去品牌识别
