# UI States Design Specification

> Design specification for Empty State and Loading State.
> Both belong to "easily overlooked non-default UI states" — the first interface users see on initial contact or while waiting, yet the most likely to be neglected.
> Multi-platform: Desktop Web / Mobile Web / Native App / Data Dashboard.

---

## 1. Empty State

### 1.1 Four Elements

An empty state consists of four elements, none of which should be omitted:

| Element | Purpose | Example |
|---------|---------|---------|
| **Icon** | Visual anchor, quickly conveys "no data" semantics | Empty folder, empty envelope, no-search-result icon |
| **Title** | One-sentence description of the current state | "No projects yet" / "No matching results found" |
| **Description** | Explains the reason or provides additional context | "Click the button below to create your first project" |
| **CTA** | Action button guiding users out of the empty state | "Create Project" / "Search Again" |

**Element priority**: Icon + Title + CTA are required; Description is optional (can be omitted when the title is sufficiently clear).

### 1.2 Scenario Variants

The four elements are emphasized differently across empty state scenarios:

| Scenario | Icon | Title | Description | CTA | Typical Location |
|----------|------|-------|-------------|-----|-----------------|
| **First-time use** | Guiding illustration | "Take your first step" | Feature value description | "Create Now" | List/table main area |
| **Data cleared** | Neutral icon | "No data" | Optional: last action hint | "Add Data" | List/table main area |
| **No search results** | Search icon | "No matching results found" | Suggest adjusting filters | "Clear Filters" | Search results area |
| **Insufficient permissions** | Lock icon | "No access" | Contact admin instructions | "Request Access" | Page main area |
| **Network error** | Disconnected icon | "Unable to load data" | Suggest checking network | "Retry" | Page main area |
| **No filter results** | Filter icon | "No data matches the criteria" | Suggest adjusting filters | "Reset Filters" | List main area |

### 1.3 Multi-Platform Adaptation

#### Desktop Web

- Complete four elements: illustration + title + description + CTA
- Illustration size: 120-200px
- Vertically centered within the content area, ample horizontal whitespace
- CTA uses brand primary color button

#### Mobile Web / App

- Simplified to three elements: icon + title + CTA (description optional)
- Icon size: 80-120px
- Limited vertical screen space; avoid overly long description text
- CTA uses full-width button or bottom-fixed button

#### Data Dashboard

- Emphasize data dimension description + refresh CTA
- Icons simplified to line icons (identifiable from a distance)
- Color scheme consistent with the theme; avoid the empty state area being too conspicuous
- Consider auto-refresh mechanism (retry every 30s) to reduce manual user action

### 1.4 Design Rules

1. **Empty state is not an error state** — Maintain a neutral or positive tone; avoid negative words like "failed" or "error"
2. **CTA must be actionable** — Button points to a specific action; prohibit meaningless CTAs like "OK" or "Close"
3. **Avoid text-only** — A text-only empty state without an icon lacks a visual anchor and is easily overlooked
4. **Align with page layout** — Empty state occupies the content area, not an overlay
5. **Copy matches the scenario** — First-time use uses a guiding tone, data cleared uses a neutral tone, insufficient permissions uses an explanatory tone
6. **Consistent icon style** — Empty state icons should be unified with the overall icon system style (line/filled/illustration)

### 1.5 Ant Design Alignment

| Ant Design Component | Corresponding Specification | Notes |
|---------------------|---------------------------|-------|
| `Empty` | Four elements' icon + title + description | Ant Design `description` corresponds to "title + description"; CTA needs to be added |
| `Result` | Insufficient permissions / network error scenarios | `status=403/500` + `extra` as CTA |
| `Table` `locale.emptyText` | Table empty state | Default is text-only; custom rendering of four elements is needed |

---

## 2. Loading State

### 2.1 Skeleton vs Spinner Decision Rules

| Dimension | Skeleton | Spinner |
|-----------|----------|---------|
| **Content structure** | Predictable (known layout) | Unpredictable (unknown layout) |
| **Wait duration** | > 300ms | < 300ms or uncertain |
| **Area size** | Large area (cards, lists, tables) | Small area (beside buttons, icons) |
| **Information value** | Skeleton implies the upcoming content structure | Only indicates "processing" |
| **User perception** | Reduces layout shift (CLS optimization) | Lightweight, does not interfere with current content |

#### Decision Tree

```
Need loading indicator?
├── Is the content area layout predictable?
│   ├── Yes → Is the area ≥ one card?
│   │   ├── Yes → Skeleton
│   │   └── No → Spinner (skeleton is meaningless for small areas)
│   └── No → Spinner
├── Is it a button/action feedback?
│   └── Yes → Spinner (inside button) or Progress Bar
└── Is it a full-page load?
    └── Yes → Skeleton (page-level skeleton)
```

### 2.2 Progressive Loading Strategy

For content areas containing images, use a three-stage progressive loading approach:

```
Stage 1: Skeleton (0-300ms)
  → Display content structure skeleton

Stage 2: Low-quality image / placeholder color (300ms - data arrival)
  → Image position displays brand color block or very low-resolution image

Stage 3: High-quality image (after data arrival)
  → Fade in replacement with high-quality image
```

**Minimum display time**: Skeleton must display for at least 300ms to avoid flicker when data returns quickly (layout jitter + visual jump).

### 2.3 Multi-Platform Differences

#### Desktop Web

- Page-level loading: Skeleton (sidebar + main content area each with its own skeleton)
- Component-level loading: Skeleton or Spinner, selected per decision tree
- Button loading: Embedded Spinner + button width locked (prevents layout shift)
- Network is typically stable; Skeleton usage frequency is lower than mobile

#### Mobile Web / App

- **Skeleton first**: Mobile network fluctuates more; skeleton screens reduce blank-screen anxiety
- List/Feed loading: Skeleton card placeholders
- Pull-to-refresh: Prefer platform native indicators (iOS UIRefreshControl / Android SwipeRefreshLayout)
- Button loading: Spinner + button disabled + copy change ("Submitting...")
- Pagination loading: Bottom Spinner + "Load more" text

#### Data Dashboard

- **Block-level Skeleton**: Dashboard data volume is large; load by data module blocks
- Skeleton must precisely match the final layout (dashboard layout shifts affect distant viewing experience)
- Avoid full-screen Spinner — dashboard blank screen + spinner = ops panic
- Consider data placeholders: When no real-time data, display "most recent data" + "data updating" indicator

#### Native App

- **Platform native loading indicators first**: iOS `UIActivityIndicator` / Android `ProgressBar`
- Page-level loading: Platform native Skeleton or custom skeleton screen
- Consistent with platform HIG (iOS uses thin-line skeletons, Android uses color-block skeletons)

### 2.4 Loading State Design Rules

1. **Never show a blank screen** — Any wait exceeding 100ms must have visual feedback
2. **Layout stability** — Loading indicator occupies the same space as the loaded content (CLS = 0)
3. **Progress should be perceivable** — Prefer Progress Bar over Spinner (determinate > indeterminate)
4. **Avoid nested loading** — At most 1 Skeleton area + several small Spinners within the same viewport
5. **Loading state must have an exit condition** — After timeout, must display Error State + retry CTA; never load indefinitely
6. **Restrained Skeleton animation** — Skeleton shimmer animation uses a single ease-out pass (200ms), no looping flash

### 2.5 Ant Design Alignment

| Ant Design Component | Corresponding Specification | Notes |
|---------------------|---------------------------|-------|
| `Skeleton` | Large predictable areas | Set `active` to enable shimmer, but use restraint |
| `Spin` | Small / unpredictable areas | Use with `tip` for text description |
| `Progress` | Determinate progress | Prefer over Spinner |
| `Button` `loading` | Button loading state | Automatically embeds Spinner + disables button |

---

## 3. State Combination Scenarios

### 3.1 Loading → Empty Result

The most common state chain; must avoid "flicker":

```
User triggers action
  → Immediately display Skeleton (minimum display 300ms)
  → Data returns empty
  → Fade out Skeleton, fade in Empty State
```

**Key**: Skeleton minimum display time of 300ms prevents flicker when data returns instantly.

### 3.2 Loading → Error

```
User triggers action
  → Display Skeleton
  → Request fails
  → Display Error State (icon + error description + retry CTA)
```

**Key**: Error State CTA must be "Retry" not "OK", giving users a path out of the error state.

### 3.3 State Transition Animations

| Transition | Animation | Duration | Easing |
|-----------|-----------|----------|--------|
| Skeleton → Content | Fade in | 200ms | ease-out |
| Skeleton → Empty | Fade in | 200ms | ease-out |
| Skeleton → Error | Fade in | 200ms | ease-out |
| Content → Skeleton (refresh) | Fade out + skeleton fade in | 150ms + 200ms | ease-out |

> Animation principles follow `references/methodology/animation-best-practices.md`: UI micro-interactions 100-300ms, ease-out as default easing.

---

## 4. Checklist

### Empty State Checklist

- [ ] Every data display area that may be empty has an Empty State
- [ ] Empty State includes four elements (icon / title / description / CTA)
- [ ] CTA points to a specific actionable action
- [ ] Copy tone matches the scenario (guiding / neutral / explanatory)
- [ ] Icon style is consistent with the overall icon system
- [ ] Mobile Empty State is simplified (description optional)
- [ ] Dashboard Empty State has auto-refresh or refresh CTA

### Loading State Checklist

- [ ] Any wait > 100ms has a loading indicator
- [ ] Skeleton vs Spinner selected per decision tree
- [ ] Skeleton layout matches final content layout (CLS = 0)
- [ ] Skeleton minimum display time ≥ 300ms
- [ ] Button loading state: embedded Spinner + disabled + width locked
- [ ] Loading timeout has exit condition (Error State + retry CTA)
- [ ] Mobile prioritizes Skeleton
- [ ] Native App prioritizes platform native indicators
