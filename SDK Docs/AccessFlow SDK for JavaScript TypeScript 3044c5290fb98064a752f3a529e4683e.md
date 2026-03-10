# AccessFlow SDK for JavaScript / TypeScript

# 

Professional accessibility testing for JavaScript and TypeScript applications using Playwright.

AccessFlow SDK enables engineering teams to automatically detect **WCAG 2.1 accessibility issues** directly within automated test suites. Designed for modern CI/CD workflows, it ensures accessibility validation is continuous, enforceable, and scalable.

---

# Overview

With AccessFlow SDK for JavaScript / TypeScript, you can:

- ✅ Automatically detect WCAG 2.1 violations (A, AA, AAA)
- ✅ Integrate accessibility checks directly into Playwright tests
- ✅ Generate structured reports with severity levels and selectors
- ✅ Aggregate results across test runs
- ✅ Automatically upload reports in CI/CD environments
- ✅ Enforce accessibility quality gates per build
- ✅ Use full TypeScript type support

---

# Prerequisites

You will receive the following from the AccessFlow team:

| Item | Purpose |
| --- | --- |
| **NPM Install Token** | Install the SDK package (double base64-encoded) |
| **NPM Registry URL** | Private NPM registry location |
| **SDK API Key** | Authenticate audit requests at runtime |

> The NPM Install Token is used for installation.
> 
> 
> The SDK API Key is used during test execution.
> 

---

# Installation

## Option 1 — Install from Private Package Registry (Recommended)

### Step 1: Configure `.npmrc`

Create a `.npmrc` file in your project root:

```
@acsbe:registry=https://NPM_REGISTRY_URL/
//NPM_REGISTRY_URL/:username=_json_key_base64
//NPM_REGISTRY_URL/:_password=NPM_INSTALL_TOKEN
//NPM_REGISTRY_URL/:always-auth=true
```

Replace:

- `NPM_REGISTRY_URL`
- `NPM_INSTALL_TOKEN`

with the credentials provided by AccessFlow.

### Why Double Base64?

npm automatically decodes the `_password` field once before sending it to the registry.

Because the registry expects a base64-encoded key, the token must be encoded twice:

```
base64(base64(json_key))
```

The AccessFlow team provides the token pre-encoded — paste it as-is.

---

### Step 2: Install the SDK

```
npm install -D @acsbe/accessflow-sdk
```

---

## Option 2 — Install from Local Package File

If you received a `.tgz` file directly:

```
npm install -D /path/to/acsbe-accessflow-sdk.tgz
```

---

# Quick Start

## 1️⃣ Configure SDK API Key

### Recommended: Environment Variable

```
ACCESSFLOW_SDK_API_KEY=your-api-key
```

The SDK automatically reads this value — no initialization required.

For CI/CD:

```
env:
  ACCESSFLOW_SDK_API_KEY: ${{ secrets.ACCESSFLOW_SDK_API_KEY }}
```

---

### Optional: Initialize Programmatically

```
import AccessFlowSDK from '@acsbe/accessflow-sdk';

AccessFlowSDK.init({
  apiKey: process.env.ACCESSFLOW_SDK_API_KEY!,
});
```

Call this once before tests execute.

---

## 2️⃣ Basic Usage Example

```
import { test, expect } from '@playwright/test';
import AccessFlowSDK from '@acsbe/accessflow-sdk';

test('homepage accessibility', async ({ page }) => {
  const sdk = new AccessFlowSDK(page);

  await page.goto('https://example.com');

  const audits = await sdk.audit();
  const report = await sdk.generateReport(audits);

  console.log('Issues found:', report.numberOfIssuesFound);

  expect(report.numberOfIssuesFound.extreme).toBe(0);
  expect(report.numberOfIssuesFound.high).toBeLessThanOrEqual(5);
});
```

---

# Playwright Integration

## With Playwright Test

```
import { test, expect } from '@playwright/test';
import AccessFlowSDK from '@acsbe/accessflow-sdk';

test('accessibility check', async ({ page }) => {
  const sdk = new AccessFlowSDK(page);

  await page.goto('https://example.com');

  const audits = await sdk.audit();
  const report = await sdk.generateReport(audits);

  expect(report.numberOfIssuesFound.extreme).toBe(0);
});
```

---

## With Global Setup / Teardown

In `playwright.config.ts`:

```
export default defineConfig({
  globalSetup: './global-setup.ts',
  globalTeardown: './global-teardown.ts',
});
```

In CI environments (`CI=true`), the SDK automatically:

- Aggregates reports
- Uploads results
- Applies configured thresholds

---

# API Reference

## `AccessFlowSDK.init(options)`

Initialize SDK configuration (optional).

```
AccessFlowSDK.init({ apiKey: 'your-api-key' });
```

---

## `new AccessFlowSDK(page, testInfo?, options?)`

Create an SDK instance.

**Parameters:**

- `page` — Playwright Page object
- `testInfo` (optional) — Playwright TestInfo
- `options` (optional) — SDK configuration

```
const sdk = new AccessFlowSDK(page);
```

---

## `await sdk.audit()`

Runs accessibility audit on the current page.

```
const audits = await sdk.audit();
```

Returns audit results including:

- Severity levels
- Rule violations
- WCAG references
- Element selectors

---

## `await sdk.generateReport(audits)`

Generates a structured summary report.

```
const report = await sdk.generateReport(audits);

console.log(report.numberOfIssuesFound);
// { extreme: 0, high: 5, medium: 8, low: 12 }
```

Report includes:

- `numberOfIssuesFound`
- `ruleViolations`
- Additional metadata

---

# CI/CD Integration

In CI pipelines, configure two secrets:

| Secret | Purpose |
| --- | --- |
| `ACCESSFLOW_NPM_REGISTRY_TOKEN` | Install SDK package |
| `ACCESSFLOW_SDK_API_KEY` | Authenticate audits |

Your `.npmrc` should reference the token via environment variable:

```
//NPM_REGISTRY_URL/:_password=${ACCESSFLOW_NPM_REGISTRY_TOKEN}
```

---

## Example: GitHub Actions

```
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
        env:
          ACCESSFLOW_NPM_REGISTRY_TOKEN: ${{ secrets.ACCESSFLOW_NPM_REGISTRY_TOKEN }}
      - run: npx playwright install chromium
      - run: npm test
        env:
          ACCESSFLOW_SDK_API_KEY: ${{ secrets.ACCESSFLOW_SDK_API_KEY }}
```

---

# Configuration

Optional configuration file (`sdk.config.ts`):

```
import { SDKConfig } from '@acsbe/accessflow-sdk';

const config: SDKConfig = {
  apiKey: process.env.ACCESSFLOW_SDK_API_KEY,
  uploadEnabled: true,
  outputDir: './accessibility-reports',
  wcagLevel: 'AA',
};

export default config;
```

---

# Environment Variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `ACCESSFLOW_SDK_API_KEY` | Yes | Runtime authentication |
| `ACCESSFLOW_NPM_REGISTRY_TOKEN` | CI only | Install SDK |
| `CI` | Auto | Enables upload behavior |
| `ACCESSFLOW_UPLOAD_ENABLED` | Optional | Override upload behavior |
| `ACCESSFLOW_OUTPUT_DIR` | Optional | Custom report directory |

---

# TypeScript Support

The SDK includes full type definitions:

```
import AccessFlowSDK, {
  IAudits,
  AuditReport,
  SDKConfig
} from '@acsbe/accessflow-sdk';

const audits: IAudits = await sdk.audit();
const report: AuditReport = await sdk.generateReport(audits);
```

---

# Troubleshooting

### API Key Not Found

```
console.log(process.env.ACCESSFLOW_SDK_API_KEY);
```

Or initialize explicitly:

```
AccessFlowSDK.init({ apiKey: 'your-api-key' });
```

---

### Reports Not Uploading

- Ensure `CI=true` in CI environment
- Confirm API key is valid
- Check upload configuration flags

---

### Playwright Issues

Ensure browsers are installed:

```
npx playwright install
```

---

# License

ISC