---
name: bicorne-design
description: 创建设计系统、生成 design token、UI 设计时使用。触发：中后台页面、营销落地页、移动端界面、数据大屏、设计评审、风格探索、UI 优化。不触发：纯后端逻辑、数据库设计、API 开发、运维配置
license: MIT
compatibility: any-framework
metadata:
  version: 0.1.0
  author: Sam Xu <twonian@gmail.com>
  keywords: design-system, design-token, brand-library, methodology, anti-blur, anti-slop
---

# Bicorne Design — 统一设计系统 Skill

> JSON Schema 驱动的三层解耦架构，框架无关。

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

**原则优先级**：#0 > 1 > 2 > 3 > 4 > 5。冲突时高优先级覆盖低优先级；视觉层级与系统思维冲突时系统一致性优先；意图先行与 Placeholder 优先冲突时先明确意图再占位。

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
─ 宿主项目自己的框架 skill（impeccable / ...）
─ 不是 HTML 原型，是生产级代码
```

Layer 2 的 JSON Schema 是接口协议，不是实现。任何 skill 读取 token.json 即可，不需要适配层。

---

## 五阶段工作流

> 各阶段完整步骤、反模式、异常处理详见 `references/methodology/design-methodology.md`

### PHASE 1: 需求界定

**目标**: 明确「要解决什么问题」，而非「要画什么界面」
**方法**: 五阶段方法论 + #0 事实验证
**产出**: PRD + 场景切片 + 约束清单（含平台约束）

### PHASE 2: 上下文收集 + 风格选择

**目标**: 让设计决策有据可依，而非凭感觉发散
**方法**: 读 `brand-library/INDEX.md` → 选 3-5 个参考品牌 → 读 DESIGN.md；核心资产协议 → `asset-protocol.md`
**产出**: 参考设计分析报告 + 选定品牌 DESIGN.md + 资产归档 + 技术约束确认

### PHASE 3: 规范映射 + 变体产出

**目标**: 至少产出 3 个可陈述意图不同的设计方向
**方法**: DESIGN.md → `mapping-rules.md` → 生成 token.json；方向三角（效率/清晰/表达）→ 3 个变体
**产出**: token.json + 3 个可陈述方向的设计变体 + 评审记录 + 选型决策日志

### PHASE 4: 生产实现

**目标**: 在宿主项目中直接产出生产级代码
**方法**: 框架 skill 消费 token.json；页面框架 → `page-framework.md`；响应式 → `responsive-degradation.md`；状态覆盖 → `ui-states.md`；反 slop → `anti-slop-checklist.md`；反糊化 → `anti-blur-protocol.md`
**产出**: 生产级组件 + 页面 + 状态覆盖清单

### PHASE 5: 质量打磨

**目标**: 确保上线就绪
**方法**: audit（无障碍/性能/响应式/交互状态）+ polish（审美校验）；平台特定检查详见 `design-methodology.md` Phase 5
**产出**: 上线就绪的代码 + a11y 分数 + 响应式截图矩阵 + 状态覆盖清单

---

## 场景路由

| 场景 | 优先级 | 核心能力 | 执行 Skill |
|------|--------|---------|----------|
| 中后台新页面 | 规范优先 | 五阶段 + token.json | Vue: vue-best-practices / React: impeccable |
| 营销落地页 | 风格优先 | DESIGN.md 选择 + token.json | 宿主项目框架 skill |
| 现有系统优化 | 方法优先 | 反糊化 + 三问协议 | 宿主项目框架 skill |
| 设计风格探索 | 参考优先 | brand-library 浏览 | 只出 token.json，不涉及执行 |
| 设计评审 | 方法优先 | 5 维度评审 + 三问协议 | 不涉及执行 skill |
| 移动端 Web | 触摸优先 | 五阶段 + mobile token.json | React: impeccable / Vue: vue-best-practices |
| 原生 App | 平台规范优先 | 五阶段 + mobile token.json + 平台 HIG | React Native: vercel-react-native-skills / Flutter/iOS/Android（待建设） |
| 数据展示大屏 | 信息密度优先 | 五阶段 + dashboard token.json | 宿主项目框架 skill |

---

## Token 消费路线

token.json 是框架无关的接口协议，各框架 skill 按自己方式消费：

| Skill | 消费方式 | 状态 |
|-------|---------|------|
| React (impeccable) | Tailwind config `theme.extend` / CSS-in-JS theme object | 已有 |
| Vue (vue-best-practices) | tailwind.config.js 配置 | 已有 |
| React Native (vercel-react-native-skills) | NativeWind / StyleSheet + token.json | 已有 |
| Flutter skill | `ThemeData` | 待建设 |
| iOS skill | `UIColor` extension + `UIFont` metrics | 待建设 |
| Android skill | `Color` resource + `dimens.xml` | 待建设 |

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
│   │   ├── animation-best-practices.md   ← 动画设计知识
│   │   ├── ui-states.md                  ← 空状态 + 加载状态设计规范
│   │   ├── responsive-degradation.md     ← 响应式降级策略
│   │   ├── page-framework.md             ← 页面框架规范
│   │   ├── slide-design.md               ← 幻灯片设计规范
│   │   ├── product-presentation.md       ← 产品展示规范
│   │   └── font-loading-strategy.md      ← 字体加载策略
│   ├── design-philosophy/                ← 设计哲学
│   │   ├── design-styles.md              ← 20 种设计哲学
│   │   └── critique-guide.md             ← 专家 5 维度评审
│   └── token-mapping/                    ← Layer 1 → Layer 2 桥接
│       ├── mapping-rules.md              ← DESIGN.md → token.json 字段映射
│       ├── field-compatibility.md        ← 不同品牌字段名兼容表
│       └── examples/                     ← 示例 token.json
│           ├── linear-dark.token.json              ← Linear 桌面暗色主题
│           ├── linear-dashboard-dark.token.json     ← Linear 大屏暗色主题
│           ├── linear-mobile-dark.token.json        ← Linear 移动端暗色主题
│           ├── stripe-light.token.json              ← Stripe 桌面亮色主题
│           └── stripe-mobile-light.token.json       ← Stripe 移动端亮色主题
├── templates/
│   ├── dark-theme.template.json          ← 暗色主题骨架
│   ├── light-theme.template.json         ← 亮色主题骨架
│   ├── mobile-dark.template.json         ← 移动端暗色主题骨架
│   ├── mobile-light.template.json        ← 移动端亮色主题骨架
│   └── dashboard-dark.template.json      ← 大屏暗色主题骨架
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
| 已有 token.json | 跳至 PHASE 4 | — |
| PHASE 4 发现 token 不够 | 回退 PHASE 3 补充 | 补充后的 token.json |
| 只做设计评审 | 不进入任何 Phase | 评审报告 |

---

## 快速开始

1. **做风格选择时** → 读 `references/brand-library/INDEX.md`，选 3-5 个参考品牌
2. **需要设计规范时** → 按 `references/token-mapping/mapping-rules.md` 生成 token.json
3. **做设计决策时** → 用 `references/methodology/anti-blur-protocol.md` 三问协议验证
4. **写代码时** → 宿主项目框架 skill 消费 token.json
5. **评审时** → 用 `references/design-philosophy/critique-guide.md` 5 维度评审
