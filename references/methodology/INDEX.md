# Methodology INDEX — 跨类别方法论索引

> 本文件是 `references/methodology/` 的入口索引。帮助快速判断：
> "这个方法论是跨类别通用的，还是只属于某个特定类别？"

---

## 📚 文件清单

| 文件 | 类别归属 | 跨类别复用度 | 一句话说明 |
|---|---|---|---|
| `animation-best-practices.md` | **跨类别** | 🟢 100% | 动画三原则（自然/高效/克制）+ 缓动曲线 + Keyframe 分类 |
| `animation-cross-platform.md` | **跨类别** | 🟢 100% | 跨类别/跨平台差异速查（7 类别时长档 + iOS/Android/RN/Flutter 平台硬约束 + `prefers-reduced-motion` 降级） |
| `anti-blur-protocol.md` | **跨类别** | 🟢 100% | 防止动画/字体模糊的工程协议 |
| `anti-slop-checklist.md` | **跨类别** | 🟢 100% | 反"AI 生成烂大街"美学检查清单 |
| `asset-protocol.md` | **跨类别** | 🟢 100% | 资源（图片/视频/字体）生产与使用协议 |
| `dashboard-interaction.md` | Dashboard | 🟡 30% | 仅适用于数据大屏的 hover/click 交互 |
| `dashboard-layout-patterns.md` | Dashboard | 🟡 30% | 仅适用于数据大屏的布局模式 |
| `dark-mode-a11y.md` | **跨类别** | 🟢 100% | 暗色模式 + 无障碍 (a11y) 通用方法论（暗色三原则 + WCAG 2.1 AA/AAA + 4 平台硬约束 + 7 类别差异速查 + 5 条铁律 + 测试工具） |
| `data-visualization.md` | **跨类别** | 🟢 90% | 数据可视化通用原则（轴/图例/颜色） |
| `design-methodology.md` | **跨类别** | 🟢 100% | 五阶段工作流（哲学/调研/规范/实现/验收） |
| `font-loading-strategy.md` | **跨类别** | 🟢 100% | 字体加载策略（FOUT/FOIT/preload） |
| `page-framework.md` | **跨类别** | 🟢 100% | 页面级架构（Header/Hero/Content/Footer 通用范式） |
| `product-presentation.md` | **跨类别** | 🟢 100% | 产品演示场景（截屏/录屏/演示模式） |
| `responsive-degradation.md` | **跨类别** | 🟢 100% | 响应式降级（断点/降级策略） |
| `nav-footer.md` | **跨类别** | 🟢 100% | Top Nav + Footer 跨页面一致性（含 8 节"按类别适配"覆盖 8 类别），原位 saas-marketing/component-contract/nav-footer.md 已 stub |
| `performance-budget.md` | **跨类别** | 🟢 100% | 三层预算（核心 Web Vitals / 类别专项 / 硬限制），原位 dashboards/performance.md 和 saas-marketing/performance.md 已 stub |
| `review-scoring.md` | **跨类别** | 🟢 100% | 设计评审评分（多维度量化） |
| `seo-checklist.md` | **跨类别** | 🟢 100% | SEO 跨类别清单（meta / 结构化数据 / Core Web Vitals），原位 saas-marketing/seo-checklist.md 已 stub |
| `slide-design.md` | Presentation | 🟢 100% | 演示稿（PPT/Keynote）专用 |
| `typography.md` | **跨类别** | 🟢 100% | Typography 通用框架（字阶 12 档 t-shirt / 字体选型 / 颜色对比 / fluid type），原位 dashboards/typography.md 和 saas-marketing/typography.md 已 stub |
| `ui-states.md` | **跨类别** | 🟢 100% | Empty/Loading 状态（多平台通用版） |
| `INDEX.md` | — | — | 本文件 |

> **判断口径**：标注"跨类别"的方法论在 dashboards / admin-panels / saas-marketing / mobile-web / native-app 等类别下都应直接复用；标"Dashboard"等具体类别名的仅在该类别下适用。

---

## 🎯 类别 → 方法论快速映射

新建设计一个类别的专题前，按此清单加载"必读方法论"：

| 类别 | 必读通用方法论 | 类别专属 |
|---|---|---|
| **Dashboard** | 全部"跨类别" + `typography.md`（9.6 节 dashboard 适配）+ `performance-budget.md`（3.1 节 dashboard 专项）+ `data-visualization.md` + `dashboard-interaction.md` + `dashboard-layout-patterns.md` + `dark-mode-a11y.md`（§5 dashboard 暗色常驻 / focus ring） | `dashboards/animation-matrix.md` stub（场景→动画映射，通用部分已抽到 `animation-best-practices.md`）<br>`dashboards/performance.md` stub（60fps 持续帧 / 10 条规则 / Memory budget）<br>`dashboards/typography.md` stub（信息密度哲学 / tabular-nums / 非 thin）<br>`dashboards/ui-states.md`（6 状态 dashboard 化）<br>`dashboards/pitfalls/`（25 反模式） |
| **Admin Panel** | 全部"跨类别" + `page-framework.md`（路由/菜单）+ `dark-mode-a11y.md`（§5 表格键盘导航） | `admin-pannels/component-contract/data-table.md`（待建）<br>`admin-panels/pitfalls/`（待建） |
| **SaaS Marketing** | 全部"跨类别" + `typography.md`（9.1 节 marketing 适配）+ `performance-budget.md`（3.3 节 marketing 专项）+ `page-framework.md` + `product-presentation.md` + `seo-checklist.md` + `nav-footer.md` + `dark-mode-a11y.md`（§5 表单 a11y） | `saas-marketing/component-contract/nav-footer.md`（SaaS 特定扩展 stub）<br>`saas-marketing/performance.md` stub（Lighthouse 90+ / 10 pitfalls）<br>`saas-marketing/typography.md` stub（"大、强、清晰"哲学 / Eyebrow 规则）<br>`saas-marketing/seo-checklist.md`（SaaS 特定扩展 stub） |
| **Landing Page** | 全部"跨类别" + `typography.md`（9.2 节 landing 适配）+ `performance-budget.md`（3.3 节 marketing 专项）+ `page-framework.md` + `product-presentation.md` + `seo-checklist.md` | `landing-pages/component-contract/hero-cta.md`（单页 Hero 速查）<br>`landing-pages/component-contract/pricing-simple.md`（单页价格）<br>`landing-pages/pitfalls/`（8 单页反模式） |
| **Mobile Web** | 全部"跨类别" + `responsive-degradation.md` + `font-loading-strategy.md` + `typography.md`（mobile 适配）+ `dark-mode-a11y.md`（§5 触摸目标 ≥ 44pt） | `mobile-web/component-contract/bottom-tab-bar.md`（mobile nav 标志）<br>`mobile-web/pitfalls/`（10 mobile 反模式） |
| **Native App** | 全部"跨类别" + `responsive-degradation.md` + `dark-mode-a11y.md`（§5 Dynamic Type / systemBlue） | （待建） |
| **AI Products** | 全部"跨类别" + `data-visualization.md` + `dark-mode-a11y.md`（§5 流式输出 aria-live） | （待建） |
| **Premium / Luxury** | 全部"跨类别" + `anti-slop-checklist.md` + `dark-mode-a11y.md`（§5 摄影图 alt text / 玻璃焦点环） | （待建） |

---

## 🔁 类别间共享内容的抽取原则

> "是不是要抽到 references/ ？" 的判断流程：

```
这个内容在多少个类别里被使用？
├─ 0 个（仅 1 个类别） → 留原位，不抽
├─ 1-2 个（少数类别）→ 留原位，在类别 README 加 "see also" 引用
├─ 3+ 个（多类别）   → 抽到 references/，原位留 stub + 引用
└─ 所有类别          → 强抽（如 ui-states、design-methodology）
```

### 已抽取的共享内容

| 内容 | 原位 | 现位 |
|---|---|---|
| Empty/Loading 状态（多平台） | `dashboards/ui-states.md`（旧） | `references/methodology/ui-states.md` ✅ |
| 动画三原则 + 缓动曲线 | （无原位） | `references/methodology/animation-best-practices.md` ✅ |
| 动画跨类别/跨平台差异速查 | （无原位） | `references/methodology/animation-cross-platform.md` ✅（7 类别时长档：dashboard 400-1600ms / admin 100-300ms / mobile-web 150-300ms / native 平台规范 / premium 600-1500ms 等） |
| 暗色模式 + 无障碍 (a11y) | （无原位） | `references/methodology/dark-mode-a11y.md` ✅（4 平台硬约束 + 7 类别差异速查：dashboard/native-app/premium 暗色默认；admin/saas-marketing/mobile-web 可选） |
| 五阶段工作流 | （无原位） | `references/methodology/design-methodology.md` ✅ |
| Nav + Footer 跨类别规则 | `saas-marketing/component-contract/nav-footer.md` | `references/methodology/nav-footer.md` ✅ |
| Performance 三层预算 | `dashboards/performance.md` + `saas-marketing/performance.md` | `references/methodology/performance-budget.md` ✅ |
| SEO 跨类别清单 | `saas-marketing/seo-checklist.md` | `references/methodology/seo-checklist.md` ✅ |
| Typography 通用框架 | `dashboards/typography.md` + `saas-marketing/typography.md` | `references/methodology/typography.md` ✅ |

### 当前留在类别内（含共享部分）

| 内容 | 类别 | 复用度 | 备注 |
|---|---|---|---|
| `dashboards/animation-matrix.md` | Dashboard | 🟡 80% | 通用曲线/时长档引用 `animation-best-practices.md`；场景→动画映射（panel/fade-up/scan/aurora 等）类别化 |
| `dashboards/performance.md` stub | Dashboard | 🟡 80% | 通用 60fps 原则已抽到 `performance-budget.md`；本文件保留 dashboard 60fps 持续帧预算（5 面板同屏 / 10 条规则 / Memory budget） |
| `dashboards/pitfalls/` | Dashboard | 🟢 90% | 25 条反模式多数跨平台；如需跨类别，做"通用 15 条 + 类别 10 条"拆分 |
| `dashboards/typography.md` stub | Dashboard | 🟡 60% | 通用字阶/字体选型已抽到 `typography.md`；本文件保留信息密度哲学（11-14px body / 1.2-1.3 行高 / tabular-nums / 非 thin） |
| `dashboards/component-contract/` | Dashboard | 🟡 50% | 8 组件中 4 个（panel/metric/sparkline/ring）跨平台；map/gauge/scroll-ticker 类别化 |
| `dashboards/layouts/` | Dashboard | 🟡 30% | L1 三列/L5 Tab 跨平台；L2 地图主导/L3 KPI 墙 类别化 |

---

## 📋 维护规约

新增方法论文件时：

1. **先决定归属**：跨类别还是类别专属？
2. **跨类别** → 写入 `references/methodology/`，**不要**在类别目录复制
3. **类别专属** → 写入对应类别目录，`dashboards/typography.md` 风格
4. **新增跨类别内容** → 更新本 INDEX.md 的"文件清单"和"类别 → 方法论映射"
5. **从类别抽到跨类别** → 旧文件加 `> ⚠️ 本文件已合并至 ../references/methodology/X.md` 指向头，保留 1 个版本周期后删除
