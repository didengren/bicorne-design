# mobile-web · PHASE 4 Pre-flight

> 开工前必读。回答完所有"必须"项后，才开始写第一行代码。

---

## 1. 项目元数据

| 问题 | 你的回答 |
|---|---|
| 品牌名 |  |
| 业务定位（一句话） |  |
| 目标设备 | □ iOS only  □ Android only  □ iOS + Android  □ 全部 mobile  □ 桌面 + mobile 响应式 |
| 目标浏览器 | □ Safari  □ Chrome  □ 微信内置  □ 全部 |
| 屏幕尺寸范围 | □ 320-414px（小屏优先） □ 414-768px □ 768+（基本是 tablet/desktop） |
| 离线支持 | □ 是（PWA） □ 否 |
| 安装到主屏幕 | □ 是（PWA installable） □ 否 |
| 推送通知 | □ Web Push  □ 邮件  □ 否 |

## 2. 设备支持

| 问题 | 你的回答 |
|---|---|
| 最小支持 iOS 版本 |  |
| 最小支持 Android 版本 |  |
| 是否需要支持 iPad / Android tablet | □ 是  □ 否 |
| 是否需要支持横屏 | □ 是  □ 否 |
| 是否需要深色模式跟随系统 | □ 是  □ 否 |
| 是否需要安全区适配（iPhone notch） | □ 是  □ 否 |

## 3. 触摸交互

| 交互 | 你的回答 |
|---|---|
| Tap（点击） | 默认 |
| Long press | □ 是（如长按弹出菜单） □ 否 |
| Swipe to refresh | □ 是  □ 否 |
| Swipe to dismiss（左右滑切页面） | □ 是  □ 否 |
| Pinch to zoom | □ 启用（图片） □ 禁用（页面） |
| Pull-to-refresh | □ 是  □ 否 |
| Bottom sheet（拖拽弹出） | □ 是  □ 否 |

## 4. 导航决策

| 问题 | 你的回答 |
|---|---|
| 底部 tab bar（4-5 项）还是顶部 nav |  |
| tab 项数 |  |
| tab 图标风格（filled / outline / 文字） |  |
| 是否需要返回按钮（iOS edge swipe） |  |
| 是否需要 FAB（悬浮动作按钮） |  |

## 5. 性能预算（mobile 比 desktop 严）

- [ ] Lighthouse Performance ≥ 80（mobile，比 desktop 的 90 低）
- [ ] LCP ≤ 2.5s（mobile 3G 弱网）
- [ ] CLS ≤ 0.1
- [ ] TTI ≤ 3.5s
- [ ] JS 总量 ≤ 150KB（gzip）
- [ ] 首屏图 ≤ 100KB

## 6. 输入体验

- [ ] iOS 16px 阈值（body ≥ 16px 防缩放）
- [ ] 数字输入用 `inputmode="numeric"`
- [ ] 邮箱/电话用 `type="email"` / `type="tel"`
- [ ] 自动补全（autocomplete）字段齐全
- [ ] 错误提示在输入框下方（不在 alert）
- [ ] 键盘"下一步 / 完成"按钮正确

## 7. 网络与离线

- [ ] Service Worker（离线资源）
- [ ] Cache API（运行时缓存）
- [ ] 离线 fallback 页面
- [ ] API 请求超时 + retry
- [ ] 弱网提示（navigator.connection.effectiveType）

## 8. Pitfalls 自检

- [ ] Touch target ≥ 44×44 pt
- [ ] 没有"双击放大"（viewport meta）
- [ ] 滚动容器 `-webkit-overflow-scrolling: touch`
- [ ] overscroll-behavior: contain（防滚动穿透）
- [ ] safe area（iPhone notch）适配
- [ ] 文字不小于 14px（CJK）/ 12px（Latin）

---

## 全部 ✅ 后开始

> 如果 1-8 任何一项是"待定"，**先回去定**，再写代码。
> mobile-web 失败 80% 来自设备/网络假设错误，不是设计本身。
