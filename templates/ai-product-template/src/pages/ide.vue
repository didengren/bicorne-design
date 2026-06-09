<script setup lang="ts">
/**
 * CursorIDE 主页 — 双面板 IDE 布局
 * Layout: [FileExplorer | EditorView | ChatPanel]
 * 体现 6 个组件合约在 IDE 场景中的协同（chat-stream + message-bubble + tool-call-card
 * + prompt-composer + model-selector + citation-source 缩略）
 */
import { ref, computed } from 'vue'
import {
  CheckOutlined,
  CloseOutlined,
  SettingOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons-vue'
import {
  fileTree, editorTabs, activeTabId, initialMessages,
  availableModels, currentModelId,
} from '@/mock/ide'
import FileExplorer from '@/components/ai/FileExplorer.vue'
import EditorView from '@/components/ai/EditorView.vue'
import ChatPanel from '@/components/ai/ChatPanel.vue'

const messages = ref([...initialMessages])
const activeFileId = ref('f-auth')
const selectedModelId = ref(currentModelId)
const isStreaming = computed(() => messages.value.some(m => m.isStreaming))

const currentModel = computed(() =>
  availableModels.find(m => m.id === selectedModelId.value) ?? availableModels[0]
)

function onSend(value: string) {
  // 1. 添加 user 消息
  messages.value.push({
    id: `m-${Date.now()}`,
    role: 'user',
    author: 'You',
    authorIcon: '👤',
    timestamp: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
    blocks: [{ type: 'text', content: value }],
  })
  // 2. 添加流式 AI 占位
  messages.value.push({
    id: `m-${Date.now() + 1}`,
    role: 'assistant',
    author: 'Cursor',
    authorIcon: '⚡',
    timestamp: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
    isStreaming: true,
    blocks: [{ type: 'text', content: '' }],
  })
  // 3. 1.2s 后流式追加（mock 演示）
  setTimeout(() => {
    const last = messages.value[messages.value.length - 1]
    if (last && last.isStreaming) {
      last.blocks = [
        { type: 'text', content: 'Let me check the file first.' },
        { type: 'text', content: 'I see two issues:' },
        { type: 'text', content: '1. The function `getUserById` may return null if the user is not found.' },
        { type: 'text', content: '2. The `signInWithEmail` returns `result.userId` but you\'re using `result.user`.' },
      ]
      last.isStreaming = false
      last.meta = { model: currentModel.value.id, tokens: 142, durationMs: 1230 }
    }
  }, 1200)
}

function onStop() {
  const last = messages.value[messages.value.length - 1]
  if (last?.isStreaming) {
    last.isStreaming = false
  }
}
</script>

<template>
  <div role="application" aria-label="Cursor IDE" class="h-screen flex flex-col bg-ai-bg text-ai-text">
    <!-- Top bar (VSCode window chrome) -->
    <div role="banner" aria-label="Window title bar" class="h-9 flex items-center gap-2 px-3 bg-ai-panel border-b border-ai-border-subtle">
      <!-- Window controls (mac-style) -->
      <div aria-hidden="true" class="flex items-center gap-1.5">
        <span class="w-3 h-3 rounded-full bg-ai-mac-red" />
        <span class="w-3 h-3 rounded-full bg-ai-mac-yellow" />
        <span class="w-3 h-3 rounded-full bg-ai-mac-green" />
      </div>
      <span class="text-ai-micro text-ai-text-muted font-ai-mono ml-3">~/work/project — Cursor</span>

      <div class="flex-1" />

      <!-- Model selector (compact) -->
      <button aria-label="Select model, current: {{ currentModel.displayName }}" class="flex items-center gap-1.5 h-6 px-2 rounded-ai-sm text-ai-caption text-ai-text-muted hover:bg-ai-surface-2">
        <span aria-hidden="true">⚡</span>
        <span class="font-ai-mono">{{ currentModel.displayName }}</span>
        <span class="text-ai-text-dim text-[10px]">▾</span>
      </button>

      <button aria-label="Open settings" class="p-1 text-ai-text-muted hover:text-ai-text rounded-ai-sm hover:bg-ai-surface-2">
        <SettingOutlined />
      </button>
    </div>

    <!-- Main 3-pane layout -->
    <main role="main" aria-label="IDE workspace" class="flex-1 flex min-h-0">
      <FileExplorer :tree="fileTree" :active-file-id="activeFileId" @file-click="(id) => (activeFileId = id)" />
      <EditorView :tabs="editorTabs" :active-tab-id="activeTabId" />
      <ChatPanel
        :messages="messages"
        :is-streaming="isStreaming"
        :model-name="currentModel.displayName"
        @send="onSend"
        @stop="onStop"
      />
    </main>

    <!-- Status bar (VSCode style) -->
    <div role="contentinfo" aria-label="Status bar" class="h-6 flex items-center gap-3 px-3 bg-ai-accent text-ai-text-on-accent text-ai-micro">
      <span aria-hidden="true">⚡</span>
      <span>Cursor Agent ready</span>
      <span aria-hidden="true" class="opacity-70">·</span>
      <span class="font-ai-mono opacity-80">claude-3.5-sonnet</span>
      <span aria-hidden="true" class="opacity-70">·</span>
      <span>2 edits pending</span>
      <div class="flex-1" />
      <span class="font-ai-mono opacity-80" aria-label="Cursor position: line 12, column 24">Ln 12, Col 24</span>
      <span aria-hidden="true" class="opacity-70">·</span>
      <span>UTF-8</span>
      <span aria-hidden="true" class="opacity-70">·</span>
      <span>TypeScript</span>
    </div>
  </div>
</template>
