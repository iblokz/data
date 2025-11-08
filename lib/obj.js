'use strict';

/**
 * Object utilities for immutable operations
 * @module obj
 */

/**
 * Creates an object with a single key-value pair.
 * @memberof module:obj
 * @param {string} k - The key
 * @param {*} v - The value
 * @returns {Object} An object with the single key-value pair
 * @example
 * keyValue('name', 'John') // => { name: 'John' }
 */
const keyValue = (k, v) => ({[k]: v});

/**
 * Checks if a value is a plain object literal (not an array, null, or other object type).
 * @memberof module:obj
 * @param {*} o - The value to check
 * @returns {boolean} True if the value is a plain object literal
 * @example
 * isLiteral({}) // => true
 * isLiteral([]) // => false
 * isLiteral(null) // => false
 */
const isLiteral = o => typeof o === 'object'
	&& o !== null && o.constructor === Object;

/**
 * Creates a shallow clone of an object, preserving its prototype.
 * @memberof module:obj
 * @param {Object} o - The object to clone
 * @returns {Object} A shallow clone of the object
 * @example
 * const obj = { a: 1, b: 2 };
 * const cloned = clone(obj);
 * cloned.a = 3;
 * console.log(obj.a) // => 1 (original unchanged)
 */
const clone = o => Object.assign(Object.create(Object.getPrototypeOf(o) || {}), o);

/**
 * Gets a nested value from an object using a path.
 * @memberof module:obj
 * @param {Object} o - The source object
 * @param {string|Array<string>} p - The path (string key or array of keys for nested access)
 * @returns {*} The value at the path, or undefined if not found
 * @example
 * sub({ a: { b: { c: 1 } } }, ['a', 'b', 'c']) // => 1
 * sub({ a: 1 }, 'a') // => 1
 * sub({ a: 1 }, 'b') // => undefined
 */
const sub = (o, p) => (o === undefined || o === null) ? undefined : (p instanceof Array)
	? p.length > 1 ? sub(o[p[0]], p.slice(1)) : o[p[0]]
	: o[p];

/**
 * Immutably updates a value in an object at a given path.
 * For nested paths, creates intermediate objects as needed.
 * If the value at the path is a literal object and v is also a literal object, they are merged.
 * @memberof module:obj
 * @param {Object} o - The source object
 * @param {string|Array<string>} k - The path (string key or array of keys for nested updates)
 * @param {*} v - The value to set
 * @returns {Object} A new object with the value updated at the path
 * @example
 * patch({ a: 1 }, 'b', 2) // => { a: 1, b: 2 }
 * patch({ a: { b: 1 } }, ['a', 'c'], 2) // => { a: { b: 1, c: 2 } }
 * patch({ a: { b: 1 } }, 'a', { c: 2 }) // => { a: { b: 1, c: 2 } } (merged)
 */
const patch = (o, k, v) => Object.assign(clone(o),
	(k instanceof Array)
		? keyValue(k[0], (k.length > 1)
			? patch(o[k[0]] || {}, k.slice(1), v)
			: isLiteral(o[k[0]]) && Object.assign(clone(o[k[0]]), v) || v)
		: keyValue(k, isLiteral(o[k]) && Object.assign(clone(o[k]), v) || v)
);

/**
 * Reduces an object to a single value by iterating over its keys.
 * Similar to Array.reduce, but for objects.
 * @memberof module:obj
 * @param {Object} o - The object to reduce
 * @param {Function} reduceFn - The reducer function (accumulator, key, value, index, originalObject) => newAccumulator
 * @param {*} [initial] - The initial accumulator value (defaults to first property value)
 * @returns {*} The final accumulated value
 * @example
 * reduce({ a: 1, b: 2, c: 3 }, (sum, key, val) => sum + val, 0) // => 6
 */
const reduce = (o, reduceFn, initial) => Object.keys(o)
	.reduce(
		(accumulator, key, index) => reduceFn(accumulator, key, o[key], index, o),
		typeof initial === 'undefined'
			? o[Object.keys(o)[0]] // to confirm with the array reduce spec in this case the firts property is used
			: initial
	);

/**
 * Immutably maps over an object's values.
 * @memberof module:obj
 * @param {Object} o - The source object
 * @param {Function} mapFn - The mapping function (key, value, index, originalObject) => newValue
 * @returns {Object} A new object with mapped values
 * @example
 * map({ a: 1, b: 2 }, (k, v) => v * 2) // => { a: 2, b: 4 }
 */
const map = (o, mapFn) => reduce(o,
	(o2, key, value, index) => patch(o2, key, mapFn(key, value, index, o)),
	{}
);

/**
 * Immutably filters an object's properties based on a predicate.
 * @memberof module:obj
 * @param {Object} o - The source object
 * @param {Function} filterFn - The filter predicate (key, value, index, originalObject) => boolean
 * @returns {Object} A new object with only properties that pass the predicate
 * @example
 * filter({ a: 1, b: 2, c: 3 }, (k, v) => v > 1) // => { b: 2, c: 3 }
 */
const filter = (o, filterFn) => reduce(o,
	(o2, key, value, index) => filterFn(key, value, index, o)
		? patch(o2, key, value)
		: o2,
	{}
);

/**
 * Recursively traverses an object tree and applies a function to leaf values.
 * Non-literal values (primitives, arrays, etc.) are transformed by the function.
 * @memberof module:obj
 * @param {Object} tree - The object tree to traverse
 * @param {Function} fn - The function to apply to leaf values (key, value, index, parent) => newValue
 * @returns {Object} A new object tree with transformed leaf values
 * @example
 * traverse({ a: { b: 1 }, c: 2 }, (k, v) => v * 2) // => { a: { b: 2 }, c: 4 }
 */
const traverse = (tree, fn) => Object.keys(tree).reduce((o, key, index) =>
	patch(o, key, isLiteral(tree[key])
		? traverse(tree[key], fn)
		: fn(key, tree[key], index, tree)
	), {}
);

/**
 * Chains multiple method calls on an object.
 * @memberof module:obj
 * @param {Object} o - The object to call methods on
 * @param {Array<Array>} chain - Array of [methodName, ...args] tuples
 * @returns {*} The result of the final method call
 * @example
 * chainCall([1, 2, 3], [['map', x => x * 2], ['filter', x => x > 2]]) // => [4, 6]
 */
const chainCall = (o, chain) => chain.reduce(
	(o, [prop, ...args]) => o[prop](...args),
	o
);

/**
 * Pattern matching utility that returns a value based on matching a value to cases.
 * Supports nested array paths for partial matching and a 'default' case.
 * @memberof module:obj
 * @param {*} value - The value to match (can be a string, array path, etc.)
 * @param {Object} cases - Object with cases to match against (supports 'default' key)
 * @returns {*} The matched case value, or false if no match
 * @example
 * _switch('a', { a: 1, b: 2, default: 0 }) // => 1
 * _switch('c', { a: 1, b: 2, default: 0 }) // => 0
 * _switch(['a', 'b'], { a: { b: 1 } }) // => 1
 */
const _switch = (value, cases) =>
	sub(cases, value) && sub(cases, value)['default'] || sub(cases, value)
	|| (value instanceof Array)
		&& value.length > 1 && _switch(value.slice(0, value.length - 1), cases)
	|| cases['default'] || false;

module.exports = {
	keyValue,
	isLiteral,
	clone,
	sub,
	patch,
	reduce,
	map,
	filter,
	traverse,
	chainCall,
	switch: _switch
};
