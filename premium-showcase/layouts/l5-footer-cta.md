# L5 · Footer + Final CTA 询价式

> **Footer + 询价式 Final CTA**（"Request access" / "Configure" / "Reserve"）。premium-showcase 全页 CTA 1-2 个，绝不放"Buy now"。

---

## 1. 典型项目

| 项目 | URL | CTA 文字 | 风格 |
|---|---|---|---|
| Apple Vision Pro | apple.com/apple-vision-pro | "Buy" / "Try" | 玻璃 + 渐变 |
| Tesla Model X | tesla.com/modelx | "Order Now" / "Demo Drive" | 暗色 + 询价 |
| Hermès | hermes.com | "Contact us" | 米白 + serif |
| Bang & Olufsen | bang-olufsen.com | "Find a store" / "Configure" | 暗色 + 金属 |
| Aman Resorts | aman.com | "Reserve" | 米白 + 自然 |

---

## 2. Grid 骨架

```
┌─────────────────────────────────────────────────┐
│                                                 │
│              [Eyebrow · GET IN TOUCH]           │
│                                                 │
│            <Title 询问式大标题>                  │   询问式标题
│                                                 │
│            <Sub 简短副标题>                      │
│                                                 │
│   <Request access>  <Configure>  <Reserve>     │   CTA 区
│                                                 │
├─────────────────────────────────────────────────┤
│   Products     Company     Legal     Social      │   footer
│   ...          ...         ...       ...         │   4-5 列
│   ...          ...         ...       ...         │
│                                                 │
│   © 2026 Brand · Privacy · Terms                │   底栏
└─────────────────────────────────────────────────┘
```

| 断点 | 行为 |
|---|---|
| **≥ 1024px** | 4-5 列 footer + CTA 横向 |
| **768-1023px** | 2 列 footer + CTA 横向 |
| **< 768px** | 1 列 footer（accordion 可选）+ CTA 纵向 |

---

## 3. 摄影占比

- **Final CTA 区**：不放图（背景 bg 主色即可）
- **Footer**：不放图
- **底栏**：不放图
- **整体视觉**：纯文字 + 留白 = 极简

---

## 4. 间距

```css
.final-cta-section {
  padding-top: clamp(80px, 12vw, 200px);
  padding-bottom: clamp(120px, 16vw, 240px);
  text-align: center;
}

.footer-section {
  padding-top: clamp(64px, 8vw, 120px);
  padding-bottom: clamp(32px, 4vw, 64px);
  border-top: 1px solid rgba(255,255,255,0.1);
}

.footer-grid {
  display: grid;
  gap: clamp(40px, 5vw, 80px);
  grid-template-columns: repeat(4, 1fr);
}
@media (max-width: 1023px) { .footer-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 767px) { .footer-grid { grid-template-columns: 1fr; } }
```

| 间距类型 | 值 |
|---|---|
| CTA 区 padding-top | **clamp(80px, 12vw, 200px)** |
| CTA 区 padding-bottom | **clamp(120px, 16vw, 240px)** |
| 询问式标题距 eyebrow | 32-48px |
| 询问式标题距 CTA | 64-96px |
| CTA 间距 | 16-24px |
| Footer padding-top | 80-120px |
| Footer padding-bottom | 48-64px |
| Footer 列间距 | clamp(40px, 5vw, 80px) |

---

## 5. 字体档

| 元素 | 字号 | 字重 | tracking | 字体 |
|---|---|---|---|---|
| **询问式标题** | **clamp(40px, 5vw, 80px)** | Light | -0.02em | Serif 主导 |
| **询问式副标题** | 18-20px | Regular | 0 | Sans |
| **Eyebrow** | 12px | Medium | 0.3em | Sans uppercase |
| **CTA** | 14-16px | Medium | 0.05em | Sans uppercase |
| **Footer 列标题** | 12px | Medium | 0.2em | Sans uppercase |
| **Footer 链接** | 14-16px | Regular | 0 | Sans |
| **底栏** | 12px | Regular | 0.05em | Sans |

---

## 6. 滚动策略

| 策略 | 适用 | 性能 |
|---|---|---|
| **scroll-triggered fade** | 询问式标题 + CTA fade-in | 中 |
| **stagger fade** | 多 CTA stagger 0.15s | 中 |
| **不动** | 静态展示 | 零 |

**默认**：scroll-triggered fade + stagger，footer 不动。

---

## 7. 可访问性

- [ ] CTA 按钮是 `<a>` 或 `<button>`，**不是** `<div>`
- [ ] CTA 文字含完整含义（"Request access" 不是 "Click here"）
- [ ] 询问式标题 `<h2>` 语义层级清晰
- [ ] Footer 链接对比度 ≥ 4.5:1
- [ ] 键盘 Tab：CTA → footer links → social
- [ ] `prefers-reduced-motion: reduce` 关闭动效
- [ ] 移动端 footer 列折叠为 accordion 或单列

---

## 8. 反模式（5 条）

1. **多 CTA 拥挤** → 1 主 + 1 次
2. **"Buy now" 砍品牌** → 询价式（Request / Configure / Reserve）
3. **倒计时 / 库存紧张** → 不放倒计时
4. **Footer 链接 10+ 列** → 限制 4-5 列
5. **Footer 链接无 hover 反馈** → 加 hover:opacity / text-accent

详见 [footer-cta § 7](../component-contract/footer-cta.md#7-反模式5-条) 完整对照。

---

## 9. Web 代码骨架

详见 [footer-cta § 8](../component-contract/footer-cta.md#8-web-代码骨架vue-3--tailwind-最小示例)。

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

## 11. 与其他布局的衔接

- **向上**：[L4 Image Gallery](./l4-image-gallery.md) — 摄影后接收尾
- **关联组件**：[footer-cta](../component-contract/footer-cta.md)
- **关联反模式**：[P-9 CTA 过多](../pitfalls/README.md#p-9--cta-过多--3-个--屏) · [P-10 倒计时/紧迫感](../pitfalls/README.md#p-10--倒计时--紧迫感--价格显式)
