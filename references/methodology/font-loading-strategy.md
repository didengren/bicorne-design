# Font Loading Strategy

> Full-pipeline decision guide for Web Font loading: font-display strategy → Fallback stack → Preloading → CJK subsetting → Slide/animation special handling.
> Applicable to Web pages, HTML slides, animation demos, and any scenario requiring Web Font loading.

---

## 1. Core Problems

Web Font loading has two classic problems:

| Problem | Full Name | Behavior |
|---------|-----------|----------|
| **FOIT** | Flash of Invisible Text | Text is invisible while the font loads, causing blank areas on the page |
| **FOUT** | Flash of Unstyled Text | System font is shown while the font loads; switching after load causes layout shift |

**Strategy choice**: FOUT is preferable to FOIT. Users seeing text (even in a system font) is better than seeing nothing. `font-display: swap` is the default recommended strategy.

---

## 2. font-display Strategies

### Recommended default: `swap`

```css
@font-face {
  font-family: 'MyDisplay';
  src: url('/fonts/MyDisplay.woff2') format('woff2');
  font-display: swap;
}
```

| Strategy | Block Period | Swap Period | Applicable Scenarios |
|----------|-------------|-------------|---------------------|
| **swap** (recommended) | None | Infinite | Most scenarios — show system font first, replace when Web Font loads |
| `optional` | Very short (~100ms) | None | Performance-sensitive scenarios — skip replacement on slow networks to avoid layout shift |
| `block` | Very long (~3s) | Infinite | **Not recommended** — invisible text severely harms user experience |
| `fallback` | Short (~100ms) | Short (~3s) | Compromise — give the font a brief loading window, abandon replacement on timeout |
| `auto` | Browser default | Browser default | Equivalent to not setting it; behavior is uncontrollable |

### Strategy Selection by Scenario

| Scenario | Recommended Strategy | Rationale |
|----------|---------------------|-----------|
| Body content | `swap` | Readability first; blank text is unacceptable |
| Display font (headings) | `swap` | System font placeholder avoids layout jump |
| Animation demo / Slides | `swap` + preload | Do not start animation until font loads (see Section 7) |
| Extremely performance-sensitive mobile | `optional` | Skip replacement on slow networks to avoid shift |

---

## 3. Fallback Font Stack

### Principle

The goal of a fallback font stack is to **minimize layout shift** (CLS). The closer the glyph metrics between the Web Font and the fallback font, the less shift during the switch.

### Recommended Stacks

```css
/* Display font: serif → system */
font-family: 'Instrument Serif', 'Noto Serif SC', Georgia, 'Times New Roman', serif;

/* Body font: sans-serif → system */
font-family: 'Geist Sans', 'Noto Sans SC', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;

/* Monospace font: code/data */
font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', 'Cascadia Code', monospace;
```

### CJK Fallback Special Handling

CJK font files are massive (5–20MB), resulting in long loading times. Recommended strategies:

1. **Use system fonts for body text** — macOS PingFang SC / Windows Microsoft YaHei are sufficiently polished
2. **Use Web Fonts only for display** — headings have fewer characters; after subsetting, file size is manageable
3. **CJK subsetting** — embed only the characters actually used in the project; file size can be reduced from 15MB to 100–500KB

```css
/* CJK body: system font first, no Web Font */
font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif;

/* CJK display: subset Web Font + system font fallback */
font-family: 'Noto Serif SC Subset', 'PingFang SC', Georgia, serif;
```

---

## 4. Font Preloading

### `<link rel="preload">`

For above-the-fold font files, use preload to initiate requests early:

```html
<link rel="preload" href="/fonts/MyDisplay.woff2" as="font" type="font/woff2" crossorigin>
```

**Key points**:
- The `crossorigin` attribute is required (even for same-origin), otherwise the browser makes two requests
- Only preload above-the-fold fonts (typically 1–2); do not preload all
- Use with `font-display: swap` — preload accelerates loading, swap ensures readability

### `<link rel="preconnect">`

When fonts are hosted on a CDN, establish the connection early:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

---

## 5. Self-host vs CDN

### Google Fonts CDN

**Pros**: Free, high cache hit rate (browser uses cache when other sites have loaded the same font)
**Cons**: Depends on third-party availability, unstable access from China, privacy compliance concerns

### Self-host

**Pros**: Fully controllable, no third-party dependency, accessible from China
**Cons**: Must handle subsetting and format conversion yourself

| Dimension | CDN | Self-host |
|-----------|-----|-----------|
| China access | ❌ Unstable | ✅ Controllable |
| Cache hit rate | ✅ Cross-site sharing | ❌ This site only |
| Privacy compliance | ❌ Sends requests to Google | ✅ No third party |
| Maintenance cost | ✅ Zero | 🟡 Self-update required |
| File size | ✅ Auto-subsetting | ❌ Manual subsetting required |

**Recommendation**: Use Self-host for projects targeting Chinese users; international projects may use CDN with Self-host fallback.

---

## 6. Format Selection

| Format | Compression | Browser Support | Recommendation |
|--------|------------|----------------|----------------|
| **WOFF2** | Highest | 97%+ | **First choice** |
| WOFF | Medium | 99%+ | Fallback for WOFF2 |
| TTF/OTF | None | 99%+ | Source format; not for direct Web use |
| EOT | Low | IE only | Deprecated |

**Best practice**: Provide WOFF2 only. Add WOFF for the rare scenario requiring IE support.

```css
@font-face {
  font-family: 'MyDisplay';
  src: url('/fonts/MyDisplay.woff2') format('woff2');
  font-display: swap;
  font-weight: 600;
  font-style: normal;
}
```

---

## 7. Slide / Animation Special Handling

Slides and animation demos have additional font loading requirements:

### Render Only After Font Is Ready

- Slides: before the font loads, the page shows system font; switching after load causes layout jump in fixed-size layouts
- Animation: before the font loads, text width differs, causing inconsistent layout between start and end frames

**Solution**:

```js
// Wait for fonts to be ready before rendering
document.fonts.ready.then(() => {
  // Start rendering / animation
});
```

### Screenshot / Recording Scenarios

- Must wait for fonts to fully load before recording (at least 3500ms fontwait, or use `document.fonts.ready` detection)
- CJK Web Fonts load especially slowly; self-host locally to reduce network dependency
- Chromium headless lacks color emoji fonts; use Unicode text symbols instead of emoji

---

## 8. Performance Checklist

- [ ] All `@font-face` declarations use `font-display: swap` (or an appropriate strategy per scenario)
- [ ] Above-the-fold fonts use `<link rel="preload">`
- [ ] CDN-hosted fonts use `<link rel="preconnect">`
- [ ] CJK Web Fonts are subsetted (file < 500KB)
- [ ] Only WOFF2 format is provided (unless IE support is needed)
- [ ] Fallback font stack metrics are close to the Web Font (reduce CLS)
- [ ] Slides/animations use `document.fonts.ready` to wait for font readiness
- [ ] Total font files ≤ 4 (1 display + 1 body + 1 mono + 1 CJK subset)
