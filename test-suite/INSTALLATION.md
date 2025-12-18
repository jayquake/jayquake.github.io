# AccessFlow SDK Installation Guide

This guide covers how to install and set up the AccessFlow SDK for Playwright testing.

## Prerequisites

Before installing the AccessFlow SDK, ensure you have:

- **Node.js** version 18.x or higher
- **npm** or **yarn** package manager
- **Playwright** installed (will be installed as a dependency)
- An **AccessFlow API key** (obtain from your AccessFlow account)

## Installation Methods

### Method 1: Install from Local Tarball (Current Method)

If you have a local `.tgz` file of the SDK:

1. **Place the tarball in your project root:**
   ```bash
   # Example: acsbe-accessflow-sdk-1.0.4.tgz
   ```

2. **Add to `package.json` devDependencies:**
   ```json
   {
     "devDependencies": {
       "@acsbe/accessflow-sdk": "file:acsbe-accessflow-sdk-1.0.4.tgz",
       "@playwright/test": "^1.56.1",
       "playwright": "^1.56.1"
     }
   }
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

### Method 2: Install from npm Registry

If the SDK is published to npm:

```bash
npm install --save-dev @acsbe/accessflow-sdk @playwright/test playwright
```

### Method 3: Install from GitHub Packages

If the SDK is in GitHub Packages:

1. **Create/update `.npmrc` file in your project root:**
   ```
   @acsbe:registry=https://npm.pkg.github.com
   //npm.pkg.github.com/:_authToken=${ACSBE_TOKEN}
   ```

2. **Set up authentication:**
   - Create a GitHub Personal Access Token with `read:packages` permission
   - Add it as an environment variable or in your CI/CD secrets
   - See [GitHub Packages Setup Guide](../docs/setup/GITHUB_PACKAGES_SETUP.md) for details

3. **Install:**
   ```bash
   npm install --save-dev @acsbe/accessflow-sdk @playwright/test playwright
   ```

## Verify Installation

After installation, verify the SDK is installed correctly:

```bash
# Check if package is installed
npm list @acsbe/accessflow-sdk

# Should show something like:
# └── @acsbe/accessflow-sdk@1.0.4
```

## Project Structure

After installation, your project structure should look like:

```
your-project/
├── package.json
├── package-lock.json
├── node_modules/
│   └── @acsbe/
│       └── accessflow-sdk/
├── test-suite/
│   ├── playwright.config.js
│   ├── global-teardown.js
│   └── tests/
│       └── your-test.spec.js
└── acsbe-accessflow-sdk-1.0.4.tgz  # (if using local tarball)
```

## Initial Setup

### 1. Install Playwright Browsers

After installing dependencies, install Playwright browsers:

```bash
npx playwright install chromium
```

Or install all browsers:

```bash
npx playwright install
```

### 2. Configure Playwright

Create or update `test-suite/playwright.config.js`:

```javascript
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  globalTeardown: require.resolve('./global-teardown'),
  use: {
    baseURL: 'http://localhost:3000',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

### 3. Set Up Global Teardown

Create `test-suite/global-teardown.js`:

```javascript
const accessFlowSdkGlobalTeardown =
  require("@acsbe/accessflow-sdk/dist/src/playwright/global-teardown").default;

async function globalTeardown() {
  await accessFlowSdkGlobalTeardown();
  console.log("Global teardown completed");
}

module.exports = globalTeardown;
```

### 4. Create Your First Test

Create `test-suite/tests/example.spec.js`:

```javascript
import { AccessFlowSDK } from "@acsbe/accessflow-sdk";
import { test, expect } from "@playwright/test";

// Initialize SDK with your API key
AccessFlowSDK.init({
  apiKey: "flow-your-api-key-here",
});

test("example accessibility audit", async ({ page }, testInfo) => {
  await page.goto("/");

  // Create SDK instance with testInfo
  const sdk = new AccessFlowSDK(page, testInfo);

  // Run accessibility audit
  const report = await sdk.audit();

  expect(report).toBeDefined();
});
```

### 5. Get Your API Key

1. Log in to your AccessFlow account
2. Navigate to API Keys section
3. Create a new API key or copy an existing one
4. Format: `flow-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

**Important**: Never commit API keys to version control. Use environment variables or secrets.

## Environment Variables

### Local Development

Create a `.env` file (add to `.gitignore`):

```bash
ACCESSFLOW_API_KEY=flow-your-api-key-here
```

Then use in your test:

```javascript
import dotenv from 'dotenv';
dotenv.config();

AccessFlowSDK.init({
  apiKey: process.env.ACCESSFLOW_API_KEY,
});
```

### CI/CD

Add the API key as a secret in your CI/CD platform:

**GitHub Actions:**
```yaml
env:
  ACCESSFLOW_API_KEY: ${{ secrets.ACCESSFLOW_API_KEY }}
```

**Other platforms:**
- Set as environment variable in your CI/CD configuration
- Use the platform's secret management system

## Package.json Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "test:e2e": "cd test-suite && playwright test",
    "test:e2e:ui": "cd test-suite && playwright test --ui",
    "test:e2e:headed": "cd test-suite && playwright test --headed",
    "test:e2e:debug": "cd test-suite && playwright test --debug",
    "test:e2e:report": "cd test-suite && playwright show-report"
  }
}
```

## Run Your First Test

```bash
# Run all tests
npm run test:e2e

# Run with UI mode
npm run test:e2e:ui

# Run in headed mode (see browser)
npm run test:e2e:headed

# Run specific test file
npm run test:e2e -- tests/example.spec.js
```

## Troubleshooting

### Installation Issues

**Error: "Cannot find module '@acsbe/accessflow-sdk'"**
- Run `npm install` again
- Check that the package is in `package.json` devDependencies
- Verify `node_modules/@acsbe/accessflow-sdk` exists

**Error: "401 Unauthorized" (GitHub Packages)**
- Check your GitHub token has `read:packages` permission
- Verify `.npmrc` is configured correctly
- See [GitHub Packages Setup Guide](../docs/setup/GITHUB_PACKAGES_SETUP.md)

**Error: "ENOENT: no such file or directory" (local tarball)**
- Verify the `.tgz` file exists in project root
- Check the file path in `package.json` matches the actual filename
- Ensure the file is not corrupted

### Runtime Issues

**Error: "Invalid API key"**
- Verify your API key is correct
- Check the API key format starts with `flow-`
- Ensure the API key hasn't expired

**Error: "Cannot read property 'outputDir' of undefined"**
- Make sure you're passing `testInfo` to the SDK constructor
- Check that Playwright project config has `outputDir` set (if using custom outputDir)

**Error: "Playwright browser not found"**
- Run `npx playwright install chromium`
- Or `npx playwright install` for all browsers

### Configuration Issues

**Tests run but no reports generated**
- Check `global-teardown.js` is configured correctly
- Verify `playwright.config.js` has `globalTeardown` set
- Check that `testInfo` is passed to SDK constructor

**Reports saved to wrong directory**
- Verify Playwright project `outputDir` configuration
- Ensure `testInfo` is passed to SDK constructor
- See [Custom OutputDir Guide](./CUSTOM_OUTPUT_DIR.md)

## Next Steps

After installation:

1. ✅ **Read the [Custom OutputDir Guide](./CUSTOM_OUTPUT_DIR.md)** - Learn how to configure custom output directories
2. ✅ **Check the [Quick Reference](./CUSTOM_OUTPUT_DIR_QUICK_REF.md)** - Quick tips and common patterns
3. ✅ **Review example tests** - Look at existing test files in `test-suite/tests/`
4. ✅ **Set up CI/CD** - See [GitHub Actions Setup](../docs/setup/GITHUB_ACTIONS_SETUP.md)

## Version Compatibility

| SDK Version | Playwright Version | Node.js Version |
|-------------|-------------------|----------------|
| 1.0.4       | ^1.56.1           | >=18.x         |

## Support

For issues or questions:

1. Check the troubleshooting section above
2. Review the SDK documentation
3. Check existing test examples
4. Contact AccessFlow support

## Quick Installation Checklist

- [ ] Node.js 18+ installed
- [ ] SDK package installed (`npm install`)
- [ ] Playwright browsers installed (`npx playwright install`)
- [ ] `playwright.config.js` configured
- [ ] `global-teardown.js` created
- [ ] API key obtained and configured
- [ ] First test created and passing
- [ ] CI/CD configured (if applicable)

---

**Ready to start?** Create your first test and run `npm run test:e2e`!



