---
name: saas-marketing-pitfalls
description: 12 SaaS marketing site anti-patterns — trust erosion, conversion killers, SEO disasters, accessibility misses, performance traps.
---

# SaaS Marketing · 12 Anti-patterns

> 营销页最容易踩的 12 个坑。避开这些，转化率和 SEO 排名都会显著提升。

---

## 1. ❌ 假社会证明

**症状**: "Trusted by 10,000+ users" 但实际只有 200。
**风险**: 用户搜到差评 / 朋友发现时，信任崩塌
**修复**:
- 用真实数字（"Used by 200 teams and counting"）
- 如真实量小，**不要**用大数字（"Be the first of our 50 users"反而可信）

## 2. ❌ Hero 不显示价格

**症状**: 用户进首页 5 秒想看价格但找不到，跳出。
**风险**: 跳出率 +30% / 转化率 -25%
**修复**:
- 副标题含价格锚点（"Starting at $20/mo"）
- Hero 下方"See pricing"锚点
- 价格页链接**永远在 nav**

## 3. ❌ CTA 文案模糊

**症状**: "Submit" / "Click here" / "Learn more" / "Continue"
**风险**: 用户不知道点完会发生什么
**修复**:
- 用动作 + 价值（"Start free trial" / "Get my report"）
- 主 CTA 描述**结果**（"Deploy my app"）而非动作（"Sign up"）

## 4. ❌ 主 CTA 颜色每页变

**症状**: 首页 CTA 蓝色，价格页 CTA 绿色，案例页 CTA 紫色
**风险**: 用户怀疑是不同产品 / 品牌割裂
**修复**:
- 全站**一个**主 CTA 颜色
- 全站**一个**主 CTA 文案（推荐 "Get started" 或 "Start free trial"）
- 选定后**所有页面不变**

## 5. ❌ 假倒计时 / 假稀缺

**症状**: "Offer ends in 03:47" 实际永远不结束
**风险**: 用户识破后**永久**失去信任
**修复**:
- 真有限时：写明截止日期
- 不限时：不要假装稀缺
- 永远真诚

## 6. ❌ 客户名不公开

**症状**: "A Leading Fortune 500 Bank" / "Top-5 Retailer"
**风险**: 用户怀疑是 fake
**修复**:
- 没授权就**不放**这个客户
- 改为"200+ customers across fintech, retail, and healthcare"
- 已授权的展示 logo + 链接到案例

## 7. ❌ Mock 客户 logo

**症状**: 用 Google 自定义 logo 拼凑 "客户"
**风险**: 律师函 / 用户识破 / 永久失信
**修复**:
- 不用 mock 商标
- 没客户就空着，不勉强
- "早期用户" tag 比假 logo 强

## 8. ❌ 每页 3+ 个 CTA 横幅

**症状**: Hero 后一个、Features 后一个、Footer 前一个、Pricing 又一个
**风险**: 用户麻木 / 焦点稀释
**修复**:
- 营销页最多 **2 个 CTA Band**（Hero 之后 + Footer 之前）
- 详情页最多 1 个（页底）
- 重复出现比缺失更糟

## 9. ❌ 首屏大背景视频

**症状**: 自动播放的全屏视频 + 缩略图跳过按钮
**风险**:
- LCP 失败（视频加载慢）
- 移动流量被吃
- 部分用户设备卡顿
**修复**:
- 用**静态图**或**短循环 GIF/WebP**
- 视频放**点击播放**按钮后
- 不用任何背景视频（除非品牌驱动如 Tesla，且需懒加载）

## 10. ❌ SEO Meta 每页相同

**症状**: 全站 title 都是 "Brand" / description 都是 "Welcome to Brand"
**风险**: Google 排名灾难 / 搜索结果全相同
**修复**:
- 每页 title 唯一
- 每页 description 唯一
- 用工具审计（Sitebulb / Screaming Frog）

## 11. ❌ 隐藏价格

**症状**: 整站找不到价格，必须"联系销售"
**风险**: 70%+ 用户直接跳出（不愿被销售骚扰）
**修复**:
- 价格页**永远公开**
- "Custom" 档可写，但说明包含什么
- 公开价格≠便宜，Vercel/Stripe 都公开但都贵

## 12. ❌ 全站 dark mode 不一致

**症状**: 首页有 dark mode 切换，但 blog 详情 / changelog / careers 突然没了
**风险**: 体验割裂 / 用户怀疑是子站
**修复**:
- 暗色/亮色切换**所有页面同步**
- 暗色下**所有图像**都要测试（不依赖亮色才可见）
- 切换状态记 localStorage + URL `?theme=dark`

---

## 严重程度排序

| # | 反模式 | 严重度 | 影响 |
|---|---|---|---|
| 1 | 假社会证明 | 🔴 致命 | 永久失信 |
| 5 | 假倒计时 | 🔴 致命 | 永久失信 |
| 7 | Mock 客户 logo | 🔴 致命 | 法律风险 |
| 10 | SEO Meta 每页相同 | 🔴 致命 | SEO 灾难 |
| 11 | 隐藏价格 | 🟠 严重 | 跳出率↑ |
| 4 | 主 CTA 颜色每页变 | 🟠 严重 | 品牌割裂 |
| 2 | Hero 不显示价格 | 🟠 严重 | 转化率↓ |
| 3 | CTA 文案模糊 | 🟡 中 | 转化率↓ |
| 6 | 客户名不公开 | 🟡 中 | 信任不足 |
| 8 | CTA Band 太多 | 🟡 中 | 用户麻木 |
| 9 | 首屏大视频 | 🟡 中 | 性能↓ |
| 12 | 暗色模式不一致 | 🟡 中 | 体验割裂 |

## 检测方法

每页发布前过一遍：

```bash
# 自动化检查
- [ ] 每页 title 唯一（用 Screaming Frog）
- [ ] 每页 description 唯一
- [ ] 每页 og:image 正确
- [ ] sitemap.xml 更新
- [ ] 暗色模式所有页可切
- [ ] Lighthouse ≥ 90 (mobile)
- [ ] 字体 swap 显示
- [ ] 图像 width/height
- [ ] 主 CTA 文案跨页一致
- [ ] 主 CTA 颜色跨页一致
- [ ] logo 链接回首页
- [ ] 404 页面有 nav + 搜索
- [ ] hreflang（如多语言）
```

## Reference

- [Landing Page F-pattern](https://en.wikipedia.org/wiki/F-shaped_pattern)
- [Baymard UX Research](https://baymard.com/)
- [Google Search Central](https://developers.google.com/search)
- [NN/g — Above the Fold](https://www.nngroup.com/articles/fold/)

---

## v2.11 同步新增（2 条 · 字体 + 装饰性 a11y）

### 13. 4-2-stripe-landing 字体 `@latest` 引用导致 build 后 404（v2.11 B 方案前置）
**问题**：4-2-stripe-landing（Stripe Light）落地页用 `<link href="https://fonts.googleapis.com/css2?family=Inter@latest">` 后，build 后字体 src 404，浏览器回退到 system-ui。

**原因**：`@latest` 不是 Google Fonts 合法语法。

**修复**：
- 显式字重：`family=Inter:wght@400;500;600;700&display=swap`
- 用 `scripts/download-fonts.sh`（v2.12 新增）批量下载到 `public/fonts/`
- Stripe 品牌原始用 sohne-var 300（商业），开源替代 Inter Variable 300
- 必读 [`../../scripts/download-fonts.sh`](../../scripts/download-fonts.sh)

### 14. 4-2-stripe-landing 装饰性 logo / hero 配图缺 `alt="decorative"` 触发 e2e H-3 alt 警告（v2.11 同步）
**问题**：4-2-stripe-landing 的导航栏品牌 logo / Hero 配图 / 客户 logo 墙 都是装饰性，未标 `alt="decorative"`，e2e a11y H-3 alt 0 检查输出 warn。

**原因**：Stripe 风格强调"摄影主导 + 极简"，但开发时把所有 `<img>` 都按 "信息性 alt" 处理。

**修复**：
- 装饰性 logo：``<img src="logo.svg" alt="decorative" aria-hidden="true" width="0" height="0" style="display:none">`（1x1 透明 size=0）
- 装饰性 Hero 配图：`<div style="background-image:url(hero.jpg)" role="presentation" aria-hidden="true">`（CSS 背景图，屏幕阅读器自动跳过）
- 信息性客户 logo：`<img src="customer-logo.svg" alt="Acme 公司 logo">`（必须 alt 不为空）
- v2.11 后：4-2-stripe-landing 0 warn · 总 19 → 8
- 必读 [`../component-contract/hero-section.md` § 5. hero image a11y](../component-contract/hero-section.md)
