<script setup lang="ts">
/**
 * EditorView — IDE 中间代码编辑区（VSCode 风）
 * 简化版：tab + 语法高亮 + gutter（行号）+ diff hint
 */
import { computed } from 'vue'
import { CloseOutlined, CheckOutlined } from '@ant-design/icons-vue'
import type { EditorTab } from '@/mock/ide'
import CodeBlock from '@/components/ai/CodeBlock.vue'

const props = defineProps<{ tabs: EditorTab[]; activeTabId: string }>()

const activeTab = computed(() => props.tabs.find(t => t.id === props.activeTabId))
</script>

<template>
  <section role="region" aria-label="Code editor" class="flex-1 flex flex-col min-w-0 bg-ai-bg">
    <!-- Tab bar -->
    <div role="tablist" aria-label="Open files" class="flex items-center bg-ai-panel border-b border-ai-border-subtle">
      <div
        v-for="tab in tabs"
        :key="tab.id"
        role="tab"
        :aria-selected="tab.id === activeTabId"
        :aria-label="`${tab.name}${tab.isDirty ? ' (unsaved)' : ''}`"
        class="flex items-center gap-2 px-3 py-2 border-r border-ai-border-faint text-ai-caption transition-colors"
        :class="tab.id === activeTabId
          ? 'bg-ai-bg text-ai-text border-b-2 border-b-ai-accent -mb-px'
          : 'bg-ai-panel text-ai-text-muted hover:text-ai-text'"
      >
        <span aria-hidden="true">{{ tab.language === 'typescript' ? '📄' : tab.language === 'tsx' ? '⚛️' : tab.language === 'json' ? '📦' : '🎨' }}</span>
        <span>{{ tab.name }}</span>
        <span v-if="tab.isDirty" class="w-1.5 h-1.5 rounded-full bg-ai-text-muted" title="Unsaved" aria-label="Unsaved changes" />
        <button v-else class="text-ai-text-dim hover:text-ai-text" :aria-label="`Close ${tab.name}`">
          <CloseOutlined class="text-[10px]" aria-hidden="true" />
        </button>
      </div>
    </div>

    <!-- Editor body -->
    <div class="flex-1 overflow-auto" role="tabpanel" :aria-label="`Code in ${activeTab?.name || 'editor'}`">
      <div v-if="activeTab" class="max-w-3xl">
        <CodeBlock
          :code="activeTab.content"
          :language="activeTab.language"
          :show-line-numbers="true"
        />

        <!-- AI Diff hint bar (Cursor 风) -->
        <div role="region" aria-label="AI suggested edit" class="mx-3 my-3 flex items-center gap-2 px-3 py-2 rounded-ai-md bg-ai-accent-soft border border-ai-accent/30">
          <span class="text-ai-accent-ai" aria-hidden="true">⚡</span>
          <span class="text-ai-caption text-ai-text">Cursor suggested an edit at line 12</span>
          <div class="flex-1" />
          <button aria-label="Accept suggested edit" class="flex items-center gap-1 px-2 py-1 rounded-ai-sm bg-ai-accent text-ai-text-on-accent text-ai-micro font-medium hover:bg-ai-accent-hover">
            <CheckOutlined aria-hidden="true" /> Accept
          </button>
          <button aria-label="Reject suggested edit" class="px-2 py-1 rounded-ai-sm text-ai-text-muted text-ai-micro hover:bg-ai-surface-2">
            Reject
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
