# L4 · Image Gallery 摄影集

> **瀑布 / 横向滚动 / 全屏 lightbox 三态可切换**。premium-showcase 用摄影集传达"产品多面 / 工艺细节 / 空间层次"。

---

## 1. 典型项目

| 项目 | URL | 布局 | 风格 |
|---|---|---|---|
| Hermès Silk | hermes.com | masonry | 编辑式 / 工作室 |
| Apple Watch Ultra | apple.com/apple-watch-ultra | horizontal scroll | 概念图 / 极端角度 |
| Bang & Olufsen Beoplay | bang-olufsen.com | masonry | 工业 / 反光 |
| Aston Martin DB12 | astonmartin.com | horizontal scroll | 概念车三视图 |
| Aman Resorts | aman.com | masonry | 空间 / 自然光 |

---

## 2. Grid 骨架

### 2.1 Masonry 瀑布（最常用）

```
┌─────────────────────────────────────────────────┐
│         [Eyebrow · GALLERY]                     │
│                                                 │
│   ┌──────┐ ┌────────┐ ┌──────┐                  │
│   │      │ │        │ │      │                  │   列宽不等
│   │      │ │        │ └──────┘                  │   高随机
│   └──────┘ │        │ ┌────────┐                │   CSS columns
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
│   │        │ │        │ │        │              │
│   └────────┘ └────────┘ └────────┘              │
│                                                 │
└─────────────────────────────────────────────────┘
```

| 断点 | 行为 |
|---|---|
| **≥ 1024px** | masonry 3-4 列 / horizontal 3-4 帧可见 |
| **768-1023px** | masonry 2 列 / horizontal 2 帧可见 |
| **< 768px** | masonry 2 列 / horizontal 1.2 帧可见 |

---

## 3. 摄影占比

| 布局 | 单图占比 | 容器高 | 视差 |
|---|---|---|---|
| **Masonry** | 30-40% viewport 宽 | auto | 无 |
| **Horizontal** | 30-40% viewport 宽 | 60-80vh | 可选 x -50px |
| **Lightbox** | 90vw × 85vh | 100vh | 无 |

- **Masonry**：3-4 列等宽（或 columns）
- **Horizontal**：单图宽 clamp(280px, 30vw, 480px)
- **Lightbox**：100vw × 100vh 容器，内图 max-w-90vw max-h-85vh

---

## 4. 间距

```css
.gallery-section {
  padding-top: clamp(80px, 12vw, 200px);
  padding-bottom: clamp(80px, 12vw, 200px);
}

/* Masonry */
.masonry-grid {
  columns: 3;
  gap: clamp(16px, 2vw, 32px);
}
@media (max-width: 1023px) { .masonry-grid { columns: 2; } }

/* Horizontal */
.h-scroll-container {
  display: flex;
  gap: clamp(16px, 2vw, 32px);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  height: 80vh;
}
.h-scroll-item {
  flex: 0 0 clamp(280px, 30vw, 480px);
  scroll-snap-align: center;
}
```

| 间距类型 | 值 |
|---|---|
| Section 间距 | **clamp(80px, 12vw, 200px)** |
| Masonry 列间距 | **clamp(16px, 2vw, 32px)** |
| Masonry 行间距 | 同列间距 |
| Horizontal 容器高 | 80vh（桌面）/ 60vh（移动）|
| Horizontal 帧间距 | clamp(16px, 2vw, 32px) |

---

## 5. 字体档

| 元素 | 字号 | 字重 | tracking | 字体 |
|---|---|---|---|---|
| **Eyebrow** | 12px | Medium | 0.3em | Sans uppercase |
| **Caption（图下方）**| 12-14px | Regular | 0 | Sans |
| **Lightbox 计数** | 12px | Regular | 0.05em | Sans |
| **Lightbox 关闭按钮** | 24-32px | Light | 0 | Sans |

---

## 6. 滚动策略

| 布局 | 策略 |
|---|---|
| **Masonry** | scroll-triggered fade · stagger 0.1s |
| **Horizontal** | scroll-snap-x mandatory · snap-center |
| **Lightbox** | fade + scale 0.95 → 1.0（open）· crossfade 0.3s（切换）|

**默认**：masonry + scroll-triggered fade，hover 触发 lightbox。

---

## 7. 可访问性

- [ ] Masonry 用 `<ul>` + `<li>` 语义结构
- [ ] 每张图 `<img alt>` 必填
- [ ] Lightbox 焦点 trap（打开时焦点困在 lightbox 内）
- [ ] Lightbox open 焦点到 close 按钮
- [ ] Lightbox close 焦点回到原触发图
- [ ] 键盘 Esc 关闭 / ← / → 切换
- [ ] 移动端 Lightbox 触摸滑动
- [ ] `prefers-reduced-motion: reduce` 关闭动效
- [ ] 懒加载：首屏图 eager，其余 lazy

---

## 8. 反模式（5 条）

1. **固定网格 3 列等高** → 改 CSS columns 真瀑布
2. **图片无 alt** → 必填 alt 含场景描述
3. **Lightbox 无键盘导航** → 监听 ArrowLeft / ArrowRight / Esc
4. **一次加载所有图** → 首屏 eager + 其余 lazy
5. **Lightbox 关闭后焦点丢失** → 关闭后焦点恢复

详见 [image-gallery § 7](../component-contract/image-gallery.md#7-反模式5-条) 完整对照。

---

## 9. Web 代码骨架

详见 [image-gallery § 8](../component-contract/image-gallery.md#8-web-代码骨架vue-3--tailwind-最小示例--masonry--lightbox)。

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

## 11. 与其他布局的衔接

- **向上**：[L3 Spec Section](./l3-spec-section.md) — 数字后接摄影
- **向下**：[L5 Footer CTA](./l5-footer-cta.md) — 摄影后接收尾
- **关联组件**：[image-gallery](../component-contract/image-gallery.md)
- **关联反模式**：[P-1 摄影未优化](../pitfalls/README.md#p-1--摄影未优化--lcp--4s) · [P-3 摄影风格不统一](../pitfalls/README.md#p-3--摄影风格不统一--后期--色温--比例乱)
