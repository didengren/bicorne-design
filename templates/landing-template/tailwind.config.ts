/**
 * AUTO-GENERATED stub. Hand-mapped from ./token.json (land- prefix).
 * See ../../tailwind-bridge/README.md for the auto-generation path.
 */
import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{vue,ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        'land-bg': '#ffffff',
        'land-panel': '#fafaf9',
        'land-surface-1': '#ffffff',
        'land-surface-2': '#fafaf9',
        'land-surface-3': '#f5f5f4',
        'land-border-soft': '#e7e5e4',
        'land-border-faint': '#f0eeec',
        'land-text': '#0a0a0a',
        'land-text-muted': '#57534e',
        'land-text-dim': '#a8a29e',
        'land-text-on-accent': '#ffffff',
        'land-accent': '#FF5C1B',
        'land-accent-hover': '#E54A0E',
        'land-accent-soft': '#FFF1EA',
        'land-mac-red': '#ff5f57',
        'land-mac-yellow': '#febc2e',
        'land-mac-green': '#28c840',
      },
      spacing: {
        'land-0': '0', 'land-1': '4px', 'land-2': '8px', 'land-3': '12px',
        'land-4': '16px', 'land-5': '20px', 'land-6': '24px', 'land-8': '32px',
        'land-10': '40px', 'land-12': '48px', 'land-14': '56px', 'land-16': '64px',
        'land-20': '80px', 'land-24': '96px', 'land-32': '128px',
      },
      borderRadius: {
        'land-sm': '4px', 'land-md': '6px', 'land-lg': '10px',
        'land-xl': '14px', 'land-2xl': '20px', 'land-pill': '9999px',
      },
      boxShadow: {
        'land-panel': '0 1px 2px rgba(0, 0, 0, 0.04)',
        'land-elevated': '0 8px 32px rgba(0, 0, 0, 0.06)',
        'land-hero': '0 24px 64px rgba(10, 10, 10, 0.08)',
      },
      fontFamily: {
        'land-display': ['Inter', '"PingFang SC"', 'system-ui', 'sans-serif'],
        'land-body': ['Inter', '"PingFang SC"', 'system-ui', 'sans-serif'],
        'land-mono': ['"JetBrains Mono"', '"SF Mono"', 'monospace'],
      },
      fontSize: {
        'land-display': ['72px', { lineHeight: '1.05', letterSpacing: '-0.025em', fontWeight: '700' }],
        'land-h-xl':    ['48px', { lineHeight: '1.1',  letterSpacing: '-0.02em',  fontWeight: '600' }],
        'land-h-lg':    ['36px', { lineHeight: '1.2',  letterSpacing: '-0.015em', fontWeight: '600' }],
        'land-h-md':    ['24px', { lineHeight: '1.3',  letterSpacing: '-0.01em',  fontWeight: '600' }],
        'land-body':    ['16px', { lineHeight: '1.6' }],
        'land-body-lg': ['18px', { lineHeight: '1.6' }],
        'land-caption': ['14px', { lineHeight: '1.5' }],
        'land-micro':   ['12px', { lineHeight: '1.4' }],
      },
      keyframes: {
        'land-fade-up': { '0%': { opacity: '0', transform: 'translateY(12px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'land-fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'land-shimmer': { '0%': { backgroundPosition: '0% 50%' }, '100%': { backgroundPosition: '200% 50%' } },
        'land-float':   { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-6px)' } },
        'land-marquee': { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
      },
      animation: {
        'land-fade-up': 'land-fade-up 600ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'land-fade-in': 'land-fade-in 400ms cubic-bezier(0.4, 0, 0.2, 1) both',
        'land-shimmer': 'land-shimmer 2.4s linear infinite',
        'land-float':   'land-float 6s ease-in-out infinite',
        'land-marquee': 'land-marquee 30s linear infinite',
      },
    },
  },
} satisfies Config
