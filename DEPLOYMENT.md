# Deployment Guide

This project supports two deployment methods:

## 🚀 Method 1: GitHub Actions (Recommended)

This method runs tests before deploying and uses GitHub Actions for deployment.

### Using npm script:
```bash
npm run deploy
```

This will:
1. Build your application
2. Commit and push changes to trigger GitHub Actions
3. GitHub Actions will:
   - Run all Playwright tests
   - Deploy to GitHub Pages (if tests pass)

### Using GitHub CLI:
```bash
npm run deploy:trigger
```

This requires GitHub CLI (`gh`) to be installed and authenticated.

### Manual trigger:
1. Go to your repository on GitHub
2. Click **Actions** tab
3. Select **Deploy to GitHub Pages** workflow
4. Click **Run workflow** button

## 📦 Method 2: Direct Deployment (Legacy)

This method deploys directly using `gh-pages` CLI, bypassing tests:

```bash
npm run deploy:direct
```

**Note:** This method doesn't run tests before deploying.

## 🔧 Setup Requirements

### For GitHub Actions Deployment:

1. **Enable GitHub Pages:**
   - Go to **Settings** → **Pages**
   - Source: Select **GitHub Actions**

2. **Set up AccessFlow API Key:**
   - Go to **Settings** → **Secrets and variables** → **Actions**
   - Add secret: `ACCESSFLOW_API_KEY`

3. **Ensure you're on main/master branch:**
   ```bash
   git checkout main  # or master
   ```

## 📋 Deployment Process

### When you run `npm run deploy`:

1. **Build Phase:**
   - Runs `npm run build`
   - Creates production build in `build/` directory

2. **Git Phase:**
   - Checks current branch (must be main/master)
   - Commits changes (or creates empty commit if no changes)
   - Pushes to trigger GitHub Actions

3. **GitHub Actions Phase:**
   - Runs Playwright tests
   - If tests pass → Deploys to GitHub Pages
   - If tests fail → Deployment is blocked

## 🐛 Troubleshooting

### "You must be on 'main' or 'master' branch"
**Solution:** Switch to the correct branch:
```bash
git checkout main
```

### "No changes to commit"
**Solution:** The script will create an empty commit to trigger the workflow. This is normal.

### Tests fail in GitHub Actions
**Solution:**
1. Check the Actions tab for error details
2. Download test reports to see what failed
3. Fix issues and push again

### Deployment doesn't happen
**Check:**
1. Are tests passing? (Deployment only happens if tests pass)
2. Is GitHub Pages enabled?
3. Are you on the main/master branch?
4. Check the Actions tab for workflow status

## 🔐 Security Notes

- Never commit API keys directly
- Use GitHub Secrets for sensitive data
- The deploy script will commit changes - review before running

## 📊 Monitoring Deployment

After running `npm run deploy`:

1. **Check GitHub Actions:**
   - Go to **Actions** tab
   - Find the latest workflow run
   - Watch the progress

2. **View Test Results:**
   - Download `playwright-report` artifact
   - Open the HTML report locally

3. **Verify Deployment:**
   - Check your GitHub Pages URL
   - Usually: `https://[username].github.io/[repo-name]`

## 🎯 Best Practices

1. **Always test locally first:**
   ```bash
   npm run test:e2e
   ```

2. **Review changes before deploying:**
   ```bash
   git status
   git diff
   ```

3. **Use feature branches:**
   - Create PRs to test before merging to main
   - Tests run automatically on PRs

4. **Monitor deployments:**
   - Check Actions tab regularly
   - Review test reports

## 🔄 Alternative: Manual Workflow Trigger

If you prefer not to commit/push automatically:

1. Build and commit manually:
   ```bash
   npm run build
   git add .
   git commit -m "Deploy"
   git push origin main
   ```

2. Or use GitHub CLI:
   ```bash
   gh workflow run deploy.yml
   ```

---

**Need help?** Check the [GitHub Actions Setup Guide](./GITHUB_ACTIONS_SETUP.md) for more details.

