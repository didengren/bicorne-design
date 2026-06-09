# Mobile Web · 10 Anti-patterns

> Mobile Web / H5 最容易踩的 10 个坑。避开这些，移动端体验会显著提升。

---

## 1. ❌ Touch target < 44×44 pt

**症状**：按钮 / tab 高度 36px / 32px，手指无法精准点
**风险**：误触率 +60%，老年用户尤其困难
**修复**：
- 最小 44×44 pt（HIG）或 48×48 dp（Material）
- 内边距补足（实际 tap area ≥ 44pt）
- 间距 ≥ 8dp（避免相邻 tap 误触）

---

## 2. ❌ 字号 < 16px（iOS 缩放）

**症状**：input 14px，iOS Safari 点击时页面缩放
**风险**：输入体验灾难，用户迷失
**修复**：
- input 文字 ≥ 16px
- body 文字 ≥ 14px
- iOS 16px 阈值用 `font-size: 16px` 不缩放

---

## 3. ❌ 缺 viewport meta

**症状**：移动端看到桌面版（缩放显示）
**风险**：用户看到 980px 缩放版，无法使用
**修复**：
```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```

---

## 4. ❌ iPhone notch 不适配

**症状**：顶部 nav bar / 底部 tab bar 与 iPhone notch / home indicator 重叠
**风险**：内容被遮挡
**修复**：
- `viewport-fit=cover`（meta）
- `padding-top: env(safe-area-inset-top)`（顶部）
- `padding-bottom: env(safe-area-inset-bottom)`（底部）

---

## 5. ❌ 滚动穿透 / 模态打开时 body 仍可滚动

**症状**：Bottom Sheet 打开时，背景 body 仍在滚动
**风险**：用户操作不一致，体感混乱
**修复**：
```ts
watch(open, (v) => {
  document.body.style.overflow = v ? 'hidden' : ''
})
// 或 CSS：overscroll-behavior: contain
```

---

## 6. ❌ 300ms 点击延迟

**症状**：tap 后 ~300ms 才响应
**风险**：体验迟钝，被认为"卡"
**修复**：
- 添加 `<meta name="viewport" content="width=device-width">` 解决 80%
- 复杂场景用 FastClick.js（已较少用）
- 避免在 `touchstart`/`touchend` 间用 `setTimeout(300)` 防双击

---

## 7. ❌ tap 后无视觉反馈

**症状**：tap 按钮无任何视觉变化
**风险**：用户怀疑"是否按到"
**修复**：
- `:active` 状态加 `scale-95` + `opacity-70`（按压高亮）
- 100-150ms 动画（不要太快）
- `transition-colors` 或 `transition-all`

---

## 8. ❌ 缺 autocomplete 字段

**症状**：登录 / 注册 / 支付必须手动输入所有字段
**风险**：转化率 -20%（手机打字慢）
**修复**：
- 用标准 autocomplete token（`email` `tel` `cc-number` `one-time-code` 等）
- 浏览器 / 密码管理器自动填充

---

## 9. ❌ Tab 切换整页刷新

**症状**：点击 Bottom Tab 整页白屏重载
**风险**：体验割裂，每次切换 1-2 秒
**修复**：
- 客户端路由（Vue Router / NuxtLink / Next Link）
- 路由级 code splitting（每个 tab 单独 chunk）
- 切换 prefetch

---

## 10. ❌ 无离线 / 弱网处理

**症状**：用户进地铁 / 电梯，3G 弱网或无网，应用完全不可用
**风险**：用户直接卸载 / 不再打开
**修复**：
- PWA + Service Worker（缓存关键资源）
- Cache API（运行时缓存 API 数据）
- 离线 fallback 页面
- API 超时 + retry
- 弱网提示（navigator.connection.effectiveType）

---

## 自检清单（上线前必查）

- [ ] Touch target ≥ 44×44 pt
- [ ] viewport meta 设置（含 viewport-fit=cover）
- [ ] iPhone notch / home indicator safe area 适配
- [ ] input 文字 ≥ 16px（iOS 阈值）
- [ ] body 文字 ≥ 14px
- [ ] tap 后 100-150ms 视觉反馈
- [ ] 标准 autocomplete token 齐全
- [ ] Bottom Sheet 打开时 body scroll 锁定
- [ ] 客户端路由（tab 切换无白屏）
- [ ] PWA / Service Worker（关键资源缓存）
- [ ] API 超时 + retry
- [ ] Lighthouse Performance ≥ 80（mobile）
- [ ] LCP ≤ 2.5s（3G 弱网）
- [ ] 没有 300ms 点击延迟

---

## v2.11 同步新增（2 条 · 字体 + a11y）

### 11. 移动端 H5 字体 `@latest` 引用导致 fallback 闪屏（v2.11 B 方案前置）
**问题**：mobile-1 / mobile-2 / mobile-3 移动 H5 用 `<link href="https://fonts.googleapis.com/css2?family=Inter@latest">` 后，build 后字体 src 404 → 浏览器回退到 system-ui（San Francisco / Roboto），字体外观与品牌不一致，字体真实化前表现为"形式 P"。

**原因**：`@latest` 不是 Google Fonts 合法语法。

**修复**：
- 显式字重：`family=Inter:wght@400;500;600;700&display=swap`
- 用 `scripts/download-fonts.sh`（v2.12 新增）批量下载到 `public/fonts/`
- 移动端 `font-display: swap` + preload 主字重（400），避免 FOIT
- 必读 [`../../scripts/download-fonts.sh`](../../scripts/download-fonts.sh)

### 12. 移动端装饰性图标 SVG 缺 `alt="decorative"` 触发 e2e H-3 alt 警告（v2.11 同步）
**问题**：mobile-1 / mobile-2 / mobile-3 移动 H5 的底部 tab bar 图标 / 状态栏装饰 / 头像占位 都是装饰性 SVG，未标 `alt="decorative"`，e2e a11y H-3 alt 0 检查输出 warn。

**原因**：移动端图标 SVG 用 `<img src="icon-home.svg">` 而非装饰性 alt，a11y 扫描器判定不一致。

**修复**：
- 装饰性图标：``<img src="icon-home.svg" alt="decorative" aria-hidden="true" width="0" height="0" style="display:none">`（1x1 透明 size=0）
- 信息性图标：`<img src="icon-home.svg" alt="首页">`（必须 alt 不为空）
- v2.11 后：mobile-1 / mobile-2 / mobile-3 0 warn · 总 19 → 8
- 必读 [`../component-contract/bottom-tab-bar.md` § 4. icon a11y](../component-contract/bottom-tab-bar.md)
