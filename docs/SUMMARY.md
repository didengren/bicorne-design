# Bicorne Design — 能力盘点

> 最后更新：2026-05-15

---

## 一、已建成的能力

### 1.1 项目骨架与规范

| 能力 | 文件 | 说明 |
|------|------|------|
| 统一入口 SKILL.md | `SKILL.md` | 五核心原则 + 三层架构 + 五阶段工作流 + 场景路由 + Token 消费指南 + 里程碑触发时机 |
| AGENTS.md 融合方案 | `AGENTS.md` | 详细的重构决策文档、去留决策、五阶段开发计划 |
| npm 包配置 | `package.json` | 含 `generate-token`、`validate-token`、`generate:linear`、`generate:stripe` 脚本命令 |

---

### 1.2 Layer 1：设计参考层（品牌库 — 60 个品牌）

| 分类 | 品牌 | 设计价值 |
|------|------|----------|
| AI & LLM | Claude | 温暖对话感 + 奶油色调 |
| AI & LLM | Cursor | 暗色 IDE 美学 + 代码感 |
| AI & LLM | Cohere | 深蓝科技感 + 数据可视化 |
| AI & LLM | Mistral.ai | 法式极简 + 橙色强调 |
| AI & LLM | Replicate | 暗色网格 + 模型卡片 |
| AI & LLM | ElevenLabs | 编辑式杂志美学 + 大气渐变球 |
| AI & LLM | x.ai | 暗色极简 + 等宽字体作 Display |
| AI & LLM | Ollama | 极简文档优先 + 黑白药丸 |
| AI & LLM | NVIDIA | 工程级黑绿 + NVIDIA Green 电压 + 2px 直角 |
| AI & LLM | RunwayML | 电影级暗色 + 全出血摄影 + abcNormal 单字体 |
| AI & LLM | Together.ai | 柔粉渐变 + 午夜蓝暗面 + The Future 字体 |
| AI & LLM | Lovable | 暖奶油画布 + Camera Plain + 透明度驱动色阶 |
| 开发工具 | Linear.app | 近纯黑画布 + 薰衣草蓝 + 四级表面阶梯 |
| 开发工具 | Vercel | 极简白 + Geist 字体 + 阴影即边框 |
| 开发工具 | Raycast | 暗色命令面板 + 搜索优先 |
| 开发工具 | Warp | 暗色终端 + 区块化命令 |
| 开发工具 | Sentry | 深紫品牌 + 错误追踪 |
| 开发工具 | Supabase | 暗色原生 + 翡翠绿 + HSL 半透明层叠 |
| 开发工具 | PostHog | 暖奶油画布 + 刺猬吉祥物 + 黄橙 CTA |
| 开发工具 | HashiCorp | 近纯黑 + 多产品色彩标识 + charcoal 卡片 |
| 开发工具 | Mintlify | 天空渐变 Hero + Mintlify 绿 + 三栏文档布局 |
| 开发工具 | MongoDB | 深青黑 Hero + MongoDB 绿药丸 + Euclid Circular A |
| 开发工具 | ClickHouse | 近纯黑 + 电黄品牌电压 + Inter 7 字重 |
| 开发工具 | Expo | 白画布天蓝渐变 + 纯黑 CTA + 设备 Mockup Hero |
| 开发工具 | Resend | 近纯黑 + Domaine Display 衬线大标题 + ABC Favorit |
| 开发工具 | Superhuman | 深紫渐变 Hero + Super Sans VF + 暖奶油按钮 |
| 金融科技 | Stripe | 白色画布 + 紫罗兰 + sohne-var 300 |
| 金融科技 | Coinbase | 机构级蓝 + 展示字重 400 |
| 金融科技 | Revolut | 深紫渐变 + 金融超级应用 |
| 金融科技 | Wise | 绿色信任 + 透明感 |
| 金融科技 | Binance | 近纯黑 + Binance 黄 CTA + BinanceNova 自定义字体 |
| 金融科技 | Mastercard | 暖奶油画布 + 极端圆角 + 轨道圆弧系统 + MarkForMC |
| 电商零售 | Nike | 摄影优先 + 96px 大写 Futura + 药丸 CTA |
| 电商零售 | Shopify | 绿色商业 + 商家仪表盘 |
| 电商零售 | Airbnb | Rausch 红 + 药丸搜索栏 + 摄影主导 |
| 设计协作 | Figma | 黑白核心 + 超大色块段落 + figmaSans |
| 设计协作 | Framer | 近纯黑 + GT Walsheim -5.5px + 渐变聚光灯 |
| 设计协作 | Miro | 黄色活力 + 无限画布 |
| 设计协作 | Notion | 深海军蓝英雄带 + 紫色药丸 CTA |
| 设计协作 | Webflow | 丰富二级色 + WF Visual Sans + 5 层阴影 |
| 设计协作 | Sanity | 近纯黑 + waldenburg 精密排版 + 霓虹点缀 |
| 消费/生活方式 | Spotify | 暗色沉浸 + 内容优先 + 药丸按钮 |
| 消费/生活方式 | Apple | 摄影优先 + 极简 UI + 单蓝 CTA |
| 消费/生活方式 | Tesla | 产品摄影驱动 + 近零装饰 + 电动蓝 |
| 消费/生活方式 | Starbucks | 四级绿品牌系统 + SoDoSans + 暖奶油画布 + 全药丸按钮 |
| 消费/生活方式 | PlayStation | 三面交替 + PS Blue 药丸 + SST Light 300 + 游戏视觉 |
| 消费/生活方式 | SpaceX | 全屏电影摄影 + D-DIN 大写 + 幽灵按钮 + 零装饰 |
| 社交/通讯 | Pinterest | 瀑布流图片发现 + 红色 CTA + Pin Sans |
| 社交/通讯 | Uber | 黑白极简 + UberMove + 胶囊按钮 |
| 社交/通讯 | Meta | 白画布 + Optimistic VF + 钴蓝购买 + 药丸按钮 |
| 企业 SaaS | Intercom | 奶油白画布 + Saans + Fin Orange |
| 企业 SaaS | Airtable | 白底 + 签名色卡片 + Haas Grotesk |
| 企业 SaaS | Zapier | 暖奶油 + 三字体系统 + Zapier Orange |
| 企业 SaaS | IBM | Carbon 体系 + IBM Blue 单色 + Plex Light 300 + 直角 |
| 企业 SaaS | Cal | 白画布 + 黑色 CTA + Cal Sans + 友好 SaaS |
| 汽车 | BMW | BMW 蓝 CTA + BMW Type Next + 车型配置卡片网格 |
| 汽车 | Ferrari | 近纯黑 + Rosso Corsa 赛车红 + FerrariSans + 电影级 Hero |
| 汽车 | Lamborghini | 真黑画布 + LamboType 12° 斜切 + 金色 CTA + 零圆角 |
| 媒体 | The Verge | 暗色编辑 + 酸薄荷/紫外双色 + Manuka 107px + 色块叙事 |
| 媒体 | WIRED | 纸白新闻密排 + WiredDisplay 衬线 + WiredMono 大写 + 2px 硬边框 |

| 附加能力 | 文件 | 说明 |
|---------|------|------|
| 品牌分类索引 + 选择决策树 | `references/brand-library/INDEX.md` | 按项目类型路由推荐品牌 |
| 暗/亮色选择矩阵 | `references/brand-library/INDEX.md` | 基于目标用户、使用场景、品牌调性等因素的选择指南 |

---

### 1.3 Layer 2：设计规范层（Token 体系）

| 能力 | 文件 | 说明 |
|------|------|------|
| JSON Schema 规范 | `schema/design-token.schema.json` | 框架无关，7 个顶层属性（meta/colors/typography/spacing/borderRadius/shadows/transitions），#RRGGBB 颜色约束、字号/字重/行高精确类型 |
| 暗色主题骨架 | `templates/dark-theme.template.json` | Linear 品牌色系，含完整四级表面色、文字色、语义色、14 个字号比例预设 |
| 亮色主题骨架 | `templates/light-theme.template.json` | 蓝色品牌色系，含完整默认值 |
| DESIGN.md → token.json 映射规则 | `references/token-mapping/mapping-rules.md` | 8 大类别映射：颜色（品牌/表面/文字/边框/语义）、排版（字族/字号比例）、间距、圆角、阴影、动效，含缺失字段降级策略 |
| 10 品牌字段兼容表 | `references/token-mapping/field-compatibility.md` | Linear/Stripe/Vercel/Nike/Spotify 等品牌的实际字段名到 token.json 映射，含 4 个特殊规则（Vercel Shadow-as-Border、Nike 极端圆角、Stripe OpenType 特性、Spotify 暗色沉浸） |
| Linear Dark 示例 token | `references/token-mapping/examples/linear-dark.token.json` | 基于真实 DESIGN.md 手工精校的完整 token.json 实例 |
| Stripe Light 示例 token | `references/token-mapping/examples/stripe-light.token.json` | 基于真实 DESIGN.md 的完整 token.json 实例 |

---

### 1.4 Layer 2：脚本工具

| 能力 | 文件 | 说明 |
|------|------|------|
| 10 级色阶生成算法 | `scripts/generate-token.mjs` | HSL 空间, 从单一 primary 色值生成 brand.50~brand.900，支持暗/亮双模式 |
| 颜色空间转换 | `scripts/generate-token.mjs` | hexToHsl / hslToHex / getLuminance（WCAG 标准亮度计算） |
| DESIGN.md 解析器 | `scripts/generate-token.mjs` | YAML front matter 颜色/排版/间距提取 + Markdown body 的正则解析 |
| 暗色主题自动判断 | `scripts/generate-token.mjs` | 基于 surface.base 亮度 < 50（HSL）判定 |
| token.json 结构校验 | `scripts/validate-token.mjs` | 逐项检查 meta/colors/typography/spacing/borderRadius 的完整性与格式，含品牌色 10 级色阶必填校验、typography.scales 字段完整性校验 |

---

### 1.5 Layer 2：设计方法论

| 能力 | 文件 | 核心内容 |
|------|------|---------|
| 五阶段设计方法论 | `references/methodology/design-methodology.md` | Phase 1 需求界定 / Phase 2 上下文收集 / Phase 3 变体产出 / Phase 4 生产实现 / Phase 5 质量打磨，每阶段含关键步骤、反模式、交付物、异常处理 |
| Junior Designer 工作流 | 合并进上文 | 六步流程（理解需求→展示假设→等待确认→执行设计→展示结果→收集反馈）+ 问题模板 + Senior vs Junior 决策边界（Junior 行为 4 场景 + Senior 行为 4 场景 + 决策速查树 + 异常处理） |
| 反糊化协议 | `references/methodology/anti-blur-protocol.md` | 糊化定义 → 审美锚点设立 → 三问协议（颜色/间距/元素位置） → 制造视觉张力 5 种手段（字重/间距/颜色纯度/比例/圆角） → 张力检查清单 → 糊化风险三级评估 |
| 反 AI Slop 清单 | `references/methodology/anti-slop-checklist.md` | 颜色 slop（5 条）/ 排版 slop（5 条）/ 布局 slop（5 条）/ 交互 slop（4 条）/ 内容 slop（5 条）+ 修复策略对照表 + 0-10 分评分标准 |
| 变体评审框架 | `references/methodology/review-scoring.md` | 5 维度 100 分（目标对齐度 25 / 技术可行性 20 / 认知负荷 25 / 美学一致性 20 / 反糊化通过 10），70 分门槛，含决策日志格式 |
| 核心资产协议 | `references/methodology/asset-protocol.md` | Logo 获取 4 级优先级（SVG > PNG > JPG）+ 4 种获取渠道 + 验证规则；产品截图类型与规范；UI 截图归档结构与命名规则；资产使用约束 |
| 动画最佳实践 | `references/methodology/animation-best-practices.md` | Ant Design 三原则（自然>高效>克制）+ 一致性补充 → 缓动体系（3 基础 + 3 高级 + 决策树）→ Keyframe 五分类（Fade/Slide/Move/Zoom/Feedback）+ 命名语义 → 时长双层规范（UI 100-300ms / 叙事 400ms+）+ 速查表 → 7 种动效组件模式 → Stage+Sprite 交付 + 插值函数 → 5 条性能规则 |
| 幻灯片设计规范 | `references/methodology/slide-design.md` | 交付格式决策树 + 架构选型（单文件 vs 多文件）+ Showcase-First 工作流 + 排版体系（字号阶梯/字重强调/背景处理）+ 7 种页面布局模式 + 三维视觉节奏 + 视觉主角轮换表 + 信息密度控制 + 出版物 Grammar 模板 + Speaker Notes 要点 + 交付验证清单 |
| 产品展示规范 | `references/methodology/product-presentation.md` | 资产优先级 + 设备 Mockup 合成规则（比例/状态栏/安全区域/阴影/圆角/多设备组合）+ Hero 图 5 种构图模式 + 产品图质量门槛 + 展示格式决策 + 预发布检查清单 |
| 字体加载策略 | `references/methodology/font-loading-strategy.md` | FOIT/FOUT 问题 + font-display 5 种策略 + Fallback 字体栈 + 中文子集化 + 预加载（preload/preconnect）+ Self-host vs CDN 决策 + WOFF2 优先 + 幻灯片/动画特殊处理 + 性能检查清单 |

---

### 1.6 Layer 2：设计哲学

| 能力 | 文件 | 核心内容 |
|------|------|---------|
| 20 种设计哲学 | `references/design-philosophy/design-styles.md` | 极简主义 / 瑞士国际主义 / 新拟态 / 玻璃拟态 / 暗色工程美学 / 轻盈奢华 / 摄影优先 / 内容沉浸 / 超大排版 / 色块叙事 / 几何药丸 / 基础设施极简 / 编辑式布局 / 数据可视化优先 / 复古未来主义 / 有机自然 / 粗野主义 / 渐变沉浸 / 功能至上 / 情感化设计，每种含特征/适用/实现/代表品牌 |
| 哲学选择指南 | 同上 | 按项目类型推荐主选+次选哲学 |
| 专家 5 维度评审框架 | `references/design-philosophy/critique-guide.md` | 视觉层级 / 信息架构 / 情感共鸣 / 认知负荷 / 技术品质，每维度 1-5 分 + 检查项 + 权重配置 + 综合评级 + 评审报告格式规范 |

---

## 二、还可以从原始三个 skill 抽取的能力

### 2.1 从 admin-design-spec 尚未完整提取的

> 注意：这些能力在中后台场景中价值极高，但当初被误判为 "Tailwind 绑定"一起丢弃。实际其约束规则是框架无关的。

| 能力 | 原始位置 | 当前状态 | 提取建议 |
|------|---------|---------|---------|
| 组件设计规范（Table/Form/Modal/Toast 具体视觉规则） | SKILL.md 组件章节 | 完全丢弃 | 提炼**框架无关的组件设计约束**（如 Table 行高 ≥ 44px，Form Label 始终上置）到 `methodology/` |
| 数据表格密度规范（紧凑/标准/宽松三档） | SKILL.md | 未提取 | 独立为 `references/methodology/table-density.md` |
| 表单设计规范（输入框尺寸/错误状态/帮助文案层级） | SKILL.md | 未提取 | 独立为 `references/methodology/form-design.md` |
| 空状态设计规范（Empty State 四要素：图标/标题/说明/CTA） | SKILL.md | 未提取 | 中后台高频场景，应提取为独立文档 |
| 加载状态规范（Skeleton vs Spinner 使用判断规则） | SKILL.md | 未提取 | 高频场景，应提取 |
| 响应式降级策略（数据表格 < 768px 的具体降级方案） | SKILL.md | design-methodology.md 有方向性提及（md 以下重点关注），SKILL.md Phase 5 有断点数字，但均无具体降级方案 | 可扩充质量检查内容 |
| 设计冻结线协议（什么情况下锁定设计不允许返工） | SKILL.md | Phase 1 提及但不完整 | 可补充为独立的协议文档 |

---

## 三、未完成任务（按 AGENTS.md 计划）

| 任务 ID | 任务 | 状态 |
|---------|------|------|
| Phase 4-1 | Linear 品牌端到端验证（中后台 + vue-best-practices） | ❌ 未做 |
| Phase 4-2 | Stripe 品牌端到端验证（落地页 + impeccable） | ❌ 未做 |
| Phase 4-3 | 真实设计产出反糊化/反 slop 验证 | ❌ 未做 |
| Phase 5-3 | 全量 review（所有文件一致性检查） | ❌ 未做 |
| Phase 5-4 | README.md（新用户 5 分钟上手文档） | ❌ 未做 |
| — | `validate-token.mjs` 升级为 ajv 校验 | ✅ 完成（AJV + 跨引用校验 + 推荐警告） |
