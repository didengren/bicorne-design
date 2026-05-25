# 20 Design Philosophies

> 20 design philosophies for Phase 2 style direction and Phase 3 variant direction selection. Each philosophy provides characteristics, applicable scenarios, and implementation direction. Implementation direction is constrained by conflict resolution principles — animation duration/easing/naming follows the dual-layer specification in `animation-best-practices.md`.

---

## 1. Minimalism

**Characteristics**: Fewest elements, maximum whitespace, single focal point
**Applicable**: Premium brands, creative tools, meditation apps
**Implementation**: One core message per screen, remove all non-essential decoration

## 2. Swiss International

**Characteristics**: Grid system, sans-serif type, left-aligned, mathematical precision
**Applicable**: Data-intensive apps, corporate websites, documentation systems
**Implementation**: Strict 8px grid, Helvetica/Inter typeface, left-aligned typography

## 3. Neumorphism

**Characteristics**: Soft raised/recessed, same-color shadows, tactile simulation
**Applicable**: IoT control panels, health apps, smart home
**Implementation**: Dual shadows (light/dark), surface color close to background color

## 4. Glassmorphism

**Characteristics**: Frosted glass effect, semi-transparency, background blur, subtle borders
**Applicable**: Music players, weather apps, floating panels
**Implementation**: `backdrop-filter: blur()`, semi-transparent background, 1px white border

## 5. Dark Engineering

**Characteristics**: Near-pure-black canvas, hairline borders, code feel, product screenshot dominant
**Applicable**: Developer tools, CLI apps, SaaS dashboards
**Implementation**: canvas #010102, hairline borders, mono typeface accents
**Representative brands**: Linear, Raycast, Warp

## 6. Light Luxury

**Characteristics**: White canvas, ultra-light font weight, generous whitespace, refined shadows
**Applicable**: Fintech, premium SaaS, payment platforms
**Implementation**: Font weight 300, multi-layer blue-toned shadows, conservative border radius
**Representative brands**: Stripe, Coinbase

## 7. Photography-First

**Characteristics**: Large-scale photography, minimal UI overlay, pure black/white/gray interface
**Applicable**: E-commerce, travel, lifestyle brands
**Implementation**: UI recedes into background, photography occupies 70%+ area
**Representative brands**: Nike, Airbnb

## 8. Content Immersion

**Characteristics**: Dark background, UI recedes into shadows, content becomes the color source
**Applicable**: Music streaming, video platforms, media apps
**Implementation**: Near-black background, heavy shadows, compact typography
**Representative brands**: Spotify

## 9. Mega Typography

**Characteristics**: Extreme font sizes, extreme negative letter-spacing, typography as visual
**Applicable**: Brand websites, event pages, creative agencies
**Implementation**: Headings 80-110px, negative letter-spacing -3px to -5.5px
**Representative brands**: Linear, Framer

## 10. Color Block Narrative

**Characteristics**: Oversized soft color block sections, one narrative rhythm per page
**Applicable**: Creative tools, design platforms, education products
**Implementation**: Full-width color blocks, soft tones, no gaps between blocks
**Representative brands**: Figma

## 11. Geometric Pill

**Characteristics**: Pill-shaped buttons, circular elements, soft rounded corners
**Applicable**: Search products, social apps, consumer products
**Implementation**: All CTAs pill-shaped, circular icons, large border-radius cards
**Representative brands**: Airbnb, Notion

## 12. Infrastructure Minimal

**Characteristics**: Shadow as border, extreme negative letter-spacing, three-color workflow
**Applicable**: Cloud platforms, deployment tools, infrastructure products
**Implementation**: box-shadow replaces border, Geist typeface, workflow three-color
**Representative brands**: Vercel

## 13. Editorial Layout

**Characteristics**: Magazine-style typography, asymmetric grid, bold headlines
**Applicable**: News media, blog platforms, content publishing
**Implementation**: Asymmetric columns, large headline + small body, pull quote

## 14. Data-Viz First

**Characteristics**: Charts as interface, color-encoded data, compact information density
**Applicable**: Analytics platforms, monitoring dashboards, financial terminals
**Implementation**: Color only for data encoding, minimize decorative elements

## 15. Retro-Futurism

**Characteristics**: Pixel fonts, CRT scanlines, neon colors, grid backgrounds
**Applicable**: Gaming, Web3, creative experiments
**Implementation**: pixel font, glow effects, dark + neon

## 16. Organic Natural

**Characteristics**: Curves, natural tones, hand-drawn elements, irregular shapes
**Applicable**: Health food, eco brands, children's products
**Implementation**: blob shapes, warm tones, hand-drawn illustrations

## 17. Brutalism

**Characteristics**: Raw, unpolished, large font sizes, high contrast, rule-breaking
**Applicable**: Art projects, experimental websites, anti-mainstream brands
**Implementation**: System fonts, thick borders, misaligned, strong contrast colors

## 18. Gradient Immersion

**Characteristics**: Large-area gradients, color flow, sense of depth
**Applicable**: AI products, creative tools, brand showcases
**Implementation**: Multi-color gradient backgrounds, mesh gradient, semi-transparent overlays
**Representative brands**: Framer (gradient spotlight cards)

## 19. Functional First

**Characteristics**: High information density, compact layout, zero decoration, efficiency first
**Applicable**: Dashboards, management tools, internal systems
**Implementation**: Small font sizes, compact spacing, table-dominant, minimal animation
**Representative brands**: HashiCorp, Sentry

## 20. Emotional Design

**Characteristics**: Illustrations, micro-animations, warm tones, personable copy
**Applicable**: Consumer apps, education products, social platforms
**Implementation**: Brand illustrations, colorful empty states, friendly copy, easter eggs

---

## Philosophy Selection Guide

> Unlisted philosophies are for special scenarios (Neumorphism → IoT panels, Retro-Futurism → Web3, Brutalism → art projects). For finer-grained brand → philosophy mapping, see `references/brand-library/INDEX.md`. Primary vs. secondary selection criteria: short user dwell time → secondary (more restrained), strong brand expression needs → primary (more stylized).

| Project Type | Recommended Philosophy | Secondary |
|---------|---------|------|
| Developer tools | Dark Engineering | Infrastructure Minimal |
| Fintech | Light Luxury | Functional First |
| E-commerce | Photography-First | Geometric Pill |
| SaaS dashboards | Functional First | Dark Engineering |
| Creative tools | Color Block Narrative | Mega Typography |
| AI products | Gradient Immersion | Dark Engineering |
| Brand websites | Mega Typography | Editorial Layout |
| Data platforms | Data-Viz First | Swiss International |
