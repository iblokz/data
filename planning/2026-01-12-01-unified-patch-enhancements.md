# Unified Patch Enhancements

## Overview
This document outlines enhancements to `obj.patch` and integration with `arr.patch` to create a unified, powerful patching system that handles objects, arrays, batch updates, and function updaters.

## Current State

### obj.patch
- `obj.patch(o, k, v)` - Immutably updates a value at a path
- Supports string or array paths
- Merges literal objects when both current and new values are objects
- Does NOT support function updaters
- Does NOT support batch updates

### arr.patch
- `arr.patch(arr, index, patch)` - Immutably patches an array element at a given index
- Supports object merging and function updaters
- Already implemented and tested

## Proposed Enhancements

### 1. Unified obj.patch with Batch Support

**Current behavior:**
```javascript
obj.patch({a: 1}, 'b', 2) // => {a: 1, b: 2}
```

**Proposed enhancement - Batch mode:**
If the second parameter is an object (and first parameter is also an object), treat it as a batch update:

```javascript
// Batch update mode
obj.patch({a: 1, b: 2}, {
  'a': 10,
  'b': 20,
  'c': 30
})
// => {a: 10, b: 20, c: 30}

// With nested paths
obj.patch({user: {name: 'John'}}, {
  'user.name': 'Jane',
  'user.age': 30,
  'settings.theme': 'dark'
})
// => {user: {name: 'Jane', age: 30}, settings: {theme: 'dark'}}
```

**Backward compatibility:**
- `obj.patch(o, string, v)` - Still works (single path update)
- `obj.patch(o, array, v)` - Still works (nested path update)
- `obj.patch(o, object)` - New batch mode (when second param is object)

### 2. Function Updater Support

**Proposed enhancement:**
Support function updaters in both single and batch modes:

```javascript
// Single path with function updater
obj.patch({count: 1}, 'count', (current) => current + 1)
// => {count: 2}

// Batch mode with function updaters
obj.patch({a: 1, b: 2}, {
  'a': (current) => current * 2,
  'b': (current) => current + 10
})
// => {a: 2, b: 12}
```

**Implementation notes:**
- Check if `v` is a function: `v instanceof Function`
- If function, call it with current value: `v(o[k])` or `v(sub(o, path))`
- Merge result with current value if result is an object (preserve existing merge behavior)
- Maintain backward compatibility - existing code should work unchanged

### 3. Array Index Path Support

**Proposed enhancement:**
When a path step is a numeric index (0, 1, 2, 3...), automatically use `arr.patch` for that segment:

```javascript
// Array index in path
obj.patch({items: [{count: 1}, {count: 2}]}, ['items', 0, 'count'], 10)
// => {items: [{count: 10}, {count: 2}]}

// Array index with function updater
obj.patch({items: [{count: 1}]}, ['items', 0, 'count'], (current) => current + 1)
// => {items: [{count: 2}]}

// Batch mode with array indices
obj.patch({items: [{a: 1}, {b: 2}]}, {
  'items.0.a': 10,
  'items.1.b': 20
})
// => {items: [{a: 10}, {b: 20}]}
```

**Implementation notes:**
- Detect numeric path steps: `typeof pathStep === 'number' && pathStep >= 0 && Number.isInteger(pathStep)`
- When encountering a numeric step, check if current value is an array
- If array, use `arr.patch` for that segment
- If not array, treat as object key (backward compatible)
- Support both array path format `['items', 0, 'count']` and string format `'items.0.count'`

### 4. Combined Example

```javascript
const state = {
  user: {
    name: 'John',
    preferences: {
      theme: 'light'
    }
  },
  todos: [
    {id: 1, text: 'Task 1', done: false},
    {id: 2, text: 'Task 2', done: false}
  ],
  count: 0
};

// Unified batch update with mixed types
const updated = obj.patch(state, {
  // Object path update
  'user.name': 'Jane',
  // Nested object path
  'user.preferences.theme': 'dark',
  // Array index path
  'todos.0.done': true,
  // Array index with function updater
  'todos.1.done': (current) => !current,
  // Function updater
  'count': (current) => current + 1
});

// Result:
// {
//   user: {
//     name: 'Jane',
//     preferences: { theme: 'dark' }
//   },
//   todos: [
//     {id: 1, text: 'Task 1', done: true},
//     {id: 2, text: 'Task 2', done: true}
//   ],
//   count: 1
// }
```

## Implementation Strategy

### Phase 1: Function Updater Support
1. Add function detection to `obj.patch`
2. Call function with current value
3. Handle merge behavior for function results
4. Add comprehensive tests

### Phase 2: Batch Update Mode
1. Detect when second parameter is an object
2. Iterate over patch object keys
3. Apply each patch using existing `obj.patch` logic
4. Support both string and array paths in batch keys
5. Add comprehensive tests

### Phase 3: Array Index Integration
1. Detect numeric path steps
2. Check if current value is array
3. Integrate `arr.patch` for array segments
4. Support both array and string path formats for indices
5. Add comprehensive tests

## Backward Compatibility

All enhancements maintain backward compatibility:
- ✅ `obj.patch(o, string, v)` - Unchanged
- ✅ `obj.patch(o, array, v)` - Unchanged
- ✅ `arr.patch(arr, index, patch)` - Unchanged (already implemented)
- ✅ Existing code continues to work without modification

## Testing Considerations

### Function Updaters
- Test with various value types (objects, primitives, arrays, null, undefined)
- Test with nested paths
- Test merge behavior with function results
- Test edge cases (empty objects, missing paths)

### Batch Mode
- Test with mixed path types (string and array)
- Test with function updaters in batch
- Test with nested paths in batch
- Test with array indices in batch
- Test edge cases (empty patch object, conflicting paths)

### Array Index Integration
- Test numeric path steps with arrays
- Test numeric path steps with objects (should treat as key)
- Test array indices in nested paths
- Test array indices with function updaters
- Test both `['items', 0]` and `'items.0'` formats
- Test edge cases (negative indices, non-integer numbers, out-of-bounds indices)

## Migration Path

Once implemented:
1. Update jam-station to use unified `obj.patch` with function support and batch mode
2. Remove `jam-station/src/js/util/data/object.js` (keep only if needed for other custom logic)
3. Update documentation and examples
4. Consider deprecating any custom patch utilities in other projects

## Priority

- **Function updater support**: High - Currently used in jam-station piano-roll actions
- **Batch update mode**: High - Reduces object creation overhead, cleaner API
- **Array index integration**: Medium - Nice to have, but can be worked around with explicit `arr.patch` calls

## Related Work

- `arr.patch` is already implemented and tested
- `arr.reorder` is already implemented and tested
- This planning document supersedes `2025-12-07-01-patch-enhancements.md`
