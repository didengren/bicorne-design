# Media Brands — 品牌设计参考

> 覆盖 2 个媒体品牌（The Verge / WIRED）。本目录是 **科技媒体 / 编辑内容 / 杂志美学**类项目的首选参考库——尤其 **The Verge 暗色编辑 + 酸薄荷/紫外双色 + Manuka 107px + 色块叙事**（科技媒体标杆）· **WIRED 纸白新闻密排 + WiredDisplay 衬线 + WiredMono 大写 + 2px 硬边框**（科技文化媒体标杆）2 大调性。

---

## 索引

| 品牌 | 状态 | 风格摘要 |
|---|---|---|
| [The Verge](./theverge-DESIGN.md) | 🟢 已落地 | 暗色编辑 + 酸薄荷/紫外双色 + Manuka 107px + 色块叙事 |
| [WIRED](./wired-DESIGN.md) | 🟢 已落地 | 纸白新闻密排 + WiredDisplay 衬线 + WiredMono 大写 + 2px 硬边框 |

---

## 与 8 类别平台关系

| 类别 | 关系 |
|---|---|
| `documentation/` | 编辑式文档常引用 WIRED / The Verge 风格 |
| `landing-pages/` | 媒体类营销落地页常引用 |
| `premium-showcase/` | 编辑式排版与 ps-1 / ps-2 部分重合 |

---

## 通用调性（本目录品牌共性）

| 维度 | 标准 |
|---|---|
| **Theme** | 暗色（The Verge）/ 纸白（WIRED）双轨 |
| **Typography** | Serif display（Manuka / WiredDisplay）+ Sans body + Mono 大写 |
| **Color Block** | 大面积单色段落 + 强调色块（The Verge 标志）· 2px 硬边框（WIRED 标志） |
| **Editorial** | 大字号标题（80-120px）+ 密排正文 + 强对比 |
| **Easing** | 慢 · 400-800ms（编辑式节奏） |
| **Whitespace** | section 间距 64-120px（紧凑编辑） |

---

## 字体标注（v2.12 Task 8.1 · 4 字段）

> 本目录字体策略：**The Verge 用商业自研 Manuka · WIRED 用 WiredDisplay 衬线 + WiredMono**。开源替代推荐如下：

| 字段 | 推荐值 | 备选 |
|---|---|---|
| **主字体（display serif）** | Playfair Display（替代 Manuka / WiredDisplay） | Source Serif 4（开源 · Adobe）/ GT Sectra（商业 · Grilli Type）/ Manuka（商业 · The Verge 内部） |
| **备选字体（body sans）** | Inter Variable 400-500 | SF Pro Display / Söhne（商业）/ Helvetica Neue / Roboto |
| **Mono（大写 spec / 副标）** | JetBrains Mono（`text-transform: uppercase` + `letter-spacing: 0.05em`） | SF Mono / Roboto Mono / IBM Plex Mono / WiredMono（商业 · WIRED 内部） |
| **CJK fallback** | Noto Serif SC（display serif） + Noto Sans SC（body） + Noto Sans Mono CJK SC（mono） | 思源宋体 / 苹方-简 / 思源黑体 / Sarasa Mono SC |
| **推荐下载链接** | [Google Fonts: Playfair Display](https://fonts.google.com/specimen/Playfair+Display) · [Google Fonts: Source Serif 4](https://fonts.google.com/specimen/Source+Serif+4) · [Google Fonts: Inter](https://fonts.google.com/specimen/Inter) · [JetBrains Mono](https://www.jetbrains.com/lp/mono/) | 商业授权备选：GT Sectra（Grilli Type）/ Söhne（Klim）/ WiredMono（WIRED 内部） |

**fontDisplay 策略**：`swap` —— Playfair Display ~80KB / Source Serif 4 ~60KB，swap 即可避免 FOIT；CJK 字体必须 subset。

**媒体类排版要点**：
- 编辑式大标题 80-120px · letter-spacing -3px ~ -5px（极紧）
- 副标题 Mono + uppercase + letter-spacing 0.05em（WIRED 风）
- 2px 硬边框 `border: 2px solid currentColor` · 无圆角
- 文章正文 18-20px 行高 1.6 · 最大宽度 680-720px（可读性）

---

## 关联

- 上一级目录：[`../INDEX.md`](../INDEX.md)（brand-library 总索引）
- 上一级方法论：[`../../references/methodology/typography.md`](../../references/methodology/typography.md)（排版方法论 · 编辑式排版专题）