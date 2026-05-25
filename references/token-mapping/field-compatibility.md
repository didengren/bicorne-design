# Brand Field Compatibility Table

> DESIGN.md field naming varies significantly across brands. This table records each brand's actual field names and their mapping to token.json targets.

---

## 1. Color Field Compatibility

### Brand Color

| Brand | DESIGN.md Field | Value | Maps To |
|-------|----------------|-------|---------|
| Linear | `colors.primary` | `#5e6ad2` | `colors.brand.500` |
| Stripe | Markdown body "Stripe Purple" | `#533afd` | `colors.brand.500` |
| Vercel | Markdown body "Vercel Black" | `#171717` | `colors.brand.500` |
| Nike | `colors.primary` | `#111111` | `colors.brand.500` |
| Spotify | Markdown body "Spotify Green" | `#1ed760` | `colors.brand.500` |
| Cursor | `colors.primary` | `#f54e00` | `colors.brand.500` |
| Tesla | `colors.primary` | — | `colors.brand.500` |
| Coinbase | Markdown body | — | `colors.brand.500` |
| Figma | Markdown body | — | `colors.brand.500` |
| Notion | Markdown body | — | `colors.brand.500` |
| Raycast | Markdown body | — | `colors.brand.500` |

### Surface Color

| Brand | Base Field | Value | Maps To |
|-------|-----------|-------|---------|
| Linear | `colors.canvas` | `#010102` | `colors.surface.base` |
| Stripe | Markdown "Pure White" | `#ffffff` | `colors.surface.base` |
| Vercel | Markdown "Pure White" | `#ffffff` | `colors.surface.base` |
| Nike | `colors.canvas` | `#ffffff` | `colors.surface.base` |
| Spotify | Markdown "Near Black" | `#121212` | `colors.surface.base` |
| Linear | `colors.surface-1` | `#0f1011` | `colors.surface.1` |
| Nike | `colors.soft-cloud` | `#f5f5f5` | `colors.surface.1` |
| Spotify | Markdown "Dark Surface" | `#181818` | `colors.surface.1` |

### Text Color

| Brand | Primary Text Field | Value | Maps To |
|-------|-------------------|-------|---------|
| Linear | `colors.ink` | `#f7f8f8` | `colors.ink.default` |
| Stripe | Markdown "Deep Navy" | `#061b31` | `colors.ink.default` |
| Vercel | Markdown "Vercel Black" | `#171717` | `colors.ink.default` |
| Nike | `colors.ink` | `#111111` | `colors.ink.default` |
| Spotify | Markdown "White" | `#ffffff` | `colors.ink.default` |
| Linear | `colors.ink-muted` | `#d0d6e0` | `colors.ink.muted` |
| Stripe | Markdown "Body" | `#64748d` | `colors.ink.muted` |
| Nike | `colors.mute` | `#707072` | `colors.ink.muted` |
| Spotify | Markdown "Silver" | `#b3b3b3` | `colors.ink.muted` |

### Border Color

| Brand | Border Field | Value | Maps To |
|-------|-------------|-------|---------|
| Linear | `colors.hairline` | `#23252a` | `colors.border.default` |
| Stripe | Markdown "Border Default" | `#e5edf5` | `colors.border.default` |
| Vercel | Shadow-as-border | `rgba(0,0,0,0.08)` | `colors.border.default` (approximate HEX) |
| Nike | `colors.hairline` | `#cacacb` | `colors.border.default` |
| Spotify | Markdown "Border Gray" | `#4d4d4d` | `colors.border.default` |

---

## 2. Typography Field Compatibility

### Font Families

| Brand | Display Font | Body Font | Mono Font |
|-------|-------------|-----------|-----------|
| Linear | Linear Display / SF Pro Display | Linear Text | Linear Mono |
| Stripe | sohne-var (ss01) | sohne-var (ss01) | SourceCodePro |
| Vercel | Geist Sans | Geist Sans | Geist Mono |
| Nike | Nike Futura ND / Helvetica Now Display | Helvetica Now Text | — |
| Spotify | SpotifyMixUITitle | SpotifyMixUI | — |

### Type Scale

| Brand | Max Display | Body Base | Button |
|-------|------------|-----------|--------|
| Linear | 80px | 16px | 14px |
| Stripe | 56px | 16px | 16px |
| Vercel | 48px | 18px | 14px |
| Nike | 96px | 16px | 16px |
| Spotify | 24px | 16px | 14px |

---

## 3. Spacing Field Compatibility

| Brand | Base Unit | Min Spacing | Max Spacing | Section Spacing |
|-------|----------|------------|------------|----------------|
| Linear | 4px | 4px | 48px | 96px |
| Stripe | 8px | 1px | 20px | — |
| Vercel | 8px | 1px | 40px | — |
| Nike | 8px | 2px | 30px | 48px |
| Spotify | 8px | 1px | 20px | — |

---

## 4. Border Radius Field Compatibility

| Brand | Min Radius | Standard Radius | Max Radius | Pill |
|-------|-----------|----------------|-----------|------|
| Linear | 4px | 8px | 24px | 9999px |
| Stripe | 4px | 6px | 8px | — |
| Vercel | 2px | 6px | 12px | 9999px |
| Nike | 0px | 30px | 30px | 9999px |
| Spotify | 2px | 8px | 20px | 9999px |

---

## 5. Special Mapping Rules

### Vercel Shadow-as-Border

Vercel uses `box-shadow: 0px 0px 0px 1px rgba(0,0,0,0.08)` instead of traditional border. When mapping:
- Extract the color value from the shadow and convert to approximate HEX as `border.default`
- Preserve the full shadow value in `shadows`

### Nike Extreme Border Radius

Nike's `rounded.sm` = 18px, `rounded.md` = 24px, `rounded.lg` = 30px. This differs significantly from the conventional 4/8/12 system. When mapping:
- Preserve original values, do not force standardization
- Use brand-original key names in token.json's `borderRadius`

### Stripe ss01 Font Feature

Stripe's sohne-var font enforces OpenType `"ss01"` feature set. When mapping:
- Append `font-feature-settings: "ss01"` note in `fontFamilies` `stack`
- Concrete implementation is handled by the consuming skill

### Spotify Dark Immersion

Spotify's UI has almost no light-colored elements. When mapping:
- `surface.base` takes `#121212`
- `ink.default` takes `#ffffff`
- Semantic colors preserve original values
