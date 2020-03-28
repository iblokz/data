'use strict';

const keyValue = (k, v) => ({[k]: v});

const isLiteral = o => typeof o === 'object'
	&& o !== null && o.constructor === Object;

const clone = o => Object.assign(Object.create(Object.getPrototypeOf(o) || {}), o);

const sub = (o, p) => (o === undefined || o === null) ? undefined : (p instanceof Array)
	? p.length > 1 ? sub(o[p[0]], p.slice(1)) : o[p[0]]
	: o[p];

const patch = (o, k, v) => Object.assign(clone(o),
	(k instanceof Array)
		? keyValue(k[0], (k.length > 1)
			? patch(o[k[0]] || {}, k.slice(1), v)
			: isLiteral(o[k[0]]) && Object.assign(clone(o[k[0]]), v) || v)
		: keyValue(k, isLiteral(o[k]) && Object.assign(clone(o[k]), v) || v)
);

const reduce = (o, reduceFn, initial) => Object.keys(o)
	.reduce(
		(accumulator, key, index) => reduceFn(accumulator, key, o[key], index, o),
		typeof initial === 'undefined'
			? o[Object.keys(o)[0]] // to confirm with the array reduce spec in this case the firts property is used
			: initial
	);

const map = (o, mapFn) => reduce(o,
	(o2, key, value, index) => patch(o2, key, mapFn(key, value, index, o)),
	{}
);

const filter = (o, filterFn) => reduce(o,
	(o2, key, value, index) => filterFn(key, value, index, o)
		? patch(o2, key, value)
		: o2,
	{}
);

const traverse = (tree, fn) => Object.keys(tree).reduce((o, key, index) =>
	patch(o, key, isLiteral(tree[key])
		? traverse(tree[key], fn)
		: fn(key, tree[key], index, tree)
	), {}
);

const chainCall = (o, chain) => chain.reduce(
	(o, [prop, ...args]) => o[prop](...args),
	o
);

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
