# feature-row · Editorial 左右分栏

> 5 件套之 2。**滚动驱动叙事的中段 · 大图 + 文字块 + tracking 收紧**。premium-showcase 的"故事"由 3-5 段 feature-row 组成。

---

## 1. 用途

- 滚动叙事中段（L2）— 描述产品/品牌/工艺细节
- 左右分栏（60% 大图 + 40% 文字）或 50/50 等分
- 多段 feature-row 串联构成完整故事
- 每段配独立 eyebrow（小标签）+ 标题 + 正文

**何时不用**：
- 单屏静态说明（用 [spec-sheet](./spec-sheet.md)）
- 多图组合（用 [image-gallery](./image-gallery.md)）

---

## 2. 结构

```
┌─────────────────────────────────────────────────┐
│                                                 │
│   ┌──────────────────┐  ┌─────────────────┐    │
│   │                  │  │  [Eyebrow]      │    │   文字层
│   │   <大图 60%>     │  │  [Title 大]     │    │   sticky
│   │   object-cover   │  │  [Body 段落]    │    │   不滚动
│   │   parallax?      │  │  [Body 段落]    │    │
│   │                  │  │                 │    │
│   └──────────────────┘  └─────────────────┘    │
│                                                 │
│   Section 间距 120-200px (clamp)                │
└─────────────────────────────────────────────────┘
```

- **图侧**：60% 宽，sticky top 0；scroll 时小视差
- **文侧**：40% 宽，padding 0 80px
- **段落**：max-width 480px 防止长行阅读疲劳
- **多段**：左右交替（第一段图左文右，第二段图右文左）

---

## 3. 关键尺寸

| 元素 | 桌面 (1440+) | 移动 (390) |
|---|---|---|
| Section 高度 | **auto**（不固定，由内容决定）| auto |
| Section 间距 | **clamp(80px, 12vw, 200px)** | 80px |
| 左侧 gutter | clamp(24px, 4vw, 80px) | 24px |
| 图侧宽 | **58-62%** | 100% |
| 文侧宽 | **38-42%** | 100% |
| 文侧 padding | 0 80px（左右）| 0 24px |
| Eyebrow | 11-12px · tracking 0.2em · uppercase | 同 |
| Title | clamp(36px, 4vw, 64px) | 32px |
| Body | 18-20px · line-height 1.7 | 17px · 1.7 |
| Body max-width | 480px | 100% |
| 图 aspect ratio | 4:3 或 3:2 | 4:3 |
| 段落间距 | 24-32px | 20px |

---

## 4. 配色

| Token | 暗色（汽车/航天/视听）| 亮色（奢侈/房产）|
|---|---|---|
| bg | `#0A0A0A` | `#FAF7F2` |
| text-primary | `#FFFFFF` | `#1A1A1A` |
| text-secondary | `rgba(255,255,255,0.7)` | `rgba(26,26,26,0.7)` |
| accent | `#E82127` | `#8B6F47` |
| eyebrow | accent 1 色 | accent 1 色 |
| divider | `rgba(255,255,255,0.1)` | `rgba(26,26,26,0.1)` |

---

## 5. 行为

| 触发 | 效果 |
|---|---|
| Scroll 进入视口 30% | 图 scale 1.0 → 1.05（极轻微 zoom-in）· 文 fade-in opacity 0 → 1, y 40 → 0 |
| 持续 scroll | 图 sticky top 0（直到 section 滚出）|
| Scroll 出视口 30% | 元素重置（不持久）|
| Hover 文侧 link | 颜色 → accent |
| Reduced motion | 关闭 zoom + fade，元素直接显示 |

---

## 6. 可访问性

- [ ] `<h2>` 每段独立，标题层级清晰
- [ ] 图 `<img alt>` 含场景描述
- [ ] 段落 max-width 限制（长行阅读疲劳）
- [ ] 链接对比度 ≥ 4.5:1
- [ ] Reduced motion 关闭动画
- [ ] 移动端避免 sticky（性能差）— 改用单列顺序排列

---

## 7. 反模式（5 条）

### 7.1 ❌ 图文 50/50 等分
```html
<div class="grid grid-cols-2">  <!-- 50/50 太均衡，没重点 -->
  <img /><div>Text</div>
</div>
```
✅ **正解**
```html
<div class="grid grid-cols-[58%_42%]">  <!-- 58/42 偏图，引导视线 -->
  <img /><div>Text</div>
</div>
```

### 7.2 ❌ 文侧充满整个屏幕宽
```html
<p class="w-full">Body copy 段落非常长...</p>  <!-- 80 字符一行，眼睛累 -->
```
✅ **正解**
```html
<p class="max-w-[480px]">Body copy 段落最长 480px...</p>
```

### 7.3 ❌ 图不带 overlay 直接放白字
```html
<h2>白字</h2>  <!-- 浅色背景图上看不清 -->
```
✅ **正解**
```html
<div class="relative">
  <img class="brightness-75" />  <!-- 图压暗 25% -->
  <h2>白字可读</h2>
</div>
```

### 7.4 ❌ 多段 feature-row 用相同布局
```html
<section>图左文右</section>
<section>图左文右</section>  <!-- 重复 5 屏，视觉疲劳 -->
<section>图左文右</section>
```
✅ **正解**
```html
<section>图左文右</section>
<section>图右文左</section>  <!-- 交替，保持节奏 -->
<section>图左文右</section>
```

### 7.5 ❌ Eyebrow 用 emoji
```html
<span>🎨 DESIGN</span>  <!-- emoji 跨平台不一致 -->
```
✅ **正解**
```html
<span class="text-xs tracking-[0.2em] uppercase text-accent">Design</span>
```

---

## 8. Web 代码骨架（Vue 3 + Tailwind 最小示例）

```vue
<template>
  <section :class="['grid items-center gap-12 lg:gap-20', reverse ? 'lg:grid-cols-[42%_58%]' : 'lg:grid-cols-[58%_42%]']">
    <div :class="['overflow-hidden', reverse ? 'lg:order-2' : 'lg:order-1']">
      <img
        :src="image"
        :alt="imageAlt"
        class="w-full h-full aspect-[4/3] object-cover transition-transform duration-700 hover:scale-[1.03]"
        loading="lazy"
        decoding="async"
      />
    </div>
    <div :class="['space-y-6 lg:px-12', reverse ? 'lg:order-1' : 'lg:order-2']">
      <div class="text-xs tracking-[0.25em] uppercase font-medium" :style="{ color: accentColor }">
        {{ eyebrow }}
      </div>
      <h2 class="text-4xl md:text-5xl lg:text-6xl font-serif font-light leading-[1.1] tracking-tight">
        {{ title }}
      </h2>
      <div class="space-y-4 text-lg leading-[1.7] opacity-75 max-w-[480px]">
        <p v-for="(para, i) in paragraphs" :key="i">{{ para }}</p>
      </div>
      <a v-if="linkLabel" href="#" class="inline-block text-sm tracking-widest uppercase border-b border-current pb-0.5 hover:opacity-60 transition-opacity">
        {{ linkLabel }} →
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  image: string
  imageAlt: string
  eyebrow: string
  title: string
  paragraphs: string[]
  linkLabel?: string
  reverse?: boolean
  accentColor?: string
}
withDefaults(defineProps<Props>(), { reverse: false, accentColor: '#E82127' })
</script>
```

---

## 9. 替代方案

| 方案 | 何时用 |
|---|---|
| **3 列等分**（3 个 feature 横向并排）| 多型号产品对比（房产户型 / 车型 3 款）|
| **Sticky 单侧**（一侧固定大图，另一侧滚动文字）| 长故事（3-5 段 + 大图一直可见）|
| **Carousel 多段**（横向滑动切换多段）| 极简编辑式（不推荐，破坏 premium 滚动感）|
| **Video 替代大图** | 工艺展示（制表 / 制作过程）|

---

## 10. 跨行业差异（5 套调参）

| 行业 | 图占比 | 文侧字号 | Body 长度 | 段落数 |
|---|---|---|---|---|
| **奢侈品** | 50% | 18px | 长（3-5 段·工艺故事）| 3-5 |
| **汽车** | 62% | 18-20px | 短（1-2 段·性能描述）| 1-2 |
| **航天** | 58% | 18px | 中（2-3 段·技术细节）| 2-3 |
| **房产** | 50% | 18-20px | 中（2-3 段·空间描述）| 2-3 |
| **视听** | 60% | 17-18px | 短（1-2 段·材质 / 频响）| 1-2 |

---

## 11. 配对引用

- **布局**：[l2-scroll-story](../layouts/l2-scroll-story.md)
- **反模式**：[P-5 字号过小](../pitfalls/README.md#p-5--字号过小--移动--桌面-同步-16px) · [P-6 行高过紧](../pitfalls/README.md#p-6--行高过紧--body-line-height-12)
- **meta**：[meta-prompt.md § 3.3 留白强约束](../../meta-prompt.md)
