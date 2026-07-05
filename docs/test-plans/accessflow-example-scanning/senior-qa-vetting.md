# Senior QA vetting — Accessflow example scanning

## 1. Feature summary

**Goal:** Make RAIDEN engine rule `_success` / `_failure` URLs readable by Accessflow/Puppeteer in the **initial HTTP response** while preserving full React UI.

**Entry:** Accessflow crawl or direct URL `https://jayquake.github.io/engine/{rule-id}_failure`

**Success:** Raw fetch contains fixture DOM (`data-audit-example`, scoped IDs, MUI shell). Live browser remains interactive.

**Mechanism:** Build-time Playwright prerender (`postbuild`) + per-example ID scoping in `ExampleCard`.

## 2. Assumptions

| ID | Assumption |
|----|------------|
| A1 | GitHub Pages serves `build/engine/{slug}/index.html` for deep paths (no SPA `-s` on deploy) |
| A2 | Accessflow scanner can use prerendered HTML without waiting for JS |
| A3 | Catalog cache (`engine-rules.json`) has full metadata for library detail pane |
| A4 | `AF_NODE_PACKAGE_KEY` available for SDK audit specs in CI |

## 3. Questions for Product / Engineering

1. Should library **detail** routes (`/engine/{slug}` without suffix) also be prerendered for crawl, or SPA-only is OK?
2. Confirm deploy pipeline runs `postbuild` on every production push (not skipped in CI).

## 4. QA risk analysis

| Area | Risk | Mitigation |
|------|------|------------|
| UX | URL/panel mismatch after href nav | Slug guard + hook stale clear (fixed locally) |
| Functional | Prod still 404 redirect stub | Deploy prerender build |
| Data | Duplicate fixture IDs on multi-example pages | `scopeExampleHtml` prefix |
| a11y | Nested links in table rows | stopPropagation on RouterLink |
| Edge | Full page reload via raw `<a href>` | Acceptable for crawlers; React remounts |

## 5. Coverage map

| Plan item | Implementation | Retrace | Verdict |
|-----------|----------------|---------|---------|
| scopeExampleHtml | Done | Local build PASS | Ship-ready |
| data-audit-example / data-scan-ready | Done | In prerender HTML | Ship-ready |
| prerender script + postbuild | Done | ~320 routes local | Ship-ready after deploy |
| href crawl discovery | Partial (rows + ExamplePageNav) | Prod links present | Ship-ready |
| Nav URL ↔ pane sync | Fixed locally | Needs manual retrace post-deploy | Needs retrace |
| Playwright prerender spec | Added | Not run this session | Needs retrace |
| Production prerender live | Not deployed | curl FAIL | Blocked — deploy |

## 6. Gap backlog

| # | Gap | Category | Action |
|---|-----|----------|--------|
| G1 | Nav stale pane on prod | Bug | Deploy nav fix commits |
| G2 | Prod prerender missing | Blocked | Deploy build with postbuild |
| G3 | `prerender-example-pages.spec.js` not in CI yet | Missing test | Add to workflow after deploy verify |
| G4 | Claude MCP vetting Phase 3 screenshots | Defer | Re-run `/mcp-vetting` with Playwright CLI post-deploy |

## 7–10. (Deferred)

Detailed Qase cases N/A (audit-rules repo). Analytics N/A. Production sign-off: pending G1 + G2 closure.

**Cross-links:** [retrace-report-mcp-prd-2026-07-05.md](./retrace-report-mcp-prd-2026-07-05.md)
