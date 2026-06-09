---
name: bicorne-ai-product-template
description: AI product / IDE template · Vue 3 + Vite + Tailwind · Cursor-style dark IDE · chat + editor + tool-call · cloned from verification/6-1-cursor-ide
keywords: template, ai, ide, cursor, llm, vue, tailwind, vite
---

# bicorne-ai-product-template

> AI IDE / LLM 对话产品 / ChatGPT 类开箱即用模板（Cursor 风格 · 深色 IDE）。
> 源项目：`ai-products/verification/6-1-cursor-ide`（v2.11 B 方案 · 16 分 P）。

---

## 适用场景

- AI IDE / AI 编程助手（Cursor / Copilot 风格）
- LLM 对话产品（ChatGPT / Claude.ai 风格）
- 工具调用透明化（read_file / write_file 可展开卡片）
- 流式文本 → 动作的核心循环

---

## 快速开始

```bash
cd templates/ai-product-template
pnpm install
pnpm dev      # → http://localhost:5176
pnpm build    # → dist/ （含 fonts/ + preload）
pnpm preview  # → http://localhost:4176
```

---

## 包含的组件

| 组件 | 文件 | 来源契约 |
|------|------|----------|
| ChatPanel | `src/components/ai/ChatPanel.vue` | [ai-products/component-contract/chat-stream.md](../../ai-products/component-contract/chat-stream.md) |
| MessageBubble | `src/components/ai/MessageBubble.vue` | [ai-products/component-contract/message-bubble.md](../../ai-products/component-contract/message-bubble.md) |
| PromptComposer | `src/components/ai/PromptComposer.vue` | [ai-products/component-contract/prompt-composer.md](../../ai-products/component-contract/prompt-composer.md) |
| ToolCallCard | `src/components/ai/ToolCallCard.vue` | [ai-products/component-contract/tool-call-card.md](../../ai-products/component-contract/tool-call-card.md) |
| CodeBlock | `src/components/ai/CodeBlock.vue` | LLM 响应代码块 |
| EditorView | `src/components/ai/EditorView.vue` | IDE 编辑器视图 |
| FileExplorer | `src/components/ai/FileExplorer.vue` | IDE 文件树 |

---

## 3 栏布局

`[FileExplorer | EditorView | ChatPanel]`（详细结构见 `src/pages/ide.vue`）

参考 [ai-products/README.md](../../ai-products/README.md)

---

## 资源清单

| 资源 | 路径 | 来源 |
|------|------|------|
| Inter Variable woff2 | `public/fonts/inter-var.woff2` | v2.11 B 方案下载 |
| JetBrains Mono Regular woff2 | `public/fonts/jetbrains-mono.woff2` | v2.11 B 方案下载 |
| favicon | `public/favicon.svg` | VSCode 风格 SVG |
| 设计 token | `token.json` | 基于 `dark-theme.template.json` 骨架 |
| Tailwind 配置 | `tailwind.config.ts` | 手写 + 命名空间 `ai-` |

---

## 已验证项

| 验证 | 结果 | 验证脚本 |
|------|------|----------|
| `pnpm build` | ✅ 成功 | `dist/index.html` + `dist/fonts/` 齐全 |
| perf-runtime-check | ✅ 5/5 模式 100% 实质 P | [scripts/perf-runtime-check.sh](../../scripts/perf-runtime-check.sh) |
| a11y H-3 alt | ✅ 通过 | 装饰性 SVG 加 `alt="decorative"` |
| e2e 8 节 A-H | ✅ 通过 | [scripts/e2e-validate.sh](../../scripts/e2e-validate.sh) |

---

## 自定义指南

1. 替换 `token.json` → 自己的 AI 品牌色（通常紫色 / 蓝色 / VSCode 蓝）
2. 替换 `src/components/ai/PromptComposer.vue` → 接入自己的 LLM API
3. 替换 `src/components/ai/MessageBubble.vue` → 流式响应渲染逻辑
4. 替换 `src/components/ai/ToolCallCard.vue` → 自己的工具列表（read / write / search 等）
5. `pnpm build` → 验证 `dist/fonts/` 资源齐全

---

## 维护

- **来源**：bicorne-design v2.12 Task 9 · SubTask 9.3
- **关联**：[templates/README.md](../README.md) · [v2-12-roadmap-execution/tasks.md](../../.trae/specs/v2-12-roadmap-execution/tasks.md)
- **备份**：实施前已创建 `.trae/skills/bicorne-design.bak.v2.11`（Task 12.4）