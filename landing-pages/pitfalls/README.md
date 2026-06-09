# Landing Pages · 8 Anti-patterns

> 单页营销最容易踩的 8 个坑。避开这些，转化率会显著提升。

---

## 1. ❌ Headline 用空话

**症状**：标题是"Empower your business" / "Innovation at your fingertips" / "Transform your workflow"
**风险**：访客 5 秒内看不出"这是给谁的 + 解决什么" → 跳出率 +60%
**修复**：
- 用具体动词 + 受众 + 结果
- 公式：`[动词] + [结果] + [可选：时间/对比]`
- 示例：
  - "Ship products faster. Without the meetings." ✅
  - "Build forms in 5 minutes, not 5 days." ✅
  - "Empower your business" ❌

---

## 2. ❌ 假社会证明

**症状**："Trusted by 10,000+ users" 但实际只有 200 / "Industry-leading" 没人能验证
**风险**：用户搜到差评 / 朋友发现时，信任崩塌（比没有证明更糟）
**修复**：
- 用真实数字（"Used by 200 teams and counting"）
- 列真实客户 logo（含竞品/知名）
- 留空 > 假数据

---

## 3. ❌ 多个主 CTA 竞争转化

**症状**：Hero 上 3-4 个相同权重的按钮（"免费试用" "联系销售" "查看价格" "下载"）
**风险**：选择瘫痪，转化率比 1 个 CTA 低 30-40%
**修复**：
- 1 个**主 CTA**（醒目按钮）
- 0-1 个**次 CTA**（链接/ghost 按钮）
- 其他入口放进 nav 或 footer

---

## 4. ❌ 演示图静态 / 模糊

**症状**：首屏演示是 320x240 模糊截图 / 占位图 / 静态占位符
**风险**：访客看不出"产品长什么样" → 信任度 -50%
**修复**：
- 高分辨率（≥ 1200px 宽）
- WebP/AVIF 格式（比 PNG 小 60%）
- 优先 GIF / 视频（让访客看到"产品在做什么"）
- 加 `loading="eager"`（LCP 关键）

---

## 5. ❌ 一屏塞 3+ 特性

**症状**：滚动到特性区，看到 6 个 feature card 平铺，每个 3 句话
**风险**：访客记不住任何 1 个，转化率 -20%
**修复**：
- 1 屏 1 特性（每屏 1 假设）
- 标题 ≤ 6 词，描述 ≤ 30 词
- 演示 GIF / 视频
- 6 个特性 → 6 屏滚动

---

## 6. ❌ 价格不透明

**症状**：3 档价格中 1-2 档写 "Contact us" / "Custom pricing"
**风险**：70% 访客看到"Contact us"会直接离开（不喜销售对话）
**修复**：
- 至少 2 档有公开价格
- "Enterprise" 档可 "Custom" 但要给出"starts from"价格
- 价格透明 = 信任

---

## 7. ❌ 入场动画 > 1 秒

**症状**：元素 fade-in / slide-up 持续 2000ms
**风险**：访客在等动画时已离开（首屏体验差）
**修复**：
- 入场动画 ≤ 700ms
- 用 `motion-safe:` 前缀（尊重 `prefers-reduced-motion`）
- 仅 Hero / 第一屏加动画，后续屏静态

---

## 8. ❌ 没衡量 = 没做

**症状**：上线后没人看数据 / 不知道转化率多少 / 不知道哪里卡住
**风险**：永远不知道哪里要改 / 永远在拍脑袋做 A/B test
**修复**：
- 转化率目标（如 5% 访客 → 注册）
- 转化事件埋点（GA4 / PostHog / 自建）
- 漏斗分析（Hero → Feature → Pricing → CTA 各步）
- 至少 1 个 A/B test 假设（如 CTA 文案 / Hero 图）

---

## 自检清单（上线前必查）

- [ ] Headline ≤ 8 词，动词开头
- [ ] 1 个主 CTA + ≤ 1 个次 CTA
- [ ] 演示图高分辨率（≥ 1200px / WebP/AVIF）
- [ ] 1 屏 1 特性，描述 ≤ 30 词
- [ ] ≥ 5 个真实客户 logo
- [ ] 至少 1 条强证言（有具体结果）
- [ ] 价格 2-3 档，至少 2 档公开
- [ ] 转化事件埋点 + 漏斗分析
- [ ] Lighthouse Performance ≥ 90（mobile）
- [ ] LCP ≤ 2.0s
- [ ] 至少 1 个 A/B test 假设

---

## v2.11 同步新增（2 条 · 字体 + 性能）

### 9. 字体 URL `@latest` 引用导致 build 后 404（v2.11 B 方案前置）
**问题**：5-1 / 5-2 落地页用 `<link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter@latest&display=swap" as="style">` 后，`@font-face` 解析为 `Inter@latest`，build 后所有字体 src 404，LCP 真实字体不出现。

**原因**：`@latest` 不是 Google Fonts 合法语法，开发脚手架或注释残留。

**修复**：
- 显式列每个字重：`family=Inter:wght@400;500;600;700&display=swap`
- 用 `scripts/download-fonts.sh`（v2.12 新增）批量下载到 `public/fonts/`
- 用 `perf-runtime-check.sh` 验证：fonts.googleapis.com HTTP 状态必须 200
- 必读 [`../../scripts/download-fonts.sh`](../../scripts/download-fonts.sh) § 用法

### 10. 装饰性 logo SVG `<img>` 缺 `alt="decorative"` 触发 e2e H-3 alt 警告（v2.11 同步）
**问题**：5-1 / 5-2 等落地页的装饰性 logo（导航栏品牌图 / Hero 配图 / footer 小 logo）未标 `alt="decorative"`，e2e a11y H-3 alt 0 检查输出 warn。

**原因**：5-1 / 5-2 落地页 logo 是装饰性，但开发时按 "信息性 alt" 处理（留空或写品牌名），a11y 扫描器判定不一致。

**修复**：
- 装饰性 logo：``<img src="logo.svg" alt="decorative" aria-hidden="true" width="0" height="0" style="display:none">`（1x1 透明 size=0）
- 信息性 logo：`<img src="logo.svg" alt="Resend 品牌">`（必须 alt 不为空）
- v2.11 后：11 升 P 项目 0 warn · 4 v2.5 B 级项目各保留 2 warn · 总 19 → 8
- 必读 [`../component-contract/hero-cta.md` § 5. logo](../component-contract/hero-cta.md)
