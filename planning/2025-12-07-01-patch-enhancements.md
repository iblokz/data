# obj.patch Enhancements

## Overview
This document outlines two enhancements to `obj.patch` that would improve its functionality and align it with patterns used in jam-station and other applications.

## Current State
- `obj.patch(o, k, v)` - Immutably updates a value at a path
- Supports string or array paths
- Merges literal objects when both current and new values are objects
- Does NOT support function updaters
- Does NOT have a batch update function

## Proposed Enhancements

### 1. Function Updater Support

**Current behavior:**
```javascript
obj.patch({a: {b: 1}}, 'a', {c: 2}) // => {a: {b: 1, c: 2}}
```

**Proposed enhancement:**
```javascript
obj.patch({a: {b: 1}}, 'a', (current) => ({...current, c: 2}))
// => {a: {b: 1, c: 2}}
```

**Use case:**
This pattern is useful when you need to access the current value to compute the new value, similar to React's `setState` updater functions:

```javascript
// Example from jam-station piano-roll actions
patch(state, 'pianoRoll', ({interaction, tool, events}) => ({
  interaction: {
    ...interaction,
    start: {x, y},
    type: tool === 'pointer' ? 'selecting' : 'idle'
  }
}))
```

**Implementation notes:**
- Check if `v` is a function: `v instanceof Function`
- If function, call it with current value: `v(o[k])` or `v(o[k[0]])`
- Merge result with current value if result is an object (preserve existing merge behavior)
- Maintain backward compatibility - existing code should work unchanged

**Reference implementation:**
See `jam-station/src/js/util/data/object.js` for a working implementation.

### 2. Batch Update Function (`patchAt`)

**Proposed API:**
```javascript
obj.patchAt(o, {
  'a.b': 1,
  'a.c': 2,
  'd': 3
})
// => {a: {b: 1, c: 2}, d: 3}
```

**Use case:**
Update multiple paths in a single operation, reducing object creation overhead:

```javascript
// Instead of:
let updated = obj.patch(state, 'a', 1);
updated = obj.patch(updated, 'b', 2);
updated = obj.patch(updated, 'c', 3);

// Use:
const updated = obj.patchAt(state, {
  'a': 1,
  'b': 2,
  'c': 3
});
```

**Implementation notes:**
- Accept an object where keys are paths (string or array) and values are patch values
- Support both string paths and array paths in the patch tree
- Support function updaters in patch values
- Process patches in order (left-to-right based on Object.keys iteration)
- Return a single new object with all patches applied

**Reference implementation:**
See `jam-station/src/js/util/data/object.js` for a working implementation.

## Priority
- **Function updater support**: High - Currently used in jam-station piano-roll actions
- **Batch update (`patchAt`)**: Medium - Nice to have, but can be worked around with multiple `patch` calls

## Backward Compatibility
Both enhancements should be fully backward compatible:
- Existing `obj.patch(o, k, v)` calls will continue to work
- New `obj.patchAt` function is additive, doesn't affect existing API

## Testing Considerations
- Test function updaters with various value types (objects, primitives, arrays)
- Test function updaters with nested paths
- Test `patchAt` with mixed path types (string and array)
- Test `patchAt` with function updaters
- Test edge cases (empty objects, null values, undefined paths)

## Migration Path
Once implemented:
1. Update jam-station to use `iblokz-data`'s `obj.patch` with function support
2. Remove `jam-station/src/js/util/data/object.js` (keep only if needed for other custom logic)
3. Update documentation and examples


