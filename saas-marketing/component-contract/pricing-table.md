---
name: pricing-table
description: Multi-tier pricing comparison table with monthly/annual toggle, featured tier highlight, feature checkmarks, and clear primary CTA per tier.
---

# `pricing-table` — Pricing Comparison

> 价格页是 marketing site 转化率最高的一页。设计原则：**清晰对比 + 单一推荐 + 信任构建**。

## Mandatory tokens

| Token path | Purpose |
|---|---|
| `colors.surface.{default,elevated,muted}` | 卡片背景三档 |
| `colors.border.{default,strong}` | 卡片边框 |
| `colors.accent.{blue,green,violet,gradient}` | 推荐档卡片高亮 |
| `colors.text.{default,muted,inverse}` | 价格/功能/按钮 |
| `typography.size.h-display` | 价格数字 48-72px |
| `typography.size.body-lg` | 档位名 20-24px |
| `typography.size.body` | 功能列表 14-16px |
| `spacing.{6,8,12,16}` | 卡片内边距 |
| `radii.{xl,2xl}` | 卡片圆角 |
| `shadow.{md,lg,2xl}` | 卡片阴影（推荐档更深） |

## Recommended structure

```html
<section class="px-6 py-20">
  <!-- 标题 -->
  <h2 class="text-center text-h-lg font-bold">Simple, transparent pricing</h2>
  <p class="mt-4 text-center text-muted text-lg">No hidden fees. Cancel anytime.</p>

  <!-- 月年付切换 -->
  <div class="mt-8 flex justify-center">
    <Toggle v-model="billing">
      <option value="monthly">Monthly</option>
      <option value="annual">Annual <Badge>Save 20%</Badge></option>
    </Toggle>
  </div>

  <!-- 3 栏（推荐 3 档；2 档或 4 档亦可） -->
  <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
    <!-- Starter -->
    <PricingCard tier="Starter" price="$0" featured={false}>
      <ul>
        <CheckItem>Up to 3 projects</CheckItem>
        <CheckItem>1 GB storage</CheckItem>
        <CheckItem>Community support</CheckItem>
      </ul>
      <a class="btn-secondary">Get started</a>
    </PricingCard>

    <!-- Pro (FEATURED) -->
    <PricingCard tier="Pro" price="$20" featured={true} badge="Most popular">
      <ul>
        <CheckItem>Unlimited projects</CheckItem>
        <CheckItem>100 GB storage</CheckItem>
        <CheckItem>Priority support</CheckItem>
        <CheckItem>Advanced analytics</CheckItem>
      </ul>
      <a class="btn-primary">Start free trial</a>
    </PricingCard>

    <!-- Enterprise -->
    <PricingCard tier="Enterprise" price="Custom" featured={false}>
      <ul>
        <CheckItem>Everything in Pro</CheckItem>
        <CheckItem>SSO + SAML</CheckItem>
        <CheckItem>Dedicated CSM</CheckItem>
        <CheckItem>SLA 99.99%</CheckItem>
      </ul>
      <a class="btn-secondary">Contact sales</a>
    </PricingCard>
  </div>

  <!-- 对比表（全功能对比） -->
  <ComparisonTable class="mt-20"/>
</section>
```

## Critical UX rules

### 1. 月年付切换必须**显示节省**
- 切换到 annual 时实时显示 "Save 20%" 徽章
- 切换不要触发页面刷新（保持状态）
- 切换后 URL 同步（`?billing=annual`）便于分享

### 2. 推荐档必须**视觉突出**
- 卡片放大（`scale-105`）
- 卡片阴影加深
- 顶部 "Most popular" 徽章（**不要** "Recommended"，"Most popular" 社会证明更强）
- 价格数字稍大

### 3. CTA 文案**根据档位定制**
- Free 档 → "Get started" 或 "Sign up"
- 中间档 → "Start free trial" 或 "Try free for 14 days"
- Enterprise 档 → "Contact sales" 或 "Talk to us"
- ❌ 三档都用 "Get started"（无差异化）

### 4. 价格数字**突出**
- 字号 48-72px
- 字重 800
- 货币符号小一号（视觉权重让给数字）
- 年付显示**月均价 + "billed annually"**（如 `$20 /mo billed annually`）

### 5. "What's included" 列表**只用 checkmark**
- ❌ 不用 bullet / 不用数字
- ✅ 用统一图标（推荐 lucide `Check` 2px stroke）
- 部分功能显示灰色（不带 check 也不带 ✗），中间档部分标 "Coming soon"

### 6. 信任元素
- 卡片下方："30-day money-back guarantee"
- 顶部："Trusted by X teams" + 3-6 个客户 logo
- 底部 FAQ 链接（"Have questions? See our FAQ"）

## Comparison Table (optional but recommended)

```
                  | Starter  | Pro ⭐   | Enterprise
                  | Free     | $20/mo   | Custom
─────────────────────────────────────────────────────────
Projects          | 3        | Unlimited| Unlimited
Storage           | 1 GB     | 100 GB   | 1 TB
Users             | 1        | Up to 10 | Unlimited
SSO               | —        | —        | ✓
SLA               | —        | 99.9%    | 99.99%
Support           | Community| Priority | Dedicated
```

> 表格关键：行的顺序按"用户决策权重"排（最重要的功能最上），不要按字母序。

## Pitfalls

- ❌ **3 档长得一样，只靠文字"Pro"区分** → 用户看不出推荐
- ❌ **月年付不显示节省** → 用户不知道 annual 划算
- ❌ **价格写"From $20"，其他档不写价格** → 信任崩塌
- ❌ **功能列表太长（>10 项）** → 用户读完就累
- ❌ **Enterprise 档"Contact us"含糊** → 用户不知道是否符合
- ❌ **切换月年付时整页 reload 闪烁** → 体验割裂
- ❌ **"Free"档被低估（功能太少）** → 用户直接跳到 Pro
- ❌ **首屏不显示价格** → 用户跳到别的产品
- ❌ **货币硬编码 USD** → 国际用户失望

## Animation

- 切换月年付：价格数字 spring 动画（如 400ms easeOutBack）
- 推荐档卡片入场：fade-up + scale 0.95→1.05
- Check 列表：错落 fade-in（每项 50ms 间隔）

## Reference implementations

- **Stripe** — 3 档 + 对比表 + 切换（最经典）
- **Vercel** — 4 档（Free/Pro/Enterprise/Contact）
- **Linear** — 2 档 + 简洁功能对比
- **Notion** — "For individuals" + "For teams" 双 tab
- **Cal** — 详细功能对比 + "What's included"
