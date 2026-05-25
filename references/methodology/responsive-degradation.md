# Responsive Degradation Strategy

> Component and layout degradation rules under the breakpoint system, ensuring usability at any viewport width.
> Multi-platform: Desktop Web / Mobile Web / Data Dashboard.
> Breakpoint values are fully consistent with bicorne-ui BREAKPOINTS.

---

## 1. Breakpoint System

| Breakpoint | Width | Typical Device | Primary Design Range |
|------------|-------|---------------|---------------------|
| xs | < 480px | Small-screen phone | Mobile |
| sm | 480-639px | Large-screen phone | Mobile |
| md | 768-1023px | Tablet portrait / Small laptop | Mobile → Desktop transition |
| lg | 1024-1279px | Tablet landscape / Laptop | Desktop |
| xl | 1280-1535px | Standard desktop | Desktop |
| xxl | 1536-1919px | Large desktop | Desktop / Dashboard |
| xxxl | ≥ 1920px | Ultra-wide / Data Dashboard | Dashboard |

**Core degradation breakpoint**: `md(768px)` — below this width, mobile degradation mode is activated.

---

## 2. Data Table Degradation (< 768px Core Scenario)

Data tables are the most complex component in responsive degradation. Many columns, dense actions, strong information correlation.

### 2.1 Column Hiding Strategy

Columns are sorted by priority; low-priority columns are hidden on small screens:

| Priority | Column Type | Description | Degradation Behavior |
|----------|------------|-------------|---------------------|
| P0 (must retain) | Primary identifier | Name, ID, title | Always visible |
| P1 | Action column | Edit, delete, more | Collapsed into "More" menu |
| P2 | Status column | Tags, badges | Retained; badge size may be reduced |
| P3 | Time column | Created at, updated at | Hidden or collapsed into expanded row |
| P4 | Auxiliary column | Description, notes, secondary attributes | Hidden, collapsed into expanded row |
| P5 | Statistics column | Count, amount, percentage | Hidden or collapsed into expanded row |

**Rules**:
- < 768px retains at most P0 + P1 + P2 columns
- Hidden column data is accessible via row expansion or card mode
- Column hiding must not cause information loss — users must have a path to access complete data

### 2.2 Three Degradation Approaches

#### Approach A: Row-to-Card

Each row becomes an independent card with fields stacked vertically.

```
Desktop (≥ 768px):
┌──────┬────────┬────────┬────────┬──────────┐
│  ID  │  Name  │ Status │  Time  │  Actions │
├──────┼────────┼────────┼────────┼──────────┤
│ 001  │ Proj A │ Active │ 05-16  │ Edit Del │
└──────┴────────┴────────┴────────┴──────────┘

Mobile (< 768px):
┌─────────────────────────┐
│ Proj A            Active │
│ ID: 001                  │
│ Time: 05-16               │
│              Edit · Delete│
└─────────────────────────┘
```

**Applicable**: 5-8 columns, simple row actions, high mobile viewing frequency.

#### Approach B: Horizontal Scroll

Retain full table structure; container scrolls horizontally.

```
Mobile (< 768px):
┌─────────────────↔──────┐
│  ID  │ Name │ Status │···│
├──────┼──────┼────────┤   │
│ 001  │  A   │ Active │   │
└──────┴──────┴────────┘   │
        → Scroll horizontally for more →
```

**Applicable**: > 8 columns, data requires horizontal comparison, low mobile viewing frequency.

**Enhancements**:
- First column (primary identifier) sticky: `position: sticky; left: 0`
- Scroll shadow hint: gradient shadow on left/right side indicating scrollable direction
- Scroll indicator: bottom bar showing current visible column position

#### Approach C: Row Expansion

Retain a simplified table; click a row to expand hidden column information.

```
Mobile (< 768px):
┌──────┬────────┬────────┐
│  ID  │  Name  │ Status │
├──────┼────────┼────────┤
│ 001  │ Proj A │ Active │ ← Click to expand
│  Time: 05-16             │
│  Description: xxx        │
│  Actions: Edit | Delete  │
├──────┼────────┼────────┤
│ 002  │ Proj B │  Done  │
└──────┴────────┴────────┘
```

**Applicable**: 4-6 columns, some column information is auxiliary reference, not frequently viewed.

### 2.3 Approach Decision Tree

```
Table needs degradation?
├── Mobile usage frequency?
│   ├── High → Approach A (Row-to-Card)
│   │   └── Are actions complex (> 3 actions)?
│   │       ├── Yes → Collapse into card bottom action bar
│   │       └── No → Display actions directly
│   └── Low → Column count?
│       ├── > 8 → Approach B (Horizontal Scroll + First Column Sticky)
│       └── 4-8 → Approach C (Row Expansion)
└── Need horizontal data comparison?
    └── Yes → Approach B (Horizontal Scroll), even if mobile frequency is high
```

### 2.4 Table Action Degradation

| Desktop Action | Mobile Degradation |
|---------------|-------------------|
| Multiple inline buttons | Collapsed into "More" menu (Dropdown/ActionSheet) |
| Row selection Checkbox | Retained, but touch target enlarged to 44×44px |
| Sort (click column header) | Moved to sort selector above table |
| Filter (column header filter) | Moved to filter panel above table |
| Paginator | Simplified to "Load More" or infinite scroll |
| Column width drag | Disabled; fixed column widths |

---

## 3. Form Degradation

### 3.1 Layout Degradation

| Desktop (≥ 768px) | Mobile (< 768px) |
|-------------------|-----------------|
| Label left-aligned (horizontal layout) | Label top-aligned (vertical layout) |
| Multi-column form (2-3 columns) | Single-column form |
| Inline error message | Error message below the field |
| Grouped cards side by side | Grouped cards stacked vertically |

### 3.2 Complex Form Degradation

| Desktop | Mobile |
|---------|--------|
| Stepped form (Steps + side-by-side content) | Stepped form (Steps simplified to progress bar + single-step content) |
| Tabbed form (Tabs switching groups) | Tabs retained, but changed to scrollable tabs |
| Collapsible groups | Collapse retained; current editing group expanded by default |
| Table-embedded form | Row-to-card then embedded form |

### 3.3 Form Rules

1. **Label top-aligned** — < 768px forces Label above the input, maximizing input width
2. **Single-column layout** — Multi-column forms prohibited on mobile to avoid narrow inputs
3. **Full-width CTA** — Submit/Next buttons use full width on mobile
4. **Keyboard adaptation** — On input focus, page scrolls to keep the input visible (avoid virtual keyboard occlusion)

---

## 4. Page Framework Degradation

The page framework is the outermost layout structure, determining the available width of the content area. Framework degradation must precede component degradation — if the framework does not degrade, there is insufficient space for component degradation.

> For structural definitions and type classification of page frameworks (8 framework types F1-F8), see [page-framework.md](page-framework.md). F6/F7 are mobile-native frameworks and do not require degradation rules.

### 4.1 Sidebar + Content Framework Degradation (F1)

This is the most common page structure in admin panels. Degradation is divided into three tiers:

> For sidebar width specifications, see [page-framework.md](page-framework.md)§3.

```
Desktop (≥ 1024px):
┌────────┬───────────────────────────┐
│        │                           │
│Sidebar │       Content Area        │
│ 208px  │       flex: 1             │
│default │                           │
│        │                           │
└────────┴───────────────────────────┘

Tablet (768-1023px):
┌────┬───────────────────────────────┐
│    │                               │
│Icon│       Content Area            │
│80px│       flex: 1                 │
│collapsed│                          │
│    │                               │
└────┴───────────────────────────────┘

Mobile (< 768px):
┌────────────────────────────────────┐
│ ☰                                  │  ← Top bar with hamburger button
│           Content Area             │  ← Full width
│          width: 100%               │
└────────────────────────────────────┘
   Click ☰ → Slide-out drawer overlays content area
```

| Breakpoint | Sidebar Behavior | Content Area Width | Sidebar Trigger |
|------------|-----------------|-------------------|----------------|
| ≥ 1024px | Fixed expanded, 208px (default) | `calc(100% - 208px)` | Always visible |
| 768-1023px | Collapsed to icon bar, 80px | `calc(100% - 80px)` | Hover/click to expand overlay |
| < 768px | Fully hidden | 100% | Hamburger button → Slide-out drawer |

**Key Rules**:
1. **Content area minimum usable width ≥ 320px** — When sidebar is expanded, if the content area is compressed below 320px, the sidebar must auto-collapse
2. **Slide-out drawer overlay** — When the sidebar appears as a drawer on < 768px, a semi-transparent overlay covers the content area (`rgba(0,0,0,0.45)`); clicking the overlay closes the drawer
3. **Drawer width ≤ 80% viewport** — The mobile slide-out drawer must not exceed 80% of screen width, keeping part of the content area visible so users perceive "this is an overlay, not a page navigation"
4. **State persistence** — Sidebar expanded/collapsed state is persisted in `localStorage` and restored after refresh

### 4.2 Sidebar + Top Bar + Content Framework Degradation (F3)

```
Desktop (≥ 1024px):
┌────────┬───────────────────────────┐
│        │  Top bar (breadcrumb/     │
│Sidebar │  search/user)             │
│ 208px  ├───────────────────────────┤
│        │                           │
│        │       Content Area        │
│        │                           │
└────────┴───────────────────────────┘

Mobile (< 768px):
┌────────────────────────────────────┐
│ ☰  Breadcrumb/Title     Search User│  ← Top bar retained; hamburger button replaces sidebar
├────────────────────────────────────┤
│                                    │
│           Content Area             │
│          width: 100%               │
│                                    │
└────────────────────────────────────┘
```

| Breakpoint | Top Bar Behavior | Sidebar Behavior | Content Area |
|------------|----------------|-----------------|-------------|
| ≥ 1024px | Fixed top | Fixed expanded | Right of sidebar |
| 768-1023px | Fixed top | Collapsed to icon bar | Right of icon bar |
| < 768px | Fixed top, hamburger button added | Fully hidden | Full width |

**Top Bar Mobile Simplification Rules**:
- Breadcrumb → Show only current page name (omit path)
- Search → Collapsed into search icon; click to expand search box
- User info → Show only avatar; click to expand dropdown menu
- Notifications → Show only icon + unread count badge

### 4.3 Top Bar + Content Framework Degradation (F2)

```
Desktop (≥ 768px):
┌────────────────────────────────────┐
│  Logo   Nav1   Nav2   Nav3        │  ← Top bar
├────────────────────────────────────┤
│                                    │
│           Content Area             │
│          width: 100%               │
│                                    │
└────────────────────────────────────┘

Mobile (< 768px):
┌────────────────────────────────────┐
│  ☰   Logo                         │  ← Hamburger menu
├────────────────────────────────────┤
│                                    │
│           Content Area             │
│          width: 100%               │
│                                    │
└────────────────────────────────────┘
```

This framework has the simplest degradation: top bar navigation items are collapsed into a hamburger menu, and the content area is always full width.

### 4.4 Full-Screen Immersive + Floating Navigation Framework Degradation (F5)

Floating navigation lacks sufficient viewport height on mobile to overlay content; it must degrade to a fixed top bar.

```
Desktop (≥ 768px):
┌────────────────────────────────────┐
│  Logo        Nav   Nav   CTA      │  ← Floating navigation (semi-transparent)
│         Full-screen content        │
│       (starts from viewport top)   │
└────────────────────────────────────┘

Mobile (< 768px):
┌────────────────────────────────────┐
│  ☰   Logo              CTA        │  ← Fixed top bar (solid background)
├────────────────────────────────────┤
│                                    │
│           Content Area             │
│          width: 100%               │
│                                    │
└────────────────────────────────────┘
```

| Breakpoint | Navigation Behavior | Content Area | Notes |
|------------|-------------------|-------------|-------|
| ≥ 768px | Floating navigation, semi-transparent background | Starts from viewport top | Navigation solidifies after scroll |
| < 768px | Fixed top bar, solid background | Starts below top bar | Navigation items collapsed into hamburger menu; CTA retained |

**Difference from F2 degradation**: The F2 top bar is always solid; degradation only collapses navigation items. F5 degradation changes the navigation from floating to solid top bar, and the content area shifts from starting at viewport top to starting below the top bar — this is a **positioning mode** change, not merely a collapse.

**Key Rules**:
1. **CTA must be retained** — The primary CTA button on the right side of floating navigation must not be hidden on mobile; this is critical for conversion
2. **Reduced scroll trigger threshold** — Mobile scroll trigger distance reduced from 64-100px to 32-48px, due to limited mobile viewport height
3. **No degradation on data dashboard** — F5 does not degrade on the dashboard platform; floating navigation retains its native design

### 4.5 Split-Pane Master-Detail Framework Degradation (F8)

Split-pane cannot display side by side on mobile; it degrades to master pane full-screen + back navigation.

```
Desktop (≥ 1024px):
┌──────────────┬──────────────────────┐
│  Master Pane │     Detail Pane      │
│   (List)     │    (Detail)          │
│   320px      │     flex: 1          │
└──────────────┴──────────────────────┘

Mobile (< 768px) — List View:
┌────────────────────────────────────┐
│  ← Back     Title                  │
├────────────────────────────────────┤
│                                    │
│    Master Pane Full-Screen (List)  │
│                                    │
└────────────────────────────────────┘

Mobile (< 768px) — Detail View (after clicking a list item):
┌────────────────────────────────────┐
│  ← Back     Detail Title           │
├────────────────────────────────────┤
│                                    │
│   Detail Pane Full-Screen (Detail) │
│                                    │
└────────────────────────────────────┘
```

| Breakpoint | Layout Behavior | Navigation |
|------------|----------------|------------|
| ≥ 1024px | Dual-pane side by side | Selected item highlighted in master pane |
| 768-1023px | Dual-pane side by side; master pane collapsible | Master pane collapses to narrow bar (48px) |
| < 768px | Single-pane toggle | List view ↔ Detail view; top back navigation |

**Key Rules**:
1. **View switch animation** — List→Detail uses slide-left; Detail→List uses slide-right; duration 200-300ms
2. **Back gesture** — Mobile supports right-swipe from left edge to return to list view
3. **List scroll position preservation** — When returning from detail to list, restore previous scroll position
4. **Tablet transition** — 768-1023px master pane can collapse to a narrow bar showing only icons, similar to sidebar collapsed state

### 4.6 Framework Degradation Checklist

**F1-F4 (Sidebar/Top Bar Frameworks)**:
- [ ] Sidebar fully hidden at < 768px; triggered via hamburger button → slide-out drawer
- [ ] Slide-out drawer width ≤ 80% viewport, with semi-transparent overlay
- [ ] Content area minimum usable width ≥ 320px when sidebar is expanded
- [ ] Top bar simplified on mobile (breadcrumb/search/user info)
- [ ] Sidebar expanded/collapsed state persisted (localStorage)
- [ ] After framework degradation, content area gains full width, enabling component degradation

**F5 (Full-Screen Immersive + Floating Navigation)**:
- [ ] Floating navigation degrades to fixed top bar at < 768px (solid background)
- [ ] CTA button remains visible on mobile
- [ ] Scroll trigger threshold reduced on mobile (32-48px)
- [ ] No degradation on data dashboard; floating navigation retains native design

**F8 (Split-Pane Master-Detail)**:
- [ ] Split-pane degrades to single-pane toggle at < 768px (List view ↔ Detail view)
- [ ] View switch has directional animation (slide-left/slide-right)
- [ ] Mobile supports right-swipe from left edge as back gesture
- [ ] Scroll position restored when returning from detail to list
- [ ] 768-1023px master pane can collapse to narrow bar

---

## 5. Navigation Degradation

### 5.1 Sidebar Navigation

| Desktop (≥ 1024px) | Tablet (768-1023px) | Mobile (< 768px) |
|--------------------|--------------------|--------------------|
| Fixed sidebar | Collapsible sidebar | Bottom Tab Bar or hamburger menu |

**Decision Rules**:
- Navigation items ≤ 5 → Bottom Tab Bar
- Navigation items > 5 → Hamburger menu + slide-out drawer
- Secondary navigation → Expand within drawer / back navigation pattern

> For sidebar icon hierarchy rules, see [page-framework.md](page-framework.md)§4.

### 5.2 Breadcrumb

| Desktop | Mobile |
|---------|--------|
| Full path: Home > Project > Detail | Show only parent level: < Project |

### 5.3 Tabs

| Desktop | Mobile |
|---------|--------|
| Horizontal tabs, accommodating 5+ items | Scrollable tabs, showing 3-4 items at most; remaining items accessible by scrolling |

---

## 6. Multi-Column Layout Degradation

### 6.1 General Rules

| Desktop Columns | Tablet (768-1023px) | Mobile (< 768px) |
|----------------|--------------------|--------------------|
| 4 columns | 2 columns | 1 column |
| 3 columns | 2 columns | 1 column |
| 2 columns | 2 columns | 1 column |

### 6.2 Column Priority and Ordering

When degrading to a single column, arrange by content priority from top to bottom:

1. **Core action area** (primary CTA, critical information)
2. **Primary content area** (data display, lists)
3. **Auxiliary information area** (sidebar, secondary information)
4. **Supplementary area** (related recommendations, footer)

**Rule**: The vertical ordering after degradation ≠ the desktop left-to-right order. Reorder based on the user's task flow.

---

## 7. Large Screen Adaptation (xl+ Scenarios)

Large screen adaptation is not "scaling up" — it is **leveraging space to increase information density**.

### 7.1 Content Max-Width Constraints

| Content Type | Max Width | Overflow Handling |
|-------------|-----------|------------------|
| Text reading area (articles, documents) | 800-960px | Centered, whitespace on both sides |
| Data table | 100% | Utilize full width; increase visible column count |
| Form | 640-800px | Centered or left-aligned; do not stretch inputs |
| Card grid | 100% | Increase cards per row (4 → 5 → 6) |

### 7.2 Information Density Increase

| Component | Desktop Standard | Large Screen Enhancement |
|-----------|-----------------|------------------------|
| Table row height | Standard 54px / Compact 40px | Optional compact mode; more rows visible per screen |
| Sidebar | Single level | Expandable second-level navigation persistent |
| Statistic cards | 3-4 columns | 5-6 columns |
| Charts | Single chart | Multiple charts side by side for comparison |

---

## 8. Degradation Checklist

### Data Tables

- [ ] < 768px table has a clear degradation approach (Row-to-Card / Horizontal Scroll / Row Expansion)
- [ ] Column hiding does not cause information loss (users have a path to access complete data)
- [ ] Action column collapsed into "More" menu
- [ ] Paginator simplified to "Load More" or infinite scroll
- [ ] First column sticky (for Horizontal Scroll approach)

### Page Framework

> See §4.6 Framework Degradation Checklist (grouped by F1-F4 / F5 / F8).

### Forms

- [ ] < 768px all Labels top-aligned
- [ ] < 768px form uses single-column layout
- [ ] CTA button full-width on mobile
- [ ] Input not occluded by virtual keyboard

### Navigation

- [ ] Sidebar degrades to Bottom Tab Bar or hamburger menu at < 768px
- [ ] Breadcrumb shows only parent level at < 768px
- [ ] Tabs horizontally scrollable at < 768px

### General

- [ ] Multi-column layout degrades to single column at < 768px
- [ ] Content reordered by priority after degradation (not simply stacked left-to-right)
- [ ] Touch targets ≥ 44×44px
- [ ] No hover-only interactions (mobile has no hover)
- [ ] Large screen content has max-width constraints (text reading area not over-wide)
