# Performance Budget — 跨类别性能预算

> 通用性能规则（rAF、transform/opacity、will-change）见各文件详述。
> 本文件**只做跨类别预算差异对比**，不重复基础规则。

---

## 1. 三层预算框架

性能预算分三层：
1. **核心 Web Vitals**（LCP/FID/CLS）—— 跨所有 Web 类别
2. **类别专项指标**（FPS / 滚动流畅度 / 动画健康度）—— 按类别分化
3. **硬限制**（DOM 节点数 / 动画实例数 / rAF 循环数）—— 防止架构级退化

---

## 2. 核心 Web Vitals 通用预算

所有 Web 类别的基线（绿/黄/红三档）：

| 指标 | 🟢 绿（达标） | 🟡 黄（警告） | 🔴 红（失败） | 测量工具 |
|---|---|---|---|---|
| **LCP**（最大内容绘制） | ≤ 2.0s | 2.0-2.5s | > 2.5s | Lighthouse / WebPageTest |
| **FID / INP**（交互响应） | ≤ 100ms / ≤ 200ms | 100-300ms | > 300ms | Lighthouse / CrUX |
| **CLS**（累计布局偏移） | ≤ 0.05 | 0.05-0.1 | > 0.1 | Lighthouse |
| **TTFB**（首字节时间） | ≤ 600ms | 600-1000ms | > 1000ms | WebPageTest |
| **TBT**（总阻塞时间） | ≤ 200ms | 200-600ms | > 600ms | Lighthouse |

> 数值依据：Google 官方 "Web Vitals 2025 thresholds"。SEO 排名与 Core Web Vitals 直接相关。

---

## 3. 类别专项指标

### 3.1 Dashboard / 大屏

> 详见 [`dashboards/performance.md`](../../dashboards/performance.md) stub（60fps 持续帧预算 / 5 面板同屏 / DOM ≤ 2000 / rAF 循环 ≤ 10 / 10 条 60fps 实战规则）

| 指标 | 目标 | 工具 |
|---|---|---|
| 持续 FPS | ≥ 60fps（5 面板同屏） | Chrome DevTools Performance |
| JS 执行 / 帧 | ≤ 4ms | Performance Monitor |
| DOM 节点 | ≤ 2000 | DevTools |
| 动画类实例 | ≤ 200 | `document.querySelectorAll('.animate-*').length` |
| 并发 rAF 循环 | ≤ 10 | 手动 |

### 3.2 Admin Panel / 中后台

| 指标 | 目标 | 说明 |
|---|---|---|
| 表格首屏渲染（1000 行） | ≤ 1.0s | 虚拟滚动必须 |
| 表格滚动 FPS | ≥ 55fps | 高频操作不卡 |
| 表单提交反馈 | ≤ 100ms 视觉反馈 | 立即 disable + spinner |
| DOM 节点 | ≤ 3000 | 表格组件可能接近 2000 |

### 3.3 SaaS Marketing Site

| 指标 | 目标 | 工具 |
|---|---|---|
| Lighthouse Performance | ≥ 90（移动）/ ≥ 95（桌面） | Lighthouse CI |
| LCP（移动 4G） | ≤ 2.5s | CrUX / RUM |
| JS Bundle（gzipped） | ≤ 100KB（首屏） | Bundle analyzer |
| 图像 LCP element | WebP / AVIF，CLS = 0 | `loading="eager"` + 明确宽高 |
| 多页 TTI | ≤ 3.0s | Lighthouse |
| SEO 评分 | ≥ 95 | Lighthouse SEO |

### 3.4 Mobile Web

| 指标 | 目标 |
|---|---|
| 3G 加载完成 | ≤ 5.0s |
| 滚动 FPS | ≥ 55fps |
| 触摸响应延迟 | ≤ 50ms |
| 电池消耗（10 分钟浏览） | ≤ 5% |

### 3.5 Native App

| 指标 | 目标 |
|---|---|
| Cold start | ≤ 1.5s（iOS）/ ≤ 2.0s（Android） |
| 帧率（60/90/120Hz） | 稳定匹配屏幕刷新率 |
| 内存占用（前台） | ≤ 200MB（iOS）/ ≤ 250MB（Android） |
| Crash-free 用户 | ≥ 99.5% |

---

## 4. 硬限制（防退化）

| 项 | 上限 | 检测方法 |
|---|---|---|
| **JS Bundle（gzipped）** | 首屏 ≤ 100KB；单页总 ≤ 250KB | `webpack-bundle-analyzer` |
| **CSS Bundle** | ≤ 50KB（gzip） | 构建产物 |
| **DOM 节点（一页）** | ≤ 3000（通用）/ ≤ 2000（dashboard） | DevTools |
| **动画类实例** | ≤ 200 | `querySelectorAll` |
| **并发 rAF 循环** | ≤ 10 | 手动统计 |
| **setInterval/setTimeout**（dashboard 实时数据） | 0 | `grep -rnE "setInterval\|setTimeout" src/` |
| **首屏阻塞脚本** | 0（全部 `defer`/`async`） | Lighthouse |
| **未压缩图片** | 0 | 构建 pipeline |

---

## 5. 性能诊断工具链

| 工具 | 用途 | 适用类别 |
|---|---|---|
| Chrome DevTools Performance | 帧级分析 | Web / 移动 Web |
| Lighthouse | 综合评分 | Web / Marketing |
| WebPageTest | 多地点/多网络 | Marketing |
| CrUX（Chrome User Experience Report） | 真实用户数据 | Web |
| `webpack-bundle-analyzer` | Bundle 体积 | Web |
| React Profiler | 组件渲染时长 | React 项目 |
| Vue DevTools | 组件渲染时长 | Vue 项目 |
| React Native Performance Monitor | FPS / JS / UI 线程 | Native App |
| Instruments（Xcode）/ Profiler（Android Studio） | 平台级 profile | Native App |

---

## 6. 跨类别工程规约

每条都是跨类别的硬规约：

### 6.1 动画只用 `transform` + `opacity`

```css
/* ✅ Composite-only（GPU） */
.anim-1 { transition: transform 200ms, opacity 200ms; }

/* ❌ 触发 layout + paint */
.anim-2 { transition: width 200ms, height 200ms; }
```

### 6.2 `requestAnimationFrame` 而非 `setInterval`

```ts
// ❌ setInterval 漂移；后台标签页被节流到 1Hz
setInterval(() => animate(), 16)

// ✅ rAF 与显示同步；标签页隐藏时自动暂停
const rafId = requestAnimationFrame(function tick() {
  animate()
  if (!done) rafId = requestAnimationFrame(tick)
})
// 必须在 unmount 时 cancel
onScopeDispose(() => cancelAnimationFrame(rafId))
```

### 6.3 持续动画用 `will-change` 提示

```css
.animate-dash-aurora {
  /* 该元素会变换 18s —— 提示浏览器准备 GPU 层 */
  will-change: transform;
}
```

### 6.4 图片明确宽高（防 CLS）

```html
<img src="hero.png" width="1200" height="600" alt="..." />
```

### 6.5 字体 `font-display: swap`（防 FOUT/FOIT）

```css
@font-face {
  font-family: 'Inter';
  src: url('inter.woff2') format('woff2');
  font-display: swap;  /* 立即用 fallback 渲染，字体加载完切换 */
}
```

> 详细字体加载策略见 [`font-loading-strategy.md`](./font-loading-strategy.md)。

---

## 7. 类别专题索引

| 类别专题 | 性能文件 | 复用度 |
|---|---|---|
| Dashboard | `dashboards/performance.md` stub（60fps 持续帧 + 10 条规则 + Memory budget） | 🟡 80% |
| Admin Panel | 待建设 | — |
| SaaS Marketing | `saas-marketing/performance.md` stub（Lighthouse 90+ 多页 + 10 pitfalls） | 🟡 60% |
| Mobile Web | 待建设 | — |
| Native App | 待建设 | — |

---

## 8. 速查卡片：5 条铁律

1. **动画只用 `transform` + `opacity`**（GPU 合成）
2. **`rAF` 而非 `setInterval`**；unmount 必须 cancel
3. **持续动画加 `will-change`**；结束时移除
4. **图片明确宽高**（CLS = 0 的前提）
5. **JS Bundle ≤ 100KB（首屏 gzip）**；超出即触发 bundle 拆分
