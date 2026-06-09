<script setup lang="ts">
/**
 * PromptComposer — 1:1 from component-contract/prompt-composer.md
 * 简化版：textarea + 工具栏 + send/stop 按钮
 */
import { computed, ref } from 'vue'
import {
  ArrowUpOutlined,
  PaperClipOutlined,
  AtOutlined,
  AudioOutlined,
  StopOutlined,
} from '@ant-design/icons-vue'

const props = defineProps<{
  isStreaming?: boolean
  modelName?: string
}>()

const emit = defineEmits<{
  send: [value: string]
  stop: []
}>()

const value = ref('')
const attachments = ref<{ id: string; name: string; size: number }[]>([
  { id: 'a-1', name: 'auth.ts', size: 2400 },
])

const charCount = computed(() => value.value.length)

function send() {
  if (props.isStreaming) {
    emit('stop')
    return
  }
  if (!value.value.trim() && attachments.value.length === 0) return
  emit('send', value.value)
  value.value = ''
}

function onKeyDown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
    e.preventDefault()
    send()
  }
}

function removeAttachment(id: string) {
  attachments.value = attachments.value.filter(a => a.id !== id)
}
</script>

<template>
  <div class="border-t border-ai-border-subtle bg-ai-panel">
    <div class="p-3">
      <!-- Attachments row -->
      <div v-if="attachments.length" class="flex flex-wrap gap-2 mb-2">
        <div
          v-for="att in attachments"
          :key="att.id"
          class="flex items-center gap-1.5 px-2 py-1 rounded-ai-sm bg-ai-surface-2 border border-ai-border-subtle text-ai-micro"
        >
          <span>📄</span>
          <span class="text-ai-text-muted">{{ att.name }}</span>
          <span class="text-ai-text-dim">{{ (att.size / 1024).toFixed(1) }}KB</span>
          <button
            @click="removeAttachment(att.id)"
            class="text-ai-text-dim hover:text-ai-text-muted ml-1"
          >✕</button>
        </div>
      </div>

      <!-- Composer -->
      <div class="rounded-ai-md bg-ai-surface-1 border border-ai-border-subtle focus-within:border-ai-border-focus focus-within:shadow-ai-glow transition-all">
        <textarea
          v-model="value"
          @keydown="onKeyDown"
          rows="2"
          placeholder="Ask, edit, or @-reference a file..."
          aria-label="Message input for Cursor AI assistant"
          class="w-full bg-transparent text-ai-body text-ai-text placeholder-ai-text-dim px-3 py-2 outline-none resize-none"
        />

        <!-- Toolbar -->
        <div role="toolbar" aria-label="Message actions" class="flex items-center gap-1 px-2 py-1.5">
          <button class="p-1.5 rounded-ai-sm text-ai-text-muted hover:bg-ai-surface-2 hover:text-ai-text transition-colors" title="Attach file" aria-label="Attach file">
            <PaperClipOutlined aria-hidden="true" />
          </button>
          <button class="p-1.5 rounded-ai-sm text-ai-text-muted hover:bg-ai-surface-2 hover:text-ai-text transition-colors" title="Reference file" aria-label="Reference a file">
            <FileTextOutlined aria-hidden="true" />
          </button>
          <button class="p-1.5 rounded-ai-sm text-ai-text-muted hover:bg-ai-surface-2 hover:text-ai-text transition-colors" title="Voice" aria-label="Voice input">
            <AudioOutlined aria-hidden="true" />
          </button>

          <div class="flex-1" />

          <span class="text-ai-micro text-ai-text-dim font-ai-mono mr-2" :aria-label="`Character count: ${charCount} of 32000`">
            {{ charCount }} / 32000
          </span>

          <button
            v-if="isStreaming"
            @click="emit('stop')"
            aria-label="Stop generating response"
            class="flex items-center gap-1.5 h-7 px-3 rounded-ai-sm bg-ai-status-error text-ai-text-on-accent text-ai-caption font-medium hover:opacity-90"
          >
            <StopOutlined aria-hidden="true" />
            Stop
          </button>
          <button
            v-else
            @click="send"
            :disabled="!value.trim() && attachments.length === 0"
            :aria-label="`Send message, keyboard shortcut: Command Enter`"
            class="flex items-center gap-1.5 h-7 px-3 rounded-ai-sm bg-ai-accent text-ai-text-on-accent text-ai-caption font-medium hover:bg-ai-accent-hover disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowUpOutlined aria-hidden="true" />
            Send
            <span class="text-ai-micro opacity-70 ml-1" aria-hidden="true">⌘↵</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
