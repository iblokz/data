'use strict';

const capitalize = chunk => chunk.charAt(0).toUpperCase() + chunk.slice(1);

const toCamelCase = (str, glue = '_') =>
	str.split(glue)
		.map((chunk, i) => (i === 0)
			? chunk
			: capitalize(chunk))
		.join('');

const fromCamelCase = (str, glue = '_') =>
	str.replace(/([A-Z])/g, ' $1')
		.split(' ')
		.map(chunk => chunk.toLowerCase())
		.join(glue);

const singularToPlural = str =>
	str.replace(/y$/, 'ie').concat('s');

const pluralToSingular = str =>
	str.replace(/ies$/, 'y').replace(/s$/, '');

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
