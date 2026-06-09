# L3 · Spec Section 数据展示

> **数字 + Mono + 大留白 · 像杂志内页**。premium-showcase 用"克制数字"传达性能 / 工艺 / 规格。

---

## 1. 典型项目

| 项目 | URL | 列数 | 数字类型 |
|---|---|---|---|
| Tesla Model S Plaid | tesla.com/models | 3 | 性能（0-100 / 续航 / 极速）|
| Apple iPhone 15 Pro | apple.com/iphone-15-pro | 3 | 规格（重量 / 屏幕 / 芯片）|
| SpaceX Starship | spacex.com/vehicles/starship | 4 | 高度 / 推力 / 载重 / 速度 |
| Aston Martin DB12 | astonmartin.com | 3 | 性能（马力 / 扭矩 / 极速）|
| Bang & Olufsen Beosound | bang-olufsen.com | 3 | 频响 / 功率 / 重量 |

---

## 2. Grid 骨架

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
└─────────────────────────────────────────────────┘
```

| 断点 | 行为 |
|---|---|
| **≥ 1024px** | 3-4 列等宽 |
| **768-1023px** | 2 列 |
| **< 768px** | 1 列（移动单列）|

---

## 3. 摄影占比

- **几乎不放图**（数字 + 留白就是视觉）
- 数字 + 标签 = 唯一内容
- 可选：每列上方加 1 个 1:1 缩略图（极小，< 60×60）

---

## 4. 间距

```css
.spec-section {
  padding-top: clamp(80px, 12vw, 200px);
  padding-bottom: clamp(80px, 12vw, 200px);
}

.spec-grid {
  display: grid;
  gap: clamp(40px, 6vw, 120px);
  grid-template-columns: repeat(3, 1fr);
}

@media (max-width: 1023px) { .spec-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 767px) { .spec-grid { grid-template-columns: 1fr; } }
```

| 间距类型 | 值 |
|---|---|
| Section 间距 | **clamp(80px, 12vw, 200px)** |
| 列间距 | **clamp(40px, 6vw, 120px)** |
| Eyebrow 距内容 | 80-120px |
| 数字与单位行间距 | 4-8px |
| 数字与标签行间距 | 24-32px |

---

## 5. 字体档

| 元素 | 字号 | 字重 | 行高 | tracking | 字体 |
|---|---|---|---|---|---|
| **数字** | **clamp(48px, 6vw, 96px)** | **Light** | 1.0 | -0.02em | **Mono** + tabular-nums |
| **单位** | 18-24px | Light | 1.0 | 0 | Mono |
| **标签** | 12-14px | Regular | 1.2 | 0.2em | Sans uppercase |
| **Eyebrow** | 12px | Medium | 1.4 | 0.3em | Sans uppercase |

> ⚠️ **数字用 Light/Regular 字重**（克制感），不用 Bold。

---

## 6. 滚动策略

| 策略 | 适用 | 性能 |
|---|---|---|
| **count-up** | 数字 0 → 终值 | 低（requestAnimationFrame）|
| **scroll-triggered fade** | 整段 fade-in | 中 |
| **stagger count-up** | 每列延迟 0.15s | 中 |
| **不动** | 静态展示（**推荐 premium 极简**）| 零 |

**默认**：scroll-triggered fade + count-up（仅 1 次，不循环）。

---

## 7. 可访问性

- [ ] 数字以 `aria-label` 标注完整含义（如 `aria-label="450 Newton meters, peak torque"`）
- [ ] Mono 字体在屏幕阅读器中正常读出
- [ ] Count-up 不影响语义（最终值和初始值含义相同）
- [ ] 列间分隔线用 CSS 不用图片
- [ ] 数字对比度 ≥ 7:1（AAA）
- [ ] `prefers-reduced-motion: reduce` 关闭 count-up

---

## 8. 反模式（5 条）

1. **Spec sheet 用营销文案** → 改单位 + 简短技术标签
2. **数字用 sans 字体** → 改 Mono + tabular-nums
3. **数字字号都一样** → 大数字 + 中单位 + 小标签 3 档
4. **Spec 用红色高亮强调** → 数字用主色，不染色
5. **5+ 列挤在一行** → 限制 3-4 列

详见 [spec-sheet § 7](../component-contract/spec-sheet.md#7-反模式5-条) 完整对照。

---

## 9. Web 代码骨架

详见 [spec-sheet § 8](../component-contract/spec-sheet.md#8-web-代码骨架vue-3--tailwind-最小示例)。

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

## 11. 与其他布局的衔接

- **向上**：[L2 Scroll Story](./l2-scroll-story.md) — 故事讲完后接数字
- **向下**：[L4 Image Gallery](./l4-image-gallery.md) — 数字后接摄影
- **关联组件**：[spec-sheet](../component-contract/spec-sheet.md)
- **关联反模式**：[P-5 字号过小](../pitfalls/README.md#p-5--字号过小--移动--桌面-同步-16px) · [P-9 CTA 过多](../pitfalls/README.md#p-9--cta-过多--3-个--屏)
