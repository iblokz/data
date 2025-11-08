# Contributing to iblokz-data

Thank you for your interest in contributing to iblokz-data! This document provides guidelines and information for contributors.

## 📖 Additional Documentation

- **[docs/DOCUMENTATION.md](docs/DOCUMENTATION.md)** - How to write documentation
- **[docs/GITHUB_SETUP.md](docs/GITHUB_SETUP.md)** - CI/CD setup details
- **[docs/RELEASE.md](docs/RELEASE.md)** - Release process (maintainers)

## Development Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/data.git
   cd data
   ```
3. Install dependencies:
   ```bash
   npm install
   npm run prepare  # Setup git hooks
   ```

## Development Workflow

### Running Tests

```bash
npm test
```

This runs the test suite with coverage reporting using Mocha and NYC.

### Linting

```bash
npm run lint
```

We use ESLint with Google's style guide. Make sure your code passes linting before submitting a PR.

### Generating Documentation

```bash
npm run docs
```

This generates `API.md` from JSDoc comments. The documentation is auto-generated, so **do not edit API.md manually**.

To watch for changes and regenerate docs automatically:

```bash
npm run docs:watch
```

## Code Style Guidelines

1. **Follow existing patterns** - Look at existing code for style guidance
2. **Use functional programming** - Functions should be pure and immutable
3. **Add JSDoc comments** - All public functions must have complete JSDoc annotations
4. **Write tests** - New features need corresponding tests
5. **Keep it simple** - Prefer clarity over cleverness

### JSDoc Requirements

Every exported function must have:

- A clear description
- `@param` tags for all parameters (with types)
- `@returns` tag describing the return value (with type)
- At least one `@example` showing usage

Example:

```javascript
/**
 * Immutably adds an item to an array.
 * @param {Array} arr - The source array
 * @param {*} item - The item to add
 * @returns {Array} A new array with the item added
 * @example
 * add([1, 2, 3], 4) // => [1, 2, 3, 4]
 */
const add = (arr, item) => [].concat(arr, [item]);
```

## Testing Guidelines

1. **Test both happy paths and edge cases**
2. **Use descriptive test names**
3. **Keep tests focused** - One assertion per concept
4. **Test immutability** - Verify original data is unchanged

Example test structure:

```javascript
describe('arr', () => {
  describe('add', () => {
    it('should add item to array', () => {
      const result = arr.add([1, 2], 3);
      expect(result).to.deep.equal([1, 2, 3]);
    });

    it('should not mutate original array', () => {
      const original = [1, 2];
      arr.add(original, 3);
      expect(original).to.deep.equal([1, 2]);
    });
  });
});
```

## Submitting Changes

1. **Create a feature branch** from `master`:
   ```bash
   git checkout -b feature/my-new-feature
   ```

2. **Make your changes** following the guidelines above

3. **Add tests** for your changes

4. **Run the full test suite** and make sure everything passes:
   ```bash
   npm test
   npm run lint
   ```

5. **Update documentation** by adding/updating JSDoc comments

6. **Commit your changes** with clear commit messages:
   ```bash
   git commit -m "feat: add new array utility function"
   ```

   We follow conventional commits:
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation changes
   - `test:` - Test additions/changes
   - `refactor:` - Code refactoring
   - `chore:` - Maintenance tasks

7. **Push to your fork**:
   ```bash
   git push origin feature/my-new-feature
   ```

8. **Open a Pull Request** with:
   - Clear title describing the change
   - Description of what changed and why
   - Link to any related issues

## Pull Request Review Process

1. Maintainers will review your PR
2. You may be asked to make changes
3. Once approved, a maintainer will merge your PR
4. Your contribution will be credited in the release notes

## Adding New Utilities

When adding new utility functions:

1. **Choose the right module** - Put array functions in `arr.js`, object functions in `obj.js`, etc.
2. **Keep it immutable** - Never mutate input parameters
3. **Keep it pure** - Same inputs should always produce same outputs
4. **Add comprehensive examples** - Show common use cases
5. **Consider edge cases** - Handle null, undefined, empty arrays/objects
6. **Update TypeScript definitions** - Add types to `index.d.ts`

## Questions?

- Open an issue for bugs or feature requests
- Start a discussion for questions or ideas
- Check existing issues before creating a new one

## Code of Conduct

- Be respectful and constructive
- Welcome newcomers
- Focus on the code, not the person
- Help others learn and grow

Thank you for contributing! 🎉

