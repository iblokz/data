'use strict';

const obj = require('./obj');

const compose = (...fList) => (...args) => fList.reduce(
	(r, f) => (r instanceof Array) && f.apply(null, r) || f(r), args
);

// switch for backwards compatibility
module.exports = {
	compose,
	switch: obj.switch
};
