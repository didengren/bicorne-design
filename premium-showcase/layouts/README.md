# Layouts — Premium Showcase 5 段滚动结构

> 本目录是 premium-showcase 类别的**布局层**。每份布局文档定义一段滚动结构的视觉骨架（grid / spacing / sticky / parallax / 摄影占比）。
>
> 5 个布局对应 5 段滚动结构（L1-L5），与 component-contract/ 5 件套一一绑定。

---

## 📑 索引

| # | 布局 | 一句话 | 关联组件 | 详细 |
|---|---|---|---|---|
| L1 | **l1-full-bleed-hero** | 首屏 100vh 摄影 + 居中 logo + 滚动指示 | [hero-cta](../component-contract/README.md#1-hero-cta) | [l1-full-bleed-hero.md](./l1-full-bleed-hero.md) |
| L2 | **l2-scroll-story** | 滚动驱动叙事 · 3-5 段 cinematic · sticky scroll | [feature-row](../component-contract/README.md#2-feature-row) | [l2-scroll-story.md](./l2-scroll-story.md) |
| L3 | **l3-spec-section** | 数字 + Mono + 大留白 · 像杂志内页 | [spec-sheet](../component-contract/README.md#3-spec-sheet) | [l3-spec-section.md](./l3-spec-section.md) |
| L4 | **l4-image-gallery** | 摄影集 · 瀑布 / 横向 / 全屏 lightbox 三态 | [image-gallery](../component-contract/README.md#4-image-gallery) | [l4-image-gallery.md](./l4-image-gallery.md) |
| L5 | **l5-footer-cta** | Footer + "Request access" / "Configure" 询价式 | [footer-cta](../component-contract/README.md#5-footer-cta) | [l5-footer-cta.md](./l5-footer-cta.md) |

---

## 每份布局包含的 10 节

| # | 章节 | 关键问题 |
|---|---|---|
| 1 | **典型项目** | 2-3 个真实参考站（如 Apple Vision Pro · Bang & Olufsen）|
| 2 | **grid 骨架** | 列数 / 宽度比 / gutter / 断点 |
| 3 | **摄影占比** | viewport 占比 / 满屏规则 / 视差策略 |
| 4 | **间距** | section 间距 / gutter / stack 间距（clamp 写法）|
| 5 | **字体档** | hero / section / body / caption 字号 + 行高 + tracking |
| 6 | **滚动策略** | smooth / sticky / parallax / horizontal |
| 7 | **可访问性** | 键盘焦点 / reduced-motion / 对比度 |
| 8 | **反模式** | 5 条最常犯的错 |
| 9 | **Web 代码骨架** | Vue 3 + Tailwind 最小可运行示例 |
| 10 | **跨行业差异** | 奢侈 / 汽车 / 航天 / 房产 / 视听 5 套调参 |

---

## 5 段滚动结构示意

```
┌──────────────────────────────────────────────────────────┐
│                                                          │  L1
│         <Full-bleed Hero · 100vh · 100vw>                │ full-bleed-hero
│              居中 logo / scroll indicator                │ 100vh 摄影
│                                                          │
├──────────────────────────────────────────────────────────┤
│                                                          │  L2
│       <Editorial Feature · 左右分栏 6/4>                │ scroll-story
│  ┌──────────────────────┐  ┌─────────────────────┐      │ sticky 大图
│  │                      │  │  Title              │      │ scroll 文字
│  │   <大图 60%>         │  │  Body copy          │      │ 200px section 间距
│  │                      │  │  Eyebrow            │      │
│  └──────────────────────┘  └─────────────────────┘      │
│                                                          │
├──────────────────────────────────────────────────────────┤
│                                                          │  L3
│            <Spec Sheet · Mono · 大留白>                  │ spec-section
│                                                          │ 3 列等宽
│     <450 NM  |  0-100 3.2s  |  600 KM RANGE>             │ 200px gutter
│                                                          │
├──────────────────────────────────────────────────────────┤
│                                                          │  L4
│       <Image Gallery · 瀑布 / 横向 / lightbox>           │ image-gallery
│                                                          │ 3 列瀑布
│  ┌─────┐ ┌───────┐ ┌─────┐                              │ 或水平滚动
│  │     │ │       │ │     │                              │ 或全屏 lightbox
│  └─────┘ │       │ └─────┘                              │
│  ┌───────┴─────┐ ┌───────────┐                          │
│  │             │ │           │                          │
│  └─────────────┘ └───────────┘                          │
│                                                          │
├──────────────────────────────────────────────────────────┤
│                                                          │  L5
│            <Footer + Final CTA · 询价式>                │ footer-cta
│                                                          │ 4-5 列 footer
│       <Request access>  <Configure>  <Reserve>          │ 单一强调色 CTA
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

## 行业选型矩阵（5 布局 × 5 行业）

| 布局 | 奢侈 | 汽车 | 航天 | 房产 | 视听 |
|---|---|---|---|---|---|
| **L1 full-bleed-hero** | 静态大图 + 米白底 | 暗色 + 摄影 | 渐变 + 渲染 | 自然光 + 空间 | 暗色 + 金属 |
| **L2 scroll-story** | 工艺细节图 | 概念车 + 数字 | 玻璃 + 数据 | 户型 + 周边 | 材质 + 频响 |
| **L3 spec-section** | 几乎不放 | 满数字（核心）| 规格 + 高度 | 面积 + 位置 | 频响 + 功率 |
| **L4 image-gallery** | 编辑式瀑布 | 概念车三视图 | 渲染图水平 | 空间摄影 | 产品图瀑布 |
| **L5 footer-cta** | "Discover more" | "Configure" | "Reserve" | "Inquire" | "Reserve" |

---

## 与 native-app 5 布局的差异

| premium-showcase | native-app |
|---|---|
| L1 100vh 满屏 | L1 master-detail（iOS）|
| L2 sticky 大图 + scroll 文字 | L2 tab-root（嵌套 stack）|
| L3 数字 + Mono 杂志内页 | L3 modal-flow（全屏表单）|
| L4 摄影集瀑布 / 水平 | L4 split-view（iPad）|
| L5 询价 footer | L5 splash + onboarding |

---

## 当前状态

| 布局 | 详细稿 | 状态 |
|---|---|---|
| l1-full-bleed-hero | [l1-full-bleed-hero.md](./l1-full-bleed-hero.md) | 🔴 待建（P1-B）|
| l2-scroll-story | [l2-scroll-story.md](./l2-scroll-story.md) | 🔴 待建（P1-B）|
| l3-spec-section | [l3-spec-section.md](./l3-spec-section.md) | 🔴 待建（P1-B）|
| l4-image-gallery | [l4-image-gallery.md](./l4-image-gallery.md) | 🔴 待建（P1-B）|
| l5-footer-cta | [l5-footer-cta.md](./l5-footer-cta.md) | 🔴 待建（P1-B）|

> P1-A 阶段仅完成 README 骨架（本文），P1-B 阶段补 5 份详细布局稿 + 1 个 verification 真实项目。
