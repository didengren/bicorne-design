<script setup lang="ts">
/**
 * FeedCard — 单条帖子卡片
 * X 风格：avatar + author/handle/time + content + 附件 + 操作栏（reply/retweet/like/view/bookmark/share）
 * 操作按钮触摸目标 ≥ 32px（mobile-web 阈值）。
 */
import {
  CommentOutlined,
  RetweetOutlined,
  HeartOutlined,
  EyeOutlined,
  ShareAltOutlined,
  BookOutlined,
  CheckCircleFilled,
} from '@ant-design/icons-vue'
import type { FeedItem } from '@/mock/feed'

defineProps<{
  item: FeedItem
  /** Staggered enter animation delay (ms) */
  delay?: number
}>()
</script>

<template>
  <article
    role="article"
    :aria-label="`Post by ${item.author}`"
    class="flex gap-3 px-4 py-3 border-b border-mob-border-faint hover:bg-mob-surface-1/50 transition-colors animate-mob-fade-in"
    :style="delay ? { animationDelay: `${delay}ms` } : undefined"
  >
    <!-- Avatar -->
    <div
      role="img"
      :aria-label="`${item.author} avatar`"
      class="shrink-0 w-10 h-10 rounded-mob-pill flex items-center justify-center text-mob-text-on-accent text-mob-body font-semibold"
      :style="{ backgroundColor: item.avatarColor }"
    >
      {{ item.avatarInitial }}
    </div>

    <!-- Body -->
    <div class="flex-1 min-w-0">
      <!-- Meta header -->
      <div class="flex items-center gap-1 mb-0.5">
        <span class="text-mob-body-sm text-mob-text font-semibold truncate">
          {{ item.author }}
        </span>
        <CheckCircleFilled
          v-if="item.verified"
          class="text-mob-accent shrink-0"
          style="font-size: 14px"
          aria-label="Verified account"
        />
        <span class="text-mob-body-sm text-mob-text-muted truncate">@{{ item.handle }}</span>
        <span class="text-mob-text-muted text-mob-body-sm" aria-hidden="true">·</span>
        <span class="text-mob-body-sm text-mob-text-muted shrink-0" :aria-label="`Posted ${item.time}`">{{ item.time }}</span>
      </div>

      <!-- Content -->
      <p class="text-mob-body text-mob-text leading-snug whitespace-pre-wrap">
        {{ item.content }}
      </p>

      <!-- Optional attachment (emoji placeholder) -->
      <div
        v-if="item.attachmentEmoji"
        role="img"
        :aria-label="`Media attachment: ${item.attachmentEmoji}`"
        class="mt-2 rounded-mob-lg border border-mob-border-subtle bg-mob-surface-2 px-3 py-2 inline-flex items-center gap-2 text-mob-h-md"
      >
        <span class="text-2xl leading-none" aria-hidden="true">{{ item.attachmentEmoji }}</span>
        <span class="text-mob-caption text-mob-text-muted">media preview</span>
      </div>

      <!-- Actions row -->
      <div class="mt-2 -ml-2 flex items-center justify-between text-mob-text-muted" role="group" aria-label="Post actions">
        <button
          class="flex items-center gap-1.5 px-2 min-h-8 rounded-mob-md hover:text-mob-accent hover:bg-mob-accent-soft/30 transition-colors"
          :aria-label="`Reply (${item.stats.reply})`"
        >
          <CommentOutlined aria-hidden="true" style="font-size: 16px" />
          <span class="text-mob-micro tabular-nums" aria-hidden="true">{{ item.stats.reply }}</span>
        </button>

        <button
          class="flex items-center gap-1.5 px-2 min-h-8 rounded-mob-md hover:text-mob-success hover:bg-mob-success/15 transition-colors"
          :aria-label="`Repost (${item.stats.retweet})`"
        >
          <RetweetOutlined aria-hidden="true" style="font-size: 16px" />
          <span class="text-mob-micro tabular-nums" aria-hidden="true">{{ item.stats.retweet }}</span>
        </button>

        <button
          class="flex items-center gap-1.5 px-2 min-h-8 rounded-mob-md hover:text-mob-danger hover:bg-mob-danger/15 transition-colors"
          :aria-label="`Like (${item.stats.like})`"
        >
          <HeartOutlined aria-hidden="true" style="font-size: 16px" />
          <span class="text-mob-micro tabular-nums" aria-hidden="true">{{ item.stats.like }}</span>
        </button>

        <button
          class="flex items-center gap-1.5 px-2 min-h-8 rounded-mob-md hover:text-mob-accent hover:bg-mob-accent-soft/30 transition-colors"
          :aria-label="`Views (${item.stats.view})`"
        >
          <EyeOutlined aria-hidden="true" style="font-size: 16px" />
          <span class="text-mob-micro tabular-nums" aria-hidden="true">{{ item.stats.view.toLocaleString() }}</span>
        </button>

        <div class="flex items-center gap-1">
          <button
            class="w-8 h-8 flex items-center justify-center rounded-mob-md hover:text-mob-accent hover:bg-mob-accent-soft/30 transition-colors"
            aria-label="Bookmark"
          >
            <BookOutlined aria-hidden="true" style="font-size: 16px" />
          </button>
          <button
            class="w-8 h-8 flex items-center justify-center rounded-mob-md hover:text-mob-accent hover:bg-mob-accent-soft/30 transition-colors"
            aria-label="Share"
          >
            <ShareAltOutlined aria-hidden="true" style="font-size: 16px" />
          </button>
        </div>
      </div>
    </div>
  </article>
</template>
