'use strict';

const expect = require('chai').expect;

const fn = require('../lib/fn');

const times2 = a => a * 2;
const minus5 = a => a - 5;

describe('fn', () => (
	describe('pipe', () =>
		it('Pipes 2+ functions together', () =>
		expect(fn.pipe(times2, minus5)(7)).to.equal(7 * 2 - 5))),
  describe('compose', () =>
    it('Composes 2+ functions together', () =>
		expect(fn.compose(minus5, times2)(7)).to.equal(7 * 2 - 5)))
));
