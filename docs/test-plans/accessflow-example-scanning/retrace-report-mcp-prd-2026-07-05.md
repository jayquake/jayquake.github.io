# MCP PRD parity — accessflow example scanning — 2026-07-05

Plan: `.cursor/plans/accessflow_example_scanning.plan.md`

## PRD parity checklist

| Check | PRD ref | Status | Live observation | Notes |
|-------|---------|--------|------------------|-------|
| Prerender `aria-describedby` failure | Phase 5 primary route | **PASS (local build)** | `build/engine/aria-describedby-has-reference_failure/index.html` ~79KB; contains `data-audit-example`, `<input aria-describedby=`, 3 failure cards | Not yet on production |
| Prerender `aria-controls` failure | Phase 5 secondary route | **PASS (local build)** | ~87KB; contains `role="tab"`, scoped `ex-N-` IDs | Spec: `aria-controls-has-reference-static.spec.js` |
| Production raw fetch (no JS) | Success criteria #1 | **FAIL (prod)** | `curl jayquake.github.io/.../aria-describedby-has-reference_failure` → `<title>Redirecting...</title>` | Pre-deploy; needs `npm run deploy` |
| `data-scan-ready` landmark | Phase 1 | **PASS (local prerender)** | `<main data-scan-ready="true" data-rule-id=...>` in prerender HTML | |
| ID scoping (`ex-{index}-`) | Phase 1 | **PASS (local prerender)** | e.g. `id="ex-0-description-bad-id"` | Prevents duplicate-id collisions |
| Library nav URL ↔ detail pane | Phase 4 (href nav) | **FAIL (prod)** / **FIX (local)** | URL `/engine/carousel-dragging-movements` showed `svg-discernible` in center pane | Fixed in uncommitted: `useEngineRuleFull`, `EngineLibraryShell`, `EngineRulesTable` stopPropagation |
| Crawl `<a href>` on rule rows | Phase 4 | **PASS (prod)** | Rule list links render real `href="/engine/{slug}"` | Nav state bug separate from href presence |
| ExamplePageNav href links | Phase 4 | **PASS (prod)** | Library / Success / Failure tabs use `<a href>` | |
| Playwright verification spec | Phase 5 | **ADDED** | `sdk/tests/playwright/node/tests/prerender-example-pages.spec.js` | Run after `npm run build` with `CI=1` |

## PRD deltas

1. **Production still on pre-prerender deploy** — GitHub Pages serves `404.html` redirect stub for `_success` / `_failure` deep routes until build with `postbuild` prerender is deployed.
2. **Nav regression from href + stale hook state** — Adding `href` on nested `RouterLink` inside clickable `TableRow` exposed existing stale-state bug in `useEngineRuleFull` (not caused by prerender).

## Nav fix (local, uncommitted)

| File | Change |
|------|--------|
| `src/hooks/useEngineRuleFull.js` | Clear stale rule on slug change; return only `rule.id === slug` |
| `src/components/pages/Engine/EngineLibraryShell.jsx` | `detailRule = selectedRule?.id === selectedRuleId ? selectedRule : indexRule` |
| `src/components/pages/Engine/EngineRulesTable.jsx` | `stopPropagation` on nested RouterLinks (incl. Success/Failure) |

## Recommended next steps

1. Commit nav fixes + deploy (`npm run deploy` or CI workflow).
2. Post-deploy: `view-source:https://jayquake.github.io/engine/aria-describedby-has-reference_failure` must show fixtures (not Redirecting).
3. Run `CI=1 npm run test:e2e:playwright -- prerender-example-pages.spec.js` from repo root.
4. Manual: click 3+ rules in library compact table — URL and center pane must match.
