# Templates · bicorne-design v2.12

> 4 个开箱即用的项目模板，每个模板从 v2.11 B 方案后的 11 升 P 项目中精选导出。
> 模板保留全部 `src/` + `public/fonts/` + 配置文件，可直接 `pnpm install && pnpm build` 产出 `dist/`。

---

## 模板对照表

| 模板 | 源项目 | 适用场景 | 端口（dev） | 端口（preview） | 关键技术栈 |
|------|--------|----------|------------|-----------------|------------|
| [dashboard-template](./dashboard-template/) | `dashboards/verification/4-3-dashboard-command-center` | 数据大屏 / 监控指挥中心 / F5 全屏 O&M 控制台 | 5173 | 4173 | Vue 3 + Vite + Tailwind + TypeScript |
| [landing-template](./landing-template/) | `landing-pages/verification/5-1-resend-landing` | 邮件 / SaaS / 落地页 / 营销页 | 5174 | 4174 | Vue 3 + Vite + Tailwind + Ant Design Icons |
| [ai-product-template](./ai-product-template/) | `ai-products/verification/6-1-cursor-ide` | AI IDE / AI 编程助手 / 对话式 LLM 产品 | 5176 | 4176 | Vue 3 + Vite + Tailwind + Ant Design Icons |
| [mobile-template](./mobile-template/) | `mobile-web/verification/mobile-1-x-like-feed` | 移动 Web / Feed 流 / 类 X / Instagram / Airbnb 移动端 | 5178 | 4178 | Vue 3 + Vite + Tailwind + Ant Design Icons |

> **端口互不冲突**：4 个模板 dev/preview 端口分别为 5173/4173 / 5174/4174 / 5176/4176 / 5178/4178 · 可同时运行。

---

## 共同结构

每个模板都包含以下文件（**不含 `dist/`**，`dist/` 由 `pnpm build` 产出）：

```
<template-name>/
├── README.md               # 模板使用说明（v2.12 重写版）
├── index.html              # 含 preload + preconnect 的入口 HTML
├── package.json            # 模板名已改为 bicorne-<role>-template
├── vite.config.ts          # Vite 构建配置
├── tsconfig.json           # TypeScript 配置
├── tailwind.config.ts      # Tailwind 配置（从 token.json 生成）
├── postcss.config.js       # PostCSS 配置
├── token.json              # 设计 token（颜色/字号/间距）
├── public/
│   └── fonts/              # Inter Variable + JetBrains Mono 真实 woff2（v2.11 B 方案下载）
└── src/
    ├── main.ts             # Vue 应用入口
    ├── App.vue             # 根组件（含 Task 2 装饰性 SVG + alt="decorative"）
    ├── style.css           # Tailwind 入口 + 全局动画
    ├── components/         # 模板专属组件
    ├── pages/              # 页面级组件
    └── mock/               # 模拟数据
```

---

## 快速开始

每个模板的 3 步上手流程一致：

```bash
# 1. 进入模板目录
cd templates/dashboard-template   # 或 landing / ai-product / mobile

# 2. 安装依赖（pnpm 推荐）
pnpm install

# 3. 启动开发服务器
pnpm dev
# → http://localhost:5173  (dashboard)
# → http://localhost:5174  (landing)
# → http://localhost:5176  (ai-product)
# → http://localhost:5178  (mobile)
```

构建生产产物：

```bash
pnpm build               # → dist/ （含 fonts/ + preload + 装饰性 SVG）
pnpm preview             # → 本地预览构建产物
```

---

## 模板选用决策

| 你的项目类型 | 推荐模板 | 理由 |
|--------------|----------|------|
| 数据大屏 / 监控 / O&M 指挥中心 | **dashboard-template** | L1 三栏布局 + 5 个面板 + 真实 KPI 数据流 |
| SaaS / 邮件 / 落地页 / 营销页 | **landing-template** | Hero CTA + Feature Row + Pricing + Testimonial Logos |
| AI IDE / LLM 对话产品 / ChatGPT 类 | **ai-product-template** | File Explorer + Editor + Chat Panel + Prompt Composer |
| 移动端 Feed / 类 X / 类 Instagram | **mobile-template** | BottomTabBar + FeedCard + StatusBar + TopAppBar |

---

## 模板与 bicorne-design 主线的关联

| 模板 | 引用的 bicorne-design 资源 | 复用契约 |
|------|---------------------------|----------|
| dashboard-template | `dashboards/component-contract/*` · `dashboards/layouts/l1-three-column.md` · `dashboards/tailwind-bridge/generate.mjs` | 8 组件 + 1 布局 + token → tailwind 编译 |
| landing-template | `landing-pages/component-contract/*` · `landing-pages/pitfalls/README.md` | 4 组件 + 落地页反模式库 |
| ai-product-template | `ai-products/component-contract/*` · `ai-products/dark-mode-a11y.md` | 7 组件 + AI 产品暗色 a11y |
| mobile-template | `mobile-web/component-contract/*` · `mobile-web/dark-mode-a11y.md` | 4 组件 + 移动端暗色 a11y |

---

## 已验证的质量状态（v2.12 同步）

| 验证项 | 状态 | 证据 |
|--------|------|------|
| **构建产物** | ✅ 4/4 build 成功 | `pnpm build` 退出码 0 · `dist/index.html` 含 preload + 装饰性 SVG |
| **资源真实** | ✅ 4/4 woff2 真实存在 | `dist/fonts/inter-var.woff2` + `dist/fonts/jetbrains-mono.woff2` 200 OK |
| **a11y H-3 alt** | ✅ 4/4 通过 | 11 项目统一加 `alt="decorative"` 装饰性 SVG · e2e warn 19 → 8 |
| **形式 P + 实质 P** | ✅ 4/4 100% | 5/5 perf 模式全部实质生效（preload + @font-face + preconnect） |
| **e2e 8 节 A-H** | ✅ 4/4 通过 | v2.12 e2e 升至 8 节 · 实质 P 检查嵌入 H 节 |

---

## 自定义指南

替换模板为自己的品牌时，建议顺序：

1. **替换 `token.json`**（颜色 / 字号 / 间距 / 圆角）· 用 [bicorne-design-token-helper] 校验
2. 重跑 `pnpm token:build`（dashboard 模板已配）· 重新生成 `tailwind.config.ts`
3. 替换 `src/mock/*.ts` 数据 · 改为自己业务数据
4. 替换 `public/fonts/` 字体（可选）· 当前默认 Inter + JetBrains Mono · CJK fallback 由 `style.css` 控制
5. 替换 `index.html` 标题 + meta
6. 替换 `App.vue` 的页面布局（参考 bicorne-design 主线 `dashboards/layouts/` 或 `landing-pages/component-contract/`）
7. `pnpm build` 验证构建成功 + `dist/fonts/` 资源齐全

---

## 维护者

- **来源**：bicorne-design v2.12 Task 9
- **关联 spec**：[v2-12-roadmap-execution/tasks.md](../.trae/specs/v2-12-roadmap-execution/tasks.md) · Task 9
- **验证脚本**：[scripts/perf-runtime-all.sh](../scripts/perf-runtime-all.sh) · [scripts/build-all.sh](../scripts/build-all.sh)
- **备份**：实施前已创建 `.trae/skills/bicorne-design.bak.v2.11` 全量备份（Task 12.4）