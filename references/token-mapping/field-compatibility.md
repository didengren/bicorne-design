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

---

## 6. Component Grammar Field Compatibility

### 6.1 Component Name → Signature Key Mapping

Standard mapping from DESIGN.md component names to `componentGrammar.signatures` keys.

| DESIGN.md Component Name Pattern | Signature Key | Archetype |
|---------------------------------|---------------|-----------|
| button-primary, button-cta, button-submit | button | actionable |
| button-secondary, button-outline | button | actionable |
| button-tertiary, button-ghost, button-text-link, button-link | button | actionable |
| button-primary-active, button-primary-pressed | button (state: primary-pressed) | actionable |
| button-primary-disabled | button (state: disabled) | actionable |
| button-icon, button-icon-circular | button-icon | actionable |
| card, card-base, card-default | card | containment |
| feature-card, card-feature | card | containment |
| pricing-card, pricing-tier-card, pricing-tier | card | containment |
| pricing-card-featured, pricing-tier-featured | card (state: elevated) | containment |
| testimonial-card | card | containment |
| product-card, product-mockup-card | card | containment |
| code-block, code-window, code-window-card | card | containment |
| hero-band, hero-card, hero-stripe | hero | display |
| top-nav, nav-bar, primary-nav, global-nav | navigation | navigation |
| footer, footer-section, footer-region | navigation | navigation |
| sub-nav, sub-nav-pill, sub-nav-strip | navigation | navigation |
| text-input, text-input-focused | input | actionable |
| search-input, search-pill, search-bar | input | actionable |
| badge-pill, badge-tag, badge-status | badge | indicator |
| badge-orange, badge-coral, badge-green | badge (state: semantic variant) | indicator |
| pill-tab, category-tab, segmented-tab | tab | actionable |
| cta-band, cta-banner, cta-strip | cta | containment |
| changelog-row, faq-row, comparison-row | data-row | data |
| stat-callout, stat-cell, stat-row | data-row | data |
| logo-wall-item, customer-logo-tile, logo-strip | logo-strip | containment |

### 6.2 Brand-Specific Component Mapping

Components unique to specific brands that require special handling.

| Brand | Component Name | Signature Key | State | Notes |
|-------|---------------|---------------|-------|-------|
| Binance | button-trading-up | button | trading-up | Semantic color: green for price up |
| Binance | button-trading-down | button | trading-down | Semantic color: red for price down |
| Binance | button-subscribe | button | subscribe | CTA variant |
| Binance | markets-table-card | card | — | Data table container |
| Binance | price-up-down-cell | data-row | — | Trading data unit |
| Airbnb | search-bar-pill | input | — | Pill-shaped search input |
| Airbnb | search-orb | input | — | Circular search trigger |
| Airbnb | property-card | card | — | Listing card |
| Airbnb | date-picker-day | input | — | Date selection cell |
| Meta | button-buy-cta | button | buy-cta | Commerce CTA variant |
| Meta | card-checkout-summary | card | checkout | Checkout flow card |
| Meta | color-swatch-circle | badge | swatch | Product color selector |
| BMW | configurator-option-tile | card | configurator | Car configuration selector |
| BMW | model-card | card | model | Vehicle model card |
| Ferrari | race-position-cell | data-row | — | Race result data |
| Ferrari | preowned-listing-card | card | preowned | Pre-owned listing |
| PlayStation | game-tile | card | game | Game product card |
| PlayStation | ps-plus-banner | cta | ps-plus | Subscription CTA |
| Nike | swatch-dot | badge | swatch | Color/size selector |
| Nike | campaign-tile | card | campaign | Marketing campaign card |
| Apple | product-tile-light/dark | card | product-tile | Product showcase tile |
| Apple | button-pearl-capsule | button | pearl | Premium CTA variant |
| Apple | sub-nav-frosted | navigation | frosted | Frosted glass sub-navigation |
| HashiCorp | button-product-terraform/vault/waypoint | button | product-terraform/vault/waypoint | Product-line colored buttons |
| Raycast | command-palette-row | data-row | — | Command palette item |
| Raycast | keycap | badge | keycap | Keyboard shortcut indicator |
| Mintlify | sidebar-nav-item | navigation | sidebar-item | Documentation sidebar |
| Mintlify | doc-toc-item | navigation | toc-item | Table of contents item |
| Ollama | terminal-card | card | terminal | Terminal emulator container |
| PostHog | hedgehog-mascot-card | card | mascot | Brand mascot card |

### 6.3 State Key Normalization

| DESIGN.md Suffix | Normalized State Key | Applies To |
|-------------------|---------------------|------------|
| -primary | primary | button, input |
| -secondary | secondary | button, input |
| -tertiary, -ghost, -text-link, -link | ghost | button |
| -active, -pressed | primary-pressed | button (sub-state of primary) |
| -disabled | disabled | button, input |
| -focused | focused | input, tab |
| -featured, -elevated | elevated | card |
| -on-dark | on-dark | button, card (dark surface variant) |
| -on-light, -on-cream | on-light | button, card (light surface variant) |
| -dark | dark | card, hero (dark background variant) |
| -light | light | card, hero (light background variant) |
| -yellow, -coral, -green, -orange | semantic-{color} | badge, card (color-coded variant) |
