---
name: bicorne-design
description: 统一设计系统 Skill：JSON Schema 驱动的三层解耦架构。Layer 1 品牌参考 → Layer 2 框架无关 token.json → Layer 3 宿主项目框架消费。融合 admin-design-spec 的五阶段方法论 + huashu-design 的知识层 + awesome-design-md 的品牌库。
license: MIT
compatibility: any-framework
metadata:
  version: 1.0.0
  author: TrinaPower Design Team
  keywords: design-system, design-token, brand-library, methodology, anti-blur, anti-slop
---

# Bicorne Design — 统一设计系统 Skill

> 三个独立 skill → 一个统一 skill，JSON Schema 驱动的三层解耦架构。

---

## 核心原则

### #0 · 事实验证先于假设（优先级最高，凌驾所有其他流程）

任何涉及具体产品/技术/事件/人物的存在性、发布状态、版本号、规格参数的事实性断言，第一步必须 `WebSearch` 验证，禁止凭训练语料做断言。

**触发条件（满足任一）**：
- 用户提到你不熟悉或不确定的具体产品名
- 涉及 2024 年及之后的发布时间线、版本号、规格参数
- 你内心冒出"我记得好像是…"、"应该还没发布"、"大概在…"的句式
- 用户请求给某个具体产品/公司做设计物料

### 1 · 意图先行

每个设计决策必须有可陈述的意图，拒绝「感觉不错」的模糊理由。

- 所有设计决策必须使用格式陈述："选择 [设计元素] 是因为 [具体理由]"
- 禁止使用模糊理由，如"感觉不错"、"看起来好看"等
- 每个设计元素的存在必须有明确的目的

### 2 · 视觉层级

信息密度、对比度、留白需服务于用户的注意力路径而非装饰。

- 信息密度：根据信息重要性调整密度，重要信息区域密度较低
- 对比度：使用对比度引导用户注意力，重要元素对比度更高
- 留白：留白服务于用户注意力路径，而非装饰性目的

### 3 · 系统思维

组件与组件之间的关系比单个组件的美观更重要。

- 组件设计必须考虑与其他组件的关系
- 组件风格必须与整体设计语言一致
- 组件复用性优先于单个组件的独特性

### 4 · 反糊化 + 反 Slop

AI 产出必须经人工审美校验，避免平均化审美带来的设计失焦。

- 所有 AI 生成的设计决策必须经过人工审核
- AI 辅助变体必须附上人工注释
- 禁止以「AI 生成」为由绕过审美判断层
- 详见 `references/methodology/anti-blur-protocol.md` 和 `references/methodology/anti-slop-checklist.md`

### 5 · Placeholder 优先

在不确定视觉方案时，先用结构化占位符表达意图，再逐步替换为真实内容。避免过早锁定视觉方案。

---

## 三层架构

```
Layer 1: 设计参考层 (References)
─ references/brand-library/ 的品牌 DESIGN.md
─ 产出: 选定品牌的原始设计数据

         │ DESIGN.md YAML
         ▼  (映射规则: references/token-mapping/mapping-rules.md)

Layer 2: 设计规范层 (Specification)
─ schema/design-token.schema.json — 框架无关的令牌规范
─ token.json — 符合 Schema 的设计令牌实例
─ 设计方法论 + 反糊化协议

         │ token.json
         ▼  (各 skill 按各自框架消费)

Layer 3: 设计执行层 (Execution)
─ 宿主项目自己的框架 skill（impeccable / vue-best-practices / ...）
─ 不是 HTML 原型，是生产级代码
```

**核心转变**：Layer 2 的 JSON Schema 是接口协议，不是实现。任何 skill 读取 token.json 即可，不需要适配层。

---

## 五阶段工作流

### PHASE 1: 需求界定

**方法**: 五阶段方法论 + #0 事实验证
**产出**: PRD + 场景切片 + 约束清单

关键步骤：
1. 业务目标对齐 — 与 PRD 关联，量化设计成功指标
2. 设计范围锁定 — 明确 In-scope 与 Out-of-scope，使用「冻结线」标记
3. 约束条件清单 — 技术约束、品牌约束、时间约束

**反模式**: 需求不明确就开始「找灵感」，导致设计方向与业务目标脱节
**异常处理**: 如果需求不明确，必须暂停设计并与产品经理沟通

### PHASE 2: 上下文收集 + 风格选择

**方法**: 读 brand-library/INDEX.md → 选 3-5 个参考品牌 → 读 DESIGN.md
**方法**: 核心资产协议（找 Logo / 产品图 / UI 截图）
**产出**: 选定品牌的 DESIGN.md + 资产归档

关键步骤：
1. 参考 3-5 个品牌 DESIGN.md，标注信息架构模式、交互反馈机制、视觉密度策略
2. 梳理现有系统上下文（组件库状态、已有设计语言）
3. 核心资产协议 — 获取 Logo / 产品图 / UI 截图
4. 技术实现评估 — 确认组件复用率、动效帧率上限

**品牌选择决策树**（详见 `references/brand-library/INDEX.md`）：
- 中后台 / 开发者工具 → ai-llm / developer-tools 分类
- 金融 / 信任感 → fintech 分类
- 营销落地页 → ecommerce 分类
- 创意工具 → design-collab 分类

### PHASE 3: 规范映射 + 变体产出

**方法**: DESIGN.md → 按 mapping-rules.md → 生成 token.json
**方法**: 方向三角（效率/清晰/表达）→ 3 个设计变体
**产出**: token.json + 3 个变体 + 评审记录

关键步骤：
1. 按 `references/token-mapping/mapping-rules.md` 将 DESIGN.md 映射为 token.json
2. 使用 `templates/dark-theme.template.json` 或 `light-theme.template.json` 作为骨架
3. 产出 3 个方向变体：
   - ① 效率优先（最短操作路径）
   - ② 信息清晰（最高可读性）
   - ③ 品牌表达（最强视觉识别）
4. 用评审框架评分（总分 100，70 分以上方可进入下一阶段）

**反模式**: 只产出 1 个方向并过早锁定，导致错过更优解

### PHASE 4: 生产实现（在宿主项目中）

**方法**: 宿主项目的框架 skill 消费 token.json → 生产级代码
**方法**: 反 slop 清单 → 反糊化三问协议
**产出**: 生产级组件 + 页面

关键步骤：
1. 宿主项目框架 skill 读取 token.json，按框架方式消费
2. 反 slop 清单逐项检查
3. 反糊化三问协议验证每个设计决策

**关键变化**：Phase 4 从"HTML 原型验证"改为"宿主项目生产实现"。不再做用完就扔的 HTML 草模。

### PHASE 5: 质量打磨

**方法**: audit（无障碍/性能/响应式）+ polish（最终打磨）
**产出**: 上线就绪的代码

关键步骤：
1. 无障碍检查 — 颜色对比度 ≥ 4.5:1，焦点状态，ARIA 标签
2. 性能检查 — 图片优化、动画帧率、首屏加载
3. 响应式验证 — 480/768/1024/1280/1536px 五断点
4. 交互状态全覆盖 — 默认/Hover/Focus/Active/Disabled/Loading/Error/Empty

---

## 场景路由

| 场景 | 优先级 | 核心能力 | 执行 Skill |
|------|--------|---------|----------|
| 中后台新页面 | 规范优先 | 五阶段 + token.json | Vue: vue-best-practices / React: impeccable |
| 营销落地页 | 风格优先 | DESIGN.md 选择 + token.json | 宿主项目框架 skill |
| 现有系统优化 | 方法优先 | 反糊化 + 三问协议 | 宿主项目框架 skill |
| 设计风格探索 | 参考优先 | brand-library 浏览 | 只出 token.json，不涉及执行 |
| 设计评审 | 方法优先 | 5 维度评审 + 三问协议 | 不涉及执行 skill |

---

## Token 消费指南

token.json 是框架无关的接口协议。各框架 skill 按自己方式消费：

### React (impeccable)

```js
// 方式 1: Tailwind config
// tailwind.config.js
import token from './token.json'
export default {
  theme: {
    extend: {
      colors: { brand: token.colors.brand, surface: token.colors.surface },
      spacing: token.spacing,
      borderRadius: token.borderRadius,
    }
  }
}

// 方式 2: CSS-in-JS theme object
const theme = {
  colors: token.colors,
  fonts: Object.fromEntries(
    Object.entries(token.typography.fontFamilies).map(([k, v]) => [k, v.stack])
  ),
}
```

### Vue (vue-best-practices)

```js
// @trinapower/tailwind-preset-desktop 配置
import token from './token.json'
export default {
  presets: [createDesktopPreset()],
  theme: {
    extend: {
      colors: { brand: token.colors.brand },
    }
  }
}
```

### 未来框架

| Skill | 消费方式 |
|-------|---------|
| Flutter skill | → `ThemeData` |
| iOS skill | → `UIColor` extension |
| Android skill | → `Color` resource |

---

## 文件导航

```
bicorne-design/
├── SKILL.md                              ← 你正在这里
├── AGENTS.md                             ← 融合方案设计文档
├── schema/
│   └── design-token.schema.json          ← 框架无关的设计令牌规范
├── references/
│   ├── brand-library/                    ← Layer 1：品牌设计系统
│   │   └── INDEX.md                      ← 分类索引 + 选择决策树
│   ├── methodology/                      ← 设计方法论
│   │   ├── design-methodology.md         ← 五阶段设计方法论
│   │   ├── anti-blur-protocol.md         ← 反糊化协议
│   │   ├── anti-slop-checklist.md        ← 反 AI slop 清单
│   │   ├── review-scoring.md             ← 变体评审框架
│   │   ├── asset-protocol.md             ← 核心资产协议
│   │   └── animation-best-practices.md   ← 动画设计知识
│   ├── design-philosophy/                ← 设计哲学
│   │   ├── design-styles.md              ← 20 种设计哲学
│   │   └── critique-guide.md             ← 专家 5 维度评审
│   └── token-mapping/                    ← Layer 1 → Layer 2 桥接
│       ├── mapping-rules.md              ← DESIGN.md → token.json 字段映射
│       ├── field-compatibility.md        ← 不同品牌字段名兼容表
│       └── examples/                     ← 示例 token.json
├── templates/
│   ├── dark-theme.template.json          ← 暗色主题骨架
│   └── light-theme.template.json         ← 亮色主题骨架
├── scripts/
│   ├── generate-token.mjs               ← token 生成脚本
│   └── validate-token.mjs               ← token 验证脚本
└── package.json
```

---

## 里程碑触发时机

| 时机 | 动作 | 产出 |
|------|------|------|
| 用户提出设计需求 | 进入 PHASE 1 | PRD + 约束清单 |
| 用户提到风格/品牌参考 | 进入 PHASE 2 | 选定 DESIGN.md |
| 需要生成设计规范 | 进入 PHASE 3 | token.json + 变体 |
| 用户要求写代码 | 进入 PHASE 4 | 生产级组件 |
| 代码写完需要打磨 | 进入 PHASE 5 | 上线就绪代码 |
| 用户只想要 token.json | 只执行 PHASE 2-3 | token.json |

---

## 快速开始

1. **做风格选择时** → 读 `references/brand-library/INDEX.md`，选 3-5 个参考品牌
2. **需要设计规范时** → 按 `references/token-mapping/mapping-rules.md` 生成 token.json
3. **做设计决策时** → 用 `references/methodology/anti-blur-protocol.md` 三问协议验证
4. **写代码时** → 宿主项目框架 skill 消费 token.json
5. **评审时** → 用 `references/design-philosophy/critique-guide.md` 5 维度评审
