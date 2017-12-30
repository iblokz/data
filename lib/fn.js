'use strict';

const obj = require('./obj');

// (((a, b, …, n) → o), (o → p), …, (x → y), (y → z)) → ((a, b, …, n) → z)
const pipe = (a, ...fns) => (...args) => fns.reduce((res, fn) => fn(res), a(...args));

// ((y → z), (x → y), …, (o → p), ((a, b, …, n) → o)) → ((a, b, …, n) → z)
const compose = (...fns) => pipe(fns.slice(-1).pop(), ...fns.reverse().slice(1));

// switch for backwards compatibility
module.exports = {
	compose,
	pipe,
	switch: obj.switch
};
