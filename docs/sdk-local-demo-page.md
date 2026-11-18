# SDK local demo (static HTML)

**Page:** `public/demo/subscribe.html` → `http://localhost:3003/demo/subscribe.html`

| Spec | What |
|------|------|
| `sdk/tests/playwright/node/tests/1-new-page.spec.js` | Heading + `audit()` + gate (0 extreme, &lt; 5 high) |
| `sdk/tests/playwright/node/tests/2-subscribe-flow.spec.js` | Modal open + invalid submit + audits |

## Simple test

```bash
npm run test:e2e:playwright:sdk-local
```

Hero includes `alt="Hero image"` so CI passes; remove `alt` locally to rehearse the failing gate from the walkthrough.

## Report file

After `generateReport(..., "json")` with `testInfo` on the SDK:

**`sdk/tests/accessFlowReports/accessFlow-report.json`**

Keyed by page URL; includes `numberOfIssuesFound`, `ruleViolations` (e.g. `altText` on `main > .hero`), and `suggestedFix`.

## Results (all artifacts)

`sdk/tests/accessFlowReports/` (JSON + raw audits) · `sdk/tests/test-results/playwright-report/` (HTML)