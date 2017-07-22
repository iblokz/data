'use strict';

const expect = require('chai').expect;

const obj = require('../lib/obj');

describe('obj', () =>
  describe('keyValue', () =>
    it('creates a new object with key and value provided in the arguments', () =>
      expect(obj.keyValue('foo', 'bar')).to.deep.equal({foo: 'bar'})))
  &&
  describe('clone', () =>
    it('creates a new object of the same type as passed in object', () =>
      expect(obj.clone(new Date(2017, 1, 1))).to.be.an.instanceof(Date))
    &&
    it('assigns the object tree properties', () =>
      expect(obj.clone({a: 1, b: {c: 2}})).to.deep.equal({a: 1, b: {c: 2}}))
    &&
    it('with subelements preserving their prototype', () =>
      expect(obj.clone({foo: {bar: new Date(2016)}})['foo']['bar']).to.be.an.instanceof(Date)))
  &&
  describe('sub', () =>
    it('returns a sub property on an object tree based on provided path array', () =>
      expect(obj.sub({foo: {bar: new Date(2016)}}, ['foo', 'bar'])).to.be.an.instanceof(Date))
    &&
    it('also works with single path string', () =>
      expect(obj.sub({a: 1, b: {c: 2}}, 'b')).to.deep.equal({c: 2}))
    &&
    it('should return false if no match', () =>
			expect(obj.sub({a: 1}, 'b')).to.equal(false))
		&&
    it('should return null for sub object', () =>
			expect(obj.sub({a: null}, 'a')).to.equal(null))
		&&
    it('should return 0 for sub object', () =>
			expect(obj.sub({a: 0}, 'a')).to.equal(0))
	)
  &&
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
				.and.to.include.keys('b')))
	&&
	describe('switch', () =>
    it('returns a case for matched value', () =>
			expect(obj.switch('b', {a: 1, b: 3, c: 4})).to.equal(3))
		&&
    it('returns a default case for unmatched value', () =>
			expect(obj.switch('b', {a: 2, c: 7, default: 4})).to.equal(4))
		&&
    it('returns false if not matched and no default value', () =>
			expect(obj.switch('b', {a: 1, c: 4})).to.equal(false))
	)
);
