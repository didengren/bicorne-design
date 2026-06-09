---
name: bicorne-mobile-template
description: Mobile web H5 template · Vue 3 + Vite + Tailwind · X-style dark feed · iOS safe area · cloned from verification/mobile-1-x-like-feed
keywords: template, mobile, h5, feed, x, twitter, vue, tailwind, vite
---

# bicorne-mobile-template

> 移动 Web / Feed 流 / 类 X / 类 Instagram 开箱即用模板（iOS 优先 · 深色 · 拇指区域锚定）。
> 源项目：`mobile-web/verification/mobile-1-x-like-feed`（v2.11 B 方案 · 18 分 P）。

---

## 适用场景

- 移动端 H5 / 类 X (Twitter) / 类 Instagram
- iOS 优先 + Android 友好
- 单手操作 + 拇指区域锚定
- 滚动 Feed 流 + BottomTabBar 切换

---

## 快速开始

```bash
cd templates/mobile-template
pnpm install
pnpm dev      # → http://localhost:5178
pnpm build    # → dist/ （含 fonts/ + preload）
pnpm preview  # → http://localhost:4178
```

---

## 包含的组件

| 组件 | 文件 | 来源契约 |
|------|------|----------|
| BottomTabBar | `src/components/mobile/BottomTabBar.vue` | [mobile-web/component-contract/bottom-tab-bar.md](../../mobile-web/component-contract/bottom-tab-bar.md) |
| FeedCard | `src/components/mobile/FeedCard.vue` | Feed 流卡片（text / verified / attachment emoji / stats） |
| StatusBar | `src/components/mobile/StatusBar.vue` | iOS 状态栏（时间 / 信号 / 电池） |
| TopAppBar | `src/components/mobile/TopAppBar.vue` | 顶部应用栏（logo + 2 tabs） |

---

## 移动端 4 大设计支柱

1. **Thumb-zone anchoring** — 主操作（compose FAB、tab bar）放底部
2. **Edge-to-edge content** — feed 卡片全宽 + hairline 分隔
3. **Single-handed reach** — 每个可交互目标都在屏幕底部 60%
4. **iOS-first, Android-friendly** — safe-area-aware + 44pt+ touch + 16px body + 默认深色

---

## 已规避的 4 大移动端陷阱

| Pitfall | 解决方案 |
|---------|----------|
| iOS body < 16px（缩放阈值） | 全局 body font-size: 16px |
| Touch target < 44pt | 所有交互元素 ≥ 44pt |
| iOS home indicator 遮挡 | `pb-[env(safe-area-inset-bottom)]` |
| Badge `99+` 截断 | 99+ 显式规则 |

详细见 [mobile-web/pitfalls/README.md](../../mobile-web/pitfalls/README.md)

---

## 资源清单

| 资源 | 路径 | 来源 |
|------|------|------|
| Inter Variable woff2 | `public/fonts/inter-var.woff2` | v2.11 B 方案下载 |
| JetBrains Mono Regular woff2 | `public/fonts/jetbrains-mono.woff2` | v2.11 B 方案下载 |
| favicon | `public/favicon.svg` | X 蓝色 SVG |
| 设计 token | `token.json` | 基于 `mobile-dark.template.json` 骨架 |
| Tailwind 配置 | `tailwind.config.ts` | 手写 + 命名空间 `mob-` |

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

1. 替换 `token.json` → 自己的品牌色（X 蓝 #1d9bf0 / IG 渐变 / Airbnb 红）
2. 替换 `src/components/mobile/FeedCard.vue` → 自己的内容模型（推文 / 帖文 / 房源）
3. 替换 `src/components/mobile/BottomTabBar.vue` → 自己的 tab 列表
4. 替换 `src/mock/feed.ts` → 自己的模拟数据
5. `pnpm build` → 验证 `dist/fonts/` 资源齐全

---

## 维护

- **来源**：bicorne-design v2.12 Task 9 · SubTask 9.4
- **关联**：[templates/README.md](../README.md) · [v2-12-roadmap-execution/tasks.md](../../.trae/specs/v2-12-roadmap-execution/tasks.md)
- **备份**：实施前已创建 `.trae/skills/bicorne-design.bak.v2.11`（Task 12.4）