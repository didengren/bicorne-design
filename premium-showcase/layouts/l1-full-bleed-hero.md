# L1 · Full-bleed Hero

> **首屏 100vh 满屏摄影 + 极简文案 + 滚动指示**。premium-showcase 的"开场白"，80% 视觉冲击由这一屏承担。

---

## 1. 典型项目

| 项目 | URL | 风格 |
|---|---|---|
| Apple Vision Pro | apple.com/apple-vision-pro | 玻璃质感 + 渐变蓝紫 |
| Tesla Model X | tesla.com/modelx | 暗色 OLED + 数字 spec |
| Hermès Silk | hermes.com | 米白 + 编辑式 + serif |
| Bang & Olufsen Beosound | bang-olufsen.com | 暗色 + 金属 + Mono |
| Aston Martin DB12 | astonmartin.com | 暗色 + 渐变 + 渲染 |

---

## 2. Grid 骨架

```
┌─────────────────────────────────────────────────┐
│ [Nav 透明覆盖 60px · sticky · z-10]             │
│                                                 │
│         <Image layer · 100vw × 100vh>           │
│         <Overlay gradient · 0.4 → 0.7>          │
│                                                 │
│              [Eyebrow · 12px · tracking 0.3em]  │
│         [Hero Title · clamp 48-112px · serif]   │   文字层
│         [Sub copy · 18-20px · max-w-2xl]        │   居中
│                                                 │
│              [CTA · 文字链 + ↓]                  │
│                                                 │
│         [Scroll indicator · 距底 32px]          │
└─────────────────────────────────────────────────┘
```

| 断点 | 行为 |
|---|---|
| **≥ 1024px** | 100vh · 文字层居中 |
| **768-1023px** | 100vh · 文字层下移（距底 20%）|
| **< 768px** | 100dvh · 文字层下移（距底 25%）|

---

## 3. 摄影占比

- 桌面：**100vw × 100vh**（首屏完全覆盖）
- 移动：**100vw × 100dvh**
- aspect ratio：**不固定**，由 viewport 决定
- object-fit：**cover**（裁剪，不变形）
- 视差：可选，scroll 时 0 → -50px（极轻微）

---

## 4. 间距

```css
.hero-section { height: 100vh; }
@media (max-width: 768px) { .hero-section { height: 100dvh; } }

.hero-text-layer {
  padding: 0 clamp(24px, 4vw, 80px);
  /* 文字层 padding */
}

.hero-cta {
  margin-top: clamp(40px, 5vw, 80px);
  /* CTA 距文字间距 */
}

.scroll-indicator {
  bottom: 32px;
  /* 滚动指示距底 */
}
```

| 间距类型 | 值 |
|---|---|
| Section 间距 | 0（首屏无前间距）|
| 左右 gutter | clamp(24px, 4vw, 80px) |
| 文字 stack 间距 | clamp(16px, 2vw, 32px) |
| 滚动指示距底 | 32px（桌面）/ 24px（移动）|

---

## 5. 字体档

| 元素 | 字号 | 字重 | 行高 | tracking | 字体 |
|---|---|---|---|---|---|
| **Hero Title** | clamp(48px, 8vw, 112px) | Light/Regular | 1.05 | **-0.04em** | Serif 主导 |
| **Sub copy** | clamp(18px, 1.5vw, 24px) | Regular | 1.6 | 0 | Sans |
| **Eyebrow** | 12px | Medium | 1.4 | 0.3em | Sans uppercase |
| **CTA** | 14-16px | Medium | 1.2 | 0.05em | Sans uppercase |
| **Scroll indicator** | 12px | Regular | 1.2 | 0.2em | Sans uppercase |

---

## 6. 滚动策略

| 策略 | 适用 | 性能 |
|---|---|---|
| **scroll-triggered fade** | 90% 项目 | 中（IntersectionObserver）|
| **scroll-driven scale** | hero 文字 scale 1.0 → 0.95 | 中 |
| **scroll-driven opacity** | 文字 opacity 1 → 0.3 | 低 |
| **scroll-driven translateY** | 图 y 0 → -50px | 低 |

**默认**：`fade + scale + translateY` 三合一，scroll 0-50% 内完成。

---

## 7. 可访问性

- [ ] `<h1>` 唯一且语义清晰
- [ ] 文字与背景对比度 ≥ 7:1（AAA · premium 必 AAA）
- [ ] 滚动指示 `aria-hidden="true"`（装饰）
- [ ] 键盘 Tab：nav links → CTA → scroll anchor
- [ ] `prefers-reduced-motion: reduce` 关闭动画
- [ ] 移动端不锁 viewport

---

## 8. 反模式（5 条）

1. **首屏高度由内容决定**（结果 70vh）→ 强制 100vh / 100dvh
2. **photo 不设 object-fit: cover** → 变形
3. **文字直接放照片上不可读** → 必加 overlay
4. **nav 实色占首屏** → nav 透明覆盖
5. **滚动指示用 emoji** → 自绘 SVG 箭头

详见 [hero-cta § 7](../component-contract/hero-cta.md#7-反模式5-条) 完整对照。

---

## 9. Web 代码骨架

详见 [hero-cta § 8](../component-contract/hero-cta.md#8-web-代码骨架vue-3--tailwind-最小示例)。

---

## 10. 跨行业差异（5 套调参）

| 行业 | 标题字体 | 背景色 | Photo overlay | CTA 文字 |
|---|---|---|---|---|
| **奢侈品** | GT Sectra Serif | `#FAF7F2` | 无 | "Discover" |
| **汽车** | Tiempos Sans | `#000000` | 0.5 黑渐变 | "Configure" |
| **航天** | Söhne Sans | `#000000` | 0.6 黑 + 蓝紫边 | "Reserve" |
| **房产** | GT Super Serif | `#F5F0E8` | 0.3 白渐变 | "Inquire" |
| **视听** | Söhne Mono | `#0A0A0A` | 0.7 黑 | "Pre-order" |

---

## 11. 与其他布局的衔接

- **向下**：[L2 Scroll Story](./l2-scroll-story.md) — 滚动 50% 后触发
- **关联组件**：[hero-cta](../component-contract/hero-cta.md)
- **关联反模式**：[P-8 首屏不满屏](../pitfalls/README.md#p-8--首屏不满屏--100vh-缺失)
