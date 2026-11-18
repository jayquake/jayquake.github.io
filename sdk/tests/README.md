# SDK test suites

Run Playwright from **this directory** (`sdk/tests`). Results go to **`test-results/`** here.

## Playwright (JS)

```bash
cd sdk/tests

# All specs
npx playwright test -c playwright/node/playwright.config.js

# SDK local demo
npx playwright test -c playwright/node/playwright.config.js \
  playwright/node/tests/sdk-local-demo.spec.js

# HTML report
npx playwright show-report test-results/playwright-report
```

From repo root you can use the same via `npm run test:e2e:playwright:sdk-local` (also `cd`s into `sdk/tests`).

## Output layout

All under **`sdk/tests/test-results/`**:

| Path | Contents |
|------|----------|
| `accessFlowReports/` | Demo specs: **`accessFlow-report.json`**, raw audits (`1-new-page`, `2-subscribe-flow`) |
| `test-results/playwright/` | Other Playwright specs |
| `playwright-report/` | HTML report |
| `playwright-custom/` | Custom outputDir project only |

Selenium (Jest) lanes keep `selenium/node/test-results/` for now.

Config: `playwright/node/playwright.config.js` — loads repo root `.env` and starts the app on port **3003**.