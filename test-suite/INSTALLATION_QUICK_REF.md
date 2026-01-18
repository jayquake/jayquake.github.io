# AccessFlow SDK Installation - Quick Reference

## Prerequisites

- Node.js 18+
- npm or yarn
- AccessFlow API key

## Installation

### From Local Tarball

```bash
# 1. Add to package.json
"devDependencies": {
  "@acsbe/accessflow-sdk": "file:acsbe-accessflow-sdk-1.0.4.tgz",
  "@playwright/test": "^1.56.1",
  "playwright": "^1.56.1"
}

# 2. Install
npm install

# 3. Install browsers
npx playwright install chromium
```

### From npm

```bash
npm install --save-dev @acsbe/accessflow-sdk @playwright/test playwright
npx playwright install chromium
```

### From GitHub Packages

```bash
# 1. Create .npmrc
echo "@acsbe:registry=https://npm.pkg.github.com" > .npmrc
echo "//npm.pkg.github.com/:_authToken=\${ACSBE_TOKEN}" >> .npmrc

# 2. Set token
export ACSBE_TOKEN=your-token-here

# 3. Install
npm install --save-dev @acsbe/accessflow-sdk @playwright/test playwright
```

## Quick Setup

### 1. Playwright Config (`test-suite/playwright.config.js`)

```javascript
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  globalTeardown: require.resolve('./global-teardown'),
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
```

### 2. Global Teardown (`test-suite/global-teardown.js`)

```javascript
const accessFlowSdkGlobalTeardown =
  require("@acsbe/accessflow-sdk/dist/src/playwright/global-teardown").default;

async function globalTeardown() {
  await accessFlowSdkGlobalTeardown();
}

module.exports = globalTeardown;
```

### 3. Test File (`test-suite/tests/example.spec.js`)

```javascript
import { AccessFlowSDK } from "@acsbe/accessflow-sdk";
import { test } from "@playwright/test";

AccessFlowSDK.init({
  apiKey: "flow-your-api-key-here",
});

test("audit test", async ({ page }, testInfo) => {
  await page.goto("/");
  const sdk = new AccessFlowSDK(page, testInfo);
  const report = await sdk.audit();
});
```

## Package.json Scripts

```json
{
  "scripts": {
    "test:e2e": "cd test-suite && playwright test",
    "test:e2e:ui": "cd test-suite && playwright test --ui",
    "test:e2e:headed": "cd test-suite && playwright test --headed"
  }
}
```

## Run Tests

```bash
npm run test:e2e              # Run all tests
npm run test:e2e:ui          # UI mode
npm run test:e2e:headed      # See browser
```

## Environment Variables

### Local (.env)

```bash
ACCESSFLOW_API_KEY=flow-your-key-here
```

### CI/CD (GitHub Actions)

```yaml
env:
  ACCESSFLOW_API_KEY: ${{ secrets.ACCESSFLOW_API_KEY }}
```

## Common Issues

| Issue | Solution |
|-------|----------|
| Module not found | Run `npm install` |
| Browser not found | Run `npx playwright install` |
| 401 Unauthorized | Check GitHub token permissions |
| Invalid API key | Verify key format: `flow-...` |
| No reports generated | Check `global-teardown.js` config |

## Verification

```bash
# Check installation
npm list @acsbe/accessflow-sdk

# Run test
npm run test:e2e -- tests/example.spec.js
```

## Checklist

- [ ] Node.js 18+ installed
- [ ] SDK installed (`npm install`)
- [ ] Playwright browsers installed
- [ ] `playwright.config.js` created
- [ ] `global-teardown.js` created
- [ ] API key configured
- [ ] First test created
- [ ] Test passes

---

**Full guide**: See [INSTALLATION.md](./INSTALLATION.md)


















