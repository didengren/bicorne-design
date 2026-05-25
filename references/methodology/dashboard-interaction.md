# Dashboard Interaction Specification

> Interaction pattern definitions for cockpit/data dashboards — input methods, focus navigation, touch gestures, auto-carousel, alert mechanisms, data refresh strategies.
> This document is the interaction-layer companion to `dashboard-layout-patterns.md` and `data-visualization.md`.
> Only applicable when `meta.platform === "dashboard"`.

---

## 1. Interaction Mode Classification

Dashboard interaction is divided into three modes by **input method**, each dictating fundamentally different interaction designs:

| Mode | Input Method | Typical Scenario | Interaction Depth |
|------|-------------|-----------------|-------------------|
| **Remote mode** | IR/Bluetooth remote | Command center, meeting room | 2 levels (browse → selected detail) |
| **Touch mode** | Touch screen | Touch kiosk, exhibition hall | 2-3 levels (browse → select → operate) |
| **Display mode** | No interaction | Exhibition hall, public area | 0 levels (pure auto-carousel) |

**Key principle**: The same dashboard product may use different modes in different deployment scenarios. The interaction design must support all three modes simultaneously, or explicitly declare in product configuration that only specific modes are supported.

---

## 2. Remote Mode

### 2.1 Input Mapping

Physical remote buttons map to interface operations:

| Remote Button | Interface Operation | Description |
|--------------|--------------------|-------------|
| ↑ ↓ ← → | Focus movement | Move by layout area and element order within area |
| Confirm/OK | Select/Enter | Activate current focused element |
| Back | Return to previous level | Corresponds to breadcrumb's previous level |
| Menu | Open context menu | Optional feature |
| Number 1-9 | Quick jump | Optional feature, jump to corresponding area |
| Volume+/Volume- | No mapping / Page switch | Optional feature |

### 2.2 Focus Navigation Model

Dashboard focus navigation uses a **Area → Element** two-level model:

```
┌─ Area A ─────────────┬─ Area B ──────┐
│  [Element1]  [Element2]     │  [Element3]       │  ← Focus on Element1 in Area A
│  [Element4]  [Element5]     │  [Element6]       │
└──────────────────────┴───────────────┘

Press → : Focus from Element1 → Element2
Press ↓ : Focus from Element1 → Element4
Press → (Element2 is rightmost): Focus jumps to Element3 in Area B
```

**Inter-area jump rules**:

| Operation | Behavior |
|-----------|----------|
| → on rightmost element in area | Focus jumps to first focusable element in right adjacent area |
| ← on leftmost element in area | Focus jumps to first focusable element in left adjacent area |
| ↓ on bottommost element in area | Focus jumps to first focusable element in lower adjacent area |
| ↑ on topmost element in area | Focus jumps to first focusable element in upper adjacent area |

### 2.3 Focus Visual Indication

Focus must be clearly distinguishable at 3m distance:

| Element | Focus State Style | Description |
|---------|-------------------|-------------|
| Metric card | `{colors.brand.400}` 2px border + 4px inset | Brand color border, recognizable at distance |
| Chart area | `{colors.brand.400}` 2px border + 4px micro-offset | Border + micro-offset dual-channel feedback |
| List item | Left 3px `{colors.brand.400}` indicator bar + background color change | Side indicator bar + background color |
| Button | Background color darkened + micro-scale scale(1.02) | Visual weight consistent with desktop hover state |
| Map marker | Pulse animation scale 1.5x + border highlight | Pulse + border dual-channel |

**Focus movement animation**: Focus transitions use 200ms ease-out, never instant cut — instant cuts are difficult to track at distance.

### 2.4 Focus Cycling

| Scenario | Behavior |
|----------|----------|
| Focus on last element, press → | No cycling, focus stays at last (prevent user disorientation) |
| Focus on first element, press ← | No cycling, focus stays at first |
| Focus on bottom element, press ↓ | Focus stays at bottom |
| Focus on top element, press ↑ | Focus stays at top |

**Exception**: In D6 full-screen narrative mode (auto-carousel), the page indicator may cycle.

### 2.5 Selection and Detail

| Operation | Behavior |
|-----------|----------|
| Confirm key selects metric card | Card expands into detail panel (overlays adjacent area or slides out from side) |
| Confirm key selects chart | Chart enlarges to full-screen or main area, showing detailed data |
| Confirm key selects list item | Detail panel expands to right/below |
| Back key | Closes detail panel, focus returns to triggering element |

**Detail panel specification**:
- Width no more than 40% of screen
- Background color `{colors.surface.3}`, clear hierarchy distinction from underlying content
- Close button always visible (top-right ×)
- Open/Close animation: Slide 300ms ease-out

---

## 3. Touch Mode

### 3.1 Gesture Mapping

| Gesture | Operation | Description |
|---------|-----------|-------------|
| Tap | Select/Enter | Equivalent to remote confirm key |
| Double tap | Enlarge/Full-screen | Chart enlarges to full-screen |
| Long press (500ms) | Context menu | Optional feature |
| Swipe left/right | Switch page/chart | D6 carousel mode switching |
| Swipe up/down | Scroll list | List area only |
| Pinch | Zoom out map | Map area only |
| Spread | Zoom in map | Map area only |

### 3.2 Touch Targets

| Element | Minimum Size | Description |
|---------|-------------|-------------|
| Button | 64×64px | Dashboard touch targets are larger than mobile |
| List item | Height 64px | Taller than remote mode's 48px |
| Chart area | 128×128px | Charts smaller than this cannot be individually touched |
| Map marker | 48×48px touch hot zone | Visual marker can be smaller, but touch hot zone must be ≥ 48px |

### 3.3 Touch Feedback

| Feedback Type | Implementation | Duration |
|--------------|----------------|----------|
| Press down | scale(0.97) + background color darkened | 100ms |
| Release | Restore original size + background color restored | 150ms |
| Selected | Brand color border + background color subtle change | 200ms |

**Unified with remote focus indication**: Touch selected state visual style is consistent with remote focus state — brand color border + background color change. Both input methods share the same visual language.

---

## 4. Display Mode (Auto-Carousel)

### 4.1 Carousel Parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| Switch interval | 15s (default) / configurable 10-30s | Adjust based on content complexity |
| Switch animation | Fade 600ms / Slide 800ms | Narrative-level animation |
| Page indicator | Bottom-center dots | 3-8 pages recommended |
| Pause interaction | Any touch/remote operation pauses carousel for 60s | User operation takes priority |
| Resume carousel | Auto-resumes after 60s of inactivity | Avoid permanent pause |

### 4.2 Carousel Content Design

| Page Type | Content | Dwell Time |
|-----------|---------|-----------|
| KPI overview | 4-6 core metrics | 15s |
| Trend analysis | 1-2 large charts | 20s |
| Ranking list | Auto-scrolling list | 15s |
| Map situation | Map + markers | 20s |
| Alert summary | Current alert list | 10s |

### 4.3 Auto-Scrolling List

List components in display mode use auto-scrolling:

| Parameter | Value |
|-----------|-------|
| Scroll speed | 1 row every 3s |
| Scroll direction | Upward |
| Cycling | Yes (end connects to beginning) |
| Scroll animation | 300ms ease-out |
| New data entry | Top insertion + fade-in 200ms |

---

## 5. Alert Mechanism

### 5.1 Alert Levels

| Level | Visual Treatment | Sound | Duration | Position |
|-------|-----------------|-------|----------|----------|
| P0 Critical | Red background flash (1Hz) + global badge | Optional buzzer | Until acknowledged | Top banner |
| P1 Warning | Yellow/orange indicator + pulse animation | None | Until condition resolved | Within metric card |
| P2 Info | Blue/brand color indicator | None | Auto-dismiss after 5s | List item marker |

### 5.2 Alert Notification Bar

P0 alerts use a top notification bar:

```
┌──────────────────────────────────────────┐
│ 🔴 Server Node-03 CPU Usage 98%  [Acknowledge]  │  ← 48px height
└──────────────────────────────────────────┘
```

| Parameter | Value | Description |
|-----------|-------|-------------|
| Height | 48px | Does not obscure too much content |
| Background | `{colors.semantic.danger}` opacity 0.9 | Semi-transparent, does not fully obscure underlying content |
| Text | `{typography.scales.button}` | 16px / 500 |
| Acknowledge button | "Acknowledge" text button | Remote confirm key / touch tap |
| Multiple alerts | Stack latest 3, older ones collapsed | Prevent alert storm from filling screen |

### 5.3 Alert Animation

| Animation | Implementation | Description |
|-----------|---------------|-------------|
| Flash (P0) | Background opacity 0.7 ↔ 1.0, 1Hz loop | Do not use color flash (accessibility) |
| Pulse (P1) | scale(1.0) → scale(1.05) → scale(1.0), 2s loop | Gentle breathing effect |
| Enter | Slide down 300ms ease-out | Notification bar slides in from top |
| Exit | Slide up 200ms ease-in | Slides out after acknowledgement |

---

## 6. Data Refresh Strategy

### 6.1 Refresh Modes

| Mode | Implementation | Applicable Scenario | Refresh Interval |
|------|---------------|--------------------|-----------------|
| **Polling** | HTTP request timed pull | General scenario | 5-60s |
| **WebSocket** | Server push | Real-time monitoring | Immediate |
| **Manual refresh** | User triggered | Low-frequency update scenario | On demand |
| **Hybrid** | WebSocket push incremental + polling full | High-reliability scenario | Push immediate + full 60s |

### 6.2 Refresh Interval Selection

| Data Type | Recommended Interval | Description |
|-----------|---------------------|-------------|
| Core metrics (KPI) | 5-10s | Command center requires near-real-time |
| Chart data | 10-30s | Trend charts do not need second-level updates |
| List/Log | 10-30s | New entries appended |
| Map markers | 5-15s | Real-time position tracking needs faster |
| Alert status | WebSocket immediate | Alerts cannot have delay |

### 6.3 Refresh Visual Feedback

| Scenario | Visual Treatment | Description |
|----------|-----------------|-------------|
| Data update (value change) | CountUp smooth transition 600ms | No hard cut |
| Data update (chart redraw) | Chart transition animation 800ms | Line/bar smooth morph |
| New data point entry | Fade-in + slide-in 300ms | List new entry, map new marker |
| Full refresh | No full-screen loading | Independent per-block refresh |
| Refresh failure | Show last successful data + "Data updating" indicator | Do not show empty state |

### 6.4 Data Timestamp

Dashboards must display data timeliness:

| Position | Content | Format |
|----------|---------|--------|
| Global (bottom-right) | Last update time | "Updated at HH:mm:ss" |
| Metric card (top-right) | Metric update time (optional) | "HH:mm" |
| Alert notification | Alert occurrence time | "HH:mm:ss" |

**Timestamp font size**: `{typography.scales.caption}` (16px / 400), `{colors.ink.tertiary}` color — information must be present but not attention-grabbing. On low-DPI screens, `micro` (12px) must not be used; see `dashboard-layout-patterns.md` §7.4.

---

## 7. Cross-Mode Interaction Unification

Interaction rules shared across all three input modes:

| Rule | Description |
|------|-------------|
| Zero hover dependency | All information is visible by default, not dependent on hover to display |
| Drill depth ≤ 2 | Dashboards are not suitable for deep navigation |
| Dual-channel return | Breadcrumb + remote back key / touch back gesture |
| Alerts always visible | Not affected by page switching, carousel, or focus position |
| Operations reversible | All navigation and selection operations can be returned from |
| State persistence | After switching pages/areas, original area state is preserved (selected item, scroll position) |

---

## 8. Checklist

### Remote Mode

- [ ] Focus clearly distinguishable at 3m distance (brand color border + micro-offset)
- [ ] Focus movement has 200ms transition animation
- [ ] Inter-area jump logic correct (does not jump to unexpected positions)
- [ ] Focus does not cycle (stays at end)
- [ ] Confirm key selection opens detail panel
- [ ] Back key closes detail panel

### Touch Mode

- [ ] Touch targets ≥ 64×64px
- [ ] Touch feedback (scale + background color) < 200ms
- [ ] Touch selected state visually consistent with remote focus state
- [ ] Map supports two-finger zoom
- [ ] List supports up/down swipe

### Display Mode

- [ ] Carousel interval 10-30s configurable
- [ ] User operation pauses carousel for 60s
- [ ] Page indicator visible
- [ ] List auto-scroll smooth

### Alerts

- [ ] P0 alerts use top notification bar + flash
- [ ] Alerts not affected by page switching
- [ ] Multiple alerts stacked ≤ 3
- [ ] Alert slides out after acknowledgement

### Data Refresh

- [ ] Refresh interval matches data type
- [ ] Data updates use smooth transitions (not hard cuts)
- [ ] Refresh failure shows last data + updating indicator
- [ ] Global timestamp visible

---

## 9. Performance Budget

### 9.1 Frame Rate Target

| Scenario | Target FPS | Minimum FPS | Description |
|----------|-----------|------------|-------------|
| Static display | 60fps | 30fps | No pressure without animation |
| Data refresh animation | 60fps | 30fps | CountUp / chart transition |
| Auto-carousel switch | 60fps | 30fps | Fade / Slide switch |
| Map interaction | 60fps | 30fps | Zoom/pan |
| Alert flash | 60fps | 30fps | P0 flash animation |

**Frame rate monitoring**: Dashboards should have a built-in FPS counter (configurable show/hide), allowing ops personnel to monitor performance in real-time.

### 9.2 Rendering Technology Selection

| Chart Type | Recommended | Not Recommended | Rationale |
|-----------|-------------|----------------|-----------|
| Line / Bar / Pie | Canvas (ECharts / Chart.js) | SVG (when > 1000 data points) | Canvas significantly outperforms SVG at large data volumes |
| Map | WebGL (Mapbox GL / Deck.gl) | Canvas / SVG | Dashboard maps have large data volumes, WebGL is the only viable solution |
| Heatmap | Canvas / WebGL | SVG | Pixel-level rendering requires Canvas/WebGL |
| Gauge | SVG or CSS | Canvas | Gauge has few elements, SVG is clearer |
| List/Ranking | DOM (virtual scroll) | Canvas | List interaction requires DOM events |

### 9.3 Memory Budget

| Scenario | Memory Limit | Description |
|----------|-------------|-------------|
| Single chart area | ≤ 50MB | Canvas off-screen buffer + data |
| Map area | ≤ 150MB | Tile cache + render buffer |
| Full page | ≤ 500MB | All areas combined |
| Data cache | ≤ 100MB | Frontend cached historical data |

**Memory leak prevention**:
- Timers/polling must be cleared on component unmount
- Canvas context released when not visible
- WebSocket reconnection no more than 3 times, then degrade to polling

### 9.4 Data Volume Limits

| Chart Type | Data Point Limit | Overflow Handling |
|-----------|-----------------|-------------------|
| Line chart | 2000 points | Downsample (LTTB algorithm) |
| Bar chart | 200 bars | Horizontal scroll or pagination |
| Pie chart | 6 slices | Merge as "Other" |
| Scatter plot | 5000 points | Downsample or aggregate |
| Heatmap | 100×100 grid | Load by zoom level |
| List | 100 rows | Virtual scroll, render visible rows only |
| Map markers | 50 points | Cluster |

### 9.5 Network Budget

| Scenario | Request Frequency | Data Volume/Request | Description |
|----------|------------------|--------------------|-------------|
| Polling refresh | 5-60s interval | ≤ 100KB | Pull incremental data only |
| WebSocket | Persistent connection | ≤ 10KB/push | Incremental push |
| First screen load | 1 time | ≤ 2MB | Including all static assets |
| Map tiles | On-demand load | ≤ 50KB per tile | Cache loaded tiles |

### 9.6 Performance Checklist

- [ ] FPS counter configurable to show
- [ ] Chart rendering technology selection correct (Canvas / SVG / WebGL)
- [ ] Line chart data points ≤ 2000 (downsampled if exceeded)
- [ ] Map markers ≤ 50 (clustered if exceeded)
- [ ] List uses virtual scroll
- [ ] Timers cleared on component unmount
- [ ] WebSocket disconnection has degradation strategy
- [ ] First screen load ≤ 2MB
- [ ] Polling pulls incremental data only
