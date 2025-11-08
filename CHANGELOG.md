# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.6.0] - 2025-11-08

### Added
- **Documentation:**
  - Comprehensive JSDoc annotations for all 24 functions
  - TypeScript type definitions (index.d.ts) for full IDE support
  - Automated documentation generation with jsdoc-to-markdown
  - Enhanced README with detailed examples and API overview
  - API.md auto-generated API reference
  - Contributing guidelines (CONTRIBUTING.md)
  - Documentation writing guide (docs/DOCUMENTATION.md)
  - Release process guide (docs/RELEASE.md)
  - GitHub setup guide (docs/GITHUB_SETUP.md)

- **CI/CD:**
  - GitHub Actions CI workflow (tests on Node 14, 16, 18, 20)
  - Automated release workflow (publishes to npm + GitHub)
  - Automated documentation deployment to GitHub Pages
  - Pre-commit hooks with Husky (lint, test, docs)
  - Commit message validation (Conventional Commits)
  - Issue and PR templates

- **Developer Experience:**
  - NPM scripts for docs generation and watching
  - Lifecycle hooks for automated workflows
  - Keywords for better npm discoverability

### Changed
- **Dependencies:**
  - Updated chai: 3.5.0 → 4.3.10
  - Updated eslint: 3.3.1 → 8.56.0
  - Updated eslint-config-google: 0.6.0 → 0.14.0
  - Updated mocha: 3.2.0 → 10.2.0
  - Updated nyc: 10.1.2 → 15.1.0
  - Replaced watch with nodemon for better security

- **Configuration:**
  - Enhanced ESLint config to respect project standards (tabs, JSDoc style)
  - Updated .gitignore for generated files and local notes
  - Organized documentation structure (docs/ folder + .notes/ for local summaries)

### Fixed
- All security vulnerabilities (35 → 0)
- ESLint compatibility with modern versions while preserving code style

### Security
- Resolved 35 security vulnerabilities by updating dependencies
- All packages now on secure, maintained versions

## [1.5.0] - 2020-03-28

### Added
- `arr.contains()` - Check if array contains an element

### Changed
- Improved test coverage for array utilities

## [1.4.0] - 2019-09-26

### Added
- Optional chaining operator compatibility for `obj.sub()`
- Better handling of nested property access with undefined values

### Fixed
- `obj.sub()` now works correctly with optional chaining patterns

## [1.3.0] - 2019-09-03

### Added
- `obj.isLiteral()` - Check if value is a plain object literal

### Changed
- Reworked `obj.traverse()` to match `obj.map()` interface for consistency
- Added tests for `isLiteral` and `traverse`

## [1.2.0] - 2017-12-30

### Added
- Array-like functions for objects (`map`, `filter`, `reduce`)
- More generic `str.toDocumentId()` implementation

### Changed
- Function utilities (`fn`) consistency improvements to align with Ramda patterns
- Expanded test coverage

## [1.1.0] - 2017-07-22

### Added
- Tests for function utilities
- `fn.switch` moved to `obj.switch` (kept reference in `fn` for backward compatibility)

### Fixed
- `obj.sub()` now correctly returns `0` and `null` values (previously returned undefined)
- `obj.switch` now works with nested sub-objects

---

## How to Use This Changelog

### Types of Changes

- **Added** for new features
- **Changed** for changes in existing functionality
- **Deprecated** for soon-to-be removed features
- **Removed** for now removed features
- **Fixed** for any bug fixes
- **Security** in case of vulnerabilities

### When Releasing

1. Move items from `[Unreleased]` to a new version section
2. Add the release date
3. Create a new empty `[Unreleased]` section at the top
4. Update the version numbers in the comparison links at the bottom

### Example Entry

```markdown
## [1.6.0] - 2024-01-15

### Added
- New `arr.unique()` function for removing duplicates (#123)
- Support for custom comparators in sorting functions (#124)

### Fixed
- Bug in `obj.patch()` when handling null values (#125)
- Memory leak in `traverse()` function (#126)

### Changed
- Improved performance of `obj.map()` by 20% (#127)
```

[Unreleased]: https://github.com/iblokz/data/compare/v1.6.0...HEAD
[1.6.0]: https://github.com/iblokz/data/compare/v1.5.0...v1.6.0
[1.5.0]: https://github.com/iblokz/data/compare/v1.4.0...v1.5.0
[1.4.0]: https://github.com/iblokz/data/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/iblokz/data/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/iblokz/data/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/iblokz/data/releases/tag/v1.1.0

