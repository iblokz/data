'use strict';

const keyValue = (k, v) => {
	let o = {};
	o[k] = v;
	return o;
};

const patch = (o, k, v) => Object.assign({}, o,
	(k instanceof Array)
		? keyValue(k[0], (k.length > 1)
			? patch(o[k[0]] || {}, k.slice(1), v)
			: typeof o[k[0]] === 'object' && Object.assign({}, o[k[0]], v) || v)
		: keyValue(k, typeof o[k] === 'object' && Object.assign({}, o[k], v) || v)
);

const sub = (o, p) => (p instanceof Array)
	&& o[p[0]] && sub(o[p[0]], p.slice(1))
	|| o[p] || false;

// console.log(patch({}, ['a', 'b', 'c'], 'boom'));
// console.log(patch({}, 'x', 1));
// console.log(['a', 'b', 'c'].slice(1));
//
// console.log(patch({a: {d: '1'}}, 'a', {g: 2}));

// let o = {
// 	a: {b: {c: 123}}
// };
//
// console.log(sub(o, ['a', 'b', 3]));

module.exports = {
	keyValue,
	patch,
	sub
};
