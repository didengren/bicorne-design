# Luxury & Lifestyle Brands — 品牌设计参考

> **v1.8 行业首落地**：覆盖高端时装 / 腕表 / 高端家电 / 豪华汽车子集（不与 `automotive/` 重复的豪华车款）。本目录是 `premium-showcase` 类别（cinematic / photography-led）的核心品牌库——尤其 **photography ≥ 70% viewport** / **serif 主导 typography** / **极简 CTA（1-2 个/全页）** / **询价式 footer** 4 大调性。
>
> **v1.8 实际 verification**：`ps-3-hermes-bo-luxury`（Hermès + Bang & Olufsen maison）已建仓完成，引用本目录的 Hermès + B&O 风格，warm-light 主题（米驼 canvas `#F4EFE6` + 焦糖 accent `#A0522D` + Playfair Display Serif），与 ps-1（Tesla OLED dark）+ ps-2（Apple Vision Pro cool light）形成 premium-showcase 三角对照矩阵。详见 `../../premium-showcase/verification/ps-3-hermes-bo-luxury/`。

---

## 索引

| 品牌 | 子类别 | 状态 | 风格摘要 |
|---|---|---|---|
| Hermès | 高端时装 / 皮具 | 🟢 已落地 | 米驼色 canvas + 焦糖 accent + serif 大写 + 摄影 80% viewport → `ps-3-hermes-bo-luxury` |
| Bang & Olufsen | 高端家电 / 音频 | 🟢 已落地 | 极简北欧 + 铝金属 + 黑白灰 + 摄影 75% viewport + sans ultra-thin → `ps-3-hermes-bo-luxury` |
| Aston Martin | 豪华 GT 汽车 | 🔴 待建 | 英国赛车绿 #00665e + 香槟金 accent + serif 衬线 + cinematic 滚动 |
| Rolls-Royce | 顶级豪华汽车 | 🔴 待建 | 纯黑 #0a0a0a + 银镀铬 accent + serif 极致 + ultra-wide 摄影 90% viewport |
| Rolex | 顶级腕表 | 🔴 待建 | 翡翠绿 + 金 + serif 衬线 + 摄影 70% + 询价式 footer |
| Bottega Veneta | 高级时装 / 皮具 | 🔴 待建 | 沙色 + 编织纹理 + 极简 sans + 摄影 75% |

> **状态说明**：v1.7 阶段仅建索引（**6 个品牌名 + 风格摘要**），具体 `*-DESIGN.md` 详细规范待 v1.8+ 按需沉淀。**优先级**：Hermès（ps-3 候选）/ Aston Martin（ps-3 候选）/ Bang & Olufsen（ps-3 候选）> 其他。

---

## 与其他行业目录的边界

| 行业 | 覆盖 | 与 luxury 的边界 |
|---|---|---|
| `automotive/` | 大众豪华 / 跑车（BMW / Ferrari / Lamborghini / Tesla） | luxury 收口"非汽车"高端品类（时装 / 腕表 / 家电）+ "汽车行业内的顶级 GT 款"（Aston Martin / Rolls-Royce） |
| `consumer-lifestyle/` | 主流消费品牌（Apple / PlayStation / SpaceX / Spotify / Starbucks / Tesla） | luxury 收口"**非大众**"高端品类（Hermès / Rolex / Bottega Veneta） |
| `developer-tools/` / `enterprise-saas/` / `fintech/` / `ai-llm/` | 数字工具 / 金融 / AI | 不重叠 |

---

## 与 premium-showcase 类别关系

`premium-showcase` 类别（MVI 5 组件契约 + 5 layouts + 10 pitfalls）的 verification 案例优先用本目录品牌作为灵感源：

- **ps-1-tesla-cinematic** ← Tesla (consumer-lifestyle) + Aston Martin (本目录) + B&O (本目录)
- **ps-2-apple-vision-pro** ← Apple (consumer-lifestyle) + B&O (本目录) + Sonos
- **ps-3 (v1.8 已建仓 · `ps-3-hermes-bo-luxury`)** ← Hermès (本目录) + B&O (本目录) + Bottega Veneta (本目录) — **🟢 已落地**
- **ps-4 (v1.8 候选)** ← Rolls-Royce (本目录) + Aston Martin (本目录) — 顶级豪华汽车对照
- **ps-5 (v1.8 候选)** ← B&O 完整 DESIGN.md (本目录) + Sonos + Apple HomePod — 家电/音频专项

---

## 通用调性（本目录品牌共性）

| 维度 | 标准 |
|---|---|
| **Photography** | ≥ 70% viewport · full-bleed · editorial composition |
| **Typography** | Serif 主导（display）/ Sans 副（body）/ Mono 数字（specs） |
| **CTA 数量** | 1-2 个/全页（克制） |
| **Easing** | 慢 · 长 · 1.2s `cubic-bezier(0.16, 1, 0.3, 1)` |
| **Whitespace** | section 间距 120-200px（极宽） |
| **Theme** | 暗色为主（OLED 友好）/ 部分 light 主题（Hermès / Bottega Veneta） |
| **Footer CTA** | 询价式（mailto + 不显示价格） |
| **Letter-spacing** | 大标题 -0.04em ~ -0.05em 收紧 |
| **LCP** | AVIF / WebP / `loading="eager"` hero |
| **Motion** | 入场 1.1-1.2s · scroll-hint 循环 2s |

---

## 字体标注（v2.12 Task 8.1 · 4 字段）

> 配合 `ps-3-hermes-bo-luxury` 落地。所有 token.json 的 `fontFamilies` 三段（display/body/mono）+ CJK fallback 必须遵循下表：

| 字段 | 推荐值 | 备选 |
|---|---|---|
| **主字体（display serif）** | Playfair Display | Cormorant Garamond / Source Serif 4 / GT Sectra（如预算允许） |
| **备选字体（body sans）** | Inter Variable | SF Pro Display（macOS/iOS）/ Helvetica Neue |
| **CJK fallback** | Noto Serif SC（display） + Noto Sans SC（body） | 思源宋体 / 苹方-简（macOS）/ 思源黑体 |
| **Mono 数字（spec）** | JetBrains Mono | GT America Mono / SF Mono / Roboto Mono |
| **推荐下载链接** | [Google Fonts: Playfair Display](https://fonts.google.com/specimen/Playfair+Display) · [Google Fonts: Inter](https://fonts.google.com/specimen/Inter) · [Google Fonts: Noto Serif SC](https://fonts.google.com/noto/specimen/Noto+Serif+SC) · [JetBrains Mono](https://www.jetbrains.com/lp/mono/) | 商业授权备选：GT Sectra（Grilli Type）/ Söhne（Klim Type Foundry） |

**fontDisplay 策略**：`swap` —— Playfair Display 体积较大（拉丁 ~80KB / subset 后 ~30KB），必须 swap 避免 FOIT；CJK fallback 必须 unicode-range 拆分子集，避免主字体 fallback 时显示回退框。

---

## 关联

- 上一级目录：[`../INDEX.md`](../INDEX.md)（brand-library 总索引）
- 上一级分类：[`../../premium-showcase/README.md`](../../premium-showcase/README.md)（premium-showcase 类别 MVI）
- 上一级方法论：[`../../methodology/animation-matrix.md`](../../methodology/animation-matrix.md)（跨类别动画曲线）
