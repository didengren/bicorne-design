# 核心资产协议

> 融合 huashu-design 的核心资产协议。确保品牌资产的正确获取和使用。

---

## 一、Logo 获取协议

### 优先级

1. **SVG 格式**（首选）— 矢量，任意缩放不失真
2. **PNG 格式**（备选）— 至少 2x 分辨率
3. **JPG 格式**（避免）— 仅在无其他格式时使用

### 获取渠道（按可靠性排序）

| 优先级 | 渠道 | 说明 |
|--------|------|------|
| 1 | 品牌官方 Brand 页面 | 如 stripe.com/brand, linear.app/brand |
| 2 | Simplelogos / SVG Logo 库 | 开源 SVG logo 集合 |
| 3 | 官网首页 HTML 源码 | 提取 `<svg>` 或 `<img>` 标签 |
| 4 | WebSearch 搜索 | "[品牌名] logo svg" |

### 验证规则

- Logo 颜色是否与 DESIGN.md 中的 `colors.primary` 一致
- Logo 比例是否正确（未被拉伸）
- Logo 是否为最新版本（对比官网当前版本）

---

## 二、产品截图获取协议

### 截图类型

| 类型 | 用途 | 获取方式 |
|------|------|---------|
| 产品 UI 截图 | 展示产品功能 | 官网产品页 / 手动截图 |
| 浏览器窗口截图 | 落地页展示 | 手动截图 + 浏览器装饰 |
| 移动端截图 | 响应式展示 | 模拟器截图 / 官网素材 |

### 截图规范

- 分辨率 ≥ 2x（Retina 适配）
- 使用真实数据（可脱敏），禁止使用假数据
- 浏览器窗口装饰符合实际平台风格
- 图片格式优先 WebP，备选 PNG

---

## 三、UI 截图归档协议

### 归档结构

```
assets/
├── logos/
│   ├── [brand]-logo.svg
│   └── [brand]-logo-dark.svg
├── screenshots/
│   ├── [brand]-hero.png
│   ├── [brand]-dashboard.png
│   └── [brand]-mobile.png
└── references/
    ├── [brand]-reference-1.png
    └── [brand]-reference-2.png
```

### 命名规则

- 全小写，连字符分隔
- 格式：`[brand]-[type]-[variant].[ext]`
- 示例：`linear-logo-dark.svg`, `stripe-hero-2x.png`

---

## 四、资产使用规则

### Logo 使用

- 保持原始比例，禁止拉伸
- 品牌色 Logo 用于亮色背景，反色 Logo 用于暗色背景
- Logo 周围保留安全区域（至少 Logo 高度的 25%）
- 禁止对 Logo 添加阴影、描边、渐变等效果

### 截图使用

- 截图应展示真实功能，禁止使用"假截图"
- 截图中的数据应可辨识（非模糊处理）
- 截图加载策略：占位骨架 → 低质图 → 高清图
- 标注说明文字不遮挡关键内容

### 图标使用

- 优先使用品牌官方图标库
- 图标风格与品牌设计语言一致（线性/填充/双色）
- 图标大小与文字视觉权重对等
- 禁止混用不同风格的图标集
