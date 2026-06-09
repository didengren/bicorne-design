/**
 * Mock data for the Resend-style landing verification.
 * Single-page营销定位：4 个核心区块的静态数据。
 * 不需要 useMockPagination —— 单页全量展示。
 */

export interface Feature {
  id: string
  icon: 'bolt' | 'code' | 'shield' | 'globe' | 'gauge' | 'sparkles'
  title: string
  description: string
  codeSnippet?: string
}

export interface Testimonial {
  id: string
  company: string
  logoText: string // 文字 logo 简写
  quote: string
  author: string
  role: string
}

export interface PricingTier {
  id: string
  name: string
  price: string
  unit: string
  description: string
  features: string[]
  cta: { label: string; href: string }
  highlighted?: boolean
}

export interface LogoItem {
  id: string
  label: string // 简写文字（避免外部 logo 资源）
}

/** 客户 logo 墙（≥ 8 家以满足"信任"密度） */
export const customerLogos: LogoItem[] = [
  { id: 'l1', label: 'Loom' },
  { id: 'l2', label: 'Cal.com' },
  { id: 'l3', label: 'Linear' },
  { id: 'l4', label: 'Plaid' },
  { id: 'l5', label: 'Arc' },
  { id: 'l6', label: 'Vercel' },
  { id: 'l7', label: 'Notion' },
  { id: 'l8', label: 'Framer' },
  { id: 'l9', label: 'Cron' },
  { id: 'l10', label: 'Perplexity' },
]

/** 特性块（3 个核心 + 演示代码片段） */
export const features: Feature[] = [
  {
    id: 'f1',
    icon: 'bolt',
    title: 'Send in 60 seconds',
    description:
      'A single API call. No SMTP config, no DNS wizard, no third-party lock-in. Drop in your key and ship.',
    codeSnippet: `import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

await resend.emails.send({
  from: 'hello@acme.dev',
  to: 'user@example.com',
  subject: 'Welcome to Acme',
  html: '<h1>Hi there 👋</h1>',
})`,
  },
  {
    id: 'f2',
    icon: 'code',
    title: 'React Email templates',
    description:
      'Build email UI in React with full type-safety. Reuse your design system. No more string-concatenated HTML.',
    codeSnippet: `import { Html, Button, Heading } from '@react-email/components'

export default function Welcome() {
  return (
    <Html>
      <Heading>Welcome to Acme</Heading>
      <Button href="https://acme.dev">Get started</Button>
    </Html>
  )
}`,
  },
  {
    id: 'f3',
    icon: 'gauge',
    title: 'Built for production',
    description:
      '99.99% deliverability SLA, real-time webhooks, bounce + complaint handling, and audit logs out of the box.',
    codeSnippet: `// Webhook event payload
{
  "type": "email.delivered",
  "created_at": "2026-06-07T08:00:00Z",
  "data": {
    "email_id": "abc-123",
    "to": "user@example.com",
    "from": "hello@acme.dev"
  }
}`,
  },
]

/** 客户证言（2-3 条强证言） */
export const testimonials: Testimonial[] = [
  {
    id: 't1',
    company: 'Loom',
    logoText: 'Loom',
    quote:
      'We migrated 4 billion emails a year to Resend in a weekend. Our open rates went up 18% and our engineers stopped dreading email code.',
    author: 'Vinay Hiremath',
    role: 'CTO at Loom',
  },
  {
    id: 't2',
    company: 'Cal.com',
    logoText: 'Cal',
    quote:
      'The DX is the best we have ever seen. We replaced a 6-service email stack with one Resend integration.',
    author: 'Peer Richelsen',
    role: 'Co-founder at Cal.com',
  },
]

/** 价格档（3 档 + 推荐档） */
export const pricingTiers: PricingTier[] = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    unit: '/ month',
    description: 'For side projects and prototypes.',
    features: [
      '3,000 emails / month',
      '1 custom domain',
      'Email support',
      'Webhooks',
    ],
    cta: { label: 'Start for free', href: '#start' },
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$20',
    unit: '/ month',
    description: 'For production apps at scale.',
    features: [
      '50,000 emails / month',
      'Unlimited domains',
      'Priority support',
      'Advanced analytics',
      'Remove Resend badge',
    ],
    cta: { label: 'Start free 14-day trial', href: '#trial' },
    highlighted: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    unit: '',
    description: 'For high-volume senders and compliance teams.',
    features: [
      'Volume pricing',
      'Dedicated IPs',
      'SOC 2 + HIPAA',
      'SLA + onboarding',
      'Quarterly reviews',
    ],
    cta: { label: 'Contact sales', href: '#sales' },
  },
]

/** FAQ */
export interface FaqItem {
  id: string
  question: string
  answer: string
}

export const faqs: FaqItem[] = [
  {
    id: 'q1',
    question: 'How is this different from SendGrid or Postmark?',
    answer:
      'Resend is built around a modern developer experience — typed SDKs, React Email for templates, and webhooks as a first-class concept. No more SMTP gymnastics.',
  },
  {
    id: 'q2',
    question: 'Do I need to migrate my templates?',
    answer:
      'No. You can keep using HTML strings if you want, but most teams move to React Email within a week for the type-safety alone.',
  },
  {
    id: 'q3',
    question: 'What about deliverability?',
    answer:
      'We maintain dedicated IP pools, automatic warmup, and a deliverability team that monitors your sending reputation. 99.99% inbox placement on the Pro plan.',
  },
  {
    id: 'q4',
    question: 'Can I bring my own domain?',
    answer:
      'Yes. One-click DNS verification, automatic DKIM/SPF/DMARC, and a hosted UI for managing bounces and complaints.',
  },
]
