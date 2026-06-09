---
name: pitfalls
description: Catalog of 25 dashboard-specific bugs and anti-patterns. Each entry has: symptom, root cause, fix, and the question to ask before writing the code.
keywords: pitfalls, bugs, anti-patterns, traps, gotchas
---

# Dashboard Pitfalls — 25 Bugs AI Agents Hit Repeatedly

> This is the bug library that should have been in the skill from day 1. Each entry: **Symptom** (what you see) → **Root Cause** (why) → **Fix** (correct code) → **Diagnostic Question** (what to ask before writing).

> When in doubt, the `e2e-validate.sh` script at the end of this skill detects ~60% of these automatically.

---

## 1. `Number("12,846")` returns `NaN`

- **Symptom**: KPI cell displays `NaN` in red or white text.
- **Root Cause**: `useCountUp` already formats via `(12846).toLocaleString('zh-CN')` → `"12,846"`. A `computed(() => Number(display.value).toLocaleString(...))` re-parses, but `Number("12,846")` cannot parse comma thousands separators → returns `NaN` → `NaN.toLocaleString()` → `"NaN"`.
- **Fix**: Pass `display.value` through directly. `useCountUp` already produces the formatted string.
- **Diagnostic Q**: "Is this value already a formatted string? If yes, do not re-format with `Number()` or `parseFloat`."

## 2. TDZ — `const formatNumber` referenced before declaration

- **Symptom**: `ReferenceError: Cannot access 'formatNumber' before initialization` thrown during component setup, breaking the entire panel.
- **Root Cause**: `const formatNumber = (n) => ...` is a `const` declaration, not hoisted. Calling `formatNumber(...)` on the same line that uses it works only if the call happens *after* the `const` line. But `ref(formatNumber(...))` is called in the *body* of a hook, and the `const` is below → TDZ.
- **Fix**: Move `const formatNumber` to the module top, before the hook function.
- **Diagnostic Q**: "Does this function declaration come AFTER the call site? If yes, hoist it."

## 3. SVG `<text>` defaults to `fill: black`

- **Symptom**: Axis labels and inline SVG text in dark theme are invisible (black on dark).
- **Root Cause**: SVG default `fill` is `black`. Inheriting from `currentColor` requires explicit declaration.
- **Fix**: Add `fill="currentColor"` and set `text-{token}` Tailwind class.
- **Diagnostic Q**: "Did I set fill on this SVG `<text>`? If I relied on the parent `color`, did I declare `fill="currentColor"`?"

## 4. `useCountUp` animates to `undefined` → `NaN`

- **Symptom**: First frame shows `0`, but quickly becomes `NaN`.
- **Root Cause**: `useMockData` may not resolve synchronously; `useCountUp` reads `source.value` which is `undefined` → `startVal + (undefined - startVal) * eased = NaN`.
- **Fix**: Default the source to `0`: `useCountUp(() => data.value ?? 0)`.
- **Diagnostic Q**: "Is this number `data.value` potentially `undefined`? Default it."

## 5. `truncate` span is `inline` — no width to truncate

- **Symptom**: Long metric numbers overflow horizontally, panel layout breaks.
- **Root Cause**: `truncate` = `overflow:hidden; text-overflow:ellipsis; white-space:nowrap`. These need a defined width to work. But `<span class="truncate">` is inline by default — width is content-based and never overflows.
- **Fix**: Wrap in `flex-1 min-w-0` parent (block-level), then the inner span gets the flex-grow space.
- **Diagnostic Q**: "Is this truncate span in a flex container? Does it have `flex-1 min-w-0`?"

## 6. `transition-all` includes `width`/`height` → layout jank

- **Symptom**: Panel hovers are slow; layout shifts; CLS metric > 0.1.
- **Root Cause**: `transition-all` transitions *every* animatable property including `width`, `height`, `top`, `left`. These trigger layout, not just compositing.
- **Fix**: Use `transition-[transform,opacity,box-shadow,border-color] duration-dash` (explicit list), or rely on `transition-colors` / `transition-transform`.
- **Diagnostic Q**: "Did I write `transition-all`? Replace with explicit property list."

## 7. Hardcoded color hex values bypass token system

- **Symptom**: Token system is supposed to enable theme switching, but switching the theme leaves hardcoded colors behind.
- **Root Cause**: Developer wrote `style="color: #54c5ff"` instead of `class="text-dash-accent-cyan"`.
- **Fix**: Map hex to a token. Use Tailwind class. Add a CI rule (`grep -rE "#[0-9a-fA-F]{3,8}" src/`).
- **Diagnostic Q**: "Does this color have a corresponding token in `token.json`?"

## 8. `v-if` and `v-for` on the same element

- **Symptom**: Vue warning: `v-if / v-for precedence`.
- **Root Cause**: Vue 3 gives `v-if` higher precedence than `v-for` when both are on the same element. The filtered list won't iterate.
- **Fix**: Use a `<template v-for>` wrapping a `<div v-if>`, or compute the filtered list with `computed()`.
- **Diagnostic Q**: "Am I conditionally hiding an item in a list? Compute the filtered list instead."

## 9. `ref.value` vs `reactive` mixing — lost reactivity

- **Symptom**: `data.value` updates in console, but the DOM does not re-render.
- **Root Cause**: A `ref` is unwrapped to its `.value` in templates, but a nested `reactive` object is *not* unwrapped. Returning a `reactive` from a composable and accessing `data.value.foo` fails silently.
- **Fix**: Pick one. If using `reactive({...})`, return it directly and access `data.foo` in templates. If using `ref`, always access `.value` in JS.
- **Diagnostic Q**: "Is this data a `ref` or `reactive`? Does my access pattern match?"

## 10. `a-card` default `bodyStyle` 24px padding conflicts with `tight` density

- **Symptom**: Panel content has 24px padding on all sides even when `density="tight"` is set.
- **Root Cause**: Ant Design's `a-card` applies `bodyStyle: { padding: '24px' }` by default.
- **Fix**: Either override via `:body-style="{ padding: 0 }"`, or wrap content in an inner `<div :class="[paddingMap[density]]">`.
- **Diagnostic Q**: "Did I let `<a-card>` add its own padding? Override it."

## 11. `useMockData` is sync, but `await useMockData()` treats it as Promise

- **Symptom**: `Cannot read property 'value' of undefined` after `const data = await useMockData(...)`.
- **Root Cause**: `useMockData` in this project is sync. `await` on a non-Promise returns the value wrapped in a Promise → `.value` undefined.
- **Fix**: `const data = useMockData(...)` (no `await`).
- **Diagnostic Q**: "Is the hook in this project sync or async? Check the file."

## 12. Stroke-dashoffset animation needs `pathLength="1000"`

- **Symptom**: Sparkline draws halfway and stops, or overshoots and disappears.
- **Root Cause**: `stroke-dasharray="1000"` and `stroke-dashoffset="1000"` work only if the actual path length is close to 1000 units. If the path is 600 units, dasharray=1000 means "draw 1000 unit, gap 1000 unit" — 600 path length shows the first 600 of the 1000-dash.
- **Fix**: Add `pathLength="1000"` attribute. This tells SVG to normalize the path length to 1000 for stroke calculations.
- **Diagnostic Q**: "Did I set `pathLength` on this SVG path?"

## 13. Ant Design `a-modal` `v-model:open` — never reaches `null`

- **Symptom**: Modal opens but `cancel` event fires but does not close the modal.
- **Root Cause**: Using `v-model:visible` (legacy) instead of `v-model:open` (v4.1+). The two are not interchangeable.
- **Fix**: Use `v-model:open` with Ant Design Vue 4.x.
- **Diagnostic Q**: "Am I using Ant Design Vue 4? `v-model:open`, not `v-model:visible`."

## 14. Tailwind dynamic class names don't work

- **Symptom**: `class="bg-${color}-500"` doesn't apply.
- **Root Cause**: Tailwind's JIT scans source files for *complete* class strings. `bg-${color}-500` is incomplete at scan time.
- **Fix**: Either use the full string literal `class={\`bg-${color}-500\`}` (still may not work if not in a literal), or use a `safelist` config, or use a lookup map: `const colorMap = { red: 'bg-red-500', blue: 'bg-blue-500' }`.
- **Diagnostic Q**: "Is this class string complete in the source? If dynamic, use a lookup map."

## 15. `requestAnimationFrame` not cancelled on unmount → memory leak

- **Symptom**: Console warning about "possible memory leak"; component remounts show stale rAF callbacks.
- **Root Cause**: A `useCountUp` or similar hook starts an rAF loop but doesn't `cancelAnimationFrame` in `onUnmounted` / `onScopeDispose`.
- **Fix**: Store `rafId`, call `cancelAnimationFrame(rafId)` in `onScopeDispose(() => stop())`.
- **Diagnostic Q**: "Did I cancel the rAF in the dispose hook?"

## 16. Mock data is reassigned to `ref` — bypasses `useMockData`

- **Symptom**: Dashboard renders data correctly the first time, but a "refresh" button doesn't update the UI.
- **Root Cause**: `const data = ref(userList)` — direct assignment to `ref` does not go through the mock loader's reactive wrapper, so no reload trigger.
- **Fix**: Always go through `const { data, loading, reload } = useMockData(userList)`.
- **Diagnostic Q**: "Did I use `useMockData` or assign `ref` directly?"

## 17. `position: absolute` child has no positioning context

- **Symptom**: Corner frame, scan line, badge overlay all stack in the top-left of the *page*, not the panel.
- **Root Cause**: `position: absolute` resolves to the nearest positioned ancestor. If the panel is `position: static`, the absolute child resolves up to `<body>`.
- **Fix**: Add `relative` to the panel: `<a-card class="relative">`.
- **Diagnostic Q**: "Did I set `relative` on the container?"

## 18. `flex` parent with `flex-1` children but no `min-w-0` → overflow

- **Symptom**: 5-column grid has cells with correct `grid-template-columns: repeat(5, 1fr)`, but the first cell is wider than the others.
- **Root Cause**: Flex/Grid items default to `min-width: auto`, which respects the *content* size. A 5-digit number expands the cell.
- **Fix**: Add `min-w-0` to each child (or `min-width: 0` in CSS).
- **Diagnostic Q**: "Does this grid/flex child have a wide intrinsic content? Add `min-w-0`."

## 19. Animation duration set to `0` or `undefined` → no visible motion

- **Symptom**: Sparkline or panel animates instantly, looks janky.
- **Root Cause**: `class="animate-dash-draw"` works, but if `--dash-duration` CSS var is undefined, fallback is `0s`.
- **Fix**: Define duration in Tailwind `animation: 'dash-draw 1.6s ease both'` (no var), or set `:style="{ '--dash-duration': '1.6s' }"` on the element.
- **Diagnostic Q**: "Is this animation duration defined? Either inline or in the keyframe declaration."

## 20. `<a-statistic>` inside custom layout overrides styling

- **Symptom**: A `MetricNumber` looks correct, but wrapping in `<a-statistic>` reverts to default Ant Design typography.
- **Root Cause**: `<a-statistic>` applies its own typography to children. Custom text classes are overridden.
- **Fix**: Use `<a-statistic>` only for full KPI cards, not as a thin wrapper around a number. For inline KPI, use `MetricNumber` directly.
- **Diagnostic Q**: "Is `<a-statistic>` adding value here, or fighting my typography?"

## 21. `display: grid` + `grid-template-columns: repeat(auto-fit, minmax(...))` collapses at narrow widths

- **Symptom**: 5-column grid collapses to 1 column at 480px, leaving 4 empty rows.
- **Root Cause**: `auto-fit` shrinks the grid to fit content. With `minmax(120px, 1fr)`, a 480px viewport fits 4 columns max → 5th wraps.
- **Fix**: Use fixed columns: `grid-cols-2 md:grid-cols-3 lg:grid-cols-5` with Tailwind responsive prefixes.
- **Diagnostic Q**: "Did I use responsive Tailwind prefixes, or auto-fit?"

## 22. Hardcoded `font-family: 'monospace'` instead of token

- **Symptom**: Numbers don't have tabular-nums, digits jump width.
- **Root Cause**: `font-family: monospace` was hardcoded.
- **Fix**: Use token: `font-mono tabular-nums` (Tailwind classes from `fontFamilies.mono`).
- **Diagnostic Q**: "Is this font family defined in `token.json`?"

## 23. `setTimeout` for animation timing → drift, no pause

- **Symptom**: Number count-up falls behind during CPU throttling, or jumps after browser tab unfreeze.
- **Root Cause**: `setInterval` / `setTimeout` use real wall clock. Browsers throttle to 1Hz in background tabs.
- **Fix**: Use `requestAnimationFrame` with a `startTime` baseline; compute progress from `performance.now() - startTime`.
- **Diagnostic Q**: "Does this animation use rAF or setTimeout?"

## 24. Click handler on `<svg>` with `pointer-events: none` ancestors

- **Symptom**: Click on a map point does nothing.
- **Root Cause**: A parent `<div class="pointer-events-none">` (often used for overlays) blocks click events.
- **Fix**: Restructure so the SVG is not nested inside a `pointer-events-none` container, or set `pointer-events: auto` on the SVG.
- **Diagnostic Q**: "Is there a `pointer-events-none` ancestor? Restructure."

## 25. Vue 3 `watch` on a `toRef` of a prop — initial value not captured

- **Symptom**: `watch(targetRef, (newVal) => animateTo(newVal))` does nothing on mount even if `targetRef.value` is set.
- **Root Cause**: `watch` is lazy by default; it only fires on *changes*, not initial value. The initial animateTo happens via the synchronous call in setup, but if that's the only call, prop changes don't trigger.
- **Fix**: `watch(targetRef, animateTo, { immediate: true })` to also catch the initial value (or rely on sync call but be sure source updates trigger re-watch).
- **Diagnostic Q**: "Should this watch fire on initial value? Add `immediate: true`."

---

## 26. 装饰性 SVG `<img>` 缺 `alt="decorative"` 触发 e2e H-3 alt 警告（v2.11 同步新增）

- **Symptom**: `e2e --category a11y` 输出 19 个 warn，其中 11 个来自 dashboards/admin-panels 等项目的装饰性 logo/icon/illustration（`H-3 alt 0` 检查未通过）。
- **Root Cause**: 装饰性 SVG 用 `<img src="logo.svg">` 而非 `<img src="logo.svg" alt="decorative" aria-hidden="true">`，a11y 扫描器判定为 "缺 alt 但不是装饰性" → 警告。
- **Fix**:
  - 装饰性 SVG：``<img src="logo.svg" alt="decorative" aria-hidden="true" width="0" height="0" style="display:none">`（1x1 透明 size=0 不影响布局）
  - 替代方案：用 inline SVG `<svg aria-hidden="true">` 直接嵌入
  - v2.11 修复后：11 升 P 项目 H-3 alt 0 warn → 19 → 8（11 升 P 0 warn + 4 v2.5 B 级项目各 2 warn）
- **Diagnostic Q**: "Is this SVG/icon/logo 装饰性（非信息承载）？加 `alt="decorative" aria-hidden="true"`。"

## 27. onerror 自清理 handler 在字体真实后成为冗余 DOM（v2.11 D 终极方案）

- **Symptom**: 11 项目 build 后 `<img>` 标签还残留 `onerror="this.remove()"` 字符串（D 终极前 22 处）。
- **Root Cause**: v2.10 A 方案为消除 stale link 给装饰性 SVG 加了 `onerror` 自清理。但 v2.11 B 方案批量下载真实字体后，所有外部资源（logo / icon / illustration）都 200 OK，`onerror` 永远不触发 → 22 处冗余 DOM。
- **Fix**:
  - 用 `perf-runtime-all.sh` 检测：所有 `<img>` 必须 200 OK，且 `<img>` 标签不应含 `onerror` 属性
  - 删除 `onerror` 字符串（不是注释掉）：`<img src="logo.svg" alt="decorative" aria-hidden="true">`
  - 11 项目批量移除后：22 处冗余 DOM → 0 · 字体真实后浏览器无额外清理负担
- **Diagnostic Q**: "v2.11 B 方案后，`<img>` 还需不需要 onerror 自清理？不需要，删除。"

---

## Detection rate

| Tool | Catches |
|---|---|
| `grep -nE "#[0-9a-fA-F]{3,8}" src/` | #7 (hardcoded colors) |
| `grep -nE "v-if.*v-for\|v-for.*v-if" src/` | #8 |
| `grep -nE "transition-all" src/` | #6 |
| `grep -nE "Number\(" src/components/dashboard/` | #1 |
| DevTools console errors | #2, #4, #11, #15, #17 |
| `e2e-validate.sh` | 0 NaN, 0 overflow, animation class count |
