# `feature-row` — 特性块（图标 + 标题 + 描述 + 演示）

> Landing Page 解释"产品做什么"的核心区块。**每屏只讲 1 件事**——访客能复述"这个特性让我能 [做某事]"。

---

## 何时用 / 何时不用

✅ **用**：landing page 解释核心价值 / 关键能力
❌ **不用**：多页品牌站"功能页"（用 saas-marketing 的 feature-grid）/ 仪表盘

---

## Mandatory tokens

| Token path | 用途 |
|---|---|
| `typography.size.h-xl` | 特性标题 32-40px |
| `typography.size.body-lg` | 描述 16-18px |
| `typography.weight.bold` | 标题字重 700 |
| `colors.text.default` | 标题 / 描述 |
| `colors.text.muted` | 副文本 |
| `colors.accent.primary` | 图标背景 / 强调 |
| `colors.surface.elevated` | 演示图卡片 |
| `colors.border.subtle` | 分隔线（多特性之间） |
| `spacing.{8,12,16,20,24}` | 区块 padding（py-16 ~ py-24） |

---

## Recommended props

```ts
interface FeatureRowProps {
  /** 编号（"01" "02" "03"）或图标 */
  index?: string
  icon?: { name: string; tone?: 'accent' | 'neutral' }
  /** 特性标题（≤ 6 词） */
  title: string
  /** 描述（≤ 30 词） */
  description: string
  /** 演示 */
  visual?: {
    type: 'screenshot' | 'gif' | 'illustration' | 'code'
    src?: string
    alt?: string
    code?: string
  }
  /** 布局方向 */
  layout?: 'text-left' | 'text-right' | 'centered' | 'alternating'
  /** CTA 链接（可选） */
  learnMore?: { label: string; href: string }
}
```

---

## Pitfalls

### ❌ Pitfall 1: 一屏塞 3 个特性

```ts
// ❌ 1 屏讲 3 件事，访客记不住
<feature title="快" desc="..." />
<feature title="稳" desc="..." />
<feature title="省" desc="..." />

// ✅ 1 屏 1 特性，每特性 1 屏
<screen>
  <h2>快</h2>
  <p>...</p>
  <img src="speed-demo.gif" />
</screen>
```

### ❌ Pitfall 2: 描述用空话（"易于使用"）

```ts
// ❌ "易于使用" 谁都能说
description: "易于使用 / 强大功能"

// ✅ 具体、点出结果
description: "Setup in 5 minutes. No DevOps required."
```

### ❌ Pitfall 3: 演示用静态截图，无交互感

```ts
// ❌ 静态截图看不出产品在做什么
<img src="static.png" />

// ✅ GIF / 视频 / 交互 demo
<img src="feature.gif" />
// 或
<video autoplay muted loop src="feature.mp4" />
```

### ❌ Pitfall 4: 文字 + 图左右比例 1:1，导致文字太挤

```ts
// ❌ 1:1 在 mobile 上文字一行 5 词
<div class="grid-cols-2">
  <div>文字...</div>
  <div>图</div>
</div>

// ✅ Mobile 上下堆叠，desktop 左右
<div class="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr]">
```

### ❌ Pitfall 5: 没有"先讲结果再讲功能"

```ts
// ❌ 先讲技术细节
<title>RESTful API with OAuth 2.0</title>
<desc>用 OAuth 2.0 实现 RESTful...</desc>

// ✅ 先讲用户能得到什么
<title>集成只需 5 分钟</title>
<desc>一行代码接入，无需处理鉴权 / 速率限制...</desc>
```

---

## Minimal Vue 3 template (text-left)

```vue
<script setup lang="ts">
withDefaults(defineProps<FeatureRowProps>(), {
  layout: 'text-left',
})
</script>

<template>
  <section class="py-16 lg:py-24 px-6 max-w-6xl mx-auto">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
         :class="layout === 'text-right' ? 'lg:[&>:first-child]:order-2' : ''">
      <!-- 文字侧 -->
      <div>
        <div v-if="index || icon" class="mb-4 flex items-center gap-3">
          <span v-if="index" class="text-caption font-mono text-text-muted">
            {{ index }}
          </span>
          <span
            v-else-if="icon"
            :class="[
              'inline-flex w-10 h-10 items-center justify-center rounded-md',
              icon.tone === 'neutral' ? 'bg-surface-2 text-text-default' : 'bg-accent-primary/10 text-accent-primary',
            ]"
          >
            <component :is="icon.name" />
          </span>
        </div>

        <h2 class="text-h-xl font-bold text-text-default mb-4">
          {{ title }}
        </h2>

        <p class="text-body-lg text-text-muted mb-6">
          {{ description }}
        </p>

        <a-link v-if="learnMore" :href="learnMore.href">
          {{ learnMore.label }} →
        </a-link>
      </div>

      <!-- 视觉侧 -->
      <div v-if="visual" class="rounded-lg overflow-hidden bg-surface-elevated shadow-xl">
        <img
          v-if="visual.type === 'screenshot' || visual.type === 'gif'"
          :src="visual.src"
          :alt="visual.alt"
          loading="lazy"
        />
        <pre
          v-else-if="visual.type === 'code'"
          class="p-6 text-mono text-body overflow-x-auto"
        ><code>{{ visual.code }}</code></pre>
      </div>
    </div>
  </section>
</template>
```

---

## Acceptance check

- [ ] 1 屏 1 特性，不塞多
- [ ] 描述具体，动词开头，≤ 30 词
- [ ] 演示用 GIF / 视频 / 交互 demo 而非静态图
- [ ] Mobile 上下堆叠，desktop 左右
- [ ] 文字先讲结果再讲功能
- [ ] 演示图 `loading="lazy"`（非首屏）
- [ ] 0 `v-if` + `v-for` 混用
