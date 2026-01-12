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
	&&
	describe('reorder', () =>
		it('Moves an item from one index to another (forward - higher to lower)', () =>
			expect(arr.reorder(['a', 'b', 'c', 'd', 'e'], 2, 1)).to.deep.equal(['a', 'c', 'b', 'd', 'e']))
		&&
		it('Moves an item from one index to another (forward - higher to lower, different case)', () =>
			expect(arr.reorder(['a', 'b', 'c', 'd', 'e'], 3, 1)).to.deep.equal(['a', 'd', 'b', 'c', 'e']))
		&&
		it('Moves an item from one index to another (backward - lower to higher)', () =>
			expect(arr.reorder(['a', 'b', 'c', 'd', 'e'], 1, 3)).to.deep.equal(['a', 'c', 'd', 'b', 'e']))
		&&
		it('Returns the same array if from and to indices are equal', () =>
			expect(arr.reorder(['a', 'b', 'c', 'd', 'e'], 3, 3)).to.deep.equal(['a', 'b', 'c', 'd', 'e']))
		&&
		it('Moves item to the beginning', () =>
			expect(arr.reorder(['a', 'b', 'c'], 2, 0)).to.deep.equal(['c', 'a', 'b']))
		&&
		it('Moves item to the end', () =>
			expect(arr.reorder(['a', 'b', 'c'], 0, 2)).to.deep.equal(['b', 'c', 'a']))
		)
	&&
	describe('patch', () =>
		it('Patches an array element with an object (merges)', () =>
			expect(arr.patch([{a: 1}, {b: 2}], 0, {c: 3})).to.deep.equal([{a: 1, c: 3}, {b: 2}]))
		&&
		it('Patches an array element with a function updater', () =>
			expect(arr.patch([{count: 1}, {count: 2}], 0, (item) => ({...item, count: item.count + 1}))).to.deep.equal([{count: 2}, {count: 2}]))
		&&
		it('Extends array with undefined when patching beyond length', () =>
			expect(arr.patch([1, 2], 5, 3)).to.deep.equal([1, 2, undefined, undefined, undefined, 3]))
		&&
		it('Patches at index 0', () =>
			expect(arr.patch([{a: 1}, {b: 2}], 0, {a: 2})).to.deep.equal([{a: 2}, {b: 2}]))
		&&
		it('Patches at last index', () =>
			expect(arr.patch([{a: 1}, {b: 2}], 1, {b: 3})).to.deep.equal([{a: 1}, {b: 3}]))
		&&
		it('Handles empty array', () =>
			expect(arr.patch([], 0, {a: 1})).to.deep.equal([{a: 1}]))
		&&
		it('Function updater receives undefined for missing elements', () =>
			expect(arr.patch([], 0, (item) => ({...item, count: (item?.count || 0) + 1}))).to.deep.equal([{count: 1}]))
		)
);
