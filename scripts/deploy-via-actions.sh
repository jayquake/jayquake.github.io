#!/bin/bash

# Script to deploy via GitHub Actions
# This script commits and pushes changes to trigger the GitHub Actions workflow

set -e

echo "🚀 Starting deployment via GitHub Actions..."

# Check if git is available
if ! command -v git &> /dev/null; then
  echo "❌ Error: git is not installed or not in PATH"
  exit 1
fi

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
  echo "❌ Error: Not in a git repository"
  exit 1
fi

# Get the current branch
CURRENT_BRANCH=$(git branch --show-current 2>/dev/null || git rev-parse --abbrev-ref HEAD)

# Check if DEPLOY_BRANCHES environment variable is set (comma-separated list)
# If not set, default to main and master
ALLOWED_BRANCHES="${DEPLOY_BRANCHES:-main,master}"

# Check if ALLOW_ANY_BRANCH is set to "true" to bypass branch check
if [ "${ALLOW_ANY_BRANCH}" != "true" ]; then
  # Check if current branch is in allowed branches list
  ALLOWED=0
  IFS=',' read -ra BRANCHES <<< "$ALLOWED_BRANCHES"
  for branch in "${BRANCHES[@]}"; do
    # Trim whitespace from branch name
    branch=$(echo "$branch" | xargs)
    if [ "$CURRENT_BRANCH" = "$branch" ]; then
      ALLOWED=1
      break
    fi
  done
  
  if [ "$ALLOWED" -eq 0 ]; then
    echo "❌ Error: You must be on one of the allowed branches to deploy"
    echo "Current branch: $CURRENT_BRANCH"
    echo "Allowed branches: $ALLOWED_BRANCHES"
    echo ""
    echo "Options:"
    echo "  1. Switch to an allowed branch: git checkout main"
    echo "  2. Set ALLOW_ANY_BRANCH=true to deploy from any branch (not recommended for production)"
    echo "  3. Set DEPLOY_BRANCHES='branch1,branch2' to allow specific branches"
    exit 1
  fi
else
  echo "⚠️  Warning: Deploying from branch '$CURRENT_BRANCH' (ALLOW_ANY_BRANCH is enabled)"
fi

# Check if there are uncommitted changes in build directory
if [ -d "build" ] && [ -n "$(git status --porcelain build/ 2>/dev/null)" ]; then
  echo "📦 Building application..."
  npm run build
else
  echo "📦 Building application..."
  npm run build
fi

# Check if there are changes to commit
if [ -z "$(git status --porcelain)" ]; then
  echo "⚠️  No changes to commit. Creating empty commit to trigger workflow..."
  git commit --allow-empty -m "Deploy: Trigger GitHub Actions deployment"
else
  echo "📝 Committing changes..."
  git add .
  git commit -m "Deploy: Trigger GitHub Actions deployment"
fi

# Push to trigger GitHub Actions
echo "⬆️  Pushing to $CURRENT_BRANCH to trigger GitHub Actions..."
if git push origin $CURRENT_BRANCH; then
  echo ""
  echo "✅ Deployment triggered successfully!"
  echo ""
  # Try to get repository URL for Actions link
  REPO_URL=$(git config --get remote.origin.url 2>/dev/null || echo "")
  if [ -n "$REPO_URL" ]; then
    # Extract owner/repo from various URL formats
    REPO_PATH=$(echo "$REPO_URL" | sed -E 's|.*github.com[:/]([^/]+/[^/]+)(\.git)?$|\1|')
    if [ -n "$REPO_PATH" ]; then
      echo "📊 Check GitHub Actions status:"
      echo "   https://github.com/$REPO_PATH/actions"
    fi
  fi
  echo ""
  echo "The workflow will:"
  echo "  1. Run Playwright tests"
  echo "  2. Deploy to GitHub Pages (if tests pass)"
else
  echo "❌ Error: Failed to push to GitHub"
  echo "Make sure you have push access and are authenticated"
  exit 1
fi

