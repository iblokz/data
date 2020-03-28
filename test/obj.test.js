'use strict';

const expect = require('chai').expect;

const obj = require('../lib/obj');

// mock object to be used in chainCall test
const ValAdd = function(val) {
	this.val = val;
};
ValAdd.prototype.add = function(val) {
	this.val += val;
	return this;
};
ValAdd.prototype.sum = function() {
	return this.val;
};

describe('obj', () => (
  describe('keyValue', () =>
    it('creates a new object with key and value provided in the arguments', () =>
      expect(obj.keyValue('foo', 'bar')).to.deep.equal({foo: 'bar'}))),
	describe('isLiteral', () => (
		it('verifies that an object is literal', () =>
			expect(obj.isLiteral({foo: 'bar'})).to.equal(true)),
		it('returns false if the object has a different constructor form Object', () =>
			expect(obj.isLiteral(new Date(2017, 1, 1))).to.equal(false)),
		it('returns false if the object is null', () =>
			expect(obj.isLiteral(null)).to.equal(false)))),
  describe('clone', () =>
    it('creates a new object of the same type as passed in object', () =>
      expect(obj.clone(new Date(2017, 1, 1))).to.be.an.instanceof(Date))
    &&
    it('assigns the object tree properties', () =>
      expect(obj.clone({a: 1, b: {c: 2}})).to.deep.equal({a: 1, b: {c: 2}}))
    &&
    it('with subelements preserving their prototype', () =>
      expect(obj.clone({foo: {bar: new Date(2016)}})['foo']['bar']).to.be.an.instanceof(Date))),
  describe('sub', () =>
    it('returns a sub property on an object tree based on provided path array', () =>
      expect(obj.sub({foo: {bar: new Date(2016)}}, ['foo', 'bar'])).to.be.an.instanceof(Date))
    &&
    it('also works with single path string', () =>
      expect(obj.sub({a: 1, b: {c: 2}}, 'b')).to.deep.equal({c: 2}))
    &&
    it('should return undefined if no match', () =>
			expect(obj.sub({a: 1}, 'b')).to.equal(undefined))
		&&
    it('should return null for sub object', () =>
			expect(obj.sub({a: null}, 'a')).to.equal(null))
		&&
    it('should return 0 for sub object', () =>
			expect(obj.sub({a: 0}, 'a')).to.equal(0))
		&&
		it('returns undefined when a value of undefined and a path string are provided', () =>
			expect(obj.sub(undefined, 'bar')).to.equal(undefined))
		&&
		it('returns undefined when a value of null and a path string are provided', () =>
			expect(obj.sub(null, 'bar')).to.equal(undefined))
		&&
		it('returns undefined when a value of undefined and a path array are provided', () =>
			expect(obj.sub(undefined, ['foo', 'bar'])).to.equal(undefined))
		&&
		it('returns undefined when a value of null and a path array are provided', () =>
			expect(obj.sub(null, ['foo', 'bar'])).to.equal(undefined))
		&&
		it('returns undefined when any of the properties in the path is undefined and a path array is provided', () =>
			expect(obj.sub({foo: {}}, ['foo', 'bar', 'baz', 'qux'])).to.equal(undefined))
		&&
		it('returns undefined when any of the properties in the path is null and a path array is provided', () =>
			expect(obj.sub({foo: {bar: null}}, ['foo', 'bar', 'baz', 'qux'])).to.equal(undefined))
	),
  describe('patch', () =>
    it('patches a property based on a path string', () =>
      expect(obj.patch({a: 1, b: 3}, 'b', 2)).to.deep.equal({a: 1, b: 2}))
    &&
    it('patches a property based on a path array with single element', () =>
      expect(obj.patch({a: 1, b: 3}, ['b'], 2)).to.deep.equal({a: 1, b: 2}))
    &&
    it('patches a sub property based on a path array', () =>
      expect(obj.patch({a: 1, b: {c: 3}}, ['b', 'c'], 2)).to.deep.equal({a: 1, b: {c: 2}}))
    &&
    it('creates the tree structure if missing', () =>
      expect(obj.patch({a: 1}, ['b', 'c', 'd'], 2)).to.deep.equal({a: 1, b: {c: {d: 2}}}))
    &&
    it('preserves the objects prototype', () =>
      expect(obj.patch(new Date(), ['b', 'c'], 2))
        .to.be.an.instanceof(Date)
        .and.to.include.keys('b'))
    &&
    it('preserves the sub objects prototype', () =>
      expect(obj.patch({a: new Date()}, ['a', 'b', 'c'], 2)['a'])
        .to.be.an.instanceof(Date)
				.and.to.include.keys('b'))),
	describe('reduce', () => (
		it('performs an array type reduce operation on an object', () =>
			expect(obj.reduce({a: 1}, (b, k, v) => Object.assign(b, {[k]: v + 1}), {}))
				.to.deep.equal({a: 2})
		)
	)),
	describe('map', () => (
		it('performs an array type map operation on an object', () =>
			expect(obj.map({a: 1}, (k, v) => v + 1))
				.to.deep.equal({a: 2})
		)
	)),
	describe('filter', () => (
		it('performs an array type filter operation on an object', () =>
			expect(obj.filter({a: 1, b: 3, c: 2}, (k, v) => k !== 'b'))
				.to.deep.equal({a: 1, c: 2})
		)
	)),
	describe('traverse', () => (
		it('traverses an object with an array type map operation', () =>
			expect(obj.traverse({a: 1, b: {c: 3}}, (k, v) => v + 1))
				.to.deep.equal({a: 2, b: {c: 4}})
		)
	)),
	describe('chainCall', () => (
		it('consecutively calls methods of an object that return the new state of that object', () =>
			expect(obj.chainCall(new ValAdd(1), [['add', 1], ['add', 2], ['sum']]))
				.to.equal(4)
		)
	)),
	describe('switch', () => (
    it('returns a case for matched value', () =>
			expect(obj.switch('b', {a: 1, b: 3, c: 4})).to.equal(3)),
    it('returns a default case for unmatched value', () =>
			expect(obj.switch('b', {a: 2, c: 7, default: 4})).to.equal(4)),
    it('returns false if not matched and no default value', () =>
			expect(obj.switch('b', {a: 1, c: 4})).to.equal(false))
	))
));
