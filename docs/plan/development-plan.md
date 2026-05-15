# 开发计划

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
