/**
 * Mock data for the Cursor-style IDE verification (6-1).
 * AI 工作台静态数据：files / messages / tool-calls / citations。
 */

export interface FileNode {
  id: string
  name: string
  path: string
  type: 'file' | 'folder'
  icon?: string
  children?: FileNode[]
  language?: string
}

export interface EditorTab {
  id: string
  name: string
  path: string
  language: 'typescript' | 'tsx' | 'json' | 'css'
  isDirty?: boolean
  content: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  author: string
  authorIcon: string
  timestamp: string
  blocks: ChatBlock[]
  meta?: { model: string; tokens: number; durationMs: number }
  isStreaming?: boolean
}

export type ChatBlock =
  | { type: 'text'; content: string }
  | { type: 'code'; language: string; content: string; filename?: string }
  | { type: 'tool'; tool: ToolCall }
  | { type: 'citation'; citation: Citation }

export interface ToolCall {
  id: string
  name: string
  displayName: string
  icon: string
  input: Record<string, unknown>
  output?: string
  error?: string
  status: 'pending' | 'running' | 'success' | 'error'
  startedAt: string
  finishedAt?: string
  durationMs?: number
  defaultExpanded?: boolean
}

export interface Citation {
  id: string
  url: string
  title: string
  snippet: string
  sourceType: 'web' | 'doc' | 'wiki' | 'code'
  domain: string
}

export interface ModelInfo {
  id: string
  displayName: string
  provider: 'anthropic' | 'openai' | 'google' | 'cursor'
  contextWindow: number
  capabilities: ('text' | 'vision' | 'tools' | 'code')[]
  isPro?: boolean
  isBeta?: boolean
}

/** File tree（mock 简化） */
export const fileTree: FileNode[] = [
  {
    id: 'f-root', name: 'project', type: 'folder', icon: '📁',
    children: [
      { id: 'f-src', name: 'src', type: 'folder', icon: '📁', children: [
        { id: 'f-app', name: 'App.tsx', type: 'file', icon: '⚛️', language: 'tsx' },
        { id: 'f-auth', name: 'auth.ts', type: 'file', icon: '📄', language: 'typescript' },
        { id: 'f-index', name: 'main.tsx', type: 'file', icon: '⚛️', language: 'typescript' },
        { id: 'f-css', name: 'styles.css', type: 'file', icon: '🎨', language: 'css' },
      ]},
      { id: 'f-pkg', name: 'package.json', type: 'file', icon: '📦', language: 'json' },
      { id: 'f-readme', name: 'README.md', type: 'file', icon: '📝' },
    ],
  },
]

/** 当前打开的编辑器 tab */
export const editorTabs: EditorTab[] = [
  {
    id: 'tab-auth', name: 'auth.ts', path: 'src/auth.ts', language: 'typescript', isDirty: true,
    content: `import { signInWithEmail, getUserById } from './api'

export interface User {
  id: string
  email: string
  name: string
  createdAt: string
}

export async function login(email: string, password: string): Promise<User | null> {
  const result = await signInWithEmail(email, password)
  if (!result.success) {
    return null
  }
  const user = await getUserById(result.userId)
  return user
}

export async function logout(userId: string): Promise<void> {
  await fetch(\`/api/logout/\${userId}\`, { method: 'POST' })
}

export async function getProfile(userId: string) {
  return getUserById(userId)
}`,
  },
]

/** 当前激活的 tab */
export const activeTabId = 'tab-auth'

/** 初始 chat 历史（包含 1 个 tool call + 1 个 code block） */
export const initialMessages: ChatMessage[] = [
  {
    id: 'm-1',
    role: 'user',
    author: 'You',
    authorIcon: '👤',
    timestamp: '14:23',
    blocks: [{ type: 'text', content: 'Why is login() returning null for valid credentials? Check auth.ts' }],
  },
  {
    id: 'm-2',
    role: 'assistant',
    author: 'Cursor',
    authorIcon: '⚡',
    timestamp: '14:23',
    meta: { model: 'claude-3.5-sonnet', tokens: 487, durationMs: 1240 },
    blocks: [
      { type: 'text', content: 'Let me look at the file to find the issue.' },
      {
        type: 'tool',
        tool: {
          id: 't-1', name: 'read_file', displayName: 'Read file', icon: '📄',
          input: { path: 'src/auth.ts' },
          output: 'import { signInWithEmail, getUserById } from \'./api\'\n\nexport async function login(email, password) { ... 32 lines }',
          status: 'success', startedAt: '14:23:01', finishedAt: '14:23:01', durationMs: 124,
          defaultExpanded: false,
        },
      },
      { type: 'text', content: 'Found the bug. In `signInWithEmail`, the API returns `result.userId` but the type definition uses `result.user.id`. The mismatch causes the type assertion to fail silently. Here\'s the fix:' },
      {
        type: 'code',
        language: 'typescript',
        filename: 'auth.ts',
        content: `export async function login(email: string, password: string): Promise<User | null> {
  const result = await signInWithEmail(email, password)
  if (!result.success || !result.user) {
    return null  // ← early return guards against undefined
  }
  return result.user  // ← return the user directly
}`,
      },
      { type: 'text', content: 'I also added a null check on `result.user` so we fail fast if the API ever returns a partial response.' },
    ],
  },
  {
    id: 'm-3',
    role: 'user',
    author: 'You',
    authorIcon: '👤',
    timestamp: '14:24',
    blocks: [{ type: 'text', content: 'Now add a test for the null case.' }],
  },
  {
    id: 'm-4',
    role: 'assistant',
    author: 'Cursor',
    authorIcon: '⚡',
    timestamp: '14:24',
    meta: { model: 'claude-3.5-sonnet', tokens: 0, durationMs: 0 },
    isStreaming: true,
    blocks: [
      { type: 'text', content: 'Adding a vitest case for the null path now' },
      { type: 'text', content: '' }, // 流式填充
    ],
  },
]

/** 可选模型列表（用于顶栏 model selector） */
export const availableModels: ModelInfo[] = [
  {
    id: 'claude-3.5-sonnet', displayName: 'Claude 3.5 Sonnet',
    provider: 'anthropic', contextWindow: 200000,
    capabilities: ['text', 'vision', 'tools', 'code'],
  },
  {
    id: 'gpt-4o', displayName: 'GPT-4o',
    provider: 'openai', contextWindow: 128000,
    capabilities: ['text', 'vision', 'tools', 'code'],
  },
  {
    id: 'cursor-fast', displayName: 'Cursor Fast',
    provider: 'cursor', contextWindow: 128000,
    capabilities: ['text', 'code'],
  },
  {
    id: 'gemini-1.5-pro', displayName: 'Gemini 1.5 Pro',
    provider: 'google', contextWindow: 2000000,
    capabilities: ['text', 'vision', 'tools', 'code'], isBeta: true,
  },
]

export const currentModelId = 'claude-3.5-sonnet'
