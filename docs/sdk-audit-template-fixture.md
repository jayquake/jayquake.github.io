# SDK audit template fixture

**URL:** `https://jayquake.github.io/sdk-audit-template.html`  
**Source:** `public/sdk-audit-template.html` (copied to `build/` on `npm run build`)  
**Consumers:** accessE2E `SdkFixtureUrl`, `sdk-audit-smoke.spec.js`, SDK integration E2E (Qase 8775)

## Deliberate violations

| Element | Rule intent |
|---------|-------------|
| `<img>` without `alt` | Missing alternative text |
| `<button aria-label="">` | Empty accessible name |
| `<input>` without `<label>` | Missing form label |
| `<a href="#">link</a>` | Non-descriptive link text |

## Deploy

Push to `main`/`master`/`develop` — `ci-test-deploy.yml` builds and publishes to `gh-pages` (jayquake.github.io).

Local verify before push:

```bash
npm run build
npx serve -s build -l 3456
SDK_FIXTURE_URL=http://127.0.0.1:3456/sdk-audit-template.html \
  AF_NODE_PACKAGE_KEY=... \
  npx playwright test sdk/tests/playwright/node/tests/sdk-audit-smoke.spec.js
```

## accessE2E mirror

Keep `accessE2E/test-fixtures/sdk-audit-template.html` in sync with this file (reference copy for docs; hosted truth is here).
