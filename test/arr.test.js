'use strict';

const expect = require('chai').expect;

const arr = require('../lib/arr');

describe('arr', () =>
  describe('add', () =>
    it('Creates a new array with added item on the tail end of the old array', () =>
			expect(arr.add(['foo'], 'bar')).to.deep.equal(['foo', 'bar'])))
  &&
  describe('remove', () =>
    it('Creates a new array with a removed item from the old array', () =>
			expect(arr.remove(['foo', 'bar', 'baz'], 'bar')).to.deep.equal(['foo', 'baz']))
		&&
		it('Returns the same array if the item does not exist', () =>
			expect(arr.remove(['foo', 'bar', 'baz'], 'ban')).to.deep.equal(['foo', 'bar', 'baz'])))
  &&
  describe('toggle', () =>
    it('Creates a new array with either added or removed item, depending whether it exists or not', () =>
			expect(arr.toggle(['foo', 'bar', 'baz'], 'bar')).to.deep.equal(['foo', 'baz'])
			&&
			expect(arr.toggle(['foo', 'baz'], 'bar')).to.deep.equal(['foo', 'baz', 'bar'])
		))
	&&
	describe('contains', () =>
		it('Returns true if an array contains an element', () =>
			expect(arr.contains(['bar', 'foo'], 'foo')).to.equal(true))
		&&
		it('Returns false if an array does not contain an element', () =>
			expect(arr.contains(['bar', 'foo'], 'baz')).to.equal(false))
		&&
		it('Converts csv string to an array if provided', () =>
			expect(arr.contains('bar,foo', 'foo')).to.equal(true))
		&&
		it('Treats other variable types as an empty array', () =>
			expect(arr.contains({foo: 'bar'}, 'foo')).to.equal(false))
		)
);
