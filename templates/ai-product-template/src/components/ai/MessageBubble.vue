<script setup lang="ts">
/**
 * MessageBubble — 1:1 from component-contract/message-bubble.md
 * 支持多 block：text / code / tool / citation（缩略）
 */
import { UserOutlined, ThunderboltOutlined } from '@ant-design/icons-vue'
import type { ChatMessage } from '@/mock/ide'
import CodeBlock from './CodeBlock.vue'
import ToolCallCard from './ToolCallCard.vue'

defineProps<{ message: ChatMessage }>()
</script>

<template>
  <div
    class="flex gap-3 px-4 py-4 animate-ai-fade-up"
    :class="message.role === 'user' ? 'bg-transparent' : 'bg-ai-surface-1/40'"
  >
    <!-- Avatar -->
    <div
      class="shrink-0 w-7 h-7 rounded-ai-md flex items-center justify-center text-ai-caption font-medium"
      :class="message.role === 'user' ? 'bg-ai-text-muted/20 text-ai-text-muted' : 'bg-ai-accent text-ai-text-on-accent'"
    >
      <UserOutlined v-if="message.role === 'user'" />
      <ThunderboltOutlined v-else />
    </div>

    <!-- Body -->
    <div class="flex-1 min-w-0">
      <!-- Meta header -->
      <div class="flex items-center gap-2 mb-1.5">
        <span class="text-ai-body-sm text-ai-text font-medium">{{ message.author }}</span>
        <span class="text-ai-micro text-ai-text-dim">·</span>
        <span class="text-ai-micro text-ai-text-dim">{{ message.timestamp }}</span>
        <span v-if="message.meta" class="text-ai-micro text-ai-text-dim font-ai-mono">
          · {{ message.meta.model }} · {{ message.meta.tokens }}t · {{ (message.meta.durationMs / 1000).toFixed(1) }}s
        </span>
      </div>

      <!-- Blocks -->
      <div class="space-y-1.5">
        <template v-for="(block, bi) in message.blocks" :key="bi">
          <p
            v-if="block.type === 'text'"
            class="text-ai-body text-ai-text leading-[1.6] whitespace-pre-wrap animate-ai-fade-up"
            :class="message.isStreaming && bi === message.blocks.length - 1 ? 'cursor-blink' : ''"
          >
            {{ block.content || (message.isStreaming ? ' ' : '') }}
          </p>

          <div
            v-else
            class="animate-ai-fade-up"
          >
            <CodeBlock
              v-if="block.type === 'code'"
              :code="block.content"
              :language="block.language"
              :filename="block.filename"
              :show-line-numbers="true"
            />

            <ToolCallCard
              v-else-if="block.type === 'tool'"
              :tool="block.tool"
            />

            <div
              v-else-if="block.type === 'citation'"
              class="text-ai-micro text-ai-text-muted px-2 py-1 rounded-ai-sm bg-ai-citation-bg border-l-2 border-ai-citation-border inline-block"
            >
              <a :href="block.citation.url" target="_blank" rel="noopener noreferrer" class="hover:text-ai-accent-ai">
                [{{ block.citation.id }}] {{ block.citation.title }} · {{ block.citation.domain }}
              </a>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
