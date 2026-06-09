# Component Contracts — Premium Showcase 核心 5 件套

> 本目录是 premium-showcase 类别的**组件契约层**。每份契约文档定义一个核心组件的形态、尺寸、配色、行为、可访问性、反模式、和代码骨架。
>
> 5 个核心组件覆盖完整 5 段滚动结构：L1 Hero → L2 Feature → L3 Spec → L4 Gallery → L5 Footer。

---

## 📑 索引

| # | 组件 | 一句话 | 必含节 | 详细 |
|---|---|---|---|---|
| 1 | **hero-cta** | Full-bleed Hero，100vh 摄影 + 极简文案 + 滚动指示 | 11 节 | [hero-cta.md](./hero-cta.md) |
| 2 | **feature-row** | Editorial 左右分栏（大图 + 文字块 + tracking 收紧）| 11 节 | [feature-row.md](./feature-row.md) |
| 3 | **spec-sheet** | Spec Sheet 数字 + Mono 字体 + 大留白 · 像杂志内页 | 11 节 | [spec-sheet.md](./spec-sheet.md) |
| 4 | **image-gallery** | 瀑布 / 横向滚动 / 全屏 lightbox 三态 | 11 节 | [image-gallery.md](./image-gallery.md) |
| 5 | **footer-cta** | Footer + "Request access" 询价式 CTA | 11 节 | [footer-cta.md](./footer-cta.md) |

---

## 每份契约包含的 11 节

| # | 章节 | 关键问题 |
|---|---|---|
| 1 | **用途** | 何时用 / 何时不用 |
| 2 | **结构** | 视觉分层（摄影层 / 文字层 / 装饰层）|
| 3 | **关键尺寸** | hero 高度 / 字体档 / 留白档 |
| 4 | **配色** | bg / text / accent / 状态色 |
| 5 | **行为** | hover / scroll-trigger / 加载策略 |
| 6 | **可访问性** | 键盘导航 / 屏幕阅读器 / reduced-motion |
| 7 | **反模式** | 5 条最常犯的错（含 ❌ + ✅ 对照）|
| 8 | **Web 代码骨架** | Vue 3 + Tailwind 最小可运行示例 |
| 9 | **替代方案** | 不用本组件时的备选 |
| 10 | **跨行业差异** | 奢侈 / 汽车 / 航天 / 房产 / 视听 5 套调参 |
| 11 | **配对引用** | 与 layouts/ 哪个布局绑定，与 pitfalls/ 哪条关联 |

---

## 5 件套在 5 段滚动中的位置

```
L1 Full-bleed Hero       ━━━━━━━━ hero-cta
       ↓ scroll
L2 Editorial Feature     ━━━━━━━━ feature-row
       ↓ scroll
L3 Spec Section          ━━━━━━━━ spec-sheet
       ↓ scroll
L4 Image Gallery         ━━━━━━━━ image-gallery
       ↓ scroll
L5 Footer + Final CTA    ━━━━━━━━ footer-cta
```

---

## 行业选型矩阵（5 件套 × 5 行业）

| 组件 | 奢侈 | 汽车 | 航天 | 房产 | 视听 |
|---|---|---|---|---|---|
| **hero-cta** | 静态大图 + serif 标题 | 视频背景 + sans 大字 | 渐变 + 玻璃标题 | 米白 + serif | 暗色 + 产品渲染 |
| **feature-row** | 左右分栏 + 工艺细节 | 数字 + 摄影配文 | 玻璃面板 + 数据 | 空间 + 文字 | 材质 + 文字 |
| **spec-sheet** | 几乎不放（隐式奢华）| 满数字（性能）| 规格 + 高度 / 速度 | 面积 / 位置 / 户型 | 频响 / 功率 / 重量 |
| **image-gallery** | 编辑式瀑布 | 概念车三视图 | 渲染图水平滚动 | 空间摄影 | 极简产品图 |
| **footer-cta** | "Discover more" 文字链 | "Configure" / "Order" | "Reserve" | "Inquire" | "Reserve" / "Pre-order" |

---

## 与 native-app 5 件套的差异

| premium-showcase | native-app |
|---|---|
| **desktop-first**（1440+ viewport）| **mobile-first**（390 viewport）|
| **摄影 + 排版 + 留白** 三件套 | **组件 + 状态 + 导航** 三件套 |
| **滚动主导**（3-7 屏长 scroll）| **栈式 / Tab 主导**（master-detail）|
| **品牌资产展示** | **功能操作** |
| **询价式 CTA** | **操作式 CTA**（save / share / next）|
| **慢 + 长 easing**（0.8-1.2s）| **快 + 标准 easing**（0.2-0.4s）|
| **serif 主导** | **sans 主导**（SF Pro / Roboto）|
| **OLED 暗色 / 米白** 二选一 | **light mode 主导** + 暗色跟随 |

---

## 必做清单（实施前）

- [ ] 选定行业（Q1 已答）
- [ ] 准备摄影资产（Q2 已答，至少 5 张 ≥ 2400px 宽）
- [ ] 选定字体方案（Q3 已答，self-host）
- [ ] 选定滚动策略（Q4 已答，smooth / sticky / parallax）
- [ ] 通读本目录 5 份契约
- [ ] 派生 token.json（按 § 3.1 通用 + § 3.2 行业差异化）
- [ ] 派生 tailwind.config.ts（`ps-` / `ps-auto-` / `ps-aero-` / `ps-rea-` / `ps-av-` 命名空间）

---

## 当前状态

| 契约 | 详细稿 | 状态 |
|---|---|---|
| hero-cta | [hero-cta.md](./hero-cta.md) | 🔴 待建（P1-B）|
| feature-row | [feature-row.md](./feature-row.md) | 🔴 待建（P1-B）|
| spec-sheet | [spec-sheet.md](./spec-sheet.md) | 🔴 待建（P1-B）|
| image-gallery | [image-gallery.md](./image-gallery.md) | 🔴 待建（P1-B）|
| footer-cta | [footer-cta.md](./footer-cta.md) | 🔴 待建（P1-B）|

> P1-A 阶段仅完成 README 骨架（本文），P1-B 阶段补 5 份详细契约稿 + 1 个 verification 真实项目。
