---
name: ai-products
description: AI product category workspace — LLM chat, image generation, code agents, RAG retrieval. Distinct from saas-marketing (brand site) and dashboards (data ops). Focus on streaming UX, multi-modal messages, model switching, tool call transparency.
keywords: ai, llm, chatgpt, claude, cursor, copilot, agent, streaming, prompt, rag
---

# AI Products — Category Workspace (MVI)

> 本目录是 **AI 产品** 类别专题：**LLM 驱动的产品**（chat / agent / image / code / RAG）。
>
> **关键区分**：AI Products 是 **生成式 AI 作为核心交互** 的产品；SaaS Marketing 是多页品牌站；Dashboards 是数据可视化驾驶舱；Admin Panels 是后台表单/表格。
> 边界详见 [../saas-marketing/README.md § 与 ai-products 的边界](../saas-marketing/README.md)

---

## 何时进入本目录

| 信号 | 必读路径 |
|---|---|
| 用户说"做一个 ChatGPT/Claude/Cursor 类 AI 工具" | 本目录 |
| LLM 流式响应、token-by-token 渲染 | 本目录 + `component-contract/chat-stream.md` |
| 多模态消息（text/code/image/file/tool-call） | 本目录 + `component-contract/message-bubble.md` |
| 用户可在多个模型间切换（GPT-4/Claude/Sonnet/本地） | 本目录 + `component-contract/model-selector.md` |
| RAG 应用（带引用源） | 本目录 + `component-contract/citation-source.md` |
| AI Agent / Tool use | 本目录 + `component-contract/tool-call-card.md` |
| 纯后台 / 数据可视化 / 营销 | 不要来，去 `../admin-panels/` `../dashboards/` `../saas-marketing/` |

---

## 通用方法论（跨类别）

| 主题 | 通用层文件 | 本类别文件 |
|---|---|---|
| Typography | [`../references/methodology/typography.md`](../references/methodology/typography.md) | monospace 字体（`JetBrains Mono`）强制使用于 code/tool-call |
| 性能预算 | [`../references/methodology/performance-budget.md`](../references/methodology/performance-budget.md) | streaming 专属：TTFT ≤ 800ms（Time To First Token） |
| Nav/Footer | [`../references/methodology/nav-footer.md`](../references/methodology/nav-footer.md) | AI 工作台常为左栏历史 + 顶部模型/账号 |
| 设计哲学 | [`../references/design-philosophy/design-styles.md`](../references/design-philosophy/design-styles.md) | 暗色为主（Cursor/Claude/Copilot），信息密度高 |
| 📚 方法论总索引 | [`../references/methodology/INDEX.md`](../references/methodology/INDEX.md) | — |

---

## 与其他类别的边界

| 维度 | AI Products (本目录) | Dashboards | SaaS Marketing | Admin Panels |
|---|---|---|---|---|
| 核心交互 | **生成式（stream）** | 浏览 / 监控 | 浏览 / 转化 | 表单 / 表格 |
| 信息流 | **流式（token-by-token）** | 实时数据 | 静态 | 静态 |
| 消息载体 | 多模态（text/code/img/file/tool） | 数字 / 图表 | 文本 / 媒体 | 字段 / 行 |
| 用户控制 | 提示词 / 模型选择 / 工具开关 | 过滤器 / 时间范围 | 滚动 / 跳转 | 搜索 / 筛选 |
| 信任建立 | 引用源 / tool-call 透明 / 错误重试 | 准确性 / 实时性 | 证言 / 数据 | 权限 / 审计 |
| 主色调 | 暗色（VSCode 系）为主 | 深色数据屏 | 亮色营销 | 中性灰 |
| 响应重点 | 延迟感（spinner + 字符流入） | 帧率（动效） | 加载（白屏 ≤ 1s） | 反馈（toast） |

---

## 目录结构（MVI）

```
ai-products/
├── README.md                          # 本文件（boundary + 决策树 + 目录索引）
├── meta-prompt.md                     # PHASE 4 pre-flight 问题清单
├── component-contract/                # 6 个核心组件合约（MVI 数）
│   ├── chat-stream.md                 # 流式对话（token-by-token + 停止/重试/重生成）
│   ├── message-bubble.md              # 多模态消息（text/code/image/file/tool-call）
│   ├── model-selector.md              # 模型选择器（GPT-4 / Claude / Local / 自定义）
│   ├── prompt-composer.md             # 提示词输入（@file / 附件 / 历史 / 语音）
│   ├── tool-call-card.md              # 工具调用结果卡（function / browser / bash）
│   └── citation-source.md             # RAG 引用源（hover 预览 + 点击跳转）
└── pitfalls/
    └── README.md                      # 10 个常见反模式（流式 / 多模态 / 信任 / 性能）
```

> **为什么 6 个组件？** AI 产品的形态丰富：LLM 聊天（chat-stream + message-bubble）、多模型路由（model-selector）、RAG（citation-source）、Agent（tool-call-card + prompt-composer）。任何 AI 产品 UI 都不出这 6 件套。

---

## 何时添加第 7 个组件合约？

仅当出现 2+ 个现有合约**都覆盖不到**的核心交互时：

- **Image Generation Canvas** — 独立组件（不属于 message-bubble）— 适用于 Midjourney / DALL-E 类
- **Diff Viewer** — AI 代码改动的 diff 视图（适用于 Cursor / Copilot Workspace）— 暂归 message-bubble
- **Voice Orb** — 实时语音对话组件（适用于 Hume / GPT-4o Realtime）— 暂归 chat-stream

如果你的项目需要 1 个上述组件，请直接扩 message-bubble.md / chat-stream.md 的"扩展变体"小节；如果需要 2 个以上，再考虑新增合约。

---

## 推荐的 verification 选题

| # | 主题 | 风格 | 状态 |
|---|---|---|---|
| **6-1** | **Cursor IDE**（双面板 chat + editor） | 暗色 / 高密度 / IDE 风格 | ✅ MVI 首作 |
| 6-2 | Vercel AI Playground（极简单页 chat） | 亮色 / 低密度 / Linear 风 | 候选 |
| 6-3 | Perplexity（搜索 + RAG + 引用流） | 亮色 / 中密度 | 候选 |
| 6-4 | Midjourney Gallery（图生图瀑布流） | 暗色 / 全屏沉浸 | 候选 |

首个 verification（6-1）故意选**最复杂**的形态（双面板 + 流式 + tool-call + 代码编辑），目的是定义本类别的"上限"。后续 6-2/6-3 删减即可。

---

## 必读顺序（PM 视角）

1. **本 README**（你已经看了）
2. [meta-prompt.md](./meta-prompt.md) — 开工前必答 7 个问题
3. 按需读 `component-contract/`（每个新需求读 1-2 个）
4. 出问题读 [pitfalls/README.md](./pitfalls/README.md)
5. 跑 `../scripts/e2e-validate.sh --category ai-products` 验证

## 必读顺序（AI Agent 视角）

1. 读本 README 确认在正确类别
2. 读用户需求 → 在 [meta-prompt.md § 1. 决策树](./meta-prompt.md) 找到对应组件
3. 读该组件合约 → 按 `Recommended props` + `Mandatory tokens` 落地
4. 写完跑 `bash ../scripts/e2e-validate.sh --category ai-products`
