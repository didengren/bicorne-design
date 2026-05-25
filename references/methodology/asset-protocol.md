# Core Asset Protocol

> Enforced when a specific brand is involved. Prerequisite: brand/product existence and status confirmed via [#0 Fact Verification](../../SKILL.md).

---

## 1. Core Principle: Assets > Specifications

Brands are recognized not by color values, but by Logos, product images, and UI screenshots. Ranked by recognizability:

| Asset Type | Recognizability | Necessity |
|------------|----------------|-----------|
| Logo | Highest | Required for any brand |
| Product images / renders | Very high | Required for physical products |
| UI screenshots | Very high | Required for digital products |
| Color values | Medium | Supplementary |
| Fonts | Low | Supplementary |

**Violations**:
- Extracting only color values + fonts without finding Logo / product images / UI screenshots
- Using CSS silhouettes / hand-drawn SVGs as substitutes for real product images
- Not informing the user when assets cannot be found, silently proceeding anyway

---

## 2. Five-Step Hard Process

### Step 1 · Ask

Do not just ask "Do you have brand guidelines?" — ask item by item:

```
Regarding <brand>, which of the following materials do you have?
1. Logo (SVG / high-res PNG) — required for any brand
2. Product images / official renders — required for physical products
3. UI screenshots / interface assets — required for digital products
4. Color palette / font list / Brand guidelines / official website URL
Send what you have; I'll search for the rest.
```

### Step 2 · Search

| Asset | Search Paths |
|-------|-------------|
| Logo | `<brand>.com/brand` · `/press` · `/press-kit` · official site header inline SVG · Simplelogos |
| Product images | `<brand>.com/<product>` hero + gallery · official press release images |
| UI screenshots | App Store / Google Play product pages · official site screenshots section |
| Color values | Official site inline CSS / Tailwind config / brand guidelines |
| Fonts | Official site `<link>` references · Google Fonts tracking |

WebSearch fallback: `<brand> logo svg` / `<brand> <product> renders` / `<brand> app screenshots`

### Step 3 · Download

**Logo** (required for any brand) — three paths in descending priority:
1. Standalone SVG/PNG file (ideal)
2. Inline SVG extracted from official site HTML (80% of scenarios)
3. Official social media avatar (last resort)

**Product images** (required for physical products) — priority:
1. Official product page hero image
2. Official press kit
3. Official launch video frame capture
4. AI-generated fallback (based on real product images as reference; do not substitute with CSS/SVG hand-drawn images)

**UI screenshots** (required for digital products):
- App Store / Google Play product screenshots
- Official site screenshots section
- Product demo video frame captures

**Quality Gate "5-10-2-8"** (Logo excluded):

| Dimension | Standard | Anti-pattern |
|-----------|----------|-------------|
| 5 rounds of search | Cross-channel verification | Using first-page results directly |
| 10 candidates | At least 10 options before filtering | Only grabbing 2 with no choice |
| Pick 2 good ones | Select 2 from 10 | Using all = visual overload |
| Each 8/10+ | Below 8, better not to use | Padding with 7-score assets |

8/10 scoring dimensions: resolution ≥2000px · clear licensing (official > public domain > free stock > suspected pirated = 0) · brand character alignment · lighting/composition/style consistency · standalone narrative ability

Logo exception: if available, must be used — "5-10-2-8" does not apply. Logo is the foundation of recognizability, not a multiple-choice question.

### Step 4 · Verify

| Asset | Verification Actions |
|-------|---------------------|
| Logo | Openable + at least two versions (dark bg / light bg) + transparent background + color matches DESIGN.md `colors.primary` + correct proportions + latest version |
| Product images | At least one 2000px+ + clean or removed background + multiple angles |
| UI screenshots | Real resolution (1x/2x) + latest version + no user data contamination |

⚠️ Beware of demo brand contamination: product screenshots often contain user demo brand colors — those are not the product's own colors. The same brand may have different colors for website marketing vs. product UI — both are legitimate; choose the appropriate facet based on the delivery context.

### Step 5 · Solidify

Asset information is written into DESIGN.md (Layer 1) and flows into token.json (Layer 2) via mapping rules. Ensure the following are recorded:
- Logo file path + usage scenarios + prohibited distortion rules
- Product image file path + resolution + angle
- UI screenshot file path + corresponding feature

Execution discipline:
- Reference real file paths; do not substitute with CSS silhouettes / hand-drawn SVGs
- Design variables are injected from token.json; each framework consumes them in its own way

---

## 3. Logo Format Specification

1. **SVG** (preferred) — vector, scales without quality loss
2. **PNG** (fallback) — at least 2x resolution
3. **JPG** (avoid) — only when no other format is available

---

## 4. Screenshot Specification

| Type | Purpose | Acquisition |
|------|---------|------------|
| Product UI screenshot | Show product features | Official product page / manual screenshot |
| Browser window screenshot | Landing page display | Manual screenshot + browser chrome |
| Mobile screenshot | Responsive display | Emulator screenshot / official assets |

- Resolution ≥ 2x (Retina-ready)
- Use real data (may be desensitized); fake data is prohibited
- Browser window chrome matches actual platform style
- Image format: WebP preferred, PNG fallback

---

## 5. Archiving and Naming

```
assets/
├── logos/
│   ├── [brand]-logo.svg
│   └── [brand]-logo-dark.svg
├── screenshots/
│   ├── [brand]-hero.png
│   ├── [brand]-dashboard.png
│   └── [brand]-mobile.png
└── references/
    ├── [brand]-reference-1.png
    └── [brand]-reference-2.png
```

- All lowercase, hyphen-separated
- Format: `[brand]-[type]-[variant].[ext]`
- Examples: `linear-logo-dark.svg`, `stripe-hero-2x.png`

---

## 6. Usage Rules

### Logo

- Maintain original proportions; stretching is prohibited
- Brand-color Logo on light backgrounds, inverted Logo on dark backgrounds
- Maintain safe area around Logo (at least 25% of Logo height)
- Adding shadows, strokes, gradients, or other effects is prohibited

### Screenshots

- Show real features; "fake screenshots" are prohibited
- Data should be identifiable (not blurred out)
- Loading strategy: skeleton placeholder → low-quality image → high-quality image
- Annotation text must not obscure key content

### Icons

- Prefer brand's official icon library
- Style consistent with brand design language (line / filled / duotone)
- Size visually balanced with text weight
- Mixing icon sets of different styles is prohibited

---

## 7. Failure Fallbacks

| Missing Asset | Handling |
|--------------|---------|
| Logo completely unfindable | **Stop and ask the user**; do not proceed anyway |
| Product images unfindable | AI generation (based on official reference images) → request from user → honest placeholder |
| UI screenshots unfindable | Request screenshot from user → official demo video frame capture |
| Color values unfindable | Recommend 3 directions to the user and label as assumption |

**Prohibited**: Silently using CSS silhouettes / generic gradients as substitutes when assets cannot be found.
