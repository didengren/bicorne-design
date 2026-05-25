# DESIGN.md → token.json Mapping Rules

> This document defines how raw data from Layer 1 (brand DESIGN.md) is mapped to the standard format of Layer 2 (token.json).

---

## 1. Mapping Overview

```
DESIGN.md (YAML front matter + Markdown body)
    │
    ▼  Field-by-field mapping per mapping-rules.md
    │
token.json (conforming to design-token.schema.json)
```

---

## 2. Color Mapping

### 2.1 Brand Color → colors.brand (10-step Scale)

DESIGN.md typically provides only 1 primary value. Mapping logic:

1. Extract the primary color value from DESIGN.md
2. Use the @ant-design/colors algorithm to generate brand.50 ~ brand.900 (10 steps)
3. Light theme: primary value is used directly as algorithm input, brand.500 = primary
4. Dark theme: algorithm uses `darkColorMap` to blend primary with background color, brand.500 ≠ primary (it is the dark-adapted middle step); the original primary value is preserved in `semantic.info`

**Extraction Priority** (try in order, use the first one found):

| Priority | DESIGN.md Field | Example |
|----------|----------------|---------|
| 1 | `colors.primary` | Linear: `#5e6ad2` |
| 2 | `colors.brand` | — |
| 3 | `colors.accent-color` | — |
| 4 | "Primary" / "Brand" color value in Markdown body | Stripe: `#533afd` |
| 5 | Main CTA button background color | Nike: `#111111` |

**Dark Theme Special Handling**:
- If DESIGN.md has `colors.primary-hover`, map to brand.400
- If DESIGN.md has `colors.primary-focus`, map to brand.600

### 2.2 Surface Color → colors.surface

| token.json Target | Extraction Priority | Dark Theme Default | Light Theme Default |
|-------------------|--------------------|--------------------|---------------------|
| `surface.base` | `colors.canvas` > `colors.background` > light default `#ffffff` | `#010102` | `#ffffff` |
| `surface.1` | `colors.surface-1` > `colors.surface-raised` | `#0f1011` | `#f5f5f5` |
| `surface.2` | `colors.surface-2` > `colors.surface-overlay` | `#141516` | `#fafafa` |
| `surface.3` | `colors.surface-3` > `colors.surface-sunken` | `#18191a` | `#f0f0f0` |
| `surface.4` | `colors.surface-4` | `#1c1d1e` | `#e8e8e8` |

**Dark Theme Detection**: If the lightness of `surface.base` < 50 (HSL), treat as dark theme.

### 2.3 Ink Color → colors.ink

| token.json Target | Extraction Priority |
|-------------------|--------------------|
| `ink.default` | `colors.ink` > `colors.foreground` > `colors.text-primary` > dark `#f7f8f8` / light `#1a1a1a` |
| `ink.muted` | `colors.ink-muted` > `colors.foreground-muted` > `colors.text-secondary` |
| `ink.subtle` | `colors.ink-subtle` > `colors.ink-tertiary` > `colors.text-tertiary` |
| `ink.tertiary` | `colors.ink-tertiary` > `colors.text-quaternary` |

### 2.4 Border Color → colors.border

| token.json Target | Extraction Priority |
|-------------------|--------------------|
| `border.default` | `colors.hairline` > `colors.border` > `colors.divider` |
| `border.strong` | `colors.hairline-strong` > `colors.border-strong` |
| `border.subtle` | `colors.hairline-tertiary` > `colors.hairline-soft` > `colors.border-subtle` |

### 2.5 Semantic Color → colors.semantic

| token.json Target | Extraction Priority |
|-------------------|--------------------|
| `semantic.success` | `colors.semantic-success` > `colors.success` > `colors.success-bright` |
| `semantic.danger` | `colors.sale` > `colors.danger` > `colors.error` |
| `semantic.warning` | `colors.warning` > `colors.lemon` |
| `semantic.info` | `colors.info` > `colors.info-deep` > same hue family as brand.500 |

---

## 3. Typography Mapping

### 3.1 Font Families → typography.fontFamilies

Extract deduplicated font family list from `typography.*.fontFamily` in DESIGN.md.

**Mapping Rules**:
- Contains "Display" / "Futura" / "Campaign" → assign to `display` family
- Contains "Text" / "Body" / "Now Text" → assign to `body` family
- Contains "Mono" / "Code" / "SourceCodePro" → assign to `mono` family

Each font family outputs `name` (display name) and `stack` (CSS font-stack).

### 3.2 Type Scales → typography.scales

Map each item from `typography.*` in DESIGN.md. Mapping rules:

| DESIGN.md Field Pattern | token.json Scale Name |
|------------------------|----------------------|
| `display-xl` / `display-campaign` / `display-mega` / `hero-display` / `display-xxl` | `display-xl` |
| `display-lg` / `product-display` / `section-display` | `display-lg` |
| `display-md` / `display-sm` / `stat-display` / `number-display` / `rating-display` | `display-md` |
| `headline` / `heading-1` | `headline` |
| `heading-xl` / `sub-heading-large` / `subhead` / `heading-2` / `section-heading` / `feature-heading` | `heading-xl` |
| `heading-lg` / `sub-heading` / `card-title` / `card-heading` / `subtitle` / `title-lg` / `heading-3` | `heading-lg` |
| `heading-md` / `heading-sm` / `title-md` / `title-sm` / `heading-4` | `heading-md` |
| `body-lg` / `body-large` / `heading-5` | `body-lg` |
| `body` / `body-md` / `body-md-bold` / `body-md-medium` / `body-strong` / `body-tracked` / `link` / `link-emph` / `link-md` | `body-md` |
| `body-sm` / `body-small` / `body-sm-medium` / `body-sm-strong` | `body-sm` |
| `caption` / `caption-md` / `caption-sm` / `caption-bold` / `caption-strong` / `caption-tight` / `caption-uppercase` / `label-md` / `label-sm` | `caption` |
| `eyebrow` | `eyebrow` |
| `button` / `button-md` / `button-sm` / `button-lg` / `nav-link` | `button` |
| `mono` / `code` / `code-md` / `code-sm` / `mono-label` | `mono` |

Each scale outputs: `fontFamily` (reference key), `fontSize`, `fontWeight`, `lineHeight`, `letterSpacing` (optional), `textTransform` (optional).

---

## 4. Spacing Mapping

Map directly from `spacing.*` in DESIGN.md.

**Mapping Rules**:
- Strip the `px` unit suffix, output pure numbers
- Keep keys as-is or normalize to numbers (`xxs: 4px` → `"1": 4`)

**Normalized Mapping**:

| DESIGN.md Common Key | token.json Key | Value |
|---------------------|----------------|-------|
| `xxs` / `2` | `"1"` | 4 |
| `xs` / `4` | `"2"` | 8 |
| `sm` / `8` | `"3"` | 12 |
| `md` / `16` | `"4"` | 16 |
| `lg` / `24` | `"6"` | 24 |
| `xl` / `32` | `"8"` | 32 |
| `xxl` / `48` | `"12"` | 48 |
| `section` / `64` | `"16"` | 64 |

---

## 5. Border Radius Mapping

Map directly from `rounded.*` in DESIGN.md.

**Normalized Mapping**:

| DESIGN.md Common Key | token.json Key |
|---------------------|----------------|
| `xs` / `none` (4px) | `sm` |
| `sm` (6px) | `md` |
| `md` (8px) | `lg` |
| `lg` (12px) | `xl` |
| `xl` (16px) | `2xl` |
| `xxl` (24px) | `2xl` |
| `pill` / `full` (9999px) | `full` |

---

## 6. Shadow Mapping

Extract from the "Shadow" / "Elevation" section in DESIGN.md Markdown body.

**Mapping Rules**:
- Map by depth level: sm → md → lg → xl
- Preserve the complete CSS box-shadow value

---

## 7. Transition Mapping

Extract from the "Animation" / "Transition" section in DESIGN.md.

**Mapping Rules**:
- `default`: 200ms + ease-out (`cubic-bezier(0.215,0.61,0.355,1)`)
- `fast`: 100ms
- `slow`: 300ms
- Preserve the original CSS value for easing curves

---

## 8. Missing Field Handling

When DESIGN.md is missing a field:

1. **Brand color**: Must be provided, otherwise token.json cannot be generated → error
2. **Surface color**: Fill defaults from template (dark/light)
3. **Ink color**: Auto-derive from surface color (light text on dark surface / dark text on light surface)
4. **Border color**: Derive from surface color (slightly lighter/darker than surface.1)
5. **Semantic color**: Fill defaults from template
6. **Typography**: Fill missing scales from template
7. **Spacing / Border radius**: Fill defaults from template

---

## 9. Platform-Specific Mapping

Mapping strategy for the same brand DESIGN.md across different platforms.

### Core Principle: Cross-Platform Consistency

Shared across platforms for the same brand:
- `colors` (brand scale, surface, ink, border, semantic) — identical
- `typography.fontFamilies` (font family definitions) — identical
- `viewport` (responsive breakpoints) — consistent with bicorne-ui BREAKPOINTS, shared across all platforms

Different across platforms for the same brand:
- `typography.scales` (type scales) — use the corresponding platform template defaults; desktop overrides template with DESIGN.md values, mobile/dashboard retain template defaults (DESIGN.md type scales are the authoritative source for desktop scenarios, not applicable to other platforms)
- `typography.scales.*.letterSpacing` (letter spacing) — mobile/dashboard templates inherit absolute values from the desktop dark template; when scaling font size makes the letter-spacing ratio noticeably tight (e.g., mobile display-xl 34px with -3.0px, ratio -8.8% vs desktop -3.75%), proportional scaling may be applied at the execution layer, the token layer keeps the inherited value unchanged
- `spacing` — use the corresponding platform template defaults
- `borderRadius` — use the corresponding platform template defaults
- `shadows` — use the corresponding platform template defaults
- `transitions` — shared across all platforms (mobile/dashboard duration differences are handled at the execution layer, not differentiated via tokens)

### Mapping Flow

```
DESIGN.md
│
├─ Extract colors + fontFamilies → shared across all platforms
│
├─ Inject viewport (bicorne-ui BREAKPOINTS constants) → shared across all platforms
│
└─ Extract scales / spacing / borderRadius / shadows
   │
   ├─ Desktop → dark-theme.template.json or light-theme.template.json skeleton → override with DESIGN.md values (desktop is the target scenario for DESIGN.md)
   ├─ Mobile → mobile-dark.template.json or mobile-light.template.json skeleton → retain template defaults (do not override with DESIGN.md desktop values)
   └─ Dashboard → dashboard-dark.template.json skeleton → retain template defaults (do not override with DESIGN.md desktop values)
```

### Border Radius Absolute Values

> Desktop dark values are from `dark-theme.template.json`, desktop light values are from `light-theme.template.json`. Mobile/dashboard values increment from the corresponding theme base.

| key | Desktop Dark | Desktop Light | Mobile Dark | Mobile Light | Dashboard Dark |
|-----|-------------|--------------|-------------|--------------|----------------|
| sm  | 4           | 4            | 6           | 6            | 8              |
| md  | 8           | 6            | 10          | 8            | 12             |
| lg  | 12          | 8            | 14          | 10           | 16             |
| xl  | 16          | 12           | 18          | 14           | 20             |
| 2xl | 24          | 16           | 26          | 18           | 28             |
| full | 9999       | 9999         | 9999        | 9999         | 9999           |

### Spacing Absolute Values

| Platform | Base | Token Key Set | Notes |
|----------|------|---------------|-------|
| Desktop | 4px | `"1":4 "2":8 "3":12 "4":16 "5":20 "6":24 "8":32 "10":40 "12":48 "16":64` | Current default |
| Mobile | 4px | Same as desktop (keys and values are identical) | Touch target ≥ 44px is achieved at the component level, not via spacing tokens |
| Dashboard | 8px | `"1":8 "2":16 "3":24 "4":32 "5":40 "6":48 "8":64 "10":80 "12":96 "16":128` | Larger spacing needed for far viewing distance |

### Mobile Low DPI Font Size Execution-Layer Override Rule

All font sizes < 16px in the mobile template must be overridden to ≥ 16px at the execution layer on low DPI (1x) screens; high DPI (2x+) screens use template values.

| scale | Template Value | Low DPI Override | Exempt | Reason |
|-------|---------------|-----------------|--------|--------|
| heading-md | 15px | ≥ 16px | Exemptable | Weight 600 is relatively high, readability is better than regular weight at the same size |
| body-md | 15px | ≥ 16px | — | Body text must not be below 16px |
| body-sm | 13px | ≥ 16px | — | Body text must not be below 16px |
| caption | 11px | ≥ 16px | — | Auxiliary text must not be below 16px |
| mono | 12px | ≥ 16px | — | Code text must not be below 16px |
| button | 14px | ≥ 16px | Exemptable | Component-level font size control, at the execution layer's discretion |

> This rule is an execution-layer constraint and does not change token-layer template values. The token layer preserves optimal values for high DPI scenarios; low DPI adaptation is implemented by the consumer.

### Viewport Default Breakpoints

Consistent with bicorne-ui BREAKPOINTS, shared across all platforms:

```json
{ "xs": 480, "sm": 640, "md": 768, "lg": 1024, "xl": 1280, "xxl": 1536, "xxxl": 1920 }
```

Primary design range per platform:

| Platform | Primary Range | Notes |
|----------|--------------|-------|
| Mobile | xs–md (480–768) | Phone portrait/landscape |
| Desktop | md–xxl (768–1536) | Laptop/desktop monitor |
| Dashboard | xl–xxxl (1280–1920+) | Data display dashboard/control room |
