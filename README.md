# Bicorne Design

统一设计系统 Skill — JSON Schema 驱动的三层解耦架构，从品牌参考到框架无关的 token.json，再到宿主项目生产级代码。

## 这是什么

Bicorne Design 是一个 AI agent 用的设计系统知识库。它解决的核心问题：

- **品牌风格 → 设计规范**：60 个品牌的 DESIGN.md 通过映射规则生成框架无关的 `token.json`
- **设计规范 → 生产代码**：任何框架 skill 读取 `token.json` 即可，不需要适配层
- **设计质量守门**：五阶段方法论 + 反糊化协议 + 反 AI slop 清单，确保每个设计决策有意图

## 融合背景

本 Skill 融合了三个独立 skill 的核心价值，通过 JSON Schema 驱动的三层解耦架构解决原有结构性问题：

| 来源 skill | 借鉴内容 | 解决的问题 |
|-----------|---------|-----------|
| [huashu-design](https://github.com/alchaincyf/huashu-design) | 知识层（方法论、设计哲学、资产协议） | 丢弃 HTML 原型执行层，原型应在宿主项目中做 |
| admin-design-spec（内部） | Token 体系 → 重构为框架无关的 JSON Schema | 解绑 Tailwind，任何框架 skill 均可消费 |
| [awesome-design-md](https://github.com/VoltAgent/awesome-design-md) | 60 个品牌 DESIGN.md → brand-library/ | 建立向规范的映射通道，不再只是参考读物 |

**核心转变**：Token 格式从 Tailwind 类名（`bg-brand-500`）改为 JSON Schema，成为框架无关的接口协议。

## 三层架构

```
Layer 1: 设计参考层
  references/brand-library/ — 60 个品牌 DESIGN.md
         │
         ▼  mapping-rules.md
Layer 2: 设计规范层
  schema/design-token.schema.json + token.json + 方法论
         │
         ▼  各 skill 按各自框架消费
Layer 3: 设计执行层
  宿主项目的框架 skill（impeccable / vue-best-practices / ...）
```

**关键**：Layer 2 的 `token.json` 是接口协议，不是实现。

## 快速开始

### 1. 选品牌风格

读 `references/brand-library/INDEX.md`，按场景选 3-5 个参考品牌：

| 场景 | 推荐分类 |
|------|---------|
| 中后台 / 开发者工具 | ai-llm / developer-tools |
| 金融 / 信任感 | fintech |
| 营销落地页 | ecommerce |
| 移动端 App | consumer-lifestyle / social-communication |
| 数据展示大屏 | developer-tools / automotive |

### 2. 生成 token.json

```bash
# 从品牌 DESIGN.md 生成 token.json
npm run generate-token -- <DESIGN.md路径> --name <品牌名> --theme <dark|light>

# 示例
npm run generate:linear   # Linear 暗色
npm run generate:stripe   # Stripe 亮色

# 验证 token.json 是否符合 Schema
npm run validate-token -- <token.json路径>
```

### 3. 在项目中消费

```js
// React + Tailwind
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
```

### 4. 用方法论保障质量

| 方法论 | 用途 | 文件 |
|--------|------|------|
| 五阶段设计方法论 | 从需求到上线的完整流程 | `references/methodology/design-methodology.md` |
| 反糊化协议 | 验证设计决策有意图 | `references/methodology/anti-blur-protocol.md` |
| 反 AI slop 清单 | 避免 AI 产出的平均化审美 | `references/methodology/anti-slop-checklist.md` |
| 页面框架规范 | 8 种框架类型 F1-F8 | `references/methodology/page-framework.md` |
| 响应式降级策略 | 断点降级方案 | `references/methodology/responsive-degradation.md` |
| 组件状态覆盖 | 通用空/加载状态 | `references/methodology/ui-states.md` |
| **Dashboard 6 状态** | **数据大屏专用** | **`dashboards/ui-states.md`** |
| **Dashboard 排版** | **数据大屏专用** | **`dashboards/typography.md`** |
| **Dashboard 动画映射** | **数据大屏专用** | **`dashboards/animation-matrix.md`** |
| **Dashboard 反模式** | **数据大屏专用** | **`dashboards/pitfalls/`** |

## 目录结构

```
bicorne-design/
├── SKILL.md                              # AI agent 入口（原则 + 工作流 + 场景路由）
├── package.json
│
├── # L1 · 通用层（类别无关）
├── schema/
│   └── design-token.schema.json          # 框架无关的设计令牌规范
├── references/                           # Layer 1 + Layer 2 输入
│   ├── brand-library/                    # 60 个品牌 DESIGN.md + INDEX.md
│   ├── methodology/                      # 12 个方法论文档（通用）
│   ├── design-philosophy/                # 设计哲学 + 评审指南
│   └── token-mapping/                    # 映射规则 + 示例 token.json
├── templates/                            # 5 个平台模板
├── scripts/                              # generate-token + validate-token
│
└── # L2 · 平台专题（按项目类别组织）
    └── dashboards/                       # Dashboard / 大屏 / 驾驶舱 / 监控屏
        ├── README.md                     # 类别专题索引
        ├── meta-prompt.md                # PHASE 4 前预检清单
        ├── component-contract/           # 8 个核心组件契约
        ├── layouts/                      # L1-L8 布局原型
        ├── data-viz/                     # 6 种数据可视化
        ├── animation-matrix.md           # 场景→动画曲线/时长映射
        ├── typography.md                 # dashboard 专用排版
        ├── ui-states.md                  # dashboard 6 状态
        ├── performance.md                # 60fps 性能预算
        ├── pitfalls/                     # 25 个反模式
        ├── tailwind-bridge/              # token.json → tailwind.config.ts
        └── verification/                 # 3 个真实参考实现
            ├── 4-1-linear-vue/
            ├── 4-2-stripe-landing/
            └── 4-3-dashboard-command-center/
```

## 支持平台

| 平台 | 模板 | 执行 Skill |
|------|------|-----------|
| 桌面 Web | dark / light | impeccable (React) / vue-best-practices (Vue) |
| 移动端 Web | mobile-dark / mobile-light | impeccable / vue-best-practices |
| 数据大屏 | dashboard-dark | 宿主项目框架 skill |
| 原生 App | mobile-dark / mobile-light | vercel-react-native-skills / Flutter / iOS / Android（后三者待建设） |

## License

MIT
