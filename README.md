# iblokz-data

[![npm version](https://badge.fury.io/js/iblokz-data.svg)](https://badge.fury.io/js/iblokz-data)
[![CI](https://github.com/iblokz/data/workflows/CI/badge.svg)](https://github.com/iblokz/data/actions)
[![codecov](https://codecov.io/gh/iblokz/data/branch/master/graph/badge.svg)](https://codecov.io/gh/iblokz/data)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Documentation](https://img.shields.io/badge/docs-github%20pages-blue)](https://iblokz.github.io/data/)

A lightweight, functional JavaScript library providing immutable data manipulation utilities for arrays, objects, strings, and function composition.

## Features

- 🔒 **Immutable operations** - All operations return new data structures without mutating originals
- 🎯 **Functional programming** - Pipe, compose, and other FP utilities
- 📦 **Zero dependencies** - Lightweight and production-ready
- 📝 **Full JSDoc annotations** - Complete type hints and documentation
- ✅ **Well-tested** - Comprehensive test coverage
- 🚀 **Modern Node.js** - Supports Node.js 16+

## Installation

```bash
npm install iblokz-data
```

## Usage

```javascript
const { obj, arr, str, fn } = require('iblokz-data');

// Object operations
const user = { name: 'John', age: 30 };
const updated = obj.patch(user, 'age', 31);
// => { name: 'John', age: 31 }

// Array operations
const items = [1, 2, 3];
const newItems = arr.add(items, 4);
// => [1, 2, 3, 4]

// String operations
const camelCase = str.toCamelCase('hello_world');
// => 'helloWorld'

// Function composition
const addOne = x => x + 1;
const double = x => x * 2;
const addOneThenDouble = fn.pipe(addOne, double);
addOneThenDouble(3); // => 8
```

## API Overview

### Object Utilities (`obj`)

**Basic Operations:**
- `keyValue(k, v)` - Create an object with a single key-value pair
- `isLiteral(o)` - Check if value is a plain object literal
- `clone(o)` - Create a shallow clone of an object
- `sub(o, path)` - Get a nested value using a path
- `patch(o, path, value)` - Immutably update a value at a path

**Functional Operations:**
- `map(o, fn)` - Map over object values
- `filter(o, fn)` - Filter object properties
- `reduce(o, fn, initial)` - Reduce an object to a single value
- `traverse(tree, fn)` - Recursively traverse and transform an object tree

**Advanced:**
- `chainCall(o, chain)` - Chain multiple method calls
- `switch(value, cases)` - Pattern matching utility

### Array Utilities (`arr`)

- `add(arr, item)` - Immutably add an item to an array
- `remove(arr, item)` - Immutably remove first occurrence of an item
- `toggle(arr, item)` - Toggle item presence in an array
- `contains(arr, item)` - Check if array contains an item

### String Utilities (`str`)

- `capitalize(str)` - Capitalize first character
- `toCamelCase(str, glue)` - Convert to camelCase
- `fromCamelCase(str, glue)` - Convert from camelCase
- `singularToPlural(str)` - Convert singular to plural
- `pluralToSingular(str)` - Convert plural to singular
- `toDocumentId(str, glue, suffix, prefix)` - Convert to document ID format

### Function Utilities (`fn`)

- `pipe(...fns)` - Left-to-right function composition
- `compose(...fns)` - Right-to-left function composition
- `switch(value, cases)` - Pattern matching (alias to obj.switch)

## Detailed Examples

### Working with Nested Objects

```javascript
const { obj } = require('iblokz-data');

const state = {
  user: {
    profile: {
      name: 'John',
      age: 30
    }
  }
};

// Get nested value
const name = obj.sub(state, ['user', 'profile', 'name']);
// => 'John'

// Update nested value
const updated = obj.patch(state, ['user', 'profile', 'age'], 31);
// => { user: { profile: { name: 'John', age: 31 } } }

// Map over object values
const doubled = obj.map({ a: 1, b: 2, c: 3 }, (k, v) => v * 2);
// => { a: 2, b: 4, c: 6 }

// Filter object properties
const filtered = obj.filter({ a: 1, b: 2, c: 3 }, (k, v) => v > 1);
// => { b: 2, c: 3 }
```

### Immutable Array Operations

```javascript
const { arr } = require('iblokz-data');

const tags = ['javascript', 'nodejs'];

// Add item
const withReact = arr.add(tags, 'react');
// => ['javascript', 'nodejs', 'react']

// Remove item
const withoutNode = arr.remove(tags, 'nodejs');
// => ['javascript']

// Toggle item (add if not present, remove if present)
const toggled = arr.toggle(tags, 'typescript');
// => ['javascript', 'nodejs', 'typescript']

// Check containment
arr.contains(tags, 'nodejs'); // => true
arr.contains('a,b,c', 'b');   // => true (works with CSV strings too)
```

### String Transformations

```javascript
const { str } = require('iblokz-data');

// Case conversions
str.toCamelCase('user_name');        // => 'userName'
str.fromCamelCase('userName');       // => 'user_name'
str.fromCamelCase('userName', '-');  // => 'user-name'

// Pluralization
str.singularToPlural('category');    // => 'categories'
str.pluralToSingular('categories');  // => 'category'

// Document ID generation (useful for foreign keys)
str.toDocumentId('user_roles');      // => 'userRoleId'
```

### Function Composition

```javascript
const { fn } = require('iblokz-data');

const addOne = x => x + 1;
const double = x => x * 2;
const square = x => x * x;

// Pipe: left-to-right execution
const addOneThenDouble = fn.pipe(addOne, double);
addOneThenDouble(3); // => 8 (3 + 1 = 4, 4 * 2 = 8)

// Compose: right-to-left execution
const doubleThenAddOne = fn.compose(addOne, double);
doubleThenAddOne(3); // => 7 (3 * 2 = 6, 6 + 1 = 7)

// Complex pipelines
const complexTransform = fn.pipe(
  x => x + 1,
  x => x * 2,
  x => x * x
);
complexTransform(2); // => 36 (2 + 1 = 3, 3 * 2 = 6, 6 * 6 = 36)
```

### Pattern Matching with Switch

```javascript
const { obj } = require('iblokz-data');

const handleAction = (action) => obj.switch(action.type, {
  'ADD_TODO': () => console.log('Adding todo'),
  'REMOVE_TODO': () => console.log('Removing todo'),
  'default': () => console.log('Unknown action')
});

// Works with nested paths
const config = {
  database: {
    mysql: { port: 3306 },
    postgres: { port: 5432 }
  }
};

const port = obj.switch(['database', 'mysql'], config);
// => { port: 3306 }
```

### Real-World Example: State Management

```javascript
const { obj, arr } = require('iblokz-data');

// Initial application state
const initialState = {
  todos: [],
  filter: 'all',
  user: {
    name: 'Guest',
    preferences: {
      theme: 'light'
    }
  }
};

// Add a todo (immutably)
const addTodo = (state, todo) =>
  obj.patch(state, 'todos', arr.add(state.todos, todo));

const state1 = addTodo(initialState, { id: 1, text: 'Learn iblokz-data' });

// Update user preference (deeply nested)
const state2 = obj.patch(state1, ['user', 'preferences', 'theme'], 'dark');

// Toggle filter
const state3 = obj.patch(state2, 'filter', 'completed');

console.log(state3);
// Original initialState remains unchanged!
```

## Documentation

For detailed API documentation with all parameters, return types, and examples, see [API.md](./API.md).

To generate the API documentation locally:

```bash
npm run docs
```

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run linter
npm run lint

# Generate documentation
npm run docs
```

### Quick Setup for Contributors

After cloning:

```bash
npm install          # Install dependencies
npm run prepare      # Setup git hooks
npm test            # Run tests
```

The pre-commit hooks will automatically:
- ✅ Run linter
- ✅ Run tests  
- ✅ Generate documentation
- ✅ Validate commit messages

### Documentation

- **[API.md](API.md)** - Complete API reference
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Contribution guidelines
- **[CHANGELOG.md](CHANGELOG.md)** - Version history
- **[docs/](docs/)** - Detailed documentation for maintainers

### Testing

The library includes comprehensive test coverage:

```bash
npm test           # Run tests with coverage
npm run lint       # Run linter
npm run docs       # Generate documentation
```

## Releases

We use automated releases via GitHub Actions. See [docs/RELEASE.md](docs/RELEASE.md) for details.

To release a new version:

```bash
npm version patch   # or minor, or major
# This automatically creates a tag and triggers:
# - GitHub Release creation
# - npm package publishing
# - Documentation deployment
```

## License

MIT © iblokz

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

## Links

- **[GitHub Repository](https://github.com/iblokz/data)** - Source code
- **[npm Package](https://www.npmjs.com/package/iblokz-data)** - Published package
- **[Documentation](https://iblokz.github.io/data/)** - Online docs
- **[Issues](https://github.com/iblokz/data/issues)** - Bug reports & features
- **[Changelog](CHANGELOG.md)** - Version history

