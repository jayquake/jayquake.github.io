# AccessFlow SDK Custom OutputDir - Quick Reference

## Configuration Checklist

### 1. Playwright Config (`playwright.config.js`)

```javascript
projects: [
  {
    name: "chromium-custom-output",
    use: { ...devices["Desktop Chrome"] },
    outputDir: "./custom-test-output", // ← Set custom directory here
    testMatch: /custom-output-dir\.spec\.js/,
  },
];
```

### 2. Test File

```javascript
// ✅ Initialize SDK (only apiKey)
AccessFlowSDK.init({
  apiKey: "flow-1kWinHti5fxwgaT6eOg000mgSC3uR8SbUc",
});

// ✅ Pass testInfo to constructor
test("my test", async ({ page }, testInfo) => {
  const sdk = new AccessFlowSDK(page, testInfo); // ← testInfo required!
  await sdk.audit();
});
```

### 3. Run Test

```bash
npm run test:e2e -- tests/custom-output-dir.spec.js --project=chromium-custom-output
```

## Key Points

| What              | How                                                                |
| ----------------- | ------------------------------------------------------------------ |
| **Set outputDir** | In Playwright project config (`outputDir: './custom-test-output'`) |
| **SDK reads it**  | From `testInfo.project.outputDir`                                  |
| **Pass to SDK**   | `new AccessFlowSDK(page, testInfo)` ← testInfo required            |
| **init() method** | Only accepts `apiKey`, NOT `outputDir`                             |

## Expected Output

```
test-suite/custom-test-output/
├── .accessflow-output-dir          # Marker file
├── accessFlow-raw-audits-*.jsonl   # Audit data
└── accessFlow-report-summary.json  # Summary (CI only)
```

## Common Mistakes

❌ **Wrong**: `AccessFlowSDK.init({ apiKey: "...", outputDir: "..." })`
✅ **Right**: `AccessFlowSDK.init({ apiKey: "..." })` + Playwright project config

❌ **Wrong**: `new AccessFlowSDK(page)`
✅ **Right**: `new AccessFlowSDK(page, testInfo)`

❌ **Wrong**: Running without `--project` flag
✅ **Right**: `--project=chromium-custom-output`

















