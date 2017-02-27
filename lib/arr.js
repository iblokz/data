'use strict';

const add = (arr, item) => [].concat(arr, [item]);

const remove = (arr, item) => arr.indexOf(item) > -1 ? [].concat(
	arr.slice(0, arr.indexOf(item)),
	arr.slice(arr.indexOf(item) + 1)
) : arr;

const toggle = (arr, item) => arr.indexOf(item) > -1
	? remove(arr, item)
	: add(arr, item);

console.log(remove(add([], '2'), '2'));

module.exports = {
	add,
	remove,
	toggle
};
