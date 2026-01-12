'use strict';

/**
 * Array utilities for immutable operations
 * @module arr
 */

/**
 * Immutably adds an item to an array (returns a new array).
 * @memberof module:arr
 * @param {Array} arr - The source array
 * @param {*} item - The item to add
 * @returns {Array} A new array with the item added at the end
 * @example
 * add([1, 2, 3], 4) // => [1, 2, 3, 4]
 */
const add = (arr, item) => [].concat(arr, [item]);

/**
 * Immutably removes the first occurrence of an item from an array.
 * If the item is not found, returns the original array.
 * @memberof module:arr
 * @param {Array} arr - The source array
 * @param {*} item - The item to remove
 * @returns {Array} A new array with the item removed, or the original array if not found
 * @example
 * remove([1, 2, 3, 2], 2) // => [1, 3, 2]
 * remove([1, 2, 3], 4) // => [1, 2, 3]
 */
const remove = (arr, item) => arr.indexOf(item) > -1 ? [].concat(
	arr.slice(0, arr.indexOf(item)),
	arr.slice(arr.indexOf(item) + 1)
) : arr;

/**
 * Immutably toggles an item in an array (adds if not present, removes if present).
 * @memberof module:arr
 * @param {Array} arr - The source array
 * @param {*} item - The item to toggle
 * @returns {Array} A new array with the item toggled
 * @example
 * toggle([1, 2, 3], 2) // => [1, 3]
 * toggle([1, 2, 3], 4) // => [1, 2, 3, 4]
 */
const toggle = (arr, item) => arr.indexOf(item) > -1
	? remove(arr, item)
	: add(arr, item);

/**
 * Checks if an array or comma-separated string contains an element.
 * @memberof module:arr
 * @param {Array|string} a - The array or comma-separated string to check
 * @param {*} el - The element to look for
 * @returns {boolean} True if the element is found, false otherwise
 * @example
 * contains([1, 2, 3], 2) // => true
 * contains('a,b,c', 'b') // => true
 * contains([1, 2, 3], 4) // => false
 */
const contains = (a, el) => [].concat(
	typeof a === 'string' && a.split(',')
	|| a instanceof Array && a
	|| []
).indexOf(el) > -1;

/**
 * Immutably reorders an array by moving an item from one index to another.
 * @memberof module:arr
 * @param {Array} arr - The source array
 * @param {number} from - The index of the item to move
 * @param {number} to - The index to move the item to
 * @returns {Array} A new array with the item moved
 * @example
 * reorder(['a', 'b', 'c', 'd', 'e'], 2, 1) // => ['a', 'c', 'b', 'd', 'e']
 * reorder(['a', 'b', 'c', 'd', 'e'], 3, 1) // => ['a', 'd', 'b', 'c', 'e']
 * reorder(['a', 'b', 'c', 'd', 'e'], 1, 3) // => ['a', 'c', 'd', 'b', 'e']
 * reorder(['a', 'b', 'c', 'd', 'e'], 3, 3) // => ['a', 'b', 'c', 'd', 'e'] // no change
 */
const reorder = (arr, from, to) => from === to ? arr : from > to
	? [].concat(
		arr.slice(0, to),
		[arr[from]],
		arr.slice(to, from),
		arr.slice(from + 1)
	)
	: [].concat(
		arr.slice(0, from),
		arr.slice(from + 1, to + 1),
		[arr[from]],
		arr.slice(to + 1)
	);

/**
 * Immutably patches an array at a given index.
 * @memberof module:arr
 * @param {Array} arr - The source array
 * @param {number} index - The index to patch
 * @param {Object|Function} v - The patch value to apply
 * @returns {Array} A new array with the patch applied
 * @example
 * // Patch with object (merges with existing object)
 * patch([{a: 1}, {b: 2}], 0, {c: 3}) // => [{a: 1, c: 3}, {b: 2}]
 *
 * // Patch with function updater
 * patch([{count: 1}, {count: 2}], 0, (item) => ({...item, count: item.count + 1}))
 * // => [{count: 2}, {count: 2}]
 *
 * // Patch at index beyond array length (extends array with undefined)
 * patch([1, 2], 5, 3) // => [1, 2, undefined, undefined, undefined, 3]
 */
const patch = (arr = [], index, v) => [].concat(
	// if index is greater than 0, slice the array up to the index
	index > 0 ? arr.slice(0, index) : [],
	// if index is greater than the array length, fill the array with undefined up to the index
	arr.length - 1 < index ? new Array(index - arr.length).fill(undefined) : [],
	// if the patch (v) is a function, call it with the array at the index, otherwise apply the patch directly
	v instanceof Function ? v(arr[index] != null ? arr[index] : {})
		: arr[index] instanceof Object && v instanceof Object
			? Object.assign({}, arr[index], v)
			: v,
	// if index is less than the array length - 1, slice the array from the index + 1
	index < (arr.length - 1) ? arr.slice(index + 1) : []
);

module.exports = {
	add,
	remove,
	toggle,
	contains,
	reorder,
	patch
};
