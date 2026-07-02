# MCP PRD parity — Raiden HUD / Motion — 2026-07-01

**Base URL:** http://localhost:3003/

## PRD parity checks (engine library shell)

| Check | Route | Status | Observation | Fix applied |
|-------|-------|--------|-------------|---------------|
| Homepage loads | `/` | Fixed | Invalid `<tr>` child broke table DOM | Row indicator moved inside `<TableCell>` |
| Rule row click | `/engine/:id` | Fixed | `layoutId` div as direct child of `<tr>` blocked clicks | Indicator inside cell with `pointer-events: none` |
| Success/Failure tabs | `/engine/:id_success` | Fixed | Indicator inside `<Button>` interfered with links | Single overlay behind tabs (`layout` spring) |
| Detail pane resize | `/engine/:id` | Fixed | `layout` on grid caused transform hit-box glitches | CSS `grid-template-columns` transition only |
| Mobile drawer | `/engine/:id` | Fixed | `<Drawer>` was 3rd grid column | Drawer moved outside grid |
| Sidebar action icons | sidebar | Fixed | `m.div whileTap` wrapper around `RouterLink` | Wrapper removed |
| Example panel | success/failure | Fixed | `Paper component={m.div}` broke MUI surface | Static `Paper` + border in `sx` |
| Cross-route heading | detail → example | Fixed | Shared `layoutId` on rule heading caused layout fights | Removed shared `layoutId` |

## Animation policy (post-fix)

| Layer | Mechanism | Notes |
|-------|-----------|-------|
| Route shell | `HudPresence` + `transitionPreset="route"` | Major views only |
| Rule detail | `HudPresence` + `detail` preset | Not full-page |
| Variant swap | `ExampleVariantOutlet` | Single owner; no loader fade |
| Tab pill | `HudLayoutIndicator layout` | Slides 50% width, z-index 0 |
| Row bar | `layoutId` inside cell | Springs between rows |
| Grid resize | MUI CSS transition | No Motion `layout` on grid |

## MCP note

Playwright MCP navigation to `http://localhost:3003/` timed out from the agent environment (DOMContentLoaded > 60s). Manual verification on local dev server recommended.

## Manual smoke checklist

1. `/` — table rows clickable; filters work
2. `/engine/alt-misuse` — detail pane + list; collapse toggle
3. Success / Failure tabs — links navigate; pill slides
4. Detail pane → Success examples button
5. Sidebar success/failure icon links
6. `prefers-reduced-motion: reduce` — no stuck overlays
