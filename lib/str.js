'use strict';

/**
 * String manipulation utilities
 * @module str
 */

/**
 * @memberof module:str
 * Capitalizes the first character of a string.
 * @param {string} chunk - The string to capitalize
 * @returns {string} The capitalized string
 * @example
 * capitalize('hello') // => 'Hello'
 */
const capitalize = chunk => chunk.charAt(0).toUpperCase() + chunk.slice(1);

/**
 * @memberof module:str
 * Converts a string to camelCase from a delimited format.
 * @param {string} str - The string to convert
 * @param {string} [glue='_'] - The delimiter to split on
 * @returns {string} The camelCase string
 * @example
 * toCamelCase('hello_world') // => 'helloWorld'
 * toCamelCase('hello-world', '-') // => 'helloWorld'
 */
const toCamelCase = (str, glue = '_') =>
	str.split(glue)
		.map((chunk, i) => (i === 0)
			? chunk
			: capitalize(chunk))
		.join('');

/**
 * @memberof module:str
 * Converts a camelCase string to a delimited format.
 * @param {string} str - The camelCase string to convert
 * @param {string} [glue='_'] - The delimiter to use
 * @returns {string} The delimited string in lowercase
 * @example
 * fromCamelCase('helloWorld') // => 'hello_world'
 * fromCamelCase('helloWorld', '-') // => 'hello-world'
 */
const fromCamelCase = (str, glue = '_') =>
	str.replace(/([A-Z])/g, ' $1')
		.split(' ')
		.map(chunk => chunk.toLowerCase())
		.join(glue);

/**
 * @memberof module:str
 * Converts a singular word to its plural form (basic English rules).
 * @param {string} str - The singular word
 * @returns {string} The plural form
 * @example
 * singularToPlural('category') // => 'categories'
 * singularToPlural('user') // => 'users'
 */
const singularToPlural = str =>
	str.replace(/y$/, 'ie').concat('s');

/**
 * @memberof module:str
 * Converts a plural word to its singular form (basic English rules).
 * @param {string} str - The plural word
 * @returns {string} The singular form
 * @example
 * pluralToSingular('categories') // => 'category'
 * pluralToSingular('users') // => 'user'
 */
const pluralToSingular = str =>
	str.replace(/ies$/, 'y').replace(/s$/, '');

/**
 * @memberof module:str
 * Converts a string to a document ID format (typically used for database foreign keys).
 * @param {string} str - The string to convert
 * @param {string} [glue='_'] - The delimiter in the input string
 * @param {string} [suffix='Id'] - The suffix to append
 * @param {string} [prefix=''] - The prefix to prepend
 * @returns {string} The document ID string
 * @example
 * toDocumentId('user_roles') // => 'userRoleId'
 * toDocumentId('categories', '_', 'ID', 'ref') // => 'refCategoryID'
 */
const toDocumentId = (str, glue = '_', suffix = 'Id', prefix = '') =>
	prefix.concat(pluralToSingular(toCamelCase(str, glue)), suffix);

module.exports = {
	capitalize,
	toCamelCase,
	fromCamelCase,
	singularToPlural,
	pluralToSingular,
	toDocumentId
};
