/**
 * Mock data for the X-style mobile feed verification.
 * Mobile-first 移动 H5：底部 tab + 顶部 app bar + 垂直滚动 feed。
 * 不接真实 API —— 静态数据够展示 mobile-web 核心 UX 模式。
 */

export interface FeedStats {
  reply: number
  retweet: number
  like: number
  view: number
}

export interface FeedItem {
  id: string
  author: string
  handle: string
  /** 头像背景色（X 风格用首字母 + 颜色） */
  avatarColor: string
  avatarInitial: string
  time: string
  content: string
  /** 可选附属图（emoji 占位，避免外部资源） */
  attachmentEmoji?: string
  /** 是否已认证（X 蓝勾） */
  verified?: boolean
  stats: FeedStats
  /** iOS 16px 阈值 reminder：文本长度保持真实感 */
}

export interface BottomTab {
  id: string
  /** 显示文字（≤ 4 字符） */
  label: string
  /** 显示图标 (lucide 风格的 ant icon name) */
  icon: 'HomeOutlined' | 'SearchOutlined' | 'ThunderboltOutlined' | 'BellOutlined'
  /** 徽章数（> 99 显示 99+） */
  badge?: number
}

export interface TopTab {
  id: string
  label: string
  /** 强调样式 */
  emphasis?: 'default' | 'dot'
}

/** 8 条帖子（覆盖 text/attachment/verified/quote 多种形态） */
export const feed: FeedItem[] = [
  {
    id: 'p1',
    author: 'Bicorne Design',
    handle: 'bicorne_design',
    avatarColor: '#1d9bf0',
    avatarInitial: 'B',
    time: '2m',
    verified: true,
    content:
      'Just shipped mobile-1-x-like-feed — the first mobile-web verification reference for the bicorne-design skill. Built with Vue 3 + Vite + Tailwind, dark theme, iOS safe area, and 4 contract components. 50+ tokens, 0 errors, e2e all green.',
    attachmentEmoji: '🎨',
    stats: { reply: 24, retweet: 138, like: 612, view: 12_400 },
  },
  {
    id: 'p2',
    author: 'Sam Liang',
    handle: 'samliang',
    avatarColor: '#00ba7c',
    avatarInitial: 'S',
    time: '14m',
    content:
      'Hot take: most "mobile-first" sites are desktop-first with a viewport meta tag. True mobile-first means designing for the thumb zone first — bottom-anchored CTAs, edge-to-edge content, and single-handed reach.',
    stats: { reply: 89, retweet: 412, like: 2_100, view: 84_300 },
  },
  {
    id: 'p3',
    author: 'Linear',
    handle: 'linear',
    avatarColor: '#5e6ad2',
    avatarInitial: 'L',
    time: '47m',
    verified: true,
    content:
      'Linear Mobile v3 is rolling out. We rebuilt the issue detail screen from the ground up — swipes, native sheets, and a 60fps scroll list. Available on TestFlight today.',
    attachmentEmoji: '📱',
    stats: { reply: 156, retweet: 891, like: 4_300, view: 220_000 },
  },
  {
    id: 'p4',
    author: 'Vercel',
    handle: 'vercel',
    avatarColor: '#000000',
    avatarInitial: 'V',
    time: '1h',
    verified: true,
    content:
      'Ship faster. Preview every PR. Zero config. — The Vercel platform, now with native iOS app support for on-the-go deployment reviews.',
    stats: { reply: 42, retweet: 318, like: 1_840, view: 95_000 },
  },
  {
    id: 'p5',
    author: 'Mira Kovach',
    handle: 'mira_k',
    avatarColor: '#f4212e',
    avatarInitial: 'M',
    time: '2h',
    content:
      'Just finished migrating our design system to CSS variables. ~600 hardcoded color values gone. The future is tokens all the way down.',
    stats: { reply: 18, retweet: 67, like: 489, view: 8_900 },
  },
  {
    id: 'p6',
    author: 'GitHub',
    handle: 'github',
    avatarColor: '#8b5cf6',
    avatarInitial: 'G',
    time: '3h',
    verified: true,
    content:
      'GitHub Mobile 2.0 — new Liquid Glass tab bar, haptic feedback on swipe, and 40% faster cold start. Coming to TestFlight next week.',
    attachmentEmoji: '✨',
    stats: { reply: 234, retweet: 1_240, like: 6_100, view: 312_000 },
  },
  {
    id: 'p7',
    author: 'Aaron Levie',
    handle: 'levie',
    avatarColor: '#ffd400',
    avatarInitial: 'A',
    time: '5h',
    verified: true,
    content:
      'The next frontier of mobile UX is offline-first. Apps that work on the plane, in the subway, and on the cruise ship — and sync the moment you reconnect. PWA is the way.',
    stats: { reply: 76, retweet: 245, like: 1_120, view: 67_400 },
  },
  {
    id: 'p8',
    author: 'Figma',
    handle: 'figma',
    avatarColor: '#a259ff',
    avatarInitial: 'F',
    time: '7h',
    verified: true,
    content:
        "New: real-time cursors in Figma mobile. See your teammates' selections and comments live, right from your phone. Available today.",
    stats: { reply: 134, retweet: 678, like: 3_200, view: 158_000 },
  },
]

/** 4 个底部 tab（X 实际：Home / Search / Grok / Notifications） */
export const bottomTabs: BottomTab[] = [
  { id: 'home',         label: 'Home', icon: 'HomeOutlined' },
  { id: 'search',       label: 'Search', icon: 'SearchOutlined' },
  { id: 'grok',         label: 'Grok', icon: 'ThunderboltOutlined' },
  { id: 'notifications', label: 'Alerts', icon: 'BellOutlined', badge: 12 },
]

/** 2 个顶部 tab */
export const topTabs: TopTab[] = [
  { id: 'foryou',    label: 'For you',  emphasis: 'default' },
  { id: 'following', label: 'Following', emphasis: 'default' },
]

/** 顶部 app bar 副标题（用于显示 trending 信息） */
export const appBarSubtitle = 'trending in design'
