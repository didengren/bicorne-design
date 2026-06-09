<script setup lang="ts">
/**
 * 简化版 syntax highlighter（用 class 标记）。
 * 真实项目用 shiki / highlight.js。这里用正则模式做手工标记。
 */
import { computed } from 'vue'

const props = defineProps<{
  code: string
  language: string
  filename?: string
  showLineNumbers?: boolean
}>()

const lines = computed(() => props.code.split('\n'))

/** 极简 syntax token 化（只覆盖 typescript/js） */
const tokenize = (line: string): string => {
  // 顺序：注释 → 字符串 → 关键字 → 函数调用 → 数字 → 类型
  let out = line
    .replace(/(\/\/.*$)/g, '<span class="code-comment">$1</span>')
    .replace(/(&quot;[^&]*?&quot;|&#39;[^&]*?&#39;|`[^`]*?`)/g, '<span class="code-string">$1</span>')
  // 关键字（用 word boundary 避免误匹配标识符）
  out = out.replace(/\b(import|export|from|const|let|var|function|return|async|await|if|else|for|while|new|class|interface|type|extends|implements|public|private|protected|static|void|null|undefined|true|false|this|super|try|catch|throw|of|in)\b/g,
    '<span class="code-keyword">$1</span>')
  // 函数调用 (identifier( ... ))
  out = out.replace(/([a-zA-Z_$][\w$]*)\s*\(/g, '<span class="code-func">$1</span>(')
  // 数字
  out = out.replace(/\b(\d+)\b/g, '<span class="code-number">$1</span>')
  // 类型 (大写开头的 identifier)
  out = out.replace(/\b([A-Z][\w$]*)\b/g, '<span class="code-type">$1</span>')
  return out
}
</script>

<template>
  <div class="rounded-ai-md bg-ai-code-bg border border-ai-border-subtle overflow-hidden my-2">
    <!-- Header -->
    <div v-if="filename" class="flex items-center justify-between px-3 py-1.5 border-b border-ai-border-subtle bg-ai-surface-2">
      <span class="font-ai-mono text-ai-micro text-ai-text-muted">{{ filename }}</span>
      <span class="font-ai-mono text-ai-micro text-ai-text-dim uppercase">{{ language }}</span>
    </div>

    <!-- Body -->
    <pre class="p-3 text-ai-caption font-ai-mono text-ai-code-text leading-[1.65] overflow-x-auto"><code><span
        v-for="(line, i) in lines"
        :key="i"
        class="block"
      ><span
          v-if="showLineNumbers !== false"
          class="inline-block w-6 text-right pr-3 text-ai-text-dim select-none"
        >{{ i + 1 }}</span><span v-html="tokenize(line)" /></span></code></pre>
  </div>
</template>
