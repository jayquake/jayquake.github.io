# GitHub Actions Setup Guide

This guide will help you set up automated testing and deployment with GitHub Actions.

## 📋 Overview

Three GitHub Actions workflows have been created:

1. **`ci.yml`** - Runs tests on multiple Node.js versions (for PRs and pushes)
2. **`playwright-tests.yml`** - Comprehensive test suite on all browsers
3. **`deploy.yml`** - Runs tests then deploys to GitHub Pages (only on main/master)

## 🚀 Quick Setup

### Step 1: Add AccessFlow API Key Secret

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add:
   - **Name**: `ACCESSFLOW_API_KEY`
   - **Value**: `flow-1qS6Yt2KyK6fZaRMQJg0J7DdOmeIDKnw` (or your actual API key)

### Step 2: Enable GitHub Pages (for deployment)

1. Go to **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. Save the settings

### Step 3: Push to GitHub

The workflows will automatically run when you:
- Push to `main` or `master` branch
- Create a pull request
- Manually trigger via the Actions tab

## 📁 Workflow Files

### `.github/workflows/ci.yml`
- **Purpose**: Fast CI checks on multiple Node.js versions
- **Triggers**: Push/PR to main, master, or develop
- **Runs**: Tests on Chromium only (faster)
- **Matrix**: Tests on Node.js 18.x and 20.x

### `.github/workflows/playwright-tests.yml`
- **Purpose**: Comprehensive testing on all browsers
- **Triggers**: Push/PR to main/master, manual trigger
- **Runs**: Full test suite on Chromium, Firefox, and WebKit
- **Artifacts**: Test reports and results

### `.github/workflows/deploy.yml`
- **Purpose**: Deploy to GitHub Pages after tests pass
- **Triggers**: Push to main/master, manual trigger
- **Steps**:
  1. Run all tests
  2. Build application
  3. Deploy to GitHub Pages (only if tests pass)

## 🔧 Configuration Details

### Test Configuration
- Tests run from the `test-suite/` directory
- Uses `test-suite/playwright.config.js` for configuration
- Dev server starts automatically on `http://localhost:3000`
- Tests run in CI mode (retries enabled, single worker)

### Environment Variables
- `CI=true` - Enables CI-specific Playwright settings
- `ACCESSFLOW_API_KEY` - AccessFlow SDK API key (from GitHub secrets)

### Test Reports
- HTML reports uploaded as artifacts
- Test results uploaded for debugging
- Reports retained for 30 days (7 days for CI workflow)

## 📊 Viewing Results

### After a Workflow Run:

1. Go to the **Actions** tab in your repository
2. Click on the workflow run you want to view
3. Click on the job (e.g., "test")
4. Download artifacts:
   - `playwright-report` - Interactive HTML test report
   - `test-results` - Detailed test results and screenshots

### Viewing Test Reports Locally:

```bash
# After downloading the artifact
cd test-suite
npx playwright show-report
```

## 🐛 Troubleshooting

### Tests Fail in CI but Pass Locally

**Possible causes:**
- Missing dependencies in `package.json`
- Environment-specific issues
- Timing issues (add more waits)

**Solutions:**
```bash
# Ensure all dependencies are installed
npm ci

# Test locally with CI settings
CI=true npm run test:e2e
```

### AccessFlow SDK Errors

**Check:**
- Secret is set correctly: `ACCESSFLOW_API_KEY`
- API key is valid
- SDK is properly initialized in test files

**Verify in workflow logs:**
- Look for "AccessFlow SDK initialized" messages
- Check for API key errors

### Deployment Fails

**Common issues:**
- Tests must pass before deployment
- GitHub Pages must be enabled
- Build output must be in `build/` directory

**Check:**
1. Test job status (must be green)
2. GitHub Pages settings
3. Build output location

## 🔐 Security Best Practices

1. **Never commit API keys** - Always use GitHub Secrets
2. **Use environment variables** - Tests read from `process.env.ACCESSFLOW_API_KEY`
3. **Rotate keys regularly** - Update secrets if compromised
4. **Limit secret access** - Only use secrets in necessary workflows

## 📝 Customization

### Change Test Browsers

Edit `test-suite/playwright.config.js`:
```javascript
projects: [
  { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  // Add or remove browsers here
]
```

### Change Workflow Triggers

Edit workflow files:
```yaml
on:
  push:
    branches: [ main, your-branch ]
  pull_request:
    branches: [ main ]
```

### Add More Test Suites

Add new test commands in `package.json`:
```json
"test:e2e:new-suite": "cd test-suite && playwright test tests/new-suite.spec.js"
```

## 🎯 Next Steps

1. ✅ Add `ACCESSFLOW_API_KEY` secret
2. ✅ Enable GitHub Pages
3. ✅ Push to GitHub and watch workflows run
4. ✅ Review test reports
5. ✅ Monitor deployment status

## 📚 Additional Resources

- [Playwright CI Documentation](https://playwright.dev/docs/ci)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

## 💡 Tips

- **Use workflow badges** in your README to show test status
- **Set up branch protection** to require tests to pass before merging
- **Review test reports regularly** to catch issues early
- **Use manual triggers** for testing workflow changes

---

**Need help?** Check the workflow logs in the Actions tab for detailed error messages.

