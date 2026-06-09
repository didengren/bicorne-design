# Premium Showcase — Meta Prompt (PHASE 4 预检清单)

> 本文件是 PHASE 4 实施前**必读**的预检清单。AI agent 在生成任何 premium-showcase 组件 / 页面 / token 前，必须先回答下列问题，并明确写出来。

---

## 0. 五问（必答）

> 不确定就**问用户**，不要猜。

### Q1. 行业选型

| 行业 | 触发信号 | 必走路径 |
|---|---|---|
| **奢侈品** | Hermès / LV / Dior / Bottega Veneta | 黑白 + 米色 + serif 主导 · 编辑式 |
| **汽车** | Tesla / Aston Martin / Porsche / Lucid | 暗色 OLED + 数字 spec + cinematic |
| **航天 / 空间计算** | SpaceX / Apple Vision Pro / Blue Origin | 渐变蓝紫 + 玻璃质感 + 渲染图 |
| **房地产 / 酒店** | Aman / Sotheby's / Auberge | 米白 + 深木 + 空间摄影 |
| **视听 / 工业** | Bang & Olufsen / Devialet / Dyson | 暗色 + 金属 + 反光材质 |
| **钟表** | Patek Philippe / Audemars Piguet / Rolex | 黑 + 金 + 微距 |

### Q2. 摄影资产是否就绪

> ⚠️ **premium-showcase 的成败 80% 取决于摄影**。没有合格摄影，再多 token 也救不回来。

| 情况 | 选 |
|---|---|
| **摄影就绪**（专业图 ≥ 5 张）| 走完整 L1-L5 滚动结构 |
| **有占位图**（Unsplash / 抽象图）| 走 L1 + L5 简化结构，stub L2-L4 |
| **完全无图** | 不要来，走 `../landing-pages/`（图标 + 渐变可补救）|

### Q3. 字体方案

| 字体组合 | 适用 |
|---|---|
| **GT Sectra / Tiempos Headline** + Söhne / Inter Body | 奢侈 / 房产（serif 主导，editorial）|
| **Söhne / Inter** Display + **GT America Mono** 数字 | 汽车 / 科技（sans 主导，数字 spec）|
| **Tobias** Display + **Söhne** Body | 极简 / 北欧 |
| **Migra** Italic Display + **Söhne** Body | 时尚 / editorial |

> 字体来源：Fontshare（免费）/ Pangram Pangram（订阅）/ Klim Type Foundry（商业）。

### Q4. 滚动 / 动效策略

| 策略 | 适用 | 性能影响 |
|---|---|---|
| **平滑滚动 + scroll-triggered fade** | 90% 项目 | 中（IntersectionObserver）|
| **sticky scroll**（section 内 sticky 大图 + 滚动文字）| Tesla / Apple Vision 长 scroll | 高（transform 持续触发）|
| **parallax**（背景图 + 前景图速度差）| 概念车 / 房地产 | 高（多图 + 持续 transform）|
| **horizontal scroll**（section 内水平滚动图组）| 画廊 / 摄影集 | 中 |
| **不滚动**（5 屏静态 + 路由切换）| Aman / B&O（极简）| 零 |

### Q5. 验证载体（本 skill 范围）

> 本 skill 的 verification 跑在 **Web + 桌面优先**（Vite + Vue 3 + 1440 viewport），用于在 Web 端预览高端展示页形态。

| 情况 | 选 |
|---|---|
| 团队**有** Webflow / Framer / Next.js 工程 | 用工程截图，README 链回 |
| 团队**无** 工程 / 纯 PM 评审 | 用本 skill Web verification（推荐） |

---

## 1. PHASE 1-3 通用方法论加载

> 这些**与本类别无关**，按 references/INDEX.md 决策树顺序加载即可。

- [x] references/INDEX.md § 🧭 AI Agent 决策树
- [x] references/brand-library/ — 选 1 个摄影优先品牌（如 Apple Vision Pro / Tesla / Hermès）参考 DESIGN.md
- [x] references/methodology/typography.md — 字体选型章节含 GT Sectra / Tiempos / Söhne
- [x] references/methodology/performance-budget.md — LCP 优化章节（AVIF / WebP / blurhash）
- [x] references/methodology/nav-footer.md — 4-5 列 footer 详细布局参考
- [x] references/token-mapping/mapping-rules.md — token 命名规范

---

## 2. 行业规范加载

> 加载顺序：**先选定行业（Q1）→ 加载对应品牌 DESIGN.md → 派生 token**。

### 2.1 摄影规范（必读）

| 章节 | 来源 | 关键规则 |
|---|---|---|
| 摄影尺寸 | Unsplash / 摄影师交付 | 至少 **2400px 宽**（Retina @2x + 滚动视差）|
| 格式 | WebP / AVIF | WebP 80% quality · AVIF 60% quality · fallback JPEG |
| LQIP 占位 | blurhash / ThumbHash | **blurhash 4×3 字符** 编译期生成 |
| srcset | `<img srcset>` | 640 / 1024 / 1920 / 2560 四档 |
| loading | `loading="lazy"` + `decoding="async"` | 首屏图 eager · 其余 lazy |

### 2.2 字体加载（必读）

| 策略 | 关键规则 |
|---|---|
| **self-host** | Fontshare / Klim 字体本地化（不引 Google Fonts CDN）|
| **font-display: swap** | 避免 FOIT（FOIT 会让品牌感全无）|
| **preload 关键字体** | `<link rel="preload" as="font">` for Display |
| **subset** | 拉丁 + 拉丁扩展（不做中日韩 subset，西文够用）|
| **variable font 优先** | 单 woff2 覆盖多 weight（如 Inter Variable）|

### 2.3 滚动 / 动效（必读）

| 来源 | URL | 关键规则 |
|---|---|---|
| Apple HIG Motion | developer.apple.com/design/human-interface-guidelines/motion | **ease-out-expo** + **0.8-1.2s** 长缓动 |
| Material 3 Motion | m3.material.io/styles/motion | emphasized easing + container transform |
| GSAP ScrollTrigger | gsap.com/scrolltrigger | 业界标准 · 注意 license |
| Framer Motion | framer.com/motion | React 生态 · 注意 bundle size |

---

## 3. Token 派生

### 3.1 通用 → token.json（以汽车 / Tesla 风格为例）

```json
{
  "colors": {
    "bg": "#000000",                    // OLED 友好纯黑
    "bg-elevated": "#0A0A0A",
    "surface-1": "#111111",
    "surface-2": "#1A1A1A",
    "border": { "subtle": "rgba(255,255,255,0.08)", "default": "rgba(255,255,255,0.12)" },
    "text": { "primary": "#FFFFFF", "muted": "rgba(255,255,255,0.7)", "dim": "rgba(255,255,255,0.4)" },
    "accent": { "primary": "#E82127", "primary-soft": "rgba(232,33,39,0.12)" },
    "semantic": { "danger": "#E82127", "success": "#12B76A" }
  },
  "fonts": {
    "display": ["Tiempos Headline", "serif"],   // 数字 + 大标题
    "body":    ["Söhne", "system-ui", "sans-serif"],
    "mono":    ["GT America Mono", "monospace"]  // 数字 spec
  },
  "fontSize": {
    "hero":    "clamp(3rem, 8vw, 7rem)",     // 48px → 112px
    "section": "clamp(2.25rem, 5vw, 4.5rem)", // 36px → 72px
    "body":    "1.125rem",                     // 18px（比一般大）
    "caption": "0.875rem"
  },
  "letterSpacing": {
    "tight":  "-0.04em",                       // 大字标题
    "normal": "0",
    "wide":   "0.04em"                         // 标签 / Mono
  },
  "spacing": {
    "section":   "clamp(80px, 12vw, 200px)",   // section 间距（极宽）
    "gutter":    "clamp(24px, 4vw, 80px)",     // 左右留白
    "stack":     "clamp(16px, 2vw, 32px)"
  },
  "radius":   { "none": 0, "sm": 2, "md": 4, "lg": 8, "xl": 16, "pill": 9999 },
  "shadows":  { "subtle": "0 1px 2px rgba(0,0,0,0.3)", "elevated": "0 24px 60px rgba(0,0,0,0.6)" },
  "easing":   { "expo-out": "cubic-bezier(0.16, 1, 0.3, 1)", "quart-in-out": "cubic-bezier(0.76, 0, 0.24, 1)" },
  "duration": { "fast": 200, "normal": 400, "slow": 800, "cinema": 1200 }
}
```

### 3.2 行业差异化（5 套 palette）

| 行业 | bg | text | accent | 字体主导 |
|---|---|---|---|---|
| 奢侈品 | `#FAF7F2` 米白 | `#1A1A1A` 接近黑 | 品牌 1 色 | serif (GT Sectra) |
| 汽车 | `#000000` 纯黑 | `#FFFFFF` 纯白 | 电光蓝/竞速红 | sans (Söhne) + Mono |
| 航天 | `#000000` 纯黑 | `#FFFFFF` | 渐变蓝紫 | sans (Söhne) |
| 房地产 | `#F5F0E8` 米白 | `#2C2418` 深木色 | 金/铜 | serif + sans |
| 视听 | `#0A0A0A` 暗灰 | `#FAFAFA` | 金属银/品牌色 | sans + Mono |

### 3.3 留白 / 摄影占比 强约束

| 维度 | premium-showcase | 备注 |
|---|---|---|
| Section 间距 | **80-200px**（clamp）| 比 SaaS Marketing 宽 3-5 倍 |
| 左右 gutter | **24-80px**（clamp）| 桌面极宽，移动收紧 |
| 摄影占 viewport | **60-100%** | 至少 1 个 section 是 100vh 满屏 |
| Hero 高度 | **100vh** | 首屏必满屏（不是 100% of content）|
| 行高（body） | **1.6-1.8** | 比一般宽松 0.2 |
| CTA 留白 | **周围 ≥ 200px** | "Request access" 按钮周围必须空旷 |
| Footer padding | **120-160px** | 比一般 footer 高 3 倍 |

---

## 4. 实施 checklist

> 在写第一个组件前必须勾完。

- [ ] **Q1 行业选型** 已答（奢侈 / 汽车 / 航天 / 房产 / 视听 / 钟表）
- [ ] **Q2 摄影资产** 已答（就绪 / 占位 / 不可用）
- [ ] **Q3 字体方案** 已答（serif / sans / mono 组合）
- [ ] **Q4 滚动策略** 已答（smooth / sticky / parallax / horizontal / 静态）
- [ ] **Q5 验证载体** 已答（真工程 / Web verification）
- [ ] **摄影规范** 已读（§ 2.1）
- [ ] **字体加载** 已读（§ 2.2，含 self-host + font-display: swap）
- [ ] **滚动 / 动效** 已读（§ 2.3）
- [ ] **token.json** 已生成（按 § 3.1 通用 + § 3.2 行业差异化）
- [ ] **tailwind.config.ts** 平台 namespace 已派生（`ps-` / `ps-auto-` / `ps-aero-` / `ps-rea-` / `ps-av-`）
- [ ] **5 件套组件**（HeroCta / FeatureRow / SpecSheet / ImageGallery / FooterCta）已通读
- [ ] **layouts/ 5 个布局** 已通读（full-bleed-hero / scroll-story / spec-section / image-gallery / footer-cta）
- [ ] **pitfalls/ 10 条** 已通读

---

## 5. 不做清单（out of scope）

> 这些**不在本 skill 范围**，需要时另开 skill。

- ❌ 摄影拍摄 / 后期 / 调色（需摄影师 / Capture One / Lightroom）
- ❌ 字体版权采购 / 字体工程（Fontshare / Klim / Pangram Pangram 平台）
- ❌ 3D 渲染 / WebGL（Three.js / R3F / Babylon.js 不在本目录）
- ❌ 视频制作 / 摄影集视频化（Premiere / DaVinci Resolve）
- ❌ Lottie / Rive 动画文件生产（.json / .riv 资产生产）
- ❌ 国际化（i18n）/ 本地化（l10n）的文案流水线
- ❌ 询价表单后端（mailto 即可，复杂表单走 `../landing-pages/`）
- ❌ SEO 落地页优化（premium-showcase 不重 SEO，重品牌资产）
- ❌ A/B 测试 / 转化漏斗分析（premium-showcase 转化目标是"留资"，不是"下单"）
- ❌ 移动端深度适配（premium-showcase 桌面优先 1440+，移动简化为 1-2 屏）

> 这些都是"内容 / 工程"层，本 skill 专注"设计语言 + 排版规范 + 滚动策略"层。
