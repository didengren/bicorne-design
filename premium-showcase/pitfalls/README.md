# Pitfalls — Premium Showcase 10 条反模式

> 本目录是 premium-showcase 类别的**经验层**。每条反模式描述一个常见错误，含 ❌ 反模式 / ✅ 正解 / 💥 后果 / 附录必做清单 4 段。
>
> 10 条反模式覆盖 4 大类：**摄影（P-1 ~ P-3）/ 排版（P-4 ~ P-6）/ 滚动（P-7 ~ P-8）/ 转化（P-9 ~ P-10）**。

---

## 4 大类速览

| 大类 | 反模式 | 占比 |
|---|---|---|
| 摄影 | P-1 未优化大图 / P-2 占位图 / P-3 摄影风格不统一 | 30% |
| 排版 | P-4 sans 主导 / P-5 字号过小 / P-6 行高过紧 | 30% |
| 滚动 | P-7 视差滥用 / P-8 首屏不满屏 | 20% |
| 转化 | P-9 CTA 过多 / P-10 倒计时 / 紧迫感 | 20% |

---

## P-1 · 摄影未优化 · LCP > 4s

> ⚠️ **premium-showcase 的 80% 视觉由摄影承担**，未优化的摄影 = 整个品牌资产的死刑。

**❌ 反模式**
```html
<!-- 直接 src JPEG，2560px 宽，3.5MB，首屏 LCP 8s -->
<img src="hero.jpg" />

<!-- 缺 srcset，所有设备都加载 2560px -->
<!-- 缺 loading="lazy"，首屏图无 eager -->
<!-- 缺 decoding="async"，主线程阻塞 -->
```

**✅ 正解**
```html
<img
  src="/img/hero-1024.avif"
  srcset="/img/hero-640.avif 640w,
          /img/hero-1024.avif 1024w,
          /img/hero-1920.avif 1920w,
          /img/hero-2560.avif 2560w"
  sizes="100vw"
  alt="Hero"
  loading="eager"
  fetchpriority="high"
  decoding="async"
  style="background: url('/img/hero-blurhash-4x3.jpg') center/cover"
/>
```

**💥 后果**
- LCP 8s → 用户 53% 跳出（Google 数据）
- 移动端 4G 下加载 12s，溢价用户直接离开
- OLED 屏幕大图未 AVIF 压缩 = 流量是 JPEG 3-4 倍

**附录必做清单**
- [ ] 首屏图 `<link rel="preload" as="image">`
- [ ] AVIF 优先 · WebP fallback · JPEG 兜底
- [ ] srcset 4 档（640 / 1024 / 1920 / 2560）
- [ ] loading="eager" + fetchpriority="high"（首屏）
- [ ] loading="lazy" + decoding="async"（非首屏）
- [ ] blurhash 4×3 字符占位（编译期生成）

---

## P-2 · 占位图 · Unsplash 风 vs 真实摄影

> ⚠️ **Unsplash 占位图会瞬间拉低品牌资产价值**。B&O 不会用 iPhone 拍的"咖啡杯"做 hero。

**❌ 反模式**
```html
<!-- 用 Unsplash 通用图 -->
<img src="https://unsplash.com/photos/random-lifestyle-coffee" />
```

**✅ 正解**
```html
<!-- 真实摄影（专业交付）或 -->
<!-- 高质量占位（3D 渲染 / 概念图 / 抽象渐变 + 摄影叠加）-->
<img src="/img/hero-3d-render.avif" alt="Concept" />
```

**💥 后果**
- Unsplash 通用图 → 用户一秒识别"占位"，信任崩塌
- 摄影风格不一致（混 Unsplash + 真实）→ 品牌断裂
- 多人种 / 多人设场景失控（Unsplash 种族比例失衡）

**附录必做清单**
- [ ] 5 张以上专业摄影（≥ 2400px 宽）
- [ ] 风格统一（同摄影师 / 同后期 / 同色温）
- [ ] 占位图 fallback 用"3D 渲染 / 渐变"不用 Unsplash 通用图
- [ ] 每张图有完整 alt（含场景描述 + 用途）

---

## P-3 · 摄影风格不统一 · 后期 / 色温 / 比例乱

> ⚠️ **5 张图 5 种风格 = 5 个品牌在打架**。

**❌ 反模式**
- 1 张暖色（橙黄）+ 1 张冷色（蓝青）+ 1 张高饱 + 1 张低饱
- 1 张横构图 + 1 张竖构图 + 1 张方形（不做适配直接放）
- 1 张居中构图 + 1 张三分构图 + 1 张满构图

**✅ 正解**
- 统一色温：选一种主色调（暖 / 冷 / 中性），所有图调一致
- 统一比例：所有 hero 用 16:9，feature 用 4:3，gallery 用 1:1
- 统一后期：同摄影师 + 同 Lightroom 预设 + 同白平衡

**💥 后果**
- 5 张图 5 种风格 → "东拼西凑的营销页"印象，溢价用户直接划走
- 比例不一致 → masonry 布局错位，修复成本高
- 色温不一致 → OLED 屏幕看起来像 5 个不同品牌

**附录必做清单**
- [ ] 选 1 个主色调（暖/冷/中性）+ 1 个次要色
- [ ] 5 张图来自同一摄影师 / 同一图库套系
- [ ] 统一后期预设（Lightroom / Capture One）
- [ ] 比例规范：hero 16:9 · feature 4:3 · gallery 1:1 · detail 3:2
- [ ] 视觉走查：把 5 张图缩略图排一排，2 秒内能识别是"同一品牌"

---

## P-4 · Sans 主导字体 · 缺 serif · 缺 editorial 感

> ⚠️ **premium-showcase 缺 serif = 缺 editorial 感 = 缺杂志感 = 缺品牌沉淀**。

**❌ 反模式**
- 全站 Inter / Geist
- 标题 / 正文 / 数字 全部 sans
- 缺字体档（hero / section / body / caption 都是同 weight）

**✅ 正解**
- 标题：serif 主导（GT Sectra / Tiempos / Tobias）
- 正文：sans 副（Söhne / Inter）
- 数字：Mono（GT America Mono / Söhne Mono）
- 三档齐全：Display 48-112px / Section 36-72px / Body 16-20px / Caption 12-14px

**💥 后果**
- 全 sans = "SaaS 模板感"，没有 editorial 沉淀
- 缺 Mono 数字 = spec sheet 段落"土气"，像 Excel 表格
- 字号不分档 = 视觉层级靠"颜色"区分，溢价用户一眼识别

**附录必做清单**
- [ ] 标题用 serif 字体（GT Sectra / Tiempos / Tobias）
- [ ] 正文用 sans（Söhne / Inter）
- [ ] 数字用 Mono（GT America Mono / Söhne Mono）
- [ ] 字号 4 档（Display / Section / Body / Caption）
- [ ] 字重 3 档（Regular / Medium / Bold），避免 5+ weight
- [ ] 字体自托管（self-host），不引 Google Fonts CDN

---

## P-5 · 字号过小 · 移动 / 桌面 同步 16px

> ⚠️ **premium-showcase 的 body 字体应 18-20px，比一般大 2-4px**。

**❌ 反模式**
- 桌面 body 16px（和 SaaS Marketing 一样）
- 移动 body 14px（缩 2px）
- 标题 32px（不区分 hero / section）

**✅ 正解**
- 桌面 body **18-20px**（editorial 感）
- 移动 body **16-18px**（仅缩 2px，不缩 4px）
- 标题：hero 48-112px · section 36-72px（clamp 自适应）

**💥 后果**
- 16px body = "手机 App 感"，没有印刷品质感
- 标题 32px = 和 SaaS Marketing 没差异，溢价用户不买单
- 移动缩 4px = 移动体验更差（应放大不是缩小）

**附录必做清单**
- [ ] body 18-20px（桌面）/ 16-18px（移动）
- [ ] hero 字号用 clamp 48px → 112px
- [ ] section 字号用 clamp 36px → 72px
- [ ] caption 12-14px（仅用于版权 / meta 信息）
- [ ] 行高 1.6-1.8（不是 1.4）
- [ ] tracking 收紧：标题 -0.02em ~ -0.04em

---

## P-6 · 行高过紧 · body line-height: 1.2

> ⚠️ **行高 < 1.5 = "塞满屏幕 = 不尊重内容"**。

**❌ 反模式**
```css
body { line-height: 1.2; }   /* 太紧，像代码注释 */
p { line-height: 1.3; }
```

**✅ 正解**
```css
body { line-height: 1.7; }       /* editorial 标准 */
.feature-copy p { line-height: 1.8; }  /* 长正文更宽 */
.eyebrow { line-height: 1.4; }   /* 小字标签可紧 */
```

**💥 后果**
- 行高 1.2 = 文字粘连，溢价用户觉得"信息密度太大不舒适"
- 长正文（> 3 行）用 1.2 行高 = 阅读疲劳
- 移动端小屏行高 1.2 = 用户得放大才能看清

**附录必做清单**
- [ ] body line-height ≥ 1.6
- [ ] 长正文（> 3 行）line-height ≥ 1.7
- [ ] eyebrow / label / button line-height 可紧 1.2-1.4
- [ ] 移动端 line-height 上调 0.1（比桌面松）
- [ ] 行高不用 line-height 0.8-1.0（除非是 hero 数字大字）

---

## P-7 · 视差滥用 · 多元素不同速度

> ⚠️ **premium-showcase 视差 = 1 个元素，1 个速度，1 个方向**。

**❌ 反模式**
```js
// 同时 3-5 个元素以不同速度视差
gsap.to(heroImg, { y: '-20%' });
gsap.to(heroTitle, { y: '-10%' });
gsap.to(heroSubtitle, { y: '-30%' });
gsap.to(heroCTA, { y: '-5%' });
gsap.to(scrollHint, { y: '-15%' });
```

**✅ 正解**
```js
// 仅 1 个元素视差（背景图），其余 scroll-triggered fade
gsap.to(heroImg, { y: '-20%', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top' } });

// 文字用 fade 而非视差
gsap.from(heroTitle, { opacity: 0, y: 30, duration: 0.8, delay: 0.2 });
gsap.from(heroSubtitle, { opacity: 0, y: 20, duration: 0.8, delay: 0.4 });
gsap.from(heroCTA, { opacity: 0, y: 20, duration: 0.8, delay: 0.6 });
```

**💥 后果**
- 多元素视差 = 视觉混乱，眼睛不知道往哪看
- 持续 transform 触发 = GPU 占用高，移动端掉帧
- 加重动效 = 用户头晕（前庭敏感人群）

**附录必做清单**
- [ ] 1 屏最多 1 个视差元素
- [ ] 视差幅度 ≤ 30%（不是 100%）
- [ ] 视差用 transform: translateY（不用 background-position）
- [ ] 配 `prefers-reduced-motion: reduce` 关闭
- [ ] 移动端视差幅度减半或关闭
- [ ] 长 scroll（> 5 屏）每屏最多 1 个视差

---

## P-8 · 首屏不满屏 · 100vh 缺失

> ⚠️ **首屏不满 100vh = 品牌资产被腰斩**。

**❌ 反模式**
- 首屏高度由内容决定（结果是 70-80vh，剩 20-30% 是空白）
- hero 图 16:9（不是 100vw × 100vh）
- 桌面 100vh 移动 80vh（移动要满，移动占比更重要）

**✅ 正解**
- 首屏 **桌面 100vh / 移动 100dvh**（注意 dvh 处理移动 URL bar）
- hero 图 `width: 100vw; height: 100vh; object-fit: cover`
- 标题居中或底部，文字层独立在 image layer 之上

**💥 后果**
- 首屏 80vh = 移动端第一眼看到 nav + hero 1/3，立刻知道"普通 SaaS 页"
- 16:9 hero = 桌面屏 1440×900 上下空 200px，损失摄影冲击力
- 首屏内容 < 100vh = 用户感觉"页面没加载完"

**附录必做清单**
- [ ] 首屏 100vh（桌面）/ 100dvh（移动）
- [ ] hero 图 object-fit: cover（不是 contain）
- [ ] 标题 + 副标题 + CTA 都在首屏可见
- [ ] 滚动指示（↓ / "Scroll"）在首屏底部
- [ ] 首屏无 nav bar（透明覆盖）或 nav bar 占 < 60px

---

## P-9 · CTA 过多 · 3+ 个 / 屏

> ⚠️ **premium-showcase 全页 1-2 个 CTA，1 屏最多 1 个**。

**❌ 反模式**
- 首屏 3 个 CTA（"Buy" / "Configure" / "Newsletter"）
- feature section 每个有 CTA
- footer 5 个链接 + 1 个 newsletter + 1 个 social

**✅ 正解**
- 全页 1-2 个主 CTA（"Request access" / "Configure"）
- footer 1 个 newsletter（可选）+ 1 个 social row
- 中间 section 不放 CTA（让内容呼吸）

**💥 后果**
- CTA 过多 = 视觉噪音，溢价用户分不清主次
- feature section 放 CTA = 破坏 editorial 节奏
- footer 链接过多 = "营销页" 印象

**附录必做清单**
- [ ] 全页主 CTA 1-2 个（"Request access" / "Configure"）
- [ ] 1 屏最多 1 个 CTA（不算 footer）
- [ ] CTA 周围留白 ≥ 200px
- [ ] CTA 文字动词简洁（"Request" / "Configure" / "Reserve"）
- [ ] CTA 颜色对比度 7:1（WCAG AAA）
- [ ] 不放 "Buy now" / "Add to cart" / "Sign up"（premium 不是电商）

---

## P-10 · 倒计时 / 紧迫感 / 价格显式

> ⚠️ **premium-showcase 倒计时 = 砍品牌资产**。

**❌ 反模式**
- "Limited time offer: 24 hours"
- "$199 $399 ~~save 50%~~"
- "Only 5 left"
- "Countdown to launch"

**✅ 正解**
- "Reserve" / "Request access"（询价式）
- 不显示价格（询价获取）
- 不显示库存（避免紧迫感）
- 不显示倒计时（避免促销感）

**💥 后果**
- 倒计时 = 溢价用户觉得"在催我"，立即离开
- 显式价格 + 折扣 = 砍 50% 品牌价值（用户会想"原价是宰人"）
- 库存紧张 = 工业化生产感，与"手工 / 限量 / 工艺"冲突

**附录必做清单**
- [ ] 无倒计时 / 紧迫感 / 库存提示
- [ ] 无显式价格（询价或"Start at"）
- [ ] 无 ~~删除线~~ 价格
- [ ] CTA 用 "Request" / "Configure" / "Reserve" / "Enquire"（不用 "Buy"）
- [ ] Newsletter 文案不带 "Discount" / "Save"（用 "First to know"）
- [ ] 不放 social proof（"10,000 customers"）—— 高净值用户不喜欢扎堆

---

## 📊 反模式速查表（10 条）

| # | 反模式 | 大类 | 关键词 |
|---|---|---|---|
| P-1 | 摄影未优化 · LCP > 4s | 摄影 | AVIF / srcset / preload |
| P-2 | 占位图 · Unsplash 风 | 摄影 | 3D 渲染 / 抽象渐变 |
| P-3 | 摄影风格不统一 | 摄影 | 色温 / 比例 / 后期 |
| P-4 | Sans 主导字体 | 排版 | serif 主导 / Mono 数字 |
| P-5 | 字号过小 | 排版 | body 18-20px / clamp 标题 |
| P-6 | 行高过紧 | 排版 | line-height ≥ 1.6 |
| P-7 | 视差滥用 | 滚动 | 1 屏 1 视差 / ≤ 30% |
| P-8 | 首屏不满屏 | 滚动 | 100vh / object-fit: cover |
| P-9 | CTA 过多 | 转化 | 全页 1-2 / 1 屏 1 |
| P-10 | 倒计时 / 紧迫感 | 转化 | 询价式 / 不显价格 |

---

## 当前状态

- [x] P-1 ~ P-10 骨架（10 条，每条 4 段：❌ / ✅ / 💥 / 附录必做）
- [ ] P-1 ~ P-10 详细稿（P1-B 阶段：每条加 5 行业差异 + 真实案例链接）
- [ ] 必做清单对齐 ROADMAP 进度

---

## v2.11 同步新增（2 条 · 字体 + 装饰性 a11y）

### P-11. ps-1 / ps-2 / ps-3 字体 `@latest` 引用 + 衬线 display 字体未真实化（v2.11 B 方案前置）
**问题**：ps-1 (Tesla) / ps-2 (Apple Vision Pro) / ps-3 (Hermès + B&O) 用 `<link href="https://fonts.googleapis.com/css2?family=Playfair+Display@latest">`（ps-3 衬线 display）后，build 后字体 src 404，浏览器回退到 Times New Roman / Georgia，premium 调性破坏。

**原因**：`@latest` 不是 Google Fonts 合法语法。

**修复**：
- 显式字重：`family=Playfair+Display:wght@400;500;600;700;800&display=swap`
- 用 `scripts/download-fonts.sh`（v2.12 新增）批量下载到 `public/fonts/`
- ps-1 用 Söhne 替代品 Inter Variable 300（v2.11 已落地）
- ps-2 用 SF Pro Display 替代品 Inter Variable 300（v2.11 已落地）
- ps-3 用 Playfair Display（v2.11 B 方案补齐）
- 必读 [`../../scripts/download-fonts.sh`](../../scripts/download-fonts.sh)

### P-12. premium 装饰性摄影全屏图缺 `alt="decorative"` 触发 e2e H-3 alt 警告（v2.11 同步）
**问题**：ps-1 / ps-2 / ps-3 的全屏摄影（≥ 70% viewport）未标 `alt="decorative"`，e2e a11y H-3 alt 0 检查输出 warn。每个 premium 项目都有 3-5 张装饰性摄影。

**原因**：premium 类别的核心是"摄影主导"，但开发时把所有 `<img>` 都按 "信息性 alt" 处理。

**修复**：
- 装饰性全屏摄影：``<img src="hero.jpg" alt="decorative" aria-hidden="true" width="0" height="0" style="display:none">`（1x1 透明 size=0，不影响视觉）
- 信息性 spec 图：`<img src="spec-engine.jpg" alt="V12 引擎结构图">`（必须 alt 不为空）
- 替代方案：直接用 inline `<svg>` 或 CSS `background-image: url(...)` 渲染装饰性摄影（屏幕阅读器自动跳过）
- v2.11 后：ps-1 / ps-2 / ps-3 0 warn · 总 19 → 8
- 必读 [`../component-contract/image-gallery.md` § 6. 装饰性 a11y](../component-contract/image-gallery.md)
