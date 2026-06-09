# spec-sheet · Spec Sheet 数字 + Mono

> 5 件套之 3。**数字 + Mono 字体 + 大留白 · 像杂志内页**。premium-showcase 用"克制数字"传达性能 / 工艺 / 规格（不用营销文案）。

---

## 1. 用途

- 中段数据展示（L3）— 性能 / 规格 / 工艺指标
- 3-4 列等宽分布，每列 1 个核心数字 + 单位 + 简短注释
- Mono 字体强约束（数字宽度对齐）
- 大留白（每列之间 80-200px）

**何时不用**：
- 多图组合（用 [image-gallery](./image-gallery.md)）
- 文字描述（用 [feature-row](./feature-row.md)）

---

## 2. 结构

```
┌─────────────────────────────────────────────────┐
│                                                 │
│            [Eyebrow · SPECIFICATIONS]           │
│                                                 │
│   ┌─────────┐    ┌─────────┐    ┌─────────┐     │
│   │  450    │    │  3.2s   │    │  600    │     │   数字
│   │   NM    │    │  0-100  │    │   KM    │     │   单位
│   │         │    │         │    │ RANGE   │     │
│   │ Torque  │    │ Accel.  │    │ Range   │     │   标签
│   └─────────┘    └─────────┘    └─────────┘     │
│                                                 │
│   Section 间距 120-200px                        │
└─────────────────────────────────────────────────┘
```

- **3-4 列等宽**：grid-cols-3 或 grid-cols-4
- **数字大**：clamp(48px, 6vw, 96px) Mono
- **单位中**：18-24px Mono（紧贴数字）
- **标签小**：12-14px sans（小写 + tracking 收紧）
- **每列独立居中**

---

## 3. 关键尺寸

| 元素 | 桌面 (1440+) | 移动 (390) |
|---|---|---|
| Section 高度 | auto | auto |
| Section 间距 | **clamp(80px, 12vw, 200px)** | 80px |
| 列数 | **3-4 列** | 1 列（移动单列）|
| 列间距 | **clamp(40px, 6vw, 120px)** | 32px |
| 数字字号 | **clamp(48px, 6vw, 96px)** | 56px |
| 数字字重 | Light / Regular（克制感）| Light |
| 单位字号 | 18-24px Mono | 16px |
| 标签字号 | 12-14px sans | 12px |
| 行间距 | 4-8px（数字和单位之间） | 4px |
| Eyebrow | 12px · tracking 0.2em · uppercase | 同 |

---

## 4. 配色

| Token | 暗色 | 亮色 |
|---|---|---|
| bg | `#0A0A0A` 或 `#000000` | `#FAF7F2` |
| 数字 color | `#FFFFFF` | `#1A1A1A` |
| 单位 color | text-primary 80% opacity | text-primary 80% opacity |
| 标签 color | text-secondary 60% opacity | text-secondary 60% opacity |
| accent | 不用（数字本身够强）| 不用 |
| divider | `rgba(255,255,255,0.08)` 1px（列间分隔线，可选）| `rgba(26,26,26,0.08)` |

> ⚠️ **Spec sheet 不放 accent 色**，数字就是 hero。

---

## 5. 行为

| 触发 | 效果 |
|---|---|
| Scroll 进入视口 50% | 数字 count-up（从 0 → 真实值，1.2s ease-out-expo，stagger 0.15s）|
| Scroll 出视口 | 不重置（保持终态）|
| Hover 数字 | 颜色 → accent（可选）|
| Reduced motion | 数字直接显示终态，不 count-up |

> **Count-up 规则**：仅数字 count-up，单位和标签不动画。Count-up 用 `requestAnimationFrame`，不用第三方库。

---

## 6. 可访问性

- [ ] 数字以 `aria-label` 标注完整含义（如 `aria-label="450 Newton meters, peak torque"`）
- [ ] 数字的 Mono 字体在屏幕阅读器中正常读出
- [ ] Count-up 不影响语义（最终值和初始值含义相同）
- [ ] 列间分隔线用 CSS 不用图片（避免 alt 污染）
- [ ] 数字对比度 ≥ 7:1（AAA）
- [ ] Reduced motion 关闭 count-up

---

## 7. 反模式（5 条）

### 7.1 ❌ Spec sheet 用营销文案
```html
<div>
  <div>450</div>
  <div>Unleash the power</div>  <!-- 不是 spec，是营销 -->
</div>
```
✅ **正解**
```html
<div>
  <div>450</div>
  <div>NM</div>          <!-- 单位 -->
  <div>Peak torque</div> <!-- 简短技术标签 -->
</div>
```

### 7.2 ❌ 数字用 sans 字体
```html
<div class="font-sans text-6xl">450</div>  <!-- sans 数字宽度不等，难对齐 -->
```
✅ **正解**
```html
<div class="font-mono text-6xl tabular-nums">450</div>  <!-- Mono + tabular-nums -->
```

### 7.3 ❌ 数字字号都一样
```html
<div>450</div>  <!-- 数字字号 48px -->
<div class="text-sm">0-100 km/h</div>  <!-- 标签 14px -->
<!-- 看起来不像 spec sheet，像 Excel 表格 -->
```
✅ **正解**
```html
<div class="text-7xl font-light">450</div>      <!-- 数字大而克制 -->
<div class="text-base">NM</div>                  <!-- 单位中 -->
<div class="text-xs tracking-widest uppercase">Peak torque</div>  <!-- 标签小 -->
```

### 7.4 ❌ Spec 用红色高亮强调
```html
<div class="text-red-500">3.2s</div>  <!-- 红色 = 警示色，不适合 spec -->
```
✅ **正解**
```html
<div class="text-white">3.2s</div>  <!-- 数字就用主色，不染色 -->
```

### 7.5 ❌ 5+ 列挤在一行
```html
<div class="grid-cols-6">  <!-- 6 列 1440 屏每列 240px，字号必须 18px 以下，spec 感丢失 -->
```
✅ **正解**
```html
<div class="grid-cols-3 lg:grid-cols-4 gap-12 lg:gap-20">  <!-- 3-4 列最佳 -->
```

---

## 8. Web 代码骨架（Vue 3 + Tailwind 最小示例）

```vue
<template>
  <section class="py-[clamp(80px,12vw,200px)]">
    <div class="px-6 lg:px-20 max-w-7xl mx-auto">
      <div class="text-xs tracking-[0.3em] uppercase opacity-60 mb-16 lg:mb-24 text-center">
        {{ eyebrow }}
      </div>
      <div :class="['grid gap-12 lg:gap-20 text-center', columnClass]">
        <div v-for="(spec, i) in specs" :key="i" class="space-y-3">
          <div class="font-mono tabular-nums text-5xl md:text-6xl lg:text-7xl font-light leading-none">
            <span>{{ spec.value }}</span>
            <span v-if="spec.unit" class="text-2xl md:text-3xl opacity-70 ml-1">{{ spec.unit }}</span>
          </div>
          <div class="text-xs tracking-[0.2em] uppercase opacity-60">
            {{ spec.label }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
interface Spec { value: string | number; unit?: string; label: string }
interface Props { eyebrow: string; specs: Spec[]; columns?: 3 | 4 }
const props = withDefaults(defineProps<Props>(), { columns: 3 })
const columnClass = computed(() => props.columns === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3')
</script>
```

---

## 9. 替代方案

| 方案 | 何时用 |
|---|---|
| **Comparison table**（多产品并排）| 多型号对比（Tesla Model S/3/X/Y）|
| **Animated counter**（数字从 0 count-up）| 营销活动（"10,000+ satisfied customers"，**不推荐 premium**）|
| **Progress bar 数字**（"98% 满意度"）| 服务类（不推荐 premium，破坏克制感）|
| **Icon + 数字**（icon + 数值）| 功能类（premium 通常不用 icon）|

---

## 10. 跨行业差异（5 套调参）

| 行业 | 数字范围 | 列数 | 字体 | 是否有 unit |
|---|---|---|---|---|
| **奢侈品** | 不放（隐式奢华）| — | — | — |
| **汽车** | 性能（450 NM / 3.2s / 600 KM）| 3-4 | Tiempos Mono | ✅ 必有 |
| **航天** | 规格（高度 / 速度 / 续航）| 3-4 | GT America Mono | ✅ 必有 |
| **房产** | 面积 / 位置 / 户型 | 3 | Söhne Mono | ✅（m² / sq ft）|
| **视听** | 频响 / 功率 / 重量 | 3-4 | Söhne Mono | ✅（Hz / W / kg）|

---

## 11. 配对引用

- **布局**：[l3-spec-section](../layouts/l3-spec-section.md)
- **反模式**：[P-5 字号过小](../pitfalls/README.md#p-5--字号过小--移动--桌面-同步-16px) · [P-9 CTA 过多](../pitfalls/README.md#p-9--cta-过多--3-个--屏)
- **meta**：[meta-prompt.md § 3.3 留白强约束](../../meta-prompt.md)
