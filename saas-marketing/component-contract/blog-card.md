---
name: blog-card
description: Blog post preview card — image, category tag, title, excerpt, author, date, read time. Used in blog index and "Related posts" widgets.
---

# `blog-card` — Blog Post Card

> 博客卡是 marketing site 的"内容运营血液"。设计原则：缩略图吸睛 + 标题清晰 + 元信息克制。

## Mandatory tokens

| Token path | Purpose |
|---|---|
| `colors.surface.{default,muted}` | 卡片背景 |
| `colors.border.subtle` | 卡片边框（无边框靠阴影亦可） |
| `colors.accent.{blue,green,violet,amber}` | 分类标签背景 |
| `typography.size.h-md` | 标题 20-24px |
| `typography.size.body` | 摘要 14-16px（可选） |
| `typography.size.micro` | 元信息 12-13px |
| `typography.size.body` | 作者名 14px |
| `spacing.{4,5,6}` | 卡片内边距 |
| `radii.xl` | 卡片圆角 |
| `radii.lg` | 图片圆角 |

## Variants

| Variant | 适用 | 关键点 |
|---|---|---|
| **V1 Image-top** | 通用 | 缩略图在上 + 文字在下 |
| **V2 Image-left** | 紧凑列表 / sidebar | 左图右文，固定高度 |
| **V3 Image-cover** | 头条 / 编辑推荐 | 全图覆盖 + 底部文字覆盖层 |
| **V4 Text-only** | RSS / 邮件 | 纯文字（适合密集列表） |

## Recommended structure (V1 Image-top)

```html
<article class="group rounded-xl border border-border overflow-hidden
                bg-surface hover:border-border-strong hover:shadow-md
                transition-all duration-200">
  <a :href="post.url" class="block">
    <!-- 缩略图 -->
    <div class="aspect-[16/9] overflow-hidden bg-muted">
      <img :src="post.coverImage" :alt="post.title"
           class="w-full h-full object-cover
                  group-hover:scale-105 transition-transform duration-300"/>
    </div>

    <!-- 内容 -->
    <div class="p-6">
      <!-- 分类标签 -->
      <CategoryTag :category="post.category" class="mb-3"/>

      <!-- 标题 -->
      <h3 class="text-h-md font-semibold text-default leading-snug
                 group-hover:text-accent-blue transition-colors">
        {{ post.title }}
      </h3>

      <!-- 摘要 (可选) -->
      <p v-if="post.excerpt" class="mt-3 text-body text-muted line-clamp-2">
        {{ post.excerpt }}
      </p>

      <!-- 元信息 -->
      <div class="mt-5 flex items-center gap-3 text-sm text-muted">
        <img :src="post.author.avatar" :alt="post.author.name"
             class="w-6 h-6 rounded-full"/>
        <span class="font-medium text-default">{{ post.author.name }}</span>
        <span>·</span>
        <time :datetime="post.publishedAt">{{ formatDate(post.publishedAt) }}</time>
        <span>·</span>
        <span>{{ post.readTime }} min read</span>
      </div>
    </div>
  </a>
</article>
```

## Pitfalls

- ❌ **缩略图比例不统一**（16/9 和 4/3 混排）→ 视觉参差
- ❌ **缩略图无 alt 文本** → SEO 失败
- ❌ **缩略图与文字不呼应**（图是猫咪，文章是数据库）→ 信任崩塌
- ❌ **元信息太花**（作者+日期+分类+阅读时间+评论数+点赞数+分享数）→ 信息过载
- ❌ **作者无头像** → 失去人格化
- ❌ **摘要被截断显示省略号在第二行**（line-clamp 应该是 2-3 行）
- ❌ **标题不 hover 变色** → 用户不知道可点击
- ❌ **整张卡都可点击但只用文字加 link** → 不符合"卡片整体可点"惯例
- ❌ **分类标签用 12+ 种颜色** → 视觉噪音

## Copy formula

| 元素 | 长度 | 公式 |
|---|---|---|
| 分类 | 1 词 | 名词（如 "Engineering" / "Product" / "Changelog"） |
| 标题 | 6-12 词 | 名词短语 / 行动呼吁（"How we scaled to 1M users"） |
| 摘要 | 12-24 词 | 解释"讲什么 + 为什么读" |
| 阅读时间 | — | "5 min read"（250 wpm 计算） |
| 日期 | — | "Mar 15, 2024"（不要相对时间如 "2 days ago"） |

## Image guidelines

- 缩略图比例统一 **16:9**（与 YouTube/Blog 通用）或 **2:1**（Vercel 风格）
- 文件大小 ≤ 100KB
- 格式：WebP / AVIF
- 响应式：800w / 1200w / 1600w 三档
- 主题色：明亮（不要全黑全白图）

## Animation

- **hover**: 缩略图 `scale-105` (300ms ease-out) + 卡片边框变深 + 阴影出现
- **入场**: 错落 fade-up（每行 30-50ms 间隔）

## Layout in lists

| 容器 | 推荐网格 |
|---|---|
| 博客主页 | 3 列 (desktop) / 2 列 (tablet) / 1 列 (mobile) |
| 边栏 | 1 列 V2 紧凑卡 |
| "Related posts" | 3 列 V1 |
| 编辑精选 | 1 大 + 2-3 小（V3 头条 + V1 小卡） |

## Reference implementations

- **Vercel Blog** — 16:9 + 极简 + 大标题
- **Linear Blog** — 极简 + 文本优先
- **Stripe Blog** — 缩略图 + 分类色
- **Mintlify Blog** — 现代卡 + 强 hover
- **Notion Blog** — 头条 + 列表组合
- **Vercel / Linear / Resend** — `aspect-video` + `object-cover` 标准做法
