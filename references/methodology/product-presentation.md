# Product Presentation Specification

> Framework-agnostic — applicable to landing page Heroes, product detail pages, marketing materials, and any scenario requiring product visual display.

---

## 1. Asset Priority for Product Presentation

> Used in conjunction with the Core Asset Protocol (`references/methodology/asset-protocol.md`).

Product visual presentation is not "decoration" — it is the **foundation of recognizability**. Ranked by recognizability:

| Asset Type | Recognizability Contribution | Necessity |
|------------|----------------------------|-----------|
| **Product photos / renders** | Highest · The "protagonist" of physical products is the product itself | Required for physical products |
| **UI screenshots** | Very high · The "protagonist" of digital products is its interface | Required for digital products |
| **Device frame + product image** | High · Places the product in a usage context | Recommended but not required |
| **Logo** | High · Foundation of brand recognition | Required for any product |
| Color values / Fonts | Medium · Supplementary recognition | Supplementary |

### Prohibitions

- **Prohibited: using CSS silhouettes / hand-drawn SVGs as substitutes for real product images** — the result is "generic tech animation" where every product looks the same; brand recognizability drops to zero
- **Prohibited: using generic fills as substitutes for real product images** — prefer honest placeholders (gray block + text label) over fake assets
- When product images cannot be found, follow the Core Asset Protocol fallback path (AI generation based on official references → request from user → honest placeholder)

---

## 2. Device Mockup Composition Rules

### Core Principle

Device frames (iPhone / MacBook / Android, etc.) are **display containers**, not the design itself. Their roles are:

1. Giving product screenshots the impression of "this is a real App / website"
2. Providing size ratio reference (mobile screen vs desktop window)
3. Establishing context (handheld device / desktop office / multi-screen collaboration)

### Specification

| Dimension | Rule | Anti-pattern |
|-----------|------|-------------|
| **Proportions** | Use real device proportions (e.g., iPhone 15 Pro 393×852pt) | Stretching screenshots to fit non-standard frames |
| **Status bar** | Must use standard status bar (time / signal / battery), not hand-written | Blank status bar / filling in random numbers |
| **Safe area** | Content must not obscure notch / Dynamic Island / rounded corners | Content flush to device edges |
| **Shadow** | Device frame should have realistic projection; avoid pure black hard-edge shadows | No shadow (floating in mid-air) / overly heavy shadow (dominating the scene) |
| **Border radius** | Consistent with real devices (iPhone ~55px / MacBook ~12px) | 0 border radius or exaggerated border radius |
| **Orientation** | Portrait devices upright, landscape devices horizontal, unless the scene requires tilting | Arbitrary tilting without reason |

### Multi-Device Combinations

| Combination | Applicable Scenario | Key Points |
|-------------|-------------------|------------|
| Single phone | Showcasing core mobile features | Screenshot centered, whitespace on both sides |
| Phone + laptop | Showcasing cross-platform experience | Phone placed forward and offset left/right, laptop behind, size ratio ~2:3 |
| Three devices (phone + tablet + desktop) | Showcasing full-platform coverage | Gradient arrangement, rear devices semi-transparent or blurred |
| Multiple phones side by side | Showcasing multi-screen / multi-state | Even spacing, no overlap between devices |

---

## 3. Hero Image Production Rules

### Landing Page Hero Product Presentation

The Hero image is the first screen of a landing page; product presentation quality directly determines whether users continue scrolling.

#### Composition Patterns

| Pattern | Structure | Applicable Products | Representative Brands |
|---------|-----------|--------------------|-----------------------|
| **Full-bleed photography + overlay copy** | Product image fills the frame, copy overlaid on image | Consumer goods, hardware | Nike, Tesla, SpaceX |
| **Left copy, right product image** | Left 40% copy + right 60% product image / Mockup | SaaS, digital products | Stripe, Linear |
| **Centered product + radiating background** | Product centered, background gradient / particle radiation | Tech products, AI tools | Vercel, Replicate |
| **Device frame + screenshot** | Device frame showcasing core UI | App, Web products | Figma, Notion |
| **Pure typographic Hero** | Large-scale typography, no product image | Brand manifesto, philosophy pages | Apple (partial), IBM |

#### Product Image Quality Gate

> Consistent with the Core Asset Protocol's "5-10-2-8" principle.

| Dimension | Standard | Anti-pattern |
|-----------|----------|-------------|
| **Resolution** | ≥ 2000px (4K screen adaptation requires ≥ 3000px) | Blurry stretched images |
| **Background removal** | Transparent background or clean background | Casual screenshots with desktop background |
| **Multiple angles** | Main view + details + context, at least 3 images | Only one frontal image |
| **Version** | Latest version of product images | Using outdated product images |

---

## 4. Presentation Format Decision

Different delivery scenarios require different formats:

| Scenario | Recommended Format | Rationale |
|----------|-------------------|-----------|
| Landing page embed | WebP/AVIF + 2x | High compression ratio + visual fidelity |
| WeChat Official Account / Video Account | MP4 | Best compatibility |
| Bilibili / Portfolio | MP4 (high frame rate) | High frame rate presentation |
| Social preview | GIF | Twitter/X compatibility |
| Print / Archive | PDF (vector text) | Searchable text, high fidelity |

### Video Output Specification Reference

> The following are format decision references; actual encoding parameters are determined by the host project's execution layer.

| Format | Resolution | Applicable Scenario |
|--------|-----------|-------------------|
| MP4 standard frame rate | 1920×1080 | WeChat embed, Video Account, YouTube |
| MP4 high frame rate | 1920×1080 | High frame rate presentation, Bilibili, portfolio |
| GIF | 960×540 | Twitter/X, Slack preview |

---

## 5. Pre-Release Checklist

Product presentation materials must pass before release:

- [ ] Product images / UI screenshots are the latest version (not outdated)
- [ ] Product image resolution ≥ 2000px (4K scenarios require ≥ 3000px)
- [ ] Device frame proportions are realistic, no stretching or deformation
- [ ] Logo is present and clear (any presentation must include brand Logo)
- [ ] Text and product images do not obscure each other
- [ ] Product images on dark backgrounds have sufficient contrast
- [ ] Product images in mobile preview do not exceed viewport
- [ ] Product image loading has skeleton / blur placeholder, no white flash
