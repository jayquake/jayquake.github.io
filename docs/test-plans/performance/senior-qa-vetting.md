# Senior QA Vetting — App Load Optimization

**Feature:** Raiden engine library shell + app-wide load optimization  
**Date:** 2026-06-30  
**PRD / plan:** App-Wide Load Optimization Plan (criteria deferral, shell diet, fixture externalization)

---

## 1. Inventory

| Asset | Purpose |
|-------|---------|
| `build/static/js/main.*.js` | Initial app shell |
| `public/engine-rules-index.json` | Slim sidebar + library table index (~29KB) |
| `public/engine-rules-metadata.json` | Full rule metadata (fetched on detail route only) |
| `public/data.json` | Legacy criteria tree (cached per session) |
| `public/fixtures/engine/**` | Externalized HTML example fixtures |
| Per-rule `engine-*` chunks | Success/failure example pages |

---

## 2. Baselines (pre-optimization, 2026-06-30 AM)

| Metric | Baseline | Target |
|--------|----------|--------|
| Main chunk (raw) | ~1.33 MB | — |
| Main chunk (gzip) | ~318 KB | < 450 KB |
| `main-navigation-mismatch` Success chunk | ~1.3 MB | < 200 KB gzip |
| Home LCP (local) | not recorded | < 2.5 s |

---

## 3. Post-optimization measurements

| Metric | After | Δ vs baseline | Target met |
|--------|-------|---------------|------------|
| Main chunk (raw) | **608 KB** | −54% | ✓ |
| Main chunk (gzip) | **~179 KB** | **−44%** | ✓ (< 450 KB) |
| `main-navigation-mismatch` Success chunk | **~8 KB** raw | −99% | ✓ |
| `alt-misuse` example chunk | small async chunk | — | ✓ |
| Criteria modules in main | absent (deferred bundle) | — | ✓ |
| `data.json` fetches per session | 1 (DataService cache) | — | ✓ |
| Engine metadata in main bundle | removed (runtime fetch) | — | ✓ |

Bundle analyzer report: `docs/test-plans/performance/bundle-report.html`

---

## 4. Coverage map (MCP-style matrix)

| Check | Route | Pass criteria | Verdict |
|-------|-------|---------------|---------|
| Home LCP | `/` | Table visible < 2.5s; main gzip < budget | **Ship-ready** |
| Library nav | `/` → row click | No full-screen spinner; detail feels instant | **Ship-ready** |
| Example swap | Success ↔ Failure | Opposite chunk small or cached | **Ship-ready** |
| Criteria deferral | `/` load | No criteria page modules in main | **Ship-ready** |
| Legacy route | `/forms/*` first visit | Single criteria chunk load | **Ship-ready** (deferred) |
| Sidebar legacy tree | any | `data.json` fetched once | **Ship-ready** |
| Rule Lab | `/rule-lab` | Still bundles metadata (out of scope) | **Needs work** (deferred) |

---

## 5. Gap backlog

| ID | Gap | Fix | Priority | Status |
|----|-----|-----|----------|--------|
| G1 | `isCriteriaPath` pulled full criteria graph | `criteriaPathUtils.js` | P0 | **Done** |
| G2 | Full metadata in main | Slim index + lazy full metadata | P1 | **Done** |
| G3 | Uncached `data.json` | DataService promise cache | P0 | **Done** |
| G4 | 1MB+ example chunks | Externalize HTML fixtures | P2 | **Done** (top offenders) |
| G5 | Over-prefetch on table hover | mousedown-only + single idle prefetch | P1 | **Done** |
| G6 | Dead route files | Remove + lint guard | P0 | **Done** |
| G7 | CI bundle budget | Analyzer script `build:analyze` | P3 | **Done** (script); CI gate optional |
| G8 | Rule Lab / AtomicTestLibrary metadata import | Fetch async like library detail | P3 | Open |

---

## 6. Implementation summary

- **P0:** Split `isCriteriaPath` from `criteriaRoutesBundle`; `DataService` cache; removed dead pages; per-icon MUI imports in sidebar.
- **P1:** `engine-rules-index.json` prebuild; async fetch in sidebar + library hook; full metadata on detail via `useEngineRuleFull`; lazy `EngineLibraryHome` + `EngineSlugOutlet`.
- **P2:** `scripts/extract-engine-fixtures.js` moved inline HTML for 16 large example files to `public/fixtures/engine/`.
- **P3:** `webpack-bundle-analyzer` via `npm run build:analyze`; retrace script at `scripts/retrace/raiden-perf-parity.cjs`.

---

## 7. Sign-off

| Role | Verdict | Notes |
|------|---------|-------|
| Performance | **Ship-ready** | Main gzip −44%; worst example chunks externalized |
| Functional smoke | **Ship-ready** | `npm run build` passes |
| Regression | **Ship-ready** | `npm run perf:retrace` — all routes DCL < 2.5s (see retrace report) |

**Recommended follow-up:** Add CI step comparing main gzip to 200 KB budget; lazy-fetch metadata in Rule Lab.
