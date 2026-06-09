---
name: social-proof
description: Customer logo wall + brief stat banner — third-party validation to build trust early on a marketing page.
---

# `social-proof` — Customer Logo Wall + Stats

> 信任构建第一关。常见位置：Hero 下方、Feature 之后、Pricing 之前、Footer 之前。

## Mandatory tokens

| Token path | Purpose |
|---|---|
| `colors.text.muted` | 标签文字（"Trusted by"） |
| `colors.text.default` | 数字统计（突出） |
| `colors.surface.muted` | 浅色背景（可选） |
| `colors.border.subtle` | logo 分隔线 |
| `typography.size.body-sm` | 标签 14-15px |
| `typography.size.h-md` | 数字 32-48px |
| `spacing.{8,12}` | 上下内边距 |
| `spacing.{8,12,16}` | logo 间距 |

## Variants

| Variant | 适用 | 关键点 |
|---|---|---|
| **V1 Logo wall** | 通用 | 居中 "Trusted by" + 6-12 个 logo 横排 |
| **V2 Logo wall + stats** | 数据驱动 | V1 + 3-4 个大数字（"1M+ users"） |
| **V3 Quote + logo** | 信任强调 | 单条客户引语 + 头像 + 公司 logo + 链接 |
| **V4 Industry grid** | 垂直行业 | 按行业分类（金融/医疗/教育） |

## Recommended structure (V2 Logo wall + stats)

```html
<section class="px-6 py-16 bg-surface-muted/30">
  <div class="max-w-6xl mx-auto">
    <!-- Eyebrow -->
    <p class="text-center text-body-sm text-muted uppercase tracking-wider font-medium">
      Trusted by 1,000+ teams worldwide
    </p>

    <!-- Logo grid (响应式) -->
    <div class="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 items-center">
      <img v-for="logo in logos" :key="logo"
           :src="`/logos/${logo}.svg`" :alt="logo"
           class="h-7 w-auto mx-auto opacity-60 grayscale
                  hover:opacity-100 hover:grayscale-0 transition-all"/>
    </div>

    <!-- Stats -->
    <div class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      <div>
        <p class="text-h-md font-bold text-default">1M+</p>
        <p class="mt-1 text-body-sm text-muted">Active users</p>
      </div>
      <div>
        <p class="text-h-md font-bold text-default">99.99%</p>
        <p class="mt-1 text-body-sm text-muted">Uptime SLA</p>
      </div>
      <div>
        <p class="text-h-md font-bold text-default">50ms</p>
        <p class="mt-1 text-body-sm text-muted">P99 latency</p>
      </div>
      <div>
        <p class="text-h-md font-bold text-default">4.9/5</p>
        <p class="mt-1 text-body-sm text-muted">G2 rating</p>
      </div>
    </div>
  </div>
</section>
```

## Logo requirements

### Quality
- 矢量 SVG（不要 PNG）
- 透明背景（不要白底）
- 统一高度（推荐 h-7 ~ 32px）
- 统一色彩处理：**默认 grayscale + 60% opacity**，hover 时恢复全色

### Layout
- **数量**: 6-12 个（少于 6 没信任，多于 12 视觉乱）
- **排列**: 桌面 6 列、平板 3 列、移动 2 列
- **顺序**: 按**重要度排**（最大/最知名品牌在前）
- **回避**: 不用投资人 logo（除非是融资期） / 不用 mock logo

### Source
- 从客户那拿 brand kit
- 没有的话用 `<brand>.svg` 在 `<a href="case-study">` 包裹（点击跳案例页）

## Stats copy formula

| 类型 | 公式 | 示例 |
|---|---|---|
| 用户量 | "[数字]+ active users" | "1M+ users" / "10k+ teams" |
| 性能 | "[数字] [单位]" | "99.99% uptime" / "50ms latency" |
| 评级 | "[数字]/5 on [平台]" | "4.9/5 on G2" / "5/5 on Product Hunt" |
| 规模 | "Powering [场景]" | "Powering 1M+ requests/sec" |
| 时间 | "Trusted since [年份]" | "Trusted since 2018" |

## Pitfalls

- ❌ **logo 数量 < 4** → 没信任
- ❌ **logo 数量 > 15** → 视觉乱
- ❌ **logo 不统一高度**（有的 30px 有的 50px）→ 视觉参差
- ❌ **logo 不 grayscale**（彩色混排）→ 视觉噪音
- ❌ **logo 是 mock 商标**（拼凑）→ 律师函风险
- ❌ **数字无来源**（"1000x faster"）→ 营销 trap
- ❌ **数字过小**（"5 users"）→ 反向效果
- ❌ **stats 数字用相对时间**（"1M+ this year"）→ 不易验证
- ❌ **整页多个 social proof 块** → 重复反而让用户怀疑

## Recommended placement

| 页面 | 位置 | 数量 |
|---|---|---|
| 产品总览 | Hero 之后（立即信任） | 1 |
| 价格 | 表格之前 | 1（可选） |
| 客户案例 | 顶部 + 末部案例 | 2（结构不同） |
| 关于/招聘 | 中部 | 1 |

## Animation

- **logo 进场**: 错落 fade-in（每行 30ms 间隔）
- **logo hover**: opacity 1 + 去除 grayscale + scale-105，200ms
- **stats 数字**: 数字滚动（useCountUp / CountUp.js），1.2s easeOutCubic

## Reference implementations

- **Stripe** — 6 logo + 3 大数字
- **Vercel** — 大量 logo 灰度墙
- **Linear** — 极简 4-6 logo
- **Notion** — 大数字（"30M+ users"）+ 客户头像
- **Cal** — "Trusted by X+" + 6 logo
- **Resend** — 极简 logo wall
