# footer-cta · Footer + 询价式 Final CTA

> 5 件套之 5。**Footer + Final CTA · 询价式**（"Request access" / "Configure" / "Reserve"）。premium-showcase 全页 CTA 1-2 个，绝不放"Buy now"。

---

## 1. 用途

- 收尾段（L5）— Final CTA + 4-5 列 footer
- CTA 1 个主（询价 / 配置 / 预约）+ 1 个次（newsletter / 分享）
- Footer 4-5 列：产品 / 公司 / 法律 / 社交 / 订阅
- 大留白（120-160px padding）

**何时不用**：
- 多 CTA 落地（用 [landing-pages HeroCta](../../landing-pages/component-contract/hero-cta.md)）
- 复杂表单（premium 不放表单，mailto 即可）

---

## 2. 结构

```
┌─────────────────────────────────────────────────┐
│                                                 │
│              [Eyebrow · GET IN TOUCH]           │
│                                                 │
│            <Title 询问式大标题>                  │   询问式标题
│                                                 │
│   <Request access>  <Configure>  <Reserve>     │   CTA 区
│                                                 │
├─────────────────────────────────────────────────┤
│   Products     Company     Legal     Social      │   footer
│   ...          ...         ...       ...         │   4-5 列
│   ...          ...         ...       ...         │
│                                                 │
│   © 2026 Brand · Privacy · Terms                │
└─────────────────────────────────────────────────┘
```

- **CTA 区**：120-160px 上下 padding · CTA 周围 ≥ 200px 留白
- **CTA 按钮**：2-3 个并排（或单 CTA + 文字链）
- **Footer**：4-5 列等宽，链接 14-16px sans
- **底栏**：© + 备案 + 法务链接，12px tracking 0.05em

---

## 3. 关键尺寸

| 元素 | 桌面 (1440+) | 移动 (390) |
|---|---|---|
| CTA 区 padding-top | **clamp(80px, 12vw, 200px)** | 80px |
| CTA 区 padding-bottom | **clamp(120px, 16vw, 240px)** | 120px |
| 询问式标题 | clamp(40px, 5vw, 80px) | 36px |
| 询问式副标题 | 18-20px | 17px |
| CTA padding | 16-18px 32-40px | 14-16px 28-32px |
| CTA 字号 | 14-16px · tracking 0.05em | 14px |
| CTA 间距 | 16-24px | 16px |
| Footer padding-top | 80-120px | 64px |
| Footer padding-bottom | 48-64px | 40px |
| Footer 列间距 | clamp(40px, 5vw, 80px) | 32px |
| Footer 链接 | 14-16px | 14px |
| 底栏字号 | 12px | 11px |

---

## 4. 配色

| Token | 暗色 | 亮色 |
|---|---|---|
| bg | `#0A0A0A` | `#FAF7F2` |
| bg-elevated（footer）| `#000000` | `#F5F0E8` |
| text-primary | `#FFFFFF` | `#1A1A1A` |
| text-secondary | `rgba(255,255,255,0.7)` | `rgba(26,26,26,0.7)` |
| accent | `#E82127` | `#8B6F47` |
| CTA bg | accent | accent |
| CTA text | `#FFFFFF`（accent 上文字）| `#FFFFFF` |
| divider | `rgba(255,255,255,0.1)` | `rgba(26,26,26,0.1)` |

---

## 5. 行为

| 触发 | 效果 |
|---|---|
| Page load | 询问式标题 fade-in · CTA 按钮 fade-in（stagger 0.15s）|
| Hover CTA | bg 变深 10% · 文字微微下移 2px（0.2s）|
| Hover footer link | 颜色 → accent |
| Reduced motion | 关闭 fade-in |

---

## 6. 可访问性

- [ ] CTA 按钮是 `<a>` 或 `<button>`，**不是** `<div>`
- [ ] CTA 文字含完整含义（如 "Request access" 不是 "Click here"）
- [ ] 询问式标题 `<h2>` 语义层级清晰
- [ ] footer 链接对比度 ≥ 4.5:1
- [ ] 键盘 Tab 顺序：CTA → footer links → social
- [ ] Reduced motion 关闭动效
- [ ] 移动端 footer 列折叠为 accordion 或单列

---

## 7. 反模式（5 条）

### 7.1 ❌ 多 CTA 拥挤
```html
<div class="flex gap-4">
  <button>Buy now</button>          <!-- premium 不放 Buy -->
  <button>Configure</button>
  <button>Add to cart</button>     <!-- premium 不放 cart -->
  <button>Newsletter</button>      <!-- 与 CTA 同级混乱 -->
  <button>Share</button>
</div>
```
✅ **正解**
```html
<div class="flex flex-col sm:flex-row gap-6 items-center">
  <a href="mailto:..." class="cta-primary">Request access</a>  <!-- 1 主 -->
  <a href="#configure" class="cta-secondary">Configure</a>      <!-- 1 次 -->
</div>
```

### 7.2 ❌ "Buy now" 砍品牌
```html
<button>Buy now · $45,000</button>  <!-- 显式价格 + 紧迫 -->
```
✅ **正解**
```html
<a href="mailto:configure@brand.com">Request access</a>  <!-- 询价式 -->
```

### 7.3 ❌ 倒计时 / 库存紧张
```html
<div>Limited: 24 hours left</div>
<div>Only 5 in stock</div>
```
✅ **正解**
```html
<!-- 不放倒计时 / 库存 -->
<a>Request access</a>
```

### 7.4 ❌ Footer 链接 10+ 列
```html
<div class="grid-cols-7">  <!-- 7 列 200px 宽，字号必须缩到 12px -->
  <div>...</div> ...
</div>
```
✅ **正解**
```html
<div class="grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-16">  <!-- 4-5 列最佳 -->
```

### 7.5 ❌ Footer 链接无 hover 反馈
```html
<a href="#">Products</a>  <!-- 鼠标移上去无变化 -->
```
✅ **正解**
```html
<a href="#" class="hover:text-accent transition-colors">Products</a>
```

---

## 8. Web 代码骨架（Vue 3 + Tailwind 最小示例）

```vue
<template>
  <footer class="bg-ps-bg-elevated text-ps-text-primary">
    <!-- Final CTA 区 -->
    <div class="px-6 lg:px-20 py-[clamp(80px,12vw,200px)] text-center max-w-5xl mx-auto">
      <div class="text-xs tracking-[0.3em] uppercase opacity-60 mb-8">{{ eyebrow }}</div>
      <h2 class="text-5xl md:text-6xl lg:text-7xl font-serif font-light leading-[1.1] tracking-tight mb-8">
        {{ ctaTitle }}
      </h2>
      <p v-if="ctaSub" class="text-lg opacity-70 max-w-2xl mx-auto mb-12 leading-relaxed">{{ ctaSub }}</p>
      <div class="flex flex-col sm:flex-row gap-6 items-center justify-center">
        <a
          v-if="primaryCta"
          :href="primaryCta.href"
          class="inline-block bg-ps-accent text-white px-10 py-4 text-sm tracking-widest uppercase font-medium hover:opacity-90 transition-opacity"
        >
          {{ primaryCta.label }}
        </a>
        <a
          v-if="secondaryCta"
          :href="secondaryCta.href"
          class="inline-block border-b border-current pb-1 text-sm tracking-widest uppercase hover:opacity-70 transition-opacity"
        >
          {{ secondaryCta.label }}
        </a>
      </div>
    </div>

    <!-- Footer 4-5 列 -->
    <div class="border-t border-ps-divider px-6 lg:px-20 py-16 lg:py-24">
      <div class="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-16">
        <div v-for="col in columns" :key="col.title">
          <div class="text-xs tracking-[0.2em] uppercase opacity-50 mb-4">{{ col.title }}</div>
          <ul class="space-y-3">
            <li v-for="link in col.links" :key="link.label">
              <a :href="link.href" class="text-sm opacity-75 hover:text-ps-accent hover:opacity-100 transition-colors">{{ link.label }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 底栏 -->
    <div class="border-t border-ps-divider px-6 lg:px-20 py-6">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs opacity-50">
        <div>© {{ year }} {{ brand }}. All rights reserved.</div>
        <div class="flex gap-6">
          <a href="#" class="hover:opacity-100">Privacy</a>
          <a href="#" class="hover:opacity-100">Terms</a>
          <a href="#" class="hover:opacity-100">Cookies</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
interface Cta { label: string; href: string }
interface FooterColumn { title: string; links: Cta[] }
interface Props {
  brand: string
  year: number
  eyebrow: string
  ctaTitle: string
  ctaSub?: string
  primaryCta?: Cta
  secondaryCta?: Cta
  columns: FooterColumn[]
}
defineProps<Props>()
</script>
```

---

## 9. 替代方案

| 方案 | 何时用 |
|---|---|
| **Single CTA + 大留白**（无 footer）| 极简（Aman / B&O · footer 折叠到 1 行）|
| **Multi-step form**（多步骤询价表单）| 复杂产品（私人飞机 / 游艇 · **不推荐 premium**）|
| **Live chat widget**（右下角 Intercom）| B2B 询价（可与 CTA 并存）|
| **Sticky CTA bar**（底部 60px 固定栏）| 滚动长页（**不推荐 premium 桌面，移动可考虑**）|

---

## 10. 跨行业差异（5 套调参）

| 行业 | 主 CTA 文字 | 次 CTA | 是否询价式 | Footer 列数 |
|---|---|---|---|---|
| **奢侈品** | "Discover more" | "Visit boutique" | ✅ 询价 | 4 |
| **汽车** | "Configure" | "Test drive" | ✅ 询价 | 5 |
| **航天** | "Reserve" | "Explore" | ✅ 询价 | 4 |
| **房产** | "Inquire" | "Schedule visit" | ✅ 询价 | 5 |
| **视听** | "Reserve" / "Pre-order" | "Find a dealer" | 半询价 | 4-5 |

---

## 11. 配对引用

- **布局**：[l5-footer-cta](../layouts/l5-footer-cta.md)
- **反模式**：[P-9 CTA 过多](../pitfalls/README.md#p-9--cta-过多--3-个--屏) · [P-10 倒计时/紧迫感](../pitfalls/README.md#p-10--倒计时--紧迫感--价格显式)
- **方法论**：[nav-footer 通用层](../../../references/methodology/nav-footer.md) — 4-5 列 footer 详细布局参考
