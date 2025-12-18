# AccessFlow SDK Test Suite

This directory contains the Playwright test suite for accessibility testing using the AccessFlow SDK.

## 📚 Documentation

### Getting Started

- **[Installation Guide](./INSTALLATION.md)** - Complete installation and setup instructions
- **[Installation Quick Reference](./INSTALLATION_QUICK_REF.md)** - Quick setup checklist

### Configuration

- **[Custom OutputDir Guide](./CUSTOM_OUTPUT_DIR.md)** - How to configure custom output directories
- **[Custom OutputDir Quick Reference](./CUSTOM_OUTPUT_DIR_QUICK_REF.md)** - Quick reference for custom outputDir

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
npx playwright install chromium
```

### 2. Configure API Key

Set your AccessFlow API key:

```javascript
// In your test file
AccessFlowSDK.init({
  apiKey: "flow-your-api-key-here",
});
```

Or use environment variables:

```bash
export ACCESSFLOW_API_KEY=flow-your-api-key-here
```

### 3. Run Tests

```bash
npm run test:e2e              # Run all tests
npm run test:e2e:ui          # Run with UI mode
npm run test:e2e:headed      # Run in headed mode (see browser)
```

## 📁 Directory Structure

```
test-suite/
├── README.md                    # This file
├── INSTALLATION.md              # Installation guide
├── INSTALLATION_QUICK_REF.md    # Quick installation reference
├── CUSTOM_OUTPUT_DIR.md         # Custom outputDir guide
├── CUSTOM_OUTPUT_DIR_QUICK_REF.md # Custom outputDir quick reference
├── playwright.config.js         # Playwright configuration
├── global-teardown.js           # SDK global teardown
├── tests/                       # Test files
│   ├── search.spec.js
│   ├── graphics-audit.spec.js
│   ├── custom-output-dir.spec.js
│   └── ...
├── test-results/                # Default test results (Playwright)
└── custom-test-output/          # Custom output directory (if configured)
```

## 📝 Example Test

```javascript
import { AccessFlowSDK } from "@acsbe/accessflow-sdk";
import { test, expect } from "@playwright/test";

AccessFlowSDK.init({
  apiKey: "flow-your-api-key-here",
});

test("accessibility audit", async ({ page }, testInfo) => {
  await page.goto("/");

  const sdk = new AccessFlowSDK(page, testInfo);
  const report = await sdk.audit();

  expect(report).toBeDefined();
});
```

## 🔧 Configuration Files

### `playwright.config.js`

Main Playwright configuration. Defines:
- Test directory
- Projects (browsers)
- Global teardown
- Web server settings

### `global-teardown.js`

Handles SDK cleanup and report generation after all tests complete.

## 📊 Test Results

Test results are saved to:
- **Default**: `test-results/` directory
- **Custom**: As configured in Playwright project `outputDir`

Results include:
- `accessFlow-raw-audits-*.jsonl` - Raw audit data
- `accessFlow-report-summary.json` - Summary report (CI only)
- `.accessflow-output-dir` - Marker file with output directory path

## 🎯 Common Tasks

### Run Specific Test

```bash
npm run test:e2e -- tests/search.spec.js
```

### Run with Custom OutputDir

```bash
npm run test:e2e -- tests/custom-output-dir.spec.js --project=chromium-custom-output
```

### View Test Report

```bash
npm run test:e2e:report
```

### Debug Test

```bash
npm run test:e2e:debug
```

## 🔑 API Key Setup

### Local Development

Create `.env` file:

```bash
ACCESSFLOW_API_KEY=flow-your-api-key-here
```

### CI/CD

Add as secret in your CI/CD platform:

**GitHub Actions:**
```yaml
env:
  ACCESSFLOW_API_KEY: ${{ secrets.ACCESSFLOW_API_KEY }}
```

## 📖 Additional Resources

- [AccessFlow SDK Documentation](https://accessflow.accessibe.com/docs)
- [Playwright Documentation](https://playwright.dev)
- [GitHub Actions Setup](../docs/setup/GITHUB_ACTIONS_SETUP.md)
- [GitHub Packages Setup](../docs/setup/GITHUB_PACKAGES_SETUP.md)

## 🐛 Troubleshooting

### Installation Issues

See [Installation Guide](./INSTALLATION.md#troubleshooting)

### Configuration Issues

See [Custom OutputDir Guide](./CUSTOM_OUTPUT_DIR.md#troubleshooting)

### Common Errors

| Error | Solution |
|-------|----------|
| Module not found | Run `npm install` |
| Browser not found | Run `npx playwright install` |
| Invalid API key | Check key format: `flow-...` |
| No reports generated | Check `global-teardown.js` |

## 📋 Checklist

Before running tests:

- [ ] SDK installed (`npm install`)
- [ ] Playwright browsers installed (`npx playwright install`)
- [ ] API key configured
- [ ] `playwright.config.js` configured
- [ ] `global-teardown.js` exists
- [ ] Test files created

## 🤝 Contributing

When adding new tests:

1. Follow existing test patterns
2. Pass `testInfo` to SDK constructor
3. Use descriptive test names
4. Add comments for complex logic
5. Update documentation if needed

## 📄 License

See main project LICENSE file.

---

**Need help?** Check the documentation files above or review existing test examples.



