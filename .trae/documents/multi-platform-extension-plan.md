# 计划：将多平台支持理念融入 bicorne-design（v2 修订版）

> 目标：在不大改三层架构的前提下，将「不止中后台，也支持移动端 Web、原生 App、数据展示大屏」的理念融入项目。
> 核心思路：当前项目已经是框架无关的（React/Vue），但**平台感知仅覆盖桌面 Web**。需要将「框架无关」升级为「平台无关」。
> v2 修订：修复 v1 中的增熵问题、冲突遗漏、逻辑矛盾。

---

## 一、v1 → v2 修订要点

| v1 问题 | v2 修正 | 理由 |
|---------|--------|------|
| Schema 新增 `platform` 顶层对象（touchTarget/safeArea/viewport/interaction） | **删除**。仅保留 `meta.platform` + `viewport` | touchTarget/safeArea/interaction 是**约束规则**，不是设计令牌。它们属于方法论和模板，不属于 Schema。Schema 只放设计值，不放约束规则——这是现有架构的边界，不应模糊 |
| mapping-rules.md 用乘数映射字号（`×0.5`/`×1.2`） | **改为模板驱动**：移动端/大屏用各自模板的绝对值，不乘桌面值 | 乘数是脆弱的：14px × 0.85 = 11.9px（太小）、80px × 0.5 = 40px（可能太大也可能太小）。模板中手工精调的绝对值更可靠 |
| Flutter/iOS/Android 从"未来"升级为"正式条目" | **改为"已支持平台"**，注明"对应执行 skill 待建设" | 没有对应的执行 skill 就不算"正式"，过度承诺会误导用户 |
| 缺少跨平台一致性原则 | **新增**：同品牌跨平台共享 colors + fontFamilies，差异仅在 scales/spacing | 这是多平台设计的核心原则，缺失会导致同一品牌在桌面和移动端看起来像两个产品 |
| 缺少与冲突裁决原则的对齐 | **新增冲突检查** | 大屏"帧率 ≥ 30fps"与现有"帧率 ≥ 60fps"需明确关系；移动端动画时长不得违反 100-300ms 规则 |
| 缺少 Phase 1 "确定目标平台"步骤 | **新增** | 这是多平台工作流的入口，缺失则整个平台扩展无法启动 |

---

## 二、冲突裁决检查

> 依据 `.trae/rules/CONFLICT_ADJUDICATION_PRINCIPLES.md`，所有新增内容必须与 Ant Design 原则一致。

| 新增内容 | 潜在冲突 | 裁决 |
|---------|---------|------|
| 大屏"关键动画 ≥ 30fps" | 现有 Phase 5 写"动画帧率 ≥ 60fps" | **不冲突**。60fps 是桌面 Web 目标；大屏设备 GPU 性能差异大，30fps 是最低可接受线，条件允许时仍追求 60fps。需在文档中明确"目标 60fps，大屏最低 30fps" |
| 移动端动画策略 | 缓动默认值 / 时长上限 | **不冲突**。移动端 UI 微交互仍遵循 ease-out 默认 + 100-300ms 时长。Ant Design 三原则（自然>高效>克制）是平台无关的 |
| 移动端 scale(0.97) 按压反馈 | 现有动效分类无此 keyframe | **不冲突**。这是 Feedback 家族的新变体，不改变现有分类体系 |
| 原生 App 动画映射表 | 无 | **不冲突**。映射表是 Layer 3 执行层的参考，不改变 Layer 2 规范 |

---

## 三、实施步骤

### 第 1 步：扩展 design-token.schema.json（2 个新增，0 个修改）

**改动文件**：`schema/design-token.schema.json`

**新增内容**：

1. `meta.properties` 增加 `platform` 字段：
```json
"platform": {
  "type": "string",
  "enum": ["desktop", "mobile", "dashboard"],
  "default": "desktop",
  "description": "Target platform. Determines which template defaults apply."
}
```

2. 顶层 `properties` 增加 `viewport` 字段（可选）：
```json
"viewport": {
  "type": "object",
  "description": "Viewport breakpoint definitions for responsive design",
  "patternProperties": {
    "^[a-z][a-z0-9-]*$": {
      "type": "object",
      "required": ["minWidth"],
      "properties": {
        "minWidth": { "type": "integer", "minimum": 0 },
        "maxWidth": { "type": "integer", "minimum": 0 }
      },
      "additionalProperties": false
    }
  },
  "additionalProperties": false
}
```

**不新增的内容**（v1 有但 v2 删除）：
- ~~`platform` 顶层对象~~ — touchTarget/safeArea/interaction 是约束规则，不是设计令牌
- ~~`meta.viewport`~~ — viewport 是设计值，放顶层更符合现有 Schema 的组织方式（colors/typography/spacing 都是顶层）

**向后兼容**：`meta.platform` 无 `required` 标记，默认 `desktop`；`viewport` 无 `required` 标记。现有 token.json 无需任何修改即可通过校验。

---

### 第 2 步：新增 3 个平台模板

**新增文件**：
- `templates/mobile-dark.template.json`
- `templates/mobile-light.template.json`
- `templates/dashboard-dark.template.json`

**为什么没有 dashboard-light**：数据展示大屏几乎都是暗色主题——控制室环境偏暗，暗色主题提供更高对比度和更低眼疲劳。如果未来有亮色大屏需求再添加。

**与现有模板的核心差异**：

| 维度 | 桌面（现有） | 移动端（新增） | 大屏（新增） |
|------|------------|-------------|------------|
| `meta.platform` | `"desktop"`（隐含） | `"mobile"` | `"dashboard"` |
| display-xl | 80px | 34px | 96px |
| display-lg | 56px | 28px | 72px |
| display-md | 40px | 24px | 56px |
| headline | 28px | 22px | 44px |
| heading-xl | 24px | 20px | 36px |
| heading-lg | 20px | 17px | 30px |
| heading-md | 16px | 15px | 24px |
| body-lg | 18px | 16px | 22px |
| body-md | 16px | 15px | 20px |
| body-sm | 14px | 13px | 18px |
| caption | 12px | 11px | 16px |
| spacing 基数 | 4px | 4px | 8px |
| borderRadius | 桌面值 | +2-4px | +4-8px |
| shadows | 桌面阴影 | 更轻 | 更重 |
| viewport | 无 | `{ sm: 320, md: 375, lg: 428, xl: 768 }` | `{ sm: 1920, md: 2560, lg: 3840 }` |

**跨平台一致性原则**（写入每个模板的 `meta.description`）：
> 同品牌跨平台共享 `colors`（品牌色阶、表面色、文字色、边框色、语义色）和 `typography.fontFamilies`（字体族定义）。差异仅在 `typography.scales`（字号比例）、`spacing`（间距）、`borderRadius`（圆角）、`shadows`（阴影）、`viewport`（断点）。

---

### 第 3 步：扩展 SKILL.md

**改动文件**：`SKILL.md`

**3.1 description 字段**

```
旧：搭建中后台页面、制作营销落地页、为界面建立统一设计系统、设计评审、风格探索、UI 优化
新：搭建中后台页面、制作营销落地页、移动端 Web/App 界面、数据展示大屏、为界面建立统一设计系统、设计评审、风格探索、UI 优化
```

**3.2 场景路由表**：新增 3 行（插入现有表格末尾）

| 场景 | 优先级 | 核心能力 | 执行 Skill |
|------|--------|---------|----------|
| 移动端 Web | 触摸优先 | 五阶段 + mobile token.json | React: impeccable / React Native: vercel-react-native-skills |
| 原生 App | 平台规范优先 | 五阶段 + mobile token.json + 平台 HIG | Flutter skill / iOS skill / Android skill（执行 skill 待建设） |
| 数据展示大屏 | 信息密度优先 | 五阶段 + dashboard token.json | 宿主项目框架 skill |

**3.3 品牌选择决策树**（在 PHASE 2 中）：新增 2 个分支

```
├─ 移动端 App
│   ├─ 社交/内容 → Spotify, Pinterest, Meta
│   ├─ 金融/支付 → Revolut, Wise, Coinbase
│   ├─ 出行/地图 → Uber, Tesla
│   └─ 电商/零售 → Nike, Airbnb, Starbucks
│
├─ 数据展示大屏
│   ├─ 运维监控 → HashiCorp, Sentry, ClickHouse
│   ├─ 数据分析 → MongoDB, PostHog, Supabase
│   ├─ 指挥中心 → NVIDIA, SpaceX, IBM
│   └─ 展览展示 → Ferrari, Lamborghini, BMW
```

**3.4 Token 消费指南**：将"未来框架"改为"已支持平台"

```markdown
### 已支持平台

| Skill | 消费方式 | 状态 |
|-------|---------|------|
| Flutter skill | → `ThemeData` | token.json 可消费，执行 skill 待建设 |
| iOS skill | → `UIColor` extension + `UIFont` metrics | token.json 可消费，执行 skill 待建设 |
| Android skill | → `Color` resource + `dimens.xml` | token.json 可消费，执行 skill 待建设 |
```

**3.5 Phase 1 约束条件清单**：增加第 4 项

```
4. **平台约束**
   - 确定目标平台（桌面 Web / 移动端 Web / 原生 App / 数据大屏）
   - 桌面 Web：鼠标交互，精确悬停，多列布局
   - 移动端 Web/App：触摸目标 ≥ 44px，无 Hover-only 交互，安全区域适配
   - 数据大屏：远距离观看（3-5m），字号 ≥ 24px，高对比度，遥控/触控操作
```

**3.6 Phase 5 响应式验证**：增加平台特定检查

```
6. **平台特定检查**
   - 移动端：触摸目标 ≥ 44×44px，安全区域适配，无 Hover-only 交互
   - 原生 App：平台 HIG 合规（iOS HIG / Material Design）
   - 大屏：3m 观看距离可读性，遥控器焦点导航
```

---

### 第 4 步：扩展 INDEX.md

**改动文件**：`references/brand-library/INDEX.md`

**4.1 选择决策树**：增加"移动端 App"和"数据展示大屏"两个顶级分支（内容同第 3 步 3.3）

**4.2 暗色 vs 亮色选择指南**：增加"平台"信号行

| 信号 | 选择暗色 | 选择亮色 |
|------|---------|---------|
| 平台 | 大屏/监控室、OLED 移动端 | 移动端户外使用、触控一体机 |

---

### 第 5 步：扩展 design-methodology.md

**改动文件**：`references/methodology/design-methodology.md`

**5.1 Phase 1 关键步骤**：在"3. 约束条件清单"后增加"4. 平台约束"

```markdown
4. **平台约束**
   - 确定目标平台（桌面 Web / 移动端 Web / 原生 App / 数据大屏），选择对应模板
   - 桌面 Web：鼠标交互，精确悬停，多列布局，选择 `templates/dark-theme.template.json` 或 `light-theme.template.json`
   - 移动端 Web/App：触摸目标 ≥ 44px，无 Hover-only 交互，安全区域适配，选择 `templates/mobile-dark.template.json` 或 `mobile-light.template.json`
   - 数据大屏：远距离观看（3-5m），字号 ≥ 24px，高对比度，遥控/触控操作，选择 `templates/dashboard-dark.template.json`
   - 跨平台产品：同一品牌共享 colors + fontFamilies，仅 scales/spacing 按平台模板调整
```

**5.2 Phase 2 关键步骤**：在"5. 技术实现评估"后增加"6. 平台上下文"

```markdown
6. **平台上下文**
   - 确认目标平台的设计规范（iOS HIG / Material Design / 大屏分辨率标准）
   - 确认输入方式（鼠标 / 触摸 / 遥控 / 语音）
   - 确认观看距离和屏幕尺寸（大屏场景必需）
   - 确认性能预算（大屏设备 GPU 性能差异大，移动端内存受限）
```

**5.3 Phase 3 关键步骤**：在"2. 方向三角"后增加平台适配说明

```markdown
   方向三角在多平台场景下的侧重调整：
   - 移动端：效率优先 → 减少操作步骤；信息清晰 → 触摸友好；品牌表达 → 原生平台感
   - 大屏：效率优先 → 关键指标一目了然；信息清晰 → 层级分明远距离可读；品牌表达 → 沉浸式数据叙事
```

**5.4 Phase 5 关键步骤**：在"4. 交互状态全覆盖"后增加"5. 平台特定检查"

```markdown
5. **平台特定检查**
   - 移动端：触摸目标 ≥ 44×44px，安全区域适配，无 Hover-only 交互，手势冲突检测
   - 原生 App：平台 HIG 合规（iOS HIG / Material Design），导航模式匹配平台惯例
   - 大屏：3m 观看距离可读性，遥控器焦点导航，动画帧率目标 60fps / 最低 30fps
```

---

### 第 6 步：扩展 animation-best-practices.md

**改动文件**：`references/methodology/animation-best-practices.md`

在"八、动画性能规则"后新增"九、平台动画策略"：

```markdown
## 九、平台动画策略

> Ant Design 三原则（自然>高效>克制）是平台无关的。以下策略是平台特定的实现指导，不改变原则本身。

### 9.1 移动端

| 维度 | 策略 | 理由 |
|------|------|------|
| 触摸反馈 | 用 scale(0.97) 按压反馈替代桌面端 hover 上移 | 移动端无 hover，需要替代的触觉反馈 |
| 同时动画 | 上限 3 个元素（桌面端 5 个） | 移动端 GPU 性能受限 |
| 时长 | 仍遵循 100-300ms（UI）/ 400ms+（叙事） | Ant Design 高效原则不变 |
| 缓动 | 仍以 ease-out 为 UI 默认 | Ant Design 自然原则不变 |
| reduced-motion | 尊重 `prefers-reduced-motion: reduce`，禁用非必要动画 | 无障碍要求 |

### 9.2 大屏

| 维度 | 策略 | 理由 |
|------|------|------|
| 偏移量 | 放大 2-3 倍（桌面 20px → 大屏 40-60px） | 远距离观看需要更大的运动幅度才能感知 |
| 帧率 | 目标 60fps，最低 30fps | 大屏设备 GPU 性能差异大 |
| 焦点导航 | 焦点移动需有明确视觉引导（高亮边框 + 微位移） | 遥控器操作需要清晰的焦点指示 |
| 数据刷新 | 用 Counter/CountUp 平滑过渡，避免硬切 | 硬切在远距离观看时更刺眼 |

### 9.3 原生 App 动画映射

> Layer 3 执行层参考。同一 keyframe 语义在不同原生框架的实现方式。

| Web Keyframe | iOS | Android | Flutter |
|-------------|-----|---------|---------|
| Fade | UIView.animate opacity | ObjectAnimator alpha | FadeTransition |
| Slide (scaleY/X) | UIView.animate frame + anchorPoint | ValueAnimator layout | SizeTransition |
| Move (translate) | UIView.animate center | ObjectAnimator translationX/Y | SlideTransition |
| Zoom | UIView.animate transform.scale | ObjectAnimator scaleX/Y | ScaleTransition |
| Feedback (ripple) | UIButton touch feedback | RippleDrawable | InkWell |
```

---

### 第 7 步：扩展 mapping-rules.md

**改动文件**：`references/token-mapping/mapping-rules.md`

在"八、缺失字段处理"后新增"九、平台差异映射"：

```markdown
## 九、平台差异映射

同一品牌 DESIGN.md 在不同平台下的映射策略。

### 核心原则：跨平台一致性

同品牌跨平台共享：
- `colors`（品牌色阶、表面色、文字色、边框色、语义色）— 完全相同
- `typography.fontFamilies`（字体族定义）— 完全相同

同品牌跨平台差异：
- `typography.scales`（字号比例）— 使用对应平台模板的默认值，再用 DESIGN.md 值覆盖
- `spacing`（间距）— 使用对应平台模板的默认值
- `borderRadius`（圆角）— 使用对应平台模板的默认值
- `shadows`（阴影）— 使用对应平台模板的默认值
- `viewport`（断点）— 使用对应平台模板的默认值

### 映射流程

```
DESIGN.md
    │
    ├─ 提取 colors + fontFamilies → 所有平台共享
    │
    └─ 提取 scales / spacing / borderRadius / shadows
         │
         ├─ 桌面 → dark-theme.template.json 或 light-theme.template.json 骨架 → DESIGN.md 值覆盖
         ├─ 移动端 → mobile-dark.template.json 或 mobile-light.template.json 骨架 → DESIGN.md 值覆盖
         └─ 大屏 → dashboard-dark.template.json 骨架 → DESIGN.md 值覆盖
```

### 圆角调整策略

| 平台 | 调整 | 理由 |
|------|------|------|
| 桌面 | 原值 | — |
| 移动端 | +2-4px | 触摸友好，视觉更柔和 |
| 大屏 | +4-8px | 远距离观看，圆角更明显 |

### 间距调整策略

| 平台 | 基数 | 说明 |
|------|------|------|
| 桌面 | 4px | 现有默认 |
| 移动端 | 4px | 同一基数，但触摸目标需 ≥ 44px（通过组件实现，不通过 spacing token） |
| 大屏 | 8px | 远距离观看需要更大间距 |

### viewport 默认断点

| 平台 | 断点 | 值 |
|------|------|-----|
| 桌面 | sm / md / lg / xl / 2xl | 480 / 768 / 1024 / 1280 / 1536 |
| 移动端 | sm / md / lg / xl | 320 / 375 / 428 / 768 |
| 大屏 | sm / md / lg | 1920 / 2560 / 3840 |
```

---

### 第 8 步：更新 AGENTS.md

**改动文件**：`AGENTS.md`

在"附录：V1 与 V2 关键差异"表格后新增：

```markdown
### V2.1 平台扩展（2026-05-15）

| 维度 | V2（旧） | V2.1（本次） |
|------|---------|-------------|
| 平台范围 | 隐含桌面 Web | 显式支持桌面 Web / 移动端 Web / 原生 App / 数据大屏 |
| Schema | 无平台字段 | `meta.platform` + `viewport`（均为 optional） |
| 模板 | dark + light（桌面） | + mobile-dark / mobile-light / dashboard-dark |
| 品牌选择 | 无平台维度 | INDEX.md 决策树增加移动端/大屏分支 |
| 方法论 | 无平台约束 | Phase 1/2/5 增加平台上下文和检查项 |
| 动画 | 仅桌面策略 | 增加移动端/大屏/原生 App 策略（原则不变） |
| 映射 | 仅桌面映射 | 增加平台差异映射（模板驱动，非乘数） |

**设计决策**：
1. 不新增 `platform` 顶层 Schema 对象——touchTarget/safeArea/interaction 是约束规则，不是设计令牌，属于方法论和模板
2. 字号映射用模板绝对值而非乘数——乘数在边界值处不可靠（14px × 0.85 = 11.9px 太小）
3. 大屏仅暗色模板——数据大屏几乎都是暗色主题，亮色需求出现时再添加
4. 原生 App 执行 skill 标注"待建设"——token.json 已可消费，但对应执行 skill 尚未开发
```

---

## 四、改动影响评估

| 文件 | 改动类型 | 改动量 | 向后兼容 |
|------|---------|--------|---------|
| schema/design-token.schema.json | 扩展（2 个 optional 字段） | 小 | ✅ 完全兼容 |
| templates/（3 个新文件） | 新增 | 中 | ✅ 不影响现有 |
| SKILL.md | 扩展（description + 路由 + 消费指南 + Phase 1/5） | 中 | ✅ 不影响现有 |
| references/brand-library/INDEX.md | 扩展（决策树 + 选择指南） | 小 | ✅ 不影响现有 |
| references/methodology/design-methodology.md | 扩展（Phase 1/2/3/5） | 中 | ✅ 不影响现有 |
| references/methodology/animation-best-practices.md | 扩展（新增第九节） | 小 | ✅ 不影响现有 |
| references/token-mapping/mapping-rules.md | 扩展（新增第九节） | 小 | ✅ 不影响现有 |
| AGENTS.md | 扩展（新增 V2.1 小节） | 小 | ✅ 不影响现有 |

**总计**：0 个破坏性修改，3 个新文件，7 个文件扩展。

---

## 五、不做的事情

1. **不新增 `platform` 顶层 Schema 对象** — touchTarget/safeArea/interaction 是约束规则，不是设计令牌
2. **不拆分 Schema** — 不创建 mobile-token.schema.json / dashboard-token.schema.json
3. **不改现有模板** — dark-theme.template.json 和 light-theme.template.json 不动
4. **不改现有 token.json 示例** — linear-dark.token.json 和 stripe-light.token.json 保持不变
5. **不改 generate-token.mjs** — 脚本暂不增加 `--platform` 参数，移动端/大屏 token 通过模板 + 手动调整生成
6. **不改品牌 DESIGN.md** — 60 个品牌文件不动
7. **不新增品牌分类目录** — 不创建 mobile/ 或 dashboard/ 目录，通过 INDEX.md 决策树路由
8. **不扩展 anti-slop-checklist.md** — 现有清单已足够通用（"Hover 无反馈"已覆盖移动端问题）
9. **不扩展 review-scoring.md** — 5 维度评分是平台无关的，不按平台调权重
10. **不扩展 critique-guide.md** — 5 维度评审是平台无关的
