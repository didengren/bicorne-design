# L2 · Scroll Story 滚动驱动叙事

> **3-5 段 cinematic · sticky 大图 + scroll 文字**。premium-showcase 的"故事"由多段 feature-row 串联构成。

---

## 1. 典型项目

| 项目 | URL | 段数 | 风格 |
|---|---|---|---|
| Apple Vision Pro | apple.com/apple-vision-pro | 5 段 | sticky + cinematic |
| Tesla Model S Plaid | tesla.com/models | 4 段 | sticky + 数字 |
| Hermès Foundation | fondation.hermes.com | 6 段 | 编辑式 + 工艺 |
| Bang & Olufsen Beolab | bang-olufsen.com/beolab-90 | 3 段 | sticky + 材质 |
| Aston Martin Vanquish | astonmartin.com | 5 段 | sticky + 渲染 |

---

## 2. Grid 骨架

```
┌─────────────────────────────────────────────────┐
│                                                 │
│  [Section padding-top · clamp 80-200px]         │
│                                                 │
│   ┌──────────────────┐  ┌─────────────────┐     │
│   │                  │  │  [Eyebrow]      │     │
│   │   <大图 60%>     │  │  [Title]        │     │
│   │   sticky top     │  │  [Body 1]       │     │
│   │   object-cover   │  │  [Body 2]       │     │
│   │                  │  │  [Body 3]       │     │
│   └──────────────────┘  └─────────────────┘     │
│                                                 │
│  [Section padding-bottom · clamp 80-200px]      │
│                                                 │
│  ─── 下一段（左右交替）───                       │
│                                                 │
│  ┌─────────────────┐  ┌──────────────────┐      │
│  │  [Eyebrow]      │  │                  │      │
│  │  [Title]        │  │   <大图 60%>     │      │
│  │  [Body 1]       │  │   sticky top     │      │
│  │  [Body 2]       │  │   object-cover   │      │
│  │  [Body 3]       │  │                  │      │
│  └─────────────────┘  └──────────────────┘      │
│                                                 │
└─────────────────────────────────────────────────┘
```

| 断点 | 行为 |
|---|---|
| **≥ 1024px** | 58% 图 + 42% 文（左右交替）|
| **768-1023px** | 50% 图 + 50% 文（左右交替）|
| **< 768px** | 100% 图（上） + 100% 文（下）· 单列顺序 |

---

## 3. 摄影占比

| 段 | 图占比 | sticky | 视差 |
|---|---|---|---|
| **第 1 段** | 60% viewport | ✅ sticky top 0 | 可选 y -30px |
| **第 2 段** | 60% viewport | ✅ sticky | 可选 y -30px |
| **第 N 段** | 60% viewport | ✅ sticky | 可选 y -30px |
| **移动** | 100% viewport | ❌（性能差）| 关闭 |

---

## 4. 间距

```css
.scroll-story-section {
  padding-top: clamp(80px, 12vw, 200px);
  padding-bottom: clamp(80px, 12vw, 200px);
}

.scroll-story-grid {
  display: grid;
  gap: clamp(40px, 6vw, 120px);
  grid-template-columns: 58% 42%;
}

@media (max-width: 1023px) {
  .scroll-story-grid { grid-template-columns: 1fr; }
}
```

| 间距类型 | 值 |
|---|---|
| Section 间距 | **clamp(80px, 12vw, 200px)** |
| Grid 间距 | **clamp(40px, 6vw, 120px)** |
| 文侧 padding | 0 80px（左右）|
| 段落 stack | 24-32px |
| Body max-width | 480px |

---

## 5. 字体档

| 元素 | 字号 | 字重 | 行高 | tracking | 字体 |
|---|---|---|---|---|---|
| **Title** | clamp(36px, 4vw, 64px) | Light | 1.1 | -0.02em | Serif 主导 |
| **Body** | 18-20px | Regular | **1.7** | 0 | Sans |
| **Eyebrow** | 11-12px | Medium | 1.4 | 0.25em | Sans uppercase |
| **Link** | 14px | Medium | 1.2 | 0.1em | Sans uppercase |

---

## 6. 滚动策略

| 策略 | 适用 |
|---|---|
| **sticky 图 + scroll 文** | 90% 项目（默认）|
| **scroll-triggered fade** | 文字 fade-in（0-30% 视口）|
| **subtle parallax** | 图 y 0 → -30px（极轻微）|
| **多段交替** | 左右互换（每段交替）|

**默认组合**：sticky + fade + 轻微 parallax，3 段串联。

---

## 7. 可访问性

- [ ] 每段独立 `<h2>`，标题层级清晰
- [ ] 图 `<img alt>` 必填
- [ ] 段落 max-width 限制（长行阅读疲劳）
- [ ] Sticky 在移动端关闭（性能差）
- [ ] 段落间距 ≥ 24px（避免粘连）
- [ ] `prefers-reduced-motion: reduce` 关闭 sticky 视差

---

## 8. 反模式（5 条）

1. **图文 50/50 等分** → 改 58/42 偏图
2. **文侧充满整个屏幕宽** → max-width 480px
3. **图不带 overlay 直接放白字** → 图压暗 25% 或加 overlay
4. **多段用相同布局** → 左右交替
5. **eyebrow 用 emoji** → 纯文本 + tracking

详见 [feature-row § 7](../component-contract/feature-row.md#7-反模式5-条) 完整对照。

---

## 9. Web 代码骨架

详见 [feature-row § 8](../component-contract/feature-row.md#8-web-代码骨架vue-3--tailwind-最小示例)。

---

## 10. 跨行业差异（5 套调参）

| 行业 | 段数 | 图占比 | 文侧字号 | Body 长度 |
|---|---|---|---|---|
| **奢侈品** | 5-6 | 50% | 18px | 长（3-5 段）|
| **汽车** | 3-4 | 62% | 18-20px | 短（1-2 段）|
| **航天** | 4-5 | 58% | 18px | 中（2-3 段）|
| **房产** | 3-4 | 50% | 18-20px | 中（2-3 段）|
| **视听** | 3 | 60% | 17-18px | 短（1-2 段）|

---

## 11. 与其他布局的衔接

- **向上**：[L1 Full-bleed Hero](./l1-full-bleed-hero.md) — 首屏滚走后接 L2
- **向下**：[L3 Spec Section](./l3-spec-section.md) — 故事讲完后接数字
- **关联组件**：[feature-row](../component-contract/feature-row.md)
- **关联反模式**：[P-5 字号过小](../pitfalls/README.md#p-5--字号过小--移动--桌面-同步-16px) · [P-6 行高过紧](../pitfalls/README.md#p-6--行高过紧--body-line-height-12)
