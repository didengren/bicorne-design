# ai-products · PHASE 4 Pre-flight

> 开工前必读。回答完所有"必须"项后，才开始写第一行代码。

---

## 1. 项目元数据

| 问题 | 你的回答 |
|---|---|
| 品牌名 |  |
| 业务定位（一句话） |  |
| 目标产品类型 | □ LLM Chat  □ Code Agent  □ Image Gen  □ RAG 搜索  □ Voice  □ 多模态 |
| 目标用户 |  |
| 设备优先级 | □ 桌面（IDE / web app） □ Mobile □ 桌面 + 响应式 mobile |
| 主色调 | □ 暗色（Cursor / Claude / Copilot 系） □ 亮色（ChatGPT / Vercel AI Playground 系） |
| 部署方式 | □ 桌面 PWA  □ Web App  □ 桌面原生（Electron / Tauri） |

## 2. 模型与路由

| 问题 | 你的回答 |
|---|---|
| 支持哪些模型 | □ OpenAI（GPT-4o / o1） □ Anthropic（Claude 3.5/4） □ Google（Gemini） □ 开源（Llama / Qwen） □ 自训练 |
| 用户能否切换模型 | □ 是（必须 `model-selector.md`） □ 否 |
| 是否启用 fallback（主模型不可用时降级） | □ 是 □ 否 |
| 是否支持 BYOK（bring your own key） | □ 是 □ 否 |
| 是否显示 token 成本 | □ 实时计费 □ 累计统计 □ 不显示 |

## 3. 流式与延迟

| 问题 | 你的回答 |
|---|---|
| Streaming 模式 | □ SSE / fetch-stream  □ WebSocket  □ 不需要（一次性） |
| TTFT（首 token 延迟）目标 | □ ≤ 200ms（极快）  □ ≤ 800ms（标准）  □ ≤ 2s（可接受） |
| 是否支持"停止生成" | □ 是（AbortController） □ 否 |
| 是否支持"重新生成"（保留对话） | □ 是 □ 否 |
| 是否支持"分叉对话"（branch） | □ 是（ChatGPT 模式） □ 否 |
| 打字机效果（typewriter cursor） | □ 是 □ 否（直接 append） |

## 4. 多模态与工具

| 问题 | 你的回答 |
|---|---|
| 输入模态 | □ 文本  □ 图片（拖拽 / 粘贴） □ 文件（PDF / code） □ 语音 |
| 输出模态 | □ 文本  □ 代码（带语法高亮） □ 图片 □ 文件（下载链接） |
| 工具调用（tool use） | □ Function calling（API）  □ 浏览器（Web browsing） □ Bash / Shell  □ 文件编辑（Cursor 类） |
| RAG / 检索增强 | □ 向量库  □ Web 搜索  □ 内部文档  □ 无 |
| 引用源展示 | □ 悬浮预览  □ 内联链接  □ 底部来源列表  □ 无 |

## 5. 持久化与历史

| 问题 | 你的回答 |
|---|---|
| 对话历史存储 | □ 本地（IndexedDB） □ 云端（用户账号） □ 临时（不保存） |
| 历史侧栏（left drawer） | □ 是  □ 否 |
| 对话标题自动生成 | □ 是  □ 否（用户手动） |
| 支持搜索历史 | □ 是  □ 否 |
| 支持导出（Markdown / JSON） | □ 是  □ 否 |

## 6. 性能与可达性

- [ ] TTFT ≤ 800ms（首 token）
- [ ] 流式渲染帧率 ≥ 30fps（不卡顿）
- [ ] 长对话（100+ 轮）不卡
- [ ] 键盘快捷键（Cmd+K / Enter 发送 / Shift+Enter 换行）
- [ ] 屏幕阅读器友好（ARIA live region 用于流式）
- [ ] 深色模式默认（按 OS 偏好）

## 7. 信任与安全

- [ ] 工具调用需用户确认（高风险操作）
- [ ] 流式响应可随时停止
- [ ] 错误有清晰重试入口
- [ ] 引用源可点击验证
- [ ] 不在前端暴露 API key
- [ ] 输入有最大长度限制

---

## 开工决策树

```
你的 AI 产品是哪种？
│
├─ LLM Chat (ChatGPT/Claude 类)
│   ├─ 单模型 → chat-stream + message-bubble + prompt-composer
│   └─ 多模型 → + model-selector
│
├─ Code Agent (Cursor/Copilot Workspace 类)
│   └─ 全部 6 件套 + 集成 IDE
│
├─ RAG 搜索 (Perplexity/Phind 类)
│   └─ chat-stream + message-bubble + citation-source
│
├─ Image Gen (Midjourney/DALL-E 类)
│   └─ 扩 message-bubble.md 的 "Image Gen 变体" 小节（不新增组件）
│
└─ Voice (Hume/GPT-4o Realtime 类)
    └─ 扩 chat-stream.md 的 "Voice 变体" 小节（不新增组件）
```
