<script setup lang="ts">
/**
 * FileExplorer — IDE 左侧文件树（VSCode 风格）
 */
import { ref } from 'vue'
import {
  FolderOutlined,
  FolderOpenOutlined,
  FileOutlined,
  CaretDownOutlined,
  CaretRightOutlined,
} from '@ant-design/icons-vue'
import type { FileNode } from '@/mock/ide'

defineProps<{ tree: FileNode[]; activeFileId?: string }>()
const emit = defineEmits<{ fileClick: [id: string] }>()

// 默认展开根节点和 src
const expanded = ref<Record<string, boolean>>({
  'f-root': true,
  'f-src': true,
})
const toggle = (id: string) => {
  expanded.value[id] = !expanded.value[id]
}
</script>

<template>
  <nav role="navigation" aria-label="File explorer" class="w-60 shrink-0 border-r border-ai-border-subtle bg-ai-panel overflow-y-auto">
    <div class="px-3 py-2 text-ai-micro uppercase tracking-wider text-ai-text-dim font-medium border-b border-ai-border-faint">
      Explorer
    </div>
    <div class="py-1" role="tree" aria-label="Project file tree">
      <template v-for="node in tree" :key="node.id">
        <div v-if="node.type === 'folder'" class="select-none" role="treeitem" :aria-expanded="expanded[node.id]">
          <button
            class="w-full flex items-center gap-1.5 px-2 py-0.5 text-ai-caption text-ai-text hover:bg-ai-surface-2"
            :aria-label="`${expanded[node.id] ? 'Collapse' : 'Expand'} folder ${node.name}`"
            @click="toggle(node.id)"
          >
            <CaretDownOutlined v-if="expanded[node.id]" aria-hidden="true" class="text-ai-text-dim text-[10px]" />
            <CaretRightOutlined v-else aria-hidden="true" class="text-ai-text-dim text-[10px]" />
            <FolderOpenOutlined v-if="expanded[node.id]" aria-hidden="true" class="text-ai-text-muted" />
            <FolderOutlined v-else aria-hidden="true" class="text-ai-text-muted" />
            <span>{{ node.name }}</span>
          </button>
          <div v-if="expanded[node.id]" class="ml-3 border-l border-ai-border-faint" role="group">
            <button
              v-for="child in node.children"
              :key="child.id"
              class="w-full flex items-center gap-1.5 px-2 py-0.5 text-ai-caption text-left transition-colors"
              :class="activeFileId === child.id
                ? 'bg-ai-accent-soft text-ai-accent-ai'
                : 'text-ai-text hover:bg-ai-surface-2'"
              :aria-label="`Open ${child.name}${child.type === 'folder' ? ' folder' : ' file'}`"
              :aria-current="activeFileId === child.id ? 'page' : undefined"
              @click="emit('fileClick', child.id)"
            >
              <span class="text-ai-text-dim text-[10px] w-2.5 inline-flex">
                <span v-if="child.type === 'folder' && expanded[child.id]" aria-hidden="true">▾</span>
                <span v-else-if="child.type === 'folder'" aria-hidden="true">▸</span>
              </span>
              <FolderOpenOutlined v-if="child.type === 'folder' && expanded[child.id]" aria-hidden="true" class="text-ai-text-muted" />
              <FolderOutlined v-else-if="child.type === 'folder'" aria-hidden="true" class="text-ai-text-muted" />
              <span v-else aria-hidden="true" class="text-ai-caption">{{ child.icon || '📄' }}</span>
              <span>{{ child.name }}</span>
            </button>
          </div>
        </div>
      </template>
    </div>
  </nav>
</template>
