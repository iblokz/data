# Release Process Guide

This document describes how to create and publish releases for iblokz-data.

## Automated Release Process

Releases are automated via GitHub Actions. Here's how it works:

### 1. Prepare for Release

```bash
# Ensure you're on master and up to date
git checkout master
git pull origin master

# Ensure all tests pass
npm test

# Ensure linting passes
npm run lint

# Generate documentation
npm run docs

# Review changes since last release
git log $(git describe --tags --abbrev=0)..HEAD --oneline
```

### 2. Update Version

We follow [Semantic Versioning](https://semver.org/):
- **Patch** (1.5.0 → 1.5.1): Bug fixes, documentation updates
- **Minor** (1.5.0 → 1.6.0): New features, backward compatible
- **Major** (1.5.0 → 2.0.0): Breaking changes

```bash
# Patch release (bug fixes)
npm version patch -m "chore: release v%s"

# Minor release (new features)
npm version minor -m "chore: release v%s"

# Major release (breaking changes)
npm version major -m "chore: release v%s"
```

This will:
- Update `package.json` version
- Create a git commit
- Create a git tag (e.g., `v1.5.1`)

### 3. Update CHANGELOG (Optional but Recommended)

Before pushing, update `../CHANGELOG.md`:

```markdown
## [1.5.1] - 2024-01-15

### Added
- New feature X

### Fixed
- Bug in function Y

### Changed
- Improved performance of Z
```

### 4. Push Release

```bash
# Push the commit and tag
git push origin master
git push origin --tags
```

This triggers the GitHub Actions release workflow which will:
1. ✅ Run all tests
2. 📚 Generate documentation
3. 🚀 Create GitHub Release with release notes
4. 📦 Publish to npm registry automatically

## Manual Release (Backup)

If you need to release manually:

```bash
# 1. Build and test
npm test
npm run docs

# 2. Update version
npm version patch  # or minor, or major

# 3. Publish to npm
npm publish

# 4. Create GitHub release manually
# Go to: https://github.com/iblokz/data/releases/new
# Create release from tag with release notes
```

## Pre-release (Beta/Alpha)

For pre-releases:

```bash
# Create pre-release version
npm version prerelease --preid=beta
# Example: 1.5.0 → 1.5.1-beta.0

# Publish with beta tag
npm publish --tag beta

# Install pre-release
npm install iblokz-data@beta
```

## Release Checklist

Before creating a release:

- [ ] All tests passing locally
- [ ] All tests passing on CI
- [ ] Documentation up to date
- [ ] ../CHANGELOG.md updated
- [ ] README.md reflects current version
- [ ] No uncommitted changes
- [ ] On master branch
- [ ] Pulled latest changes

After release:

- [ ] Verify GitHub Release created
- [ ] Verify npm package published
- [ ] Test installation: `npm install iblokz-data@latest`
- [ ] Verify documentation on GitHub Pages
- [ ] Announce release (if major/minor)

## Setting Up Secrets

For automated releases to work, set up these GitHub secrets:

1. **NPM_TOKEN**:
   ```bash
   # Generate npm token
   npm login
   npm token create
   
   # Add to GitHub:
   # Settings → Secrets and variables → Actions → New repository secret
   # Name: NPM_TOKEN
   # Value: <your-npm-token>
   ```

2. **GITHUB_TOKEN**: 
   - Automatically provided by GitHub Actions (no setup needed)

## Version Numbers

### Current Version
Check current version:
```bash
npm version
node -p "require('./package.json').version"
git describe --tags --abbrev=0
```

### Version History
View all releases:
```bash
git tag -l
npm view iblokz-data versions
```

## Rollback a Release

If you need to rollback:

```bash
# Unpublish from npm (only within 72 hours)
npm unpublish iblokz-data@1.5.1

# Or deprecate the version
npm deprecate iblokz-data@1.5.1 "This version has critical bugs, use 1.5.0"

# Delete GitHub release
# Go to releases page and delete manually

# Delete tag
git tag -d v1.5.1
git push origin :refs/tags/v1.5.1
```

## Release Notes Template

When creating GitHub releases, use this template:

```markdown
## What's Changed

### ✨ New Features
- Feature description (#PR)

### 🐛 Bug Fixes
- Bug fix description (#PR)

### 📚 Documentation
- Documentation updates (#PR)

### 🔧 Maintenance
- Internal improvements (#PR)

### 💥 Breaking Changes
- Breaking change description (if any)

**Full Changelog**: https://github.com/iblokz/data/compare/v1.5.0...v1.5.1
```

## Continuous Deployment

Our release process is fully automated:

1. **Commit** → Triggers CI tests
2. **Tag** → Triggers release workflow
3. **Release** → Auto-publishes to npm
4. **Docs** → Auto-deploys to GitHub Pages

## Monitoring Releases

Track release status:
- **GitHub Actions**: https://github.com/iblokz/data/actions
- **npm**: https://www.npmjs.com/package/iblokz-data
- **GitHub Releases**: https://github.com/iblokz/data/releases

## Questions?

- Check GitHub Actions logs for deployment issues
- Verify npm credentials are valid
- Ensure version number hasn't been used before
- Check that tests pass on CI before releasing

