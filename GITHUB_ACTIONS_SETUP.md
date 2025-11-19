# GitHub Actions Setup Guide

This guide will help you set up automated testing and deployment with GitHub Actions.

## 📋 Overview

**One unified GitHub Actions workflow** handles everything:

✅ **CI Testing** - Tests on Node.js 18.x and 20.x  
✅ **Playwright Tests** - Comprehensive E2E tests with AccessFlow SDK audits  
✅ **Deployment** - Automatic deployment to GitHub Pages (main/master only)  
✅ **Accessibility Reports** - Summary of AccessFlow audit results  

## 🚀 Quick Setup

### Step 1: Add AccessFlow API Key Secret

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add:
   - **Name**: `ACCESSFLOW_API_KEY`
   - **Value**: `flow-1lXjXhCBlPhX5aRR9eA0g1uFx0YiRTvE` (or your actual API key)

### Step 2: Enable GitHub Pages (for deployment)

1. Go to **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. Save the settings

### Step 3: Push to GitHub

The workflow will automatically run when you:
- Push to `main`, `master`, or `develop` branch
- Create a pull request
- Manually trigger via the Actions tab

## 📁 Workflow Structure

### `.github/workflows/ci-test-deploy.yml`

**Single unified workflow with 3 jobs:**

#### 🧪 Job 1: Test & Build
- **Purpose**: Run all tests and build the application
- **Matrix**: Tests on Node.js 18.x and 20.x
- **Steps**:
  1. Install dependencies
  2. Install Playwright browsers (Chromium)
  3. Build the application
  4. Run Playwright tests with AccessFlow SDK
  5. Upload test reports and results
  6. Upload build artifacts (Node 20.x only)

#### 🚀 Job 2: Deploy to GitHub Pages
- **Purpose**: Deploy to GitHub Pages after tests pass
- **Condition**: Only on push to `main` or `master` branch
- **Depends on**: Test & Build job must succeed
- **Steps**:
  1. Build fresh copy
  2. Configure GitHub Pages
  3. Upload and deploy to Pages
  4. Display deployment summary

#### 📊 Job 3: Accessibility Summary
- **Purpose**: Display AccessFlow audit summary
- **Condition**: Always runs (even if tests fail)
- **Steps**:
  1. Download test results
  2. Extract AccessFlow report
  3. Display summary in GitHub Actions UI

## 🔧 Configuration Details

### Test Configuration
- Tests run from the `test-suite/` directory
- Uses `test-suite/playwright.config.js` for configuration
- Dev server starts automatically on `http://localhost:3000`
- Tests run in CI mode (retries enabled, single worker)

### Environment Variables
- `CI=true` - Enables CI-specific settings
- `ACCESSFLOW_API_KEY` - AccessFlow SDK API key (from GitHub secrets)

### Concurrency
- Only one workflow runs per branch at a time
- In-progress runs are cancelled when new commits are pushed
- Saves CI minutes and provides faster feedback

### Test Reports & Artifacts

The workflow uploads multiple artifacts:

| Artifact Name | Content | Retention | When |
|---------------|---------|-----------|------|
| `playwright-report-node-18.x` | HTML test report | 30 days | Always |
| `playwright-report-node-20.x` | HTML test report | 30 days | Always |
| `test-results-node-18.x` | Raw test data | 30 days | Always |
| `test-results-node-20.x` | Raw test data | 30 days | Always |
| `build-artifacts` | Production build | 7 days | On success |

## 📊 Viewing Results

### GitHub Actions UI

1. Go to the **Actions** tab in your repository
2. Click on the workflow run
3. View the summary with:
   - ✅ Test status for each Node version
   - 📊 AccessFlow accessibility summary
   - 🚀 Deployment URL (if deployed)

### Download Test Reports

1. Scroll to the bottom of the workflow run
2. Download artifacts:
   - `playwright-report-node-20.x` - Interactive HTML test report
   - `test-results-node-20.x` - Raw test results with screenshots

### View Report Locally

```bash
# After downloading the artifact
cd test-suite
npx playwright show-report /path/to/downloaded/report
```

## 🎯 Workflow Triggers

### Automatic Triggers

| Event | Branches | Result |
|-------|----------|--------|
| Push | `main`, `master`, `develop` | Run all tests + Deploy (main/master only) |
| Pull Request | `main`, `master` | Run all tests (no deployment) |

### Manual Trigger

1. Go to **Actions** tab
2. Select **CI, Test & Deploy** workflow
3. Click **Run workflow**
4. Choose branch and click **Run workflow**

## 🐛 Troubleshooting

### Tests Fail in CI but Pass Locally

**Possible causes:**
- Missing dependencies in `package.json`
- Environment-specific issues
- Timing issues (CI is slower)

**Solutions:**
```bash
# Test locally with CI settings
CI=true npm run test:e2e

# Run tests with trace
npm run test:e2e -- --trace on
```

### AccessFlow SDK Errors

**Check:**
- ✅ Secret `ACCESSFLOW_API_KEY` is set correctly
- ✅ API key is valid and active
- ✅ SDK is initialized in test files

**Verify in workflow logs:**
```
🔍 Look for:
- "AccessFlow SDK initialized" messages
- "[AccessFlowSDK] Starting global teardown..."
- API key verification success/failure
```

### Deployment Fails

**Common issues:**
- ❌ Tests must pass before deployment
- ❌ GitHub Pages must be enabled with "GitHub Actions" source
- ❌ Build output must exist in `build/` directory

**Check:**
1. Test job status (must be ✅ green)
2. GitHub Pages settings (Source = GitHub Actions)
3. Build step output in logs

### Workflow Not Running

**Check:**
- ✅ Workflow file is in `.github/workflows/` directory
- ✅ File has `.yml` or `.yaml` extension
- ✅ YAML syntax is valid
- ✅ Branch name matches trigger conditions

## 🔐 Security Best Practices

1. ✅ **Never commit API keys** - Always use GitHub Secrets
2. ✅ **Use environment variables** - Access via `process.env.ACCESSFLOW_API_KEY`
3. ✅ **Rotate keys regularly** - Update secrets if compromised
4. ✅ **Limit secret access** - Use minimal permissions
5. ✅ **Review dependency updates** - Use Dependabot

## 📝 Customization

### Add More Node Versions

Edit `.github/workflows/ci-test-deploy.yml`:
```yaml
strategy:
  matrix:
    node-version: [18.x, 20.x, 21.x]  # Add versions here
```

### Test on Multiple Browsers

Edit `test-suite/playwright.config.js`:
```javascript
projects: [
  { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  { name: 'webkit', use: { ...devices['Desktop Safari'] } },
]
```

Then update the workflow to install all browsers:
```yaml
- name: 🎭 Install Playwright Browsers
  run: npx playwright install --with-deps
```

### Change Deployment Branch

Edit `.github/workflows/ci-test-deploy.yml`:
```yaml
if: github.event_name == 'push' && github.ref == 'refs/heads/production'
```

### Add Branch Protection

1. Go to **Settings** → **Branches**
2. Add rule for `main` branch
3. Enable:
   - ✅ Require status checks to pass
   - ✅ Require branches to be up to date
   - Select: `Test & Build (18.x)` and `Test & Build (20.x)`

## 📈 Performance Tips

### Speed Up CI

1. **Use caching** (already enabled):
   - npm dependencies are cached
   - Playwright browsers can be cached

2. **Run fewer tests in PR**:
   - Run full suite only on main branch
   - Run smoke tests on PRs

3. **Parallelize tests**:
   ```javascript
   // playwright.config.js
   workers: process.env.CI ? 2 : undefined
   ```

### Reduce Artifact Size

```yaml
- name: 📊 Upload Playwright Report
  uses: actions/upload-artifact@v4
  if: failure()  # Only upload on failure
  with:
    name: playwright-report-node-${{ matrix.node-version }}
    path: test-suite/playwright-report/
```

## 🎯 Next Steps

1. ✅ Add `ACCESSFLOW_API_KEY` secret
2. ✅ Enable GitHub Pages with "GitHub Actions" source
3. ✅ Push to GitHub and watch the unified workflow run
4. ✅ Review test reports in the Actions tab
5. ✅ Check deployment at your GitHub Pages URL
6. ✅ Add workflow status badge to README (optional)

## 📊 Workflow Status Badge

Add this to your `README.md`:

```markdown
![CI, Test & Deploy](https://github.com/YOUR_USERNAME/YOUR_REPO/workflows/CI,%20Test%20&%20Deploy/badge.svg)
```

Replace `YOUR_USERNAME` and `YOUR_REPO` with your actual values.

## 📚 Additional Resources

- [Playwright CI Documentation](https://playwright.dev/docs/ci)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [AccessFlow SDK Documentation](https://accessflow.app/docs)

## 💡 Pro Tips

- 🔍 **Use GitHub CLI** to trigger workflows: `gh workflow run ci-test-deploy.yml`
- 📊 **Enable email notifications** for failed builds in GitHub settings
- 🎯 **Use draft PRs** to test without triggering full CI
- ⚡ **Cache Playwright browsers** for faster CI (requires additional setup)
- 📈 **Monitor CI minutes** in repository Insights → Used minutes

## ❓ Common Questions

### Q: Why test on multiple Node versions?
**A:** Ensures compatibility across different Node.js versions your users might have.

### Q: Can I skip deployment on a specific commit?
**A:** Yes! Add `[skip ci]` or `[ci skip]` to your commit message.

### Q: How do I see AccessFlow audit details?
**A:** Download the `test-results-node-20.x` artifact and check `accessFlow-report-summary.json`.

### Q: Can I deploy to a custom domain?
**A:** Yes! Add a `CNAME` file to the `public/` directory with your domain.

---

**Need help?** Check the workflow logs in the Actions tab for detailed error messages and timestamps.

🎉 **Happy Testing!**
