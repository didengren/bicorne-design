<script setup lang="ts">
/**
 * ToolCallCard — 1:1 from component-contract/tool-call-card.md
 */
import { ref, computed } from 'vue'
import {
  CheckCircleFilled,
  CloseCircleFilled,
  LoadingOutlined,
  WarningFilled,
  StopOutlined,
} from '@ant-design/icons-vue'
import type { ToolCall as ToolCallType } from '@/mock/ide'

const props = defineProps<{ tool: ToolCallType }>()

const expanded = ref(props.tool.defaultExpanded ?? false)
const toggle = () => { expanded.value = !expanded.value }

const statusConfig: Record<ToolCallType['status'], { color: string; bgClass: string; textClass: string; borderClass: string }> = {
  pending:   { color: 'warning', bgClass: 'bg-ai-surface-2',  textClass: 'text-ai-status-warning', borderClass: 'border-ai-status-warning' },
  running:   { color: 'running', bgClass: 'bg-ai-surface-2',  textClass: 'text-ai-status-running', borderClass: 'border-ai-status-running' },
  success:   { color: 'success', bgClass: 'bg-ai-surface-2',  textClass: 'text-ai-status-success', borderClass: 'border-ai-status-success' },
  error:     { color: 'error',   bgClass: 'bg-ai-surface-2',  textClass: 'text-ai-status-error',   borderClass: 'border-ai-status-error' },
  cancelled: { color: 'muted',   bgClass: 'bg-ai-surface-2',  textClass: 'text-ai-status-muted',   borderClass: 'border-ai-status-muted' },
}
const cfg = computed(() => statusConfig[props.tool.status])
</script>

<template>
  <div
    class="rounded-ai-md my-2 overflow-hidden border-l-2 bg-ai-tool-bg animate-ai-fade-up"
    :class="cfg.borderClass"
  >
    <!-- Header (always visible) -->
    <button
      class="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-ai-surface-2 transition-colors"
      @click="toggle"
    >
      <!-- Status icon -->
      <span :class="cfg.textClass">
        <CheckCircleFilled v-if="tool.status === 'success'" />
        <CloseCircleFilled v-else-if="tool.status === 'error'" />
        <LoadingOutlined v-else-if="tool.status === 'running'" class="animate-spin" />
        <WarningFilled v-else-if="tool.status === 'pending'" />
        <StopOutlined v-else />
      </span>

      <span class="text-ai-caption text-ai-text-muted">{{ tool.icon }}</span>
      <span class="font-ai-mono text-ai-caption text-ai-text font-medium">{{ tool.displayName }}</span>

      <!-- Args summary -->
      <span class="font-ai-mono text-ai-micro text-ai-text-muted truncate">
        {{ Object.entries(tool.input).map(([k, v]) => `${k}: ${JSON.stringify(v)}`).join(' · ') }}
      </span>

      <!-- Duration -->
      <span v-if="tool.durationMs !== undefined" class="ml-auto text-ai-micro text-ai-text-dim font-ai-mono">
        {{ tool.durationMs }}ms
      </span>

      <span class="text-ai-text-dim text-ai-micro">{{ expanded ? '▴' : '▾' }}</span>
    </button>

    <!-- Expanded body -->
    <div v-if="expanded" class="px-3 pb-3 border-t border-ai-border-faint">
      <div v-if="tool.output" class="mt-2">
        <pre class="font-ai-mono text-ai-micro text-ai-text bg-ai-code-bg p-2 rounded-ai-sm overflow-x-auto max-h-40 whitespace-pre-wrap">{{ tool.output }}</pre>
      </div>
      <div v-if="tool.error" class="mt-2 text-ai-status-error text-ai-caption">
        {{ tool.error }}
      </div>
    </div>
  </div>
</template>
