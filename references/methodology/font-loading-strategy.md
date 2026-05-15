# 字体加载策略

> 从 huashu-design 散落的字体相关知识点系统化提取，框架无关。
> 适用于 Web 页面、HTML 幻灯片、动画 Demo 等任何需要加载 Web Font 的场景。

---

## 一、核心问题

Web Font 加载存在两个经典问题：

| 问题 | 全称 | 表现 |
|------|------|------|
| **FOIT** | Flash of Invisible Text | 字体未加载时文字不可见，页面出现空白区域 |
| **FOUT** | Flash of Unstyled Text | 字体未加载时用系统字体显示，加载完成后切换导致布局抖动 |

**策略选择**：FOUT 优于 FOIT。用户先看到文字（即使是系统字体）比看到空白好。`font-display: swap` 是默认推荐策略。

---

## 二、font-display 策略

### 推荐默认：`swap`

```css
@font-face {
  font-family: 'MyDisplay';
  src: url('/fonts/MyDisplay.woff2') format('woff2');
  font-display: swap;
}
```

| 策略 | 阻塞期 | 交换期 | 适用场景 |
|------|--------|--------|---------|
| **swap**（推荐） | 无 | 无限 | 绝大多数场景——先显示系统字体，Web Font 加载后替换 |
| `optional` | 极短（~100ms） | 无 | 性能敏感场景——网络慢时不替换，避免布局抖动 |
| `block` | 极长（~3s） | 无限 | **不推荐**——空白文字对用户体验伤害大 |
| `fallback` | 短（~100ms） | 短（~3s） | 折中方案——给字体一点加载时间，超时放弃替换 |
| `auto` | 浏览器默认 | 浏览器默认 | 等同于不设，行为不可控 |

### 按场景选择

| 场景 | 推荐策略 | 理由 |
|------|---------|------|
| 正文内容 | `swap` | 可读性优先，不允许空白 |
| Display 字体（大标题） | `swap` | 先用系统字体占位，避免布局跳动 |
| 动画 Demo / 幻灯片 | `swap` + 预加载 | 加载完前不开始动画（见第五节） |
| 性能极度敏感的移动端 | `optional` | 慢网络下放弃替换，避免抖动 |

---

## 三、Fallback 字体栈

### 原则

Fallback 字体栈的目标是**最小化布局偏移**（CLS）。Web Font 与 Fallback 字体的字形度量越接近，切换时的抖动越小。

### 推荐栈

```css
/* Display 字体：衬线 → 系统 */
font-family: 'Instrument Serif', 'Noto Serif SC', Georgia, 'Times New Roman', serif;

/* Body 字体：无衬线 → 系统 */
font-family: 'Geist Sans', 'Noto Sans SC', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;

/* 等宽字体：代码/数据 */
font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', 'Cascadia Code', monospace;
```

### 中文 Fallback 特殊处理

中文字体文件巨大（5-20MB），加载耗时长。推荐策略：

1. **正文用系统字体**——macOS 的 PingFang SC / Windows 的 Microsoft YaHui 已足够美观
2. **仅 Display 字体用 Web Font**——标题字数少，子集化后文件可控
3. **中文子集化**——只嵌入项目中实际用到的字符，文件可从 15MB 压缩到 100-500KB

```css
/* 中文正文：系统字体优先，不加载 Web Font */
font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif;

/* 中文 Display：子集化 Web Font + 系统字体 fallback */
font-family: 'Noto Serif SC Subset', 'PingFang SC', Georgia, serif;
```

---

## 四、字体预加载

### `<link rel="preload">`

对首屏必需的字体文件，使用 preload 提前发起请求：

```html
<link rel="preload" href="/fonts/MyDisplay.woff2" as="font" type="font/woff2" crossorigin>
```

**关键点**：
- `crossorigin` 属性必须加（即使同源），否则浏览器会发起两次请求
- 只 preload 首屏必需的字体（通常 1-2 个），不要 preload 全部
- 配合 `font-display: swap` 使用——preload 加速加载，swap 保证可读

### `<link rel="preconnect">`

字体托管在 CDN 时，提前建立连接：

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

---

## 五、Self-host vs CDN

### Google Fonts CDN

**优点**：免费、缓存命中率高（其他网站用过同一字体时浏览器直接用缓存）
**缺点**：依赖第三方可用性、中国访问不稳定、隐私合规问题

### Self-host

**优点**：完全可控、无第三方依赖、中国可访问
**缺点**：需自行处理子集化和格式转换

| 维度 | CDN | Self-host |
|------|-----|-----------|
| 中国访问 | ❌ 不稳定 | ✅ 可控 |
| 缓存命中率 | ✅ 跨站共享 | ❌ 仅本站 |
| 隐私合规 | ❌ 向 Google 发送请求 | ✅ 无第三方 |
| 维护成本 | ✅ 零 | 🟡 需自行更新 |
| 文件大小 | ✅ 自动子集化 | ❌ 需手动子集化 |

**推荐**：面向中国用户的项目用 Self-host；国际化项目可用 CDN + Self-host 降级。

---

## 六、格式选择

| 格式 | 压缩率 | 浏览器支持 | 推荐 |
|------|--------|----------|------|
| **WOFF2** | 最高 | 97%+ | **首选** |
| WOFF | 中 | 99%+ | WOFF2 的 fallback |
| TTF/OTF | 无 | 99%+ | 源文件格式，不直接用于 Web |
| EOT | 低 | IE only | 废弃 |

**最佳实践**：只提供 WOFF2 格式。极少数需要 IE 支持的场景加 WOFF。

```css
@font-face {
  font-family: 'MyDisplay';
  src: url('/fonts/MyDisplay.woff2') format('woff2');
  font-display: swap;
  font-weight: 600;
  font-style: normal;
}
```

---

## 七、幻灯片 / 动画场景的特殊处理

幻灯片和动画 Demo 中字体加载有额外要求：

### 字体就绪后才渲染

- 幻灯片：字体未加载时页面显示为系统字体，加载完后切换——对固定尺寸排版会导致布局跳动
- 动画：字体未加载时文字宽度不同，动画起始帧与结束帧布局不一致

**解决方案**：

```js
// 等待字体就绪后再开始渲染
document.fonts.ready.then(() => {
  // 开始渲染/动画
});
```

### 截图 / 录制场景

- 录制前必须等待字体完全加载（至少 3500ms 的 fontwait，或用 `document.fonts.ready` 检测）
- 中文 Web Font 加载尤其慢，建议 self-host 到本地减少网络依赖
- Chromium headless 不带彩色 emoji 字体，用 Unicode 文字符号替代 emoji

---

## 八、性能检查清单

- [ ] 所有 `@font-face` 声明 `font-display: swap`（或按场景选择合适的策略）
- [ ] 首屏字体使用 `<link rel="preload">` 预加载
- [ ] CDN 托管字体使用 `<link rel="preconnect">` 预连接
- [ ] 中文 Web Font 已子集化（文件 < 500KB）
- [ ] 只提供 WOFF2 格式（除非需要 IE 支持）
- [ ] Fallback 字体栈度量与 Web Font 接近（减少 CLS）
- [ ] 幻灯片/动画使用 `document.fonts.ready` 等待字体就绪
- [ ] 总字体文件数 ≤ 4 个（1 display + 1 body + 1 mono + 1 中文子集）
