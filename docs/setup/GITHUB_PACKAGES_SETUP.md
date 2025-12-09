# GitHub Packages Setup Guide

## Problem: Installing @acsbe Packages

When installing npm packages from the `@acsbe` GitHub Packages registry, you need a token with proper permissions.

## The Issue

If you're using a token from the `@acsbe` company repository, it might not work in your private GitHub account because:

1. **Token Scope**: GitHub Packages tokens are scoped to organizations/repositories
2. **Permissions**: The token needs `read:packages` permission for the `@acsbe` organization
3. **Access**: The token must have access to the organization that owns the package

## Solutions

### Option 1: Use a Personal Access Token (PAT) with @acsbe Access (Recommended)

1. **Create a Personal Access Token:**
   - Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Click "Generate new token (classic)"
   - Name: `acsbe-packages-read`
   - Select scopes:
     - ✅ `read:packages` (required)
     - ✅ `repo` (if package is in private repo)
   - Generate token and copy it

2. **Add Token to Repository Secrets:**
   - Go to your repository → Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `ACSBE_TOKEN`
   - Value: Your personal access token
   - Save

3. **The workflow will automatically use `ACSBE_TOKEN` if available**

### Option 2: Use GITHUB_TOKEN (If Package is Public)

If the `@acsbe/accessflow-sdk` package is public, you can use the automatically provided `GITHUB_TOKEN`:

- No setup needed
- Works automatically in GitHub Actions
- Limited to public packages

### Option 3: Organization-Level Token

If you have admin access to the `@acsbe` organization:

1. Create an organization-level token
2. Add it as a repository secret
3. Use it in the workflow

## Current Workflow Configuration

The workflow now checks for tokens in this order:

1. `ACSBE_TOKEN` - Personal access token with @acsbe package access (best option)
2. `GH_TOKEN` - Custom token you provide
3. `GITHUB_TOKEN` - Automatically provided by GitHub Actions (may not work for private packages)

## Testing Token Access

To test if your token works:

```bash
# Set your token
export TOKEN="your-token-here"

# Test authentication
curl -H "Authorization: token $TOKEN" https://api.github.com/user

# Test package access (replace @acsbe/accessflow-sdk with your package)
curl -H "Authorization: token $TOKEN" \
  https://npm.pkg.github.com/@acsbe/accessflow-sdk
```

## Troubleshooting

### Error: "401 Unauthorized"
- Token doesn't have `read:packages` permission
- Token doesn't have access to the `@acsbe` organization
- Token is expired or invalid

**Solution**: Create a new PAT with `read:packages` scope

### Error: "404 Not Found"
- Package doesn't exist
- Package is private and token doesn't have access
- Wrong organization name

**Solution**: Verify package name and token permissions

### Error: "403 Forbidden"
- Token doesn't have sufficient permissions
- Organization has restricted package access

**Solution**: Contact @acsbe organization admin for access

## Security Best Practices

1. **Never commit tokens** - Always use GitHub Secrets
2. **Use minimal permissions** - Only grant `read:packages` if that's all you need
3. **Rotate tokens regularly** - Update tokens periodically
4. **Use organization tokens** - If possible, use organization-level tokens instead of personal tokens

## Workflow Debugging

The workflow now includes debugging that shows:
- Which token is being used
- Token length and first/last characters (masked)
- .npmrc configuration (with token masked)

Check the "Debug GH_TOKEN" and "Install dependencies" steps in the workflow logs.

## Quick Setup Checklist

- [ ] Create Personal Access Token with `read:packages` permission
- [ ] Add token to repository secrets as `ACSBE_TOKEN`
- [ ] Verify token has access to `@acsbe` organization
- [ ] Push changes and check workflow logs
- [ ] Verify package installs successfully

---

**Need help?** Check the workflow logs in the Actions tab for detailed error messages.

