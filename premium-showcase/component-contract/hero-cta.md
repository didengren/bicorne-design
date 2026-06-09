# hero-cta · Full-bleed Hero

> 5 件套之首。**首屏 100vh 摄影 + 极简文案 + 滚动指示**。premium-showcase 的 80% 视觉冲击来自这一屏。

---

## 1. 用途

- 首屏（L1）品牌资产主战场
- 100vh 满屏摄影 + 居中或底部文字
- 不放 nav（透明覆盖或独立 sticky 极简）
- 滚动指示 ↓ 提示用户向下

**何时不用**：
- 内容驱动型首屏（用 [feature-row](./feature-row.md)）
- 不放 hero 的极简风格（用 [l5-footer-cta](../layouts/l5-footer-cta.md) 的 hero-less 版本）

---

## 2. 结构

```
┌──────────────────────────────────────┐
│                                      │
│  <Nav 透明覆盖 · sticky · 60px>      │   nav 层
│                                      │
│              [Brand]                 │
│         [Eyebrow 标签]                │   文字层
│         [Hero Title 巨大]             │
│         [Sub copy 短]                │
│                                      │
│  [Photo 100vw × 100vh · cover]       │   摄影层
│                                      │
│              ↓ Scroll                │   滚动指示
└──────────────────────────────────────┘
```

- **nav 层**：透明或 8% 黑色渐变；sticky 不消失；高 60px
- **文字层**：垂直居中（h-screen flex items-center）
- **摄影层**：object-fit: cover；filter: brightness 0.6-0.8（让文字可读）
- **滚动指示**：底部 32px，从 8 帧 opacity 1 → 0 循环

---

## 3. 关键尺寸

| 元素 | 桌面 (1440+) | 移动 (390) |
|---|---|---|
| Hero 总高 | **100vh** | **100dvh**（dvh 处理 URL bar）|
| Nav 高 | 60px | 56px |
| 标题字号 | **clamp(48px, 8vw, 112px)** | clamp(36px, 8vw, 64px) |
| 副标题字号 | clamp(20px, 1.5vw, 28px) | 18px |
| Eyebrow | 12px 大写 + tracking 0.2em | 同 |
| CTA | 14-16px · padding 16 32 | 同 · padding 14 28 |
| 滚动指示 | 距底 32px | 距底 24px |
| 文字层 padding | 0 80px（左右 gutter）| 0 24px |

---

## 4. 配色

| Token | 暗色（汽车/航天/视听）| 亮色（奢侈/房产）|
|---|---|---|
| bg | `#000000` | `#FAF7F2` |
| text-primary | `#FFFFFF` | `#1A1A1A` |
| text-secondary | `rgba(255,255,255,0.7)` | `rgba(26,26,26,0.7)` |
| accent | `#E82127`（红）/ `#0A84FF`（蓝）| `#8B6F47`（铜）/ `#1A1A1A`（黑）|
| photo overlay | `linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.7) 100%)` | `linear-gradient(180deg, rgba(255,255,255,0) 50%, rgba(255,255,255,0.6) 100%)` |

> ⚠️ **暗色必用 photo overlay**，让白字在亮部仍可读。亮色慎用（破坏极简）。

---

## 5. 行为

| 触发 | 效果 |
|---|---|
| Page load | 文字 fade-in（opacity 0 → 1, y 30 → 0, 0.8s ease-out-expo, stagger 0.1s）|
| Scroll > 50px | nav 从透明渐变到 8% 黑（暗色）/ 米白（亮色）|
| Scroll > 100vh | hero 文字 scale 1.0 → 0.95（极轻微，避免全消失）|
| Hover CTA | 背景从透明 → accent（0.2s 切换）|
| Reduced motion | 关闭 fade-in，文字直接 opacity 1 |

---

## 6. 可访问性

- [ ] `<img alt>` 含场景描述（如 "Black Tesla Model X parked on coastal road at sunset"）
- [ ] 标题 `<h1>` 唯一（页面有且仅有一个）
- [ ] 文字与背景对比度 ≥ 4.5:1（AA）/ 7:1（AAA，premium 必 AAA）
- [ ] 滚动指示是 `aria-hidden="true"`（装饰元素）
- [ ] 键盘 Tab 顺序：nav links → CTA → scroll anchor
- [ ] `prefers-reduced-motion: reduce` 关闭动画
- [ ] 移动端不锁 viewport（不写 `user-scalable=no`）

---

## 7. 反模式（5 条）

### 7.1 ❌ Hero 高度由内容决定（结果 70vh）
```html
<div class="hero">  <!-- 高度不固定，结果 70vh -->
  <h1>Title</h1>
</div>
```
✅ **正解**
```html
<section class="h-screen h-[100dvh] relative">  <!-- 强制 100vh -->
  <img class="absolute inset-0 w-full h-full object-cover" />
  <div class="relative h-full flex items-center">...</div>
</section>
```

### 7.2 ❌ Photo 未设 object-fit（变形）
```html
<img class="w-full" src="hero.jpg" />  <!-- 16:9 桌面显示成 4:3 比例 -->
```
✅ **正解**
```html
<img class="absolute inset-0 w-full h-full object-cover" src="hero.jpg" />
```

### 7.3 ❌ 文字直接放照片上（不可读）
```html
<h1>Title</h1>  <!-- 浅色字在浅色背景上看不清 -->
```
✅ **正解**
```html
<div class="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70"></div>
<h1>Title</h1>  <!-- 黑色 overlay 让白字可读 -->
```

### 7.4 ❌ Nav 60px 实色占首屏
```html
<nav class="bg-white h-15"></nav>  <!-- 占首屏 60px，损失 100vh 摄影 -->
<section>Hero</section>
```
✅ **正解**
```html
<nav class="absolute top-0 left-0 right-0 z-10 bg-transparent">...</nav>
<section class="h-screen">Hero</section>  <!-- nav 透明覆盖 -->
```

### 7.5 ❌ 滚动指示用 emoji
```html
<span>👇</span>  <!-- emoji 在 macOS 渲染粗糙 -->
```
✅ **正解**
```html
<svg class="w-6 h-6 animate-bounce">...</svg>  <!-- 自绘 SVG 箭头 -->
```

---

## 8. Web 代码骨架（Vue 3 + Tailwind 最小示例）

```vue
<template>
  <section class="relative h-screen h-[100dvh] w-full overflow-hidden">
    <img
      :src="heroImage"
      :alt="heroAlt"
      class="absolute inset-0 w-full h-full object-cover"
      loading="eager"
      fetchpriority="high"
    />
    <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
    <nav class="absolute top-0 left-0 right-0 z-10 px-8 py-4 flex items-center justify-between text-white">
      <div class="text-xl tracking-widest font-light">{{ brand }}</div>
      <div class="flex gap-8 text-sm tracking-wide">
        <a v-for="link in navLinks" :key="link" href="#" class="hover:opacity-70 transition-opacity">{{ link }}</a>
      </div>
    </nav>
    <div class="relative h-full flex flex-col items-center justify-center text-center text-white px-6">
      <div class="text-xs tracking-[0.3em] uppercase mb-4 opacity-80">{{ eyebrow }}</div>
      <h1 class="text-6xl md:text-7xl lg:text-8xl font-serif font-light tracking-tight leading-[1.05] mb-6 max-w-5xl">
        {{ title }}
      </h1>
      <p class="text-lg md:text-xl max-w-2xl opacity-80 mb-10 leading-relaxed">{{ sub }}</p>
      <a v-if="ctaLabel" href="#section-1" class="text-sm tracking-widest uppercase border-b border-white pb-1 hover:opacity-70 transition-opacity">
        {{ ctaLabel }} ↓
      </a>
    </div>
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 text-white opacity-60 animate-bounce">
      <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
        <path d="M12 5v14M19 12l-7 7-7-7" />
      </svg>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  brand: string
  navLinks: string[]
  eyebrow: string
  title: string
  sub: string
  ctaLabel?: string
  heroImage: string
  heroAlt: string
}
defineProps<Props>()
</script>
```

---

## 9. 替代方案

| 方案 | 何时用 |
|---|---|
| **Video hero**（autoplay muted loop）| 概念车 / 房地产项目展示（注意 LCP）|
| **3D render hero**（R3F / Three.js）| Apple Vision Pro / 玻璃质感 |
| **Sticky scroll hero**（100vh 一直 sticky 不滚走）| 滚动驱动叙事首页 |
| **Carousel hero**（3-5 帧滑动）| 房产多户型展示（**不推荐**，破坏 premium 感）|

---

## 10. 跨行业差异（5 套调参）

| 行业 | 标题字体 | 背景色 | Photo overlay | CTA 文字 |
|---|---|---|---|---|
| **奢侈品** | GT Sectra Serif | `#FAF7F2` 米白 | 无（保留极简）| "Discover" |
| **汽车** | Tiempos Sans | `#000000` 纯黑 | 0.5 黑渐变 | "Configure" |
| **航天** | Söhne Sans | `#000000` + 渐变 | 0.6 黑 + 蓝紫边 | "Reserve" |
| **房产** | GT Super Serif | `#F5F0E8` 米白 | 0.3 白渐变 | "Inquire" |
| **视听** | Söhne Mono | `#0A0A0A` 暗灰 | 0.7 黑 | "Pre-order" |

---

## 11. 配对引用

- **布局**：[l1-full-bleed-hero](../layouts/l1-full-bleed-hero.md)
- **反模式**：[P-1 摄影未优化](../pitfalls/README.md#p-1--摄影未优化--lcp--4s) · [P-8 首屏不满屏](../pitfalls/README.md#p-8--首屏不满屏--100vh-缺失)
- **meta**：[meta-prompt.md § 3.3 留白强约束](../../meta-prompt.md)
