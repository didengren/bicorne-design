/**
 * AUTO-GENERATED stub. Run `npm run token:build` to regenerate from token.json.
 * See ../../tailwind-bridge/README.md for details.
 */
import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{vue,ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        'dash-bg': '#08090c',
        'dash-panel': '#0d1117',
        'dash-surface-1': '#0d1117',
        'dash-surface-2': '#161b22',
        'dash-surface-3': '#1d2330',
        'dash-border-soft': '#2a3142',
        'dash-border-faint': '#1a2030',
        'dash-text': '#e6edf3',
        'dash-text-muted': '#8b95a5',
        'dash-text-dim': '#5a6478',
        'dash-accent-blue': '#2b7fff',
        'dash-accent-cyan': '#54c5ff',
        'dash-accent-green': '#00d4a8',
        'dash-accent-violet': '#a78bfa',
        'dash-accent-amber': '#ffb84d',
        'dash-accent-red': '#ff4d6d',
      },
      spacing: {
        'dash-0': '0', 'dash-1': '4px', 'dash-2': '8px', 'dash-3': '12px',
        'dash-4': '16px', 'dash-5': '20px', 'dash-6': '24px', 'dash-8': '32px',
        'dash-10': '40px', 'dash-12': '48px', 'dash-14': '56px', 'dash-16': '64px',
        'dash-20': '80px', 'dash-24': '96px', 'dash-32': '128px',
      },
      borderRadius: {
        'dash-sm': '4px', 'dash-md': '6px', 'dash-lg': '10px',
        'dash-xl': '14px', 'dash-pill': '9999px',
      },
      boxShadow: {
        'dash-panel': '0 8px 32px rgba(0, 0, 0, 0.4)',
        'dash-glow-soft': '0 0 24px rgba(84, 197, 255, 0.12)',
        'dash-glow-strong': '0 0 32px rgba(84, 197, 255, 0.24)',
      },
      fontFamily: {
        'dash-display': ['Inter', '"PingFang SC"', 'system-ui', 'sans-serif'],
        'dash-body': ['Inter', '"PingFang SC"', 'system-ui', 'sans-serif'],
        'dash-mono': ['"JetBrains Mono"', '"SF Mono"', 'monospace'],
      },
      keyframes: {
        'dash-fade-up':   { '0%': { opacity: '0', transform: 'translateY(12px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'dash-draw':      { '0%': { strokeDashoffset: '1000' }, '100%': { strokeDashoffset: '0' } },
        'dash-pulse':     { '0%,100%': { opacity: '1', transform: 'scale(1)' }, '50%': { opacity: '0.6', transform: 'scale(1.05)' } },
        'dash-pulse-soft':{ '0%,100%': { opacity: '0.7' }, '50%': { opacity: '1' } },
        'dash-ripple':    { '0%': { r: '0.4', opacity: '0.6' }, '100%': { r: '3.5', opacity: '0' } },
        'dash-scan':      { '0%': { transform: 'translateX(-100%)' }, '100%': { transform: 'translateX(100%)' } },
        'dash-aurora':    { '0%,100%': { transform: 'translate(0,0) scale(1)' }, '50%': { transform: 'translate(20px,-10px) scale(1.1)' } },
        'dash-shimmer':   { '0%': { backgroundPosition: '0% 50%' }, '100%': { backgroundPosition: '200% 50%' } },
        'dash-ticker':    { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        'dash-blink':     { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.3' } },
        'dash-count-up':  { '0%': { transform: 'translateY(40%)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
      },
      animation: {
        'dash-fade-up':  'dash-fade-up 500ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'dash-draw':     'dash-draw 1.6s cubic-bezier(0.4, 0, 0.2, 1) both',
        'dash-pulse':    'dash-pulse 2.4s ease-in-out infinite',
        'dash-pulse-soft': 'dash-pulse-soft 3s ease-in-out infinite',
        'dash-ripple':   'dash-ripple 3s ease-out infinite',
        'dash-scan':     'dash-scan 6s linear infinite',
        'dash-aurora':   'dash-aurora 18s ease-in-out infinite',
        'dash-shimmer':  'dash-shimmer 2.4s linear infinite',
        'dash-ticker':   'dash-ticker 40s linear infinite',
        'dash-blink':    'dash-blink 1.6s ease-in-out infinite',
        'dash-count-up': 'dash-count-up 600ms cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
} satisfies Config
