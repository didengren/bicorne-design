# Consumer & Lifestyle Brands — 品牌设计参考

> 覆盖 6 个消费/生活方式品牌（Spotify / Apple / Tesla / Starbucks / PlayStation / SpaceX）。本目录是 **消费产品 / 内容平台 / 产品展示 / 营销品牌**类项目的首选参考库——尤其 **Spotify 暗色沉浸**（音乐/内容标杆）· **Apple 摄影优先 + 极简 UI**（消费电子标杆 · ps-2-vision-pro 旗舰）· **Tesla 产品摄影驱动**（汽车展示标杆 · ps-1-tesla-cinematic 旗舰）· **PlayStation 三面交替 + PS Blue 药丸**（游戏标杆）4 大调性。

---

## 索引

| 品牌 | 状态 | 风格摘要 |
|---|---|---|
| [Spotify](./spotify-DESIGN.md) | 🟢 已落地 | 暗色沉浸 + 内容优先 + 药丸按钮 |
| [Apple](./apple-DESIGN.md) | 🟢 已落地 | 摄影优先 + 极简 UI + 单蓝 CTA（**ps-2-vision-pro 旗舰**） |
| [Tesla](./tesla-DESIGN.md) | 🟢 已落地 | 产品摄影驱动 + 近零装饰 + 电动蓝（**ps-1-tesla-cinematic 旗舰**） |
| [Starbucks](./starbucks-DESIGN.md) | 🟢 已落地 | 四级绿品牌系统 + SoDoSans + 暖奶油画布 + 全药丸按钮 |
| [PlayStation](./playstation-DESIGN.md) | 🟢 已落地 | 三面交替 + PS Blue 药丸 + SST Light 300 + 游戏视觉 |
| [SpaceX](./spacex-DESIGN.md) | 🟢 已落地 | 全屏电影摄影 + D-DIN 大写 + 幽灵按钮 + 零装饰 |

> **状态说明**：本目录与 `aerospace/` 共享 SpaceX（按主流消费品牌 vs 商业航天不同视角分类）。

---

## 与 8 类别平台关系

| 类别 | 关系 |
|---|---|
| `premium-showcase/` | Apple ps-2 / Tesla ps-1 是本目录的旗舰落地（cinematic scroll） |
| `landing-pages/` | Apple / Tesla / Starbucks 营销落地页常引用 |
| `mobile-web/` | Spotify / Pinterest 移动 H5 风格直接对应 |

---

## 通用调性（本目录品牌共性）

| 维度 | 标准 |
|---|---|
| **Theme** | 暗色为主（Spotify / PlayStation / SpaceX）/ 亮色为辅（Apple / Tesla / Starbucks） |
| **Typography** | Sans 极薄（300 字重）· Apple SF Pro / Tesla custom / Starbucks SoDoSans |
| **Photography** | ≥ 70% viewport · full-bleed · 极少装饰 |
| **CTA** | 1-2 个 / 全页 · 单色 accent（极克制） |
| **Easing** | 优雅 · 400-1200ms（cinematic · 慢节奏） |
| **Whitespace** | section 间距 96-200px（极宽） |

---

## 字体标注（v2.12 Task 8.1 · 4 字段）

> 本目录字体策略最分散：Apple SF Pro / Tesla custom / Starbucks SoDoSans / PlayStation SST 都是商业字体。开源替代推荐如下：

| 字段 | 推荐值 | 备选 |
|---|---|---|
| **主字体（display + body）** | Inter Variable（300 字重 · 替代 SF Pro） | SF Pro Display（macOS 原生 · 仅限苹果设备）/ system-ui |
| **备选字体（display 特化）** | Archivo / Playfair Display | SF Pro Display / GT Sectra / Söhne（商业） |
| **Mono（spec / 价格 / 数字）** | JetBrains Mono | SF Mono / Roboto Mono / IBM Plex Mono |
| **CJK fallback** | Noto Sans SC（body） + Noto Sans Mono CJK SC（mono） | 苹方-简（macOS）/ 思源黑体 / Sarasa Mono SC |
| **推荐下载链接** | [Google Fonts: Inter](https://fonts.google.com/specimen/Inter) · [JetBrains Mono](https://www.jetbrains.com/lp/mono/) · [Google Fonts: Noto Sans SC](https://fonts.google.com/noto/specimen/Noto+Sans+SC) · [Apple Developer: SF Pro](https://developer.apple.com/fonts/) | 商业授权备选：SF Pro（Apple 内部授权）/ GT Sectra（Grilli Type）/ Söhne（Klim） |

**fontDisplay 策略**：`swap` —— Inter 300 字重 ~22KB，swap 即可；CJK 字体需 unicode-range subset。

**premium-showcase 排版要点（ps-1 / ps-2 落地）**：
- ps-1 Tesla 用 OLED 暗色 + Söhne 300（开源替代：Inter Variable 300）
- ps-2 Apple Vision Pro 用 light 主题 + SF Pro Display（开源替代：Inter Variable 300）
- 大标题字号 80-120px · letter-spacing -3px ~ -4px（极紧）
- section 间距 120-200px（cinematic 长滚动）

---

## 关联

- 上一级目录：[`../INDEX.md`](../INDEX.md)（brand-library 总索引）
- 上一级分类：[`../../premium-showcase/README.md`](../../premium-showcase/README.md)（ps-1 / ps-2 旗舰落地区）