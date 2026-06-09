# Animation — 跨类别 / 跨平台差异速查

> 通用动画原则（自然/高效/克制 + 缓动曲线 + Keyframe 分类）见 [`animation-best-practices.md`](./animation-best-practices.md)。
> 本文件**不重复**通用原则，只补充**跨类别 / 跨平台的差异点**和**速查表**。

---

## 1. 通用原则回顾（一句话版）

> **Ant Design Motion 三原则**：自然（自然 > 机械）> 高效（100-300ms 覆盖 90% 场景）> 克制（每条动画必须有功能性目的）。
> 详尽论述、缓动函数推导、Keyframe 分类 → 看 [`animation-best-practices.md`](./animation-best-practices.md)。

---

## 2. 跨类别差异速查

不同类别项目对动画的需求差异很大。下表是经验值速查：

| 类别 | 主时长档 | 缓动默认 | 是否大量 loop | 注意事项 |
|---|---|---|---|---|
| **Dashboard / 大屏** | 400-1600ms（叙事型） | ease-out（入场）、ease-in-out（持续） | ✅ 大量（scan/aurora/ripple） | 5+ 面板同时进入 → 必须 stagger 50-100ms |
| **Admin Panel / 后台** | 100-300ms（工具型） | ease-out | ❌ 极少（仅 tooltip/dropdown） | 表格/表单 hover 不加 transition，避免操作卡顿 |
| **SaaS Marketing** | 200-600ms（叙事型） | ease-out（Hero）、linear（marquee） | ⚠️ 适度（logo 循环、scrolling 文字） | SEO 优先：避免阻塞首屏 CSS 动画 |
| **Mobile Web** | 150-300ms | ease-out / spring | ⚠️ 适度（pull-to-refresh、骨架 shimmer） | 必须尊重 `prefers-reduced-motion` |
| **Native App** | 平台规范 | iOS spring / Android Material | ✅ 多（lottie/Rive） | iOS HIG：重要过渡 250-350ms；Android：标准 200-300ms |
| **AI Products** | 200-500ms | ease-out（响应感） | ✅ 大量（typing indicator / streaming dot） | 流式输出用文字渐入而非整段 fade，避免用户错过信息 |
| **Premium / Luxury** | 600-1500ms（电影感） | cubic-bezier(0.16, 1, 0.3, 1) | ❌ 极克制 | 滚动驱动 + 视差；每屏一个 hero 动效；不抢内容 |

---

## 3. 跨平台硬约束

### 3.1 性能与可访问性

```ts
// ✅ 必须：尊重用户的"减少动画"偏好
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

if (prefersReducedMotion) {
  // 降级方案：取消 transform 距离，保留 opacity（更安全）
  element.style.transition = 'opacity 100ms'
} else {
  element.style.transition = 'transform 300ms ease-out, opacity 300ms ease-out'
}
```

| 平台 | 强制检查项 |
|---|---|
| **Web**（所有类别） | `prefers-reduced-motion` 媒体查询 + 取消 transform-only 距离 |
| **iOS** | 避免用 `CALayer` transform 距离 > 200px（GPU 性能） |
| **Android** | 用 `MotionLayout` / `AnimatedVectorDrawable` 而非手写 `ObjectAnimator` |
| **React Native** | 用 `react-native-reanimated` 跑在 UI 线程，避免 JS 线程卡顿 |

### 3.2 失焦/后台行为

| 平台 | 动画后台行为 |
|---|---|
| Web | `requestAnimationFrame` 自动暂停（最优） |
| React Native | `useNativeDriver: true` 后台冻结 |
| Flutter | 需手动实现 `WidgetsBindingObserver` |
| iOS | 系统自动停止 `CADisplayLink` |

### 3.3 触摸 vs 鼠标

- **触屏**：动画时长要**略长**（多 30-50ms），给用户反应时间
- **鼠标**：可**略短**（用户精度更高）

---

## 4. 跨类别复用决策

> 详见 [`INDEX.md`](./INDEX.md) 的"类别间共享内容的抽取原则"章节。

---

## 5. 类别专题索引

各专题目录下的动画规范（从通用到具体）：

| 类别专题 | 动画文件 | 复用度 |
|---|---|---|
| Dashboard | `dashboards/animation-matrix.md`（场景→动画映射） | 🟡 80% |
| Admin Panel | 待建设 | — |
| SaaS Marketing | 待建设（建议：Hero/scroll/marquee 三类） | — |
| Mobile Web | 待建设 | — |
| Native App | 待建设 | — |

---

## 6. 速查卡片：3 条绝对不能违反的铁律

1. **入场用 ease-out，离场用 ease-in**（参见 animation-best-practices.md §1.1）
2. **只用 `transform` + `opacity` 做持续动画**（参见 animation-best-practices.md §4）
3. **`requestAnimationFrame` 必须在 unmount 时 cancel**（参见 pitfalls #15）
