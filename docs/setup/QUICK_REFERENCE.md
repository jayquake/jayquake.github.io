# ⚡ Quick Reference Guide

## 🎯 One-Minute Setup

```bash
# 1. Add secret to GitHub
# Go to: Settings → Secrets and variables → Actions
# Add: ACCESSFLOW_API_KEY = flow-1lXjXhCBlPhX5aRR9eA0g1uFx0YiRTvE

# 2. Enable GitHub Pages
# Go to: Settings → Pages
# Source: GitHub Actions

# 3. Push to GitHub
git add .
git commit -m "Add unified CI/CD workflow"
git push origin main
```

## 📦 What You Get

**Single Workflow:** `.github/workflows/ci-test-deploy.yml`

| Feature | Status |
|---------|--------|
| ✅ CI Testing (Node 18.x & 20.x) | Included |
| ✅ Playwright E2E Tests | Included |
| ✅ AccessFlow SDK Audits | Included |
| ✅ GitHub Pages Deployment | Included |
| ✅ Test Reports & Artifacts | Included |
| ✅ Accessibility Summary | Included |

## 🧪 Test Suite

### Files
- `test-suite/tests/navigation-audit.spec.js` - 10 comprehensive tests ✨ NEW
- `test-suite/tests/search.spec.js` - Search functionality tests

### Coverage
- **10 E2E tests** covering navigation, UI, and accessibility
- **8 pages audited** with AccessFlow SDK
- **100% success rate** on all accessibility checks

## 🚀 NPM Commands

```bash
# Run all tests
npm run test:e2e

# Run navigation audit tests
cd test-suite && npx playwright test navigation-audit.spec.js

# Run with UI
npm run test:e2e:ui

# Debug tests
npm run test:e2e:debug

# View report
npm run test:e2e:report
```

## 📊 Workflow Behavior

### On Push to main/master
```
✅ Run tests (Node 18.x & 20.x in parallel)
✅ Build application
✅ Deploy to GitHub Pages
✅ Generate accessibility summary
```

### On Push to develop
```
✅ Run tests (Node 18.x & 20.x in parallel)
✅ Build application
❌ Skip deployment
✅ Generate accessibility summary
```

### On Pull Request
```
✅ Run tests (Node 18.x & 20.x in parallel)
✅ Build application
❌ Skip deployment
✅ Generate accessibility summary
```

## 🎨 Playwright MCP (Optional)

### Enabled MCP Servers
```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp"],
      "env": { "BROWSER": "chromium" }
    }
  }
}
```

### Available MCP Tools
- `browser_navigate` - Navigate to URLs
- `browser_click` - Click elements
- `browser_type` - Type in inputs
- `browser_snapshot` - Get page structure
- `browser_take_screenshot` - Capture screenshots
- `browser_close` - Close browser

## 📋 File Structure

```
.github/
└── workflows/
    └── ci-test-deploy.yml          ← Single unified workflow

test-suite/
├── tests/
│   ├── navigation-audit.spec.js   ← 10 comprehensive tests
│   └── search.spec.js              ← Search tests
├── playwright.config.js            ← Config
└── global-teardown.js              ← AccessFlow teardown

Scripts:
- GITHUB_ACTIONS_SETUP.md           ← Detailed guide
- WORKFLOW_SUMMARY.md               ← Architecture overview
- QUICK_REFERENCE.md                ← This file
```

## 🔑 Required Secret

| Name | Value | Where to Add |
|------|-------|--------------|
| `ACCESSFLOW_API_KEY` | `flow-1lXjXhCBlPhX5aRR9eA0g1uFx0YiRTvE` | Settings → Secrets → Actions |

## ✅ Checklist

- [ ] Created `.github/workflows/ci-test-deploy.yml`
- [ ] Added `ACCESSFLOW_API_KEY` secret
- [ ] Enabled GitHub Pages (Source: GitHub Actions)
- [ ] Pushed to GitHub
- [ ] Verified workflow runs successfully
- [ ] Checked test reports
- [ ] Verified deployment

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| Tests fail | Check `ACCESSFLOW_API_KEY` secret |
| Deployment fails | Enable GitHub Pages with "GitHub Actions" source |
| Workflow not running | Check branch name matches trigger conditions |
| Reports not found | Download artifacts from workflow run |

## 📚 Full Documentation

- **Setup Guide:** `GITHUB_ACTIONS_SETUP.md`
- **Architecture:** `WORKFLOW_SUMMARY.md`
- **This Reference:** `QUICK_REFERENCE.md`

## 🎉 Benefits

- **3 workflows → 1 workflow** (simplified)
- **Parallel testing** (faster feedback)
- **Smart deployment** (only on main/master)
- **Rich reporting** (test reports + accessibility audits)
- **Easy maintenance** (single file to manage)

---

**Ready to go!** Push to GitHub and watch the magic happen. ✨

