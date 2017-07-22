'use strict';

const expect = require('chai').expect;

const fn = require('../lib/fn');

const times2 = a => a * 2;
const minus5 = a => a - 5;

describe('fn', () =>
  describe('compose', () =>
    it('Composes 2+ functions together', () =>
		expect(fn.compose(times2, minus5)(7)).to.equal(7 * 2 - 5)))
);
