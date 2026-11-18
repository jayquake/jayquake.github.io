# JS Playwright SDK — local runs (start here)

Everything for **local** AccessFlow SDK + Playwright on this repo, in one place.

## Run the demo test

**Working directory:** `sdk/tests`

```bash
# from repo root
npm run sdk:verify-env
npm run test:e2e:playwright:sdk-local

# or explicitly from sdk/tests
cd sdk/tests
npx playwright test -c playwright/node/playwright.config.js \
  playwright/node/tests/1-new-page.spec.js
```

**Results:** `sdk/tests/test-results/playwright/` (report: `sdk/tests/test-results/playwright-report/`)

## File map (repo root = `audit-rules/`)

| What | Path |
|------|------|
| **Demo page** | `public/demo/subscribe.html` |
| **Simple spec** | `sdk/tests/playwright/node/tests/1-new-page.spec.js` |
| **Flow spec** | `sdk/tests/playwright/node/tests/2-subscribe-flow.spec.js` |
| Other Playwright SDK specs | `sdk/tests/playwright/node/tests/*.spec.js` |
| Playwright config (port 3003, loads `.env`) | `sdk/tests/playwright/node/playwright.config.js` |
| SDK thresholds (`localCheck`) | `sdk/tests/playwright/node/accessflow.config.json` |
| Global teardown / upload | `sdk/tests/playwright/node/global-teardown.js` |
| Audit API key + registry tokens | `.env` (copy from `.env.example`) |
| npm registry auth | `.npmrc` |
| SDK package tarball | `sdk/packages/node/acsbe-accessflow-sdk-1.3.1.tgz` |
| Env check script | `scripts/verify-sdk-local-env.mjs` |
| Hosted HTML fixture (optional) | `public/sdk-audit-template.html` |
| Fake login UI ids | `src/utils/fakeLoginIds.js` |

## npm scripts (root `package.json`)

| Script | Does |
|--------|------|
| `sdk:verify-env` | Checks `.env` without printing secrets |
| `test:e2e:playwright:sdk-local` | `sdk-local-demo.spec.js` only |
| `test:e2e:playwright:sdk-smoke` | `sdk-audit-smoke.spec.js` |
| `test:e2e:playwright` | All specs under `sdk/tests/playwright/node/tests/` |

## Related lanes (not Playwright)

| Lane | Tests live in |
|------|----------------|
| JS Selenium | `sdk/tests/selenium/node/tests/` |
| Python Playwright | `sdk/tests/playwright/python/` |
| Java Playwright | `sdk/tests/playwright/java/` |

Full tree overview: [`sdk/README.md`](../../../README.md).

## Optional env

- `SDK_FIXTURE_URL` — override template URL (default: jayquake.github.io)
- `AF_NODE_PACKAGE_KEY` or `ACCESSFLOW_SDK_API_KEY` — required for audits

Long-form install notes: [`INSTALLATION.md`](./INSTALLATION.md).