# image-gallery · 摄影集三态

> 5 件套之 4。**瀑布 / 横向滚动 / 全屏 lightbox 三态可切换**。premium-showcase 用摄影集传达"产品多面 / 工艺细节 / 空间层次"。

---

## 1. 用途

- 中后段摄影展示（L4）— 产品多角度 / 工艺细节 / 空间层次
- 三种布局：masonry 瀑布 / horizontal scroll 横向 / lightbox 全屏
- 每张图独立 caption（可选）
- 点击图可放大（lightbox 模式）

**何时不用**：
- 单一 hero 大图（用 [hero-cta](./hero-cta.md)）
- 数字 spec（用 [spec-sheet](./spec-sheet.md)）

---

## 2. 结构

### 2.1 Masonry 瀑布（最常用）

```
┌─────────────────────────────────────────────────┐
│         [Eyebrow · GALLERY]                     │
│                                                 │
│   ┌──────┐ ┌────────┐ ┌──────┐                  │
│   │      │ │        │ │      │                  │   列宽不等
│   │      │ │        │ └──────┘                  │   高随机
│   └──────┘ │        │ ┌────────┐                │   JS 计算
│   ┌────────┴────────┘ │        │                │
│   │                   │        │                │
│   └───────────────────┘        │                │
│                                                 │
└─────────────────────────────────────────────────┘
```

### 2.2 Horizontal Scroll 横向

```
┌─────────────────────────────────────────────────┐
│         [Eyebrow · GALLERY]                     │
│                                                 │
│   ┌────────┐ ┌────────┐ ┌────────┐ →            │   横向滚动
│   │        │ │        │ │        │              │   snap scroll
│   │        │ │        │ │        │              │   视差可选
│   └────────┘ └────────┘ └────────┘              │
│                                                 │
└─────────────────────────────────────────────────┘
```

### 2.3 Lightbox 全屏

```
┌─────────────────────────────────────────────────┐
│                                                 │
│         <全屏背景 100vw × 100vh>                │
│                                                 │
│         [Caption 居中]                          │
│                                                 │
│         ←  →   · · · 1/8                       │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 3. 关键尺寸

| 元素 | 桌面 (1440+) | 移动 (390) |
|---|---|---|
| Masonry 列数 | **3-4 列** | 2 列 |
| Masonry 列间距 | **clamp(16px, 2vw, 32px)** | 12px |
| Masonry 行间距 | 同列间距 | 同 |
| 单图最小宽 | 320px | 160px |
| Horizontal scroll 容器高 | 80vh | 60vh |
| Horizontal scroll 单图宽 | clamp(280px, 30vw, 480px) | 75vw |
| Lightbox 容器 | 100vw × 100vh | 100vw × 100vh |
| Lightbox 导航 | 距左右 32px | 距左右 16px |
| Caption 字号 | 12-14px | 12px |
| Caption 位置 | masonry bottom / horizontal below / lightbox center | 同 |

---

## 4. 配色

| Token | 暗色 | 亮色 |
|---|---|---|
| bg | `#0A0A0A` | `#FAF7F2` |
| caption | text-secondary 70% | text-secondary 70% |
| lightbox overlay | `rgba(0,0,0,0.95)` | `rgba(0,0,0,0.92)` |
| lightbox nav | `#FFFFFF` | `#FFFFFF` |
| divider | `rgba(255,255,255,0.08)` | `rgba(26,26,26,0.08)` |

---

## 5. 行为

### 5.1 Masonry

| 触发 | 效果 |
|---|---|
| Page load | 图 fade-in（stagger 0.1s）|
| Hover 图 | scale 1.0 → 1.03（0.4s）· opacity 1 → 0.9 |
| Click 图 | open lightbox（fade in 0.3s）|

### 5.2 Horizontal

| 触发 | 效果 |
|---|---|
| Page load | 容器 fade-in · 第一张图 scale 1.05 → 1.0 |
| Scroll 横向 | scroll-snap-x mandatory · snap-center |
| Hover 图 | scale 1.0 → 1.02 |
| Click 图 | open lightbox |

### 5.3 Lightbox

| 触发 | 效果 |
|---|---|
| Open | overlay fade in 0.3s · 图 scale 0.95 → 1.0 |
| 键盘 ← / → | 切上一张 / 下一张（crossfade 0.3s）|
| Esc | close |
| Click overlay | close |
| Click ← / → 按钮 | 切上一张 / 下一张 |
| Reduced motion | 关闭 scale + fade，直接显示 |

---

## 6. 可访问性

- [ ] Masonry 用 `<ul>` + `<li>` 语义结构
- [ ] 每张图 `<img alt>` 必填
- [ ] Lightbox 焦点 trap（打开时焦点困在 lightbox 内）
- [ ] Lightbox open 焦点到 close 按钮
- [ ] Lightbox close 焦点回到原触发图
- [ ] 键盘 Esc 关闭 lightbox
- [ ] 移动端 Lightbox 触摸滑动切图（touchstart / touchmove）
- [ ] Reduced motion 关闭动效
- [ ] 懒加载：首屏图 eager，其余 lazy

---

## 7. 反模式（5 条）

### 7.1 ❌ 固定网格 3 列等高
```html
<div class="grid grid-cols-3 gap-4">  <!-- 强制等高 = 大量空白或裁剪 -->
  <img class="aspect-square" />
</div>
```
✅ **正解**
```html
<div class="columns-3 gap-4">  <!-- CSS columns 真瀑布 -->
  <img class="mb-4" />
</div>
<!-- 或 JS 计算 masonry -->
```

### 7.2 ❌ 图片无 alt
```html
<img src="gallery-1.jpg" />  <!-- 屏幕阅读器跳过 -->
```
✅ **正解**
```html
<img src="gallery-1.jpg" alt="Silk scarf detail, hand-stitched edge" />
```

### 7.3 ❌ Lightbox 无键盘导航
```html
<button @click="next">→</button>  <!-- 鼠标用户能切，键盘用户不能 -->
```
✅ **正解**
```html
<button @click="next" @keydown.right="next">→</button>
<!-- 监听全局 keydown.ArrowLeft / ArrowRight -->
```

### 7.4 ❌ 一次加载所有图
```html
<!-- 30 张图全部 srcset，LCP 12s -->
<img v-for="img in gallery" :src="img" />
```
✅ **正解**
```html
<!-- 首屏 3 张 eager + fetchpriority="high"，其余 lazy + decoding="async" -->
<img v-for="(img, i) in gallery" :loading="i < 3 ? 'eager' : 'lazy'" :src="img" />
```

### 7.5 ❌ Lightbox 关闭后焦点丢失
```html
<button @click="open">Open</button>  <!-- 打开后 close，焦点去哪了？ -->
```
✅ **正解**
```html
<!-- 打开前记住触发元素，关闭后焦点恢复 -->
<button @click="open" ref="triggerEl">Open</button>
<button @click="close">Close</button>  <!-- close 后 triggerEl.focus() -->
```

---

## 8. Web 代码骨架（Vue 3 + Tailwind 最小示例 · Masonry + Lightbox）

```vue
<template>
  <section class="py-[clamp(80px,12vw,200px)]">
    <div class="px-6 lg:px-20 max-w-7xl mx-auto">
      <div class="text-xs tracking-[0.3em] uppercase opacity-60 mb-12 text-center">{{ eyebrow }}</div>
      <div class="columns-2 lg:columns-3 gap-4 lg:gap-6">
        <button
          v-for="(item, i) in items"
          :key="i"
          class="mb-4 lg:mb-6 block w-full overflow-hidden group relative"
          @click="openLightbox(i)"
        >
          <img
            :src="item.src"
            :alt="item.alt"
            class="w-full h-auto transition-transform duration-500 group-hover:scale-[1.03]"
            :loading="i < 3 ? 'eager' : 'lazy'"
            decoding="async"
          />
          <div v-if="item.caption" class="absolute bottom-0 left-0 right-0 p-3 text-xs text-white bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            {{ item.caption }}
          </div>
        </button>
      </div>
    </div>
    <Teleport to="body">
      <div
        v-if="lightboxOpen"
        class="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
        role="dialog"
        aria-modal="true"
        @click.self="closeLightbox"
        @keydown.esc="closeLightbox"
        @keydown.left="prev"
        @keydown.right="next"
        tabindex="-1"
        ref="lightboxEl"
      >
        <img :src="items[currentIndex].src" :alt="items[currentIndex].alt" class="max-w-[90vw] max-h-[85vh] object-contain" />
        <button @click="closeLightbox" class="absolute top-6 right-6 text-white text-3xl" aria-label="Close">×</button>
        <button @click="prev" class="absolute left-6 top-1/2 -translate-y-1/2 text-white text-3xl" aria-label="Previous">‹</button>
        <button @click="next" class="absolute right-6 top-1/2 -translate-y-1/2 text-white text-3xl" aria-label="Next">›</button>
        <div class="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-xs opacity-60">
          {{ currentIndex + 1 }} / {{ items.length }}
        </div>
      </div>
    </Teleport>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
interface GalleryItem { src: string; alt: string; caption?: string }
interface Props { eyebrow: string; items: GalleryItem[] }
defineProps<Props>()
const lightboxOpen = ref(false)
const currentIndex = ref(0)
const lightboxEl = ref<HTMLElement | null>(null)
const openLightbox = (i: number) => { currentIndex.value = i; lightboxOpen.value = true; lightboxEl.value?.focus() }
const closeLightbox = () => { lightboxOpen.value = false }
const prev = () => { currentIndex.value = (currentIndex.value - 1 + items.length) % items.length }
const next = () => { currentIndex.value = (currentIndex.value + 1) % items.length }
</script>
```

---

## 9. 替代方案

| 方案 | 何时用 |
|---|---|
| **Carousel 自动播放**（5 帧滑动）| 房产多户型（**不推荐 premium**）|
| **Sticky 双图对比**（左右拖动 reveal）| 工艺对比（修复前 / 修复后，**小众**）|
| **3D carousel**（R3F 立方体翻转）| 概念车 / 极客产品（**谨慎用**，性能重）|
| **Pinterest 真瀑布**（JS 计算）| masonry 库（CSS columns 不支持动态排序时）|

---

## 10. 跨行业差异（5 套调参）

| 行业 | 推荐布局 | 列数 | 摄影风格 |
|---|---|---|---|
| **奢侈品** | masonry | 3-4 | 编辑式 / 工作室 / 自然光 |
| **汽车** | horizontal scroll | 3-4 横向 | 概念车 / 极端角度 |
| **航天** | horizontal scroll | 3 横向 | 渲染图 / 透明材质 |
| **房产** | masonry | 3 | 空间 / 自然光 / 极简 |
| **视听** | masonry | 3-4 | 工业 / 极简 / 反光材质 |

---

## 11. 配对引用

- **布局**：[l4-image-gallery](../layouts/l4-image-gallery.md)
- **反模式**：[P-1 摄影未优化](../pitfalls/README.md#p-1--摄影未优化--lcp--4s) · [P-3 摄影风格不统一](../pitfalls/README.md#p-3--摄影风格不统一--后期--色温--比例乱)
- **meta**：[meta-prompt.md § 2.1 摄影规范](../../meta-prompt.md)
