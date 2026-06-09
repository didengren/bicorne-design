/**
 * AUTO-GENERATED stub. Hand-mapped from ./token.json (ai- prefix).
 * See ../../tailwind-bridge/README.md for the auto-generation path.
 */
import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{vue,ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        'ai-bg': '#0a0a0a',
        'ai-panel': '#161616',
        'ai-surface-1': '#1e1e1e',
        'ai-surface-2': '#252526',
        'ai-surface-3': '#2d2d30',
        'ai-surface-elevated': '#2a2a2a',
        'ai-border-subtle': '#2d2d30',
        'ai-border-faint': '#1f1f1f',
        'ai-border-focus': '#7c3aed',
        'ai-text': '#d4d4d4',
        'ai-text-muted': '#858585',
        'ai-text-dim': '#5a5a5a',
        'ai-text-on-accent': '#ffffff',
        'ai-accent': '#7c3aed',
        'ai-accent-hover': '#6d28d9',
        'ai-accent-soft': '#2a1a4a',
        'ai-accent-ai': '#a78bfa',
        'ai-code-bg': '#0d0d0d',
        'ai-code-text': '#d4d4d4',
        'ai-code-keyword': '#c586c0',
        'ai-code-string': '#ce9178',
        'ai-code-function': '#dcdcaa',
        'ai-code-comment': '#6a9955',
        'ai-code-number': '#b5cea8',
        'ai-tool-bg': '#1a1a1a',
        'ai-tool-border': '#3a3a3a',
        'ai-tool-icon': '#858585',
        'ai-status-success': '#4ec9b0',
        'ai-status-error': '#f48771',
        'ai-status-warning': '#dcdcaa',
        'ai-status-running': '#a78bfa',
        'ai-status-muted': '#858585',
        'ai-citation-bg': '#1a1a2e',
        'ai-citation-border': '#3a3a5a',
        'ai-mac-red': '#ff5f57',
        'ai-mac-yellow': '#febc2e',
        'ai-mac-green': '#28c840',
      },
      spacing: {
        'ai-0': '0', 'ai-1': '4px', 'ai-2': '8px', 'ai-3': '12px',
        'ai-4': '16px', 'ai-5': '20px', 'ai-6': '24px', 'ai-8': '32px',
      },
      borderRadius: {
        'ai-sm': '4px', 'ai-md': '6px', 'ai-lg': '8px', 'ai-xl': '12px', 'ai-2xl': '16px',
      },
      boxShadow: {
        'ai-panel': '0 1px 3px rgba(0, 0, 0, 0.4)',
        'ai-elevated': '0 4px 16px rgba(0, 0, 0, 0.5)',
        'ai-glow': '0 0 0 1px #7c3aed, 0 0 12px rgba(124, 58, 237, 0.3)',
      },
      fontFamily: {
        'ai-display': ['Inter', '"PingFang SC"', 'system-ui', 'sans-serif'],
        'ai-body': ['Inter', '"PingFang SC"', 'system-ui', 'sans-serif'],
        'ai-mono': ['"JetBrains Mono"', '"SF Mono"', '"Cascadia Code"', 'monospace'],
      },
      fontSize: {
        'ai-display':  ['28px', { lineHeight: '1.2', letterSpacing: '-0.015em', fontWeight: '600' }],
        'ai-h-xl':     ['20px', { lineHeight: '1.3', fontWeight: '600' }],
        'ai-h-lg':     ['16px', { lineHeight: '1.4', fontWeight: '600' }],
        'ai-body':     ['14px', { lineHeight: '1.55' }],
        'ai-body-sm':  ['13px', { lineHeight: '1.5' }],
        'ai-caption':  ['12px', { lineHeight: '1.4' }],
        'ai-micro':    ['11px', { lineHeight: '1.3' }],
      },
      keyframes: {
        'ai-fade-up': { '0%': { opacity: '0', transform: 'translateY(8px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'ai-fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'ai-pulse':   { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.4' } },
        'ai-stream':  { '0%': { opacity: '0.6' }, '100%': { opacity: '1' } },
      },
      animation: {
        'ai-fade-up': 'ai-fade-up 400ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'ai-fade-in': 'ai-fade-in 300ms cubic-bezier(0.4, 0, 0.2, 1) both',
        'ai-pulse':   'ai-pulse 1500ms cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ai-stream':  'ai-stream 30ms linear infinite',
      },
    },
  },
} satisfies Config
