# 动画最佳实践

> 融合 huashu-design 的动画知识。动画原则 + 缓动曲线 + Stage/Sprite 交付原则。

---

## 一、动画原则

### 1. 目的性

每个动效必须有功能性目的，可用一句话陈述。

- 动效不应比内容更显眼
- 无目的的动效应删除
- 好的动效是"感受得到但意识不到"的

### 2. 自然感

模拟物理世界运动规律。

- 进入用 ease-out（迅速启动，缓慢刹车）
- 退出用 ease-in（缓慢启动，迅速离开）
- 位置移动用 ease-in-out

### 3. 克制性

避免动效疲劳。

- 时长 100-300ms 覆盖 90% 场景
- 不为所有状态变化添加动效
- 进入动画可达 400ms

### 4. 一致性

同类交互使用同一套参数。

- 使用预设动画 Token
- 同类组件共享动效规范

---

## 二、核心缓动曲线

### 基础缓动

| 名称 | CSS 值 | 适用场景 | 物理直觉 |
|------|--------|---------|---------|
| ease-out | `cubic-bezier(0, 0, 0.2, 1)` | 进入动画 | 迅速启动，缓慢刹车 |
| ease-in | `cubic-bezier(0.4, 0, 1, 1)` | 退出动画 | 缓慢启动，迅速离开 |
| ease-in-out | `cubic-bezier(0.4, 0, 0.2, 1)` | 淡入淡出、位置移动 | 对称加减速 |

### 高级缓动

| 名称 | CSS 值 | 适用场景 | 物理直觉 |
|------|--------|---------|---------|
| Expo Out | `cubic-bezier(0.16, 1, 0.3, 1)` | 最常用默认 easing | 迅速启动，极慢刹车 |
| Overshoot | `cubic-bezier(0.34, 1.56, 0.64, 1)` | toggle/按钮弹出 | 带弹性的过冲 |
| Spring | `cubic-bezier(0.175, 0.885, 0.32, 1.1)` | 几何体归位、自然落位 | 物理弹簧 |

### 缓动选择决策树

```
需要动画？
├─ 元素出现 → ease-out / Expo Out
├─ 元素消失 → ease-in
├─ 位置移动 → ease-in-out
├─ 弹性反馈 → Overshoot
└─ 物理归位 → Spring
```

---

## 三、时长规范

| 场景 | 时长 | 缓动 |
|------|------|------|
| Hover 反馈 | 100-150ms | ease-out |
| 按钮点击 | 100ms | ease-out |
| 组件展开 | 200-250ms | ease-in-out |
| 淡入淡出 | 200ms | ease-in-out |
| 侧边栏展开 | 300ms | ease-in-out |
| 页面过渡 | 300ms | ease-in-out |
| 列表项进入 | 400ms | ease-in-out |
| 模态框出现 | 280ms | ease-in-out |

---

## 四、微交互规范

| 场景 | 动效描述 | 时长 | 缓动 |
|------|---------|------|------|
| 卡片 Hover | 上移 2-4px + 阴影加深 | 200ms | ease-out |
| 数字变化 | 数字向上滚动，每个数字独立动画，时延 50ms/位 | — | — |
| 列表项删除 | 滑出屏幕 + 其他项目上移填补空位 | 300ms | ease-in-out |
| Toggle 切换 | 滑块移动 + 背景色变化 | 200ms | Overshoot |
| Toast 出现 | 从底部滑入 + 淡入 | 300ms | ease-out |
| Toast 消失 | 向上滑出 + 淡出 | 200ms | ease-in |

---

## 五、Stage + Sprite 动画交付原则

### 概念

- **Stage**: 页面级动画容器，控制全局进度（0→1）
- **Sprite**: 元素级动画单元，基于 Stage 进度计算自身状态

### 交付规则

1. 每个 Sprite 必须声明自己的 `enter` 和 `exit` 进度区间
2. Sprite 之间通过进度区间实现错落入场
3. 禁止 Sprite 之间硬编码时序依赖
4. 缓动函数在 Sprite 内部应用，不依赖 Stage

### 示例

```
Stage: 0 ───────────────────────────────→ 1

Sprite 1 (标题):   [0.0 ── 0.3] enter
Sprite 2 (副标题):      [0.1 ── 0.4] enter
Sprite 3 (CTA):             [0.2 ── 0.5] enter
Sprite 4 (图片):                [0.15 ── 0.6] enter
```

### 插值函数

```js
function interpolate(t, inputRange, outputRange, easing = Easing.linear) {
  const [inMin, inMax] = inputRange
  const [outMin, outMax] = outputRange
  const progress = Math.max(0, Math.min(1, (t - inMin) / (inMax - inMin)))
  const easedProgress = easing(progress)
  return outMin + (outMax - outMin) * easedProgress
}
```

---

## 六、动画性能规则

1. **只动画 transform 和 opacity** — 这两个属性不触发 layout/paint
2. **will-change 谨慎使用** — 只在动画开始前添加，结束后移除
3. **避免同时动画超过 5 个元素** — 移动端尤其注意
4. **使用 requestAnimationFrame** — 不使用 setTimeout/setInterval
5. **GPU 加速** — 复杂动画使用 `transform: translateZ(0)` 触发 GPU 层
