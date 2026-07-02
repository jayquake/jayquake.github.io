# MCP PRD parity — interactive-target-size — 2026-07-02

**Base URL:** http://127.0.0.1:3456

## PRD parity checks

| Check | PRD ref | Status | Live observation | Screenshot |
|-------|---------|--------|------------------|------------|
| Rule heading | Qase 8921 Step 3 | PASS | Matches UnifiedExamplePage | [ui](assets/retrace-2026-07-02/prd-failure-page-ui.png) |
| Needs Fix chip | Qase 8921 Step 3 | PASS | Matches UnifiedExamplePage | [ui](assets/retrace-2026-07-02/prd-failure-page-ui.png) |
| 10 examples chip | Qase 8921 Step 3 | PASS | Matches UnifiedExamplePage | [ui](assets/retrace-2026-07-02/prd-failure-page-ui.png) |
| Failure Examples heading | Qase 8921 Step 3 | PASS | Matches UnifiedExamplePage | [ui](assets/retrace-2026-07-02/prd-failure-page-ui.png) |
| Failure examples region | Qase 8921 Step 3 | PASS | Matches UnifiedExamplePage | [ui](assets/retrace-2026-07-02/prd-failure-page-ui.png) |
| 10 Accessibility Issue cards | Qase 8921 Step 3 | PASS | count=10 | [ui](assets/retrace-2026-07-02/prd-failure-page-ui.png) |
| Fixture: 16 by 16 css pixels button inside big button | Qase 8921 Step 3 | PASS | Matches UnifiedExamplePage | [ui](assets/retrace-2026-07-02/prd-failure-page-ui.png) |
| Fixture: 16 by 16 css pixels button next to big button | Qase 8921 Step 3 | PASS | Matches UnifiedExamplePage | [ui](assets/retrace-2026-07-02/prd-failure-page-ui.png) |
| Fixture: 16 by 16 css pixels button without enough space around it next to big button | Qase 8921 Step 3 | PASS | Matches UnifiedExamplePage | [ui](assets/retrace-2026-07-02/prd-failure-page-ui.png) |
| Fixture: equivalent exception two red buttons with same functionality both dont meet the criterion | Qase 8921 Step 3 | PASS | Matches UnifiedExamplePage | [ui](assets/retrace-2026-07-02/prd-failure-page-ui.png) |
| Fixture: links not in a sentence | Qase 8921 Step 3 | PASS | Matches UnifiedExamplePage | [ui](assets/retrace-2026-07-02/prd-failure-page-ui.png) |
| Fixture: testimonials mantra | Qase 8921 Step 3 | PASS | Matches UnifiedExamplePage | [ui](assets/retrace-2026-07-02/prd-failure-page-ui.png) |
| Fixture: text in the right links in the left | Qase 8921 Step 3 | PASS | Matches UnifiedExamplePage | [ui](assets/retrace-2026-07-02/prd-failure-page-ui.png) |
| Fixture: two undersized interactive elements intersect | Qase 8921 Step 3 | PASS | Matches UnifiedExamplePage | [ui](assets/retrace-2026-07-02/prd-failure-page-ui.png) |
| Fixture: undersized interactive element without enough space around it | Qase 8921 Step 3 | PASS | Matches UnifiedExamplePage | [ui](assets/retrace-2026-07-02/prd-failure-page-ui.png) |
| Fixture: undersized interactive elements intersect | Qase 8921 Step 3 | PASS | Matches UnifiedExamplePage | [ui](assets/retrace-2026-07-02/prd-failure-page-ui.png) |
| Success page spot-check | Qase 8921 Step 2 | PASS | Compliant chip + 13 examples on success route | — |
| SDK audit target-size violations | Qase 8921 Step 5 | BLOCKED | AccessFlowSDK: API key verification failed. AccessFlowSDK: invalid API key. | — |

## PRD deltas

1. SDK audit blocked locally — requires network access to AccessFlow API and valid `AF_NODE_PACKAGE_KEY`. Re-run in CI after secrets are configured.

## Recommended Qase / param updates

- Link Playwright spec `sdk/tests/playwright/node/tests/interactive-target-size-failure.spec.js` to Qase 8921 Step 5 automation.
- Pin SDK rule violation key once confirmed from CI audit output.