# `pricing-simple` — 简化价格表（2-3 栏 + 推荐档高亮）

> Landing Page 决策时刻。**2-3 档 + 1 个推荐档高亮** + 月年付切换。

---

## 何时用 / 何时不用

✅ **用**：landing page 决策段 / 简单价格页（≤ 3 档）
❌ **不用**：4+ 档复杂定价（用 saas-marketing 的 pricing-table 含对比矩阵）

---

## Mandatory tokens

| Token path | 用途 |
|---|---|
| `typography.size.h-xl` | 档位名 28-32px |
| `typography.size.h-display` | 价格数字 48-64px |
| `typography.size.body` | 描述 / 特性列表 |
| `typography.size.caption` | 备注 / 单位 |
| `typography.weight.bold/extrabold` | 价格字重 700-800 |
| `colors.text.default` | 档位名 / 价格 |
| `colors.text.muted` | 描述 / 单位 |
| `colors.accent.primary` | 推荐档边框 / CTA / 顶部 ribbon |
| `colors.surface.elevated` | 推荐档卡片背景（轻微高亮） |
| `colors.border.default` | 普通档边框 |
| `colors.border.accent` | 推荐档边框（accent） |
| `colors.semantic.success` | 包含项的勾 |

---

## Recommended props

```ts
interface PricingTier {
  /** 档位 ID */
  id: string
  /** 档位名（Free / Pro / Enterprise） */
  name: string
  /** 推荐文案（"Most popular"） */
  badge?: string
  /** 价格（数字，null = Contact us） */
  price: number | null
  /** 计费单位 */
  unit?: 'month' | 'year' | 'one-time'
  /** 年付折扣文案 */
  yearlyDiscount?: string
  /** 描述 */
  description?: string
  /** 包含项（每条 ≤ 8 词） */
  features: string[]
  /** 不包含项（如需展示"对比"） */
  excluded?: string[]
  /** CTA */
  cta: { label: string; href: string }
  /** 是否高亮（推荐档） */
  highlighted?: boolean
}

interface PricingSimpleProps {
  tiers: PricingTier[]      // 2-3 档
  /** 默认计费周期 */
  defaultCycle?: 'monthly' | 'yearly'
  /** 显示月年付切换 */
  showToggle?: boolean
  /** 自定义计费文案 */
  customContactText?: string
}
```

---

## Pitfalls

### ❌ Pitfall 1: 没有"推荐档"高亮

```ts
// ❌ 3 档平级，访客不知选哪个
tiers: [
  { name: 'Free', price: 0 },
  { name: 'Pro', price: 29 },
  { name: 'Team', price: 99 },
]

// ✅ 中间档高亮（认知偏误：用户倾向选中间）
tiers: [
  { name: 'Free', price: 0 },
  { name: 'Pro', price: 29, highlighted: true, badge: 'Most popular' },
  { name: 'Team', price: 99 },
]
```

### ❌ Pitfall 2: 价格不透明（"Contact us"）

```ts
// ❌ 3 档中 1 档 "Contact us"，等于强迫销售对话
tiers: [
  { name: 'Free', price: 0 },
  { name: 'Pro', price: 29 },
  { name: 'Enterprise', price: null },  // ❌
]

// ✅ 至少 2-3 档有公开价格
tiers: [
  { name: 'Free', price: 0 },
  { name: 'Pro', price: 29, highlighted: true },
  { name: 'Team', price: 99 },
]
```

### ❌ Pitfall 3: 月年付切换没有视觉差异

```ts
// ❌ 切到年付但页面没显示节省
[Monthly] [Yearly]   // 切了，但价格还是 * 12

// ✅ 切换后显示折扣
<toggle v-model="cycle" />
<p v-if="cycle === 'yearly'" class="text-success">Save 20%</p>
```

### ❌ Pitfall 4: 特性列表用空话

```ts
// ❌ "Full access" "Premium support"
features: ['Full access', 'Premium support']

// ✅ 具体、可衡量
features: [
  'Unlimited projects',
  'Up to 10 team members',
  'Priority email support (24h)',
  'Advanced analytics',
]
```

### ❌ Pitfall 5: 高亮档没有视觉权重差异

```ts
// ❌ 高亮档只是多了个"推荐"标签
.highlighted { border: 1px solid; }

// ✅ 多种权重叠加
.highlighted {
  transform: scale(1.05);
  border: 2px solid theme('colors.accent.primary');
  box-shadow: 0 20px 40px rgba(...);
  position: relative;
  z-index: 1;
}
```

### ❌ Pitfall 6: 缺失"信任元素"（退款保证 / 随时取消）

```ts
// ❌ CTA 下方什么都没
<a-button>Start Pro</a-button>

// ✅ 加 trust text
<a-button>Start Pro</a-button>
<p class="text-caption">30-day money back · Cancel anytime</p>
```

---

## Minimal Vue 3 template

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

const props = withDefaults(defineProps<PricingSimpleProps>(), {
  defaultCycle: 'yearly',
  showToggle: true,
})

const cycle = ref(props.defaultCycle)
</script>

<template>
  <section class="py-16 lg:py-24 px-6 max-w-6xl mx-auto">
    <!-- 月年付切换 -->
    <div v-if="showToggle" class="flex items-center justify-center gap-3 mb-12">
      <span :class="cycle === 'monthly' ? 'text-text-default' : 'text-text-muted'">
        Monthly
      </span>
      <a-switch v-model:checked="cycle" checked-value="yearly" un-checked-value="monthly" />
      <span :class="cycle === 'yearly' ? 'text-text-default' : 'text-text-muted'">
        Yearly
        <span class="text-semantic-success text-caption ml-1">Save 20%</span>
      </span>
    </div>

    <!-- 价格表 -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
      <div
        v-for="tier in tiers"
        :key="tier.id"
        :class="[
          'flex flex-col p-8 rounded-lg border-2 transition-all duration-200',
          tier.highlighted
            ? 'border-accent-primary bg-surface-elevated shadow-2xl scale-105 relative z-10'
            : 'border-border-default bg-surface-1',
        ]"
      >
        <div v-if="tier.badge" class="absolute -top-3 left-1/2 -translate-x-1/2">
          <a-tag color="accent">{{ tier.badge }}</a-tag>
        </div>

        <h3 class="text-h-xl font-bold text-text-default mb-2">
          {{ tier.name }}
        </h3>

        <p v-if="tier.description" class="text-caption text-text-muted mb-6">
          {{ tier.description }}
        </p>

        <!-- 价格 -->
        <div class="mb-6">
          <template v-if="tier.price !== null">
            <span class="text-h-display font-extrabold text-text-default">
              ${{ cycle === 'yearly' && tier.yearlyDiscount
                ? Math.round(tier.price * 12 * (1 - parseFloat(tier.yearlyDiscount) / 100))
                : tier.price }}
            </span>
            <span class="text-caption text-text-muted">/ {{ tier.unit || 'month' }}</span>
          </template>
          <template v-else>
            <span class="text-h-display font-extrabold text-text-default">Custom</span>
            <p class="text-caption text-text-muted mt-1">{{ customContactText || 'Contact us' }}</p>
          </template>
        </div>

        <!-- 包含项 -->
        <ul class="flex-1 space-y-3 mb-8">
          <li v-for="f in tier.features" :key="f" class="flex items-start gap-2 text-body text-text-default">
            <span class="text-semantic-success mt-0.5">✓</span>
            <span>{{ f }}</span>
          </li>
        </ul>

        <a-button
          :type="tier.highlighted ? 'primary' : 'default'"
          size="large"
          :href="tier.cta.href"
        >
          {{ tier.cta.label }}
        </a-button>

        <p class="text-caption text-text-muted mt-3 text-center">
          30-day money back · Cancel anytime
        </p>
      </div>
    </div>
  </section>
</template>
```

---

## Acceptance check

- [ ] 2-3 档（不要 4+）
- [ ] 有 1 个推荐档高亮（中间档 + `highlighted: true` + badge）
- [ ] 推荐档视觉权重（scale + border + shadow + position）
- [ ] 至少 2 档有公开价格（无 "Contact us"）
- [ ] 月年付切换显示折扣
- [ ] 特性具体可衡量
- [ ] CTA 下方有 trust text
- [ ] Mobile 上下堆叠
- [ ] 0 `v-if` + `v-for` 混用
