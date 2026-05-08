# Design System Skill 融合方案

> 三个独立 skill → 一个统一 skill，JSON Schema 驱动的三层解耦架构。
> 重构时间：2026-05-08

---

## 一、为什么重构

原始三个 skill 各自完整但存在三个结构性问题：

| 问题 | 表现 | 后果 |
|------|------|------|
| HTML 原型层多余 | [huashu-design](/Users/admin/work_space/github/huashu-design) 用 React CDN 做原型，验证完就扔。 | 宿主项目本身是 React/Vue，原型应在项目里做 |
| Token 绑死 Tailwind | [admin-design-spec](/Users/admin/work_space/trinapower/gsdefe/skills/admin-design-spec) 的 `bg-brand-500` 只有 Vue+Tailwind 能消费 | 其他框架 skill 无法使用 |
| 品牌参考无桥接 | [awesome-design-md](/Users/admin/work_space/github/awesome-design-md) 只有文档，缺乏向规范的映射通道 | 70 个 DESIGN.md 只是参考读物，无法自动注入 |

**解法**：Token 格式改为 JSON Schema（框架无关），[huashu-design](/Users/admin/work_space/github/huashu-design) 只留知识层丢掉执行层，DESIGN.md 通过映射规则转为 token.json。

---

## 二、三层解耦架构

```
Layer 1: 设计参考层 (References)
─ awesome-design-md 的 71 个 DESIGN.md
─ 产出: 选定品牌的原始设计数据

         │ DESIGN.md YAML
         ▼  (映射规则)

Layer 2: 设计规范层 (Specification)
─ design-token.schema.json — 框架无关的令牌规范
─ token.json — 符合 Schema 的设计令牌实例
─ 设计方法论 + 反糊化协议

         │ token.json
         ▼  (各 skill 按各自框架消费)

Layer 3: 设计执行层 (Execution)
─ 宿主项目自己的框架 skill（impeccable / vue-best-practices / ...）
─ 不是 huashu-design 的 HTML 原型
```

**核心转变**：Layer 2 的 JSON Schema 是接口协议，不是实现。任何 skill 读取 token.json 即可，不需要适配层。

---

## 三、三个来源的去留决策

### 3.1 awesome-design-md → references/brand-library/

直接引用，不做"识别"机制。SKILL.md 写明"做风格选择时读这些文件"即可。

精选分类（从 70 个品牌中按实用性筛选）：

| 分类 | 品牌 | 典型场景 |
|------|------|---------|
| AI & LLM | claude, cursor, cohere, mistral.ai, replicate | 中后台、开发者工具 |
| 开发工具 | linear.app, vercel, raycast, warp, sentry | 中后台、CLI |
| 金融科技 | stripe, coinbase, revolut, wise | 信任感、专业感 |
| 电商零售 | nike, shopify, airbnb | 营销落地页 |
| 设计协作 | figma, framer, miro, notion | 创意工具 |

### 3.2 admin-design-spec → schema/ + references/methodology/

| 内容 | 去向 | 价值 |
|------|------|------|
| Token 体系 | 重构为 `design-token.schema.json` | **极高** — 框架无关的接口协议 |
| 五阶段设计方法论 | `references/methodology/design-methodology.md` | **高** — 保留完整 |
| 反糊化协议 | `references/methodology/anti-blur-protocol.md` | **高** — 保留完整 |
| Tailwind 类名规则 | **丢弃** | 被 JSON Schema 取代 |
| 变体评审框架 | `references/methodology/review-scoring.md` | **中** — 保留 |

### 3.3 huashu-design → 保留知识层，丢弃执行层

| 内容 | 来源文件 | 去向 | 价值 |
|------|---------|------|------|
| #0 事实验证先于假设 | SKILL.md | 合并进融合 SKILL.md | 极高 |
| 核心资产协议（找 Logo/产品图） | SKILL.md | `references/methodology/asset-protocol.md` | 极高 |
| 反 AI slop 清单 | SKILL.md | `references/methodology/anti-slop-checklist.md` | 高 |
| Junior Designer 工作流 | workflow.md | 合并进 design-methodology.md | 高 |
| 20 种设计哲学 | design-styles.md | `references/design-philosophy/design-styles.md` | 中高 |
| 专家评审 5 维度 | critique-guide.md | `references/design-philosophy/critique-guide.md` | 中高 |
| 动画最佳实践 | animation-best-practices.md, animations.md | `references/methodology/animation-best-practices.md` | 中 |
| React + Babel CDN 设置 | react-setup.md | **丢弃** | 无 |
| HTML 原型组件 | animations.jsx, design_canvas.jsx 等 | **丢弃** | 执行层不属于融合 skill |
| 幻灯片/视频导出 | slide-decks.md, video-export.md | **丢弃** | 除非专门做演示 |
| 音效库/BGM | assets/sfx/, assets/bgm-*.mp3 | **丢弃** | 低 |

---

## 四、核心：JSON Schema 与映射规则

### 4.1 token.json 结构概要

token.json 是三层架构的核心接口，定义在 `schema/design-token.schema.json`：

```jsonc
{
  "meta": { "name": "linear-dark", "version": "1.0.0", "source": "references/brand-library/linear.app/DESIGN.md", "theme": "dark" },
  "colors": {
    "brand":  { "50":"#eef0ff", ..., "500":"#5e6ad2", ..., "900":"#1a1d4f" },
    "surface": { "base":"#010102", "1":"#0f1011", "2":"#141516", "3":"#18191a" },
    "ink":    { "default":"#f7f8f8", "muted":"#d0d6e0", "subtle":"#8a8f98", "tertiary":"#62666d" },
    "border": { "default":"#23252a", "strong":"#34343a", "subtle":"#3e3e44" },
    "semantic": { "success":"#27a644", "danger":"#e5484d", "warning":"#f5a623", "info":"#5e6ad2" }
  },
  "typography": {
    "fontFamilies": { "display": { "name":"Linear Display", "stack":"'Linear Display','SF Pro Display',sans-serif" }},
    "scales": { "display-xl": { "fontSize":"80px", "fontWeight":600, "lineHeight":1.05, "letterSpacing":"-3px" }}
  },
  "spacing":      { "1":4, "2":8, "3":12, "4":16, "5":20, "6":24, "8":32, "10":40, "12":48, "16":64 },
  "borderRadius": { "sm":4, "md":8, "lg":12, "xl":16, "2xl":24, "full":9999 },
  "shadows":      { "sm":{ "value":"0 1px 2px rgba(0,0,0,0.3)" }, "brand":{ "value":"0 4px 12px rgba(94,106,210,0.25)" }},
  "transitions":  { "default":{ "duration":"200ms", "easing":"cubic-bezier(0.4,0,0.2,1)" }}
}
```

### 4.2 DESIGN.md → token.json 映射规则

不同品牌的 DESIGN.md 字段名不统一，需要兼容映射：

| DESIGN.md 常见字段 | token.json 目标 | 映射逻辑 |
|-------------------|----------------|---------|
| `colors.primary` / `colors.brand` / `colors.accent-color` | `colors.brand.500` | 直接取值，算法生成 10 级色阶 |
| `colors.canvas` / `colors.background` / 亮色默认 `#ffffff` | `colors.surface.base` | 暗色主题优先取 canvas |
| `colors.ink` / `colors.foreground` / `colors.text-primary` | `colors.ink.default` | 主文字色 |
| `colors.ink-muted` / `colors.foreground-muted` | `colors.ink.muted` | 次要文字 |
| `colors.hairline` / `colors.border` / `colors.divider` | `colors.border.default` | 边框色 |
| `typography.*` | `typography.scales.*` | 直接映射字号/字重/行高/字距 |

**10 级色阶生成**：DESIGN.md 只提供 1 个 primary 值，用算法（与 @ant-design/colors 一致）自动生成 brand.50 ~ brand.900。

### 4.3 各 Skill 消费 token.json 的方式

| Skill | 消费方式 |
|-------|---------|
| impeccable (React) | → Tailwind config `theme.extend` 或 CSS-in-JS theme object |
| vue-best-practices (Vue) | → `@trinapower/tailwind-preset-desktop` 配置 |
| 未来 Flutter skill | → `ThemeData` |
| 未来 iOS skill | → `UIColor` extension |

**关键**：token.json 是接口协议，不是实现。各 skill 按自己框架翻译即可。

---

## 五、五阶段工作流

```
PHASE 1: 需求界定
  方法: 五阶段方法论 + #0 事实验证
  产出: PRD + 场景切片 + 约束清单

PHASE 2: 上下文收集 + 风格选择
  方法: 读 brand-library/INDEX.md → 选 3-5 个参考品牌 → 读 DESIGN.md
  方法: 核心资产协议（找 Logo / 产品图 / UI 截图）
  产出: 选定品牌的 DESIGN.md + 资产归档

PHASE 3: 规范映射 + 变体产出
  方法: DESIGN.md → 按 mapping-rules.md → 生成 token.json
  方法: 方向三角（效率/清晰/表达）→ 3 个设计变体
  产出: token.json + 3 个变体 + 评审记录

PHASE 4: 生产实现（在宿主项目中）
  方法: 宿主项目的框架 skill 消费 token.json → 生产级代码
  方法: 反 slop 清单 → 反糊化三问协议
  产出: 生产级组件 + 页面

PHASE 5: 质量打磨
  方法: audit（无障碍/性能/响应式）+ polish（最终打磨）
  产出: 上线就绪的代码
```

**关键变化**：Phase 4 从"HTML 原型验证"改为"宿主项目生产实现"。不再做用完就扔的 HTML 草模。

---

## 六、场景路由

| 场景 | 优先级 | 核心能力 | 执行 Skill |
|------|--------|---------|----------|
| 中后台新页面 | 规范优先 | 五阶段 + token.json | Vue: vue-best-practices / React: impeccable |
| 营销落地页 | 风格优先 | DESIGN.md 选择 + token.json | 宿主项目框架 skill |
| 现有系统优化 | 方法优先 | 反糊化 + 三问协议 | 宿主项目框架 skill |
| 设计风格探索 | 参考优先 | brand-library 浏览 | 只出 token.json，不涉及执行 |
| 设计评审 | 方法优先 | 5 维度评审 + 三问协议 | 不涉及执行 skill |

---

## 七、目录结构

```
design-system-skill/
├── SKILL.md                            # 统一入口：原则 + 工作流 + 场景路由
├── schema/
│   └── design-token.schema.json        # 框架无关的设计令牌规范
├── references/
│   ├── brand-library/                  # Layer 1：品牌设计系统
│   │   ├── INDEX.md                    # 分类索引 + 选择决策树
│   │   ├── ai-llm/                     # claude, cursor, cohere...
│   │   ├── developer-tools/            # linear.app, vercel, raycast...
│   │   ├── fintech/                    # stripe, coinbase, revolut...
│   │   ├── ecommerce/                  # nike, shopify, airbnb...
│   │   └── design-collab/              # figma, framer, notion...
│   ├── methodology/                    # 设计方法论
│   │   ├── design-methodology.md       # 五阶段（合并 huashu-design 工作流）
│   │   ├── anti-blur-protocol.md       # 反糊化协议（admin-design-spec）
│   │   ├── anti-slop-checklist.md      # 反 AI slop 清单（huashu-design）
│   │   ├── review-scoring.md           # 变体评审框架
│   │   ├── asset-protocol.md           # 核心资产协议（huashu-design）
│   │   └── animation-best-practices.md # 动画设计知识（huashu-design）
│   ├── design-philosophy/              # 设计哲学
│   │   ├── design-styles.md            # 20 种设计哲学
│   │   └── critique-guide.md           # 专家 5 维度评审
│   └── token-mapping/                 # Layer 1 → Layer 2 桥接
│       ├── mapping-rules.md            # DESIGN.md → token.json 字段映射
│       ├── field-compatibility.md       # 不同品牌字段名兼容表
│       └── examples/
│           ├── linear-dark.token.json
│           └── stripe-light.token.json
├── templates/
│   ├── dark-theme.template.json        # 暗色主题骨架
│   └── light-theme.template.json       # 亮色主题骨架
└── package.json
```

---

## 八、开发计划

### Phase 0：基础搭建（1 天）

**目标**：创建 skill 仓库骨架，定义 JSON Schema。

| 序号 | 任务 | 产出文件 | 验收标准 |
|------|------|---------|---------|
| 0-1 | 创建项目目录结构 | 完整目录树 | 所有目录和空占位文件就位 |
| 0-2 | 编写 `design-token.schema.json` | `schema/design-token.schema.json` | 用 ajv 验证示例 token.json 通过 |
| 0-3 | 编写 `dark-theme.template.json` 和 `light-theme.template.json` | `templates/` 下两个文件 | 符合 Schema，填默认值 |
| 0-4 | 编写 `mapping-rules.md` | `references/token-mapping/mapping-rules.md` | 覆盖 4.2 节所有字段映射 |
| 0-5 | 编写 `field-compatibility.md` | `references/token-mapping/field-compatibility.md` | 覆盖至少 5 个品牌的不同字段命名 |

### Phase 1：SKILL.md 核心（2 天）

**目标**：融合三套原则，编写统一入口文件。

| 序号 | 任务 | 产出文件 | 验收标准 |
|------|------|---------|---------|
| 1-1 | 合并核心原则 | SKILL.md 原则章节 | 覆盖三套来源：意图先行、事实验证、反糊化+反 slop、Placeholder 优先 |
| 1-2 | 编写五阶段工作流 | SKILL.md 工作流章节 | 每阶段明确：方法、产出、检查点 |
| 1-3 | 编写场景路由表 | SKILL.md 路由章节 | 5 个场景 × 3 列（优先级/核心能力/执行 skill） |
| 1-4 | 编写 token 消费指南 | SKILL.md 消费章节 | 说明各框架 skill 如何读取 token.json |

### Phase 2：知识提取（3 天）

**目标**：从三个源项目提取知识层内容。

| 序号  | 任务             | 源文件                                                       | 产出文件                                                 | 验收标准                         |
| --- | -------------- | --------------------------------------------------------- | ---------------------------------------------------- | ---------------------------- |
| 2-1 | 精选品牌 DESIGN.md | awesome-design-md/design-md/                              | `references/brand-library/` 25+ 品牌                   | INDEX.md 含分类索引和选择决策树         |
| 2-2 | 合并方法论          | admin-design-spec SKILL.md + huashu-design workflow.md    | `references/methodology/design-methodology.md`       | 五阶段完整，合并 Junior Designer 工作流 |
| 2-3 | 合并反糊化          | admin-design-spec 反糊化协议                                   | `references/methodology/anti-blur-protocol.md`       | 三问协议 + 审美锚点 + 制造张力           |
| 2-4 | 合并反 slop       | huashu-design SKILL.md                                    | `references/methodology/anti-slop-checklist.md`      | 反 AI slop 清单完整               |
| 2-5 | 提取资产协议         | huashu-design SKILL.md                                    | `references/methodology/asset-protocol.md`           | Logo/产品图/UI 截图获取规则           |
| 2-6 | 提取设计哲学         | huashu-design design-styles.md + critique-guide.md        | `references/design-philosophy/` 下两个文件                | 20 种哲学 + 5 维度评审              |
| 2-7 | 提取动画知识         | huashu-design animation-best-practices.md + animations.md | `references/methodology/animation-best-practices.md` | 动画原则 + Stage/Sprite 交付原则     |

### Phase 3：Token 管线（3 天）

**目标**：实现 DESIGN.md → token.json 的自动化映射。

| 序号 | 任务 | 产出 | 验收标准 |
|------|------|------|---------|
| 3-1 | 编写 token 生成脚本（Node.js） | `scripts/generate-token.mjs` | 输入 DESIGN.md 路径 + 主题模式 → 输出符合 Schema 的 token.json |
| 3-2 | 生成 Linear Dark 示例 | `references/token-mapping/examples/linear-dark.token.json` | ajv 校验通过 + 与手工映射对比一致 |
| 3-3 | 生成 Stripe Light 示例 | `references/token-mapping/examples/stripe-light.token.json` | ajv 校验通过 |
| 3-4 | 验证字段兼容性 | 选择 5 个字段命名差异大的品牌测试 | 对 Claude/Stripe/Nike/Spotify/Tesla 的 DESIGN.md 均能正确映射 |
| 3-5 | 编写 10 级色阶算法 | 集成到 generate-token.mjs | 输入 primary → 输出 brand.50 ~ brand.900，与 @ant-design/colors 结果对比 |

### Phase 4：端到端验证（2 天）

**目标**：用真实项目验证 skill 的完整工作流。

| 序号 | 任务 | 方法 | 验收标准 |
|------|------|------|---------|
| 4-1 | 选一个中后台场景测试 | 选 Linear 品牌 → 生成 token.json → 用 vue-best-practices 生成组件 | 组件使用 token.json 中的颜色/间距/字号 |
| 4-2 | 选一个落地页场景测试 | 选 Stripe 品牌 → 生成 token.json → 用 impeccable 生成页面 | 页面风格与 Stripe DESIGN.md 一致 |
| 4-3 | 反糊化验证 | 对 4-1 和 4-2 的产出执行三问协议 + 反 slop 清单 | 所有设计决策均可回答"为什么" |

### Phase 5：打磨交付（2 天）

**目标**：完善文档，确保 skill 可独立运行。

| 序号 | 任务 | 产出 | 验收标准 |
|------|------|------|---------|
| 5-1 | 编写 `package.json` | 完整的 npm 包配置 | 含 scripts: generate-token, validate-token |
| 5-2 | 补充 SKILL.md 的里程碑章节 | 明确 token 生成和消费的触发时机 | AI agent 读 SKILL.md 即可按流程执行 |
| 5-3 | 全量 review | 所有文件 | 无内容遗漏、无自相矛盾、目录结构与第七节一致 |
| 5-4 | 编写 README.md | 项目说明 + 快速开始 | 新用户 5 分钟内理解 skill 用途 |

---

## 附录：V1 与 V2 关键差异

| 维度 | V1（旧） | V2（本方案） |
|------|---------|-------------|
| 设计规范 | Tailwind 类名 `bg-brand-500` | JSON Schema → 框架无关的 token.json |
| 设计执行 | huashu-design HTML 原型（React CDN） | 宿主项目自己的框架 skill |
| 桥接层 | Token Mapper + Style Bridge 两层 | 只需 DESIGN.md → token.json 一层映射 |
| 其他 skill 消费 | 无法消费（绑定 Tailwind） | 任何 skill 读取 token.json 即可 |
| huashu-design | 完整保留 | 只留知识层，丢弃执行层 |
| 品牌引用 | 复制 DESIGN.md 到项目根目录 | 直接在 references/brand-library/ 引用 |
