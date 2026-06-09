---
name: tailwind-bridge
description: Auto-generate a tailwind.config.ts (or .js) from a token.json file. Bridges the gap between "I have a token" and "I have a working Tailwind config with all dash-* utilities".
keywords: tailwind, bridge, codegen, automation, config
---

# Tailwind Bridge — token.json → tailwind.config.ts

> Eliminates the **80 lines of hand-written mapping** between `token.json` and `tailwind.config.ts`. Run once, get a complete config that exposes all `dash-*` utility classes.

## Why this exists

Without this bridge, an AI agent writing dashboard code has to:

1. Read `token.json` (colors, spacing, animations, keyframes, fontFamilies, borderRadius, shadows)
2. Open `tailwind.config.ts`
3. **Manually** map every token to a `theme.extend.{colors,spacing,animation,keyframes,...}` entry
4. Forget something → CSS class doesn't exist → bug

The bridge auto-generates step 3, so step 4 becomes impossible.

---

## Usage

```bash
# In a host project
node ../../../.trae/skills/bicorne-design/tailwind-bridge/generate.mjs \
  --token ./token.json \
  --prefix dash \
  --out ./tailwind.config.ts

# Or via package.json script
"scripts": {
  "token:build": "node ../../../.trae/skills/bicorne-design/tailwind-bridge/generate.mjs"
}
```

Then import the generated config:

```ts
// tailwind.config.ts
import generated from './tailwind.config.generated'
export default generated
```

---

## What it generates

Given a `token.json` like:

```json
{
  "colors": {
    "surface": { "1": "#0f1219", "2": "#161b26" },
    "accent": { "blue": "#2b7fff", "cyan": "#54c5ff" }
  },
  "spacing": { "1": 4, "2": 8 },
  "borderRadius": { "lg": 12 },
  "shadows": { "panel": "0 8px 32px rgba(0,0,0,0.4)" },
  "fontFamilies": { "mono": "JetBrains Mono" },
  "animations": {
    "draw": { "duration": "1.6s", "easing": "cubic-bezier(0.4, 0, 0.2, 1)" }
  },
  "keyframes": {
    "draw": { "0%": { "stroke-dashoffset": "1000" }, "100%": { "stroke-dashoffset": "0" } }
  }
}
```

It outputs:

```ts
import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{vue,ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        'dash-surface-1': '#0f1219',
        'dash-surface-2': '#161b26',
        'dash-accent-blue': '#2b7fff',
        'dash-accent-cyan': '#54c5ff',
      },
      spacing: {
        'dash-1': '4px',
        'dash-2': '8px',
      },
      borderRadius: {
        'dash-lg': '12px',
      },
      boxShadow: {
        'dash-panel': '0 8px 32px rgba(0,0,0,0.4)',
      },
      fontFamily: {
        'dash-mono': 'JetBrains Mono',
      },
      keyframes: {
        'dash-draw': {
          '0%':   { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      animation: {
        'dash-draw': 'dash-draw 1.6s cubic-bezier(0.4, 0, 0.2, 1) both',
      },
    },
  },
} satisfies Config
```

Now `bg-dash-surface-1`, `text-dash-accent-cyan`, `p-dash-1`, `rounded-dash-lg`, `animate-dash-draw` all work.

---

## Files

| File | Purpose |
|---|---|
| `generate.mjs` | CLI script that reads token.json + writes tailwind.config.ts |
| `schema-binding.mjs` | Validates token.json against the schema before generating |
| `merge-with-existing.mjs` | Merges generated output with a host's existing tailwind.config.ts (preserves content paths, plugins) |
| `README.md` | This file |
| `__test__/sample-token.json` | Test input |
| `__test__/expected-output.ts` | Expected output for snapshot testing |
