# GitHub Setup Guide

This guide walks you through setting up all GitHub features for iblokz-data.

## 🚀 Quick Setup (5 minutes)

### 1. Initialize Husky (Pre-commit Hooks)

```bash
npm install
npm run prepare
chmod +x .husky/pre-commit
chmod +x .husky/commit-msg
```

This sets up:
- ✅ Pre-commit linting
- ✅ Pre-commit testing
- ✅ Automatic docs generation
- ✅ Commit message validation

Test it:
```bash
git add .
git commit -m "test: verify husky setup"
```

You should see the pre-commit checks run!

### 2. Push to GitHub

```bash
git add .
git commit -m "chore: add CI/CD and documentation workflows"
git push origin master
```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Source", select:
   - Branch: `master` (or `main`)
   - Folder: `/ (root)` 
4. Click **Save**

GitHub Actions will automatically deploy docs to:
`https://iblokz.github.io/data/`

### 4. Set Up npm Publishing

1. **Get npm Token**:
   ```bash
   npm login
   npm token create
   ```
   Copy the token that's generated

2. **Add to GitHub**:
   - Go to repository **Settings** → **Secrets and variables** → **Actions**
   - Click **New repository secret**
   - Name: `NPM_TOKEN`
   - Value: paste your npm token
   - Click **Add secret**

3. **Verify**:
   Your releases will now auto-publish to npm!

### 5. Set Up Codecov (Optional)

1. Go to [codecov.io](https://codecov.io)
2. Sign in with GitHub
3. Add your repository
4. No additional secrets needed (uses GITHUB_TOKEN)

---

## 📋 Detailed Feature Setup

### GitHub Actions Workflows

Three workflows are configured:

#### 1. **CI Workflow** (`.github/workflows/ci.yml`)
Runs on every push and PR:
- ✅ Tests on Node 14, 16, 18, 20
- ✅ Linting
- ✅ Coverage reporting
- ✅ Docs validation

**Status**: Works automatically after pushing!

#### 2. **Release Workflow** (`.github/workflows/release.yml`)
Triggered when you push a version tag:
- 📦 Creates GitHub Release
- 🚀 Publishes to npm
- 📄 Includes documentation

**Usage**:
```bash
npm version patch  # or minor, or major
# This creates a tag and triggers the release
```

#### 3. **Docs Workflow** (`.github/workflows/docs.yml`)
Deploys documentation to GitHub Pages:
- 📚 Generates API docs
- 🌐 Deploys to GitHub Pages
- 🔄 Updates on every master commit

**Status**: Works after enabling GitHub Pages!

### Pre-commit Hooks

Configured via Husky in `.husky/`:

**pre-commit**:
- Runs linter
- Runs tests
- Generates docs
- Auto-stages API.md if it changed

**commit-msg**:
- Validates commit message format
- Enforces Conventional Commits

**Bypass** (use sparingly):
```bash
git commit --no-verify -m "emergency fix"
```

### Issue Templates

Two templates in `.github/ISSUE_TEMPLATE/`:
- 🐛 Bug Report
- ✨ Feature Request

Users will see these when creating issues!

### Pull Request Template

Template in `.github/pull_request_template.md`

Ensures PRs include:
- Description
- Type of change
- Testing info
- Documentation updates
- Checklist

---

## 🎯 Complete Workflow Example

### Making Changes

```bash
# 1. Create feature branch
git checkout -b feat/new-utility

# 2. Make changes
# Edit lib/arr.js, add new function

# 3. Add JSDoc and tests
# Pre-commit will automatically:
#   - Run linter
#   - Run tests
#   - Generate docs

# 4. Commit (follows conventional commits)
git commit -m "feat(arr): add unique function"

# 5. Push
git push origin feat/new-utility

# 6. Create PR on GitHub
# The PR template will guide you
```

### Creating a Release

```bash
# 1. Ensure you're on master
git checkout master
git pull

# 2. Update ../CHANGELOG.md
# Move items from [Unreleased] to [1.5.1]

# 3. Create version
npm version patch
# This:
#   - Updates package.json
#   - Generates docs
#   - Stages API.md
#   - Creates commit
#   - Creates tag
#   - Pushes to GitHub

# 4. GitHub Actions automatically:
#   - Runs tests
#   - Creates GitHub Release
#   - Publishes to npm
#   - Deploys docs
```

### After Release

Check:
- ✅ [GitHub Actions](https://github.com/iblokz/data/actions) - All green?
- ✅ [GitHub Releases](https://github.com/iblokz/data/releases) - Release created?
- ✅ [npm](https://www.npmjs.com/package/iblokz-data) - Version published?
- ✅ [GitHub Pages](https://iblokz.github.io/data/) - Docs updated?

---

## 🔧 Configuration Files

### package.json Scripts

```json
{
  "prepare": "husky install",           // Setup hooks after install
  "prepublishOnly": "npm test && ...",  // Safety before publish
  "version": "npm run docs && ...",     // Auto-gen docs on version
  "postversion": "git push && ..."      // Auto-push tags
}
```

### .gitignore

Already configured to ignore:
- `node_modules/`
- `coverage/`
- `.nyc_output/`
- `docs/` (generated)
- `API.md` (generated - commit this)

Note: **DO commit API.md** so users on GitHub can read it!

### .jsdoc.json

Configures JSDoc for HTML generation:
- Source: `lib/` directory
- Output: `docs/` directory
- Includes: README.md

---

## 🎨 Customization

### Badges in README

Update these in README.md to match your username:

```markdown
[![CI](https://github.com/iblokz/data/workflows/CI/badge.svg)](...)
[![codecov](https://codecov.io/gh/iblokz/data/...)](...)
```

### GitHub Pages URL

Update in:
- README.md badges
- `.github/workflows/docs.yml` landing page
- DOCUMENTATION.md references

Default: `https://iblokz.github.io/data/`

### Branch Names

If you use `main` instead of `master`:
1. Update workflows: `.github/workflows/*.yml`
2. Update scripts in `package.json`
3. Update documentation references

### npm Organization

If publishing to an organization:
```json
{
  "name": "@yourorg/iblokz-data"
}
```

Update:
- package.json name
- README badges
- Documentation

---

## 📊 Monitoring & Maintenance

### GitHub Actions Dashboard

View workflow runs:
```
https://github.com/iblokz/data/actions
```

### npm Package Page

Monitor downloads and versions:
```
https://www.npmjs.com/package/iblokz-data
```

### GitHub Pages

View deployed docs:
```
https://iblokz.github.io/data/
```

### Codecov Dashboard

View coverage reports:
```
https://codecov.io/gh/iblokz/data
```

---

## 🐛 Troubleshooting

### Pre-commit Hooks Not Running

```bash
# Reinstall hooks
rm -rf .husky
npm run prepare
chmod +x .husky/*
```

### GitHub Actions Failing

1. Check [Actions tab](https://github.com/iblokz/data/actions)
2. Click on failed workflow
3. View logs for specific step
4. Common issues:
   - Missing secrets (NPM_TOKEN)
   - Test failures
   - Linting errors

### npm Publish Failing

```bash
# Check npm token
npm whoami

# Regenerate token
npm token create

# Update GitHub secret
# Settings → Secrets → NPM_TOKEN
```

### Docs Not Deploying

1. Check GitHub Pages is enabled
2. Check workflow runs in Actions
3. Verify `docs.yml` workflow succeeded
4. Wait 5-10 minutes for propagation

### Codecov Not Working

1. Visit [codecov.io](https://codecov.io)
2. Sign in and add repository
3. No token needed for public repos
4. Check workflow includes upload step

---

## ✅ Verification Checklist

After setup, verify:

- [ ] Push to GitHub triggers CI
- [ ] Tests run on multiple Node versions
- [ ] Pre-commit hooks work locally
- [ ] Commit messages validated
- [ ] API.md auto-generated on commit
- [ ] GitHub Pages enabled and working
- [ ] npm token added to secrets
- [ ] Issue templates appear when creating issues
- [ ] PR template appears when creating PRs
- [ ] Badges in README display correctly

Test release process (on a feature branch):
- [ ] `npm version patch` creates tag
- [ ] Tag push triggers release workflow
- [ ] GitHub release created
- [ ] Docs deployed to GitHub Pages

---

## 🎓 Learning Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Husky Documentation](https://typicode.github.io/husky/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [Keep a Changelog](https://keepachangelog.com/)

---

## 🎉 You're All Set!

Your repository now has:
- ✅ Automated testing
- ✅ Pre-commit quality checks
- ✅ Automated releases
- ✅ Documentation hosting
- ✅ Professional issue/PR templates

Questions? Check the other documentation files or open an issue!

