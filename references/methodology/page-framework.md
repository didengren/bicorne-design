# Page Framework Specification

> Structural specification for page frameworks — defines framework types, structural parameters for each type, responsibility separation between the structural layer and the style layer, and navigation structure rules.
> For responsive degradation strategies, see `responsive-degradation.md`.

---

## 1. Structural Layer vs. Style Layer

> **The brand library has no direct reference for admin/tool page structures** — the 60 DESIGN.md files focus primarily on marketing surfaces; no brand has fully documented product UI / admin interfaces. Binance comes closest (distinguishing marketing vs. product design parameters), but only indirectly. F5 marketing landing page navigation structures have more references in the brand library, but the framework structure itself (floating overlay vs. solid top bar) remains industry convention.

Admin and tool page structures do not need brand references because page structure is an **industry convention**, not a brand differentiator. Brand differences are expressed in the style layer (color / typography / spacing), not the structural layer.

```
Structural Layer (fixed) — defined in this document
  ├─ Page frameworks: 8 framework types (F1-F8)
  ├─ Responsive degradation: three-tier breakpoint strategy
  ├─ Navigation structure: sidebar / bottom tab / floating overlay / split-pane rules
  └─ Component degradation: table / form / navigation strategies

Style Layer (configurable) — defined by token.json
  ├─ Color system: dark (Linear) / light (Stripe) / dual-theme (Binance)
  ├─ Typography system: font family / font size / font weight
  ├─ Spacing / border radius / shadows
  └─ Determined by brand selection, see references/brand-library/INDEX.md
```

| Dimension | Ant Design Provides | This Document Supplements | token.json Determines |
|-----------|-------------------|------------------------|---------------------|
| Component structure | Layout/Sider/Header/Content | Page-level framework specification | — |
| Component interaction | Menu collapse, Tabs switching | Cross-component degradation strategy | — |
| Component default styles | Design Token defaults | — | Brand override values |
| Responsive breakpoints | Grid breakpoints | Degradation strategy | — |
| Visual style | — | — | Color / typography / spacing |

**Conclusion**: Style consistency = structural layer specification (this document) + style layer token.json (brand selection) + Ant Design component defaults (fallback). Each serves its own purpose and cannot substitute for another.

---

## 2. Page Framework Types

### F1 Sidebar + Content

**Typical scenario**: Admin management panel
**Selection signal**: Navigation items > 5 and no global top bar needed

```
┌────────┬───────────────────────────┐
│        │                           │
│Sidebar │       Content Area        │
│ 208px  │       flex: 1             │
│default │                           │
│        │                           │
└────────┴───────────────────────────┘
```

| Area | Width | Description |
|------|-------|-------------|
| Sidebar | 208px (default) | See §3 |
| Content area | `calc(100% - 208px)` | flex: 1 |

### F2 Top Bar + Content

**Typical scenario**: Marketing site, documentation site, brand website
**Selection signal**: Navigation items ≤ 7 and content-driven

```
┌────────────────────────────────────┐
│  Logo   Nav1   Nav2   Nav3        │  ← Top bar 64px
├────────────────────────────────────┤
│                                    │
│           Content Area             │
│          width: 100%               │
│                                    │
└────────────────────────────────────┘
```

| Area | Height | Description |
|------|--------|-------------|
| Top bar | 64px | Fixed top |
| Content area | `calc(100vh - 64px)` | Full width |

### F3 Sidebar + Top Bar + Content

**Typical scenario**: Full admin panel
**Selection signal**: Global toolbar + sidebar navigation needed

```
┌────────┬───────────────────────────┐
│        │  Top bar (breadcrumb/     │  ← 64px
│Sidebar │  search/user)             │
│ 208px  ├───────────────────────────┤
│        │                           │
│        │       Content Area        │
│        │                           │
└────────┴───────────────────────────┘
```

| Area | Width/Height | Description |
|------|-------------|-------------|
| Sidebar | 208px | See §3 |
| Top bar | 64px | Fixed top |
| Content area | Remaining space | Right of sidebar + below top bar |

### F4 Top Bar + Sidebar + Content

**Typical scenario**: Application with global navigation
**Selection signal**: Global navigation on top, secondary navigation on side

```
┌────────────────────────────────────┐
│  Global Nav (Logo / Main / User)   │  ← Global top bar
├────────┬───────────────────────────┤
│Secondary│                          │
│Sidebar │       Content Area        │
│ 208px  │                           │
└────────┴───────────────────────────┘
```

| Area | Width/Height | Description |
|------|-------------|-------------|
| Global top bar | 100% | Full width, height 64px |
| Secondary sidebar | 208px | See §3 |
| Content area | Remaining space | Right of sidebar |

### F5 Full-Screen Immersive + Floating Navigation

**Typical scenario**: Marketing landing page, product showcase, data dashboard
**Selection signal**: Content needs full viewport, navigation is secondary

```
┌────────────────────────────────────┐
│  Logo        Nav1   Nav2   CTA    │  ← Floating nav (semi-transparent)
│                                    │
│        Full-Screen Content         │
│      (starts from viewport top)    │
│                                    │
│        Hero / Data Display         │
│                                    │
└────────────────────────────────────┘
```

| Area | Height | Description |
|------|--------|-------------|
| Floating navigation | 64px | `position: fixed`, semi-transparent background, can become solid on scroll |
| Content area | 100vh | Starts from viewport top, navigation floats above content |

**Difference from F2**: F2 top bar occupies its own row, content area starts below the top bar; F5 navigation floats above content, content starts from viewport top. F5 is suitable for Hero full-screen, data dashboards, and other scenarios where content must fill the viewport.

### F6 Bottom Tab + Content

**Typical scenario**: Mobile App (≤ 5 primary navigation items)
**Selection signal**: Mobile native, navigation items ≤ 5

```
┌────────────────────────────────────┐
│                                    │
│           Content Area             │
│          width: 100%               │
│                                    │
├────────────────────────────────────┤
│  🏠    🔍    ➕    💬    👤        │  ← Bottom Tab Bar
└────────────────────────────────────┘
```

| Area | Height | Description |
|------|--------|-------------|
| Content area | `calc(100vh - TabBar height)` | Full width |
| Bottom Tab Bar | 49px (iOS) / 56px (Material) | See §5 |

> **Mobile native framework** — F6 is designed for mobile native, not a degraded desktop framework.

### F7 Drawer Navigation + Content

**Typical scenario**: Mobile App (> 5 navigation items)
**Selection signal**: Mobile native, navigation items > 5

```
┌────────────────────────────────────┐
│ ☰  Title                          │  ← Top bar with menu button
├────────────────────────────────────┤
│                                    │
│           Content Area             │
│          width: 100%               │
│                                    │
└────────────────────────────────────┘

Tap ☰ → Side drawer:
┌──────────┬─────────────────────────┐
│ Group 1  │                         │
│  Item 1  │      Overlay            │
│  Item 2  │                         │
│ Group 2  │                         │
│  Item 3  │                         │
│  Item 4  │                         │
│ [Search] │                         │
└──────────┴─────────────────────────┘
```

| Area | Width/Height | Description |
|------|-------------|-------------|
| Top bar | 56px | Contains menu button |
| Side drawer | ≤ 80% viewport | Contains grouped navigation, search |
| Content area | 100% | Full width |

> **Mobile native framework** — F7 is designed for mobile native, not a degraded desktop framework. Similar in appearance to the F1/F3 mobile-degraded side drawer but semantically different: F7's drawer is a native design supporting grouped navigation and search; the degraded drawer is a simplified version with only a flat navigation list.

### F8 Split-Pane Master-Detail

**Typical scenario**: Email client, conversational AI, IDE
**Selection signal**: Requires "select-view" dual focus

```
┌──────────────┬──────────────────────┐
│              │                      │
│  Master Pane │    Detail Pane       │
│ (list/index) │  (detail/content)    │
│   320px      │     flex: 1          │
│              │                      │
│              │                      │
└──────────────┴──────────────────────┘
```

| Area | Width | Description |
|------|-------|-------------|
| Master pane | 280-360px | List/index, resizable |
| Detail pane | Remaining space | Detail/content |

**Split-pane width ratio**: Master pane typically occupies 25%-35%. Master pane minimum width 280px (ensures list item readability), maximum width 360px (prevents detail pane from becoming too narrow).

---

## 3. Sidebar Structural Parameters

**Sidebar width formula**: `200+8n` (Ant Design specification), default 208px (Ant Design Pro Layout default), maximum 240px (n=5). Every additional 8px is borrowed from the content area — on a 1024px screen, 208px provides 32px more content area space than 240px (approximately 2 columns of spacing).

---

## 4. Sidebar Navigation Structure

> Consistent with Ant Design Menu / Pro Layout defaults: first level has icons, second level onward is text-only.

| Level | Icon | Text | Collapsed state (80px) behavior |
|-------|------|------|-------------------------------|
| First-level menu | **Required** | Displayed | Icon only + Tooltip |
| Second-level menu | None | Displayed (16px indent) | Hidden, shown via first-level popup overlay |
| Third-level menu | None | Displayed (32px indent) | Hidden, expanded within popup |

**All first-level items must have icons** — This is a hard rule, not a suggestion. In collapsed state only icons are shown; a first-level item without an icon becomes blank, making it undiscoverable and inoperable.

**Reasons for no icons on second level**:
1. **Dual-speed scanning** — First level uses icons for rapid positioning (pre-attentive processing < 100ms), second level uses text for precise selection (sequential scanning), the two speeds work together most efficiently
2. **Space efficiency** — In a 208px sidebar, second-level items are already indented 16px; adding icons would compress text space
3. **Cognitive load** — Too many icons cause icon fatigue; second-level items are within the parent icon's context and don't need independent icon recognition
4. **Ant Design Pro default** — Route config `icon` property is only defined on first level, children have no icon

**Edge case handling**:

| Scenario | Problem | Solution |
|----------|---------|----------|
| First-level item with no submenu (leaf node) | Collapsed state shows only icon, semantics may be unclear | Tooltip displays full title; icon must have clear semantics |
| Second-level item needs quick identification | Text-only is slow to scan in long lists | Use font-weight/color to distinguish active state, do not add icons |
| Accessing second-level items in collapsed state | Second-level items are invisible in collapsed state | Click first-level icon → popup overlay shows second-level text list |

---

## 5. Bottom Tab Structural Parameters and Navigation Rules

Applies to F6 framework.

### 5.1 Structural Parameters

| Parameter | iOS (HIG) | Material Design | Description |
|-----------|-----------|----------------|-------------|
| Tab Bar height | 49px | 56px | Excluding safe area |
| Icon size | 25×25px | 24×24dp | — |
| Label font size | 10px | 12sp | — |
| Max Tab count | 5 | 5 | More than 5 requires F7 |
| Touch target | ≥ 44×44px | ≥ 48×48dp | Entire Tab area |

### 5.2 Navigation Rules

1. **Tab count ≤ 5** — More than 5 must switch to F7 (drawer navigation)
2. **Every Tab must have icon + text** — Unlike sidebar, bottom Tabs have ample space; icon+text dual-channel recognition
3. **Selected state must have clear visual feedback** — Brand color filled icon + bold text
4. **Center Tab can be special** — The 3rd position can hold a primary action button (e.g. "New"), visually prominent among other Tabs

---

## 6. Floating Navigation Structural Parameters and Rules

Applies to F5 framework.

### 6.1 Structural Parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| Navigation bar height | 64px | Same as F2 top bar |
| Positioning | `position: fixed; top: 0` | Floats above content |
| Background opacity | Initially transparent → solid on scroll | Scroll triggers background solidification; specific color determined by token.json |
| Scroll trigger distance | 64-100px | Navigation bar becomes solid background after scrolling past this distance |
| z-index | ≥ 1000 | Ensures floating above all content |

### 6.2 Navigation Rules

1. **Navigation items ≤ 7** — Floating navigation has limited space; more than 7 items must be collapsed into a hamburger menu
2. **CTA must be visible** — The right side of floating navigation must reserve the primary CTA button (e.g. "Free Trial", "Contact Us")
3. **Solidify on scroll** — Navigation bar transitions from transparent to solid background, ensuring readability when content scrolls
4. **Mobile degradation** — Floating navigation degrades to a fixed top bar (always solid background) on mobile, see `responsive-degradation.md`

---

## 7. Split-Pane Structural Parameters and Navigation Rules

Applies to F8 framework.

### 7.1 Structural Parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| Master pane default width | 320px | List/index area |
| Master pane minimum width | 280px | Ensures list item readability |
| Master pane maximum width | 360px | Prevents detail pane from becoming too narrow |
| Divider | 1px | Between master pane and detail pane |
| Detail pane minimum width | 320px | Consistent with content area minimum usable width |

### 7.2 Navigation Rules

1. **Master pane selected item highlight** — Currently selected item must have clear visual feedback (background color + left indicator bar)
2. **Master pane supports search/filter** — When list items exceed 20, a search box should be provided at the top of the master pane
3. **Detail pane empty state** — When no item is selected, the detail pane displays an empty state guide (see `./ui-states.md`)
4. **Mobile degradation** — Split-pane degrades to master pane full-screen + back navigation on mobile, see `responsive-degradation.md`

### 7.3 Split-Pane Width Adjustment

| Interaction | Behavior |
|-------------|----------|
| Drag divider | Adjusts master pane width, constrained by min/max width |
| Double-click divider | Resets to default width 320px |
| Master pane collapse | Master pane can collapse to an icon-only narrow bar (48px), similar to sidebar collapsed state |
