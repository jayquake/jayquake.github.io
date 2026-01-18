# Custom Output Directory Configuration Guide

This guide explains how to configure the AccessFlow SDK to use a custom output directory instead of the default `test-results` directory.

## Overview

The AccessFlow SDK uses Playwright's `testInfo.project.outputDir` to determine where to save audit reports. By configuring a custom Playwright project with a specific `outputDir`, you can control where the SDK saves its files.

## Configuration Steps

### 1. Add a Custom Project in `playwright.config.js`

Add a new project configuration with your custom `outputDir`:

```javascript
projects: [
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
  },
  {
    name: 'chromium-custom-output',
    use: { ...devices['Desktop Chrome'] },
    outputDir: './custom-test-output',  // Custom output directory
    testMatch: /custom-output-dir\.spec\.js/,  // Only run specific tests
  },
],
```

**Key Points:**
- `outputDir`: Relative path to your custom directory (relative to `test-suite/`)
- `testMatch`: Optional pattern to match specific test files
- The project name can be anything descriptive

### 2. Initialize the SDK in Your Test

The SDK's `init()` method **only accepts `apiKey`**. It does NOT accept `outputDir`:

```javascript
import { AccessFlowSDK } from "@acsbe/accessflow-sdk";

// ✅ Correct - only apiKey
AccessFlowSDK.init({
  apiKey: "flow-1kWinHti5fxwgaT6eOg000mgSC3uR8SbUc",
});

// ❌ Wrong - outputDir is not supported in init()
AccessFlowSDK.init({
  apiKey: "flow-1kWinHti5fxwgaT6eOg000mgSC3uR8SbUc",
  outputDir: "./custom-test-output",  // This will be ignored!
});
```

### 3. Pass `testInfo` to the SDK Constructor

The SDK reads the output directory from Playwright's `testInfo.project.outputDir`. You must pass `testInfo` to the SDK constructor:

```javascript
test("should save reports to custom outputDir", async ({ page }, testInfo) => {
  // ✅ Correct - pass testInfo so SDK can read outputDir
  const sdk = new AccessFlowSDK(page, testInfo);

  const report = await sdk.audit();
  // Reports will be saved to testInfo.project.outputDir
});

// ❌ Wrong - SDK won't know about custom outputDir
test("should save reports", async ({ page }) => {
  const sdk = new AccessFlowSDK(page);  // Missing testInfo!
  // Will use default 'test-results' directory
});
```

## How It Works

1. **Playwright Project Config**: The `outputDir` in the project config tells Playwright where to save test artifacts
2. **SDK Reads from testInfo**: When you pass `testInfo` to the SDK constructor, it reads `testInfo.project.outputDir`
3. **SDK Saves Files**: The SDK saves JSONL files and marker files to that directory
4. **Global Teardown**: The global teardown looks for the marker file (`.accessflow-output-dir`) to find where files were saved

## File Structure

After running tests with custom outputDir, you'll see:

```
test-suite/
└── custom-test-output/
    ├── .accessflow-output-dir          # Marker file with directory path
    ├── .last-run.json                  # Playwright metadata
    ├── accessFlow-raw-audits-*.jsonl   # Audit data files
    └── accessFlow-report-summary.json  # Summary report (if in CI)
```

## Running Tests with Custom OutputDir

### Option 1: Run with Specific Project

```bash
npm run test:e2e -- tests/custom-output-dir.spec.js --project=chromium-custom-output
```

### Option 2: Run All Tests in Project

```bash
cd test-suite
playwright test --project=chromium-custom-output
```

### Option 3: Configure Default Project

You can make the custom project the default by placing it first in the projects array, or by using Playwright's `--project` flag.

## Verification

To verify the custom outputDir is working:

1. **Check the directory exists**:
   ```bash
   ls -la test-suite/custom-test-output/
   ```

2. **Verify JSONL files are present**:
   ```bash
   ls test-suite/custom-test-output/accessFlow-raw-audits-*.jsonl
   ```

3. **Check the marker file**:
   ```bash
   cat test-suite/custom-test-output/.accessflow-output-dir
   # Should contain: /path/to/test-suite/custom-test-output
   ```

## Important Notes

1. **SDK init() doesn't accept outputDir**: The `AccessFlowSDK.init()` method only accepts `apiKey`. The output directory must be configured via Playwright's project config.

2. **testInfo is required**: To use a custom outputDir, you must pass `testInfo` to the SDK constructor. Without it, the SDK falls back to the default `test-results` directory.

3. **Global Teardown**: The global teardown looks for the marker file (`.accessflow-output-dir`) in common directories. If your custom directory is in a non-standard location, ensure the marker file is created correctly.

4. **Relative vs Absolute Paths**: The `outputDir` in Playwright config can be relative (to `test-suite/`) or absolute. Relative paths are recommended for portability.

5. **Multiple Projects**: You can have multiple projects with different output directories for different test suites.

## Example: Multiple Custom Output Directories

```javascript
projects: [
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
  },
  {
    name: 'chromium-custom-output',
    use: { ...devices['Desktop Chrome'] },
    outputDir: './custom-test-output',
    testMatch: /custom-output-dir\.spec\.js/,
  },
  {
    name: 'chromium-integration-tests',
    use: { ...devices['Desktop Chrome'] },
    outputDir: './integration-test-results',
    testMatch: /integration.*\.spec\.js/,
  },
],
```

## Troubleshooting

### Files still going to `test-results/`

- **Check**: Are you passing `testInfo` to the SDK constructor?
- **Check**: Are you running the test with the correct project? (`--project=chromium-custom-output`)
- **Check**: Does the project config have `outputDir` set correctly?

### Global teardown can't find files

- **Check**: The marker file `.accessflow-output-dir` should exist in your custom directory
- **Check**: The marker file should contain the absolute path to your custom directory
- **Check**: The global teardown looks in common directories; if your directory is non-standard, it may not find it

### Directory not created

- Playwright creates the output directory automatically when tests run
- The SDK also ensures the directory exists before writing files
- If the directory doesn't exist, check file permissions

## Summary

✅ **Do:**
- Configure `outputDir` in Playwright project config
- Pass `testInfo` to `new AccessFlowSDK(page, testInfo)`
- Use `AccessFlowSDK.init({ apiKey: "..." })` only

❌ **Don't:**
- Try to pass `outputDir` to `AccessFlowSDK.init()`
- Create SDK instance without `testInfo` if you need custom outputDir
- Forget to specify the project when running tests


















