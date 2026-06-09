---
name: dashboard-performance
description: DEPRECATED stub. Cross-category performance budget moved to references/methodology/performance-budget.md. This file retains Dashboard-specific 60fps frame budget, 10 specific rules (transform/opacity, rAF, will-change, etc.), anti-patterns, memory budget, and profiling tools.
---

# Dashboard · Performance Budget

> ⚠️ **DEPRECATED**: 本文件已**抽到跨类别通用版** → [`../references/methodology/performance-budget.md`](../references/methodology/performance-budget.md)
>
> 通用版覆盖核心 Web Vitals 预算 + 5 类别专项指标（Dashboard / Admin Panel / Marketing / E-commerce / Mobile Web / Native App）。
> 本文件**仅保留 Dashboard-specific 60fps 持续帧预算（5 面板同屏）+ 10 条具体规则 + Anti-patterns + Memory budget + Profiling 工具**。

---

## 1. 为什么 Dashboard 单独有一份

> 通用 60fps 原则（rAF / transform / will-change）见 [performance-budget.md §6](../references/methodology/performance-budget.md)。
>
> Dashboard 是**最严苛的实时数据可视化场景**：5 面板同屏、50+ 动画元素、1Hz 数据刷新、要求 60fps **持续帧**（不是入场动画的瞬时帧）。

---

## 2. Frame budget（Dashboard 60fps）

**60fps = 16.67ms per frame.** 所有工作（JS + style + layout + paint + composite）必须全部装下：

| Phase | Budget | Why |
|---|---|---|
| JS execution | 4ms | rAF + reactive updates |
| Style recalc | 2ms | class changes |
| Layout | 2ms | box model |
| Paint | 4ms | pixels |
| Composite | 1ms | GPU upload |
| **Buffer** | 3.67ms | safety |

---

## 3. Hard limits（Dashboard 特定）

通用硬限制见 [performance-budget.md §4](../references/methodology/performance-budget.md)。**Dashboard 特定子集**：

| Metric | Limit | Tool to measure |
|---|---|---|
| First Contentful Paint | < 1.0s | Lighthouse |
| Largest Contentful Paint | < 2.0s | Lighthouse |
| Time to Interactive | < 2.5s | Lighthouse |
| Cumulative Layout Shift | < 0.05 | Lighthouse |
| **持续 FPS** | **≥ 60fps（5 面板同屏）** | **DevTools Performance** |
| **JS bundle (gzipped)** | < 200KB | Bundle analyzer |
| **DOM 节点（一页）** | < 2000 | DevTools |
| **动画类实例** | < 200 | `document.querySelectorAll('.animate-*').length` |
| **Active rAF 循环** | < 10 | 手动统计 |
| **setInterval/setTimeout（dashboard 实时数据）** | 0 | `grep -rnE "setInterval\|setTimeout" src/` |

---

## 4. 10 条规则（Dashboard 60fps 实战）

### 4.1 动画只用 `transform` 和 `opacity`

```css
/* ✅ Composite-only —— GPU 运行 */
.anim-1 { transition: transform 200ms, opacity 200ms; }

/* ❌ 触发 layout + paint */
.anim-2 { transition: width 200ms, height 200ms; }
```

Transform 和 opacity 由 GPU 合成。其他（width/height/top/left/background-color）触发 layout 或 paint。

### 4.2 `requestAnimationFrame`，绝不用 `setInterval`

```ts
// ❌ setInterval 漂移；tab 隐藏被节流到 1Hz
setInterval(() => animate(), 16)

// ✅ rAF 与显示器同步；tab 隐藏时自动暂停
const rafId = requestAnimationFrame(function tick() {
  animate()
  if (!done) rafId = requestAnimationFrame(tick)
})
```

### 4.3 unmount 时 cancel rAF

```ts
// 必须配对
onScopeDispose(() => cancelAnimationFrame(rafId))
```

### 4.4 持续动画加 `will-change`

```css
.animate-dash-aurora {
  /* 该元素将变换 18s —— 提示浏览器准备 GPU 层 */
  will-change: transform;
}

/* ❌ 不要 will-change * （强制全局建层） */
/* ❌ 不要 will-change 永远 —— 动画结束移除 */
```

### 4.5 装饰性覆盖层加 `pointer-events: none`

```css
.scan-line { pointer-events: none; }
.aurora-bg  { pointer-events: none; }
```

跳过 hit-testing，省 CPU。

### 4.6 节流 state updates

不要每秒重渲染 50+ metric 数字。节流到 1s 间隔：

```ts
const tick = () => {
  now = Date.now()
  if (now - lastTick > 1000) {
    metrics.value = newMetrics
    lastTick = now
  }
  rafId = requestAnimationFrame(tick)
}
```

### 4.7 避免 `transition-all` —— 具体到属性

```html
<!-- ❌ Transition 所有属性 -->
<div class="transition-all">

<!-- ✅ 仅 transition 你实际要动的属性 -->
<div class="transition-[transform,opacity,box-shadow,border-color] duration-dash">
```

### 4.8 Tab 切换面板用 `<KeepAlive>`

切 tab 时不要 unmount 上一个 tab 的 panel。缓存它：

```vue
<KeepAlive>
  <component :is="activeTabComponent" />
</KeepAlive>
```

### 4.9 避免 layout thrashing（read-write-read）

```ts
// ❌ 触发 layout 50 次
for (const el of elements) {
  const h = el.offsetHeight    // read
  el.style.height = h + 'px'   // write — invalidates layout
}

// ✅ 批量 read，再批量 write
const heights = elements.map(el => el.offsetHeight)
elements.forEach((el, i) => el.style.height = heights[i] + 'px')
```

### 4.10 定期 profile

```ts
performance.mark('panel-render-start')
renderPanel()
performance.mark('panel-render-end')
performance.measure('panel', 'panel-render-start', 'panel-render-end')

// 或用 DevTools Performance tab：
//   1. Record
//   2. 触发动作
//   3. Stop
//   4. 找 long task (>50ms) 和 layout shifts
```

---

## 5. Anti-patterns（Dashboard 5 条）

- ❌ **render 中调 `new Date().getTime()`** —— 调用 1 次存起来
- ❌ **shimmer 用 `Math.random()`** —— 确定性 shimmer 更好且避免重渲染
- ❌ **`style="..."` 内联计算值** —— 绕过 CSS 引擎优化
- ❌ **`<TransitionGroup>` 套 50+ 项** —— 仅用于小列表
- ❌ **重型组件用 `v-show`** —— `v-if` + 懒加载更好

---

## 6. Memory budget（Dashboard 特定）

| Resource | Limit | Why |
|---|---|---|
| Vue 组件（内存中） | < 100 | KeepAlive 至多缓存 ~20 |
| 事件监听（window/document） | < 10 | 显式 add/remove |
| Mock 数据大小 | < 5MB | 不要 50MB JSON 丢客户端 |
| SVG 路径 | < 500 节点 | 超过渲染慢 |
| LocalStorage | < 5MB | 浏览器硬限 |

---

## 7. Profiling 工具

| 工具 | 用途 |
|---|---|
| Chrome DevTools → Performance | 帧级 rAF + paint + composite |
| Chrome DevTools → Memory | Heap snapshot 查泄漏 |
| Chrome DevTools → Rendering → FPS meter | 实时 FPS 计数器 |
| `performance.measure()` in code | 自定义 timing |
| Lighthouse | 一次性 LCP/CLS/TBT 审计 |
| Bundle analyzer (`rollup-plugin-visualizer`) | 找大依赖 |

---

## 8. Acceptance（Dashboard 性能验收）

Dashboard 通过性能 review 当且仅当：

- ✅ 入场动画期间持续 60fps
- ✅ 数据刷新（1Hz）无掉帧
- ✅ Console 无 "long task"（>50ms）警告
- ✅ Lighthouse Performance ≥ 90
- ✅ 跑 5 分钟后内存平稳
- ✅ rAF 循环 unmount 时全部 cancel

---

## 9. See also

- 通用版（必读）：[`../references/methodology/performance-budget.md`](../references/methodology/performance-budget.md)
- 动画三原则（自然/高效/克制）+ 缓动曲线：[`../references/methodology/animation-best-practices.md`](../references/methodology/animation-best-practices.md)
- 字体加载（防 FOUT/FOIT）：[`../references/methodology/font-loading-strategy.md`](../references/methodology/font-loading-strategy.md)
- Dashboard 动画矩阵（场景→动画映射）：[`./animation-matrix.md`](./animation-matrix.md)
- Dashboard Pitfalls：[`./pitfalls/README.md`](./pitfalls/README.md)
- Dashboard 专题：[`./README.md`](./README.md)
