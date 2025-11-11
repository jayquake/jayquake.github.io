# GitHub Actions Workflows

This directory contains GitHub Actions workflows for automated testing and deployment.

## Workflows

### 1. `playwright-tests.yml`
Runs Playwright tests on:
- Push to `main` or `master` branches
- Pull requests to `main` or `master`
- Manual trigger via `workflow_dispatch`

**Features:**
- Installs dependencies
- Installs Playwright browsers
- Builds the application
- Runs all Playwright tests
- Uploads test reports and results as artifacts

### 2. `deploy.yml`
Runs tests and deploys to GitHub Pages on:
- Push to `main` or `master` branches
- Manual trigger via `workflow_dispatch`

**Features:**
- Runs all tests first (deployment only happens if tests pass)
- Builds the application
- Deploys to GitHub Pages

## Required Secrets

To use the AccessFlow SDK in tests, you need to set up a GitHub secret:

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `ACCESSFLOW_API_KEY`
5. Value: Your AccessFlow API key (e.g., `flow-1qS6Yt2KyK6fZaRMQJg0J7DdOmeIDKnw`)

## GitHub Pages Setup

To enable GitHub Pages deployment:

1. Go to **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. The workflow will automatically deploy after tests pass

## Viewing Test Results

After a workflow run:
1. Go to the **Actions** tab in your repository
2. Click on the workflow run
3. Download the `playwright-report` artifact to view the HTML test report
4. Download the `test-results` artifact to see detailed test results

## Local Testing

To test the workflows locally before pushing:

```bash
# Run tests locally (same as CI)
npm run test:e2e

# Run with UI
npm run test:e2e:ui

# Run specific test suite
npm run test:e2e:search
```

## Troubleshooting

### Tests fail in CI but pass locally
- Ensure all dependencies are in `package.json` (not just `package-lock.json`)
- Check that `test-suite/playwright.config.js` has proper CI settings
- Verify the dev server starts correctly (check `webServer` config)

### AccessFlow SDK errors
- Verify `ACCESSFLOW_API_KEY` secret is set correctly
- Check that the API key is valid and has proper permissions
- Ensure the SDK is properly initialized in test files

### Deployment fails
- Check that tests pass first (deployment only runs after successful tests)
- Verify GitHub Pages is enabled in repository settings
- Check that the build output is in the `build/` directory

