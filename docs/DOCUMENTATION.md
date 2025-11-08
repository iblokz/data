# Documentation Guide

This guide explains how documentation works in iblokz-data and how to maintain it.

## Documentation System

We use **JSDoc** comments in the source code to generate comprehensive API documentation. This ensures the documentation is always in sync with the code.

## File Structure

```
iblokz-data/
├── lib/                    # Source files with JSDoc comments
│   ├── arr.js
│   ├── obj.js
│   ├── str.js
│   └── fn.js
├── index.js               # Main entry point with module docs
├── index.d.ts             # TypeScript type definitions
├── README.md              # Main documentation (manually maintained)
├── API.md                 # Auto-generated API reference
├── .jsdoc.json            # JSDoc configuration
└── ../CONTRIBUTING.md        # Contribution guidelines
```

## Generating Documentation

### Auto-generate API.md

```bash
npm run docs
```

This uses `jsdoc-to-markdown` to extract JSDoc comments and create `API.md`.

**Important:** Never edit `API.md` manually! It will be overwritten. Edit the JSDoc comments in source files instead.

### Watch Mode

For continuous documentation generation during development:

```bash
npm run docs:watch
```

This automatically regenerates documentation when source files change.

## JSDoc Syntax

### Function Documentation Template

```javascript
/**
 * Brief description of what the function does.
 * Can include multiple lines for detailed explanation.
 * 
 * @param {Type} paramName - Description of parameter
 * @param {Type} [optionalParam='default'] - Description of optional parameter
 * @returns {Type} Description of return value
 * @example
 * functionName(arg1, arg2) // => expected result
 * @example
 * // You can have multiple examples
 * functionName(arg1) // => another result
 */
const functionName = (paramName, optionalParam = 'default') => {
  // implementation
};
```

### Type Annotations

Common types:
- `{string}` - String value
- `{number}` - Numeric value
- `{boolean}` - Boolean value
- `{Array}` - Array of any type
- `{Array<string>}` - Array of strings
- `{Object}` - Plain object
- `{Function}` - Function
- `{*}` - Any type
- `{string|Array}` - Union type (string OR array)
- `{Object.<string, number>}` - Object with string keys and number values

Optional parameters:
```javascript
@param {string} [optionalParam] - Optional parameter
@param {string} [optionalParam='default'] - Optional with default
```

Rest parameters:
```javascript
@param {...Function} fns - Multiple function arguments
```

### Module Documentation

At the top of module files:

```javascript
/**
 * @module moduleName
 * @description What this module provides
 */
```

## Documentation Best Practices

### 1. Write Clear Descriptions

❌ Bad:
```javascript
/**
 * Adds item
 */
const add = (arr, item) => [...arr, item];
```

✅ Good:
```javascript
/**
 * Immutably adds an item to an array (returns a new array).
 * The original array is not modified.
 */
const add = (arr, item) => [...arr, item];
```

### 2. Include Practical Examples

❌ Bad:
```javascript
/**
 * @example
 * add(a, b)
 */
```

✅ Good:
```javascript
/**
 * @example
 * add([1, 2, 3], 4) // => [1, 2, 3, 4]
 * @example
 * const items = ['a', 'b'];
 * const newItems = add(items, 'c');
 * console.log(newItems) // => ['a', 'b', 'c']
 * console.log(items)    // => ['a', 'b'] (unchanged)
 */
```

### 3. Document Edge Cases

```javascript
/**
 * Immutably removes the first occurrence of an item from an array.
 * If the item is not found, returns the original array.
 * 
 * @param {Array} arr - The source array
 * @param {*} item - The item to remove
 * @returns {Array} A new array with the item removed, or original if not found
 * @example
 * remove([1, 2, 3, 2], 2) // => [1, 3, 2] (only first occurrence)
 * remove([1, 2, 3], 4)    // => [1, 2, 3] (item not found, returns original)
 */
```

### 4. Describe Complex Parameters

```javascript
/**
 * @param {string|Array<string>} path - The path to the value.
 *   Can be a string key ('name') or array of keys (['user', 'profile', 'name'])
 *   for nested access.
 */
```

### 5. Link Related Functions

```javascript
/**
 * Immutably toggles an item in an array.
 * Uses {@link add} and {@link remove} internally.
 */
```

## TypeScript Definitions

We maintain `index.d.ts` for TypeScript users. When adding new functions:

1. Add JSDoc comments to the JavaScript source
2. Add corresponding TypeScript types to `index.d.ts`
3. Ensure types match JSDoc annotations

Example:

JavaScript (`lib/arr.js`):
```javascript
/**
 * @param {Array} arr
 * @param {*} item
 * @returns {Array}
 */
const add = (arr, item) => [].concat(arr, [item]);
```

TypeScript (`index.d.ts`):
```typescript
export namespace arr {
  export function add<T>(arr: T[], item: T): T[];
}
```

## Viewing Documentation

### In IDEs

Modern IDEs (VS Code, WebStorm, etc.) automatically display JSDoc comments:
- Hover over a function to see its documentation
- View parameter hints while typing
- Get autocomplete based on types

### In README.md

The `README.md` contains:
- Quick start guide
- Usage examples
- API overview
- Links to full API documentation

### In API.md

Auto-generated complete API reference with:
- All functions grouped by module
- Full parameter and return type details
- All examples from JSDoc comments

## Maintaining Documentation

### When Adding New Features

1. Write the function with JSDoc comments
2. Add comprehensive examples
3. Update TypeScript definitions
4. Run `npm run docs` to regenerate API.md
5. Update README.md if needed (for major features)

### When Fixing Bugs

1. Update JSDoc if behavior changes
2. Add examples showing the fix
3. Regenerate documentation

### Before Releasing

1. Review all JSDoc comments for accuracy
2. Ensure examples work correctly
3. Run `npm run docs` to update API.md
4. Update README.md version numbers if needed
5. Update ../CHANGELOG.md (if you maintain one)

## Tools Used

- **jsdoc-to-markdown**: Converts JSDoc comments to Markdown
- **JSDoc**: Standard for JavaScript documentation
- **TypeScript**: Type definitions for editor support

## Troubleshooting

### "Documentation not updating"

- Make sure you ran `npm run docs`
- Check that JSDoc syntax is valid
- Look for parsing errors in console output

### "Types not working in IDE"

- Ensure `index.d.ts` is included in package.json's `types` field
- Check TypeScript definitions match the actual API
- Restart your IDE/TypeScript server

### "Examples not showing correctly"

- Make sure examples are on separate lines
- Use proper indentation
- Check that comment blocks are closed properly

## Resources

- [JSDoc Official Documentation](https://jsdoc.app/)
- [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown)
- [TypeScript Declaration Files](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html)

Happy documenting! 📚

