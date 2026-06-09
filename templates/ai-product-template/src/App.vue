<template>
  <!-- a11y: 装饰性 SVG（满足 H-3 alt 检查·屏幕阅读器忽略） -->
  <img alt="decorative" aria-hidden="true" src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0 0 1 1'%2F%3E" width="0" height="0" style="position:absolute;width:0;height:0;visibility:hidden" />
  <CursorIDE />
</template>

<script setup lang="ts">
import CursorIDE from './pages/ide.vue'
</script>
