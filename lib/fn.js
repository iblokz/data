'use strict';

/**
 * Function composition utilities
 * @module fn
 */

const obj = require('./obj');

/**
 * @memberof module:fn
 * Creates a left-to-right function composition pipeline.
 * The first function can accept multiple arguments; the remaining functions must be unary.
 * @param {Function} a - The first function in the pipeline (can accept multiple arguments)
 * @param {...Function} fns - The remaining functions to pipe through (each takes one argument)
 * @returns {Function} A function that passes the result through each function from left to right
 * @example
 * const addOne = x => x + 1;
 * const double = x => x * 2;
 * const addOneThenDouble = pipe(addOne, double);
 * addOneThenDouble(3) // => 8 (3 + 1 = 4, 4 * 2 = 8)
 */
const pipe = (a, ...fns) => (...args) => fns.reduce((res, fn) => fn(res), a(...args));

/**
 * @memberof module:fn
 * Creates a right-to-left function composition.
 * The rightmost function can accept multiple arguments; the remaining functions must be unary.
 * @param {...Function} fns - Functions to compose (executed right to left)
 * @returns {Function} A function that passes the result through each function from right to left
 * @example
 * const addOne = x => x + 1;
 * const double = x => x * 2;
 * const doubleThenAddOne = compose(addOne, double);
 * doubleThenAddOne(3) // => 7 (3 * 2 = 6, 6 + 1 = 7)
 */
const compose = (...fns) => pipe(fns.slice(-1).pop(), ...fns.reverse().slice(1));

// switch for backwards compatibility
module.exports = {
	compose,
	pipe,
	switch: obj.switch
};
