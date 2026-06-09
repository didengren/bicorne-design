---
name: cta-band
description: Mid- or bottom-page call-to-action banner — strong headline, supporting text, primary CTA, optional secondary CTA. Used to drive conversion at key page junctions.
---

# `cta-band` — CTA Banner

> 关键页面的"转化点"。常见位置：Hero 之后、Features 之后、Footer 之前。

## Mandatory tokens

| Token path | Purpose |
|---|---|
| `colors.accent.{blue,green,violet,gradient}` | 背景渐变 |
| `colors.text.inverse` | 标题/CTA 文字 |
| `typography.size.h-xl` | 标题 36-48px |
| `typography.size.body-lg` | 副标题 18-20px |
| `spacing.{12,16,20}` | 内边距（桌面 / 移动） |
| `radii.{xl,2xl,3xl}` | 圆角 |

## Variants

| Variant | 适用 | 关键点 |
|---|---|---|
| **V1 Gradient-bg** | 主 CTA（页底） | 全宽渐变背景 + 白文字 + 大按钮 |
| **V2 Muted-bg** | 页中软 CTA | 浅色背景 + 暗色文字 + 中等按钮 |
| **V3 Card-floating** | 视觉强调 | 浮起卡片 + 阴影 + 居中内容 |
| **V4 Inline** | 段落中 | 段落内 + 行内链接 |

## Recommended structure (V1 Gradient-bg)

```html
<section class="px-6 py-24">
  <div class="relative overflow-hidden rounded-3xl
              bg-gradient-to-br from-accent-blue via-accent-violet to-accent-blue
              px-8 py-16 sm:px-16 sm:py-20 max-w-6xl mx-auto">
    <!-- 背景装饰（可选） -->
    <div class="absolute inset-0 opacity-30">
      <div class="absolute -top-1/2 -right-1/4 w-96 h-96 rounded-full
                  bg-white/20 blur-3xl"/>
    </div>

    <div class="relative text-center">
      <h2 class="text-h-xl font-bold text-white">
        Ready to ship faster?
      </h2>
      <p class="mt-4 text-body-lg text-white/80 max-w-2xl mx-auto">
        Join 1,000+ teams using Product to deploy in seconds.
      </p>
      <div class="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <a class="btn-primary btn-lg bg-white text-accent-blue hover:bg-white/90">
          Start free trial
        </a>
        <a class="btn-ghost btn-lg text-white border-white/30 hover:bg-white/10">
          Talk to sales →
        </a>
      </div>
      <p class="mt-4 text-sm text-white/60">
        No credit card required · 14-day free trial
      </p>
    </div>
  </div>
</section>
```

## Copy formula

| 元素 | 长度 | 公式 |
|---|---|---|
| 标题 | 4-8 词 | 行动 + 价值（"Ready to ship faster?" / "Start building today"） |
| 副标题 | 8-16 词 | 鼓励 + 降低门槛（"Join X+ teams" / "No credit card required"） |
| Primary CTA | 2-4 词 | 动作（"Start free trial" / "Get started"） |
| Secondary CTA | 2-4 词 | 探索（"Talk to sales" / "Watch demo"） |

## Pitfalls

- ❌ **整页 3+ 个 CTA Band** → 用户麻木
- ❌ **CTA 文本 "Submit" / "Click here"** → 转化率低
- ❌ **CTA 颜色与背景同色** → 看不见
- ❌ **CTA 文本每页不同**（"Get started" / "Try free" / "Sign up"）→ 信任崩塌
- ❌ **CTA 按钮有 hover 无 focus 样式** → 键盘用户无法识别
- ❌ **CTA 区没有信任元素**（"X+ teams" / "No credit card"）→ 转化率低
- ❌ **CTA 在首屏出现**（过早）→ 用户没看完产品就转化（实际不会）
- ❌ **CTA 在移动端被遮挡**（粘性 footer / 工具栏覆盖）→ 无法点击

## Recommended placement

| 页面 | CTA Band 数 | 位置 |
|---|---|---|
| 产品总览（S1） | 2 | Hero 之后、Footer 之前 |
| 价格（S2） | 1 | 表格之后 |
| 客户（S3） | 1 | 大案例之后 |
| 博客详情 | 1 | 文章末（"Subscribe to newsletter"） |
| 关于/招聘 | 1 | 页中 |

## Animation

- **入场**: fade-up（800ms ease-out）
- **背景装饰**: 缓慢漂移（optional，10-20s 循环，避免 attention 抢戏）
- **按钮 hover**: scale-105 + 阴影加深，200ms

## Trust elements checklist

每页 CTA Band **至少包含一项**：
- ☐ "Trusted by X+ teams" + 3-6 个客户 logo
- ☐ "No credit card required"
- ☐ "Free 14-day trial"
- ☐ "Cancel anytime"
- ☐ "SOC 2 / GDPR compliant"（如适用）
- ☐ 5-star 评级（如适用）

## Reference implementations

- **Stripe** — 渐变 + 白文字 + 巨大按钮
- **Vercel** — 居中 + 双 CTA
- **Linear** — 极简 + 单 CTA
- **Cal** — 渐变 + 视频背景
- **Resend** — 居中 + 邮件订阅框
- **Notion** — 浮起卡片 + 阴影
