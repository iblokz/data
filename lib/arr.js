'use strict';

/**
 * Immutably adds an item to an array (returns a new array).
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

module.exports = {
	add,
	remove,
	toggle,
	contains
};
