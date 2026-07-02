# Senior QA Vetting — interactive-target-size

**Feature:** WCAG 2.5.8 Target Size (Minimum) — engine rule examples in RAIDEN  
**Date:** 2026-07-02  
**Qase case:** [8921](scripts/qase/engine-rules-qase-id-map.json)  
**Retrace report:** [retrace-report-mcp-prd-2026-07-02.md](./retrace-report-mcp-prd-2026-07-02.md)  
**Playwright spec:** `sdk/tests/playwright/node/tests/interactive-target-size-failure.spec.js`

---

## 1. Feature summary

| Item | Detail |
|------|--------|
| Goal | Validate interactive elements meet 24×24 CSS px minimum target size or adequate spacing |
| Entry | Engine Rules Library → `/engine/interactive-target-size` |
| Success route | `/engine/interactive-target-size_success` — 13 compliant examples |
| Failure route | `/engine/interactive-target-size_failure` — 10 needs-fix examples |
| Outcomes | Pass: no violation; Fail: undersized/spacing violation flagged |
| Impact | Serious |
| WCAG | 2.5.8 Level AA |

---

## 2. Assumptions

| ID | Assumption |
|----|------------|
| A1 | RAIDEN serves examples at `localhost:3003` (dev) or production build via `serve` (CI) |
| A2 | AccessFlow SDK `@acsbe/accessflow-sdk@^1.2.0` installed from GCP Artifact Registry |
| A3 | `AF_NODE_PACKAGE_KEY` holds a valid Audit SDK token (not the NPM install token) |
| A4 | SDK maps engine rule `interactive-target-size` to a violation key containing `target` |
| A5 | Example HTML in `InteractiveTargetSizeFailure.jsx` mirrors `atomic-tests/fail/` fixtures |

---

## 3. Questions for Product

1. Should Step 5 automation assert an exact violation count (10) or allow SDK deduplication?
2. Confirm SDK rule violation key ID for `interactive-target-size` after first CI run with live API.
3. Is `/engine/interactive-target-size_success` in scope for a paired Playwright pass-route spec?

---

## 4. QA risk analysis

| Area | Risk | Mitigation |
|------|------|------------|
| UX | New UnifiedExamplePage labels differ from legacy ("Needs Fix" vs "NEEDS FIX" nav) | Role/text locators; retrace screenshots |
| Functional | 10 fail fixtures must all render | Per-fixture title assertions in retrace |
| Data | Atomic parity drift vs core-engine | `npm run validate:atomic-parity` |
| A11y | Example iframes may not expose all interactables to SDK | Step 5 compares SDK vs atomic auditor |
| Edge | Substring fixture titles ("two undersized…" vs "undersized…") | Use `exact: true` locators |
| CI | SDK API requires outbound network to acsb-test.com | CI runner network + `AF_NODE_PACKAGE_KEY` secret |

---

## 5. Coverage map

| Plan | Qase | Retrace | Step depth | Verdict |
|------|------|---------|------------|---------|
| Step 1 — Rule detail | 8921 | Not run | 3 sub-items | Defer |
| Step 2 — Pass examples | 8921 | Spot-check PASS | 3 sub-items | Ship-ready (spot-check) |
| Step 3 — Fail examples UI | 8921 | **PASS** (16 checks) | 3 sub-items | **Ship-ready** |
| Step 4 — Atomic auditor | 8921 | Existing Jest + parity script | 1 step | Ship-ready |
| Step 5 — AccessFlow SDK | 8921 | **BLOCKED** (local DNS) | 3 sub-items | **Needs retrace in CI** |
| Playwright automation | — | New single spec | UI + SDK | **Needs CI verify** |

---

## 6. Gap backlog

| # | Category | Gap | Action |
|---|----------|-----|--------|
| G1 | Missing automation | No Playwright spec for success route | Add later if Product confirms |
| G2 | Blocked | SDK audit not verified locally (DNS to AccessFlow API) | Run `test-js` CI job after secrets configured |
| G3 | PRD copy | SDK violation key not pinned | Log keys from CI report; update spec `TARGET_SIZE_RULE_KEYS` |
| G4 | Fixture | Selenium lane still uses legacy routes | Out of scope; follow Playwright pattern when ready |
| G5 | Defer | Qase Step 1 detail page not retrace-automated | Manual or future spec |

---

## 7. Coverage by area

| Area | Covered by |
|------|------------|
| Rule logic | `src/components/pages/engine-rules/interactive-target-size/index.spec.ts` |
| Atomic HTML | `atomic-tests/pass/` (13), `atomic-tests/fail/` (10) |
| RAIDEN UI — failure | Playwright spec + retrace script |
| RAIDEN UI — success | Retrace spot-check only |
| SDK alignment | Playwright spec Step 5 (pending CI) |
| Registry install | `.npmrc` + `^1.2.0` dependency |

---

## 8. Detailed cases (reference)

See Qase **8921** and [`scripts/qase/batches/creates-013.json`](../../scripts/qase/batches/creates-013.json). Do not duplicate full step bodies here.

---

## 9. Analytics / observability

- Playwright HTML report: `sdk/tests/playwright/node/playwright-report/`
- SDK JSON reports: `sdk/tests/playwright/node/test-results/` (local runs)
- CI uploads artifacts as `js-playwright-report` and `js-test-results`

---

## 10. Production sign-off criteria

- [x] Failure page UI matches Qase Step 3 (16/16 retrace checks PASS)
- [x] Playwright spec replaces legacy `sdk-behavior.spec.js` (single test)
- [x] SDK installed from GCP registry (`@acsbe/accessflow-sdk@1.2.0`)
- [ ] SDK audit confirms target-size violations on failure page (CI with `AF_NODE_PACKAGE_KEY`)
- [ ] CI `test-js` green with `ACCESSFLOW_NPM_REGISTRY_TOKEN` + `AF_NODE_PACKAGE_KEY`
- [ ] SDK rule violation key pinned in spec after first successful CI audit
