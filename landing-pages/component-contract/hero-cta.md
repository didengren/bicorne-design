# `hero-cta` — 单页 Hero + 单一主 CTA

> Landing Page 最重要的区块。访客在前 5 秒决定去留。本组件**强制 1 个主 CTA**，避免分流转化。

---

## 何时用 / 何时不用

✅ **用**：landing page 首屏 / 产品发布页 / 活动页
❌ **不用**：多页品牌站（用 saas-marketing 的 hero-section，允许多个 CTA）/ 后台 / 大屏

---

## Mandatory tokens

| Token path | 用途 |
|---|---|
| `typography.size.h-display` | 标题 56-80px desktop / 40-56px mobile |
| `typography.size.h-xl` | 副标题 20-24px |
| `typography.size.body-lg` | 描述 16-18px |
| `typography.weight.extrabold` | 标题字重 800 |
| `typography.tracking.tight` | 标题字距 -0.025em |
| `colors.text.default` | 标题主色 |
| `colors.text.muted` | 副标题 / 描述 |
| `colors.accent.primary` | 主 CTA 背景 |
| `colors.accent.primary.hover` | 主 CTA hover |
| `colors.surface.elevated` | 演示图卡片背景 |
| `colors.text.onAccent` | CTA 文字 |
| `spacing.{8,12,16,24,32}` | 区块 padding（py-20 ~ py-32 desktop） |
| `motion.duration.medium` | 入场动画 500-700ms |

---

## Recommended props

```ts
interface HeroCtaProps {
  /** Eyebrow 标签（可选，如 "Now in public beta"） */
  eyebrow?: string
  /** 主标题（≤ 8 词） */
  headline: string
  /** 副标题（≤ 24 词） */
  subhead?: string
  /** 描述（≤ 50 词） */
  description?: string
  /** 主 CTA */
  primaryCta: { label: string; href: string }
  /** 次 CTA（可选） */
  secondaryCta?: { label: string; href: string }
  /** 信任副文案（如"无需信用卡"） */
  trustText?: string
  /** 视觉类型 */
  visual?: {
    type: 'screenshot' | 'video' | 'animation' | 'illustration' | 'none'
    src?: string
    alt?: string
  }
  /** 布局：centered / left-aligned / right-aligned */
  layout?: 'centered' | 'left' | 'right'
}
```

---

## Pitfalls

### ❌ Pitfall 1: Headline 用空话（"Empower your business"）

```ts
// ❌ 没传达"给谁 + 解决什么"
headline: "Empower your business with innovation"

// ✅ 具体、动词开头、点出受众
headline: "Ship products faster. Without the meetings."
```

### ❌ Pitfall 2: 多个主 CTA 竞争转化

```ts
// ❌ 3 个 CTA 平级，访客不知选哪个
<a-button>免费试用</a-button>
<a-button>联系销售</a-button>
<a-button>查看价格</a-button>

// ✅ 1 个主 + 1 个次（次级文本 / 链接）
<a-button type="primary">免费试用</a-button>     // 主
<a-link>查看价格 →</a-link>                          // 次
```

### ❌ Pitfall 3: 演示图用低分辨率截图

```ts
// ❌ 320x240 模糊截图
<img src="screenshot-320.png" />

// ✅ 高分辨率 + WebP + 设备框架
<picture>
  <source srcset="hero-2x.avif 2x, hero.avif 1x" type="image/avif" />
  <img src="hero.png" alt="..." width="1200" height="800" />
</picture>
```

### ❌ Pitfall 4: 入场动画超过 1 秒

```ts
// ❌ 访客要等动画才能看内容
animation: fadeInUp 2000ms ease-out;

// ✅ 500-700ms 让访客立即看到内容
animation: fadeInUp 600ms ease-out;
```

### ❌ Pitfall 5: CTA 按钮文案模糊

```ts
// ❌ "Submit" "Click here" "Learn more"
<a-button>Submit</a-button>

// ✅ 具体、动词、含价值
<a-button>Start free 14-day trial</a-button>
```

### ❌ Pitfall 6: 没"信任副文案"（risk reversal）

```ts
// ❌ CTA 旁边什么都没
<a-button>免费试用</a-button>

// ✅ CTA 下方加"无需信用卡"等降低风险文案
<a-button>免费试用</a-button>
<p class="text-caption">无需信用卡 · 14 天免费</p>
```

---

## 5 种 Hero 布局

| 布局 | 适用 | 比例 |
|---|---|---|
| **Centered** | 通用 / 启动期 / 品牌驱动 | 1:1 |
| **Left + Image** | DevTools / 高密度 / B2D | 1:1 |
| **Right + Image** | 同上（视觉优先在右） | 1:1 |
| **Headline-only** | 极简 / 高端 / 极强品牌 | 1:0 |
| **Background Image** | 沉浸式 / 视频驱动 | 1:0（背景） |

---

## Minimal Vue 3 template (Centered)

```vue
<script setup lang="ts">
withDefaults(defineProps<HeroCtaProps>(), {
  layout: 'centered',
})
</script>

<template>
  <section class="px-6 py-20 lg:py-32 text-center max-w-4xl mx-auto">
    <a-tag v-if="eyebrow" color="accent" class="mb-6">
      {{ eyebrow }}
    </a-tag>

    <h1 class="text-h-display font-extrabold tracking-tight text-text-default mb-6
               motion-safe:animate-[fadeInUp_600ms_ease-out]">
      {{ headline }}
    </h1>

    <p v-if="subhead" class="text-h-xl text-text-muted mb-4 max-w-2xl mx-auto">
      {{ subhead }}
    </p>

    <p v-if="description" class="text-body-lg text-text-muted mb-8 max-w-xl mx-auto">
      {{ description }}
    </p>

    <div class="flex flex-col sm:flex-row items-center justify-center gap-3 mb-3">
      <a-button type="primary" size="large" :href="primaryCta.href">
        {{ primaryCta.label }}
      </a-button>
      <a-link v-if="secondaryCta" :href="secondaryCta.href">
        {{ secondaryCta.label }} →
      </a-link>
    </div>

    <p v-if="trustText" class="text-caption text-text-muted">
      {{ trustText }}
    </p>

    <!-- 演示视觉 -->
    <div v-if="visual && visual.type !== 'none'" class="mt-12 lg:mt-16">
      <img
        v-if="visual.type === 'screenshot'"
        :src="visual.src"
        :alt="visual.alt"
        class="rounded-lg shadow-2xl mx-auto"
        width="1200"
        height="800"
        loading="eager"
      />
      <video
        v-else-if="visual.type === 'video'"
        :src="visual.src"
        autoplay
        muted
        loop
        playsinline
        class="rounded-lg shadow-2xl mx-auto"
      />
    </div>
  </section>
</template>
```

---

## Acceptance check

- [ ] 1 个主 CTA + ≤ 1 个次级 CTA
- [ ] Headline ≤ 8 词，动词开头
- [ ] Subhead ≤ 24 词
- [ ] 演示图 ≥ 800px 宽，WebP/AVIF
- [ ] 入场动画 ≤ 700ms
- [ ] CTA 文案具体（"Start free trial" 而非 "Submit"）
- [ ] CTA 下方有 trust text（"无需信用卡"）
- [ ] Mobile 字号自适应（display → 40-56px）
- [ ] 图片 `loading="eager"`（LCP 关键资源）
- [ ] 0 `v-if` + `v-for` 混用
