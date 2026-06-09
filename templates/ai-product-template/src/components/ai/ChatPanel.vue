<script setup lang="ts">
/**
 * ChatPanel — IDE 右侧 AI 聊天面板（集成 chat-stream + message-bubble + prompt-composer）
 * 1:1 from component-contract/chat-stream.md
 */
import { ref } from 'vue'
import {
  CloseOutlined,
  MoreOutlined,
  HistoryOutlined,
} from '@ant-design/icons-vue'
import type { ChatMessage } from '@/mock/ide'
import MessageBubble from './MessageBubble.vue'
import PromptComposer from './PromptComposer.vue'

const props = defineProps<{
  messages: ChatMessage[]
  isStreaming?: boolean
  modelName?: string
}>()

const emit = defineEmits<{
  send: [value: string]
  stop: []
}>()
</script>

<template>
  <aside role="complementary" aria-label="AI chat panel" class="w-[420px] shrink-0 flex flex-col bg-ai-panel border-l border-ai-border-subtle">
    <!-- Header -->
    <header role="banner" aria-label="Chat panel header" class="flex items-center gap-2 px-4 py-2.5 border-b border-ai-border-subtle">
      <div aria-hidden="true" class="w-6 h-6 rounded-ai-md bg-ai-accent flex items-center justify-center text-ai-text-on-accent text-ai-caption">
        ⚡
      </div>
      <span class="text-ai-body-sm text-ai-text font-medium">Cursor</span>
      <span v-if="modelName" class="text-ai-micro text-ai-text-muted font-ai-mono px-1.5 py-0.5 rounded-ai-sm bg-ai-surface-2" :aria-label="`Current model: ${modelName}`">
        {{ modelName }}
      </span>
      <div class="flex-1" />
      <button class="p-1 text-ai-text-muted hover:text-ai-text rounded-ai-sm hover:bg-ai-surface-2" title="History" aria-label="View chat history">
        <HistoryOutlined aria-hidden="true" />
      </button>
      <button class="p-1 text-ai-text-muted hover:text-ai-text rounded-ai-sm hover:bg-ai-surface-2" title="More" aria-label="More options">
        <MoreOutlined aria-hidden="true" />
      </button>
      <button class="p-1 text-ai-text-muted hover:text-ai-text rounded-ai-sm hover:bg-ai-surface-2" title="Close" aria-label="Close chat panel">
        <CloseOutlined aria-hidden="true" />
      </button>
    </header>

    <!-- Message list -->
    <div role="log" aria-label="Chat messages" aria-live="polite" aria-relevant="additions" class="flex-1 overflow-y-auto">
      <MessageBubble v-for="msg in messages" :key="msg.id" :message="msg" />
    </div>

    <!-- Composer -->
    <PromptComposer
      :is-streaming="isStreaming"
      @send="emit('send', $event)"
      @stop="emit('stop')"
    />
  </aside>
</template>
