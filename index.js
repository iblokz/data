/**
 * @module iblokz-data
 * @description Immutable data manipulation utilities for JavaScript
 * @version 1.5.0
 */

/**
 * Object utilities for immutable operations
 * @type {Object}
 */
const obj = require('./lib/obj');

/**
 * Array utilities for immutable operations
 * @type {Object}
 */
const arr = require('./lib/arr');

/**
 * String manipulation utilities
 * @type {Object}
 */
const str = require('./lib/str');

/**
 * Function composition utilities
 * @type {Object}
 */
const fn = require('./lib/fn');

module.exports = {
	obj,
	arr,
	str,
	fn
};
