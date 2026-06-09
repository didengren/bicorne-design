---
name: bicorne-landing-template
description: Landing page template · Vue 3 + Vite + Tailwind · Resend-style single-page marketing · cloned from verification/5-1-resend-landing
keywords: template, landing, marketing, resend, vue, tailwind, vite
---

# bicorne-landing-template

> 邮件 / SaaS / 落地页 / 营销页开箱即用模板（Resend 风格 · 单页滚动）。
> 源项目：`landing-pages/verification/5-1-resend-landing`（v2.11 B 方案 · 18 分 P）。

---

## 适用场景

- 邮件服务 SaaS 落地页（Resend 风格）
- 单页营销 / 单 CTA 转化页
- Hero + Feature + Pricing + Testimonial + Footer 8 节流程
- 亮色主题（白底 + 1 个强调色）+ 节制动效

---

## 快速开始

```bash
cd templates/landing-template
pnpm install
pnpm dev      # → http://localhost:5174
pnpm build    # → dist/ （含 fonts/ + preload）
pnpm preview  # → http://localhost:4174
```

---

## 包含的组件

| 组件 | 文件 | 来源契约 |
|------|------|----------|
| HeroCta | `src/components/landing/HeroCta.vue` | [landing-pages/component-contract/hero-cta.md](../../landing-pages/component-contract/hero-cta.md) |
| FeatureRow | `src/components/landing/FeatureRow.vue` | [landing-pages/component-contract/feature-row.md](../../landing-pages/component-contract/feature-row.md) |
| PricingSimple | `src/components/landing/PricingSimple.vue` | [landing-pages/component-contract/pricing-simple.md](../../landing-pages/component-contract/pricing-simple.md) |
| TestimonialLogos | `src/components/landing/TestimonialLogos.vue` | [landing-pages/component-contract/testimonial-logos.md](../../landing-pages/component-contract/testimonial-logos.md) |

---

## 8 节页面流程

Hero → Social Proof → Features → Pricing → FAQ → Final CTA → Footer
（详细结构见 `src/pages/landing.vue`）

---

## 资源清单

| 资源 | 路径 | 来源 |
|------|------|------|
| Inter Variable woff2 | `public/fonts/inter-var.woff2` | v2.11 B 方案下载 |
| JetBrains Mono Regular woff2 | `public/fonts/jetbrains-mono.woff2` | v2.11 B 方案下载 |
| favicon | `public/favicon.svg` | Resend 风格 SVG |
| 设计 token | `token.json` | 基于 `light-theme.template.json` 骨架 |
| Tailwind 配置 | `tailwind.config.ts` | 手写 + 命名空间 `land-` |

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

1. 替换 `token.json` → 自己的品牌色 / 字号 / 间距
2. 替换 `src/components/landing/*.vue` 内容（Hero 标题、Feature 列表、Pricing 套餐）
3. 替换 `src/mock/landing.ts` → 自己的 customer logos / testimonials
4. 调整 `src/pages/landing.vue` → 8 节顺序与文案
5. `pnpm build` → 验证 `dist/fonts/` 资源齐全

---

## 维护

- **来源**：bicorne-design v2.12 Task 9 · SubTask 9.2
- **关联**：[templates/README.md](../README.md) · [v2-12-roadmap-execution/tasks.md](../../.trae/specs/v2-12-roadmap-execution/tasks.md)
- **备份**：实施前已创建 `.trae/skills/bicorne-design.bak.v2.11`（Task 12.4）