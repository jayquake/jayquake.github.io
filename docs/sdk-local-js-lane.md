# AccessFlow SDK — local JS lane

**→ Start here:** [`sdk/tests/playwright/node/LOCAL.md`](../sdk/tests/playwright/node/LOCAL.md)

That file lists every path (spec, config, `.env`, package tarball, npm scripts) and how to run `sdk-local-demo.spec.js`.

Refresh prod SDK tarball (when registry credentials change):

```bash
set -a && source .env && set +a
npm pack @acsbe/accessflow-sdk@1.3.1 --pack-destination sdk/packages/node \
  --registry "https://${GCP_SDK_NPM_REGISTRY_URL}/"
npm install --legacy-peer-deps
```

CI (`.github/workflows/ci-test-deploy.yml`):

- **Active:** `test-js` (Playwright) — `fake-login-flow.spec.js` + `1-new-page.spec.js`
- **Muted:** `test-js-selenium` (`if: false`), Python/Java lanes (commented)
- **Deploy:** runs independently of test lanes on `main`/`master`