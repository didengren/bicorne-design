---
name: premium-showcase
description: Premium-showcase / luxury-and-automotive editorial category workspace — Apple Vision Pro / Tesla / Aston Martin / Hermès editorial style. Photography-first, full-bleed hero, restrained typography (serif lead), cinematic scroll, minimal CTA, restrained motion. Distinct from saas-marketing (B2B conversion-optimized) and landing-pages (single-product B2C funnel).
keywords: premium, luxury, automotive, aerospace, editorial, photography-first, full-bleed, cinematic, scroll-storytelling, serif, restrained-motion
---

# Premium Showcase — Category Workspace (MVI)

> 本目录是 **Premium Showcase / 高端展示型** 类别专题：**摄影优先 + 编辑式排版 + 电影化滚动 + 极简 CTA** 的品牌展示页。
>
> **关键区分**：Premium Showcase 是**内容驱动 + 情感传递 + 品牌资产展示**（摄影 + 字体 + 留白三件套）；SaaS Marketing 是**转化驱动 + 卖点 + 价格**（功能 + 试用 + 定价表）；Landing Pages 是**单产品漏斗 + 倒计时 + 紧迫感**。边界详见 [§ 与其他类别的边界](#与其他类别的边界)。

---

## 何时进入本目录

| 信号 | 必读路径 |
|---|---|
| 用户说"做一个奢侈品 / 汽车 / 航天 / 房地产的展示页" | 本目录 |
| 需要 **Apple Vision Pro / Tesla / Hermès / Aston Martin / Bang & Olufsen** 风格参考 | 本目录 |
| 项目是**摄影资产驱动**（高清产品图 / 概念图 / 空间摄影） | 本目录 |
| 滚动主导的 **editorial / cinematic** 长页（3-7 个 section） | 本目录 |
| 字体方案含 **serif 主导**（GT Sectra / Tiempos / Tobias / Söhne Mono） | 本目录 |
| **B2B SaaS 转化漏斗**（功能 + 试用 + 定价） | 不要来，去 `../saas-marketing/` |
| **单产品 DTC 漏斗**（Hero + 倒计时 + 下单） | 不要来，去 `../landing-pages/` |
| **后端 / 内部工具** | `../admin-panels/` |
| **数据可视化大屏** | `../dashboards/` |
| **移动 H5 / 原生 App** | `../mobile-web/` `../native-app/` |

---

## 通用方法论（跨类别）

| 主题 | 通用层文件 | 本类别文件 |
|---|---|---|
| Typography | [`../references/methodology/typography.md`](../references/methodology/typography.md) | Serif 主导 + Sans 副 + Mono 数据；tracking 收紧（-0.02em ~ -0.04em） |
| 性能预算 | [`../references/methodology/performance-budget.md`](../references/methodology/performance-budget.md) | 摄影 LCP ≤ 2.5s（AVIF/WebP + blurhash 占位）+ 60fps 滚动 |
| 暗色模式 | （待抽取） | 暗色优先（OLED 友好），高对比度 21:1 |
| 无障碍 | （待抽取） | 不依赖纯色对比传达层级（用字体粗细 + 字号） |
| 📚 方法论总索引 | [`../references/methodology/INDEX.md`](../references/methodology/INDEX.md) | — |

---

## 与其他类别的边界

| 维度 | Premium Showcase (本目录) | SaaS Marketing | Landing Pages |
|---|---|---|---|
| **目标** | **品牌资产 + 情感 + 地位** | 转化 + 试用 + 付费 | 单产品 + 紧迫感 + 下单 |
| **主导媒介** | **摄影（70%）+ 排版（20%）+ 留白（10%）** | 文案（40%）+ 截图（30%）+ 插图（30%）| 产品图（50%）+ 卖点（30%）+ 价格（20%）|
| **滚动长度** | **3-7 屏长 scroll** | 5-10 屏 | 1-3 屏（漏斗式） |
| **CTA 密度** | **1-2 个 / 全页**（克制） | 3-5 个 / 屏 | 2-3 个 / 屏 |
| **字体** | **Serif 主导**（GT Sectra / Tiempos）| Sans 主导（Inter / Geist）| Sans 主导（粗体） |
| **主色** | **黑（OLED 友好）+ 中性灰 + 1 强调色** | 品牌主色 + 中性 | 品牌主色 + 高饱和高亮 |
| **动画** | **慢 + 长 easing**（1.2s ease-out-expo） | 中 + 标准 easing | 快 + 弹性 spring |
| **数据** | **不强调**（奢侈品/汽车少放数字） | 强调（功能数 / 用户数）| 强调（价格 / 折扣）|
| **价格** | **隐藏 / 询价式** | 显示 / 三档定价 | 显式 / 倒计时 |
| **摄影占比** | **70-90% viewport** | 20-40% viewport | 30-50% viewport |
| **留白** | **极宽**（section 间距 120-200px） | 中等（40-80px） | 紧凑（24-48px） |
| **表单** | **零**（mailto / 预约） | 中（3-5 字段） | 多（地址 / 支付） |
| **目标用户** | **品牌 + 高净值 + 媒体** | PM / 决策者 / 团队 | 终端消费者 |

---

## 目录结构（MVI）

```
premium-showcase/
├── README.md                       ← 你在这里
├── meta-prompt.md                  ← PHASE 4 预检：行业 / 摄影 / 字体 / 滚动
│
├── # 组件层（premium-showcase 核心 5 件套）
├── component-contract/
│   ├── README.md
│   ├── hero-cta.md                 ★ Full-bleed Hero（100vw × 100vh 摄影 + 极简文案）
│   ├── feature-row.md              ★ Editorial Feature（左右分栏：大图 + 文字块 + tracking 收紧）
│   ├── spec-sheet.md               ★ Spec Sheet（数字 + Mono 字体 + 大留白 · 像杂志内页）
│   ├── image-gallery.md            ★ Image Gallery（瀑布 / 横向滚动 / 全屏 lightbox）
│   └── footer-cta.md               ★ Footer + Final CTA（mailto / "Request access" 询价式）
│
├── # 布局层
├── layouts/
│   ├── README.md
│   ├── l1-full-bleed-hero.md       ★ 首屏 100vh 摄影 + 居中 logo + 滚动指示
│   ├── l2-scroll-story.md          ★ 滚动驱动叙事（3-5 段 cinematic · sticky scroll）
│   ├── l3-spec-section.md          ★ 数字 + Mono + 大留白（汽车 / 航天规格表）
│   ├── l4-image-gallery.md         ★ 摄影集（瀑布 / 横向 / 全屏 lightbox）
│   └── l5-footer-cta.md            ★ Footer + "Request access" / "Configure" / "Enquire"
│
├── # 经验层
├── pitfalls/                       ★ premium-showcase 常见反模式（10 条）
│   └── README.md
│
└── # Token → Tailwind 桥
    └── tailwind-bridge/
        └── README.md
```

---

## Premium Showcase 骨架（典型 5 段滚动结构）

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│            <Full-bleed Hero 100vh 摄影>                  │  L1
│                  ↓ scroll indicator                      │
├──────────────────────────────────────────────────────────┤
│                                                          │
│         <Editorial Feature 左右分栏 + 大留白>           │  L2
│       <大图 60%  |  文字 40%  ·  200px 留白>            │
│                                                          │
├──────────────────────────────────────────────────────────┤
│                                                          │
│            <Spec Sheet · Mono 数字 · 大留白>             │  L3
│   <450 NM    |   0-100  3.2s    |   600 KM RANGE>        │
│                                                          │
├──────────────────────────────────────────────────────────┤
│                                                          │
│       <Image Gallery 瀑布 / 横向 / 全屏 lightbox>         │  L4
│                                                          │
├──────────────────────────────────────────────────────────┤
│                                                          │
│            <Footer + "Request access" 询价式>            │  L5
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

## 平台 Token namespace

| 行业 | 推荐字体 | Token prefix | 主色基调 | 摄影风格 |
|---|---|---|---|---|
| 奢侈品（Hermès / LV）| GT Sectra + Söhne | `ps-` | 黑白 + 米色 + 1 强调色（品牌）| 编辑式 / 工作室 / 自然光 |
| 汽车（Tesla / Aston Martin）| Tiempos + Söhne Mono | `ps-auto-` | 暗色 OLED + 1 高亮（电光蓝 / 竞速红）| 工业 / 概念车 / 极端角度 |
| 航天 / 科技（SpaceX / Apple Vision）| Söhne + GT America Mono | `ps-aero-` | 暗色 + 渐变蓝紫 + 全息 | 渲染 / 太空 / 透明材质 |
| 房地产 / 酒店（Aman / Sotheby's）| GT Super + Söhne | `ps-rea-` | 米白 + 深木色 + 1 强调 | 空间 / 自然光 / 极简 |
| 视听（Bang & Olufsen / Devialet）| GT Sectra + Söhne Mono | `ps-av-` | 暗色 + 金属灰 + 1 高亮 | 工业 / 极简 / 反光材质 |

---

## Verification 索引

> **v1.6 状态**：建仓阶段，暂无真实 verification 项目。`e2e --category premium-showcase` 待 e2e-validate.sh 扩展。
> 目标 P1-B 阶段建第一个 verification `ps-1-tesla-model-x-cinematic`（Tesla Model X 风格全屏滚动 + 数字 spec sheet + 询价式 footer）。

| Verification | 行业 | 主题 | 状态 |
|---|---|---|---|
| （规划 `ps-1-tesla-cinematic`）| 汽车 / Tesla | 滚动驱动 · 数字 spec sheet · 询价 footer | 🔴 待建（P1-B） |
| （规划 `ps-2-apple-vision-pro`）| 航天 / Apple | 玻璃质感 · 渐变蓝紫 · 空间计算 | 🔴 待建（P3） |
| （规划 `ps-3-hermes-editorial`）| 奢侈品 / Hermès | serif 主导 · 米白底 · 编辑式排版 | 🔴 待建 |

---

## Verification 计划

| Verification | 行业 | 主题 | 优先级 |
|---|---|---|---|
| `ps-1-tesla-cinematic` | 汽车 / Tesla | 滚动驱动 + 数字 spec sheet + 询价 footer | **P1** |
| `ps-2-apple-vision-pro` | 航天 / Apple | 玻璃质感 + 渐变蓝紫 + 空间计算 | P2 |
| `ps-3-hermes-editorial` | 奢侈品 / Hermès | serif 主导 + 米白底 + 编辑式排版 | P2 |

> 与 mobile-web/native-app 不同：premium-showcase verification 跑在 **Web + 桌面优先 1440+ viewport**（滚动主导 + 摄影满屏），不是 390 移动。`screenshots/` 存 1440 / 1920 / 2560 三档桌面宽度。

---

## 必读通用方法论清单

按读序：

1. [Typography 通用层](../references/methodology/typography.md) — 字体选型章节含 GT Sectra / Tiempos / Söhne
2. [性能预算通用层](../references/methodology/performance-budget.md) — 第 2 节"LCP 优化"含 AVIF / blurhash / 摄影预加载
3. [Animation Matrix](../dashboards/animation-matrix.md) — 19 条曲线中 **ease-out-expo** / **ease-in-out-quart** 适合 cinema scroll
4. [nav-footer 通用层](../references/methodology/nav-footer.md) — 4-5 列 footer 详细布局参考

---

## 缺失 / 待办（透明说明）

- 🔴 **0 个 verification 真实项目**：P1-B 阶段建 `ps-1-tesla-cinematic`
- 🔴 **0 份组件契约详细稿**：本 README 仅占位 + 索引，5 份详细稿在 P1-B 阶段落
- 🔴 **0 份 layouts 详细稿**：同上，P1-B 阶段落
- 🔴 **0 条 pitfalls 详细稿**：本 README 占位骨架，P1-B 阶段补 10 条
- 🟡 **e2e --category premium-showcase 待扩展**：e2e-validate.sh 需新增 case（5 REQUIRED_COMPONENTS + REQUIRED_MOCK_EXPORTS + PORT_DEFAULT）
- 🟡 **未抽取"摄影优化通用方法论"**：AVIF / WebP / blurhash / srcset 通用化在 v1.7+ 计划
- 🟡 **未抽取"滚动驱动叙事"通用方法论**：sticky scroll / scroll-triggered animation 跨多家参考
