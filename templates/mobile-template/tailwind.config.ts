/**
 * AUTO-GENERATED stub. Hand-mapped from ./token.json (mob- prefix).
 * See ../../tailwind-bridge/README.md for the auto-generation path.
 */
import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{vue,ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        'mob-bg': '#000000',
        'mob-panel': '#16181c',
        'mob-surface-1': '#16181c',
        'mob-surface-2': '#1d1f23',
        'mob-surface-3': '#2a2c30',
        'mob-surface-elevated': '#16181c',
        'mob-border-subtle': '#2f3336',
        'mob-border-faint': '#202327',
        'mob-border-default': '#2f3336',
        'mob-text': '#e7e9ea',
        'mob-text-muted': '#71767b',
        'mob-text-dim': '#555a5f',
        'mob-text-on-accent': '#ffffff',
        'mob-accent': '#1d9bf0',
        'mob-accent-hover': '#1a8cd8',
        'mob-accent-soft': '#1a3a52',
        'mob-danger': '#f4212e',
        'mob-success': '#00ba7c',
        'mob-warning': '#ffd400',
      },
      spacing: {
        'mob-0': '0', 'mob-1': '4px', 'mob-2': '8px', 'mob-3': '12px',
        'mob-4': '16px', 'mob-5': '20px', 'mob-6': '24px', 'mob-8': '32px',
        'mob-10': '40px', 'mob-12': '48px', 'mob-14': '56px', 'mob-16': '64px',
        'mob-20': '80px',
      },
      borderRadius: {
        'mob-sm': '4px', 'mob-md': '8px', 'mob-lg': '12px',
        'mob-xl': '16px', 'mob-2xl': '20px', 'mob-pill': '9999px',
      },
      boxShadow: {
        'mob-subtle': '0 1px 2px rgba(0, 0, 0, 0.4)',
        'mob-elevated': '0 8px 24px rgba(0, 0, 0, 0.6)',
      },
      fontFamily: {
        'mob-display': ['Inter', '"PingFang SC"', 'system-ui', 'sans-serif'],
        'mob-body': ['Inter', '"PingFang SC"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'mob-display': ['28px', { lineHeight: '1.2',  letterSpacing: '-0.01em', fontWeight: '700' }],
        'mob-h-md':    ['20px', { lineHeight: '1.3',  letterSpacing: '-0.005em', fontWeight: '600' }],
        'mob-body':    ['16px', { lineHeight: '1.5' }],
        'mob-body-sm': ['15px', { lineHeight: '1.45' }],
        'mob-caption': ['14px', { lineHeight: '1.4' }],
        'mob-micro':   ['13px', { lineHeight: '1.35' }],
      },
      keyframes: {
        'mob-fade-in':   { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'mob-slide-up':  { '0%': { opacity: '0', transform: 'translateY(12px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'mob-tap-flash': { '0%': { backgroundColor: 'rgba(29, 155, 240, 0.15)' }, '100%': { backgroundColor: 'transparent' } },
      },
      animation: {
        'mob-fade-in':   'mob-fade-in 300ms cubic-bezier(0.4, 0, 0.2, 1) both',
        'mob-slide-up':  'mob-slide-up 400ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'mob-tap-flash': 'mob-tap-flash 150ms ease-out both',
      },
    },
  },
} satisfies Config
