# AI Products · 反模式 / Pitfalls

> 10 个 AI 产品 UI 常见错误。每个反模式给出"问题 → 原因 → 修复"。

---

## 1. 流式（Streaming）

### ❌ P1.1 一次性渲染完整响应
**问题**：用户发送后，模型完整生成后才显示（4-10s 白屏）。
**原因**：没用 SSE / WebSocket 流式；或前端批量更新。
**修复**：
- 用 SSE (`fetch` + `ReadableStream`) 或 WebSocket
- 服务端首 token 时间 ≤ 800ms
- 前端用 `requestAnimationFrame` 节流更新
- 必读 [component-contract/chat-stream.md § 关键实现 1](../component-contract/chat-stream.md)

### ❌ P1.2 流式过程显示 spinner
**问题**：流式时显示 "AI 正在思考..." spinner，吞掉 token 流入感。
**原因**：用通用 loading 组件代替流式 UI。
**修复**：
- 收到第一个 token 后立即显示打字机光标 `▌`
- spinner 仅在 TTFT（首 token）前显示
- 必读 [chat-stream.md § Anatomy 2. 打字机光标](../component-contract/chat-stream.md)

### ❌ P1.3 打字机光标闪烁太慢（> 200ms）
**问题**：光标 1 秒闪 1 次，显呆滞。
**原因**：用 CSS `animation-duration: 1s` 而非 600-800ms。
**修复**：
- 闪烁频率 600-800ms（1.4-1.7Hz）
- 透明度 0 → 1 → 0（不要用 `display: none` 切换）
- 流式结束时光标自动消失

### ❌ P1.4 流式过程禁用"停止"按钮
**问题**：AI 答了一半，用户想停，停不了。
**原因**：停止按钮 disabled 直到流结束。
**修复**：
- 流开始立即启用 Stop 按钮
- 用 `AbortController` 取消 fetch
- 流结束后按钮替换为 Regenerate

### ❌ P1.5 长对话（100+ 轮）卡顿
**问题**：聊到 100 轮后，输入框卡、滚动卡。
**原因**：所有消息都常驻 DOM，没虚拟滚动。
**修复**：
- 虚拟滚动：`@tanstack/vue-virtual` 或自实现
- 已读过的消息可卸载 / 折叠
- 流式仅渲染"当前 + 上文最后 5 条"

### ❌ P1.6 不显示 token 计数 / 成本
**问题**：用户不知道发了多少 token，可能超出 model 限额。
**原因**：UI 没暴露 token 信息。
**修复**：
- 输入框底部显示 `142/32000 tokens`
- 发送后显示 "Used 142 tokens · 1.2s"
- 高频用户显示"今日已用 23k tokens · $0.46"

---

## 2. 多模态 / 信任

### ❌ P2.1 工具调用完全隐藏
**问题**：AI 调用了 read_file / bash，但 UI 不展示，用户不信任。
**原因**：开发者觉得"AI 自动做就行"，忽视透明度。
**修复**：
- 必显 `tool-call-card`，含工具名 / 参数 / 输出
- 高风险操作（bash / write_file）必须用户确认
- 必读 [tool-call-card.md § Pending variant](../component-contract/tool-call-card.md)

### ❌ P2.2 RAG 回答无引用源
**问题**：AI 说"巴黎是法国首都"但用户无法验证。
**原因**：服务返回 RAG 引用但前端没展示。
**修复**：
- 必用 `citation-source`，行内编号 + 底部列表 / 侧栏
- Hover 显示 snippet 预览
- 必读 [citation-source.md](../component-contract/citation-source.md)

### ❌ P2.3 Code block 不支持交互
**问题**：code block 是静态文本，没复制 / 行号 / 全屏。
**原因**：用了简单的 `<pre>` 而非专业 code viewer。
**修复**：
- 用 shiki / highlight.js 做语法高亮
- 右上角"复制"按钮
- 长代码 (> 30 行) 自动折叠 + 展开按钮
- 可选"在编辑器打开"（Cursor 风）

### ❌ P2.4 Markdown 渲染有 XSS 风险
**问题**：用户输入 `<script>` 或 `<img onerror>`，渲染时被执行。
**原因**：用了 `v-html` 而没过滤。
**修复**：
- 用 marked + DOMPurify 清洗
- 禁用 `<script>` / `<iframe>` / 危险属性
- 用户消息和 AI 消息都过滤

---

## 3. 性能 / 可达性

### ❌ P3.1 移动端发送按钮和附件按钮撞在一起
**问题**：手机小屏，工具栏按钮挤成一团，误触。
**原因**：工具栏用了 flex 横向排列。
**修复**：
- 工具栏分两层：常用（粘贴/语音）+ 高级（@ / 文件）
- 或用 bottom sheet 收纳"更多"
- 移动端单行工具栏最多 3 个按钮

### ❌ P3.2 流式过程 screen reader 反复播报
**问题**：盲人用户开启屏幕阅读器后，每个 token 都读一遍。
**原因**：用了 `aria-live="assertive"` 或 `polite` 在流式区域。
**修复**：
- 流式区域 `aria-live="off"`
- 整条消息生成完后，再 `aria-live="polite"` 一次性通知
- 打字机光标本身用 `aria-hidden="true"`

### ❌ P3.3 错误信息太技术化
**问题**：用户看到 "TypeError: fetch failed at AbortController" 完全不懂。
**原因**：直接把 API 错误原样展示。
**修复**：
- 错误映射到友好信息：
  - "网络断开" / "服务繁忙" / "请求被取消" / "内容被安全策略拦截"
- 保留原始错误在"详情"折叠区（给开发者用）
- 提供"重试"按钮

---

## 4. 反 slop（防止 AI 生成的"通用感"）

### ❌ P4.1 所有 AI 产品都用同一种视觉
**问题**：所有 AI 聊天界面都是"白底 + 紫蓝渐变按钮"，失去品牌识别。
**原因**：用通用模板（shadcn / ChatGPT UI 库），没做品牌定制。
**修复**：
- AI 视觉要和品牌 DESIGN.md 对齐
  - Claude = 暖橙 + 衬线
  - Cursor = 暗 IDE 风 + 紫色
  - Vercel = 极简单色 + 黑/白
- 不要无脑套用 ChatGPT 的紫蓝渐变
- 必读 [../../references/brand-library/ai-llm/](../../references/brand-library/ai-llm/) 12 个 AI 品牌

### ❌ P4.2 头像用纯字母（如 "AI"）
**问题**：所有 AI 消息头像都是 "AI" 或 "A"，没差异化。
**原因**：用 placeholder 而非真 logo。
**修复**：
- 用 model-specific 头像：🤖 (Claude) / 🟢 (GPT) / ⚡ (Cursor)
- 或品牌 logo（Anthropic / OpenAI 官方 SVG）
- 至少区分 user vs assistant 的颜色

### ❌ P4.3 placeholder 文案无意义
**问题**："Ask me anything..." / "Type your question..." 通用又无聊。
**原因**：没针对产品定位写 placeholder。
**修复**：
- Cursor: "Edit code, ask questions, or / for commands"
- Vercel AI: "Build with AI..."
- Perplexity: "Ask anything..."
- 至少包含 1 个产品特色关键词

---

## 5. v2.11 同步新增（字体真实化 + 性能形式 P · 3 条）

### ❌ P5.1 字体 `@latest` URL 引用导致 404（v2.11 B 方案前置）
**问题**：`<link href="https://fonts.googleapis.com/css2?family=Inter@latest">` 引用后，所有 `@font-face src` 在 build 后 HTTP 状态 404。
**原因**：开发脚手架用了 `family=Inter@latest` 注释或模板，但 `@latest` 不是 Google Fonts 支持的语法（正确语法是 `family=Inter:wght@400;500;600;700`）。
**修复**：
- 显式列每个字重：`family=Inter:wght@400;500;600;700&display=swap`
- 不写 `@latest` 也不省略 `wght` 参数
- 用 `perf-runtime-check.sh` 验证：`fonts.googleapis.com` 实际 HTTP 状态必须 200
- 必读 [`../../references/methodology/font-loading-strategy.md` § 6.3](../../references/methodology/font-loading-strategy.md)

### ❌ P5.2 token.json `fontFamilies.body` 被 IDE 误判为 type 导入（v2.11 B 方案后置）
**问题**：把 Inter Variable 引入 token.json 后，VSCode 自动补全触发 `import type { body } from "../tokens"`，运行时报 `TS2305: Module '"../tokens"' has no exported member 'body'`。
**原因**：TypeScript 把 `body` 既当作 `fontFamilies` 的 key，又被 IDE 自动补全为 type 导入。
**修复**：
- 不要从 `tokens.ts` 直接 `import type { body }`，应 `import type { FontFamilies } from "../types"`
- token.json 是数据（runtime 加载），不是 type 模块
- 必读 [`../../references/token-mapping/mapping-rules.md` § 4.3](../../references/token-mapping/mapping-rules.md)

### ❌ P5.3 perf-runtime-check pipe 在子 shell 中丢失退出码（v2.11 工具链）
**问题**：`perf-runtime-check.sh` 中用 `curl ... | tee /dev/stderr` 抓 SSE 流验证 TTFT，`tee` 在子 shell 中执行，`curl` 退出码丢失，脚本误判 "失败"。
**原因**：`perf-runtime-check.sh` 通过 `${PIPESTATUS[0]}` 抓 curl 退出码，但当 curl 的 stdout 被 pipe 到 tee 时，子 shell 隔离了 PIPESTATUS。
**修复**：
- 用 `set -o pipefail` + 主 shell 中 pipe，不要 wrap 在 `$(...)` 或 `bash -c`
- 或用 `curl --output /tmp/sse.log` 后单独 verify
- 必读 [`../../scripts/perf-runtime-check.sh`](../../scripts/perf-runtime-check.sh) § 实现
